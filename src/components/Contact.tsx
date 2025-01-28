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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (name === "" || email === "" || message === "") {
      alert("Todos los campos son obligatorios");
    } else {
      toast.success("Mensaje enviado correctamente");

      //se resetea el formulario
      setFormData({
        name: "",
        email: "",
        message: "",
      });
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
            >
              <Github size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/alejandroarafi/"
              className="social-link"
              target="_blank"
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

            <button className="btn btn-primary" style={{ width: "100%" }}>
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
