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

    const podcastEpisodes = [
        {
            id: 1,
            title: "Saludo de Cosiaca",
            description: "El mítico personaje nos da la bienvenida a este viaje por la historia de Medellín con su característico humor paisa.",
            duration: "3:15",
            audioFile: "/AUDIOS_historias/SALUDO_cosiaca.mp3",
            image: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 2,
            title: "El Encuentro en la Trocha",
            description: "Cosiaca nos cuenta sobre los antiguos caminos de herradura que conectaban a Medellín con el mundo exterior.",
            duration: "8:45",
            audioFile: "/AUDIOS_historias/El_encuentro_en_la_trocha.mp3",
            image: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 3,
            title: "La Canción del Valle de Aburrá",
            description: "Una melodiosa narración sobre los orígenes musicales y culturales del valle que acogió a Medellín.",
            duration: "12:30",
            audioFile: "/AUDIOS_historias/La_cancion_del_valle_de_aburra.mp3",
            image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 4,
            title: "Sobre la Medellín de los Cafetales",
            description: "El auge del café y cómo transformó la economía y la sociedad paisa, contado con el humor característico de Cosiaca.",
            duration: "15:20",
            audioFile: "/AUDIOS_historias/Sobre_la_Medellin_de_los_cafetales.mp3",
            image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 5,
            title: "De la Violencia a la Esperanza",
            description: "Un episodio emotivo sobre cómo Medellín superó sus momentos más difíciles y se transformó en ciudad de innovación.",
            duration: "18:45",
            audioFile: "/AUDIOS_historias/De_la_violencia_a_la_esperanza.mp3",
            image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 6,
            title: "La Verraquera Arriera",
            description: "Historias de los arrieros antioqueños y su papel fundamental en el desarrollo económico de la región.",
            duration: "14:10",
            audioFile: "/AUDIOS_historias/La_verraquera_arriera.mp3",
            image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 7,
            title: "Sobre la Medellín de Hoy",
            description: "Reflexiones de Cosiaca sobre la Medellín moderna, sus logros y desafíos en el siglo XXI.",
            duration: "16:30",
            audioFile: "/AUDIOS_historias/Sobre_la_Medellin_de_hoy.mp3",
            image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 8,
            title: "Cosiaca el Culebreo",
            description: "Una historia divertida sobre las travesuras y picardías del personaje más querido de Antioquia.",
            duration: "12:45",
            audioFile: "/AUDIOS_historias/Cosiaca_el_culebreo.mp3",
            image: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
    ];

    // Formatear tiempo en MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = (episode) => {
        setError(null);
        
        if (currentAudio && currentAudio.id === episode.id) {
            // Si es el mismo audio, pausar/reanudar
            if (isPlaying) {
                currentAudio.audio.pause();
                setIsPlaying(false);
            } else {
                currentAudio.audio.play().catch(err => {
                    console.error('Error playing audio:', err);
                    setError(`Error reproduciendo: ${episode.title}. Verifica que el archivo existe.`);
                });
                setIsPlaying(true);
            }
        } else {
            // Nuevo audio
            setLoadingAudio(episode.id);
            
            if (currentAudio) {
                currentAudio.audio.pause();
                setIsPlaying(false);
                setProgress(0);
                setCurrentTime(0);
                setDuration(0);
            }
            
            const audio = new Audio(episode.audioFile);
            
            // Configurar audio para mejor compatibilidad
            audio.preload = 'metadata';
            audio.crossOrigin = 'anonymous';
            
            // Event listeners
            audio.addEventListener('ended', () => {
                setIsPlaying(false);
                setCurrentAudio(null);
                setProgress(0);
                setCurrentTime(0);
            });
            
            audio.addEventListener('loadstart', () => {
                setLoadingAudio(episode.id);
            });
            
            audio.addEventListener('loadedmetadata', () => {
                setDuration(audio.duration);
                setLoadingAudio(null);
            });
            
            audio.addEventListener('canplay', () => {
                setLoadingAudio(null);
            });
            
            audio.addEventListener('timeupdate', () => {
                if (audio.duration) {
                    const progressPercent = (audio.currentTime / audio.duration) * 100;
                    setProgress(progressPercent);
                    setCurrentTime(audio.currentTime);
                }
            });
            
            audio.addEventListener('error', (e) => {
                console.error('Audio error:', e, 'File:', episode.audioFile);
                setError(`No se pudo cargar: ${episode.title}. Archivo: ${episode.audioFile}`);
                setLoadingAudio(null);
                setIsPlaying(false);
                setCurrentAudio(null);
            });
            
            setCurrentAudio({ ...episode, audio });
            
            // Intentar reproducir
            audio.play()
                .then(() => {
                    setIsPlaying(true);
                    setLoadingAudio(null);
                })
                .catch(err => {
                    console.error('Error playing audio:', err);
                    setError(`Error reproduciendo: ${episode.title}. Verifica que el archivo existe en la carpeta AUDIOS_historias.`);
                    setLoadingAudio(null);
                    setIsPlaying(false);
                    setCurrentAudio(null);
                });
        }
    };

    // Manejar click en barra de progreso
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
        <div className="animate-fade-in max-w-4xl mx-auto text-cosiaca-brown space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-black font-anton text-cosiaca-brown">
                    🎙️ Podcast Histórico
                </h1>
                <p className="text-xl mt-2 text-cosiaca-brown/70 lead font-medium">
                    <em>Escucha las historias de Medellín narradas por el mismísimo Cosiaca</em>
                </p>
            </header>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige text-center">
                <PodcastIcon className="w-16 h-16 mx-auto text-cosiaca-red mb-4" />
                <h2 className="text-2xl font-bold font-anton text-cosiaca-brown mb-4">
                    "Historias Contadas con Humor Paisa"
                </h2>
                <p className="text-lg text-cosiaca-brown/80 lead">
                    Sumérgete en <strong>350 años de historia medellinense</strong> a través de la voz y el humor 
                    característico de <em>José García "Cosiaca"</em>, el <strong>primer comediante popular de Antioquia</strong>. 
                    Cada episodio es un <em>viaje en el tiempo</em> lleno de <strong>anécdotas, picardía y sabiduría paisa</strong>.
                </p>
            </div>

            {/* Reproductor Global */}
            {currentAudio && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-cosiaca-beige sticky top-20 z-40">
                    <div className="flex items-center space-x-4">
                        <img 
                            src={currentAudio.image} 
                            alt={currentAudio.title}
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="font-bold text-cosiaca-brown">{currentAudio.title}</h3>
                            <div className="flex items-center space-x-2 mt-2">
                                <span className="text-sm text-cosiaca-brown/60">
                                    {formatTime(currentTime)}
                                </span>
                                <div 
                                    className="flex-1 bg-cosiaca-beige rounded-full h-2 cursor-pointer"
                                    onClick={handleProgressClick}
                                >
                                    <div 
                                        className="bg-cosiaca-red h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <span className="text-sm text-cosiaca-brown/60">
                                    {formatTime(duration)}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => handlePlayPause(currentAudio)}
                            className="bg-cosiaca-red text-white p-3 rounded-full hover:bg-cosiaca-red-dark transition-colors"
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
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
                    <p className="font-bold">⚠️ Error de Reproducción</p>
                    <p>{error}</p>
                    <p className="text-sm mt-2">
                        <strong>Soluciones:</strong>
                        <br />• Verifica que los archivos estén en la carpeta AUDIOS_historias
                        <br />• Intenta refrescar la página
                        <br />• Algunos navegadores requieren interacción del usuario antes de reproducir audio
                    </p>
                </div>
            )}

            <div className="grid gap-6">
                {podcastEpisodes.map((episode) => (
                    <div 
                        key={episode.id} 
                        className={`bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300 ${
                            currentAudio && currentAudio.id === episode.id ? 'ring-2 ring-cosiaca-red' : ''
                        }`}
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                            <img 
                                src={episode.image} 
                                alt={episode.title}
                                className="w-full md:w-24 h-48 md:h-24 object-cover rounded-lg shadow-md"
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-cosiaca-brown mb-2 font-anton">
                                    {episode.title}
                                </h3>
                                <p className="text-cosiaca-brown/80 mb-3 leading-relaxed">
                                    {episode.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-cosiaca-brown/60 font-medium">
                                        <strong>Duración:</strong> {episode.duration}
                                    </span>
                                    <span className="text-xs text-cosiaca-brown/50">
                                        {episode.audioFile}
                                    </span>
                                    <div>
                                        <button
                                            onClick={() => handlePlayPause(episode)}
                                            disabled={loadingAudio === episode.id}
                                            className={`flex items-center px-4 py-2 rounded-full font-bold transition-all duration-300 ${
                                                currentAudio && currentAudio.id === episode.id && isPlaying
                                                    ? 'bg-cosiaca-brown text-white'
                                                    : loadingAudio === episode.id
                                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                                    : 'bg-cosiaca-red text-white hover:bg-cosiaca-red-dark'
                                            } ${loadingAudio === episode.id ? 'opacity-50' : ''}`}
                                        >
                                            {loadingAudio === episode.id ? (
                                                <>
                                                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <strong>Cargando...</strong>
                                                </>
                                            ) : currentAudio && currentAudio.id === episode.id && isPlaying ? (
                                                <>
                                                    <PauseIcon className="w-4 h-4 mr-2" />
                                                    <strong>Pausar</strong>
                                                </>
                                            ) : (
                                                <>
                                                    <PlayIcon className="w-4 h-4 mr-2" />
                                                    <strong>Reproducir</strong>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Información técnica */}
            <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                <h3 className="text-2xl font-bold font-anton text-cosiaca-brown mb-4">
                    💡 Información del Podcast
                </h3>
                <p className="text-cosiaca-brown/80 lead mb-4">
                    Este podcast forma parte del proyecto transmedia <strong>"COSIACA <strong>350</strong>"</strong>, una iniciativa
                    que celebra los <em><strong>350</strong> años de Medellín</em> a través de la figura histórica de <strong>José García "Cosiaca"</strong>, 
                    reconocido como el <em>primer comediante popular de Antioquia</em>. Cada episodio combina <strong>rigor histórico</strong> 
                    con el <em>humor y la picardía característica de la cultura paisa</em>.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>🎧 Funciones:</strong> Reproductor con barra de progreso, control de tiempo, 
                            y navegación entre episodios.
                        </p>
                    </div>
                    <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
                        <p className="text-sm text-green-800">
                            <strong>📁 Archivos:</strong> Los audios están en la carpeta AUDIOS_historias. 
                            Verifica que todos los archivos estén presentes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Podcast;