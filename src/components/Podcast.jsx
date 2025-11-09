import React, { useState } from 'react';
import { PlayIcon, PodcastIcon } from '../icons/Icons';

const PauseIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <rect x="6" y="4" width="4" height="16"/>
        <rect x="14" y="4" width="4" height="16"/>
    </svg>
);

const Podcast = () => {
    const [currentAudio, setCurrentAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loadingAudio, setLoadingAudio] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [episodeDurations, setEpisodeDurations] = useState({});

    const podcastEpisodes = [
        {
            id: 1,
            title: "Saludo de Cosiaca",
            description: "El mítico personaje nos da la bienvenida a este viaje por la historia de Medellín con su característico humor paisa.",
            duration: "2:30",
            audioFile: "/PODCAST/_saludo_cosiaca.mp3",
            category: "Bienvenida",
            image: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 2,
            title: "Saludo Cosiaca",
            description: "Un saludo especial de Cosiaca presentando la historia y el proyecto de los 350 años de Medellín.",
            duration: "2:15",
            audioFile: "/PODCAST/saludo_cosiaca.mp3",
            category: "Bienvenida",
            image: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 3,
            title: "Cosiaca el Culebreo",
            description: "Una historia divertida sobre las travesuras y picardías del personaje más querido de Antioquia.",
            duration: "8:45",
            audioFile: "/PODCAST/cosiaca_el_culebreo.mp3",
            category: "Humor",
            image: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 4,
            title: "El Encuentro en la Trocha",
            description: "Cosiaca nos cuenta sobre los antiguos caminos de herradura que conectaban a Medellín con el mundo exterior.",
            duration: "7:20",
            audioFile: "/PODCAST/el_encuentro_en_la_trocha.mp3",
            category: "Historia Colonial",
            image: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 5,
            title: "Fernando García - Entrevista Especial",
            description: "Conversación profunda con Fernando García sobre la historia y legado de Cosiaca en la cultura antioqueña.",
            duration: "18:30",
            audioFile: "/PODCAST/fernando 2 master.mp3",
            category: "Entrevistas",
            image: "https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 6,
            title: "Francisco Mejía - Testimonios Históricos",
            description: "Francisco Mejía comparte testimonios y anécdotas sobre la época dorada de la comedia paisa.",
            duration: "16:45",
            audioFile: "/PODCAST/fransisco master.mp3",
            category: "Entrevistas",
            image: "https://images.pexels.com/photos/8111849/pexels-photo-8111849.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 7,
            title: "La Canción del Valle de Aburrá",
            description: "Una melodiosa narración sobre los orígenes musicales y culturales del valle que acogió a Medellín.",
            duration: "12:30",
            audioFile: "/PODCAST/la_cancion_del_valle_de aburra.mp3",
            category: "Cultura",
            image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 8,
            title: "La Verraquera Arriera",
            description: "Historias de los arrieros antioqueños y su papel fundamental en el desarrollo económico de la región.",
            duration: "14:10",
            audioFile: "/PODCAST/la_verraquera_arriera.mp3",
            category: "Tradiciones",
            image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 9,
            title: "Sobre la Medellín de Hoy",
            description: "Reflexiones de Cosiaca sobre la Medellín moderna, sus logros y desafíos en el siglo XXI.",
            duration: "16:30",
            audioFile: "/PODCAST/sobre_la_medellin_de_hoy.mp3",
            category: "Actualidad",
            image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 10,
            title: "Sobre la Medellín de los Cafetales",
            description: "El auge del café y cómo transformó la economía y la sociedad paisa, contado con el humor característico de Cosiaca.",
            duration: "15:20",
            audioFile: "/PODCAST/sobre_la_medellin_de_los_cafetales.mp3",
            category: "Economía",
            image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 11,
            title: "De la Violencia a la Esperanza",
            description: "Un episodio emotivo sobre cómo Medellín superó sus momentos más difíciles y se transformó en ciudad de innovación.",
            duration: "18:45",
            audioFile: "/PODCAST/sobre_la_violencia_a_la_esperanza.mp3",
            category: "Transformación",
            image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ];

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = (episode) => {
        setError(null);

        if (currentAudio && currentAudio.id === episode.id) {
            if (isPlaying) {
                currentAudio.audio.pause();
                setIsPlaying(false);
            } else {
                currentAudio.audio.play().catch(err => {
                    console.error('Error playing audio:', err);
                    setError(`Error reproduciendo: ${episode.title}`);
                });
                setIsPlaying(true);
            }
        } else {
            setLoadingAudio(episode.id);

            if (currentAudio) {
                currentAudio.audio.pause();
                setIsPlaying(false);
                setProgress(0);
                setCurrentTime(0);
                setDuration(0);
            }

            const audio = new Audio(episode.audioFile);
            audio.preload = 'metadata';

            audio.addEventListener('ended', () => {
                setIsPlaying(false);
                setCurrentAudio(null);
                setProgress(0);
                setCurrentTime(0);
            });

            audio.addEventListener('loadedmetadata', () => {
                setDuration(audio.duration);
                setLoadingAudio(null);
                setEpisodeDurations(prev => ({
                    ...prev,
                    [episode.id]: audio.duration
                }));
            });

            audio.addEventListener('timeupdate', () => {
                if (audio.duration) {
                    const progressPercent = (audio.currentTime / audio.duration) * 100;
                    setProgress(progressPercent);
                    setCurrentTime(audio.currentTime);
                }
            });

            audio.addEventListener('error', (e) => {
                console.error('Audio error:', e);
                setError(`No se pudo cargar: ${episode.title}`);
                setLoadingAudio(null);
                setIsPlaying(false);
                setCurrentAudio(null);
            });

            setCurrentAudio({ ...episode, audio });

            audio.play()
                .then(() => {
                    setIsPlaying(true);
                    setLoadingAudio(null);
                })
                .catch(err => {
                    console.error('Error playing audio:', err);
                    setError(`Error reproduciendo: ${episode.title}`);
                    setLoadingAudio(null);
                    setIsPlaying(false);
                    setCurrentAudio(null);
                });
        }
    };

    const handleProgressClick = (e) => {
        if (currentAudio && currentAudio.audio.duration) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const clickPercent = clickX / width;
            const newTime = clickPercent * currentAudio.audio.duration;
            currentAudio.audio.currentTime = newTime;
        }
    };

    return (
        <div className="animate-fade-in max-w-6xl mx-auto text-cosiaca-brown space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-black font-anton text-cosiaca-brown">
                    🎙️ Podcast Histórico
                </h1>
                <p className="text-xl mt-2 text-cosiaca-brown/70 lead font-medium">
                    <em>Escucha las historias de Medellín narradas por el mismísimo Cosiaca</em>
                </p>
            </header>

            <div className="bg-gradient-to-br from-cosiaca-beige/50 to-cosiaca-brown/10 p-8 rounded-xl shadow-2xl border-2 border-cosiaca-beige text-center">
                <PodcastIcon className="w-16 h-16 mx-auto text-cosiaca-red mb-4" />
                <h2 className="text-2xl font-bold font-anton text-cosiaca-brown mb-4">
                    "Historias Contadas con Humor Paisa"
                </h2>
                <p className="text-lg text-cosiaca-brown/80 max-w-3xl mx-auto">
                    Sumérgete en <strong>350 años de historia medellinense</strong> a través de la voz y el humor
                    característico de <em>José García "Cosiaca"</em>. Cada episodio es un <em>viaje en el tiempo</em> lleno de
                    <strong>anécdotas, picardía y sabiduría paisa</strong>.
                </p>
            </div>

            {/* Reproductor Global Sticky */}
            {currentAudio && (
                <div className="bg-white p-6 rounded-xl shadow-2xl border-2 border-cosiaca-red sticky top-4 z-50">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <img
                                src={currentAudio.image}
                                alt={currentAudio.title}
                                className="w-20 h-20 rounded-xl object-cover shadow-lg"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-cosiaca-red text-white text-xs px-2 py-1 rounded-full font-bold">
                                EN VIVO
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-cosiaca-brown text-lg">{currentAudio.title}</h3>
                            <span className="text-xs text-white bg-cosiaca-brown px-2 py-1 rounded-full">
                                {currentAudio.category}
                            </span>
                            <div className="flex items-center space-x-2 mt-3">
                                <span className="text-sm text-cosiaca-brown/60 font-mono">
                                    {formatTime(currentTime)}
                                </span>
                                <div
                                    className="flex-1 bg-cosiaca-beige rounded-full h-3 cursor-pointer shadow-inner"
                                    onClick={handleProgressClick}
                                >
                                    <div
                                        className="bg-gradient-to-r from-cosiaca-red to-red-600 h-3 rounded-full transition-all duration-300 shadow-md"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <span className="text-sm text-cosiaca-brown/60 font-mono">
                                    {formatTime(duration)}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => handlePlayPause(currentAudio)}
                            className="bg-cosiaca-red text-white p-4 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                            {isPlaying ? (
                                <PauseIcon className="w-6 h-6" />
                            ) : (
                                <PlayIcon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border-2 border-red-400 text-red-800 px-6 py-4 rounded-xl">
                    <p className="font-bold">⚠️ {error}</p>
                    <p className="text-sm mt-2">Intenta refrescar la página o selecciona otro episodio.</p>
                </div>
            )}

            {/* Grid de Episodios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {podcastEpisodes.map((episode) => (
                    <div
                        key={episode.id}
                        className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                            currentAudio && currentAudio.id === episode.id
                                ? 'border-cosiaca-red ring-4 ring-cosiaca-red/20'
                                : 'border-cosiaca-beige hover:border-cosiaca-red'
                        }`}
                    >
                        {/* Imagen del episodio */}
                        <div className="relative h-48 overflow-hidden group">
                            <img
                                src={episode.image}
                                alt={episode.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute top-3 right-3">
                                <span className="bg-cosiaca-red text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                                    {episode.category}
                                </span>
                            </div>
                            {currentAudio && currentAudio.id === episode.id && (
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                                        🎵 Reproduciendo
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Contenido del episodio */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-cosiaca-brown mb-2 font-anton line-clamp-2">
                                {episode.title}
                            </h3>
                            <p className="text-sm text-cosiaca-brown/70 mb-4 line-clamp-3 leading-relaxed">
                                {episode.description}
                            </p>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs text-cosiaca-brown/60 font-medium bg-cosiaca-beige px-3 py-1 rounded-full">
                                    ⏱️ {episodeDurations[episode.id]
                                        ? formatTime(episodeDurations[episode.id])
                                        : episode.duration}
                                </span>
                                <span className="text-xs text-cosiaca-brown/50">
                                    Episodio {episode.id}
                                </span>
                            </div>

                            {/* Botón de reproducción */}
                            <button
                                onClick={() => handlePlayPause(episode)}
                                disabled={loadingAudio === episode.id}
                                className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                                    currentAudio && currentAudio.id === episode.id && isPlaying
                                        ? 'bg-cosiaca-brown text-white shadow-lg'
                                        : loadingAudio === episode.id
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-cosiaca-red text-white hover:bg-red-700 shadow-md'
                                }`}
                            >
                                {loadingAudio === episode.id ? (
                                    <>
                                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Cargando...
                                    </>
                                ) : currentAudio && currentAudio.id === episode.id && isPlaying ? (
                                    <>
                                        <PauseIcon className="w-5 h-5 mr-2" />
                                        Pausar
                                    </>
                                ) : (
                                    <>
                                        <PlayIcon className="w-5 h-5 mr-2" />
                                        Reproducir
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Información del Podcast */}
            <div className="bg-gradient-to-br from-cosiaca-beige/50 to-cosiaca-brown/10 p-8 rounded-xl border-2 border-cosiaca-beige">
                <h3 className="text-2xl font-bold font-anton text-cosiaca-brown mb-4 text-center">
                    💡 Sobre este Podcast
                </h3>
                <p className="text-cosiaca-brown/80 text-center max-w-3xl mx-auto leading-relaxed">
                    Este podcast forma parte del proyecto transmedia <strong>"COSIACA 350"</strong>, celebrando los
                    <em> 350 años de Medellín</em> a través de <strong>José García "Cosiaca"</strong>.
                    Cada episodio combina <strong>rigor histórico</strong> con <em>humor paisa</em>, incluyendo
                    entrevistas exclusivas con expertos y testimonios que enriquecen nuestra comprensión del pasado.
                </p>
            </div>
        </div>
    );
};

export default Podcast;
