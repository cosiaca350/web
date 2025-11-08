import React, { useState } from 'react';

const Timeline = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(null);

    const timelinePeriods = [
        {
            id: 1,
            year: "1675",
            title: "Fundación de Medellín",
            description: "Se funda la Villa de Nuestra Señora de la Candelaria de Medellín",
            details: "El 2 de noviembre de 1675, Francisco Herrera Campuzano funda oficialmente la villa. Cosiaca diría: '¡Ahí empezó todo, mijito! Con 24 familias y más vacas que gente, pero con ganas de hacer patria!'",
            color: "bg-amber-600"
        },
        {
            id: 2,
            year: "1700-1800",
            title: "Época Colonial",
            description: "Desarrollo de la villa colonial y establecimiento de tradiciones",
            details: "Durante este siglo, Medellín se consolida como centro administrativo y comercial. Las tradiciones paisas empiezan a forjarse, y según Cosiaca: 'Aquí fue donde aprendimos a ser verraquitos y a hacer negocios hasta con las piedras'",
            color: "bg-orange-600"
        },
        {
            id: 3,
            year: "1800-1850",
            title: "Independencia y República",
            description: "Medellín en los procesos independentistas y primeros años republicanos",
            details: "La ciudad participa activamente en las guerras de independencia. Cosiaca cuenta: 'Los paisas pelearon con machete y con verbo, porque aquí siempre hemos sido buenos para la pelea y para el cuento'",
            color: "bg-red-600"
        },
        {
            id: 4,
            year: "1850-1900",
            title: "Auge del Café",
            description: "La bonanza cafetera transforma la economía regional",
            details: "El café convierte a Antioquia en potencia económica. 'El grano dorado nos hizo ricos en plata y en cultura', diría Cosiaca. Se fundan empresas, bancos y se moderniza la ciudad.",
            color: "bg-amber-700"
        },
        {
            id: 5,
            year: "1900-1950",
            title: "Industrialización",
            description: "Medellín se convierte en el Manchester colombiano",
            details: "Surge la industria textil y manufacturera. Cosiaca observaría: 'De pueblo de arrieros pasamos a ser la fábrica de Colombia. Las máquinas rugían día y noche, y los paisas trabajando como hormiguitas'",
            color: "bg-gray-600"
        },
        {
            id: 6,
            year: "1950-1990",
            title: "Crecimiento Urbano",
            description: "Expansión demográfica y desarrollo urbano acelerado",
            details: "La ciudad crece exponencialmente con migración del campo. 'Llegaron de todos los pueblos buscando el sueño paisa', contaría Cosiaca. Se construyen los primeros barrios populares en las laderas.",
            color: "bg-blue-600"
        },
        {
            id: 7,
            year: "1990-2010",
            title: "Transformación Social",
            description: "Superación de la violencia y proyectos de ciudad",
            details: "Medellín enfrenta y supera sus momentos más difíciles. Cosiaca diría con orgullo: 'De las cenizas renacimos como el ave fénix, pero más verraquitos y con más ganas de salir adelante'",
            color: "bg-green-600"
        },
        {
            id: 8,
            year: "2010-2025",
            title: "Ciudad Innovadora",
            description: "Medellín como referente mundial de innovación urbana",
            details: "La ciudad se posiciona internacionalmente por su innovación social y urbana. 'Ahora somos ejemplo mundial', diría Cosiaca con una sonrisa. 'De villa de mulas a ciudad inteligente, ¡qué viaje tan berraco!'",
            color: "bg-purple-600"
        }
    ];

    return (
        <div className="animate-fade-in max-w-6xl mx-auto text-cafe-oscuro space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-anton text-cafe-oscuro">
                    ⏳ <strong>350</strong> Años en un Viaje
                </h1>
                <p className="text-xl mt-2 text-cafe-claro/70">
                    Un recorrido por la historia de Medellín, contada por Cosiaca
                </p>
            </header>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige text-center">
                <h2 className="text-2xl font-anton text-cafe-oscuro mb-4">
                    "De Villa de Mulas a Ciudad Inteligente"
                </h2>
                <p className="text-lg text-cafe-claro/80">
                    Acompáñanos en este viaje temporal donde Cosiaca nos cuenta, con su humor característico, 
                    cómo una pequeña villa fundada en 1675 se convirtió en la innovadora Medellín de hoy.
                </p>
            </div>

            <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-cosiaca-enfasis"></div>
                
                <div className="space-y-8">
                    {timelinePeriods.map((period, index) => (
                        <div key={period.id} className="relative flex items-start">
                            {/* Timeline Dot */}
                            <div className={`absolute left-6 w-5 h-5 rounded-full ${period.color} border-4 border-white shadow-lg z-10`}></div>
                            
                            {/* Content */}
                            <div className="ml-16 bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige hover:shadow-lg transition-all duration-300">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-cafe-oscuro">{period.year}</h3>
                                        <h4 className="text-xl font-anton text-cosiaca-enfasis">{period.title}</h4>
                                    </div>
                                    <button
                                        onClick={() => setSelectedPeriod(selectedPeriod === period.id ? null : period.id)}
                                        className="mt-2 md:mt-0 bg-cosiaca-enfasis text-white px-4 py-2 rounded-full hover:bg-cosiaca-enfasis transition-colors"
                                    >
                                        {selectedPeriod === period.id ? 'Ocultar' : 'Ver más'}
                                    </button>
                                </div>
                                
                                <p className="text-cafe-claro/80 mb-4">{period.description}</p>
                                
                                {selectedPeriod === period.id && (
                                    <div className="bg-cosiaca-cream/50 p-4 rounded-lg border border-cosiaca-beige animate-fade-in">
                                        <p className="text-cafe-claro italic">{period.details}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige text-center">
                <h3 className="text-2xl font-anton text-cafe-oscuro mb-4">
                    🎭 La Mirada de Cosiaca
                </h3>
                <p className="text-cafe-claro/80">
                    Cada período histórico está narrado desde la perspectiva única de José García "Cosiaca", 
                    quien con su humor y sabiduría popular nos ayuda a entender cómo se forjó la identidad paisa 
                    a lo largo de estos <strong>350</strong> años de historia.
                </p>
            </div>
        </div>
    );
};

export default Timeline;