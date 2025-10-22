const app = {
    data: {
        goals: [],
        diaryEntries: [],
        chatHistory: [],
        visionCards: [],
        habits: [],
        lifeWheel: {
            career: 5,
            finance: 5,
            health: 5,
            relationships: 5,
            personal: 5,
            fun: 5,
            spiritual: 5,
            contribution: 5
        },
        achievements: [],
        meditationStats: {
            totalSessions: 0,
            totalMinutes: 0
        },
        currentStreak: 0,
        lastActiveDate: null
    },

    meditation: {
        isActive: false,
        timeRemaining: 300,
        selectedTime: 5,
        interval: null,
        audioContext: null,
        oscillators: [],
        gainNodes: [],
        currentSound: 'space'
    },

    chatBot: {
        questions: [
            "¿Cómo imaginas tu futuro ideal dentro de 5 años?",
            "¿Qué te hace sentir más vivo y lleno de energía?",
            "Si no tuvieras miedo al fracaso, ¿qué harías?",
            "¿Cuál es tu definición personal del éxito?",
            "¿Qué legado te gustaría dejar en el mundo?",
            "¿Qué habilidades te gustaría desarrollar?",
            "¿Cómo describirías tu mejor versión de ti mismo?",
            "¿Qué obstáculos crees que te impiden alcanzar tus metas?",
            "¿Qué pequeño paso podrías dar hoy hacia tus sueños?",
            "¿Qué te agradecerá tu yo del futuro?"
        ],
        currentQuestionIndex: 0,
        insights: []
    },

    affirmations: [
        "Soy capaz de lograr todo lo que me proponga con dedicación y esfuerzo.",
        "Cada día me acerco más a mis metas y sueños más profundos.",
        "Confío en mi proceso y en el tiempo perfecto del universo.",
        "Merezco todo lo bueno que está llegando a mi vida.",
        "Mis acciones de hoy están creando el futuro que deseo.",
        "Soy resiliente y puedo superar cualquier desafío.",
        "Atraigo oportunidades maravillosas a mi vida constantemente.",
        "Mi potencial es ilimitado y crece cada día.",
        "Elijo ver las posibilidades en lugar de las limitaciones.",
        "Estoy construyendo la vida de mis sueños, un paso a la vez."
    ],

    achievementsList: [
        { id: 'first-goal', icon: '🎯', title: 'Primer Paso', description: 'Crea tu primera meta', unlocked: false },
        { id: 'goal-master', icon: '🌟', title: 'Visionario', description: 'Crea 5 metas', unlocked: false },
        { id: 'diary-start', icon: '📔', title: 'Cronista', description: 'Escribe tu primera entrada', unlocked: false },
        { id: 'consistent-writer', icon: '✍️', title: 'Escritor Dedicado', description: 'Escribe 10 entradas', unlocked: false },
        { id: 'habit-builder', icon: '💪', title: 'Constructor de Hábitos', description: 'Crea tu primer hábito', unlocked: false },
        { id: 'week-warrior', icon: '🔥', title: 'Guerrero Semanal', description: 'Mantén una racha de 7 días', unlocked: false },
        { id: 'meditation-beginner', icon: '🧘', title: 'Meditador Novato', description: 'Completa tu primera meditación', unlocked: false },
        { id: 'zen-master', icon: '☮️', title: 'Maestro Zen', description: 'Medita 60 minutos en total', unlocked: false },
        { id: 'self-aware', icon: '🎯', title: 'Autoconocimiento', description: 'Completa la Rueda de la Vida', unlocked: false },
        { id: 'chatbot-friend', icon: '🤖', title: 'Conversador', description: 'Chatea 5 veces con el coach', unlocked: false },
        { id: 'vision-creator', icon: '🎨', title: 'Creador de Visión', description: 'Crea tu tablero de visión', unlocked: false },
        { id: 'data-manager', icon: '💾', title: 'Archivista', description: 'Exporta tus datos', unlocked: false }
    ],

    init() {
        this.loadData();
        this.initStarsCanvas();
        this.initParticles();
        this.setupEventListeners();
        this.updateStats();
        this.generateAffirmation();
        this.renderGoals();
        this.renderDiaryEntries();
        this.renderVisionBoard();
        this.renderHabits();
        this.drawLifeWheel();
        this.renderAchievements();
        this.updateMeditationStats();
        this.checkStreak();
        this.updateAchievements();
    },

    setupEventListeners() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.navigateTo(section);
            });
        });

        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        document.getElementById('diary-search').addEventListener('input', (e) => {
            this.searchDiary(e.target.value);
        });

        document.querySelectorAll('.wheel-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const category = e.target.dataset.category;
                const value = parseInt(e.target.value);
                this.data.lifeWheel[category] = value;
                document.getElementById(`val-${category}`).textContent = value;
                this.drawLifeWheel();
            });
        });

        document.getElementById('volume-slider').addEventListener('input', (e) => {
            if (this.meditation.gainNode) {
                this.meditation.gainNode.gain.value = e.target.value / 100;
            }
            document.getElementById('volume-value').textContent = e.target.value;
        });
    },

    navigateTo(sectionId) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        
        document.getElementById(sectionId).classList.add('active');
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    },

    initStarsCanvas() {
        const canvas = document.getElementById('stars-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                alpha: Math.random()
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
                
                star.alpha += Math.random() * 0.05 - 0.025;
                if (star.alpha < 0) star.alpha = 0;
                if (star.alpha > 1) star.alpha = 1;
            });
            
            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    },

    initParticles() {
        const container = document.getElementById('particles-container');
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            container.appendChild(particle);
        }
    },

    createGoal() {
        const goal = {
            id: Date.now(),
            title: document.getElementById('goal-title').value,
            category: document.getElementById('goal-category').value,
            description: document.getElementById('goal-description').value,
            emotion: document.getElementById('goal-emotion').value,
            deadline: document.getElementById('goal-deadline').value,
            image: document.getElementById('goal-image').value,
            steps: document.getElementById('goal-steps').value.split('\n').filter(s => s.trim()),
            createdAt: new Date().toISOString()
        };

        if (!goal.title) {
            this.showNotification('Por favor ingresa un título para tu meta');
            return;
        }

        this.data.goals.push(goal);
        this.saveData();
        this.renderGoals();
        this.updateStats();
        this.updateAchievements();
        
        document.getElementById('goal-title').value = '';
        document.getElementById('goal-description').value = '';
        document.getElementById('goal-image').value = '';
        document.getElementById('goal-steps').value = '';
        
        this.showNotification('¡Meta creada con éxito! 🎉');
    },

    renderGoals() {
        const container = document.getElementById('storyboard-container');
        if (!this.data.goals.length) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Aún no has creado ninguna meta. ¡Empieza a visualizar tu futuro!</p>';
            return;
        }

        container.innerHTML = this.data.goals.map(goal => `
            <div class="goal-card">
                <button class="delete-btn" onclick="app.deleteGoal(${goal.id})">×</button>
                <div class="goal-category">${this.getCategoryIcon(goal.category)} ${goal.category}</div>
                ${goal.image ? `<img src="${goal.image}" alt="${goal.title}" class="goal-image" onerror="this.style.display='none'">` : ''}
                <h3 class="goal-title">${goal.title}</h3>
                <p class="goal-description">${goal.description}</p>
                <div class="goal-emotion">
                    <span>Emoción:</span> ${this.getEmotionIcon(goal.emotion)} ${goal.emotion}
                </div>
                ${goal.deadline ? `<div class="goal-deadline">📅 ${new Date(goal.deadline).toLocaleDateString('es')}</div>` : ''}
                ${goal.steps.length ? `
                    <div class="goal-steps">
                        <h4>Pasos de Acción:</h4>
                        <ul>
                            ${goal.steps.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `).join('');
    },

    deleteGoal(id) {
        this.showConfirmModal(
            'Eliminar Meta',
            '¿Estás seguro de que deseas eliminar esta meta? Esta acción no se puede deshacer.',
            () => {
                this.data.goals = this.data.goals.filter(g => g.id !== id);
                this.saveData();
                this.renderGoals();
                this.updateStats();
                this.showNotification('Meta eliminada correctamente');
            }
        );
    },

    getCategoryIcon(category) {
        const icons = {
            carrera: '💼',
            salud: '💪',
            relaciones: '❤️',
            finanzas: '💰',
            educacion: '📚',
            personal: '🌟',
            creatividad: '🎨',
            espiritualidad: '🧘'
        };
        return icons[category] || '⭐';
    },

    getEmotionIcon(emotion) {
        const icons = {
            alegría: '😊',
            orgullo: '🏆',
            paz: '☮️',
            emoción: '🎉',
            gratitud: '🙏',
            confianza: '💪',
            amor: '❤️',
            libertad: '🕊️'
        };
        return icons[emotion] || '✨';
    },

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.data.chatHistory.push({
            type: 'user',
            message: message,
            timestamp: new Date().toISOString()
        });

        this.addChatMessage(message, 'user');
        input.value = '';

        setTimeout(() => {
            const response = this.generateBotResponse(message);
            this.data.chatHistory.push({
                type: 'bot',
                message: response,
                timestamp: new Date().toISOString()
            });
            this.addChatMessage(response, 'bot');
            this.saveData();
            this.updateAchievements();
        }, 1000);
    },

    generateBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        const responses = {
            motivacional: [
                "Esa es una visión increíble. ¿Qué pequeño paso podrías dar hoy para acercarte a ese futuro?",
                "Me encanta tu perspectiva. La clave está en la acción constante. ¿Cómo planeas mantener el enfoque?",
                "Fascinante. Cada gran logro comienza con una decisión. ¿Qué decisión tomarás ahora?",
                "Tu visión tiene mucho poder. Recuerda: el progreso es más importante que la perfección.",
                "Excelente reflexión. ¿Qué hábitos diarios te ayudarían a materializar esto?"
            ],
            obstaculos: [
                "Los obstáculos son oportunidades disfrazadas. ¿Qué puedes aprender de este desafío?",
                "Entiendo que sea difícil. Pero recuerda: has superado el 100% de tus peores días hasta ahora.",
                "Cada obstáculo es una prueba de tu compromiso. ¿Qué recursos tienes para superarlo?"
            ]
        };

        if (lowerMessage.includes('miedo') || lowerMessage.includes('difícil') || lowerMessage.includes('no puedo')) {
            return responses.obstaculos[Math.floor(Math.random() * responses.obstaculos.length)];
        }

        if (this.chatBot.currentQuestionIndex < this.chatBot.questions.length) {
            const insight = `Compartiste: "${userMessage.substring(0, 100)}..."`;
            this.chatBot.insights.push(insight);
            this.renderChatInsights();
            
            const response = responses.motivacional[Math.floor(Math.random() * responses.motivacional.length)];
            const nextQuestion = this.chatBot.questions[this.chatBot.currentQuestionIndex];
            this.chatBot.currentQuestionIndex++;
            
            return `${response}\n\nAhora déjame preguntarte: ${nextQuestion}`;
        }

        return "Has compartido reflexiones muy valiosas. Recuerda revisar tus insights y seguir trabajando en tus metas. ¿Hay algo más en lo que pueda ayudarte?";
    },

    addChatMessage(message, type) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}-message`;
        
        const avatar = type === 'bot' ? '🤖' : '👤';
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },

    renderChatInsights() {
        const container = document.getElementById('chat-insights-list');
        if (!this.chatBot.insights.length) {
            container.innerHTML = '<p style="color: var(--text-secondary);">Tus insights aparecerán aquí mientras conversamos...</p>';
            return;
        }
        container.innerHTML = this.chatBot.insights.map(insight => 
            `<div class="insight-item">${insight}</div>`
        ).join('');
    },

    showDiaryForm() {
        document.getElementById('diary-form').style.display = 'block';
        document.getElementById('diary-form').scrollIntoView({ behavior: 'smooth' });
    },

    cancelDiaryEntry() {
        document.getElementById('diary-form').style.display = 'none';
        document.getElementById('diary-title').value = '';
        document.getElementById('diary-content').value = '';
    },

    saveDiaryEntry() {
        const entry = {
            id: Date.now(),
            title: document.getElementById('diary-title').value,
            mood: document.getElementById('diary-mood').value,
            content: document.getElementById('diary-content').value,
            date: new Date().toISOString()
        };

        if (!entry.title || !entry.content) {
            this.showNotification('Por favor completa todos los campos');
            return;
        }

        this.data.diaryEntries.unshift(entry);
        this.saveData();
        this.renderDiaryEntries();
        this.updateTimeline();
        this.updateStats();
        this.updateAchievements();
        this.cancelDiaryEntry();
        this.showNotification('Entrada guardada con éxito 📔');
    },

    renderDiaryEntries() {
        const container = document.getElementById('diary-entries-list');
        if (!this.data.diaryEntries.length) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No hay entradas aún. ¡Empieza a escribir!</p>';
            return;
        }

        container.innerHTML = this.data.diaryEntries.slice(0, 10).map(entry => `
            <div class="diary-entry">
                <div class="diary-entry-header">
                    <h3 class="diary-entry-title">${entry.title}</h3>
                    <span class="diary-entry-date">${new Date(entry.date).toLocaleDateString('es', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</span>
                </div>
                <div class="diary-entry-mood">${this.getMoodIcon(entry.mood)}</div>
                <p class="diary-entry-content">${entry.content}</p>
                <button class="delete-btn" onclick="app.deleteDiaryEntry(${entry.id})">×</button>
            </div>
        `).join('');
        
        this.updateTimeline();
    },

    deleteDiaryEntry(id) {
        this.showConfirmModal(
            'Eliminar Entrada',
            '¿Estás seguro de que deseas eliminar esta entrada del diario?',
            () => {
                this.data.diaryEntries = this.data.diaryEntries.filter(e => e.id !== id);
                this.saveData();
                this.renderDiaryEntries();
                this.updateStats();
                this.showNotification('Entrada eliminada correctamente');
            }
        );
    },

    getMoodIcon(mood) {
        const icons = {
            excelente: '😄',
            bien: '😊',
            neutral: '😐',
            triste: '😢',
            ansioso: '😰',
            motivado: '💪',
            agradecido: '🙏',
            inspirado: '✨'
        };
        return icons[mood] || '😊';
    },

    updateTimeline() {
        const container = document.getElementById('timeline-container');
        const entries = this.data.diaryEntries.slice(0, 5);
        
        if (!entries.length) {
            container.innerHTML = '<p style="color: var(--text-secondary);">Tu timeline aparecerá aquí...</p>';
            return;
        }

        container.innerHTML = entries.map(entry => `
            <div class="timeline-item">
                <div class="timeline-date">${new Date(entry.date).toLocaleDateString('es')}</div>
                <div class="timeline-mood">${this.getMoodIcon(entry.mood)}</div>
                <div>${entry.title}</div>
            </div>
        `).join('');
    },

    searchDiary(query) {
        if (!query) {
            this.renderDiaryEntries();
            return;
        }

        const filtered = this.data.diaryEntries.filter(entry => 
            entry.title.toLowerCase().includes(query.toLowerCase()) ||
            entry.content.toLowerCase().includes(query.toLowerCase())
        );

        const container = document.getElementById('diary-entries-list');
        if (!filtered.length) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No se encontraron resultados</p>';
            return;
        }

        container.innerHTML = filtered.map(entry => `
            <div class="diary-entry">
                <div class="diary-entry-header">
                    <h3 class="diary-entry-title">${entry.title}</h3>
                    <span class="diary-entry-date">${new Date(entry.date).toLocaleDateString('es')}</span>
                </div>
                <div class="diary-entry-mood">${this.getMoodIcon(entry.mood)}</div>
                <p class="diary-entry-content">${entry.content}</p>
            </div>
        `).join('');
    },

    addVisionCard() {
        this.showInputModal(
            'Nueva Tarjeta de Visión',
            'Título de la tarjeta:',
            'Ej: Viajar a Japón, Aprender inglés...',
            (title) => {
                this.showTextareaModal(
                    'Descripción',
                    'Descripción (opcional):',
                    'Describe con más detalle esta visión...',
                    (description) => {
                        const card = {
                            id: Date.now(),
                            title: title,
                            description: description,
                            color: this.getRandomGalaxyColor()
                        };

                        this.data.visionCards.push(card);
                        this.saveData();
                        this.renderVisionBoard();
                        this.updateAchievements();
                        this.showNotification('Tarjeta creada exitosamente 🎨');
                    }
                );
            }
        );
    },

    renderVisionBoard() {
        const container = document.getElementById('vision-board-container');
        if (!this.data.visionCards.length) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem; grid-column: 1/-1;">Crea tarjetas para visualizar tus sueños</p>';
            return;
        }

        container.innerHTML = this.data.visionCards.map(card => `
            <div class="vision-card" style="border-left: 4px solid ${card.color}">
                <button class="delete-btn" onclick="app.deleteVisionCard(${card.id})">×</button>
                <h3>${card.title}</h3>
                <p style="color: var(--text-secondary); margin-top: 0.5rem;">${card.description}</p>
            </div>
        `).join('');
    },

    deleteVisionCard(id) {
        this.data.visionCards = this.data.visionCards.filter(c => c.id !== id);
        this.saveData();
        this.renderVisionBoard();
    },

    clearVisionBoard() {
        this.showConfirmModal(
            'Limpiar Tablero',
            '¿Estás seguro de que deseas eliminar todas las tarjetas del tablero de visión? Esta acción no se puede deshacer.',
            () => {
                this.data.visionCards = [];
                this.saveData();
                this.renderVisionBoard();
                this.showNotification('Tablero limpiado correctamente');
            }
        );
    },

    getRandomGalaxyColor() {
        const colors = ['#4a5fd9', '#00d4ff', '#ff1cf7', '#ff6ec7', '#ffd700', '#00ff88'];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    showHabitForm() {
        document.getElementById('habit-form').style.display = 'block';
    },

    cancelHabitForm() {
        document.getElementById('habit-form').style.display = 'none';
        document.getElementById('habit-name').value = '';
    },

    createHabit() {
        const name = document.getElementById('habit-name').value;
        const icon = document.getElementById('habit-icon').value;

        if (!name) {
            this.showNotification('Ingresa un nombre para el hábito');
            return;
        }

        const habit = {
            id: Date.now(),
            name: name,
            icon: icon,
            completedDays: [],
            createdAt: new Date().toISOString()
        };

        this.data.habits.push(habit);
        this.saveData();
        this.renderHabits();
        this.updateAchievements();
        this.cancelHabitForm();
        this.showNotification('Hábito creado 🎉');
    },

    renderHabits() {
        const container = document.getElementById('habits-list');
        if (!this.data.habits.length) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem; grid-column: 1/-1;">Crea hábitos para rastrear tu progreso</p>';
            return;
        }

        container.innerHTML = this.data.habits.map(habit => {
            const last30Days = this.getLast30Days();
            const streak = this.calculateStreak(habit.completedDays);
            
            return `
                <div class="habit-card">
                    <button class="delete-btn" onclick="app.deleteHabit(${habit.id})">×</button>
                    <h3>${habit.icon} ${habit.name}</h3>
                    <div class="habit-tracker">
                        ${last30Days.map(date => {
                            const isCompleted = habit.completedDays.includes(date);
                            return `<div class="habit-day ${isCompleted ? 'completed' : ''}" 
                                        onclick="app.toggleHabitDay(${habit.id}, '${date}')"
                                        title="${date}">
                                    ${isCompleted ? '✓' : ''}
                                    </div>`;
                        }).join('')}
                    </div>
                    <div class="habit-streak">🔥 Racha: ${streak} días</div>
                </div>
            `;
        }).join('');
    },

    getLast30Days() {
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toISOString().split('T')[0]);
        }
        return days;
    },

    calculateStreak(completedDays) {
        if (!completedDays.length) return 0;
        
        const sortedDays = [...completedDays].sort().reverse();
        let streak = 0;
        let currentDate = new Date();
        
        for (let i = 0; i < sortedDays.length; i++) {
            const checkDate = new Date(currentDate);
            checkDate.setDate(checkDate.getDate() - i);
            const dateStr = checkDate.toISOString().split('T')[0];
            
            if (sortedDays.includes(dateStr)) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    },

    toggleHabitDay(habitId, date) {
        const habit = this.data.habits.find(h => h.id === habitId);
        if (!habit) return;

        const index = habit.completedDays.indexOf(date);
        if (index > -1) {
            habit.completedDays.splice(index, 1);
        } else {
            habit.completedDays.push(date);
        }

        this.saveData();
        this.renderHabits();
        this.checkStreak();
        this.updateAchievements();
    },

    deleteHabit(id) {
        this.showConfirmModal(
            'Eliminar Hábito',
            '¿Estás seguro de que deseas eliminar este hábito? Se perderá todo el progreso registrado.',
            () => {
                this.data.habits = this.data.habits.filter(h => h.id !== id);
                this.saveData();
                this.renderHabits();
                this.showNotification('Hábito eliminado correctamente');
            }
        );
    },

    drawLifeWheel() {
        const canvas = document.getElementById('life-wheel-canvas');
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 200;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const categories = [
            { key: 'career', label: 'Carrera', color: '#4a5fd9' },
            { key: 'finance', label: 'Finanzas', color: '#00d4ff' },
            { key: 'health', label: 'Salud', color: '#ff1cf7' },
            { key: 'relationships', label: 'Relaciones', color: '#ff6ec7' },
            { key: 'personal', label: 'Personal', color: '#ffd700' },
            { key: 'fun', label: 'Diversión', color: '#00ff88' },
            { key: 'spiritual', label: 'Espiritualidad', color: '#c4b5fd' },
            { key: 'contribution', label: 'Contribución', color: '#ff6ec7' }
        ];

        const angleStep = (Math.PI * 2) / categories.length;

        for (let i = 0; i <= 10; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 10) * i, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(138, 92, 246, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        categories.forEach((cat, i) => {
            const angle = angleStep * i - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(138, 92, 246, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            const labelX = centerX + Math.cos(angle) * (radius + 30);
            const labelY = centerY + Math.sin(angle) * (radius + 30);
            ctx.fillStyle = '#c4b5fd';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(cat.label, labelX, labelY);
        });

        ctx.beginPath();
        categories.forEach((cat, i) => {
            const value = this.data.lifeWheel[cat.key];
            const angle = angleStep * i - Math.PI / 2;
            const distance = (radius / 10) * value;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();

        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(74, 95, 217, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 28, 247, 0.4)');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 3;
        ctx.stroke();

        categories.forEach((cat, i) => {
            const value = this.data.lifeWheel[cat.key];
            const angle = angleStep * i - Math.PI / 2;
            const distance = (radius / 10) * value;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;

            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = cat.color;
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    },

    saveWheelData() {
        this.saveData();
        this.updateAchievements();
        this.showNotification('Evaluación guardada 🎯');
    },

    setMeditationTime(minutes) {
        this.meditation.selectedTime = minutes;
        this.meditation.timeRemaining = minutes * 60;
        this.updateMeditationDisplay();

        document.querySelectorAll('.btn-time').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    },

    updateMeditationDisplay() {
        const minutes = Math.floor(this.meditation.timeRemaining / 60);
        const seconds = this.meditation.timeRemaining % 60;
        document.getElementById('meditation-timer').textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },

    toggleMeditation() {
        if (this.meditation.isActive) {
            this.stopMeditation();
        } else {
            this.startMeditation();
        }
    },

    startMeditation() {
        this.meditation.isActive = true;
        document.getElementById('meditation-btn').textContent = 'Detener Meditación';
        
        this.initAudio();
        
        this.meditation.interval = setInterval(() => {
            this.meditation.timeRemaining--;
            this.updateMeditationDisplay();
            
            if (this.meditation.timeRemaining <= 0) {
                this.completeMeditation();
            }
        }, 1000);

        this.animateBreathing();
    },

    stopMeditation() {
        this.meditation.isActive = false;
        clearInterval(this.meditation.interval);
        document.getElementById('meditation-btn').textContent = 'Comenzar Meditación';
        
        this.meditation.oscillators.forEach(osc => {
            try {
                osc.stop();
            } catch (e) {}
        });
        this.meditation.oscillators = [];
        this.meditation.gainNodes = [];
        
        this.meditation.timeRemaining = this.meditation.selectedTime * 60;
        this.updateMeditationDisplay();
    },

    completeMeditation() {
        this.stopMeditation();
        
        this.data.meditationStats.totalSessions++;
        this.data.meditationStats.totalMinutes += this.meditation.selectedTime;
        this.saveData();
        this.updateMeditationStats();
        this.updateAchievements();
        
        this.showNotification('¡Meditación completada! 🧘✨');
    },

    initAudio() {
        if (!this.meditation.audioContext) {
            this.meditation.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        this.playAmbientSound(this.meditation.currentSound);
    },

    setAmbientSound(sound) {
        this.meditation.currentSound = sound;
        
        document.querySelectorAll('.ambient-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        if (this.meditation.isActive) {
            this.meditation.oscillators.forEach(osc => {
                try {
                    osc.stop();
                } catch (e) {}
            });
            this.meditation.oscillators = [];
            this.meditation.gainNodes = [];
            
            if (sound !== 'none') {
                this.playAmbientSound(sound);
            }
        }
    },

    playAmbientSound(sound) {
        if (sound === 'none') return;

        const ctx = this.meditation.audioContext;
        const volume = document.getElementById('volume-slider').value / 100;

        if (sound === 'space') {
            const frequencies = [100, 150, 200, 75];
            frequencies.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + 8);
                
                gain.gain.setValueAtTime(volume * 0.03 * (1 - index * 0.15), ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(volume * 0.05 * (1 - index * 0.15), ctx.currentTime + 4);
                gain.gain.exponentialRampToValueAtTime(volume * 0.03 * (1 - index * 0.15), ctx.currentTime + 8);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                
                this.meditation.oscillators.push(osc);
                this.meditation.gainNodes.push(gain);
            });
        } else if (sound === 'rain') {
            const createRainDrop = () => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const filter = ctx.createBiquadFilter();
                
                filter.type = 'bandpass';
                filter.frequency.value = 2000 + Math.random() * 3000;
                filter.Q.value = 0.5;
                
                osc.type = 'white' in osc ? 'white' : 'sawtooth';
                osc.frequency.setValueAtTime(Math.random() * 1000 + 500, ctx.currentTime);
                
                gain.gain.setValueAtTime(volume * 0.05, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
            };
            
            const rainInterval = setInterval(() => {
                if (!this.meditation.isActive) {
                    clearInterval(rainInterval);
                    return;
                }
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => createRainDrop(), Math.random() * 100);
                }
            }, 50);
            
            const baseOsc = ctx.createOscillator();
            const baseGain = ctx.createGain();
            baseOsc.type = 'triangle';
            baseOsc.frequency.setValueAtTime(100, ctx.currentTime);
            baseGain.gain.setValueAtTime(volume * 0.02, ctx.currentTime);
            baseOsc.connect(baseGain);
            baseGain.connect(ctx.destination);
            baseOsc.start();
            
            this.meditation.oscillators.push(baseOsc);
            this.meditation.gainNodes.push(baseGain);
        } else if (sound === 'ocean') {
            for (let i = 0; i < 3; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const lfo = ctx.createOscillator();
                const lfoGain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(80 + i * 30, ctx.currentTime);
                
                lfo.type = 'sine';
                lfo.frequency.value = 0.1 + i * 0.05;
                lfoGain.gain.value = 20 + i * 10;
                
                lfo.connect(lfoGain);
                lfoGain.connect(osc.frequency);
                
                gain.gain.setValueAtTime(volume * 0.04 * (1 - i * 0.2), ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(volume * 0.06 * (1 - i * 0.2), ctx.currentTime + 3);
                gain.gain.exponentialRampToValueAtTime(volume * 0.04 * (1 - i * 0.2), ctx.currentTime + 6);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                lfo.start();
                
                this.meditation.oscillators.push(osc, lfo);
                this.meditation.gainNodes.push(gain, lfoGain);
            }
        }
    },

    animateBreathing() {
        const circle = document.getElementById('breathing-circle');
        const text = document.getElementById('breath-text');
        
        let phase = 0;
        const breatheCycle = setInterval(() => {
            if (!this.meditation.isActive) {
                clearInterval(breatheCycle);
                return;
            }

            switch(phase) {
                case 0:
                    text.textContent = 'Inhala';
                    circle.style.animation = 'none';
                    setTimeout(() => circle.style.animation = 'breathe 8s infinite ease-in-out', 10);
                    break;
                case 1:
                    text.textContent = 'Sostén';
                    break;
                case 2:
                    text.textContent = 'Exhala';
                    break;
                case 3:
                    text.textContent = 'Relaja';
                    break;
            }
            
            phase = (phase + 1) % 4;
        }, 4000);
    },

    updateMeditationStats() {
        document.getElementById('total-sessions').textContent = this.data.meditationStats.totalSessions;
        document.getElementById('total-minutes').textContent = this.data.meditationStats.totalMinutes;
    },

    renderAchievements() {
        const container = document.getElementById('achievements-grid');
        container.innerHTML = this.achievementsList.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? '' : 'locked'}">
                <span class="achievement-icon">${achievement.icon}</span>
                <h3 class="achievement-title">${achievement.title}</h3>
                <p class="achievement-description">${achievement.description}</p>
                ${achievement.unlocked ? '<div class="achievement-unlocked">✓ Desbloqueado</div>' : ''}
            </div>
        `).join('');

        const unlocked = this.achievementsList.filter(a => a.unlocked).length;
        const total = this.achievementsList.length;
        const percentage = (unlocked / total) * 100;
        
        document.getElementById('achievements-progress').style.width = percentage + '%';
        document.getElementById('unlocked-count').textContent = unlocked;
        document.getElementById('total-achievements').textContent = total;
    },

    updateAchievements() {
        let newUnlocks = [];

        if (this.data.goals.length >= 1 && !this.achievementsList.find(a => a.id === 'first-goal').unlocked) {
            this.achievementsList.find(a => a.id === 'first-goal').unlocked = true;
            newUnlocks.push('Primer Paso');
        }

        if (this.data.goals.length >= 5 && !this.achievementsList.find(a => a.id === 'goal-master').unlocked) {
            this.achievementsList.find(a => a.id === 'goal-master').unlocked = true;
            newUnlocks.push('Visionario');
        }

        if (this.data.diaryEntries.length >= 1 && !this.achievementsList.find(a => a.id === 'diary-start').unlocked) {
            this.achievementsList.find(a => a.id === 'diary-start').unlocked = true;
            newUnlocks.push('Cronista');
        }

        if (this.data.diaryEntries.length >= 10 && !this.achievementsList.find(a => a.id === 'consistent-writer').unlocked) {
            this.achievementsList.find(a => a.id === 'consistent-writer').unlocked = true;
            newUnlocks.push('Escritor Dedicado');
        }

        if (this.data.habits.length >= 1 && !this.achievementsList.find(a => a.id === 'habit-builder').unlocked) {
            this.achievementsList.find(a => a.id === 'habit-builder').unlocked = true;
            newUnlocks.push('Constructor de Hábitos');
        }

        if (this.data.currentStreak >= 7 && !this.achievementsList.find(a => a.id === 'week-warrior').unlocked) {
            this.achievementsList.find(a => a.id === 'week-warrior').unlocked = true;
            newUnlocks.push('Guerrero Semanal');
        }

        if (this.data.meditationStats.totalSessions >= 1 && !this.achievementsList.find(a => a.id === 'meditation-beginner').unlocked) {
            this.achievementsList.find(a => a.id === 'meditation-beginner').unlocked = true;
            newUnlocks.push('Meditador Novato');
        }

        if (this.data.meditationStats.totalMinutes >= 60 && !this.achievementsList.find(a => a.id === 'zen-master').unlocked) {
            this.achievementsList.find(a => a.id === 'zen-master').unlocked = true;
            newUnlocks.push('Maestro Zen');
        }

        if (this.data.chatHistory.length >= 5 && !this.achievementsList.find(a => a.id === 'chatbot-friend').unlocked) {
            this.achievementsList.find(a => a.id === 'chatbot-friend').unlocked = true;
            newUnlocks.push('Conversador');
        }

        if (this.data.visionCards.length >= 1 && !this.achievementsList.find(a => a.id === 'vision-creator').unlocked) {
            this.achievementsList.find(a => a.id === 'vision-creator').unlocked = true;
            newUnlocks.push('Creador de Visión');
        }

        if (newUnlocks.length > 0) {
            this.data.achievements = this.achievementsList.filter(a => a.unlocked).map(a => a.id);
            this.saveData();
            this.renderAchievements();
            newUnlocks.forEach(title => {
                this.showNotification(`🏆 ¡Logro desbloqueado: ${title}!`);
            });
        }

        this.renderAchievements();
    },

    checkStreak() {
        const today = new Date().toISOString().split('T')[0];
        
        if (this.data.lastActiveDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            if (this.data.lastActiveDate === yesterdayStr) {
                this.data.currentStreak++;
            } else if (this.data.lastActiveDate !== null) {
                this.data.currentStreak = 1;
            } else {
                this.data.currentStreak = 1;
            }
            
            this.data.lastActiveDate = today;
            this.saveData();
        }
        
        this.updateStats();
    },

    updateStats() {
        document.getElementById('stat-goals').textContent = this.data.goals.length;
        document.getElementById('stat-entries').textContent = this.data.diaryEntries.length;
        document.getElementById('stat-streak').textContent = this.data.currentStreak;
        document.getElementById('stat-achievements').textContent = 
            this.achievementsList.filter(a => a.unlocked).length;
    },

    generateAffirmation() {
        const affirmation = this.affirmations[Math.floor(Math.random() * this.affirmations.length)];
        document.getElementById('daily-affirmation-text').textContent = affirmation;
    },

    showNotification(message) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    toggleTheme() {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        
        this.showNotification(isLightMode ? '☀️ Modo claro activado' : '🌙 Modo oscuro activado');
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
    },

    showModal(title, bodyHTML, onConfirm, confirmText = 'Confirmar') {
        const modal = document.getElementById('custom-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const confirmBtn = document.getElementById('modal-confirm');
        
        modalTitle.textContent = title;
        modalBody.innerHTML = bodyHTML;
        confirmBtn.textContent = confirmText;
        modal.classList.add('active');
        
        const handleConfirm = () => {
            onConfirm();
            this.closeModal();
            confirmBtn.removeEventListener('click', handleConfirm);
        };
        
        confirmBtn.addEventListener('click', handleConfirm);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    },

    closeModal() {
        const modal = document.getElementById('custom-modal');
        modal.classList.remove('active');
    },

    showConfirmModal(title, message, onConfirm) {
        this.showModal(
            title,
            `<p style="color: var(--text-secondary); line-height: 1.6;">${message}</p>`,
            onConfirm,
            'Confirmar'
        );
    },

    showInputModal(title, label, placeholder, onConfirm) {
        const inputId = 'modal-input-' + Date.now();
        this.showModal(
            title,
            `
                <label for="${inputId}">${label}</label>
                <input type="text" id="${inputId}" placeholder="${placeholder}" autofocus>
            `,
            () => {
                const value = document.getElementById(inputId).value.trim();
                if (value) {
                    onConfirm(value);
                }
            },
            'Aceptar'
        );
        
        setTimeout(() => {
            const input = document.getElementById(inputId);
            if (input) {
                input.focus();
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        document.getElementById('modal-confirm').click();
                    }
                });
            }
        }, 100);
    },

    showTextareaModal(title, label, placeholder, onConfirm) {
        const textareaId = 'modal-textarea-' + Date.now();
        this.showModal(
            title,
            `
                <label for="${textareaId}">${label}</label>
                <textarea id="${textareaId}" placeholder="${placeholder}" rows="4" autofocus></textarea>
            `,
            () => {
                const value = document.getElementById(textareaId).value.trim();
                if (value) {
                    onConfirm(value);
                }
            },
            'Aceptar'
        );
        
        setTimeout(() => {
            const textarea = document.getElementById(textareaId);
            if (textarea) textarea.focus();
        }, 100);
    },

    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `proyecto-vida-galactico-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        const achievement = this.achievementsList.find(a => a.id === 'data-manager');
        if (!achievement.unlocked) {
            achievement.unlocked = true;
            this.saveData();
            this.showNotification('🏆 ¡Logro desbloqueado: Archivista!');
            this.renderAchievements();
        }
        
        this.showNotification('Datos exportados exitosamente 💾');
    },

    saveData() {
        localStorage.setItem('galaxyLifeProject', JSON.stringify(this.data));
        localStorage.setItem('galaxyAchievements', JSON.stringify(this.achievementsList));
    },

    loadData() {
        const saved = localStorage.getItem('galaxyLifeProject');
        if (saved) {
            this.data = JSON.parse(saved);
        }

        const savedAchievements = localStorage.getItem('galaxyAchievements');
        if (savedAchievements) {
            this.achievementsList = JSON.parse(savedAchievements);
        }
        
        this.loadTheme();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
