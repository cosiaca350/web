import React, { useState } from 'react';
import { SparklesIcon, BotIcon, PlayIcon, GamepadIcon, BookIcon, VideoIcon } from '../icons/Icons';
import AIService from '../services/aiService';

const Welcome = ({ setView }) => {
    const [historicalFact, setHistoricalFact] = useState('');
    const [isLoadingFact, setIsLoadingFact] = useState(false);

    const handleGenerateFact = async () => {
        setIsLoadingFact(true);
        setHistoricalFact(''); 

        try {
            const fact = await AIService.generateHistoricalFact();
            setHistoricalFact(fact);
        } catch (error) {
            console.error('Error generating fact:', error);
            setHistoricalFact("¡Uy, mijito! Se me enredó la historia. Intentá de nuevo más tarde, ¿sí?");
        } finally {
            setIsLoadingFact(false);
        }
    };

    const features = [
        { 
            icon: <BotIcon className="w-8 h-8" />, 
            title: "CosiacaBot", 
            desc: "Conversa con la historia",
            action: () => setView('cosiacabot'),
            color: "from-blue-500 to-blue-600"
        },
        { 
            icon: <GamepadIcon className="w-8 h-8" />, 
            title: "Juegos AR", 
            desc: "Aprende jugando",
            action: () => setView('juegos'),
            color: "from-purple-500 to-purple-600"
        },
        { 
            icon: <PlayIcon className="w-8 h-8" />, 
            title: "Podcast", 
            desc: "Historias narradas",
            action: () => setView('podcast'),
            color: "from-green-500 to-green-600"
        },
        { 
            icon: <VideoIcon className="w-8 h-8" />, 
            title: "Videos IA", 
            desc: "Historia visual",
            action: () => setView('videos'),
            color: "from-red-500 to-red-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-cosiaca-cream via-cosiaca-beige to-cosiaca-tan py-8 px-4">
            <div className="w-full max-w-6xl mx-auto text-center space-y-12">
                
                {/* Header */}
                <div className="mb-8">
                    <div className="text-4xl md:text-5xl font-black text-cosiaca-brown font-serif leading-none tracking-tight mb-6">
                        {"{COSIACA "}
                        <strong>350</strong>
                        {"}"}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-cosiaca-brown/80 mb-4">
                        UN VIAJE INMERSIVO A LA HISTORIA DE MEDELLÍN
                    </h2>
                </div>

                {/* Información Principal */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-cosiaca-beige max-w-5xl mx-auto">
                    <div className="text-center mb-6">
                        <div className="text-4xl mb-4">🎭</div>
                        <h3 className="text-2xl font-bold text-cosiaca-brown font-serif mb-4">
                            Una Experiencia Transmedia Única
                        </h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div>
                            <h4 className="font-bold text-cosiaca-red mb-4 text-lg">
                                🌟 Lo que encontrarás:
                            </h4>
                            <ul className="space-y-2 text-cosiaca-brown/80">
                                <li>• <strong>CosiacaBot:</strong> Conversa con la historia</li>
                                <li>• <strong>Podcast Histórico:</strong> <strong>350</strong> años narrados</li>
                                <li>• <strong>Juegos Interactivos:</strong> Trivia y diversión</li>
                                <li>• <strong>Videos con IA:</strong> Historia visual</li>
                                <li>• <strong>Línea de Tiempo:</strong> Viaje temporal</li>
                                <li>• <strong>Archivo Histórico:</strong> Documentos reales</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-cosiaca-red mb-4 text-lg">
                                🎯 Nuestra Misión:
                            </h4>
                            <p className="text-cosiaca-brown/80 leading-relaxed mb-4">
                                Revivir la historia de Medellín a través del <strong>humor paisa</strong> 
                                y la <em>picardía de Cosiaca</em>. Combinamos <strong>rigor histórico</strong> 
                                con <em>tecnología innovadora</em> para crear una experiencia cultural
                                <strong>accesible, educativa y entretenida</strong>.
                            </p>
                            <div className="text-sm text-cosiaca-brown/60 space-y-1">
                                <p><strong>Período:</strong> 1675 - 2025 (<strong>350</strong> años)</p>
                                <p><strong>Personaje:</strong> José García "Cosiaca"</p>
                                <p><strong>Enfoque:</strong> Humor + Historia + Tecnología</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Experiencia Interactiva */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-cosiaca-beige max-w-4xl mx-auto">
                    <div className="text-center mb-6">
                        <div className="text-4xl mb-4">✨</div>
                        <h3 className="text-2xl font-bold text-cosiaca-brown font-serif mb-4">
                            El Chismecito Histórico de Cosiaca
                        </h3>
                        <p className="text-lg text-cosiaca-brown/80 mb-6">
                            ¿Quieres escuchar un <strong>dato curioso</strong> de la historia de Medellín?
                        </p>
                    </div>
                    
                    <button 
                        onClick={handleGenerateFact} 
                        className="w-full max-w-md mx-auto bg-gradient-to-r from-cosiaca-red to-cosiaca-red-dark text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg flex items-center justify-center mb-6" 
                        disabled={isLoadingFact}
                    >
                        {isLoadingFact ? (
                            <>
                                <SparklesIcon className="animate-pulse mr-3 w-6 h-6" /> 
                                Pensando el chisme...
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="mr-3 w-6 h-6" /> 
                                Contar un Chisme Histórico
                            </>
                        )}
                    </button>
                    
                    {historicalFact && (
                        <div className="p-6 bg-cosiaca-cream rounded-xl text-cosiaca-brown relative border border-cosiaca-beige animate-fade-in">
                            <p className="text-lg leading-relaxed font-medium italic text-center">
                                "{historicalFact}"
                            </p>
                            <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-cosiaca-red text-white rounded-full p-2 shadow-lg">
                                <BotIcon className="w-5 h-5" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Accesos Rápidos */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <button
                            key={index}
                            onClick={feature.action}
                            className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-cosiaca-beige hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center"
                        >
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-cosiaca-brown text-lg mb-2 group-hover:text-cosiaca-red transition-colors">{feature.title}</h3>
                            <p className="text-sm text-cosiaca-brown/70 group-hover:text-cosiaca-brown transition-colors">{feature.desc}</p>
                        </button>
                    ))}
                </div>

                {/* Información del Proyecto */}
                <div className="bg-gradient-to-r from-cosiaca-red/10 to-cosiaca-brown/10 p-8 rounded-2xl border border-cosiaca-beige/50 max-w-5xl mx-auto">
                    <h3 className="text-3xl font-bold text-cosiaca-brown mb-4 font-serif">
                        🏛️ Proyecto Oficial
                    </h3>
                    <p className="text-xl text-cosiaca-brown/80 leading-relaxed mb-6 max-w-4xl mx-auto">
                        <strong>{"{COSIACA "}<strong>350</strong>{"}"}</strong> es una propuesta transmedia beneficiada de las 
                        <em> Convocatorias de Fomento y Estímulos para el Arte y la Cultura 2025</em>
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 text-sm text-cosiaca-brown/60">
                        <span className="bg-cosiaca-beige/50 px-4 py-2 rounded-full">📚 Investigación Histórica</span>
                        <span className="bg-cosiaca-beige/50 px-4 py-2 rounded-full">🤖 Inteligencia Artificial</span>
                        <span className="bg-cosiaca-beige/50 px-4 py-2 rounded-full">🎭 Cultura Paisa</span>
                        <span className="bg-cosiaca-beige/50 px-4 py-2 rounded-full">🌐 Transmedia</span>
                        <span className="bg-cosiaca-beige/50 px-4 py-2 rounded-full">🎪 Entretenimiento</span>
                        <span className="bg-cosiaca-beige/50 px-4 py-2 rounded-full">📖 Educación</span>
                    </div>
                </div>

                {/* Botón para ver más detalles */}
                <div className="text-center">
                    <button
                        onClick={() => setView('proyecto')}
                        className="bg-gradient-to-r from-cosiaca-brown to-cosiaca-brown/80 hover:from-cosiaca-brown/80 hover:to-cosiaca-brown text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                        Ver Detalles del Proyecto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;