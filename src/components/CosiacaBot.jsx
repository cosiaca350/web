import React from 'react';
import { BotIcon } from '../icons/Icons';
import AIService from '../services/aiService';
import { SendIcon } from '../icons/Icons';

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
            <div className="flex justify-center mb-4 border-t pt-4">
                <elevenlabs-convai 
                    agent-id="agent_4301k5gpsen4erzt882jhf3ekyby"
                />
            </div>
            
            <div className="text-sm text-cosiaca-brown/60 space-y-2">
                <p>🎤 <strong>Presiona y mantén</strong> para hablar</p>
                <p>🔊 <strong>Escucha</strong> las respuestas de Cosiaca</p>
                <p>📱 <strong>Compatible</strong> con móviles y escritorio</p>
                <p>🤖 <strong>IA Conversacional</strong> con personalidad de Cosiaca</p>
            </div>
            
            <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-sm text-green-800">
                    <strong>✅ Widget Activo:</strong> El chat por voz está configurado y listo para usar. 
                    Habla directamente con Cosiaca sobre la historia de Medellín.
                </p>
            </div>
        </div>
    );
};

const CosiacaBot = () => {
    const [activeTab, setActiveTab] = React.useState('chat');
    const [messages, setMessages] = React.useState([
        {
            id: 1,
            type: 'bot',
            content: '¡Hola, mijito! Soy Cosiaca, el cuentero más pícaro de Antioquia. ¿Qué querés saber sobre la historia de Medellín? ¡Preguntame lo que se te ocurra!',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [messageId, setMessageId] = React.useState(2);
    const messagesEndRef = React.useRef(null);

    // Auto-scroll al final de los mensajes
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Preguntas sugeridas
    const suggestedQuestions = [
        "¿Cómo era Medellín cuando se fundó?",
        "Contame un chisme histórico",
        "¿Qué pasó en el siglo XIX?",
        "¿Cómo llegó el café a Antioquia?",
        "¿Quién fue el primer alcalde?",
        "Contame sobre el Metro de Medellín",
        "¿Qué sabes de Fernando Botero?",
        "Háblame de la Feria de las Flores"
    ];

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');
        
        // Agregar mensaje del usuario
        setMessages(prev => [...prev, { 
            id: messageId,
            type: 'user', 
            content: userMessage,
            timestamp: new Date()
        }]);
        setMessageId(prev => prev + 1);
        setIsLoading(true);

        try {
            // Generar respuesta con AI Service (múltiples proveedores)
            const response = await AIService.answerAsCosiaca(userMessage);
            
            // Agregar respuesta de Cosiaca
            setMessages(prev => [...prev, { 
                id: messageId + 1,
                type: 'bot', 
                content: response,
                timestamp: new Date()
            }]);
            setMessageId(prev => prev + 2);
        } catch (error) {
            console.error('Error getting response:', error);
            setMessages(prev => [...prev, {
                id: messageId + 1,
                type: 'bot', 
                content: '¡Uy, mijito! Se me enredó la lengua por un momento, pero ya estoy aquí. ¿Qué querés saber sobre la historia de Medellín? ¡Preguntame de nuevo!',
                timestamp: new Date()
            }]);
            setMessageId(prev => prev + 2);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestedQuestion = (question) => {
        setInputMessage(question);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const clearChat = () => {
        setMessages([{
            id: 1,
            type: 'bot',
            content: '¡Hola de nuevo, mijito! ¿En qué más te puedo ayudar con la historia de Medellín?',
            timestamp: new Date()
        }]);
        setMessageId(2);
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString('es-CO', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <div className="animate-fade-in container-1920 mx-auto text-cosiaca-brown space-y-1920">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl xl:text-1920-xl font-black font-serif text-cosiaca-brown">
                    🤖 CosiacaBot
                </h1>
                <p className="text-xl xl:text-1920-base mt-2 text-cosiaca-brown-light/70 lead font-medium">
                    <em>Conversa con el mismísimo Cosiaca sobre la historia de Medellín</em>
                </p>
            </header>
            
            {/* Navegación entre Chat y Voz */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setActiveTab('chat')}
                    className={`px-6 xl:px-8 py-3 xl:py-4 rounded-full font-bold text-base xl:text-1920-base transition-all duration-300 ${
                        activeTab === 'chat' 
                            ? 'bg-cosiaca-red text-white shadow-lg' 
                            : 'bg-cosiaca-beige text-cosiaca-brown hover:bg-cosiaca-beige/70'
                    }`}
                >
                    💬 Chat de Texto
                </button>
                <button
                    onClick={() => setActiveTab('voice')}
                    className={`px-6 xl:px-8 py-3 xl:py-4 rounded-full font-bold text-base xl:text-1920-base transition-all duration-300 ${
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
                <div className="space-y-6">
                    {/* Header del Chat */}
                    <div className="bg-cosiaca-beige/30 p-6 xl:p-1920 rounded-xl shadow-2xl border border-cosiaca-beige text-center">
                        <BotIcon className="w-16 h-16 xl:w-20 xl:h-20 mx-auto text-cosiaca-red mb-4" />
                        <h2 className="text-2xl xl:text-1920-lg font-bold font-serif text-cosiaca-brown mb-4">
                            "Conversa Conmigo Directamente"
                        </h2>
                        <p className="text-lg xl:text-1920-base text-cosiaca-brown-light/80 mb-4 lead">
                            ¿Querés saber algo de la <strong>historia de Medellín</strong>? <em>¡Preguntame lo que se te ocurra!</em> 
                            Tengo <strong>350 años de chismes, cuentos y anécdotas</strong> para contarte.
                        </p>
                        
                        {/* Botón para limpiar chat */}
                        <button
                            onClick={clearChat}
                            className="bg-cosiaca-brown text-white px-4 xl:px-6 py-2 xl:py-3 rounded-lg hover:bg-cosiaca-brown/80 transition-colors text-sm xl:text-base"
                        >
                            🗑️ Limpiar Chat
                        </button>
                    </div>

                    {/* Preguntas Sugeridas */}
                    <div className="bg-white rounded-xl shadow-lg border border-cosiaca-beige p-4">
                        <h3 className="text-lg xl:text-1920-base font-bold text-cosiaca-brown mb-3 text-center">💡 Preguntas Sugeridas</h3>
                        <div className="responsive-grid">
                            {suggestedQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestedQuestion(question)}
                                    className="text-left p-2 xl:p-3 text-sm xl:text-base bg-cosiaca-beige/50 hover:bg-cosiaca-beige rounded-lg transition-colors text-cosiaca-brown"
                                    disabled={isLoading}
                                >
                                    "{question}"
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Chat Interface */}
                    <div className="bg-white rounded-xl shadow-lg border border-cosiaca-beige overflow-hidden">
                        {/* Chat Header */}
                        <div className="bg-cosiaca-red text-white p-4 xl:p-6 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <BotIcon className="w-8 h-8 xl:w-10 xl:h-10" />
                                <div>
                                    <h3 className="font-bold text-base xl:text-1920-base">José García "Cosiaca"</h3>
                                    <p className="text-sm xl:text-base opacity-90">Cuentero Histórico de Medellín</p>
                                </div>
                            </div>
                            <div className="text-sm xl:text-base opacity-90">
                                {messages.length - 1} mensajes
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="h-96 xl:h-[500px] overflow-y-auto p-4 xl:p-6 space-y-4 bg-gray-50 smooth-scroll">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-xs lg:max-w-md ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                                        <div
                                            className={`px-4 xl:px-6 py-3 xl:py-4 rounded-2xl shadow-sm ${
                                                message.type === 'user'
                                                    ? 'bg-cosiaca-red text-white user-message rounded-br-sm'
                                                    : 'bg-white text-cosiaca-brown bot-message rounded-bl-sm border border-cosiaca-beige'
                                            }`}
                                        >
                                            {message.type === 'bot' && (
                                                <div className="flex items-start space-x-2">
                                                    <BotIcon className="w-5 h-5 xl:w-6 xl:h-6 mt-1 flex-shrink-0 text-cosiaca-red" />
                                                    <div className="flex-1">
                                                        <p className="text-sm xl:text-base leading-relaxed">{message.content}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {message.type === 'user' && (
                                                <p className="text-sm xl:text-base leading-relaxed">{message.content}</p>
                                            )}
                                        </div>
                                        <div className={`text-xs text-gray-500 mt-1 ${
                                            message.type === 'user' ? 'text-right' : 'text-left'
                                        }`}>
                                            {formatTime(message.timestamp)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white text-cosiaca-brown px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-cosiaca-beige">
                                        <div className="flex items-center space-x-2">
                                            <BotIcon className="w-5 h-5 xl:w-6 xl:h-6 text-cosiaca-red" />
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-cosiaca-red rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-cosiaca-red rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                                <div className="w-2 h-2 bg-cosiaca-red rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                            </div>
                                            <span className="text-sm xl:text-base text-gray-500">Cosiaca está pensando...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 xl:p-6 bg-white border-t border-cosiaca-beige">
                            <div className="flex space-x-2">
                                <textarea
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Pregúntale a Cosiaca sobre la historia de Medellín..."
                                    className="flex-1 p-3 xl:p-4 text-base xl:text-1920-base border border-cosiaca-beige rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cosiaca-red focus:border-transparent"
                                    rows="2"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim() || isLoading}
                                    className="bg-cosiaca-red text-white p-3 xl:p-4 rounded-lg hover:bg-cosiaca-red/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <SendIcon className="w-5 h-5 xl:w-6 xl:h-6" />
                                </button>
                            </div>
                            <div className="text-xs xl:text-sm text-gray-500 mt-2 text-center">
                                {inputMessage.length}/500 caracteres • Presiona Enter para enviar
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="responsive-grid">
                <div className="bg-cosiaca-beige/30 p-6 xl:p-8 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl xl:text-1920-base font-bold text-cosiaca-brown mb-3 font-serif">🎭 ¿Qué puedo contarte?</h3>
                    <ul className="space-y-2 text-cosiaca-brown-light/80 text-lg xl:text-1920-base">
                        <li>• <strong>Historias de la fundación de Medellín</strong></li>
                        <li>• <em>Anécdotas del auge cafetero</em></li>
                        <li>• <strong>Cuentos de arrieros y comerciantes</strong></li>
                        <li>• <em>La transformación de la ciudad</em></li>
                        <li>• <strong>Tradiciones y costumbres paisas</strong></li>
                        <li>• <em>Personajes históricos curiosos</em></li>
                    </ul>
                </div>
                <div className="bg-cosiaca-beige/30 p-6 xl:p-8 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl xl:text-1920-base font-bold text-cosiaca-brown mb-3 font-serif">🎙️ Opciones de Chat</h3>
                    <ul className="space-y-2 text-cosiaca-brown-light/80 text-lg xl:text-1920-base">
                        <li>• <strong>Chat de Texto:</strong> <em>Conversación escrita detallada</em></li>
                        <li>• <strong>Chat por Voz:</strong> <em>Habla directamente con Cosiaca</em></li>
                        <li>• <strong>Preguntas Sugeridas:</strong> <em>Ideas para empezar</em></li>
                        <li>• <strong>Historial:</strong> <em>Guarda tu conversación</em></li>
                        <li>• <strong>Respuestas IA:</strong> <em>Powered by Gemini</em></li>
                        <li>• <strong>Fallbacks:</strong> <em>Siempre hay respuesta</em></li>
                    </ul>
                </div>
            </div>

            <div className="bg-cosiaca-beige/30 p-6 xl:p-1920 rounded-xl border border-cosiaca-beige text-center">
                <h3 className="text-2xl xl:text-1920-lg font-bold font-serif text-cosiaca-brown mb-4">
                    🧠 Sobre CosiacaBot
                </h3>
                <p className="text-cosiaca-brown-light/80 text-lg xl:text-1920-base lead">
                    Este <strong>asistente virtual</strong> está entrenado con <em>información histórica real de Medellín</em> y 
                    habla con la personalidad auténtica de <strong>José García "Cosiaca"</strong>, el <em>primer comediante 
                    popular de Antioquia</em>. Combina <strong>rigor histórico</strong> con el <em>humor y la picardía paisa 
                    característica del personaje</em>.
                </p>
                
                <div className="mt-6 responsive-grid">
                    <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
                        <h4 className="font-bold text-blue-800 mb-2 text-base xl:text-1920-base">💬 Chat de Texto</h4>
                        <p className="text-sm xl:text-base text-blue-700">
                            Conversa escribiendo tus preguntas. Incluye preguntas sugeridas, historial de mensajes y respuestas detalladas.
                        </p>
                    </div>
                    <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
                        <h4 className="font-bold text-green-800 mb-2 text-base xl:text-1920-base">🎙️ Chat por Voz</h4>
                        <p className="text-sm xl:text-base text-green-700">
                            Habla directamente con Cosiaca usando ElevenLabs. Presiona y mantén para hablar.
                        </p>
                    </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                    <p className="text-sm xl:text-base text-green-800">
                        <strong>🤖 Tecnología Avanzada:</strong> Chat de texto con IA (Gemini) y chat por voz con ElevenLabs. 
                        Respuestas auténticas de Cosiaca con información histórica real de Medellín.
                    </p>
                </div>
                <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded-lg">
                    <p className="text-sm xl:text-base text-blue-800">
                        <strong>💡 Nuevas Funciones:</strong> Preguntas sugeridas, historial con timestamps, 
                        auto-scroll, contador de caracteres y chat por voz integrado.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CosiacaBot;