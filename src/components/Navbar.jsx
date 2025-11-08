import React, { useState, useEffect, useRef } from 'react';
import { 
    HomeIcon, 
    ProjectIcon, 
    GamepadIcon, 
    BookIcon, 
    TeamIcon, 
    LinkIcon, 
    SparklesIcon, 
    VideoIcon,
    PodcastIcon,
    BotIcon
} from '../icons/Icons';

const CreditCardIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
);

const TimelineIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
    </svg>
);

const ArchiveIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="21,8 21,21 3,21 3,8"/>
        <rect x="1" y="3" width="22" height="5"/>
        <line x1="10" y1="12" x2="14" y2="12"/>
    </svg>
);

const PlanIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
    </svg>
);

const Navbar = ({ view, setView }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const mainLinks = [
        { name: 'Inicio', view: 'home' },
        { name: 'Bienvenida', view: 'welcome' },
        { name: 'El Proyecto', view: 'proyecto' },
        { name: 'Videos IA', view: 'videos' },
        { name: 'CosiacaBot', view: 'cosiacabot' },
        { name: 'Juegos y AR', view: 'juegos' },
        { name: 'Podcast Histórico', view: 'podcast' },
        { name: 'Libros', view: 'libros' },
        { name: 'Línea de Tiempo', view: 'timeline' },
        { name: 'Archivo', view: 'archivo' },
        { name: 'Plan de Trabajo', view: 'plan' },
        { name: 'Equipo', view: 'team' },
        { name: 'Redes', view: 'redes' },
    ];
    
    return (
        <nav className="bg-cosiaca-brown/95 backdrop-blur-lg text-cosiaca-cream p-2 sm:p-3 md:p-4 sticky top-0 z-50 border-b border-cosiaca-brown/20 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div 
                    className="cursor-pointer flex items-center" 
                    onClick={() => setView('home')}
                    role="button" 
                    tabIndex="0" 
                    onKeyDown={(e) => e.key === 'Enter' && setView('home')}
                    aria-label="Ir al inicio"
                >
                    <img
                        src="/logo-cosiaca.svg"
                        alt="Cosiaca 350"
                        className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                        style={{ minWidth: '120px' }}
                    />
                </div>
                
                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" role="navigation" aria-label="Navegación principal">
                    {mainLinks.map(link => (
                        <button 
                            key={link.view} 
                            onClick={() => setView(link.view)} 
                            aria-current={view === link.view ? 'page' : undefined}
                            className={`flex items-center px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-all duration-300 ${
                                view === link.view 
                                    ? 'bg-cosiaca-red text-white shadow-lg' 
                                    : 'text-cosiaca-cream hover:bg-cosiaca-brown/70 hover:text-white'
                            }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </nav>
                
                {/* Mobile Navigation */}
                <div className="lg:hidden flex items-center">
                    <button 
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} 
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Abrir menú de navegación"
                        className="text-cosiaca-cream focus:outline-none p-2 rounded-md hover:bg-cosiaca-brown/70"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <nav className="lg:hidden mt-2 sm:mt-4 space-y-1 max-h-80 sm:max-h-96 overflow-y-auto bg-cosiaca-brown/95 rounded-lg p-2" role="navigation" aria-label="Navegación móvil">
                    {mainLinks.map(link => (
                        <button 
                            key={link.view} 
                            onClick={() => { 
                                setView(link.view); 
                                setMobileMenuOpen(false); 
                            }} 
                            aria-current={view === link.view ? 'page' : undefined}
                            className={`flex items-center w-full text-left px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                                view === link.view 
                                    ? 'bg-cosiaca-red text-white' 
                                    : 'text-cosiaca-cream hover:bg-cosiaca-brown/70'
                            }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </nav>
            )}
        </nav>
    );
};

export default Navbar;