// Servicio para integración con Gemini AI
const GEMINI_API_KEY = '2881gN4mH7kXqT5cW9sP1jF0L6zR3vYxU2bEaQfJdI7uO4wVtC9sGpMhKjL5nB6vPqYxZrDcTfG8wHsJaQkXlZmWvN0bE1cR2dF3gH4jK5lM6nB7vC8xY9zR0dF1gH2jK3lM4nB5vC6xY7zR8dQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

class GeminiService {
    constructor() {
        this.apiKey = GEMINI_API_KEY;
        this.baseUrl = GEMINI_API_URL;
    }

    async generateContent(prompt, context = '') {
        try {
            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
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
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.candidates[0]?.content?.parts[0]?.text || 'No se pudo generar contenido';
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            throw error;
        }
    }

    // Generar chistes paisas con contexto histórico
    async generatePaisaJoke() {
        const context = `Eres José García "Cosiaca", el primer comediante popular de Antioquia (siglo XIX). 
        Tienes un humor pícaro, inteligente y muy paisa. Conoces toda la historia de Medellín desde 1675 hasta hoy.
        Tu estilo es contar chistes con referencias históricas, usando expresiones paisas auténticas como "mijito", "pues", "¿o qué?", etc.`;
        
        const prompt = `Cuenta un chiste corto y divertido sobre la historia de Medellín o la cultura paisa. 
        Debe ser familiar, gracioso y con tu personalidad característica. Máximo 3 líneas.`;
        
        return await this.generateContent(prompt, context);
    }

    // Generar trovas paisas
    async generatePaisaTrova() {
        const context = `Eres José García "Cosiaca", trovador y cuentero antioqueño del siglo XIX.
        Conoces la tradición oral paisa y puedes improvisar trovas sobre Medellín y Antioquia.
        Las trovas son versos de 4 líneas que riman, con métrica tradicional y sabor paisa.`;
        
        const prompt = `Crea una trova paisa de 4 líneas sobre Medellín, su historia o su gente. 
        Debe rimar, tener métrica tradicional y reflejar el orgullo paisa. Usa un lenguaje poético pero accesible.`;
        
        return await this.generateContent(prompt, context);
    }

    // Generar datos históricos curiosos
    async generateHistoricalFact() {
        const context = `Eres José García "Cosiaca", conocedor profundo de la historia de Medellín desde 1675.
        Tu especialidad es contar datos históricos de manera divertida y anecdótica, con humor paisa.
        Siempre incluyes detalles curiosos y los narras como si fueras un testigo de la época.`;
        
        const prompt = `Cuenta un dato histórico curioso y divertido sobre Medellín entre 1675 y 2025. 
        Debe ser educativo pero entretenido, narrado con tu personalidad pícara. 
        Incluye el año aproximado y hazlo sonar como una anécdota personal. Máximo 4 líneas.`;
        
        return await this.generateContent(prompt, context);
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
        
        return await this.generateContent(prompt, context);
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
        
        return await this.generateContent(prompt, context);
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
        
        return await this.generateContent(prompt, context);
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
        
        return await this.generateContent(prompt, context);
    }
}

export default new GeminiService();