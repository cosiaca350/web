import React from 'react';
import { BotIcon } from '../icons/Icons';
import AIService from '../services/aiService';

// Componente del widget de ElevenLabs
const ElevenLabsWidget = () => {
    React.useEffect(() => {
        // Cargar el script de ElevenLabs si no está ya cargado
        if (!window.ElevenLabsConvAI) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
            script.async = true;
            script.type = 'text/javascript';
            document.head.appendChild(script);
        }
    }, []);

    return (
        <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige text-center">
            <h3 className="text-2xl font-bold font-serif text-cosiaca-brown mb-4">
                🎙️ Habla con Cosiaca por Voz
            </h3>
            <p className="text-lg text-cosiaca-brown-light/80 mb-6">
                ¡Ahora podés conversar con Cosiaca usando tu voz! Presiona el botón y pregúntale sobre la historia de Medellín.
            </p>
            
            {/* Widget de ElevenLabs */}
            <div className="flex justify-center mb-4">
                <elevenlabs-convai 
                    agent-id="tu-agent-id-aqui"
                    style={{
                        width: '300px',
                        height: '200px',
                        borderRadius: '12px',
                        border: '2px solid #8B6F47'
                    }}
                />
            </div>
            
            <div className="text-sm text-cosiaca-brown/60 space-y-2">
                <p>🎤 <strong>Presiona y mantén</strong> para hablar</p>
                <p>🔊 <strong>Escucha</strong> las respuestas de Cosiaca</p>
                <p>📱 <strong>Compatible</strong> con móviles y escritorio</p>
            </div>
        </div>
    );
};

const CosiacaBot = () => {
    const [activeTab, setActiveTab] = React.useState('chat');
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
                content: '¡Uy, mijito! Se me enredó la lengua por un momento, pero ya estoy aquí. ¿Qué querés saber sobre la historia de Medellín? ¡Preguntame de nuevo!' 
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
            
            {/* Navegación entre Chat y Voz */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setActiveTab('chat')}
                    className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                        activeTab === 'chat' 
                            ? 'bg-cosiaca-red text-white shadow-lg' 
                            : 'bg-cosiaca-beige text-cosiaca-brown hover:bg-cosiaca-beige/70'
                    }`}
                >
                    💬 Chat de Texto
                </button>
                <button
                    onClick={() => setActiveTab('voice')}
                    className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                        activeTab === 'voice' 
                            ? 'bg-cosiaca-red text-white shadow-lg' 
                            : 'bg-cosiaca-beige text-cosiaca-brown hover:bg-cosiaca-beige/70'
                    }`}
                >
                    🎙️ Chat por Voz
                </button>
            </div>

            {/* Contenido según la pestaña activa */}
            {activeTab === 'voice' && <ElevenLabsWidget />}
            
            {activeTab === 'chat' && (
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
            )}

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
                
                <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
                        <h4 className="font-bold text-blue-800 mb-2">💬 Chat de Texto</h4>
                        <p className="text-sm text-blue-700">
                            Conversa escribiendo tus preguntas. Ideal para consultas detalladas y referencias históricas precisas.
                        </p>
                    </div>
                    <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
                        <h4 className="font-bold text-green-800 mb-2">🎙️ Chat por Voz</h4>
                        <p className="text-sm text-green-700">
                            Habla directamente con Cosiaca usando tu micrófono. Una experiencia más natural e inmersiva.
                        </p>
                    </div>
                </div>
                
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