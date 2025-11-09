import React from 'react';

const Videos = () => {
    // Playlist completa de YouTube: Cosiaca 350
    const playlistId = "PLLldviceNkKeURfhsKQ_uqFqg-Kyx-tjA";

    // Todos los videos de la playlist de YouTube
    const videoList = [
        {
            id: 1,
            title: "Los Orígenes: De Aná a Medellín (1541-1675)",
            description: "Descubre cómo el Valle de Aburrá pasó de ser territorio indígena Aburraé a convertirse en la Villa de Nuestra Señora de la Candelaria. Cosiaca nos cuenta con humor y picardía sobre las 24 familias fundadoras, los primeros colonos españoles, y cómo era la vida en esta pequeña villa rodeada de montañas. Con recreaciones visuales generadas por IA de la época colonial.",
            embedId: "UPIzJ_I4Em8",
            category: "Época Colonial (1541-1810)",
            duration: "Video generado con IA",
            thumbnail: `https://img.youtube.com/vi/UPIzJ_I4Em8/maxresdefault.jpg`,
            highlights: [
                "🏛️ Pueblos indígenas originarios",
                "⛪ Fundación oficial en 1675",
                "👨‍👩‍👧‍👦 Las 24 familias fundadoras",
                "🎨 Recreaciones visuales con IA"
            ]
        },
        {
            id: 2,
            title: "Independencia y Café: El Despertar Paisa (1810-1900)",
            description: "Un recorrido por la época más transformadora de Medellín. Desde la declaración de independencia con Juan del Corral, pasando por la cultura arriera que conectó montañas, hasta el boom cafetero que nos puso en el mapa mundial. Cosiaca narra con su característico humor cómo los paisas construyeron caminos imposibles, fundaron pueblos y se convirtieron en los mejores comerciantes de café. Incluye animaciones de personajes históricos y fotografías colorizadas con IA.",
            embedId: "k077YMXVcsg",
            category: "Siglo XIX (1810-1900)",
            duration: "Video generado con IA",
            thumbnail: `https://img.youtube.com/vi/k077YMXVcsg/maxresdefault.jpg`,
            highlights: [
                "⚔️ Independencia de Antioquia (1813)",
                "🐴 La cultura arriera paisa",
                "☕ El boom cafetero",
                "🛤️ Colonización antioqueña",
                "🎨 Personajes históricos animados con IA"
            ]
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
                    <strong> 350 años de historia medellinense</strong>.
                </p>
                <div className="mt-6">
                    <a
                        href={`https://www.youtube.com/playlist?list=${playlistId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-cosiaca-red text-white px-8 py-4 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold text-lg"
                    >
                        📺 Ver Playlist Completa en YouTube
                    </a>
                </div>
            </div>

            {/* Videos Destacados */}
            <div className="space-y-8">
                <h2 className="text-3xl font-bold font-anton text-cosiaca-brown text-center">
                    🎬 Videos Destacados
                </h2>

                {videoList.map((video) => (
                    <div key={video.id} className="bg-white rounded-xl shadow-lg border-2 border-cosiaca-beige overflow-hidden hover:border-cosiaca-red transition-all duration-300">
                        {/* Thumbnail con enlace */}
                        <a
                            href={`https://www.youtube.com/watch?v=${video.embedId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative group"
                        >
                            <div className="relative pt-[56.25%] bg-black overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = `https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`;
                                    }}
                                />
                                {/* Overlay con play button */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-all duration-300">
                                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                        <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </a>

                        {/* Contenido */}
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                <span className="bg-cosiaca-red text-white px-4 py-1.5 rounded-full text-sm font-bold">
                                    {video.category}
                                </span>
                                <span className="text-sm text-cosiaca-brown/60 font-medium">🎥 {video.duration}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-cosiaca-brown mb-3 font-anton leading-tight">
                                {video.title}
                            </h3>
                            <p className="text-cosiaca-brown/80 leading-relaxed mb-4">
                                {video.description}
                            </p>

                            {/* Highlights */}
                            {video.highlights && (
                                <div className="bg-cosiaca-beige/30 rounded-lg p-4 border border-cosiaca-beige mb-4">
                                    <h4 className="font-bold text-cosiaca-brown mb-2 text-sm">✨ Lo que descubrirás:</h4>
                                    <ul className="space-y-1">
                                        {video.highlights.map((highlight, index) => (
                                            <li key={index} className="text-sm text-cosiaca-brown/80">
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Botones de acción */}
                            <div className="flex gap-3">
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.embedId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold"
                                >
                                    ▶ Ver en YouTube
                                </a>
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.embedId}&list=${playlistId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 text-center bg-cosiaca-brown hover:bg-cosiaca-brown-dark text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold"
                                >
                                    📺 Ver en Playlist
                                </a>
                            </div>
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
        </div>
    );
};

export default Videos;
