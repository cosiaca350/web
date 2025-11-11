import React from 'react';
import { SparklesIcon } from '../icons/Icons';

const Home = ({ setView }) => {
    return (
        <div className="section-1920 bg-gradient-to-br from-cosiaca-fondo via-cosiaca-cream to-cosiaca-beige flex items-center justify-center relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-cosiaca-acento/15 rounded-full animate-pulse"
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
            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
                <div className="text-center space-y-6">
                    
                    {/* Logo Principal */}
                    <div className="animate-fade-in">
                        <div className="flex justify-center mb-4">
                            <img
                                src="/logo-cosiaca.svg"
                                alt="Cosiaca 350 - Un viaje inmersivo a la historia de Medellín"
                                className="w-56 sm:w-64 md:w-80 lg:w-96 h-auto"
                            />
                        </div>
                    </div>

                    {/* Mensaje principal */}
                    <div className="animate-fade-in-up space-y-3">
                        <div className="text-4xl mb-3 animate-bounce">🎉</div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-anton text-cosiaca-principal">
                            ¡TODO ESTÁ LISTO!
                        </h2>
                        <p className="text-sm md:text-base lg:text-lg text-cosiaca-principal/80 font-montserrat leading-relaxed max-w-3xl mx-auto px-2">
                            Un proyecto transmedia que celebra los <strong className="text-cosiaca-enfasis">350</strong> años de Medellín
                            a través de la figura histórica de <em className="text-cosiaca-acento font-semibold">José García "Cosiaca"</em>,
                            el primer comediante popular de Antioquia.
                        </p>
                    </div>

                    {/* Botones principales */}
                    <div className="animate-fade-in-up pt-4 space-y-3">
                        <button
                            onClick={() => setView('welcome')}
                            className="font-bold py-2.5 px-6 rounded-full text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-xl mx-auto inline-flex items-center font-montserrat border-2"
                            style={{
                                backgroundColor: '#3A2B21',
                                color: '#FFFFFF',
                                borderColor: '#3A2B21'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#C92C3D';
                                e.currentTarget.style.borderColor = '#C92C3D';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#3A2B21';
                                e.currentTarget.style.borderColor = '#3A2B21';
                            }}
                        >
                            <SparklesIcon className="w-4 h-4 mr-2" style={{ color: '#FFFFFF' }} />
                            Comenzar el Viaje Histórico
                            <SparklesIcon className="w-4 h-4 ml-2" style={{ color: '#FFFFFF' }} />
                        </button>

                        <div className="flex justify-center pt-2">
                            <button
                                onClick={() => setView('timeline')}
                                className="font-bold py-2.5 px-6 rounded-full text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center font-montserrat border-2"
                                style={{
                                    backgroundColor: '#C92C3D',
                                    color: '#FFFFFF',
                                    borderColor: '#C92C3D'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#3A2B21';
                                    e.currentTarget.style.borderColor = '#3A2B21';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#C92C3D';
                                    e.currentTarget.style.borderColor = '#C92C3D';
                                }}
                            >
                                ⏳ Explorar Historia Completa
                            </button>
                        </div>
                        <p className="text-xs md:text-sm text-cosiaca-principal/60 font-montserrat mt-3">
                            ✨ <em>Prepárate para un viaje único por <strong className="text-cosiaca-enfasis">350</strong> años de historia paisa</em> ✨
                        </p>
                    </div>

                    {/* Información adicional compacta */}
                    <div className="animate-fade-in-up pt-4">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-cosiaca-beige p-4 md:p-6 max-w-3xl mx-auto">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="space-y-1.5">
                                    <div className="text-2xl">📅</div>
                                    <h3 className="font-bold text-cosiaca-principal font-montserrat text-xs md:text-sm">Período</h3>
                                    <p className="text-cosiaca-principal/70 font-montserrat text-xs">1675 - 2025 (<strong className="text-cosiaca-enfasis">350</strong> años)</p>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="text-2xl">🎭</div>
                                    <h3 className="font-bold text-cosiaca-principal font-montserrat text-xs md:text-sm">Personaje</h3>
                                    <p className="text-cosiaca-acento font-montserrat font-semibold text-xs">José García "Cosiaca"</p>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="text-2xl">🎯</div>
                                    <h3 className="font-bold text-cosiaca-principal font-montserrat text-xs md:text-sm">Enfoque</h3>
                                    <p className="text-cosiaca-principal/70 font-montserrat text-xs">Humor + Historia + Tecnología</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer compacto */}
                    <div className="animate-fade-in-up pt-3 space-y-1">
                        <p className="font-montserrat font-medium text-xs" style={{ color: '#3A2B21' }}>
                            Un proyecto de <strong style={{ color: '#3A2B21' }}>Núcleo Colectivo</strong>
                        </p>
                        <p className="text-xs font-montserrat" style={{ color: '#3A2B21' }}>
                            Propuesta transmedia para la celebración de los <strong style={{ color: '#C92C3D' }}>350</strong> años de Medellín
                        </p>
                        <p className="text-xs font-montserrat" style={{ color: '#3A2B21' }}>
                            🎭 <strong>Núcleo Colectivo</strong> • 📍 Medellín, Colombia • 🎪 2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;