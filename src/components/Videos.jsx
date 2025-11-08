import React from 'react';

const Videos = () => {
    // Playlist completa de YouTube: Cosiaca 350
    const playlistId = "PLLldviceNkKeURfhsKQ_uqFqg-Kyx-tjA";

    // Todos los videos de la playlist de YouTube
    const videoList = [
        {
            id: 1,
            title: "COSIACA 350 - Video 1",
            description: "Parte 1 de la serie histórica sobre los 350 años de Medellín. Un viaje inmersivo contado por Cosiaca con inteligencia artificial.",
            embedId: "UPIzJ_I4Em8",
            category: "Historia de Medellín"
        },
        {
            id: 2,
            title: "COSIACA 350 - Video 2",
            description: "Parte 2 de la serie histórica. Continuamos explorando las historias, personajes y anécdotas que marcaron la historia de nuestra ciudad.",
            embedId: "k077YMXVcsg",
            category: "Historia de Medellín"
        }
    ];

    return (
        <div className="animate-fade-in max-w-4xl mx-auto text-cosiaca-brown space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-anton text-cosiaca-brown">
                    🎥 Videos con Inteligencia Artificial
                </h1>
                <p className="text-xl mt-2 text-cosiaca-brown-light/70">
                    <em>La historia de Medellín cobra vida con tecnología de vanguardia</em>
                </p>
            </header>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige text-center">
                <h2 className="text-2xl font-bold font-anton text-cosiaca-brown mb-4">
                    "Cuando la Historia se Encuentra con la Tecnología"
                </h2>
                <p className="text-lg text-cosiaca-brown/80 lead">
                    Utilizamos <strong>inteligencia artificial de última generación</strong> para dar vida a <em>fotografías históricas,
                    recrear personajes del pasado</em> y crear experiencias visuales que transportan al espectador a través de
                    <strong>350 años de historia medellinense</strong>.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href={`https://www.youtube.com/playlist?list=${playlistId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-cosiaca-red text-white px-6 py-3 rounded-full hover:bg-cosiaca-red-dark transition-all duration-300 transform hover:scale-105 shadow-lg font-bold"
                    >
                        📺 Ver Playlist Completa en YouTube
                    </a>
                    <a
                        href="https://www.youtube.com/watch?v=GP0kzjU5XxQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-cosiaca-brown text-white px-6 py-3 rounded-full hover:bg-cosiaca-brown-dark transition-all duration-300 transform hover:scale-105 shadow-lg font-bold"
                    >
                        🎥 Ver Video Principal
                    </a>
                </div>
            </div>

            {/* Playlist Embed de YouTube */}
            <div className="bg-white rounded-xl shadow-lg border border-cosiaca-beige overflow-hidden">
                <div className="bg-gradient-to-r from-cosiaca-red to-cosiaca-brown p-4 text-white">
                    <h3 className="text-xl font-bold font-anton text-center">
                        📺 Playlist Completa: COSIACA 350 - Videos IA
                    </h3>
                    <p className="text-center text-sm mt-1 opacity-90">
                        Todos los videos del proyecto en una sola lista
                    </p>
                </div>
                <div className="relative pt-[56.25%] bg-black">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0`}
                        title="COSIACA 350 - Playlist Completa"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
                <div className="p-6 bg-cosiaca-beige/20">
                    <p className="text-center text-cosiaca-brown">
                        <strong>💡 Tip:</strong> Usa los controles de la playlist para navegar entre todos los videos.
                        Se actualizan automáticamente cuando agregamos contenido nuevo.
                    </p>
                </div>
            </div>

            {/* Videos Destacados Disponibles */}
            <div className="space-y-8">
                <h2 className="text-3xl font-bold font-anton text-cosiaca-brown text-center">
                    🎬 Videos Destacados
                </h2>
                {videoList
                    .filter(video => !video.coming && video.embedId)
                    .map((video) => (
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
                                <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-anton">
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
                    <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-anton">🤖 Tecnologías IA Utilizadas</h3>
                    <p className="text-cosiaca-brown-light/80">
                        <strong>• Animación de fotografías históricas</strong><br/>
                        <strong>• Recreación de personajes del pasado</strong><br/>
                        <strong>• Efectos visuales generativos</strong><br/>
                        <strong>• Síntesis de voz histórica</strong><br/>
                        <strong>• Colorización automática</strong>
                    </p>
                </div>
                <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-anton">🎭 Narrativa de Cosiaca</h3>
                    <p className="text-cosiaca-brown-light/80">
                        Cada video está <em>narrado por la voz de Cosiaca</em>, combinando <strong>rigor histórico</strong> 
                        con el <em>humor y la picardía paisa</em>. La IA nos permite recrear su personalidad única 
                        para hacer la historia <strong>accesible y entretenida</strong> para todas las edades.
                    </p>
                </div>
            </div>

            {/* Próximos Videos */}
            {videoList.filter(video => video.coming).length > 0 && (
                <div className="bg-gradient-to-r from-cosiaca-red/10 to-cosiaca-brown/10 p-8 rounded-xl border border-cosiaca-beige/50">
                    <h3 className="text-2xl font-bold text-cosiaca-brown mb-4 font-anton text-center">
                        🎬 Próximos Videos en Producción
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {videoList
                            .filter(video => video.coming)
                            .map((video) => (
                                <div key={video.id} className="bg-white/70 p-5 rounded-lg border-2 border-cosiaca-beige hover:border-cosiaca-red transition-all duration-300">
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="bg-cosiaca-brown/20 text-cosiaca-brown px-2 py-1 rounded text-xs font-bold">
                                            {video.category}
                                        </span>
                                        <span className="text-cosiaca-red text-xs font-bold">Próximamente</span>
                                    </div>
                                    <h4 className="font-bold text-cosiaca-brown mb-2 text-base">{video.title}</h4>
                                    <p className="text-sm text-cosiaca-brown/70 leading-relaxed">{video.description}</p>
                                </div>
                            ))}
                    </div>
                    <p className="text-center text-cosiaca-brown/70 mt-6 italic">
                        💡 <strong>Suscríbete a nuestro canal</strong> para recibir notificaciones cuando publiquemos nuevos videos
                    </p>
                </div>
            )}
        </div>
    );
};

export default Videos;