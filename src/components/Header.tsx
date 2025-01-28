import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Importa íconos de menú y cerrar
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <h3 className="logo">Alejandro Figueroa</h3>

        {/* Menú hamburguesa (solo en móviles) */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <a href="#inicio" className="nav-link" onClick={toggleMenu}>
            Inicio
          </a>
          <a href="#sobre-mi" className="nav-link" onClick={toggleMenu}>
            Sobre mí
          </a>
          <a href="#proyectos" className="nav-link" onClick={toggleMenu}>
            Proyectos
          </a>
          <a href="#contacto" className="nav-link" onClick={toggleMenu}>
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
