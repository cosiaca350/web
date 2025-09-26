import React, { useState, useEffect } from 'react';
import { SparklesIcon } from '../icons/Icons';

const ConstructionPage = ({ onEnter }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);
    const [showContent, setShowContent] = useState(false);

    const steps = [
        {
            title: "Despertando a Cosiaca...",
            description: "El mítico cuentero está abriendo los ojos después de décadas de silencio",
            icon: "🎭",
            color: "from-cosiaca-red to-cosiaca-red-dark"
        },
        {
            title: "Organizando 350 años de historias...",
            description: "Clasificando anécdotas, chismes y cuentos desde 1675 hasta hoy",
            icon: "📚",
            color: "from-cosiaca-brown to-cosiaca-brown-medium"
        },
        {
            title: "Afinando la guitarra digital...",
            description: "Preparando la tecnología para contar historias como nunca antes",
            icon: "🎸",
            color: "from-cosiaca-green to-cosiaca-green-dark"
        },
        {
            title: "Calentando el micrófono...",
            description: "Los podcasts históricos están listos para transportarte en el tiempo",
            icon: "🎙️",
            color: "from-purple-600 to-purple-800"
        },
        {
            title: "¡El sarao está listo!",
            description: "Cosiaca te espera para comenzar este viaje inmersivo por Medellín",
            icon: "🎉",
            color: "from-yellow-500 to-orange-600"
        }
    ];

    useEffect(() => {
        const stepInterval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < steps.length - 1) {
                    return prev + 1;
                } else {
                    clearInterval(stepInterval);
                    setTimeout(() => setShowContent(true), 1000);
                    return prev;
                }
            });
        }, 2500);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 8;
            });
        }, 200);

        setTimeout(() => setIsAnimating(false), 1000);

        return () => {
            clearInterval(stepInterval);
            clearInterval(progressInterval);
        };
    }, []);

    const features = [
        { icon: "🤖", title: "CosiacaBot", desc: "Conversa con la historia" },
        { icon: "🎮", title: "Juegos AR", desc: "Aprende jugando" },
        { icon: "🎙️", title: "Podcast", desc: "Historias narradas" },
        { icon: "📱", title: "Transmedia", desc: "Múltiples plataformas" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-cosiaca-cream via-cosiaca-beige to-cosiaca-tan relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-2 h-2 bg-cosiaca-brown/10 rounded-full animate-pulse`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 text-4xl animate-bounce opacity-30" style={{animationDelay: '0.5s'}}>
                🎭
            </div>
            <div className="absolute top-40 right-20 text-3xl animate-bounce opacity-30" style={{animationDelay: '1s'}}>
                📚
            </div>
            <div className="absolute bottom-40 left-20 text-3xl animate-bounce opacity-30" style={{animationDelay: '1.5s'}}>
                🎵
            </div>
            <div className="absolute bottom-20 right-32 text-4xl animate-bounce opacity-30" style={{animationDelay: '2s'}}>
                🎪
            </div>

            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header with Logo */}
                <div className={`text-center pt-8 pb-4 transition-all duration-1000 ${isAnimating ? 'transform -translate-y-10 opacity-0' : 'transform translate-y-0 opacity-100'}`}>
                    <div className="relative inline-block">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-cosiaca-brown font-serif leading-none tracking-tight">
                            Cosiaca
                        </h1>
                        <div className="flex justify-center mt-2">
                            <div className="border-2 border-cosiaca-brown px-4 py-1 rounded-lg">
                                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-cosiaca-brown">
                                    {"{350}"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="w-full max-w-6xl">
                        {/* Dynamic Loading Section */}
                        <div className={`transition-all duration-1000 ${showContent ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
                            <div className="text-center mb-8">
                                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${steps[currentStep].color} text-white text-4xl mb-6 animate-pulse shadow-2xl`}>
                                    {steps[currentStep].icon}
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cosiaca-brown mb-4 font-serif">
                                    {steps[currentStep].title}
                                </h2>
                                <p className="text-lg text-cosiaca-brown/80 max-w-2xl mx-auto leading-relaxed">
                                    {steps[currentStep].description}
                                </p>
                            </div>

                            {/* Progress Visualization */}
                            <div className="max-w-2xl mx-auto mb-8">
                                <div className="relative">
                                    <div className="w-full bg-cosiaca-beige/50 rounded-full h-4 overflow-hidden shadow-inner">
                                        <div 
                                            className={`bg-gradient-to-r ${steps[currentStep].color} h-4 rounded-full transition-all duration-500 ease-out relative`}
                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-sm text-cosiaca-brown/60">
                                        <span>Iniciando...</span>
                                        <span>{Math.round(Math.min(progress, 100))}%</span>
                                        <span>¡Listo!</span>
                                    </div>
                                </div>
                            </div>

                            {/* Step Indicators */}
                            <div className="flex justify-center space-x-3 mb-8">
                                {steps.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-all duration-500 ${
                                            index <= currentStep 
                                                ? 'bg-cosiaca-red scale-125 shadow-lg' 
                                                : 'bg-cosiaca-brown/20'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Final Content */}
                        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                            <div className="text-center mb-8">
                                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-cosiaca-brown mb-4 font-serif">
                                    ¡Todo Está Listo!
                                </h2>
                                <p className="text-xl text-cosiaca-brown/80 max-w-3xl mx-auto leading-relaxed mb-8">
                                    Un proyecto transmedia que celebra los <strong>350 años de Medellín</strong> 
                                    a través de la figura histórica de <em>José García "Cosiaca"</em>, 
                                    el primer comediante popular de Antioquia.
                                </p>
                            </div>

                            {/* Interactive Features Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-cosiaca-beige hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="text-3xl mb-2 group-hover:animate-bounce">{feature.icon}</div>
                                        <h3 className="font-bold text-cosiaca-brown text-sm mb-1">{feature.title}</h3>
                                        <p className="text-xs text-cosiaca-brown/70">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Call to Action */}
                            <div className="text-center">
                                <button
                                    onClick={onEnter}
                                    className="bg-gradient-to-r from-cosiaca-red to-cosiaca-red-dark hover:from-cosiaca-red-dark hover:to-cosiaca-red text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-cosiaca-red/50 animate-pulse"
                                >
                                    <SparklesIcon className="inline-block w-5 h-5 mr-2" />
                                    Comenzar el Viaje Histórico
                                    <SparklesIcon className="inline-block w-5 h-5 ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-center py-6 space-y-2 opacity-70">
                    <p className="text-cosiaca-brown/70 font-medium">
                        Un proyecto de <strong>Núcleo Colectivo</strong>
                    </p>
                    <p className="text-sm text-cosiaca-brown/60">
                        Propuesta transmedia para la celebración de los 350 años de Medellín
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConstructionPage;