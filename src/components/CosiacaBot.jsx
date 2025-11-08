import React from 'react';
import { BotIcon } from '../icons/Icons';

const ElevenLabsWidget = () => {
    return (
        <div className="animate-fade-in container-1920 mx-auto text-cosiaca-brown space-y-8 px-4">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl xl:text-1920-xl font-black font-anton text-cosiaca-brown">
                    🤖 CosiacaBot
                </h1>
                <p className="text-xl xl:text-1920-base mt-2 text-cosiaca-brown-light/70 lead font-medium">
                    <em>Conversa por voz con el mismísimo Cosiaca sobre la historia de Medellín</em>
                </p>
            </header>
            
            {/* Banner Principal */}
            <div className="bg-gradient-to-r from-cosiaca-brown to-cosiaca-brown/80 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-anton mb-4 text-white">
                    🎙️ Chat por Voz con Inteligencia Artificial
                </h2>
                <p className="text-lg sm:text-xl opacity-90 text-white">
                    Habla directamente con Cosiaca usando tu voz
                </p>
            </div>

            {/* Widget Principal de ElevenLabs */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-cosiaca-beige">
                <div className="text-center mb-6">
                    <BotIcon className="w-16 h-16 xl:w-20 xl:h-20 mx-auto text-cosiaca-red mb-4" />
                    <h3 className="text-2xl sm:text-3xl font-bold font-anton text-cosiaca-brown mb-4">
                        "Habla Conmigo Directamente"
                    </h3>
                    <p className="text-lg xl:text-1920-base text-cosiaca-brown-light/80 mb-6 lead max-w-4xl mx-auto">
                        ¿Querés saber algo de la <strong>historia de Medellín</strong>? <em>¡Hablame directamente!</em> 
                        Tengo <strong>350 años de chismes, cuentos y anécdotas</strong> para contarte con mi propia voz.
                    </p>
                </div>
                
                {/* Widget de ElevenLabs Centrado */}
                <div className="flex justify-center mb-6 p-8 bg-cosiaca-cream/50 rounded-xl border border-cosiaca-beige">
                    <elevenlabs-convai 
                        agent-id="agent_4301k5gpsen4erzt882jhf3ekyby"
                    />
                </div>
                
                {/* Instrucciones de Uso */}
                <div className="grid md:grid-cols-2 gap-6 text-center">
                    <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                        <div className="text-4xl mb-3">🎤</div>
                        <h4 className="font-bold text-cosiaca-brown mb-2 text-lg">Cómo Hablar</h4>
                        <p className="text-cosiaca-brown/80 text-sm">
                            <strong>Presiona y mantén</strong> el botón del micrófono mientras hablas. 
                            Suelta cuando termines tu pregunta.
                        </p>
                    </div>
                    <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                        <div className="text-4xl mb-3">🔊</div>
                        <h4 className="font-bold text-cosiaca-brown mb-2 text-lg">Cómo Escuchar</h4>
                        <p className="text-cosiaca-brown/80 text-sm">
                            Cosiaca te responderá con su propia voz. Asegurate de tener el 
                            <strong> volumen activado</strong> para escuchar sus respuestas.
                        </p>
                    </div>
                </div>
            </div>

            {/* Preguntas Sugeridas */}
            <div className="bg-white rounded-2xl shadow-lg border border-cosiaca-beige p-6">
                <h3 className="text-2xl font-bold text-cosiaca-brown mb-6 text-center font-anton">
                    💡 Preguntas que Puedes Hacerle a Cosiaca
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        "¿Cómo era Medellín cuando se fundó?",
                        "Contame un chisme histórico",
                        "¿Qué pasó en el siglo XIX?",
                        "¿Cómo llegó el café a Antioquia?",
                        "¿Quién fue el primer alcalde?",
                        "Contame sobre el Metro de Medellín",
                        "¿Qué sabes de Fernando Botero?",
                        "Háblame de la Feria de las Flores",
                        "¿Cómo era la vida de los arrieros?",
                        "Contame sobre la industrialización",
                        "¿Qué cambió en Medellín en el siglo XXI?",
                        "¿Cuáles son las tradiciones paisas?"
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
                    <h3 className="text-xl xl:text-1920-base font-bold text-cosiaca-brown mb-3 font-anton">🎭 ¿Qué puedo contarte?</h3>
                    <ul className="space-y-2 text-cosiaca-brown-light/80 text-base xl:text-1920-base">
                        <li>• <strong>Historias de la fundación de Medellín (1675)</strong></li>
                        <li>• <em>Anécdotas del auge cafetero</em></li>
                        <li>• <strong>Cuentos de arrieros y comerciantes</strong></li>
                        <li>• <em>La transformación de la ciudad</em></li>
                        <li>• <strong>Tradiciones y costumbres paisas</strong></li>
                        <li>• <em>Personajes históricos curiosos</em></li>
                        <li>• <strong>Chismes y anécdotas divertidas</strong></li>
                        <li>• <em>La Medellín innovadora de hoy</em></li>
                    </ul>
                </div>
                <div className="bg-cosiaca-beige/30 p-6 xl:p-8 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl xl:text-1920-base font-bold text-cosiaca-brown mb-3 font-anton">🤖 Tecnología Avanzada</h3>
                    <ul className="space-y-2 text-cosiaca-brown-light/80 text-base xl:text-1920-base">
                        <li>• <strong>Inteligencia Artificial:</strong> <em>ElevenLabs ConvAI</em></li>
                        <li>• <strong>Reconocimiento de Voz:</strong> <em>Tiempo real</em></li>
                        <li>• <strong>Síntesis de Voz:</strong> <em>Voz natural de Cosiaca</em></li>
                        <li>• <strong>Compatibilidad:</strong> <em>Móviles y escritorio</em></li>
                        <li>• <strong>Idioma:</strong> <em>Español colombiano</em></li>
                        <li>• <strong>Personalidad:</strong> <em>Humor paisa auténtico</em></li>
                    </ul>
                </div>
            </div>

            {/* Información del Proyecto */}
            <div className="bg-cosiaca-beige/30 p-6 xl:p-8 rounded-xl border border-cosiaca-beige text-center">
                <h3 className="text-2xl xl:text-1920-lg font-bold font-anton text-cosiaca-brown mb-4">
                    🧠 Sobre CosiacaBot
                </h3>
                <p className="text-cosiaca-brown-light/80 text-lg xl:text-1920-base lead mb-6">
                    Este <strong>asistente de voz con IA</strong> está entrenado con <em>información histórica real de Medellín</em> y 
                    habla con la personalidad auténtica de <strong>José García "Cosiaca"</strong>, el <em>primer comediante 
                    popular de Antioquia</em>. Combina <strong>rigor histórico</strong> con el <em>humor y la picardía paisa 
                    característica del personaje</em>.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
                        <h4 className="font-bold text-green-800 mb-2 text-base xl:text-1920-base">🎙️ Chat por Voz</h4>
                        <p className="text-sm xl:text-base text-green-700">
                            Habla directamente con Cosiaca usando ElevenLabs ConvAI. 
                            Presiona y mantén el botón para hablar, suelta para escuchar su respuesta.
                        </p>
                    </div>
                    <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
                        <h4 className="font-bold text-blue-800 mb-2 text-base xl:text-1920-base">📚 Conocimiento Histórico</h4>
                        <p className="text-sm xl:text-base text-blue-700">
                            Información verificada sobre 350 años de historia de Medellín, 
                            desde la fundación en 1675 hasta la ciudad innovadora de hoy.
                        </p>
                    </div>
                </div>
                
                <div className="mt-6 p-4 bg-cosiaca-cream rounded-lg border border-cosiaca-beige">
                    <p className="text-sm xl:text-base text-cosiaca-brown italic">
                        <strong>🎭 "¡Ey mijito! Hablame sin pena que tengo tiempo y ganas de contarte 
                        todas las historias de nuestra bella Medellín. ¿Sabés por qué me gusta tanto 
                        conversar? ¡Porque las mejores historias se cuentan de voz a voz, como hacían 
                        nuestros abuelos paisas!"</strong> - Cosiaca
                    </p>
                </div>
            </div>
        </div>
    );
};

const CosiacaBot = () => {
    return <ElevenLabsWidget />;
};

export default CosiacaBot;