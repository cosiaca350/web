import React from 'react';
import { SparklesIcon } from '../icons/Icons';

const Home = ({ setView }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-cosiaca-cream via-cosiaca-beige to-cosiaca-tan flex items-center justify-center p-4">
            <div className="w-full max-w-2xl mx-auto text-center space-y-8">
                
                {/* Logo Principal */}
                <div className="mb-8">
                    <div className="text-4xl md:text-5xl font-black text-cosiaca-brown font-serif leading-none tracking-tight mb-6">
                        {"{COSIACA "}
                        <strong>350</strong>
                        {"}"}
                    </div>
                </div>

                {/* Icono y mensaje principal */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl animate-bounce">
                        🎉
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-cosiaca-brown font-serif mb-4">
                        ¡Todo Está Listo!
                    </h2>
                    <p className="text-lg text-cosiaca-brown/80 leading-relaxed max-w-lg mx-auto mb-8">
                        Un proyecto transmedia que celebra los <strong>350</strong> años de Medellín 
                        a través de la figura histórica de José García "Cosiaca", el primer comediante 
                        popular de Antioquia.
                    </p>
                </div>

                {/* Botón Principal - Más arriba */}
                <div className="text-center">
                    <button
                        onClick={() => setView('welcome')}
                        className="bg-gradient-to-r from-cosiaca-red to-cosiaca-red-dark hover:from-cosiaca-red-dark hover:to-cosiaca-red text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cosiaca-red/50 mx-auto inline-flex items-center mb-6"
                    >
                        <SparklesIcon className="w-6 h-6 mr-3" />
                        Comenzar el Viaje Histórico
                        <SparklesIcon className="w-6 h-6 ml-3" />
                    </button>
                    <p className="text-base text-cosiaca-brown/60">
                        ✨ <em>Prepárate para un viaje único por <strong>350</strong> años de historia paisa</em> ✨
                    </p>
                </div>

                {/* Información del proyecto */}
                <div className="text-center text-sm text-cosiaca-brown/50 space-y-1 mt-8">
                    <p>🎭 <strong>Núcleo Colectivo</strong> • 📍 Medellín, Colombia • 🎪 2025</p>
                    <p>Propuesta transmedia para la celebración de los <strong>350</strong> años de Medellín</p>
                </div>
            </div>
        </div>
    );
};

export default Home;