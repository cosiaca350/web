import React from 'react';
import { BotIcon } from '../icons/Icons';

const CosiacaBot = () => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto text-cosiaca-brown space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-black font-serif text-cosiaca-brown">
                    🤖 CosiacaBot
                </h1>
                <p className="text-xl mt-2 text-cosiaca-brown-light/70 lead font-medium">
                    <em>Conversa con el mismísimo Cosiaca sobre la historia de Medellín</em>
                </p>
            </header>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige text-center">
                <BotIcon className="w-16 h-16 mx-auto text-cosiaca-red mb-4" />
                <h2 className="text-2xl font-bold font-serif text-cosiaca-brown mb-4">
                    "¡Hola, mijito! Soy Cosiaca"
                </h2>
                <p className="text-lg text-cosiaca-brown-light/80 mb-6 lead">
                    ¿Querés saber algo de la <strong>historia de Medellín</strong>? <em>¡Preguntame lo que se te ocurra!</em> 
                    Tengo <strong>350 años de chismes, cuentos y anécdotas</strong> para contarte. 
                    Desde la fundación hasta hoy, yo he visto todo con estos <em>ojitos pícaros</em>.
                </p>
                
                {/* Widget de ElevenLabs */}
                <div className="bg-cosiaca-cream/50 p-6 rounded-lg border border-cosiaca-beige">
                    <p className="text-cosiaca-brown mb-4 font-bold text-lg">
                        👇 <strong>Dale clic al botón de abajo para empezar a conversar conmigo</strong>
                    </p>
                    <elevenlabs-convai agent-id="agent_4301k5gpsen4erzt882jhf3ekyby"></elevenlabs-convai>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-serif">🎭 ¿Qué puedo contarte?</h3>
                    <ul className="space-y-2 text-cosiaca-brown-light/80 text-lg">
                        <li>• <strong>Historias de la fundación de Medellín</strong></li>
                        <li>• <em>Anécdotas del auge cafetero</em></li>
                        <li>• <strong>Cuentos de arrieros y comerciantes</strong></li>
                        <li>• <em>La transformación de la ciudad</em></li>
                        <li>• <strong>Tradiciones y costumbres paisas</strong></li>
                        <li>• <em>Personajes históricos curiosos</em></li>
                    </ul>
                </div>
                <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-serif">💬 Ejemplos de preguntas</h3>
                    <ul className="space-y-2 text-cosiaca-brown-light/80 text-lg">
                        <li>• "¿Cómo era Medellín cuando se fundó?"</li>
                        <li>• "Contame un chisme histórico"</li>
                        <li>• "¿Qué pasó en el siglo XIX?"</li>
                        <li>• "¿Cómo llegó el café a Antioquia?"</li>
                        <li>• "¿Quién fue el primer alcalde?"</li>
                        <li>• "Contame una historia divertida"</li>
                    </ul>
                </div>
            </div>

            <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige text-center">
                <h3 className="text-2xl font-bold font-serif text-cosiaca-brown mb-4">
                    🧠 Sobre CosiacaBot
                </h3>
                <p className="text-cosiaca-brown-light/80 lead">
                    Este <strong>asistente virtual</strong> está entrenado con <em>información histórica real de Medellín</em> y 
                    habla con la personalidad auténtica de <strong>José García "Cosiaca"</strong>, el <em>primer comediante 
                    popular de Antioquia</em>. Combina <strong>rigor histórico</strong> con el <em>humor y la picardía paisa 
                    característica del personaje</em>.
                </p>
            </div>
        </div>
    );
};

export default CosiacaBot;