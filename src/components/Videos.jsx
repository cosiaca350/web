import React from 'react';

const Videos = () => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto text-gray-300 space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-yellow-400">🎥 Videos IA</h1>
                <p className="text-xl mt-2 text-gray-400">
                    Contenido audiovisual que da vida a la historia con un toque de magia tecnológica.
                </p>
            </header>
            
            <div className="relative pt-[56.25%] bg-stone-800 rounded-xl shadow-2xl border border-stone-700 overflow-hidden">
                <iframe 
                    className="absolute inset-0 w-full h-full rounded-xl" 
                    src="https://www.youtube.com/embed/GP0kzjU5XxQ" 
                    title="Video promocional de Cosiaca 350" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                />
            </div>
            
            <p className="text-center text-gray-400 italic">
                El video muestra fotografías históricas de Medellín con efectos visuales y de sonido, 
                ofreciendo un viaje inmersivo a través del tiempo.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-stone-800 p-6 rounded-xl border border-stone-700">
                    <h3 className="text-xl font-bold text-yellow-300 mb-3">🎬 Técnicas de IA</h3>
                    <p className="text-gray-200">
                        Utilizamos inteligencia artificial para dar vida a fotografías históricas, 
                        creando experiencias visuales únicas que transportan al espectador a diferentes épocas de Medellín.
                    </p>
                </div>
                <div className="bg-stone-800 p-6 rounded-xl border border-stone-700">
                    <h3 className="text-xl font-bold text-yellow-300 mb-3">📚 Narrativa Histórica</h3>
                    <p className="text-gray-200">
                        Cada video cuenta una historia específica de la ciudad, narrada con el humor y la picardía 
                        característica de Cosiaca, haciendo la historia accesible y entretenida.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Videos;