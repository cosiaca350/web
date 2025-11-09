import React, { useState } from 'react';

const Videos = () => {
    const [modalVideo, setModalVideo] = useState(null);

    // Playlist completa de YouTube: Cosiaca 350
    const playlistId = "PLLldviceNkKeURfhsKQ_uqFqg-Kyx-tjA";

    // Todos los videos de la playlist de YouTube
    const videoList = [
        {
            id: 1,
            title: "Gildardo Montoya: El Trovador del Valle (1939-1976)",
            description: "Conoce la fascinante vida de Gildardo Montoya Ortiz, nacido en Palermo, Támesis, quien pasó de recolector de café en el Suroeste antioqueño a convertirse en una leyenda de la música parrandera paisa. Cosiaca nos cuenta con humor cómo este genio musical, que aprendió acordeón tras ganarlo en una rifa entre carniceros, creó clásicos inmortales como 'El Arruinao', 'El Trovador del Valle', 'El Aguardientoski' y la célebre 'Plegaria Vallenata'. Descubre sus historias de parranda, sus composiciones para Los Graduados y Nelson Henríquez, y su legado como director artístico de Codiscos. Un homenaje al único compositor paisa incluido en la lista de los 100 vallenatos más importantes de la historia.",
            embedId: "UPIzJ_I4Em8",
            category: "Música Parrandera Paisa",
            duration: "Video generado con IA",
            thumbnail: `https://img.youtube.com/vi/UPIzJ_I4Em8/maxresdefault.jpg`,
            highlights: [
                "🎵 Compositor de música parrandera paisa",
                "🎶 'El Arruinao', 'Plegaria Vallenata', 'El Trovador del Valle'",
                "🎸 Intérprete de tiple, guitarra y acordeón",
                "🎭 De recolector de café a leyenda musical",
                "⭐ Único paisa en top 100 vallenatos de la historia",
                "🎨 Recreación histórica con IA"
            ]
        },
        {
            id: 2,
            title: "Carlos Coriolano Amador: El 'Burro de Oro' (1835-1919)",
            description: "Viaja al Medellín del siglo XIX y descubre la vida del excentrición empresario Carlos Coriolano Amador Fernández, apodado 'El Burro de Oro'. Cosiaca nos narra con humor cómo este visionario abogado y empresario, cuyo nombre honraba al militar romano Cayo Marcio Coriolano, transformó Antioquia con su espíritu innovador. Desde su matrimonio con Lorenza Uribe Lema (heredera de la mina El Zancudo en Tiritibi) hasta la llegada del primer automóvil a Colombia en 1899 –un De Dion-Bouton traído desde Francia–, conoce las anécdotas de quien construyó los palacios más lujosos de Medellín y rompió el estereotipo del empresario paisa austero. Un personaje tan peculiar como su nombre, que dejó huella imborrable en la historia empresarial colombiana.",
            embedId: "k077YMXVcsg",
            category: "Empresarios Visionarios",
            duration: "Video generado con IA",
            thumbnail: `https://img.youtube.com/vi/k077YMXVcsg/maxresdefault.jpg`,
            highlights: [
                "🚗 Trajo el primer automóvil a Colombia (1899)",
                "⛏️ Dueño de la mina El Zancudo, la más productiva del país",
                "🏗️ Construyó los palacios más lujosos de Medellín",
                "💼 Empresario visionario y excentrición del siglo XIX",
                "🎭 Apodado 'El Burro de Oro'",
                "🎨 Recreación histórica con IA"
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
                    Utilizamos <strong>inteligencia artificial de última generación</strong> para dar vida a <em>personajes históricos,
                    recrear momentos memorables</em> y crear experiencias visuales que transportan al espectador a través de la rica
                    <strong> historia cultural de Medellín y Antioquia</strong>. Desde trovadores hasta compositores, cada video es un homenaje
                    a quienes forjaron nuestra identidad paisa.
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
                        {/* Video embebido directo */}
                        <div className="relative pt-[56.25%] bg-black overflow-hidden">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${video.embedId}?rel=0&modestbranding=1`}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

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
                                <button
                                    onClick={() => setModalVideo(video)}
                                    className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold"
                                >
                                    🎬 Ver en Pantalla Completa
                                </button>
                                <a
                                    href={`https://www.youtube.com/playlist?list=${playlistId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 text-center bg-cosiaca-brown hover:bg-cosiaca-brown-dark text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold"
                                >
                                    📺 Ver Playlist Completa
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
                        <strong>• Recreación de personajes históricos</strong><br/>
                        <strong>• Animación de escenas del pasado</strong><br/>
                        <strong>• Síntesis de paisajes antioqueños</strong><br/>
                        <strong>• Narrativa con voz de Cosiaca</strong><br/>
                        <strong>• Efectos visuales generativos</strong>
                    </p>
                </div>
                <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                    <h3 className="text-xl font-bold text-cosiaca-brown mb-3 font-anton">🎭 Narrativa de Cosiaca</h3>
                    <p className="text-cosiaca-brown-light/80">
                        Cada video está <em>narrado por la voz de Cosiaca</em>, quien con su característico <strong>humor pícaro y paisa</strong>
                        nos guía por la vida de estos personajes ilustres. La IA recrea momentos históricos, <em>paisajes del pasado</em>
                        y el ambiente cultural que rodeó a trovadores, compositores y poetas que definieron nuestra identidad antioqueña.
                    </p>
                </div>
            </div>

            {/* Modal para ver video en pantalla completa */}
            {modalVideo && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setModalVideo(null)}
                >
                    <div
                        className="relative w-full max-w-6xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botón cerrar */}
                        <button
                            onClick={() => setModalVideo(null)}
                            className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors duration-200 text-4xl font-bold z-10"
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>

                        {/* Video en modal */}
                        <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${modalVideo.embedId}?autoplay=1&rel=0&modestbranding=1`}
                                title={modalVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Info del video */}
                        <div className="mt-4 text-white text-center">
                            <h3 className="text-2xl font-bold mb-2">{modalVideo.title}</h3>
                            <p className="text-white/80">{modalVideo.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Videos;
