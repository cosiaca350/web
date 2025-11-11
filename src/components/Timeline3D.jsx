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
    const [isMinimized, setIsMinimized] = useState(false);

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
                {/* Barra compacta cuando está minimizada - esquina superior derecha */}
                {isMinimized ? (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 pointer-events-auto">
                        <div className="bg-black/50 backdrop-blur-md rounded-lg p-1.5 sm:p-2 shadow-lg">
                            <div className="flex items-center gap-1.5">
                                <h2 className="text-[10px] sm:text-xs font-bold text-white">
                                    ✨ 3D
                                </h2>
                                <button
                                    onClick={() => setIsMinimized(false)}
                                    className="px-1.5 py-1 rounded text-xs font-bold bg-white/20 text-white hover:bg-white/30 transition-all"
                                    title="Expandir"
                                >
                                    ▼
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="px-1.5 py-1 rounded text-xs font-bold bg-cosiaca-red text-white hover:bg-cosiaca-red/80 transition-all"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                <div className="flex-none pt-2 px-2 sm:pt-3 sm:px-3 pointer-events-auto">
                    <div className="bg-black/40 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-3 max-w-2xl mx-auto shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <h2 className="text-xs sm:text-sm font-bold text-white truncate">
                                    ✨ LÍNEA DE TIEMPO 3D
                                </h2>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                <button
                                    onClick={() => setIsMinimized(true)}
                                    className="px-2 py-1 rounded-lg text-xs font-bold bg-white/20 text-white hover:bg-white/30 transition-all"
                                    title="Minimizar"
                                >
                                    ▲
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="px-2 py-1 rounded-lg text-xs font-bold bg-cosiaca-red text-white hover:bg-cosiaca-red/80 transition-all"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>


                        <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-2">
                            <div className="flex gap-1 sm:gap-1.5 flex-wrap justify-center">
                                <button
                                    onClick={() => { setViewMode('spiral'); setAutoRotate(true); }}
                                    className={`px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                                        viewMode === 'spiral'
                                            ? 'bg-white text-cosiaca-brown'
                                            : 'bg-white/15 text-white hover:bg-white/25'
                                    }`}
                                    title="Vista Espiral"
                                >
                                    🌀 <span className="hidden sm:inline">Espiral</span>
                                </button>
                                <button
                                    onClick={() => { setViewMode('orbit'); setAutoRotate(true); }}
                                    className={`px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                                        viewMode === 'orbit'
                                            ? 'bg-white text-cosiaca-brown'
                                            : 'bg-white/15 text-white hover:bg-white/25'
                                    }`}
                                    title="Vista Órbita"
                                >
                                    🪐 <span className="hidden sm:inline">Órbita</span>
                                </button>
                                <button
                                    onClick={() => { setViewMode('wave'); setAutoRotate(true); }}
                                    className={`px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                                        viewMode === 'wave'
                                            ? 'bg-white text-cosiaca-brown shadow-lg'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                    title="Vista Onda"
                                >
                                    〰️ <span className="hidden sm:inline">Onda</span>
                                </button>
                                <button
                                    onClick={() => { setViewMode('grid'); setAutoRotate(true); }}
                                    className={`px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                                        viewMode === 'grid'
                                            ? 'bg-white text-cosiaca-brown'
                                            : 'bg-white/15 text-white hover:bg-white/25'
                                    }`}
                                    title="Vista Red"
                                >
                                    ⬜ <span className="hidden sm:inline">Red</span>
                                </button>

                                <div className="w-px bg-white/20 mx-1 hidden sm:block"></div>

                                {categories && (
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium transition-all bg-white/15 text-white hover:bg-white/25"
                                        title="Filtros"
                                    >
                                        {showFilters ? '✕' : '🔍'}
                                    </button>
                                )}
                                <button
                                    onClick={() => setAutoRotate(!autoRotate)}
                                    className={`px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                                        autoRotate
                                            ? 'bg-green-500/70 text-white'
                                            : 'bg-white/15 text-white hover:bg-white/25'
                                    }`}
                                    title={autoRotate ? 'Pausar' : 'Reproducir'}
                                >
                                    {autoRotate ? '⏸️' : '▶️'}
                                </button>
                                <button
                                    onClick={resetView}
                                    className="px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium transition-all bg-white/15 text-white hover:bg-white/25"
                                    title="Reiniciar vista"
                                >
                                    ↺
                                </button>
                            </div>
                        </div>

                        {showFilters && categories && (
                            <div className="mt-2 pt-2 border-t border-white/10 animate-fade-in">
                                <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setFilterCategory(cat.id)}
                                            className={`px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg font-medium text-[10px] sm:text-xs transition-all ${
                                                filterCategory === cat.id
                                                    ? 'bg-white text-cosiaca-brown'
                                                    : 'bg-white/15 text-white hover:bg-white/25'
                                            }`}
                                        >
                                            {cat.icon} <span className="hidden sm:inline">{cat.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-2 sm:mt-3 text-center">
                            <div className="text-white/80 text-[10px] sm:text-xs">
                                <span className="font-bold">{periods.length}</span> eventos •
                                <span className="ml-1 sm:ml-2">Zoom {(zoom * 100).toFixed(0)}%</span>
                                <span className="ml-1 sm:ml-2 hidden sm:inline">🖱️ Arrastra • 🔍 Scroll • ✨ Click</span>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>

            {selectedNode && (
                <div
                    className="absolute inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-lg animate-fade-in"
                    onClick={() => { setSelectedNode(null); setAutoRotate(true); }}
                >
                    <div
                        className="relative max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-cosiaca-cream to-cosiaca-beige/50 rounded-2xl sm:rounded-3xl shadow-2xl animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`${selectedNode.color} p-3 sm:p-4 md:p-5 text-white sticky top-0 z-10 rounded-t-2xl sm:rounded-t-3xl backdrop-blur-sm`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <span className="text-2xl sm:text-3xl md:text-4xl">{selectedNode.icon}</span>
                                    <div>
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{selectedNode.year}</h3>
                                        {selectedNode.date && (
                                            <p className="text-[10px] sm:text-xs text-white opacity-90 mt-0.5 sm:mt-1">{selectedNode.date}</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setSelectedNode(null); setAutoRotate(true); }}
                                    className="bg-white/20 hover:bg-white/30 text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 font-bold backdrop-blur-sm hover:scale-110 flex items-center justify-center text-base sm:text-lg flex-shrink-0"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
                            <h4 className="text-lg sm:text-xl md:text-2xl font-anton text-cosiaca-brown leading-tight">{selectedNode.title}</h4>

                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                <div className="flex items-center gap-1.5 sm:gap-2 bg-cosiaca-beige/60 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm">
                                    <span>👥</span>
                                    <span className="font-medium">{selectedNode.population}</span>
                                </div>
                                {selectedNode.keyFigure && (
                                    <div className="flex items-center gap-1.5 sm:gap-2 bg-cosiaca-beige/60 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm">
                                        <span>👤</span>
                                        <span className="font-medium text-cosiaca-brown/80">{selectedNode.keyFigure}</span>
                                    </div>
                                )}
                            </div>

                            <p className="text-sm sm:text-base text-cosiaca-brown/85 leading-relaxed">
                                {selectedNode.description}
                            </p>

                            <div className="bg-gradient-to-r from-cosiaca-cream to-cosiaca-beige/70 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-l-4 border-cosiaca-red">
                                <h5 className="font-bold text-cosiaca-brown mb-2 flex items-center gap-2 text-xs sm:text-sm">
                                    <span>💬</span> Cosiaca cuenta:
                                </h5>
                                <p className="text-xs sm:text-sm text-cosiaca-brown italic leading-relaxed">{selectedNode.details}</p>
                            </div>

                            <div className="bg-white/90 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-cosiaca-brown/15">
                                <h5 className="font-bold text-cosiaca-brown mb-2 sm:mb-3 flex items-center gap-2 text-xs sm:text-sm">
                                    <span>📌</span> Hitos Destacados:
                                </h5>
                                <ul className="space-y-1.5 sm:space-y-2">
                                    {selectedNode.milestones.map((milestone, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-cosiaca-brown/80">
                                            <span className="text-cosiaca-red font-bold mt-0.5 text-[10px] sm:text-xs">●</span>
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
