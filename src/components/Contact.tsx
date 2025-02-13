import { Github, Linkedin, Mail } from "lucide-react";
import "./Contact.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Por favor ingresa un email válido");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.DEV
        ? "http://localhost:3000/api/send-email" // Para desarrollo local
        : "https://portafolio-pink-xi.vercel.app/api/send-email"; // Para producción en Vercel

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Verificar si la respuesta es JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(text || "Error en la solicitud");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error en la solicitud");
      }

      if (result.success) {
        toast.success("Mensaje enviado correctamente");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error completo:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "No se pudo conectar al servidor. Inténtalo de nuevo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contacto" className="section">
      <div className="container">
        <Toaster position="top-right" reverseOrder={false} />
        <h2 className="section-title">Contacto</h2>

        <div className="contact-form">
          <div className="social-links">
            <a
              href="https://github.com/AlejandroArafi"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/alejandroarafi/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="#contacto"
              className="social-link"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "mailto:alejandro.arafi@gmail.com";
              }}
            >
              <Mail size={28} />
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              aria-label="Nombre"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              aria-label="Email"
            />
            <textarea
              name="message"
              placeholder="Mensaje"
              rows={5}
              className="form-input"
              value={formData.message}
              onChange={handleChange}
              disabled={isLoading}
              aria-label="Mensaje"
              maxLength={1000}
            ></textarea>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
