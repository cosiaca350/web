import React, { useState } from 'react';
import { historicalCharacters, culturalTraditions, infrastructureMilestones } from '../data/historicalData';
import { criticalPeriod, emblematicProjects, transformationLessons } from '../data/modernHistory';
import Timeline3D from './Timeline3D';

const Timeline = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [activeView, setActiveView] = useState('timeline'); // 'timeline' o 'historia'

    const timelinePeriods = [
        {
            id: 1,
            year: "1616",
            date: "",
            title: "Aná, Poblado Indígena",
            category: "fundacion",
            icon: "🏔️",
            population: "Población indígena",
            keyFigure: "Cacique Aná",
            description: "Poblado indígena Aná en el Valle de Aburrá, origen ancestral del territorio",
            details: "Antes de los españoles, aquí ya había gente verraca, mijito. Los indígenas Aná vivían de la tierra, cultivaban maíz y yuca. Cuando llegaron los de España, les tocó compartir sus montañas. '¡De caciques a arrieros, qué cambio tan grande!', diría Cosiaca.",
            milestones: [
                "Asentamiento del pueblo Aná",
                "Agricultura y comercio indígena",
                "Primera cultura del Valle de Aburrá"
            ],
            color: "bg-emerald-700"
        },
        {
            id: 2,
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
            id: 3,
            year: "1803",
            date: "",
            title: "Colegio de Franciscanos",
            category: "educacion",
            icon: "📚",
            population: "~5,000 habitantes",
            keyFigure: "Fray Rafael de la Serna",
            description: "Fundación del Colegio de Franciscanos, semilla de la Universidad de Antioquia",
            details: "'¡Ahí empezó la cosa seria con los libros!', dice Cosiaca. Los frailes franciscanos trajeron la educación formal al Valle de Aburrá. Primero rezaban y después enseñaban matemáticas. ¡Así de verraquitos éramos!",
            milestones: [
                "Primera institución educativa formal",
                "Formación de élites locales",
                "Base de la Universidad de Antioquia"
            ],
            color: "bg-blue-700"
        },
        {
            id: 4,
            year: "1813",
            date: "",
            title: "Título de Ciudad",
            category: "politica",
            icon: "👑",
            population: "~8,000 habitantes",
            keyFigure: "Juan del Corral",
            description: "Medellín recibe el título de ciudad durante las guerras de independencia",
            details: "'¡De villa a ciudad en plena guerra!', cuenta Cosiaca. Juan del Corral, el verraco que firmó la primera declaración de independencia de una provincia en América, le dio el título de ciudad a Medellín. ¡En medio de los balazos, pero con orgullo paisa!",
            milestones: [
                "Elevación a rango de ciudad",
                "Declaración de independencia absoluta",
                "Juan del Corral como líder visionario"
            ],
            color: "bg-red-700"
        },
        {
            id: 5,
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
            id: 6,
            year: "1840",
            date: "",
            title: "Colonización Antioqueña",
            category: "economia",
            icon: "🥾",
            population: "~12,000 habitantes",
            keyFigure: "Arrieros y colonos",
            description: "La colonización antioqueña expande el territorio hacia el sur",
            details: "'¡Los paisas con machete y verraquera conquistamos el Viejo Caldas!', exclama Cosiaca. Familias enteras salieron con sus mulas y sus ganas de trabajar a fundar pueblos en tierras vírgenes. Así nacieron Manizales, Pereira y Armenia. ¡Puro tesón paisa!",
            milestones: [
                "Fundación de nuevas poblaciones",
                "Expansión del café y la agricultura",
                "Consolidación del espíritu arriero"
            ],
            color: "bg-amber-800"
        },
        {
            id: 7,
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
            id: 8,
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
            id: 9,
            year: "1887",
            date: "",
            title: "José García 'Cosiaca'",
            category: "cultura",
            icon: "🎭",
            population: "~35,000 habitantes",
            keyFigure: "José García 'Cosiaca'",
            description: "Aparece en escena el pícaro y cuentero más famoso de Antioquia",
            details: "'¡Yo soy Cosiaca, el que vive a costillas de los demás!', decía con gracia. Este personaje real se convirtió en leyenda por su ingenio, sus cuentos y su humor ácido. Criticaba a políticos y ricachones sin pelos en la lengua. ¡El primer comediante popular de estas tierras!",
            milestones: [
                "Símbolo del humor paisa",
                "Crítica social a través del humor",
                "Inspiración para generaciones futuras"
            ],
            color: "bg-orange-600"
        },
        {
            id: 10,
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
            id: 11,
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
            id: 12,
            year: "1920",
            date: "",
            title: "Teatro Junín",
            category: "cultura",
            icon: "🎬",
            population: "~80,000 habitantes",
            keyFigure: "Agustín Goovaerts",
            description: "Inauguración del Teatro Junín, templo de la cultura paisa",
            details: "'¡Un teatro de verdad, como los de Europa!', decía la gente maravillada. El arquitecto belga Agustín Goovaerts diseñó este palacio del arte donde se presentaban las mejores obras de teatro, óperas y películas. ¡Los paisas demostrando que también sabíamos de cultura fina!",
            milestones: [
                "Primer gran teatro de la ciudad",
                "Centro cultural por excelencia",
                "Arquitectura europea en Medellín"
            ],
            color: "bg-purple-600"
        },
        {
            id: 13,
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
            id: 14,
            year: "1932",
            date: "",
            title: "Aeropuerto Olaya Herrera",
            category: "infraestructura",
            icon: "✈️",
            population: "~150,000 habitantes",
            keyFigure: "Enrique Olaya Herrera",
            description: "Se inaugura el primer aeropuerto de Medellín",
            details: "'¡Del tren a las nubes!', gritaban los paisas emocionados al ver los primeros aviones. El aeropuerto nos conectó con el país y el mundo. Ya no teníamos que pasar días en tren o a lomo de mula. ¡La modernidad llegó volando!",
            milestones: [
                "Primer aeropuerto de la ciudad",
                "Conexión aérea nacional",
                "Impulso al comercio y turismo"
            ],
            color: "bg-sky-700"
        },
        {
            id: 15,
            year: "1955",
            date: "",
            title: "Explosión Calle Junín",
            category: "historia",
            icon: "💥",
            population: "~500,000 habitantes",
            keyFigure: "",
            description: "Trágico atentado con explosivo en pleno centro de Medellín",
            details: "'Ese día negro que nunca olvidaremos', cuenta Cosiaca con tristeza. Un camión cargado con dinamita explotó en la calle Junín durante la celebración del 7 de agosto. Más de 1,000 personas murieron o resultaron heridas. Medellín lloró unida y después se levantó con más fuerza.",
            milestones: [
                "Tragedia que unió a la ciudad",
                "Reconstrucción del centro",
                "Memoria colectiva del dolor"
            ],
            color: "bg-gray-600"
        },
        {
            id: 16,
            year: "1968",
            date: "",
            title: "Expansión Universitaria",
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
            id: 17,
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
            id: 18,
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
            id: 19,
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
            id: 20,
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
            id: 21,
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
            id: 22,
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
            id: 23,
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
            id: 24,
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
            id: 25,
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

                {/* Selector de Vista: Línea de Tiempo 3D o Historia Ampliada */}
                <div className="flex justify-center gap-4 pt-4">
                    <button
                        onClick={() => setActiveView('timeline')}
                        className={`px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                            activeView === 'timeline'
                                ? 'bg-cosiaca-red text-white shadow-xl scale-105'
                                : 'bg-white text-cosiaca-brown border-2 border-cosiaca-brown/30 hover:border-cosiaca-red'
                        }`}
                    >
                        🌀 Visualización 3D
                    </button>
                    <button
                        onClick={() => setActiveView('historia')}
                        className={`px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                            activeView === 'historia'
                                ? 'bg-cosiaca-red text-white shadow-xl scale-105'
                                : 'bg-white text-cosiaca-brown border-2 border-cosiaca-brown/30 hover:border-cosiaca-red'
                        }`}
                    >
                        📜 Historia Ampliada
                    </button>
                </div>

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

            {/* VISTA: LÍNEA DE TIEMPO 3D */}
            {activeView === 'timeline' && (
                <>
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

            <Timeline3D periods={filteredPeriods} />

            <div className="relative max-w-5xl mx-auto px-4 hidden">
                <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cosiaca-red via-cosiaca-brown to-cosiaca-red"></div>

                <div className="space-y-8">
                    {filteredPeriods.map((period, index) => (
                        <div
                            key={period.id}
                            className="relative animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="hidden md:flex absolute left-4 w-9 h-9 rounded-full items-center justify-center text-xl bg-white border-4 border-cosiaca-red shadow-lg z-10">
                                {period.icon}
                            </div>

                            <div className="md:ml-20 bg-gradient-to-br from-white to-cosiaca-beige/30 rounded-2xl border-2 border-cosiaca-brown/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
                                <div className={`${period.color} p-4 md:p-5 text-white`}>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-3 flex-1">
                                            <span className="text-3xl md:hidden">{period.icon}</span>
                                            <div>
                                                <h3 className="text-3xl md:text-4xl font-bold">{period.year}</h3>
                                                {period.date && (
                                                    <p className="text-sm opacity-90">{period.date}</p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedPeriod(selectedPeriod === period.id ? null : period.id)}
                                            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300 font-bold text-sm backdrop-blur-sm"
                                        >
                                            {selectedPeriod === period.id ? '✕' : '+'}
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 md:p-6">
                                    <h4 className="text-xl md:text-2xl font-anton text-cosiaca-brown mb-4">{period.title}</h4>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <div className="flex items-center gap-2 bg-cosiaca-beige/40 px-3 py-2 rounded-lg text-sm">
                                            <span>👥</span>
                                            <span className="font-medium">{period.population}</span>
                                        </div>
                                        {period.keyFigure && (
                                            <div className="flex items-center gap-2 bg-cosiaca-beige/40 px-3 py-2 rounded-lg text-sm">
                                                <span>👤</span>
                                                <span className="font-medium text-cosiaca-brown/80">{period.keyFigure}</span>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-sm md:text-base text-cosiaca-brown/80 leading-relaxed mb-4">
                                        {period.description}
                                    </p>

                                    {selectedPeriod === period.id && (
                                        <div className="space-y-4 animate-fade-in pt-4 border-t-2 border-cosiaca-brown/10">
                                            <div className="bg-gradient-to-r from-cosiaca-cream/80 to-cosiaca-beige/50 p-4 md:p-5 rounded-xl border-l-4 border-cosiaca-red">
                                                <h5 className="font-bold text-cosiaca-brown mb-2 flex items-center gap-2">
                                                    <span>💬</span> Cosiaca cuenta:
                                                </h5>
                                                <p className="text-sm md:text-base text-cosiaca-brown italic leading-relaxed">{period.details}</p>
                                            </div>

                                            <div className="bg-white p-4 md:p-5 rounded-xl border border-cosiaca-brown/20">
                                                <h5 className="font-bold text-cosiaca-brown mb-3 flex items-center gap-2">
                                                    <span>📌</span> Hitos Destacados:
                                                </h5>
                                                <ul className="space-y-2">
                                                    {period.milestones.map((milestone, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-cosiaca-brown/80">
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
            </>
            )}

            {/* VISTA: HISTORIA AMPLIADA */}
            {activeView === 'historia' && (
                <div className="space-y-8 animate-fade-in">
                    {/* El Milagro de Medellín */}
                    <section className="bg-gradient-to-br from-cosiaca-beige/50 to-cosiaca-cream/50 p-8 rounded-2xl shadow-xl border-2 border-cosiaca-brown/20">
                        <h2 className="text-3xl md:text-4xl font-anton text-cosiaca-brown mb-6 text-center">
                            ✨ El Milagro de Medellín (1991-2025)
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {/* Crisis */}
                            <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                                <h3 className="text-xl font-bold text-red-700 mb-3">{criticalPeriod.violence.title}</h3>
                                <p className="text-sm text-cosiaca-brown/80 mb-4">{criticalPeriod.violence.description}</p>
                                <div className="space-y-2">
                                    <div className="bg-white p-3 rounded-lg">
                                        <p className="text-2xl font-bold text-red-600">6,349</p>
                                        <p className="text-xs text-cosiaca-brown/70">Homicidios en 1991</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg">
                                        <p className="text-2xl font-bold text-red-600">381</p>
                                        <p className="text-xs text-cosiaca-brown/70">por 100,000 hab.</p>
                                    </div>
                                </div>
                                <div className="mt-4 bg-red-100 p-3 rounded-lg">
                                    <p className="text-xs italic text-cosiaca-brown">"{criticalPeriod.violence.cosiacaSays}"</p>
                                </div>
                            </div>

                            {/* Transformación */}
                            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                                <h3 className="text-xl font-bold text-blue-700 mb-3">{criticalPeriod.transformation.title}</h3>
                                <p className="text-sm text-cosiaca-brown/80 mb-4">{criticalPeriod.transformation.description}</p>
                                <div className="space-y-2">
                                    {criticalPeriod.transformation.keyProjects.slice(0, 4).map((project, idx) => (
                                        <div key={idx} className="bg-white p-2 rounded-lg">
                                            <p className="text-sm font-bold text-cosiaca-brown">{project.name}</p>
                                            <p className="text-xs text-cosiaca-brown/60">{project.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Innovación */}
                            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                                <h3 className="text-xl font-bold text-green-700 mb-3">{criticalPeriod.innovation.title}</h3>
                                <p className="text-sm text-cosiaca-brown/80 mb-4">{criticalPeriod.innovation.description}</p>
                                <div className="space-y-2">
                                    <div className="bg-white p-3 rounded-lg">
                                        <p className="text-2xl font-bold text-green-600">~600</p>
                                        <p className="text-xs text-cosiaca-brown/70">Homicidios en 2024</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg">
                                        <p className="text-2xl font-bold text-green-600">95%</p>
                                        <p className="text-xs text-cosiaca-brown/70">Reducción</p>
                                    </div>
                                </div>
                                <div className="mt-4 bg-green-100 p-3 rounded-lg">
                                    <p className="text-xs italic text-cosiaca-brown">"{criticalPeriod.innovation.cosiacaSays}"</p>
                                </div>
                            </div>
                        </div>

                        {/* Premios */}
                        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                            <h3 className="text-xl font-bold text-cosiaca-brown mb-4 text-center">🏆 Reconocimientos Internacionales</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {criticalPeriod.innovation.awards.map((award, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-lg text-center">
                                        <p className="text-3xl font-bold text-yellow-600">{award.year}</p>
                                        <p className="font-bold text-cosiaca-brown mt-2">{award.award}</p>
                                        <p className="text-xs text-cosiaca-brown/60 mt-1">{award.organization}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Proyectos Emblemáticos */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-anton text-cosiaca-brown text-center">
                            🏛️ Proyectos Emblemáticos
                        </h2>

                        {/* Urbanismo Social */}
                        <div className="bg-white p-6 rounded-2xl border-2 border-cosiaca-brown/20 shadow-lg">
                            <h3 className="text-2xl font-bold text-cosiaca-red mb-4">{emblematicProjects.urbanismo_social.title}</h3>
                            <p className="text-cosiaca-brown/80 mb-4">{emblematicProjects.urbanismo_social.description}</p>
                            <p className="text-lg font-bold text-cosiaca-brown mb-4 italic">"{emblematicProjects.urbanismo_social.philosophy}"</p>

                            <div className="grid md:grid-cols-2 gap-4">
                                {emblematicProjects.urbanismo_social.projects.slice(0, 2).map((project, idx) => (
                                    <div key={idx} className="bg-cosiaca-beige/30 p-4 rounded-xl">
                                        <h4 className="font-bold text-cosiaca-brown mb-2">{project.name}</h4>
                                        {project.year && <p className="text-sm text-cosiaca-brown/60 mb-2">{project.year}</p>}
                                        {project.elements && (
                                            <ul className="space-y-1">
                                                {project.elements.slice(0, 3).map((elem, i) => (
                                                    <li key={i} className="text-xs text-cosiaca-brown/80 flex items-start">
                                                        <span className="text-cosiaca-red mr-2">•</span>
                                                        {elem}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {project.investment && (
                                            <p className="text-sm font-bold text-green-600 mt-2">💰 {project.investment}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Movilidad */}
                        <div className="bg-white p-6 rounded-2xl border-2 border-cosiaca-brown/20 shadow-lg">
                            <h3 className="text-2xl font-bold text-cosiaca-red mb-4">{emblematicProjects.movilidad.title}</h3>
                            <p className="text-cosiaca-brown/80 mb-4">{emblematicProjects.movilidad.description}</p>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {emblematicProjects.movilidad.components.map((comp, idx) => (
                                    <div key={idx} className="bg-gradient-to-br from-cosiaca-beige/40 to-cosiaca-cream/30 p-4 rounded-xl text-center">
                                        <h4 className="font-bold text-cosiaca-brown mb-2">{comp.name}</h4>
                                        {comp.ridership && (
                                            <p className="text-lg font-bold text-cosiaca-red">{comp.ridership}</p>
                                        )}
                                        {comp.lines && typeof comp.lines === 'string' && (
                                            <p className="text-xs text-cosiaca-brown/70 mt-1">{comp.lines}</p>
                                        )}
                                        {comp.total_lines && (
                                            <p className="text-sm text-cosiaca-brown/70 mt-1">{comp.total_lines}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Lecciones */}
                        <div className="bg-gradient-to-br from-cosiaca-beige/50 to-cosiaca-cream/50 p-8 rounded-2xl border-2 border-cosiaca-brown/20 shadow-xl">
                            <h3 className="text-2xl font-anton text-cosiaca-brown mb-6 text-center">
                                📚 Las 8 Claves del Milagro de Medellín
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {transformationLessons.principles.map((principle, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl border border-cosiaca-brown/20 hover:shadow-lg transition-all">
                                        <div className="text-3xl font-bold text-cosiaca-red mb-2">{principle.number}</div>
                                        <h4 className="font-bold text-cosiaca-brown mb-2 text-sm">{principle.title}</h4>
                                        <p className="text-xs text-cosiaca-brown/70">{principle.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Personajes Históricos */}
                        <div className="bg-white p-6 rounded-2xl border-2 border-cosiaca-brown/20 shadow-lg">
                            <h3 className="text-2xl font-bold text-cosiaca-red mb-6 text-center">👤 Personajes Históricos Clave</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.values(historicalCharacters).map((char, idx) => (
                                    <div key={idx} className="bg-cosiaca-beige/30 p-4 rounded-xl hover:shadow-lg transition-all">
                                        <h4 className="font-bold text-cosiaca-brown mb-1">{char.name}</h4>
                                        <p className="text-xs text-cosiaca-brown/60 mb-2">{char.years}</p>
                                        <p className="text-sm text-cosiaca-brown/80">{char.description}</p>
                                        <div className="mt-3 bg-white/60 px-3 py-2 rounded-lg">
                                            <p className="text-xs font-bold text-cosiaca-red">Legado:</p>
                                            <p className="text-xs text-cosiaca-brown/80">{char.legacy}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Mensaje Final */}
                    <div className="bg-gradient-to-br from-cosiaca-red/10 to-cosiaca-brown/10 p-8 rounded-2xl border-2 border-cosiaca-brown/20 shadow-xl">
                        <div className="text-center space-y-4">
                            <h3 className="text-3xl font-anton text-cosiaca-brown flex items-center justify-center gap-3">
                                <span className="text-4xl">🎭</span>
                                Cosiaca lo Resume Así
                            </h3>
                            <p className="text-lg text-cosiaca-brown/80 max-w-4xl mx-auto leading-relaxed">
                                "Mijito, pasamos de ser la <strong className="text-red-600">ciudad más violenta del mundo</strong> en 1991
                                a ser la <strong className="text-green-600">ciudad más innovadora</strong> en 2013.
                                De <strong>6,349 muertos</strong> al año a menos de <strong>600</strong>.
                                Eso es una <strong className="text-cosiaca-red">reducción del 95%</strong>.
                            </p>
                            <p className="text-lg text-cosiaca-brown/80 max-w-4xl mx-auto leading-relaxed">
                                ¿Cómo lo hicimos? Con <em>educación, cultura, innovación y mucha verraquera paisa</em>.
                                Construimos el Metro, el Metrocable, los Parques Biblioteca, y le mostramos al mundo
                                que <strong>una ciudad sí puede reinventarse</strong>.
                            </p>
                            <p className="text-2xl font-anton text-cosiaca-red mt-6">
                                "¡De villa de mulas a ciudad inteligente, qué viaje tan berraco!"
                            </p>
                            <p className="text-cosiaca-brown/60">- José García 'Cosiaca', eternamente orgulloso paisa</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timeline;