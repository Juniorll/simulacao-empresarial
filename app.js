/* EmpresaTec - Sistema de Simulação Empresarial */
/* JavaScript Completo com Sincronização Real Entre Navegadores */

// ===== CONFIGURAÇÃO GLOBAL =====
const EmpresaTec = {
    // Estado da aplicação
    state: {
        currentUser: null,
        currentTeam: null,
        currentScreen: 'loginScreen',
        currentAct: 1,
        currentPhase: 1,
        isTeacher: false,
        isAuthenticated: false,
        isOnline: false, // NOVO: status de conexão
        syncInterval: null, // NOVO: intervalo de sincronização

        // Dados do questionário
        currentQuestion: 0,
        userAnswers: [],
        userProfile: null,

        // Dados da equipe
        selectedSegment: null,
        selectedCeo: null,
        selectedLocation: null,
        selectedEquipment: [],

        // Orçamento e pontuação
        totalBudget: 500000,
        currentSpending: 0,
        teamScore: 0,

        // Controles do professor
        teacherPassword: 'professor2025',
        approvedActs: {
            act1: false, act2: false, act3: false, act4: false, act5: false
        }
    },

    // Dados do jogo
    data: {
        // Perfis profissionais
        profiles: {
            strategist: {
                name: "Estrategista Empresarial",
                icon: "🎯",
                description: "Especialista em planejamento estratégico e visão de longo prazo. Excelente para liderar decisões complexas.",
                strengths: ["Planejamento Estratégico", "Análise de Mercado", "Liderança", "Visão de Futuro"],
                bonus: { decision_making: 25, team_collaboration: 15 }
            },
            innovator: {
                name: "Inovador Tecnológico", 
                icon: "💡",
                description: "Criativo e visionário, especializado em desenvolvimento de produtos e soluções disruptivas.",
                strengths: ["Inovação", "Tecnologia", "Criatividade", "Desenvolvimento"],
                bonus: { technology_adoption: 25, quality_processes: 15 }
            },
            executor: {
                name: "Executor Operacional",
                icon: "⚡",
                description: "Prático e eficiente, especializado em operações e implementação. Transforma ideias em realidade.",
                strengths: ["Execução", "Operações", "Eficiência", "Implementação"],
                bonus: { cost_efficiency: 25, quality_processes: 20 }
            },
            analyst: {
                name: "Analista Financeiro",
                icon: "📊", 
                description: "Orientado por dados, especializado em análises financeiras e inteligência de mercado.",
                strengths: ["Análise Financeira", "Dados", "Métricas", "Planejamento"],
                bonus: { cost_efficiency: 30, decision_making: 15 }
            },
            communicator: {
                name: "Comunicador Estratégico",
                icon: "🎙️",
                description: "Especialista em relacionamentos, marketing e vendas. Excelente comunicação e networking.",
                strengths: ["Comunicação", "Marketing", "Vendas", "Relacionamento"],
                bonus: { team_collaboration: 25, decision_making: 10 }
            }
        },

        // Segmentos empresariais
        segments: {
            fintech: {
                name: "Fintech",
                icon: "💳",
                description: "Tecnologia Financeira - Soluções digitais para pagamentos, investimentos e serviços bancários.",
                marketSize: "R$ 4,8 bilhões",
                growth: "35% ao ano",
                investment: 150000,
                challenges: ["Regulamentação rigorosa", "Segurança de dados", "Competição bancária"],
                opportunities: ["Open Banking", "PIX", "Criptomoedas", "Inclusão financeira"]
            },
            edtech: {
                name: "Edtech", 
                icon: "📚",
                description: "Tecnologia Educacional - Plataformas de ensino e soluções de aprendizado digital.",
                marketSize: "R$ 5,6 bilhões",
                growth: "28% ao ano", 
                investment: 120000,
                challenges: ["Adoção institucional", "Engajamento estudantil", "Modelo pedagógico"],
                opportunities: ["Ensino híbrido", "Microlearning", "IA educacional", "Certificações"]
            },
            healthtech: {
                name: "Healthtech",
                icon: "🏥",
                description: "Tecnologia em Saúde - Telemedicina, diagnósticos e gestão hospitalar.", 
                marketSize: "R$ 3,2 bilhões",
                growth: "42% ao ano",
                investment: 180000,
                challenges: ["Regulamentação médica", "Integração sistemas", "Privacidade"],
                opportunities: ["Telemedicina", "Wearables", "IA diagnóstica", "Prontuário eletrônico"]
            },
            agtech: {
                name: "Agtech",
                icon: "🚜", 
                description: "Tecnologia Agrícola - IoT rural, drones e otimização de cultivos.",
                marketSize: "R$ 2,1 bilhões",
                growth: "30% ao ano",
                investment: 140000,
                challenges: ["Conectividade rural", "Adoção tecnológica", "Investimento inicial"],
                opportunities: ["Agricultura de precisão", "Sustentabilidade", "IoT", "Biotecnologia"]
            },
            foodtech: {
                name: "Foodtech",
                icon: "🍔",
                description: "Tecnologia Alimentar - Delivery, agricultura vertical e alimentos alternativos.",
                marketSize: "R$ 2,8 bilhões", 
                growth: "25% ao ano",
                investment: 100000,
                challenges: ["Logística complexa", "Sustentabilidade", "Regulamentação sanitária"],
                opportunities: ["Dark kitchens", "Plant-based", "Automação", "Delivery"]
            }
        },

        // Questionário de perfil
        questions: [
            {
                id: 1,
                text: "Ao iniciar um novo projeto empresarial, sua primeira ação é:",
                options: [
                    { text: "Definir a visão estratégica e objetivos de longo prazo", profile: "strategist", weight: 3 },
                    { text: "Pesquisar tecnologias inovadoras e oportunidades disruptivas", profile: "innovator", weight: 3 },
                    { text: "Mapear processos operacionais e recursos necessários", profile: "executor", weight: 3 },
                    { text: "Analisar dados de mercado e viabilidade financeira", profile: "analyst", weight: 3 },
                    { text: "Identificar stakeholders e estratégias de comunicação", profile: "communicator", weight: 3 }
                ]
            },
            {
                id: 2,
                text: "Sua maior contribuição em uma equipe empresarial é:",
                options: [
                    { text: "Liderar e tomar decisões estratégicas complexas", profile: "strategist", weight: 3 },
                    { text: "Desenvolver soluções criativas e inovadoras", profile: "innovator", weight: 3 },
                    { text: "Garantir execução eficiente e resultados práticos", profile: "executor", weight: 3 },
                    { text: "Fornecer análises precisas baseadas em dados", profile: "analyst", weight: 3 },
                    { text: "Facilitar comunicação e construir relacionamentos", profile: "communicator", weight: 3 }
                ]
            },
            {
                id: 3,
                text: "Em uma reunião de negócios importante, você se destaca por:",
                options: [
                    { text: "Apresentar visões de futuro e direcionamentos estratégicos", profile: "strategist", weight: 2 },
                    { text: "Propor ideias disruptivas e soluções tecnológicas", profile: "innovator", weight: 2 },
                    { text: "Focar na viabilidade e implementação prática", profile: "executor", weight: 2 },
                    { text: "Trazer dados concretos e análises fundamentadas", profile: "analyst", weight: 2 },
                    { text: "Mediar discussões e alinhar expectativas", profile: "communicator", weight: 2 }
                ]
            },
            {
                id: 4,
                text: "Ao resolver problemas empresariais complexos, você prefere:",
                options: [
                    { text: "Analisar impactos estratégicos e cenários futuros", profile: "strategist", weight: 2 },
                    { text: "Buscar soluções não convencionais e tecnológicas", profile: "innovator", weight: 2 },
                    { text: "Dividir em etapas executáveis e mensuráveis", profile: "executor", weight: 2 },
                    { text: "Utilizar modelos analíticos e dados históricos", profile: "analyst", weight: 2 },
                    { text: "Consultar stakeholders e buscar consenso", profile: "communicator", weight: 2 }
                ]
            },
            {
                id: 5,
                text: "O que mais te motiva no ambiente empresarial?",
                options: [
                    { text: "Definir rumos e impactar o futuro da organização", profile: "strategist", weight: 3 },
                    { text: "Criar produtos/serviços revolucionários", profile: "innovator", weight: 3 },
                    { text: "Ver resultados concretos e operações eficientes", profile: "executor", weight: 3 },
                    { text: "Descobrir insights valiosos através de análises", profile: "analyst", weight: 3 },
                    { text: "Construir relacionamentos e expandir networks", profile: "communicator", weight: 3 }
                ]
            },
            {
                id: 6,
                text: "Em um cenário de crise empresarial, sua reação natural é:",
                options: [
                    { text: "Reformular estratégias e redefinir prioridades", profile: "strategist", weight: 2 },
                    { text: "Buscar oportunidades de inovação e adaptação", profile: "innovator", weight: 2 },
                    { text: "Otimizar recursos e manter operações funcionando", profile: "executor", weight: 2 },
                    { text: "Analisar cenários de risco e quantificar perdas", profile: "analyst", weight: 2 },
                    { text: "Comunicar transparentemente e manter equipe unida", profile: "communicator", weight: 2 }
                ]
            },
            {
                id: 7,
                text: "Sua área de interesse e expertise preferida é:",
                options: [
                    { text: "Planejamento estratégico e governança corporativa", profile: "strategist", weight: 2 },
                    { text: "Pesquisa & desenvolvimento e novas tecnologias", profile: "innovator", weight: 2 },
                    { text: "Operações e gestão de processos empresariais", profile: "executor", weight: 2 },
                    { text: "Finanças e análise de performance empresarial", profile: "analyst", weight: 2 },
                    { text: "Marketing e relacionamento com stakeholders", profile: "communicator", weight: 2 }
                ]
            },
            {
                id: 8,
                text: "Ao liderar uma equipe empresarial, você foca principalmente em:",
                options: [
                    { text: "Alinhar visão estratégica e definir objetivos", profile: "strategist", weight: 2 },
                    { text: "Estimular criatividade e pensamento inovador", profile: "innovator", weight: 2 },
                    { text: "Estabelecer processos claros e metas alcançáveis", profile: "executor", weight: 2 },
                    { text: "Monitorar métricas e performance da equipe", profile: "analyst", weight: 2 },
                    { text: "Desenvolver talentos e facilitar comunicação", profile: "communicator", weight: 2 }
                ]
            },
            {
                id: 9,
                text: "Para tomar decisões empresariais importantes, você considera principalmente:",
                options: [
                    { text: "Alinhamento com visão estratégica de longo prazo", profile: "strategist", weight: 2 },
                    { text: "Potencial de diferenciação e inovação no mercado", profile: "innovator", weight: 2 },
                    { text: "Viabilidade operacional e recursos disponíveis", profile: "executor", weight: 2 },
                    { text: "ROI esperado e análise de riscos financeiros", profile: "analyst", weight: 2 },
                    { text: "Impacto nos stakeholders e imagem da empresa", profile: "communicator", weight: 2 }
                ]
            },
            {
                id: 10,
                text: "Seu objetivo profissional ideal seria:",
                options: [
                    { text: "Ser CEO de uma grande corporação multinacional", profile: "strategist", weight: 3 },
                    { text: "Criar uma startup unicórnio revolucionária", profile: "innovator", weight: 3 },
                    { text: "Ser reconhecido pela excelência operacional", profile: "executor", weight: 3 },
                    { text: "Ser autoridade em análise financeira e estratégica", profile: "analyst", weight: 3 },
                    { text: "Construir uma marca pessoal influente no mercado", profile: "communicator", weight: 3 }
                ]
            }
        ],

        // Localizações disponíveis
        locations: {
            downtown: {
                name: "Centro Empresarial",
                icon: "🏙️",
                cost: 120000,
                description: "Localização premium no centro financeiro da cidade",
                pros: ["Alto prestígio", "Fácil acesso", "Networking", "Infraestrutura completa"],
                cons: ["Alto custo", "Muito trânsito", "Estacionamento caro"]
            },
            techpark: {
                name: "Parque Tecnológico", 
                icon: "🔬",
                cost: 80000,
                description: "Hub de inovação com empresas de tecnologia",
                pros: ["Ambiente inovador", "Networking tech", "Incentivos fiscais", "Universidades próximas"],
                cons: ["Distância do centro", "Público especializado"]
            },
            coworking: {
                name: "Coworking Premium",
                icon: "🏢", 
                cost: 50000,
                description: "Espaço compartilhado com infraestrutura profissional",
                pros: ["Flexibilidade", "Custo moderado", "Networking", "Serviços inclusos"],
                cons: ["Menos privacidade", "Dependência do espaço"]
            },
            remote: {
                name: "Home Office",
                icon: "🏠",
                cost: 20000,
                description: "Trabalho remoto com escritório virtual",
                pros: ["Máxima economia", "Flexibilidade total", "Sem deslocamento"],
                cons: ["Imagem profissional", "Dificuldade colaboração", "Falta de separação"]
            }
        },

        // Equipamentos disponíveis
        equipment: {
            basic_hardware: {
                name: "Hardware Básico",
                icon: "💻",
                cost: 40000,
                description: "Computadores, impressoras e mobiliário essencial",
                items: ["Notebooks básicos", "Impressora multifuncional", "Mobiliário escritório", "Internet banda larga"]
            },
            advanced_hardware: {
                name: "Hardware Avançado", 
                icon: "🖥️",
                cost: 80000,
                description: "Workstations, servidores e equipamentos especializados",
                items: ["Workstations alta performance", "Servidor local", "Monitores 4K", "Equipamentos especializados"]
            },
            software_licenses: {
                name: "Licenças de Software",
                icon: "⚙️",
                cost: 30000,
                description: "Pacote completo de softwares profissionais",
                items: ["Office 365", "Adobe Creative Suite", "Ferramentas desenvolvimento", "Software gestão"]
            },
            security_system: {
                name: "Sistema de Segurança",
                icon: "🔒",
                cost: 35000,
                description: "Segurança digital e física completa",
                items: ["Antivírus corporativo", "Firewall avançado", "Sistema backup", "Monitoramento 24h"]
            },
            meeting_room: {
                name: "Sala de Reuniões",
                icon: "📹",
                cost: 45000,
                description: "Equipamentos para reuniões e videoconferências",
                items: ["TV 65 polegadas", "Sistema videoconferência", "Som profissional", "Mesa reuniões"]
            },
            design_studio: {
                name: "Estúdio de Design",
                icon: "🎨", 
                cost: 60000,
                description: "Equipamentos para criação e design profissional",
                items: ["iMac Pro", "Tablet gráfico", "Câmera profissional", "Iluminação estúdio"]
            }
        }
    },

    // NOVO: Sistema de sincronização
    sync: {
        // Método para sincronizar dados
        async syncData(action, data = null) {
            console.log(`🔄 Sincronizando: ${action}`);

            try {
                // Tentar Firebase primeiro
                if (window.firebase && window.firebase.db) {
                    return await this.syncWithFirebase(action, data);
                }

                // Fallback: localStorage
                return await this.syncWithLocalStorage(action, data);

            } catch (error) {
                console.warn('⚠️ Erro na sincronização online:', error.message);
                return await this.syncWithLocalStorage(action, data);
            }
        },

        async syncWithFirebase(action, data) {
            console.log('🔥 Sincronizando com Firebase');

            const db = window.firebase.db;

            switch (action) {
                case 'saveTeam':
                    const teamRef = window.firebase.doc(db, 'teams', data.code);
                    await window.firebase.setDoc(teamRef, {
                        ...data,
                        lastUpdated: new Date().toISOString(),
                        updatedBy: EmpresaTec.state.currentUser?.uid
                    });
                    console.log(`✅ Equipe ${data.code} salva no Firebase`);
                    return data;

                case 'getTeam':
                    const teamDoc = await window.firebase.getDoc(window.firebase.doc(db, 'teams', data.code));
                    if (teamDoc.exists()) {
                        console.log(`✅ Equipe ${data.code} encontrada no Firebase`);
                        return teamDoc.data();
                    }
                    return null;

                case 'getAllTeams':
                    const teamsCollection = window.firebase.collection(db, 'teams');
                    const snapshot = await window.firebase.getDocs(teamsCollection);
                    const teams = {};
                    snapshot.forEach(doc => {
                        teams[doc.id] = doc.data();
                    });
                    console.log(`✅ ${Object.keys(teams).length} equipes carregadas do Firebase`);
                    return teams;

                default:
                    throw new Error(`Ação não suportada: ${action}`);
            }
        },

        async syncWithLocalStorage(action, data) {
            console.log('💾 Usando localStorage');

            const storedTeams = JSON.parse(localStorage.getItem('empresatec_teams') || '{}');

            switch (action) {
                case 'saveTeam':
                    storedTeams[data.code] = {
                        ...data,
                        lastUpdated: new Date().toISOString(),
                        isLocal: true
                    };
                    localStorage.setItem('empresatec_teams', JSON.stringify(storedTeams));
                    return data;

                case 'getTeam':
                    return storedTeams[data.code] || null;

                case 'getAllTeams':
                    return storedTeams;
            }
        }
    },

    // ===== INICIALIZAÇÃO =====
    async init() {
        console.log('🚀 Iniciando EmpresaTec - Sistema Empresarial Educacional');

        this.bindEvents();
        await this.checkConnectivity();
        this.loadState();
        this.initializeScreen();
        this.startSyncService();

        console.log('✅ Sistema inicializado com sucesso');
    },

    // NOVO: Verificar conectividade
    async checkConnectivity() {
        console.log('🔍 Verificando conectividade...');

        try {
            // Testar Firebase
            if (window.firebase && window.firebase.db) {
                await window.firebase.getDocs(window.firebase.collection(window.firebase.db, 'teams'));
                this.state.isOnline = true;
                console.log('✅ Firebase conectado');
                this.showAlert('Sistema online - dados sincronizados!', 'success');
                return;
            }
        } catch (error) {
            console.warn('⚠️ Firebase não disponível:', error.message);
        }

        // Fallback: verificar conectividade básica
        try {
            const response = await fetch('https://httpbin.org/get', { 
                method: 'GET'
            });

            if (response.ok) {
                this.state.isOnline = false; // Sem Firebase, consideramos offline para sync
                console.log('🌐 Internet disponível mas sem sincronização');
                this.showAlert('Sistema funcionando localmente!', 'warning');
            }
        } catch (error) {
            this.state.isOnline = false;
            console.warn('📴 Sistema funcionando offline');
            this.showAlert('Sistema offline - dados apenas locais!', 'warning');
        }
    },

    // NOVO: Serviço de sincronização contínua
    startSyncService() {
        if (this.state.syncInterval) {
            clearInterval(this.state.syncInterval);
        }

        // Sincronizar a cada 30 segundos se online
        this.state.syncInterval = setInterval(async () => {
            if (this.state.isOnline && this.state.currentTeam) {
                try {
                    const updatedTeam = await this.sync.syncData('getTeam', { code: this.state.currentTeam.code });
                    if (updatedTeam && updatedTeam.lastUpdated !== this.state.currentTeam.lastUpdated) {
                        console.log('🔄 Equipe atualizada remotamente');
                        this.state.currentTeam = updatedTeam;
                        this.showTeamStatus(); // Atualizar interface
                        this.showAlert('Equipe atualizada!', 'info');
                    }
                } catch (error) {
                    console.warn('⚠️ Erro na sincronização automática:', error.message);
                }
            }
        }, 30000);
    },
    bindEvents() {
        // Login Form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Teacher Access
        const teacherAccessBtn = document.getElementById('teacherAccessBtn');
        if (teacherAccessBtn) {
            teacherAccessBtn.addEventListener('click', () => {
                this.showTeacherLogin();
            });
        }

        // Teacher Password Form
        const teacherPasswordForm = document.getElementById('teacherPasswordForm');
        if (teacherPasswordForm) {
            teacherPasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleTeacherLogin();
            });
        }

        // Back to Login
        const backToLoginBtn = document.getElementById('backToLoginBtn');
        if (backToLoginBtn) {
            backToLoginBtn.addEventListener('click', () => {
                this.showScreen('loginScreen');
            });
        }

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }

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

        // Copy Team Code
        const copyCodeBtn = document.getElementById('copyCodeBtn');
        if (copyCodeBtn) {
            copyCodeBtn.addEventListener('click', () => {
                this.copyTeamCode();
            });
        }

        // Start Act 1
        const startAct1Btn = document.getElementById('startAct1Btn');
        if (startAct1Btn) {
            startAct1Btn.addEventListener('click', () => {
                this.startAct1();
            });
        }

        // Questionnaire Navigation
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const finishProfileBtn = document.getElementById('finishProfileBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevQuestion();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextQuestion();
            });
        }

        if (finishProfileBtn) {
            finishProfileBtn.addEventListener('click', () => {
                this.finishProfile();
            });
        }

        // Phase Navigation
        const continueButtons = [
            'continueToPhase2', 'continueToPhase3', 'continueToPhase4', 'continueToPhase5'
        ];

        continueButtons.forEach(buttonId => {
            const btn = document.getElementById(buttonId);
            if (btn) {
                btn.addEventListener('click', () => {
                    const phaseNumber = parseInt(buttonId.slice(-1));
                    this.goToPhase(phaseNumber);
                });
            }
        });

        // Voting Buttons
        const submitSegmentVote = document.getElementById('submitSegmentVote');
        if (submitSegmentVote) {
            submitSegmentVote.addEventListener('click', () => {
                this.submitSegmentVote();
            });
        }

        const submitCeoVote = document.getElementById('submitCeoVote');
        if (submitCeoVote) {
            submitCeoVote.addEventListener('click', () => {
                this.submitCeoVote();
            });
        }

        // Location and Equipment
        const confirmLocation = document.getElementById('confirmLocation');
        if (confirmLocation) {
            confirmLocation.addEventListener('click', () => {
                this.confirmLocation();
            });
        }

        const finishAct1 = document.getElementById('finishAct1');
        if (finishAct1) {
            finishAct1.addEventListener('click', () => {
                this.finishAct1();
            });
        }

        // Teacher Controls
        const teacherButtons = [
            'approveAct1', 'approveAct2', 'approveAct3', 'approveAct4', 'approveAct5',
            'showRanking', 'exportData', 'generateReport', 'resetAllData', 'backupData',
            'backToSimulation', 'teacherLogout'
        ];

        teacherButtons.forEach(buttonId => {
            const btn = document.getElementById(buttonId);
            if (btn) {
                btn.addEventListener('click', () => {
                    this.handleTeacherAction(buttonId);
                });
            }
        });

        // Close Ranking
        const closeRanking = document.getElementById('closeRanking');
        if (closeRanking) {
            closeRanking.addEventListener('click', () => {
                this.closeRanking();
            });
        }

        console.log('🔗 Event listeners configurados');
    },

    // ===== SISTEMA DE TELAS =====
    showScreen(screenId) {
        console.log(`📱 Mudando para tela: ${screenId}`);

        // Esconder todas as telas
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
        });

        // Mostrar tela solicitada
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.state.currentScreen = screenId;
        }

        // Atualizar barras
        this.updateBars();
        this.saveState();
    },

    updateBars() {
        const userBar = document.getElementById('userBar');
        const progressBar = document.getElementById('progressBar');

        // Mostrar/esconder barras baseado na tela atual
        if (this.state.currentScreen === 'loginScreen' || this.state.currentScreen === 'teacherScreen') {
            userBar?.classList.add('hidden');
            progressBar?.classList.add('hidden');
            document.querySelector('.main-container')?.classList.add('no-bars');
        } else {
            if (this.state.isAuthenticated) {
                userBar?.classList.remove('hidden');
                this.updateUserInfo();
            }

            if (this.state.currentScreen.startsWith('act')) {
                progressBar?.classList.remove('hidden');
                this.updateProgress();
            } else {
                progressBar?.classList.add('hidden');
            }

            document.querySelector('.main-container')?.classList.remove('no-bars');
        }
    },

    updateUserInfo() {
        const currentUser = document.getElementById('currentUser');
        const currentTeam = document.getElementById('currentTeam');
        const currentScore = document.getElementById('currentScore');

        if (currentUser && this.state.currentUser) {
            const onlineIndicator = this.state.isOnline ? '🟢' : '🔴';
            currentUser.textContent = `${onlineIndicator} ${this.state.currentUser.name}`;
        }

        if (currentTeam && this.state.currentTeam) {
            currentTeam.textContent = `🏢 ${this.state.currentTeam.name}`;
        }

        if (currentScore) {
            currentScore.textContent = `🏆 ${this.state.teamScore.toLocaleString()} pontos`;
        }
    },

    updateProgress() {
        const progressLabel = document.getElementById('progressLabel');
        const progressPhase = document.getElementById('progressPhase');
        const progressFill = document.getElementById('progressFill');

        if (progressLabel) {
            progressLabel.textContent = `EmpresaTec - Ato ${this.state.currentAct}`;
        }

        if (progressPhase) {
            progressPhase.textContent = `Fase ${this.state.currentPhase} de 5`;
        }

        if (progressFill) {
            const progress = ((this.state.currentPhase - 1) / 4) * 100;
            progressFill.style.width = `${progress}%`;
        }
    },

    // ===== AUTENTICAÇÃO - CORRIGIDA =====
    async handleLogin() {
        console.log('🔐 Iniciando processo de login...');

        const email = document.getElementById('loginEmail')?.value?.trim();
        const password = document.getElementById('loginPassword')?.value;

        if (!email || !password) {
            this.showAlert('Por favor, preencha todos os campos.', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showAlert('Por favor, digite um email válido.', 'error');
            return;
        }

        try {
            this.showLoading('Fazendo login...');

            // CORREÇÃO: Definir currentUser SEMPRE
            this.state.currentUser = {
                uid: this.generateId(),
                email: email,
                name: email.split('@')[0]
            };

            console.log('👤 Usuário definido:', this.state.currentUser);

            // Tentar Firebase se disponível
            if (window.firebase && this.state.isOnline) {
                try {
                    await window.firebase.signInWithEmailAndPassword(window.firebase.auth, email, password);
                } catch (authError) {
                    if (authError.code === 'auth/user-not-found') {
                        await window.firebase.createUserWithEmailAndPassword(window.firebase.auth, email, password);
                        this.showAlert('Conta criada automaticamente!', 'success');
                    } else {
                        console.warn('⚠️ Firebase erro:', authError.message);
                    }
                }
            }

            // SEMPRE definir como autenticado
            this.state.isAuthenticated = true;

            // Carregar dados do usuário
            await this.loadUserData();

            this.hideLoading();
            this.showAlert('Login realizado com sucesso!', 'success');

            // Determinar próxima tela
            if (this.state.currentTeam) {
                this.showScreen('act1Screen');
                this.loadAct1();
            } else {
                this.showScreen('teamScreen');
            }

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro no login:', error);
            this.showAlert(`Erro no login: ${error.message}`, 'error');
        }
    },

    async loadUserData() {
        if (!this.state.currentUser) return;

        try {
            console.log('📂 Carregando dados do usuário:', this.state.currentUser.uid);

            // Carregar dados do Firebase se disponível
            if (window.firebase && this.state.isOnline && window.firebase.db) {
                try {
                    const userRef = window.firebase.doc(window.firebase.db, 'users', this.state.currentUser.uid);
                    const userSnap = await window.firebase.getDoc(userRef);

                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        if (userData.gameState) {
                            Object.assign(this.state, userData.gameState);
                            console.log('📥 Dados carregados do Firebase');
                        }
                    }
                } catch (firebaseError) {
                    console.warn('⚠️ Erro no Firebase (não crítico):', firebaseError.message);
                }
            }

            console.log('✅ Dados do usuário carregados');
        } catch (error) {
            console.warn('⚠️ Não foi possível carregar dados do servidor:', error.message);
        }
    },

    showTeacherLogin() {
        this.showScreen('teacherScreen');
    },

    handleTeacherLogin() {
        const password = document.getElementById('teacherPassword')?.value;

        if (!password) {
            this.showAlert('Digite a senha do professor.', 'error');
            return;
        }

        if (password !== this.state.teacherPassword) {
            this.showAlert('Senha incorreta!', 'error');
            document.getElementById('teacherPassword').value = '';
            return;
        }

        this.state.isTeacher = true;
        this.state.isAuthenticated = true;

        // Definir currentUser para professor
        if (!this.state.currentUser) {
            this.state.currentUser = {
                uid: 'professor',
                email: 'professor@empresatec.edu',
                name: 'Professor'
            };
        }

        // Esconder login e mostrar dashboard
        const teacherLogin = document.getElementById('teacherLogin');
        const teacherDashboard = document.getElementById('teacherDashboard');

        if (teacherLogin) teacherLogin.classList.add('hidden');
        if (teacherDashboard) teacherDashboard.classList.remove('hidden');

        this.loadTeacherDashboard();
        this.showAlert('Bem-vindo ao painel administrativo!', 'success');
    },

    handleLogout() {
        if (!confirm('Deseja realmente fazer logout?')) {
            return;
        }

        try {
            // Logout Firebase se disponível
            if (window.firebase && window.firebase.auth) {
                window.firebase.signOut(window.firebase.auth);
            }

            // Parar sincronização
            if (this.state.syncInterval) {
                clearInterval(this.state.syncInterval);
                this.state.syncInterval = null;
            }

            // Reset estado local
            this.state = {
                ...this.state,
                currentUser: null,
                currentTeam: null,
                isTeacher: false,
                isAuthenticated: false,
                currentScreen: 'loginScreen'
            };

            // Limpar localStorage
            localStorage.removeItem('empresatec_state');

            this.showScreen('loginScreen');
            this.showAlert('Logout realizado com sucesso!', 'success');

        } catch (error) {
            console.error('❌ Erro no logout:', error);
            this.showAlert('Erro no logout: ' + error.message, 'error');
        }
    },

    // ===== GESTÃO DE EQUIPES - COM SINCRONIZAÇÃO =====
    async createTeam() {
        console.log('🏗️ Iniciando criação de equipe...');

        if (!this.state.currentUser) {
            console.error('❌ currentUser é null!');
            this.showAlert('Erro: usuário não autenticado. Faça login novamente.', 'error');
            this.showScreen('loginScreen');
            return;
        }

        const companyName = document.getElementById('companyName')?.value?.trim();

        if (!companyName) {
            this.showAlert('Digite o nome da empresa.', 'error');
            return;
        }

        if (companyName.length < 3) {
            this.showAlert('O nome deve ter pelo menos 3 caracteres.', 'error');
            return;
        }

        try {
            this.showLoading('Criando empresa e sincronizando...');

            const teamCode = this.generateTeamCode();

            const newTeam = {
                id: teamCode,
                name: companyName,
                code: teamCode,
                leader: this.state.currentUser.uid,
                members: [{
                    uid: this.state.currentUser.uid,
                    email: this.state.currentUser.email,
                    name: this.state.currentUser.name,
                    isLeader: true,
                    joinedAt: new Date().toISOString(),
                    profile: null
                }],
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
                status: 'forming',
                currentAct: 1,
                currentPhase: 1,
                score: 0,
                decisions: {},
                updatedBy: this.state.currentUser.uid
            };

            // CORREÇÃO: Salvar com sincronização
            const savedTeam = await this.sync.syncData('saveTeam', newTeam);
            this.state.currentTeam = savedTeam;

            this.hideLoading();

            const statusMsg = this.state.isOnline ? 
                `Empresa "${companyName}" criada e sincronizada! Código: ${teamCode}` :
                `Empresa "${companyName}" criada localmente! Código: ${teamCode}`;

            this.showAlert(statusMsg, 'success');
            this.showTeamStatus();

            console.log('✅ Equipe criada:', newTeam);

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao criar equipe:', error);
            this.showAlert('Erro ao criar empresa: ' + error.message, 'error');
        }
    },

    async joinTeam() {
        console.log('🤝 Iniciando entrada em equipe...');

        if (!this.state.currentUser) {
            console.error('❌ currentUser é null!');
            this.showAlert('Erro: usuário não autenticado. Faça login novamente.', 'error');
            this.showScreen('loginScreen');
            return;
        }

        const teamCode = document.getElementById('teamCode')?.value?.trim()?.toUpperCase();

        if (!teamCode) {
            this.showAlert('Digite o código da empresa.', 'error');
            return;
        }

        if (teamCode.length !== 6) {
            this.showAlert('Código deve ter 6 caracteres.', 'error');
            return;
        }

        try {
            this.showLoading('Buscando empresa...');

            console.log('🔍 Buscando equipe com código:', teamCode);

            // CORREÇÃO: Buscar com sincronização
            const team = await this.sync.syncData('getTeam', { code: teamCode });

            if (!team) {
                this.hideLoading();
                const errorMsg = this.state.isOnline ? 
                    `Empresa ${teamCode} não encontrada online. Verifique o código.` :
                    `Empresa ${teamCode} não encontrada localmente.`;
                console.log('❌ Equipe não encontrada:', {
                    codigo: teamCode,
                    online: this.state.isOnline
                });
                this.showAlert(errorMsg, 'error');
                return;
            }

            console.log('✅ Equipe encontrada:', team.name);

            // Verificar se já é membro
            const existingMember = team.members.find(m => m.uid === this.state.currentUser.uid);
            if (existingMember) {
                this.hideLoading();
                this.state.currentTeam = team;
                this.showAlert('Você já faz parte desta empresa!', 'info');
                this.showTeamStatus();
                return;
            }

            // Verificar limite de membros
            if (team.members.length >= 6) {
                this.hideLoading();
                this.showAlert('Empresa já atingiu o limite de 6 membros.', 'error');
                return;
            }

            // Adicionar membro
            const newMember = {
                uid: this.state.currentUser.uid,
                email: this.state.currentUser.email,
                name: this.state.currentUser.name,
                isLeader: false,
                joinedAt: new Date().toISOString(),
                profile: null
            };

            team.members.push(newMember);
            team.lastUpdated = new Date().toISOString();
            team.updatedBy = this.state.currentUser.uid;

            // CORREÇÃO: Salvar com sincronização
            const updatedTeam = await this.sync.syncData('saveTeam', team);
            this.state.currentTeam = updatedTeam;

            this.hideLoading();
            this.showAlert(`Bem-vindo à ${team.name}!`, 'success');
            this.showTeamStatus();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao entrar na equipe:', error);
            this.showAlert('Erro ao entrar na empresa: ' + error.message, 'error');
        }
    },

    // CORREÇÃO: Status da equipe com indicador online
    showTeamStatus() {
        const teamStatus = document.getElementById('teamStatus');
        const teamName = document.getElementById('teamName');
        const teamCodeDisplay = document.getElementById('teamCodeDisplay');
        const membersList = document.getElementById('membersList');
        const teamWaiting = document.getElementById('teamWaiting');
        const startGameSection = document.getElementById('startGameSection');

        if (!this.state.currentTeam) return;

        // Mostrar seção de status
        if (teamStatus) teamStatus.classList.remove('hidden');

        // Nome da equipe com indicador online
        if (teamName) {
            const onlineIndicator = this.state.isOnline ? '🟢' : '🔴';
            const statusText = this.state.isOnline ? 'Online' : 'Offline';
            teamName.innerHTML = `${this.state.currentTeam.name} <small>${onlineIndicator} ${statusText}</small>`;
        }

        // Código da equipe
        if (teamCodeDisplay) teamCodeDisplay.textContent = this.state.currentTeam.code;

        // Lista de membros
        if (membersList) {
            membersList.innerHTML = '';
            this.state.currentTeam.members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.className = `member-card ${member.isLeader ? 'leader' : ''}`;
                memberCard.innerHTML = `
                    <div class="member-name">${member.name} ${member.isLeader ? '👑' : ''}</div>
                    <div class="member-role">${member.isLeader ? 'CEO Fundador' : 'Executivo'}</div>
                `;
                membersList.appendChild(memberCard);
            });
        }

        // Status de espera
        const memberCount = this.state.currentTeam.members.length;
        if (teamWaiting) {
            if (memberCount < 3) {
                teamWaiting.classList.remove('hidden');
                const syncStatus = this.state.isOnline ? 
                    'Aguardando mais membros entrarem online...' : 
                    'Aguardando mais membros (modo offline)...';
                teamWaiting.querySelector('p').textContent = `⏳ ${syncStatus} (${memberCount}/3 mínimo)`;
            } else {
                teamWaiting.classList.add('hidden');
            }
        }

        // Botão de iniciar
        if (startGameSection && this.state.currentUser && memberCount >= 3) {
            const isLeader = this.state.currentTeam.leader === this.state.currentUser.uid;
            if (isLeader) {
                startGameSection.classList.remove('hidden');
            }
        }
    },

    copyTeamCode() {
        const teamCode = this.state.currentTeam?.code;
        if (!teamCode) return;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(teamCode).then(() => {
                this.showAlert('Código copiado!', 'success');
            }).catch(() => {
                this.fallbackCopyCode(teamCode);
            });
        } else {
            this.fallbackCopyCode(teamCode);
        }
    },

    fallbackCopyCode(code) {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.showAlert('Código copiado!', 'success');
    },

    // ===== ATO 1: FUNDAÇÃO DA EMPRESA =====
    startAct1() {
        console.log('🏗️ Iniciando Ato 1: Fundação da Empresa');

        this.state.currentAct = 1;
        this.state.currentPhase = 1;
        this.showScreen('act1Screen');
        this.goToPhase(1);

        this.loadQuestionnaire();
    },

    goToPhase(phaseNumber) {
        console.log(`📋 Indo para Fase ${phaseNumber}`);

        this.state.currentPhase = phaseNumber;

        // Esconder todos os containers de fase
        const phaseContainers = document.querySelectorAll('.phase-container');
        phaseContainers.forEach(container => {
            container.classList.remove('active');
        });

        // Mostrar container da fase atual
        const currentPhaseContainer = document.getElementById(`phase${phaseNumber}Container`);
        if (currentPhaseContainer) {
            currentPhaseContainer.classList.add('active');
        }

        // Atualizar informações da fase
        const currentPhaseElement = document.getElementById('act1CurrentPhase');
        if (currentPhaseElement) {
            currentPhaseElement.textContent = `${phaseNumber} de 5`;
        }

        // Carregar conteúdo específico da fase
        switch (phaseNumber) {
            case 1:
                this.loadQuestionnaire();
                break;
            case 2:
                this.loadSegmentSelection();
                break;
            case 3:
                this.loadCeoElection();
                break;
            case 4:
                this.loadLocationSelection();
                break;
            case 5:
                this.loadEquipmentSelection();
                break;
        }

        this.updateProgress();
        this.saveState();
    },

    // ===== FASE 1: QUESTIONÁRIO DE PERFIL =====
    loadQuestionnaire() {
        console.log('🧠 Carregando questionário de perfil');

        if (!this.state.userAnswers) {
            this.state.userAnswers = [];
            this.state.currentQuestion = 0;
        }

        this.displayCurrentQuestion();
        this.updateQuestionProgress();
    },

    displayCurrentQuestion() {
        const question = this.data.questions[this.state.currentQuestion];
        if (!question) return;

        const questionText = document.getElementById('questionText');
        const questionOptions = document.getElementById('questionOptions');

        if (questionText) {
            questionText.textContent = question.text;
        }

        if (questionOptions) {
            questionOptions.innerHTML = '';

            question.options.forEach((option, index) => {
                const optionButton = document.createElement('button');
                optionButton.className = 'question-option';
                optionButton.textContent = option.text;
                optionButton.dataset.optionIndex = index;

                // Marcar se já foi selecionada
                const currentAnswer = this.state.userAnswers[this.state.currentQuestion];
                if (currentAnswer && currentAnswer.optionIndex === index) {
                    optionButton.classList.add('selected');
                }

                optionButton.addEventListener('click', () => {
                    this.selectQuestionOption(index);
                });

                questionOptions.appendChild(optionButton);
            });
        }

        this.updateQuestionNavigation();
    },

    selectQuestionOption(optionIndex) {
        const question = this.data.questions[this.state.currentQuestion];
        const option = question.options[optionIndex];

        // Salvar resposta
        this.state.userAnswers[this.state.currentQuestion] = {
            questionId: question.id,
            optionIndex: optionIndex,
            option: option
        };

        // Atualizar visualização
        const questionOptions = document.querySelectorAll('.question-option');
        questionOptions.forEach(btn => btn.classList.remove('selected'));

        const selectedButton = document.querySelector(`[data-option-index="${optionIndex}"]`);
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }

        this.updateQuestionNavigation();
        this.saveState();

        // Auto-avançar se não for a última pergunta
        if (this.state.currentQuestion < this.data.questions.length - 1) {
            setTimeout(() => {
                this.nextQuestion();
            }, 800);
        }
    },

    updateQuestionProgress() {
        const currentQ = document.getElementById('currentQ');
        const totalQ = document.getElementById('totalQ');
        const progressMini = document.getElementById('progressMini');

        if (currentQ) currentQ.textContent = this.state.currentQuestion + 1;
        if (totalQ) totalQ.textContent = this.data.questions.length;

        if (progressMini) {
            const progress = ((this.state.currentQuestion + 1) / this.data.questions.length) * 100;
            progressMini.style.width = `${progress}%`;
        }
    },

    updateQuestionNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const finishBtn = document.getElementById('finishProfileBtn');

        // Botão anterior
        if (prevBtn) {
            prevBtn.disabled = this.state.currentQuestion === 0;
        }

        // Verificar se pergunta atual foi respondida
        const currentAnswered = this.state.userAnswers[this.state.currentQuestion];

        // Botão próxima
        if (nextBtn) {
            nextBtn.disabled = !currentAnswered;
        }

        // Verificar se todas as perguntas foram respondidas
        const answeredCount = this.state.userAnswers.filter(a => a).length;
        const allAnswered = answeredCount === this.data.questions.length;

        // Botão finalizar
        if (finishBtn) {
            if (allAnswered) {
                finishBtn.classList.remove('hidden');
                if (nextBtn) nextBtn.classList.add('hidden');
            } else {
                finishBtn.classList.add('hidden');
                if (nextBtn) nextBtn.classList.remove('hidden');
            }
            finishBtn.disabled = !allAnswered;
        }
    },

    nextQuestion() {
        if (this.state.currentQuestion < this.data.questions.length - 1) {
            this.state.currentQuestion++;
            this.displayCurrentQuestion();
            this.updateQuestionProgress();
        }
    },

    prevQuestion() {
        if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.displayCurrentQuestion();
            this.updateQuestionProgress();
        }
    },

    finishProfile() {
        const answeredCount = this.state.userAnswers.filter(a => a).length;
        if (answeredCount < this.data.questions.length) {
            this.showAlert('Responda todas as perguntas primeiro.', 'error');
            return;
        }

        try {
            this.showLoading('Analisando perfil...');

            const profile = this.calculateProfile();
            this.state.userProfile = profile;

            this.displayProfileResult(profile);

            // Atualizar perfil do membro na equipe
            if (this.state.currentTeam && this.state.currentUser) {
                const member = this.state.currentTeam.members.find(m => m.uid === this.state.currentUser.uid);
                if (member) {
                    member.profile = profile;
                    // Salvar com sincronização
                    this.sync.syncData('saveTeam', this.state.currentTeam);
                }
            }

            this.hideLoading();
            this.showAlert(`Seu perfil: ${profile.name}!`, 'success');

            // Verificar se todos os membros completaram o perfil
            setTimeout(() => {
                this.checkAllProfilesComplete();
            }, 2000);

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao finalizar perfil:', error);
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

        // Calcular pontuações baseadas nas respostas
        this.state.userAnswers.forEach(answer => {
            if (answer && answer.option) {
                const profile = answer.option.profile;
                const weight = answer.option.weight || 1;
                scores[profile] += weight;
            }
        });

        // Encontrar perfil dominante
        const dominantProfile = Object.keys(scores).reduce((a, b) => 
            scores[a] > scores[b] ? a : b
        );

        return {
            type: dominantProfile,
            ...this.data.profiles[dominantProfile],
            scores: scores,
            calculatedAt: new Date().toISOString()
        };
    },

    displayProfileResult(profile) {
        const profileResult = document.getElementById('profileResult');
        const profileIcon = document.getElementById('profileIcon');
        const profileName = document.getElementById('profileName');
        const profileDescription = document.getElementById('profileDescription');
        const profileStrengths = document.getElementById('profileStrengths');

        if (profileResult) profileResult.classList.remove('hidden');
        if (profileIcon) profileIcon.textContent = profile.icon;
        if (profileName) profileName.textContent = profile.name;
        if (profileDescription) profileDescription.textContent = profile.description;

        if (profileStrengths) {
            profileStrengths.innerHTML = '';
            profile.strengths.forEach(strength => {
                const strengthTag = document.createElement('span');
                strengthTag.className = 'strength-tag';
                strengthTag.textContent = strength;
                profileStrengths.appendChild(strengthTag);
            });
        }
    },

    checkAllProfilesComplete() {
        if (!this.state.currentTeam) return;

        const completedProfiles = this.state.currentTeam.members.filter(m => m.profile).length;
        const totalMembers = this.state.currentTeam.members.length;

        const profileProgress = document.getElementById('profileProgress');
        const continueBtn = document.getElementById('continueToPhase2');

        if (profileProgress) {
            profileProgress.textContent = `${completedProfiles}/${totalMembers} membros completaram o perfil`;
        }

        if (completedProfiles === totalMembers) {
            const waitingOthers = document.getElementById('waitingOthers');
            if (waitingOthers) {
                waitingOthers.innerHTML = '<p>✅ Todos os membros completaram o perfil!</p>';
            }

            if (continueBtn) {
                continueBtn.classList.remove('hidden');
            }
        }
    },
