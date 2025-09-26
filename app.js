// Genesis Empresarial - Complete Business Educational Game
class GenesisEmpresarial {
    constructor() {
        this.firebaseConfig = {
  apiKey: "AIzaSyDUBDKmRSc3BRDtez_g4Cd8VRYOGq6f7JQ",
  authDomain: "simulacao-empresa.firebaseapp.com",
  projectId: "simulacao-empresa",
  storageBucket: "simulacao-empresa.firebasestorage.app",
  messagingSenderId: "454064270255",
  appId: "1:454064270255:web:f3d65cc4fc6018e1715d5a",
  measurementId: "G-029B5VNF4M"
        };

        this.gameState = {
            currentAct: 1,
            currentStep: 1,
            teamName: '',
            teamCode: '',
            teamMembers: [],
            points: 0,
            money: 100000,
            companySegment: '',
            decisions: [],
            events: [],
            metrics: {
                satisfaction: 80,
                productivity: 75,
                marketShare: 5,
                customerSatisfaction: 70
            }
        };

        this.profiles = {
            A: { title: "O Analista", description: "Metódico, organizado e detalhista." },
            I: { title: "O Inovador", description: "Criativo, visionário e inspirador." },
            E: { title: "O Executor", description: "Pragmático, focado e orientado a resultados." },
            C: { title: "O Comunicador", description: "Empático, diplomático e motivador." }
        };

        this.companySegments = {
            saas: { title: "SaaS B2B", description: "Software como Serviço para outras empresas", challengeLevel: 3 },
            fintech: { title: "Fintech", description: "Tecnologia aplicada ao mercado financeiro", challengeLevel: 4 },
            edtech: { title: "EdTech", description: "Tecnologia para educação", challengeLevel: 2 },
            healthtech: { title: "HealthTech", description: "Soluções tecnológicas para saúde", challengeLevel: 5 },
            marketplace: { title: "Marketplace de Nicho", description: "Plataforma conectando compradores e vendedores", challengeLevel: 3 }
        };

        this.events = [
            {
                id: 'crisis_financial',
                type: 'crisis',
                title: 'Crise Financeira no Mercado',
                description: 'Uma crise econômica afeta o mercado. Como sua empresa reagirá?',
                options: [
                    { text: 'Cortar custos drasticamente', points: -10, money: 20000, impact: 'Curto prazo positivo, longo prazo negativo' },
                    { text: 'Investir em inovação', points: 20, money: -30000, impact: 'Preparação para recuperação' },
                    { text: 'Manter operações normais', points: 0, money: -10000, impact: 'Estabilidade com pequenas perdas' }
                ]
            },
            {
                id: 'opportunity_partnership',
                type: 'opportunity',
                title: 'Oportunidade de Parceria',
                description: 'Uma grande empresa oferece parceria estratégica.',
                options: [
                    { text: 'Aceitar imediatamente', points: 15, money: 50000, impact: 'Crescimento rápido com dependência' },
                    { text: 'Negociar termos melhores', points: 25, money: 30000, impact: 'Parceria equilibrada' },
                    { text: 'Recusar e focar internamente', points: 10, money: 0, impact: 'Independência mantida' }
                ]
            }
        ];

        this.selectedSegment = '';
        this.raciStates = [];
        this.brainstormIdeas = [];
        this.selectedIdeas = [];
        this.currentEvent = null;

        this.initializeApp();
    }

    async initializeApp() {
        try {
            firebase.initializeApp(this.firebaseConfig);
            this.db = firebase.firestore();
            this.setupEventListeners();
            this.hideLoadingScreen();
        } catch (error) {
            console.error('Erro ao inicializar Firebase:', error);
            this.hideLoadingScreen();
        }
    }

    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            this.showScreen('login-screen');
        }, 2000);
    }

    setupEventListeners() {
        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Team setup - Fix the event listeners
        const addMemberBtn = document.getElementById('add-member-btn');
        if (addMemberBtn) {
            addMemberBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addTeamMember();
            });
        }

        const startGameBtn = document.getElementById('start-game-btn');
        if (startGameBtn) {
            startGameBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.startGame();
            });
        }

        // Results actions
        const restartBtn = document.getElementById('restart-game-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.restartGame();
            });
        }

        const shareBtn = document.getElementById('share-results-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareResults();
            });
        }

        // Add keyboard support for member name input
        const memberNameInput = document.getElementById('member-name');
        if (memberNameInput) {
            memberNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addTeamMember();
                }
            });
        }
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }

    handleLogin() {
        const teamNameInput = document.getElementById('team-name');
        const teamCodeInput = document.getElementById('team-code');
        
        if (!teamNameInput) return;
        
        const teamName = teamNameInput.value.trim();
        const teamCode = teamCodeInput ? teamCodeInput.value.trim() : '';

        if (!teamName) {
            this.showMessage('Por favor, digite o nome da equipe.', 'error');
            return;
        }

        this.gameState.teamName = teamName;
        this.gameState.teamCode = teamCode;
        this.showScreen('team-setup-screen');
    }

    addTeamMember() {
        const nameInput = document.getElementById('member-name');
        const profileSelect = document.getElementById('member-profile');
        
        if (!nameInput || !profileSelect) {
            this.showMessage('Erro: Elementos não encontrados.', 'error');
            return;
        }

        const name = nameInput.value.trim();
        const profile = profileSelect.value;

        if (!name) {
            this.showMessage('Por favor, digite o nome do membro.', 'error');
            nameInput.focus();
            return;
        }

        if (!profile) {
            this.showMessage('Por favor, selecione o perfil do membro.', 'error');
            profileSelect.focus();
            return;
        }

        if (this.gameState.teamMembers.length >= 6) {
            this.showMessage('Máximo de 6 membros por equipe.', 'error');
            return;
        }

        // Check for duplicate names
        if (this.gameState.teamMembers.some(member => member.name.toLowerCase() === name.toLowerCase())) {
            this.showMessage('Já existe um membro com este nome.', 'error');
            return;
        }

        this.gameState.teamMembers.push({ name, profile });
        this.updateTeamMembersDisplay();
        
        // Clear inputs
        nameInput.value = '';
        profileSelect.value = '';
        nameInput.focus();

        // Enable start button if minimum members reached
        this.updateStartButton();
        
        this.showMessage(`${name} adicionado com sucesso!`, 'success');
    }

    updateTeamMembersDisplay() {
        const container = document.getElementById('team-members');
        
        if (!container) return;
        
        if (this.gameState.teamMembers.length === 0) {
            container.innerHTML = '<p class="text-secondary">Nenhum membro adicionado ainda.</p>';
            return;
        }

        container.innerHTML = this.gameState.teamMembers.map((member, index) => `
            <div class="member-card">
                <div class="member-info">
                    <div class="member-profile ${member.profile}">${member.profile}</div>
                    <div>
                        <div class="member-name">${member.name}</div>
                        <div class="member-role">${this.profiles[member.profile].title}</div>
                    </div>
                </div>
                <button class="btn btn--secondary btn--sm" onclick="game.removeMember(${index})">
                    Remover
                </button>
            </div>
        `).join('');
    }

    removeMember(index) {
        if (index >= 0 && index < this.gameState.teamMembers.length) {
            const removedMember = this.gameState.teamMembers[index];
            this.gameState.teamMembers.splice(index, 1);
            this.updateTeamMembersDisplay();
            this.updateStartButton();
            this.showMessage(`${removedMember.name} removido da equipe.`, 'info');
        }
    }

    updateStartButton() {
        const startBtn = document.getElementById('start-game-btn');
        if (startBtn) {
            const canStart = this.gameState.teamMembers.length >= 2;
            startBtn.disabled = !canStart;
            
            if (canStart) {
                startBtn.textContent = `Iniciar Jogo (${this.gameState.teamMembers.length} membros)`;
            } else {
                startBtn.textContent = 'Adicione pelo menos 2 membros';
            }
        }
    }

    showMessage(message, type = 'info') {
        // Create or update message display
        let messageEl = document.getElementById('game-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'game-message';
            messageEl.style.position = 'fixed';
            messageEl.style.top = '20px';
            messageEl.style.right = '20px';
            messageEl.style.zIndex = '9999';
            messageEl.style.padding = '12px 16px';
            messageEl.style.borderRadius = '8px';
            messageEl.style.fontSize = '14px';
            messageEl.style.fontWeight = '500';
            messageEl.style.maxWidth = '300px';
            document.body.appendChild(messageEl);
        }

        // Set message and styling based on type
        messageEl.textContent = message;
        messageEl.className = `status status--${type}`;
        messageEl.style.display = 'block';

        // Auto-hide after 3 seconds
        setTimeout(() => {
            if (messageEl) {
                messageEl.style.display = 'none';
            }
        }, 3000);
    }

    startGame() {
        if (this.gameState.teamMembers.length < 2) {
            this.showMessage('Adicione pelo menos 2 membros para começar.', 'error');
            return;
        }

        this.showScreen('game-screen');
        this.startAct1();
    }

    startAct1() {
        const content = `
            <div class="act-header">
                <h2 class="act-title">Ato 1: Formação da Empresa</h2>
                <p class="act-description">
                    É hora de definir o DNA da sua empresa! Escolha o segmento de atuação e 
                    monte a estrutura inicial que guiará sua jornada empreendedora.
                </p>
            </div>

            <div class="step-container">
                <div class="step-header">
                    <span class="step-number">1</span>
                    <span class="step-title">Escolha o Segmento da Empresa</span>
                </div>
                
                <div class="step-content">
                    <p class="mb-4">Selecione o segmento de mercado que sua empresa atuará:</p>
                    <div class="company-profiles">
                        ${Object.entries(this.companySegments).map(([key, segment]) => `
                            <div class="company-card" onclick="game.selectCompanySegment('${key}')">
                                <h3 class="company-title">${segment.title}</h3>
                                <p class="company-description">${segment.description}</p>
                                <div class="company-difficulty">
                                    <span>Dificuldade:</span>
                                    <div class="difficulty-stars">
                                        ${Array(5).fill().map((_, i) => 
                                            `<div class="difficulty-star ${i < segment.challengeLevel ? '' : 'empty'}"></div>`
                                        ).join('')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div id="segment-selection" class="mt-8" style="display: none;">
                        <div class="card">
                            <div class="card__body text-center">
                                <h3 id="selected-segment-title" class="text-xl font-semibold mb-4"></h3>
                                <p id="selected-segment-description" class="text-secondary mb-4"></p>
                                <button onclick="game.confirmSegmentSelection()" class="btn btn--primary">
                                    Confirmar Segmento
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('act-content').innerHTML = content;
        this.updateGameHeader();
    }

    selectCompanySegment(segmentKey) {
        document.querySelectorAll('.company-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Find the clicked card and select it
        const clickedCard = Array.from(document.querySelectorAll('.company-card'))
            .find(card => card.onclick.toString().includes(segmentKey));
        
        if (clickedCard) {
            clickedCard.classList.add('selected');
        }
        
        const segment = this.companySegments[segmentKey];
        document.getElementById('selected-segment-title').textContent = segment.title;
        document.getElementById('selected-segment-description').textContent = segment.description;
        document.getElementById('segment-selection').style.display = 'block';
        
        this.selectedSegment = segmentKey;
        this.showMessage(`Segmento ${segment.title} selecionado!`, 'success');
    }

    confirmSegmentSelection() {
        if (!this.selectedSegment) {
            this.showMessage('Por favor, selecione um segmento primeiro.', 'error');
            return;
        }

        this.gameState.companySegment = this.selectedSegment;
        this.addPoints(20);
        this.gameState.currentStep = 2;
        this.continueAct1();
    }

    continueAct1() {
        const content = `
            <div class="act-header">
                <h2 class="act-title">Ato 1: Formação da Empresa</h2>
                <p class="act-description">Estruture sua equipe e defina as primeiras estratégias</p>
            </div>

            <div class="step-container">
                <div class="step-header">
                    <span class="step-number">2</span>
                    <span class="step-title">Definição de Papéis e Responsabilidades</span>
                </div>
                
                <div class="step-content">
                    <p class="mb-4">Com base nos perfis da sua equipe, como vocês irão se organizar?</p>
                    
                    <div class="choice-grid">
                        <div class="choice-card" onclick="game.makeDecision('hierarchy', 15, -5000)">
                            <h4 class="choice-title">Estrutura Hierárquica</h4>
                            <p class="choice-description">
                                Definir claramente CEO, diretores e colaboradores. 
                                Estrutura tradicional com responsabilidades bem definidas.
                            </p>
                            <div class="choice-impact">+15 pontos | -R$ 5,000 (custos de estrutura)</div>
                        </div>
                        
                        <div class="choice-card" onclick="game.makeDecision('horizontal', 25, 0)">
                            <h4 class="choice-title">Estrutura Horizontal</h4>
                            <p class="choice-description">
                                Todos como sócios igualitários, decisões em conjunto. 
                                Mais flexibilidade, mas pode gerar conflitos.
                            </p>
                            <div class="choice-impact">+25 pontos | Sem custos iniciais</div>
                        </div>
                        
                        <div class="choice-card" onclick="game.makeDecision('hybrid', 20, -2000)">
                            <h4 class="choice-title">Estrutura Híbrida</h4>
                            <p class="choice-description">
                                Combinação de hierarquia com autonomia. 
                                Liderança definida, mas com participação de todos.
                            </p>
                            <div class="choice-impact">+20 pontos | -R$ 2,000 (consultoria)</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('act-content').innerHTML = content;
    }

    makeDecision(decision, points, moneyChange) {
        this.addPoints(points);
        this.changeMoney(moneyChange);
        
        this.gameState.decisions.push({
            act: this.gameState.currentAct,
            step: this.gameState.currentStep,
            decision: decision,
            points: points,
            moneyChange: moneyChange
        });

        this.showMessage(`Decisão registrada! ${points > 0 ? '+' : ''}${points} pontos`, 'success');

        if (this.gameState.currentAct === 1 && this.gameState.currentStep === 2) {
            setTimeout(() => this.startAct2(), 1500);
        }
    }

    startAct2() {
        this.gameState.currentAct = 2;
        this.gameState.currentStep = 1;
        
        const content = `
            <div class="act-header">
                <h2 class="act-title">Ato 2: Desenvolvimento do MVP</h2>
                <p class="act-description">
                    Hora de transformar a ideia em realidade! Desenvolva seu Produto Mínimo Viável 
                    e prepare-se para o mercado.
                </p>
            </div>

            <div class="step-container">
                <div class="step-header">
                    <span class="step-number">1</span>
                    <span class="step-title">Definição do MVP</span>
                </div>
                
                <div class="step-content">
                    <p class="mb-4">Qual será a abordagem para desenvolver seu MVP?</p>
                    
                    <div class="choice-grid">
                        <div class="choice-card" onclick="game.developMVP('lean', 30, -20000)">
                            <h4 class="choice-title">Metodologia Lean</h4>
                            <p class="choice-description">
                                Desenvolvimento rápido focado no essencial. 
                                Testes frequentes com usuários reais.
                            </p>
                            <div class="choice-impact">+30 pontos | -R$ 20,000 | Tempo: 2 meses</div>
                        </div>
                        
                        <div class="choice-card" onclick="game.developMVP('complete', 15, -40000)">
                            <h4 class="choice-title">Produto Completo</h4>
                            <p class="choice-description">
                                Desenvolver todas as funcionalidades antes do lançamento. 
                                Maior investimento, menor risco de falhas.
                            </p>
                            <div class="choice-impact">+15 pontos | -R$ 40,000 | Tempo: 6 meses</div>
                        </div>
                        
                        <div class="choice-card" onclick="game.developMVP('prototype', 20, -10000)">
                            <h4 class="choice-title">Protótipo Funcional</h4>
                            <p class="choice-description">
                                Criar um protótipo para validar o conceito. 
                                Investimento menor, feedback rápido.
                            </p>
                            <div class="choice-impact">+20 pontos | -R$ 10,000 | Tempo: 1 mês</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('act-content').innerHTML = content;
        this.updateGameHeader();
    }

    developMVP(approach, points, cost) {
        this.addPoints(points);
        this.changeMoney(cost);
        
        this.gameState.decisions.push({
            act: 2,
            step: 1,
            decision: approach,
            points: points,
            moneyChange: cost
        });

        this.showMessage(`MVP ${approach} selecionado!`, 'success');
        setTimeout(() => this.mvpValidation(), 1500);
    }

    mvpValidation() {
        const content = `
            <div class="step-container">
                <div class="step-header">
                    <span class="step-number">2</span>
                    <span class="step-title">Validação do Mercado</span>
                </div>
                
                <div class="step-content">
                    <p class="mb-4">Como vocês irão validar o produto no mercado?</p>
                    
                    <div class="choice-grid">
                        <div class="choice-card" onclick="game.validateMarket('survey', 15, -3000)">
                            <h4 class="choice-title">Pesquisa de Mercado</h4>
                            <p class="choice-description">
                                Realizar pesquisas com potenciais clientes. 
                                Dados quantitativos confiáveis.
                            </p>
                            <div class="choice-impact">+15 pontos | -R$ 3,000</div>
                        </div>
                        
                        <div class="choice-card" onclick="game.validateMarket('beta', 25, -8000)">
                            <h4 class="choice-title">Programa Beta</h4>
                            <p class="choice-description">
                                Lançar versão beta para grupo seleto. 
                                Feedback real de uso.
                            </p>
                            <div class="choice-impact">+25 pontos | -R$ 8,000</div>
                        </div>
                        
                        <div class="choice-card" onclick="game.validateMarket('interviews', 20, -1000)">
                            <h4 class="choice-title">Entrevistas Qualitativas</h4>
                            <p class="choice-description">
                                Conversas diretas com clientes potenciais. 
                                Insights profundos sobre necessidades.
                            </p>
                            <div class="choice-impact">+20 pontos | -R$ 1,000</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('act-content').innerHTML = content;
    }

    validateMarket(method, points, cost) {
        this.addPoints(points);
        this.changeMoney(cost);
        
        this.showMessage(`Validação ${method} concluída!`, 'success');
        setTimeout(() => this.gameConclusion(), 1500);
    }

    gameConclusion() {
        // Calculate final metrics for demo
        const finalScore = this.calculateFinalScore();
        
        const content = `
            <div class="act-header">
                <h2 class="act-title">Demo Concluída!</h2>
                <p class="act-description">
                    Parabéns! Você completou os primeiros 2 atos do Gênesis Empresarial. 
                    Esta é uma versão demonstrativa do jogo completo.
                </p>
            </div>

            <div class="metrics-grid mb-8">
                <div class="metric-card">
                    <div class="metric-value">${this.gameState.points}</div>
                    <div class="metric-label">Pontos de Decisão</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">R$ ${this.gameState.money.toLocaleString()}</div>
                    <div class="metric-label">Capital Final</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${finalScore}</div>
                    <div class="metric-label">Score Demo</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${this.getPerformanceLevel()}</div>
                    <div class="metric-label">Nível Atual</div>
                </div>
            </div>

            <div class="card">
                <div class="card__body text-center">
                    <h3 class="text-xl font-semibold mb-4">Versão Completa</h3>
                    <p class="text-secondary mb-4">
                        O jogo completo inclui 5 atos com ferramentas como PDCA, Matriz RACI, 
                        Brainstorming, 5W2H, simulações de crise e muito mais!
                    </p>
                    <div class="flex justify-center gap-4">
                        <button onclick="game.showResults()" class="btn btn--primary">
                            Ver Resumo
                        </button>
                        <button onclick="game.restartGame()" class="btn btn--secondary">
                            Jogar Novamente
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('act-content').innerHTML = content;
    }

    calculateFinalScore() {
        const pointsScore = this.gameState.points * 2;
        const moneyScore = Math.max(0, this.gameState.money / 1000);
        const metricsScore = (
            this.gameState.metrics.satisfaction +
            this.gameState.metrics.marketShare * 2 +
            this.gameState.metrics.customerSatisfaction
        ) * 2;
        
        return Math.round(pointsScore + moneyScore + metricsScore);
    }

    getPerformanceLevel() {
        const score = this.calculateFinalScore();
        if (score >= 800) return 'Excelente';
        if (score >= 600) return 'Muito Bom';
        if (score >= 400) return 'Bom';
        if (score >= 200) return 'Regular';
        return 'Iniciante';
    }

    showResults() {
        const finalScore = this.calculateFinalScore();
        
        document.getElementById('final-points').textContent = this.gameState.points;
        document.getElementById('final-money').textContent = `R$ ${this.gameState.money.toLocaleString()}`;
        document.getElementById('team-position').textContent = this.getPerformanceLevel();
        
        // Act analysis
        const actAnalysis = document.getElementById('act-analysis');
        actAnalysis.innerHTML = `
            <div class="flex justify-between items-center p-3 bg-bg-1 rounded">
                <span>Ato 1 - Formação:</span>
                <span class="font-semibold text-success">✓ Concluído</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-bg-2 rounded">
                <span>Ato 2 - MVP:</span>
                <span class="font-semibold text-success">✓ Concluído</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-bg-3 rounded">
                <span>Ato 3 - Crescimento:</span>
                <span class="font-semibold text-secondary">Disponível na versão completa</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-bg-4 rounded">
                <span>Ato 4 - Expansão:</span>
                <span class="font-semibold text-secondary">Disponível na versão completa</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-bg-5 rounded">
                <span>Ato 5 - Maturidade:</span>
                <span class="font-semibold text-secondary">Disponível na versão completa</span>
            </div>
        `;
        
        this.showScreen('results-screen');
    }

    shareResults() {
        const text = `🚀 Testei o Gênesis Empresarial!\n\n` +
                    `🏆 Pontos: ${this.gameState.points}\n` +
                    `💰 Capital Final: R$ ${this.gameState.money.toLocaleString()}\n` +
                    `📊 Nível: ${this.getPerformanceLevel()}\n` +
                    `👥 Equipe: ${this.gameState.teamMembers.map(m => m.name).join(', ')}\n\n` +
                    `#GenesisEmpresarial #Empreendedorismo #Educacao`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Meus Resultados - Gênesis Empresarial',
                text: text,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(text).then(() => {
                this.showMessage('Resultados copiados para a área de transferência!', 'success');
            }).catch(() => {
                // Fallback: show results in alert
                alert(text);
            });
        }
    }

    restartGame() {
        // Reset game state
        this.gameState = {
            currentAct: 1,
            currentStep: 1,
            teamName: '',
            teamCode: '',
            teamMembers: [],
            points: 0,
            money: 100000,
            companySegment: '',
            decisions: [],
            events: [],
            metrics: {
                satisfaction: 80,
                productivity: 75,
                marketShare: 5,
                customerSatisfaction: 70
            }
        };
        
        this.selectedSegment = '';
        this.showScreen('login-screen');
    }

    addPoints(points) {
        this.gameState.points += points;
        this.updateGameHeader();
        this.showPointsAnimation(points);
    }

    changeMoney(amount) {
        this.gameState.money += amount;
        this.updateGameHeader();
        if (amount !== 0) {
            this.showMoneyAnimation(amount);
        }
    }

    updateGameHeader() {
        const actEl = document.getElementById('current-act');
        const pointsEl = document.getElementById('team-points');
        const moneyEl = document.getElementById('team-money');
        
        if (actEl) actEl.textContent = `Ato ${this.gameState.currentAct}`;
        if (pointsEl) pointsEl.textContent = this.gameState.points;
        if (moneyEl) moneyEl.textContent = `R$ ${this.gameState.money.toLocaleString()}`;
    }

    showPointsAnimation(points) {
        const element = document.getElementById('team-points');
        if (element) {
            element.style.color = points > 0 ? 'var(--color-success)' : 'var(--color-error)';
            setTimeout(() => {
                element.style.color = 'var(--color-primary)';
            }, 1000);
        }
    }

    showMoneyAnimation(amount) {
        const element = document.getElementById('team-money');
        if (element) {
            element.style.color = amount > 0 ? 'var(--color-success)' : 'var(--color-error)';
            setTimeout(() => {
                element.style.color = 'var(--color-success)';
            }, 1000);
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }
}

// Global modal close function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Global game instance
let game;

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    game = new GenesisEmpresarial();
});
