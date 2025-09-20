import React from 'react';

const Team = () => {
    const teamMembers = [
        { 
            name: 'Manuel Palacio', 
            role: 'Director creativo y productor, diseñador visual.', 
            img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' 
        },
        { 
            name: 'Carlos Andrés Londoño Ruiz', 
            role: 'Director artístico y diseñador visual IA.', 
            img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' 
        },
        { 
            name: 'Juan Alejandro Ramírez', 
            role: 'Director de guión y contenido, líder e investigador histórico.', 
            img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' 
        },
    ];

    return (
        <div className="animate-fade-in max-w-5xl mx-auto text-gray-300 space-y-12">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-yellow-400">Nuestro Equipo</h1>
                <p className="text-xl mt-2 text-gray-400">Los artífices detrás de la Re-evolución de Cosiaca.</p>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map(member => (
                    <div 
                        key={member.name} 
                        className="bg-stone-800 text-center p-6 rounded-xl shadow-lg border border-stone-700 hover:shadow-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300"
                    >
                        <img 
                            src={member.img} 
                            alt={`Foto de ${member.name}`} 
                            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-stone-600 object-cover" 
                        />
                        <h3 className="text-xl font-bold text-yellow-300">{member.name}</h3>
                        <p className="text-gray-400">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;