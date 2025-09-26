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