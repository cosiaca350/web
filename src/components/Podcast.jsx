import React, { useState } from 'react';
import { PlayIcon, PodcastIcon } from '../icons/Icons';

const Podcast = () => {
    const [currentAudio, setCurrentAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const podcastEpisodes = [
        {
            id: 1,
            title: "El Encuentro en la Trocha",
            description: "Cosiaca nos cuenta sobre los antiguos caminos de herradura que conectaban a Medellín con el mundo exterior.",
            duration: "8:45",
            audioFile: "/AUDIOS_historias/El encuentro en la trocha.mp3",
            image: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 2,
            title: "La Canción del Valle de Aburrá",
            description: "Una melodiosa narración sobre los orígenes musicales y culturales del valle que acogió a Medellín.",
            duration: "12:30",
            audioFile: "/AUDIOS_historias/La canción del valle de aburrá.mp3",
            image: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 3,
            title: "Sobre la Medellín de los Cafetales",
            description: "El auge del café y cómo transformó la economía y la sociedad paisa, contado con el humor característico de Cosiaca.",
            duration: "15:20",
            audioFile: "/AUDIOS_historias/Sobre la Medellín de los cafetales.mp3",
            image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 4,
            title: "Saludo de Cosiaca",
            description: "El mítico personaje nos da la bienvenida a este viaje por la historia de Medellín con su característico humor paisa.",
            duration: "3:15",
            audioFile: "/AUDIOS_historias/SALUDO_cosiaca.mp3",
            image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 5,
            title: "De la Violencia a la Esperanza",
            description: "Un episodio emotivo sobre cómo Medellín superó sus momentos más difíciles y se transformó en ciudad de innovación.",
            duration: "18:45",
            audioFile: "/AUDIOS_historias/ De la violencia a la esperanza.mp3",
            image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 6,
            title: "La Verraquera Arriera",
            description: "Historias de los arrieros antioqueños y su papel fundamental en el desarrollo económico de la región.",
            duration: "14:10",
            audioFile: "/AUDIOS_historias/La verraquera arriera.mp3",
            image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 7,
            title: "Sobre la Medellín de Hoy",
            description: "Reflexiones de Cosiaca sobre la Medellín moderna, sus logros y desafíos en el siglo XXI.",
            duration: "16:30",
            audioFile: "/AUDIOS_historias/Sobre la Medellín de hoy.mp3",
            image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
    ];

    const handlePlayPause = (episode) => {
        if (currentAudio && currentAudio.id === episode.id) {
            if (isPlaying) {
                currentAudio.audio.pause();
                setIsPlaying(false);
            } else {
                currentAudio.audio.play();
                setIsPlaying(true);
            }
        } else {
            if (currentAudio) {
                currentAudio.audio.pause();
            }
            
            const audio = new Audio(episode.audioFile);
            audio.addEventListener('ended', () => {
                setIsPlaying(false);
                setCurrentAudio(null);
            });
            
            setCurrentAudio({ ...episode, audio });
            audio.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto text-cosiaca-brown space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-cafe-oscuro">
                    🎙️ Podcast Histórico
                </h1>
                <p className="text-xl mt-2 text-cosiaca-brown/70">
                    Escucha las historias de Medellín narradas por el mismísimo Cosiaca
                </p>
            </header>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige text-center">
                <PodcastIcon className="w-16 h-16 mx-auto text-cosiaca-red mb-4" />
                <h2 className="text-2xl font-serif text-cafe-oscuro mb-4">
                    "Historias Contadas con Humor Paisa"
                </h2>
                <p className="text-lg text-cosiaca-brown/80">
                    Sumérgete en 350 años de historia medellinense a través de la voz y el humor 
                    característico de José García "Cosiaca", el primer comediante popular de Antioquia. 
                    Cada episodio es un viaje en el tiempo lleno de anécdotas, picardía y sabiduría paisa.
                </p>
            </div>

            <div className="grid gap-6">
                {podcastEpisodes.map((episode) => (
                    <div 
                        key={episode.id} 
                        className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                            <img 
                                src={episode.image} 
                                alt={episode.title}
                                className="w-full md:w-24 h-48 md:h-24 object-cover rounded-lg shadow-md"
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-cafe-oscuro mb-2">
                                    {episode.title}
                                </h3>
                                <p className="text-cosiaca-brown/80 mb-3">
                                    {episode.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-cosiaca-brown/60">
                                        Duración: {episode.duration}
                                    </span>
                                    <button
                                        onClick={() => handlePlayPause(episode)}
                                        className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                                            currentAudio && currentAudio.id === episode.id && isPlaying
                                                ? 'bg-cosiaca-brown text-white'
                                                : 'bg-cosiaca-red text-white hover:bg-cosiaca-red-dark'
                                        }`}
                                    >
                                        <PlayIcon className="w-4 h-4 mr-2" />
                                        {currentAudio && currentAudio.id === episode.id && isPlaying ? 'Pausar' : 'Reproducir'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige text-center">
                <h3 className="text-2xl font-serif text-cafe-oscuro mb-4">
                    💡 Sobre el Podcast
                </h3>
                <p className="text-cosiaca-brown/80">
                    Este podcast forma parte del proyecto transmedia "Cosiaca 350", una iniciativa 
                    que celebra los 350 años de Medellín a través de la figura histórica de José García "Cosiaca", 
                    reconocido como el primer comediante popular de Antioquia. Cada episodio combina rigor histórico 
                    con el humor y la picardía característica de la cultura paisa.
                </p>
            </div>
        </div>
    );
};

export default Podcast;