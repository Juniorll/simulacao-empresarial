// Global Application State
const AppState = {
    currentUser: null,
    currentTeam: null,
    currentScreen: 'loginScreen',
    gameData: {
        profiles: {
            leader: { name: "Líder Visionário", description: "Focado em estratégia, visão de futuro e direção da empresa. Excelente para CEO e posições de liderança." },
            analyst: { name: "Analista Estratégico", description: "Especialista em dados, planejamento e análise. Ideal para CFO e posições que requerem pensamento analítico." },
            creative: { name: "Criativo Inovador", description: "Foco em design, inovação e soluções criativas. Perfeito para CTO e áreas de desenvolvimento de produtos." },
            executor: { name: "Executor Operacional", description: "Especialista em implementação e operações. Excelente para COO e gestão operacional." },
            communicator: { name: "Comunicador Social", description: "Focado em relacionamentos, vendas e comunicação. Ideal para CMO e áreas comerciais." }
        },
        segments: {
            fintech: { name: "Fintech", description: "Serviços financeiros digitais - pagamentos, empréstimos, investimentos", requirements: "Forte base analítica, segurança, conformidade regulatória", idealProfiles: ["analyst", "leader", "executor"] },
            edtech: { name: "Edtech", description: "Tecnologia educacional - plataformas de ensino, gamificação", requirements: "Criatividade, UX/UI, compreensão pedagógica", idealProfiles: ["creative", "communicator", "leader"] },
            healthtech: { name: "Healthtech", description: "Tecnologia em saúde - diagnósticos, telemedicina, dispositivos médicos", requirements: "Precisão, conformidade, segurança de dados", idealProfiles: ["analyst", "executor", "creative"] },
            foodtech: { name: "Foodtech", description: "Inovação alimentar - delivery, agricultura vertical, alimentos alternativos", requirements: "Logística, sustentabilidade, inovação de produtos", idealProfiles: ["executor", "creative", "communicator"] },
            agtech: { name: "Agtech", description: "Tecnologia agrícola - automação, IoT, sustentabilidade", requirements: "Conhecimento técnico, sustentabilidade, B2B", idealProfiles: ["executor", "analyst", "creative"] }
        },
        questions: [
            { id: 1, question: "Prefiro trabalhar com:", options: ["Estratégia e planejamento", "Dados e análises", "Criação e design", "Implementação e execução", "Pessoas e relacionamentos"], profileWeights: {"leader": 3, "analyst": 2, "creative": 1, "executor": 2, "communicator": 1} },
            { id: 2, question: "Em uma equipe, eu geralmente:", options: ["Lidero e defino direção", "Analiso e avalio opções", "Proponho ideias inovadoras", "Executo e finalizo tarefas", "Facilito comunicação"], profileWeights: {"leader": 3, "analyst": 1, "creative": 2, "executor": 2, "communicator": 3} },
            { id: 3, question: "Minha maior força é:", options: ["Visão estratégica", "Análise crítica", "Criatividade", "Organização", "Comunicação"], profileWeights: {"leader": 3, "analyst": 3, "creative": 3, "executor": 3, "communicator": 3} },
            { id: 4, question: "Prefiro projetos que:", options: ["Definem o futuro da empresa", "Requerem análise profunda", "Permitem inovação", "Têm resultados práticos", "Envolvem trabalho em equipe"], profileWeights: {"leader": 3, "analyst": 2, "creative": 2, "executor": 1, "communicator": 2} },
            { id: 5, question: "Em reuniões, eu:", options: ["Assumo a liderança", "Apresento dados", "Sugiro ideias criativas", "Foco em implementação", "Facilito discussões"], profileWeights: {"leader": 3, "analyst": 2, "creative": 2, "executor": 1, "communicator": 3} },
            { id: 6, question: "Meu estilo de trabalho é:", options: ["Visionário", "Metódico", "Criativo", "Prático", "Colaborativo"], profileWeights: {"leader": 3, "analyst": 3, "creative": 3, "executor": 3, "communicator": 3} },
            { id: 7, question: "Quando há problemas:", options: ["Penso na estratégia geral", "Analiso dados", "Busco soluções inovadoras", "Foco na execução", "Converso com a equipe"], profileWeights: {"leader": 3, "analyst": 2, "creative": 2, "executor": 1, "communicator": 2} },
            { id: 8, question: "Sou motivado por:", options: ["Liderar mudanças", "Resolver puzzles complexos", "Criar algo novo", "Entregar resultados", "Ajudar outros"], profileWeights: {"leader": 3, "analyst": 2, "creative": 2, "executor": 2, "communicator": 3} },
            { id: 9, question: "Minha abordagem é:", options: ["Estratégica", "Analítica", "Criativa", "Sistemática", "Interpessoal"], profileWeights: {"leader": 3, "analyst": 3, "creative": 3, "executor": 3, "communicator": 3} },
            { id: 10, question: "Em decisões importantes:", options: ["Penso no impacto a longo prazo", "Analiso todos os dados", "Considero alternativas criativas", "Foco na viabilidade", "Consulto a equipe"], profileWeights: {"leader": 3, "analyst": 2, "creative": 2, "executor": 1, "communicator": 2} }
        ],
        positions: [
            {code: "CEO", name: "Chief Executive Officer", description: "Responsável pela estratégia geral e liderança da empresa"},
            {code: "CTO", name: "Chief Technology Officer", description: "Responsável pela tecnologia e desenvolvimento de produtos"},
            {code: "CMO", name: "Chief Marketing Officer", description: "Responsável por marketing, vendas e relacionamento com clientes"},
            {code: "CFO", name: "Chief Financial Officer", description: "Responsável pelas finanças, orçamento e análises financeiras"},
            {code: "COO", name: "Chief Operating Officer", description: "Responsável pelas operações diárias e eficiência organizacional"}
        ],
        hiringOptions: [
            {area: "Desenvolvimento", positions: ["Desenvolvedor Frontend", "Desenvolvedor Backend", "Designer UX/UI", "DevOps"], cost: 15000},
            {area: "Marketing", positions: ["Social Media", "Content Manager", "Growth Hacker", "SEO Specialist"], cost: 12000},
            {area: "Vendas", positions: ["Account Executive", "SDR", "Customer Success", "Inside Sales"], cost: 10000},
            {area: "Operações", positions: ["Analista Financeiro", "RH", "Administrativo", "Jurídico"], cost: 8000}
        ]
    },
    quiz: {
        currentQuestion: 0,
        answers: [],
        userProfile: null
    },
    scoring: {
        segmentChoice: 0,
        ceoElection: 0,
        ceoAdequacy: 0,
        satisfactionScores: [],
        positionChoices: 0,
        hiringDecisions: 0,
        totalScore: 0
    }
};

// Data Storage (simulating Firebase with localStorage)
const DataStore = {
    saveUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },
    
    getUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },
    
    saveTeam(team) {
        let teams = this.getTeams();
        const index = teams.findIndex(t => t.code === team.code);
        if (index >= 0) {
            teams[index] = team;
        } else {
            teams.push(team);
        }
        localStorage.setItem('teams', JSON.stringify(teams));
    },
    
    getTeams() {
        const teams = localStorage.getItem('teams');
        return teams ? JSON.parse(teams) : [];
    },
    
    getTeam(code) {
        const teams = this.getTeams();
        return teams.find(t => t.code === code);
    },
    
    clearAllData() {
        localStorage.clear();
    }
};

// Utility Functions
function generateTeamCode() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    AppState.currentScreen = screenId;
    
    // Update progress bar
    updateProgressBar();
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const content = document.getElementById('notificationContent');
    
    content.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.add('hidden');
        notification.classList.remove('show');
    }, 3000);
}

function updateProgressBar() {
    const progressContainer = document.getElementById('progressContainer');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const steps = {
        'teamScreen': { step: 1, total: 8, label: 'Escolha da Equipe' },
        'quizScreen': { step: 2, total: 8, label: 'Questionário de Perfil' },
        'profileScreen': { step: 3, total: 8, label: 'Resultados do Perfil' },
        'segmentScreen': { step: 4, total: 8, label: 'Escolha do Segmento' },
        'ceoScreen': { step: 5, total: 8, label: 'Eleição do CEO' },
        'positionScreen': { step: 6, total: 8, label: 'Definição de Cargos' },
        'hiringScreen': { step: 7, total: 8, label: 'Processo de Contratação' },
        'reportScreen': { step: 8, total: 8, label: 'Relatório Final' }
    };
    
    if (AppState.currentScreen === 'loginScreen' || AppState.currentScreen === 'teacherScreen') {
        progressContainer.classList.add('hidden');
        return;
    }
    
    progressContainer.classList.remove('hidden');
    const current = steps[AppState.currentScreen];
    if (current) {
        const percentage = (current.step / current.total) * 100;
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `Etapa ${current.step} de ${current.total}: ${current.label}`;
    }
}

// Profile Calculation
function calculateProfile(answers) {
    const scores = { leader: 0, analyst: 0, creative: 0, executor: 0, communicator: 0 };
    
    answers.forEach((answerIndex, questionIndex) => {
        const question = AppState.gameData.questions[questionIndex];
        Object.keys(question.profileWeights).forEach(profile => {
            if (answerIndex === 0) scores[profile] += question.profileWeights[profile] * 3;
            else if (answerIndex === 1) scores[profile] += question.profileWeights[profile] * 2;
            else if (answerIndex === 2) scores[profile] += question.profileWeights[profile] * 1;
            else if (answerIndex === 3) scores[profile] += question.profileWeights[profile] * 2;
            else if (answerIndex === 4) scores[profile] += question.profileWeights[profile] * 1;
        });
    });
    
    let maxScore = 0;
    let topProfile = 'leader';
    
    Object.keys(scores).forEach(profile => {
        if (scores[profile] > maxScore) {
            maxScore = scores[profile];
            topProfile = profile;
        }
    });
    
    return topProfile;
}

// Scoring System
function calculateSegmentScore(teamProfiles, selectedSegment) {
    const segment = AppState.gameData.segments[selectedSegment];
    const idealProfiles = segment.idealProfiles;
    let matchScore = 0;
    
    teamProfiles.forEach(profile => {
        if (idealProfiles.includes(profile)) {
            matchScore += 20;
        }
    });
    
    return Math.min(matchScore, 100);
}

function calculateCeoScore(votes, totalMembers) {
    const maxVotes = Math.max(...Object.values(votes));
    const winner = Object.keys(votes).find(key => votes[key] === maxVotes);
    
    // Unanimity bonus
    if (maxVotes === totalMembers) {
        return 100;
    }
    
    // Partial agreement
    return Math.floor((maxVotes / totalMembers) * 100);
}

// Event Handlers
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is already logged in
    const savedUser = DataStore.getUser();
    if (savedUser) {
        AppState.currentUser = savedUser;
        const team = DataStore.getTeam(savedUser.teamCode);
        if (team) {
            AppState.currentTeam = team;
            showScreen('waitingScreen');
            updateTeamDisplay();
        } else {
            showScreen('teamScreen');
        }
    } else {
        showScreen('loginScreen');
    }
    
    setupEventListeners();
}

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('teacherBtn').addEventListener('click', showTeacherModal);
    
    // Teacher modal
    document.getElementById('cancelTeacherBtn').addEventListener('click', hideTeacherModal);
    document.getElementById('confirmTeacherBtn').addEventListener('click', handleTeacherLogin);
    
    // Team creation/joining
    document.getElementById('createTeamBtn').addEventListener('click', handleCreateTeam);
    document.getElementById('joinTeamBtn').addEventListener('click', handleJoinTeam);
    document.getElementById('startGameBtn').addEventListener('click', startQuiz);
    
    // Quiz navigation
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('prevBtn').addEventListener('click', prevQuestion);
    
    // Continue buttons
    document.getElementById('continueToSegmentBtn').addEventListener('click', () => showScreen('segmentScreen'));
    document.getElementById('continueToCeoBtn').addEventListener('click', () => showScreen('ceoScreen'));
    document.getElementById('continueToPositionsBtn').addEventListener('click', () => showScreen('positionScreen'));
    document.getElementById('continueToHiringBtn').addEventListener('click', () => showScreen('hiringScreen'));
    document.getElementById('continueToReportBtn').addEventListener('click', () => showScreen('reportScreen'));
    
    // Voting buttons
    document.getElementById('voteSegmentBtn').addEventListener('click', submitSegmentVote);
    document.getElementById('voteCeoBtn').addEventListener('click', submitCeoVote);
    
    // Satisfaction buttons
    document.getElementById('submitSatisfactionBtn').addEventListener('click', submitSatisfaction);
    document.getElementById('submitPositionsSatisfactionBtn').addEventListener('click', submitPositionsSatisfaction);
    document.getElementById('submitHiringSatisfactionBtn').addEventListener('click', submitHiringSatisfaction);
    
    // Position and hiring
    document.getElementById('confirmPositionsBtn').addEventListener('click', confirmPositions);
    document.getElementById('submitHiringNeedsBtn').addEventListener('click', submitHiringNeeds);
    document.getElementById('confirmHiringBtn').addEventListener('click', confirmHiring);
    
    // Teacher panel
    document.getElementById('toggleScoresBtn').addEventListener('click', toggleScores);
    document.getElementById('resetGameBtn').addEventListener('click', resetGame);
    document.getElementById('backToLoginBtn').addEventListener('click', () => showScreen('loginScreen'));
    
    // Restart
    document.getElementById('restartBtn').addEventListener('click', restartGame);
    
    // Initialize segments and setup quiz
    setupSegments();
    setupQuiz();
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        const user = {
            id: Date.now(),
            email: email,
            name: email.split('@')[0],
            teamCode: null
        };
        
        AppState.currentUser = user;
        DataStore.saveUser(user);
        showScreen('teamScreen');
        showNotification('Login realizado com sucesso!', 'success');
    } else {
        showNotification('Por favor, preencha todos os campos', 'error');
    }
}

function showTeacherModal() {
    document.getElementById('teacherModal').classList.remove('hidden');
}

function hideTeacherModal() {
    document.getElementById('teacherModal').classList.add('hidden');
}

function handleTeacherLogin() {
    const password = document.getElementById('teacherPassword').value;
    if (password === 'professor123') {
        hideTeacherModal();
        showScreen('teacherScreen');
        updateTeacherPanel();
        showNotification('Acesso do professor autorizado', 'success');
    } else {
        showNotification('Senha incorreta', 'error');
    }
}

function handleCreateTeam() {
    const teamName = document.getElementById('teamName').value.trim();
    if (!teamName) {
        showNotification('Digite um nome para a equipe', 'error');
        return;
    }
    
    const teamCode = generateTeamCode();
    const team = {
        code: teamCode,
        name: teamName,
        leader: AppState.currentUser.id,
        members: [AppState.currentUser],
        phase: 'waiting',
        votes: {},
        scores: {},
        createdAt: Date.now()
    };
    
    AppState.currentTeam = team;
    AppState.currentUser.teamCode = teamCode;
    AppState.currentUser.isLeader = true;
    
    DataStore.saveTeam(team);
    DataStore.saveUser(AppState.currentUser);
    
    showScreen('waitingScreen');
    updateTeamDisplay();
    showNotification('Equipe criada com sucesso!', 'success');
}

function handleJoinTeam() {
    const teamCode = document.getElementById('teamCode').value.trim().toUpperCase();
    if (!teamCode) {
        showNotification('Digite o código da equipe', 'error');
        return;
    }
    
    const team = DataStore.getTeam(teamCode);
    if (!team) {
        showNotification('Equipe não encontrada', 'error');
        return;
    }
    
    // Check if user is already in team
    const existingMember = team.members.find(m => m.id === AppState.currentUser.id);
    if (existingMember) {
        showNotification('Você já está nesta equipe', 'warning');
        AppState.currentTeam = team;
        AppState.currentUser.teamCode = teamCode;
        DataStore.saveUser(AppState.currentUser);
        showScreen('waitingScreen');
        updateTeamDisplay();
        return;
    }
    
    team.members.push(AppState.currentUser);
    AppState.currentTeam = team;
    AppState.currentUser.teamCode = teamCode;
    AppState.currentUser.isLeader = false;
    
    DataStore.saveTeam(team);
    DataStore.saveUser(AppState.currentUser);
    
    showScreen('waitingScreen');
    updateTeamDisplay();
    showNotification('Você entrou na equipe!', 'success');
}

function updateTeamDisplay() {
    document.getElementById('currentTeamName').textContent = 'Equipe: ' + AppState.currentTeam.name;
    document.getElementById('currentTeamCode').textContent = AppState.currentTeam.code;
    
    const membersList = document.getElementById('membersList');
    membersList.innerHTML = '';
    
    AppState.currentTeam.members.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'member-item';
        memberDiv.innerHTML = `
            <div>
                <div class="member-name">${member.name}</div>
                <div class="member-role">${member.id === AppState.currentTeam.leader ? 'Líder' : 'Membro'}</div>
            </div>
            <div class="status ${member.id === AppState.currentTeam.leader ? 'status--leader' : 'status--info'}">
                ${member.id === AppState.currentTeam.leader ? 'Líder' : 'Membro'}
            </div>
        `;
        membersList.appendChild(memberDiv);
    });
    
    // Show leader actions
    if (AppState.currentUser.isLeader) {
        document.getElementById('leaderActions').classList.remove('hidden');
    }
}

function setupQuiz() {
    displayQuestion(0);
}

function displayQuestion(index) {
    const question = AppState.gameData.questions[index];
    document.getElementById('questionNumber').textContent = `Pergunta ${index + 1} de ${AppState.gameData.questions.length}`;
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-btn';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectOption(i));
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = true;
    
    // Select previous answer if exists
    if (AppState.quiz.answers[index] !== undefined) {
        selectOption(AppState.quiz.answers[index]);
    }
}

function selectOption(index) {
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });
    
    AppState.quiz.answers[AppState.quiz.currentQuestion] = index;
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (AppState.quiz.currentQuestion < AppState.gameData.questions.length - 1) {
        AppState.quiz.currentQuestion++;
        displayQuestion(AppState.quiz.currentQuestion);
    } else {
        finishQuiz();
    }
}

function prevQuestion() {
    if (AppState.quiz.currentQuestion > 0) {
        AppState.quiz.currentQuestion--;
        displayQuestion(AppState.quiz.currentQuestion);
    }
}

function finishQuiz() {
    const profile = calculateProfile(AppState.quiz.answers);
    AppState.quiz.userProfile = profile;
    
    // Save user profile to team
    const userInTeam = AppState.currentTeam.members.find(m => m.id === AppState.currentUser.id);
    if (userInTeam) {
        userInTeam.profile = profile;
        DataStore.saveTeam(AppState.currentTeam);
    }
    
    showScreen('profileScreen');
    displayProfileResults();
}

function displayProfileResults() {
    const myProfile = AppState.gameData.profiles[AppState.quiz.userProfile];
    const myProfileCard = document.getElementById('myProfileCard');
    myProfileCard.innerHTML = `
        <div class="profile-name">${myProfile.name}</div>
        <div class="profile-description">${myProfile.description}</div>
    `;
    
    const teamProfilesList = document.getElementById('teamProfilesList');
    teamProfilesList.innerHTML = '';
    
    AppState.currentTeam.members.forEach(member => {
        if (member.profile && member.id !== AppState.currentUser.id) {
            const profileData = AppState.gameData.profiles[member.profile];
            const profileCard = document.createElement('div');
            profileCard.className = 'team-profile-card';
            profileCard.innerHTML = `
                <div class="team-profile-member">${member.name}</div>
                <div class="team-profile-name">${profileData.name}</div>
                <div class="team-profile-description">${profileData.description}</div>
            `;
            teamProfilesList.appendChild(profileCard);
        }
    });
    
    if (AppState.currentUser.isLeader) {
        document.getElementById('profileLeaderActions').classList.remove('hidden');
    }
}

function startQuiz() {
    AppState.quiz = { currentQuestion: 0, answers: [], userProfile: null };
    showScreen('quizScreen');
    setupQuiz();
}

function setupSegments() {
    const segmentsGrid = document.getElementById('segmentsGrid');
    segmentsGrid.innerHTML = '';
    
    Object.keys(AppState.gameData.segments).forEach(key => {
        const segment = AppState.gameData.segments[key];
        const segmentCard = document.createElement('div');
        segmentCard.className = 'segment-card';
        segmentCard.dataset.segment = key;
        segmentCard.innerHTML = `
            <div class="segment-name">${segment.name}</div>
            <div class="segment-description">${segment.description}</div>
            <div class="segment-requirements">
                <div class="requirements-label">Principais necessidades:</div>
                <div>${segment.requirements}</div>
            </div>
        `;
        segmentCard.addEventListener('click', () => selectSegment(key));
        segmentsGrid.appendChild(segmentCard);
    });
}

let selectedSegment = null;

function selectSegment(segmentKey) {
    document.querySelectorAll('.segment-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    document.querySelector(`[data-segment="${segmentKey}"]`).classList.add('selected');
    selectedSegment = segmentKey;
    document.getElementById('voteSegmentBtn').disabled = false;
}

function submitSegmentVote() {
    if (!selectedSegment) return;
    
    // Initialize votes if not exists
    if (!AppState.currentTeam.votes.segment) {
        AppState.currentTeam.votes.segment = {};
    }
    
    AppState.currentTeam.votes.segment[AppState.currentUser.id] = selectedSegment;
    DataStore.saveTeam(AppState.currentTeam);
    
    showNotification('Voto registrado!', 'success');
    
    // Check if all members voted
    const totalMembers = AppState.currentTeam.members.filter(m => m.profile).length;
    const totalVotes = Object.keys(AppState.currentTeam.votes.segment).length;
    
    if (totalVotes === totalMembers) {
        processSegmentResults();
    }
}

function processSegmentResults() {
    const votes = AppState.currentTeam.votes.segment;
    const results = {};
    
    Object.values(votes).forEach(vote => {
        results[vote] = (results[vote] || 0) + 1;
    });
    
    const maxVotes = Math.max(...Object.values(results));
    const winners = Object.keys(results).filter(key => results[key] === maxVotes);
    
    let winner;
    if (winners.length === 1) {
        winner = winners[0];
    } else {
        // In case of tie, randomly select
        winner = winners[Math.floor(Math.random() * winners.length)];
    }
    
    AppState.currentTeam.selectedSegment = winner;
    
    // Calculate score
    const teamProfiles = AppState.currentTeam.members.filter(m => m.profile).map(m => m.profile);
    const segmentScore = calculateSegmentScore(teamProfiles, winner);
    AppState.scoring.segmentChoice = segmentScore;
    
    DataStore.saveTeam(AppState.currentTeam);
    
    displaySegmentResults(results, winner);
}

function displaySegmentResults(results, winner) {
    const resultsContainer = document.getElementById('segmentResultsContent');
    resultsContainer.innerHTML = '';
    
    Object.keys(results).forEach(segmentKey => {
        const segment = AppState.gameData.segments[segmentKey];
        const resultDiv = document.createElement('div');
        resultDiv.className = `result-item ${segmentKey === winner ? 'result-winner' : ''}`;
        resultDiv.innerHTML = `
            <div>
                <strong>${segment.name}</strong>
                <div>${segmentKey === winner ? '🏆 Escolhido!' : ''}</div>
            </div>
            <div>${results[segmentKey]} voto${results[segmentKey] > 1 ? 's' : ''}</div>
        `;
        resultsContainer.appendChild(resultDiv);
    });
    
    document.getElementById('segmentResults').classList.remove('hidden');
    
    if (AppState.currentUser.isLeader) {
        document.getElementById('segmentLeaderActions').classList.remove('hidden');
    }
}

// CEO Election Functions
function setupCeoElection() {
    const candidatesList = document.getElementById('candidatesList');
    candidatesList.innerHTML = '';
    
    AppState.currentTeam.members.filter(m => m.profile).forEach(member => {
        const candidateDiv = document.createElement('div');
        candidateDiv.className = 'candidate-btn';
        candidateDiv.dataset.candidate = member.id;
        candidateDiv.innerHTML = `
            <div class="candidate-info">
                <div class="candidate-name">${member.name}</div>
                <div class="candidate-profile">${AppState.gameData.profiles[member.profile].name}</div>
            </div>
        `;
        candidateDiv.addEventListener('click', () => selectCandidate(member.id));
        candidatesList.appendChild(candidateDiv);
    });
}

let selectedCandidate = null;

function selectCandidate(candidateId) {
    document.querySelectorAll('.candidate-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    document.querySelector(`[data-candidate="${candidateId}"]`).classList.add('selected');
    selectedCandidate = candidateId;
    document.getElementById('voteCeoBtn').disabled = false;
}

function submitCeoVote() {
    if (!selectedCandidate) return;
    
    if (!AppState.currentTeam.votes.ceo) {
        AppState.currentTeam.votes.ceo = {};
    }
    
    AppState.currentTeam.votes.ceo[AppState.currentUser.id] = selectedCandidate;
    DataStore.saveTeam(AppState.currentTeam);
    
    showNotification('Voto para CEO registrado!', 'success');
    
    // Check if all members voted
    const totalMembers = AppState.currentTeam.members.filter(m => m.profile).length;
    const totalVotes = Object.keys(AppState.currentTeam.votes.ceo).length;
    
    if (totalVotes === totalMembers) {
        processCeoResults();
    }
}

function processCeoResults() {
    const votes = AppState.currentTeam.votes.ceo;
    const results = {};
    
    Object.values(votes).forEach(vote => {
        results[vote] = (results[vote] || 0) + 1;
    });
    
    const maxVotes = Math.max(...Object.values(results));
    const winners = Object.keys(results).filter(key => results[key] === maxVotes);
    
    if (winners.length === 1) {
        AppState.currentTeam.ceo = winners[0];
        const ceoScore = calculateCeoScore(results, AppState.currentTeam.members.filter(m => m.profile).length);
        AppState.scoring.ceoElection = ceoScore;
        
        DataStore.saveTeam(AppState.currentTeam);
        displayCeoResults(results, AppState.currentTeam.ceo);
    } else {
        // Tie - restart election
        showNotification('Empate na eleição! Votação será repetida.', 'warning');
        AppState.currentTeam.votes.ceo = {};
        DataStore.saveTeam(AppState.currentTeam);
        setupCeoElection();
    }
}

function displayCeoResults(results, ceoId) {
    const ceo = AppState.currentTeam.members.find(m => m.id === parseInt(ceoId));
    const resultsContainer = document.getElementById('ceoResultsContent');
    
    resultsContainer.innerHTML = `
        <div class="ceo-elected">
            <h4>🏆 CEO Eleito: ${ceo.name}</h4>
            <p>Perfil: ${AppState.gameData.profiles[ceo.profile].name}</p>
        </div>
    `;
    
    document.getElementById('ceoResults').classList.remove('hidden');
    
    // Show satisfaction section for non-CEO members
    if (AppState.currentUser.id !== parseInt(ceoId)) {
        document.getElementById('satisfactionSection').classList.remove('hidden');
    } else {
        document.getElementById('ceoActions').classList.remove('hidden');
    }
}

function submitSatisfaction() {
    const satisfaction = document.getElementById('satisfactionSlider').value;
    
    if (!AppState.currentTeam.satisfaction) {
        AppState.currentTeam.satisfaction = {};
    }
    if (!AppState.currentTeam.satisfaction.ceo) {
        AppState.currentTeam.satisfaction.ceo = {};
    }
    
    AppState.currentTeam.satisfaction.ceo[AppState.currentUser.id] = parseInt(satisfaction);
    DataStore.saveTeam(AppState.currentTeam);
    
    showNotification('Avaliação registrada!', 'success');
    document.getElementById('satisfactionSection').style.display = 'none';
    
    // Check if CEO should see results
    if (AppState.currentUser.id === parseInt(AppState.currentTeam.ceo)) {
        checkSatisfactionComplete();
    }
}

function checkSatisfactionComplete() {
    const nonCeoMembers = AppState.currentTeam.members.filter(m => m.profile && m.id !== parseInt(AppState.currentTeam.ceo));
    const satisfactionVotes = Object.keys(AppState.currentTeam.satisfaction?.ceo || {}).length;
    
    if (satisfactionVotes === nonCeoMembers.length) {
        document.getElementById('ceoActions').classList.remove('hidden');
    }
}

// Initialize screens when they become active
document.addEventListener('DOMContentLoaded', function() {
    // Set up CEO election when screen becomes active
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (document.getElementById('ceoScreen').classList.contains('active')) {
                    setupCeoElection();
                }
                if (document.getElementById('positionScreen').classList.contains('active')) {
                    setupPositionAssignment();
                }
                if (document.getElementById('hiringScreen').classList.contains('active')) {
                    setupHiringScreen();
                }
                if (document.getElementById('reportScreen').classList.contains('active')) {
                    generateFinalReport();
                }
            }
        });
    });
    
    observer.observe(document.getElementById('ceoScreen'), { attributes: true });
    observer.observe(document.getElementById('positionScreen'), { attributes: true });
    observer.observe(document.getElementById('hiringScreen'), { attributes: true });
    observer.observe(document.getElementById('reportScreen'), { attributes: true });
});

// Position Assignment Functions
function setupPositionAssignment() {
    // Only CEO can assign positions
    if (AppState.currentUser.id !== parseInt(AppState.currentTeam.ceo)) {
        document.getElementById('positionsAssignment').style.display = 'none';
        // Show waiting message for non-CEO members
        return;
    }
    
    const teamMembersContainer = document.getElementById('teamMembersForPositions');
    const availablePositionsContainer = document.getElementById('availablePositions');
    
    teamMembersContainer.innerHTML = '<h4>Membros da Equipe</h4>';
    availablePositionsContainer.innerHTML = '<h4>Cargos Disponíveis</h4>';
    
    // Get non-CEO members
    const nonCeoMembers = AppState.currentTeam.members.filter(m => m.profile && m.id !== parseInt(AppState.currentTeam.ceo));
    const availablePositions = AppState.gameData.positions.filter(p => p.code !== 'CEO');
    
    nonCeoMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'member-for-position';
        memberDiv.innerHTML = `
            <div>
                <div class="member-name">${member.name}</div>
                <div class="member-profile">${AppState.gameData.profiles[member.profile].name}</div>
            </div>
            <select class="form-control position-select" data-member="${member.id}">
                <option value="">Selecionar cargo...</option>
                ${availablePositions.map(pos => `<option value="${pos.code}">${pos.code} - ${pos.name}</option>`).join('')}
            </select>
        `;
        teamMembersContainer.appendChild(memberDiv);
    });
}

function confirmPositions() {
    const positionSelects = document.querySelectorAll('.position-select');
    const assignments = {};
    const usedPositions = new Set();
    
    let allAssigned = true;
    positionSelects.forEach(select => {
        const memberId = select.dataset.member;
        const position = select.value;
        
        if (!position) {
            allAssigned = false;
            return;
        }
        
        if (usedPositions.has(position)) {
            showNotification('Cada cargo pode ser atribuído apenas uma vez', 'error');
            return;
        }
        
        assignments[memberId] = position;
        usedPositions.add(position);
    });
    
    if (!allAssigned) {
        showNotification('Por favor, atribua cargos para todos os membros', 'error');
        return;
    }
    
    // Save position assignments
    AppState.currentTeam.positions = assignments;
    AppState.currentTeam.positions[AppState.currentTeam.ceo] = 'CEO';
    
    // Calculate position score
    let positionScore = 0;
    Object.keys(assignments).forEach(memberId => {
        const member = AppState.currentTeam.members.find(m => m.id === parseInt(memberId));
        const position = assignments[memberId];
        
        // Simple scoring - some profiles are better for certain positions
        const profilePositionFit = {
            'leader': { 'CEO': 20, 'COO': 15, 'CMO': 10, 'CTO': 5, 'CFO': 8 },
            'analyst': { 'CFO': 20, 'CEO': 10, 'COO': 15, 'CTO': 8, 'CMO': 5 },
            'creative': { 'CTO': 20, 'CMO': 15, 'CEO': 8, 'COO': 5, 'CFO': 3 },
            'executor': { 'COO': 20, 'CTO': 15, 'CEO': 10, 'CFO': 12, 'CMO': 8 },
            'communicator': { 'CMO': 20, 'CEO': 15, 'COO': 10, 'CTO': 5, 'CFO': 5 }
        };
        
        if (profilePositionFit[member.profile] && profilePositionFit[member.profile][position]) {
            positionScore += profilePositionFit[member.profile][position];
        }
    });
    
    AppState.scoring.positionChoices = positionScore;
    DataStore.saveTeam(AppState.currentTeam);
    
    displayPositionsResults();
}

function displayPositionsResults() {
    const resultsContainer = document.getElementById('positionsResultsContent');
    resultsContainer.innerHTML = '';
    
    Object.keys(AppState.currentTeam.positions).forEach(memberId => {
        const member = AppState.currentTeam.members.find(m => m.id === parseInt(memberId));
        const positionCode = AppState.currentTeam.positions[memberId];
        const position = AppState.gameData.positions.find(p => p.code === positionCode);
        
        const resultDiv = document.createElement('div');
        resultDiv.className = 'position-result-item';
        resultDiv.innerHTML = `
            <div>
                <div><strong>${member.name}</strong></div>
                <div>${position.name}</div>
            </div>
            <div>${position.code}</div>
        `;
        resultsContainer.appendChild(resultDiv);
    });
    
    document.getElementById('positionsResults').classList.remove('hidden');
    document.getElementById('positionsAssignment').style.display = 'none';
    
    // Show satisfaction section for non-CEO members
    if (AppState.currentUser.id !== parseInt(AppState.currentTeam.ceo)) {
        document.getElementById('positionsSatisfactionSection').classList.remove('hidden');
    } else {
        document.getElementById('continueToHiringActions').classList.remove('hidden');
    }
}

function submitPositionsSatisfaction() {
    const satisfaction = document.getElementById('positionsSatisfactionSlider').value;
    
    if (!AppState.currentTeam.satisfaction.positions) {
        AppState.currentTeam.satisfaction.positions = {};
    }
    
    AppState.currentTeam.satisfaction.positions[AppState.currentUser.id] = parseInt(satisfaction);
    DataStore.saveTeam(AppState.currentTeam);
    
    showNotification('Avaliação registrada!', 'success');
    document.getElementById('positionsSatisfactionSection').style.display = 'none';
}

// Hiring Process Functions
function setupHiringScreen() {
    const userPosition = AppState.currentTeam.positions[AppState.currentUser.id];
    const positionData = AppState.gameData.positions.find(p => p.code === userPosition);
    
    if (AppState.currentUser.id === parseInt(AppState.currentTeam.ceo)) {
        // CEO sees phase 2 if all members submitted
        if (AppState.currentTeam.hiringNeeds && Object.keys(AppState.currentTeam.hiringNeeds).length === AppState.currentTeam.members.filter(m => m.profile).length - 1) {
            showCeoHiringPhase();
        } else {
            document.getElementById('hiringPhase1').style.display = 'none';
            document.getElementById('hiringPhase2').innerHTML = '<h3>Aguardando necessidades dos membros da equipe...</h3>';
        }
        return;
    }
    
    // Regular member hiring needs
    document.getElementById('memberPosition').textContent = positionData.name;
    document.getElementById('positionDescription').textContent = positionData.description;
    
    setupHiringOptions();
}

function setupHiringOptions() {
    const hiringOptions = document.getElementById('hiringOptions');
    hiringOptions.innerHTML = '';
    
    AppState.gameData.hiringOptions.forEach(area => {
        const areaDiv = document.createElement('div');
        areaDiv.className = 'hiring-area';
        areaDiv.innerHTML = `
            <div class="area-name">${area.area}</div>
            <div class="area-positions">
                ${area.positions.map(position => `
                    <div class="position-option">
                        <input type="checkbox" id="${position}" name="${area.area}" value="${position}">
                        <label for="${position}">${position}</label>
                    </div>
                `).join('')}
            </div>
            <div class="area-cost">Custo: R$ ${area.cost.toLocaleString('pt-BR')}</div>
        `;
        hiringOptions.appendChild(areaDiv);
    });
}

function submitHiringNeeds() {
    const selectedNeeds = [];
    const checkboxes = document.querySelectorAll('#hiringOptions input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        const area = checkbox.name;
        const position = checkbox.value;
        const areaData = AppState.gameData.hiringOptions.find(a => a.area === area);
        selectedNeeds.push({
            area: area,
            position: position,
            cost: areaData.cost
        });
    });
    
    if (selectedNeeds.length === 0) {
        showNotification('Selecione pelo menos uma contratação', 'error');
        return;
    }
    
    // Save hiring needs
    if (!AppState.currentTeam.hiringNeeds) {
        AppState.currentTeam.hiringNeeds = {};
    }
    
    AppState.currentTeam.hiringNeeds[AppState.currentUser.id] = selectedNeeds;
    DataStore.saveTeam(AppState.currentTeam);
    
    showNotification('Necessidades enviadas para o CEO!', 'success');
    document.getElementById('hiringPhase1').style.display = 'none';
    
    // Check if all members submitted
    const totalNonCeoMembers = AppState.currentTeam.members.filter(m => m.profile && m.id !== parseInt(AppState.currentTeam.ceo)).length;
    if (Object.keys(AppState.currentTeam.hiringNeeds).length === totalNonCeoMembers) {
        // Notify CEO
        showNotification('Todos os membros enviaram suas necessidades!', 'info');
    }
}

function showCeoHiringPhase() {
    document.getElementById('hiringPhase1').style.display = 'none';
    document.getElementById('hiringPhase2').classList.remove('hidden');
    
    const availableBudget = 50000;
    document.getElementById('availableBudget').textContent = availableBudget.toLocaleString('pt-BR');
    
    // Show team requests
    const teamRequestsContainer = document.getElementById('teamRequests');
    teamRequestsContainer.innerHTML = '<h4>Solicitações da Equipe</h4>';
    
    Object.keys(AppState.currentTeam.hiringNeeds).forEach(memberId => {
        const member = AppState.currentTeam.members.find(m => m.id === parseInt(memberId));
        const needs = AppState.currentTeam.hiringNeeds[memberId];
        const totalCost = needs.reduce((sum, need) => sum + need.cost, 0);
        
        const requestDiv = document.createElement('div');
        requestDiv.className = 'request-item';
        requestDiv.innerHTML = `
            <div class="request-member">${member.name} (${AppState.gameData.positions.find(p => p.code === AppState.currentTeam.positions[memberId]).name})</div>
            <div>Solicitações: ${needs.length} | Custo total: R$ ${totalCost.toLocaleString('pt-BR')}</div>
            <div>${needs.map(need => `${need.position} (${need.area})`).join(', ')}</div>
        `;
        teamRequestsContainer.appendChild(requestDiv);
    });
    
    // Show final decisions interface
    setupFinalDecisions();
}

function setupFinalDecisions() {
    const finalDecisionsContainer = document.getElementById('finalDecisions');
    finalDecisionsContainer.innerHTML = '<h4>Decisões Finais</h4>';
    
    AppState.gameData.hiringOptions.forEach(area => {
        const areaDiv = document.createElement('div');
        areaDiv.className = 'decision-area';
        areaDiv.innerHTML = `
            <h5>${area.area} - R$ ${area.cost.toLocaleString('pt-BR')}</h5>
            <div class="decision-checkboxes">
                ${area.positions.map(position => `
                    <div class="position-option">
                        <input type="checkbox" id="final_${position}" value="${position}" data-area="${area.area}" data-cost="${area.cost}">
                        <label for="final_${position}">${position}</label>
                    </div>
                `).join('')}
            </div>
        `;
        finalDecisionsContainer.appendChild(areaDiv);
    });
    
    // Add budget tracking
    const checkboxes = document.querySelectorAll('#finalDecisions input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBudgetDisplay);
    });
}

function updateBudgetDisplay() {
    let totalCost = 0;
    const checkedBoxes = document.querySelectorAll('#finalDecisions input[type="checkbox"]:checked');
    
    checkedBoxes.forEach(checkbox => {
        totalCost += parseInt(checkbox.dataset.cost);
    });
    
    const availableBudget = 50000;
    const remaining = availableBudget - totalCost;
    
    let budgetDisplay = document.getElementById('currentBudgetDisplay');
    if (!budgetDisplay) {
        budgetDisplay = document.createElement('div');
        budgetDisplay.id = 'currentBudgetDisplay';
        budgetDisplay.style.cssText = 'background: var(--color-bg-2); padding: 16px; border-radius: 8px; margin: 16px 0; text-align: center;';
        document.getElementById('finalDecisions').appendChild(budgetDisplay);
    }
    
    budgetDisplay.innerHTML = `
        <strong>Gasto atual: R$ ${totalCost.toLocaleString('pt-BR')}</strong><br>
        <span style="color: ${remaining >= 0 ? 'var(--color-success)' : 'var(--color-error)'}">
            Restante: R$ ${remaining.toLocaleString('pt-BR')}
        </span>
    `;
    
    document.getElementById('confirmHiringBtn').disabled = remaining < 0;
}

function confirmHiring() {
    const selectedHires = [];
    const checkedBoxes = document.querySelectorAll('#finalDecisions input[type="checkbox"]:checked');
    
    checkedBoxes.forEach(checkbox => {
        selectedHires.push({
            area: checkbox.dataset.area,
            position: checkbox.value,
            cost: parseInt(checkbox.dataset.cost)
        });
    });
    
    const totalCost = selectedHires.reduce((sum, hire) => sum + hire.cost, 0);
    if (totalCost > 50000) {
        showNotification('Orçamento excedido!', 'error');
        return;
    }
    
    AppState.currentTeam.finalHiring = selectedHires;
    AppState.currentTeam.hiringBudgetUsed = totalCost;
    
    // Calculate hiring score
    const hiringScore = calculateHiringScore(selectedHires, AppState.currentTeam.hiringNeeds);
    AppState.scoring.hiringDecisions = hiringScore;
    
    DataStore.saveTeam(AppState.currentTeam);
    
    showHiringResults();
}

function calculateHiringScore(finalHires, memberNeeds) {
    // Score based on budget efficiency and meeting team needs
    const budgetUsed = finalHires.reduce((sum, hire) => sum + hire.cost, 0);
    const budgetEfficiency = (50000 - budgetUsed) / 50000 * 30; // Up to 30 points for saving money
    
    // Score for meeting member needs
    let needsSatisfaction = 0;
    const allRequests = Object.values(memberNeeds).flat();
    const totalRequests = allRequests.length;
    
    let satisfiedRequests = 0;
    allRequests.forEach(request => {
        const isHired = finalHires.some(hire => hire.position === request.position && hire.area === request.area);
        if (isHired) satisfiedRequests++;
    });
    
    needsSatisfaction = totalRequests > 0 ? (satisfiedRequests / totalRequests) * 70 : 70; // Up to 70 points
    
    return Math.min(100, Math.floor(budgetEfficiency + needsSatisfaction));
}

function showHiringResults() {
    document.getElementById('hiringPhase2').style.display = 'none';
    
    const organizationContainer = document.getElementById('finalOrganogram');
    organizationContainer.innerHTML = '<h4>Estrutura Final da Empresa</h4>';
    
    // Show organizational structure
    const orgDiv = document.createElement('div');
    orgDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 24px;">
            <h5>Equipe de Liderança</h5>
            ${Object.keys(AppState.currentTeam.positions).map(memberId => {
                const member = AppState.currentTeam.members.find(m => m.id === parseInt(memberId));
                const position = AppState.gameData.positions.find(p => p.code === AppState.currentTeam.positions[memberId]);
                return `<div style="margin: 8px 0;"><strong>${member.name}</strong> - ${position.name}</div>`;
            }).join('')}
        </div>
        <div>
            <h5>Contratações Aprovadas</h5>
            ${AppState.currentTeam.finalHiring.map(hire => `
                <div style="margin: 8px 0;">${hire.position} (${hire.area}) - R$ ${hire.cost.toLocaleString('pt-BR')}</div>
            `).join('')}
        </div>
        <div style="margin-top: 16px; text-align: center; background: var(--color-bg-1); padding: 16px; border-radius: 8px;">
            <strong>Orçamento utilizado: R$ ${AppState.currentTeam.hiringBudgetUsed?.toLocaleString('pt-BR') || '0'} / R$ 50.000</strong>
        </div>
    `;
    organizationContainer.appendChild(orgDiv);
    
    document.getElementById('hiringResults').classList.remove('hidden');
    
    // Show satisfaction section for non-CEO members
    if (AppState.currentUser.id !== parseInt(AppState.currentTeam.ceo)) {
        document.getElementById('hiringSatisfactionSection').classList.remove('hidden');
    } else {
        document.getElementById('continueToReportActions').classList.remove('hidden');
    }
}

function submitHiringSatisfaction() {
    const satisfaction = document.getElementById('hiringSatisfactionSlider').value;
    
    if (!AppState.currentTeam.satisfaction.hiring) {
        AppState.currentTeam.satisfaction.hiring = {};
    }
    
    AppState.currentTeam.satisfaction.hiring[AppState.currentUser.id] = parseInt(satisfaction);
    DataStore.saveTeam(AppState.currentTeam);
    
    showNotification('Avaliação final registrada!', 'success');
    document.getElementById('hiringSatisfactionSection').style.display = 'none';
}

// Final Report Functions
function generateFinalReport() {
    calculateFinalScore();
    displayScoreBreakdown();
    displayTeamRanking();
}

function calculateFinalScore() {
    let totalScore = 0;
    
    totalScore += AppState.scoring.segmentChoice || 0;
    totalScore += AppState.scoring.ceoElection || 0;
    totalScore += AppState.scoring.positionChoices || 0;
    totalScore += AppState.scoring.hiringDecisions || 0;
    
    // Add satisfaction bonuses
    if (AppState.currentTeam.satisfaction) {
        Object.values(AppState.currentTeam.satisfaction).forEach(categoryScores => {
            const avgSatisfaction = Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / Object.values(categoryScores).length;
            totalScore += Math.floor(avgSatisfaction); // Up to 10 points per category
        });
    }
    
    AppState.scoring.totalScore = totalScore;
    document.getElementById('totalScore').textContent = totalScore;
}

function displayScoreBreakdown() {
    const breakdown = document.getElementById('scoreBreakdown');
    breakdown.innerHTML = '';
    
    const scoreItems = [
        { category: 'Escolha do Segmento', score: AppState.scoring.segmentChoice || 0, max: 100 },
        { category: 'Eleição do CEO', score: AppState.scoring.ceoElection || 0, max: 100 },
        { category: 'Definição de Cargos', score: AppState.scoring.positionChoices || 0, max: 100 },
        { category: 'Processo de Contratação', score: AppState.scoring.hiringDecisions || 0, max: 100 }
    ];
    
    scoreItems.forEach(item => {
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'score-item';
        const loss = item.max - item.score;
        scoreDiv.innerHTML = `
            <div class="score-category">${item.category}</div>
            <div>
                <span class="score-value">${item.score}</span>/${item.max}
                ${loss > 0 ? `<span class="score-loss">(-${loss})</span>` : ''}
            </div>
        `;
        breakdown.appendChild(scoreDiv);
    });
}

function displayTeamRanking() {
    const teams = DataStore.getTeams();
    const rankings = teams
        .filter(team => team.selectedSegment) // Only completed teams
        .map(team => ({
            name: team.name,
            score: calculateTeamScore(team)
        }))
        .sort((a, b) => b.score - a.score);
    
    const rankingContainer = document.getElementById('teamRanking');
    rankingContainer.innerHTML = '<h3>Ranking das Equipes</h3>';
    
    if (rankings.length > 1) {
        rankings.forEach((team, index) => {
            const rankDiv = document.createElement('div');
            rankDiv.className = 'team-rank-item';
            rankDiv.style.cssText = 'display: flex; justify-content: space-between; padding: 12px; margin: 8px 0; background: var(--color-surface); border-radius: 8px;';
            rankDiv.innerHTML = `
                <span>${index + 1}º lugar - ${team.name}</span>
                <span>${team.score} pontos</span>
            `;
            rankingContainer.appendChild(rankDiv);
        });
    } else {
        rankingContainer.innerHTML += '<p>Apenas uma equipe completou o jogo.</p>';
    }
}

function calculateTeamScore(team) {
    let score = 0;
    // This is a simplified calculation - you could make it more sophisticated
    if (team.selectedSegment) score += 50;
    if (team.ceo) score += 50;
    if (team.positions) score += Object.keys(team.positions).length * 10;
    if (team.finalHiring) score += team.finalHiring.length * 5;
    return score;
}

// Teacher Panel Functions
function updateTeacherPanel() {
    const teams = DataStore.getTeams();
    const overviewContainer = document.getElementById('teamsOverview');
    overviewContainer.innerHTML = '<h3>Visão Geral das Equipes</h3>';
    
    if (teams.length === 0) {
        overviewContainer.innerHTML += '<p>Nenhuma equipe criada ainda.</p>';
        return;
    }
    
    teams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-overview-card';
        teamCard.innerHTML = `
            <div class="team-overview-name">${team.name} (${team.code})</div>
            <div class="team-overview-members">${team.members.length} membros</div>
            <div class="team-overview-score">
                Status: ${team.selectedSegment ? 'Jogo concluído' : team.ceo ? 'Em andamento' : 'Iniciando'}
            </div>
            <div style="margin-top: 12px;">
                Segmento: ${team.selectedSegment ? AppState.gameData.segments[team.selectedSegment].name : 'Não escolhido'}
            </div>
            ${team.ceo ? `<div>CEO: ${team.members.find(m => m.id === parseInt(team.ceo))?.name || 'N/A'}</div>` : ''}
        `;
        overviewContainer.appendChild(teamCard);
    });
}

function toggleScores() {
    // This would toggle score visibility in a real implementation
    showNotification('Funcionalidade de mostrar/ocultar pontuações ativada', 'info');
}

function resetGame() {
    if (confirm('Tem certeza que deseja zerar todas as informações? Esta ação não pode ser desfeita.')) {
        DataStore.clearAllData();
        AppState.currentUser = null;
        AppState.currentTeam = null;
        showScreen('loginScreen');
        showNotification('Todas as informações foram zeradas', 'success');
    }
}

function restartGame() {
    AppState.currentUser = null;
    AppState.currentTeam = null;
    AppState.quiz = { currentQuestion: 0, answers: [], userProfile: null };
    AppState.scoring = { segmentChoice: 0, ceoElection: 0, positionChoices: 0, hiringDecisions: 0, totalScore: 0 };
    
    showScreen('loginScreen');
    showNotification('Jogo reiniciado!', 'info');
}