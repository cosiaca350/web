import React, { useState } from 'react';
import { historicalCharacters, historicalMoments, culturalTraditions, infrastructureMilestones } from '../data/historicalData';

const HistoriaAmpliada = () => {
    const [activeSection, setActiveSection] = useState('characters');
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const sections = [
        { id: 'characters', name: 'Personajes', icon: '👤' },
        { id: 'moments', name: 'Momentos Clave', icon: '⏳' },
        { id: 'culture', name: 'Cultura', icon: '🎭' },
        { id: 'infrastructure', name: 'Infraestructura', icon: '🏗️' }
    ];

    return (
        <div className="animate-fade-in max-w-7xl mx-auto text-cosiaca-brown space-y-8 px-4">
            <header className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold font-anton text-cosiaca-brown">
                    📜 Historia Ampliada de Medellín
                </h1>
                <p className="text-xl md:text-2xl text-cosiaca-brown/70">
                    Profundiza en los 350 años con documentos, personajes y narrativas
                </p>
            </header>

            {/* Navegación de secciones */}
            <div className="bg-gradient-to-br from-cosiaca-beige/50 to-cosiaca-cream/50 p-6 rounded-2xl shadow-xl border-2 border-cosiaca-brown/20">
                <div className="flex flex-wrap justify-center gap-3">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                                activeSection === section.id
                                    ? 'bg-cosiaca-red text-white shadow-lg scale-105'
                                    : 'bg-white text-cosiaca-brown border border-cosiaca-brown/30 hover:border-cosiaca-red'
                            }`}
                        >
                            <span className="mr-2">{section.icon}</span>
                            {section.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sección de Personajes */}
            {activeSection === 'characters' && (
                <div className="space-y-6 animate-fade-in">
                    <h2 className="text-3xl font-anton text-cosiaca-brown text-center mb-6">
                        👤 Personajes Históricos Clave
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(historicalCharacters).map(([key, character]) => (
                            <div
                                key={key}
                                className="bg-gradient-to-br from-white to-cosiaca-beige/30 p-6 rounded-2xl border-2 border-cosiaca-brown/20 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                                onClick={() => setSelectedCharacter(selectedCharacter === key ? null : key)}
                            >
                                <h3 className="text-xl font-bold text-cosiaca-red mb-2">{character.name}</h3>
                                <p className="text-sm text-cosiaca-brown/60 mb-3">{character.years}</p>
                                <p className="text-cosiaca-brown/80 leading-relaxed mb-4">{character.description}</p>

                                {selectedCharacter === key && (
                                    <div className="space-y-4 animate-fade-in mt-4 pt-4 border-t border-cosiaca-brown/20">
                                        {character.achievements && (
                                            <div>
                                                <h4 className="font-bold text-cosiaca-brown mb-2">Logros:</h4>
                                                <ul className="space-y-1 text-sm">
                                                    {character.achievements.map((achievement, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <span className="text-cosiaca-red">•</span>
                                                            <span className="text-cosiaca-brown/80">{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {character.quotes && (
                                            <div className="bg-cosiaca-cream/50 p-4 rounded-xl border-l-4 border-cosiaca-red">
                                                <h4 className="font-bold text-cosiaca-brown mb-2">Frases célebres:</h4>
                                                {character.quotes.map((quote, idx) => (
                                                    <p key={idx} className="text-cosiaca-brown/80 italic text-sm mb-2">
                                                        "{quote}"
                                                    </p>
                                                ))}
                                            </div>
                                        )}

                                        <div className="bg-cosiaca-beige/40 p-3 rounded-lg">
                                            <p className="font-bold text-cosiaca-brown text-sm mb-1">Legado:</p>
                                            <p className="text-cosiaca-brown/80 text-sm">{character.legacy}</p>
                                        </div>
                                    </div>
                                )}

                                <button className="mt-4 w-full bg-cosiaca-red/10 text-cosiaca-red px-4 py-2 rounded-full hover:bg-cosiaca-red hover:text-white transition-all duration-300 font-medium text-sm">
                                    {selectedCharacter === key ? '✕ Ocultar detalles' : '+ Ver más'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sección de Momentos Históricos */}
            {activeSection === 'moments' && (
                <div className="space-y-6 animate-fade-in">
                    <h2 className="text-3xl font-anton text-cosiaca-brown text-center mb-6">
                        ⏳ Momentos Históricos Clave
                    </h2>

                    {Object.entries(historicalMoments).map(([key, period]) => (
                        <div
                            key={key}
                            className="bg-gradient-to-br from-white to-cosiaca-beige/30 p-8 rounded-2xl border-2 border-cosiaca-brown/20 shadow-xl"
                        >
                            <div className="border-l-4 border-cosiaca-red pl-6">
                                <h3 className="text-2xl font-anton text-cosiaca-brown mb-2">{period.title}</h3>
                                <p className="text-cosiaca-brown/60 mb-4">{period.period}</p>
                                <p className="text-cosiaca-brown/80 leading-relaxed mb-6">{period.description}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {period.events.map((event, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-cosiaca-cream/40 p-5 rounded-xl border border-cosiaca-brown/20"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-3xl font-bold text-cosiaca-red">{event.year}</span>
                                        </div>
                                        <h4 className="font-bold text-cosiaca-brown mb-2">{event.title}</h4>
                                        <p className="text-sm text-cosiaca-brown/80 mb-3">{event.description}</p>
                                        <div className="bg-white/60 px-3 py-2 rounded-lg">
                                            <span className="text-xs font-bold text-cosiaca-red">Importancia: </span>
                                            <span className="text-xs text-cosiaca-brown/80">{event.importance}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Sección de Cultura */}
            {activeSection === 'culture' && (
                <div className="space-y-6 animate-fade-in">
                    <h2 className="text-3xl font-anton text-cosiaca-brown text-center mb-6">
                        🎭 Tradiciones y Cultura Paisa
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(culturalTraditions).map(([key, tradition]) => (
                            <div
                                key={key}
                                className="bg-gradient-to-br from-white to-cosiaca-beige/30 p-6 rounded-2xl border-2 border-cosiaca-brown/20 hover:shadow-2xl transition-all duration-300"
                            >
                                <h3 className="text-2xl font-bold text-cosiaca-red mb-3">{tradition.title}</h3>
                                <p className="text-cosiaca-brown/80 leading-relaxed mb-4">{tradition.description}</p>

                                {tradition.examples && (
                                    <div className="bg-cosiaca-cream/50 p-4 rounded-xl space-y-2">
                                        <h4 className="font-bold text-cosiaca-brown mb-2">Ejemplos:</h4>
                                        {tradition.examples.map((example, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <span className="text-cosiaca-red">•</span>
                                                <span className="text-sm text-cosiaca-brown/80">{example}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {tradition.values && (
                                    <div className="bg-cosiaca-beige/40 p-4 rounded-xl">
                                        <h4 className="font-bold text-cosiaca-brown mb-2">Valores:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {tradition.values.map((value, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-cosiaca-red text-white px-3 py-1 rounded-full text-xs font-medium"
                                                >
                                                    {value}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {tradition.legacy && (
                                    <div className="mt-4 bg-gradient-to-r from-cosiaca-cream/80 to-cosiaca-beige/50 p-4 rounded-xl border-l-4 border-cosiaca-red">
                                        <p className="font-bold text-cosiaca-brown mb-1">Legado:</p>
                                        <p className="text-sm text-cosiaca-brown/80">{tradition.legacy}</p>
                                    </div>
                                )}

                                {tradition.impact && (
                                    <div className="mt-4 bg-white/60 p-4 rounded-xl">
                                        <p className="font-bold text-cosiaca-brown mb-1">Impacto:</p>
                                        <p className="text-sm text-cosiaca-brown/80">{tradition.impact}</p>
                                    </div>
                                )}

                                {tradition.significance && (
                                    <div className="mt-4 bg-cosiaca-red/10 p-4 rounded-xl">
                                        <p className="font-bold text-cosiaca-red mb-1">Significado:</p>
                                        <p className="text-sm text-cosiaca-brown/80">{tradition.significance}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sección de Infraestructura */}
            {activeSection === 'infrastructure' && (
                <div className="space-y-6 animate-fade-in">
                    <h2 className="text-3xl font-anton text-cosiaca-brown text-center mb-6">
                        🏗️ Hitos de Infraestructura
                    </h2>

                    <div className="relative">
                        <div className="hidden md:block absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-cosiaca-red via-cosiaca-brown to-cosiaca-red"></div>

                        <div className="space-y-6">
                            {infrastructureMilestones.map((milestone, idx) => (
                                <div
                                    key={idx}
                                    className="relative flex items-start animate-fade-in"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="hidden md:flex absolute left-8 w-9 h-9 rounded-full items-center justify-center text-xl bg-white border-4 border-cosiaca-red shadow-lg z-10">
                                        🏗️
                                    </div>

                                    <div className="w-full md:ml-20 bg-gradient-to-br from-white to-cosiaca-beige/30 p-6 rounded-2xl border-2 border-cosiaca-brown/20 hover:shadow-2xl transition-all duration-300">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-3xl font-bold text-cosiaca-red mb-2">{milestone.year}</h3>
                                                <h4 className="text-2xl font-anton text-cosiaca-brown mb-4">{milestone.name}</h4>
                                                <p className="text-cosiaca-brown/80 leading-relaxed mb-4">{milestone.impact}</p>

                                                <div className="bg-gradient-to-r from-cosiaca-cream/80 to-cosiaca-beige/50 p-5 rounded-xl border-l-4 border-cosiaca-red">
                                                    <h5 className="font-bold text-cosiaca-brown mb-2 flex items-center gap-2">
                                                        <span>💬</span> Cosiaca dice:
                                                    </h5>
                                                    <p className="text-cosiaca-brown italic leading-relaxed">"{milestone.cosiacaSays}"</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Nota final de Cosiaca */}
            <div className="bg-gradient-to-br from-cosiaca-red/10 to-cosiaca-brown/10 p-8 rounded-2xl border-2 border-cosiaca-brown/20 shadow-xl">
                <div className="text-center space-y-4">
                    <h3 className="text-3xl font-anton text-cosiaca-brown flex items-center justify-center gap-3">
                        <span className="text-4xl">🎭</span>
                        Palabras de Cosiaca
                    </h3>
                    <p className="text-lg text-cosiaca-brown/80 max-w-3xl mx-auto leading-relaxed">
                        "Mijito, estos <strong className="text-cosiaca-red">350 años</strong> no son solo fechas y nombres.
                        Son historias de gente verraca que construyó esta ciudad con sudor, ingenio y mucho amor.
                        De arrieros a emprendedores digitales, siempre hemos sido los mismos:
                        <em> paisas con ganas de comerse el mundo</em>. ¡Y apenas vamos empezando!"
                    </p>
                    <div className="pt-4">
                        <p className="text-2xl font-anton text-cosiaca-red">
                            "¡De villa de mulas a ciudad inteligente, qué viaje tan berraco!"
                        </p>
                        <p className="text-cosiaca-brown/60 mt-2">- José García 'Cosiaca', eternamente paisa</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoriaAmpliada;
