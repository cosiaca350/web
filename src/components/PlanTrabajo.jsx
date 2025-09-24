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
                "Escritura y edición del libro 'País de Cosiacas, ciegos y puritanos'"
            ],
            deliverables: [
                "Base de datos histórica completa",
                "Guiones para 50 historias de Cosiaca",
                "10 videos históricos con IA",
                "Manuscrito del libro terminado"
            ]
        },
        {
            id: 2,
            phase: "Fase 2",
            title: "Desarrollo Tecnológico",
            duration: "Abril - Junio 2025",
            status: "Planificado",
            color: "bg-purple-600",
            objectives: [
                "Desarrollo de la plataforma web interactiva",
                "Programación del CosiacaBot con IA",
                "Creación del sistema de línea de tiempo",
                "Desarrollo de juegos y experiencias AR"
            ],
            deliverables: [
                "Sitio web completamente funcional",
                "CosiacaBot operativo",
                "Línea de tiempo interactiva",
                "Trivia y juegos implementados"
            ]
        },
        {
            id: 3,
            phase: "Fase 3",
            title: "Producción de Contenidos",
            duration: "Julio - Septiembre 2025",
            status: "Planificado",
            color: "bg-green-600",
            objectives: [
                "Grabación y edición del podcast histórico",
                "Producción de videos promocionales",
                "Creación de contenido para redes sociales",
                "Diseño gráfico y material promocional"
            ],
            deliverables: [
                "20 episodios de podcast",
                "Campaña visual completa",
                "Contenido para redes sociales",
                "Material promocional impreso"
            ]
        },
        {
            id: 4,
            phase: "Fase 4",
            title: "Lanzamiento y Difusión",
            duration: "Octubre - Diciembre 2025",
            status: "Planificado",
            color: "bg-red-600",
            objectives: [
                "Lanzamiento oficial de la plataforma",
                "Campaña de difusión en medios",
                "Presentaciones en instituciones educativas",
                "Evaluación y retroalimentación del proyecto"
            ],
            deliverables: [
                "Evento de lanzamiento",
                "Cobertura mediática",
                "Presentaciones realizadas",
                "Informe de impacto"
            ]
        }
    ];

    const budget = [
        { category: "Investigación y Contenidos", amount: "25%", description: "Investigación histórica, escritura, guiones" },
        { category: "Desarrollo Tecnológico", amount: "30%", description: "Programación, IA, plataforma web" },
        { category: "Producción Audiovisual", amount: "20%", description: "Videos, podcast, material gráfico" },
        { category: "Difusión y Marketing", amount: "15%", description: "Promoción, eventos, redes sociales" },
        { category: "Gastos Administrativos", amount: "10%", description: "Gestión, coordinación, imprevistos" }
    ];

    const team = [
        { role: "Director Creativo", name: "Manuel Palacio", responsibility: "Coordinación general y diseño visual" },
        { role: "Director de Contenidos", name: "Juan Alejandro Ramírez", responsibility: "Investigación histórica y guiones" },
        { role: "Director Artístico", name: "Carlos Andrés Londoño", responsibility: "Diseño visual y contenidos IA" }
    ];

    return (
        <div className="animate-fade-in max-w-6xl mx-auto text-cafe-oscuro space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-cafe-oscuro">
                    📋 Plan de Trabajo Estratégico
                </h1>
                <p className="text-xl mt-2 text-cafe-claro/70">
                    Hoja de ruta para la realización de Cosiaca 350
                </p>
            </header>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige text-center">
                <h2 className="text-2xl font-serif text-cafe-oscuro mb-4">
                    "Un Proyecto con Método y Corazón Paisa"
                </h2>
                <p className="text-lg text-cafe-claro/80">
                    Cosiaca 350 se desarrolla siguiendo una metodología rigurosa que combina investigación histórica, 
                    innovación tecnológica y creatividad artística para honrar los 350 años de Medellín.
                </p>
            </div>

            {/* Timeline of Phases */}
            <div className="space-y-6">
                <h2 className="text-3xl font-serif text-cafe-oscuro text-center mb-8">
                    🗓️ Cronograma de Ejecución
                </h2>
                
                {workPlan.map((phase) => (
                    <div key={phase.id} className="bg-cosiaca-beige/30 rounded-xl border border-cosiaca-beige overflow-hidden">
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
                                    <button className="text-cosiaca-red hover:text-cosiaca-red-dark">
                                        {selectedPhase === phase.id ? '▼' : '▶'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {selectedPhase === phase.id && (
                            <div className="px-6 pb-6 border-t border-cosiaca-beige animate-fade-in">
                                <div className="grid md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <h4 className="font-bold text-cafe-oscuro mb-3">Objetivos</h4>
                                        <ul className="space-y-2">
                                            {phase.objectives.map((objective, index) => (
                                                <li key={index} className="text-cafe-claro/80 flex items-start">
                                                    <span className="text-cosiaca-red mr-2">•</span>
                                                    {objective}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-cafe-oscuro mb-3">Entregables</h4>
                                        <ul className="space-y-2">
                                            {phase.deliverables.map((deliverable, index) => (
                                                <li key={index} className="text-cafe-claro/80 flex items-start">
                                                    <span className="text-cosiaca-red mr-2">✓</span>
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

            {/* Budget Distribution */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige">
                <h2 className="text-3xl font-serif text-cafe-oscuro mb-6 text-center">
                    💰 Distribución Presupuestal
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {budget.map((item, index) => (
                        <div key={index} className="bg-cosiaca-cream/50 p-4 rounded-lg border border-cosiaca-beige">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-cafe-oscuro">{item.category}</h3>
                                <span className="text-2xl font-bold text-cosiaca-red">{item.amount}</span>
                            </div>
                            <p className="text-sm text-cafe-claro/70">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Structure */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige">
                <h2 className="text-3xl font-serif text-cafe-oscuro mb-6 text-center">
                    👥 Estructura del Equipo
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {team.map((member, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-cosiaca-cream/50 p-6 rounded-lg border border-cosiaca-beige">
                                <h3 className="font-bold text-cafe-oscuro mb-2">{member.role}</h3>
                                <p className="text-cosiaca-red font-medium mb-2">{member.name}</p>
                                <p className="text-sm text-cafe-claro/70">{member.responsibility}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Success Indicators */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige">
                <h2 className="text-3xl font-serif text-cafe-oscuro mb-6 text-center">
                    📊 Indicadores de Éxito
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-cafe-oscuro mb-4">Métricas Cuantitativas</h3>
                        <ul className="space-y-2 text-cafe-claro/80">
                            <li>• 10,000 visitantes únicos en la plataforma web</li>
                            <li>• 5,000 interacciones con CosiacaBot</li>
                            <li>• 1,000 descargas del podcast</li>
                            <li>• 500 libros distribuidos</li>
                            <li>• 50 presentaciones en instituciones</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-cafe-oscuro mb-4">Impacto Cualitativo</h3>
                        <ul className="space-y-2 text-cafe-claro/80">
                            <li>• Fortalecimiento de la identidad cultural paisa</li>
                            <li>• Apropiación ciudadana de la historia local</li>
                            <li>• Innovación en narrativas transmedia</li>
                            <li>• Reconocimiento institucional del proyecto</li>
                            <li>• Replicabilidad en otras ciudades</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanTrabajo;