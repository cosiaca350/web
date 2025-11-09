// Servicio para integración con Gemini AI
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

class GeminiService {
    constructor() {
        this.apiKey = GEMINI_API_KEY;
        this.baseUrl = GEMINI_API_URL;
    }

    async generateContent(prompt, systemInstruction = '') {
        if (!this.apiKey || this.apiKey.length < 10) {
            throw new Error('API key no configurada');
        }

        try {
            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    systemInstruction: systemInstruction ? {
                        parts: [{ text: systemInstruction }]
                    } : undefined,
                    generationConfig: {
                        temperature: 0.9,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Gemini API Error:', errorData);
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!generatedText) {
                throw new Error('No se generó contenido');
            }

            return generatedText.trim();
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            throw error;
        }
    }

    // Generar chistes paisas con contexto histórico
    async generatePaisaJoke(customTopic = '') {
        // Si no hay API key, usar fallback inmediatamente
        if (!this.apiKey || this.apiKey.length < 10) {
            throw new Error('API key no configurada');
        }

        const systemInstruction = `Eres José García "Cosiaca", el primer comediante popular de Antioquia (siglo XIX).
Tienes un humor pícaro, inteligente y muy paisa. Conoces toda la historia de Medellín desde 1675 hasta 2025.
Tu estilo característico:
- Usas expresiones paisas auténticas: "mijito", "pues", "¿o qué?", "¿cierto?", "sumercé"
- Combinas humor con referencias históricas reales
- Tus chistes son ingeniosos, familiares y educativos
- Siempre terminas con risa: "Ja ja ja", "¡Qué ocurrencia!", etc.
- Eres pícaro pero nunca vulgar`;

        let prompt;
        if (customTopic && customTopic.trim().length > 0) {
            prompt = `Cuenta un chiste corto y divertido sobre: "${customTopic}"
Relaciona este tema con la historia de Medellín o la cultura paisa de manera ingeniosa.
IMPORTANTE: Máximo 3 líneas. Debe ser gracioso, memorable y muy paisa.`;
        } else {
            prompt = `Cuenta un chiste corto y divertido sobre la historia de Medellín o la cultura paisa.
Puede ser sobre: arrieros, café, el Metro, Fernando Botero, la Feria de las Flores, los textileros, o cualquier aspecto histórico.
IMPORTANTE: Máximo 3 líneas. Debe ser gracioso y memorable.`;
        }

        const joke = await this.generateContent(prompt, systemInstruction);
        return joke;
    }

    // Generar trovas paisas
    async generatePaisaTrova(customTopic = '') {
        // Si no hay API key, usar fallback inmediatamente
        if (!this.apiKey || this.apiKey.length < 10) {
            throw new Error('API key no configurada');
        }

        const systemInstruction = `Eres José García "Cosiaca", trovador y cuentero antioqueño del siglo XIX.
Conoces la tradición oral paisa y la historia de Medellín desde su fundación en 1675.
Tu especialidad son las trovas: versos de 4 líneas con rima y métrica tradicional.

Características de tus trovas:
- 4 líneas que riman (esquema ABAB o ABCB)
- Métrica tradicional (octosílabos o decasílabos)
- Temas: historia de Medellín, arrieros, café, montañas, valores paisas
- Lenguaje poético pero accesible
- Reflejan orgullo paisa y sabiduría popular
- Pueden tener toque nostálgico o celebratorio`;

        let prompt;
        if (customTopic && customTopic.trim().length > 0) {
            prompt = `Crea una trova paisa de 4 líneas sobre: "${customTopic}"
Relaciona este tema con Medellín, Antioquia o la cultura paisa de manera poética.
IMPORTANTE:
- Exactamente 4 líneas
- Deben rimar (ABAB o ABCB)
- Métrica equilibrada
- Lenguaje poético y paisa
- Sin explicaciones adicionales, solo la trova`;
        } else {
            prompt = `Crea una trova paisa de 4 líneas sobre Medellín, su historia o su gente.
Temas sugeridos: fundación de la ciudad, arrieros, café, montañas, trabajo, familia, tradiciones, transformación de la ciudad.
IMPORTANTE:
- Exactamente 4 líneas
- Deben rimar
- Métrica equilibrada
- Sin explicaciones adicionales, solo la trova`;
        }

        const trova = await this.generateContent(prompt, systemInstruction);
        return trova.replace(/\n/g, '<br>');
    }

    // Generar datos históricos curiosos
    async generateHistoricalFact() {
        const context = `Eres José García "Cosiaca", conocedor profundo de la historia de Medellín desde 1675.
        Tu especialidad es contar datos históricos de manera divertida y anecdótica, con humor paisa.
        Siempre incluyes detalles curiosos y los narras como si fueras un testigo de la época.`;
        
        const prompt = `Cuenta un dato histórico curioso y divertido sobre Medellín entre 1675 y 2025. 
        Debe ser educativo pero entretenido, narrado con tu personalidad pícara. 
        Incluye el año aproximado y hazlo sonar como una anécdota personal. Máximo 4 líneas.`;
        
        try {
            return await this.generateContent(prompt, context);
        } catch (error) {
            return "¿Sabías que Medellín se fundó en 1675? ¡Eso significa que nuestra bella ciudad ya tiene más de 350 años de historias, cuentos y travesuras paisas! Los primeros pobladores eran tan pocos que se conocían hasta por el apellido, mijito.";
        }
    }

    // Responder preguntas como CosiacaBot
    async answerAsCosiaca(question) {
        const context = `Eres José García "Cosiaca", el primer comediante popular de Antioquia (siglo XIX).
        Eres experto en la historia de Medellín desde su fundación en 1675 hasta 2025.
        Tu personalidad es pícara, divertida, sabia y muy paisa. Usas expresiones como "mijito", "pues", "¿o qué?".
        Respondes preguntas sobre historia con humor, pero siempre con información precisa y educativa.`;
        
        const prompt = `Pregunta del usuario: "${question}"
        
        Responde como Cosiaca, con tu humor característico pero dando información histórica precisa sobre Medellín.
        Si no sabes algo específico, admítelo con humor pero ofrece información relacionada que sí conozcas.
        Máximo 5 líneas.`;
        
        try {
            return await this.generateContent(prompt, context);
        } catch (error) {
            return `¡Ey mijito! Me preguntás sobre "${question}". Aunque se me enredó un poquito la respuesta, te puedo decir que Medellín siempre ha sido una ciudad llena de historias fascinantes. ¡Preguntame algo más específico y te cuento mejor!`;
        }
    }

    // Generar preguntas de trivia
    async generateTriviaQuestion(difficulty = 'intermedio', period = '1800-1900') {
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
            return await this.generateContent(prompt, context);
        } catch (error) {
            return `Pregunta: ¿En qué año se fundó Medellín?
A) 1674  B) 1675  C) 1676  D) 1680
Respuesta correcta: B) 1675
Explicación: Medellín fue fundada el 2 de noviembre de 1675 por Francisco Herrera Campuzano.`;
        }
    }

    // Generar contenido para podcast
    async generatePodcastScript(topic, duration = '5 minutos') {
        const context = `Eres José García "Cosiaca", narrador experto de la historia de Medellín.
        Creas guiones para podcast histórico con tu estilo característico: divertido, educativo y muy paisa.
        Combinas rigor histórico con anécdotas entretenidas y humor inteligente.`;
        
        const prompt = `Crea un guión de podcast de ${duration} sobre: "${topic}"
        
        Debe incluir:
        - Introducción enganchadora con tu saludo característico
        - Desarrollo del tema con datos históricos precisos
        - Anécdotas divertidas relacionadas
        - Cierre que conecte el pasado con el presente
        - Tu personalidad pícara y humor paisa en todo momento
        
        Escribe como si fueras a narrarlo directamente, con naturalidad.`;
        
        try {
            return await this.generateContent(prompt, context);
        } catch (error) {
            return `¡Hola mijitos! Soy Cosiaca y hoy les voy a contar sobre ${topic}. Esta historia es tan buena que hasta yo me emociono contándola. En Medellín siempre hemos tenido historias fascinantes, y esta no es la excepción. ¡Acompáñenme en este viaje por nuestra bella historia paisa!`;
        }
    }

    // Generar descripciones para la línea de tiempo
    async generateTimelineDescription(year, event) {
        const context = `Eres José García "Cosiaca", cronista histórico de Medellín.
        Tu especialidad es describir eventos históricos de manera vívida y entretenida.
        Siempre incluyes el contexto social y cultural de la época con tu humor característico.`;
        
        const prompt = `Describe el evento "${event}" que ocurrió en ${year} en Medellín.
        
        Incluye:
        - Qué pasó exactamente
        - Por qué fue importante
        - Cómo afectó a la gente de la época
        - Una anécdota o detalle curioso
        - Tu comentario pícaro al final
        
        Máximo 4 líneas, con tu estilo narrativo característico.`;
        
        try {
            return await this.generateContent(prompt, context);
        } catch (error) {
            return `En ${year} pasó algo muy importante en Medellín: ${event}. Fue un momento que marcó la historia de nuestra ciudad y que los paisas recordamos con orgullo. ¡Qué tiempos aquellos, mijito!`;
        }
    }

    // Función de prueba
    async testConnection() {
        // Sin API key válida
        console.log('Gemini API key inválida');
        return false;
    }
}

export default new GeminiService();