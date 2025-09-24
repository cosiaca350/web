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
    PodcastIcon
} from '../icons/Icons';

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
        <nav className="bg-cosiaca-cream/95 backdrop-blur-lg text-cosiaca-brown p-4 sticky top-0 z-50 border-b border-cosiaca-beige shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold font-serif tracking-wider cursor-pointer text-cosiaca-red" onClick={() => setView('home')}>
                    🤠 Cosiaca 350
                </h1>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-2">
                    {mainLinks.map(link => (
                        <button 
                            key={link.view} 
                            onClick={() => setView(link.view)} 
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                view === link.view 
                                    ? 'bg-cosiaca-red text-white shadow-lg' 
                                    : 'hover:bg-cosiaca-beige'
                            }`}
                        >
                            {link.icon} {link.name}
                        </button>
                    ))}
                    <div className="relative" ref={experiencesRef}>
                        <button 
                            onClick={() => setExperiencesMenuOpen(!isExperiencesMenuOpen)} 
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                isExperiencesMenuOpen ? 'bg-cosiaca-beige' : 'hover:bg-cosiaca-beige'
                            }`}
                        >
                            <SparklesIcon className="mr-2"/> Experiencias
                        </button>
                        {isExperiencesMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-cosiaca-cream ring-1 ring-cosiaca-beige ring-opacity-50">
                                <div className="py-1">
                                    {experienceLinks.map(link => (
                                        <button 
                                            key={link.view} 
                                            onClick={() => { 
                                                setView(link.view); 
                                                setExperiencesMenuOpen(false); 
                                            }} 
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
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} 
                        className="text-cosiaca-brown focus:outline-none p-2 rounded-md hover:bg-cosiaca-beige"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className="md:hidden mt-4 space-y-1">
                    {[...mainLinks, ...experienceLinks].map(link => (
                        <button 
                            key={link.view} 
                            onClick={() => { 
                                setView(link.view); 
                                setMobileMenuOpen(false); 
                            }} 
                            className={`flex items-center w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors ${
                                view === link.view 
                                    ? 'bg-cosiaca-red text-white' 
                                    : 'hover:bg-cosiaca-beige'
                            }`}
                        >
                            {link.icon} {link.name}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;