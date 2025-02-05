import { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar headers
  res.setHeader("Content-Type", "application/json");

  try {
    // Validar método HTTP
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ success: false, error: "Método no permitido" });
    }

    // Validar campos del body
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, error: "Faltan campos requeridos" });
    }

    // Validar formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Formato de email inválido" });
    }

    // Configurar transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
      },
    });

    // Configurar el correo
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER as string,
      subject: `Nuevo mensaje de ${name}`,
      text: message,
      html: `<p>${message}</p>`,
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);

    // Respuesta exitosa
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error completo:", error);

    // Manejo seguro de errores
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido al enviar el mensaje";

    // Respuesta de error en JSON
    res.status(500).json({ success: false, error: errorMessage });
  }
}
