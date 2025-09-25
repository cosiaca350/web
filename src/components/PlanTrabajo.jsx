import React from 'react';

const PlanTrabajo = () => {
    const phases = [
        {
            phase: "Fase 1",
            title: "Investigación y Desarrollo de Contenidos",
            period: "Enero - Marzo 2025",
            status: "En Progreso",
            color: "bg-blue-600",
            key_deliverables: ["Base de datos histórica", "Guiones para CosiacaBot", "Videos con IA", "Manuscrito del libro"]
        },
        {
            phase: "Fase 2", 
            title: "Desarrollo Tecnológico y Plataforma Digital",
            period: "Abril - Junio 2025",
            status: "Planificado",
            color: "bg-purple-600",
            key_deliverables: ["Plataforma web completa", "CosiacaBot funcional", "Línea de tiempo interactiva", "Juegos y AR"]
        },
        {
            phase: "Fase 3",
            title: "Producción Audiovisual y Contenidos Multimedia", 
            period: "Julio - Septiembre 2025",
            status: "Planificado",
            color: "bg-green-600",
            key_deliverables: ["25 episodios de podcast", "Videos promocionales", "Contenido para redes", "Material educativo"]
        },
        {
            phase: "Fase 4",
            title: "Lanzamiento, Difusión y Evaluación",
            period: "Octubre - Diciembre 2025", 
            status: "Planificado",
            color: "bg-amber-600",
            key_deliverables: ["Lanzamiento oficial", "Campaña mediática", "Eventos comunitarios", "Evaluación de impacto"]
        }
    ];

    const budget = [
        { category: "Investigación y Contenidos", percentage: "25%", description: "Investigación histórica, escritura, guiones" },
        { category: "Desarrollo Tecnológico", percentage: "30%", description: "Programación, IA, plataforma web" },
        { category: "Producción Audiovisual", percentage: "20%", description: "Videos, podcast, material gráfico" },
        { category: "Difusión y Marketing", percentage: "15%", description: "Promoción, eventos, redes sociales" },
        { category: "Gastos Administrativos", percentage: "10%", description: "Gestión, coordinación, imprevistos" }
    ];

    const team = [
        { name: "Manuel Palacio", role: "Director Creativo y Productor General" },
        { name: "Juan Alejandro Ramírez", role: "Director de Contenidos e Investigación Histórica" },
        { name: "Carlos Andrés Londoño Ruiz", role: "Director Artístico y Especialista en IA" }
    ];

    const goals = [
        "15,000 visitantes únicos en la plataforma web",
        "8,000 interacciones con CosiacaBot",
        "2,000 reproducciones del podcast",
        "50 presentaciones en instituciones educativas",
        "Fortalecimiento de la identidad cultural paisa"
    ];

    return (
        <div className="animate-fade-in max-w-5xl mx-auto text-cafe-oscuro space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-cafe-oscuro">
                    📋 Plan de Trabajo 2025
                </h1>
                <p className="text-xl mt-2 text-cafe-claro/70">
                    Resumen ejecutivo del proyecto Cosiaca 350
                </p>
            </header>
            
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige text-center">
                <h2 className="text-2xl font-serif text-cafe-oscuro mb-4">
                    "Un Proyecto Transmedia para Celebrar 350 Años de Historia"
                </h2>
                <p className="text-lg text-cafe-claro/80">
                    Cosiaca 350 se desarrolla en 4 fases durante 2025, combinando investigación histórica rigurosa 
                    con innovación tecnológica para crear una experiencia cultural única que honre la historia de Medellín.
                </p>
            </div>

            {/* Fases del Proyecto */}
            <div className="space-y-6">
                <h2 className="text-3xl font-serif text-cafe-oscuro text-center mb-8">
                    🗓️ Fases de Ejecución
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {phases.map((phase, index) => (
                        <div key={index} className="bg-cosiaca-beige/30 p-6 rounded-xl border border-cosiaca-beige">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`w-4 h-4 rounded-full ${phase.color}`}></div>
                                <div>
                                    <h3 className="text-xl font-bold text-cafe-oscuro">{phase.phase}</h3>
                                    <p className="text-cosiaca-red font-medium">{phase.title}</p>
                                </div>
                            </div>
                            <p className="text-cafe-claro/70 mb-3">{phase.period}</p>
                            <div className="space-y-1">
                                {phase.key_deliverables.map((deliverable, idx) => (
                                    <p key={idx} className="text-sm text-cafe-claro/80 flex items-start">
                                        <span className="text-green-600 mr-2">•</span>
                                        {deliverable}
                                    </p>
                                ))}
                            </div>
                            <span className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                                phase.status === 'En Progreso' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                                {phase.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Distribución Presupuestal */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige">
                <h2 className="text-3xl font-serif text-cafe-oscuro mb-6 text-center">
                    💰 Distribución Presupuestal
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {budget.map((item, index) => (
                        <div key={index} className="bg-cosiaca-cream/50 p-4 rounded-lg border border-cosiaca-beige text-center">
                            <div className="text-2xl font-bold text-cosiaca-red mb-2">{item.percentage}</div>
                            <h3 className="font-bold text-cafe-oscuro text-sm mb-2">{item.category}</h3>
                            <p className="text-xs text-cafe-claro/80">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Equipo de Trabajo */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige">
                <h2 className="text-3xl font-serif text-cafe-oscuro mb-6 text-center">
                    👥 Equipo de Trabajo
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {team.map((member, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-cosiaca-cream/50 p-4 rounded-lg border border-cosiaca-beige">
                                <h3 className="font-bold text-cosiaca-red text-lg mb-2">{member.name}</h3>
                                <p className="text-sm text-cafe-claro/80">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Metas Principales */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige">
                <h2 className="text-3xl font-serif text-cafe-oscuro mb-6 text-center">
                    🎯 Metas Principales
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {goals.map((goal, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <span className="text-cosiaca-red text-xl">•</span>
                            <p className="text-cafe-claro/80">{goal}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cronograma Resumido */}
            <div className="bg-cosiaca-beige/30 p-8 rounded-xl shadow-2xl border border-cosiaca-beige">
                <h2 className="text-3xl font-serif text-cafe-oscuro mb-6 text-center">
                    📅 Cronograma 2025
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <h3 className="font-bold text-blue-800">Q1 2025</h3>
                        <p className="text-sm text-blue-600">Investigación</p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-lg">
                        <h3 className="font-bold text-purple-800">Q2 2025</h3>
                        <p className="text-sm text-purple-600">Desarrollo</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg">
                        <h3 className="font-bold text-green-800">Q3 2025</h3>
                        <p className="text-sm text-green-600">Producción</p>
                    </div>
                    <div className="bg-amber-100 p-4 rounded-lg">
                        <h3 className="font-bold text-amber-800">Q4 2025</h3>
                        <p className="text-sm text-amber-600">Lanzamiento</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanTrabajo;