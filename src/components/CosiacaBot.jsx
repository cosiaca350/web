import React, { useState, useEffect } from 'react';
import { BotIcon } from '../icons/Icons';

const CosiacaBot = () => {
    const [widgetLoaded, setWidgetLoaded] = useState(false);
    const [widgetActive, setWidgetActive] = useState(false);

    const loadWidget = () => {
        if (!widgetLoaded) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
            script.async = true;
            script.type = 'text/javascript';
            script.onload = () => {
                setWidgetLoaded(true);
                setTimeout(() => setWidgetActive(true), 500);
            };
            document.body.appendChild(script);
        } else {
            setWidgetActive(true);
        }
    };

    return (
        <div className="animate-fade-in max-w-5xl mx-auto text-cosiaca-brown space-y-6 px-4 py-6">
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-black font-anton text-cosiaca-brown">
                    🤖 CosiacaBot
                </h1>
                <p className="text-base md:text-lg mt-3 text-cosiaca-brown-light/90 italic">
                    El mismísimo Cosiaca, revivido con inteligencia artificial para conversar contigo sobre 350 años de historia paisa.
                </p>
                <p className="text-sm md:text-base mt-2 text-cosiaca-brown font-medium">
                    "Preguntame lo que querás, que tengo más cuentos que una abuela en día de lluvia."
                </p>
            </header>

            {!widgetActive ? (
                <div className="bg-gradient-to-r from-cosiaca-red to-cosiaca-red/90 rounded-2xl shadow-xl p-8 text-center text-white">
                    <BotIcon className="w-16 h-16 mx-auto text-white mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-anton mb-3 text-white">
                        🎙️ Hablar con Cosiaca
                    </h2>
                    <p className="text-base md:text-lg opacity-90 text-white mb-6">
                        Conectate directamente con el cuentero más pícaro de Medellín
                    </p>
                    <button
                        onClick={loadWidget}
                        className="bg-white text-cosiaca-red font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        🎤 Comenzar Conversación
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-2xl p-6 border border-cosiaca-beige">
                    <div className="text-center mb-4">
                        <BotIcon className="w-12 h-12 mx-auto text-cosiaca-red mb-3" />
                        <h3 className="text-xl md:text-2xl font-bold font-anton text-cosiaca-brown mb-3">
                            "¿Qué es CosiacaBot?"
                        </h3>
                        <p className="text-sm md:text-base text-cosiaca-brown-light/80 mb-4 max-w-3xl mx-auto">
                            <strong>CosiacaBot</strong> es una pieza interactiva de voz e inteligencia artificial creada por <em>Núcleo Colectivo</em> como parte del proyecto <strong>COSIACA 350</strong>.
                        </p>
                    </div>

                    <div className="flex justify-center mb-4 p-6 bg-cosiaca-cream/50 rounded-xl border border-cosiaca-beige">
                        <elevenlabs-convai agent-id="agent_4301k5gpsen4erzt882jhf3ekyby" />
                    </div>

                    <div className="bg-cosiaca-cream/50 rounded-xl border border-cosiaca-beige p-4 mb-4">
                        <h4 className="text-lg font-bold font-anton text-cosiaca-brown mb-3 text-center">
                            🎙️ Cómo usar
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3 text-center">
                            <div className="bg-white p-3 rounded-lg border border-cosiaca-beige shadow-sm">
                                <div className="text-2xl mb-1">📞</div>
                                <h5 className="font-bold text-cosiaca-brown mb-1 text-sm">Cómo hablar</h5>
                                <p className="text-cosiaca-brown/80 text-xs">
                                    Oprimí el botón de llamar para hablar con Cosiaca.
                                </p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-cosiaca-beige shadow-sm">
                                <div className="text-2xl mb-1">🔊</div>
                                <h5 className="font-bold text-cosiaca-brown mb-1 text-sm">Cómo escuchar</h5>
                                <p className="text-cosiaca-brown/80 text-xs">
                                    Subí el volumen, que Cosiaca te contesta con su propia voz.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-lg border border-cosiaca-beige p-5">
                <h3 className="text-xl font-bold text-cosiaca-brown mb-4 text-center font-anton">
                    💬 Ejemplos de preguntas
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                        "¿Cómo era Medellín cuando se fundó?",
                        "Contame un chisme histórico",
                        "¿Qué sabes del Metro?",
                        "¿Quién fue la Madre Laura?",
                        "Cantame una trova paisa",
                        "¿Cómo llegó el café a Antioquia?",
                        "Háblame de los arrieros",
                        "¿Qué sabes de Botero?",
                        "Contame de la industrialización"
                    ].map((question, index) => (
                        <div
                            key={index}
                            className="p-2.5 bg-cosiaca-beige/50 rounded-lg border border-cosiaca-beige hover:bg-cosiaca-beige/70 transition-colors"
                        >
                            <p className="text-xs text-cosiaca-brown italic">
                                "{question}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-cosiaca-beige/30 p-5 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-lg font-bold text-cosiaca-brown mb-3 font-anton">🎭 Temas que manejo</h3>
                    <ul className="space-y-1.5 text-cosiaca-brown-light/80 text-sm">
                        <li>📜 Historias de la fundación (1675)</li>
                        <li>☕ El auge cafetero y los arrieros</li>
                        <li>🏭 La industrialización del siglo XX</li>
                        <li>💃 Tradiciones, trova y humor paisa</li>
                        <li>🎨 La Medellín innovadora de hoy</li>
                        <li>😄 Chismes, dichos y personajes</li>
                    </ul>
                </div>
                <div className="bg-cosiaca-beige/30 p-5 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-lg font-bold text-cosiaca-brown mb-3 font-anton">⚙️ Tecnología</h3>
                    <ul className="space-y-1.5 text-cosiaca-brown-light/80 text-sm">
                        <li>• Voz IA: ElevenLabs ConvAI</li>
                        <li>• Reconocimiento de voz en tiempo real</li>
                        <li>• Entrenamiento histórico verificado</li>
                        <li>• Humor paisa auténtico</li>
                        <li>• Compatible con móviles</li>
                        <li>• Idioma: Español colombiano</li>
                    </ul>
                </div>
            </div>

            <div className="bg-cosiaca-beige/30 p-5 rounded-xl border border-cosiaca-beige text-center">
                <h3 className="text-xl font-bold font-anton text-cosiaca-brown mb-3">
                    🧠 Parte del proyecto transmedia
                </h3>
                <p className="text-cosiaca-brown-light/80 text-sm mb-4">
                    CosiacaBot hace parte de una obra transmedia que incluye:
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                    <div className="p-3 bg-white border border-cosiaca-beige rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-1">🎧</div>
                        <h4 className="font-bold text-cosiaca-brown mb-0.5 text-xs">Podcast</h4>
                        <p className="text-xs text-cosiaca-brown/70">Humor + historia</p>
                    </div>
                    <div className="p-3 bg-white border border-cosiaca-beige rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-1">🎥</div>
                        <h4 className="font-bold text-cosiaca-brown mb-0.5 text-xs">Videos IA</h4>
                        <p className="text-xs text-cosiaca-brown/70">Clips animados</p>
                    </div>
                    <div className="p-3 bg-white border border-cosiaca-beige rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-1">📚</div>
                        <h4 className="font-bold text-cosiaca-brown mb-0.5 text-xs">Libro</h4>
                        <p className="text-xs text-cosiaca-brown/70">País de Cosiacas</p>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-cosiaca-brown/10 to-cosiaca-beige rounded-xl border-2 border-cosiaca-brown/20">
                    <p className="text-sm text-cosiaca-brown italic font-semibold leading-relaxed">
                        "¡Ey mijito! Hablame sin pena, que tengo tiempo y ganas de contarte todas las historias de nuestra bella Medellín!"
                    </p>
                    <p className="text-xs text-cosiaca-brown/70 mt-2">
                        — Cosiaca, el cuentero que resucitó en voz IA
                    </p>
                </div>
            </div>

            <div className="text-center text-xs text-cosiaca-brown/60 py-4 border-t border-cosiaca-beige">
                <p className="mb-1">
                    <strong>© 2025 COSIACA 350</strong> · Un viaje inmersivo a la historia de Medellín
                </p>
                <p>
                    Proyecto de <em>Núcleo Colectivo</em> · Convocatoria de Estímulos 2025
                </p>
            </div>
        </div>
    );
};

export default CosiacaBot;
