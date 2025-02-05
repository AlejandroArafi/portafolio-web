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

    // Configurar transporte
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
      },
    });

    // Enviar email
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER as string,
      subject: `Nuevo mensaje de ${name}`,
      text: message,
      html: `<p>${message}</p>`,
    });

    // Respuesta exitosa
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error completo:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}
