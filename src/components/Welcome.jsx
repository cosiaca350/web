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
            // Intentar generar con IA primero
            const gossip = await AIService.generateHistoricalGossip();
            setHistoricalFact(gossip);
        } catch (error) {
            console.error('Error generating fact:', error);
            // Si falla la IA, usar un chisme de fallback específico
            const fallbackGossips = [
                "¿Sabías que cuando se fundó Medellín en 1675, había más vacas que gente? ¡Los fundadores eran tan poquitos que hasta las vacas los conocían por el nombre! Francisco Herrera Campuzano, el fundador, decía que era más fácil contar las familias que el ganado. ¡Imagínate mijito, 24 familias para toda una ciudad!",
                "¡Uy mijito, te voy a contar un chisme sabroso! Resulta que el primer tranvía de Medellín en 1890 era jalado por mulas, y las señoras elegantes se quejaban del olor. Pero ¿sabés qué? ¡Nunca se quedaron sin gasolina! Las mulas eran más confiables que los carros de ahora, ja ja ja.",
                "¿Te cuento un secreto de la época del café? En los años 1870, los arrieros antioqueños eran tan buenos para los negocios que vendían hasta las piedras del camino. Decían que un paisa podía vender hielo en el polo norte y carbón en el infierno. ¡Qué verraquera la de esos paisas!",
                "¡Imagínate este chisme, mijito! Cuando llegó la electricidad a Medellín en 1895, la gente pensaba que era brujería. Las señoras se persignaban cada vez que prendían un bombillo. ¡Y los curas tuvieron que explicar desde el púlpito que la luz eléctrica no era cosa del diablo!",
                "¿Sabías que el Teatro Junín se construyó en 1924 y era tan elegante que la gente se vestía de gala hasta para ver una obra de títeres? Las señoras se peinaban durante horas y los caballeros se planchaban el bigote. ¡Todo un espectáculo antes del espectáculo!"
            ];
            const randomGossip = fallbackGossips[Math.floor(Math.random() * fallbackGossips.length)];
            setHistoricalFact(randomGossip);
        } finally {
            setIsLoadingFact(false);
        }
    };

    const features = [
        { 
            icon: <VideoIcon className="w-8 h-8" />, 
            title: "Videos IA", 
            desc: "Historia visual con IA",
            action: () => setView('videos'),
            color: "from-blue-500 to-blue-600"
        },
        { 
            icon: <BotIcon className="w-8 h-8" />, 
            title: "CosiacaBot", 
            desc: "Conversa con la historia",
            action: () => setView('cosiacabot'),
            color: "from-cosiaca-acento to-cosiaca-secundario"
        },
        { 
            icon: <GamepadIcon className="w-8 h-8" />, 
            title: "Juegos AR", 
            desc: "Aprende jugando",
            action: () => setView('juegos'),
            color: "from-green-500 to-green-600"
        },
        { 
            icon: <PlayIcon className="w-8 h-8" />, 
            title: "Podcast", 
            desc: "Historias narradas",
            action: () => setView('podcast'),
            color: "from-red-500 to-red-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-cosiaca-cream via-cosiaca-beige to-cosiaca-tan py-4 sm:py-8 px-4">
            <div className="w-full container-1920 mx-auto text-center space-y-1920">
                
                {/* Header */}
                <section className="animate-fade-in mb-8 sm:mb-12">
                    <div className="flex justify-center mb-6">
                        <img 
                            src="/logo-cosiaca.svg" 
                            alt="Cosiaca 350 - Un viaje inmersivo a la historia de Medellín"
                            className="w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[500px] h-auto"
                        />
                    </div>
                    <h2 className="text-2xl md:text-3xl xl:text-1920-lg font-bold text-cosiaca-brown/80 mb-4">
                        UN VIAJE INMERSIVO A LA HISTORIA DE MEDELLÍN
                    </h2>
                </section>

                {/* Información Principal Unificada */}
                <section className="animate-fade-in mb-8 sm:mb-12">
                <div className="bg-white/90 backdrop-blur-sm p-8 xl:p-1920 rounded-2xl shadow-2xl border border-cosiaca-beige max-w-6xl xl:max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="text-4xl xl:text-6xl mb-4">🎭</div>
                        <h3 className="text-2xl xl:text-1920-lg font-bold text-cosiaca-brown font-anton mb-4">
                            Cosiaca 350: Una Experiencia Transmedia Única
                        </h3>
                        <p className="text-lg xl:text-1920-base text-cosiaca-brown/80 max-w-4xl mx-auto">
                            En el marco de la conmemoración de los <strong>350 años de la fundación de Medellín</strong>,
                            revivimos al mítico cuentero <strong>José García "Cosiaca"</strong>, el <em>primer comediante
                            popular de Antioquia</em>, como guía y narrador a través de <strong>tres siglos y medio de historia local</strong>.
                        </p>
                    </div>

                    <div className="responsive-grid text-left gap-8">
                        <div>
                            <h4 className="font-bold text-cosiaca-red mb-4 text-lg xl:text-1920-base">
                                🌟 Componentes Transmedia:
                            </h4>
                            <ul className="space-y-2 text-cosiaca-brown/80 xl:text-1920-base">
                                <li>• <strong>CosiacaBot:</strong> Asistente virtual para conversar con la historia</li>
                                <li>• <strong>Podcast Histórico:</strong> <strong>350</strong> años narrados con humor paisa</li>
                                <li>• <strong>Juegos Interactivos:</strong> Trivia histórica y diversión educativa</li>
                                <li>• <strong>Videos con IA:</strong> Recreación visual de escenas históricas</li>
                                <li>• <strong>Línea de Tiempo:</strong> Viaje temporal 1675-2025</li>
                                <li>• <strong>Archivo Histórico:</strong> Documentos y fotografías reales</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-cosiaca-red mb-4 text-lg xl:text-1920-base">
                                🎯 Nuestra Propuesta:
                            </h4>
                            <p className="text-cosiaca-brown/80 xl:text-1920-base leading-relaxed mb-4">
                                "Contar la historia para vivirla riendo": mediante <strong>humor pícaro, oralidad paisa
                                y participación del público</strong>, convertimos hechos y personajes de Medellín en una
                                experiencia cultural <em>accesible, educativa y entretenida</em>.
                            </p>
                            <div className="bg-cosiaca-cream/50 p-4 rounded-xl border border-cosiaca-beige">
                                <p className="text-sm xl:text-base text-cosiaca-brown/80 space-y-1">
                                    <strong>📅 Período:</strong> 1675 - 2025 (<strong>350</strong> años)<br/>
                                    <strong>🎭 Personaje:</strong> José García "Cosiaca"<br/>
                                    <strong>🎯 Enfoque:</strong> Humor + Historia + Tecnología<br/>
                                    <strong>📚 Base literaria:</strong> "País de Cosiacas, ciegos y puritanos"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                </section>

                {/* Experiencia Interactiva */}
                <div className="bg-white/90 backdrop-blur-sm p-8 xl:p-1920 rounded-2xl shadow-2xl border border-cosiaca-beige max-w-5xl xl:max-w-6xl mx-auto mb-8 sm:mb-12">
                    <div className="text-center mb-6">
                        <div className="text-4xl xl:text-6xl mb-4">✨</div>
                        <h3 className="text-2xl xl:text-1920-lg font-bold text-cosiaca-brown font-anton mb-4">
                            El Chismecito Histórico de Cosiaca
                        </h3>
                        <p className="text-lg xl:text-1920-base text-cosiaca-brown/80 mb-6">
                            ¿Quieres escuchar un <strong>dato curioso</strong> de la historia de Medellín?
                        </p>
                    </div>
                    
                    <button 
                        onClick={handleGenerateFact} 
                        className="w-full max-w-md xl:max-w-lg mx-auto bg-gradient-to-r from-cosiaca-red to-cosiaca-red-dark text-white font-bold py-4 xl:py-6 px-8 xl:px-12 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg xl:text-1920-base flex items-center justify-center mb-6" 
                        disabled={isLoadingFact}
                    >
                        {isLoadingFact ? (
                            <>
                                <SparklesIcon className="animate-pulse mr-3 w-6 h-6 xl:w-8 xl:h-8" /> 
                                Pensando el chisme...
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="mr-3 w-6 h-6 xl:w-8 xl:h-8" /> 
                                Contar un Chisme Histórico
                            </>
                        )}
                    </button>
                    
                    {historicalFact && (
                        <div className="p-6 bg-cosiaca-cream rounded-xl text-cosiaca-brown relative border border-cosiaca-beige animate-fade-in">
                            <p className="text-lg xl:text-1920-base leading-relaxed font-medium italic text-center">
                                "{historicalFact}"
                            </p>
                            <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-cosiaca-red text-white rounded-full p-2 shadow-lg">
                                <BotIcon className="w-5 h-5" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Accesos Rápidos */}
                <section className="animate-fade-in mb-8 sm:mb-12">
                <div className="responsive-grid max-w-6xl xl:max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <button
                            key={index}
                            onClick={feature.action}
                            className="group bg-white/90 backdrop-blur-sm p-6 xl:p-8 rounded-xl border border-cosiaca-beige hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center"
                        >
                            <div className={`w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-cosiaca-brown text-lg xl:text-1920-base mb-2 group-hover:text-cosiaca-red transition-colors">{feature.title}</h3>
                            <p className="text-sm xl:text-base text-cosiaca-brown/70 group-hover:text-cosiaca-brown transition-colors">{feature.desc}</p>
                        </button>
                    ))}
                </div>
                </section>

                {/* Fuentes e Inspiración */}
                <section className="animate-fade-in mb-8 sm:mb-12">
                <div className="bg-white/90 backdrop-blur-sm p-8 xl:p-1920 rounded-2xl shadow-2xl border border-cosiaca-beige max-w-6xl xl:max-w-7xl mx-auto">
                    <h3 className="text-2xl xl:text-1920-lg font-bold text-cosiaca-brown mb-6 font-anton text-center">
                        🔍 Inspiración y Fuentes Históricas
                    </h3>
                    <div className="responsive-grid gap-8">
                        <div>
                            <p className="text-base xl:text-1920-base text-cosiaca-brown/80 leading-relaxed mb-4">
                                La elección de <strong>archivos históricos y centros de documentación</strong> ancla
                                la narrativa en <em>fuentes auténticas, ricas en valor simbólico y documental</em>,
                                permitiendo reconstruir con <strong>rigor y sensibilidad</strong> el pasado de la ciudad.
                            </p>
                        </div>
                        <div>
                            <ul className="space-y-3 text-cosiaca-brown/80 text-sm xl:text-base">
                                <li><span className="text-cosiaca-red">📸</span> <strong>Fuentes primarias:</strong> Fotografías de los fondos <em>Rodríguez e Ignacio Gómez</em></li>
                                <li><span className="text-cosiaca-red">🏛️</span> <strong>Centros aliados:</strong> <em>Biblioteca Pública Piloto, Museo de Antioquia</em></li>
                                <li><span className="text-cosiaca-red">📰</span> <strong>Hemeroteca:</strong> Prensa satírica y mapas del <em>Archivo Histórico de Medellín</em></li>
                                <li><span className="text-cosiaca-red">🤖</span> <strong>IA Generativa:</strong> Para crear <strong>imágenes, sonidos y estilos visuales únicos</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
                </section>

                {/* Proyecto Oficial */}
                <section className="animate-fade-in mb-8 sm:mb-12">
                <div className="bg-gradient-to-r from-cosiaca-red/10 to-cosiaca-brown/10 p-6 xl:p-8 rounded-2xl border border-cosiaca-beige/50 max-w-6xl xl:max-w-7xl mx-auto text-center">
                    <h3 className="text-2xl xl:text-1920-lg font-bold text-cosiaca-brown mb-3 font-anton">
                        🏛️ Proyecto Oficial
                    </h3>
                    <p className="text-lg xl:text-1920-base text-cosiaca-brown/80 leading-relaxed mb-4">
                        <strong>{"{COSIACA "}<strong>350</strong>{"}"}</strong> es una propuesta transmedia beneficiada de las
                        <em> Convocatorias de Fomento y Estímulos para el Arte y la Cultura 2025</em><br/>
                        <strong>Secretaría de Cultura Ciudadana de Medellín</strong>
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-xs xl:text-sm text-cosiaca-brown/60">
                        <span className="bg-cosiaca-beige/50 px-3 xl:px-4 py-2 rounded-full">📚 Investigación Histórica</span>
                        <span className="bg-cosiaca-beige/50 px-3 xl:px-4 py-2 rounded-full">🤖 Inteligencia Artificial</span>
                        <span className="bg-cosiaca-beige/50 px-3 xl:px-4 py-2 rounded-full">🎭 Cultura Paisa</span>
                        <span className="bg-cosiaca-beige/50 px-3 xl:px-4 py-2 rounded-full">🌐 Transmedia</span>
                        <span className="bg-cosiaca-beige/50 px-3 xl:px-4 py-2 rounded-full">🎪 Entretenimiento</span>
                        <span className="bg-cosiaca-beige/50 px-3 xl:px-4 py-2 rounded-full">📖 Educación</span>
                    </div>
                </div>
                </section>
            </div>
        </div>
    );
};

export default Welcome;