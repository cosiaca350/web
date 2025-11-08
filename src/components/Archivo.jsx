import React, { useState } from 'react';

const Archivo = () => {
    const [selectedCategory, setSelectedCategory] = useState('fotografias');

    const archiveCategories = {
        fotografias: {
            title: "📸 Fotografías Históricas",
            items: [
                {
                    title: "Medellín 1920 - Plaza Berrío",
                    description: "Vista panorámica del corazón de la ciudad en los años 20",
                    source: "Archivo Fotográfico Biblioteca Pública Piloto",
                    image: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400"
                },
                {
                    title: "Tranvía de Medellín 1890",
                    description: "El primer sistema de transporte público de la ciudad",
                    source: "Colección Melitón Rodríguez",
                    image: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=400"
                },
                {
                    title: "Fábrica Textil 1940",
                    description: "La industrialización que convirtió a Medellín en el Manchester colombiano",
                    source: "Archivo Histórico de Antioquia",
                    image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
            ]
        },
        documentos: {
            title: "📜 Documentos Históricos",
            items: [
                {
                    title: "Acta de Fundación de Medellín",
                    description: "Documento original de la fundación de la Villa de la Candelaria (1675)",
                    source: "Archivo Histórico de Medellín",
                    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400"
                },
                {
                    title: "Primeros Mapas de Antioquia",
                    description: "Cartografía colonial que muestra el desarrollo territorial",
                    source: "Biblioteca Nacional de Colombia",
                    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400"
                },
                {
                    title: "Registros de Comercio Cafetero",
                    description: "Documentos del auge económico del café en Antioquia",
                    source: "Archivo de la Federación Nacional de Cafeteros",
                    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
            ]
        },
        prensa: {
            title: "📰 Prensa Histórica",
            items: [
                {
                    title: "El Espectador Antioqueño (1887)",
                    description: "Uno de los primeros periódicos de la región",
                    source: "Hemeroteca Luis López de Mesa",
                    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400"
                },
                {
                    title: "Revista Sábado (1920-1950)",
                    description: "Publicación satírica que inspiró el humor de Cosiaca",
                    source: "Biblioteca Pública Piloto",
                    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400"
                },
                {
                    title: "El Colombiano Fundacional",
                    description: "Primeras ediciones del periódico más antiguo de Medellín",
                    source: "Archivo El Colombiano",
                    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
            ]
        },
        testimonios: {
            title: "🎙️ Testimonios Orales",
            items: [
                {
                    title: "Relatos de Arrieros",
                    description: "Historias contadas por los últimos arrieros de Antioquia",
                    source: "Centro de Documentación Musical",
                    image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400"
                },
                {
                    title: "Memorias de Barrio",
                    description: "Testimonios de habitantes de los barrios tradicionales",
                    source: "Archivo de Memoria Oral de Medellín",
                    image: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400"
                },
                {
                    title: "Cuentos de Cosiaca",
                    description: "Recopilación de las historias originales del personaje",
                    source: "Investigación Juan Alejandro Ramírez",
                    image: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
            ]
        }
    };

    return (
        <div className="animate-fade-in max-w-6xl mx-auto text-cafe-oscuro space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-black font-anton text-cafe-oscuro">
                    📚 Archivo Histórico
                </h1>
                <p className="text-xl mt-2 text-cafe-claro/70 lead font-medium">
                    <em>Fuentes documentales que nutren las historias de Cosiaca</em>
                </p>
            </header>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige text-center">
                <h2 className="text-2xl font-bold font-anton text-cafe-oscuro mb-4">
                    "La Historia Vive en los Documentos"
                </h2>
                <p className="text-lg text-cafe-claro/80 lead">
                    Cada historia que cuenta <strong>Cosiaca</strong> está respaldada por <em>documentos, fotografías y testimonios 
                    reales</em> que hemos recopilado de los principales <strong>archivos históricos de Medellín y Antioquia</strong>.
                </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {Object.entries(archiveCategories).map(([key, category]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedCategory(key)}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                            selectedCategory === key
                                ? 'bg-cosiaca-enfasis text-white shadow-lg'
                                : 'bg-cosiaca-beige text-cafe-claro hover:bg-cosiaca-beige/70'
                        }`}
                    >
                        {category.title}
                    </button>
                ))}
            </div>

            {/* Archive Content */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold font-anton text-cafe-oscuro text-center mb-8">
                    {archiveCategories[selectedCategory].title}
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {archiveCategories[selectedCategory].items.map((item, index) => (
                        <div 
                            key={index}
                            className="bg-cosiaca-beige/30 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-cafe-oscuro mb-2 font-anton">
                                    {item.title}
                                </h3>
                                <p className="text-cafe-claro/80 mb-3 leading-relaxed">
                                    {item.description}
                                </p>
                                <p className="text-sm text-cosiaca-enfasis font-bold">
                                    <strong>Fuente:</strong> <em>{item.source}</em>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Archive Sources */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige">
                <h2 className="text-3xl font-bold font-anton text-cafe-oscuro mb-6 text-center">
                    🏛️ Nuestras Fuentes
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-cafe-oscuro font-anton">📁 Archivos Principales</h3>
                        <ul className="space-y-2 text-cafe-claro/80 text-lg">
                            <li>• <strong>Archivo Histórico de Medellín</strong></li>
                            <li>• <strong>Biblioteca Pública Piloto</strong></li>
                            <li>• <strong>Archivo Fotográfico Biblioteca EPM</strong></li>
                            <li>• <strong>Museo de Antioquia</strong></li>
                            <li>• <strong>Centro de Documentación Musical</strong></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-cafe-oscuro font-anton">🎨 Colecciones Especiales</h3>
                        <ul className="space-y-2 text-cafe-claro/80 text-lg">
                            <li>• <em>Fondo Fotográfico Melitón Rodríguez</em></li>
                            <li>• <em>Colección Ignacio Gómez</em></li>
                            <li>• <em>Hemeroteca de Prensa Satírica</em></li>
                            <li>• <em>Archivo de Memoria Oral</em></li>
                            <li>• <em>Documentos de la Fundación</em></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Archivo;