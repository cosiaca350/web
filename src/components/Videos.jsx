import React from 'react';

const Videos = () => {
    const videoList = [
        {
            id: 1,
            title: "Medellín a través del tiempo - Video promocional",
            description: "Un viaje visual por 350 años de historia de Medellín con efectos de IA",
            embedId: "GP0kzjU5XxQ",
            category: "Promocional"
        },
        // Aquí puedes agregar más videos cuando estén disponibles
    ];

    return (
        <div className="animate-fade-in max-w-4xl mx-auto text-cosiaca-brown space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-cosiaca-brown">
                    🎥 Videos con Inteligencia Artificial
                </h1>
                <p className="text-xl mt-2 text-cosiaca-brown-light/70">
                    <em>La historia de Medellín cobra vida con tecnología de vanguardia</em>
                </p>
            </header>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige text-center">
                <h2 className="text-2xl font-bold font-serif text-cosiaca-brown mb-4">
                    "Cuando la Historia se Encuentra con la Tecnología"
                </h2>
                <p className="text-lg text-cosiaca-brown/80 lead">
                    Utilizamos <strong>inteligencia artificial de última generación</strong> para dar vida a <em>fotografías históricas, 
                    recrear personajes del pasado</em> y crear experiencias visuales que transportan al espectador a través de 
                    <strong>350 años de historia medellinense</strong>.
                </p>
                <div className="mt-6">
                    <a 
                        href="https://www.youtube.com/watch?v=GP0kzjU5XxQ" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-cosiaca-red text-white px-6 py-3 rounded-full hover:bg-cosiaca-red-dark transition-all duration-300 transform hover:scale-105 shadow-lg font-bold"
                    >
                        🎥 Ver Video Principal
                    </a>
                </div>
            </div>

            {/* Lista de Videos */}
            <div className="space-y-8">
                {videoList.map((video) => (
                    <div key={video.id} className="bg-white rounded-xl shadow-lg border border-cosiaca-beige overflow-hidden">
                        <div className="relative pt-[56.25%] bg-cosiaca-beige">
                            <iframe 
                                className="absolute inset-0 w-full h-full" 
                                src={`https://www.youtube.com/embed/${video.embedId}`}
                                title={video.title}
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="bg-cosiaca-red text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {video.category}
                                </span>
                                <span className="text-sm text-cosiaca-brown/60">🎥 Video IA</span>
                            </div>
                            <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-serif">
                                {video.title}
                            </h3>
                            <p className="text-cosiaca-brown/80 leading-relaxed">
                                {video.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Información Técnica */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-serif">🤖 Tecnologías IA Utilizadas</h3>
                    <p className="text-cosiaca-brown-light/80">
                        <strong>• Animación de fotografías históricas</strong><br/>
                        <strong>• Recreación de personajes del pasado</strong><br/>
                        <strong>• Efectos visuales generativos</strong><br/>
                        <strong>• Síntesis de voz histórica</strong><br/>
                        <strong>• Colorización automática</strong>
                    </p>
                </div>
                <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-serif">🎭 Narrativa de Cosiaca</h3>
                    <p className="text-cosiaca-brown-light/80">
                        Cada video está <em>narrado por la voz de Cosiaca</em>, combinando <strong>rigor histórico</strong> 
                        con el <em>humor y la picardía paisa</em>. La IA nos permite recrear su personalidad única 
                        para hacer la historia <strong>accesible y entretenida</strong> para todas las edades.
                    </p>
                </div>
            </div>

            {/* Próximos Videos */}
            <div className="bg-gradient-to-r from-cosiaca-red/10 to-cosiaca-brown/10 p-8 rounded-xl border border-cosiaca-beige/50">
                <h3 className="text-2xl font-bold text-cosiaca-brown mb-4 font-serif text-center">
                    🎬 Próximos Videos en Producción
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white/50 p-4 rounded-lg text-center">
                        <h4 className="font-bold text-cosiaca-brown mb-2">La Fundación de Medellín</h4>
                        <p className="text-sm text-cosiaca-brown/70">Recreación IA del año 1675</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-lg text-center">
                        <h4 className="font-bold text-cosiaca-brown mb-2">El Auge Cafetero</h4>
                        <p className="text-sm text-cosiaca-brown/70">Arrieros y comerciantes del siglo XIX</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-lg text-center">
                        <h4 className="font-bold text-cosiaca-brown mb-2">Medellín Innovadora</h4>
                        <p className="text-sm text-cosiaca-brown/70">La transformación del siglo XXI</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Videos;