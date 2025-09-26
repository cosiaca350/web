// Servicio unificado de IA con múltiples proveedores
class AIService {
    constructor() {
        // Configuración de múltiples APIs
        this.providers = {
            gemini: {
                apiKey: '2881gN4mH7kXqT5cW9sP1jF0L6zR3vYxU2bEaQfJdI7uO4wVtC9sGpMhKjL5nB6vPqYxZrDcTfG8wHsJaQkXlZmWvN0bE1cR2dF3gH4jK5lM6nB7vC8xY9zR0dF1gH2jK3lM4nB5vC6xY7zR8dQ',
                baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
                active: true
            },
            openai: {
                apiKey: 'c6d70d2f026a454d896131c79017ae7a6858e8055c11438290f1469e5d95393a',
                baseUrl: 'https://api.openai.com/v1/chat/completions',
                active: true
            },
            claude: {
                apiKey: 'd5XFkP0sLhN7v8TqRmYjGaWc2xIeB3zOuC4pV9yFbQ6tJrS1oHgMKLZDXEUA7NFIJPCQW',
                baseUrl: 'https://api.anthropic.com/v1/messages',
                active: true
            },
            custom: {
                apiKey: '2881gN4mH7kXqT5cW9sP1jF0L6zR3vYxU2bEaQfJdI7uO4wVtC9sGpMhKjL5nB6vPqYxZrDcTfG8wHsJaQkXlZmWvN0bE1cR2dF3gH4jK5lM6nB7vC8xY9zR0dF1gH2jK3lM4nB5vC6xY7zR8dQ',
                baseUrl: 'https://api.custom-ai.com/v1/generate',
                active: true
            }
        };
        
        this.currentProvider = 'gemini';
        this.fallbackOrder = ['gemini', 'openai', 'claude', 'custom'];
    }

    // Contexto base para Cosiaca
    getCosiacaContext() {
        return `Eres José García "Cosiaca", el primer comediante popular de Antioquia (siglo XIX).
        Eres experto en la historia de Medellín desde su fundación en 1675 hasta 2025.
        Tu personalidad es pícara, divertida, sabia y muy paisa. 
        Usas expresiones como "mijito", "pues", "¿o qué?", "verraco", "berraco".
        Respondes con humor inteligente pero siempre con información histórica precisa.
        Eres el narrador oficial del proyecto transmedia "Cosiaca 350".`;
    }

    // Llamada a Gemini
    async callGemini(prompt, context = '') {
        try {
            const response = await fetch(`${this.providers.gemini.baseUrl}?key=${this.providers.gemini.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${context}\n\n${prompt}`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.8,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
            
            const data = await response.json();
            return data.candidates[0]?.content?.parts[0]?.text || 'Error generando contenido';
        } catch (error) {
            console.error('Gemini API error:', error);
            throw error;
        }
    }

    // Llamada a OpenAI
    async callOpenAI(prompt, context = '') {
        try {
            const response = await fetch(this.providers.openai.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.providers.openai.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: context },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.8,
                    max_tokens: 1024
                })
            });

            if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`);
            
            const data = await response.json();
            return data.choices[0]?.message?.content || 'Error generando contenido';
        } catch (error) {
            console.error('OpenAI API error:', error);
            throw error;
        }
    }

    // Llamada a Claude
    async callClaude(prompt, context = '') {
        try {
            const response = await fetch(this.providers.claude.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.providers.claude.apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-3-sonnet-20240229',
                    max_tokens: 1024,
                    messages: [{
                        role: 'user',
                        content: `${context}\n\n${prompt}`
                    }]
                })
            });

            if (!response.ok) throw new Error(`Claude API error: ${response.status}`);
            
            const data = await response.json();
            return data.content[0]?.text || 'Error generando contenido';
        } catch (error) {
            console.error('Claude API error:', error);
            throw error;
        }
    }

    // Llamada a API personalizada
    async callCustom(prompt, context = '') {
        try {
            const response = await fetch(this.providers.custom.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.providers.custom.apiKey}`
                },
                body: JSON.stringify({
                    prompt: `${context}\n\n${prompt}`,
                    temperature: 0.8,
                    max_tokens: 1024
                })
            });

            if (!response.ok) throw new Error(`Custom API error: ${response.status}`);
            
            const data = await response.json();
            return data.text || data.response || 'Error generando contenido';
        } catch (error) {
            console.error('Custom API error:', error);
            throw error;
        }
    }

    // Método principal con fallback automático
    async generateContent(prompt, context = '', preferredProvider = null) {
        const fullContext = context || this.getCosiacaContext();
        const providers = preferredProvider ? [preferredProvider, ...this.fallbackOrder.filter(p => p !== preferredProvider)] : this.fallbackOrder;

        for (const provider of providers) {
            if (!this.providers[provider]?.active) continue;

            try {
                console.log(`Intentando con ${provider}...`);
                
                switch (provider) {
                    case 'gemini':
                        return await this.callGemini(prompt, fullContext);
                    case 'openai':
                        return await this.callOpenAI(prompt, fullContext);
                    case 'claude':
                        return await this.callClaude(prompt, fullContext);
                    case 'custom':
                        return await this.callCustom(prompt, fullContext);
                    default:
                        continue;
                }
            } catch (error) {
                console.warn(`${provider} falló, intentando siguiente...`);
                continue;
            }
        }

        // Si todos fallan, devolver mensaje de error amigable
        return "¡Uy, mijito! Parece que Cosiaca se quedó sin palabras por un momento. Intentá de nuevo más tarde, ¿sí?";
    }

    // Funciones específicas mejoradas
    async generatePaisaJoke(provider = null) {
        const prompt = `Cuenta un chiste corto y divertido sobre la historia de Medellín o la cultura paisa. 
        Debe ser familiar, gracioso y con tu personalidad característica. Máximo 3 líneas.
        Incluye referencias históricas sutiles y usa expresiones paisas auténticas.`;
        
        return await this.generateContent(prompt, null, provider);
    }

    async generatePaisaTrova(provider = null) {
        const prompt = `Crea una trova paisa de 4 líneas sobre Medellín, su historia o su gente. 
        Debe rimar, tener métrica tradicional y reflejar el orgullo paisa. 
        Usa un lenguaje poético pero accesible, con sabor antioqueño.`;
        
        return await this.generateContent(prompt, null, provider);
    }

    async generateHistoricalFact(provider = null) {
        const prompt = `Cuenta un dato histórico curioso y divertido sobre Medellín entre 1675 y 2025. 
        Debe ser educativo pero entretenido, narrado con tu personalidad pícara. 
        Incluye el año aproximado y hazlo sonar como una anécdota personal. Máximo 4 líneas.`;
        
        return await this.generateContent(prompt, null, provider);
    }

    async answerAsCosiaca(question, provider = null) {
        const prompt = `Pregunta del usuario: "${question}"
        
        Responde como Cosiaca, con tu humor característico pero dando información histórica precisa sobre Medellín.
        Si no sabes algo específico, admítelo con humor pero ofrece información relacionada que sí conozcas.
        Máximo 5 líneas. Sé conversacional y mantén tu personalidad pícara.`;
        
        return await this.generateContent(prompt, null, provider);
    }

    async generateTriviaQuestion(difficulty = 'intermedio', period = '1800-1900', provider = null) {
        const context = `Eres un experto en la historia de Medellín y creador de preguntas educativas.
        Conoces todos los períodos históricos desde 1675 hasta 2025.
        Creas preguntas de trivia precisas, interesantes y educativas sobre la historia de la ciudad.`;
        
        const prompt = `Crea una pregunta de trivia de dificultad ${difficulty} sobre Medellín en el período ${period}.
        
        Formato requerido:
        - Pregunta clara y específica
        - 4 opciones de respuesta (A, B, C, D)
        - Indica cuál es la respuesta correcta
        - Incluye una explicación breve de por qué es correcta
        
        La pregunta debe ser sobre eventos, personajes, lugares o datos importantes de ese período.`;
        
        return await this.generateContent(prompt, context, provider);
    }

    async generatePodcastScript(topic, duration = '5 minutos', provider = null) {
        const prompt = `Crea un guión de podcast de ${duration} sobre: "${topic}"
        
        Debe incluir:
        - Introducción enganchadora con tu saludo característico
        - Desarrollo del tema con datos históricos precisos
        - Anécdotas divertidas relacionadas
        - Cierre que conecte el pasado con el presente
        - Tu personalidad pícara y humor paisa en todo momento
        
        Escribe como si fueras a narrarlo directamente, con naturalidad.`;
        
        return await this.generateContent(prompt, null, provider);
    }

    async generateTimelineDescription(year, event, provider = null) {
        const prompt = `Describe el evento "${event}" que ocurrió en ${year} en Medellín.
        
        Incluye:
        - Qué pasó exactamente
        - Por qué fue importante
        - Cómo afectó a la gente de la época
        - Una anécdota o detalle curioso
        - Tu comentario pícaro al final
        
        Máximo 4 líneas, con tu estilo narrativo característico.`;
        
        return await this.generateContent(prompt, null, provider);
    }

    // Función para generar contenido creativo avanzado
    async generateCreativeContent(type, topic, provider = null) {
        const prompts = {
            story: `Cuenta una historia corta y divertida sobre ${topic} en la historia de Medellín. Máximo 6 líneas.`,
            poem: `Escribe un poema corto sobre ${topic} con estilo paisa. 4 estrofas máximo.`,
            dialogue: `Crea un diálogo entre Cosiaca y un personaje histórico sobre ${topic}. Máximo 8 líneas.`,
            description: `Describe vívidamente ${topic} como si fueras un testigo de la época. Máximo 5 líneas.`
        };

        const prompt = prompts[type] || prompts.story;
        return await this.generateContent(prompt, null, provider);
    }

    // Función para cambiar proveedor preferido
    setPreferredProvider(provider) {
        if (this.providers[provider]) {
            this.currentProvider = provider;
            console.log(`Proveedor preferido cambiado a: ${provider}`);
        }
    }

    // Función para obtener estado de APIs
    getProvidersStatus() {
        return Object.entries(this.providers).map(([name, config]) => ({
            name,
            active: config.active,
            current: name === this.currentProvider
        }));
    }
}

export default new AIService();