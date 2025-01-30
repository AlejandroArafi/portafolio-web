import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Evita que el evento se propague y cierre el menú inmediatamente
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenuOnClickOutside = (e: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  // Solo añadir el event listener cuando el menú esté abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", closeMenuOnClickOutside);
    } else {
      document.removeEventListener("click", closeMenuOnClickOutside);
    }

    return () => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, [isMenuOpen]);

  // Manejar el efecto de scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 750);/*eran 50 inicialmente*/
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <h3 className="logo">Alejandro Figueroa</h3>

        {/* Botón menú hamburguesa */}
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation */}
        <nav ref={navRef} className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <a
            href="#inicio"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </a>
          <a
            href="#sobre-mi"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Sobre mí
          </a>
          <a
            href="#proyectos"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Proyectos
          </a>
          <a
            href="#contacto"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
