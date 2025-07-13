export const helpArticles = {
  "getting-started": {
    title: "Getting Started",
    content: `
          <h2>Bienvenido a Neureal</h2>
          <p>Estos son los primeros pasos para comenzar tu viaje con Neureal.</p>
          <ol>
            <li>Crea tu cuenta en la página de signup.</li>
            <li>Verifica tu correo electrónico.</li>
            <li>Conecta tu primer perfil de redes sociales.</li>
            <li>Ejecuta <code>npm install neureal-sdk</code> en tu proyecto.</li>
          </ol>
        `,
  },
  "another-article": {
    title: "Otro artículo",
    content: `<p>Este es un contenido de ejemplo para otro artículo de ayuda.</p>`,
  },
  "api-integration": {
    title: "Integración API",
    content: `
        <h2>Configuración Inicial</h2>
        <ol>
          <li>Instala el SDK: <code>npm install neureal-sdk</code></li>
          <li>Importa el módulo en tu proyecto</li>
          <li>Configura las credenciales de autenticación</li>
        </ol>
  
        <h2>Tabla de Endpoints</h2>
        <table>
          <thead>
            <tr>
              <th>Método</th>
              <th>Endpoint</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GET</td>
              <td><code>/api/v1/users</code></td>
              <td>Obtener lista de usuarios</td>
            </tr>
            <tr>
              <td>POST</td>
              <td><code>/api/v1/analytics</code></td>
              <td>Enviar datos analíticos</td>
            </tr>
          </tbody>
        </table>
  
        <h2>Solución de Problemas</h2>
        <ol>
          <li>Verifica las credenciales API</li>
          <li>Revisa los logs de error</li>
          <li>Actualiza a la última versión del SDK</li>
        </ol>
      `,
  },
  pricing: {
    title: "Pricing Plans",
    content: `
        <h2>Our Plans</h2>
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Price</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Free Plan</strong></td>
              <td>$0</td>
              <td>Up to 20 minutes of usage per month</td>
            </tr>
            <tr>
              <td><strong>Paid Plan</strong></td>
              <td>$10 upfront + $5 monthly</td>
              <td>Upfront payment covers first 2 months; then $5 monthly subscription for continued access</td>
            </tr>
          </tbody>
        </table>
        <p>Both of the plans have all functions but different durations and prices</p>
        <p><strong>Note:</strong> All payments are non-refundable due to the nature of our digital services. You can cancel your subscription anytime; access remains active until the end of the billing period.</p>
      `,
  },

  "refund-policy": {
    title: "Refund Policy",
    content: `
      <h2>Refund Policy</h2>
      <p>We do not offer refunds for any payments made, as all our services are digital and delivered instantly. However, cancellations are accepted within the same month of subscription. If you cancel within your current billing month, you will not be charged for future months, but no refunds will be issued for payments already made.</p>
    `,
  },
};
