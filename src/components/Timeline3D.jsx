import React, { useState, useEffect, useRef } from 'react';

const Timeline3D = ({ periods, categories, filterCategory, setFilterCategory, stats }) => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [hoveredNode, setHoveredNode] = useState(null);
    const [viewMode, setViewMode] = useState('spiral');
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const particleArray = Array.from({ length: 80 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 0.5 + 0.2,
            opacity: Math.random() * 0.5 + 0.2
        }));
        setParticles(particleArray);
    }, []);

    useEffect(() => {
        if (!isDragging) {
            animationRef.current = requestAnimationFrame(animate);
            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }
    }, [rotation, isDragging, viewMode, zoom]);

    const animate = () => {
        if (!isDragging) {
            setRotation(prev => (prev + 0.003) % (Math.PI * 2));
            animationRef.current = requestAnimationFrame(animate);
        }
    };

    const getNodePosition = (index, total) => {
        const centerX = 50;
        const centerY = 50;

        if (viewMode === 'spiral') {
            const angle = (index / total) * Math.PI * 6 + rotation;
            const radius = 15 + (index / total) * 25;
            const z = (index / total) * 300 - 150;
            const scale = 1 + z / 400;

            return {
                x: centerX + Math.cos(angle) * radius * scale,
                y: centerY + Math.sin(angle) * radius * scale,
                z: z,
                scale: scale * zoom
            };
        } else if (viewMode === 'orbit') {
            const angle = (index / total) * Math.PI * 2 + rotation;
            const layer = Math.floor(index / (total / 3));
            const radius = (25 - layer * 5) * zoom;
            const z = Math.sin(angle * 3) * 150;
            const scale = 1 + z / 400;

            return {
                x: centerX + Math.cos(angle) * radius * scale,
                y: centerY + Math.sin(angle) * radius * scale,
                z: z,
                scale: scale
            };
        } else {
            const angle = (index / total) * Math.PI * 2 + rotation;
            const waveRadius = 30;
            const waveHeight = Math.sin(angle * 4) * 10;
            const z = waveHeight * 10;
            const scale = 1 + z / 400;

            return {
                x: centerX + Math.cos(angle) * waveRadius * scale,
                y: centerY + Math.sin(angle) * waveRadius * scale + waveHeight,
                z: z,
                scale: scale
            };
        }
    };

    const handleNodeClick = (period) => {
        setSelectedNode(selectedNode?.id === period.id ? null : period);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.95 : 1.05;
        setZoom(prev => Math.max(0.5, Math.min(2.5, prev * delta)));
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleDragMove = (e) => {
        if (isDragging) {
            const deltaX = e.clientX - dragStart.x;
            setRotation(prev => prev + deltaX * 0.01);
            setDragStart({ x: e.clientX, y: e.clientY });
        }
    };

    const sortedPeriods = [...periods].sort((a, b) => {
        const aZ = getNodePosition(periods.indexOf(a), periods.length).z;
        const bZ = getNodePosition(periods.indexOf(b), periods.length).z;
        return aZ - bZ;
    });

    return (
        <div className="relative w-full min-h-screen -mx-4 md:-mx-8">
            <div
                ref={containerRef}
                className="fixed inset-0 w-full h-full bg-gradient-to-br from-gray-950 via-cosiaca-brown/95 to-black overflow-hidden"
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleDragMove}
                onMouseLeave={handleMouseUp}
            >
                <div className="absolute inset-0 opacity-30">
                    {particles.map(p => (
                        <div
                            key={p.id}
                            className="absolute rounded-full bg-white animate-pulse"
                            style={{
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                opacity: p.opacity,
                                animationDuration: `${3 + p.speed}s`
                            }}
                        />
                    ))}
                </div>

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <radialGradient id="nodeGlow">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </radialGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                        </linearGradient>
                    </defs>

                    {sortedPeriods.map((period, i) => {
                        const nextPeriod = sortedPeriods[i + 1];
                        if (!nextPeriod) return null;

                        const pos1 = getNodePosition(periods.indexOf(period), periods.length);
                        const pos2 = getNodePosition(periods.indexOf(nextPeriod), periods.length);

                        return (
                            <line
                                key={`line-${period.id}`}
                                x1={pos1.x}
                                y1={pos1.y}
                                x2={pos2.x}
                                y2={pos2.y}
                                stroke="url(#lineGradient)"
                                strokeWidth={0.15 * Math.min(pos1.scale, pos2.scale)}
                                opacity={0.6}
                            />
                        );
                    })}

                    {sortedPeriods.map((period, i) => {
                        const pos = getNodePosition(periods.indexOf(period), periods.length);
                        const isHovered = hoveredNode?.id === period.id;
                        const isSelected = selectedNode?.id === period.id;
                        const baseSize = (isSelected ? 3.5 : isHovered ? 2.8 : 2.2) * pos.scale;

                        return (
                            <g
                                key={period.id}
                                transform={`translate(${pos.x}, ${pos.y})`}
                                onClick={() => handleNodeClick(period)}
                                onMouseEnter={() => setHoveredNode(period)}
                                onMouseLeave={() => setHoveredNode(null)}
                                style={{ cursor: 'pointer' }}
                                className="transition-all duration-300"
                            >
                                {(isHovered || isSelected) && (
                                    <circle
                                        r={baseSize * 1.8}
                                        fill="url(#nodeGlow)"
                                        opacity="0.5"
                                        filter="url(#glow)"
                                        className="animate-pulse"
                                    />
                                )}

                                <circle
                                    r={baseSize}
                                    fill={`hsl(${(periods.indexOf(period) / periods.length) * 360}, 75%, ${isSelected ? 60 : 55}%)`}
                                    stroke="white"
                                    strokeWidth={0.2 * pos.scale}
                                    filter={isSelected ? "url(#glow)" : "none"}
                                    className="transition-all duration-300"
                                    opacity={isHovered || isSelected ? 1 : 0.85}
                                />

                                <text
                                    textAnchor="middle"
                                    dy="0.35em"
                                    fill="white"
                                    fontSize={1.2 * pos.scale}
                                    fontWeight="bold"
                                    pointerEvents="none"
                                >
                                    {period.icon}
                                </text>

                                {(isHovered || isSelected) && (
                                    <>
                                        <text
                                            textAnchor="middle"
                                            y={baseSize + 1.5 * pos.scale}
                                            fill="white"
                                            fontSize={0.9 * pos.scale}
                                            fontWeight="bold"
                                            pointerEvents="none"
                                        >
                                            {period.year}
                                        </text>
                                        <text
                                            textAnchor="middle"
                                            y={baseSize + 2.8 * pos.scale}
                                            fill="white"
                                            fontSize={0.6 * pos.scale}
                                            pointerEvents="none"
                                            opacity="0.9"
                                        >
                                            {period.title.substring(0, 20)}
                                        </text>
                                    </>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="relative z-10 min-h-screen flex flex-col pointer-events-none">
                <div className="flex-none pt-6 px-4 pointer-events-auto">
                    <div className="flex gap-2 flex-wrap justify-center mb-4">
                        <button
                            onClick={() => setViewMode('spiral')}
                            className={`px-4 py-2 rounded-full font-bold transition-all backdrop-blur-md ${
                                viewMode === 'spiral'
                                    ? 'bg-white/90 text-cosiaca-brown shadow-xl scale-105'
                                    : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                            }`}
                        >
                            🌀 Espiral
                        </button>
                        <button
                            onClick={() => setViewMode('orbit')}
                            className={`px-4 py-2 rounded-full font-bold transition-all backdrop-blur-md ${
                                viewMode === 'orbit'
                                    ? 'bg-white/90 text-cosiaca-brown shadow-xl scale-105'
                                    : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                            }`}
                        >
                            🪐 Órbita
                        </button>
                        <button
                            onClick={() => setViewMode('wave')}
                            className={`px-4 py-2 rounded-full font-bold transition-all backdrop-blur-md ${
                                viewMode === 'wave'
                                    ? 'bg-white/90 text-cosiaca-brown shadow-xl scale-105'
                                    : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                            }`}
                        >
                            〰️ Onda
                        </button>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2 rounded-full font-bold transition-all backdrop-blur-md bg-white/20 text-white border border-white/30 hover:bg-white/30"
                        >
                            🔍 Filtros
                        </button>
                    </div>

                    {showFilters && categories && (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 animate-fade-in">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setFilterCategory(cat.id)}
                                        className={`px-3 py-1.5 rounded-full font-medium text-xs transition-all ${
                                            filterCategory === cat.id
                                                ? 'bg-white text-cosiaca-brown shadow-lg scale-105'
                                                : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                                        }`}
                                    >
                                        <span className="mr-1">{cat.icon}</span>
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                            {stats && (
                                <div className="mt-2 text-center text-white/80 text-xs">
                                    <strong>{periods.length}</strong> de <strong>{stats.total}</strong> eventos
                                </div>
                            )}
                        </div>
                    )}

                    <div className="text-center bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl inline-block mx-auto">
                        <div className="flex items-center justify-center gap-3 text-xs md:text-sm">
                            <span className="font-bold">🖱️ Arrastra</span>
                            <span className="opacity-50">|</span>
                            <span className="font-bold">🔍 Scroll Zoom</span>
                            <span className="opacity-50">|</span>
                            <span className="font-bold">✨ Click</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1" />

                <div className="flex-none pb-6 px-4 pointer-events-auto">
                    <div className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg inline-block text-sm">
                        <div className="font-bold">{periods.length} Eventos • Zoom: {(zoom * 100).toFixed(0)}%</div>
                    </div>
                </div>
            </div>

            {selectedNode && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
                    onClick={() => setSelectedNode(null)}
                >
                    <div
                        className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-gradient-to-br from-white via-cosiaca-cream to-cosiaca-beige/50 rounded-3xl shadow-2xl animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`${selectedNode.color} p-6 text-white sticky top-0 z-10 rounded-t-3xl`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-5xl">{selectedNode.icon}</span>
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-bold">{selectedNode.year}</h3>
                                        {selectedNode.date && (
                                            <p className="text-sm opacity-90">{selectedNode.date}</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedNode(null)}
                                    className="bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full transition-all duration-300 font-bold backdrop-blur-sm hover:scale-110 flex items-center justify-center text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <h4 className="text-2xl font-anton text-cosiaca-brown">{selectedNode.title}</h4>

                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-2 bg-cosiaca-beige/60 px-3 py-2 rounded-lg text-sm">
                                    <span>👥</span>
                                    <span className="font-medium">{selectedNode.population}</span>
                                </div>
                                {selectedNode.keyFigure && (
                                    <div className="flex items-center gap-2 bg-cosiaca-beige/60 px-3 py-2 rounded-lg text-sm">
                                        <span>👤</span>
                                        <span className="font-medium text-cosiaca-brown/80">{selectedNode.keyFigure}</span>
                                    </div>
                                )}
                            </div>

                            <p className="text-base text-cosiaca-brown/80 leading-relaxed">
                                {selectedNode.description}
                            </p>

                            <div className="bg-gradient-to-r from-cosiaca-cream to-cosiaca-beige/70 p-5 rounded-2xl border-l-4 border-cosiaca-red">
                                <h5 className="font-bold text-cosiaca-brown mb-2 flex items-center gap-2">
                                    <span>💬</span> Cosiaca cuenta:
                                </h5>
                                <p className="text-sm text-cosiaca-brown italic leading-relaxed">{selectedNode.details}</p>
                            </div>

                            <div className="bg-white/80 p-5 rounded-2xl border border-cosiaca-brown/20">
                                <h5 className="font-bold text-cosiaca-brown mb-3 flex items-center gap-2">
                                    <span>📌</span> Hitos Destacados:
                                </h5>
                                <ul className="space-y-2">
                                    {selectedNode.milestones.map((milestone, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-cosiaca-brown/80">
                                            <span className="text-cosiaca-red font-bold mt-1">•</span>
                                            <span>{milestone}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timeline3D;
