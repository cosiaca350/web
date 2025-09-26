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
import CosiacaBot from './components/CosiacaBot';
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
        <div className="min-h-screen bg-cosiaca-cream text-cosiaca-brown font-montserrat flex flex-col overflow-x-hidden">
            <Navbar view={view} setView={setView} />
            <main className="flex-1 container mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl">
                {renderContent()}
            </main>
            <footer className="bg-cosiaca-brown-dark p-4 sm:p-6 text-center text-cosiaca-cream border-t border-cosiaca-brown-medium">
                <div className="max-w-4xl mx-auto">
                    <p className="text-base sm:text-lg font-medium mb-2 text-cosiaca-beige">© 2024 Cosiaca {350} - Un Viaje Inmersivo a la Historia de Medellín</p>
                    <p className="text-sm sm:text-base text-cosiaca-tan mb-4">Todos los derechos reservados. Un proyecto de <strong>Núcleo Colectivo</strong></p>
                    <div className="text-xs sm:text-sm text-cosiaca-cream/70 space-y-1">
                        <p className="text-cosiaca-tan">Propuesta transmedia para la celebración de los 350 años de Medellín</p>
                        <p className="text-cosiaca-tan">Proyecto beneficiado de las Convocatorias de Fomento y Estímulos para el Arte y la Cultura 2025</p>
                        <p className="text-cosiaca-tan">Secretaría de Cultura Ciudadana de Medellín</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;