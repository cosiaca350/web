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
        <div className="animate-fade-in max-w-6xl mx-auto text-cosiaca-brown space-y-8 relative min-h-[70vh] flex items-center justify-center">
            {/* Overlay de "Próximamente" - Mejorado y más pequeño */}
            <div className="relative z-10 bg-gradient-to-br from-cosiaca-beige via-white to-cosiaca-beige/50 backdrop-blur-lg rounded-2xl shadow-2xl border-2 border-cosiaca-brown/20 p-8 md:p-12 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300">
                <div className="text-center space-y-6">
                    <div className="text-6xl md:text-7xl animate-bounce">📚</div>
                    <h2 className="text-3xl md:text-4xl font-black font-anton text-cosiaca-brown">
                        PRÓXIMAMENTE
                    </h2>
                    <p className="text-base md:text-lg text-cosiaca-brown/80 font-medium leading-relaxed">
                        Estamos preparando un <strong>Archivo Histórico</strong> completo con fotografías, documentos y testimonios reales de Medellín
                    </p>
                    <div className="flex flex-col md:flex-row gap-3 items-center justify-center pt-2">
                        <div className="inline-flex items-center gap-2 bg-cosiaca-red/10 text-cosiaca-red px-4 py-2 rounded-full font-bold text-sm border border-cosiaca-red/30">
                            <span className="text-lg">🚧</span>
                            En construcción
                        </div>
                        <div className="inline-flex items-center gap-2 bg-cosiaca-brown/10 text-cosiaca-brown px-4 py-2 rounded-full font-medium text-sm">
                            <span className="text-lg">⏳</span>
                            Disponible pronto
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Archivo;