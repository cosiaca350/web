import React, { useState, useEffect } from 'react';
import { SparklesIcon } from '../icons/Icons';

const ConstructionPage = ({ onEnter }) => {
    const [loadingText, setLoadingText] = useState('Preparando el viaje histórico...');
    const [progress, setProgress] = useState(0);

    const loadingMessages = [
        'Preparando el viaje histórico...',
        'Afinando la guitarra de Cosiaca...',
        'Organizando los archivos históricos...',
        'Calentando el micrófono del podcast...',
        'Puliendo las historias de 350 años...',
        'Preparando las anécdotas paisas...',
        'Cargando la sabiduría de Cosiaca...',
        'Ajustando los cuentos históricos...',
        'Preparando la experiencia inmersiva...',
        '¡Ya casi está listo el sarao!'
    ];

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setLoadingText(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 2000);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 12;
            });
        }, 300);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-cosiaca-cream via-cosiaca-beige to-cosiaca-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 border border-cosiaca-brown rounded-full"></div>
                <div className="absolute top-32 right-20 w-24 h-24 border border-cosiaca-brown rounded-full"></div>
                <div className="absolute bottom-20 left-32 w-40 h-40 border border-cosiaca-brown rounded-full"></div>
                <div className="absolute bottom-32 right-10 w-28 h-28 border border-cosiaca-brown rounded-full"></div>
            </div>

            <div className="w-full max-w-6xl text-center space-y-8 relative z-10">
                {/* Logo Principal - Mantener tamaño original */}
                <div className="space-y-6 mb-12">
                    <div className="relative">
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-cosiaca-brown font-serif leading-none tracking-tight">
                            Cosiaca
                        </h1>
                        <div className="flex justify-center mt-4">
                            <div className="border-2 border-cosiaca-brown px-6 py-2 rounded-lg">
                                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-cosiaca-brown">
                                    {350}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cosiaca-brown/80 tracking-wide">
                            UN VIAJE INMERSIVO
                        </h2>
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-cosiaca-brown/70">
                            A LA HISTORIA DE MEDELLÍN
                        </h3>
                    </div>
                </div>

                {/* Contenido Principal - Más compacto */}
                <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-cosiaca-beige/50 max-w-4xl mx-auto">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-2xl sm:text-3xl font-bold text-cosiaca-brown mb-4 font-serif">
                                Estamos Preparando Algo Especial
                            </h4>
                            <p className="text-base sm:text-lg text-cosiaca-brown/80 max-w-3xl mx-auto leading-relaxed">
                                Un proyecto transmedia que celebra los <strong>350 años de Medellín</strong> 
                                a través de la figura histórica de <em>José García "Cosiaca"</em>, 
                                el primer comediante popular de Antioquia.
                            </p>
                        </div>
                        
                        {/* Loading Animation - Más compacto */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center space-x-3">
                                <SparklesIcon className="w-5 h-5 text-cosiaca-red animate-pulse" />
                                <p className="text-base font-medium text-cosiaca-red">
                                    {loadingText}
                                </p>
                                <SparklesIcon className="w-5 h-5 text-cosiaca-red animate-pulse" />
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full max-w-lg mx-auto">
                                <div className="w-full bg-cosiaca-beige/50 rounded-full h-3 overflow-hidden shadow-inner">
                                    <div 
                                        className="bg-gradient-to-r from-cosiaca-red to-cosiaca-red/80 h-3 rounded-full transition-all duration-500 ease-out relative"
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                                <p className="text-sm text-cosiaca-brown/60 mt-2">
                                    {Math.round(Math.min(progress, 100))}% completado
                                </p>
                            </div>
                        </div>

                        {/* Características del Proyecto - Grid más compacto */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                            <div className="bg-cosiaca-beige/30 p-3 rounded-lg border border-cosiaca-beige">
                                <div className="text-xl mb-2">🎭</div>
                                <p className="font-semibold text-cosiaca-brown">Humor Paisa</p>
                            </div>
                            <div className="bg-cosiaca-beige/30 p-3 rounded-lg border border-cosiaca-beige">
                                <div className="text-xl mb-2">📚</div>
                                <p className="font-semibold text-cosiaca-brown">Historia Real</p>
                            </div>
                            <div className="bg-cosiaca-beige/30 p-3 rounded-lg border border-cosiaca-beige">
                                <div className="text-xl mb-2">🤖</div>
                                <p className="font-semibold text-cosiaca-brown">Tecnología IA</p>
                            </div>
                            <div className="bg-cosiaca-beige/30 p-3 rounded-lg border border-cosiaca-beige">
                                <div className="text-xl mb-2">🎪</div>
                                <p className="font-semibold text-cosiaca-brown">Transmedia</p>
                            </div>
                        </div>

                        {/* Botón de Entrada */}
                        <div className="pt-2">
                            <button
                                onClick={onEnter}
                                className="bg-cosiaca-red hover:bg-cosiaca-red-dark text-white font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Comenzar el Viaje Histórico
                            </button>
                        </div>
                    </div>
                </div>

                {/* Información del Proyecto - Más sutil */}
                <div className="text-center space-y-2 opacity-70 max-w-2xl mx-auto">
                    <p className="text-cosiaca-brown/70 font-medium">
                        Un proyecto de <strong>Núcleo Colectivo</strong>
                    </p>
                    <p className="text-sm text-cosiaca-brown/60">
                        Propuesta transmedia para la celebración de los 350 años de Medellín.
                    </p>
                </div>
            </div>

            {/* Elementos Decorativos Flotantes - Más sutiles */}
            <div className="absolute top-20 left-20 text-xl animate-bounce opacity-20" style={{animationDelay: '0.5s'}}>
                🎭
            </div>
            <div className="absolute top-32 right-32 text-lg animate-bounce opacity-20" style={{animationDelay: '1s'}}>
                📚
            </div>
            <div className="absolute bottom-32 left-32 text-lg animate-bounce opacity-20" style={{animationDelay: '1.5s'}}>
                🎵
            </div>
            <div className="absolute bottom-20 right-20 text-xl animate-bounce opacity-20" style={{animationDelay: '2s'}}>
                🎪
            </div>
        </div>
    );
};

export default ConstructionPage;