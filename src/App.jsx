import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Proyecto from './components/Proyecto';
import Libros from './components/Libros';
import Team from './components/Team';
import Redes from './components/Redes';
import Videos from './components/Videos';
import Juegos from './components/Juegos';
import Pagos from './components/Pagos';
import './App.css';

const App = () => {
    const [view, setView] = useState('home');
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Simulate user authentication for demo purposes
        setUser({ uid: 'demo-user' });
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
            case 'pagos':
                return <Pagos />;
            default:
                return <Home setView={setView} />;
        }
    };

    return (
        <div className="min-h-screen bg-stone-900 text-gray-100 font-sans flex flex-col">
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