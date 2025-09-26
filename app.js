/* EmpresaTec - Sistema de Simulação Empresarial */
/* JavaScript Revisado e Testado - Versão Estável */

// ===== SISTEMA PRINCIPAL ===== 
const EmpresaTec = {
    // Estado da aplicação
    state: {
        currentUser: null,
        currentTeam: null,
        currentScreen: 'loginScreen',
        currentPhase: 1,
        currentQuestion: 0,
        userAnswers: [],
        userProfile: null,
        teacherPassword: 'professor2025'
    },

    // Dados do questionário
    questionData: [
        {
            id: 1,
            text: "Ao iniciar um novo projeto empresarial, sua primeira ação é:",
            options: [
                { text: "Definir a visão estratégica e objetivos de longo prazo", profile: "strategist" },
                { text: "Pesquisar tecnologias inovadoras e oportunidades disruptivas", profile: "innovator" },
                { text: "Mapear processos operacionais e recursos necessários", profile: "executor" },
                { text: "Analisar dados de mercado e viabilidade financeira", profile: "analyst" },
                { text: "Identificar stakeholders e estratégias de comunicação", profile: "communicator" }
            ]
        },
        {
            id: 2,
            text: "Sua maior contribuição em uma equipe empresarial é:",
            options: [
                { text: "Liderar e tomar decisões estratégicas complexas", profile: "strategist" },
                { text: "Desenvolver soluções criativas e inovadoras", profile: "innovator" },
                { text: "Garantir execução eficiente e resultados práticos", profile: "executor" },
                { text: "Fornecer análises precisas baseadas em dados", profile: "analyst" },
                { text: "Facilitar comunicação e construir relacionamentos", profile: "communicator" }
            ]
        },
        {
            id: 3,
            text: "Em uma reunião de negócios importante, você se destaca por:",
            options: [
                { text: "Apresentar visões de futuro e direcionamentos estratégicos", profile: "strategist" },
                { text: "Propor ideias disruptivas e soluções tecnológicas", profile: "innovator" },
                { text: "Focar na viabilidade e implementação prática", profile: "executor" },
                { text: "Trazer dados concretos e análises fundamentadas", profile: "analyst" },
                { text: "Mediar discussões e alinhar expectativas", profile: "communicator" }
            ]
        },
        {
            id: 4,
            text: "Ao resolver problemas empresariais complexos, você prefere:",
            options: [
                { text: "Analisar impactos estratégicos e cenários futuros", profile: "strategist" },
                { text: "Buscar soluções não convencionais e tecnológicas", profile: "innovator" },
                { text: "Dividir em etapas executáveis e mensuráveis", profile: "executor" },
                { text: "Utilizar modelos analíticos e dados históricos", profile: "analyst" },
                { text: "Consultar stakeholders e buscar consenso", profile: "communicator" }
            ]
        },
        {
            id: 5,
            text: "O que mais te motiva no ambiente empresarial?",
            options: [
                { text: "Definir rumos e impactar o futuro da organização", profile: "strategist" },
                { text: "Criar produtos/serviços revolucionários", profile: "innovator" },
                { text: "Ver resultados concretos e operações eficientes", profile: "executor" },
                { text: "Descobrir insights valiosos através de análises", profile: "analyst" },
                { text: "Construir relacionamentos e expandir networks", profile: "communicator" }
            ]
        },
        {
            id: 6,
            text: "Em um cenário de crise empresarial, sua reação natural é:",
            options: [
                { text: "Reformular estratégias e redefinir prioridades", profile: "strategist" },
                { text: "Buscar oportunidades de inovação e adaptação", profile: "innovator" },
                { text: "Otimizar recursos e manter operações funcionando", profile: "executor" },
                { text: "Analisar cenários de risco e quantificar perdas", profile: "analyst" },
                { text: "Comunicar transparentemente e manter equipe unida", profile: "communicator" }
            ]
        },
        {
            id: 7,
            text: "Sua área de interesse e expertise preferida é:",
            options: [
                { text: "Planejamento estratégico e governança corporativa", profile: "strategist" },
                { text: "Pesquisa & desenvolvimento e novas tecnologias", profile: "innovator" },
                { text: "Operações e gestão de processos empresariais", profile: "executor" },
                { text: "Finanças e análise de performance empresarial", profile: "analyst" },
                { text: "Marketing e relacionamento com stakeholders", profile: "communicator" }
            ]
        },
        {
            id: 8,
            text: "Ao liderar uma equipe empresarial, você foca principalmente em:",
            options: [
                { text: "Alinhar visão estratégica e definir objetivos", profile: "strategist" },
                { text: "Estimular criatividade e pensamento inovador", profile: "innovator" },
                { text: "Estabelecer processos claros e metas alcançáveis", profile: "executor" },
                { text: "Monitorar métricas e performance da equipe", profile: "analyst" },
                { text: "Desenvolver talentos e facilitar comunicação", profile: "communicator" }
            ]
        },
        {
            id: 9,
            text: "Para tomar decisões empresariais importantes, você considera principalmente:",
            options: [
                { text: "Alinhamento com visão estratégica de longo prazo", profile: "strategist" },
                { text: "Potencial de diferenciação e inovação no mercado", profile: "innovator" },
                { text: "Viabilidade operacional e recursos disponíveis", profile: "executor" },
                { text: "ROI esperado e análise de riscos financeiros", profile: "analyst" },
                { text: "Impacto nos stakeholders e imagem da empresa", profile: "communicator" }
            ]
        },
        {
            id: 10,
            text: "Seu objetivo profissional ideal seria:",
            options: [
                { text: "Ser CEO de uma grande corporação multinacional", profile: "strategist" },
                { text: "Criar uma startup unicórnio revolucionária", profile: "innovator" },
                { text: "Ser reconhecido pela excelência operacional", profile: "executor" },
                { text: "Ser autoridade em análise financeira e estratégica", profile: "analyst" },
                { text: "Construir uma marca pessoal influente no mercado", profile: "communicator" }
            ]
        }
    ],

    // Perfis profissionais
    profiles: {
        strategist: {
            name: "Estrategista Empresarial",
            icon: "🎯",
            description: "Especialista em planejamento estratégico e visão de longo prazo. Excelente para liderar decisões complexas."
        },
        innovator: {
            name: "Inovador Tecnológico", 
            icon: "💡",
            description: "Criativo e visionário, especializado em desenvolvimento de produtos e soluções disruptivas."
        },
        executor: {
            name: "Executor Operacional",
            icon: "⚡",
            description: "Prático e eficiente, especializado em operações e implementação. Transforma ideias em realidade."
        },
        analyst: {
            name: "Analista Financeiro",
            icon: "📊", 
            description: "Orientado por dados, especializado em análises financeiras e inteligência de mercado."
        },
        communicator: {
            name: "Comunicador Estratégico",
            icon: "🎙️",
            description: "Especialista em relacionamentos, marketing e vendas. Excelente comunicação e networking."
        }
    },

    // ===== INICIALIZAÇÃO =====
    init() {
        console.log('🚀 Iniciando EmpresaTec');

        try {
            this.bindEvents();
            this.loadState();
            this.showScreen('loginScreen');
            console.log('✅ Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.showAlert('Erro ao inicializar sistema: ' + error.message, 'error');
        }
    },

    // ===== EVENT LISTENERS =====
    bindEvents() {
        console.log('🔗 Configurando event listeners');

        // Login Form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        } else {
            console.warn('⚠️ loginForm não encontrado');
        }

        // Teacher Button
        const teacherBtn = document.getElementById('teacherBtn');
        if (teacherBtn) {
            teacherBtn.addEventListener('click', () => {
                this.showScreen('teacherScreen');
            });
        }

        // Teacher Form
        const teacherForm = document.getElementById('teacherForm');
        if (teacherForm) {
            teacherForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleTeacherLogin();
            });
        }

        // Back to Login
        const backToLogin = document.getElementById('backToLogin');
        if (backToLogin) {
            backToLogin.addEventListener('click', () => {
                this.showScreen('loginScreen');
            });
        }

        // Logout buttons
        const logoutButtons = ['logoutBtn', 'logoutSim', 'logoutTeacher'];
        logoutButtons.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    this.handleLogout();
                });
            }
        });

        // Create Team Form
        const createTeamForm = document.getElementById('createTeamForm');
        if (createTeamForm) {
            createTeamForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createTeam();
            });
        }

        // Join Team Form
        const joinTeamForm = document.getElementById('joinTeamForm');
        if (joinTeamForm) {
            joinTeamForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.joinTeam();
            });
        }

        // Copy Button
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyTeamCode();
            });
        }

        // Start Button
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startSimulation();
            });
        }

        // Questionnaire Navigation
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const finishBtn = document.getElementById('finishBtn');
        const continueBtn = document.getElementById('continueBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevQuestion());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        if (finishBtn) {
            finishBtn.addEventListener('click', () => this.finishQuestionnaire());
        }
        if (continueBtn) {
            continueBtn.addEventListener('click', () => this.goToPhase(2));
        }

        // Phase Navigation
        const phaseButtons = ['nextPhase2', 'nextPhase3', 'nextPhase4', 'finishAct'];
        phaseButtons.forEach((id, index) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    if (id === 'finishAct') {
                        this.finishAct1();
                    } else {
                        this.goToPhase(index + 3);
                    }
                });
            }
        });

        // Teacher Dashboard
        const exportBtn = document.getElementById('exportBtn');
        const resetBtn = document.getElementById('resetBtn');

        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetAllData());
        }

        // Alert Close
        const alertClose = document.getElementById('alertClose');
        if (alertClose) {
            alertClose.addEventListener('click', () => {
                this.hideAlert();
            });
        }

        console.log('✅ Event listeners configurados');
    },

    // ===== NAVIGATION SYSTEM =====
    showScreen(screenId) {
        console.log(`📱 Mudando para tela: ${screenId}`);

        try {
            // Hide all screens
            const screens = document.querySelectorAll('.screen');
            screens.forEach(screen => {
                screen.classList.remove('active');
            });

            // Show target screen
            const targetScreen = document.getElementById(screenId);
            if (targetScreen) {
                targetScreen.classList.add('active');
                this.state.currentScreen = screenId;
                this.saveState();
            } else {
                console.error(`❌ Tela ${screenId} não encontrada`);
            }
        } catch (error) {
            console.error('❌ Erro ao mudar tela:', error);
        }
    },

    // ===== LOGIN SYSTEM ===== 
    handleLogin() {
        console.log('🔐 Processando login');

        const email = document.getElementById('loginEmail')?.value?.trim();
        const password = document.getElementById('loginPassword')?.value?.trim();

        if (!email || !password) {
            this.showAlert('Preencha todos os campos', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showAlert('Email inválido', 'error');
            return;
        }

        try {
            this.showLoading('Fazendo login...');

            // Create user
            this.state.currentUser = {
                id: this.generateId(),
                email: email,
                name: email.split('@')[0]
            };

            console.log('👤 Usuário criado:', this.state.currentUser);

            this.hideLoading();
            this.showAlert('Login realizado com sucesso!', 'success');
            this.showScreen('teamScreen');
            this.updateUserInfo();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro no login:', error);
            this.showAlert('Erro no login: ' + error.message, 'error');
        }
    },

    handleTeacherLogin() {
        console.log('👩‍🏫 Login do professor');

        const password = document.getElementById('teacherPassword')?.value?.trim();

        if (!password) {
            this.showAlert('Digite a senha', 'error');
            return;
        }

        if (password !== this.state.teacherPassword) {
            this.showAlert('Senha incorreta!', 'error');
            return;
        }

        try {
            // Show teacher dashboard
            const teacherLogin = document.querySelector('.teacher-login');
            const teacherDashboard = document.getElementById('teacherDashboard');

            if (teacherLogin) teacherLogin.style.display = 'none';
            if (teacherDashboard) teacherDashboard.classList.remove('hidden');

            this.loadTeacherDashboard();
            this.showAlert('Bem-vindo ao painel administrativo!', 'success');

        } catch (error) {
            console.error('❌ Erro no login do professor:', error);
            this.showAlert('Erro no login: ' + error.message, 'error');
        }
    },

    handleLogout() {
        if (!confirm('Deseja realmente sair?')) {
            return;
        }

        try {
            // Reset state
            this.state = {
                currentUser: null,
                currentTeam: null,
                currentScreen: 'loginScreen',
                currentPhase: 1,
                currentQuestion: 0,
                userAnswers: [],
                userProfile: null,
                teacherPassword: 'professor2025'
            };

            // Clear storage
            localStorage.removeItem('empresatec_state');

            // Reset forms
            const forms = document.querySelectorAll('form');
            forms.forEach(form => form.reset());

            // Hide teacher dashboard
            const teacherDashboard = document.getElementById('teacherDashboard');
            const teacherLogin = document.querySelector('.teacher-login');
            if (teacherDashboard) teacherDashboard.classList.add('hidden');
            if (teacherLogin) teacherLogin.style.display = 'block';

            this.showScreen('loginScreen');
            this.showAlert('Logout realizado com sucesso!', 'success');

        } catch (error) {
            console.error('❌ Erro no logout:', error);
            this.showAlert('Erro no logout: ' + error.message, 'error');
        }
    },

    // ===== TEAM MANAGEMENT =====
    createTeam() {
        console.log('🏗️ Criando equipe');

        if (!this.state.currentUser) {
            this.showAlert('Erro: usuário não autenticado', 'error');
            return;
        }

        const companyName = document.getElementById('companyName')?.value?.trim();

        if (!companyName) {
            this.showAlert('Digite o nome da empresa', 'error');
            return;
        }

        if (companyName.length < 3) {
            this.showAlert('Nome deve ter pelo menos 3 caracteres', 'error');
            return;
        }

        try {
            this.showLoading('Criando empresa...');

            const teamCode = this.generateTeamCode();
            const newTeam = {
                id: teamCode,
                name: companyName,
                code: teamCode,
                leader: this.state.currentUser.id,
                members: [{
                    id: this.state.currentUser.id,
                    name: this.state.currentUser.name,
                    email: this.state.currentUser.email,
                    isLeader: true,
                    joinedAt: new Date().toISOString()
                }],
                createdAt: new Date().toISOString(),
                status: 'active'
            };

            // Save team
            this.saveTeam(newTeam);
            this.state.currentTeam = newTeam;

            this.hideLoading();
            this.showAlert(`Empresa "${companyName}" criada! Código: ${teamCode}`, 'success');
            this.showTeamStatus();

            console.log('✅ Equipe criada:', newTeam);

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao criar equipe:', error);
            this.showAlert('Erro ao criar empresa: ' + error.message, 'error');
        }
    },

    joinTeam() {
        console.log('🤝 Entrando em equipe');

        if (!this.state.currentUser) {
            this.showAlert('Erro: usuário não autenticado', 'error');
            return;
        }

        const teamCode = document.getElementById('teamCode')?.value?.trim()?.toUpperCase();

        if (!teamCode) {
            this.showAlert('Digite o código da empresa', 'error');
            return;
        }

        if (teamCode.length !== 6) {
            this.showAlert('Código deve ter 6 caracteres', 'error');
            return;
        }

        try {
            this.showLoading('Buscando empresa...');

            const team = this.findTeam(teamCode);

            if (!team) {
                this.hideLoading();
                this.showAlert('Empresa não encontrada', 'error');
                return;
            }

            // Check if already member
            const isMember = team.members.some(m => m.id === this.state.currentUser.id);
            if (isMember) {
                this.hideLoading();
                this.state.currentTeam = team;
                this.showAlert('Você já faz parte desta empresa!', 'info');
                this.showTeamStatus();
                return;
            }

            // Check member limit
            if (team.members.length >= 6) {
                this.hideLoading();
                this.showAlert('Empresa já tem o máximo de 6 membros', 'error');
                return;
            }

            // Add member
            const newMember = {
                id: this.state.currentUser.id,
                name: this.state.currentUser.name,
                email: this.state.currentUser.email,
                isLeader: false,
                joinedAt: new Date().toISOString()
            };

            team.members.push(newMember);
            this.saveTeam(team);
            this.state.currentTeam = team;

            this.hideLoading();
            this.showAlert(`Bem-vindo à ${team.name}!`, 'success');
            this.showTeamStatus();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao entrar na equipe:', error);
            this.showAlert('Erro ao entrar na empresa: ' + error.message, 'error');
        }
    },

    showTeamStatus() {
        console.log('📊 Mostrando status da equipe');

        const teamStatus = document.getElementById('teamStatus');
        const teamName = document.getElementById('teamName');
        const teamCodeDisplay = document.getElementById('teamCodeDisplay');
        const membersList = document.getElementById('membersList');
        const startSection = document.getElementById('startSection');

        if (!this.state.currentTeam) {
            console.warn('⚠️ Nenhuma equipe para mostrar');
            return;
        }

        try {
            // Show team status
            if (teamStatus) teamStatus.classList.remove('hidden');

            // Team name
            if (teamName) teamName.textContent = this.state.currentTeam.name;

            // Team code
            if (teamCodeDisplay) teamCodeDisplay.textContent = this.state.currentTeam.code;

            // Members list
            if (membersList) {
                membersList.innerHTML = '';
                this.state.currentTeam.members.forEach(member => {
                    const memberDiv = document.createElement('div');
                    memberDiv.className = `member ${member.isLeader ? 'leader' : ''}`;
                    memberDiv.innerHTML = `
                        <span class="member-name">${member.name} ${member.isLeader ? '👑' : ''}</span>
                        <span class="member-role">${member.isLeader ? 'Líder' : 'Membro'}</span>
                    `;
                    membersList.appendChild(memberDiv);
                });
            }

            // Start button (only for leader with min 2 members)
            if (startSection) {
                const isLeader = this.state.currentTeam.leader === this.state.currentUser.id;
                const hasMinMembers = this.state.currentTeam.members.length >= 2;

                if (isLeader && hasMinMembers) {
                    startSection.classList.remove('hidden');
                } else {
                    startSection.classList.add('hidden');
                }
            }

        } catch (error) {
            console.error('❌ Erro ao mostrar status da equipe:', error);
        }
    },

    copyTeamCode() {
        const code = this.state.currentTeam?.code;
        if (!code) return;

        try {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(() => {
                    this.showAlert('Código copiado!', 'success');
                });
            } else {
                // Fallback
                const textArea = document.createElement('textarea');
                textArea.value = code;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                this.showAlert('Código copiado!', 'success');
            }
        } catch (error) {
            console.error('❌ Erro ao copiar código:', error);
            this.showAlert('Erro ao copiar código', 'error');
        }
    },

    // ===== SIMULATION SYSTEM =====
    startSimulation() {
        console.log('🎮 Iniciando simulação');

        if (!this.state.currentTeam) {
            this.showAlert('Erro: nenhuma equipe selecionada', 'error');
            return;
        }

        try {
            this.showScreen('simulationScreen');
            this.updateSimulationInfo();
            this.goToPhase(1);
            this.loadQuestionnaire();

        } catch (error) {
            console.error('❌ Erro ao iniciar simulação:', error);
            this.showAlert('Erro ao iniciar simulação: ' + error.message, 'error');
        }
    },

    goToPhase(phaseNumber) {
        console.log(`📋 Indo para fase ${phaseNumber}`);

        try {
            this.state.currentPhase = phaseNumber;

            // Hide all phases
            const phases = document.querySelectorAll('.phase-container');
            phases.forEach(phase => {
                phase.classList.remove('active');
            });

            // Show current phase
            const currentPhase = document.getElementById(`phase${phaseNumber}`);
            if (currentPhase) {
                currentPhase.classList.add('active');
            }

            // Update progress
            this.updateProgress();

            // Load phase content
            if (phaseNumber === 1) {
                this.loadQuestionnaire();
            }

        } catch (error) {
            console.error('❌ Erro ao mudar fase:', error);
        }
    },

    updateProgress() {
        const currentPhaseEl = document.getElementById('currentPhase');
        const progressFill = document.getElementById('progressFill');

        if (currentPhaseEl) {
            currentPhaseEl.textContent = this.state.currentPhase;
        }

        if (progressFill) {
            const progress = ((this.state.currentPhase - 1) / 4) * 100;
            progressFill.style.width = `${progress}%`;
        }
    },

    updateSimulationInfo() {
        const simUserName = document.getElementById('simUserName');
        const simTeamName = document.getElementById('simTeamName');

        if (simUserName && this.state.currentUser) {
            simUserName.textContent = `👤 ${this.state.currentUser.name}`;
        }

        if (simTeamName && this.state.currentTeam) {
            simTeamName.textContent = `🏢 ${this.state.currentTeam.name}`;
        }
    },

    updateUserInfo() {
        const currentUserName = document.getElementById('currentUserName');

        if (currentUserName && this.state.currentUser) {
            currentUserName.textContent = `👤 ${this.state.currentUser.name}`;
        }
    },
    // ===== QUESTIONNAIRE SYSTEM =====
    loadQuestionnaire() {
        console.log('🧠 Carregando questionário');

        try {
            this.state.currentQuestion = 0;
            this.state.userAnswers = [];
            this.displayQuestion();
            this.updateQuestionProgress();

        } catch (error) {
            console.error('❌ Erro ao carregar questionário:', error);
        }
    },

    displayQuestion() {
        const question = this.questionData[this.state.currentQuestion];
        if (!question) return;

        try {
            const questionText = document.getElementById('questionText');
            const questionOptions = document.getElementById('questionOptions');

            if (questionText) {
                questionText.textContent = question.text;
            }

            if (questionOptions) {
                questionOptions.innerHTML = '';

                question.options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.className = 'question-option';
                    button.textContent = option.text;
                    button.dataset.index = index;

                    // Check if already answered
                    const currentAnswer = this.state.userAnswers[this.state.currentQuestion];
                    if (currentAnswer && currentAnswer.optionIndex === index) {
                        button.classList.add('selected');
                    }

                    button.addEventListener('click', () => {
                        this.selectOption(index);
                    });

                    questionOptions.appendChild(button);
                });
            }

            this.updateQuestionNavigation();

        } catch (error) {
            console.error('❌ Erro ao exibir pergunta:', error);
        }
    },

    selectOption(optionIndex) {
        console.log(`Selecionada opção ${optionIndex}`);

        try {
            const question = this.questionData[this.state.currentQuestion];
            const option = question.options[optionIndex];

            // Save answer
            this.state.userAnswers[this.state.currentQuestion] = {
                questionId: question.id,
                optionIndex: optionIndex,
                option: option
            };

            // Update UI
            const buttons = document.querySelectorAll('.question-option');
            buttons.forEach(btn => btn.classList.remove('selected'));

            const selectedButton = document.querySelector(`[data-index="${optionIndex}"]`);
            if (selectedButton) {
                selectedButton.classList.add('selected');
            }

            this.updateQuestionNavigation();
            this.saveState();

            // Auto advance if not last question
            if (this.state.currentQuestion < this.questionData.length - 1) {
                setTimeout(() => {
                    this.nextQuestion();
                }, 800);
            }

        } catch (error) {
            console.error('❌ Erro ao selecionar opção:', error);
        }
    },

    updateQuestionProgress() {
        const currentQ = document.getElementById('currentQ');
        const totalQ = document.getElementById('totalQ');
        const miniProgressFill = document.getElementById('miniProgressFill');

        if (currentQ) {
            currentQ.textContent = this.state.currentQuestion + 1;
        }

        if (totalQ) {
            totalQ.textContent = this.questionData.length;
        }

        if (miniProgressFill) {
            const progress = ((this.state.currentQuestion + 1) / this.questionData.length) * 100;
            miniProgressFill.style.width = `${progress}%`;
        }
    },

    updateQuestionNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const finishBtn = document.getElementById('finishBtn');

        // Previous button
        if (prevBtn) {
            prevBtn.disabled = this.state.currentQuestion === 0;
        }

        // Check if current question is answered
        const isAnswered = this.state.userAnswers[this.state.currentQuestion];

        // Next button
        if (nextBtn) {
            nextBtn.disabled = !isAnswered;
        }

        // Finish button (show only on last question if all answered)
        if (finishBtn) {
            const allAnswered = this.state.userAnswers.filter(a => a).length === this.questionData.length;
            const isLastQuestion = this.state.currentQuestion === this.questionData.length - 1;

            if (isLastQuestion && allAnswered) {
                finishBtn.classList.remove('hidden');
                if (nextBtn) nextBtn.classList.add('hidden');
            } else {
                finishBtn.classList.add('hidden');
                if (nextBtn) nextBtn.classList.remove('hidden');
            }
        }
    },

    nextQuestion() {
        if (this.state.currentQuestion < this.questionData.length - 1) {
            this.state.currentQuestion++;
            this.displayQuestion();
            this.updateQuestionProgress();
        }
    },

    prevQuestion() {
        if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.displayQuestion();
            this.updateQuestionProgress();
        }
    },

    finishQuestionnaire() {
        console.log('🎯 Finalizando questionário');

        try {
            const allAnswered = this.state.userAnswers.filter(a => a).length === this.questionData.length;

            if (!allAnswered) {
                this.showAlert('Responda todas as perguntas primeiro', 'error');
                return;
            }

            this.showLoading('Analisando perfil...');

            const profile = this.calculateProfile();
            this.state.userProfile = profile;

            this.displayProfileResult(profile);

            this.hideLoading();
            this.showAlert(`Seu perfil: ${profile.name}!`, 'success');

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao finalizar questionário:', error);
            this.showAlert('Erro ao processar perfil: ' + error.message, 'error');
        }
    },

    calculateProfile() {
        const scores = {
            strategist: 0,
            innovator: 0,
            executor: 0,
            analyst: 0,
            communicator: 0
        };

        // Count profile occurrences
        this.state.userAnswers.forEach(answer => {
            if (answer && answer.option && answer.option.profile) {
                scores[answer.option.profile]++;
            }
        });

        // Find dominant profile
        const dominantProfile = Object.keys(scores).reduce((a, b) => 
            scores[a] > scores[b] ? a : b
        );

        return {
            type: dominantProfile,
            ...this.profiles[dominantProfile],
            scores: scores
        };
    },

    displayProfileResult(profile) {
        try {
            const profileResult = document.getElementById('profileResult');
            const profileIcon = document.getElementById('profileIcon');
            const profileName = document.getElementById('profileName');
            const profileDesc = document.getElementById('profileDesc');
            const profileStrengths = document.getElementById('profileStrengths');

            if (profileResult) profileResult.classList.remove('hidden');
            if (profileIcon) profileIcon.textContent = profile.icon;
            if (profileName) profileName.textContent = profile.name;
            if (profileDesc) profileDesc.textContent = profile.description;

            if (profileStrengths) {
                profileStrengths.innerHTML = '';

                // Add some example strengths based on profile
                const strengths = this.getProfileStrengths(profile.type);
                strengths.forEach(strength => {
                    const span = document.createElement('span');
                    span.className = 'strength-tag';
                    span.textContent = strength;
                    profileStrengths.appendChild(span);
                });
            }

        } catch (error) {
            console.error('❌ Erro ao exibir resultado do perfil:', error);
        }
    },

    getProfileStrengths(profileType) {
        const strengthsMap = {
            strategist: ['Planejamento', 'Liderança', 'Visão de Futuro', 'Análise'],
            innovator: ['Criatividade', 'Tecnologia', 'Inovação', 'Desenvolvimento'],
            executor: ['Execução', 'Eficiência', 'Implementação', 'Resultados'],
            analyst: ['Análise', 'Dados', 'Métricas', 'Finanças'],
            communicator: ['Comunicação', 'Relacionamento', 'Marketing', 'Networking']
        };

        return strengthsMap[profileType] || ['Habilidades Gerais'];
    },

    finishAct1() {
        console.log('🎉 Finalizando Ato 1');

        try {
            this.showAlert('Ato 1 concluído com sucesso!', 'success');

            // Here you would normally save the completion status
            if (this.state.currentTeam) {
                this.state.currentTeam.act1Completed = true;
                this.saveTeam(this.state.currentTeam);
            }

            // For now, just return to team screen
            setTimeout(() => {
                this.showScreen('teamScreen');
            }, 2000);

        } catch (error) {
            console.error('❌ Erro ao finalizar Ato 1:', error);
            this.showAlert('Erro ao finalizar Ato 1: ' + error.message, 'error');
        }
    },

    // ===== TEACHER DASHBOARD =====
    loadTeacherDashboard() {
        console.log('👩‍🏫 Carregando dashboard do professor');

        try {
            this.updateTeacherStats();
            this.loadTeamsList();

        } catch (error) {
            console.error('❌ Erro ao carregar dashboard:', error);
        }
    },

    updateTeacherStats() {
        const totalTeams = document.getElementById('totalTeams');
        const totalStudents = document.getElementById('totalStudents');

        const teams = this.getAllTeams();
        const teamCount = teams.length;
        const studentCount = teams.reduce((sum, team) => sum + team.members.length, 0);

        if (totalTeams) totalTeams.textContent = teamCount;
        if (totalStudents) totalStudents.textContent = studentCount;
    },

    loadTeamsList() {
        const teamsList = document.getElementById('teamsList');
        if (!teamsList) return;

        const teams = this.getAllTeams();

        if (teams.length === 0) {
            teamsList.innerHTML = '<div class="no-teams">📝 Nenhuma equipe criada ainda</div>';
            return;
        }

        teamsList.innerHTML = '';

        teams.forEach(team => {
            const teamDiv = document.createElement('div');
            teamDiv.className = 'team-item';
            teamDiv.innerHTML = `
                <div class="team-header">
                    <h4>${team.name}</h4>
                    <span class="team-code">Código: ${team.code}</span>
                </div>
                <div class="team-info">
                    <span>👥 ${team.members.length} membros</span>
                    <span>📅 ${this.formatDate(team.createdAt)}</span>
                </div>
                <div class="team-actions">
                    <button class="btn btn--xs btn--outline" onclick="EmpresaTec.viewTeam('${team.code}')">
                        👁️ Ver
                    </button>
                    <button class="btn btn--xs btn--danger" onclick="EmpresaTec.deleteTeam('${team.code}')">
                        🗑️ Excluir
                    </button>
                </div>
            `;
            teamsList.appendChild(teamDiv);
        });
    },

    viewTeam(teamCode) {
        const team = this.findTeam(teamCode);
        if (!team) {
            this.showAlert('Equipe não encontrada', 'error');
            return;
        }

        const membersList = team.members.map(m => 
            `• ${m.name} ${m.isLeader ? '(Líder)' : ''}`
        ).join('\n');

        const info = `🏢 Empresa: ${team.name}
🎯 Código: ${team.code}
👥 Membros: ${team.members.length}
📅 Criada: ${this.formatDate(team.createdAt)}

Membros:
${membersList}`;

        alert(info);
    },

    deleteTeam(teamCode) {
        if (!confirm(`Excluir a empresa ${teamCode}? Esta ação não pode ser desfeita.`)) {
            return;
        }

        try {
            const teams = this.getAllTeams();
            const updatedTeams = teams.filter(team => team.code !== teamCode);
            localStorage.setItem('empresatec_teams', JSON.stringify(updatedTeams));

            this.loadTeamsList();
            this.updateTeacherStats();
            this.showAlert(`Empresa ${teamCode} excluída com sucesso!`, 'success');

        } catch (error) {
            console.error('❌ Erro ao excluir equipe:', error);
            this.showAlert('Erro ao excluir equipe: ' + error.message, 'error');
        }
    },

    exportData() {
        try {
            const teams = this.getAllTeams();
            const data = {
                timestamp: new Date().toISOString(),
                teams: teams,
                totalTeams: teams.length,
                totalStudents: teams.reduce((sum, team) => sum + team.members.length, 0)
            };

            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `empresatec_export_${new Date().toISOString().split('T')[0]}.json`;
            link.click();

            this.showAlert('Dados exportados com sucesso!', 'success');

        } catch (error) {
            console.error('❌ Erro ao exportar:', error);
            this.showAlert('Erro ao exportar dados: ' + error.message, 'error');
        }
    },

    resetAllData() {
        if (!confirm('⚠️ ATENÇÃO: Isto irá apagar TODOS os dados! Continuar?')) {
            return;
        }

        if (!confirm('🚨 CONFIRMAÇÃO FINAL: Todos os dados serão perdidos!')) {
            return;
        }

        try {
            localStorage.removeItem('empresatec_teams');
            localStorage.removeItem('empresatec_state');

            this.loadTeamsList();
            this.updateTeacherStats();

            this.showAlert('🎯 Todos os dados foram resetados!', 'success');

        } catch (error) {
            console.error('❌ Erro ao resetar:', error);
            this.showAlert('Erro ao resetar dados: ' + error.message, 'error');
        }
    },

    // ===== STORAGE FUNCTIONS =====
    saveTeam(team) {
        try {
            const teams = this.getAllTeams();
            const existingIndex = teams.findIndex(t => t.code === team.code);

            if (existingIndex >= 0) {
                teams[existingIndex] = team;
            } else {
                teams.push(team);
            }

            localStorage.setItem('empresatec_teams', JSON.stringify(teams));
            console.log(`💾 Equipe ${team.code} salva`);

        } catch (error) {
            console.error('❌ Erro ao salvar equipe:', error);
            throw error;
        }
    },

    findTeam(teamCode) {
        try {
            const teams = this.getAllTeams();
            return teams.find(team => team.code === teamCode) || null;

        } catch (error) {
            console.error('❌ Erro ao buscar equipe:', error);
            return null;
        }
    },

    getAllTeams() {
        try {
            const teamsData = localStorage.getItem('empresatec_teams');
            return teamsData ? JSON.parse(teamsData) : [];

        } catch (error) {
            console.error('❌ Erro ao carregar equipes:', error);
            return [];
        }
    },

    saveState() {
        try {
            const stateToSave = {
                ...this.state,
                // Don't save sensitive data
                teacherPassword: undefined
            };
            localStorage.setItem('empresatec_state', JSON.stringify(stateToSave));

        } catch (error) {
            console.error('❌ Erro ao salvar estado:', error);
        }
    },

    loadState() {
        try {
            const savedState = localStorage.getItem('empresatec_state');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                // Restore state but keep original teacher password
                const originalPassword = this.state.teacherPassword;
                Object.assign(this.state, parsedState);
                this.state.teacherPassword = originalPassword;

                console.log('📂 Estado carregado');
            }

        } catch (error) {
            console.error('❌ Erro ao carregar estado:', error);
        }
    },

    // ===== UTILITY FUNCTIONS =====
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    },

    generateTeamCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Data inválida';
        }
    },

    // ===== UI HELPERS =====
    showAlert(message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);

        const alertSystem = document.getElementById('alertSystem');
        const alertContent = document.getElementById('alertContent');
        const alertIcon = document.getElementById('alertIcon');
        const alertMessage = document.getElementById('alertMessage');

        if (!alertSystem || !alertContent || !alertIcon || !alertMessage) {
            // Fallback to browser alert
            alert(message);
            return;
        }

        try {
            // Icons by type
            const icons = {
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️'
            };

            // Update content
            alertIcon.textContent = icons[type] || icons.info;
            alertMessage.textContent = message;
            alertContent.className = `alert-content ${type}`;

            // Show alert
            alertSystem.classList.remove('hidden');

            // Auto hide after 5 seconds
            setTimeout(() => {
                this.hideAlert();
            }, 5000);

        } catch (error) {
            console.error('❌ Erro ao mostrar alerta:', error);
            alert(message); // Fallback
        }
    },

    hideAlert() {
        const alertSystem = document.getElementById('alertSystem');
        if (alertSystem) {
            alertSystem.classList.add('hidden');
        }
    },

    showLoading(message = 'Carregando...') {
        const loadingOverlay = document.getElementById('loadingOverlay');
        const loadingText = document.getElementById('loadingText');

        if (loadingOverlay) loadingOverlay.classList.remove('hidden');
        if (loadingText) loadingText.textContent = message;

        console.log(`⏳ ${message}`);
    },

    hideLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) loadingOverlay.classList.add('hidden');

        console.log('✅ Loading concluído');
    },

    // ===== DEBUG HELPERS =====
    debug() {
        console.log('🐛 === DEBUG EMPRESATEC ===');
        console.log('Estado atual:', this.state);
        console.log('Equipes:', this.getAllTeams());

        return {
            state: this.state,
            teams: this.getAllTeams()
        };
    },

    clearStorage() {
        if (confirm('Limpar todos os dados salvos?')) {
            localStorage.clear();
            location.reload();
        }
    }
};

// ===== AUTO INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 EmpresaTec - Sistema Empresarial Educacional');
    console.log('📅 Data:', new Date().toLocaleString('pt-BR'));

    try {
        EmpresaTec.init();

        // Make available globally for debugging
        window.EmpresaTec = EmpresaTec;
        window.debug = EmpresaTec.debug.bind(EmpresaTec);

        console.log('✅ Sistema inicializado com sucesso!');
        console.log('🔧 Para debug, use: debug() no console');

    } catch (error) {
        console.error('❌ Erro crítico na inicialização:', error);
        alert('Erro ao inicializar sistema. Verifique o console para mais detalhes.');
    }
});

// Make globally available
window.EmpresaTec = EmpresaTec;
