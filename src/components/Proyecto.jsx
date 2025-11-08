import React from 'react';

const Proyecto = () => {
    return (
        <div className="animate-fade-in space-y-8 max-w-6xl mx-auto text-cosiaca-brown px-4">
            <header className="text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-cosiaca-brown mb-4">
                    El Proyecto: Cosiaca 350
                </h1>
                <p className="text-lg sm:text-xl text-cosiaca-brown-light/70 lead font-medium max-w-4xl mx-auto">
                    <em>Un Viaje Inmersivo a la Historia de Medellín</em>
                </p>
            </header>
            
            <section className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-cosiaca-beige">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-cosiaca-brown mb-6 text-center">
                    💡 Introducción y Concepto General
                </h2>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <p className="text-base sm:text-lg leading-relaxed">
                    En el marco de la conmemoración de los <strong>350 años de la fundación de Medellín</strong>, presentamos <span className="text-emphasis">Cosiaca 350</span>, 
                    una <strong>propuesta artística transmedia-multiplataforma</strong> que dialoga con la historia, la identidad y el futuro 
                    de la ciudad. El proyecto busca rendir homenaje a Medellín integrando <em>narrativa histórica y tecnología 
                    interactiva</em>, en sintonía con los lineamientos de la convocatoria que promueven obras inspiradas en 
                    <strong>archivos históricos e innovación digital</strong>.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed">
                    La obra se basa en revivir al mítico cuentero <strong>José García "Cosiaca"</strong>, considerado el <em>primer comediante 
                    popular de Antioquia</em> como guía y narrador a través de anécdotas de <strong>tres siglos y medio de historia local</strong>. 
                    Proponemos <span className="text-highlight">"contar la historia para vivirla riendo"</span>: mediante <em>humor pícaro, oralidad paisa y 
                    participación del público</em>, convertiremos hechos y personajes de Medellín <strong>(1675–2025)</strong> en una experiencia 
                    cultural <em>accesible, educativa y entretenida</em>.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-cosiaca-cream/50 p-6 rounded-xl border border-cosiaca-beige">
                            <div className="text-6xl mb-4">🎭</div>
                            <h3 className="text-xl font-bold text-cosiaca-brown mb-3">José García "Cosiaca"</h3>
                            <p className="text-cosiaca-brown/80 text-sm">
                                El primer comediante popular de Antioquia, nuestro guía a través de <strong>350</strong> años de historia paisa.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-cosiaca-beige">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-cosiaca-brown mb-8 text-center">
                    🌌 Componentes Transmedia
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-cosiaca-cream/50 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300 group">
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🌐</div>
                        <h3 className="font-bold text-lg text-cosiaca-brown mb-3">Plataforma Web Interactiva</h3>
                        <p className="text-cosiaca-brown-light/80 leading-relaxed text-sm">
                            <strong>Sitio web</strong> a modo de <em>museo virtual</em> donde convergen todos los contenidos, con <strong>narrativas, 
                            líneas de tiempo y galerías audiovisuales</strong>.
                        </p>
                    </div>
                    <div className="bg-cosiaca-cream/50 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300 group">
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🤖</div>
                        <h3 className="font-bold text-lg text-cosiaca-brown mb-3">CosiacaBot</h3>
                        <p className="text-cosiaca-brown-light/80 leading-relaxed text-sm">
                            <strong>Asistente virtual</strong> con la personalidad de Cosiaca que permite a los usuarios <em>"conversar" 
                            con este personaje histórico</em>.
                        </p>
                    </div>
                    <div className="bg-cosiaca-cream/50 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300 group">
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🎥</div>
                        <h3 className="font-bold text-lg text-cosiaca-brown mb-3">Videos Históricos con IA</h3>
                        <p className="text-cosiaca-brown-light/80 leading-relaxed text-sm">
                            <strong>Micro-videos</strong> que recrean <em>escenas y personajes históricos</em> de Medellín usando técnicas 
                            de <strong>inteligencia artificial</strong>.
                        </p>
                    </div>
                    <div className="bg-cosiaca-cream/50 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300 group">
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📚</div>
                        <h3 className="font-bold text-lg text-cosiaca-brown mb-3">Crónica Novelada</h3>
                        <p className="text-cosiaca-brown-light/80 leading-relaxed text-sm">
                            <em>"País de Cosiacas, ciegos y puritanos"</em>, <strong>libro que sienta la base narrativa</strong> del proyecto.
                        </p>
                    </div>
                    <div className="bg-cosiaca-cream/50 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300 group">
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🎙️</div>
                        <h3 className="font-bold text-lg text-cosiaca-brown mb-3">Podcast Histórico</h3>
                        <p className="text-cosiaca-brown-light/80 leading-relaxed text-sm">
                            <strong>Serie de episodios</strong> donde Cosiaca narra las historias más fascinantes de los <strong>350</strong> años de Medellín.
                        </p>
                    </div>
                    <div className="bg-cosiaca-cream/50 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300 group">
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📱</div>
                        <h3 className="font-bold text-lg text-cosiaca-brown mb-3">Difusión en Redes Sociales</h3>
                        <p className="text-cosiaca-brown-light/80 leading-relaxed text-sm">
                            <strong>Campaña digital</strong> en <em>TikTok, Instagram, y YouTube</em> para promocionar el contenido y 
                            <strong>fomentar la participación</strong>.
                        </p>
                    </div>
                </div>
            </section>
            
            <section className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-cosiaca-beige">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-cosiaca-brown mb-6 text-center">
                    🔍 Inspiración y Fuentes
                </h2>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                        <p className="mb-4 text-base sm:text-lg leading-relaxed">
                    La elección de <strong>archivos históricos y centros de documentación</strong> se sustenta en la necesidad de anclar 
                    la narrativa en <em>fuentes auténticas, ricas en valor simbólico y documental</em>. Estos espacios ofrecen 
                    una <strong>vasta reserva de material</strong> que permite reconstruir con <em>rigor y sensibilidad</em> el pasado de la ciudad.
                        </p>
                    </div>
                    <div>
                        <ul className="space-y-3 text-cosiaca-brown/80 text-sm sm:text-base">
                    <li>
                                <span className="text-cosiaca-red">📸</span> <strong>Fuentes primarias:</strong> Fotografías de los fondos <em>Rodríguez e Ignacio Gómez</em>, hemeroteca de 
                        <strong>prensa satírica</strong>, mapas y registros del <em>Archivo Histórico de Medellín</em>.
                    </li>
                            <li><span className="text-cosiaca-red">📚</span> <strong>Obra literaria base:</strong> <em>"País de Cosiacas, ciegos y puritanos"</em> de <strong>J. A. Ramírez</strong>.</li>
                    <li>
                                <span className="text-cosiaca-red">🏛️</span> <strong>Centros aliados:</strong> <em>Biblioteca Pública Piloto, Museo de Antioquia, Centro de Documentación Musical</em>.
                    </li>
                    <li>
                                <span className="text-cosiaca-red">🤖</span> <strong>Experimentación con IA:</strong> Usamos la IA como una <em>fuente de imaginación colaborativa</em> para generar 
                        <strong>imágenes, sonidos y estilos visuales únicos</strong>.
                    </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Proyecto;