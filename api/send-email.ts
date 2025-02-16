import { VercelRequest, VercelResponse } from "@vercel/node";
import sgMail from "@sendgrid/mail";

// Configura la API Key de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async (req: VercelRequest, res: VercelResponse) => {
  // Configuración de CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permite cualquier origen
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS"); // Métodos permitidos
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Manejar preflight request (CORS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Solo permitir solicitudes POST
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Validar que todos los campos estén presentes
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "El email no es válido" });
    }

    // Configurar el mensaje para SendGrid
    const msg = {
      to: "alejandro.arafi@gmail.com", // Cambia esto por tu dirección de correo
      from: "alejandro.arafi@gmail.com", // Usa un email verificado en SendGrid
      subject: `Nuevo mensaje de ${name}`,
      text: message,
      html: `<p>${message}</p>`,
    };

    try {
      // Enviar el correo
      await sgMail.send(msg);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      return res.status(500).json({ error: "Error al enviar el mensaje" });
    }
  } else {
    // Método no permitido
    return res.status(405).json({ error: "Método no permitido" });
  }
};
