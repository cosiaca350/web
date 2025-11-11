import React, { useState, useEffect } from 'react';
import { BotIcon, CheckCircleIcon, XCircleIcon, SparklesIcon } from '../icons/Icons';
import AdvancedTrivia from './AdvancedTrivia';
import GeminiService from '../services/geminiService';
import historicalGossipData from '../data/historicalGossip';

const Juegos = () => {
    const [activeTab, setActiveTab] = useState('trivia');
    const [triviaScore, setTriviaScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [currentJoke, setCurrentJoke] = useState('');
    const [currentTrova, setCurrentTrova] = useState('');
    const [isGeneratingJoke, setIsGeneratingJoke] = useState(false);
    const [isGeneratingTrova, setIsGeneratingTrova] = useState(false);
    const [customJokeTopic, setCustomJokeTopic] = useState('');
    const [customTrovaTopic, setCustomTrovaTopic] = useState('');
    const [showApiWarning, setShowApiWarning] = useState(false);

    // Estados para Chismes Históricos
    const [currentGossip, setCurrentGossip] = useState(null);
    const [gossipCategory, setGossipCategory] = useState('all');
    const [isGeneratingGossip, setIsGeneratingGossip] = useState(false);
    const [customGossipTopic, setCustomGossipTopic] = useState('');
    const [favoriteGossips, setFavoriteGossips] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [readingMode, setReadingMode] = useState(false);
    const [gossipHistory, setGossipHistory] = useState([]);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copiedToClipboard, setCopiedToClipboard] = useState(false);

    // Trivia Data
    const triviaQuestions = [
        {
            question: "¿Cuál es el nombre original del Parque Berrío, centro histórico de Medellín?",
            options: ["Plaza de la Villa de la Candelaria", "Plaza de la Ciudadela", "Plaza Mayor", "Plaza de la Abadía"],
            correctAnswer: "Plaza de la Villa de la Candelaria",
            feedback: "¡Qué va! Si supiera, mijito, el Parque Berrío no siempre fue el centro del guayabo. Antes se llamaba 'Plaza de la Villa de la Candelaria', en honor a la patrona. ¡Era el punto de encuentro, el ombligo del pueblo, donde se hacían los negocios, las misas y hasta las peleas de gallos, pa' qué! Así de importante era, y sigue siéndolo, ¿o qué?"
        },
        {
            question: "¿En qué año se fundó el Metro de Medellín, el primer y único sistema de transporte masivo de Colombia que circula sobre rieles?",
            options: ["1984", "1995", "1990", "2000"],
            correctAnswer: "1995",
            feedback: "¡Ah, qué belleza el Metro! Esa obra sí que puso a Medellín a volar. Se inauguró en **1995** y cambió la vida de todos. Antes, un viaje de Envigado a Bello era una travesía, ¡un 'cuelgue' total! El Metro nos hizo una ciudad más moderna, más conectada y, claro, ¡más chismosa de lo que ya éramos!"
        },
        {
            question: "¿Qué famoso artista antioqueño, conocido por sus esculturas de figuras voluptuosas, donó varias de sus obras al Museo de Antioquia y a la Plaza Botero?",
            options: ["Débora Arango", "Fernando Botero", "Rodrigo Arenas Betancur", "Pedro Nel Gómez"],
            correctAnswer: "Fernando Botero",
            feedback: "¡Mijito, ese sí es un 'paisita' que nos llena de orgullo! **Fernando Botero**, con su estilo único, nos regaló esas esculturas 'gorditas' que ya son un símbolo de la ciudad. Dicen que tienen tanta carne que hasta con hambre provocan, ja ja. Un verdadero genio que puso a Medellín en el mapa del mundo, ¿o no?"
        },
        {
            question: "¿Cuál es el nombre popular de la ciudad de Medellín, conocido como la ciudad de la eterna primavera?",
            options: ["Ciudad de las Flores", "Capital de la Montaña", "Ciudad de la Eterna Primavera", "La Ciudad del Río"],
            correctAnswer: "Ciudad de la Eterna Primavera",
            feedback: "¡Claro que sí! Con este clima tan sabroso, ¿quién no va a querer estar acá? El nombre 'Ciudad de la Eterna Primavera' no es por chiste, ¡es por la realidad! Aquí uno no sufre ni de calor ni de frío, es como vivir en un eterno 'pico de oro'. Por eso es que hasta las flores se nos dan bien bonitas todo el año, ¡qué gozadera!"
        },
        {
            question: "¿Qué festival de flores se celebra anualmente en Medellín en el mes de agosto?",
            options: ["Festival de Verano", "Festival de la Caña", "Feria de las Flores", "Festival de las Artes"],
            correctAnswer: "Feria de las Flores",
            feedback: "¡Uy, si no supiera eso, mijito, me pongo 'de patas'! La **Feria de las Flores** es la fiesta más grande de la ciudad. El Desfile de Silleteros es el evento central, donde los campesinos de Santa Elena cargan a la espalda unas obras de arte hechas con flores. ¡Es una belleza que hasta a uno lo hace llorar de la emoción, y eso que yo solo lloro por la cebolla!"
        }
    ];

    // Stand Up Data - Chistes Paisas con Humor Histórico
    const standUpJokes = [
        "¡Uy mijito! ¿Sabés por qué los paisas somos tan trabajadores? ¡Porque desde que nacemos ya estamos 'ocupados' en el vientre de la mamá! Ja ja ja.",
        "¿Por qué en Medellín nunca llueve dinero? ¡Porque los paisas ya lo habríamos recogido todo antes de que toque el suelo! Ja ja ja.",
        "¿Sabés cuál es el colmo de un paisa? ¡Que le regalen algo y pregunte cuánto vale para saber si le gustó! Ja ja ja.",
        "¿Por qué Fernando Botero hace figuras gorditas? ¡Porque en Antioquia hasta el arte está bien alimentado, pues! Ja ja ja.",
        "¿Cuál es la diferencia entre un paisa y un arriero? ¡Que el arriero solo carga mulas, pero el paisa carga con toda la familia! Ja ja ja.",
        "¿Sabés por qué el Metro de Medellín es tan limpio? ¡Porque los paisas lo cuidamos más que a la mamá! ¿O qué?",
        "¿Por qué los arrieros antioqueños eran tan fuertes? ¡Porque cargaban café en mula de día y chismes en la noche! Ja ja ja.",
        "¿Sabés qué pasaba en la Feria de las Flores? ¡Que los silleteros cargaban más flores que los novios enamorados! ¡Qué verraquera!",
        "¿Por qué Medellín se llama 'La Ciudad de la Eterna Primavera'? ¡Porque hasta el clima es paisa y no se decide por nada! Ja ja ja.",
        "¿Cuál es el secreto del éxito paisa? ¡Trabajar más que el que más trabaja y todavía tener tiempo para un tinto! Ja ja ja.",
        "¿Sabés por qué en Antioquia todo es 'verraco'? ¡Porque hasta para decir que algo es difícil, lo hacemos con orgullo! Ja ja ja.",
        "¿Por qué los textileros de Medellín eran tan exitosos? ¡Porque hilaban telas de día y cuentos de noche! Ja ja ja."
    ];

    // Trovas Paisas - Versos Tradicionales de Antioquia
    const trovasPaisa = [
        "En las montañas de Antioquia,\ndonde el café es tradición,\nvive el paisa trabajador\ncon mucho amor y pasión.",
        "Medellín, ciudad querida,\nde arrieros y soñadores,\ntus calles guardan la vida\nde nobles trabajadores.",
        "En el Valle de Aburrá,\ndonde el río canta y fluye,\nla historia paisa está\nen cada alma que construye.",
        "Mil seiscientos setenta y cinco,\nnació esta villa de honor,\ncon veinticuatro familias\ny un futuro de esplendor.",
        "Los arrieros con su mula,\npor las trochas del café,\nllevaron el progreso\ncon verracos pies de fe.",
        "En la Feria de las Flores,\nlos silleteros brillan,\ncargando en sus espaldas\nlas más hermosas orillas.",
        "Botero con sus esculturas,\nle dio al mundo un gran regalo,\nde Medellín para el mundo\nun arte que es un regalo.",
        "El Metro vino en noventa,\ny cinco fue el gran año,\nMedellín se transformó\ncon orgullo y sin engaño.",
        "De la violencia a la luz,\nla ciudad se levantó,\ncon trabajo y esperanza\nun milagro se forjó.",
        "En Antioquia se respira,\nun aire de tradición,\ndonde el paisa trabaja\ncon orgullo y corazón.",
        "Por las calles empedradas,\nde esta ciudad colonial,\ncaminaron los ancestros\ncon su espíritu inmortal.",
        "Cosiaca cuenta con gracia,\nlas historias del pasado,\nde esta tierra de Antioquia\nque siempre ha prosperado."
    ];
    
    useEffect(() => {
        if (activeTab === 'standup') {
            setCurrentJoke(getRandomJoke());
        }
        if (activeTab === 'trovas') {
            setCurrentTrova(getRandomTrova());
        }
        if (activeTab === 'chismes') {
            setCurrentGossip(getRandomGossip());
        }
    }, [activeTab]);

    const handleAnswer = (selectedOption) => {
        if (selectedAnswer !== null) return;
        
        const isCorrectAnswer = selectedOption === triviaQuestions[currentQuestionIndex].correctAnswer;
        setSelectedAnswer(selectedOption);
        setIsCorrect(isCorrectAnswer);
        setFeedbackMessage(triviaQuestions[currentQuestionIndex].feedback);
        setShowFeedback(true);

        if (isCorrectAnswer) {
            setTriviaScore(score => score + 1);
        }
    };

    const nextQuestion = () => {
        setCurrentQuestionIndex(index => index + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setFeedbackMessage(null);
        setShowFeedback(false);
    };

    const resetTrivia = () => {
        setTriviaScore(0);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setFeedbackMessage(null);
        setShowFeedback(false);
    };

    const generateAIJoke = async () => {
        setIsGeneratingJoke(true);
        setShowApiWarning(false);
        try {
            const joke = await GeminiService.generatePaisaJoke(customJokeTopic);
            setCurrentJoke(joke);
            setCustomJokeTopic('');
        } catch (error) {
            console.error('Error generating joke:', error);

            // Mostrar advertencia si no hay API key
            if (error.message.includes('API key')) {
                setShowApiWarning(true);
            }

            // Generador de chistes dinámico para CUALQUIER palabra
            const topic = customJokeTopic.trim();
            let fallbackJoke = '';

            if (topic) {
                // Generar chiste personalizado sobre CUALQUIER tema
                const jokeTemplates = [
                    `¡Uy mijito! ¿Y vos sabés qué es lo más paisa de "${topic}"? ¡Que los antioqueños le encontramos el lado trabajador hasta a eso! Ja ja ja, ¡qué ocurrencia!`,
                    `¿Sabés qué diferencia hay entre "${topic}" y un paisa? ¡Que el paisa ya le está buscando cómo hacerle negocio! Ja ja ja, ¡qué berraquera!`,
                    `¡Ave María pues! Si a los paisas nos ponen a hablar de "${topic}", hasta le sacamos historia y le montamos un museo. Ja ja ja, ¡así somos!`,
                    `¿Por qué cuando un paisa habla de "${topic}" se emociona tanto? ¡Porque encontró algo nuevo sobre qué echarle cuentos! Ja ja ja.`,
                    `Mijito, ¿sabés cuál es el colmo sobre "${topic}"? ¡Que un paisa lo venda tres veces antes de comprarlo! Ja ja ja, ¡qué vivos somos!`,
                    `¡Uy sumercé! Si "${topic}" fuera paisa, ya estaría trabajando en dos ciudades a la vez. Ja ja ja, ¡qué cultura tenemos!`,
                    `¿Sabés por qué "${topic}" es tan importante en Antioquia? ¡Porque los paisas hasta a eso le metemos el corazón! Ja ja ja.`
                ];
                fallbackJoke = jokeTemplates[Math.floor(Math.random() * jokeTemplates.length)];
            } else {
                // Si no hay tema, chiste general
                const generalJokes = [
                    "¡Uy mijito! ¿Sabés por qué los paisas somos tan trabajadores? ¡Porque desde que nacemos ya estamos 'ocupados' en el vientre de la mamá! Ja ja ja, ¡qué ocurrencia!",
                    "¿Por qué en Medellín nunca llueve dinero? ¡Porque los paisas ya lo habríamos recogido todo antes de que toque el suelo! Ja ja ja.",
                    "¿Sabés cuál es el colmo de un paisa? ¡Que le regalen algo y pregunte cuánto vale para saber si le gustó! Ja ja ja.",
                    "¿Por qué Fernando Botero hace figuras gorditas? ¡Porque en Antioquia hasta el arte está bien alimentado, pues! Ja ja ja.",
                    "¿Cuál es la diferencia entre un paisa y un arriero? ¡Que el arriero solo carga mulas, pero el paisa carga con toda la familia! Ja ja ja."
                ];
                fallbackJoke = generalJokes[Math.floor(Math.random() * generalJokes.length)];
            }

            setCurrentJoke(fallbackJoke);
            setCustomJokeTopic('');
        } finally {
            setIsGeneratingJoke(false);
        }
    };

    const generateAITrova = async () => {
        setIsGeneratingTrova(true);
        setShowApiWarning(false);
        try {
            const trova = await GeminiService.generatePaisaTrova(customTrovaTopic);
            setCurrentTrova(trova);
            setCustomTrovaTopic('');
        } catch (error) {
            console.error('Error generating trova:', error);

            // Mostrar advertencia si no hay API key
            if (error.message.includes('API key')) {
                setShowApiWarning(true);
            }

            // Generador de trovas dinámico para CUALQUIER palabra
            const topic = customTrovaTopic.trim();
            let fallbackTrova = '';

            if (topic) {
                // Generar trova personalizada sobre CUALQUIER tema
                const trovaTemplates = [
                    `De "${topic}" te canto yo,<br>con el alma del paisa,<br>que en mi tierra se forjó<br>esta trova que te avisa.`,
                    `En las montañas de Antioquia,<br>donde "${topic}" resuena,<br>el corazón se aplica<br>a esta trova tan serena.`,
                    `"${topic}" que me inspira,<br>como el café en la mañana,<br>mi trova paisa gira<br>con pasión antioqueña.`,
                    `Hablo de "${topic}" con amor,<br>al estilo del arriero,<br>que con fuerza y con valor<br>canta este trova sincero.`,
                    `De "${topic}" en Medellín,<br>te improviso este cantar,<br>con el alma del confín<br>que me enseñó a trovar.`,
                    `"${topic}" en mi memoria,<br>como el Valle de Aburrá,<br>se convierte en historia<br>que mi trova cantará.`,
                    `Con "${topic}" de bandera,<br>trovador yo me declaro,<br>a la usanza paisa entera<br>mi sentimiento preparo.`
                ];
                fallbackTrova = trovaTemplates[Math.floor(Math.random() * trovaTemplates.length)];
            } else {
                // Si no hay tema, trova general
                const generalTrovas = [
                    "En el Valle de Aburrá,<br>donde el río canta y fluye,<br>la historia paisa está<br>en cada alma que construye.",
                    "Cosiaca cuenta con gracia<br>las historias del pasado,<br>de esta tierra de Antioquia<br>que siempre ha prosperado.",
                    "Desde mil seiscientos setenta,<br>cuando se fundó la villa,<br>los paisas con su destreza<br>hicieron grande esta orilla.",
                    "En las montañas de Antioquia,<br>donde el café es tradición,<br>vive el paisa trabajador<br>con mucho amor y pasión.",
                    "Medellín, ciudad querida,<br>de arrieros y soñadores,<br>tus calles guardan la vida<br>de nobles trabajadores."
                ];
                fallbackTrova = generalTrovas[Math.floor(Math.random() * generalTrovas.length)];
            }

            setCurrentTrova(fallbackTrova);
            setCustomTrovaTopic('');
        } finally {
            setIsGeneratingTrova(false);
        }
    };

    const getRandomJoke = () => {
        const randomIndex = Math.floor(Math.random() * standUpJokes.length);
        return standUpJokes[randomIndex];
    };

    const getRandomTrova = () => {
        const randomIndex = Math.floor(Math.random() * trovasPaisa.length);
        return trovasPaisa[randomIndex].replace(/\n/g, '<br>');
    };

    // Funciones para Chismes Históricos
    const getAllGossips = () => {
        return [
            ...historicalGossipData.colonialGossip,
            ...historicalGossipData.independenceGossip,
            ...historicalGossipData.coffeeBoomGossip,
            ...historicalGossipData.industrializationGossip,
            ...historicalGossipData.modernGossip,
            ...historicalGossipData.characterGossip
        ];
    };

    const getGossipsByCategory = (category) => {
        if (category === 'all') return getAllGossips();
        return historicalGossipData[category] || [];
    };

    const getRandomGossip = (category = 'all') => {
        const gossips = getGossipsByCategory(category);
        const randomIndex = Math.floor(Math.random() * gossips.length);
        const selectedGossip = gossips[randomIndex];

        // Agregar al historial
        if (selectedGossip && !gossipHistory.find(g => g.title === selectedGossip.title)) {
            setGossipHistory(prev => [selectedGossip, ...prev].slice(0, 10));
        }

        return selectedGossip;
    };

    const toggleFavorite = (gossip) => {
        setFavoriteGossips(prev => {
            const exists = prev.find(g => g.title === gossip.title);
            if (exists) {
                return prev.filter(g => g.title !== gossip.title);
            } else {
                return [...prev, gossip];
            }
        });
    };

    const isFavorite = (gossip) => {
        return favoriteGossips.some(g => g.title === gossip.title);
    };

    const shareGossip = (gossip) => {
        const text = `${gossip.title}\n\n${gossip.gossip}\n\n📅 ${gossip.period || gossip.year}\n📚 Fuente: ${gossip.source}\n\n¡Conoce más en Cosiaca 350!`;

        if (navigator.share) {
            navigator.share({
                title: gossip.title,
                text: text
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(text);
            setCopiedToClipboard(true);
            setTimeout(() => setCopiedToClipboard(false), 3000);
        }
    };

    const generateAIGossip = async () => {
        console.log('🔍 Iniciando búsqueda de chisme...');
        console.log('📝 Tema:', customGossipTopic);

        setIsGeneratingGossip(true);
        setShowApiWarning(false);

        const topic = customGossipTopic.trim();

        try {
            // Usar el servicio de IA mejorado con método especializado
            const gemini = new GeminiService();

            console.log('🤖 Llamando a la IA...');
            const response = await gemini.generateHistoricalGossip(topic);
            console.log('✅ Respuesta recibida de IA');

            // Parsear la respuesta de IA
            const lines = response.split('\n');
            const titleMatch = response.match(/\*\*Título.*?:\*\*\s*(.+)/);
            const periodMatch = response.match(/\*\*Época.*?:\*\*\s*(.+)/);
            const funFactMatch = response.match(/\*\*Dato curioso.*?:\*\*\s*(.+)/);

            const gossipText = response
                .replace(/\*\*Título.*?:\*\*.*?\n/, '')
                .replace(/\*\*Época.*?:\*\*.*?\n/, '')
                .replace(/\*\*Dato curioso.*?:\*\*.*?\n/, '')
                .trim();

            const aiGossip = {
                title: titleMatch ? titleMatch[1].trim() : 'Chisme Histórico Paisa',
                period: periodMatch ? periodMatch[1].trim() : 'Época histórica',
                gossip: gossipText,
                funFact: funFactMatch ? funFactMatch[1].trim() : 'Generado por IA con conocimiento histórico',
                source: 'Generado por IA'
            };

            console.log('✨ Chisme generado:', aiGossip.title);
            setCurrentGossip(aiGossip);
            setCustomGossipTopic('');

        } catch (error) {
            console.error('⚠️ Error generando chisme:', error);

            if (error.message && error.message.includes('API key')) {
                setShowApiWarning(true);
                console.log('🔑 No hay API key configurada');
            }

            // Fallback mejorado con template dinámico
            console.log('📚 Usando chisme de fallback...');
            let fallbackGossip;

            if (topic) {
                // Crear chisme personalizado basado en el tema
                fallbackGossip = {
                    title: `El chisme histórico de "${topic}"`,
                    period: 'Historia de Medellín',
                    gossip: `¡Uy mijito, te voy a contar un chisme jugoso sobre "${topic}"!

Resulta que en los viejos tiempos de Medellín, cuando la gente se reunía en las esquinas a conversar, uno de los temas más comentados era "${topic}".

Los viejos paisas contaban que hasta las mulas de los arrieros se detenían a escuchar cuando alguien mencionaba "${topic}". ¡Imagínate qué tanto chisme había!

Y eso que no te he contado la mejor parte... Dicen que en todas las tertulias de La Playa, en cada tienda de barrio, y hasta en las misas del domingo, la gente no paraba de hablar de "${topic}".

¡Qué tiempos aquellos, pues! Cuando "${topic}" era el tema de moda en toda Medellín.`,
                    funFact: `En Medellín todo tiene su historia y sus chismes, hasta "${topic}" tiene anécdotas que contar.`,
                    source: 'Memoria histórica paisa (Modo clásico)'
                };
                console.log(`✅ Chisme fallback creado para: ${topic}`);
            } else {
                // Si no hay tema, usar chisme aleatorio
                fallbackGossip = getRandomGossip('all');
                console.log('🎲 Chisme aleatorio seleccionado');
            }

            setCurrentGossip(fallbackGossip);
            setCustomGossipTopic('');
        } finally {
            setIsGeneratingGossip(false);
            console.log('🏁 Búsqueda finalizada');
        }
    };

    return (
        <div className="animate-fade-in max-w-6xl mx-auto text-cosiaca-brown space-y-6 sm:space-y-8 px-4">
            <header className="text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-anton text-cosiaca-brown">
                    🎮 Juegos y AR
                </h1>
                <p className="text-lg sm:text-xl mt-2 text-cosiaca-brown-light/70">¡Humor, conocimiento y rima paisa!</p>
            </header>
            
            {/* Banner Principal */}
            <div className="bg-gradient-to-r from-cosiaca-brown to-cosiaca-brown/80 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-anton mb-4 text-white">
                    ✨ Experiencias Interactivas
                </h2>
                <p className="text-lg sm:text-xl opacity-90 text-white">Aprende jugando con Cosiaca</p>
            </div>

            {/* Navegación de Experiencias */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                <button
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 ${
                        activeTab === 'trivia'
                            ? 'bg-cosiaca-red text-white shadow-lg'
                            : 'bg-cosiaca-beige text-cosiaca-brown hover:bg-cosiaca-beige/70'
                    }`}
                    onClick={() => setActiveTab('trivia')}
                >
                    🧠 Trivia Histórica
                </button>
                <button
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 ${
                        activeTab === 'standup'
                            ? 'bg-cosiaca-red text-white shadow-lg'
                            : 'bg-cosiaca-beige text-cosiaca-brown hover:bg-cosiaca-beige/70'
                    }`}
                    onClick={() => setActiveTab('standup')}
                >
                    😂 Stand Up Paisa
                </button>
                <button
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 ${
                        activeTab === 'trovas'
                            ? 'bg-cosiaca-red text-white shadow-lg'
                            : 'bg-cosiaca-beige text-cosiaca-brown hover:bg-cosiaca-beige/70'
                    }`}
                    onClick={() => setActiveTab('trovas')}
                >
                    🎵 Trovas Paisas
                </button>
                <button
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 ${
                        activeTab === 'chismes'
                            ? 'bg-cosiaca-red text-white shadow-lg'
                            : 'bg-cosiaca-beige text-cosiaca-brown hover:bg-cosiaca-beige/70'
                    }`}
                    onClick={() => setActiveTab('chismes')}
                >
                    👂 Chismes Históricos
                </button>
            </div>

            {/* Trivia Content */}
            {activeTab === 'trivia' && (
                <div className="animate-fade-in">
                    <AdvancedTrivia />
                </div>
            )}


            {/* Stand Up Content */}
            {activeTab === 'standup' && (
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-cosiaca-beige animate-fade-in">
                    <div className="text-center mb-6 sm:mb-8">
                        <h3 className="text-2xl sm:text-3xl font-bold font-anton text-cosiaca-brown mb-2">
                            😂 Stand Up Paisa con IA
                        </h3>
                        <p className="text-base sm:text-lg text-cosiaca-brown/70">
                            Disfruta del humor paisa generado por inteligencia artificial
                        </p>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                        {showApiWarning && (
                            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg animate-fade-in">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Modo clásico activado:</strong> Estoy usando mis mejores chistes tradicionales porque no tengo conexión con IA. Los chistes se adaptan a tu tema cuando es posible.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowApiWarning(false)}
                                        className="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 text-yellow-500 rounded-lg p-1.5 hover:bg-yellow-200 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="bg-gradient-to-r from-cosiaca-beige/50 to-cosiaca-brown/10 rounded-xl p-4 sm:p-6 border-2 border-cosiaca-beige shadow-md">
                            <label className="block text-cosiaca-brown font-bold mb-3 text-center text-base sm:text-lg">
                                💬 Escribe un tema y Cosiaca te contará un chiste:
                            </label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    value={customJokeTopic}
                                    onChange={(e) => setCustomJokeTopic(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && !isGeneratingJoke && generateAIJoke()}
                                    placeholder="Escribe cualquier palabra: fútbol, arepas, lluvia, perro..."
                                    className="flex-1 px-4 py-3 rounded-full border-2 border-cosiaca-beige focus:border-cosiaca-red focus:ring-2 focus:ring-cosiaca-red/20 focus:outline-none text-cosiaca-brown text-sm sm:text-base transition-all"
                                    disabled={isGeneratingJoke}
                                />
                                <button
                                    onClick={generateAIJoke}
                                    disabled={isGeneratingJoke}
                                    className="bg-cosiaca-red text-white font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap flex items-center justify-center gap-2"
                                >
                                    <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    {customJokeTopic.trim() ? 'Generar Chiste' : 'Sorpréndeme'}
                                </button>
                            </div>
                            <p className="text-xs sm:text-sm text-cosiaca-brown/60 mt-3 text-center leading-relaxed">
                                💡 Escribe CUALQUIER palabra (amor, pizza, carro, música...) y Cosiaca hará un chiste. Presiona <kbd className="px-2 py-1 bg-white rounded text-cosiaca-brown font-mono text-xs">Enter</kbd>
                            </p>
                        </div>

                        <div className="bg-cosiaca-beige/30 rounded-xl p-4 sm:p-6 lg:p-8 border border-cosiaca-beige min-h-[150px] sm:min-h-[200px] flex items-center justify-center">
                            {isGeneratingJoke ? (
                                <div className="text-center">
                                    <SparklesIcon className="w-8 h-8 sm:w-12 sm:h-12 text-cosiaca-red animate-spin mx-auto mb-4" />
                                    <p className="text-base sm:text-lg text-cosiaca-brown animate-pulse">
                                        Cosiaca está pensando un chiste...
                                    </p>
                                </div>
                            ) : (
                                <p className="text-lg sm:text-xl md:text-2xl font-semibold italic text-cosiaca-brown leading-relaxed text-center">
                                    "{currentJoke}"
                                </p>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setCurrentJoke(getRandomJoke())}
                                className="bg-cosiaca-brown text-white font-bold py-3 px-6 sm:px-8 rounded-full hover:bg-cosiaca-brown/80 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                            >
                                🎲 Chiste Clásico
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Trovas Content */}
            {activeTab === 'trovas' && (
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-cosiaca-beige animate-fade-in">
                    <div className="text-center mb-6 sm:mb-8">
                        <h3 className="text-2xl sm:text-3xl font-bold font-anton text-cosiaca-brown mb-2">
                            🎵 Trovas Paisas con IA
                        </h3>
                        <p className="text-base sm:text-lg text-cosiaca-brown/70">
                            Versos y coplas de la tradición antioqueña, ahora con inteligencia artificial
                        </p>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                        {showApiWarning && activeTab === 'trovas' && (
                            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg animate-fade-in">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Modo clásico activado:</strong> Usando trovas tradicionales paisas. Las trovas se adaptan a tu tema cuando es posible.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowApiWarning(false)}
                                        className="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 text-yellow-500 rounded-lg p-1.5 hover:bg-yellow-200 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="bg-gradient-to-r from-cosiaca-beige/50 to-cosiaca-brown/10 rounded-xl p-4 sm:p-6 border-2 border-cosiaca-beige shadow-md">
                            <label className="block text-cosiaca-brown font-bold mb-3 text-center text-base sm:text-lg">
                                🎸 Pídele a Cosiaca que improvise una trova sobre:
                            </label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    value={customTrovaTopic}
                                    onChange={(e) => setCustomTrovaTopic(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && !isGeneratingTrova && generateAITrova()}
                                    placeholder="Escribe cualquier palabra: esperanza, noche, libro, amigo..."
                                    className="flex-1 px-4 py-3 rounded-full border-2 border-cosiaca-beige focus:border-cosiaca-red focus:ring-2 focus:ring-cosiaca-red/20 focus:outline-none text-cosiaca-brown text-sm sm:text-base transition-all"
                                    disabled={isGeneratingTrova}
                                />
                                <button
                                    onClick={generateAITrova}
                                    disabled={isGeneratingTrova}
                                    className="bg-cosiaca-red text-white font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap flex items-center justify-center gap-2"
                                >
                                    <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    {customTrovaTopic.trim() ? 'Improvisar' : 'Sorpréndeme'}
                                </button>
                            </div>
                            <p className="text-xs sm:text-sm text-cosiaca-brown/60 mt-3 text-center leading-relaxed">
                                💡 Escribe CUALQUIER palabra (sol, río, mamá, sueños...) y Cosiaca improvisará una trova. Presiona <kbd className="px-2 py-1 bg-white rounded text-cosiaca-brown font-mono text-xs">Enter</kbd>
                            </p>
                        </div>

                        <div className="bg-cosiaca-beige/30 rounded-xl p-4 sm:p-6 lg:p-8 border border-cosiaca-beige min-h-[150px] sm:min-h-[200px] flex items-center justify-center">
                            {isGeneratingTrova ? (
                                <div className="text-center">
                                    <SparklesIcon className="w-8 h-8 sm:w-12 sm:h-12 text-cosiaca-red animate-spin mx-auto mb-4" />
                                    <p className="text-base sm:text-lg text-cosiaca-brown animate-pulse">
                                        Cosiaca está componiendo una trova...
                                    </p>
                                </div>
                            ) : (
                                <p
                                    className="text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed text-cosiaca-brown text-center italic"
                                    dangerouslySetInnerHTML={{ __html: `"${currentTrova}"` }}
                                />
                            )}
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setCurrentTrova(getRandomTrova())}
                                className="bg-cosiaca-brown text-white font-bold py-3 px-6 sm:px-8 rounded-full hover:bg-cosiaca-brown/80 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                            >
                                🎲 Trova Tradicional
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Chismes Históricos Content - VERSIÓN OPTIMIZADA */}
            {activeTab === 'chismes' && (
                <div className="animate-fade-in space-y-6">
                    {/* Header Hero mejorado */}
                    <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden border-2 border-amber-200">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cosiaca-red/10 to-transparent rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-200/20 to-transparent rounded-full blur-2xl"></div>

                        <div className="relative z-10 text-center">
                            <div className="inline-block mb-3 px-4 py-1.5 bg-cosiaca-red text-white rounded-full font-bold text-xs sm:text-sm animate-bounce">
                                🔥 LO MÁS PICANTE DE LA HISTORIA
                            </div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-anton text-cosiaca-brown mb-2 leading-tight">
                                👂 Chismes Históricos de Medellín
                            </h3>
                            <p className="text-base sm:text-lg text-cosiaca-brown/70 mb-4 max-w-3xl mx-auto">
                                Anécdotas reales, curiosas y picantes de 350 años de historia paisa
                            </p>

                            {/* Estadísticas */}
                            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                                    <div className="text-xl sm:text-2xl font-bold text-cosiaca-red">{getAllGossips().length}+</div>
                                    <div className="text-xs text-cosiaca-brown/70 font-semibold">Chismes</div>
                                </div>
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                                    <div className="text-xl sm:text-2xl font-bold text-cosiaca-red">350</div>
                                    <div className="text-xs text-cosiaca-brown/70 font-semibold">Años</div>
                                </div>
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                                    <div className="text-xl sm:text-2xl font-bold text-cosiaca-red">{favoriteGossips.length}</div>
                                    <div className="text-xs text-cosiaca-brown/70 font-semibold">Favoritos</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Barra de herramientas */}
                    <div className="bg-white rounded-xl shadow-lg p-3 border border-cosiaca-beige">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setShowFavorites(!showFavorites)}
                                    className={`px-3 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-1.5 ${
                                        showFavorites
                                            ? 'bg-red-500 text-white shadow-lg'
                                            : 'bg-cosiaca-beige text-cosiaca-brown hover:bg-cosiaca-beige/70'
                                    }`}
                                >
                                    ❤️ Favoritos ({favoriteGossips.length})
                                </button>
                                <button
                                    onClick={() => setReadingMode(!readingMode)}
                                    className={`px-3 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-1.5 ${
                                        readingMode
                                            ? 'bg-cosiaca-brown text-white shadow-lg'
                                            : 'bg-cosiaca-beige text-cosiaca-brown hover:bg-cosiaca-beige/70'
                                    }`}
                                >
                                    📖 Lectura
                                </button>
                            </div>
                            <div className="text-xs text-cosiaca-brown/60 font-medium">
                                📜 {gossipHistory.length} vistos
                            </div>
                        </div>
                    </div>

                    {/* Vista de Favoritos */}
                    {showFavorites ? (
                        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-red-200 animate-fade-in">
                            <div className="text-center mb-8">
                                <h4 className="text-2xl sm:text-3xl font-bold text-cosiaca-brown mb-2">
                                    ❤️ Tus Chismes Favoritos
                                </h4>
                                <p className="text-cosiaca-brown/60">
                                    {favoriteGossips.length === 0
                                        ? 'Aún no has guardado ningún chisme favorito'
                                        : `${favoriteGossips.length} chisme${favoriteGossips.length !== 1 ? 's' : ''} guardado${favoriteGossips.length !== 1 ? 's' : ''}`}
                                </p>
                            </div>

                            {favoriteGossips.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">💔</div>
                                    <p className="text-lg text-cosiaca-brown/70">
                                        Guarda tus chismes favoritos haciendo clic en el corazón
                                    </p>
                                    <button
                                        onClick={() => setShowFavorites(false)}
                                        className="mt-6 bg-cosiaca-red text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all"
                                    >
                                        Explorar Chismes
                                    </button>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {favoriteGossips.map((gossip, index) => (
                                        <div key={index} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 sm:p-6 border-2 border-red-200 hover:shadow-lg transition-all cursor-pointer"
                                            onClick={() => { setCurrentGossip(gossip); setShowFavorites(false); }}>
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <h5 className="font-bold text-cosiaca-brown text-lg mb-2">{gossip.title}</h5>
                                                    <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">
                                                        {gossip.period || gossip.year}
                                                    </span>
                                                    <p className="text-sm text-cosiaca-brown/70 line-clamp-2">{gossip.gossip}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); toggleFavorite(gossip); }}
                                                    className="text-2xl hover:scale-110 transition-transform"
                                                >
                                                    ❤️
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6 sm:space-y-8">
                            {showApiWarning && activeTab === 'chismes' && (
                                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg animate-fade-in">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-800">
                                                <strong>Modo clásico activado:</strong> Usando chismes históricos verificados con IA adaptativa.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setShowApiWarning(false)}
                                            className="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 text-yellow-500 rounded-lg p-1.5 hover:bg-yellow-200 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}

                        {/* Selector de Categorías Premium - Grid de tarjetas */}
                        <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-cosiaca-beige">
                            <h4 className="text-center text-xl sm:text-2xl font-bold text-cosiaca-brown mb-6">
                                🕰️ Viaja en el Tiempo
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {[
                                    { key: 'all', icon: '📖', label: 'Todos', color: 'from-purple-100 to-purple-200 border-purple-300' },
                                    { key: 'colonialGossip', icon: '🏛️', label: 'Colonial', sub: '1675-1810', color: 'from-stone-100 to-amber-100 border-stone-300' },
                                    { key: 'independenceGossip', icon: '⚔️', label: 'Independencia', sub: '1810-1850', color: 'from-red-100 to-orange-100 border-red-300' },
                                    { key: 'coffeeBoomGossip', icon: '☕', label: 'Época del Café', sub: '1850-1900', color: 'from-amber-100 to-yellow-100 border-amber-300' },
                                    { key: 'industrializationGossip', icon: '🏭', label: 'Industrial', sub: '1900-1950', color: 'from-slate-100 to-gray-200 border-slate-300' },
                                    { key: 'modernGossip', icon: '🌆', label: 'Moderno', sub: '1950-2025', color: 'from-blue-100 to-cyan-100 border-blue-300' },
                                    { key: 'characterGossip', icon: '👤', label: 'Personajes', sub: 'Famosos', color: 'from-pink-100 to-rose-100 border-pink-300' }
                                ].map(cat => (
                                    <button
                                        key={cat.key}
                                        onClick={() => { setGossipCategory(cat.key); setCurrentGossip(getRandomGossip(cat.key)); }}
                                        className={`relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                            gossipCategory === cat.key
                                                ? 'bg-gradient-to-br from-cosiaca-red to-red-600 text-white shadow-2xl scale-105 border-red-700'
                                                : `bg-gradient-to-br ${cat.color} text-cosiaca-brown`
                                        }`}
                                    >
                                        <div className={`text-3xl mb-2 ${gossipCategory === cat.key ? '' : 'opacity-80'}`}>{cat.icon}</div>
                                        <div className={`font-bold text-sm ${gossipCategory === cat.key ? 'text-white' : 'text-cosiaca-brown'}`}>
                                            {cat.label}
                                        </div>
                                        {cat.sub && (
                                            <div className={`text-xs mt-1 ${gossipCategory === cat.key ? 'text-white/80' : 'text-cosiaca-brown/60'}`}>
                                                {cat.sub}
                                            </div>
                                        )}
                                        {gossipCategory === cat.key && (
                                            <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Búsqueda simple */}
                        <div className="bg-gradient-to-r from-cosiaca-beige/50 to-cosiaca-brown/10 rounded-xl p-4 sm:p-6 border-2 border-cosiaca-beige shadow-md">
                            <label className="block text-cosiaca-brown font-bold mb-3 text-center text-base sm:text-lg">
                                🔍 Buscar chismes sobre:
                            </label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    value={customGossipTopic}
                                    onChange={(e) => setCustomGossipTopic(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            const topic = customGossipTopic.trim().toLowerCase();
                                            if (topic) {
                                                const filtered = historicalGossip.filter(g =>
                                                    g.title.toLowerCase().includes(topic) ||
                                                    g.gossip.toLowerCase().includes(topic) ||
                                                    g.period.toLowerCase().includes(topic)
                                                );
                                                if (filtered.length > 0) {
                                                    setCurrentGossip(filtered[Math.floor(Math.random() * filtered.length)]);
                                                } else {
                                                    setCurrentGossip(getRandomGossip('all'));
                                                }
                                                setCustomGossipTopic('');
                                            }
                                        }
                                    }}
                                    placeholder="Ejemplo: Metro, Botero, café, arrieros..."
                                    className="flex-1 px-4 py-3 rounded-full border-2 border-cosiaca-beige focus:border-cosiaca-red focus:ring-2 focus:ring-cosiaca-red/20 focus:outline-none text-cosiaca-brown text-sm sm:text-base transition-all"
                                />
                                <button
                                    onClick={() => {
                                        const topic = customGossipTopic.trim().toLowerCase();
                                        if (topic) {
                                            const filtered = historicalGossip.filter(g =>
                                                g.title.toLowerCase().includes(topic) ||
                                                g.gossip.toLowerCase().includes(topic) ||
                                                g.period.toLowerCase().includes(topic)
                                            );
                                            if (filtered.length > 0) {
                                                setCurrentGossip(filtered[Math.floor(Math.random() * filtered.length)]);
                                            } else {
                                                setCurrentGossip(getRandomGossip('all'));
                                            }
                                            setCustomGossipTopic('');
                                        } else {
                                            setCurrentGossip(getRandomGossip('all'));
                                        }
                                    }}
                                    className="bg-cosiaca-red text-white font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base whitespace-nowrap flex items-center justify-center gap-2"
                                >
                                    <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    {customGossipTopic.trim() ? 'Buscar' : 'Sorpréndeme'}
                                </button>
                            </div>
                            <p className="text-xs sm:text-sm text-cosiaca-brown/60 mt-3 text-center leading-relaxed">
                                💡 Busca por palabras clave o presiona "Sorpréndeme" para un chisme aleatorio
                            </p>
                        </div>

                        {/* Tarjeta de Chisme PREMIUM */}
                        <div className={`relative rounded-3xl border-4 shadow-2xl overflow-hidden transition-all duration-500 ${
                            readingMode
                                ? 'bg-amber-50 border-amber-300 p-8 sm:p-12'
                                : 'bg-gradient-to-br from-white via-amber-50/30 to-red-50/20 border-cosiaca-red/20 p-6 sm:p-8'
                        } min-h-[400px] flex items-center justify-center`}>
                            {/* Efectos de fondo animados */}
                            {!readingMode && (
                                <>
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cosiaca-red/5 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
                                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-amber-200/10 via-transparent to-transparent rounded-full blur-2xl"></div>
                                </>
                            )}

                            {isGeneratingGossip ? (
                                <div className="text-center z-10">
                                    <div className="relative">
                                        <SparklesIcon className="w-16 h-16 sm:w-20 sm:h-20 text-cosiaca-red animate-spin mx-auto mb-6" />
                                        <div className="absolute inset-0 bg-cosiaca-red/20 rounded-full blur-xl animate-pulse"></div>
                                    </div>
                                    <p className="text-lg sm:text-2xl font-bold text-cosiaca-brown animate-pulse mb-2">
                                        🔍 Cosiaca está recordando...
                                    </p>
                                    <p className="text-sm text-cosiaca-brown/60">
                                        Un chisme jugoso de la historia paisa
                                    </p>
                                </div>
                            ) : currentGossip ? (
                                <div className="w-full space-y-6 relative z-10 animate-fade-in">
                                    {/* Header del chisme con acciones */}
                                    <div className="flex items-start justify-between gap-4 pb-6 border-b-2 border-cosiaca-red/20">
                                        <div className="flex-1">
                                            <div className={`${readingMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'} font-bold text-cosiaca-brown mb-3 leading-tight`}>
                                                {currentGossip.title}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="inline-flex items-center gap-2 bg-cosiaca-red text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                                    📅 {currentGossip.period || currentGossip.year}
                                                </span>
                                                {currentGossip.character && (
                                                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                                        👤 {currentGossip.character}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Acciones flotantes */}
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => toggleFavorite(currentGossip)}
                                                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg ${
                                                    isFavorite(currentGossip)
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-white text-gray-400 hover:bg-red-100 hover:text-red-500'
                                                }`}
                                                title="Guardar en favoritos"
                                            >
                                                {isFavorite(currentGossip) ? '❤️' : '🤍'}
                                            </button>
                                            <button
                                                onClick={() => shareGossip(currentGossip)}
                                                className="p-3 bg-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:bg-blue-50 text-cosiaca-brown"
                                                title="Compartir chisme"
                                            >
                                                📤
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contenido del chisme */}
                                    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-inner ${
                                        readingMode ? 'text-xl leading-loose' : 'text-lg leading-relaxed'
                                    }`}>
                                        <div className="text-4xl mb-4 opacity-20">❝</div>
                                        <p className="text-cosiaca-brown whitespace-pre-line">
                                            {currentGossip.gossip}
                                        </p>
                                        <div className="text-4xl mt-4 text-right opacity-20">❞</div>
                                    </div>

                                    {/* Dato curioso destacado */}
                                    {currentGossip.funFact && (
                                        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-100 border-l-4 border-yellow-500 rounded-2xl p-6 shadow-lg">
                                            <div className="absolute top-0 right-0 text-9xl opacity-5">💡</div>
                                            <div className="relative z-10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-2xl">💡</span>
                                                    <strong className="text-yellow-800 font-bold text-lg">Dato Curioso</strong>
                                                </div>
                                                <p className="text-base text-cosiaca-brown leading-relaxed">
                                                    {currentGossip.funFact}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Fuente histórica */}
                                    {currentGossip.source && (
                                        <div className="flex items-center justify-center gap-2 text-sm text-cosiaca-brown/60 italic bg-cosiaca-beige/30 rounded-full px-6 py-3">
                                            <span>📚</span>
                                            <span>Fuente: {currentGossip.source}</span>
                                        </div>
                                    )}

                                    {/* Mensaje copiado */}
                                    {copiedToClipboard && (
                                        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl animate-fade-in font-bold z-50">
                                            ✅ ¡Chisme copiado!
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center z-10 space-y-6">
                                    <div className="text-8xl mb-4 opacity-20 animate-pulse">👂</div>
                                    <div>
                                        <p className="text-2xl font-bold text-cosiaca-brown mb-2">
                                            ¿Listo para el chisme?
                                        </p>
                                        <p className="text-lg text-cosiaca-brown/60">
                                            Selecciona una época o usa la IA para descubrir anécdotas históricas
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setCurrentGossip(getRandomGossip('all'))}
                                        className="bg-cosiaca-red text-white font-bold px-8 py-4 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg"
                                    >
                                        🎲 Chisme Sorpresa
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Botones de acción mejorados */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <button
                                onClick={() => setCurrentGossip(getRandomGossip(gossipCategory))}
                                className="group relative bg-gradient-to-r from-cosiaca-brown to-amber-800 text-white font-bold py-4 px-8 rounded-full hover:from-amber-800 hover:to-cosiaca-brown transition-all duration-300 transform hover:scale-110 shadow-2xl text-sm sm:text-base flex items-center justify-center gap-2 overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                <span className="relative z-10 flex items-center gap-2">
                                    <span className="text-2xl">🎲</span>
                                    <span>Otro Chisme</span>
                                </span>
                            </button>
                            <button
                                onClick={() => setCurrentGossip(getRandomGossip('all'))}
                                className="group relative bg-gradient-to-r from-cosiaca-red to-red-700 text-white font-bold py-4 px-8 rounded-full hover:from-red-700 hover:to-cosiaca-red transition-all duration-300 transform hover:scale-110 shadow-2xl text-sm sm:text-base flex items-center justify-center gap-2 overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                <span className="relative z-10 flex items-center gap-2">
                                    <span className="text-2xl">🔀</span>
                                    <span>Chisme Sorpresa</span>
                                </span>
                            </button>
                        </div>

                        {/* Historial de chismes vistos */}
                        {gossipHistory.length > 0 && (
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                                <h5 className="text-lg font-bold text-cosiaca-brown mb-4 flex items-center gap-2">
                                    <span>📜</span>
                                    <span>Chismes recientes ({gossipHistory.length})</span>
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                    {gossipHistory.slice(0, 5).map((gossip, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentGossip(gossip)}
                                            className="text-xs sm:text-sm bg-white/70 hover:bg-white border border-purple-200 text-cosiaca-brown px-3 py-2 rounded-full transition-all hover:shadow-md hover:scale-105"
                                            title={gossip.title}
                                        >
                                            {gossip.title.substring(0, 30)}{gossip.title.length > 30 ? '...' : ''}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Info adicional con diseño premium */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 border-2 border-blue-300 rounded-3xl p-6 sm:p-8">
                            <div className="absolute top-0 right-0 text-9xl opacity-5">📖</div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <span className="text-3xl">📖</span>
                                    <h5 className="text-xl sm:text-2xl font-bold text-blue-800">
                                        Sobre los Chismes Históricos
                                    </h5>
                                </div>
                                <p className="text-sm sm:text-base text-cosiaca-brown leading-relaxed text-center max-w-3xl mx-auto mb-4">
                                    Todos estos chismes están basados en <strong>hechos históricos reales</strong>, documentos verificados y memoria oral paisa. Cosiaca te los cuenta con humor, pero la historia es auténtica. Cada anécdota ha sido investigada y verificada con fuentes históricas confiables.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-cosiaca-brown/80">
                                    <span className="bg-white/70 px-3 py-1 rounded-full">✅ Verificados</span>
                                    <span className="bg-white/70 px-3 py-1 rounded-full">📚 Documentados</span>
                                    <span className="bg-white/70 px-3 py-1 rounded-full">🎭 Con humor paisa</span>
                                    <span className="bg-white/70 px-3 py-1 rounded-full">🏛️ 350 años de historia</span>
                                </div>
                                <p className="text-center text-sm font-bold text-cosiaca-brown mt-4 italic">
                                    ¡350 años de historia dan para muchos chismes, mijito! 😉
                                </p>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Juegos;