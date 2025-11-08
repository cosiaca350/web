import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Proyecto from './components/Proyecto';
import Libros from './components/Libros';
import Team from './components/Team';
import Redes from './components/Redes';
import Videos from './components/Videos';
import Juegos from './components/Juegos';
import Podcast from './components/Podcast';
import Timeline from './components/Timeline';
import Archivo from './components/Archivo';
import PlanTrabajo from './components/PlanTrabajo';
import CosiacaBot from './components/CosiacaBot';
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
            case 'plan':
                return <PlanTrabajo />;
            case 'libros':
                return user ? <Libros /> : <div className="text-center text-gray-400 mt-20">Cargando...</div>;
            case 'team':
                return <Team />;
            case 'redes':
                return <Redes />;
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
            
            <footer className="bg-cosiaca-principal p-3 sm:p-4 md:p-6 text-center text-cosiaca-cream border-t-2 border-cosiaca-acento">
                <div className="container-1920 mx-auto">
                    <p className="text-sm sm:text-base md:text-lg font-semibold mb-2 text-cosiaca-cream font-montserrat">© 2024 {"{COSIACA "}<strong className="text-cosiaca-acento">350</strong>{"}"} - Un Viaje Inmersivo a la Historia de Medellín</p>
                    <p className="text-xs sm:text-sm md:text-base text-cosiaca-beige font-montserrat mb-3 sm:mb-4">Todos los derechos reservados. Un proyecto de <strong className="text-cosiaca-acento">Núcleo Colectivo</strong></p>
                    <div className="text-xs sm:text-xs md:text-sm xl:text-1920-base text-cosiaca-cream/80 font-montserrat space-y-1">
                        <p className="text-cosiaca-beige">Propuesta transmedia para la celebración de los <strong className="text-cosiaca-enfasis">350</strong> años de Medellín</p>
                        <p className="text-cosiaca-beige">Proyecto beneficiado de las Convocatorias de Fomento y Estímulos para el Arte y la Cultura 2025</p>
                        <p className="text-cosiaca-beige">Secretaría de Cultura Ciudadana de Medellín</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;