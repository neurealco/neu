import nodemailer from "nodemailer";
import config from "../config";

// Verificar que las variables SMTP existen
if (!config.SMTP_HOST || !config.SMTP_USER || !config.SMTP_PASSWORD) {
  throw new Error("SMTP configuration is missing");
}

export const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_PORT === 465, // true para 465, false para otros puertos
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: config.NODE_ENV === "production" // Solo en desarrollo aceptar certificados autofirmados
  }
});

export const passwordResetTemplate = (token: string) => {
  const resetUrl = `${config.SITE_URL}/reset-password?token=${token}`;
  
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Restablecer contraseña</title>
    <style>
      body { 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f5f7fa;
        margin: 0;
        padding: 0;
      }
      .container { 
        max-width: 600px; 
        margin: 30px auto; 
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
      }
      .header { 
        background: linear-gradient(135deg, #6366f1, #4f46e5);
        color: white; 
        padding: 30px 20px; 
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content { 
        padding: 30px; 
      }
      .button { 
        display: inline-block; 
        padding: 14px 28px; 
        background: linear-gradient(135deg, #6366f1, #4f46e5);
        color: white; 
        text-decoration: none; 
        border-radius: 8px; 
        font-weight: 600;
        font-size: 16px;
        margin: 25px 0;
        text-align: center;
        box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
        transition: all 0.3s;
      }
      .button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 10px rgba(99, 102, 241, 0.4);
      }
      .footer { 
        text-align: center; 
        color: #6b7280; 
        font-size: 12px; 
        padding: 20px;
        border-top: 1px solid #e5e7eb;
      }
      .code-block {
        background: #f3f4f6;
        border: 1px dashed #d1d5db;
        padding: 15px;
        border-radius: 6px;
        margin: 20px 0;
        word-break: break-all;
        font-family: monospace;
      }
      .note {
        background: #f0fdf4;
        border-left: 4px solid #10b981;
        padding: 12px;
        margin: 20px 0;
        border-radius: 0 4px 4px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Restablecer contraseña</h1>
      </div>
      <div class="content">
        <p>Hola,</p>
        <p>Recibimos una solicitud para restablecer tu contraseña en Neureal. Por favor, haz clic en el siguiente botón para continuar:</p>
        
        <div style="text-align: center;">
          <a href="${resetUrl}" class="button">
            Restablecer contraseña
          </a>
        </div>
        
        <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
        <div class="code-block">${resetUrl}</div>
        
        <div class="note">
          <strong>Nota importante:</strong> Este enlace expirará en 1 hora por motivos de seguridad.
        </div>
        
        <p>Si no solicitaste este cambio, puedes ignorar este mensaje. Tu cuenta está segura.</p>
        <p>Atentamente,<br>El equipo de Neureal</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Neureal. Todos los derechos reservados.</p>
        <p>Este es un mensaje automático, por favor no respondas directamente a este correo.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

// Función para probar la conexión SMTP
export const testSMTPConnection = async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP connection verified");
    return true;
  } catch (error) {
    console.error("❌ SMTP connection failed:", error);
    return false;
  }
};