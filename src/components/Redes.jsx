import React from 'react';
import { TikTokIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from '../icons/Icons';

const Redes = () => {
    return (
        <div className="animate-fade-in max-w-3xl mx-auto text-center text-gray-300 space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-yellow-400">
                🔗 Redes Sociales y Contacto
            </h1>
            <p className="text-xl text-gray-400">
                Síguenos y mantente al tanto de todas las novedades de Cosiaca 350.
            </p>
            
            <div className="bg-stone-700/50 p-8 rounded-lg shadow-xl border border-stone-600">
                <p className="text-lg mb-6 text-gray-200">
                    Conéctate con nosotros a través de nuestras plataformas digitales. 
                    ¡La historia de Medellín te espera con un toque de humor y picardía!
                </p>
                
                <div className="flex justify-center space-x-6 mb-8">
                    <a 
                        href="https://www.tiktok.com/@ncleo.colectivo?_t=ZS-8zo20sFpiBY&_r=1" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-yellow-400 hover:text-yellow-300 transition-transform transform hover:scale-110"
                    >
                        <TikTokIcon className="w-12 h-12" />
                    </a>
                    <a 
                        href="https://www.instagram.com/cosiaca350?igsh=MTNtZjB3a3V4dXRwOQ==" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-yellow-400 hover:text-yellow-300 transition-transform transform hover:scale-110"
                    >
                        <InstagramIcon className="w-12 h-12" />
                    </a>
                    <a 
                        href="https://www.facebook.com/NucleoColectivoFaro" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-yellow-400 hover:text-yellow-300 transition-transform transform hover:scale-110"
                    >
                        <FacebookIcon className="w-12 h-12" />
                    </a>
                    <a 
                        href="https://www.youtube.com/@NucleoColectivoFaro" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-yellow-400 hover:text-yellow-300 transition-transform transform hover:scale-110"
                    >
                        <YoutubeIcon className="w-12 h-12" />
                    </a>
                </div>
                
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold font-serif text-yellow-300 mb-4">📧 Contacto Directo</h3>
                    <div className="flex flex-col items-center space-y-2 text-gray-200">
                        <a 
                            href="mailto:nucleo.colectivo.art@gmail.com" 
                            className="hover:text-yellow-400 transition-colors"
                        >
                            nucleo.colectivo.art@gmail.com
                        </a>
                        <a 
                            href="mailto:cosiaca350@gmail.com" 
                            className="hover:text-yellow-400 transition-colors"
                        >
                            cosiaca350@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Redes;