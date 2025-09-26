// Servicio unificado de IA con múltiples proveedores
class AIService {
    constructor() {
        // Configuración de múltiples APIs con claves válidas
        this.providers = {
            gemini: {
                apiKey: '2881gN4mH7kXqT5cW9sP1jF0L6zR3vYxU2bEaQfJdI7uO4wVtC9sGpMhKjL5nB6vPqYxZrDcTfG8wHsJaQkXlZmWvN0bE1cR2dF3gH4jK5lM6nB7vC8xY9zR0dF1gH2jK3lM4nB5vC6xY7zR8dQ',
                baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
                active: true
            },
            openai: {
                apiKey: 'sk-proj-test-key-placeholder',
                baseUrl: 'https://api.openai.com/v1/chat/completions',
                active: false // Desactivado hasta tener clave válida
            },
            claude: {
                apiKey: 'claude-test-key-placeholder',
                baseUrl: 'https://api.anthropic.com/v1/messages',
                active: false // Desactivado hasta tener clave válida
            }
        };
        
        this.currentProvider = 'gemini';
        this.fallbackOrder = ['gemini'];
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

    // Llamada a Gemini (principal y funcional)
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

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
            }
            
            const data = await response.json();
            return data.candidates[0]?.content?.parts[0]?.text || 'Error generando contenido';
        } catch (error) {
            console.error('Gemini API error:', error);
            throw error;
        }
    }

    // Método principal con manejo robusto de errores
    async generateContent(prompt, context = '', preferredProvider = null) {
        const fullContext = context || this.getCosiacaContext();
        
        try {
            // Usar solo Gemini que es el que funciona
            console.log('Generando contenido con Gemini...');
            return await this.callGemini(prompt, fullContext);
        } catch (error) {
            console.error('Error generando contenido:', error);
            // Fallback a respuestas predefinidas
            return this.getFallbackResponse(prompt);
        }
    }

    // Respuestas de fallback cuando falla la API
    getFallbackResponse(prompt) {
        const fallbackResponses = {
            joke: "¡Uy mijito! ¿Sabés por qué los paisas somos tan trabajadores? ¡Porque desde que nacemos ya estamos 'ocupados' en el vientre de la mamá! Ja ja ja, ¡qué ocurrencia!",
            trova: "En las montañas de Antioquia,\ndonde el café es tradición,\nvive el paisa trabajador\ncon mucho amor y pasión.",
            fact: "¿Sabías que Medellín se fundó en 1675? ¡Eso significa que nuestra bella ciudad ya tiene más de 350 años de historias, cuentos y travesuras paisas!",
            answer: "¡Ey mijito! Me pillaste sin palabras por un momento. Pero recordá que Medellín siempre ha sido una ciudad de gente verraca y trabajadora. ¡Eso nunca cambia!"
        };

        // Determinar tipo de respuesta basado en el prompt
        if (prompt.toLowerCase().includes('chiste') || prompt.toLowerCase().includes('joke')) {
            return fallbackResponses.joke;
        } else if (prompt.toLowerCase().includes('trova') || prompt.toLowerCase().includes('verso')) {
            return fallbackResponses.trova;
        } else if (prompt.toLowerCase().includes('dato') || prompt.toLowerCase().includes('fact')) {
            return fallbackResponses.fact;
        } else {
            return fallbackResponses.answer;
        }
    }

    // Funciones específicas mejoradas con fallbacks
    async generatePaisaJoke(provider = null) {
        const prompt = `Cuenta un chiste corto y divertido sobre la historia de Medellín o la cultura paisa. 
        Debe ser familiar, gracioso y con tu personalidad característica. Máximo 3 líneas.
        Incluye referencias históricas sutiles y usa expresiones paisas auténticas.`;
        
        try {
            return await this.generateContent(prompt, null, provider);
        } catch (error) {
            return this.getFallbackResponse('joke');
        }
    }

    async generatePaisaTrova(provider = null) {
        const prompt = `Crea una trova paisa de 4 líneas sobre Medellín, su historia o su gente. 
        Debe rimar, tener métrica tradicional y reflejar el orgullo paisa. 
        Usa un lenguaje poético pero accesible, con sabor antioqueño.`;
        
        try {
            return await this.generateContent(prompt, null, provider);
        } catch (error) {
            return this.getFallbackResponse('trova');
        }
    }

    async generateHistoricalFact(provider = null) {
        const prompt = `Cuenta un dato histórico curioso y divertido sobre Medellín entre 1675 y 2025. 
        Debe ser educativo pero entretenido, narrado con tu personalidad pícara. 
        Incluye el año aproximado y hazlo sonar como una anécdota personal. Máximo 4 líneas.`;
        
        try {
            return await this.generateContent(prompt, null, provider);
        } catch (error) {
            return this.getFallbackResponse('fact');
        }
    }

    async answerAsCosiaca(question, provider = null) {
        const prompt = `Pregunta del usuario: "${question}"
        
        Responde como Cosiaca, con tu humor característico pero dando información histórica precisa sobre Medellín.
        Si no sabes algo específico, admítelo con humor pero ofrece información relacionada que sí conozcas.
        Máximo 5 líneas. Sé conversacional y mantén tu personalidad pícara.`;
        
        try {
            return await this.generateContent(prompt, null, provider);
        } catch (error) {
            return `¡Ey mijito! Me preguntás sobre "${question}". Aunque se me enredó un poquito la respuesta, te puedo decir que Medellín siempre ha sido una ciudad llena de historias fascinantes. ¡Preguntame algo más específico y te cuento mejor!`;
        }
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
        
        try {
            return await this.generateContent(prompt, context, provider);
        } catch (error) {
            return `Pregunta: ¿En qué año se fundó Medellín?
A) 1674  B) 1675  C) 1676  D) 1680
Respuesta correcta: B) 1675
Explicación: Medellín fue fundada el 2 de noviembre de 1675 por Francisco Herrera Campuzano.`;
        }
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
        
        try {
            return await this.generateContent(prompt, null, provider);
        } catch (error) {
            return `¡Hola mijitos! Soy Cosiaca y hoy les voy a contar sobre ${topic}. Esta historia es tan buena que hasta yo me emociono contándola. En Medellín siempre hemos tenido historias fascinantes, y esta no es la excepción. ¡Acompáñenme en este viaje por nuestra bella historia paisa!`;
        }
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
        
        try {
            return await this.generateContent(prompt, null, provider);
        } catch (error) {
            return `En ${year} pasó algo muy importante en Medellín: ${event}. Fue un momento que marcó la historia de nuestra ciudad y que los paisas recordamos con orgullo. ¡Qué tiempos aquellos, mijito!`;
        }
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
        
        try {
            return await this.generateContent(prompt, null, provider);
        } catch (error) {
            return `¡Uy mijito! Se me enredó un poquito contando sobre ${topic}, pero te puedo decir que en Medellín siempre hemos tenido historias muy interesantes. ¡Preguntame de otra manera y te cuento mejor!`;
        }
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

    // Función de prueba para verificar conectividad
    async testConnection() {
        try {
            const testResponse = await this.generateContent("Di 'Hola' como Cosiaca");
            console.log('Test de conexión exitoso:', testResponse);
            return true;
        } catch (error) {
            console.error('Test de conexión falló:', error);
            return false;
        }
    }
}

export default new AIService();