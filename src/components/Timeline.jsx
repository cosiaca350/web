import React, { useState } from 'react';

const Timeline = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');

    const timelinePeriods = [
        {
            id: 1,
            year: "1675",
            date: "2 de noviembre",
            title: "Fundación de Medellín",
            category: "fundacion",
            icon: "🏛️",
            population: "~300 habitantes",
            keyFigure: "Francisco Herrera Campuzano",
            description: "Se funda la Villa de Nuestra Señora de la Candelaria de Medellín",
            details: "El 2 de noviembre de 1675, Francisco Herrera Campuzano funda oficialmente la villa con 24 familias españolas. Cosiaca diría: '¡Ahí empezó todo, mijito! Con 24 familias y más vacas que gente, pero con ganas de hacer patria!'",
            milestones: [
                "Erección de la primera iglesia",
                "Trazado del parque principal (actual Parque Berrío)",
                "Establecimiento del cabildo"
            ],
            color: "bg-amber-600"
        },
        {
            id: 2,
            year: "1826",
            date: "17 de abril",
            title: "Capital de Antioquia",
            category: "politica",
            icon: "⚖️",
            population: "~10,000 habitantes",
            keyFigure: "Juan del Corral",
            description: "Medellín es designada capital del departamento de Antioquia",
            details: "Santa Fe de Antioquia cede el título de capital. Cosiaca comenta: '¡De villa a capital! Los de Santa Fe no quedaron muy contentos, pero nosotros éramos más verracos para el comercio'",
            milestones: [
                "Traslado de instituciones gubernamentales",
                "Construcción de edificios administrativos",
                "Consolidación como centro político regional"
            ],
            color: "bg-red-700"
        },
        {
            id: 3,
            year: "1851",
            date: "12 de julio",
            title: "Universidad de Antioquia",
            category: "educacion",
            icon: "📚",
            population: "~15,000 habitantes",
            keyFigure: "Pedro Justo Berrío",
            description: "Fundación de la Universidad de Antioquia",
            details: "Se funda como Colegio del Estado. 'Aquí empezó la cosa seria con la educación', dice Cosiaca. 'Los paisas siempre hemos sido buenos para estudiar y hacer plata'",
            milestones: [
                "Primera institución de educación superior",
                "Formación de élites intelectuales paisas",
                "Inicio de la tradición académica regional"
            ],
            color: "bg-blue-700"
        },
        {
            id: 4,
            year: "1875",
            date: "20 de octubre",
            title: "Ferrocarril de Antioquia",
            category: "infraestructura",
            icon: "🚂",
            population: "~30,000 habitantes",
            keyFigure: "William Price",
            description: "Inauguración del Ferrocarril de Antioquia",
            details: "Conecta a Medellín con Puerto Berrío y el río Magdalena. 'El tren nos sacó del encierro de las montañas', narra Cosiaca. 'Fue como ponerle alas a un pueblo arriero'",
            milestones: [
                "Primera locomotora llega a la ciudad",
                "Reducción del tiempo de viaje a la costa",
                "Impulso al comercio internacional"
            ],
            color: "bg-gray-700"
        },
        {
            id: 5,
            year: "1890",
            date: "",
            title: "Auge Cafetero",
            category: "economia",
            icon: "☕",
            population: "~40,000 habitantes",
            keyFigure: "Empresarios paisas",
            description: "La bonanza cafetera transforma la economía regional",
            details: "El café convierte a Antioquia en potencia económica. 'El grano dorado nos hizo ricos en plata y en cultura', diría Cosiaca. Se fundan empresas, bancos y se moderniza la ciudad.",
            milestones: [
                "Medellín se convierte en centro de comercialización",
                "Surgimiento de grandes fortunas cafeteras",
                "Fundación de bancos y empresas"
            ],
            color: "bg-amber-700"
        },
        {
            id: 6,
            year: "1905",
            date: "",
            title: "Industrialización Textil",
            category: "economia",
            icon: "🏭",
            population: "~60,000 habitantes",
            keyFigure: "Empresarios Echeverri, Restrepo",
            description: "Fundación de Coltejer y otras textileras",
            details: "Surge la industria textil que convierte a Medellín en 'El Manchester Colombiano'. Cosiaca: 'De pueblo de arrieros a fábrica de telas. Las máquinas rugían día y noche'",
            milestones: [
                "Fundación de Coltejer (1907)",
                "Creación de Fabricato (1920)",
                "Desarrollo del barrio obrero"
            ],
            color: "bg-slate-700"
        },
        {
            id: 7,
            year: "1925",
            date: "",
            title: "Fundación EPM",
            category: "servicios",
            icon: "💡",
            population: "~120,000 habitantes",
            keyFigure: "Pedro Nel Ospina",
            description: "Nace Empresas Públicas de Medellín",
            details: "Se crea la empresa que llevará servicios públicos a toda la ciudad. 'La luz llegó para todos', dice Cosiaca. 'Ya no éramos de vela y candil'",
            milestones: [
                "Electrificación de la ciudad",
                "Acueducto moderno",
                "Base del desarrollo urbano futuro"
            ],
            color: "bg-yellow-600"
        },
        {
            id: 8,
            year: "1955",
            date: "",
            title: "Aeropuerto Olaya Herrera",
            category: "infraestructura",
            icon: "✈️",
            population: "~500,000 habitantes",
            keyFigure: "",
            description: "Inauguración del aeropuerto que conecta Medellín con el país",
            details: "La aviación acerca a Medellín con el resto de Colombia. 'Del tren a los aviones', comenta Cosiaca. 'Siempre buscando salir de nuestras montañas'",
            milestones: [
                "Primera terminal aérea moderna",
                "Conexión rápida con Bogotá",
                "Impulso al turismo y comercio"
            ],
            color: "bg-sky-600"
        },
        {
            id: 9,
            year: "1968",
            date: "",
            title: "EAFIT y Universidad Nacional",
            category: "educacion",
            icon: "🎓",
            population: "~1,000,000 habitantes",
            keyFigure: "",
            description: "Expansión de la educación superior en la ciudad",
            details: "Nuevas universidades democratizan el acceso a la educación. Cosiaca: 'Más universidades, más oportunidades. Los paisas siempre apostando por la educación'",
            milestones: [
                "Diversificación de la oferta académica",
                "Formación de nuevas generaciones",
                "Consolidación como polo educativo"
            ],
            color: "bg-blue-600"
        },
        {
            id: 10,
            year: "1982",
            date: "",
            title: "Feria de las Flores",
            category: "cultura",
            icon: "🌺",
            population: "~1,500,000 habitantes",
            keyFigure: "Silleteros",
            description: "Consolidación de la feria más importante de la ciudad",
            details: "El desfile de silleteros se convierte en símbolo mundial de Medellín. 'Las flores en la espalda, el orgullo en el pecho', dice Cosiaca con emoción",
            milestones: [
                "Desfile de silleteros como patrimonio",
                "Medellín se proyecta culturalmente",
                "Turismo y tradición se unen"
            ],
            color: "bg-pink-600"
        },
        {
            id: 11,
            year: "1995",
            date: "",
            title: "Metro de Medellín",
            category: "infraestructura",
            icon: "🚇",
            population: "~2,000,000 habitantes",
            keyFigure: "",
            description: "Inauguración del primer metro de Colombia",
            details: "El Metro cambia para siempre la movilidad y cultura ciudadana. 'El orgullo paisa sobre rieles', comenta Cosiaca. 'Lo cuidamos como si fuera de oro'",
            milestones: [
                "Primera línea del Metro (Niquía - La Estrella)",
                "Cultura Metro y sentido de pertenencia",
                "Reducción de tiempos de desplazamiento"
            ],
            color: "bg-green-600"
        },
        {
            id: 12,
            year: "2004",
            date: "",
            title: "Metrocable",
            category: "infraestructura",
            icon: "🚡",
            population: "~2,200,000 habitantes",
            keyFigure: "Sergio Fajardo",
            description: "Sistema de cable aéreo que conecta las comunas altas",
            details: "Innovación social que integra los barrios más alejados. 'De marginados a conectados', dice Cosiaca. 'El cable nos subió la autoestima a todos'",
            milestones: [
                "Primera línea K (Santo Domingo)",
                "Integración de comunidades vulnerables",
                "Modelo replicado mundialmente"
            ],
            color: "bg-teal-600"
        },
        {
            id: 13,
            year: "2007",
            date: "",
            title: "Parque Biblioteca España",
            category: "cultura",
            icon: "📖",
            population: "~2,300,000 habitantes",
            keyFigure: "Giancarlo Mazzanti",
            description: "Primera de las bibliotecas públicas de impacto urbano",
            details: "Los parques biblioteca llevan cultura y educación a los barrios. 'Libros donde antes había miedo', narra Cosiaca. 'Eso sí es transformación'",
            milestones: [
                "Arquitectura de clase mundial en barrios populares",
                "10 parques biblioteca en la ciudad",
                "Premio a mejor edificio público"
            ],
            color: "bg-orange-600"
        },
        {
            id: 14,
            year: "2012",
            date: "",
            title: "Ciudad Más Innovadora",
            category: "reconocimiento",
            icon: "🏆",
            population: "~2,400,000 habitantes",
            keyFigure: "",
            description: "Wall Street Journal y Citi premian a Medellín",
            details: "Medellín gana el premio City of the Year. 'De la ciudad más violenta a la más innovadora', dice Cosiaca orgulloso. '¡Qué vuelta tan berraca pegamos!'",
            milestones: [
                "Reconocimiento internacional",
                "Transformación urbana y social",
                "Referente mundial de innovación"
            ],
            color: "bg-yellow-500"
        },
        {
            id: 15,
            year: "2015",
            date: "",
            title: "Tranvía de Ayacucho",
            category: "infraestructura",
            icon: "🚊",
            population: "~2,500,000 habitantes",
            keyFigure: "",
            description: "Nuevo sistema de transporte integrado",
            details: "El tranvía complementa el sistema Metro. 'Ahora sí parecemos ciudad europea', comenta Cosiaca. 'Con tren, metro, cable y tranvía'",
            milestones: [
                "Primera línea de tranvía moderno",
                "Renovación urbana del centro",
                "Sistema integrado de transporte"
            ],
            color: "bg-lime-600"
        },
        {
            id: 16,
            year: "2019",
            date: "",
            title: "Corredor Verde Ayacucho",
            category: "ambiente",
            icon: "🌳",
            population: "~2,500,000 habitantes",
            keyFigure: "",
            description: "Transformación verde del centro de la ciudad",
            details: "30 cuadras de concreto se convierten en jardín urbano. 'Del gris al verde', dice Cosiaca. '8,000 árboles donde antes solo había humo'",
            milestones: [
                "Mayor jardín lineal de Colombia",
                "Recuperación del espacio público",
                "Modelo de urbanismo sostenible"
            ],
            color: "bg-emerald-600"
        },
        {
            id: 17,
            year: "2025",
            date: "",
            title: "350 Años de Historia",
            category: "celebracion",
            icon: "🎉",
            population: "~2,600,000 habitantes",
            keyFigure: "Cosiaca",
            description: "Medellín celebra 350 años de transformación",
            details: "'De villa de mulas a ciudad inteligente', concluye Cosiaca. '350 años de ser verraquitos, de reinventarnos, de caernos y levantarnos. ¡Eso sí es ser paisa!'",
            milestones: [
                "Centro de innovación latinoamericano",
                "Referente de transformación urbana",
                "Ciudad de emprendimiento y cultura"
            ],
            color: "bg-rose-600"
        }
    ];

    const categories = [
        { id: 'all', name: 'Todos', icon: '📍' },
        { id: 'fundacion', name: 'Fundación', icon: '🏛️' },
        { id: 'politica', name: 'Política', icon: '⚖️' },
        { id: 'economia', name: 'Economía', icon: '💰' },
        { id: 'infraestructura', name: 'Infraestructura', icon: '🏗️' },
        { id: 'educacion', name: 'Educación', icon: '📚' },
        { id: 'cultura', name: 'Cultura', icon: '🎭' },
        { id: 'servicios', name: 'Servicios', icon: '💡' },
        { id: 'ambiente', name: 'Ambiente', icon: '🌳' },
        { id: 'reconocimiento', name: 'Premios', icon: '🏆' },
        { id: 'celebracion', name: 'Celebración', icon: '🎉' }
    ];

    const filteredPeriods = filterCategory === 'all'
        ? timelinePeriods
        : timelinePeriods.filter(p => p.category === filterCategory);

    const stats = {
        total: timelinePeriods.length,
        years: 350,
        population: "2.6M+",
        transformation: "Villa → Metrópoli"
    };

    return (
        <div className="animate-fade-in max-w-7xl mx-auto text-cosiaca-brown space-y-8">
            <header className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold font-anton text-cosiaca-brown">
                    ⏳ <strong>350</strong> Años de Historia
                </h1>
                <p className="text-xl md:text-2xl text-cosiaca-brown/70">
                    De Villa de Mulas a Ciudad Inteligente
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
                    <div className="bg-cosiaca-beige/40 p-4 rounded-xl border border-cosiaca-brown/20">
                        <div className="text-3xl font-bold text-cosiaca-red">{stats.total}</div>
                        <div className="text-sm text-cosiaca-brown/70">Hitos Históricos</div>
                    </div>
                    <div className="bg-cosiaca-beige/40 p-4 rounded-xl border border-cosiaca-brown/20">
                        <div className="text-3xl font-bold text-cosiaca-red">{stats.years}</div>
                        <div className="text-sm text-cosiaca-brown/70">Años de Historia</div>
                    </div>
                    <div className="bg-cosiaca-beige/40 p-4 rounded-xl border border-cosiaca-brown/20">
                        <div className="text-3xl font-bold text-cosiaca-red">{stats.population}</div>
                        <div className="text-sm text-cosiaca-brown/70">Habitantes Hoy</div>
                    </div>
                    <div className="bg-cosiaca-beige/40 p-4 rounded-xl border border-cosiaca-brown/20">
                        <div className="text-2xl font-bold text-cosiaca-red">Villa → Metrópoli</div>
                        <div className="text-sm text-cosiaca-brown/70">Transformación</div>
                    </div>
                </div>
            </header>

            <div className="bg-gradient-to-br from-cosiaca-beige/50 to-cosiaca-cream/50 p-6 md:p-8 rounded-2xl shadow-xl border-2 border-cosiaca-brown/20">
                <h2 className="text-2xl md:text-3xl font-anton text-cosiaca-brown mb-6 text-center">
                    🔍 Filtrar por Categoría
                </h2>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setFilterCategory(cat.id)}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                                filterCategory === cat.id
                                    ? 'bg-cosiaca-red text-white shadow-lg scale-105'
                                    : 'bg-white text-cosiaca-brown border border-cosiaca-brown/30 hover:border-cosiaca-red'
                            }`}
                        >
                            <span className="mr-1">{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
                <div className="mt-4 text-center text-cosiaca-brown/70">
                    Mostrando <strong>{filteredPeriods.length}</strong> de <strong>{stats.total}</strong> hitos
                </div>
            </div>

            <div className="relative">
                <div className="hidden md:block absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-cosiaca-red via-cosiaca-brown to-cosiaca-red"></div>

                <div className="space-y-6">
                    {filteredPeriods.map((period, index) => (
                        <div
                            key={period.id}
                            className="relative flex items-start animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="hidden md:flex absolute left-8 w-9 h-9 rounded-full items-center justify-center text-xl bg-white border-4 border-cosiaca-red shadow-lg z-10">
                                {period.icon}
                            </div>

                            <div className="w-full md:ml-20 bg-gradient-to-br from-white to-cosiaca-beige/30 p-6 rounded-2xl border-2 border-cosiaca-brown/20 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl md:hidden">{period.icon}</span>
                                            <div>
                                                <h3 className="text-3xl md:text-4xl font-bold text-cosiaca-red">{period.year}</h3>
                                                {period.date && (
                                                    <p className="text-sm text-cosiaca-brown/60">{period.date}</p>
                                                )}
                                            </div>
                                        </div>
                                        <h4 className="text-xl md:text-2xl font-anton text-cosiaca-brown mb-3">{period.title}</h4>

                                        <div className="grid md:grid-cols-2 gap-2 mb-3 text-sm">
                                            <div className="flex items-center gap-2 bg-cosiaca-beige/40 px-3 py-1 rounded-full">
                                                <span>👥</span>
                                                <span className="font-medium">{period.population}</span>
                                            </div>
                                            {period.keyFigure && (
                                                <div className="flex items-center gap-2 bg-cosiaca-beige/40 px-3 py-1 rounded-full">
                                                    <span>👤</span>
                                                    <span className="font-medium text-cosiaca-brown/80">{period.keyFigure}</span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-cosiaca-brown/80 leading-relaxed">{period.description}</p>
                                    </div>

                                    <button
                                        onClick={() => setSelectedPeriod(selectedPeriod === period.id ? null : period.id)}
                                        className="self-start bg-cosiaca-red text-white px-6 py-3 rounded-full hover:bg-cosiaca-brown transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
                                    >
                                        {selectedPeriod === period.id ? '✕ Ocultar' : '+ Ver más'}
                                    </button>
                                </div>

                                {selectedPeriod === period.id && (
                                    <div className="mt-6 space-y-4 animate-fade-in">
                                        <div className="bg-gradient-to-r from-cosiaca-cream/80 to-cosiaca-beige/50 p-5 rounded-xl border-l-4 border-cosiaca-red">
                                            <h5 className="font-bold text-cosiaca-brown mb-2 flex items-center gap-2">
                                                <span>💬</span> Cosiaca cuenta:
                                            </h5>
                                            <p className="text-cosiaca-brown italic leading-relaxed">{period.details}</p>
                                        </div>

                                        <div className="bg-white/80 p-5 rounded-xl border border-cosiaca-brown/20">
                                            <h5 className="font-bold text-cosiaca-brown mb-3 flex items-center gap-2">
                                                <span>📌</span> Hitos Destacados:
                                            </h5>
                                            <ul className="space-y-2">
                                                {period.milestones.map((milestone, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-cosiaca-brown/80">
                                                        <span className="text-cosiaca-red font-bold mt-1">•</span>
                                                        <span>{milestone}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-br from-cosiaca-red/10 to-cosiaca-brown/10 p-8 rounded-2xl border-2 border-cosiaca-brown/20 shadow-xl">
                <div className="text-center space-y-4">
                    <h3 className="text-3xl font-anton text-cosiaca-brown flex items-center justify-center gap-3">
                        <span className="text-4xl">🎭</span>
                        La Mirada de Cosiaca
                    </h3>
                    <p className="text-lg text-cosiaca-brown/80 max-w-3xl mx-auto leading-relaxed">
                        Cada hito histórico está narrado desde la perspectiva única de José García "Cosiaca",
                        el pícaro y sabio personaje que con su humor característico nos ayuda a entender
                        cómo se forjó la identidad paisa a lo largo de estos <strong className="text-cosiaca-red">350</strong> años
                        de transformación, resistencia y verraquera.
                    </p>
                    <div className="pt-4">
                        <p className="text-2xl font-anton text-cosiaca-red">
                            "¡De villa de mulas a ciudad inteligente, qué viaje tan berraco!"
                        </p>
                        <p className="text-cosiaca-brown/60 mt-2">- Cosiaca, 2025</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;