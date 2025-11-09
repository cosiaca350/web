import React, { useState, useEffect, useRef, useCallback } from 'react';

const Timeline3D = ({ periods, categories, filterCategory, setFilterCategory, stats, isOpen, onClose }) => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [hoveredNode, setHoveredNode] = useState(null);
    const [viewMode, setViewMode] = useState('spiral');
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [autoRotate, setAutoRotate] = useState(true);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [animationSpeed] = useState(0.003);

    useEffect(() => {
        const particleArray = Array.from({ length: 120 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2.5 + 0.5,
            speed: Math.random() * 0.3 + 0.1,
            opacity: Math.random() * 0.4 + 0.1
        }));
        setParticles(particleArray);
    }, []);

    useEffect(() => {
        if (!isDragging && autoRotate && isOpen) {
            animationRef.current = requestAnimationFrame(animate);
            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }
    }, [rotation, isDragging, autoRotate, isOpen]);

    const animate = () => {
        if (!isDragging && autoRotate && isOpen) {
            setRotation(prev => (prev + animationSpeed) % (Math.PI * 2));
            animationRef.current = requestAnimationFrame(animate);
        }
    };

    const getNodePosition = useCallback((index, total) => {
        const centerX = 50;
        const centerY = 50;

        if (viewMode === 'spiral') {
            const angle = (index / total) * Math.PI * 6 + rotation;
            const radius = 12 + (index / total) * 28;
            const z = (index / total) * 400 - 200;
            const scale = 1 + z / 500;

            return {
                x: centerX + Math.cos(angle) * radius * scale,
                y: centerY + Math.sin(angle) * radius * scale,
                z: z,
                scale: scale * zoom
            };
        } else if (viewMode === 'orbit') {
            const rings = 3;
            const ringIndex = Math.floor(index / Math.ceil(total / rings));
            const posInRing = index % Math.ceil(total / rings);
            const totalInRing = Math.ceil(total / rings);
            const angle = (posInRing / totalInRing) * Math.PI * 2 + rotation;
            const radius = (30 - ringIndex * 8) * zoom;
            const z = Math.sin(angle * 2 + ringIndex) * 120;
            const scale = 1 + z / 500;

            return {
                x: centerX + Math.cos(angle) * radius * scale,
                y: centerY + Math.sin(angle) * radius * scale,
                z: z,
                scale: scale
            };
        } else if (viewMode === 'wave') {
            const angle = (index / total) * Math.PI * 2 + rotation;
            const waveRadius = 32;
            const waveHeight = Math.sin(angle * 5) * 8;
            const z = waveHeight * 15;
            const scale = 1 + z / 500;

            return {
                x: centerX + Math.cos(angle) * waveRadius * scale,
                y: centerY + Math.sin(angle) * waveRadius * scale + waveHeight,
                z: z,
                scale: scale
            };
        } else {
            const cols = Math.ceil(Math.sqrt(total));
            const row = Math.floor(index / cols);
            const col = index % cols;
            const spacing = 15;
            const offsetX = centerX - (cols * spacing) / 2;
            const offsetY = centerY - (Math.ceil(total / cols) * spacing) / 2;
            const z = Math.sin((row + col) * 0.5 + rotation) * 50;
            const scale = 1 + z / 500;

            return {
                x: offsetX + col * spacing * scale,
                y: offsetY + row * spacing * scale,
                z: z,
                scale: scale * zoom
            };
        }
    }, [viewMode, rotation, zoom]);

    const handleNodeClick = (period) => {
        setSelectedNode(selectedNode?.id === period.id ? null : period);
        setAutoRotate(false);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.92 : 1.08;
        setZoom(prev => Math.max(0.4, Math.min(3, prev * delta)));
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setAutoRotate(false);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleDragMove = (e) => {
        if (isDragging) {
            const deltaX = e.clientX - dragStart.x;
            setRotation(prev => prev + deltaX * 0.008);
            setDragStart({ x: e.clientX, y: e.clientY });
        }
    };

    const handleTouchStart = (e) => {
        if (e.touches.length === 1) {
            setIsDragging(true);
            setAutoRotate(false);
            setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        }
    };

    const handleTouchMove = (e) => {
        if (isDragging && e.touches.length === 1) {
            const deltaX = e.touches[0].clientX - dragStart.x;
            setRotation(prev => prev + deltaX * 0.008);
            setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const resetView = () => {
        setZoom(1);
        setRotation(0);
        setAutoRotate(true);
        setSelectedNode(null);
    };

    const handleClose = () => {
        setSelectedNode(null);
        setAutoRotate(true);
        onClose();
    };

    const sortedPeriods = [...periods].sort((a, b) => {
        const aZ = getNodePosition(periods.indexOf(a), periods.length).z;
        const bZ = getNodePosition(periods.indexOf(b), periods.length).z;
        return aZ - bZ;
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 animate-fade-in">
            <div
                ref={containerRef}
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-950 via-cosiaca-brown/95 to-black overflow-hidden"
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleDragMove}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="absolute inset-0 opacity-20">
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
                                animationDuration: `${2 + p.speed * 3}s`,
                                animationDelay: `${p.speed}s`
                            }}
                        />
                    ))}
                </div>

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <radialGradient id="nodeGlow">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </radialGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="0.4" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
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
                                strokeWidth={0.12 * Math.min(pos1.scale, pos2.scale)}
                                opacity={0.5}
                            />
                        );
                    })}

                    {sortedPeriods.map((period) => {
                        const pos = getNodePosition(periods.indexOf(period), periods.length);
                        const isHovered = hoveredNode?.id === period.id;
                        const isSelected = selectedNode?.id === period.id;
                        const baseSize = (isSelected ? 4 : isHovered ? 3.2 : 2.5) * pos.scale;

                        return (
                            <g
                                key={period.id}
                                transform={`translate(${pos.x}, ${pos.y})`}
                                onClick={() => handleNodeClick(period)}
                                onMouseEnter={() => setHoveredNode(period)}
                                onMouseLeave={() => setHoveredNode(null)}
                                style={{ cursor: 'pointer' }}
                                className="transition-all duration-200"
                            >
                                {(isHovered || isSelected) && (
                                    <circle
                                        r={baseSize * 2}
                                        fill="url(#nodeGlow)"
                                        opacity="0.4"
                                        filter="url(#glow)"
                                        className="animate-pulse"
                                    />
                                )}

                                <circle
                                    r={baseSize}
                                    fill={`hsl(${(periods.indexOf(period) / periods.length) * 360}, 80%, ${isSelected ? 65 : 58}%)`}
                                    stroke="white"
                                    strokeWidth={0.25 * pos.scale}
                                    filter={isSelected || isHovered ? "url(#glow)" : "none"}
                                    className="transition-all duration-200"
                                    opacity={isHovered || isSelected ? 1 : 0.9}
                                />

                                <text
                                    textAnchor="middle"
                                    dy="0.4em"
                                    fill="white"
                                    fontSize={1.4 * pos.scale}
                                    fontWeight="bold"
                                    pointerEvents="none"
                                >
                                    {period.icon}
                                </text>

                                {(isHovered || isSelected) && (
                                    <>
                                        <text
                                            textAnchor="middle"
                                            y={baseSize + 1.8 * pos.scale}
                                            fill="white"
                                            fontSize={1 * pos.scale}
                                            fontWeight="bold"
                                            pointerEvents="none"
                                        >
                                            {period.year}
                                        </text>
                                        <text
                                            textAnchor="middle"
                                            y={baseSize + 3.2 * pos.scale}
                                            fill="white"
                                            fontSize={0.65 * pos.scale}
                                            pointerEvents="none"
                                            opacity="0.95"
                                        >
                                            {period.title.substring(0, 18)}
                                        </text>
                                    </>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
                <div className="flex-none pt-4 px-4 pointer-events-auto">
                    <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-4 max-w-6xl mx-auto shadow-2xl">
                        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                            <div>
                                <h2 className="text-xl md:text-2xl font-anton text-white mb-1">
                                    ✨ Línea de Tiempo Interactiva 3D
                                </h2>
                                <p className="text-white/70 text-xs">
                                    Explora 350 años de historia de Medellín
                                </p>
                            </div>

                            <button
                                onClick={handleClose}
                                className="px-4 py-2 rounded-full text-sm font-bold bg-cosiaca-red text-white hover:bg-cosiaca-red/80 shadow-lg transition-all"
                            >
                                ✕ Cerrar
                            </button>
                        </div>

                        <div className="mt-4 flex flex-col md:flex-row gap-3 items-center justify-between border-t border-white/20 pt-3">
                            <div className="flex gap-2 flex-wrap justify-center">
                                <button
                                    onClick={() => { setViewMode('spiral'); setAutoRotate(true); }}
                                    className={`px-3 py-2 rounded-full text-xs font-bold transition-all ${
                                        viewMode === 'spiral'
                                            ? 'bg-white text-cosiaca-brown shadow-lg'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    🌀 Espiral
                                </button>
                                <button
                                    onClick={() => { setViewMode('orbit'); setAutoRotate(true); }}
                                    className={`px-3 py-2 rounded-full text-xs font-bold transition-all ${
                                        viewMode === 'orbit'
                                            ? 'bg-white text-cosiaca-brown shadow-lg'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    🪐 Órbita
                                </button>
                                <button
                                    onClick={() => { setViewMode('wave'); setAutoRotate(true); }}
                                    className={`px-3 py-2 rounded-full text-xs font-bold transition-all ${
                                        viewMode === 'wave'
                                            ? 'bg-white text-cosiaca-brown shadow-lg'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    〰️ Onda
                                </button>
                                <button
                                    onClick={() => { setViewMode('grid'); setAutoRotate(true); }}
                                    className={`px-3 py-2 rounded-full text-xs font-bold transition-all ${
                                        viewMode === 'grid'
                                            ? 'bg-white text-cosiaca-brown shadow-lg'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    ⬜ Red
                                </button>
                            </div>

                            <div className="flex gap-2 flex-wrap justify-center">
                                {categories && (
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="px-3 py-2 rounded-full text-xs font-bold transition-all bg-white/20 text-white hover:bg-white/30"
                                    >
                                        {showFilters ? '✕' : '🔍'}
                                    </button>
                                )}
                                <button
                                    onClick={() => setAutoRotate(!autoRotate)}
                                    className={`px-3 py-2 rounded-full text-xs font-bold transition-all ${
                                        autoRotate
                                            ? 'bg-green-500/80 text-white'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    {autoRotate ? '⏸️' : '▶️'}
                                </button>
                                <button
                                    onClick={resetView}
                                    className="px-3 py-2 rounded-full text-xs font-bold transition-all bg-white/20 text-white hover:bg-white/30"
                                >
                                    ↺
                                </button>
                            </div>
                        </div>

                        {showFilters && categories && (
                            <div className="mt-3 pt-3 border-t border-white/20 animate-fade-in">
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setFilterCategory(cat.id)}
                                            className={`px-3 py-1.5 rounded-full font-medium text-xs transition-all ${
                                                filterCategory === cat.id
                                                    ? 'bg-white text-cosiaca-brown shadow-lg'
                                                    : 'bg-white/15 text-white hover:bg-white/25'
                                            }`}
                                        >
                                            {cat.icon} {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-3 text-center">
                            <div className="text-white/80 text-xs">
                                <span className="font-bold">{periods.length}</span> eventos •
                                <span className="ml-2">Zoom {(zoom * 100).toFixed(0)}%</span> •
                                <span className="ml-2">🖱️ Arrastra • 🔍 Scroll • ✨ Click</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedNode && (
                <div
                    className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-fade-in"
                    onClick={() => { setSelectedNode(null); setAutoRotate(true); }}
                >
                    <div
                        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-cosiaca-cream to-cosiaca-beige/50 rounded-3xl shadow-2xl animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`${selectedNode.color} p-5 text-white sticky top-0 z-10 rounded-t-3xl backdrop-blur-sm`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl">{selectedNode.icon}</span>
                                    <div>
                                        <h3 className="text-3xl font-bold">{selectedNode.year}</h3>
                                        {selectedNode.date && (
                                            <p className="text-xs opacity-90 mt-1">{selectedNode.date}</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setSelectedNode(null); setAutoRotate(true); }}
                                    className="bg-white/20 hover:bg-white/30 text-white w-9 h-9 rounded-full transition-all duration-300 font-bold backdrop-blur-sm hover:scale-110 flex items-center justify-center text-lg"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            <h4 className="text-2xl font-anton text-cosiaca-brown leading-tight">{selectedNode.title}</h4>

                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-2 bg-cosiaca-beige/60 px-3 py-1.5 rounded-lg text-sm">
                                    <span>👥</span>
                                    <span className="font-medium">{selectedNode.population}</span>
                                </div>
                                {selectedNode.keyFigure && (
                                    <div className="flex items-center gap-2 bg-cosiaca-beige/60 px-3 py-1.5 rounded-lg text-sm">
                                        <span>👤</span>
                                        <span className="font-medium text-cosiaca-brown/80">{selectedNode.keyFigure}</span>
                                    </div>
                                )}
                            </div>

                            <p className="text-base text-cosiaca-brown/85 leading-relaxed">
                                {selectedNode.description}
                            </p>

                            <div className="bg-gradient-to-r from-cosiaca-cream to-cosiaca-beige/70 p-4 rounded-2xl border-l-4 border-cosiaca-red">
                                <h5 className="font-bold text-cosiaca-brown mb-2 flex items-center gap-2 text-sm">
                                    <span>💬</span> Cosiaca cuenta:
                                </h5>
                                <p className="text-sm text-cosiaca-brown italic leading-relaxed">{selectedNode.details}</p>
                            </div>

                            <div className="bg-white/90 p-4 rounded-2xl border border-cosiaca-brown/15">
                                <h5 className="font-bold text-cosiaca-brown mb-3 flex items-center gap-2 text-sm">
                                    <span>📌</span> Hitos Destacados:
                                </h5>
                                <ul className="space-y-2">
                                    {selectedNode.milestones.map((milestone, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-cosiaca-brown/80">
                                            <span className="text-cosiaca-red font-bold mt-0.5 text-xs">●</span>
                                            <span className="leading-snug">{milestone}</span>
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
