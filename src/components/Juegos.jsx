import React, { useState, useEffect } from 'react';
import { BotIcon, CheckCircleIcon, XCircleIcon } from '../icons/Icons';

const Juegos = () => {
    const [activeTab, setActiveTab] = useState('trivia');
    const [triviaScore, setTriviaScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [currentJoke, setCurrentJoke] = useState('');
    const [currentTrova, setCurrentTrova] = useState('');

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

        if (isCorrectAnswer) {
            setTriviaScore(score => score + 1);
        }

        setTimeout(() => {
            setCurrentQuestionIndex(index => index + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setFeedbackMessage(null);
        }, 8000);
    };

    const resetTrivia = () => {
        setTriviaScore(0);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setFeedbackMessage(null);
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
        <div className="animate-fade-in max-w-2xl mx-auto bg-cosiaca-cream rounded-3xl shadow-xl w-full overflow-hidden transition-all duration-300 border border-cosiaca-beige">
            <div className="p-6 md:p-8 text-center bg-gradient-to-r from-cosiaca-red to-cosiaca-red-dark text-white">
                <h1 className="text-3xl font-bold tracking-tight font-serif">Juegos y AR</h1>
                <p className="mt-2 text-lg opacity-90">¡Humor, conocimiento y rima paisa!</p>
            </div>

            <div className="flex border-b border-cosiaca-beige bg-cosiaca-beige">
                <button
                    className={`flex-1 py-4 text-center font-bold text-sm focus:outline-none transition-colors duration-300 transform ${
                        activeTab === 'trivia' 
                            ? 'bg-cosiaca-red text-white shadow-md scale-105' 
                            : 'text-cosiaca-brown hover:bg-cosiaca-cream'
                    }`}
                    onClick={() => setActiveTab('trivia')}
                >
                    Trivia
                </button>
                <button
                    className={`flex-1 py-4 text-center font-bold text-sm focus:outline-none transition-colors duration-300 transform ${
                        activeTab === 'standup' 
                            ? 'bg-cosiaca-red text-white shadow-md scale-105' 
                            : 'text-cosiaca-brown hover:bg-cosiaca-cream'
                    }`}
                    onClick={() => setActiveTab('standup')}
                >
                    Stand Up
                </button>
                <button
                    className={`flex-1 py-4 text-center font-bold text-sm focus:outline-none transition-colors duration-300 transform ${
                        activeTab === 'trovas' 
                            ? 'bg-cosiaca-red text-white shadow-md scale-105' 
                            : 'text-cosiaca-brown hover:bg-cosiaca-cream'
                    }`}
                    onClick={() => setActiveTab('trovas')}
                >
                    Trovas
                </button>
            </div>

            <div className="p-6 md:p-8 bg-cosiaca-cream">
                {/* Trivia Content */}
                {activeTab === 'trivia' && (
                    <div className="space-y-6 animate-fade-in">
                        {currentQuestionIndex < triviaQuestions.length ? (
                            <>
                                <div className="bg-cosiaca-beige text-cosiaca-brown p-6 rounded-xl shadow-inner border border-cosiaca-beige">
                                    <p className="text-sm font-semibold text-cosiaca-red mb-2">
                                        Puntuación: {triviaScore}
                                    </p>
                                    <p className="text-lg md:text-xl font-bold">
                                        {triviaQuestions[currentQuestionIndex].question}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {triviaQuestions[currentQuestionIndex].options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(option)}
                                            disabled={selectedAnswer !== null}
                                            className={`
                                                w-full py-4 px-4 rounded-xl shadow-sm transition-all duration-300
                                                font-semibold text-center
                                                ${selectedAnswer === option
                                                    ? (isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white')
                                                    : 'bg-cosiaca-beige text-cosiaca-brown hover:bg-cosiaca-beige/70'
                                                }
                                                ${selectedAnswer !== null ? 'opacity-80' : ''}
                                                focus:outline-none focus:ring-2 focus:ring-cosiaca-red focus:ring-offset-2 focus:ring-offset-cosiaca-cream
                                            `}
                                        >
                                            {option}
                                            {selectedAnswer === option && (
                                                <span className="ml-2">
                                                    {isCorrect ? (
                                                        <CheckCircleIcon className="inline-block w-5 h-5" />
                                                    ) : (
                                                        <XCircleIcon className="inline-block w-5 h-5" />
                                                    )}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {feedbackMessage && (
                                    <div className="bg-cosiaca-beige text-cosiaca-brown p-6 rounded-xl shadow-lg border border-cosiaca-red/50 mt-4 animate-fade-in">
                                        <div className="flex items-start space-x-3">
                                            <BotIcon className="w-8 h-8 text-cosiaca-red flex-shrink-0" />
                                            <div>
                                                <p className="font-bold text-cosiaca-red mb-1">Cosiaca te cuenta:</p>
                                                <p className="italic">{feedbackMessage}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="bg-cosiaca-beige p-8 rounded-xl shadow-lg border border-cosiaca-beige">
                                    <h3 className="text-2xl font-serif text-cosiaca-brown mb-2">¡Trivia Terminada!</h3>
                                    <p className="text-xl text-cosiaca-brown">Tu puntuación final es:</p>
                                    <p className="text-4xl font-bold mt-2 text-cosiaca-red">
                                        {triviaScore} de {triviaQuestions.length}
                                    </p>
                                </div>
                                <button
                                    onClick={resetTrivia}
                                    className="w-full bg-cosiaca-red text-white font-bold py-3 rounded-xl shadow-lg hover:bg-cosiaca-red-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cosiaca-red focus:ring-offset-2"
                                >
                                    Volver a Jugar
                                </button>
                            </div>
                        )}
                    </div>
                )}
                
                {/* Stand Up Content */}
                {activeTab === 'standup' && (
                    <div className="text-center space-y-8 animate-fade-in">
                        <div className="bg-cosiaca-beige rounded-xl p-8 shadow-inner border border-cosiaca-beige">
                            <h3 className="text-3xl font-serif text-cosiaca-brown mb-4">El Chiste de Cosiaca</h3>
                            <p className="text-xl md:text-2xl font-semibold italic text-cosiaca-brown leading-relaxed">
                                {currentJoke}
                            </p>
                        </div>
                        <button
                            onClick={() => setCurrentJoke(getRandomJoke())}
                            className="w-full bg-cosiaca-red text-white font-bold py-3 rounded-xl shadow-lg hover:bg-cosiaca-red-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cosiaca-red focus:ring-offset-2"
                        >
                            Nuevo Chiste
                        </button>
                    </div>
                )}

                {/* Trovas Content */}
                {activeTab === 'trovas' && (
                    <div className="text-center space-y-8 animate-fade-in">
                        <div className="bg-cosiaca-beige rounded-xl p-8 shadow-inner border border-cosiaca-beige">
                            <h3 className="text-3xl font-serif text-cosiaca-brown mb-4">La Trova Paisa</h3>
                            <p 
                                className="text-xl md:text-2xl font-semibold leading-relaxed text-cosiaca-brown" 
                                dangerouslySetInnerHTML={{ __html: currentTrova }}
                            />
                        </div>
                        <button
                            onClick={() => setCurrentTrova(getRandomTrova())}
                            className="w-full bg-cosiaca-red text-white font-bold py-3 rounded-xl shadow-lg hover:bg-cosiaca-red-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cosiaca-red focus:ring-offset-2"
                        >
                            Otra Trova
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Juegos;