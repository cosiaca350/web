import React from 'react';
import { BotIcon } from '../icons/Icons';

const ElevenLabsWidget = () => {
    return (
        <div className="animate-fade-in container-1920 mx-auto text-cosiaca-brown space-y-8 px-4">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl xl:text-1920-xl font-black font-anton text-cosiaca-brown">
                    🤖 CosiacaBot
                </h1>
                <p className="text-xl xl:text-1920-base mt-4 text-cosiaca-brown-light/90 lead font-semibold italic">
                    El mismísimo Cosiaca, revivido con inteligencia artificial para conversar contigo sobre 350 años de historia paisa.
                </p>
                <p className="text-lg xl:text-1920-base mt-3 text-cosiaca-brown font-medium">
                    "Preguntame lo que querás, que tengo más cuentos que una abuela en día de lluvia."
                </p>
            </header>
            
            {/* Banner Principal */}
            <div className="bg-gradient-to-r from-cosiaca-brown to-cosiaca-brown/80 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-anton mb-4 text-white">
                    🎙️ Hablar con Cosiaca
                </h2>
                <p className="text-lg sm:text-xl opacity-90 text-white">
                    Conectate directamente con el cuentero más pícaro de Medellín
                </p>
            </div>

            {/* Widget Principal de ElevenLabs */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-cosiaca-beige">
                <div className="text-center mb-6">
                    <BotIcon className="w-16 h-16 xl:w-20 xl:h-20 mx-auto text-cosiaca-red mb-4" />
                    <h3 className="text-2xl sm:text-3xl font-bold font-anton text-cosiaca-brown mb-4">
                        "¿Qué es CosiacaBot?"
                    </h3>
                    <p className="text-lg xl:text-1920-base text-cosiaca-brown-light/80 mb-6 lead max-w-4xl mx-auto">
                        <strong>CosiacaBot</strong> es una pieza interactiva de voz e inteligencia artificial creada por <em>Núcleo Colectivo</em> como parte del proyecto <strong>COSIACA 350 / Un Viaje Inmersivo a la Historia de Medellín</strong>, ganador de las Convocatorias de Estímulos 2025.
                    </p>
                    <p className="text-lg xl:text-1920-base text-cosiaca-brown-light/80 mb-6 lead max-w-4xl mx-auto">
                        Entrenado con archivos históricos reales y el humor popular paisa, este bot revive al legendario cuentero <strong>José García 'Cosiaca'</strong>, primer humorista popular de Antioquia, para que te eche cuentos, chismes y anécdotas de nuestra ciudad como si estuviera aquí mismito.
                    </p>
                </div>
                
                {/* Widget de ElevenLabs Centrado */}
                <div className="flex justify-center mb-6 p-8 bg-cosiaca-cream/50 rounded-xl border border-cosiaca-beige">
                    <elevenlabs-convai 
                        agent-id="agent_4301k5gpsen4erzt882jhf3ekyby"
                    />
                </div>
                
                {/* Instrucciones de Uso */}
                <div className="bg-cosiaca-cream/50 rounded-xl border border-cosiaca-beige p-6 mb-6">
                    <h4 className="text-xl font-bold font-anton text-cosiaca-brown mb-4 text-center">
                        🎙️ "Habla conmigo"
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6 text-center">
                        <div className="bg-white p-6 rounded-xl border border-cosiaca-beige shadow-sm">
                            <div className="text-4xl mb-3">🎤</div>
                            <h5 className="font-bold text-cosiaca-brown mb-2 text-lg">Cómo hablar</h5>
                            <p className="text-cosiaca-brown/80 text-sm">
                                <strong>Mantené oprimido</strong> el botón del micrófono y <strong>soltalo cuando terminés</strong> tu pregunta.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-cosiaca-beige shadow-sm">
                            <div className="text-4xl mb-3">🔊</div>
                            <h5 className="font-bold text-cosiaca-brown mb-2 text-lg">Cómo escuchar</h5>
                            <p className="text-cosiaca-brown/80 text-sm">
                                <strong>Subí el volumen</strong>, que Cosiaca te contesta con su propia voz, hecha con <em>ElevenLabs ConvAI</em>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preguntas Sugeridas */}
            <div className="bg-white rounded-2xl shadow-lg border border-cosiaca-beige p-6">
                <h3 className="text-2xl font-bold text-cosiaca-brown mb-6 text-center font-anton">
                    💬 Ejemplos de lo que podés preguntarme
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        "¿Cómo era Medellín cuando se fundó?",
                        "Contame un chisme histórico",
                        "¿Qué sabes del Metro?",
                        "¿Quién fue la Madre Laura?",
                        "Cantame una trova sobre la Feria de las Flores",
                        "¿Cómo llegó el café a Antioquia?",
                        "Háblame de los arrieros paisas",
                        "¿Qué sabes de Fernando Botero?",
                        "Contame sobre la industrialización",
                        "¿Cómo cambió Medellín en el siglo XXI?",
                        "¿Cuáles son las tradiciones paisas?",
                        "Echame un cuento de la época colonial"
                    ].map((question, index) => (
                        <div
                            key={index}
                            className="p-4 bg-cosiaca-beige/50 rounded-lg border border-cosiaca-beige hover:bg-cosiaca-beige/70 transition-colors"
                        >
                            <p className="text-sm text-cosiaca-brown italic">
                                "{question}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Información Técnica */}
            <div className="responsive-grid">
                <div className="bg-cosiaca-beige/30 p-6 xl:p-8 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl xl:text-1920-base font-bold text-cosiaca-brown mb-3 font-anton">🎭 ¿Qué te puedo contar?</h3>
                    <ul className="space-y-2 text-cosiaca-brown-light/80 text-base xl:text-1920-base">
                        <li>📜 <strong>Historias de la fundación (1675)</strong></li>
                        <li>☕ <em>El auge cafetero y los arrieros</em></li>
                        <li>🏭 <strong>La industrialización y el siglo XX</strong></li>
                        <li>💃 <em>Tradiciones, trova y humor paisa</em></li>
                        <li>🎨 <strong>La Medellín innovadora de hoy</strong></li>
                        <li>😄 <em>Chismes, dichos y personajes curiosos</em></li>
                    </ul>
                </div>
                <div className="bg-cosiaca-beige/30 p-6 xl:p-8 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl xl:text-1920-base font-bold text-cosiaca-brown mb-3 font-anton">⚙️ Tecnología y Arte</h3>
                    <ul className="space-y-2 text-cosiaca-brown-light/80 text-base xl:text-1920-base">
                        <li>• <strong>Voz y diálogo:</strong> <em>ElevenLabs ConvAI</em></li>
                        <li>• <strong>Reconocimiento de voz en tiempo real</strong></li>
                        <li>• <strong>Entrenamiento histórico verificado</strong></li>
                        <li>• <strong>Personalidad:</strong> <em>Humor paisa auténtico</em></li>
                        <li>• <strong>Compatibilidad:</strong> <em>móviles y escritorio</em></li>
                        <li>• <strong>Idioma:</strong> <em>Español colombiano</em></li>
                    </ul>
                </div>
            </div>

            {/* Información del Proyecto */}
            <div className="bg-cosiaca-beige/30 p-6 xl:p-8 rounded-xl border border-cosiaca-beige text-center">
                <h3 className="text-2xl xl:text-1920-lg font-bold font-anton text-cosiaca-brown mb-4">
                    🧠 Detrás del personaje
                </h3>
                <p className="text-cosiaca-brown-light/80 text-lg xl:text-1920-base lead mb-6">
                    <strong>CosiacaBot hace parte de una obra transmedia</strong> que incluye:
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-white border border-cosiaca-beige rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-2">🎧</div>
                        <h4 className="font-bold text-cosiaca-brown mb-1 text-base">Podcast Histórico</h4>
                        <p className="text-sm text-cosiaca-brown/70">Humor + historia paisa</p>
                    </div>
                    <div className="p-4 bg-white border border-cosiaca-beige rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-2">🎥</div>
                        <h4 className="font-bold text-cosiaca-brown mb-1 text-base">Videos IA</h4>
                        <p className="text-sm text-cosiaca-brown/70">Clips animados y narrativos</p>
                    </div>
                    <div className="p-4 bg-white border border-cosiaca-beige rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-2">📚</div>
                        <h4 className="font-bold text-cosiaca-brown mb-1 text-base">Libro Ilustrado</h4>
                        <p className="text-sm text-cosiaca-brown/70">País de Cosiacas, Ciegos y Puritanos</p>
                    </div>
                    <div className="p-4 bg-white border border-cosiaca-beige rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-2">🕹️</div>
                        <h4 className="font-bold text-cosiaca-brown mb-1 text-base">Juegos y AR</h4>
                        <p className="text-sm text-cosiaca-brown/70">Experiencias interactivas</p>
                    </div>
                    <div className="p-4 bg-white border border-cosiaca-beige rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-2">💻</div>
                        <h4 className="font-bold text-cosiaca-brown mb-1 text-base">Plataforma Web</h4>
                        <p className="text-sm text-cosiaca-brown/70">Línea de tiempo interactiva</p>
                    </div>
                    <div className="p-4 bg-white border border-cosiaca-beige rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-2">📱</div>
                        <h4 className="font-bold text-cosiaca-brown mb-1 text-base">Redes Sociales</h4>
                        <p className="text-sm text-cosiaca-brown/70">Contenido cultural diario</p>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-cosiaca-brown/10 to-cosiaca-beige rounded-xl border-2 border-cosiaca-brown/20">
                    <p className="text-lg xl:text-1920-base text-cosiaca-brown italic font-semibold leading-relaxed">
                        "¡Ey mijito! Hablame sin pena, que tengo tiempo y ganas de contarte todas las historias de nuestra bella Medellín! Las mejores historias se cuentan de voz a voz, como hacían nuestros abuelos paisa."
                    </p>
                    <p className="text-sm text-cosiaca-brown/70 mt-3">
                        — Cosiaca, el cuentero que resucitó en voz IA.
                    </p>
                </div>
            </div>

            {/* Pie de página */}
            <div className="text-center text-sm text-cosiaca-brown/60 py-6 border-t border-cosiaca-beige">
                <p className="mb-1">
                    <strong>© 2025 COSIACA 350</strong> · Un viaje inmersivo a la historia de Medellín
                </p>
                <p>
                    Proyecto de <em>Núcleo Colectivo</em> · Convocatoria de Estímulos 2025 · Secretaría de Cultura Ciudadana
                </p>
            </div>
        </div>
    );
};

const CosiacaBot = () => {
    return <ElevenLabsWidget />;
};

export default CosiacaBot;