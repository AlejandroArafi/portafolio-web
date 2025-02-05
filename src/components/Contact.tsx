import { Github, Linkedin, Mail } from "lucide-react";
import "./Contact.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  // Estado para los valores del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Validar que todos los campos estén llenos
    if (name === "" || email === "" || message === "") {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      // Enviar los datos al backend
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Manejar la respuesta del backend
      if (result.success) {
        toast.success("Mensaje enviado correctamente");
        // Resetear el formulario
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        toast.error("Hubo un error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un error al enviar el mensaje");
    }
  };

  return (
    <section id="contacto" className="section">
      <div className="container">
        {/* Componente Toaster para mostrar notificaciones */}
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
            <a href="#" className="social-link">
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
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Mensaje"
              rows={5}
              className="form-input"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
