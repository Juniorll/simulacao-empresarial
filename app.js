/* EmpresaTec - Sistema de Simulação Empresarial */
/* JavaScript Corrigido e Funcional */

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
            act1: false,
            act2: false,
            act3: false,
            act4: false,
            act5: false
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
    // ===== INICIALIZAÇÃO =====
    init() {
        console.log('🚀 Iniciando EmpresaTec - Sistema Empresarial Educacional');

        this.bindEvents();
        this.loadState();
        this.initializeScreen();

        console.log('✅ Sistema inicializado com sucesso');
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
            currentUser.textContent = `👤 ${this.state.currentUser.name}`;
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

    // ===== AUTENTICAÇÃO =====
    async handleLogin() {
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

            // Tentar autenticação Firebase primeiro
            if (window.firebase) {
                try {
                    await window.firebase.signInWithEmailAndPassword(window.firebase.auth, email, password);
                } catch (authError) {
                    if (authError.code === 'auth/user-not-found') {
                        // Criar conta automaticamente
                        await window.firebase.createUserWithEmailAndPassword(window.firebase.auth, email, password);
                        this.showAlert('Conta criada automaticamente!', 'success');
                    } else {
                        throw authError;
                    }
                }
            } else {
                // Fallback: autenticação local
                this.state.currentUser = {
                    uid: this.generateId(),
                    email: email,
                    name: email.split('@')[0]
                };
            }

            this.state.isAuthenticated = true;
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
            // Carregar dados do Firebase se disponível
            if (window.firebase) {
                const userRef = window.firebase.doc(window.firebase.db, 'users', this.state.currentUser.uid);
                const userSnap = await window.firebase.getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    if (userData.gameState) {
                        Object.assign(this.state, userData.gameState);
                    }
                }
            }

            console.log('📂 Dados do usuário carregados');
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
            if (window.firebase) {
                window.firebase.signOut(window.firebase.auth);
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

    // ===== GESTÃO DE EQUIPES =====
    createTeam() {
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
            this.showLoading('Criando empresa...');

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
                status: 'forming',
                currentAct: 1,
                currentPhase: 1,
                score: 0,
                decisions: {}
            };

            this.state.currentTeam = newTeam;
            this.saveTeamToDatabase(newTeam);

            this.hideLoading();
            this.showAlert(`Empresa "${companyName}" criada com sucesso!`, 'success');
            this.showTeamStatus();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao criar equipe:', error);
            this.showAlert('Erro ao criar empresa: ' + error.message, 'error');
        }
    },

    joinTeam() {
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
            this.showLoading('Entrando na empresa...');

            // Simular busca da equipe (seria Firebase na versão completa)
            const team = this.findTeamByCode(teamCode);

            if (!team) {
                this.hideLoading();
                this.showAlert('Empresa não encontrada.', 'error');
                return;
            }

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
            this.state.currentTeam = team;
            this.saveTeamToDatabase(team);

            this.hideLoading();
            this.showAlert(`Bem-vindo à ${team.name}!`, 'success');
            this.showTeamStatus();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao entrar na equipe:', error);
            this.showAlert('Erro ao entrar na empresa: ' + error.message, 'error');
        }
    },

    findTeamByCode(code) {
        // Em uma implementação real, seria uma consulta ao Firebase
        // Por agora, retorna null para códigos não encontrados
        const storedTeams = JSON.parse(localStorage.getItem('empresatec_teams') || '{}');
        return storedTeams[code] || null;
    },

    saveTeamToDatabase(team) {
        try {
            // Salvar no Firebase se disponível
            if (window.firebase) {
                const teamRef = window.firebase.doc(window.firebase.db, 'teams', team.code);
                window.firebase.setDoc(teamRef, team);
            }

            // Salvar localmente como fallback
            const storedTeams = JSON.parse(localStorage.getItem('empresatec_teams') || '{}');
            storedTeams[team.code] = team;
            localStorage.setItem('empresatec_teams', JSON.stringify(storedTeams));

            console.log(`💾 Equipe ${team.code} salva`);
        } catch (error) {
            console.error('❌ Erro ao salvar equipe:', error);
        }
    },

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

        // Nome da equipe
        if (teamName) teamName.textContent = this.state.currentTeam.name;

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
                teamWaiting.querySelector('p').textContent = 
                    `⏳ Aguardando mais membros... (${memberCount}/3 mínimo)`;
            } else {
                teamWaiting.classList.add('hidden');
            }
        }

        // Botão de iniciar
        const isLeader = this.state.currentTeam.leader === this.state.currentUser.uid;
        if (startGameSection && isLeader && memberCount >= 3) {
            startGameSection.classList.remove('hidden');
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
            if (this.state.currentTeam) {
                const member = this.state.currentTeam.members.find(m => m.uid === this.state.currentUser.uid);
                if (member) {
                    member.profile = profile;
                    this.saveTeamToDatabase(this.state.currentTeam);
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

    // ===== FASE 2: SELEÇÃO DE SEGMENTO =====
    loadSegmentSelection() {
        console.log('🏭 Carregando seleção de segmento');

        const segmentsGrid = document.getElementById('segmentsGrid');
        if (!segmentsGrid) return;

        segmentsGrid.innerHTML = '';

        Object.keys(this.data.segments).forEach(segmentKey => {
            const segment = this.data.segments[segmentKey];
            const segmentCard = document.createElement('div');
            segmentCard.className = 'segment-card';
            segmentCard.dataset.segment = segmentKey;

            segmentCard.innerHTML = `
                <div class="segment-header">
                    <div class="segment-icon">${segment.icon}</div>
                    <h3>${segment.name}</h3>
                </div>
                <p class="segment-description">${segment.description}</p>
                <div class="segment-details">
                    <div class="detail-item">
                        <strong>Mercado:</strong> <span>${segment.marketSize}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Crescimento:</strong> <span>${segment.growth}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Investimento:</strong> <span>R$ ${segment.investment.toLocaleString()}</span>
                    </div>
                </div>
                <div class="segment-challenges">
                    <h4>🚧 Desafios:</h4>
                    <ul>
                        ${segment.challenges.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
                <div class="segment-opportunities">
                    <h4>🌟 Oportunidades:</h4>
                    <ul>
                        ${segment.opportunities.map(o => `<li>${o}</li>`).join('')}
                    </ul>
                </div>
            `;

            // Marcar se já foi selecionado
            if (this.state.selectedSegment === segmentKey) {
                segmentCard.classList.add('selected');
            }

            segmentCard.addEventListener('click', () => {
                this.selectSegment(segmentKey);
            });

            segmentsGrid.appendChild(segmentCard);
        });

        this.updateVotingStatus();
    },

    selectSegment(segmentKey) {
        // Remover seleção anterior
        const segmentCards = document.querySelectorAll('.segment-card');
        segmentCards.forEach(card => card.classList.remove('selected'));

        // Selecionar novo segmento
        const selectedCard = document.querySelector(`[data-segment="${segmentKey}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            this.state.selectedSegment = segmentKey;

            const submitBtn = document.getElementById('submitSegmentVote');
            if (submitBtn) {
                submitBtn.classList.remove('hidden');
                submitBtn.disabled = false;
            }
        }
    },

    submitSegmentVote() {
        if (!this.state.selectedSegment) {
            this.showAlert('Selecione um segmento primeiro.', 'error');
            return;
        }

        try {
            this.showLoading('Enviando voto...');

            // Salvar voto (simulado - seria Firebase na versão completa)
            this.saveVote('segment', this.state.selectedSegment);

            const submitBtn = document.getElementById('submitSegmentVote');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '✅ Voto Enviado';
            }

            this.hideLoading();
            this.showAlert('Voto registrado com sucesso!', 'success');

            // Simular resultado da votação após 2 segundos
            setTimeout(() => {
                this.showSegmentResult();
            }, 2000);

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao votar:', error);
            this.showAlert('Erro ao registrar voto: ' + error.message, 'error');
        }
    },

    showSegmentResult() {
        // Simular resultado (na versão real seria baseado nos votos de todos os membros)
        const winningSegment = this.state.selectedSegment;
        const segment = this.data.segments[winningSegment];

        // Deduzir investimento do orçamento
        this.state.currentSpending += segment.investment;

        const segmentResult = document.getElementById('segmentResult');
        const winningSegmentDiv = document.getElementById('winningSegment');

        if (segmentResult) segmentResult.classList.remove('hidden');

        if (winningSegmentDiv) {
            winningSegmentDiv.innerHTML = `
                <div class="segment-icon" style="font-size: 3rem; margin-bottom: 1rem;">${segment.icon}</div>
                <h4 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${segment.name}</h4>
                <p style="color: #6b7280; margin-bottom: 1rem;">${segment.description}</p>
                <div style="font-size: 0.9rem; color: #dc2626;">
                    <strong>Investimento:</strong> R$ ${segment.investment.toLocaleString()}
                </div>
            `;
        }

        // Atualizar orçamento
        this.updateBudgetDisplay();

        // Adicionar pontos por decisão estratégica
        this.state.teamScore += 150;
    },

    updateVotingStatus() {
        const voteCount = document.getElementById('voteCount');
        if (voteCount && this.state.currentTeam) {
            const totalMembers = this.state.currentTeam.members.length;
            voteCount.textContent = `Aguardando votos de ${totalMembers} membros...`;
        }
    },

    // ===== FASE 3: ELEIÇÃO DE CEO =====
    loadCeoElection() {
        console.log('👑 Carregando eleição de CEO');

        const candidatesGrid = document.getElementById('candidatesGrid');
        if (!candidatesGrid || !this.state.currentTeam) return;

        candidatesGrid.innerHTML = '';

        this.state.currentTeam.members.forEach(member => {
            const candidateCard = document.createElement('div');
            candidateCard.className = 'candidate-card';
            candidateCard.dataset.candidate = member.uid;

            const profileInfo = member.profile ? 
                `<div class="candidate-profile">${member.profile.name}</div>` : 
                '<div class="candidate-profile">Perfil não definido</div>';

            candidateCard.innerHTML = `
                <div class="candidate-avatar">${member.name.charAt(0).toUpperCase()}</div>
                <div class="candidate-name">${member.name} ${member.isLeader ? '👑' : ''}</div>
                ${profileInfo}
                ${member.isLeader ? '<div style="color: #d97706; font-size: 0.8rem;">Fundador</div>' : ''}
            `;

            // Marcar se já foi selecionado
            if (this.state.selectedCeo === member.uid) {
                candidateCard.classList.add('selected');
            }

            candidateCard.addEventListener('click', () => {
                this.selectCeo(member.uid);
            });

            candidatesGrid.appendChild(candidateCard);
        });

        this.updateElectionStatus();
    },

    selectCeo(memberUid) {
        // Remover seleção anterior
        const candidateCards = document.querySelectorAll('.candidate-card');
        candidateCards.forEach(card => card.classList.remove('selected'));

        // Selecionar novo candidato
        const selectedCard = document.querySelector(`[data-candidate="${memberUid}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            this.state.selectedCeo = memberUid;

            const submitBtn = document.getElementById('submitCeoVote');
            if (submitBtn) {
                submitBtn.classList.remove('hidden');
                submitBtn.disabled = false;
            }
        }
    },

    submitCeoVote() {
        if (!this.state.selectedCeo) {
            this.showAlert('Selecione um candidato a CEO.', 'error');
            return;
        }

        try {
            this.showLoading('Registrando voto...');

            // Salvar voto
            this.saveVote('ceo', this.state.selectedCeo);

            const submitBtn = document.getElementById('submitCeoVote');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '✅ Voto Enviado';
            }

            this.hideLoading();
            this.showAlert('Voto para CEO registrado!', 'success');

            // Simular resultado da eleição
            setTimeout(() => {
                this.showCeoResult();
            }, 2000);

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao votar CEO:', error);
            this.showAlert('Erro ao registrar voto: ' + error.message, 'error');
        }
    },

    showCeoResult() {
        const electedCeoUid = this.state.selectedCeo;
        const electedMember = this.state.currentTeam.members.find(m => m.uid === electedCeoUid);

        if (!electedMember) return;

        const ceoResult = document.getElementById('ceoResult');
        const electedCeoDiv = document.getElementById('electedCeo');

        if (ceoResult) ceoResult.classList.remove('hidden');

        if (electedCeoDiv) {
            electedCeoDiv.innerHTML = `
                <div class="candidate-avatar" style="width: 100px; height: 100px; font-size: 2rem; margin: 0 auto 1rem;">
                    ${electedMember.name.charAt(0).toUpperCase()}
                </div>
                <h4 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${electedMember.name}</h4>
                ${electedMember.profile ? `<p style="color: #6b7280;">${electedMember.profile.name}</p>` : ''}
                <div style="margin-top: 1rem; font-size: 0.9rem; color: #059669;">
                    <strong>✅ Eleito CEO da empresa!</strong>
                </div>
            `;
        }

        // Salvar CEO na equipe
        this.state.currentTeam.ceo = electedCeoUid;
        this.saveTeamToDatabase(this.state.currentTeam);

        // Adicionar pontos por liderança
        this.state.teamScore += 200;
    },

    updateElectionStatus() {
        const electionCount = document.getElementById('electionCount');
        if (electionCount && this.state.currentTeam) {
            const totalMembers = this.state.currentTeam.members.length;
            electionCount.textContent = `Aguardando votos de ${totalMembers} membros...`;
        }
    },
    // ===== FASE 4: SELEÇÃO DE LOCALIZAÇÃO =====
    loadLocationSelection() {
        console.log('🏢 Carregando seleção de localização');

        const locationsGrid = document.getElementById('locationsGrid');
        if (!locationsGrid) return;

        locationsGrid.innerHTML = '';

        Object.keys(this.data.locations).forEach(locationKey => {
            const location = this.data.locations[locationKey];
            const locationCard = document.createElement('div');
            locationCard.className = 'location-card';
            locationCard.dataset.location = locationKey;

            locationCard.innerHTML = `
                <div class="location-icon">${location.icon}</div>
                <h4>${location.name}</h4>
                <p class="location-description">${location.description}</p>
                <div class="location-details">
                    <p><strong>💰 Custo:</strong> R$ ${location.cost.toLocaleString()}</p>
                </div>
                <div class="location-pros">
                    <h5>✅ Vantagens:</h5>
                    <ul>
                        ${location.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
                <div class="location-cons">
                    <h5>❌ Desvantagens:</h5>
                    <ul>
                        ${location.cons.map(con => `<li>${con}</li>`).join('')}
                    </ul>
                </div>
            `;

            // Marcar se já foi selecionado
            if (this.state.selectedLocation === locationKey) {
                locationCard.classList.add('selected');
            }

            locationCard.addEventListener('click', () => {
                this.selectLocation(locationKey);
            });

            locationsGrid.appendChild(locationCard);
        });

        this.updateBudgetDisplay();
    },

    selectLocation(locationKey) {
        const location = this.data.locations[locationKey];

        // Verificar orçamento
        if (this.state.currentSpending + location.cost > this.state.totalBudget) {
            this.showAlert('Orçamento insuficiente para esta localização!', 'error');
            return;
        }

        // Remover seleção anterior
        const locationCards = document.querySelectorAll('.location-card');
        locationCards.forEach(card => card.classList.remove('selected'));

        // Selecionar nova localização
        const selectedCard = document.querySelector(`[data-location="${locationKey}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            this.state.selectedLocation = locationKey;

            const confirmBtn = document.getElementById('confirmLocation');
            if (confirmBtn) {
                confirmBtn.classList.remove('hidden');
                confirmBtn.disabled = false;
            }
        }
    },

    confirmLocation() {
        if (!this.state.selectedLocation) {
            this.showAlert('Selecione uma localização primeiro.', 'error');
            return;
        }

        const location = this.data.locations[this.state.selectedLocation];

        try {
            this.showLoading('Confirmando localização...');

            // Deduzir custo do orçamento
            this.state.currentSpending += location.cost;

            const locationResult = document.getElementById('locationResult');
            const chosenLocationDiv = document.getElementById('chosenLocation');

            if (locationResult) locationResult.classList.remove('hidden');

            if (chosenLocationDiv) {
                chosenLocationDiv.innerHTML = `
                    <div class="location-icon" style="font-size: 3rem; margin-bottom: 1rem;">${location.icon}</div>
                    <h4 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${location.name}</h4>
                    <p style="color: #6b7280; margin-bottom: 1rem;">${location.description}</p>
                    <div style="font-size: 0.9rem; color: #dc2626;">
                        <strong>Custo:</strong> R$ ${location.cost.toLocaleString()}
                    </div>
                `;
            }

            // Atualizar orçamento
            this.updateBudgetDisplay();

            // Adicionar pontos por decisão de localização
            this.state.teamScore += 100;

            this.hideLoading();
            this.showAlert(`Sede escolhida: ${location.name}!`, 'success');

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao confirmar localização:', error);
            this.showAlert('Erro ao confirmar localização: ' + error.message, 'error');
        }
    },

    // ===== FASE 5: SELEÇÃO DE EQUIPAMENTOS =====
    loadEquipmentSelection() {
        console.log('💻 Carregando seleção de equipamentos');

        const equipmentGrid = document.getElementById('equipmentGrid');
        if (!equipmentGrid) return;

        equipmentGrid.innerHTML = '';

        if (!this.state.selectedEquipment) {
            this.state.selectedEquipment = [];
        }

        Object.keys(this.data.equipment).forEach(equipmentKey => {
            const equipment = this.data.equipment[equipmentKey];
            const isSelected = this.state.selectedEquipment.includes(equipmentKey);

            const equipmentCard = document.createElement('div');
            equipmentCard.className = `equipment-card ${isSelected ? 'selected' : ''}`;
            equipmentCard.dataset.equipment = equipmentKey;

            equipmentCard.innerHTML = `
                <div class="equipment-icon">${equipment.icon}</div>
                <h5>${equipment.name}</h5>
                <p>${equipment.description}</p>
                <div class="equipment-cost">R$ ${equipment.cost.toLocaleString()}</div>
                <div class="equipment-items">
                    <strong>Inclui:</strong>
                    <ul>
                        ${equipment.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <button class="btn btn--sm equipment-btn" data-equipment="${equipmentKey}">
                    ${isSelected ? 'Remover' : 'Adquirir'}
                </button>
            `;

            equipmentCard.addEventListener('click', (e) => {
                if (e.target.classList.contains('equipment-btn')) {
                    this.toggleEquipment(equipmentKey);
                }
            });

            equipmentGrid.appendChild(equipmentCard);
        });

        this.updateBudgetDisplay();
    },

    toggleEquipment(equipmentKey) {
        const equipment = this.data.equipment[equipmentKey];
        const isSelected = this.state.selectedEquipment.includes(equipmentKey);

        if (isSelected) {
            // Remover equipamento
            this.state.selectedEquipment = this.state.selectedEquipment.filter(e => e !== equipmentKey);
            this.state.currentSpending -= equipment.cost;

            const card = document.querySelector(`[data-equipment="${equipmentKey}"]`);
            if (card) {
                card.classList.remove('selected');
                const btn = card.querySelector('.equipment-btn');
                if (btn) btn.textContent = 'Adquirir';
            }

            this.showAlert(`${equipment.name} removido.`, 'info');
        } else {
            // Verificar orçamento
            if (this.state.currentSpending + equipment.cost > this.state.totalBudget) {
                this.showAlert('Orçamento insuficiente para este equipamento!', 'error');
                return;
            }

            // Adicionar equipamento
            this.state.selectedEquipment.push(equipmentKey);
            this.state.currentSpending += equipment.cost;

            const card = document.querySelector(`[data-equipment="${equipmentKey}"]`);
            if (card) {
                card.classList.add('selected');
                const btn = card.querySelector('.equipment-btn');
                if (btn) btn.textContent = 'Remover';
            }

            this.showAlert(`${equipment.name} adquirido!`, 'success');
        }

        this.updateBudgetDisplay();
        this.saveState();
    },

    updateBudgetDisplay() {
        const spentAmount = document.getElementById('spentAmount');
        const currentSpending = document.getElementById('currentSpending');
        const remainingBudget = document.getElementById('remainingBudget');
        const budgetValue = document.getElementById('act1Budget');

        const remaining = this.state.totalBudget - this.state.currentSpending;

        if (spentAmount) {
            spentAmount.textContent = `R$ ${this.state.currentSpending.toLocaleString()}`;
        }

        if (currentSpending) {
            // Calcular gasto atual (apenas equipamentos selecionados)
            const equipmentCost = this.state.selectedEquipment.reduce((total, equipKey) => {
                return total + this.data.equipment[equipKey]?.cost || 0;
            }, 0);
            currentSpending.textContent = `R$ ${equipmentCost.toLocaleString()}`;
        }

        if (remainingBudget) {
            remainingBudget.textContent = `R$ ${remaining.toLocaleString()}`;
            remainingBudget.style.color = remaining < 0 ? '#dc2626' : '#16a34a';
        }

        if (budgetValue) {
            budgetValue.textContent = `R$ ${remaining.toLocaleString()}`;
        }
    },

    finishAct1() {
        try {
            this.showLoading('Finalizando Ato 1...');

            // Calcular pontuação final baseada na eficiência do orçamento
            const budgetEfficiency = this.state.currentSpending / this.state.totalBudget;
            let efficiencyBonus = 0;

            if (budgetEfficiency > 0.8 && budgetEfficiency <= 1.0) {
                efficiencyBonus = 300; // Uso muito eficiente
            } else if (budgetEfficiency > 0.6) {
                efficiencyBonus = 200; // Uso moderado
            } else if (budgetEfficiency > 0.4) {
                efficiencyBonus = 150; // Uso conservador
            } else {
                efficiencyBonus = 100; // Muito conservador
            }

            // Bonus por equipamentos selecionados
            const equipmentBonus = this.state.selectedEquipment.length * 50;

            this.state.teamScore += efficiencyBonus + equipmentBonus;

            // Mostrar resultado
            const act1Result = document.getElementById('act1Result');
            const act1Score = document.getElementById('act1Score');

            if (act1Result) act1Result.classList.remove('hidden');
            if (act1Score) act1Score.textContent = this.state.teamScore.toLocaleString();

            // Salvar progresso
            if (this.state.currentTeam) {
                this.state.currentTeam.act1Completed = true;
                this.state.currentTeam.act1Score = this.state.teamScore;
                this.state.currentTeam.act1Decisions = {
                    segment: this.state.selectedSegment,
                    ceo: this.state.selectedCeo,
                    location: this.state.selectedLocation,
                    equipment: this.state.selectedEquipment
                };
                this.saveTeamToDatabase(this.state.currentTeam);
            }

            this.hideLoading();
            this.showAlert(`Ato 1 concluído! Pontuação: ${this.state.teamScore}`, 'success');

            // Mostrar informação sobre aprovação do professor
            setTimeout(() => {
                this.showAlert('Aguarde a aprovação do professor para continuar para o Ato 2.', 'info');
            }, 2000);

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao finalizar Ato 1:', error);
            this.showAlert('Erro ao finalizar Ato 1: ' + error.message, 'error');
        }
    },

    // ===== SISTEMA DO PROFESSOR =====
    loadTeacherDashboard() {
        console.log('👩‍🏫 Carregando dashboard do professor');

        this.updateTeacherStats();
        this.loadTeamsMonitor();
        this.updateApprovalButtons();
    },

    updateTeacherStats() {
        const totalCompanies = document.getElementById('totalCompanies');
        const totalStudents = document.getElementById('totalStudents');
        const currentAct = document.getElementById('currentAct');
        const completedTeams = document.getElementById('completedTeams');

        // Simular estatísticas (seria baseado em dados reais do Firebase)
        const stats = this.getTeacherStats();

        if (totalCompanies) totalCompanies.textContent = stats.totalTeams;
        if (totalStudents) totalStudents.textContent = stats.totalStudents;
        if (currentAct) currentAct.textContent = stats.currentAct;
        if (completedTeams) completedTeams.textContent = stats.completedTeams;
    },

    getTeacherStats() {
        const storedTeams = JSON.parse(localStorage.getItem('empresatec_teams') || '{}');
        const teams = Object.values(storedTeams);

        return {
            totalTeams: teams.length,
            totalStudents: teams.reduce((sum, team) => sum + (team.members?.length || 0), 0),
            currentAct: 1,
            completedTeams: teams.filter(team => team.act1Completed).length
        };
    },

    loadTeamsMonitor() {
        const teamsMonitor = document.getElementById('teamsMonitor');
        if (!teamsMonitor) return;

        const storedTeams = JSON.parse(localStorage.getItem('empresatec_teams') || '{}');
        const teams = Object.values(storedTeams);

        if (teams.length === 0) {
            teamsMonitor.innerHTML = '<div class="loading-message">📝 Nenhuma empresa criada ainda</div>';
            return;
        }

        teamsMonitor.innerHTML = '';

        teams.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.className = 'team-card';

            const status = team.act1Completed ? '✅ Ato 1 Completo' : '🔄 Em Andamento';
            const score = team.act1Score || 0;

            teamCard.innerHTML = `
                <h4>${team.name}</h4>
                <div class="team-info">
                    <div class="info-item">
                        <strong>Código:</strong> <span>${team.code}</span>
                    </div>
                    <div class="info-item">
                        <strong>👥 Membros:</strong> <span>${team.members?.length || 0}</span>
                    </div>
                    <div class="info-item">
                        <strong>📊 Status:</strong> <span>${status}</span>
                    </div>
                    <div class="info-item">
                        <strong>🏆 Pontuação:</strong> <span>${score.toLocaleString()}</span>
                    </div>
                    <div class="info-item">
                        <strong>🕒 Criada:</strong> <span>${this.formatDate(team.createdAt)}</span>
                    </div>
                </div>
                <div class="team-actions">
                    <button class="btn btn--xs btn--outline" onclick="EmpresaTec.viewTeamDetails('${team.code}')">
                        👁️ Detalhes
                    </button>
                    <button class="btn btn--xs btn--danger" onclick="EmpresaTec.resetTeam('${team.code}')">
                        🗑️ Reset
                    </button>
                </div>
            `;

            teamsMonitor.appendChild(teamCard);
        });
    },

    updateApprovalButtons() {
        const acts = [1, 2, 3, 4, 5];

        acts.forEach(actNumber => {
            const btn = document.getElementById(`approveAct${actNumber}`);
            if (btn) {
                const isApproved = this.state.approvedActs[`act${actNumber}`];
                btn.disabled = isApproved;
                btn.textContent = isApproved ? `✅ Ato ${actNumber} Aprovado` : `✅ Aprovar Ato ${actNumber}`;

                // Só habilitar próximo ato se anterior foi aprovado
                if (actNumber > 1) {
                    const prevApproved = this.state.approvedActs[`act${actNumber-1}`];
                    if (!prevApproved && !isApproved) {
                        btn.disabled = true;
                        btn.textContent = `🔒 Ato ${actNumber} (Bloqueado)`;
                    }
                }
            }
        });
    },

    handleTeacherAction(actionId) {
        console.log(`🎯 Ação do professor: ${actionId}`);

        switch (actionId) {
            case 'approveAct1':
            case 'approveAct2':
            case 'approveAct3':
            case 'approveAct4':
            case 'approveAct5':
                const actNumber = actionId.slice(-1);
                this.approveAct(parseInt(actNumber));
                break;

            case 'showRanking':
                this.showRanking();
                break;

            case 'exportData':
                this.exportData();
                break;

            case 'generateReport':
                this.generateReport();
                break;

            case 'resetAllData':
                this.resetAllData();
                break;

            case 'backupData':
                this.backupData();
                break;

            case 'backToSimulation':
                this.backToSimulation();
                break;

            case 'teacherLogout':
                this.handleLogout();
                break;
        }
    },

    approveAct(actNumber) {
        if (!confirm(`Aprovar Ato ${actNumber}? Isto permitirá que as equipes avancem.`)) {
            return;
        }

        try {
            this.showLoading(`Aprovando Ato ${actNumber}...`);

            this.state.approvedActs[`act${actNumber}`] = true;

            // Salvar no localStorage
            localStorage.setItem('empresatec_approvals', JSON.stringify(this.state.approvedActs));

            this.updateApprovalButtons();

            this.hideLoading();
            this.showAlert(`Ato ${actNumber} aprovado! Equipes podem avançar.`, 'success');

        } catch (error) {
            this.hideLoading();
            console.error(`❌ Erro ao aprovar ato ${actNumber}:`, error);
            this.showAlert(`Erro ao aprovar ato: ${error.message}`, 'error');
        }
    },

    showRanking() {
        try {
            this.showLoading('Gerando ranking...');

            const storedTeams = JSON.parse(localStorage.getItem('empresatec_teams') || '{}');
            const teams = Object.values(storedTeams)
                .filter(team => team.act1Completed)
                .sort((a, b) => (b.act1Score || 0) - (a.act1Score || 0));

            this.displayRanking(teams);
            this.showScreen('rankingScreen');

            this.hideLoading();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao gerar ranking:', error);
            this.showAlert('Erro ao gerar ranking: ' + error.message, 'error');
        }
    },

    displayRanking(teams) {
        const rankingSummary = document.getElementById('rankingSummary');
        const rankingTable = document.getElementById('rankingTable');

        // Estatísticas gerais
        const totalTeams = teams.length;
        const avgScore = totalTeams > 0 ? teams.reduce((sum, team) => sum + (team.act1Score || 0), 0) / totalTeams : 0;
        const highestScore = teams.length > 0 ? teams[0].act1Score || 0 : 0;

        if (rankingSummary) {
            rankingSummary.innerHTML = `
                <div class="summary-stat">
                    <h4>🏢 Empresas Participantes</h4>
                    <div class="stat-value">${totalTeams}</div>
                </div>
                <div class="summary-stat">
                    <h4>🎯 Pontuação Média</h4>
                    <div class="stat-value">${Math.round(avgScore)}</div>
                </div>
                <div class="summary-stat">
                    <h4>👑 Maior Pontuação</h4>
                    <div class="stat-value">${highestScore.toLocaleString()}</div>
                </div>
            `;
        }

        // Tabela de ranking
        if (rankingTable) {
            if (teams.length === 0) {
                rankingTable.innerHTML = '<div class="loading-message">📊 Nenhuma empresa completou o Ato 1 ainda</div>';
                return;
            }

            rankingTable.innerHTML = '';

            teams.forEach((team, index) => {
                const position = index + 1;
                const medal = position <= 3 ? ['🥇', '🥈', '🥉'][position - 1] : `${position}º`;

                const rankingItem = document.createElement('div');
                rankingItem.className = `ranking-item ${position <= 3 ? 'podium' : ''}`;

                rankingItem.innerHTML = `
                    <div class="ranking-position">${medal}</div>
                    <div class="ranking-team">
                        <div class="team-name">${team.name}</div>
                        <div class="team-details">
                            ${team.members.length} membros • Código: ${team.code}
                        </div>
                    </div>
                    <div class="ranking-scores">
                        <div class="total-score">${(team.act1Score || 0).toLocaleString()}</div>
                        <div class="act-scores">Ato 1 Completo</div>
                    </div>
                `;

                rankingTable.appendChild(rankingItem);
            });
        }
    },

    closeRanking() {
        this.showScreen('teacherScreen');
    },

    exportData() {
        try {
            const storedTeams = JSON.parse(localStorage.getItem('empresatec_teams') || '{}');
            const exportData = {
                timestamp: new Date().toISOString(),
                teams: storedTeams,
                approvals: this.state.approvedActs
            };

            const dataStr = JSON.stringify(exportData, null, 2);
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

    generateReport() {
        this.showAlert('Relatório detalhado em desenvolvimento!', 'info');
    },

    resetAllData() {
        if (!confirm('⚠️ ATENÇÃO: Isto irá apagar TODOS os dados das equipes! Continuar?')) {
            return;
        }

        if (!confirm('🚨 CONFIRMAÇÃO FINAL: Todos os dados serão perdidos!')) {
            return;
        }

        try {
            // Limpar todos os dados
            localStorage.removeItem('empresatec_teams');
            localStorage.removeItem('empresatec_approvals');
            localStorage.removeItem('empresatec_state');

            // Reset estado
            this.state.approvedActs = {
                act1: false, act2: false, act3: false, act4: false, act5: false
            };

            this.updateApprovalButtons();
            this.loadTeamsMonitor();

            this.showAlert('🎯 Todos os dados foram resetados!', 'success');

        } catch (error) {
            console.error('❌ Erro ao resetar:', error);
            this.showAlert('Erro ao resetar dados: ' + error.message, 'error');
        }
    },

    backupData() {
        this.exportData(); // Mesmo que exportar por agora
    },

    backToSimulation() {
        if (this.state.currentUser && !this.state.isTeacher) {
            if (this.state.currentTeam) {
                this.showScreen('act1Screen');
            } else {
                this.showScreen('teamScreen');
            }
        } else {
            this.showScreen('loginScreen');
        }
    },

    viewTeamDetails(teamCode) {
        const storedTeams = JSON.parse(localStorage.getItem('empresatec_teams') || '{}');
        const team = storedTeams[teamCode];

        if (!team) {
            this.showAlert('Equipe não encontrada.', 'error');
            return;
        }

        const details = `
Empresa: ${team.name}
Código: ${team.code}
Membros: ${team.members.length}

Status: ${team.act1Completed ? 'Ato 1 Completo' : 'Em andamento'}
Pontuação: ${team.act1Score || 0}

Criada em: ${this.formatDate(team.createdAt)}

Membros:
${team.members.map(m => `• ${m.name} ${m.isLeader ? '(Líder)' : ''}`).join('\n')}
        `;

        alert(details);
    },

    resetTeam(teamCode) {
        if (!confirm(`Resetar empresa ${teamCode}? Esta ação não pode ser desfeita.`)) {
            return;
        }

        try {
            const storedTeams = JSON.parse(localStorage.getItem('empresatec_teams') || '{}');
            delete storedTeams[teamCode];
            localStorage.setItem('empresatec_teams', JSON.stringify(storedTeams));

            this.loadTeamsMonitor();
            this.updateTeacherStats();

            this.showAlert(`Empresa ${teamCode} resetada!`, 'success');

        } catch (error) {
            console.error('❌ Erro ao resetar equipe:', error);
            this.showAlert('Erro ao resetar equipe: ' + error.message, 'error');
        }
    },

    // ===== UTILITÁRIOS =====
    saveVote(voteType, vote) {
        // Simular salvamento de voto (seria Firebase na versão completa)
        const votes = JSON.parse(localStorage.getItem('empresatec_votes') || '[]');
        votes.push({
            teamCode: this.state.currentTeam?.code,
            userId: this.state.currentUser?.uid,
            voteType: voteType,
            vote: vote,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('empresatec_votes', JSON.stringify(votes));
    },

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
        if (!dateString) return 'N/A';

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
            return 'N/A';
        }
    },

    saveState() {
        try {
            localStorage.setItem('empresatec_state', JSON.stringify(this.state));
        } catch (error) {
            console.error('❌ Erro ao salvar estado:', error);
        }
    },

    loadState() {
        try {
            const saved = localStorage.getItem('empresatec_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                Object.assign(this.state, parsed);
            }

            // Carregar aprovações
            const approvals = localStorage.getItem('empresatec_approvals');
            if (approvals) {
                this.state.approvedActs = JSON.parse(approvals);
            }
        } catch (error) {
            console.error('❌ Erro ao carregar estado:', error);
        }
    },

    initializeScreen() {
        // Determinar tela inicial baseada no estado
        if (this.state.isAuthenticated) {
            if (this.state.isTeacher) {
                this.showTeacherLogin();
            } else if (this.state.currentTeam) {
                this.showScreen('act1Screen');
                this.loadAct1();
            } else {
                this.showScreen('teamScreen');
            }
        } else {
            this.showScreen('loginScreen');
        }
    },

    loadAct1() {
        // Carregar Ato 1 baseado na fase atual
        this.goToPhase(this.state.currentPhase);
    },

    showAlert(message, type = 'info') {
        const alertSystem = document.getElementById('alertSystem');
        const alertIcon = document.getElementById('alertIcon');
        const alertMessage = document.getElementById('alertMessage');
        const alertContent = document.getElementById('alertContent');

        if (!alertSystem || !alertIcon || !alertMessage || !alertContent) {
            // Fallback para alert nativo
            alert(message);
            return;
        }

        // Ícones por tipo
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        // Atualizar conteúdo
        alertIcon.textContent = icons[type] || icons.info;
        alertMessage.textContent = message;

        // Atualizar classe do tipo
        alertContent.className = `alert-content ${type}`;

        // Mostrar alerta
        alertSystem.classList.remove('hidden');

        // Auto-fechar após 5 segundos
        setTimeout(() => {
            alertSystem.classList.add('hidden');
        }, 5000);

        // Botão de fechar
        const alertClose = document.getElementById('alertClose');
        if (alertClose) {
            alertClose.onclick = () => {
                alertSystem.classList.add('hidden');
            };
        }

        console.log(`${icons[type]} ${message}`);
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
    }
};

// ===== INICIALIZAÇÃO AUTOMÁTICA =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 EmpresaTec - Sistema Empresarial Educacional');
    console.log('📅 Data:', new Date().toLocaleString('pt-BR'));

    try {
        EmpresaTec.init();
        console.log('✅ Sistema inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
        alert('Erro ao inicializar sistema. Verifique o console para detalhes.');
    }
});

// Disponibilizar globalmente para callbacks
window.EmpresaTec = EmpresaTec;
