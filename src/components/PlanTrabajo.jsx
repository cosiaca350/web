import React, { useState } from 'react';

const PlanTrabajo = () => {
    const [selectedPhase, setSelectedPhase] = useState(null);

    const workPlan = [
        {
            id: 1,
            phase: "Fase 1",
            title: "Investigación y Desarrollo de Contenidos",
            duration: "Enero - Marzo 2025",
            status: "En Progreso",
            color: "bg-blue-600",
            objectives: [
                "Investigación exhaustiva en archivos históricos de Medellín",
                "Desarrollo del guión base para CosiacaBot",
                "Creación de contenidos audiovisuales con IA",
                "Escritura y edición del libro 'País de Cosiacas, ciegos y puritanos'",
                "Recopilación de material fotográfico y documental histórico"
            ],
            deliverables: [
                "Base de datos histórica completa con 200+ documentos",
                "Guiones para 50 historias de Cosiaca",
                "15 videos históricos con IA",
                "Manuscrito del libro terminado y editado",
                "Archivo digital organizado por períodos históricos"
            ]
        },
        {
            id: 2,
            phase: "Fase 2",
            title: "Desarrollo Tecnológico y Plataforma Digital",
            duration: "Abril - Junio 2025",
            status: "Planificado",
            color: "bg-purple-600",
            objectives: [
                "Desarrollo de la plataforma web interactiva responsive",
                "Programación del CosiacaBot con IA conversacional",
                "Creación del sistema de línea de tiempo interactiva",
                "Desarrollo de juegos, trivia y experiencias AR",
                "Implementación de sistema de gestión de contenidos",
                "Optimización SEO y accesibilidad web"
            ],
            deliverables: [
                "Sitio web completamente funcional y optimizado",
                "CosiacaBot operativo con 100+ respuestas programadas",
                "Línea de tiempo interactiva con 8 períodos históricos",
                "Trivia con 25 preguntas y sistema de puntuación",
                "Experiencias AR básicas implementadas",
                "Panel de administración de contenidos"
            ]
        },
        {
            id: 3,
            phase: "Fase 3",
            title: "Producción Audiovisual y Contenidos Multimedia",
            duration: "Julio - Septiembre 2025",
            status: "Planificado",
            color: "bg-green-600",
            objectives: [
                "Grabación y edición del podcast histórico completo",
                "Producción de videos promocionales y educativos",
                "Creación de contenido para redes sociales",
                "Diseño gráfico y material promocional impreso",
                "Desarrollo de experiencias de realidad aumentada",
                "Creación de material educativo para instituciones"
            ],
            deliverables: [
                "25 episodios de podcast histórico producidos",
                "10 videos promocionales de alta calidad",
                "Campaña visual completa con identidad gráfica",
                "100+ piezas de contenido para redes sociales",
                "Material promocional impreso (afiches, folletos)",
                "Guías educativas para colegios y universidades"
            ]
        },
        {
            id: 4,
            phase: "Fase 4",
            title: "Lanzamiento, Difusión y Evaluación",
            duration: "Octubre - Diciembre 2025",
            status: "Planificado",
            color: "bg-amber-600",
            objectives: [
                "Lanzamiento oficial de la plataforma digital",
                "Campaña de difusión en medios tradicionales y digitales",
                "Presentaciones en instituciones educativas y culturales",
                "Eventos de lanzamiento en diferentes sectores de la ciudad",
                "Evaluación de impacto y retroalimentación del proyecto",
                "Documentación de resultados y sistematización de la experiencia"
            ],
            deliverables: [
                "Evento de lanzamiento oficial con 200+ asistentes",
                "Cobertura mediática en 10+ medios de comunicación",
                "20 presentaciones realizadas en instituciones",
                "3 eventos comunitarios en diferentes comunas",
                "Informe de impacto con métricas detalladas",
                "Documento de sistematización de la experiencia"
            ]
        }
    ];

    const budget = [
        { 
            category: "Investigación y Contenidos", 
            amount: "25%", 
            description: "Investigación histórica, escritura, guiones, honorarios investigadores",
            details: "Incluye trabajo de archivo, entrevistas, transcripciones y desarrollo de contenidos"
        },
        { 
            category: "Desarrollo Tecnológico", 
            amount: "30%", 
            description: "Programación, IA, plataforma web, hosting, dominios",
            details: "Desarrollo web, integración de IA, servidores, mantenimiento técnico"
        },
        { 
            category: "Producción Audiovisual", 
            amount: "20%", 
            description: "Videos, podcast, material gráfico, equipos de grabación",
            details: "Producción, edición, post-producción, equipos técnicos"
        },
        { 
            category: "Difusión y Marketing", 
            amount: "15%", 
            description: "Promoción, eventos, redes sociales, material impreso",
            details: "Publicidad, eventos de lanzamiento, material promocional"
        },
        { 
            category: "Gastos Administrativos", 
            amount: "10%", 
            description: "Gestión, coordinación, imprevistos, seguros",
            details: "Administración del proyecto, gastos operativos, contingencias"
        }
    ];

    const team = [
        { 
            role: "Director Creativo y Productor General", 
            name: "Manuel Palacio", 
            responsibility: "Coordinación general, diseño visual, supervisión artística del proyecto",
            experience: "10+ años en producción audiovisual y diseño gráfico"
        },
        { 
            role: "Director de Contenidos e Investigación Histórica", 
            name: "Juan Alejandro Ramírez", 
            responsibility: "Investigación histórica, desarrollo de guiones, narrativa transmedia",
            experience: "Historiador especializado en cultura paisa, autor del libro base"
        },
        { 
            role: "Director Artístico y Especialista en IA", 
            name: "Carlos Andrés Londoño Ruiz", 
            responsibility: "Diseño visual con IA, contenidos multimedia, experiencias digitales",
            experience: "Especialista en inteligencia artificial aplicada al arte y diseño"
        }
    ];

    const methodology = [
        {
            title: "Investigación Participativa",
            description: "Involucrar a la comunidad en la recopilación de historias y testimonios orales"
        },
        {
            title: "Desarrollo Ágil",
            description: "Metodología iterativa para el desarrollo tecnológico con entregas parciales"
        },
        {
            title: "Narrativa Transmedia",
            description: "Construcción de historias que se expanden a través de múltiples plataformas"
        },
        {
            title: "Evaluación Continua",
            description: "Monitoreo constante del impacto y ajustes basados en retroalimentación"
        }
    ];

    const successIndicators = {
        quantitative: [
            "15,000 visitantes únicos en la plataforma web en el primer mes",
            "8,000 interacciones con CosiacaBot en los primeros 3 meses",
            "2,000 descargas/reproducciones del podcast",
            "1,000 libros distribuidos en instituciones educativas",
            "50 presentaciones en colegios, universidades y centros culturales",
            "100,000 impresiones en redes sociales",
            "25 menciones en medios de comunicación"
        ],
        qualitative: [
            "Fortalecimiento de la identidad cultural paisa en jóvenes",
            "Apropiación ciudadana de la historia local de Medellín",
            "Innovación reconocida en narrativas transmedia culturales",
            "Reconocimiento institucional del proyecto a nivel nacional",
            "Replicabilidad del modelo en otras ciudades colombianas",
            "Contribución a la memoria histórica de Medellín",
            "Integración exitosa de tecnología y tradición cultural"
        ]
    };

    const timeline = [
        { month: "Enero 2025", activity: "Inicio investigación histórica" },
        { month: "Febrero 2025", activity: "Desarrollo de guiones y contenidos" },
        { month: "Marzo 2025", activity: "Finalización Fase 1 - Contenidos" },
        { month: "Abril 2025", activity: "Inicio desarrollo tecnológico" },
        { month: "Mayo 2025", activity: "Programación CosiacaBot y plataforma" },
        { month: "Junio 2025", activity: "Finalización Fase 2 - Tecnología" },
        { month: "Julio 2025", activity: "Producción audiovisual intensiva" },
        { month: "Agosto 2025", activity: "Grabación podcast y videos" },
        { month: "Septiembre 2025", activity: "Finalización Fase 3 - Multimedia" },
        { month: "Octubre 2025", activity: "Lanzamiento oficial del proyecto" },
        { month: "Noviembre 2025", activity: "Campaña de difusión masiva" },
        { month: "Diciembre 2025", activity: "Evaluación final y sistematización" }
    ];

    return (
        <div className="animate-fade-in max-w-6xl mx-auto text-cafe-oscuro space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-cafe-oscuro">
                    📋 Plan de Trabajo Estratégico 2025
                </h1>
                <p className="text-xl mt-2 text-cafe-claro/70">
                    Hoja de ruta completa para la realización de Cosiaca 350
                </p>
            </header>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cafe-medio text-center">
                <h2 className="text-2xl font-serif text-cafe-oscuro mb-4">
                    "Un Proyecto con Método, Corazón Paisa y Visión de Futuro"
                </h2>
                <p className="text-lg text-cafe-claro/80">
                    Cosiaca 350 se desarrolla siguiendo una metodología rigurosa que combina investigación histórica, 
                    innovación tecnológica y creatividad artística para honrar los 350 años de Medellín con una 
                    propuesta transmedia única en Colombia.
                </p>
            </div>

            {/* Cronograma General */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cafe-medio">
                <h2 className="text-3xl font-serif text-cafe-oscuro text-center mb-8">
                    📅 Cronograma General 2025
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {timeline.map((item, index) => (
                        <div key={index} className="bg-cosiaca-cream/50 p-4 rounded-lg border border-cafe-medio">
                            <h3 className="font-bold text-cafe-oscuro text-sm">{item.month}</h3>
                            <p className="text-cafe-claro/80 text-sm mt-1">{item.activity}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fases Detalladas */}
            <div className="space-y-6">
                <h2 className="text-3xl font-serif text-cafe-oscuro text-center mb-8">
                    🗓️ Fases de Ejecución Detalladas
                </h2>
                
                {workPlan.map((phase) => (
                    <div key={phase.id} className="bg-cosiaca-beige/30 rounded-xl border border-cafe-medio overflow-hidden">
                        <div 
                            className="p-6 cursor-pointer hover:bg-cosiaca-beige/50 transition-colors"
                            onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-4 h-4 rounded-full ${phase.color}`}></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-cafe-oscuro">{phase.phase}: {phase.title}</h3>
                                        <p className="text-cafe-claro/70">{phase.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        phase.status === 'En Progreso' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {phase.status}
                                    </span>
                                    <button className="text-cafe-oscuro hover:text-cafe-claro">
                                        {selectedPhase === phase.id ? '▼' : '▶'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {selectedPhase === phase.id && (
                            <div className="px-6 pb-6 border-t border-cafe-medio animate-fade-in">
                                <div className="grid md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <h4 className="font-bold text-cafe-oscuro mb-3">🎯 Objetivos Específicos</h4>
                                        <ul className="space-y-2">
                                            {phase.objectives.map((objective, index) => (
                                                <li key={index} className="text-cafe-claro/80 flex items-start">
                                                    <span className="text-amber-600 mr-2">•</span>
                                                    {objective}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-cafe-oscuro mb-3">📦 Entregables</h4>
                                        <ul className="space-y-2">
                                            {phase.deliverables.map((deliverable, index) => (
                                                <li key={index} className="text-cafe-claro/80 flex items-start">
                                                    <span className="text-green-600 mr-2">✓</span>
                                                    {deliverable}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Metodología */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cafe-medio">
                <h2 className="text-3xl font-serif text-cafe-oscuro mb-6 text-center">
                    🔬 Metodología de Trabajo
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {methodology.map((method, index) => (
                        <div key={index} className="bg-cosiaca-cream/50 p-6 rounded-lg border border-cafe-medio">
                            <h3 className="font-bold text-cafe-oscuro mb-3">{method.title}</h3>
                            <p className="text-cafe-claro/80">{method.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Distribución Presupuestal Actualizada */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cafe-medio">
                <h2 className="text-3xl font-serif text-cafe-oscuro mb-6 text-center">
                    💰 Distribución Presupuestal Detallada
                </h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {budget.map((item, index) => (
                        <div key={index} className="bg-cosiaca-cream/50 p-6 rounded-lg border border-cafe-medio">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-cafe-oscuro text-lg">{item.category}</h3>
                                <span className="text-3xl font-bold text-amber-600">{item.amount}</span>
                            </div>
                            <p className="text-cafe-claro/80 mb-2">{item.description}</p>
                            <p className="text-sm text-cafe-claro/60 italic">{item.details}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Estructura del Equipo Ampliada */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cafe-medio">
                <h2 className="text-3xl font-serif text-cafe-oscuro mb-6 text-center">
                    👥 Estructura del Equipo de Trabajo
                </h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                    {team.map((member, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-cosiaca-cream/50 p-6 rounded-lg border border-cafe-medio">
                                <h3 className="font-bold text-cafe-oscuro mb-2 text-lg">{member.role}</h3>
                                <p className="text-amber-600 font-medium mb-3 text-xl">{member.name}</p>
                                <p className="text-sm text-cafe-claro/80 mb-3">{member.responsibility}</p>
                                <p className="text-xs text-cafe-claro/60 italic">{member.experience}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Indicadores de Éxito Ampliados */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cafe-medio">
                <h2 className="text-3xl font-serif text-cafe-oscuro mb-6 text-center">
                    📊 Indicadores de Éxito y Evaluación
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-cafe-oscuro mb-4">📈 Métricas Cuantitativas</h3>
                        <ul className="space-y-2 text-cafe-claro/80">
                            {successIndicators.quantitative.map((metric, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-green-600 mr-2">•</span>
                                    {metric}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-cafe-oscuro mb-4">🎯 Impacto Cualitativo</h3>
                        <ul className="space-y-2 text-cafe-claro/80">
                            {successIndicators.qualitative.map((impact, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-amber-600 mr-2">•</span>
                                    {impact}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sostenibilidad y Proyección */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cafe-medio">
                <h2 className="text-3xl font-serif text-cafe-oscuro mb-6 text-center">
                    🌱 Sostenibilidad y Proyección Futura
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-cafe-oscuro mb-4">🔄 Sostenibilidad</h3>
                        <ul className="space-y-2 text-cafe-claro/80">
                            <li>• Plataforma web autosostenible con contenido actualizable</li>
                            <li>• Alianzas institucionales para continuidad del proyecto</li>
                            <li>• Modelo replicable en otras ciudades colombianas</li>
                            <li>• Generación de recursos a través de productos culturales</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-cafe-oscuro mb-4">🚀 Proyección 2026-2030</h3>
                        <ul className="space-y-2 text-cafe-claro/80">
                            <li>• Expansión a otros municipios de Antioquia</li>
                            <li>• Desarrollo de experiencias de realidad virtual</li>
                            <li>• Creación de red nacional de proyectos similares</li>
                            <li>• Internacionalización del modelo transmedia</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanTrabajo;