import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy, serverTimestamp, doc, setDoc, setLogLevel } from 'firebase/firestore';

// --- ÍCONOS SVG ---
const BotIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 8V4H8" /><rect x="4" y="12" width="16" height="8" rx="2" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M12 12v-2" /><path d="M12 18v-2" /></svg>
);
const PodcastIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><path d="M12 12a5 5 0 0 0-5 5h10a5 5 0 0 0-5-5z"></path><path d="M12 2a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path></svg>
);
const VideoIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 8-6 4 6 4V8Z" /><rect x="2" y="6" width="14" height="12" rx="2" ry="2" /></svg>
);
const TeamIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const HomeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
const SendIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
);
const PlayIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="currentColor" {...props}><path d="M8 5v14l11-7z"/></svg>
);
const SparklesIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.5 3L7 7.5 9.5 11 8 15l4-1 4 1-1.5-4L17 7.5l-3.5-1.5Z"/><path d="M5 21v-3.5L2.5 15l4-1-1.5-4.5 4 1 2-3"/><path d="M19 21v-3.5L21.5 15l-4-1 1.5-4.5-4 1-2-3"/></svg>
);
const BookIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
);
const ProjectIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1V21c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V7.5L15.5 2z"/><path d="M15 2v5h5"/><path d="M10 16s.8-1.1 2-1.4c1.2-.3 2.4.3 2.4.3"/><path d="M10 13s.8-1.1 2-1.4c1.2-.3 2.4.3 2.4.3"/></svg>
);
const LinkIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
);
const FacebookIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const InstagramIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const YoutubeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21.54 6.42c-.2-.73-.79-1.32-1.52-1.52C18.52 4.5 12 4.5 12 4.5s-6.52 0-8.02.4c-.73.2-1.32.79-1.52 1.52C2 7.92 2 12 2 12s0 4.08.4 5.58c.2.73.79 1.32 1.52 1.52C5.48 19.5 12 19.5 12 19.5s6.52 0 8.02-.4c.73-.2 1.32-.79-1.52-1.52C22 16.08 22 12 22 12s0-4.08-.46-5.58z"></path><polygon points="9.5,7.5 15.5,12 9.5,16.5"></polygon></svg>
);
const GamepadIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><path d="M17.5 15C19.433 15 21 13.433 21 11.5S19.433 8 17.5 8 14 9.567 14 11.5c0 .346.06.68.17 1"/><path d="M4 6h16v12H4z"/></svg>
);
const LightbulbIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7.5a6 6 0 0 0-12 0c0 1.5.3 2.7 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);
const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const TikTokIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="currentColor" {...props}><path d="M12.5 0H12a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5H16a4 4 0 0 1 4 4v2a.5.5 0 0 0 .5.5H22a.5.5 0 0 0 .5-.5V19a7.5 7.5 0 0 0-7.5-7.5H17.5a.5.5 0 0 0-.5.5v-2a.5.5 0 0 0 .5.5H17a4 4 0 0 1-4-4V0zM4 0h-1a.5.5 0 0 0-.5.5v22a.5.5 0 0 0 .5.5H10a.5.5 0 0 0 .5-.5V15a4 4 0 0 1-4-4V5.5a.5.5 0 0 0 .5-.5H8V0H4z"/></svg>
);
const CheckCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-8.62"/><path d="M12 2v10"/><path d="M22 4L12 14.5l-2-2"/></svg>
);
const XCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6"/><path d="M9 9l6 6"/></svg>
);

// --- COMPONENTES DE LA UI ---

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
                <h1 className="text-2xl font-bold font-serif tracking-wider cursor-pointer text-yellow-300" onClick={() => setView('home')}>🤠 Cosiaca 350</h1>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-2">
                    {mainLinks.map(link => (
                        <button key={link.view} onClick={() => setView(link.view)} className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${view === link.view ? 'bg-yellow-400 text-gray-900 shadow-lg' : 'hover:bg-gray-700'}`}>
                            {link.icon} {link.name}
                        </button>
                    ))}
                    <div className="relative" ref={experiencesRef}>
                        <button onClick={() => setExperiencesMenuOpen(!isExperiencesMenuOpen)} className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isExperiencesMenuOpen ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                            <SparklesIcon className="mr-2"/> Experiencias
                        </button>
                        {isExperiencesMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                                <div className="py-1">
                                    {experienceLinks.map(link => (
                                        <button key={link.view} onClick={() => { setView(link.view); setExperiencesMenuOpen(false); }} className={`flex items-center w-full text-left px-4 py-2 text-sm ${view === link.view ? 'bg-yellow-400 text-gray-900' : 'text-yellow-200 hover:bg-gray-700'}`}>
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
                    <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-yellow-200 focus:outline-none p-2 rounded-md hover:bg-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 space-y-1">
                    {[...mainLinks, ...experienceLinks].map(link => (
                        <button key={link.view} onClick={() => { setView(link.view); setMobileMenuOpen(false); }} className={`flex items-center w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors ${view === link.view ? 'bg-yellow-400 text-gray-900' : 'hover:bg-gray-700'}`}>
                            {link.icon} {link.name}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
};

// --- COMPONENTES DE VISTAS ---

const Home = ({ setView }) => {
    const [historicalFact, setHistoricalFact] = useState('');
    const [isLoadingFact, setIsLoadingFact] = useState(false);

    const handleGenerateFact = async () => {
        setIsLoadingFact(true);
        setHistoricalFact(''); 

        try {
            const prompt = "Genera un hecho histórico corto, curioso y divertido sobre la ciudad de Medellín, Colombia, contado con el estilo pícaro y humorístico del cuentero 'Cosiaca'. No uses más de 100 palabras. Empieza con '¡Ah, mijito, le voy a contar un chismecito de Medellín!'";
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
                setHistoricalFact(result.candidates[0].content.parts[0].text);
            } else {
                setHistoricalFact('¡Uy! Cosiaca se quedó sin chisme por ahora. Intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error generating historical fact:', error);
            setHistoricalFact('¡Uy! Cosiaca se enredó con la historia. Intenta de nuevo más tarde.');
        } finally {
            setIsLoadingFact(false);
        }
    };

    return (
        <div className="animate-fade-in space-y-16">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl min-h-[60vh] flex items-center justify-center text-center">
                <img src="https://raw.githubusercontent.com/NucleoColectivo/Cosiaca/main/IMG/03%20Robo%20del%20gallo.png" alt="Ilustración de Cosiaca robando un gallo" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="relative z-10 p-8">
                    <h2 className="text-4xl md:text-6xl font-bold text-white font-serif shadow-lg animate-fade-in-up">
                        COSIACA 350
                        <span className="text-lg md:text-2xl font-montserrat block mt-2">/ UN VIAJE INMERSIVO A LA HISTORIA DE MEDELLÍN</span>
                    </h2>
                    <p className="text-lg md:text-xl text-yellow-200 mt-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>PROPUESTA TRANSMEDIA PARA LA CELEBRACIÓN DE LOS 350 AÑOS DE MEDELLÍN</p>
                    <p className="text-sm md:text-base text-yellow-300 mt-2 italic animate-fade-in-up" style={{animationDelay: '0.4s'}}>ESTÍMULO A LA CREACIÓN DE UNA OBRA ARTÍSTICA: CELEBRACIÓN DE LOS 350 AÑOS DE MEDELLÍN</p>
                    <p className="text-sm md:text-base text-yellow-300 mt-2 italic animate-fade-in-up" style={{animationDelay: '0.6s'}}>Proyecto beneficiado de las Convocatorias de Fomento y Estímulos para el Arte y la Cultura 2025. Secretaría de Cultura Ciudadana de Medellín.</p>
                </div>
            </div>
            <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-3xl font-bold font-serif text-yellow-400 mb-4">"Contar la historia para vivirla riendo"</h3>
                <p className="text-lg text-gray-300">
                    En el marco de la conmemoración de los 350 años de la fundación de Medellín, presentamos **Cosiaca 350**, una propuesta artística transmedia que dialoga con la historia, la identidad y el futuro de la ciudad. El proyecto rinde homenaje a Medellín integrando narrativa histórica y tecnología interactiva, reviviendo al mítico cuentero José García, “Cosiaca”, como guía y narrador a través de tres siglos y medio de historia local.
                </p>
                <button onClick={() => setView('proyecto')} className="mt-8 bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-transform transform hover:scale-105 shadow-lg text-lg">
                    Conocer el Proyecto a Fondo
                </button>
            </div>

            <section className="max-w-4xl mx-auto text-center bg-stone-800/50 p-8 rounded-lg shadow-xl border border-stone-700">
                <h3 className="text-3xl font-bold font-serif text-yellow-400 mb-4">✨ El Chismecito Histórico de Cosiaca ✨</h3>
                <p className="text-lg text-gray-200 mb-6">
                    ¿Quieres escuchar un dato curioso y divertido de la historia de Medellín, contado por el mismísimo Cosiaca? ¡Dale al botón!
                </p>
                <button onClick={handleGenerateFact} className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-transform transform hover:scale-105 shadow-lg text-lg flex items-center justify-center mx-auto" disabled={isLoadingFact}>
                    {isLoadingFact ? <><SparklesIcon className="animate-pulse mr-2" /> Pensando el chisme...</> : <><SparklesIcon className="mr-2" /> Contar un Chisme Histórico</>}
                </button>
                {historicalFact && (
                    <div className="mt-8 p-6 bg-stone-700 rounded-lg text-gray-100 italic text-left relative">
                        <p className="text-lg leading-relaxed">"{historicalFact}"</p>
                        <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-yellow-400 text-gray-900 rounded-full p-2 shadow-md"><BotIcon className="w-6 h-6" /></div>
                    </div>
                )}
            </section>
        </div>
    );
};

const Proyecto = () => {
    return (
        <div className="animate-fade-in space-y-12 max-w-5xl mx-auto text-gray-300">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-yellow-400">El Proyecto: Cosiaca 350</h1>
                <p className="text-xl mt-2 text-gray-400">Un Viaje Inmersivo a la Historia de Medellín</p>
            </header>
            <section className="bg-stone-800 p-8 rounded-xl shadow-2xl border border-stone-700">
                <h2 className="text-3xl font-serif text-yellow-300 mb-4 border-b-2 border-yellow-400/20 pb-2">💡 Introducción y Concepto General</h2>
                <p>En el marco de la conmemoración de los 350 años de la fundación de Medellín, presentamos Cosiaca 350, una propuesta artística transmedia-multiplataforma que dialoga con la historia, la identidad y el futuro de la ciudad. El proyecto busca rendir homenaje a Medellín integrando narrativa histórica y tecnología interactiva, en sintonía con los lineamientos de la convocatoria que promueven obras inspiradas en archivos históricos e innovación digital.</p>
                <p className="mt-4">La obra se basa en revivir al mítico cuentero José García, “Cosiaca”, considerado el primer comediante popular de Antioquia como guía y narrador a través de anécdotas de tres siglos y medio de historia local. Proponemos **“contar la historia para vivirla riendo”**: mediante humor pícaro, oralidad paisa y participación del público, convertiremos hechos y personajes de Medellín (1675–2025) en una experiencia cultural accesible, educativa y entretenida.</p>
            </section>
            <section className="bg-stone-800 p-8 rounded-xl shadow-2xl border border-stone-700">
                <h2 className="text-3xl font-serif text-yellow-300 mb-4 border-b-2 border-yellow-400/20 pb-2">🌌 Componentes Transmedia</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-stone-700/50 p-6 rounded-lg border border-stone-600"><h4 className="font-bold text-xl text-yellow-400 mb-2">Plataforma Web Interactiva</h4><p className="text-gray-200">Sitio web a modo de museo virtual donde convergen todos los contenidos, con narrativas, líneas de tiempo y galerías audiovisuales.</p></div>
                    <div className="bg-stone-700/50 p-6 rounded-lg border border-stone-600"><h4 className="font-bold text-xl text-yellow-400 mb-2">CosiacaBot</h4><p className="text-gray-200">Asistente virtual con la personalidad de Cosiaca que permite a los usuarios “conversar” con este personaje histórico.</p></div>
                    <div className="bg-stone-700/50 p-6 rounded-lg border border-stone-600"><h4 className="font-bold text-xl text-yellow-400 mb-2">Videos Históricos con IA</h4><p className="text-gray-200">Micro-videos que recrean escenas y personajes históricos de Medellín usando técnicas de inteligencia artificial.</p></div>
                    <div className="bg-stone-700/50 p-6 rounded-lg border border-stone-600"><h4 className="font-bold text-xl text-yellow-400 mb-2">Crónica Novelada</h4><p className="text-gray-200">“País de Cosiacas, ciegos y puritanos”, libro que sienta la base narrativa del proyecto.</p></div>
                    <div className="bg-stone-700/50 p-6 rounded-lg border border-stone-600"><h4 className="font-bold text-xl text-yellow-400 mb-2">Difusión en Redes Sociales</h4><p className="text-gray-200">Campaña digital en TikTok, Instagram, y YouTube para promocionar el contenido y fomentar la participación.</p></div>
                </div>
            </section>
            <section className="bg-stone-800 p-8 rounded-xl shadow-2xl border border-stone-700">
                <h2 className="text-3xl font-serif text-yellow-300 mb-4 border-b-2 border-yellow-400/20 pb-2">🔍 Inspiración y Fuentes</h2>
                <p className="mb-4">La elección de archivos históricos y centros de documentación se sustenta en la necesidad de anclar la narrativa en fuentes auténticas, ricas en valor simbólico y documental. Estos espacios ofrecen una vasta reserva de material que permite reconstruir con rigor y sensibilidad el pasado de la ciudad.</p>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li>**Fuentes primarias:** Fotografías de los fondos Rodríguez e Ignacio Gómez, hemeroteca de prensa satírica, mapas y registros del Archivo Histórico de Medellín.</li>
                    <li>**Obra literaria base:** “País de Cosiacas, ciegos y puritanos” de J. A. Ramírez.</li>
                    <li>**Centros aliados:** Biblioteca Pública Piloto, Museo de Antioquia, Centro de Documentación Musical.</li>
                    <li>**Experimentación con IA:** Usamos la IA como una fuente de imaginación colaborativa para generar imágenes, sonidos y estilos visuales únicos.</li>
                </ul>
            </section>
        </div>
    );
};

const Libros = () => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto text-gray-300 space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-yellow-400">📖 Libros: La Base Narrativa</h1>
                <p className="text-xl mt-2 text-gray-400">La crónica que inspira nuestro universo transmedia.</p>
            </header>
            <div className="bg-stone-800 p-8 rounded-xl shadow-2xl border border-stone-700 md:flex md:items-center md:space-x-8">
                <img src="https://github.com/cosiaca350/APS/raw/main/portada.png" alt="Portada del libro País de Cosiacas, ciegos y puritanos" className="w-full md:w-1/3 rounded-lg shadow-lg mb-6 md:mb-0" />
                <div className="md:w-2/3">
                    <h2 className="text-3xl font-serif text-yellow-300 mb-4">"País de Cosiacas, ciegos y puritanos"</h2>
                    <p className="text-lg mb-4">Esta obra de J. A. Ramírez no es solo un libro, es el corazón de Cosiaca 350. A través de una investigación profunda y una pluma ágil, el autor desentierra las raíces de la picaresca antioqueña, personificada en la figura de Cosiaca. El libro sirve como nuestra "biblia" narrativa, proporcionando el tono, las anécdotas y el contexto histórico que alimentan cada componente de nuestro proyecto transmedia.</p>
                    <p>La crónica novelada explora cómo el humor, la astucia y la oralidad han sido herramientas de supervivencia y cohesión social en la región, sentando las bases para entender la identidad "paisa" de hoy.</p>
                </div>
            </div>
        </div>
    );
};

const Team = () => {
    // Datos corregidos del equipo según el documento
    const teamMembers = [
        { name: 'Manuel Palacio', role: 'Director creativo y productor, diseñador visual.', img: 'https://placehold.co/120x120/90CDF4/3182CE?text=MP' },
        { name: 'Carlos Andrés Londoño Ruiz', role: 'Director artístico y diseñador visual IA.', img: 'https://placehold.co/120x120/90CDF4/3182CE?text=CL' },
        { name: 'Juan Alejandro Ramírez', role: 'Director de guión y contenido, líder e investigador histórico.', img: 'https://placehold.co/120x120/90CDF4/3182CE?text=JR' },
    ];
    return (
        <div className="animate-fade-in max-w-5xl mx-auto text-gray-300 space-y-12">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-yellow-400">Nuestro Equipo</h1>
                <p className="text-xl mt-2 text-gray-400">Los artífices detrás de la Re-evolución de Cosiaca.</p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map(member => (
                    <div key={member.name} className="bg-stone-800 text-center p-6 rounded-xl shadow-lg border border-stone-700 hover:shadow-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300">
                        <img src={member.img} alt={`Foto de ${member.name}`} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-stone-600 object-cover" />
                        <h3 className="text-xl font-bold text-yellow-300">{member.name}</h3>
                        <p className="text-gray-400">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Redes = () => {
    return (
        <div className="animate-fade-in max-w-3xl mx-auto text-center text-gray-300 space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-yellow-400">🔗 Redes Sociales y Contacto</h1>
            <p className="text-xl text-gray-400">Síguenos y mantente al tanto de todas las novedades de Cosiaca 350.</p>
            <div className="bg-stone-700/50 p-8 rounded-lg shadow-xl border border-stone-600">
                <p className="text-lg mb-6 text-gray-200">Conéctate con nosotros a través de nuestras plataformas digitales. ¡La historia de Medellín te espera con un toque de humor y picardía!</p>
                <div className="flex justify-center space-x-6 mb-8">
                    <a href="https://www.tiktok.com/@ncleo.colectivo?_t=ZS-8zo20sFpiBY&_r=1" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-transform transform hover:scale-110"><TikTokIcon className="w-12 h-12" /></a>
                    <a href="https://www.instagram.com/cosiaca350?igsh=MTNtZjB3a3V4dXRwOQ==" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-transform transform hover:scale-110"><InstagramIcon className="w-12 h-12" /></a>
                    <a href="https://www.facebook.com/NucleoColectivoFaro" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-transform transform hover:scale-110"><FacebookIcon className="w-12 h-12" /></a>
                    <a href="https://www.youtube.com/@NucleoColectivoFaro" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-transform transform hover:scale-110"><YoutubeIcon className="w-12 h-12" /></a>
                </div>
                
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold font-serif text-yellow-300 mb-4">📧 Contacto Directo</h3>
                    <div className="flex flex-col items-center space-y-2 text-gray-200">
                        <a href="mailto:nucleo.colectivo.art@gmail.com" className="hover:text-yellow-400 transition-colors">nucleo.colectivo.art@gmail.com</a>
                        <a href="mailto:cosiaca350@gmail.com" className="hover:text-yellow-400 transition-colors">cosiaca350@gmail.com</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Videos = () => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto text-gray-300 space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-yellow-400">🎥 Videos IA</h1>
                <p className="text-xl mt-2 text-gray-400">Contenido audiovisual que da vida a la historia con un toque de magia tecnológica.</p>
            </header>
            <div className="relative pt-[56.25%] bg-stone-800 rounded-xl shadow-2xl border border-stone-700 overflow-hidden">
                {/* Nota: Enlace corregido para el video promocional de Cosiaca 350. */}
                <iframe 
                    className="absolute inset-0 w-full h-full rounded-xl" 
                    src="https://www.youtube.com/embed/GP0kzjU5XxQ" 
                    title="Video promocional de Cosiaca 350" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                </iframe>
            </div>
            <p className="text-center text-gray-400 italic">
                El video muestra fotografías históricas de Medellín con efectos visuales y de sonido, ofreciendo un viaje inmersivo a través del tiempo.
            </p>
        </div>
    );
};

const Juegos = () => {
    const [activeTab, setActiveTab] = useState('trivia');
    const [triviaScore, setTriviaScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [currentJoke, setCurrentJoke] = useState('');
    const [currentTrova, setCurrentTrova] = useState('');

    // Trivia Data
    const triviaQuestions = [
        {
            question: "¿Cuál es el nombre original del Parque Berrío, centro histórico de Medellín?",
            options: ["Plaza de la Villa de la Candelaria", "Plaza de la Ciudadela", "Plaza Mayor", "Plaza de la Abadía"],
            correctAnswer: "Plaza de la Villa de la Candelaria",
            feedback: "¡Qué va! Si supiera, mijito, el Parque Berrío no siempre fue el centro del guayabo. Antes se llamaba 'Plaza de la Villa de la Candelaria', en honor a la patrona. ¡Era el punto de encuentro, el ombligo del pueblo, donde se hacían los negocios, las misas y hasta las peleas de gallos, pa' qué! Así de importante era, y sigue siéndolo, ¿o qué?"
        },
        {
            question: "¿En qué año se fundó el Metro de Medellín, el primer y único sistema de transporte masivo de Colombia que circula sobre rieles?",
            options: ["1984", "1995", "1990", "2000"],
            correctAnswer: "1995",
            feedback: "¡Ah, qué belleza el Metro! Esa obra sí que puso a Medellín a volar. Se inauguró en **1995** y cambió la vida de todos. Antes, un viaje de Envigado a Bello era una travesía, ¡un 'cuelgue' total! El Metro nos hizo una ciudad más moderna, más conectada y, claro, ¡más chismosa de lo que ya éramos!"
        },
        {
            question: "¿Qué famoso artista antioqueño, conocido por sus esculturas de figuras voluptuosas, donó varias de sus obras al Museo de Antioquia y a la Plaza Botero?",
            options: ["Débora Arango", "Fernando Botero", "Rodrigo Arenas Betancur", "Pedro Nel Gómez"],
            correctAnswer: "Fernando Botero",
            feedback: "¡Mijito, ese sí es un 'paisita' que nos llena de orgullo! **Fernando Botero**, con su estilo único, nos regaló esas esculturas 'gorditas' que ya son un símbolo de la ciudad. Dicen que tienen tanta carne que hasta con hambre provocan, ja ja. Un verdadero genio que puso a Medellín en el mapa del mundo, ¿o no?"
        },
        {
            question: "¿Cuál es el nombre popular de la ciudad de Medellín, conocido como la ciudad de la eterna primavera?",
            options: ["Ciudad de las Flores", "Capital de la Montaña", "Ciudad de la Eterna Primavera", "La Ciudad del Río"],
            correctAnswer: "Ciudad de la Eterna Primavera",
            feedback: "¡Claro que sí! Con este clima tan sabroso, ¿quién no va a querer estar acá? El nombre 'Ciudad de la Eterna Primavera' no es por chiste, ¡es por la realidad! Aquí uno no sufre ni de calor ni de frío, es como vivir en un eterno 'pico de oro'. Por eso es que hasta las flores se nos dan bien bonitas todo el año, ¡qué gozadera!"
        },
        {
            question: "¿Qué festival de flores se celebra anualmente en Medellín en el mes de agosto?",
            options: ["Festival de Verano", "Festival de la Caña", "Feria de las Flores", "Festival de las Artes"],
            correctAnswer: "Feria de las Flores",
            feedback: "¡Uy, si no supiera eso, mijito, me pongo 'de patas'! La **Feria de las Flores** es la fiesta más grande de la ciudad. El Desfile de Silleteros es el evento central, donde los campesinos de Santa Elena cargan a la espalda unas obras de arte hechas con flores. ¡Es una belleza que hasta a uno lo hace llorar de la emoción, y eso que yo solo lloro por la cebolla!"
        }
    ];

    // Stand Up Data
    const standUpJokes = [
        "¿Cuál es el colmo de un electricista? Que su mujer se llame Luz y sus hijos le sigan la corriente.",
        "¿Qué le dice un semáforo a otro? No me mires, que me estoy cambiando.",
        "Iba Caperucita Roja por el bosque, cuando se encuentra al lobo y el lobo le dice: '¿A dónde vas tan sola?' Y Caperucita responde: 'A la casa de mi abuela'. Y el lobo le dice: '¡Ah, bueno, pues yo me voy a mi casa, chao!'",
        "¿Qué hace una abeja en un gimnasio? ¡Zumba!",
        "¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter."
    ];

    // Trovas Data
    const trovasPaisa = [
        "Con la guitarra en la mano\ny un sombrero de ocasión,\nles vengo a dar la bienvenida\ncon un verso y con amor.",
        "De la montaña antioqueña\nle vengo a traer un verso,\npara que quede contento\ncon el cantar de mi voz.",
        "Vengo de la capital\ndonde todo es progreso,\ndonde se canta y se baila\ny se olvida del regreso.",
        "En esta fiesta tan linda\ncon la gente tan contenta,\nles prometo que esta trova\nno tiene nada de cuenta.",
        "En este hermoso lugar\nla gente es muy querendona,\ny en la palma de mi mano\nllevo a una antioqueña hermosa."
    ];
    
    useEffect(() => {
        if (activeTab === 'standup') {
            setCurrentJoke(getRandomJoke());
        }
        if (activeTab === 'trovas') {
            setCurrentTrova(getRandomTrova());
        }
    }, [activeTab]);

    const handleAnswer = (selectedOption) => {
        if (selectedAnswer !== null) return;
        
        const isCorrectAnswer = selectedOption === triviaQuestions[currentQuestionIndex].correctAnswer;
        setSelectedAnswer(selectedOption);
        setIsCorrect(isCorrectAnswer);
        setFeedbackMessage(triviaQuestions[currentQuestionIndex].feedback);

        setTimeout(() => {
            setCurrentQuestionIndex(index => index + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setFeedbackMessage(null);
        }, 8000); // Dar tiempo para leer el feedback
    };

    const resetTrivia = () => {
        setTriviaScore(0);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setFeedbackMessage(null);
    };

    const getRandomJoke = () => {
        const randomIndex = Math.floor(Math.random() * standUpJokes.length);
        return standUpJokes[randomIndex];
    };

    const getRandomTrova = () => {
        const randomIndex = Math.floor(Math.random() * trovasPaisa.length);
        return trovasPaisa[randomIndex].replace(/\n/g, '<br>');
    };
    
    return (
        <div className="animate-fade-in max-w-2xl mx-auto bg-stone-900 rounded-3xl shadow-xl w-full overflow-hidden transition-all duration-300">
            <div className="p-6 md:p-8 text-center bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
                <h1 className="text-3xl font-bold tracking-tight font-serif">Juegos y AR</h1>
                <p className="mt-2 text-lg opacity-90">¡Humor, conocimiento y rima paisa!</p>
            </div>

            <div className="flex border-b border-stone-800 bg-stone-800">
                <button
                    className={`flex-1 py-4 text-center font-bold text-sm focus:outline-none transition-colors duration-300 transform ${activeTab === 'trivia' ? 'bg-yellow-400 text-gray-900 shadow-md scale-105' : 'text-gray-400 hover:bg-stone-700'}`}
                    onClick={() => setActiveTab('trivia')}
                >
                    Trivia
                </button>
                <button
                    className={`flex-1 py-4 text-center font-bold text-sm focus:outline-none transition-colors duration-300 transform ${activeTab === 'standup' ? 'bg-yellow-400 text-gray-900 shadow-md scale-105' : 'text-gray-400 hover:bg-stone-700'}`}
                    onClick={() => setActiveTab('standup')}
                >
                    Stand Up
                </button>
                <button
                    className={`flex-1 py-4 text-center font-bold text-sm focus:outline-none transition-colors duration-300 transform ${activeTab === 'trovas' ? 'bg-yellow-400 text-gray-900 shadow-md scale-105' : 'text-gray-400 hover:bg-stone-700'}`}
                    onClick={() => setActiveTab('trovas')}
                >
                    Trovas
                </button>
            </div>

            <div className="p-6 md:p-8 bg-stone-900">
                {/* Trivia Content */}
                {activeTab === 'trivia' && (
                    <div className="space-y-6 animate-fade-in">
                        {currentQuestionIndex < triviaQuestions.length ? (
                            <>
                                <div className="bg-stone-800 text-gray-100 p-6 rounded-xl shadow-inner border border-stone-700">
                                    <p className="text-sm font-semibold text-yellow-400 mb-2">Puntuación: {triviaScore}</p>
                                    <p className="text-lg md:text-xl font-bold">{triviaQuestions[currentQuestionIndex].question}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {triviaQuestions[currentQuestionIndex].options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(option)}
                                            disabled={selectedAnswer !== null}
                                            className={`
                                                w-full py-4 px-4 rounded-xl shadow-sm transition-all duration-300
                                                font-semibold text-center
                                                ${selectedAnswer === option
                                                    ? (isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white')
                                                    : 'bg-stone-700 text-gray-200 hover:bg-stone-600'
                                                }
                                                ${selectedAnswer !== null ? 'opacity-80' : ''}
                                                focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-stone-900
                                            `}
                                        >
                                            {option}
                                            {selectedAnswer === option && (
                                                <span className="ml-2">
                                                    {isCorrect ? <CheckCircleIcon className="inline-block w-5 h-5" /> : <XCircleIcon className="inline-block w-5 h-5" />}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {feedbackMessage && (
                                    <div className="bg-stone-800 text-gray-200 p-6 rounded-xl shadow-lg border border-yellow-400/50 mt-4 animate-fade-in">
                                        <div className="flex items-start space-x-3">
                                            <BotIcon className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                                            <div>
                                                <p className="font-bold text-yellow-300 mb-1">Cosiaca te cuenta:</p>
                                                <p className="italic">{feedbackMessage}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="bg-stone-800 p-8 rounded-xl shadow-lg border border-stone-700">
                                    <h3 className="text-2xl font-serif text-yellow-300 mb-2">¡Trivia Terminada!</h3>
                                    <p className="text-xl text-yellow-100">Tu puntuación final es:</p>
                                    <p className="text-4xl font-bold mt-2 text-yellow-400">{triviaScore} de {triviaQuestions.length}</p>
                                </div>
                                <button
                                    onClick={resetTrivia}
                                    className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl shadow-lg hover:bg-yellow-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                                >
                                    Volver a Jugar
                                </button>
                            </div>
                        )}
                    </div>
                )}
                
                {/* Stand Up Content */}
                {activeTab === 'standup' && (
                    <div className="text-center space-y-8 animate-fade-in">
                        <div className="bg-stone-800 rounded-xl p-8 shadow-inner border border-stone-700">
                            <h3 className="text-3xl font-serif text-yellow-300 mb-4">El Chiste de Cosiaca</h3>
                            <p className="text-xl md:text-2xl font-semibold italic text-yellow-100 leading-relaxed">{currentJoke}</p>
                        </div>
                        <button
                            onClick={() => setCurrentJoke(getRandomJoke())}
                            className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl shadow-lg hover:bg-yellow-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                        >
                            Nuevo Chiste
                        </button>
                    </div>
                )}

                {/* Trovas Content */}
                {activeTab === 'trovas' && (
                    <div className="text-center space-y-8 animate-fade-in">
                        <div className="bg-stone-800 rounded-xl p-8 shadow-inner border border-stone-700">
                            <h3 className="text-3xl font-serif text-yellow-300 mb-4">La Trova Paisa</h3>
                            <p className="text-xl md:text-2xl font-semibold leading-relaxed text-yellow-100" dangerouslySetInnerHTML={{ __html: currentTrova }}></p>
                        </div>
                        <button
                            onClick={() => setCurrentTrova(getRandomTrova())}
                            className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl shadow-lg hover:bg-yellow-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                        >
                            Otra Trova
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DE LA APP ---
const App = () => {
    const [view, setView] = useState('home');
    const [user, setUser] = useState(null);
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        setLogLevel('debug');
        try {
            const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
            const app = initializeApp(firebaseConfig);
            const authInstance = getAuth(app);
            const dbInstance = getFirestore(app);

            setAuth(authInstance);
            setDb(dbInstance);

            const unsubscribe = onAuthStateChanged(authInstance, async (currentUser) => {
                if (currentUser) {
                    setUser(currentUser);
                } else {
                    if (typeof __initial_auth_token !== 'undefined') {
                        try {
                            const result = await signInWithCustomToken(authInstance, __initial_auth_token);
                            setUser(result.user);
                        } catch (error) {
                            console.error('Error signing in with custom token:', error);
                            await signInAnonymously(authInstance);
                        }
                    } else {
                        await signInAnonymously(authInstance);
                    }
                }
            });
            return () => unsubscribe();
        } catch (e) {
            console.error('Firebase initialization failed:', e);
        }
    }, []);

    const renderContent = () => {
        switch (view) {
            case 'home':
                return <Home setView={setView} />;
            case 'proyecto':
                return <Proyecto />;
            case 'juegos':
                return <Juegos />;
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
        <div className="min-h-screen bg-stone-900 text-gray-100 font-sans flex flex-col">
            <style>
                {`
                .font-sans {
                    font-family: "Inter", sans-serif;
                }
                .font-serif {
                    font-family: "Playfair Display", serif;
                }
                .font-montserrat {
                    font-family: "Montserrat", sans-serif;
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-in-out;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-in-out;
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                .user-message {
                    animation: slideInRight 0.3s ease-in-out;
                }
                .bot-message {
                    animation: slideInLeft 0.3s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInRight {
                    from { transform: translateX(20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInLeft {
                    from { transform: translateX(-20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                `}
            </style>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            <script src="https://cdn.tailwindcss.com"></script>
            <Navbar view={view} setView={setView} />
            <main className="flex-1 container mx-auto p-4 md:p-8">
                {renderContent()}
            </main>
            <footer className="p-4 text-center text-gray-400 border-t border-stone-800">
                <p>© 2024 Cosiaca 350. Todos los derechos reservados. Un proyecto de Nucleo Colectivo.</p>
            </footer>
        </div>
    );
};

export default App;
