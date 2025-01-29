import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección de redes sociales */}
        <div className="footer-social">
          <a
            href="https://github.com/alejandroarafi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={24} className="social-icon" />
          </a>
          <a
            href="https://linkedin.com/in/alejandroarafi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} className="social-icon" />
          </a>
          <a
            href="mailto:alejandro.arafi@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <Mail size={24} className="social-icon" />
          </a>
        
        </div>

        {/* Texto del footer */}
        <div className="footer-text">
          <p>
            Hecho con ❤️ por{" "}
            <span className="footer-name">Alejandro Figueroa</span>
          </p>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
