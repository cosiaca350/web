# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Cosiaca 350 - Pagos en Colombia

Este proyecto incluye integración de pagos adaptada para Colombia:

### Métodos de Pago Disponibles:

1. **PayPal** (Recomendado)
   - Acepta tarjetas de crédito y débito colombianas
   - Procesamiento seguro internacional
   - Configuración: Agregar tu `PAYPAL_CLIENT_ID` en el componente Pagos

2. **MercadoPago**
   - Para usuarios con cuentas de MercadoPago
   - Requiere configuración con tu cuenta de MercadoPago

3. **PSE** (Próximamente)
   - Integración con ePayco o Wompi
   - Pago directo desde cuentas bancarias colombianas

4. **Transferencia Bancaria**
   - Contacto directo para datos bancarios
   - Confirmación manual de pagos

### Configuración Requerida:

1. **PayPal:**
   ```javascript
   // En src/components/Pagos.jsx, línea 45
   "client-id": "TU_PAYPAL_CLIENT_ID_AQUI"
   ```

2. **MercadoPago:**
   - Instalar SDK: `npm install mercadopago`
   - Configurar con tu Access Token

### Próximos Pasos:
- Implementar webhook para confirmación de pagos
- Integrar base de datos para gestión de usuarios premium
- Añadir sistema de autenticación para contenido exclusivo