import React, { useState, useEffect } from 'react';

const AccessibilityControls = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState('normal');
    const [highContrast, setHighContrast] = useState(false);
    const [screenReader, setScreenReader] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Dark mode toggle
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Font size adjustment
    useEffect(() => {
        const root = document.documentElement;
        switch (fontSize) {
            case 'small':
                root.style.fontSize = '14px';
                break;
            case 'large':
                root.style.fontSize = '18px';
                break;
            case 'xl':
                root.style.fontSize = '22px';
                break;
            default:
                root.style.fontSize = '16px';
        }
    }, [fontSize]);

    // High contrast mode
    useEffect(() => {
        if (highContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
    }, [highContrast]);

    // Screen reader announcements
    const announceToScreenReader = (message) => {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    };

    // Text-to-speech functionality
    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';
            utterance.rate = 0.8;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Read page content
    const readPageContent = () => {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            const textContent = mainContent.innerText;
            const introduction = "Bienvenido a Cosiaca 350, un viaje inmersivo a la historia de Medellín. ";
            speakText(introduction + textContent);
            announceToScreenReader("Iniciando lectura de la página");
        }
    };

    // Stop reading
    const stopReading = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            announceToScreenReader("Lectura detenida");
        }
    };

    return (
        <>
            {/* Accessibility Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 bg-cosiaca-enfasis dark:bg-cosiaca-enfasis text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Abrir panel de accesibilidad"
                title="Opciones de accesibilidad"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
            </button>

            {/* Accessibility Panel */}
            {isOpen && (
                <div className="fixed top-16 right-4 z-40 bg-white dark:bg-cosiaca-brown-dark border border-cosiaca-beige dark:border-cosiaca-brown-medium rounded-xl shadow-2xl p-6 w-80 max-w-[90vw]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-cosiaca-brown dark:text-cosiaca-cream">
                            🔧 Accesibilidad
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-cosiaca-brown dark:text-cosiaca-cream hover:text-cosiaca-enfasis transition-colors"
                            aria-label="Cerrar panel"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Dark Mode Toggle */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-cosiaca-brown dark:text-cosiaca-cream">
                                🌙 Modo Oscuro
                            </label>
                            <button
                                onClick={() => {
                                    setDarkMode(!darkMode);
                                    announceToScreenReader(darkMode ? "Modo claro activado" : "Modo oscuro activado");
                                }}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    darkMode ? 'bg-cosiaca-enfasis' : 'bg-gray-300'
                                }`}
                                aria-label={darkMode ? "Desactivar modo oscuro" : "Activar modo oscuro"}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        darkMode ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Font Size */}
                        <div>
                            <label className="text-sm font-medium text-cosiaca-brown dark:text-cosiaca-cream mb-2 block">
                                📝 Tamaño de Texto
                            </label>
                            <div className="grid grid-cols-4 gap-1">
                                {['small', 'normal', 'large', 'xl'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => {
                                            setFontSize(size);
                                            announceToScreenReader(`Tamaño de texto ${size === 'small' ? 'pequeño' : size === 'normal' ? 'normal' : size === 'large' ? 'grande' : 'extra grande'} activado`);
                                        }}
                                        className={`px-2 py-1 text-xs rounded transition-colors ${
                                            fontSize === size
                                                ? 'bg-cosiaca-enfasis text-white'
                                                : 'bg-cosiaca-beige dark:bg-cosiaca-brown-medium text-cosiaca-brown dark:text-cosiaca-cream hover:bg-cosiaca-enfasis/20'
                                        }`}
                                        aria-label={`Tamaño ${size}`}
                                    >
                                        {size === 'small' ? 'A' : size === 'normal' ? 'A' : size === 'large' ? 'A' : 'A'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* High Contrast */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-cosiaca-brown dark:text-cosiaca-cream">
                                🎨 Alto Contraste
                            </label>
                            <button
                                onClick={() => {
                                    setHighContrast(!highContrast);
                                    announceToScreenReader(highContrast ? "Alto contraste desactivado" : "Alto contraste activado");
                                }}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    highContrast ? 'bg-cosiaca-enfasis' : 'bg-gray-300'
                                }`}
                                aria-label={highContrast ? "Desactivar alto contraste" : "Activar alto contraste"}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        highContrast ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Screen Reader Controls */}
                        <div className="border-t border-cosiaca-beige dark:border-cosiaca-brown-medium pt-4">
                            <h4 className="text-sm font-medium text-cosiaca-brown dark:text-cosiaca-cream mb-3">
                                🔊 Lectura por Voz
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={readPageContent}
                                    className="bg-cosiaca-green text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-cosiaca-green-dark transition-colors"
                                    aria-label="Leer contenido de la página"
                                >
                                    ▶️ Leer Página
                                </button>
                                <button
                                    onClick={stopReading}
                                    className="bg-cosiaca-enfasis text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-cosiaca-enfasis transition-colors"
                                    aria-label="Detener lectura"
                                >
                                    ⏹️ Detener
                                </button>
                            </div>
                        </div>

                        {/* Keyboard Navigation Help */}
                        <div className="border-t border-cosiaca-beige dark:border-cosiaca-brown-medium pt-4">
                            <details className="text-sm">
                                <summary className="font-medium text-cosiaca-brown dark:text-cosiaca-cream cursor-pointer hover:text-cosiaca-enfasis">
                                    ⌨️ Atajos de Teclado
                                </summary>
                                <div className="mt-2 text-xs text-cosiaca-brown/70 dark:text-cosiaca-cream/70 space-y-1">
                                    <div><kbd className="bg-cosiaca-beige dark:bg-cosiaca-brown-medium px-1 rounded">Tab</kbd> - Navegar elementos</div>
                                    <div><kbd className="bg-cosiaca-beige dark:bg-cosiaca-brown-medium px-1 rounded">Enter</kbd> - Activar botón</div>
                                    <div><kbd className="bg-cosiaca-beige dark:bg-cosiaca-brown-medium px-1 rounded">Esc</kbd> - Cerrar menús</div>
                                    <div><kbd className="bg-cosiaca-beige dark:bg-cosiaca-brown-medium px-1 rounded">Alt + A</kbd> - Abrir accesibilidad</div>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            )}

            {/* Screen Reader Only Content */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                {screenReader && "Panel de accesibilidad abierto"}
            </div>
        </>
    );
};

export default AccessibilityControls;