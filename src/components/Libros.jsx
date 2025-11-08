import React from 'react';

const Libros = () => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto text-cosiaca-brown space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-cosiaca-brown">
                    📖 Libros: La Base Narrativa
                </h1>
                <p className="text-xl mt-2 text-cosiaca-brown-light/70">La crónica que inspira nuestro universo transmedia.</p>
            </header>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige md:flex md:items-center md:space-x-8">
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <img 
                        src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400" 
                        alt="Portada del libro País de Cosiacas, ciegos y puritanos" 
                        className="w-full rounded-lg shadow-lg mb-4" 
                    />
                    <div className="text-center">
                        <a 
                            href="https://www.youtube.com/watch?v=rYi4ZQXZWaU" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-cosiaca-red text-white px-4 py-2 rounded-full hover:bg-cosiaca-red-dark transition-colors font-medium"
                        >
                            📺 Ver Presentación
                        </a>
                    </div>
                </div>
                <div className="md:w-2/3">
                    <h2 className="text-3xl font-serif text-cosiaca-brown mb-4">
                        "País de Cosiacas, ciegos y puritanos"
                    </h2>
                    <p className="text-lg mb-4">
                        Esta obra de J. A. Ramírez no es solo un libro, es el corazón de Cosiaca 350. A través de una 
                        investigación profunda y una pluma ágil, el autor desentierra las raíces de la picaresca antioqueña, 
                        personificada en la figura de Cosiaca. El libro sirve como nuestra "biblia" narrativa, proporcionando 
                        el tono, las anécdotas y el contexto histórico que alimentan cada componente de nuestro proyecto transmedia.
                    </p>
                    <p>
                        La crónica novelada explora cómo el humor, la astucia y la oralidad han sido herramientas de 
                        supervivencia y cohesión social en la región, sentando las bases para entender la identidad 
                        "paisa" de hoy.
                    </p>
                </div>
            </div>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige text-center">
                <h2 className="text-2xl font-serif text-cafe-oscuro mb-4">
                    📖 Sobre el Libro
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-cosiaca-cream/50 p-4 rounded-lg border border-cosiaca-beige">
                        <h3 className="font-bold text-cafe-oscuro mb-2">📚 Género</h3>
                        <p className="text-cafe-claro/80">Crónica Novelada Histórica</p>
                    </div>
                    <div className="bg-cosiaca-cream/50 p-4 rounded-lg border border-cosiaca-beige">
                        <h3 className="font-bold text-cafe-oscuro mb-2">✍️ Autor</h3>
                        <p className="text-cafe-claro/80">Juan Alejandro Ramírez</p>
                    </div>
                    <div className="bg-cosiaca-cream/50 p-4 rounded-lg border border-cosiaca-beige">
                        <h3 className="font-bold text-cafe-oscuro mb-2">🎯 Enfoque</h3>
                        <p className="text-cafe-claro/80">Humor Paisa e Historia</p>
                    </div>
                </div>
                <p className="text-lg text-cafe-claro/80 mt-6">
                    El libro es la piedra angular del proyecto Cosiaca 350, combinando investigación histórica rigurosa 
                    con el humor característico de la cultura paisa. A través de sus páginas, los lectores descubren 
                    cómo se forjó la identidad antioqueña y el papel fundamental que jugó el humor popular en la 
                    construcción de nuestra sociedad.
                </p>
            </div>
        </div>
    );
};

export default Libros;