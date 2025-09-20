import React, { useState } from 'react';
import { SparklesIcon, BotIcon } from '../icons/Icons';

const Home = ({ setView }) => {
    const [historicalFact, setHistoricalFact] = useState('');
    const [isLoadingFact, setIsLoadingFact] = useState(false);

    const handleGenerateFact = async () => {
        setIsLoadingFact(true);
        setHistoricalFact(''); 

        try {
            // Simulate API call with a predefined fact for demo
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

    return (
        <div className="animate-fade-in space-y-16">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl min-h-[60vh] flex items-center justify-center text-center">
                <img 
                    src="https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Vista panorámica de Medellín" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="relative z-10 p-8">
                    <h2 className="text-4xl md:text-6xl font-bold text-white font-serif shadow-lg animate-fade-in-up">
                        COSIACA 350
                        <span className="text-lg md:text-2xl font-montserrat block mt-2">
                            / UN VIAJE INMERSIVO A LA HISTORIA DE MEDELLÍN
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-yellow-200 mt-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                        PROPUESTA TRANSMEDIA PARA LA CELEBRACIÓN DE LOS 350 AÑOS DE MEDELLÍN
                    </p>
                    <p className="text-sm md:text-base text-yellow-300 mt-2 italic animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                        ESTÍMULO A LA CREACIÓN DE UNA OBRA ARTÍSTICA: CELEBRACIÓN DE LOS 350 AÑOS DE MEDELLÍN
                    </p>
                    <p className="text-sm md:text-base text-yellow-300 mt-2 italic animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                        Proyecto beneficiado de las Convocatorias de Fomento y Estímulos para el Arte y la Cultura 2025. 
                        Secretaría de Cultura Ciudadana de Medellín.
                    </p>
                </div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-3xl font-bold font-serif text-yellow-400 mb-4">
                    "Contar la historia para vivirla riendo"
                </h3>
                <p className="text-lg text-gray-300">
                    En el marco de la conmemoración de los 350 años de la fundación de Medellín, presentamos **Cosiaca 350**, 
                    una propuesta artística transmedia que dialoga con la historia, la identidad y el futuro de la ciudad. 
                    El proyecto rinde homenaje a Medellín integrando narrativa histórica y tecnología interactiva, 
                    reviviendo al mítico cuentero José García, "Cosiaca", como guía y narrador a través de tres siglos 
                    y medio de historia local.
                </p>
                <button 
                    onClick={() => setView('proyecto')} 
                    className="mt-8 bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-transform transform hover:scale-105 shadow-lg text-lg"
                >
                    Conocer el Proyecto a Fondo
                </button>
            </div>

            <section className="max-w-4xl mx-auto text-center bg-stone-800/50 p-8 rounded-lg shadow-xl border border-stone-700">
                <h3 className="text-3xl font-bold font-serif text-yellow-400 mb-4">
                    ✨ El Chismecito Histórico de Cosiaca ✨
                </h3>
                <p className="text-lg text-gray-200 mb-6">
                    ¿Quieres escuchar un dato curioso y divertido de la historia de Medellín, contado por el mismísimo Cosiaca? 
                    ¡Dale al botón!
                </p>
                <button 
                    onClick={handleGenerateFact} 
                    className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-transform transform hover:scale-105 shadow-lg text-lg flex items-center justify-center mx-auto" 
                    disabled={isLoadingFact}
                >
                    {isLoadingFact ? (
                        <>
                            <SparklesIcon className="animate-pulse mr-2" /> 
                            Pensando el chisme...
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="mr-2" /> 
                            Contar un Chisme Histórico
                        </>
                    )}
                </button>
                {historicalFact && (
                    <div className="mt-8 p-6 bg-stone-700 rounded-lg text-gray-100 italic text-left relative">
                        <p className="text-lg leading-relaxed">"{historicalFact}"</p>
                        <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-yellow-400 text-gray-900 rounded-full p-2 shadow-md">
                            <BotIcon className="w-6 h-6" />
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;