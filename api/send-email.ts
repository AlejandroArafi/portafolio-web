import { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, error: "Método no permitido" });
    }

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Faltan campos requeridos" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Formato de email inválido" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.VITE_EMAIL_USER as string,
        pass: process.env.VITE_EMAIL_PASS as string,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.VITE_EMAIL_USER as string,
      subject: `Nuevo mensaje de ${name}`,
      text: message,
      html: `<p>${message}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error completo:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido al enviar el mensaje";

    res.status(500).json({ success: false, error: errorMessage });
  }
}