import React from 'react';
import { BotIcon } from '../icons/Icons';
import AIService from '../services/aiService';

const CosiacaBot = () => {
    const [messages, setMessages] = React.useState([
        {
            type: 'bot',
            content: '¡Hola, mijito! Soy Cosiaca, el cuentero más pícaro de Antioquia. ¿Qué querés saber sobre la historia de Medellín? ¡Preguntame lo que se te ocurra!'
        }
    ]);
    const [inputMessage, setInputMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');
        
        // Agregar mensaje del usuario
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            // Generar respuesta con AI Service (múltiples proveedores)
            const response = await AIService.answerAsCosiaca(userMessage);
            
            // Agregar respuesta de Cosiaca
            setMessages(prev => [...prev, { type: 'bot', content: response }]);
        } catch (error) {
            console.error('Error getting response:', error);
            setMessages(prev => [...prev, { 
                type: 'bot', 
                content: '¡Uy, mijito! Se me enredó la lengua. Intentá preguntarme de nuevo, ¿sí?' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

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
                    "Conversa Conmigo Directamente"
                </h2>
                <p className="text-lg text-cosiaca-brown-light/80 mb-6 lead">
                    ¿Querés saber algo de la <strong>historia de Medellín</strong>? <em>¡Preguntame lo que se te ocurra!</em> 
                    Tengo <strong>350 años de chismes, cuentos y anécdotas</strong> para contarte. 
                    Desde la fundación hasta hoy, yo he visto todo con estos <em>ojitos pícaros</em>.
                </p>
                
                {/* Chat Interface */}
                <div className="bg-white rounded-xl shadow-lg border border-cosiaca-beige overflow-hidden">
                    {/* Messages Area */}
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                        message.type === 'user'
                                            ? 'bg-cosiaca-red text-white user-message'
                                            : 'bg-cosiaca-beige text-cosiaca-brown bot-message'
                                    }`}
                                >
                                    {message.type === 'bot' && (
                                        <div className="flex items-start space-x-2">
                                            <BotIcon className="w-5 h-5 mt-1 flex-shrink-0" />
                                            <p className="text-sm leading-relaxed">{message.content}</p>
                                        </div>
                                    )}
                                    {message.type === 'user' && (
                                        <p className="text-sm leading-relaxed">{message.content}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-cosiaca-beige text-cosiaca-brown px-4 py-2 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <BotIcon className="w-5 h-5" />
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-cosiaca-red rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-cosiaca-red rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-cosiaca-red rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Input Area */}
                    <div className="border-t border-cosiaca-beige p-4">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Pregúntale a Cosiaca sobre la historia de Medellín..."
                                className="flex-1 px-4 py-2 border border-cosiaca-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-cosiaca-red"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading || !inputMessage.trim()}
                                className="bg-cosiaca-red text-white px-6 py-2 rounded-lg hover:bg-cosiaca-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
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
                <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                    <p className="text-sm text-green-800">
                        <strong>🤖 Potenciado por IA:</strong> Este chatbot utiliza inteligencia artificial avanzada 
                        para generar respuestas auténticas como Cosiaca. Cada conversación es única y se basa en 
                        información histórica real de Medellín.
                    </p>
                </div>
                <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded-lg">
                    <p className="text-sm text-blue-800">
                        <strong>💡 Consejo:</strong> Pregúntale sobre fechas específicas, personajes históricos, 
                        eventos importantes, o pídele que te cuente anécdotas divertidas de la historia paisa.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CosiacaBot;