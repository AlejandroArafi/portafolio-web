import { VercelRequest, VercelResponse } from "@vercel/node";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permite cualquier origen
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS"); // Métodos permitidos
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Manejar preflight request (CORS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const msg = {
      to: "alejandro.arafi@gmail.com", // Cambia esto por tu dirección de correo
      from: email,
      subject: `Nuevo mensaje de ${name}`,
      text: message,
      html: `<p>${message}</p>`,
    };

    try {
      await sgMail.send(msg);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al enviar el mensaje" });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
};
