import React from 'react';
import { BotIcon } from '../icons/Icons';

const CosiacaBot = () => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto text-cosiaca-brown space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-cosiaca-brown">
                    🤖 CosiacaBot
                </h1>
                <p className="text-xl mt-2 text-cosiaca-brown-light/70">
                    Conversa con el mismísimo Cosiaca sobre la historia de Medellín
                </p>
            </header>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige text-center">
                <BotIcon className="w-16 h-16 mx-auto text-cosiaca-red mb-4" />
                <h2 className="text-2xl font-serif text-cosiaca-brown mb-4">
                    "¡Hola, mijito! Soy Cosiaca"
                </h2>
                <p className="text-lg text-cosiaca-brown-light/80 mb-6">
                    ¿Querés saber algo de la historia de Medellín? ¡Preguntame lo que se te ocurra! 
                    Tengo 350 años de chismes, cuentos y anécdotas para contarte. 
                    Desde la fundación hasta hoy, yo he visto todo con estos ojitos pícaros.
                </p>
                
                {/* Widget de ElevenLabs */}
                <div className="bg-cosiaca-cream/50 p-6 rounded-lg border border-cosiaca-beige">
                    <p className="text-cosiaca-brown mb-4 font-medium">
                        👇 Dale clic al botón de abajo para empezar a conversar conmigo
                    </p>
                    <elevenlabs-convai agent-id="agent_4301k5gpsen4erzt882jhf3ekyby"></elevenlabs-convai>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl font-bold text-cosiaca-brown mb-3">🎭 ¿Qué puedo contarte?</h3>
                    <ul className="space-y-2 text-cosiaca-brown-light/80">
                        <li>• Historias de la fundación de Medellín</li>
                        <li>• Anécdotas del auge cafetero</li>
                        <li>• Cuentos de arrieros y comerciantes</li>
                        <li>• La transformación de la ciudad</li>
                        <li>• Tradiciones y costumbres paisas</li>
                        <li>• Personajes históricos curiosos</li>
                    </ul>
                </div>
                <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl font-bold text-cosiaca-brown mb-3">💬 Ejemplos de preguntas</h3>
                    <ul className="space-y-2 text-cosiaca-brown-light/80">
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
                <h3 className="text-2xl font-serif text-cosiaca-brown mb-4">
                    🧠 Sobre CosiacaBot
                </h3>
                <p className="text-cosiaca-brown-light/80">
                    Este asistente virtual está entrenado con información histórica real de Medellín y 
                    habla con la personalidad auténtica de José García "Cosiaca", el primer comediante 
                    popular de Antioquia. Combina rigor histórico con el humor y la picardía paisa 
                    característica del personaje.
                </p>
            </div>
        </div>
    );
};

export default CosiacaBot;