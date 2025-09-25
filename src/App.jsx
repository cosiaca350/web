import React, { useState, useEffect, useRef } from 'react';
import ConstructionPage from './components/ConstructionPage';
import Navbar from './components/Navbar';
import Home from './components/Home';
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
import './App.css';

const App = () => {
    const [view, setView] = useState('home');
    const [user, setUser] = useState(null);
    const [showConstruction, setShowConstruction] = useState(true);

    useEffect(() => {
        // Simulate user authentication for demo purposes
        setUser({ uid: 'demo-user' });
    }, []);

    const handleEnterSite = () => {
        setShowConstruction(false);
    };

    if (showConstruction) {
        return <ConstructionPage onEnter={handleEnterSite} />;
    }

    const renderContent = () => {
        switch (view) {
            case 'home':
                return <Home setView={setView} />;
            case 'proyecto':
                return <Proyecto />;
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
        <div className="min-h-screen bg-cosiaca-cream text-cosiaca-brown font-montserrat flex flex-col">
            <Navbar view={view} setView={setView} />
            <main className="flex-1 container mx-auto p-4 md:p-8">
                {renderContent()}
            </main>
            <footer className="p-4 text-center text-cosiaca-brown/60 border-t border-cosiaca-beige">
                <p>© 2024 Cosiaca 350. Todos los derechos reservados. Un proyecto de Nucleo Colectivo.</p>
            </footer>
        </div>
    );
};

export default App;