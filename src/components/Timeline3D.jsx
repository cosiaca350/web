import React, { useState, useEffect, useRef } from 'react';

const Timeline3D = ({ periods }) => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [hoveredNode, setHoveredNode] = useState(null);
    const [viewMode, setViewMode] = useState('spiral');
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            return () => container.removeEventListener('mousemove', handleMouseMove);
        }
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
            setRotation(prev => (prev + 0.002) % (Math.PI * 2));
            animationRef.current = requestAnimationFrame(animate);
        }
    };

    const getNodePosition = (index, total) => {
        const centerX = 400;
        const centerY = 300;

        if (viewMode === 'spiral') {
            const angle = (index / total) * Math.PI * 4 + rotation;
            const radius = 150 + (index / total) * 150;
            const z = (index / total) * 200 - 100;
            const scale = 1 + z / 300;

            return {
                x: centerX + Math.cos(angle) * radius * scale * zoom,
                y: centerY + Math.sin(angle) * radius * scale * zoom,
                z: z,
                scale: scale * zoom
            };
        } else if (viewMode === 'orbit') {
            const angle = (index / total) * Math.PI * 2 + rotation;
            const radius = 200 * zoom;
            const z = Math.sin(angle * 2) * 100;
            const scale = 1 + z / 300;

            return {
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius,
                z: z,
                scale: scale
            };
        } else {
            const cols = Math.ceil(Math.sqrt(total));
            const row = Math.floor(index / cols);
            const col = index % cols;
            const spacing = 150 * zoom;

            return {
                x: 100 + col * spacing,
                y: 100 + row * spacing,
                z: 0,
                scale: zoom
            };
        }
    };

    const handleNodeClick = (period) => {
        setSelectedNode(selectedNode?.id === period.id ? null : period);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setZoom(prev => Math.max(0.5, Math.min(2, prev * delta)));
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
        <div className="relative w-full">
            <div className="flex gap-2 mb-6 flex-wrap justify-center">
                <button
                    onClick={() => setViewMode('spiral')}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${
                        viewMode === 'spiral'
                            ? 'bg-cosiaca-red text-white shadow-lg'
                            : 'bg-white text-cosiaca-brown border-2 border-cosiaca-brown/20'
                    }`}
                >
                    🌀 Espiral Temporal
                </button>
                <button
                    onClick={() => setViewMode('orbit')}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${
                        viewMode === 'orbit'
                            ? 'bg-cosiaca-red text-white shadow-lg'
                            : 'bg-white text-cosiaca-brown border-2 border-cosiaca-brown/20'
                    }`}
                >
                    🪐 Órbita
                </button>
                <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${
                        viewMode === 'grid'
                            ? 'bg-cosiaca-red text-white shadow-lg'
                            : 'bg-white text-cosiaca-brown border-2 border-cosiaca-brown/20'
                    }`}
                >
                    ⬛ Red
                </button>
            </div>

            <div className="bg-gradient-to-br from-cosiaca-cream to-white rounded-2xl border-2 border-cosiaca-brown/20 p-4 mb-4">
                <div className="flex items-center justify-center gap-4 text-sm text-cosiaca-brown">
                    <span className="font-bold">🖱️ Arrastra para rotar</span>
                    <span>|</span>
                    <span className="font-bold">🔍 Scroll para zoom</span>
                    <span>|</span>
                    <span className="font-bold">✨ Haz clic en los nodos</span>
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative w-full bg-gradient-to-br from-gray-900 via-cosiaca-brown/90 to-black rounded-2xl overflow-hidden shadow-2xl"
                style={{ height: '600px', cursor: isDragging ? 'grabbing' : 'grab' }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleDragMove}
                onMouseLeave={handleMouseUp}
            >
                <svg className="absolute inset-0 w-full h-full">
                    <defs>
                        <radialGradient id="nodeGlow">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </radialGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
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
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth={2 * Math.min(pos1.scale, pos2.scale)}
                                strokeDasharray="5,5"
                            />
                        );
                    })}

                    {sortedPeriods.map((period, i) => {
                        const pos = getNodePosition(periods.indexOf(period), periods.length);
                        const isHovered = hoveredNode?.id === period.id;
                        const isSelected = selectedNode?.id === period.id;
                        const size = (isSelected ? 80 : isHovered ? 60 : 50) * pos.scale;

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
                                        r={size * 1.3}
                                        fill="url(#nodeGlow)"
                                        opacity="0.4"
                                        filter="url(#glow)"
                                    />
                                )}

                                <circle
                                    r={size}
                                    fill={`hsl(${(periods.indexOf(period) / periods.length) * 360}, 70%, 50%)`}
                                    stroke="white"
                                    strokeWidth={3 * pos.scale}
                                    filter={isSelected ? "url(#glow)" : "none"}
                                    className="transition-all duration-300"
                                />

                                <text
                                    textAnchor="middle"
                                    dy="0.35em"
                                    fill="white"
                                    fontSize={18 * pos.scale}
                                    fontWeight="bold"
                                    pointerEvents="none"
                                >
                                    {period.icon}
                                </text>

                                <text
                                    textAnchor="middle"
                                    y={size + 20 * pos.scale}
                                    fill="white"
                                    fontSize={12 * pos.scale}
                                    fontWeight="bold"
                                    pointerEvents="none"
                                >
                                    {period.year}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm">
                    <div className="font-bold">{periods.length} Nodos Temporales</div>
                    <div className="text-xs opacity-80">Zoom: {(zoom * 100).toFixed(0)}%</div>
                </div>
            </div>

            {selectedNode && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedNode(null)}
                >
                    <div
                        className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-cosiaca-beige/30 rounded-2xl border-2 border-cosiaca-brown/20 shadow-2xl animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`${selectedNode.color} p-6 text-white sticky top-0 z-10`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-5xl">{selectedNode.icon}</span>
                                    <div>
                                        <h3 className="text-4xl font-bold">{selectedNode.year}</h3>
                                        {selectedNode.date && (
                                            <p className="text-sm opacity-90">{selectedNode.date}</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedNode(null)}
                                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300 font-bold backdrop-blur-sm hover:scale-110"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <h4 className="text-2xl font-anton text-cosiaca-brown mb-4">{selectedNode.title}</h4>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <div className="flex items-center gap-2 bg-cosiaca-beige/40 px-3 py-2 rounded-lg text-sm">
                                    <span>👥</span>
                                    <span className="font-medium">{selectedNode.population}</span>
                                </div>
                                {selectedNode.keyFigure && (
                                    <div className="flex items-center gap-2 bg-cosiaca-beige/40 px-3 py-2 rounded-lg text-sm">
                                        <span>👤</span>
                                        <span className="font-medium text-cosiaca-brown/80">{selectedNode.keyFigure}</span>
                                    </div>
                                )}
                            </div>

                            <p className="text-base text-cosiaca-brown/80 leading-relaxed mb-4">
                                {selectedNode.description}
                            </p>

                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-cosiaca-cream/80 to-cosiaca-beige/50 p-5 rounded-xl border-l-4 border-cosiaca-red">
                                    <h5 className="font-bold text-cosiaca-brown mb-2 flex items-center gap-2">
                                        <span>💬</span> Cosiaca cuenta:
                                    </h5>
                                    <p className="text-sm text-cosiaca-brown italic leading-relaxed">{selectedNode.details}</p>
                                </div>

                                <div className="bg-white p-5 rounded-xl border border-cosiaca-brown/20">
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
                </div>
            )}
        </div>
    );
};

export default Timeline3D;
