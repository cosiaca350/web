import React, { useState } from 'react';
import { SparklesIcon, BotIcon } from '../icons/Icons';

const ChevronLeftIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="15,18 9,12 15,6"/>
    </svg>
);

const ChevronRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="9,18 15,12 9,6"/>
    </svg>
);

const Home = ({ setView }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [historicalFact, setHistoricalFact] = useState('');
    const [isLoadingFact, setIsLoadingFact] = useState(false);

    const handleGenerateFact = async () => {
        setIsLoadingFact(true);
        setHistoricalFact(''); 

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const facts = [
                "¡Ah, mijito, le voy a contar un chismecito de Medellín! ¿Sabía que en 1675, cuando se fundó la Villa de Nuestra Señora de la Candelaria de Medellín, había más vacas que gente? ¡Sí señor! Los fundadores trajeron 24 familias, pero las vacas eran como 200. Por eso es que los paisas somos tan tercos, ¡heredamos el gen bovino!",
                "¡Uy, mijito, esto sí está bueno! En 1890, Medellín tenía el primer tranvía de mulas de Colombia. ¡Imagínese, las mulas jalando carros por toda la ciudad! Los pasajeros se quejaban del olor, pero las mulas nunca se quedaron sin gasolina. ¡Qué tiempos aquellos cuando el transporte público tenía cola y relinchaba!",
                "¡Ah, qué cosa tan curiosa! En 1920, el Parque Berrío era el lugar donde se hacían las peleas de gallos más famosas de Antioquia. Los domingos se llenaba de apostadores y el gallo ganador se volvía más famoso que cualquier político. ¡Hasta había gallos con manager y todo!"
            ];
            
            const randomFact = facts[Math.floor(Math.random() * facts.length)];
            setHistoricalFact(randomFact);
        } catch (error) {
            console.error('Error generating historical fact:', error);
            setHistoricalFact('¡Uy! Cosiaca se enredó con la historia. Intenta de nuevo más tarde.');
        } finally {
            setIsLoadingFact(false);
        }
    };

    const pages = [
        {
            id: 'intro',
            title: 'Cosiaca 350',
            subtitle: 'Un Viaje Inmersivo a la Historia de Medellín',
            content: (
                <div className="text-center space-y-6">
                    <div className="mb-8">
                        <div className="inline-block">
                            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-cosiaca-brown font-serif mb-4 tracking-tight">
                                Cosiaca
                            </h1>
                            <div className="flex justify-center">
                                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-cosiaca-brown border-2 border-cosiaca-brown px-6 py-2 rounded-lg">
                                    350
                                </span>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cosiaca-brown/80 mb-6 max-w-4xl mx-auto leading-tight">
                        UN VIAJE INMERSIVO<br/>
                        A LA HISTORIA DE MEDELLÍN
                    </h2>
                    <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige max-w-3xl mx-auto">
                        <p className="text-sm sm:text-base text-cosiaca-brown/70 font-medium">
                            PROPUESTA TRANSMEDIA PARA LA CELEBRACIÓN DE LOS 350 AÑOS<br/>
                            DE MEDELLÍN. ESTÍMULO A LA CREACIÓN DE UNA OBRA ARTÍSTICA.
                        </p>
                    </div>
                </div>
            ),
            background: 'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
        },
        {
            id: 'concept',
            title: 'El Concepto',
            subtitle: 'Contar la historia para vivirla riendo',
            content: (
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-cosiaca-brown font-serif mb-6">
                            El Concepto
                        </h2>
                        <p className="text-xl sm:text-2xl text-cosiaca-brown/80 font-medium italic">
                            "Contar la historia para vivirla riendo"
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                                <h3 className="text-2xl font-bold text-cosiaca-brown mb-4 font-serif">🎭 José García "Cosiaca"</h3>
                                <p className="text-cosiaca-brown/80 leading-relaxed">
                                    Revivimos al mítico cuentero, considerado el <strong>primer comediante popular de Antioquia</strong>, 
                                    como guía y narrador a través de <em>tres siglos y medio de historia local</em>.
                                </p>
                            </div>
                            
                            <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                                <h3 className="text-2xl font-bold text-cosiaca-brown mb-4 font-serif">🌟 Propuesta Transmedia</h3>
                                <p className="text-cosiaca-brown/80 leading-relaxed">
                                    Una experiencia que integra <strong>narrativa histórica y tecnología interactiva</strong>, 
                                    convirtiendo hechos y personajes de Medellín en una experiencia cultural 
                                    <em>accesible, educativa y entretenida</em>.
                                </p>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-cosiaca-cream/50 p-8 rounded-2xl border border-cosiaca-beige shadow-lg">
                                <div className="text-6xl mb-4">🤠</div>
                                <h4 className="text-2xl font-bold text-cosiaca-brown mb-4 font-serif">350 Años de Historia</h4>
                                <p className="text-cosiaca-brown/80">
                                    Desde <strong>1675</strong> hasta <strong>2025</strong><br/>
                                    Humor pícaro • Oralidad paisa • Participación del público
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            background: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
        },
        {
            id: 'components',
            title: 'Componentes Transmedia',
            subtitle: 'Una experiencia multiplataforma completa',
            content: (
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-cosiaca-brown font-serif mb-6">
                            Componentes Transmedia
                        </h2>
                        <p className="text-xl text-cosiaca-brown/80 font-medium">
                            Una experiencia multiplataforma completa
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300">
                            <div className="text-4xl mb-4">🌐</div>
                            <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-serif">Plataforma Web Interactiva</h3>
                            <p className="text-cosiaca-brown/80 text-sm leading-relaxed">
                                Sitio web a modo de museo virtual donde convergen todos los contenidos, 
                                con narrativas, líneas de tiempo y galerías audiovisuales.
                            </p>
                        </div>
                        
                        <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300">
                            <div className="text-4xl mb-4">🤖</div>
                            <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-serif">CosiacaBot</h3>
                            <p className="text-cosiaca-brown/80 text-sm leading-relaxed">
                                Asistente virtual con la personalidad de Cosiaca que permite a los usuarios 
                                "conversar" con este personaje histórico.
                            </p>
                        </div>
                        
                        <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300">
                            <div className="text-4xl mb-4">🎥</div>
                            <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-serif">Videos Históricos con IA</h3>
                            <p className="text-cosiaca-brown/80 text-sm leading-relaxed">
                                Micro-videos que recrean escenas y personajes históricos de Medellín 
                                usando técnicas de inteligencia artificial.
                            </p>
                        </div>
                        
                        <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300">
                            <div className="text-4xl mb-4">📚</div>
                            <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-serif">Crónica Novelada</h3>
                            <p className="text-cosiaca-brown/80 text-sm leading-relaxed">
                                "País de Cosiacas, ciegos y puritanos", libro que sienta 
                                la base narrativa del proyecto.
                            </p>
                        </div>
                        
                        <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300">
                            <div className="text-4xl mb-4">🎙️</div>
                            <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-serif">Podcast Histórico</h3>
                            <p className="text-cosiaca-brown/80 text-sm leading-relaxed">
                                Serie de episodios donde Cosiaca narra las historias más fascinantes 
                                de los 350 años de Medellín.
                            </p>
                        </div>
                        
                        <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-serif">Difusión Digital</h3>
                            <p className="text-cosiaca-brown/80 text-sm leading-relaxed">
                                Campaña digital en TikTok, Instagram, y YouTube para promocionar 
                                el contenido y fomentar la participación.
                            </p>
                        </div>
                    </div>
                </div>
            ),
            background: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
        },
        {
            id: 'interactive',
            title: 'Experiencia Interactiva',
            subtitle: 'Descubre la historia de manera divertida',
            content: (
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-cosiaca-brown font-serif mb-6">
                            Experiencia Interactiva
                        </h2>
                        <p className="text-xl text-cosiaca-brown/80 font-medium">
                            Descubre la historia de manera divertida
                        </p>
                    </div>
                    
                    <div className="bg-cosiaca-beige/30 p-8 rounded-xl border border-cosiaca-beige shadow-lg">
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">✨</div>
                            <h3 className="text-2xl font-bold text-cosiaca-brown mb-4 font-serif">
                                El Chismecito Histórico de Cosiaca
                            </h3>
                            <p className="text-lg text-cosiaca-brown/80 mb-6">
                                ¿Quieres escuchar un <strong>dato curioso y divertido</strong> de la historia de Medellín, 
                                contado por el mismísimo <em>Cosiaca</em>? <strong>¡Dale al botón!</strong>
                            </p>
                            
                            <button 
                                onClick={handleGenerateFact} 
                                className="bg-cosiaca-red text-white font-bold py-4 px-8 rounded-full hover:bg-cosiaca-red-dark transition-all duration-300 transform hover:scale-105 shadow-lg text-lg flex items-center justify-center mx-auto mb-6" 
                                disabled={isLoadingFact}
                            >
                                {isLoadingFact ? (
                                    <>
                                        <SparklesIcon className="animate-pulse mr-2" /> 
                                        <strong>Pensando el chisme...</strong>
                                    </>
                                ) : (
                                    <>
                                        <SparklesIcon className="mr-2" /> 
                                        <strong>Contar un Chisme Histórico</strong>
                                    </>
                                )}
                            </button>
                            
                            {historicalFact && (
                                <div className="p-6 bg-cosiaca-cream rounded-lg text-cosiaca-brown italic text-left relative border border-cosiaca-beige">
                                    <p className="text-lg leading-relaxed font-medium">
                                        <em>"{historicalFact}"</em>
                                    </p>
                                    <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-cosiaca-red text-white rounded-full p-2 shadow-md">
                                        <BotIcon className="w-6 h-6" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <button 
                            onClick={() => setView('proyecto')} 
                            className="bg-cosiaca-brown text-white font-bold py-4 px-8 rounded-full hover:bg-cosiaca-brown/80 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                        >
                            <strong>Explorar el Proyecto Completo</strong>
                        </button>
                    </div>
                </div>
            ),
            background: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
        }
    ];

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const currentPageData = pages[currentPage];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={currentPageData.background} 
                    alt="Background" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-cosiaca-cream/85"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div className="w-full max-w-7xl mx-auto">
                        {currentPageData.content}
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="p-6 bg-white/80 backdrop-blur-sm border-t border-cosiaca-beige">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        {/* Previous Button */}
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className={`flex items-center px-4 py-2 rounded-full font-bold transition-all duration-300 ${
                                currentPage === 0 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-cosiaca-brown text-white hover:bg-cosiaca-brown/80 transform hover:scale-105'
                            }`}
                        >
                            <ChevronLeftIcon className="w-5 h-5 mr-2" />
                            Anterior
                        </button>

                        {/* Page Indicators */}
                        <div className="flex space-x-2">
                            {pages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToPage(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentPage 
                                            ? 'bg-cosiaca-red scale-125' 
                                            : 'bg-cosiaca-brown/30 hover:bg-cosiaca-brown/50'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={nextPage}
                            disabled={currentPage === pages.length - 1}
                            className={`flex items-center px-4 py-2 rounded-full font-bold transition-all duration-300 ${
                                currentPage === pages.length - 1 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-cosiaca-red text-white hover:bg-cosiaca-red-dark transform hover:scale-105'
                            }`}
                        >
                            Siguiente
                            <ChevronRightIcon className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </div>

                {/* Footer with Sponsors */}
                <div className="bg-cosiaca-brown/90 backdrop-blur-sm text-white p-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-4">
                            <p className="text-sm font-medium mb-2">Apoya:</p>
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-6 text-xs">
                            <div className="text-center">
                                <p className="font-bold">Proyecto beneficiado de las</p>
                                <p>Convocatorias de Fomento y Estímulos</p>
                                <p>para el Arte y la Cultura 2025. Secretaría</p>
                                <p>de Cultura Ciudadana de Medellín.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="font-bold">BPP</p>
                                    <p className="text-xs">BIBLIOTECA</p>
                                    <p className="text-xs">PÚBLICA PILOTO</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-bold">SISTEMA DE</p>
                                    <p className="text-xs">BIBLIOTECAS</p>
                                    <p className="text-xs">PÚBLICAS DE</p>
                                    <p className="text-xs">MEDELLÍN</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-bold">Alcaldía de Medellín</p>
                                    <p className="text-xs">Ciencia, Tecnología e Innovación</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;