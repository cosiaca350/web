import React from 'react';

const Proyecto = () => {
    return (
        <div className="animate-fade-in space-y-12 max-w-5xl mx-auto text-gray-300">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-yellow-400">
                    El Proyecto: Cosiaca 350
                </h1>
                <p className="text-xl mt-2 text-gray-400">Un Viaje Inmersivo a la Historia de Medellín</p>
            </header>
            
            <section className="bg-stone-800 p-8 rounded-xl shadow-2xl border border-stone-700">
                <h2 className="text-3xl font-serif text-yellow-300 mb-4 border-b-2 border-yellow-400/20 pb-2">
                    💡 Introducción y Concepto General
                </h2>
                <p className="mb-4">
                    En el marco de la conmemoración de los 350 años de la fundación de Medellín, presentamos Cosiaca 350, 
                    una propuesta artística transmedia-multiplataforma que dialoga con la historia, la identidad y el futuro 
                    de la ciudad. El proyecto busca rendir homenaje a Medellín integrando narrativa histórica y tecnología 
                    interactiva, en sintonía con los lineamientos de la convocatoria que promueven obras inspiradas en 
                    archivos históricos e innovación digital.
                </p>
                <p>
                    La obra se basa en revivir al mítico cuentero José García, "Cosiaca", considerado el primer comediante 
                    popular de Antioquia como guía y narrador a través de anécdotas de tres siglos y medio de historia local. 
                    Proponemos **"contar la historia para vivirla riendo"**: mediante humor pícaro, oralidad paisa y 
                    participación del público, convertiremos hechos y personajes de Medellín (1675–2025) en una experiencia 
                    cultural accesible, educativa y entretenida.
                </p>
            </section>
            
            <section className="bg-stone-800 p-8 rounded-xl shadow-2xl border border-stone-700">
                <h2 className="text-3xl font-serif text-yellow-300 mb-4 border-b-2 border-yellow-400/20 pb-2">
                    🌌 Componentes Transmedia
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-stone-700/50 p-6 rounded-lg border border-stone-600">
                        <h4 className="font-bold text-xl text-yellow-400 mb-2">Plataforma Web Interactiva</h4>
                        <p className="text-gray-200">
                            Sitio web a modo de museo virtual donde convergen todos los contenidos, con narrativas, 
                            líneas de tiempo y galerías audiovisuales.
                        </p>
                    </div>
                    <div className="bg-stone-700/50 p-6 rounded-lg border border-stone-600">
                        <h4 className="font-bold text-xl text-yellow-400 mb-2">CosiacaBot</h4>
                        <p className="text-gray-200">
                            Asistente virtual con la personalidad de Cosiaca que permite a los usuarios "conversar" 
                            con este personaje histórico.
                        </p>
                    </div>
                    <div className="bg-stone-700/50 p-6 rounded-lg border border-stone-600">
                        <h4 className="font-bold text-xl text-yellow-400 mb-2">Videos Históricos con IA</h4>
                        <p className="text-gray-200">
                            Micro-videos que recrean escenas y personajes históricos de Medellín usando técnicas 
                            de inteligencia artificial.
                        </p>
                    </div>
                    <div className="bg-stone-700/50 p-6 rounded-lg border border-stone-600">
                        <h4 className="font-bold text-xl text-yellow-400 mb-2">Crónica Novelada</h4>
                        <p className="text-gray-200">
                            "País de Cosiacas, ciegos y puritanos", libro que sienta la base narrativa del proyecto.
                        </p>
                    </div>
                    <div className="bg-stone-700/50 p-6 rounded-lg border border-stone-600">
                        <h4 className="font-bold text-xl text-yellow-400 mb-2">Difusión en Redes Sociales</h4>
                        <p className="text-gray-200">
                            Campaña digital en TikTok, Instagram, y YouTube para promocionar el contenido y 
                            fomentar la participación.
                        </p>
                    </div>
                </div>
            </section>
            
            <section className="bg-stone-800 p-8 rounded-xl shadow-2xl border border-stone-700">
                <h2 className="text-3xl font-serif text-yellow-300 mb-4 border-b-2 border-yellow-400/20 pb-2">
                    🔍 Inspiración y Fuentes
                </h2>
                <p className="mb-4">
                    La elección de archivos históricos y centros de documentación se sustenta en la necesidad de anclar 
                    la narrativa en fuentes auténticas, ricas en valor simbólico y documental. Estos espacios ofrecen 
                    una vasta reserva de material que permite reconstruir con rigor y sensibilidad el pasado de la ciudad.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li>
                        **Fuentes primarias:** Fotografías de los fondos Rodríguez e Ignacio Gómez, hemeroteca de 
                        prensa satírica, mapas y registros del Archivo Histórico de Medellín.
                    </li>
                    <li>**Obra literaria base:** "País de Cosiacas, ciegos y puritanos" de J. A. Ramírez.</li>
                    <li>
                        **Centros aliados:** Biblioteca Pública Piloto, Museo de Antioquia, Centro de Documentación Musical.
                    </li>
                    <li>
                        **Experimentación con IA:** Usamos la IA como una fuente de imaginación colaborativa para generar 
                        imágenes, sonidos y estilos visuales únicos.
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Proyecto;