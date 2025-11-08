import React, { useState, useEffect } from 'react';
import { BotIcon, CheckCircleIcon, XCircleIcon, SparklesIcon } from '../icons/Icons';
import AdvancedTrivia from './AdvancedTrivia';
import AIService from '../services/aiService';

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

    // Stand Up Data
    const standUpJokes = [
        "¿Cuál es el colmo de un electricista? Que su mujer se llame Luz y sus hijos le sigan la corriente.",
        "¿Qué le dice un semáforo a otro? No me mires, que me estoy cambiando.",
        "Iba Caperucita Roja por el bosque, cuando se encuentra al lobo y el lobo le dice: '¿A dónde vas tan sola?' Y Caperucita responde: 'A la casa de mi abuela'. Y el lobo le dice: '¡Ah, bueno, pues yo me voy a mi casa, chao!'",
        "¿Qué hace una abeja en un gimnasio? ¡Zumba!",
        "¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter."
    ];

    // Trovas Data
    const trovasPaisa = [
        "Con la guitarra en la mano\ny un sombrero de ocasión,\nles vengo a dar la bienvenida\ncon un verso y con amor.",
        "De la montaña antioqueña\nle vengo a traer un verso,\npara que quede contento\ncon el cantar de mi voz.",
        "Vengo de la capital\ndonde todo es progreso,\ndonde se canta y se baila\ny se olvida del regreso.",
        "En esta fiesta tan linda\ncon la gente tan contenta,\nles prometo que esta trova\nno tiene nada de cuenta.",
        "En este hermoso lugar\nla gente es muy querendona,\ny en la palma de mi mano\nllevo a una antioqueña hermosa."
    ];
    
    useEffect(() => {
        if (activeTab === 'standup') {
            setCurrentJoke(getRandomJoke());
        }
        if (activeTab === 'trovas') {
            setCurrentTrova(getRandomTrova());
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
        try {
            // Usar directamente fallback ya que no hay API válida
            const fallbackJokes = [
                "¡Uy mijito! ¿Sabés por qué los paisas somos tan trabajadores? ¡Porque desde que nacemos ya estamos 'ocupados' en el vientre de la mamá! Ja ja ja, ¡qué ocurrencia!",
                "¿Por qué en Medellín nunca llueve dinero? ¡Porque los paisas ya lo habríamos recogido todo antes de que toque el suelo! Ja ja ja.",
                "¿Sabés cuál es el colmo de un paisa? ¡Que le regalen algo y pregunte cuánto vale para saber si le gustó! Ja ja ja.",
                "¿Por qué los paisas somos tan buenos para los negocios? ¡Porque vendemos hasta la sombra y después cobramos por el fresco! Ja ja ja.",
                "¿Cuál es la diferencia entre un paisa y un arriero? ¡Que el arriero solo carga mulas, pero el paisa carga con toda la familia! Ja ja ja."
            ];
            const randomJoke = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
            setCurrentJoke(randomJoke);
        } catch (error) {
            console.error('Error generating joke:', error);
            setCurrentJoke("¡Uy mijito! ¿Sabés por qué los paisas somos tan trabajadores? ¡Porque desde que nacemos ya estamos 'ocupados' en el vientre de la mamá! Ja ja ja, ¡qué ocurrencia!");
        } finally {
            setIsGeneratingJoke(false);
        }
    };

    const generateAITrova = async () => {
        setIsGeneratingTrova(true);
        try {
            // Usar directamente fallback ya que no hay API válida
            const fallbackTrovas = [
                "En las montañas de Antioquia,<br>donde el café es tradición,<br>vive el paisa trabajador<br>con mucho amor y pasión.",
                "Medellín, ciudad querida,<br>de arrieros y soñadores,<br>tus calles guardan la vida<br>de nobles trabajadores.",
                "En el Valle de Aburrá,<br>donde el río canta y fluye,<br>la historia paisa está<br>en cada alma que construye.",
                "Cosiaca cuenta con gracia<br>las historias del pasado,<br>de esta tierra de Antioquia<br>que siempre ha prosperado.",
                "Desde mil seiscientos setenta,<br>cuando se fundó la villa,<br>los paisas con su destreza<br>hicieron grande esta orilla."
            ];
            const randomTrova = fallbackTrovas[Math.floor(Math.random() * fallbackTrovas.length)];
            setCurrentTrova(randomTrova);
        } catch (error) {
            console.error('Error generating trova:', error);
            setCurrentTrova("En las montañas de Antioquia,<br>donde el café es tradición,<br>vive el paisa trabajador<br>con mucho amor y pasión.");
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
                        
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button
                                onClick={generateAIJoke}
                                disabled={isGeneratingJoke}
                                className="bg-cosiaca-red text-white font-bold py-3 px-6 sm:px-8 rounded-full hover:bg-cosiaca-red-dark transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                <SparklesIcon className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                Generar Chiste con IA
                            </button>
                            <button
                                onClick={() => setCurrentJoke(getRandomJoke())}
                                className="bg-cosiaca-brown text-white font-bold py-3 px-6 sm:px-8 rounded-full hover:bg-cosiaca-brown/80 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                            >
                                Chiste Clásico
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
                        
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button
                                onClick={generateAITrova}
                                disabled={isGeneratingTrova}
                                className="bg-cosiaca-red text-white font-bold py-3 px-6 sm:px-8 rounded-full hover:bg-cosiaca-red-dark transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                <SparklesIcon className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                Generar Trova con IA
                            </button>
                            <button
                                onClick={() => setCurrentTrova(getRandomTrova())}
                                className="bg-cosiaca-brown text-white font-bold py-3 px-6 sm:px-8 rounded-full hover:bg-cosiaca-brown/80 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                            >
                                Trova Tradicional
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Juegos;