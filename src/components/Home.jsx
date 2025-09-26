import React from 'react';
import { SparklesIcon } from '../icons/Icons';

const Home = ({ setView }) => {
    return (
        <div className="section-1920 bg-gradient-to-br from-cosiaca-cream via-cosiaca-beige to-cosiaca-tan flex items-center justify-center relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-cosiaca-brown/10 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Elementos flotantes decorativos */}
            <div className="absolute top-10 left-10 text-3xl lg:text-4xl xl:text-6xl animate-bounce opacity-20" style={{animationDelay: '0.5s'}}>🎭</div>
            <div className="absolute top-32 right-16 text-2xl lg:text-3xl xl:text-5xl animate-bounce opacity-20" style={{animationDelay: '1s'}}>📚</div>
            <div className="absolute bottom-32 left-16 text-2xl lg:text-3xl xl:text-5xl animate-bounce opacity-20" style={{animationDelay: '1.5s'}}>🎵</div>
            <div className="absolute bottom-16 right-24 text-3xl lg:text-4xl xl:text-6xl animate-bounce opacity-20" style={{animationDelay: '2s'}}>🎪</div>

            {/* Contenido principal */}
            <div className="relative z-10 w-full container-1920 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-8 lg:space-y-12 xl:space-y-1920">
                    
                    {/* Logo Principal */}
                    <div className="animate-fade-in">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-1920-xl font-black text-cosiaca-brown font-serif leading-none tracking-tight mb-6 lg:mb-8">
                            {"{COSIACA "}
                            <strong className="text-cosiaca-red">350</strong>
                            {"}"}
                        </h1>
                    </div>

                    {/* Mensaje principal */}
                    <div className="animate-fade-in-up space-y-4 lg:space-y-6">
                        <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-4 lg:mb-6 animate-bounce">🎉</div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-1920-lg font-bold text-cosiaca-brown font-serif">
                            ¡Todo Está Listo!
                        </h2>
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-1920-base text-cosiaca-brown/80 leading-relaxed max-w-5xl xl:max-w-6xl mx-auto px-4">
                            Un proyecto transmedia que celebra los <strong className="text-cosiaca-red">350</strong> años de Medellín 
                            a través de la figura histórica de <em>José García "Cosiaca"</em>, 
                            el primer comediante popular de Antioquia.
                        </p>
                    </div>

                    {/* Botón principal - Posicionado más arriba */}
                    <div className="animate-fade-in-up pt-4 lg:pt-8">
                        <button
                            onClick={() => setView('welcome')}
                            className="bg-gradient-to-r from-cosiaca-red to-cosiaca-red-dark hover:from-cosiaca-red-dark hover:to-cosiaca-red text-white font-bold py-4 sm:py-5 lg:py-6 xl:py-8 px-8 sm:px-10 lg:px-12 xl:px-16 rounded-full text-lg sm:text-xl lg:text-2xl xl:text-1920-base transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cosiaca-red/50 mx-auto inline-flex items-center"
                        >
                            <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 mr-3" />
                            Comenzar el Viaje Histórico
                            <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 ml-3" />
                        </button>
                        <p className="text-sm sm:text-base lg:text-lg xl:text-1920-base text-cosiaca-brown/60 mt-4 lg:mt-6">
                            ✨ <em>Prepárate para un viaje único por <strong>350</strong> años de historia paisa</em> ✨
                        </p>
                    </div>

                    {/* Información adicional compacta */}
                    <div className="animate-fade-in-up pt-6 lg:pt-12">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-cosiaca-beige p-6 lg:p-8 xl:p-1920 max-w-6xl xl:max-w-7xl mx-auto">
                            <div className="responsive-grid text-center">
                                <div className="space-y-2">
                                    <div className="text-2xl lg:text-3xl xl:text-5xl">📅</div>
                                    <h3 className="font-bold text-cosiaca-brown text-sm lg:text-base xl:text-1920-base">Período</h3>
                                    <p className="text-cosiaca-brown/70 text-xs lg:text-sm xl:text-base">1675 - 2025 (<strong>350</strong> años)</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-2xl lg:text-3xl xl:text-5xl">🎭</div>
                                    <h3 className="font-bold text-cosiaca-brown text-sm lg:text-base xl:text-1920-base">Personaje</h3>
                                    <p className="text-cosiaca-brown/70 text-xs lg:text-sm xl:text-base">José García "Cosiaca"</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-2xl lg:text-3xl xl:text-5xl">🎯</div>
                                    <h3 className="font-bold text-cosiaca-brown text-sm lg:text-base xl:text-1920-base">Enfoque</h3>
                                    <p className="text-cosiaca-brown/70 text-xs lg:text-sm xl:text-base">Humor + Historia + Tecnología</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer compacto */}
                    <div className="animate-fade-in-up pt-6 lg:pt-8 space-y-2 lg:space-y-3 opacity-70">
                        <p className="text-cosiaca-brown/70 font-medium text-sm lg:text-base xl:text-1920-base">
                            Un proyecto de <strong>Núcleo Colectivo</strong>
                        </p>
                        <p className="text-xs lg:text-sm xl:text-base text-cosiaca-brown/60">
                            Propuesta transmedia para la celebración de los <strong>350</strong> años de Medellín
                        </p>
                        <p className="text-xs lg:text-sm xl:text-base text-cosiaca-brown/50">
                            🎭 <strong>Núcleo Colectivo</strong> • 📍 Medellín, Colombia • 🎪 2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;