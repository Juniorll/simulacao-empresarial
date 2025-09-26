// EmpresaTec - Sistema de Simulação Empresarial Completa
// JavaScript Principal - 5 Atos Completos

// ===== CONFIGURAÇÃO GLOBAL =====
const EmpresaTecComplete = {
    // Estado da aplicação
    state: {
        currentUser: null,
        currentTeam: null,
        currentScreen: 'loginScreen',
        currentAct: 1,
        currentPhase: 1,
        userAnswers: [],
        userProfile: null,
        selectedSegment: null,
        selectedLocation: null,
        selectedEquipment: [],
        currentCEO: null,
        teamPositions: {},
        teamScores: {
            act1: 0,
            act2: 0,
            act3: 0,
            act4: 0,
            act5: 0,
            total: 0
        },
        budgets: {
            act1: 500000,
            act2: 300000,
            act3: 250000,
            act4: 400000,
            act5: 600000
        },
        spending: {
            act1: 0,
            act2: 0,
            act3: 0,
            act4: 0,
            act5: 0
        },
        professorApprovals: {
            act1: false,
            act2: false,
            act3: false,
            act4: false,
            act5: false
        }
    },

    // Configurações do jogo
    config: {
        minTeamSize: 3,
        maxTeamSize: 6,
        adminPassword: 'professor2025',
        gameTitle: 'EmpresaTec',
        totalActs: 5,
        scoreWeights: {
            cost_efficiency: 20,
            quality_processes: 25,
            technology_adoption: 20,
            decision_making: 20,
            team_collaboration: 15
        }
    },

    // Dados do jogo
    data: {
        // Perfis profissionais
        profiles: {
            strategist: {
                name: "Estrategista Empresarial",
                icon: "🎯",
                description: "Especialista em planejamento estratégico, análise de mercado e visão de longo prazo. Excelente para liderar decisões complexas.",
                strengths: ["Planejamento Estratégico", "Análise de Mercado", "Liderança", "Visão de Futuro"],
                idealRoles: ["CEO", "COO", "Diretor de Estratégia"],
                score_bonus: {
                    decision_making: 25,
                    team_collaboration: 15
                }
            },
            innovator: {
                name: "Inovador Tecnológico",
                icon: "💡",
                description: "Criativo e visionário, especializado em desenvolvimento de produtos e soluções disruptivas. Sempre busca novas oportunidades.",
                strengths: ["Inovação", "Tecnologia", "Criatividade", "Desenvolvimento"],
                idealRoles: ["CTO", "Diretor P&D", "Head de Inovação"],
                score_bonus: {
                    technology_adoption: 25,
                    quality_processes: 15
                }
            },
            executor: {
                name: "Executor Operacional",
                icon: "⚡",
                description: "Prático e eficiente, especializado em operações e implementação. Transforma ideias em realidade de forma eficaz.",
                strengths: ["Execução", "Operações", "Eficiência", "Implementação"],
                idealRoles: ["COO", "Diretor Operacional", "Gerente Geral"],
                score_bonus: {
                    cost_efficiency: 25,
                    quality_processes: 20
                }
            },
            analyst: {
                name: "Analista Financeiro",
                icon: "📊",
                description: "Orientado por dados, especializado em análises financeiras e inteligência de mercado. Base sólida em números.",
                strengths: ["Análise Financeira", "Dados", "Métricas", "Planejamento"],
                idealRoles: ["CFO", "Diretor Financeiro", "Controller"],
                score_bonus: {
                    cost_efficiency: 30,
                    decision_making: 15
                }
            },
            communicator: {
                name: "Comunicador Estratégico",
                icon: "🎙️",
                description: "Especialista em relacionamentos, marketing e vendas. Excelente comunicação e networking estratégico.",
                strengths: ["Comunicação", "Marketing", "Vendas", "Relacionamento"],
                idealRoles: ["CMO", "Diretor Comercial", "Head Marketing"],
                score_bonus: {
                    team_collaboration: 25,
                    decision_making: 10
                }
            }
        },

        // Segmentos empresariais
        segments: {
            fintech: {
                name: "Fintech",
                icon: "💳",
                description: "Tecnologia Financeira - Soluções digitais para pagamentos, investimentos e serviços bancários.",
                market_size: "R$ 4,8 bilhões",
                growth_rate: "35% ao ano",
                challenges: ["Regulamentação rigorosa", "Segurança de dados", "Competição bancária"],
                opportunities: ["Open Banking", "PIX", "Criptomoedas", "Inclusão financeira"],
                required_investment: 400000,
                score_multiplier: 1.2,
                ideal_profiles: ["analyst", "strategist", "innovator"]
            },
            edtech: {
                name: "Edtech",
                icon: "📚",
                description: "Tecnologia Educacional - Plataformas de ensino e soluções de aprendizado digital.",
                market_size: "R$ 5,6 bilhões",
                growth_rate: "28% ao ano",
                challenges: ["Adoção institucional", "Engajamento estudantil", "Modelo pedagógico"],
                opportunities: ["Ensino híbrido", "Microlearning", "IA educacional", "Certificações"],
                required_investment: 300000,
                score_multiplier: 1.1,
                ideal_profiles: ["innovator", "communicator", "strategist"]
            },
            healthtech: {
                name: "Healthtech",
                icon: "🏥",
                description: "Tecnologia em Saúde - Telemedicina, diagnósticos e gestão hospitalar.",
                market_size: "R$ 3,2 bilhões",
                growth_rate: "42% ao ano",
                challenges: ["Regulamentação médica", "Integração sistemas", "Privacidade"],
                opportunities: ["Telemedicina", "Wearables", "IA diagnóstica", "Prontuário eletrônico"],
                required_investment: 500000,
                score_multiplier: 1.3,
                ideal_profiles: ["analyst", "executor", "innovator"]
            },
            foodtech: {
                name: "Foodtech",
                icon: "🍔",
                description: "Tecnologia Alimentar - Delivery, agricultura vertical e alimentos alternativos.",
                market_size: "R$ 2,8 bilhões",
                growth_rate: "25% ao ano",
                challenges: ["Logística complexa", "Sustentabilidade", "Regulamentação sanitária"],
                opportunities: ["Dark kitchens", "Plant-based", "Automação", "Delivery"],
                required_investment: 350000,
                score_multiplier: 1.0,
                ideal_profiles: ["executor", "communicator", "strategist"]
            },
            agtech: {
                name: "Agtech",
                icon: "🚜",
                description: "Tecnologia Agrícola - IoT rural, drones e otimização de cultivos.",
                market_size: "R$ 2,1 bilhões",
                growth_rate: "30% ao ano",
                challenges: ["Conectividade rural", "Adoção tecnológica", "Investimento inicial"],
                opportunities: ["Agricultura de precisão", "Sustentabilidade", "IoT", "Biotecnologia"],
                required_investment: 450000,
                score_multiplier: 1.15,
                ideal_profiles: ["innovator", "analyst", "executor"]
            }
        },

        // Questionário para perfil
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

        // Cargos executivos
        positions: {
            ceo: {
                title: "CEO",
                name: "Chief Executive Officer",
                description: "Responsável pela visão estratégica geral e liderança executiva da empresa.",
                salary_range: "R$ 50.000 - R$ 100.000",
                ideal_profiles: ["strategist"],
                score_impact: 30
            },
            cto: {
                title: "CTO",
                name: "Chief Technology Officer",
                description: "Responsável pela estratégia tecnológica e inovação de produtos.",
                salary_range: "R$ 35.000 - R$ 70.000",
                ideal_profiles: ["innovator"],
                score_impact: 25
            },
            coo: {
                title: "COO",
                name: "Chief Operating Officer",
                description: "Responsável pelas operações diárias e eficiência organizacional.",
                salary_range: "R$ 30.000 - R$ 60.000",
                ideal_profiles: ["executor"],
                score_impact: 25
            },
            cfo: {
                title: "CFO",
                name: "Chief Financial Officer",
                description: "Responsável pelas finanças, orçamento e controles financeiros.",
                salary_range: "R$ 30.000 - R$ 60.000",
                ideal_profiles: ["analyst"],
                score_impact: 25
            },
            cmo: {
                title: "CMO",
                name: "Chief Marketing Officer",
                description: "Responsável por marketing, vendas e relacionamento com clientes.",
                salary_range: "R$ 25.000 - R$ 55.000",
                ideal_profiles: ["communicator"],
                score_impact: 20
            }
        },

        // Localizações para sede
        locations: {
            centro: {
                name: "Centro Empresarial",
                icon: "🏙️",
                cost: 200000,
                description: "Localização premium no centro financeiro da cidade",
                advantages: ["Alto prestígio", "Fácil acesso", "Networking", "Infraestrutura completa"],
                disadvantages: ["Alto custo", "Muito trânsito", "Estacionamento caro"],
                score_bonus: {
                    team_collaboration: 15,
                    cost_efficiency: -10
                }
            },
            tecnologico: {
                name: "Parque Tecnológico",
                icon: "🔬",
                cost: 150000,
                description: "Hub de inovação com empresas de tecnologia",
                advantages: ["Ambiente inovador", "Networking tech", "Incentivos fiscais", "Universidades próximas"],
                disadvantages: ["Distância do centro", "Público especializado"],
                score_bonus: {
                    technology_adoption: 20,
                    quality_processes: 10
                }
            },
            coworking: {
                name: "Coworking Premium",
                icon: "🏢",
                cost: 80000,
                description: "Espaço compartilhado com infraestrutura profissional",
                advantages: ["Flexibilidade", "Custo moderado", "Networking", "Serviços inclusos"],
                disadvantages: ["Menos privacidade", "Dependência do espaço"],
                score_bonus: {
                    cost_efficiency: 15,
                    team_collaboration: 10
                }
            },
            home: {
                name: "Home Office",
                icon: "🏠",
                cost: 30000,
                description: "Trabalho remoto com escritório virtual",
                advantages: ["Máxima economia", "Flexibilidade total", "Sem deslocamento"],
                disadvantages: ["Imagem profissional", "Dificuldade colaboração", "Falta de separação"],
                score_bonus: {
                    cost_efficiency: 25,
                    team_collaboration: -15,
                    quality_processes: -10
                }
            }
        },

        // Equipamentos disponíveis
        equipment: {
            basic: {
                name: "Equipamentos Básicos",
                icon: "💻",
                cost: 30000,
                description: "Computadores, impressoras, mobiliário essencial",
                items: ["Notebooks básicos", "Impressora multifuncional", "Mobiliário escritório", "Internet banda larga"],
                score_bonus: {
                    quality_processes: 10
                }
            },
            advanced: {
                name: "Equipamentos Avançados",
                icon: "🖥️",
                cost: 80000,
                description: "Workstations, servidores, equipamentos especializados",
                items: ["Workstations alta performance", "Servidor local", "Monitores profissionais", "Equipamentos especializados"],
                score_bonus: {
                    technology_adoption: 20,
                    quality_processes: 15
                }
            },
            software: {
                name: "Licenças de Software",
                icon: "⚙️",
                cost: 15000,
                description: "Pacote completo de softwares profissionais",
                items: ["Office 365", "Adobe Creative Suite", "Ferramentas desenvolvimento", "Software gestão"],
                score_bonus: {
                    quality_processes: 15,
                    technology_adoption: 10
                }
            },
            security: {
                name: "Segurança e Backup",
                icon: "🔒",
                cost: 20000,
                description: "Sistema completo de segurança digital",
                items: ["Antivírus corporativo", "Firewall avançado", "Sistema backup", "Monitoramento 24h"],
                score_bonus: {
                    quality_processes: 20,
                    technology_adoption: 10
                }
            },
            meeting: {
                name: "Sala de Reuniões",
                icon: "📹",
                cost: 25000,
                description: "Equipamentos para reuniões e videoconferências",
                items: ["TV 65 polegadas", "Sistema videoconferência", "Som profissional", "Mesa reuniões"],
                score_bonus: {
                    team_collaboration: 20,
                    quality_processes: 10
                }
            },
            design: {
                name: "Estúdio de Design",
                icon: "🎨",
                cost: 35000,
                description: "Equipamentos para criação e design profissional",
                items: ["iMac Pro", "Tablet gráfico", "Câmera profissional", "Iluminação estúdio"],
                score_bonus: {
                    technology_adoption: 15,
                    quality_processes: 15
                }
            }
        }
    },
    // ===== INICIALIZAÇÃO =====
    init() {
        console.log(`🚀 Iniciando ${this.config.gameTitle} - Sistema Completo (${this.config.totalActs} Atos)`);
        this.bindEvents();
        this.loadState();
        this.checkAuthState();
        this.updateUI();
    },

    // ===== EVENTOS =====
    bindEvents() {
        // Login
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Professor
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

        document.getElementById('copyCodeBtn')?.addEventListener('click', () => {
            this.copyTeamCode();
        });

        document.getElementById('startAct1Btn')?.addEventListener('click', () => {
            this.startAct(1);
        });

        // Navegação entre atos
        document.getElementById('prevActBtn')?.addEventListener('click', () => {
            this.navigateAct(-1);
        });

        document.getElementById('nextActBtn')?.addEventListener('click', () => {
            this.navigateAct(1);
        });

        // Questionário de perfil
        document.getElementById('nextQuestionBtn')?.addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('prevQuestionBtn')?.addEventListener('click', () => {
            this.prevQuestion();
        });

        document.getElementById('finishProfileBtn')?.addEventListener('click', () => {
            this.finishProfile();
        });

        // Segmento
        document.getElementById('submitSegmentVoteBtn')?.addEventListener('click', () => {
            this.submitSegmentVote();
        });

        document.getElementById('continueToStructureBtn')?.addEventListener('click', () => {
            this.goToPhase(1, 3);
        });

        // CEO
        document.getElementById('submitCEOVoteBtn')?.addEventListener('click', () => {
            this.submitCEOVote();
        });

        document.getElementById('confirmPositionsBtn')?.addEventListener('click', () => {
            this.confirmPositions();
        });

        document.getElementById('continueToLocationBtn')?.addEventListener('click', () => {
            this.goToPhase(1, 4);
        });

        // Localização
        document.getElementById('confirmLocationBtn')?.addEventListener('click', () => {
            this.confirmLocation();
        });

        document.getElementById('continueToEquipmentBtn')?.addEventListener('click', () => {
            this.goToPhase(1, 5);
        });

        // Equipamentos
        document.getElementById('finishAct1Btn')?.addEventListener('click', () => {
            this.finishAct(1);
        });

        // Professor
        document.getElementById('approveAct1Btn')?.addEventListener('click', () => {
            this.approveAct(1);
        });

        document.getElementById('approveAct2Btn')?.addEventListener('click', () => {
            this.approveAct(2);
        });

        document.getElementById('approveAct3Btn')?.addEventListener('click', () => {
            this.approveAct(3);
        });

        document.getElementById('approveAct4Btn')?.addEventListener('click', () => {
            this.approveAct(4);
        });

        document.getElementById('approveAct5Btn')?.addEventListener('click', () => {
            this.approveAct(5);
        });

        document.getElementById('showRankingBtn')?.addEventListener('click', () => {
            this.showRanking();
        });

        document.getElementById('resetSimulationBtn')?.addEventListener('click', () => {
            this.resetSimulation();
        });

        document.getElementById('exportResultsBtn')?.addEventListener('click', () => {
            this.exportResults();
        });

        document.getElementById('backToSimulationBtn')?.addEventListener('click', () => {
            this.backToSimulation();
        });

        // Bind equipment buttons
        this.bindEquipmentButtons();

        // Bind location cards
        this.bindLocationCards();

        // Bind segment cards
        this.bindSegmentCards();

        // Bind candidate cards
        this.bindCandidateCards();
    },

    bindEquipmentButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('equipment-btn')) {
                const equipmentCard = e.target.closest('.equipment-card');
                const equipmentType = equipmentCard.dataset.equipment;
                this.toggleEquipment(equipmentType);
            }
        });
    },

    bindLocationCards() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.location-card')) {
                const locationCard = e.target.closest('.location-card');
                const locationType = locationCard.dataset.location;
                this.selectLocation(locationType);
            }
        });
    },

    bindSegmentCards() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.segment-card')) {
                const segmentCard = e.target.closest('.segment-card');
                const segmentType = segmentCard.dataset.segment;
                this.selectSegment(segmentType);
            }
        });
    },

    bindCandidateCards() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.candidate-card')) {
                const candidateCard = e.target.closest('.candidate-card');
                const candidateId = candidateCard.dataset.candidate;
                this.selectCEOCandidate(candidateId);
            }
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
            this.showLoading('Autenticando...');

            if (window.firebaseAuth && window.firebaseUtils) {
                try {
                    await window.firebaseUtils.signInWithEmailAndPassword(
                        window.firebaseAuth, email, password
                    );
                } catch (authError) {
                    console.log('🔄 Criando nova conta...');
                    await window.firebaseUtils.createUserWithEmailAndPassword(
                        window.firebaseAuth, email, password
                    );
                }
            } else {
                // Fallback local
                this.state.currentUser = {
                    uid: this.generateId(),
                    email: email,
                    name: email.split('@')[0]
                };
                this.saveState();
                this.determineCurrentScreen();
            }

            this.hideLoading();
            this.showAlert('Login realizado com sucesso!', 'success');

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro no login:', error);
            this.showAlert('Erro ao fazer login: ' + error.message, 'error');
        }
    },

    async loadUserData() {
        if (!this.state.currentUser) return;

        try {
            if (window.firebaseDB && window.firebaseUtils) {
                const userRef = window.firebaseUtils.doc(window.firebaseDB, 'users', this.state.currentUser.uid);
                const userSnap = await window.firebaseUtils.getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    if (userData.gameState) {
                        Object.assign(this.state, userData.gameState);
                    }
                }
            } else {
                const savedState = localStorage.getItem('empresatec_complete_state');
                if (savedState) {
                    Object.assign(this.state, JSON.parse(savedState));
                }
            }

            this.determineCurrentScreen();

        } catch (error) {
            console.error('❌ Erro ao carregar dados:', error);
            this.determineCurrentScreen();
        }
    },

    determineCurrentScreen() {
        if (!this.state.currentTeam) {
            this.showScreen('teamScreen');
        } else if (this.state.currentAct === 1) {
            this.showScreen('act1Screen');
            this.loadAct1();
        } else if (this.state.currentAct === 2) {
            this.showScreen('act2Screen');
        } else if (this.state.currentAct === 3) {
            this.showScreen('act3Screen');
        } else if (this.state.currentAct === 4) {
            this.showScreen('act4Screen');
        } else if (this.state.currentAct === 5) {
            this.showScreen('act5Screen');
        } else {
            this.showScreen('teamScreen');
        }
    },

    // ===== GESTÃO DE TELAS =====
    showScreen(screenId) {
        console.log(`📱 Mudando para tela: ${screenId}`);

        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

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
        const gameTitle = document.getElementById('gameTitle');
        const progressText = document.getElementById('progressText');

        if (!progressContainer || !progressFill) return;

        const phases = {
            loginScreen: { act: 0, phase: 0, total: 25, text: 'Login' },
            teamScreen: { act: 0, phase: 1, total: 25, text: 'Formação de Equipe' },
            act1Screen: { act: 1, phase: this.state.currentPhase, total: 25, text: `Ato 1 - Fase ${this.state.currentPhase}` },
            act2Screen: { act: 2, phase: this.state.currentPhase, total: 25, text: `Ato 2 - Fase ${this.state.currentPhase}` },
            act3Screen: { act: 3, phase: this.state.currentPhase, total: 25, text: `Ato 3 - Fase ${this.state.currentPhase}` },
            act4Screen: { act: 4, phase: this.state.currentPhase, total: 25, text: `Ato 4 - Fase ${this.state.currentPhase}` },
            act5Screen: { act: 5, phase: this.state.currentPhase, total: 25, text: `Ato 5 - Fase ${this.state.currentPhase}` },
            rankingScreen: { act: 5, phase: 5, total: 25, text: 'Resultados Finais' }
        };

        const currentPhase = phases[this.state.currentScreen];

        if (currentPhase) {
            const actProgress = (currentPhase.act * 5) + currentPhase.phase;
            const percentage = (actProgress / currentPhase.total) * 100;

            progressFill.style.width = `${Math.min(percentage, 100)}%`;

            if (gameTitle) {
                gameTitle.textContent = `${this.config.gameTitle} - Ato ${Math.max(currentPhase.act, 1)} de ${this.config.totalActs}`;
            }

            if (progressText) {
                progressText.textContent = currentPhase.text;
            }

            // Atualizar pontuação atual
            const currentScore = document.getElementById('currentScore');
            if (currentScore) {
                currentScore.textContent = this.state.teamScores.total.toLocaleString();
            }

            // Mostrar/ocultar barra
            if (this.state.currentScreen === 'loginScreen' || this.state.currentScreen === 'teacherScreen') {
                progressContainer.classList.add('hidden');
            } else {
                progressContainer.classList.remove('hidden');
            }
        }
    },

    updateUI() {
        this.updateProgress();
        this.updateNavigationButtons();
    },

    updateNavigationButtons() {
        const prevActBtn = document.getElementById('prevActBtn');
        const nextActBtn = document.getElementById('nextActBtn');

        if (prevActBtn) {
            prevActBtn.disabled = this.state.currentAct <= 1;
        }

        if (nextActBtn) {
            // Só permite avançar se o ato atual foi aprovado pelo professor
            const canAdvance = this.state.professorApprovals[`act${this.state.currentAct}`] && 
                              this.state.currentAct < this.config.totalActs;
            nextActBtn.disabled = !canAdvance;
        }
    },

    // ===== NAVEGAÇÃO ENTRE ATOS =====
    navigateAct(direction) {
        const newAct = this.state.currentAct + direction;

        if (newAct >= 1 && newAct <= this.config.totalActs) {
            // Verificar se pode navegar para o ato
            if (direction > 0) {
                // Avançando: verificar aprovação do professor
                if (!this.state.professorApprovals[`act${this.state.currentAct}`]) {
                    this.showAlert('Aguarde a aprovação do professor para avançar.', 'warning');
                    return;
                }
            }

            this.state.currentAct = newAct;
            this.state.currentPhase = 1;
            this.showScreen(`act${newAct}Screen`);
            this.loadAct(newAct);
        }
    },

    startAct(actNumber) {
        this.state.currentAct = actNumber;
        this.state.currentPhase = 1;
        this.showScreen(`act${actNumber}Screen`);
        this.loadAct(actNumber);
    },

    loadAct(actNumber) {
        switch (actNumber) {
            case 1:
                this.loadAct1();
                break;
            case 2:
                this.loadAct2();
                break;
            case 3:
                this.loadAct3();
                break;
            case 4:
                this.loadAct4();
                break;
            case 5:
                this.loadAct5();
                break;
        }
    },

    goToPhase(act, phase) {
        this.state.currentAct = act;
        this.state.currentPhase = phase;

        // Ocultar todas as fases
        document.querySelectorAll('.phase-content').forEach(content => {
            content.classList.remove('active');
        });

        // Mostrar fase atual
        const targetPhase = document.getElementById(`act${act}Phase${phase}`);
        if (targetPhase) {
            targetPhase.classList.add('active');
        }

        // Atualizar indicador de fase
        const phaseIndicator = document.getElementById(`act${act}Phase`);
        if (phaseIndicator) {
            phaseIndicator.textContent = phase;
        }

        this.updateProgress();
        this.saveState();
    },

    // ===== EQUIPE =====
    async createTeam() {
        const teamName = document.getElementById('teamName').value.trim();

        if (!teamName) {
            this.showAlert('Digite um nome para a empresa.', 'error');
            return;
        }

        if (teamName.length < 3) {
            this.showAlert('O nome deve ter pelo menos 3 caracteres.', 'error');
            return;
        }

        try {
            this.showLoading('Criando empresa...');

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
                currentAct: 1,
                currentPhase: 1,
                scores: {
                    act1: 0, act2: 0, act3: 0, act4: 0, act5: 0, total: 0
                },
                spending: {
                    act1: 0, act2: 0, act3: 0, act4: 0, act5: 0
                },
                decisions: {},
                status: 'active'
            };

            if (window.firebaseDB && window.firebaseUtils) {
                const teamRef = window.firebaseUtils.doc(window.firebaseDB, 'teams', teamCode);
                await window.firebaseUtils.setDoc(teamRef, team);
            }

            this.state.currentTeam = team;
            this.saveState();
            this.hideLoading();

            this.showAlert(`Empresa "${teamName}" criada com sucesso!`, 'success');
            this.showTeamStatus();
            this.startTeamMonitoring();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao criar equipe:', error);
            this.showAlert('Erro ao criar empresa: ' + error.message, 'error');
        }
    },

    async joinTeam() {
        const teamCode = document.getElementById('teamCode').value.trim().toUpperCase();

        if (!teamCode) {
            this.showAlert('Digite o código da empresa.', 'error');
            return;
        }

        try {
            this.showLoading('Entrando na empresa...');

            if (window.firebaseDB && window.firebaseUtils) {
                const teamRef = window.firebaseUtils.doc(window.firebaseDB, 'teams', teamCode);
                const teamSnap = await window.firebaseUtils.getDoc(teamRef);

                if (!teamSnap.exists()) {
                    this.hideLoading();
                    this.showAlert('Empresa não encontrada.', 'error');
                    return;
                }

                const team = teamSnap.data();

                const existingMember = team.members.find(m => m.uid === this.state.currentUser.uid);
                if (existingMember) {
                    this.hideLoading();
                    this.state.currentTeam = team;
                    this.showTeamStatus();
                    this.showAlert('Você já faz parte desta empresa!', 'info');
                    return;
                }

                if (team.members.length >= this.config.maxTeamSize) {
                    this.hideLoading();
                    this.showAlert('Empresa já atingiu o limite de membros.', 'error');
                    return;
                }

                const newMember = {
                    uid: this.state.currentUser.uid,
                    email: this.state.currentUser.email,
                    name: this.state.currentUser.name,
                    isLeader: false,
                    joinedAt: new Date().toISOString()
                };

                team.members.push(newMember);

                await window.firebaseUtils.updateDoc(teamRef, {
                    members: team.members,
                    updatedAt: new Date().toISOString()
                });

                this.state.currentTeam = team;
            }

            this.saveState();
            this.hideLoading();

            this.showAlert(`Bem-vindo à ${team.name}!`, 'success');
            this.showTeamStatus();
            this.startTeamMonitoring();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao entrar na equipe:', error);
            this.showAlert('Erro ao entrar na empresa: ' + error.message, 'error');
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

        teamStatus.classList.remove('hidden');
        teamNameDisplay.textContent = this.state.currentTeam.name;
        teamCodeDisplay.textContent = this.state.currentTeam.code;

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

        if (this.state.currentTeam.members.length < this.config.minTeamSize) {
            membersWaiting.classList.remove('hidden');
            membersWaiting.querySelector('p').textContent = 
                `⏳ Aguardando mais membros... (${this.state.currentTeam.members.length}/${this.config.minTeamSize} mínimo)`;
        } else {
            membersWaiting.classList.add('hidden');
        }

        const isLeader = this.state.currentTeam.leader === this.state.currentUser.uid;
        if (isLeader && this.state.currentTeam.members.length >= this.config.minTeamSize) {
            leaderActions.classList.remove('hidden');
        } else {
            leaderActions.classList.add('hidden');
        }
    },

    startTeamMonitoring() {
        if (!window.firebaseDB || !this.state.currentTeam) return;

        const teamRef = window.firebaseUtils.doc(window.firebaseDB, 'teams', this.state.currentTeam.code);
        this.teamUnsubscribe = window.firebaseUtils.onSnapshot(teamRef, (doc) => {
            if (doc.exists()) {
                const updatedTeam = doc.data();
                this.state.currentTeam = updatedTeam;
                this.showTeamStatus();
            }
        });
    },

    copyTeamCode() {
        const teamCode = this.state.currentTeam.code;
        navigator.clipboard.writeText(teamCode).then(() => {
            this.showAlert('Código copiado!', 'success');
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = teamCode;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showAlert('Código copiado!', 'success');
        });
    },
    // ===== ATO 1: FUNDAÇÃO DA EMPRESA =====
    loadAct1() {
        console.log('🏗️ Carregando Ato 1: Fundação da Empresa');
        this.goToPhase(1, 1);
        this.loadQuestionnaire();
        this.updateBudgetDisplay(1);
    },

    loadQuestionnaire() {
        const currentQuestionNum = document.getElementById('currentQuestionNum');
        const totalQuestions = document.getElementById('totalQuestions');
        const questionText = document.getElementById('questionText');
        const questionOptions = document.getElementById('questionOptions');

        if (!this.state.userAnswers) {
            this.state.userAnswers = [];
            this.state.currentQuestion = 0;
        }

        if (currentQuestionNum) currentQuestionNum.textContent = this.state.currentQuestion + 1;
        if (totalQuestions) totalQuestions.textContent = this.data.questions.length;

        const question = this.data.questions[this.state.currentQuestion];
        if (question && questionText) {
            questionText.textContent = question.text;

            if (questionOptions) {
                questionOptions.innerHTML = '';
                question.options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.className = 'option-button';
                    button.textContent = option.text;
                    button.dataset.optionIndex = index;

                    // Marcar se já foi selecionada
                    const existingAnswer = this.state.userAnswers[this.state.currentQuestion];
                    if (existingAnswer && existingAnswer.optionIndex === index) {
                        button.classList.add('selected');
                    }

                    button.addEventListener('click', () => {
                        this.selectQuestionOption(index);
                    });

                    questionOptions.appendChild(button);
                });
            }
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
        document.querySelectorAll('.option-button').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-option-index="${optionIndex}"]`).classList.add('selected');

        this.updateQuestionNavigation();
        this.saveState();
    },

    updateQuestionNavigation() {
        const prevBtn = document.getElementById('prevQuestionBtn');
        const nextBtn = document.getElementById('nextQuestionBtn');
        const finishBtn = document.getElementById('finishProfileBtn');

        if (prevBtn) prevBtn.disabled = this.state.currentQuestion === 0;

        const currentAnswered = this.state.userAnswers[this.state.currentQuestion];
        if (nextBtn) nextBtn.disabled = !currentAnswered;

        const answeredCount = this.state.userAnswers.filter(a => a).length;
        const allAnswered = answeredCount === this.data.questions.length;

        if (finishBtn) {
            if (allAnswered) {
                finishBtn.classList.remove('hidden');
                if (nextBtn) nextBtn.classList.add('hidden');
            } else {
                finishBtn.classList.add('hidden');
                if (nextBtn) nextBtn.classList.remove('hidden');
            }
        }
    },

    nextQuestion() {
        if (this.state.currentQuestion < this.data.questions.length - 1) {
            this.state.currentQuestion++;
            this.loadQuestionnaire();
        }
    },

    prevQuestion() {
        if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.loadQuestionnaire();
        }
    },

    async finishProfile() {
        const answeredCount = this.state.userAnswers.filter(a => a).length;
        if (answeredCount < this.data.questions.length) {
            this.showAlert('Responda todas as perguntas primeiro.', 'error');
            return;
        }

        try {
            this.showLoading('Analisando perfil...');

            const profile = this.calculateProfile();
            this.state.userProfile = profile;

            await this.saveUserProfile();

            this.hideLoading();
            this.showAlert(`Seu perfil: ${profile.name}!`, 'success');

            // Aguardar outros membros
            setTimeout(() => {
                this.checkAllProfilesComplete().then(allComplete => {
                    if (allComplete) {
                        document.getElementById('continueToSegmentBtn').classList.remove('hidden');
                    }
                });
            }, 1500);

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

        this.state.userAnswers.forEach(answer => {
            if (answer && answer.option) {
                const profile = answer.option.profile;
                const weight = answer.option.weight || 1;
                scores[profile] += weight;
            }
        });

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
        } catch (error) {
            console.error('❌ Erro ao salvar perfil:', error);
        }
    },

    async checkAllProfilesComplete() {
        if (!window.firebaseDB) return true; // Fallback

        try {
            const teamMembers = this.state.currentTeam.members;
            let completedProfiles = 0;

            for (const member of teamMembers) {
                const userRef = window.firebaseUtils.doc(window.firebaseDB, 'users', member.uid);
                const userSnap = await window.firebaseUtils.getDoc(userRef);

                if (userSnap.exists() && userSnap.data().profile) {
                    completedProfiles++;
                }
            }

            return completedProfiles === teamMembers.length;
        } catch (error) {
            console.error('❌ Erro ao verificar perfis:', error);
            return false;
        }
    },

    // Fase 2: Segmentos
    loadSegments() {
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
                        <strong>Mercado:</strong> ${segment.market_size}
                    </div>
                    <div class="detail-item">
                        <strong>Crescimento:</strong> ${segment.growth_rate}
                    </div>
                    <div class="detail-item">
                        <strong>Investimento:</strong> R$ ${segment.required_investment.toLocaleString()}
                    </div>
                </div>
                <div class="segment-challenges">
                    <h4>Desafios:</h4>
                    <ul>
                        ${segment.challenges.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
                <div class="segment-opportunities">
                    <h4>Oportunidades:</h4>
                    <ul>
                        ${segment.opportunities.map(o => `<li>${o}</li>`).join('')}
                    </ul>
                </div>
            `;

            segmentCard.addEventListener('click', () => {
                this.selectSegment(segmentKey);
            });

            segmentsGrid.appendChild(segmentCard);
        });
    },

    selectSegment(segmentKey) {
        document.querySelectorAll('.segment-card').forEach(card => {
            card.classList.remove('selected');
        });

        const selectedCard = document.querySelector(`[data-segment="${segmentKey}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            this.state.selectedSegment = segmentKey;

            const submitBtn = document.getElementById('submitSegmentVoteBtn');
            if (submitBtn) {
                submitBtn.classList.remove('hidden');
                submitBtn.disabled = false;
            }
        }
    },

    async submitSegmentVote() {
        if (!this.state.selectedSegment) {
            this.showAlert('Selecione um segmento primeiro.', 'error');
            return;
        }

        try {
            this.showLoading('Enviando voto...');

            if (window.firebaseDB && window.firebaseUtils) {
                const voteRef = window.firebaseUtils.doc(
                    window.firebaseDB, 
                    'votes', 
                    `${this.state.currentTeam.code}_segment_${this.state.currentUser.uid}`
                );

                await window.firebaseUtils.setDoc(voteRef, {
                    teamCode: this.state.currentTeam.code,
                    userId: this.state.currentUser.uid,
                    vote: this.state.selectedSegment,
                    voteType: 'segment',
                    timestamp: new Date().toISOString()
                });
            }

            this.hideLoading();
            this.showAlert('Voto registrado!', 'success');

            document.getElementById('submitSegmentVoteBtn').disabled = true;

            this.checkSegmentVotingComplete();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao votar:', error);
            this.showAlert('Erro ao registrar voto: ' + error.message, 'error');
        }
    },

    async checkSegmentVotingComplete() {
        if (!window.firebaseDB) return;

        try {
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

            this.updateVoteStatus(`${totalVotes}/${totalMembers} votos recebidos`);

            if (totalVotes >= totalMembers) {
                setTimeout(() => {
                    this.showSegmentResults(votes);
                }, 1000);
            }

        } catch (error) {
            console.error('❌ Erro ao verificar votação:', error);
        }
    },

    updateVoteStatus(message) {
        const voteStatus = document.getElementById('voteStatus');
        if (voteStatus) {
            voteStatus.textContent = message;
        }
    },

    showSegmentResults(votes) {
        const results = {};
        votes.forEach(vote => {
            results[vote.vote] = (results[vote.vote] || 0) + 1;
        });

        const winner = Object.keys(results).reduce((a, b) => 
            results[a] > results[b] ? a : b
        );

        this.state.selectedSegment = winner;

        // Adicionar aos gastos o investimento necessário
        const segment = this.data.segments[winner];
        this.state.spending.act1 += segment.required_investment;

        this.calculateSegmentScore(winner, results);

        this.showAlert(`Segmento escolhido: ${segment.name}!`, 'success');

        if (this.isTeamLeader()) {
            document.getElementById('continueToStructureBtn').classList.remove('hidden');
        }

        this.saveState();
    },

    calculateSegmentScore(winnerSegment, results) {
        const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);
        const winnerVotes = results[winnerSegment];

        let score = 100; // Base score

        // Bonus por consenso
        const consensus = winnerVotes / totalVotes;
        score += Math.round(consensus * 50);

        // Bonus por adequação ao perfil da equipe
        const segment = this.data.segments[winnerSegment];
        score += segment.score_multiplier * 20;

        this.state.teamScores.act1 += score;
        this.updateScoreDisplay();
    },

    // Fase 3: Estrutura Organizacional
    loadCEOCandidates() {
        const candidatesGrid = document.getElementById('candidatesGrid');
        if (!candidatesGrid) return;

        candidatesGrid.innerHTML = '';

        this.state.currentTeam.members.forEach(member => {
            const candidateCard = document.createElement('div');
            candidateCard.className = 'candidate-card';
            candidateCard.dataset.candidate = member.uid;

            candidateCard.innerHTML = `
                <div class="candidate-avatar">${member.name.charAt(0).toUpperCase()}</div>
                <div class="candidate-name">${member.name}</div>
                <div class="candidate-profile">
                    ${member.isLeader ? 'Fundador da Empresa' : 'Executivo'}
                </div>
            `;

            candidateCard.addEventListener('click', () => {
                this.selectCEOCandidate(member.uid);
            });

            candidatesGrid.appendChild(candidateCard);
        });
    },

    selectCEOCandidate(candidateId) {
        document.querySelectorAll('.candidate-card').forEach(card => {
            card.classList.remove('selected');
        });

        const selectedCard = document.querySelector(`[data-candidate="${candidateId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            this.state.selectedCEOCandidate = candidateId;

            const submitBtn = document.getElementById('submitCEOVoteBtn');
            if (submitBtn) {
                submitBtn.classList.remove('hidden');
                submitBtn.disabled = false;
            }
        }
    },

    async submitCEOVote() {
        if (!this.state.selectedCEOCandidate) {
            this.showAlert('Selecione um candidato a CEO.', 'error');
            return;
        }

        try {
            this.showLoading('Registrando voto...');

            if (window.firebaseDB && window.firebaseUtils) {
                const voteRef = window.firebaseUtils.doc(
                    window.firebaseDB, 
                    'votes', 
                    `${this.state.currentTeam.code}_ceo_${this.state.currentUser.uid}`
                );

                await window.firebaseUtils.setDoc(voteRef, {
                    teamCode: this.state.currentTeam.code,
                    userId: this.state.currentUser.uid,
                    vote: this.state.selectedCEOCandidate,
                    voteType: 'ceo',
                    timestamp: new Date().toISOString()
                });
            }

            this.hideLoading();
            this.showAlert('Voto para CEO registrado!', 'success');

            document.getElementById('submitCEOVoteBtn').disabled = true;

            this.checkCEOVotingComplete();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao votar CEO:', error);
            this.showAlert('Erro ao registrar voto: ' + error.message, 'error');
        }
    },

    async checkCEOVotingComplete() {
        if (!window.firebaseDB) return;

        try {
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

            if (totalVotes >= totalMembers) {
                setTimeout(() => {
                    this.showCEOResults(votes);
                }, 1000);
            }

        } catch (error) {
            console.error('❌ Erro ao verificar eleição CEO:', error);
        }
    },

    showCEOResults(votes) {
        const results = {};
        votes.forEach(vote => {
            results[vote.vote] = (results[vote.vote] || 0) + 1;
        });

        const winner = Object.keys(results).reduce((a, b) => 
            results[a] > results[b] ? a : b
        );

        this.state.currentCEO = winner;

        const electedCEO = this.state.currentTeam.members.find(m => m.uid === winner);

        this.showAlert(`CEO eleito: ${electedCEO.name}!`, 'success');

        this.calculateCEOScore(winner, results);

        // Mostrar interface de atribuição de cargos se for o CEO
        if (this.state.currentUser.uid === winner) {
            document.getElementById('positionsAssignment').classList.remove('hidden');
            this.loadPositionsAssignment();
        }

        this.saveState();
    },

    calculateCEOScore(winnerCEO, results) {
        const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);
        const winnerVotes = results[winnerCEO];

        let score = 150; // Base score para eleição

        // Bonus por unanimidade/consenso
        if (winnerVotes === totalVotes) {
            score += 100; // Unanimidade
        } else {
            const consensus = winnerVotes / totalVotes;
            score += Math.round(consensus * 75);
        }

        this.state.teamScores.act1 += score;
        this.updateScoreDisplay();
    },

    loadPositionsAssignment() {
        const positionsGrid = document.getElementById('positionsGrid');
        if (!positionsGrid) return;

        positionsGrid.innerHTML = '';

        // Membros excluindo o CEO
        const membersToAssign = this.state.currentTeam.members.filter(m => m.uid !== this.state.currentCEO);
        const availablePositions = Object.keys(this.data.positions).filter(p => p !== 'ceo');

        membersToAssign.forEach(member => {
            const assignmentRow = document.createElement('div');
            assignmentRow.className = 'assignment-row';
            assignmentRow.innerHTML = `
                <div class="member-info">
                    <div class="member-avatar">${member.name.charAt(0).toUpperCase()}</div>
                    <div class="member-details">
                        <div class="member-name">${member.name}</div>
                        <div class="member-profile">Perfil: Carregando...</div>
                    </div>
                </div>
                <div class="assignment-arrow">➡️</div>
                <select class="position-select" data-member="${member.uid}">
                    <option value="">Selecione o cargo...</option>
                    ${availablePositions.map(posKey => {
                        const position = this.data.positions[posKey];
                        return `<option value="${posKey}">${position.title} - ${position.name}</option>`;
                    }).join('')}
                </select>
            `;
            positionsGrid.appendChild(assignmentRow);
        });

        this.validatePositionSelections();
    },

    validatePositionSelections() {
        const selects = document.querySelectorAll('.position-select');
        const confirmBtn = document.getElementById('confirmPositionsBtn');

        const validate = () => {
            const selections = {};
            let allSelected = true;
            let hasDuplicates = false;

            selects.forEach(select => {
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

            if (confirmBtn) {
                confirmBtn.disabled = !allSelected || hasDuplicates;

                if (hasDuplicates) {
                    confirmBtn.textContent = '❌ Cargos duplicados';
                } else if (!allSelected) {
                    confirmBtn.textContent = '⏳ Atribua todos os cargos';
                } else {
                    confirmBtn.textContent = '✅ Confirmar Cargos';
                }
            }
        };

        selects.forEach(select => {
            select.addEventListener('change', validate);
        });

        validate();
    },

    async confirmPositions() {
        const selects = document.querySelectorAll('.position-select');
        const assignments = {};

        selects.forEach(select => {
            const memberId = select.dataset.member;
            const position = select.value;
            assignments[memberId] = position;
        });

        try {
            this.showLoading('Confirmando estrutura...');

            this.state.teamPositions = assignments;

            if (window.firebaseDB && window.firebaseUtils) {
                const teamRef = window.firebaseUtils.doc(window.firebaseDB, 'teams', this.state.currentTeam.code);
                await window.firebaseUtils.updateDoc(teamRef, {
                    positions: assignments,
                    ceo: this.state.currentCEO,
                    updatedAt: new Date().toISOString()
                });
            }

            this.calculatePositionsScore();

            this.hideLoading();
            this.showAlert('Estrutura organizacional definida!', 'success');

            document.getElementById('continueToLocationBtn').classList.remove('hidden');

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao confirmar cargos:', error);
            this.showAlert('Erro ao confirmar estrutura: ' + error.message, 'error');
        }
    },

    calculatePositionsScore() {
        let score = 200; // Base score para estrutura

        // Bonus por adequação perfil/cargo (simulado)
        const assignments = Object.keys(this.state.teamPositions).length;
        score += assignments * 25;

        this.state.teamScores.act1 += score;
        this.updateScoreDisplay();
    },

    // Fase 4: Localização
    loadLocations() {
        // As localizações já estão no HTML, só precisamos habilitar a seleção
        this.bindLocationCards();
    },

    selectLocation(locationType) {
        document.querySelectorAll('.location-card').forEach(card => {
            card.classList.remove('selected');
        });

        const selectedCard = document.querySelector(`[data-location="${locationType}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            this.state.selectedLocation = locationType;

            const confirmBtn = document.getElementById('confirmLocationBtn');
            if (confirmBtn) {
                confirmBtn.classList.remove('hidden');
                confirmBtn.disabled = false;
            }
        }
    },

    async confirmLocation() {
        if (!this.state.selectedLocation) {
            this.showAlert('Selecione uma localização.', 'error');
            return;
        }

        const location = this.data.locations[this.state.selectedLocation];

        // Verificar orçamento
        if (this.state.spending.act1 + location.cost > this.state.budgets.act1) {
            this.showAlert('Orçamento insuficiente para esta localização.', 'error');
            return;
        }

        try {
            this.showLoading('Confirmando localização...');

            this.state.spending.act1 += location.cost;

            this.calculateLocationScore();

            this.hideLoading();
            this.showAlert(`Sede escolhida: ${location.name}!`, 'success');

            document.getElementById('continueToEquipmentBtn').classList.remove('hidden');
            this.updateBudgetDisplay(1);

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao confirmar localização:', error);
            this.showAlert('Erro ao confirmar localização: ' + error.message, 'error');
        }
    },

    calculateLocationScore() {
        const location = this.data.locations[this.state.selectedLocation];
        let score = 100; // Base score

        // Aplicar bonus/penalidades da localização
        Object.keys(location.score_bonus).forEach(category => {
            score += location.score_bonus[category];
        });

        this.state.teamScores.act1 += Math.max(score, 0);
        this.updateScoreDisplay();
    },

    // Fase 5: Equipamentos
    loadEquipments() {
        // Equipamentos já estão no HTML
        this.updateBudgetDisplay(1);
    },

    toggleEquipment(equipmentType) {
        const equipment = this.data.equipment[equipmentType];
        const card = document.querySelector(`[data-equipment="${equipmentType}"]`);
        const btn = card.querySelector('.equipment-btn');

        if (!this.state.selectedEquipment) {
            this.state.selectedEquipment = [];
        }

        const isSelected = this.state.selectedEquipment.includes(equipmentType);

        if (isSelected) {
            // Remover
            this.state.selectedEquipment = this.state.selectedEquipment.filter(e => e !== equipmentType);
            this.state.spending.act1 -= equipment.cost;
            card.classList.remove('selected');
            btn.textContent = 'Adquirir';
        } else {
            // Adicionar se há orçamento
            if (this.state.spending.act1 + equipment.cost <= this.state.budgets.act1) {
                this.state.selectedEquipment.push(equipmentType);
                this.state.spending.act1 += equipment.cost;
                card.classList.add('selected');
                btn.textContent = 'Remover';
            } else {
                this.showAlert('Orçamento insuficiente.', 'error');
                return;
            }
        }

        this.updateBudgetDisplay(1);
        this.saveState();
    },

    updateBudgetDisplay(act) {
        const budgetElement = document.getElementById(`act${act}Budget`);
        const totalSpentElement = document.getElementById('totalSpent');
        const remainingBudgetElement = document.getElementById('remainingBudget');

        const budget = this.state.budgets[`act${act}`];
        const spent = this.state.spending[`act${act}`];
        const remaining = budget - spent;

        if (budgetElement) {
            budgetElement.textContent = remaining.toLocaleString();
        }

        if (totalSpentElement) {
            totalSpentElement.textContent = `R$ ${spent.toLocaleString()}`;
        }

        if (remainingBudgetElement) {
            remainingBudgetElement.textContent = `R$ ${remaining.toLocaleString()}`;
        }
    },

    async finishAct(actNumber) {
        try {
            this.showLoading('Finalizando ato...');

            this.calculateEquipmentScore();
            this.calculateActScore(actNumber);

            await this.saveActProgress(actNumber);

            this.hideLoading();
            this.showAlert(`Ato ${actNumber} concluído! Pontuação: ${this.state.teamScores[`act${actNumber}`]}`, 'success');

            // Aguardar aprovação do professor
            this.showAlert('Aguardando aprovação do professor para continuar...', 'info');

        } catch (error) {
            this.hideLoading();
            console.error(`❌ Erro ao finalizar ato ${actNumber}:`, error);
            this.showAlert(`Erro ao finalizar ato: ${error.message}`, 'error');
        }
    },

    calculateEquipmentScore() {
        if (!this.state.selectedEquipment) return;

        let score = 0;

        this.state.selectedEquipment.forEach(equipType => {
            const equipment = this.data.equipment[equipType];

            // Score base pelo equipamento
            score += 50;

            // Bonus específicos do equipamento
            Object.keys(equipment.score_bonus).forEach(category => {
                score += equipment.score_bonus[category];
            });
        });

        this.state.teamScores.act1 += score;
        this.updateScoreDisplay();
    },

    calculateActScore(actNumber) {
        // Score final baseado na eficiência do orçamento
        const budget = this.state.budgets[`act${actNumber}`];
        const spent = this.state.spending[`act${actNumber}`];
        const efficiency = spent / budget;

        let efficiencyScore = 0;
        if (efficiency > 0.8 && efficiency <= 1.0) {
            efficiencyScore = 200; // Uso eficiente
        } else if (efficiency > 0.6) {
            efficiencyScore = 150; // Uso moderado
        } else if (efficiency > 0.4) {
            efficiencyScore = 100; // Uso conservador
        } else {
            efficiencyScore = 50; // Muito conservador
        }

        this.state.teamScores[`act${actNumber}`] += efficiencyScore;
        this.state.teamScores.total = Object.values(this.state.teamScores)
            .filter((_, index, arr) => index < arr.length - 1) // Excluir 'total'
            .reduce((sum, score) => sum + score, 0);

        this.updateScoreDisplay();
    },

    async saveActProgress(actNumber) {
        if (!window.firebaseDB || !this.state.currentTeam) return;

        try {
            const teamRef = window.firebaseUtils.doc(window.firebaseDB, 'teams', this.state.currentTeam.code);
            await window.firebaseUtils.updateDoc(teamRef, {
                [`act${actNumber}Completed`]: true,
                [`act${actNumber}Score`]: this.state.teamScores[`act${actNumber}`],
                [`act${actNumber}Decisions`]: {
                    segment: this.state.selectedSegment,
                    ceo: this.state.currentCEO,
                    positions: this.state.teamPositions,
                    location: this.state.selectedLocation,
                    equipment: this.state.selectedEquipment
                },
                [`act${actNumber}Spending`]: this.state.spending[`act${actNumber}`],
                totalScore: this.state.teamScores.total,
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('❌ Erro ao salvar progresso:', error);
        }
    },

    updateScoreDisplay() {
        const scoreElement = document.getElementById('currentScore');
        if (scoreElement) {
            scoreElement.textContent = this.state.teamScores.total.toLocaleString();
        }
    },

    // ===== ATO 2: ESTRUTURAÇÃO OPERACIONAL =====
    loadAct2() {
        console.log('⚙️ Carregando Ato 2: Estruturação Operacional');
        // Verificar se Ato 1 foi aprovado
        if (!this.state.professorApprovals.act1) {
            this.showAlert('Ato 2 será liberado após aprovação do professor.', 'info');
            return;
        }

        this.goToPhase(2, 1);
        this.updateBudgetDisplay(2);
        // TODO: Implementar fases específicas do Ato 2
    },

    // ===== ATO 3: DESENVOLVIMENTO =====
    loadAct3() {
        console.log('🔬 Carregando Ato 3: Desenvolvimento de Produto/Serviço');
        // Verificar se Ato 2 foi aprovado
        if (!this.state.professorApprovals.act2) {
            this.showAlert('Ato 3 será liberado após aprovação do professor.', 'info');
            return;
        }

        this.goToPhase(3, 1);
        this.updateBudgetDisplay(3);
        // TODO: Implementar fases específicas do Ato 3
    },
    // ===== ATO 4: LANÇAMENTO NO MERCADO =====
    loadAct4() {
        console.log('🚀 Carregando Ato 4: Lançamento no Mercado');
        // Verificar se Ato 3 foi aprovado
        if (!this.state.professorApprovals.act3) {
            this.showAlert('Ato 4 será liberado após aprovação do professor.', 'info');
            return;
        }

        this.goToPhase(4, 1);
        this.updateBudgetDisplay(4);
        // TODO: Implementar fases específicas do Ato 4
    },

    // ===== ATO 5: CRESCIMENTO E EXPANSÃO =====
    loadAct5() {
        console.log('📈 Carregando Ato 5: Crescimento e Expansão');
        // Verificar se Ato 4 foi aprovado
        if (!this.state.professorApprovals.act4) {
            this.showAlert('Ato 5 será liberado após aprovação do professor.', 'info');
            return;
        }

        this.goToPhase(5, 1);
        this.updateBudgetDisplay(5);
        // TODO: Implementar fases específicas do Ato 5
    },

    // ===== SISTEMA DO PROFESSOR =====
    showTeacherPanel() {
        console.log('👩‍🏫 Acessando painel do professor');
        this.showScreen('teacherScreen');
        this.loadTeacherDashboard();
    },

    async loadTeacherDashboard() {
        try {
            this.updateTeacherStats();
            await this.loadTeamsMonitor();
        } catch (error) {
            console.error('❌ Erro ao carregar dashboard:', error);
        }
    },

    async updateTeacherStats() {
        const totalTeamsElement = document.getElementById('totalTeams');
        const totalParticipantsElement = document.getElementById('totalParticipants');
        const currentActElement = document.getElementById('currentActNumber');
        const completedTeamsElement = document.getElementById('completedTeams');

        try {
            if (window.firebaseDB && window.firebaseUtils) {
                const teamsQuery = window.firebaseUtils.query(
                    window.firebaseUtils.collection(window.firebaseDB, 'teams')
                );
                const teamsSnap = await window.firebaseUtils.getDocs(teamsQuery);

                let totalTeams = 0;
                let totalParticipants = 0;
                let completedTeams = 0;

                teamsSnap.forEach(doc => {
                    const team = doc.data();
                    totalTeams++;
                    totalParticipants += team.members ? team.members.length : 0;

                    if (team.act1Completed) {
                        completedTeams++;
                    }
                });

                if (totalTeamsElement) totalTeamsElement.textContent = totalTeams;
                if (totalParticipantsElement) totalParticipantsElement.textContent = totalParticipants;
                if (completedTeamsElement) completedTeamsElement.textContent = completedTeams;
            }
        } catch (error) {
            console.error('❌ Erro ao atualizar estatísticas:', error);
        }

        if (currentActElement) {
            currentActElement.textContent = this.getCurrentActMode();
        }
    },

    getCurrentActMode() {
        // Determinar qual ato está sendo jogado pela maioria
        let maxAct = 1;
        Object.keys(this.state.professorApprovals).forEach(key => {
            const actNum = parseInt(key.replace('act', ''));
            if (this.state.professorApprovals[key] && actNum > maxAct - 1) {
                maxAct = actNum + 1;
            }
        });
        return Math.min(maxAct, this.config.totalActs);
    },

    async loadTeamsMonitor() {
        const teamsGrid = document.getElementById('teacherTeamsGrid');
        if (!teamsGrid) return;

        teamsGrid.innerHTML = '<div class="loading-teams">📊 Carregando empresas...</div>';

        try {
            if (window.firebaseDB && window.firebaseUtils) {
                const teamsQuery = window.firebaseUtils.query(
                    window.firebaseUtils.collection(window.firebaseDB, 'teams')
                );

                const teamsSnap = await window.firebaseUtils.getDocs(teamsQuery);
                const teams = [];

                teamsSnap.forEach(doc => {
                    teams.push({ id: doc.id, ...doc.data() });
                });

                this.displayTeacherTeamsGrid(teams);
            } else {
                teamsGrid.innerHTML = '<div class="no-teams">🔧 Modo de desenvolvimento - Firebase não configurado</div>';
            }
        } catch (error) {
            console.error('❌ Erro ao carregar equipes:', error);
            teamsGrid.innerHTML = '<div class="error-teams">❌ Erro ao carregar equipes</div>';
        }
    },

    displayTeacherTeamsGrid(teams) {
        const teamsGrid = document.getElementById('teacherTeamsGrid');

        if (teams.length === 0) {
            teamsGrid.innerHTML = '<div class="no-teams">📝 Nenhuma empresa criada ainda</div>';
            return;
        }

        teamsGrid.innerHTML = '';

        teams.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.className = 'team-monitor-card';

            const status = this.getTeamStatus(team);
            const currentAct = this.getTeamCurrentAct(team);

            teamCard.innerHTML = `
                <div class="team-header">
                    <h4>${team.name}</h4>
                    <div class="team-code">Código: <strong>${team.code}</strong></div>
                </div>
                <div class="team-info">
                    <div class="info-item">
                        <strong>👥 Membros:</strong> ${team.members ? team.members.length : 0}
                    </div>
                    <div class="info-item">
                        <strong>🎭 Ato Atual:</strong> ${currentAct}
                    </div>
                    <div class="info-item">
                        <strong>📊 Status:</strong> ${status}
                    </div>
                    <div class="info-item">
                        <strong>🏆 Pontuação:</strong> ${team.totalScore || 0}
                    </div>
                    <div class="info-item">
                        <strong>🕒 Criada:</strong> ${this.formatDate(team.createdAt)}
                    </div>
                    ${team.selectedSegment ? `<div class="info-item"><strong>🏭 Segmento:</strong> ${this.getSegmentName(team.selectedSegment)}</div>` : ''}
                    ${team.ceo ? `<div class="info-item"><strong>👑 CEO:</strong> ${this.getCEOName(team)}</div>` : ''}
                </div>
                <div class="team-actions">
                    <button class="btn btn--sm btn--outline" onclick="EmpresaTecComplete.viewTeamDetails('${team.code}')">
                        👁️ Detalhes
                    </button>
                    <button class="btn btn--sm btn--danger" onclick="EmpresaTecComplete.resetTeam('${team.code}')">
                        🗑️ Reset
                    </button>
                </div>
            `;

            teamsGrid.appendChild(teamCard);
        });
    },

    getTeamStatus(team) {
        if (!team.members || team.members.length < this.config.minTeamSize) {
            return 'Formando Equipe';
        }

        if (team.act1Completed && team.act2Completed && team.act3Completed && team.act4Completed && team.act5Completed) {
            return 'Simulação Completa';
        }

        const completedActs = [
            team.act1Completed,
            team.act2Completed,
            team.act3Completed,
            team.act4Completed,
            team.act5Completed
        ].filter(Boolean).length;

        return `${completedActs}/${this.config.totalActs} Atos Completos`;
    },

    getTeamCurrentAct(team) {
        if (team.act5Completed) return '5 (Completo)';
        if (team.act4Completed) return '5';
        if (team.act3Completed) return '4';
        if (team.act2Completed) return '3';
        if (team.act1Completed) return '2';
        return '1';
    },

    getSegmentName(segmentKey) {
        return this.data.segments[segmentKey]?.name || 'N/A';
    },

    getCEOName(team) {
        if (!team.ceo || !team.members) return 'N/A';
        const ceo = team.members.find(m => m.uid === team.ceo);
        return ceo ? ceo.name : 'N/A';
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

    async viewTeamDetails(teamCode) {
        if (!await this.validateAdminAccess()) return;

        try {
            if (window.firebaseDB && window.firebaseUtils) {
                const teamRef = window.firebaseUtils.doc(window.firebaseDB, 'teams', teamCode);
                const teamSnap = await window.firebaseUtils.getDoc(teamRef);

                if (teamSnap.exists()) {
                    const team = teamSnap.data();
                    this.showTeamDetailsModal(team);
                } else {
                    this.showAlert('Equipe não encontrada.', 'error');
                }
            }
        } catch (error) {
            console.error('❌ Erro ao buscar detalhes:', error);
            this.showAlert('Erro ao carregar detalhes: ' + error.message, 'error');
        }
    },

    showTeamDetailsModal(team) {
        const details = `
        Empresa: ${team.name}
        Código: ${team.code}
        Membros: ${team.members.length}

        Pontuações:
        - Ato 1: ${team.act1Score || 0}
        - Ato 2: ${team.act2Score || 0} 
        - Ato 3: ${team.act3Score || 0}
        - Ato 4: ${team.act4Score || 0}
        - Ato 5: ${team.act5Score || 0}
        - Total: ${team.totalScore || 0}

        Segmento: ${this.getSegmentName(team.selectedSegment)}
        CEO: ${this.getCEOName(team)}

        Status dos Atos:
        - Ato 1: ${team.act1Completed ? '✅' : '❌'}
        - Ato 2: ${team.act2Completed ? '✅' : '❌'}
        - Ato 3: ${team.act3Completed ? '✅' : '❌'}
        - Ato 4: ${team.act4Completed ? '✅' : '❌'}
        - Ato 5: ${team.act5Completed ? '✅' : '❌'}
        `;

        alert(details); // Implementação simples - poderia ser um modal mais elaborado
    },

    async resetTeam(teamCode) {
        if (!await this.validateAdminAccess()) return;

        if (!confirm(`Tem certeza que deseja resetar a empresa ${teamCode}? Esta ação não pode ser desfeita.`)) {
            return;
        }

        try {
            this.showLoading('Resetando empresa...');

            if (window.firebaseDB && window.firebaseUtils) {
                // Remover equipe
                const teamRef = window.firebaseUtils.doc(window.firebaseDB, 'teams', teamCode);
                await window.firebaseUtils.deleteDoc(teamRef);

                // Remover votos relacionados
                const votesQuery = window.firebaseUtils.query(
                    window.firebaseUtils.collection(window.firebaseDB, 'votes'),
                    window.firebaseUtils.where('teamCode', '==', teamCode)
                );
                const votesSnap = await window.firebaseUtils.getDocs(votesQuery);

                const deletePromises = [];
                votesSnap.forEach(doc => {
                    deletePromises.push(window.firebaseUtils.deleteDoc(doc.ref));
                });

                await Promise.all(deletePromises);
            }

            this.hideLoading();
            this.showAlert(`Empresa ${teamCode} resetada com sucesso!`, 'success');
            this.loadTeamsMonitor();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao resetar equipe:', error);
            this.showAlert('Erro ao resetar empresa: ' + error.message, 'error');
        }
    },

    async validateAdminAccess() {
        const adminPassword = document.getElementById('adminPassword').value;

        if (!adminPassword) {
            this.showAlert('Digite a senha de administrador.', 'error');
            return false;
        }

        if (adminPassword !== this.config.adminPassword) {
            this.showAlert('Senha incorreta!', 'error');
            document.getElementById('adminPassword').value = '';
            return false;
        }

        return true;
    },

    async approveAct(actNumber) {
        if (!await this.validateAdminAccess()) return;

        try {
            this.showLoading(`Aprovando Ato ${actNumber}...`);

            this.state.professorApprovals[`act${actNumber}`] = true;

            // Salvar aprovação no Firebase se disponível
            if (window.firebaseDB && window.firebaseUtils) {
                const gameStateRef = window.firebaseUtils.doc(window.firebaseDB, 'gameState', 'approvals');
                await window.firebaseUtils.setDoc(gameStateRef, {
                    [`act${actNumber}`]: true,
                    [`act${actNumber}ApprovedAt`]: new Date().toISOString(),
                    approvedBy: 'professor'
                }, { merge: true });
            }

            this.hideLoading();
            this.showAlert(`Ato ${actNumber} aprovado! Equipes podem avançar.`, 'success');

            // Atualizar botões
            this.updateApprovalButtons();

        } catch (error) {
            this.hideLoading();
            console.error(`❌ Erro ao aprovar ato ${actNumber}:`, error);
            this.showAlert(`Erro ao aprovar ato: ${error.message}`, 'error');
        }
    },

    updateApprovalButtons() {
        for (let i = 1; i <= this.config.totalActs; i++) {
            const button = document.getElementById(`approveAct${i}Btn`);
            if (button) {
                const isApproved = this.state.professorApprovals[`act${i}`];
                button.disabled = isApproved;
                button.textContent = isApproved ? `✅ Ato ${i} Aprovado` : `✅ Aprovar Ato ${i}`;

                // Só habilitar próximo ato se anterior foi aprovado
                if (i > 1) {
                    const prevApproved = this.state.professorApprovals[`act${i-1}`];
                    if (!prevApproved && !isApproved) {
                        button.disabled = true;
                        button.textContent = `🔒 Ato ${i} (Bloqueado)`;
                    }
                }
            }
        }
    },

    async showRanking() {
        if (!await this.validateAdminAccess()) return;

        try {
            this.showLoading('Gerando ranking...');

            await this.generateRanking();
            this.showScreen('rankingScreen');

            this.hideLoading();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao gerar ranking:', error);
            this.showAlert('Erro ao gerar ranking: ' + error.message, 'error');
        }
    },

    async generateRanking() {
        const rankingList = document.getElementById('rankingList');
        const summaryStats = document.getElementById('summaryStats');

        if (!window.firebaseDB) {
            rankingList.innerHTML = '<div class="no-ranking">Ranking disponível apenas com Firebase configurado</div>';
            return;
        }

        try {
            const teamsQuery = window.firebaseUtils.query(
                window.firebaseUtils.collection(window.firebaseDB, 'teams'),
                window.firebaseUtils.orderBy('totalScore', 'desc')
            );

            const teamsSnap = await window.firebaseUtils.getDocs(teamsQuery);
            const teams = [];

            teamsSnap.forEach(doc => {
                teams.push({ id: doc.id, ...doc.data() });
            });

            // Estatísticas gerais
            const totalTeams = teams.length;
            const avgScore = teams.reduce((sum, team) => sum + (team.totalScore || 0), 0) / totalTeams;
            const completedTeams = teams.filter(team => team.act1Completed).length;

            if (summaryStats) {
                summaryStats.innerHTML = `
                    <div class="summary-stat">
                        <h4>📊 Equipes Participantes</h4>
                        <div class="stat-value">${totalTeams}</div>
                    </div>
                    <div class="summary-stat">
                        <h4>✅ Equipes que Completaram</h4>
                        <div class="stat-value">${completedTeams}</div>
                    </div>
                    <div class="summary-stat">
                        <h4>🎯 Pontuação Média</h4>
                        <div class="stat-value">${Math.round(avgScore)}</div>
                    </div>
                `;
            }

            // Lista de ranking
            if (rankingList) {
                rankingList.innerHTML = '';

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
                                ${team.members.length} membros • ${this.getSegmentName(team.selectedSegment)}
                            </div>
                        </div>
                        <div class="ranking-scores">
                            <div class="total-score">${team.totalScore || 0}</div>
                            <div class="act-scores">
                                A1: ${team.act1Score || 0} | A2: ${team.act2Score || 0} | 
                                A3: ${team.act3Score || 0} | A4: ${team.act4Score || 0} | A5: ${team.act5Score || 0}
                            </div>
                        </div>
                    `;
                    rankingList.appendChild(rankingItem);
                });
            }

        } catch (error) {
            console.error('❌ Erro ao gerar ranking:', error);
            if (rankingList) {
                rankingList.innerHTML = '<div class="error-ranking">❌ Erro ao carregar ranking</div>';
            }
        }
    },

    async resetSimulation() {
        if (!await this.validateAdminAccess()) return;

        if (!confirm('⚠️ ATENÇÃO: Isto irá resetar TODA a simulação e apagar todos os dados! Continuar?')) {
            return;
        }

        if (!confirm('🚨 ÚLTIMA CONFIRMAÇÃO: Todos os dados serão perdidos permanentemente!')) {
            return;
        }

        try {
            this.showLoading('Resetando simulação completa...');

            if (window.firebaseDB && window.firebaseUtils) {
                // Remover todas as coleções
                const collections = ['teams', 'votes', 'users', 'gameState'];

                for (const collectionName of collections) {
                    const collectionQuery = window.firebaseUtils.query(
                        window.firebaseUtils.collection(window.firebaseDB, collectionName)
                    );
                    const collectionSnap = await window.firebaseUtils.getDocs(collectionQuery);

                    const deletePromises = [];
                    collectionSnap.forEach(doc => {
                        deletePromises.push(window.firebaseUtils.deleteDoc(doc.ref));
                    });

                    await Promise.all(deletePromises);
                }
            }

            // Limpar estado local
            localStorage.clear();
            sessionStorage.clear();

            // Reset estado do jogo
            this.state.professorApprovals = {
                act1: false, act2: false, act3: false, act4: false, act5: false
            };

            this.hideLoading();
            this.showAlert('🎯 Simulação resetada completamente! Todas as equipes podem começar do zero.', 'success');

            this.loadTeamsMonitor();
            this.updateApprovalButtons();

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao resetar simulação:', error);
            this.showAlert('Erro ao resetar simulação: ' + error.message, 'error');
        }
    },

    async exportResults() {
        if (!await this.validateAdminAccess()) return;

        try {
            this.showLoading('Exportando resultados...');

            const exportData = {
                exportedAt: new Date().toISOString(),
                gameTitle: this.config.gameTitle,
                totalActs: this.config.totalActs,
                teams: [],
                votes: [],
                gameState: this.state.professorApprovals
            };

            if (window.firebaseDB && window.firebaseUtils) {
                // Exportar equipes
                const teamsQuery = window.firebaseUtils.query(
                    window.firebaseUtils.collection(window.firebaseDB, 'teams')
                );
                const teamsSnap = await window.firebaseUtils.getDocs(teamsQuery);

                teamsSnap.forEach(doc => {
                    exportData.teams.push({ id: doc.id, ...doc.data() });
                });

                // Exportar votos
                const votesQuery = window.firebaseUtils.query(
                    window.firebaseUtils.collection(window.firebaseDB, 'votes')
                );
                const votesSnap = await window.firebaseUtils.getDocs(votesQuery);

                votesSnap.forEach(doc => {
                    exportData.votes.push(doc.data());
                });
            }

            // Criar e baixar arquivo JSON
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `empresatec_completo_${new Date().toISOString().split('T')[0]}.json`;
            link.click();

            this.hideLoading();
            this.showAlert('📊 Resultados exportados com sucesso!', 'success');

        } catch (error) {
            this.hideLoading();
            console.error('❌ Erro ao exportar:', error);
            this.showAlert('Erro ao exportar resultados: ' + error.message, 'error');
        }
    },

    backToSimulation() {
        if (this.state.currentUser) {
            this.determineCurrentScreen();
        } else {
            this.showScreen('loginScreen');
        }
    },

    // ===== UTILITÁRIOS =====
    isTeamLeader() {
        return this.state.currentTeam && 
               this.state.currentUser && 
               this.state.currentTeam.leader === this.state.currentUser.uid;
    },

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
            localStorage.setItem('empresatec_complete_state', JSON.stringify(this.state));

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
            const savedState = localStorage.getItem('empresatec_complete_state');
            if (savedState) {
                const parsed = JSON.parse(savedState);
                Object.assign(this.state, parsed);
                console.log('📂 Estado carregado do localStorage');
            }
        } catch (error) {
            console.error('❌ Erro ao carregar estado:', error);
        }
    },

    showAlert(message, type = 'info') {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const icon = icons[type] || 'ℹ️';
        alert(`${icon} ${message}`);

        // Log para debugging
        console.log(`${icon} ${message}`);
    },

    showLoading(message = 'Carregando...') {
        console.log(`⏳ ${message}`);
        // Implementação simples - poderia ser melhorada com spinner visual
        document.body.style.cursor = 'wait';
    },

    hideLoading() {
        console.log('✅ Loading concluído');
        document.body.style.cursor = 'default';
    }
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 EmpresaTec Complete - Inicializando sistema completo...');
    EmpresaTecComplete.init();
});

// Disponibilizar globalmente
window.EmpresaTecComplete = EmpresaTecComplete;
