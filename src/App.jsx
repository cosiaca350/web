import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Proyecto from './components/Proyecto';
import Libros from './components/Libros';
import Team from './components/Team';
import Redes from './components/Redes';
import { TikTokIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from './icons/Icons';
import Videos from './components/Videos';
import Juegos from './components/Juegos';
import Podcast from './components/Podcast';
import Timeline from './components/Timeline';
import Archivo from './components/Archivo';
import CosiacaBot from './components/CosiacaBot';
import HistoriaAmpliada from './components/HistoriaAmpliada';
import AccessibilityControls from './components/AccessibilityControls';
import './App.css';

// Hook para navegación suave
const useScrollNavigation = () => {
    const [showScrollButtons, setShowScrollButtons] = React.useState(false);
    const [canScrollUp, setCanScrollUp] = React.useState(false);
    const [canScrollDown, setCanScrollDown] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            setCanScrollUp(scrollTop > 100);
            setCanScrollDown(scrollTop < documentHeight - windowHeight - 100);
            setShowScrollButtons(documentHeight > windowHeight * 1.2);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToNext = () => {
        const currentScroll = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const nextSection = currentScroll + windowHeight * 0.8;
        window.scrollTo({ top: nextSection, behavior: 'smooth' });
    };

    return { showScrollButtons, canScrollUp, canScrollDown, scrollToTop, scrollToNext };
};

const App = () => {
    const [view, setView] = useState('home');
    const [user, setUser] = useState(null);
    const { showScrollButtons, canScrollUp, canScrollDown, scrollToTop, scrollToNext } = useScrollNavigation();

    useEffect(() => {
        // Simulate user authentication for demo purposes
        setUser({ uid: 'demo-user' });
    }, []);

    const renderContent = () => {
        switch (view) {
            case 'home':
                return <Home setView={setView} />;
            case 'welcome':
                return <Welcome setView={setView} />;
            case 'proyecto':
                return <Proyecto />;
            case 'cosiacabot':
                return <CosiacaBot />;
            case 'juegos':
                return <Juegos />;
            case 'podcast':
                return <Podcast />;
            case 'timeline':
                return <Timeline />;
            case 'archivo':
                return <Archivo />;
            case 'libros':
                return user ? <Libros /> : <div className="text-center text-gray-400 mt-20">Cargando...</div>;
            case 'team':
                return <Team />;
            case 'videos':
                return <Videos />;
            default:
                return <Home setView={setView} />;
        }
    };

    return (
        <div className="min-h-screen bg-cosiaca-cream text-cosiaca-brown font-montserrat flex flex-col overflow-x-hidden smooth-scroll">
            {/* Skip to main content link */}
            <a href="#main-content" className="skip-link">
                Saltar al contenido principal
            </a>
            
            {/* Accessibility Controls */}
            <AccessibilityControls />
            
            <Navbar view={view} setView={setView} />
            <main id="main-content" className="flex-1 container-1920 mx-auto p-3 sm:p-4 md:p-6 lg:p-8 xl:p-1920" role="main">
                {renderContent()}
            </main>
            
            {/* Botones de navegación orgánica */}
            {showScrollButtons && (
                <>
                    {canScrollUp && (
                        <button
                            onClick={scrollToTop}
                            className="nav-arrow nav-arrow-up"
                            aria-label="Ir al inicio"
                            title="Ir al inicio"
                        >
                            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                    )}
                    {canScrollDown && (
                        <button
                            onClick={scrollToNext}
                            className="nav-arrow nav-arrow-down"
                            aria-label="Ver más contenido"
                            title="Ver más contenido"
                        >
                            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    )}
                </>
            )}
            
            <footer className="bg-cosiaca-brown-dark p-6 md:p-8 text-center border-t-2 border-cosiaca-acento/30">
                <div className="container-1920 mx-auto space-y-6">
                    {/* Redes Sociales */}
                    <div className="border-b border-cosiaca-beige/30 pb-6">
                        <h3 className="text-xl md:text-2xl font-bold font-anton mb-4" style={{ color: '#F5E9D4' }}>
                            🔗 Redes Sociales y Contacto
                        </h3>
                        <p className="text-sm md:text-base mb-4" style={{ color: '#D4C5B3' }}>
                            Síguenos y mantente al tanto de todas las novedades de Cosiaca 350.
                        </p>

                        {/* Íconos de Redes Sociales */}
                        <div className="flex justify-center space-x-6 mb-6">
                            <a
                                href="https://www.tiktok.com/@ncleo.colectivo?_t=ZS-8zo20sFpiBY&_r=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cosiaca-red hover:text-cosiaca-acento transition-all transform hover:scale-110"
                                aria-label="Síguenos en TikTok"
                            >
                                <TikTokIcon className="w-10 h-10 md:w-12 md:h-12" />
                            </a>
                            <a
                                href="https://www.instagram.com/cosiaca350?igsh=MTNtZjB3a3V4dXRwOQ=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cosiaca-red hover:text-cosiaca-acento transition-all transform hover:scale-110"
                                aria-label="Síguenos en Instagram"
                            >
                                <InstagramIcon className="w-10 h-10 md:w-12 md:h-12" />
                            </a>
                            <a
                                href="https://www.facebook.com/NucleoColectivoFaro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cosiaca-red hover:text-cosiaca-acento transition-all transform hover:scale-110"
                                aria-label="Síguenos en Facebook"
                            >
                                <FacebookIcon className="w-10 h-10 md:w-12 md:h-12" />
                            </a>
                            <a
                                href="https://www.youtube.com/@NucleoColectivoFaro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cosiaca-red hover:text-cosiaca-acento transition-all transform hover:scale-110"
                                aria-label="Síguenos en YouTube"
                            >
                                <YoutubeIcon className="w-10 h-10 md:w-12 md:h-12" />
                            </a>
                        </div>

                        {/* Contacto Directo */}
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold font-anton mb-3" style={{ color: '#F5E9D4' }}>
                                📧 Contacto Directo
                            </h4>
                            <div className="flex flex-col items-center space-y-2 text-sm">
                                <a
                                    href="mailto:nucleo.colectivo.art@gmail.com"
                                    className="hover:text-cosiaca-acento transition-colors"
                                    style={{ color: '#D4C5B3' }}
                                >
                                    nucleo.colectivo.art@gmail.com
                                </a>
                                <a
                                    href="mailto:cosiaca350@gmail.com"
                                    className="hover:text-cosiaca-acento transition-colors"
                                    style={{ color: '#D4C5B3' }}
                                >
                                    cosiaca350@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright y Créditos */}
                    <div className="space-y-2">
                        <p className="text-xs md:text-sm font-semibold font-montserrat" style={{ color: '#F5E9D4' }}>
                            © 2025 {"{COSIACA "}<strong style={{ color: '#C92C3D' }}>350</strong>{"}"} - Un Viaje Inmersivo a la Historia de Medellín
                        </p>
                        <p className="text-xs font-montserrat" style={{ color: '#F5E9D4' }}>
                            Todos los derechos reservados. Un proyecto de <strong style={{ color: '#C92C3D' }}>Núcleo Colectivo</strong>
                        </p>
                        <p className="text-xs font-montserrat" style={{ color: '#D4C5B3' }}>
                            Propuesta transmedia para la celebración de los <strong style={{ color: '#C92C3D' }}>350</strong> años de Medellín
                        </p>
                        <p className="text-xs font-montserrat" style={{ color: '#D4C5B3' }}>
                            Proyecto beneficiado de las Convocatorias de Fomento y Estímulos para el Arte y la Cultura 2025 | Secretaría de Cultura Ciudadana de Medellín
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;