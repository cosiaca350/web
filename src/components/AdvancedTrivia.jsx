import React, { useState, useEffect } from 'react';
import { SparklesIcon, CheckCircleIcon, XCircleIcon, BotIcon, TrophyIcon } from '../icons/Icons';
import { triviaDatabase, levelConfig, getRandomQuestions, calculateMaxScore } from '../data/triviaQuestions';

const AdvancedTrivia = () => {
    // Estados principales
    const [currentLevel, setCurrentLevel] = useState('beginner');
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [levelScore, setLevelScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [completedLevels, setCompletedLevels] = useState([]);
    const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'levelComplete', 'gameComplete'
    const [canContinue, setCanContinue] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [timerActive, setTimerActive] = useState(false);

    // Configuración del juego
    const maxScore = calculateMaxScore();
    const currentLevelConfig = levelConfig[currentLevel];
    const currentQuestion = currentQuestions[currentQuestionIndex];

    // Timer effect
    useEffect(() => {
        let interval = null;
        if (timerActive && timeLeft > 0 && gameState === 'playing') {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTimeUp();
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft, gameState]);

    // Inicializar nivel
    const startLevel = (level) => {
        const questions = getRandomQuestions(level, levelConfig[level].totalQuestions);
        setCurrentLevel(level);
        setCurrentQuestions(questions);
        setCurrentQuestionIndex(0);
        setLevelScore(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowFeedback(false);
        setGameState('playing');
        setCanContinue(false);
        setShowHint(false);
        setHintsUsed(0);
        setTimeLeft(60);
        setTimerActive(true);
    };

    // Manejar respuesta
    const handleAnswer = (selectedOption) => {
        if (selectedAnswer !== null) return;
        
        setTimerActive(false);
        const isCorrectAnswer = selectedOption === currentQuestion.correctAnswer;
        setSelectedAnswer(selectedOption);
        setIsCorrect(isCorrectAnswer);
        setShowFeedback(true);

        if (isCorrectAnswer) {
            const points = currentLevelConfig.pointsPerQuestion - (hintsUsed * 5);
            setLevelScore(prev => prev + Math.max(points, 5));
            setTotalScore(prev => prev + Math.max(points, 5));
        }
    };

    // Manejar tiempo agotado
    const handleTimeUp = () => {
        if (selectedAnswer === null) {
            setSelectedAnswer('timeout');
            setIsCorrect(false);
            setShowFeedback(true);
            setTimerActive(false);
        }
    };

    // Siguiente pregunta
    const nextQuestion = () => {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setShowFeedback(false);
            setShowHint(false);
            setHintsUsed(0);
            setTimeLeft(60);
            setTimerActive(true);
        } else {
            completeLevel();
        }
    };

    // Completar nivel
    const completeLevel = () => {
        setTimerActive(false);
        const questionsCorrect = currentQuestions.filter((_, index) => 
            index <= currentQuestionIndex && 
            (index < currentQuestionIndex || isCorrect)
        ).length;
        
        const passed = questionsCorrect >= currentLevelConfig.questionsToPass;
        
        if (passed && !completedLevels.includes(currentLevel)) {
            setCompletedLevels(prev => [...prev, currentLevel]);
        }
        
        setCanContinue(passed);
        setGameState('levelComplete');
    };

    // Obtener siguiente nivel
    const getNextLevel = () => {
        const levels = Object.keys(levelConfig);
        const currentIndex = levels.indexOf(currentLevel);
        return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
    };

    // Continuar al siguiente nivel
    const continueToNextLevel = () => {
        const nextLevel = getNextLevel();
        if (nextLevel) {
            startLevel(nextLevel);
        } else {
            setGameState('gameComplete');
        }
    };

    // Mostrar pista
    const showQuestionHint = () => {
        setShowHint(true);
        setHintsUsed(prev => prev + 1);
    };

    // Generar pista con IA (simulada)
    const generateHint = () => {
        if (!currentQuestion) return "";
        
        const hints = [
            "Piensa en el contexto histórico de la época...",
            "Recuerda los personajes importantes de ese período...",
            "Considera los eventos más significativos...",
            "Piensa en las fechas clave de la historia de Medellín...",
        ];
        
        return hints[Math.floor(Math.random() * hints.length)];
    };

    // Abandonar juego
    const quitGame = () => {
        setGameState('menu');
        setTimerActive(false);
        setCurrentQuestions([]);
        setCurrentQuestionIndex(0);
        setLevelScore(0);
    };

    // Reiniciar juego completo
    const resetGame = () => {
        setGameState('menu');
        setCurrentLevel('beginner');
        setTotalScore(0);
        setCompletedLevels([]);
        setTimerActive(false);
    };

    // Renderizar menú principal
    const renderMenu = () => (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-4xl font-bold font-serif text-cosiaca-brown mb-4">
                    🏆 Trivia Histórica de Medellín
                </h2>
                <p className="text-xl text-cosiaca-brown/70 mb-6">
                    <strong>350</strong> preguntas sobre <strong>350</strong> años de historia
                </p>
                <div className="bg-cosiaca-beige/50 p-6 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-2xl font-bold text-cosiaca-brown mb-4">🎯 Desafío Cosiaca</h3>
                    <p className="text-lg text-cosiaca-brown/80 mb-4">
                        Recorre 5 niveles de dificultad, desde la fundación hasta la ciudad innovadora. 
                        ¡Cada nivel tiene 8 preguntas y necesitas responder correctamente 6 para avanzar!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-cosiaca-brown/70">
                        <div>⏱️ 60 segundos por pregunta</div>
                        <div>💡 Pistas disponibles (-5 puntos)</div>
                        <div>🎯 Puntaje máximo: {maxScore} puntos</div>
                        <div>🏃‍♂️ Puedes abandonar en cualquier momento</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(levelConfig).map(([levelKey, config]) => {
                    const isCompleted = completedLevels.includes(levelKey);
                    const isLocked = levelKey !== 'beginner' && !completedLevels.includes(Object.keys(levelConfig)[Object.keys(levelConfig).indexOf(levelKey) - 1]);
                    
                    return (
                        <div key={levelKey} className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                            isCompleted ? 'bg-green-100 border-green-500' :
                            isLocked ? 'bg-gray-100 border-gray-300 opacity-50' :
                            'bg-white border-cosiaca-beige hover:border-cosiaca-red hover:shadow-lg'
                        }`}>
                            <div className="text-center">
                                <div className={`w-16 h-16 rounded-full ${config.color} flex items-center justify-center mx-auto mb-4`}>
                                    {isCompleted ? (
                                        <CheckCircleIcon className="w-8 h-8 text-white" />
                                    ) : isLocked ? (
                                        <span className="text-white text-2xl">🔒</span>
                                    ) : (
                                        <span className="text-white text-2xl font-bold">{Object.keys(levelConfig).indexOf(levelKey) + 1}</span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-cosiaca-brown mb-2">{config.name}</h3>
                                <p className="text-sm text-cosiaca-brown/70 mb-4">{config.description}</p>
                                <div className="text-xs text-cosiaca-brown/60 mb-4">
                                    {config.pointsPerQuestion} puntos por pregunta
                                </div>
                                <button
                                    onClick={() => startLevel(levelKey)}
                                    disabled={isLocked}
                                    className={`w-full py-2 px-4 rounded-full font-bold transition-all duration-300 ${
                                        isLocked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
                                        isCompleted ? 'bg-green-500 text-white hover:bg-green-600' :
                                        'bg-cosiaca-red text-white hover:bg-cosiaca-red-dark'
                                    }`}
                                >
                                    {isCompleted ? 'Repetir' : isLocked ? 'Bloqueado' : 'Comenzar'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {totalScore > 0 && (
                <div className="text-center bg-cosiaca-cream p-6 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-2xl font-bold text-cosiaca-brown mb-2">🏆 Tu Progreso</h3>
                    <p className="text-xl text-cosiaca-red font-bold">{totalScore} / {maxScore} puntos</p>
                    <p className="text-sm text-cosiaca-brown/70">Niveles completados: {completedLevels.length}/5</p>
                </div>
            )}
        </div>
    );

    // Renderizar juego
    const renderGame = () => (
        <div className="space-y-6">
            {/* Header del juego */}
            <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-cosiaca-brown">
                            Nivel {currentLevelConfig.name}
                        </h3>
                        <p className="text-cosiaca-brown/70">{currentLevelConfig.description}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-cosiaca-red">{timeLeft}s</div>
                            <div className="text-xs text-cosiaca-brown/60">Tiempo</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-cosiaca-red">{levelScore}</div>
                            <div className="text-xs text-cosiaca-brown/60">Puntos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-cosiaca-red">
                                {currentQuestionIndex + 1}/{currentQuestions.length}
                            </div>
                            <div className="text-xs text-cosiaca-brown/60">Pregunta</div>
                        </div>
                    </div>
                </div>
                
                {/* Barra de progreso */}
                <div className="mt-4">
                    <div className="w-full bg-cosiaca-beige rounded-full h-3">
                        <div 
                            className="bg-cosiaca-red h-3 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {currentQuestion && (
                <div className="bg-white rounded-xl shadow-lg p-8 border border-cosiaca-beige">
                    {/* Pregunta */}
                    <div className="mb-6">
                        <div className="flex items-start justify-between mb-4">
                            <h4 className="text-xl md:text-2xl font-bold text-cosiaca-brown leading-relaxed flex-1">
                                {currentQuestion.question}
                            </h4>
                            <div className="ml-4 flex gap-2">
                                {!showHint && !showFeedback && (
                                    <button
                                        onClick={showQuestionHint}
                                        className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors"
                                        title="Mostrar pista (-5 puntos)"
                                    >
                                        💡
                                    </button>
                                )}
                                <button
                                    onClick={quitGame}
                                    className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition-colors"
                                    title="Abandonar juego"
                                >
                                    ❌
                                </button>
                            </div>
                        </div>
                        
                        <div className="text-sm text-cosiaca-brown/60 mb-4">
                            Período: {currentQuestion.period} • Dificultad: {currentQuestion.difficulty}
                        </div>

                        {showHint && (
                            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300 mb-4">
                                <div className="flex items-start space-x-3">
                                    <span className="text-yellow-600 text-xl">💡</span>
                                    <div>
                                        <p className="font-bold text-yellow-800 mb-1">Pista de Cosiaca:</p>
                                        <p className="text-yellow-700 italic">{generateHint()}</p>
                                        <p className="text-xs text-yellow-600 mt-2">(-5 puntos por usar pista)</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Opciones */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                disabled={selectedAnswer !== null}
                                className={`
                                    w-full py-4 px-6 rounded-xl shadow-sm transition-all duration-300
                                    font-semibold text-left border-2 min-h-[60px] flex items-center
                                    ${selectedAnswer === option
                                        ? (isCorrect ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-red-500 text-white border-red-600')
                                        : selectedAnswer !== null && option === currentQuestion.correctAnswer
                                        ? 'bg-emerald-500 text-white border-emerald-600'
                                        : selectedAnswer !== null
                                        ? 'bg-gray-200 text-gray-600 border-gray-300'
                                        : 'bg-cosiaca-beige text-cosiaca-brown hover:bg-cosiaca-beige/70 border-cosiaca-beige hover:border-cosiaca-red hover:scale-105'
                                    }
                                    ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}
                                `}
                            >
                                <span className="flex-1">{option}</span>
                                {selectedAnswer === option && (
                                    <span className="ml-2">
                                        {isCorrect ? (
                                            <CheckCircleIcon className="w-6 h-6" />
                                        ) : (
                                            <XCircleIcon className="w-6 h-6" />
                                        )}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Feedback */}
                    {showFeedback && (
                        <div className="bg-cosiaca-cream p-6 rounded-xl shadow-lg border-2 border-cosiaca-red/50 animate-fade-in">
                            <div className="flex items-start space-x-4">
                                <BotIcon className="w-10 h-10 text-cosiaca-red flex-shrink-0 mt-1" />
                                <div className="flex-1">
                                    <p className="font-bold text-cosiaca-red mb-3 text-lg">
                                        {selectedAnswer === 'timeout' ? '⏰ ¡Se acabó el tiempo!' : 
                                         isCorrect ? '🎉 ¡Correcto!' : '❌ Incorrecto'}
                                    </p>
                                    <p className="italic text-cosiaca-brown leading-relaxed text-lg">
                                        {selectedAnswer === 'timeout' 
                                            ? `¡Uy mijito, se te acabó el tiempo! La respuesta correcta era: ${currentQuestion.correctAnswer}. ${currentQuestion.feedback}`
                                            : currentQuestion.feedback
                                        }
                                    </p>
                                    {isCorrect && (
                                        <p className="text-green-600 font-bold mt-3">
                                            +{Math.max(currentLevelConfig.pointsPerQuestion - (hintsUsed * 5), 5)} puntos
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <button
                                    onClick={nextQuestion}
                                    className="bg-cosiaca-red text-white font-bold py-3 px-8 rounded-full hover:bg-cosiaca-red-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    {currentQuestionIndex < currentQuestions.length - 1 ? 'Siguiente Pregunta →' : 'Ver Resultados 🏆'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    // Renderizar completar nivel
    const renderLevelComplete = () => {
        const questionsCorrect = currentQuestions.filter((_, index) => 
            index <= currentQuestionIndex && 
            (index < currentQuestionIndex || isCorrect)
        ).length;
        const percentage = Math.round((questionsCorrect / currentQuestions.length) * 100);
        const nextLevel = getNextLevel();

        return (
            <div className="text-center space-y-8">
                <div className="bg-white p-8 rounded-xl shadow-2xl border border-cosiaca-beige">
                    <div className="mb-6">
                        {canContinue ? (
                            <div className="text-6xl mb-4">🎉</div>
                        ) : (
                            <div className="text-6xl mb-4">😔</div>
                        )}
                        <h2 className="text-3xl font-bold text-cosiaca-brown mb-4">
                            {canContinue ? '¡Nivel Completado!' : '¡Casi lo logras!'}
                        </h2>
                        <p className="text-xl text-cosiaca-brown/70 mb-6">
                            Nivel: {currentLevelConfig.name}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-cosiaca-beige/50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-cosiaca-red">{questionsCorrect}</div>
                            <div className="text-sm text-cosiaca-brown/60">Correctas</div>
                        </div>
                        <div className="bg-cosiaca-beige/50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-cosiaca-red">{currentQuestions.length}</div>
                            <div className="text-sm text-cosiaca-brown/60">Total</div>
                        </div>
                        <div className="bg-cosiaca-beige/50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-cosiaca-red">{percentage}%</div>
                            <div className="text-sm text-cosiaca-brown/60">Precisión</div>
                        </div>
                        <div className="bg-cosiaca-beige/50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-cosiaca-red">{levelScore}</div>
                            <div className="text-sm text-cosiaca-brown/60">Puntos</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {canContinue ? (
                            <>
                                <p className="text-lg text-green-600 font-bold">
                                    ¡Excelente! Necesitabas {currentLevelConfig.questionsToPass} respuestas correctas y lograste {questionsCorrect}.
                                </p>
                                {nextLevel ? (
                                    <button
                                        onClick={continueToNextLevel}
                                        className="bg-cosiaca-red text-white font-bold py-3 px-8 rounded-full hover:bg-cosiaca-red-dark transition-all duration-300 transform hover:scale-105 shadow-lg mr-4"
                                    >
                                        Continuar al Nivel {levelConfig[nextLevel].name} →
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setGameState('gameComplete')}
                                        className="bg-yellow-500 text-white font-bold py-3 px-8 rounded-full hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg mr-4"
                                    >
                                        ¡Ver Resultados Finales! 🏆
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className="text-lg text-red-600 font-bold">
                                Necesitabas {currentLevelConfig.questionsToPass} respuestas correctas. ¡Inténtalo de nuevo!
                            </p>
                        )}
                        
                        <button
                            onClick={() => setGameState('menu')}
                            className="bg-cosiaca-brown text-white font-bold py-3 px-8 rounded-full hover:bg-cosiaca-brown/80 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Volver al Menú
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Renderizar juego completo
    const renderGameComplete = () => {
        const completionPercentage = Math.round((completedLevels.length / Object.keys(levelConfig).length) * 100);
        let title = "¡Felicitaciones!";
        let message = "";
        let emoji = "🎉";

        if (completionPercentage === 100) {
            title = "¡MAESTRO DE LA HISTORIA PAISA!";
            message = "¡Increíble! Has completado todos los niveles. Eres un verdadero experto en la historia de Medellín.";
            emoji = "👑";
        } else if (completionPercentage >= 80) {
            title = "¡EXPERTO PAISA!";
            message = "¡Excelente conocimiento! Conoces muy bien la historia de nuestra bella ciudad.";
            emoji = "🏆";
        } else if (completionPercentage >= 60) {
            title = "¡BUEN PAISA!";
            message = "¡Muy bien! Tienes un buen conocimiento de la historia de Medellín.";
            emoji = "⭐";
        } else {
            title = "¡SIGUE APRENDIENDO!";
            message = "¡Buen intento! Sigue explorando la historia de Medellín para mejorar tu puntaje.";
            emoji = "📚";
        }

        return (
            <div className="text-center space-y-8">
                <div className="bg-white p-8 rounded-xl shadow-2xl border border-cosiaca-beige">
                    <div className="text-8xl mb-6">{emoji}</div>
                    <h2 className="text-4xl font-bold text-cosiaca-brown mb-4">{title}</h2>
                    <p className="text-xl text-cosiaca-brown/70 mb-8">{message}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-cosiaca-beige/50 p-4 rounded-lg">
                            <div className="text-3xl font-bold text-cosiaca-red">{totalScore}</div>
                            <div className="text-sm text-cosiaca-brown/60">Puntos Totales</div>
                        </div>
                        <div className="bg-cosiaca-beige/50 p-4 rounded-lg">
                            <div className="text-3xl font-bold text-cosiaca-red">{completedLevels.length}</div>
                            <div className="text-sm text-cosiaca-brown/60">Niveles Completados</div>
                        </div>
                        <div className="bg-cosiaca-beige/50 p-4 rounded-lg">
                            <div className="text-3xl font-bold text-cosiaca-red">{completionPercentage}%</div>
                            <div className="text-sm text-cosiaca-brown/60">Completado</div>
                        </div>
                        <div className="bg-cosiaca-beige/50 p-4 rounded-lg">
                            <div className="text-3xl font-bold text-cosiaca-red">{Math.round((totalScore / maxScore) * 100)}%</div>
                            <div className="text-sm text-cosiaca-brown/60">Precisión</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={resetGame}
                            className="bg-cosiaca-red text-white font-bold py-3 px-8 rounded-full hover:bg-cosiaca-red-dark transition-all duration-300 transform hover:scale-105 shadow-lg mr-4"
                        >
                            🔄 Jugar de Nuevo
                        </button>
                        <button
                            onClick={() => setGameState('menu')}
                            className="bg-cosiaca-brown text-white font-bold py-3 px-8 rounded-full hover:bg-cosiaca-brown/80 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            📚 Volver al Menú
                        </button>
                    </div>

                    <div className="mt-8 p-6 bg-cosiaca-cream rounded-lg border border-cosiaca-beige">
                        <h3 className="text-2xl font-bold text-cosiaca-brown mb-4">🎭 Mensaje de Cosiaca</h3>
                        <p className="text-lg italic text-cosiaca-brown leading-relaxed">
                            "¡Ey, mijito! {completionPercentage === 100 ? 
                                'Ya sabés más de Medellín que yo mismo. ¡Qué orgullo paisa!' :
                                'Seguí aprendiendo sobre nuestra bella ciudad. ¡La historia paisa es muy rica!'
                            } Recordá que conocer nuestras raíces nos hace mejores paisas. ¡Hasta la próxima!"
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    // Render principal
    return (
        <div className="max-w-6xl mx-auto">
            {gameState === 'menu' && renderMenu()}
            {gameState === 'playing' && renderGame()}
            {gameState === 'levelComplete' && renderLevelComplete()}
            {gameState === 'gameComplete' && renderGameComplete()}
        </div>
    );
};

export default AdvancedTrivia;