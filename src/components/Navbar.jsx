import React, { useState, useEffect, useRef } from 'react';
import { 
    HomeIcon, 
    ProjectIcon, 
    GamepadIcon, 
    BookIcon, 
    TeamIcon, 
    LinkIcon, 
    SparklesIcon, 
    VideoIcon 
} from '../icons/Icons';

const Navbar = ({ view, setView }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isExperiencesMenuOpen, setExperiencesMenuOpen] = useState(false);
    const experiencesRef = useRef(null);

    const mainLinks = [
        { name: 'Inicio', view: 'home', icon: <HomeIcon className="mr-2"/> },
        { name: 'El Proyecto', view: 'proyecto', icon: <ProjectIcon className="mr-2"/> },
        { name: 'Juegos y AR', view: 'juegos', icon: <GamepadIcon className="mr-2"/> },
        { name: 'Libros', view: 'libros', icon: <BookIcon className="mr-2"/> },
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
        <nav className="bg-gray-900 bg-opacity-70 backdrop-blur-lg text-yellow-200 p-4 sticky top-0 z-50 border-b border-gray-800/50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold font-serif tracking-wider cursor-pointer text-yellow-300" onClick={() => setView('home')}>
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
                                    ? 'bg-yellow-400 text-gray-900 shadow-lg' 
                                    : 'hover:bg-gray-700'
                            }`}
                        >
                            {link.icon} {link.name}
                        </button>
                    ))}
                    <div className="relative" ref={experiencesRef}>
                        <button 
                            onClick={() => setExperiencesMenuOpen(!isExperiencesMenuOpen)} 
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                isExperiencesMenuOpen ? 'bg-gray-700' : 'hover:bg-gray-700'
                            }`}
                        >
                            <SparklesIcon className="mr-2"/> Experiencias
                        </button>
                        {isExperiencesMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
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
                                                    ? 'bg-yellow-400 text-gray-900' 
                                                    : 'text-yellow-200 hover:bg-gray-700'
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
                        className="text-yellow-200 focus:outline-none p-2 rounded-md hover:bg-gray-700"
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
                                    ? 'bg-yellow-400 text-gray-900' 
                                    : 'hover:bg-gray-700'
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