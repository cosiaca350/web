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
import AIProviderSelector from './AIProviderSelector';

const CreditCardIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
);
const Navbar = ({ view, setView }) => {
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
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isExperiencesMenuOpen, setExperiencesMenuOpen] = useState(false);
    const experiencesRef = useRef(null);

    const mainLinks = [
        { name: 'Inicio', view: 'home', icon: <HomeIcon className="mr-2"/> },
        { name: 'El Proyecto', view: 'proyecto', icon: <ProjectIcon className="mr-2"/> },
        { name: 'CosiacaBot', view: 'cosiacabot', icon: <BotIcon className="mr-2"/> },
        { name: 'Juegos y AR', view: 'juegos', icon: <GamepadIcon className="mr-2"/> },
        { name: 'Podcast Histórico', view: 'podcast', icon: <PodcastIcon className="mr-2"/> },
        { name: 'Libros', view: 'libros', icon: <BookIcon className="mr-2"/> },
        { name: 'Línea de Tiempo', view: 'timeline', icon: <TimelineIcon className="mr-2"/> },
        { name: 'Archivo', view: 'archivo', icon: <ArchiveIcon className="mr-2"/> },
        { name: 'Plan de Trabajo', view: 'plan', icon: <PlanIcon className="mr-2"/> },
        { name: 'Equipo', view: 'team', icon: <TeamIcon className="mr-2"/> },
        { name: 'Redes', view: 'redes', icon: <LinkIcon className="mr-2"/> },
    ];

    const experienceLinks = [
        { name: 'Videos IA', view: 'videos', icon: <VideoIcon className="mr-2"/> },
    ];
    
    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (experiencesRef.current && !experiencesRef.current.contains(event.target)) {
                setExperiencesMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [experiencesRef]);

    return (
        <nav className="bg-cosiaca-brown/90 backdrop-blur-lg text-cosiaca-cream p-3 sm:p-4 sticky top-0 z-50 border-b border-cosiaca-brown/20 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl sm:text-2xl font-bold font-serif tracking-wider cursor-pointer text-cosiaca-cream" onClick={() => setView('home')}>
                    <span role="button" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && setView('home')}>
                        Cosiaca {350}
                    </span>
                </h1>
                
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
                                    : 'text-cosiaca-cream hover:bg-cosiaca-brown/70'
                            }`}
                        >
                            <span className="hidden xl:inline">{link.icon}</span>
                            <span className="xl:hidden text-lg">{link.icon}</span>
                            <span className="ml-1 xl:ml-2">{link.name}</span>
                        </button>
                    ))}
                    <div className="relative" ref={experiencesRef}>
                        <button 
                            onClick={() => setExperiencesMenuOpen(!isExperiencesMenuOpen)} 
                            aria-expanded={isExperiencesMenuOpen}
                            aria-haspopup="true"
                            className={`flex items-center px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-all duration-300 ${
                                isExperiencesMenuOpen ? 'bg-cosiaca-brown/70 text-cosiaca-cream' : 'text-cosiaca-cream hover:bg-cosiaca-brown/70'
                            }`}
                        >
                            <SparklesIcon className="mr-1 xl:mr-2"/> Experiencias
                        </button>
                        {isExperiencesMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-cosiaca-cream ring-1 ring-cosiaca-brown ring-opacity-50" role="menu">
                                <div className="py-1">
                                    {experienceLinks.map(link => (
                                        <button 
                                            key={link.view} 
                                            onClick={() => { 
                                                setView(link.view); 
                                                setExperiencesMenuOpen(false); 
                                            }} 
                                            role="menuitem"
                                            className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                                                view === link.view 
                                                    ? 'bg-cosiaca-red text-white' 
                                                    : 'text-cosiaca-brown hover:bg-cosiaca-beige'
                                            }`}
                                        >
                                            {link.icon} {link.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
                
                {/* AI Provider Selector - Desktop */}
                <div className="hidden lg:block">
                    <AIProviderSelector />
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden">
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
                <nav className="lg:hidden mt-4 space-y-1 max-h-96 overflow-y-auto" role="navigation" aria-label="Navegación móvil">
                    {[...mainLinks, ...experienceLinks].map(link => (
                        <button 
                            key={link.view} 
                            onClick={() => { 
                                setView(link.view); 
                                setMobileMenuOpen(false); 
                            }} 
                            aria-current={view === link.view ? 'page' : undefined}
                            className={`flex items-center w-full text-left px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors ${
                                view === link.view 
                                    ? 'bg-cosiaca-red text-white' 
                                    : 'text-cosiaca-cream hover:bg-cosiaca-brown/70'
                            }`}
                        >
                            {link.icon} {link.name}
                        </button>
                    ))}
                </nav>
            )}
        </nav>
    );
};

export default Navbar;