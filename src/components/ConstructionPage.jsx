import React, { useState, useEffect } from 'react';
import { SparklesIcon } from '../icons/Icons';

const ConstructionPage = ({ onEnter }) => {
    const [loadingText, setLoadingText] = useState('Cuadrando el chuzo para la parranda...');
    const [progress, setProgress] = useState(0);

    const loadingMessages = [
        'Cuadrando el chuzo para la parranda...',
        'Afinando la guitarra de Cosiaca...',
        'Preparando los chismes históricos...',
        'Organizando las trovas paisas...',
        'Calentando el micrófono del podcast...',
        'Puliendo las historias de 350 años...',
        'Ajustando el sombrero de Cosiaca...',
        'Preparando el café para el cuento...',
        'Acomodando los archivos históricos...',
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
                return prev + Math.random() * 15;
            });
        }, 300);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-cosiaca-cream via-cosiaca-beige to-cosiaca-cream flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Logo/Title */}
                <div className="animate-bounce">
                    <h1 className="text-6xl md:text-8xl font-black text-cafe-oscuro font-montserrat mb-4">
                        🤠 COSIACA 350
                    </h1>
                    <div className="w-32 h-1 bg-cosiaca-red mx-auto rounded-full"></div>
                </div>

                {/* Construction Message */}
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-cosiaca-red/20">
                    <h2 className="text-3xl md:text-4xl font-bold text-cafe-oscuro mb-4 font-serif">
                        ¡Estamos en Construcción!
                    </h2>
                    <p className="text-xl text-cafe-claro mb-6">
                        Mijito, estamos preparando algo muy berraco para celebrar los 350 años de Medellín. 
                        ¡Un viaje inmersivo lleno de historias, risas y tradición paisa!
                    </p>
                    
                    {/* Animated Loading Text */}
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <SparklesIcon className="w-6 h-6 text-cosiaca-red animate-spin" />
                        <p className="text-lg font-medium text-cosiaca-red animate-pulse">
                            {loadingText}
                        </p>
                        <SparklesIcon className="w-6 h-6 text-cosiaca-red animate-spin" />
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-cosiaca-beige rounded-full h-4 mb-6 overflow-hidden">
                        <div 
                            className="bg-gradient-to-r from-cosiaca-red to-cosiaca-red-dark h-4 rounded-full transition-all duration-500 ease-out relative"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        >
                            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Fun Facts */}
                    <div className="bg-cosiaca-beige/50 p-4 rounded-lg mb-6">
                        <p className="text-cafe-oscuro font-medium mb-2">
                            💡 Mientras esperás, sabías que...
                        </p>
                        <p className="text-cafe-claro italic">
                            José García "Cosiaca" fue el primer comediante popular de Antioquia y sus historias 
                            siguen haciendo reír a los paisas después de más de un siglo.
                        </p>
                    </div>

                    {/* Enter Button */}
                    <button
                        onClick={onEnter}
                        className="bg-cosiaca-red hover:bg-cosiaca-red-dark text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        ¡Entrar al Sarao! 🎉
                    </button>
                </div>

                {/* Footer */}
                <div className="text-center space-y-2">
                    <p className="text-cafe-claro/70">
                        Un proyecto de <strong>Núcleo Colectivo</strong>
                    </p>
                    <p className="text-sm text-cafe-claro/60">
                        Propuesta transmedia para la celebración de los 350 años de Medellín
                    </p>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 left-10 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>
                    🎭
                </div>
                <div className="absolute top-20 right-10 text-3xl animate-bounce" style={{animationDelay: '1s'}}>
                    🎪
                </div>
                <div className="absolute bottom-20 left-20 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>
                    🎵
                </div>
                <div className="absolute bottom-10 right-20 text-4xl animate-bounce" style={{animationDelay: '2s'}}>
                    🎨
                </div>
            </div>
        </div>
    );
};

export default ConstructionPage;