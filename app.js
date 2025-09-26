/* EmpresaTec - Versão revisada com sincronização remota (Firebase) + fallback local */

const EmpresaTec = {
  state: {
    currentUser: null,
    currentTeam: null,
    currentScreen: 'loginScreen',
    currentPhase: 1,
    currentQuestion: 0,
    userAnswers: [],
    userProfile: null,
    teacherPassword: 'professor2025',
    online: false
  },

  async init() {
    this.bindEvents();
    this.loadState();
    await this.checkOnline();
    this.showScreen(this.state.currentScreen || 'loginScreen');
    console.log('✅ Sistema pronto');
  },

  async checkOnline() {
    try {
      this.state.online = !!window.FB && !!window.FB.db;
      if (this.state.online) console.log('🌐 Modo online (Firebase)');
      else console.log('💾 Modo local (sem Firebase)');
    } catch { this.state.online = false; }
  },

  // ========= Eventos =========
  bindEvents() {
    const $ = (id)=>document.getElementById(id);
    $('loginForm')?.addEventListener('submit', e=>{e.preventDefault();this.handleLogin();});
    $('teacherBtn')?.addEventListener('click', ()=>this.showScreen('teacherScreen'));
    $('teacherForm')?.addEventListener('submit', e=>{e.preventDefault();this.handleTeacherLogin();});
    $('backToLogin')?.addEventListener('click', ()=>this.showScreen('loginScreen'));
    ;['logoutBtn','logoutSim','logoutTeacher'].forEach(id=>$(id)?.addEventListener('click', ()=>this.handleLogout()));
    $('createTeamForm')?.addEventListener('submit', e=>{e.preventDefault();this.createTeam();});
    $('joinTeamForm')?.addEventListener('submit', e=>{e.preventDefault();this.joinTeam();});
    $('copyBtn')?.addEventListener('click', ()=>this.copyTeamCode());
    $('startBtn')?.addEventListener('click', ()=>this.startSimulation());

    // Questionário
    $('prevBtn')?.addEventListener('click', ()=>this.prevQuestion());
    $('nextBtn')?.addEventListener('click', ()=>this.nextQuestion());
    $('finishBtn')?.addEventListener('click', ()=>this.finishQuestionnaire());
    $('continueBtn')?.addEventListener('click', ()=>this.goToPhase(2));

    // Fases
    $('nextPhase2')?.addEventListener('click', ()=>this.goToPhase(3));
    $('nextPhase3')?.addEventListener('click', ()=>this.goToPhase(4));
    $('nextPhase4')?.addEventListener('click', ()=>this.goToPhase(5));
    $('finishAct')?.addEventListener('click', ()=>this.finishAct1());

    // Professor
    $('exportBtn')?.addEventListener('click', ()=>this.exportData());
    $('resetBtn')?.addEventListener('click', ()=>this.resetAllData());

    // Alert close
    $('alertClose')?.addEventListener('click', ()=>this.hideAlert());
  },

  // ========= Telas =========
  showScreen(id){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    const el = document.getElementById(id);
    if (el){ el.classList.add('active'); this.state.currentScreen = id; this.saveState(); }
  },

  // ========= Login =========
  async handleLogin(){
    const email = document.getElementById('loginEmail')?.value?.trim();
    const pass  = document.getElementById('loginPassword')?.value?.trim();
    if(!email||!pass) return this.showAlert('Preencha todos os campos','error');
    if(!this.isValidEmail(email)) return this.showAlert('Email inválido','error');

    try {
      this.showLoading('Entrando...');
      // Define usuário localmente SEMPRE
      this.state.currentUser = { id: this.uid(), email, name: email.split('@')[0] };

      // Se online, autentica (cria se não existir)
      if (this.state.online){
        try { await window.FB.signIn(email, pass); }
        catch(e){ if(e?.code?.includes('user-not-found')) await window.FB.signUp(email, pass); }
      }
      this.hideLoading();
      this.showScreen('teamScreen');
      this.updateUserInfo();
      this.showAlert('Login ok!','success');
    } catch(e){
      this.hideLoading();
      this.showAlert('Erro no login: '+e.message,'error');
    }
  },

  handleTeacherLogin(){
    const p = document.getElementById('teacherPassword')?.value?.trim();
    if(!p) return this.showAlert('Digite a senha','error');
    if(p!==this.state.teacherPassword) return this.showAlert('Senha incorreta','error');
    document.querySelector('.teacher-login').style.display='none';
    document.getElementById('teacherDashboard').classList.remove('hidden');
    this.loadTeacherDashboard();
    this.showAlert('Bem-vindo ao painel!','success');
  },

  handleLogout(){
    if(!confirm('Deseja sair?')) return;
    localStorage.removeItem('empresatec_state');
    this.state = { currentUser:null,currentTeam:null,currentScreen:'loginScreen',currentPhase:1,currentQuestion:0,userAnswers:[],userProfile:null,teacherPassword:'professor2025',online:this.state.online };
    const tl = document.querySelector('.teacher-login');
    const td = document.getElementById('teacherDashboard');
    if (td) td.classList.add('hidden');
    if (tl) tl.style.display='block';
    this.showScreen('loginScreen');
    this.showAlert('Logout realizado','success');
  },

  // ========= Equipes (com sincronização) =========
  normalizeCode(code){ return (code||'').toString().trim().toUpperCase(); }

  async createTeam(){
    if(!this.state.currentUser) return this.showAlert('Usuário não autenticado','error');
    const name = document.getElementById('companyName')?.value?.trim();
    if(!name||name.length<3) return this.showAlert('Nome da empresa inválido','error');

    try{
      this.showLoading('Criando empresa...');
      // Gera código único (checa conflito remoto se online)
      let code;
      for(let i=0;i<10;i++){
        code = this.teamCode();
        if (this.state.online){
          const exists = await this.getTeamRemote(code);
          if (!exists) break; // não existe, pode usar
        } else {
          const existsLocal = this.getAllTeams().some(t=>t.code===code);
          if (!existsLocal) break;
        }
      }

      const team = {
        id: code, code,
        name,
        leader: this.state.currentUser.id,
        members: [{ id:this.state.currentUser.id, name:this.state.currentUser.name, email:this.state.currentUser.email, isLeader:true, joinedAt:new Date().toISOString() }],
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        status: 'active'
      };

      // Salva remoto se possível, sempre salva local como cache
      await this.saveTeam(team);
      this.state.currentTeam = team;
      this.hideLoading();
      this.showTeamStatus();
      this.showAlert(`Empresa "${name}" criada! Código: ${code}`,'success');
    }catch(e){
      this.hideLoading();
      this.showAlert('Erro ao criar empresa: '+e.message,'error');
    }
  },

  async joinTeam(){
    if(!this.state.currentUser) return this.showAlert('Usuário não autenticado','error');
    const raw = document.getElementById('teamCode')?.value;
    const code = this.normalizeCode(raw);
    if(!code || code.length!==6) return this.showAlert('Código deve ter 6 caracteres','error');

    try{
      this.showLoading('Buscando empresa...');
      // Busca remoto primeiro (se online), depois local
      let team = await this.getTeamRemote(code);
      if (!team) team = this.findTeamLocal(code);
      if (!team){ this.hideLoading(); return this.showAlert('Empresa não encontrada','error'); }

      // Já é membro?
      if (team.members.some(m=>m.id===this.state.currentUser.id)){
        this.state.currentTeam = team; this.hideLoading(); this.showTeamStatus(); return this.showAlert('Você já está nesta empresa','info');
      }

      // Limite
      if ((team.members?.length||0) >= 6){ this.hideLoading(); return this.showAlert('Empresa já tem 6 membros','error'); }

      // Adiciona e salva
      const member = { id:this.state.currentUser.id, name:this.state.currentUser.name, email:this.state.currentUser.email, isLeader:false, joinedAt:new Date().toISOString() };
      team.members.push(member);
      team.lastUpdated = new Date().toISOString();
      await this.saveTeam(team);
      this.state.currentTeam = team;
      this.hideLoading();
      this.showTeamStatus();
      this.showAlert(`Bem-vindo à ${team.name}!`,'success');
    }catch(e){
      this.hideLoading();
      this.showAlert('Erro ao entrar na empresa: '+e.message,'error');
    }
  },

  async saveTeam(team){
    // Salva remoto (quando online) e cache local (sempre)
    try{
      if (this.state.online){
        const ref = window.FB.doc('teams', team.code);
        await window.FB.set(ref, team);
      }
    }catch(e){ console.warn('⚠️ Falha remoto, usando cache local:', e.message); }

    const teams = this.getAllTeams();
    const i = teams.findIndex(t=>t.code===team.code);
    if (i>=0) teams[i] = team; else teams.push(team);
    localStorage.setItem('empresatec_teams', JSON.stringify(teams));
  },

  async getTeamRemote(code){
    try{
      if (!this.state.online) return null;
      const ref = window.FB.doc('teams', this.normalizeCode(code));
      const snap = await window.FB.get(ref);
      return snap.exists ? snap.data() : null;
    }catch(e){ console.warn('⚠️ getTeamRemote:', e.message); return null; }
  },

  getAllTeams(){
    try{ return JSON.parse(localStorage.getItem('empresatec_teams')||'[]'); }
    catch{ return []; }
  },

  findTeamLocal(code){ return this.getAllTeams().find(t=>t.code===this.normalizeCode(code))||null; },

  showTeamStatus(){
    const t = this.state.currentTeam; if (!t) return;
    const $(id)=>document.getElementById(id);
  },

  showTeamStatus(){
    const t = this.state.currentTeam; if (!t) return;
    const $ = (id)=>document.getElementById(id);
    $('teamStatus')?.classList.remove('hidden');
    $('teamName').textContent = t.name;
    $('teamCodeDisplay').textContent = t.code;
    const list = $('membersList');
    if (list){
      list.innerHTML='';
      t.members.forEach(m=>{
        const d = document.createElement('div');
        d.className = `member ${m.isLeader?'leader':''}`;
        d.innerHTML = `<span class="member-name">${m.name} ${m.isLeader?'👑':''}</span><span class="member-role">${m.isLeader?'Líder':'Membro'}</span>`;
        list.appendChild(d);
      })
    }
    const isLeader = t.leader===this.state.currentUser?.id;
    const hasMin = (t.members?.length||0)>=2;
    const ss = document.getElementById('startSection');
    if (ss){ if (isLeader && hasMin) ss.classList.remove('hidden'); else ss.classList.add('hidden'); }
  },

  copyTeamCode(){ const c=this.state.currentTeam?.code; if(!c) return; navigator.clipboard?.writeText(c).then(()=>this.showAlert('Código copiado!','success')); },

  // ========= Simulação =========
  startSimulation(){ if(!this.state.currentTeam) return this.showAlert('Nenhuma equipe','error'); this.showScreen('simulationScreen'); this.updateSimulationInfo(); this.goToPhase(1); this.loadQuestionnaire(); },
  updateSimulationInfo(){ const u=this.state.currentUser,t=this.state.currentTeam; const su=document.getElementById('simUserName'), st=document.getElementById('simTeamName'); if(su&&u) su.textContent='👤 '+u.name; if(st&&t) st.textContent='🏢 '+t.name; },
  goToPhase(n){ this.state.currentPhase=n; document.querySelectorAll('.phase-container').forEach(p=>p.classList.remove('active')); document.getElementById(`phase${n}`)?.classList.add('active'); const pf=document.getElementById('progressFill'); if(pf) pf.style.width = (((n-1)/4)*100)+'%'; const cp=document.getElementById('currentPhase'); if(cp) cp.textContent=n; },

  // ========= Questionário =========
  questions: [
    {id:1,text:'Ao iniciar um novo projeto empresarial, sua primeira ação é:',o:[['Definir visão estratégica','strategist'],['Pesquisar tecnologias inovadoras','innovator'],['Mapear processos e recursos','executor'],['Analisar dados de mercado','analyst'],['Identificar stakeholders','communicator']]},
    {id:2,text:'Sua maior contribuição em uma equipe empresarial é:',o:[['Liderar decisões estratégicas','strategist'],['Criar soluções inovadoras','innovator'],['Executar com eficiência','executor'],['Trazer análises precisas','analyst'],['Facilitar comunicação','communicator']]},
    {id:3,text:'Em uma reunião importante, você se destaca por:',o:[['Visão de futuro','strategist'],['Ideias disruptivas','innovator'],['Viabilidade prática','executor'],['Dados concretos','analyst'],['Mediação e alinhamento','communicator']]},
    {id:4,text:'Ao resolver problemas complexos, você prefere:',o:[['Analisar cenários futuros','strategist'],['Soluções tecnológicas','innovator'],['Etapas executáveis','executor'],['Modelos analíticos','analyst'],['Buscar consenso','communicator']]},
    {id:5,text:'O que mais motiva no ambiente empresarial?',o:[['Definir rumos','strategist'],['Criar algo novo','innovator'],['Ver resultados','executor'],['Descobrir insights','analyst'],['Construir relacionamentos','communicator']]},
    {id:6,text:'Em uma crise, sua reação natural é:',o:[['Redefinir prioridades','strategist'],['Buscar inovação','innovator'],['Otimizar recursos','executor'],['Analisar riscos','analyst'],['Comunicar e unir equipe','communicator']]},
    {id:7,text:'Sua área preferida é:',o:[['Estratégia e governança','strategist'],['P&D e novas tecnologias','innovator'],['Operações e processos','executor'],['Finanças e performance','analyst'],['Marketing e stakeholders','communicator']]},
    {id:8,text:'Ao liderar, você foca em:',o:[['Visão e objetivos','strategist'],['Criatividade','innovator'],['Processos claros','executor'],['Métricas e performance','analyst'],['Talentos e comunicação','communicator']]},
    {id:9,text:'Para decidir, você considera:',o:[['Visão de longo prazo','strategist'],['Diferenciação e inovação','innovator'],['Viabilidade operacional','executor'],['ROI e riscos','analyst'],['Impacto nos stakeholders','communicator']]},
    {id:10,text:'Objetivo ideal:',o:[['Ser CEO de corporação','strategist'],['Criar startup unicórnio','innovator'],['Excelência operacional','executor'],['Autoridade em análise','analyst'],['Marca pessoal influente','communicator']]}
  ],
  profiles:{
    strategist:{name:'Estrategista Empresarial',icon:'🎯',desc:'Planejamento estratégico e visão de longo prazo.'},
    innovator:{name:'Inovador Tecnológico',icon:'💡',desc:'Criatividade e soluções disruptivas.'},
    executor:{name:'Executor Operacional',icon:'⚡',desc:'Eficiência e implementação prática.'},
    analyst:{name:'Analista Financeiro',icon:'📊',desc:'Decisões orientadas por dados.'},
    communicator:{name:'Comunicador Estratégico',icon:'🎙️',desc:'Relacionamentos, marketing e vendas.'}
  },

  loadQuestionnaire(){ this.state.currentQuestion=0; this.state.userAnswers=[]; this.displayQuestion(); this.updateQProgress(); },
  displayQuestion(){ const q=this.questions[this.state.currentQuestion]; if(!q) return; const qt=document.getElementById('questionText'); const qo=document.getElementById('questionOptions'); if(qt) qt.textContent=q.text; if(qo){ qo.innerHTML=''; q.o.forEach((opt,i)=>{ const b=document.createElement('button'); b.className='question-option'; b.textContent=opt[0]; b.dataset.index=i; const ans=this.state.userAnswers[this.state.currentQuestion]; if(ans&&ans.i===i) b.classList.add('selected'); b.addEventListener('click',()=>this.selectOption(i)); qo.appendChild(b); }); } this.updateQNav(); },
  selectOption(i){ const q=this.questions[this.state.currentQuestion]; const opt=q.o[i]; this.state.userAnswers[this.state.currentQuestion]={ q:q.id, i, p:opt[1] }; document.querySelectorAll('.question-option').forEach(b=>b.classList.remove('selected')); document.querySelector(`[data-index="${i}"]`)?.classList.add('selected'); this.updateQNav(); this.saveState(); if(this.state.currentQuestion < this.questions.length-1){ setTimeout(()=>this.nextQuestion(),800); } },
  updateQProgress(){ const cq=document.getElementById('currentQ'); const tq=document.getElementById('totalQ'); const mp=document.getElementById('miniProgressFill'); if(cq) cq.textContent=this.state.currentQuestion+1; if(tq) tq.textContent=this.questions.length; if(mp) mp.style.width = (((this.state.currentQuestion+1)/this.questions.length)*100)+'%'; },
  updateQNav(){ const prev=document.getElementById('prevBtn'); const next=document.getElementById('nextBtn'); const fin=document.getElementById('finishBtn'); if(prev) prev.disabled = this.state.currentQuestion===0; const answered = !!this.state.userAnswers[this.state.currentQuestion]; if(next) next.disabled = !answered; const all = this.state.userAnswers.filter(a=>a).length===this.questions.length; const last = this.state.currentQuestion===this.questions.length-1; if(fin){ if(last && all){ fin.classList.remove('hidden'); fin.disabled=false; if(next) next.classList.add('hidden'); } else { fin.classList.add('hidden'); fin.disabled=true; if(next) next.classList.remove('hidden'); } } this.updateQProgress(); },
  nextQuestion(){ if(this.state.currentQuestion<this.questions.length-1){ this.state.currentQuestion++; this.displayQuestion(); } },
  prevQuestion(){ if(this.state.currentQuestion>0){ this.state.currentQuestion--; this.displayQuestion(); } },
  finishQuestionnaire(){ const all = this.state.userAnswers.filter(a=>a).length===this.questions.length; if(!all) return this.showAlert('Responda todas as perguntas','error'); const score={strategist:0,innovator:0,executor:0,analyst:0,communicator:0}; this.state.userAnswers.forEach(a=>{ if(a?.p) score[a.p]++; }); const top = Object.keys(score).reduce((a,b)=> score[a]>score[b]?a:b); const prof = this.profiles[top]; this.state.userProfile = { type:top, name:prof.name, icon:prof.icon, description:prof.desc, scores:score }; const pr=document.getElementById('profileResult'); if(pr){ pr.classList.remove('hidden'); document.getElementById('profileIcon').textContent=prof.icon; document.getElementById('profileName').textContent=prof.name; document.getElementById('profileDesc').textContent=prof.desc; const ps=document.getElementById('profileStrengths'); if(ps){ ps.innerHTML=''; this.getProfileStrengths(top).forEach(s=>{ const tag=document.createElement('span'); tag.className='strength-tag'; tag.textContent=s; ps.appendChild(tag); }) } }
    this.showAlert(`Seu perfil: ${prof.name}!`,'success');
  },
  getProfileStrengths(t){ const m={strategist:['Planejamento','Liderança','Visão','Análise'],innovator:['Criatividade','Tecnologia','Inovação','P&D'],executor:['Execução','Eficiência','Implementação','Resultados'],analyst:['Dados','Métricas','Finanças','Insights'],communicator:['Comunicação','Relacionamento','Marketing','Networking']}; return m[t]||['Habilidades']; },
  finishAct1(){ this.showAlert('Ato 1 concluído!','success'); if(this.state.currentTeam){ const t=this.state.currentTeam; t.act1Completed=true; t.lastUpdated=new Date().toISOString(); this.saveTeam(t); } setTimeout(()=>this.showScreen('teamScreen'),1500); },

  // ========= Professor =========
  async loadTeacherDashboard(){ this.updateTeacherStats(); this.loadTeamsList(); },
  updateTeacherStats(){ const teams=this.getAllTeams(); const students=teams.reduce((s,t)=>s+(t.members?.length||0),0); const tt=document.getElementById('totalTeams'); const ts=document.getElementById('totalStudents'); if(tt) tt.textContent=teams.length; if(ts) ts.textContent=students; },
  loadTeamsList(){ const el=document.getElementById('teamsList'); if(!el) return; const teams=this.getAllTeams(); if(!teams.length){ el.innerHTML='<div class="no-teams">📝 Nenhuma equipe criada ainda</div>'; return;} el.innerHTML=''; teams.forEach(t=>{ const d=document.createElement('div'); d.className='team-item'; d.innerHTML = `<div class="team-header"><h4>${t.name}</h4><span class="team-code">Código: ${t.code}</span></div><div class="team-info"><span>👥 ${t.members?.length||0} membros</span><span>📅 ${this.fmt(t.createdAt)}</span></div><div class="team-actions"><button class="btn btn--xs btn--outline" onclick="EmpresaTec.viewTeam('${t.code}')">👁️ Ver</button><button class="btn btn--xs btn--danger" onclick="EmpresaTec.deleteTeam('${t.code}')">🗑️ Excluir</button></div>`; el.appendChild(d); }); },
  viewTeam(code){ const t=this.findTeamLocal(code); if(!t) return this.showAlert('Equipe não encontrada','error'); const mem=t.members.map(m=>`• ${m.name} ${m.isLeader?'(Líder)':''}`).join('
'); alert(`🏢 ${t.name}
🎯 ${t.code}
👥 ${t.members.length}
📅 ${this.fmt(t.createdAt)}

${mem}`); },
  async deleteTeam(code){ if(!confirm(`Excluir ${code}?`)) return; const teams=this.getAllTeams().filter(t=>t.code!==code); localStorage.setItem('empresatec_teams', JSON.stringify(teams)); if(this.state.online){ try{ await window.FB.del(window.FB.doc('teams', this.normalizeCode(code))); }catch(e){ console.warn('⚠️ Falha ao remover remoto:', e.message); } } this.loadTeamsList(); this.updateTeacherStats(); this.showAlert('Empresa excluída','success'); },
  exportData(){ const teams=this.getAllTeams(); const data={ timestamp:new Date().toISOString(), totalTeams:teams.length, totalStudents:teams.reduce((s,t)=>s+(t.members?.length||0),0), teams }; const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`empresatec_export_${new Date().toISOString().slice(0,10)}.json`; a.click(); this.showAlert('Dados exportados','success'); },
  resetAllData(){ if(!confirm('Apagar TODOS os dados?')) return; if(!confirm('Confirma? Esta ação é irreversível.')) return; localStorage.removeItem('empresatec_teams'); localStorage.removeItem('empresatec_state'); this.loadTeamsList(); this.updateTeacherStats(); this.showAlert('Dados resetados','success'); },

  // ========= Storage / Estado =========
  saveState(){ try{ const s={...this.state}; delete s.teacherPassword; localStorage.setItem('empresatec_state', JSON.stringify(s)); }catch{} },
  loadState(){ try{ const s=localStorage.getItem('empresatec_state'); if(s){ const p=JSON.parse(s); const pw=this.state.teacherPassword; this.state={...this.state,...p,teacherPassword:pw}; } }catch{} },

  // ========= Util =========
  uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,9); },
  teamCode(){ const C='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; let r=''; for(let i=0;i<6;i++){ r+=C[Math.floor(Math.random()*C.length)]; } return r; },
  isValidEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); },
  fmt(d){ try{ return new Date(d).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});}catch{return 'N/A'} },

  // ========= UI =========
  showAlert(msg,type='info'){ const as=document.getElementById('alertSystem'); const ac=document.getElementById('alertContent'); const ai=document.getElementById('alertIcon'); const am=document.getElementById('alertMessage'); if(!as||!ac||!ai||!am){ alert(msg); return; } const icons={success:'✅',error:'❌',warning:'⚠️',info:'ℹ️'}; ai.textContent=icons[type]||icons.info; am.textContent=msg; ac.className = `alert-content ${type}`; as.classList.remove('hidden'); setTimeout(()=>this.hideAlert(),5000); },
  hideAlert(){ document.getElementById('alertSystem')?.classList.add('hidden'); },
  showLoading(t='Carregando...'){ const o=document.getElementById('loadingOverlay'); const lt=document.getElementById('loadingText'); o?.classList.remove('hidden'); if(lt) lt.textContent=t; },
  hideLoading(){ document.getElementById('loadingOverlay')?.classList.add('hidden'); },
  updateUserInfo(){ const el=document.getElementById('currentUserName'); if(el&&this.state.currentUser) el.textContent = '👤 '+this.state.currentUser.name; },

  // ========= Debug =========
  debug(){ console.log({state:this.state, teams:this.getAllTeams(), online:this.state.online}); return {state:this.state, teams:this.getAllTeams(), online:this.state.online}; },
  clearStorage(){ if(confirm('Limpar dados locais?')){ localStorage.clear(); location.reload(); } }
};

document.addEventListener('DOMContentLoaded', ()=>{ window.EmpresaTec = EmpresaTec; window.debug = EmpresaTec.debug.bind(EmpresaTec); EmpresaTec.init(); });
