import React, { useState, useEffect } from 'react';
import AIService from '../services/aiService';

const AIProviderSelector = () => {
    const [providers, setProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState('gemini');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const loadProviders = async () => {
            try {
                const status = AIService.getProvidersStatus();
                setProviders(status);
                
                // Test connection on load
                const connectionTest = await AIService.testConnection();
                console.log('AI Service connection test:', connectionTest);
            } catch (error) {
                console.error('Error loading providers:', error);
                setProviders([{ name: 'gemini', active: true, current: true }]);
            }
        };
        
        loadProviders();
    }, []);

    const handleProviderChange = (provider) => {
        try {
            AIService.setPreferredProvider(provider);
            setSelectedProvider(provider);
            setProviders(AIService.getProvidersStatus());
            setIsOpen(false);
        } catch (error) {
            console.error('Error changing provider:', error);
        }
    };

    const getProviderIcon = (provider) => {
        const icons = {
            gemini: '🤖',
            openai: '🧠',
            claude: '🎭',
            custom: '⚡'
        };
        return icons[provider] || '🤖';
    };

    const getProviderName = (provider) => {
        const names = {
            gemini: 'Gemini Pro',
            openai: 'OpenAI GPT',
            claude: 'Claude AI',
            custom: 'Enhanced AI'
        };
        return names[provider] || provider;
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 bg-cosiaca-beige hover:bg-cosiaca-beige/70 text-cosiaca-brown px-4 py-2 rounded-lg border border-cosiaca-brown/20 transition-all duration-300"
                title="Seleccionar proveedor de IA"
            >
                <span className="text-lg">{getProviderIcon(selectedProvider)}</span>
                <span className="text-sm font-medium">{getProviderName(selectedProvider)}</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-cosiaca-beige z-50">
                    <div className="py-2">
                        <div className="px-4 py-2 text-xs font-bold text-cosiaca-brown/60 uppercase tracking-wide border-b border-cosiaca-beige">
                            Proveedores de IA
                        </div>
                        {providers.map((provider) => (
                            <button
                                key={provider.name}
                                onClick={() => handleProviderChange(provider.name)}
                                disabled={!provider.active}
                                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-cosiaca-beige/50 transition-colors ${
                                    provider.current ? 'bg-cosiaca-red/10 text-cosiaca-red' : 'text-cosiaca-brown'
                                } ${!provider.active ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <span className="text-lg">{getProviderIcon(provider.name)}</span>
                                <div className="flex-1">
                                    <div className="font-medium">{getProviderName(provider.name)}</div>
                                    <div className="text-xs text-cosiaca-brown/60">
                                        {provider.active ? 'Disponible' : 'No disponible'}
                                    </div>
                                </div>
                                {provider.current && (
                                    <div className="w-2 h-2 bg-cosiaca-red rounded-full"></div>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="px-4 py-2 text-xs text-cosiaca-brown/60 border-t border-cosiaca-beige">
                        El sistema usa fallback automático si falla el proveedor seleccionado
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIProviderSelector;