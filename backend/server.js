// Importar dependencias
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config(); // Para cargar variables de entorno

// Crear una instancia de Express
const app = express();
const PORT = process.env.PORT || 3001; // Puerto del servidor

// Middleware para permitir CORS y parsear JSON
app.use(cors());
app.use(express.json());

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Puedes usar otro servicio como Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // Correo electrónico (usando variables de entorno)
    pass: process.env.EMAIL_PASS, // Contraseña (usando variables de entorno)
  },
});

// Ruta para manejar el envío de correos
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Configurar el correo electrónico
  const mailOptions = {
    from: email, // Correo del remitente
    to: process.env.EMAIL_USER, // Correo del destinatario (puede ser el mismo que el del remitente)
    subject: `Nuevo mensaje de ${name}`, // Asunto del correo
    text: message, // Cuerpo del mensaje
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // Si hay un error, devolver un mensaje de error
      return res.status(500).json({ success: false, error: error.toString() });
    }
    // Si el correo se envía correctamente, devolver un mensaje de éxito
    res
      .status(200)
      .json({ success: true, message: "Mensaje enviado: " + info.response });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
