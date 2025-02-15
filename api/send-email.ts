import { VercelRequest, VercelResponse } from "@vercel/node";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string); // Asegúrate de tener la variable de entorno configurada

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const msg = {
      to: "tu_correo@dominio.com", // Cambia esto por tu dirección de correo
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
    res.status(405).json({ error: "Método no permitido" });
  }
};
