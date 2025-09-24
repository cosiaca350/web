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
                <img 
                    src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400" 
                    alt="Portada del libro País de Cosiacas, ciegos y puritanos" 
                    className="w-full md:w-1/3 rounded-lg shadow-lg mb-6 md:mb-0" 
                />
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
        </div>
    );
};

export default Libros;