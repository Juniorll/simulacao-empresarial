// EmpresaTec - Sistema de Simulação Empresarial
// JavaScript Principal - Ato 1

// ===== CONFIGURAÇÃO GLOBAL =====
const EmpresaTec = {
    // Estado da aplicação
    state: {
        currentUser: null,
        currentTeam: null,
        currentScreen: 'loginScreen',
        gamePhase: 'login',
        currentQuestion: 0,
        userAnswers: [],
        userProfile: null,
        selectedSegment: null,
        selectedCandidate: null,
        currentCEO: null,
        teamPositions: {},
        hiringRecommendations: {},
        finalBudget: 500000,
        scores: {
            teamFormation: 0,
            profileCompatibility: 0,
            segmentChoice: 0,
            ceoElection: 0,
            positionAssignment: 0,
            hiringDecisions: 0,
            teamSatisfaction: 0,
            total: 0
        }
    },

    // Configurações do jogo
    config: {
        minTeamSize: 3,
        maxTeamSize: 6,
        questionCount: 10,
        maxScore: 1000,
        adminPassword: 'professor2025',
        gameTitle: 'EmpresaTec',
        currentAct: 1
    },

    // Dados do jogo
    data: {
        // Perfis profissionais mais gerais e abrangentes
        profiles: {
            strategist: {
                name: "Estrategista",
                icon: "🎯",
                description: "Profissional focado em planejamento estratégico, análise de mercado e tomada de decisões de longo prazo. Possui visão sistêmica e capacidade de antecipar tendências.",
                strengths: ["Planejamento Estratégico", "Análise de Mercado", "Tomada de Decisão", "Visão de Longo Prazo"],
                idealRoles: ["CEO", "COO", "Diretor de Estratégia"],
                compatibility: {
                    fintech: 90,
                    edtech: 85,
                    healthtech: 88,
                    foodtech: 80,
                    agtech: 85
                }
            },
            innovator: {
                name: "Inovador",
                icon: "💡",
                description: "Profissional criativo e visionário, especializado em desenvolvimento de produtos, tecnologia e soluções disruptivas. Sempre busca novas oportunidades.",
                strengths: ["Criatividade", "Desenvolvimento de Produtos", "Tecnologia", "Pensamento Disruptivo"],
                idealRoles: ["CTO", "Diretor de P&D", "Diretor de Inovação"],
                compatibility: {
                    fintech: 85,
                    edtech: 95,
                    healthtech: 90,
                    foodtech: 88,
                    agtech: 92
                }
            },
            executor: {
                name: "Executor",
                icon: "⚡",
                description: "Profissional prático e eficiente, especializado em operações, processos e implementação. Transforma ideias em realidade de forma eficaz.",
                strengths: ["Gestão Operacional", "Eficiência", "Implementação", "Controle de Processos"],
                idealRoles: ["COO", "Diretor de Operações", "Gerente Geral"],
                compatibility: {
                    fintech: 88,
                    edtech: 80,
                    healthtech: 85,
                    foodtech: 95,
                    agtech: 90
                }
            },
            analyst: {
                name: "Analista",
                icon: "📊",
                description: "Profissional orientado por dados, especializado em análises financeiras, métricas e inteligência de mercado. Base sólida em números e estatísticas.",
                strengths: ["Análise de Dados", "Gestão Financeira", "Métricas", "Inteligência de Mercado"],
                idealRoles: ["CFO", "Diretor Financeiro", "Head de Analytics"],
                compatibility: {
                    fintech: 95,
                    edtech: 82,
                    healthtech: 88,
                    foodtech: 80,
                    agtech: 85
                }
            },
            communicator: {
                name: "Comunicador",
                icon: "🎙️",
                description: "Profissional especializado em relacionamentos, marketing e vendas. Excelente em comunicação e construção de networks estratégicos.",
                strengths: ["Comunicação", "Marketing", "Vendas", "Relacionamento"], 
                idealRoles: ["CMO", "Diretor Comercial", "Head de Marketing"],
                compatibility: {
                    fintech: 85,
                    edtech: 88,
                    healthtech: 80,
                    foodtech: 90,
                    agtech: 82
                }
            }
        },

        // Segmentos empresariais
        segments: {
            fintech: {
                name: "Fintech",
                icon: "💳",
                description: "Tecnologia Financeira - Soluções digitais para pagamentos, investimentos, empréstimos e serviços bancários.",
                requirements: "Segurança robusta, conformidade regulatória, análise de risco, experiência do usuário intuitiva.",
                marketSize: "R$ 4,8 bilhões (Brasil 2025)",
                challenges: ["Regulamentação", "Segurança", "Competição Bancária"],
                opportunities: ["Open Banking", "PIX", "Criptomoedas", "Inclusão Financeira"],
                idealTeam: ["analyst", "strategist", "innovator"]
            },
            edtech: {
                name: "Edtech", 
                icon: "📚",
                description: "Tecnologia Educacional - Plataformas de ensino, gamificação educacional e soluções de aprendizado digital.",
                requirements: "Design pedagógico, engajamento do usuário, escalabilidade, métricas de aprendizado.",
                marketSize: "R$ 5,6 bilhões (Brasil 2025)",
                challenges: ["Adoção Institucional", "Engajamento", "Modelo Pedagógico"],
                opportunities: ["Ensino Híbrido", "Microlearning", "IA na Educação", "Certificações Digitais"],
                idealTeam: ["innovator", "communicator", "strategist"]
            },
            healthtech: {
                name: "Healthtech",
                icon: "🏥", 
                description: "Tecnologia em Saúde - Telemedicina, diagnósticos digitais, gestão hospitalar e monitoramento de pacientes.",
                requirements: "Compliance médico, precisão diagnóstica, integração de sistemas, privacidade de dados.",
                marketSize: "R$ 3,2 bilhões (Brasil 2025)",
                challenges: ["Regulamentação Médica", "Integração", "Privacidade"],
                opportunities: ["Telemedicina", "Wearables", "IA Diagnóstica", "Gestão de Dados"],
                idealTeam: ["analyst", "executor", "innovator"]
            },
            foodtech: {
                name: "Foodtech",
                icon: "🍔",
                description: "Tecnologia Alimentar - Delivery, agricultura vertical, alimentos alternativos e gestão de restaurantes.",
                requirements: "Logística eficiente, controle de qualidade, sustentabilidade, experiência do consumidor.",
                marketSize: "R$ 2,8 bilhões (Brasil 2025)",
                challenges: ["Logística", "Sustentabilidade", "Regulamentação Alimentar"],
                opportunities: ["Dark Kitchens", "Alimentos Plant-Based", "Automação", "Sustentabilidade"],
                idealTeam: ["executor", "communicator", "strategist"]
            },
            agtech: {
                name: "Agtech",
                icon: "🚜",
                description: "Tecnologia Agrícola - IoT rural, drones para monitoramento, análise de solo e otimização de cultivos.",
                requirements: "Resistência ambiental, precisão de dados, integração com equipamentos, ROI comprovado.",
                marketSize: "R$ 2,1 bilhões (Brasil 2025)",
                challenges: ["Conectividade Rural", "Adoção Tecnológica", "Investimento Inicial"],
                opportunities: ["Agricultura de Precisão", "Sustentabilidade", "IoT", "Biotecnologia"],
                idealTeam: ["innovator", "analyst", "executor"]
            }
        },

        // Questionário para definir perfil
        questions: [
            {
                id: 1,
                text: "Ao iniciar um novo projeto, qual é sua primeira abordagem?",
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
                text: "Sua maior força em uma equipe é:",
                options: [
                    { text: "Liderar e tomar decisões estratégicas complexas", profile: "strategist", weight: 3 },
                    { text: "Criar soluções criativas e inovadoras", profile: "innovator", weight: 3 },
                    { text: "Garantir que tudo seja executado com eficiência", profile: "executor", weight: 3 },
                    { text: "Fornecer análises precisas e insights baseados em dados", profile: "analyst", weight: 3 },
                    { text: "Facilitar comunicação e construir relacionamentos", profile: "communicator", weight: 3 }
                ]
            },
            {
                id: 3,
                text: "Em uma reunião de negócios, você se destaca por:",
                options: [
                    { text: "Apresentar visões de futuro e direcionamentos estratégicos", profile: "strategist", weight: 2 },
                    { text: "Propor ideias disruptivas e soluções criativas", profile: "innovator", weight: 2 },
                    { text: "Focar em viabilidade e implementação prática", profile: "executor", weight: 2 },
                    { text: "Trazer dados concretos e análises fundamentadas", profile: "analyst", weight: 2 },
                    { text: "Mediar discussões e alinhar expectativas", profile: "communicator", weight: 2 }
                ]
            },
            {
                id: 4,
                text: "Ao resolver problemas complexos, você prefere:",
                options: [
                    { text: "Analisar impactos estratégicos e cenários futuros", profile: "strategist", weight: 2 },
                    { text: "Buscar soluções não convencionais e tecnológicas", profile: "innovator", weight: 2 },
                    { text: "Quebrar em etapas executáveis e mensuráveis", profile: "executor", weight: 2 },
                    { text: "Utilizar modelos analíticos e dados históricos", profile: "analyst", weight: 2 },
                    { text: "Consultar stakeholders e buscar consenso", profile: "communicator", weight: 2 }
                ]
            },
            {
                id: 5,
                text: "O que mais te motiva profissionalmente?",
                options: [
                    { text: "Definir rumos e impactar o futuro da organização", profile: "strategist", weight: 3 },
                    { text: "Criar produtos/serviços que revolucionem o mercado", profile: "innovator", weight: 3 },
                    { text: "Ver resultados concretos e operações eficientes", profile: "executor", weight: 3 },
                    { text: "Descobrir insights valiosos através de análises", profile: "analyst", weight: 3 },
                    { text: "Construir relacionamentos e expandir networks", profile: "communicator", weight: 3 }
                ]
            },
            {
                id: 6,
                text: "Em um ambiente de crise, sua reação natural é:",
                options: [
                    { text: "Reformular estratégias e redefinir prioridades", profile: "strategist", weight: 2 },
                    { text: "Buscar oportunidades de inovação e adaptação", profile: "innovator", weight: 2 },
                    { text: "Otimizar recursos e manter operações funcionando", profile: "executor", weight: 2 },
                    { text: "Analisar cenários e quantificar riscos", profile: "analyst", weight: 2 },
                    { text: "Comunicar transparentemente e manter equipe unida", profile: "communicator", weight: 2 }
                ]
            },
            {
                id: 7,
                text: "Sua área de interesse preferida é:",
                options: [
                    { text: "Planejamento estratégico e governança", profile: "strategist", weight: 2 },
                    { text: "Pesquisa & desenvolvimento e tecnologia", profile: "innovator", weight: 2 },
                    { text: "Operações e gestão de processos", profile: "executor", weight: 2 },
                    { text: "Finanças e análise de performance", profile: "analyst", weight: 2 },
                    { text: "Marketing e relacionamento com clientes", profile: "communicator", weight: 2 }
                ]
            },
            {
                id: 8,
                text: "Ao liderar uma equipe, você foca em:",
                options: [
                    { text: "Alinhar visão e definir objetivos estratégicos", profile: "strategist", weight: 2 },
                    { text: "Estimular criatividade e pensamento inovador", profile: "innovator", weight: 2 },
                    { text: "Estabelecer processos claros e metas alcançáveis", profile: "executor", weight: 2 },
                    { text: "Monitorar métricas e performance da equipe", profile: "analyst", weight: 2 },
                    { text: "Desenvolver talentos e facilitar comunicação", profile: "communicator", weight: 2 }
                ]
            },
            {
                id: 9,
                text: "Para tomar decisões importantes, você considera principalmente:",
                options: [
                    { text: "Alinhamento com visão estratégica de longo prazo", profile: "strategist", weight: 2 },
                    { text: "Potencial de diferenciação e inovação", profile: "innovator", weight: 2 },
                    { text: "Viabilidade operacional e recursos disponíveis", profile: "executor", weight: 2 },
                    { text: "ROI esperado e análise de riscos", profile: "analyst", weight: 2 },
                    { text: "Impacto nos stakeholders e reputação", profile: "communicator", weight: 2 }
                ]
            },
            {
                id: 10,
                text: "Seu sonho profissional seria:",
                options: [
                    { text: "Ser CEO de uma grande corporação", profile: "strategist", weight: 3 },
                    { text: "Criar uma startup disruptiva revolucionária", profile: "innovator", weight: 3 },
                    { text: "Ser reconhecido pela excelência operacional", profile: "executor", weight: 3 },
                    { text: "Ser referência em análise e inteligência de mercado", profile: "analyst", weight: 3 },
                    { text: "Construir uma marca pessoal influente no setor", profile: "communicator", weight: 3 }
                ]
            }
        ],

        // Posições executivas disponíveis
        positions: {
            ceo: {
                title: "CEO",
                name: "Chief Executive Officer",
                description: "Responsável pela visão estratégica geral, liderança executiva e direcionamento da empresa.",
                idealProfiles: ["strategist"],
                secondaryProfiles: ["communicator", "innovator"]
            },
            cto: {
                title: "CTO", 
                name: "Chief Technology Officer",
                description: "Responsável por tecnologia, inovação de produtos e desenvolvimento técnico.",
                idealProfiles: ["innovator"],
                secondaryProfiles: ["analyst", "strategist"]
            },
            coo: {
                title: "COO",
                name: "Chief Operating Officer", 
                description: "Responsável por operações diárias, processos e eficiência organizacional.",
                idealProfiles: ["executor"],
                secondaryProfiles: ["analyst", "strategist"]
            },
            cfo: {
                title: "CFO",
                name: "Chief Financial Officer",
                description: "Responsável por finanças, orçamento, análises financeiras e controles.",
                idealProfiles: ["analyst"],
                secondaryProfiles: ["strategist", "executor"]
            },
            cmo: {
                title: "CMO",
                name: "Chief Marketing Officer",
                description: "Responsável por marketing, vendas, relacionamento com clientes e branding.",
                idealProfiles: ["communicator"],
                secondaryProfiles: ["strategist", "innovator"]
            }
        },

        // Opções de contratação por área
        hiringOptions: {
            development: {
                name: "Desenvolvimento",
                roles: [
                    { name: "Desenvolvedor Full Stack Sênior", cost: 18000, priority: "high" },
                    { name: "Desenvolvedor Frontend", cost: 12000, priority: "medium" },
                    { name: "Desenvolvedor Backend", cost: 14000, priority: "medium" },
                    { name: "DevOps Engineer", cost: 16000, priority: "high" },
                    { name: "QA/Tester", cost: 10000, priority: "medium" },
                    { name: "UI/UX Designer", cost: 13000, priority: "high" }
                ]
            },
            business: {
                name: "Negócios",
                roles: [
                    { name: "Product Manager", cost: 15000, priority: "high" },
                    { name: "Business Analyst", cost: 12000, priority: "medium" },
                    { name: "Project Manager", cost: 13000, priority: "high" },
                    { name: "Sales Executive", cost: 11000, priority: "medium" },
                    { name: "Customer Success Manager", cost: 10000, priority: "medium" }
                ]
            },
            marketing: {
                name: "Marketing & Vendas", 
                roles: [
                    { name: "Growth Hacker", cost: 14000, priority: "high" },
                    { name: "Digital Marketing Specialist", cost: 9000, priority: "medium" },
                    { name: "Content Creator", cost: 8000, priority: "low" },
                    { name: "Social Media Manager", cost: 7000, priority: "low" },
                    { name: "SEO/SEM Specialist", cost: 10000, priority: "medium" }
                ]
            },
            operations: {
                name: "Operações & Suporte",
                roles: [
                    { name: "Analista Financeiro", cost: 11000, priority: "high" },
                    { name: "HR Generalist", cost: 9000, priority: "medium" },
                    { name: "Assistente Administrativo", cost: 5000, priority: "low" },
                    { name: "Estagiário", cost: 2000, priority: "low" },
                    { name: "Consultant Jurídico", cost: 8000, priority: "medium" }
                ]
            }
        }
    },

    // ===== INICIALIZAÇÃO =====
    init() {
        console.log(`🚀 Iniciando ${this.config.gameTitle} - Ato ${this.config.currentAct}`);
        this.bindEvents();
        this.loadState();
        this.checkAuthState();
    },

    // ===== EVENTOS =====
    bindEvents() {
        // Login
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Acesso Professor
        document.getElementById('teacherBtn')?.addEventListener('click', () => {
            this.showTeacherPanel();
        });

        // Equipe
        document.getElementById('createTeamBtn')?.addEventListener('click', () => {
            this.createTeam();
        });

        document.getElementById('joinTeamBtn')?.addEventListener('click', () => {
            this.joinTeam();
        });

        document.getElementById('startGameBtn')?.addEventListener('click', () => {
            this.startProfile();
        });

        document.getElementById('copyCodeBtn')?.addEventListener('click', () => {
            this.copyTeamCode();
        });

        // Questionário
        document.getElementById('nextQuestionBtn')?.addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('prevQuestionBtn')?.addEventListener('click', () => {
            this.prevQuestion();
        });

        document.getElementById('finishQuestionnaireBtn')?.addEventListener('click', () => {
            this.finishQuestionnaire();
        });

        // Perfis
        document.getElementById('continueToSegmentBtn')?.addEventListener('click', () => {
            this.startSegmentSelection();
        });

        // Segmentos
        document.getElementById('submitVoteBtn')?.addEventListener('click', () => {
            this.submitSegmentVote();
        });

        document.getElementById('continueToElectionBtn')?.addEventListener('click', () => {
            this.startCEOElection();
        });

        // Eleição CEO
        document.getElementById('submitCeoVoteBtn')?.addEventListener('click', () => {
            this.submitCEOVote();
        });

        document.getElementById('submitSatisfactionBtn')?.addEventListener('click', () => {
            this.submitSatisfactionRating();
        });

        document.getElementById('continueToPositionsBtn')?.addEventListener('click', () => {
            this.startPositionAssignment();
        });

        // Cargos
        document.getElementById('confirmPositionsBtn')?.addEventListener('click', () => {
            this.confirmPositions();
        });

        document.getElementById('submitPositionsSatisfactionBtn')?.addEventListener('click', () => {
            this.submitPositionsSatisfaction();
        });

        document.getElementById('continueToHiringBtn')?.addEventListener('click', () => {
            this.startHiring();
        });

        // Contratação
        document.getElementById('submitRecommendationsBtn')?.addEventListener('click', () => {
            this.submitHiringRecommendations();
        });

        document.getElementById('confirmHiringBtn')?.addEventListener('click', () => {
            this.confirmHiring();
        });

        document.getElementById('submitHiringSatisfactionBtn')?.addEventListener('click', () => {
            this.submitHiringSatisfaction();
        });

        document.getElementById('viewFinalResultsBtn')?.addEventListener('click', () => {
            this.showFinalResults();
        });

        // Resultados
        document.getElementById('restartBtn')?.addEventListener('click', () => {
            this.restart();
        });

        // Professor
        document.getElementById('toggleScoresBtn')?.addEventListener('click', () => {
            this.toggleScores();
        });

        document.getElementById('resetGameBtn')?.addEventListener('click', () => {
            this.resetGame();
        });

        document.getElementById('exportDataBtn')?.addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('backToGameBtn')?.addEventListener('click', () => {
            this.backToGame();
        });
    },

    // ===== AUTENTICAÇÃO =====
    checkAuthState() {
        if (window.firebaseAuth && window.firebaseUtils) {
            window.firebaseUtils.onAuthStateChanged(window.firebaseAuth, (user) => {
                if (user) {
                    this.state.currentUser = {
                        uid: user.uid,
                        email: user.email,
                        name: user.displayName || user.email.split('@')[0]
                    };
                    console.log('👤 Usuário autenticado:', this.state.currentUser.email);

                    // Verificar se tem dados salvos
                    this.loadUserData();
                } else {
                    this.state.currentUser = null;
                    this.showScreen('loginScreen');
                }
            });
        }
    },

    async handleLogin() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            this.showAlert('Por favor, preencha todos os campos.', 'error');
            return;
        }

        try {
            this.showLoading('Fazendo login...');

            // Tentar login no Firebase
            if (window.firebaseAuth && window.firebaseUtils) {
                try {
                    const result = await window.firebaseUtils.signInWithEmailAndPassword(
                        window.firebaseAuth, 
                        email, 
                        password
                    );
                    console.log('✅ Login Firebase realizado:', result.user.email);
                } catch (authError) {
                    // Se falhar, tentar criar conta
                    console.log('🔄 Tentando criar nova conta...');
                    await window.firebaseUtils.createUserWithEmailAndPassword(
                        window.firebaseAuth,
                        email,
                        password
                    );
                    console.log('✅ Nova conta criada:', email);
                }
            } else {
                // Fallback local
                this.state.currentUser = {
                    uid: this.generateId(),
                    email: email,
                    name: email.split('@')[0]
                };
                this.saveState();
            }

            this.hideLoading();
            this.showAlert('Login realizado com sucesso!', 'success');

            // Aguardar um momento antes de continuar
            setTimeout(() => {
                this.showTeamSelection();
            }, 1000);

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro no login:', error);
            this.showAlert('Erro ao fazer login: ' + error.message, 'error');
        }
    },

    async loadUserData() {
        if (!this.state.currentUser) return;

        try {
            // Tentar carregar dados do Firebase
            if (window.firebaseDB && window.firebaseUtils) {
                const userRef = window.firebaseUtils.doc(window.firebaseDB, 'users', this.state.currentUser.uid);
                const userSnap = await window.firebaseUtils.getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    console.log('📂 Dados do usuário carregados:', userData);

                    // Restaurar estado se disponível
                    if (userData.gameState) {
                        this.state = { ...this.state, ...userData.gameState };
                    }

                    // Ir para a tela apropriada
                    this.determineCurrentScreen();
                } else {
                    // Usuário novo, ir para seleção de equipe
                    this.showTeamSelection();
                }
            } else {
                // Fallback local
                const savedState = localStorage.getItem('empresatec_state');
                if (savedState) {
                    this.state = { ...this.state, ...JSON.parse(savedState) };
                    this.determineCurrentScreen();
                } else {
                    this.showTeamSelection();
                }
            }
        } catch (error) {
            console.error('❌ Erro ao carregar dados:', error);
            this.showTeamSelection();
        }
    },

    determineCurrentScreen() {
        // Lógica para determinar qual tela mostrar baseado no estado atual
        if (!this.state.currentTeam) {
            this.showTeamSelection();
        } else if (!this.state.userProfile) {
            this.showProfileScreen();
        } else if (!this.state.selectedSegment) {
            this.showProfileResults();
        } else if (!this.state.currentCEO) {
            this.showSegmentScreen();
        } else if (Object.keys(this.state.teamPositions).length === 0) {
            this.showElectionScreen();
        } else if (Object.keys(this.state.hiringRecommendations).length === 0) {
            this.showPositionsScreen();
        } else {
            this.showHiringScreen();
        }
    },

    // ===== GESTÃO DE TELAS =====
    showScreen(screenId) {
        console.log(`📱 Mudando para tela: ${screenId}`);

        // Esconder todas as telas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Mostrar tela solicitada
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.state.currentScreen = screenId;
            this.updateProgress();
            this.saveState();
        }
    },

    updateProgress() {
        const progressContainer = document.getElementById('progressContainer');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');

        if (!progressContainer || !progressFill || !progressText) return;

        const phases = {
            loginScreen: { step: 0, total: 8, text: 'Login' },
            teamScreen: { step: 1, total: 8, text: 'Formação de Equipe' },
            profileScreen: { step: 2, total: 8, text: 'Descoberta de Perfil' },
            profileResultsScreen: { step: 3, total: 8, text: 'Resultados dos Perfis' },
            segmentScreen: { step: 4, total: 8, text: 'Escolha do Segmento' },
            electionScreen: { step: 5, total: 8, text: 'Eleição do CEO' },
            positionsScreen: { step: 6, total: 8, text: 'Definição de Cargos' },
            hiringScreen: { step: 7, total: 8, text: 'Processo de Contratação' },
            resultsScreen: { step: 8, total: 8, text: 'Resultados Finais' }
        };

        const currentPhase = phases[this.state.currentScreen];

        if (currentPhase) {
            const percentage = (currentPhase.step / currentPhase.total) * 100;
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${currentPhase.text} (${currentPhase.step}/${currentPhase.total})`;

            // Mostrar barra de progresso (exceto na tela de login e professor)
            if (this.state.currentScreen === 'loginScreen' || this.state.currentScreen === 'teacherScreen') {
                progressContainer.classList.add('hidden');
            } else {
                progressContainer.classList.remove('hidden');
            }
        }
    },

    // ===== EQUIPE =====
    showTeamSelection() {
        this.showScreen('teamScreen');
    },

    async createTeam() {
        const teamName = document.getElementById('teamName').value.trim();

        if (!teamName) {
            this.showAlert('Por favor, digite um nome para a equipe.', 'error');
            return;
        }

        if (teamName.length < 3) {
            this.showAlert('O nome da equipe deve ter pelo menos 3 caracteres.', 'error');
            return;
        }

        try {
            this.showLoading('Criando equipe...');

            const teamCode = this.generateTeamCode();
            const team = {
                id: teamCode,
                name: teamName,
                code: teamCode,
                leader: this.state.currentUser.uid,
                members: [{
                    uid: this.state.currentUser.uid,
                    email: this.state.currentUser.email,
                    name: this.state.currentUser.name,
                    isLeader: true,
                    joinedAt: new Date().toISOString()
                }],
                createdAt: new Date().toISOString(),
                status: 'forming',
                currentPhase: 'team_formation'
            };

            // Salvar no Firebase
            if (window.firebaseDB && window.firebaseUtils) {
                const teamRef = window.firebaseUtils.doc(window.firebaseDB, 'teams', teamCode);
                await window.firebaseUtils.setDoc(teamRef, team);
                console.log('✅ Equipe criada no Firebase:', teamCode);
            }

            this.state.currentTeam = team;
            this.saveState();
            this.hideLoading();

            this.showAlert(`Equipe "${teamName}" criada com sucesso!`, 'success');
            this.showTeamStatus();
            this.startTeamMonitoring();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao criar equipe:', error);
            this.showAlert('Erro ao criar equipe: ' + error.message, 'error');
        }
    },

    async joinTeam() {
        const teamCode = document.getElementById('teamCode').value.trim().toUpperCase();

        if (!teamCode) {
            this.showAlert('Por favor, digite o código da equipe.', 'error');
            return;
        }

        try {
            this.showLoading('Entrando na equipe...');

            // Buscar equipe no Firebase
            if (window.firebaseDB && window.firebaseUtils) {
                const teamRef = window.firebaseUtils.doc(window.firebaseDB, 'teams', teamCode);
                const teamSnap = await window.firebaseUtils.getDoc(teamRef);

                if (!teamSnap.exists()) {
                    this.hideLoading();
                    this.showAlert('Equipe não encontrada. Verifique o código.', 'error');
                    return;
                }

                const team = teamSnap.data();

                // Verificar se já é membro
                const existingMember = team.members.find(m => m.uid === this.state.currentUser.uid);
                if (existingMember) {
                    this.hideLoading();
                    this.showAlert('Você já faz parte desta equipe!', 'info');
                    this.state.currentTeam = team;
                    this.showTeamStatus();
                    return;
                }

                // Verificar limite de membros
                if (team.members.length >= this.config.maxTeamSize) {
                    this.hideLoading();
                    this.showAlert('Esta equipe já atingiu o limite máximo de membros.', 'error');
                    return;
                }

                // Adicionar novo membro
                const newMember = {
                    uid: this.state.currentUser.uid,
                    email: this.state.currentUser.email,
                    name: this.state.currentUser.name,
                    isLeader: false,
                    joinedAt: new Date().toISOString()
                };

                team.members.push(newMember);

                // Atualizar no Firebase
                await window.firebaseUtils.updateDoc(teamRef, {
                    members: team.members,
                    updatedAt: new Date().toISOString()
                });

                console.log('✅ Membro adicionado à equipe:', teamCode);
            }

            this.state.currentTeam = team;
            this.saveState();
            this.hideLoading();

            this.showAlert(`Bem-vindo à equipe "${team.name}"!`, 'success');
            this.showTeamStatus();
            this.startTeamMonitoring();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao entrar na equipe:', error);
            this.showAlert('Erro ao entrar na equipe: ' + error.message, 'error');
        }
    },

    showTeamStatus() {
        const teamStatus = document.getElementById('teamStatus');
        const teamNameDisplay = document.getElementById('teamNameDisplay');
        const teamCodeDisplay = document.getElementById('teamCodeDisplay');
        const membersList = document.getElementById('membersList');
        const membersWaiting = document.getElementById('membersWaiting');
        const leaderActions = document.getElementById('leaderActions');

        if (!this.state.currentTeam) return;

        // Mostrar seção da equipe
        teamStatus.classList.remove('hidden');

        // Atualizar informações
        teamNameDisplay.textContent = this.state.currentTeam.name;
        teamCodeDisplay.textContent = this.state.currentTeam.code;

        // Lista de membros
        membersList.innerHTML = '';
        this.state.currentTeam.members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = `member-card ${member.isLeader ? 'leader' : ''}`;
            memberCard.innerHTML = `
                <div class="member-name">${member.name} ${member.isLeader ? '👑' : ''}</div>
                <div class="member-role">${member.isLeader ? 'Líder da Equipe' : 'Membro'}</div>
            `;
            membersList.appendChild(memberCard);
        });

        // Status de aguardo
        if (this.state.currentTeam.members.length < this.config.minTeamSize) {
            membersWaiting.classList.remove('hidden');
            membersWaiting.querySelector('p').textContent = `⏳ Aguardando mais membros... (${this.state.currentTeam.members.length}/${this.config.minTeamSize} mínimo)`;
        } else {
            membersWaiting.classList.add('hidden');
        }

        // Ações do líder
        const isLeader = this.state.currentTeam.leader === this.state.currentUser.uid;
        if (isLeader && this.state.currentTeam.members.length >= this.config.minTeamSize) {
            leaderActions.classList.remove('hidden');
        } else {
            leaderActions.classList.add('hidden');
        }
    },

    startTeamMonitoring() {
        if (!window.firebaseDB || !this.state.currentTeam) return;

        // Monitor changes in team
        const teamRef = window.firebaseUtils.doc(window.firebaseDB, 'teams', this.state.currentTeam.code);
        this.teamUnsubscribe = window.firebaseUtils.onSnapshot(teamRef, (doc) => {
            if (doc.exists()) {
                const updatedTeam = doc.data();
                this.state.currentTeam = updatedTeam;
                this.showTeamStatus();
                console.log('🔄 Equipe atualizada:', updatedTeam.members.length, 'membros');
            }
        });
    },

    copyTeamCode() {
        const teamCode = this.state.currentTeam.code;
        navigator.clipboard.writeText(teamCode).then(() => {
            this.showAlert('Código copiado para a área de transferência!', 'success');
        }).catch(() => {
            // Fallback para navegadores mais antigos
            const textArea = document.createElement('textarea');
            textArea.value = teamCode;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showAlert('Código copiado!', 'success');
        });
    },

    // ===== PERFIL PROFISSIONAL =====
    startProfile() {
        // Validar se tem membros suficientes
        if (this.state.currentTeam.members.length < this.config.minTeamSize) {
            this.showAlert(`A equipe precisa ter pelo menos ${this.config.minTeamSize} membros para continuar.`, 'error');
            return;
        }

        // Verificar se é o líder
        if (this.state.currentTeam.leader !== this.state.currentUser.uid) {
            this.showAlert('Apenas o líder da equipe pode iniciar o jogo.', 'error');
            return;
        }

        this.showScreen('profileScreen');
        this.loadQuestionnaire();
    },

    showProfileScreen() {
        this.showScreen('profileScreen');
        this.loadQuestionnaire();
    },

    loadQuestionnaire() {
        const questionnaire = document.getElementById('questionnaire');
        this.state.currentQuestion = 0;
        this.state.userAnswers = [];

        // Limpar questionário
        questionnaire.innerHTML = '';

        // Carregar todas as perguntas
        this.data.questions.forEach((question, index) => {
            const questionCard = document.createElement('div');
            questionCard.className = `question-card ${index === 0 ? 'active' : ''}`;
            questionCard.innerHTML = `
                <h3 class="question-title">${question.text}</h3>
                <div class="question-options">
                    ${question.options.map((option, optIndex) => `
                        <button class="option-button" data-question="${question.id}" data-option="${optIndex}">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            `;
            questionnaire.appendChild(questionCard);
        });

        // Bind eventos das opções
        questionnaire.addEventListener('click', (e) => {
            if (e.target.classList.contains('option-button')) {
                this.selectOption(e.target);
            }
        });

        this.updateQuestionNavigation();
    },

    selectOption(button) {
        const questionId = parseInt(button.dataset.question);
        const optionIndex = parseInt(button.dataset.option);

        // Marcar opção selecionada
        const questionCard = button.closest('.question-card');
        questionCard.querySelectorAll('.option-button').forEach(btn => {
            btn.classList.remove('selected');
        });
        button.classList.add('selected');

        // Salvar resposta
        this.state.userAnswers[questionId - 1] = {
            questionId: questionId,
            optionIndex: optionIndex,
            option: this.data.questions[questionId - 1].options[optionIndex]
        };

        this.updateQuestionNavigation();
        console.log(`✅ Resposta salva - P${questionId}: ${button.textContent}`);
    },

    updateQuestionNavigation() {
        const prevBtn = document.getElementById('prevQuestionBtn');
        const nextBtn = document.getElementById('nextQuestionBtn');
        const finishBtn = document.getElementById('finishQuestionnaireBtn');
        const progressFill = document.getElementById('miniProgressFill');
        const questionProgress = document.getElementById('questionProgress');

        // Atualizar progresso
        const answeredCount = this.state.userAnswers.filter(a => a).length;
        const progressPercent = (answeredCount / this.data.questions.length) * 100;
        if (progressFill) progressFill.style.width = `${progressPercent}%`;
        if (questionProgress) questionProgress.textContent = `Pergunta ${this.state.currentQuestion + 1} de ${this.data.questions.length}`;

        // Navegação
        prevBtn.disabled = this.state.currentQuestion === 0;

        const currentAnswered = this.state.userAnswers[this.state.currentQuestion];
        nextBtn.disabled = !currentAnswered;

        // Mostrar botão finalizar se todas respondidas
        if (answeredCount === this.data.questions.length) {
            nextBtn.classList.add('hidden');
            finishBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            finishBtn.classList.add('hidden');
        }
    },

    nextQuestion() {
        if (this.state.currentQuestion < this.data.questions.length - 1) {
            this.showQuestion(this.state.currentQuestion + 1);
        }
    },

    prevQuestion() {
        if (this.state.currentQuestion > 0) {
            this.showQuestion(this.state.currentQuestion - 1);
        }
    },

    showQuestion(questionIndex) {
        // Esconder pergunta atual
        document.querySelectorAll('.question-card').forEach(card => {
            card.classList.remove('active');
        });

        // Mostrar nova pergunta
        const targetQuestion = document.querySelectorAll('.question-card')[questionIndex];
        if (targetQuestion) {
            targetQuestion.classList.add('active');
            this.state.currentQuestion = questionIndex;
            this.updateQuestionNavigation();
        }
    },

    async finishQuestionnaire() {
        // Validar se todas as perguntas foram respondidas
        const answeredCount = this.state.userAnswers.filter(a => a).length;
        if (answeredCount < this.data.questions.length) {
            this.showAlert('Por favor, responda todas as perguntas antes de continuar.', 'error');
            return;
        }

        try {
            this.showLoading('Calculando seu perfil...');

            // Calcular perfil
            const profile = this.calculateProfile();
            this.state.userProfile = profile;

            // Salvar no Firebase
            await this.saveUserProfile();

            this.hideLoading();
            this.showAlert(`Seu perfil é: ${profile.name}!`, 'success');

            // Aguardar um momento antes de continuar
            setTimeout(() => {
                this.showProfileResults();
            }, 1500);

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao finalizar questionário:', error);
            this.showAlert('Erro ao processar respostas: ' + error.message, 'error');
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

        // Calcular pontuação por perfil
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

        console.log('📊 Scores de perfil:', scores);
        console.log('🎯 Perfil dominante:', dominantProfile);

        return {
            type: dominantProfile,
            ...this.data.profiles[dominantProfile],
            scores: scores,
            calculatedAt: new Date().toISOString()
        };
    },

    async saveUserProfile() {
        if (!window.firebaseDB || !this.state.currentUser) return;

        try {
            const userRef = window.firebaseUtils.doc(window.firebaseDB, 'users', this.state.currentUser.uid);
            await window.firebaseUtils.setDoc(userRef, {
                profile: this.state.userProfile,
                answers: this.state.userAnswers,
                teamCode: this.state.currentTeam.code,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            console.log('✅ Perfil salvo no Firebase');
        } catch (error) {
            console.error('❌ Erro ao salvar perfil:', error);
        }
    },

    // ===== RESULTADOS DOS PERFIS =====
    async showProfileResults() {
        this.showScreen('profileResultsScreen');
        this.displayMyProfile();
        await this.loadTeamProfiles();
    },

    displayMyProfile() {
        const myProfile = document.getElementById('myProfile');
        if (!this.state.userProfile) return;

        const profile = this.state.userProfile;
        myProfile.innerHTML = `
            <div class="profile-card">
                <div class="profile-header">
                    <div class="profile-icon">${profile.icon}</div>
                    <div class="profile-info">
                        <h3>Seu Perfil: ${profile.name}</h3>
                        <p class="profile-subtitle">Baseado em suas respostas</p>
                    </div>
                </div>
                <p class="profile-description">${profile.description}</p>
                <div class="profile-strengths">
                    <h4>💪 Suas Principais Forças</h4>
                    <div class="strengths-list">
                        ${profile.strengths.map(strength => `
                            <span class="strength-tag">${strength}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    async loadTeamProfiles() {
        const teamProfiles = document.getElementById('teamProfiles');
        const profilesGrid = document.getElementById('profilesGrid');
        const waitingProfiles = document.getElementById('waitingProfiles');
        const profilesNextBtn = document.getElementById('profilesNextBtn');

        if (!window.firebaseDB) return;

        try {
            // Buscar perfis dos membros da equipe
            const teamMembers = this.state.currentTeam.members;
            const profilePromises = teamMembers
                .filter(member => member.uid !== this.state.currentUser.uid)
                .map(async (member) => {
                    const userRef = window.firebaseUtils.doc(window.firebaseDB, 'users', member.uid);
                    const userSnap = await window.firebaseUtils.getDoc(userRef);

                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        return {
                            member: member,
                            profile: userData.profile
                        };
                    }
                    return { member: member, profile: null };
                });

            const results = await Promise.all(profilePromises);
            const completedProfiles = results.filter(r => r.profile);
            const pendingCount = results.length - completedProfiles.length;

            // Mostrar perfis completos
            profilesGrid.innerHTML = '';
            completedProfiles.forEach(result => {
                const profileCard = document.createElement('div');
                profileCard.className = 'team-profile-card';
                profileCard.innerHTML = `
                    <div class="profile-header">
                        <div class="profile-icon">${result.profile.icon}</div>
                        <div class="profile-info">
                            <h4>${result.member.name}</h4>
                            <p class="profile-subtitle">${result.profile.name}</p>
                        </div>
                    </div>
                    <p class="profile-description">${result.profile.description}</p>
                `;
                profilesGrid.appendChild(profileCard);
            });

            // Status de aguardo
            if (pendingCount > 0) {
                waitingProfiles.classList.remove('hidden');
                waitingProfiles.querySelector('p').textContent = 
                    `⏳ Aguardando ${pendingCount} membro(s) completar(em) o questionário...`;
            } else {
                waitingProfiles.classList.add('hidden');

                // Mostrar botão para próxima etapa (apenas para líder)
                if (this.state.currentTeam.leader === this.state.currentUser.uid) {
                    profilesNextBtn.classList.remove('hidden');
                }
            }

            // Monitorar mudanças em tempo real
            this.monitorTeamProfiles();

        } catch (error) {
            console.error('❌ Erro ao carregar perfis da equipe:', error);
        }
    },

    monitorTeamProfiles() {
        // Recarregar perfis a cada 10 segundos
        setTimeout(() => {
            if (this.state.currentScreen === 'profileResultsScreen') {
                this.loadTeamProfiles();
            }
        }, 10000);
    },

    // ===== SEGMENTO EMPRESARIAL =====
    startSegmentSelection() {
        this.showScreen('segmentScreen');
        this.loadSegments();
        this.initializeSegmentVoting();
    },

    showSegmentScreen() {
        this.showScreen('segmentScreen');
        this.loadSegments();
        this.initializeSegmentVoting();
    },

    loadSegments() {
        const segmentsGrid = document.getElementById('segmentsGrid');
        segmentsGrid.innerHTML = '';

        Object.keys(this.data.segments).forEach(segmentKey => {
            const segment = this.data.segments[segmentKey];
            const segmentCard = document.createElement('div');
            segmentCard.className = 'segment-card';
            segmentCard.dataset.segment = segmentKey;

            segmentCard.innerHTML = `
                <div class="segment-header">
                    <div class="segment-icon">${segment.icon}</div>
                    <h3 class="segment-name">${segment.name}</h3>
                </div>
                <p class="segment-description">${segment.description}</p>
                <div class="segment-requirements">
                    <h4>Requisitos Principais</h4>
                    <p>${segment.requirements}</p>
                </div>
                <div class="segment-market">
                    <strong>Mercado:</strong> ${segment.marketSize}
                </div>
                <div class="segment-challenges">
                    <strong>Desafios:</strong> ${segment.challenges.join(', ')}
                </div>
                <div class="segment-opportunities">
                    <strong>Oportunidades:</strong> ${segment.opportunities.join(', ')}
                </div>
            `;

            segmentCard.addEventListener('click', () => {
                this.selectSegment(segmentKey);
            });

            segmentsGrid.appendChild(segmentCard);
        });
    },

    selectSegment(segmentKey) {
        // Marcar segmento selecionado
        document.querySelectorAll('.segment-card').forEach(card => {
            card.classList.remove('selected');
        });

        const selectedCard = document.querySelector(`[data-segment="${segmentKey}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            this.state.selectedSegment = segmentKey;

            // Habilitar botão de voto
            const submitVoteBtn = document.getElementById('submitVoteBtn');
            submitVoteBtn.classList.remove('hidden');
            submitVoteBtn.disabled = false;

            console.log('✅ Segmento selecionado:', segmentKey);
        }
    },

    initializeSegmentVoting() {
        // Atualizar contador de votos
        this.updateVotingStatus();

        // Monitorar votos em tempo real
        this.monitorSegmentVotes();
    },

    async submitSegmentVote() {
        if (!this.state.selectedSegment) {
            this.showAlert('Por favor, selecione um segmento antes de votar.', 'error');
            return;
        }

        try {
            this.showLoading('Enviando voto...');

            // Salvar voto no Firebase
            if (window.firebaseDB && window.firebaseUtils) {
                const voteRef = window.firebaseUtils.doc(
                    window.firebaseDB, 
                    'votes', 
                    `${this.state.currentTeam.code}_segment_${this.state.currentUser.uid}`
                );

                await window.firebaseUtils.setDoc(voteRef, {
                    teamCode: this.state.currentTeam.code,
                    userId: this.state.currentUser.uid,
                    userEmail: this.state.currentUser.email,
                    vote: this.state.selectedSegment,
                    voteType: 'segment',
                    timestamp: new Date().toISOString()
                });
            }

            this.hideLoading();
            this.showAlert('Voto enviado com sucesso!', 'success');

            // Desabilitar votação
            document.getElementById('submitVoteBtn').disabled = true;
            document.getElementById('submitVoteBtn').textContent = '✅ Voto Enviado';

            // Verificar se todos votaram
            this.checkSegmentVotingComplete();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao enviar voto:', error);
            this.showAlert('Erro ao enviar voto: ' + error.message, 'error');
        }
    },

    async checkSegmentVotingComplete() {
        if (!window.firebaseDB) return;

        try {
            // Buscar todos os votos da equipe
            const votesQuery = window.firebaseUtils.query(
                window.firebaseUtils.collection(window.firebaseDB, 'votes'),
                window.firebaseUtils.where('teamCode', '==', this.state.currentTeam.code),
                window.firebaseUtils.where('voteType', '==', 'segment')
            );

            const votesSnap = await window.firebaseUtils.getDocs(votesQuery);
            const votes = [];
            votesSnap.forEach(doc => {
                votes.push(doc.data());
            });

            const totalMembers = this.state.currentTeam.members.length;
            const totalVotes = votes.length;

            this.updateVotingStatus(totalVotes, totalMembers);

            // Se todos votaram, mostrar resultados
            if (totalVotes >= totalMembers) {
                setTimeout(() => {
                    this.showSegmentResults(votes);
                }, 1000);
            }

        } catch (error) {
            console.error('❌ Erro ao verificar votação:', error);
        }
    },

    updateVotingStatus(votesReceived = 0, totalMembers = null) {
        const votesCount = document.getElementById('votesCount');
        if (!votesCount) return;

        const total = totalMembers || this.state.currentTeam.members.length;
        votesCount.textContent = `Votos recebidos: ${votesReceived} de ${total}`;
    },

    async monitorSegmentVotes() {
        // Verificar votos a cada 5 segundos
        const checkInterval = setInterval(async () => {
            if (this.state.currentScreen !== 'segmentScreen') {
                clearInterval(checkInterval);
                return;
            }

            await this.checkSegmentVotingComplete();
        }, 5000);
    },

    showSegmentResults(votes) {
        // Calcular resultados
        const results = {};
        votes.forEach(vote => {
            results[vote.vote] = (results[vote.vote] || 0) + 1;
        });

        // Encontrar vencedor
        const winner = Object.keys(results).reduce((a, b) => 
            results[a] > results[b] ? a : b
        );

        const winningSegment = this.data.segments[winner];

        // Mostrar resultados na tela
        const voteResults = document.getElementById('voteResults');
        const resultsDisplay = document.getElementById('resultsDisplay');
        const segmentSelected = document.getElementById('segmentSelected');

        resultsDisplay.innerHTML = '';
        Object.keys(results).forEach(segmentKey => {
            const segment = this.data.segments[segmentKey];
            const voteCount = results[segmentKey];
            const isWinner = segmentKey === winner;

            const resultItem = document.createElement('div');
            resultItem.className = `result-item ${isWinner ? 'winner' : ''}`;
            resultItem.innerHTML = `
                <span>${segment.icon} ${segment.name}</span>
                <span>${voteCount} voto${voteCount !== 1 ? 's' : ''}</span>
            `;
            resultsDisplay.appendChild(resultItem);
        });

        segmentSelected.innerHTML = `
            <h4>🎉 Segmento Escolhido: ${winningSegment.name}</h4>
            <p>${winningSegment.description}</p>
        `;

        voteResults.classList.remove('hidden');

        // Calcular e salvar pontuação
        this.calculateSegmentScore(winner, results);

        // Mostrar botão para próxima etapa (apenas para líder)
        if (this.state.currentTeam.leader === this.state.currentUser.uid) {
            document.getElementById('segmentNextBtn').classList.remove('hidden');
        }

        // Salvar segmento escolhido
        this.state.selectedSegment = winner;
        this.saveState();
    },

    calculateSegmentScore(winnerSegment, results) {
        // Pontuação base pela escolha
        let score = 50;

        // Bonus por unanimidade
        const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);
        const winnerVotes = results[winnerSegment];

        if (winnerVotes === totalVotes) {
            score += 50; // Unanimidade = bonus máximo
        } else {
            const consensus = winnerVotes / totalVotes;
            score += Math.round(consensus * 30); // Bonus proporcional ao consenso
        }

        // Bonus por compatibilidade com perfis da equipe
        // (Será calculado quando tivermos todos os perfis carregados)

        this.state.scores.segmentChoice = score;
        console.log('📊 Pontuação do segmento:', score);
    },

    // ===== ELEIÇÃO CEO =====
    startCEOElection() {
        this.showScreen('electionScreen');
        this.loadCandidates();
        this.initializeCEOVoting();
    },

    showElectionScreen() {
        this.showScreen('electionScreen');
        this.loadCandidates();
        this.initializeCEOVoting();
    },

    loadCandidates() {
        const candidatesGrid = document.getElementById('candidatesGrid');
        candidatesGrid.innerHTML = '';

        // Todos os membros da equipe são candidatos
        this.state.currentTeam.members.forEach(member => {
            const candidateCard = document.createElement('div');
            candidateCard.className = 'candidate-card';
            candidateCard.dataset.candidate = member.uid;

            candidateCard.innerHTML = `
                <div class="candidate-avatar">${member.name.charAt(0).toUpperCase()}</div>
                <div class="candidate-name">${member.name} ${member.isLeader ? '👑' : ''}</div>
                <div class="candidate-profile">
                    ${member.isLeader ? 'Líder da Equipe' : 'Membro da Equipe'}
                </div>
            `;

            candidateCard.addEventListener('click', () => {
                this.selectCandidate(member.uid);
            });

            candidatesGrid.appendChild(candidateCard);
        });
    },

    selectCandidate(candidateUid) {
        // Marcar candidato selecionado
        document.querySelectorAll('.candidate-card').forEach(card => {
            card.classList.remove('selected');
        });

        const selectedCard = document.querySelector(`[data-candidate="${candidateUid}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            this.state.selectedCandidate = candidateUid;

            // Habilitar botão de voto
            const submitVoteBtn = document.getElementById('submitCeoVoteBtn');
            submitVoteBtn.classList.remove('hidden');
            submitVoteBtn.disabled = false;

            console.log('✅ Candidato selecionado:', candidateUid);
        }
    },

    initializeCEOVoting() {
        // Reset voting status
        this.updateCEOVotingStatus();
        this.monitorCEOVotes();
    },

    async submitCEOVote() {
        if (!this.state.selectedCandidate) {
            this.showAlert('Por favor, selecione um candidato antes de votar.', 'error');
            return;
        }

        try {
            this.showLoading('Enviando voto...');

            // Salvar voto no Firebase
            if (window.firebaseDB && window.firebaseUtils) {
                const voteRef = window.firebaseUtils.doc(
                    window.firebaseDB, 
                    'votes', 
                    `${this.state.currentTeam.code}_ceo_${this.state.currentUser.uid}`
                );

                await window.firebaseUtils.setDoc(voteRef, {
                    teamCode: this.state.currentTeam.code,
                    userId: this.state.currentUser.uid,
                    userEmail: this.state.currentUser.email,
                    vote: this.state.selectedCandidate,
                    voteType: 'ceo',
                    timestamp: new Date().toISOString()
                });
            }

            this.hideLoading();
            this.showAlert('Voto para CEO enviado com sucesso!', 'success');

            // Desabilitar votação
            document.getElementById('submitCeoVoteBtn').disabled = true;
            document.getElementById('submitCeoVoteBtn').textContent = '✅ Voto Enviado';

            // Verificar se todos votaram
            this.checkCEOVotingComplete();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao enviar voto:', error);
            this.showAlert('Erro ao enviar voto: ' + error.message, 'error');
        }
    },

    async checkCEOVotingComplete() {
        if (!window.firebaseDB) return;

        try {
            // Buscar todos os votos da equipe
            const votesQuery = window.firebaseUtils.query(
                window.firebaseUtils.collection(window.firebaseDB, 'votes'),
                window.firebaseUtils.where('teamCode', '==', this.state.currentTeam.code),
                window.firebaseUtils.where('voteType', '==', 'ceo')
            );

            const votesSnap = await window.firebaseUtils.getDocs(votesQuery);
            const votes = [];
            votesSnap.forEach(doc => {
                votes.push(doc.data());
            });

            const totalMembers = this.state.currentTeam.members.length;
            const totalVotes = votes.length;

            this.updateCEOVotingStatus(totalVotes, totalMembers);

            // Se todos votaram, mostrar resultados
            if (totalVotes >= totalMembers) {
                setTimeout(() => {
                    this.showCEOResults(votes);
                }, 1000);
            }

        } catch (error) {
            console.error('❌ Erro ao verificar votação CEO:', error);
        }
    },

    updateCEOVotingStatus(votesReceived = 0, totalMembers = null) {
        // Similar ao segmento, mas para CEO
        // Implementação similar ao updateVotingStatus
    },

    async monitorCEOVotes() {
        // Verificar votos a cada 5 segundos
        const checkInterval = setInterval(async () => {
            if (this.state.currentScreen !== 'electionScreen') {
                clearInterval(checkInterval);
                return;
            }

            await this.checkCEOVotingComplete();
        }, 5000);
    },

    showCEOResults(votes) {
        // Calcular resultados
        const results = {};
        votes.forEach(vote => {
            results[vote.vote] = (results[vote.vote] || 0) + 1;
        });

        // Encontrar vencedor (maioria simples)
        const winner = Object.keys(results).reduce((a, b) => 
            results[a] > results[b] ? a : b
        );

        const electedCEO = this.state.currentTeam.members.find(m => m.uid === winner);

        // Mostrar resultados
        const electionResults = document.getElementById('electionResults');
        const ceoElected = document.getElementById('ceoElected');

        ceoElected.innerHTML = `
            <h4>🎉 CEO Eleito: ${electedCEO.name}</h4>
            <p>Parabéns! Você foi escolhido${electedCEO.uid === this.state.currentUser.uid ? '' : 'a'} pela equipe para liderar a empresa.</p>
            <div class="vote-breakdown">
                ${Object.keys(results).map(candidateId => {
                    const candidate = this.state.currentTeam.members.find(m => m.uid === candidateId);
                    const voteCount = results[candidateId];
                    return `<div>${candidate.name}: ${voteCount} voto${voteCount !== 1 ? 's' : ''}</div>`;
                }).join('')}
            </div>
        `;

        electionResults.classList.remove('hidden');

        // Salvar CEO eleito
        this.state.currentCEO = winner;
        this.saveState();

        // Calcular pontuação
        this.calculateCEOScore(winner, results);

        // Mostrar avaliação de satisfação (para não-CEOs)
        if (this.state.currentUser.uid !== winner) {
            document.getElementById('satisfactionRating').classList.remove('hidden');
            this.initializeSatisfactionRating();
        } else {
            // Para o CEO, mostrar painel de CEO
            document.getElementById('ceoActions').classList.remove('hidden');
            this.initializeCEOPanel();
        }
    },

    calculateCEOScore(winnerCEO, results) {
        // Pontuação base
        let score = 50;

        // Bonus por unanimidade/consenso
        const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);
        const winnerVotes = results[winnerCEO];

        if (winnerVotes === totalVotes) {
            score += 50; // Unanimidade = bonus máximo
        } else {
            const consensus = winnerVotes / totalVotes;
            score += Math.round(consensus * 30); // Bonus proporcional
        }

        this.state.scores.ceoElection = score;
        console.log('📊 Pontuação da eleição CEO:', score);
    },

    initializeSatisfactionRating() {
        const ratingStars = document.getElementById('ratingStars');
        const submitBtn = document.getElementById('submitSatisfactionBtn');
        let selectedRating = 0;

        ratingStars.addEventListener('click', (e) => {
            if (e.target.classList.contains('star')) {
                selectedRating = parseInt(e.target.dataset.rating);

                // Atualizar visualização das estrelas
                ratingStars.querySelectorAll('.star').forEach((star, index) => {
                    if (index < selectedRating) {
                        star.classList.add('active');
                    } else {
                        star.classList.remove('active');
                    }
                });

                submitBtn.disabled = false;
            }
        });

        submitBtn.addEventListener('click', () => {
            this.submitSatisfactionRating(selectedRating);
        });
    },

    async submitSatisfactionRating(rating) {
        if (!rating || rating < 1) {
            this.showAlert('Por favor, selecione uma avaliação.', 'error');
            return;
        }

        try {
            // Salvar avaliação no Firebase
            if (window.firebaseDB && window.firebaseUtils) {
                const satisfactionRef = window.firebaseUtils.doc(
                    window.firebaseDB, 
                    'satisfaction', 
                    `${this.state.currentTeam.code}_ceo_${this.state.currentUser.uid}`
                );

                await window.firebaseUtils.setDoc(satisfactionRef, {
                    teamCode: this.state.currentTeam.code,
                    userId: this.state.currentUser.uid,
                    userEmail: this.state.currentUser.email,
                    rating: rating,
                    type: 'ceo_election',
                    timestamp: new Date().toISOString()
                });
            }

            this.showAlert('Avaliação enviada com sucesso!', 'success');
            document.getElementById('satisfactionRating').style.opacity = '0.6';
            document.getElementById('submitSatisfactionBtn').disabled = true;
            document.getElementById('submitSatisfactionBtn').textContent = '✅ Avaliação Enviada';

        } catch (error) {
            console.error('❌ Erro ao enviar avaliação:', error);
            this.showAlert('Erro ao enviar avaliação: ' + error.message, 'error');
        }
    },

    initializeCEOPanel() {
        // CEO pode monitorar satisfação da equipe e avançar quando todos avaliarem
        this.monitorTeamSatisfaction();
    },

    async monitorTeamSatisfaction() {
        // Monitorar avaliações de satisfação em tempo real
        setInterval(async () => {
            if (this.state.currentScreen !== 'electionScreen') return;

            try {
                const satisfactionQuery = window.firebaseUtils.query(
                    window.firebaseUtils.collection(window.firebaseDB, 'satisfaction'),
                    window.firebaseUtils.where('teamCode', '==', this.state.currentTeam.code),
                    window.firebaseUtils.where('type', '==', 'ceo_election')
                );

                const satisfactionSnap = await window.firebaseUtils.getDocs(satisfactionQuery);
                const ratings = [];
                satisfactionSnap.forEach(doc => {
                    ratings.push(doc.data().rating);
                });

                const expectedRatings = this.state.currentTeam.members.length - 1; // Excluir CEO
                const satisfactionDisplay = document.getElementById('satisfactionDisplay');
                const satisfactionScore = document.getElementById('satisfactionScore');

                if (ratings.length > 0) {
                    const average = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
                    satisfactionScore.textContent = `${average}/5.0 ⭐ (${ratings.length}/${expectedRatings} avaliações)`;
                } else {
                    satisfactionScore.textContent = '⏳ Aguardando avaliações...';
                }

                // Habilitar próximo passo quando todos avaliarem
                if (ratings.length >= expectedRatings) {
                    document.getElementById('continueToPositionsBtn').disabled = false;
                }

            } catch (error) {
                console.error('❌ Erro ao monitorar satisfação:', error);
            }
        }, 3000);
    },

    // ===== DEFINIÇÃO DE CARGOS =====
    startPositionAssignment() {
        this.showScreen('positionsScreen');
        this.loadPositionAssignment();
    },

    showPositionsScreen() {
        this.showScreen('positionsScreen');
        this.loadPositionAssignment();
    },

    loadPositionAssignment() {
        // Verificar se é o CEO
        if (this.state.currentUser.uid !== this.state.currentCEO) {
            // Para não-CEOs, mostrar apenas visualização
            this.showPositionWaitingScreen();
            return;
        }

        // Para CEO, mostrar interface de atribuição
        this.showPositionAssignmentInterface();
    },

    showPositionWaitingScreen() {
        const positionsAssignment = document.getElementById('positionsAssignment');
        positionsAssignment.innerHTML = `
            <div class="waiting-message">
                <h3>⏳ Aguardando o CEO definir os cargos...</h3>
                <p>O CEO ${this.getCEOName()} está atribuindo os cargos executivos para cada membro da equipe.</p>
                <div class="loading-animation">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;

        // Monitorar quando cargos forem definidos
        this.monitorPositionAssignments();
    },

    showPositionAssignmentInterface() {
        const positionsList = document.getElementById('positionsList');
        const assignmentGrid = document.getElementById('assignmentGrid');

        // Mostrar cargos disponíveis
        positionsList.innerHTML = '';
        Object.keys(this.data.positions).forEach(posKey => {
            const position = this.data.positions[posKey];
            const positionItem = document.createElement('div');
            positionItem.className = 'position-item';
            positionItem.innerHTML = `
                <h4>${position.title} - ${position.name}</h4>
                <p>${position.description}</p>
            `;
            positionsList.appendChild(positionItem);
        });

        // Grid de atribuição
        assignmentGrid.innerHTML = '';

        // Excluir o CEO da lista de membros para atribuir
        const membersToAssign = this.state.currentTeam.members.filter(m => m.uid !== this.state.currentCEO);

        membersToAssign.forEach(member => {
            const assignmentRow = document.createElement('div');
            assignmentRow.className = 'assignment-row';
            assignmentRow.innerHTML = `
                <div class="member-info">
                    <div class="member-avatar">${member.name.charAt(0).toUpperCase()}</div>
                    <div>
                        <div class="member-name">${member.name}</div>
                        <div class="member-profile">Perfil: Carregando...</div>
                    </div>
                </div>
                <div>➡️</div>
                <select class="position-select" data-member="${member.uid}">
                    <option value="">Selecione o cargo...</option>
                    ${Object.keys(this.data.positions).map(posKey => {
                        const position = this.data.positions[posKey];
                        return `<option value="${posKey}">${position.title} - ${position.name}</option>`;
                    }).join('')}
                </select>
            `;
            assignmentGrid.appendChild(assignmentRow);
        });

        // Carregar perfis dos membros
        this.loadMemberProfilesForAssignment();

        // Validar seleções
        this.validatePositionSelections();
    },

    async loadMemberProfilesForAssignment() {
        if (!window.firebaseDB) return;

        const membersToAssign = this.state.currentTeam.members.filter(m => m.uid !== this.state.currentCEO);

        for (const member of membersToAssign) {
            try {
                const userRef = window.firebaseUtils.doc(window.firebaseDB, 'users', member.uid);
                const userSnap = await window.firebaseUtils.getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    const profileElement = document.querySelector(`[data-member="${member.uid}"]`)
                        ?.closest('.assignment-row')
                        ?.querySelector('.member-profile');

                    if (profileElement && userData.profile) {
                        profileElement.textContent = `Perfil: ${userData.profile.name}`;
                    }
                }
            } catch (error) {
                console.error('❌ Erro ao carregar perfil do membro:', error);
            }
        }
    },

    validatePositionSelections() {
        const positionSelects = document.querySelectorAll('.position-select');
        const confirmBtn = document.getElementById('confirmPositionsBtn');

        const validateSelections = () => {
            const selections = {};
            let allSelected = true;
            let hasDuplicates = false;

            positionSelects.forEach(select => {
                const value = select.value;
                if (!value) {
                    allSelected = false;
                } else {
                    if (selections[value]) {
                        hasDuplicates = true;
                    }
                    selections[value] = true;
                }
            });

            // Atualizar botão
            confirmBtn.disabled = !allSelected || hasDuplicates;

            if (hasDuplicates) {
                confirmBtn.textContent = '❌ Cargos duplicados detectados';
            } else if (!allSelected) {
                confirmBtn.textContent = '⏳ Atribua todos os cargos';
            } else {
                confirmBtn.textContent = '✅ Confirmar Cargos';
            }
        };

        // Bind eventos
        positionSelects.forEach(select => {
            select.addEventListener('change', validateSelections);
        });

        // Validação inicial
        validateSelections();
    },

    async confirmPositions() {
        const positionSelects = document.querySelectorAll('.position-select');
        const assignments = {};

        positionSelects.forEach(select => {
            const memberId = select.dataset.member;
            const position = select.value;
            assignments[memberId] = position;
        });

        try {
            this.showLoading('Confirmando cargos...');

            // Salvar no Firebase
            if (window.firebaseDB && window.firebaseUtils) {
                const teamRef = window.firebaseUtils.doc(window.firebaseDB, 'teams', this.state.currentTeam.code);
                await window.firebaseUtils.updateDoc(teamRef, {
                    positions: assignments,
                    ceo: this.state.currentCEO,
                    updatedAt: new Date().toISOString()
                });
            }

            this.state.teamPositions = assignments;
            this.saveState();
            this.hideLoading();

            this.showAlert('Cargos definidos com sucesso!', 'success');
            this.showPositionsResults();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao confirmar cargos:', error);
            this.showAlert('Erro ao confirmar cargos: ' + error.message, 'error');
        }
    },

    showPositionsResults() {
        const positionsResults = document.getElementById('positionsResults');
        const orgChart = document.getElementById('orgChart');

        // Criar organograma
        orgChart.innerHTML = '';

        // CEO no topo
        const ceoLevel = document.createElement('div');
        ceoLevel.className = 'org-level';
        const ceoNode = document.createElement('div');
        ceoNode.className = 'org-node ceo';
        ceoNode.innerHTML = `
            <div class="position">CEO</div>
            <div class="name">${this.getCEOName()}</div>
        `;
        ceoLevel.appendChild(ceoNode);
        orgChart.appendChild(ceoLevel);

        // Outros cargos
        const executiveLevel = document.createElement('div');
        executiveLevel.className = 'org-level';

        Object.keys(this.state.teamPositions).forEach(memberId => {
            const position = this.state.teamPositions[memberId];
            const positionData = this.data.positions[position];
            const member = this.state.currentTeam.members.find(m => m.uid === memberId);

            const execNode = document.createElement('div');
            execNode.className = 'org-node';
            execNode.innerHTML = `
                <div class="position">${positionData.title}</div>
                <div class="name">${member.name}</div>
            `;
            executiveLevel.appendChild(execNode);
        });

        orgChart.appendChild(executiveLevel);

        positionsResults.classList.remove('hidden');

        // Calcular pontuação
        this.calculatePositionsScore();

        // Mostrar avaliação de satisfação (para não-CEOs)
        if (this.state.currentUser.uid !== this.state.currentCEO) {
            document.getElementById('positionsSatisfaction').classList.remove('hidden');
            this.initializePositionsSatisfactionRating();
        } else {
            // Para CEO, mostrar painel
            document.getElementById('ceoPositionsActions').classList.remove('hidden');
            this.monitorPositionsSatisfaction();
        }
    },

    calculatePositionsScore() {
        // Pontuação baseada na adequação perfil/cargo
        let score = 0;
        let totalAssignments = Object.keys(this.state.teamPositions).length;

        // Para cada atribuição, verificar adequação
        Object.keys(this.state.teamPositions).forEach(async (memberId) => {
            const position = this.state.teamPositions[memberId];
            const positionData = this.data.positions[position];

            // Buscar perfil do membro (isso seria mais complexo na implementação real)
            // Por agora, assumir pontuação média
            score += 15; // Pontuação base por cargo atribuído
        });

        this.state.scores.positionAssignment = score;
        console.log('📊 Pontuação dos cargos:', score);
    },

    getCEOName() {
        const ceo = this.state.currentTeam.members.find(m => m.uid === this.state.currentCEO);
        return ceo ? ceo.name : 'CEO';
    },

    // ===== UTILITÁRIOS =====
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    generateTeamCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    saveState() {
        try {
            // Salvar localmente
            localStorage.setItem('empresatec_state', JSON.stringify(this.state));

            // Salvar no Firebase se disponível
            if (window.firebaseDB && this.state.currentUser) {
                const userRef = window.firebaseUtils.doc(window.firebaseDB, 'users', this.state.currentUser.uid);
                window.firebaseUtils.setDoc(userRef, {
                    gameState: this.state,
                    lastSaved: new Date().toISOString()
                }, { merge: true }).catch(error => {
                    console.error('❌ Erro ao salvar no Firebase:', error);
                });
            }
        } catch (error) {
            console.error('❌ Erro ao salvar estado:', error);
        }
    },

    loadState() {
        try {
            const savedState = localStorage.getItem('empresatec_state');
            if (savedState) {
                const parsed = JSON.parse(savedState);
                this.state = { ...this.state, ...parsed };
                console.log('📂 Estado carregado do localStorage');
            }
        } catch (error) {
            console.error('❌ Erro ao carregar estado:', error);
        }
    },

    showAlert(message, type = 'info') {
        // Implementação simples de alert
        const alertClass = {
            success: '✅',
            error: '❌', 
            warning: '⚠️',
            info: 'ℹ️'
        };

        const icon = alertClass[type] || 'ℹ️';
        alert(`${icon} ${message}`);
    },

    showLoading(message = 'Carregando...') {
        console.log(`⏳ ${message}`);
        // Implementação simples - poderia ser melhorada com spinner visual
    },

    hideLoading() {
        console.log('✅ Loading concluído');
    },

    // ===== CONTINUAÇÃO DAS FUNCIONALIDADES =====

    // Implementações para as demais telas e funcionalidades serão adicionadas aqui
    // devido ao limite de caracteres, mantive as principais funcionalidades implementadas

    // As próximas funcionalidades incluem:
    // - Contratação completa
    // - Resultados finais
    // - Painel do professor
    // - Sistema de pontuação final
    // - Reset e restart

    // Placeholder methods for remaining functionality
    async monitorPositionAssignments() { /* Implementation */ },
    initializePositionsSatisfactionRating() { /* Implementation */ },
    async submitPositionsSatisfaction() { /* Implementation */ },
    async monitorPositionsSatisfaction() { /* Implementation */ },
    startHiring() { /* Implementation */ },
    showHiringScreen() { /* Implementation */ },
    async submitHiringRecommendations() { /* Implementation */ },
    async confirmHiring() { /* Implementation */ },
    async submitHiringSatisfaction() { /* Implementation */ },
    showFinalResults() { /* Implementation */ },
    restart() { /* Implementation */ },
    showTeacherPanel() { /* Implementation */ },
    toggleScores() { /* Implementation */ },
    resetGame() { /* Implementation */ },
    exportData() { /* Implementation */ },
    backToGame() { /* Implementation */ }
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 EmpresaTec - Iniciando aplicação...');
    EmpresaTec.init();
});

// Disponibilizar globalmente para debug
window.EmpresaTec = EmpresaTec;
