import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Pagos = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    const plans = [
        {
            id: 'basico',
            name: 'Acceso Básico',
            price: 15000,
            priceUSD: 4,
            description: 'Acceso a contenido básico de Cosiaca 350',
            features: [
                'Videos históricos con IA',
                'Trivia interactiva',
                'Acceso a trovas y chistes',
                'Contenido básico del proyecto'
            ]
        },
        {
            id: 'premium',
            name: 'Experiencia Premium',
            price: 35000,
            priceUSD: 9,
            description: 'Experiencia completa de Cosiaca 350',
            features: [
                'Todo el contenido básico',
                'Chat exclusivo con CosiacaBot',
                'Contenido histórico exclusivo',
                'Acceso anticipado a nuevos videos',
                'Certificado digital de participación'
            ],
            popular: true
        },
        {
            id: 'coleccionista',
            name: 'Coleccionista Paisa',
            price: 75000,
            priceUSD: 20,
            description: 'Para los verdaderos amantes de la historia paisa',
            features: [
                'Todo el contenido premium',
                'Libro digital "País de Cosiacas"',
                'Sesión virtual con el equipo',
                'Merchandising digital exclusivo',
                'Mención en créditos del proyecto'
            ]
        }
    ];

    const paypalOptions = {
        "client-id": "YOUR_PAYPAL_CLIENT_ID", // Reemplazar con tu Client ID de PayPal
        currency: "USD",
        intent: "capture"
    };

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setShowPayment(true);
    };

    const createPayPalOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: selectedPlan.priceUSD.toString(),
                    currency_code: "USD"
                },
                description: `Cosiaca 350 - ${selectedPlan.name}`
            }]
        });
    };

    const onPayPalApprove = async (data, actions) => {
        try {
            const details = await actions.order.capture();
            alert(`¡Pago exitoso! Gracias ${details.payer.name.given_name} por apoyar Cosiaca 350`);
            // Aquí implementarías la lógica para activar el acceso del usuario
            setShowPayment(false);
            setSelectedPlan(null);
        } catch (error) {
            console.error('Error en el pago:', error);
            alert('Hubo un error procesando el pago. Por favor intenta de nuevo.');
        }
    };

    const handleMercadoPagoPayment = () => {
        // Implementación básica para MercadoPago
        alert('Redirigiendo a MercadoPago... (Implementación pendiente con tu cuenta de MercadoPago)');
    };

    const handlePSEPayment = () => {
        alert('Próximamente: Pago con PSE a través de ePayco o Wompi');
    };

    if (showPayment && selectedPlan) {
        return (
            <div className="animate-fade-in max-w-2xl mx-auto bg-stone-900 rounded-xl shadow-2xl p-8">
                <button 
                    onClick={() => setShowPayment(false)}
                    className="mb-6 text-yellow-400 hover:text-yellow-300 flex items-center"
                >
                    ← Volver a planes
                </button>
                
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                        {selectedPlan.name}
                    </h2>
                    <p className="text-gray-300 mb-4">{selectedPlan.description}</p>
                    <div className="text-4xl font-bold text-white mb-2">
                        ${selectedPlan.price.toLocaleString()} COP
                    </div>
                    <div className="text-lg text-gray-400">
                        (${selectedPlan.priceUSD} USD)
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-stone-800 p-6 rounded-lg border border-stone-700">
                        <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center">
                            💳 PayPal (Recomendado)
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Paga de forma segura con PayPal. Acepta tarjetas de crédito y débito colombianas.
                        </p>
                        <PayPalScriptProvider options={paypalOptions}>
                            <PayPalButtons
                                createOrder={createPayPalOrder}
                                onApprove={onPayPalApprove}
                                onError={(err) => {
                                    console.error('Error de PayPal:', err);
                                    alert('Error en el pago. Por favor intenta de nuevo.');
                                }}
                                style={{
                                    layout: 'vertical',
                                    color: 'gold',
                                    shape: 'rect',
                                    label: 'paypal'
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>

                    <div className="bg-stone-800 p-6 rounded-lg border border-stone-700">
                        <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center">
                            🇦🇷 MercadoPago
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Disponible para usuarios con cuentas de MercadoPago.
                        </p>
                        <button
                            onClick={handleMercadoPagoPayment}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            Pagar con MercadoPago
                        </button>
                    </div>

                    <div className="bg-stone-800 p-6 rounded-lg border border-stone-700">
                        <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center">
                            🏦 PSE (Próximamente)
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Pago directo desde tu cuenta bancaria colombiana.
                        </p>
                        <button
                            onClick={handlePSEPayment}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            Pagar con PSE
                        </button>
                    </div>

                    <div className="bg-stone-800 p-6 rounded-lg border border-stone-700">
                        <h3 className="text-xl font-bold text-yellow-300 mb-4">
                            📧 Transferencia Bancaria
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Para pagos por transferencia bancaria, contáctanos:
                        </p>
                        <div className="space-y-2 text-gray-200">
                            <p><strong>Email:</strong> cosiaca350@gmail.com</p>
                            <p><strong>WhatsApp:</strong> +57 300 123 4567</p>
                            <p className="text-sm text-gray-400">
                                Te enviaremos los datos bancarios y confirmaremos tu pago en 24 horas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in max-w-6xl mx-auto text-gray-300 space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-yellow-400">
                    💰 Apoya el Proyecto Cosiaca 350
                </h1>
                <p className="text-xl mt-2 text-gray-400">
                    Contribuye al rescate de la historia paisa y accede a contenido exclusivo
                </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div 
                        key={plan.id}
                        className={`relative bg-stone-800 rounded-xl p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                            plan.popular 
                                ? 'border-yellow-400 shadow-yellow-400/20' 
                                : 'border-stone-700 hover:border-yellow-400/50'
                        }`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                                    Más Popular
                                </span>
                            </div>
                        )}
                        
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-yellow-300 mb-2">
                                {plan.name}
                            </h3>
                            <div className="text-3xl font-bold text-white mb-2">
                                ${plan.price.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-400 mb-4">
                                COP (${plan.priceUSD} USD)
                            </div>
                            <p className="text-gray-300">{plan.description}</p>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-yellow-400 mr-2">✓</span>
                                    <span className="text-gray-200">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handlePlanSelect(plan)}
                            className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 ${
                                plan.popular
                                    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg'
                                    : 'bg-stone-700 text-yellow-200 hover:bg-stone-600 border border-yellow-400/50'
                            }`}
                        >
                            Seleccionar Plan
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-stone-800 p-8 rounded-xl border border-stone-700">
                <h2 className="text-2xl font-bold text-yellow-300 mb-4 text-center">
                    🔒 Métodos de Pago Disponibles en Colombia
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div className="space-y-2">
                        <div className="text-3xl">💳</div>
                        <h3 className="font-bold text-yellow-200">PayPal</h3>
                        <p className="text-sm text-gray-400">Tarjetas de crédito y débito</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl">🇦🇷</div>
                        <h3 className="font-bold text-yellow-200">MercadoPago</h3>
                        <p className="text-sm text-gray-400">Para usuarios registrados</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl">🏦</div>
                        <h3 className="font-bold text-yellow-200">PSE</h3>
                        <p className="text-sm text-gray-400">Próximamente</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl">📧</div>
                        <h3 className="font-bold text-yellow-200">Transferencia</h3>
                        <p className="text-sm text-gray-400">Contacto directo</p>
                    </div>
                </div>
            </div>

            <div className="text-center bg-stone-800/50 p-6 rounded-lg">
                <p className="text-gray-300 mb-4">
                    <strong>¿Tienes dudas sobre los pagos?</strong>
                </p>
                <p className="text-gray-400">
                    Contáctanos en <a href="mailto:cosiaca350@gmail.com" className="text-yellow-400 hover:text-yellow-300">cosiaca350@gmail.com</a> 
                    {' '}o a través de nuestras redes sociales. Estamos aquí para ayudarte.
                </p>
            </div>
        </div>
    );
};

export default Pagos;