import { ExternalLink } from "lucide-react";
import "./Projects.css";

const projects = [
  {
    title: "Molino 1925",
    description: "Sitio web corporativo con diseño elegante y moderno",
    image: "/assets/images/cafeteria.png",
    url: "https://molino1925.vercel.app/",
    technologies: ["React", "Jsx", "Tailwind"],
  },
  {
    title: "E-commerce",
    description:
      "Tienda en línea completa con carrito de compras y proceso de pago",
    image: "/assets/images/ecommerce-app.png",
    url: "https://e-commerce-2-six.vercel.app/",
    technologies: ["React", "CSS", "Node"],
  },
  {
    title: "Volver a Creer",
    description:
      "Plataforma comunitaria con enfoque social y herramientas de interacción",
    image: "/assets/images/comunidad.png",
    url: "https://comunidad-volver-a-creer.vercel.app/",
    technologies: ["Astro", "CSS", "React"],
  },
  {
    title: "Weather App",
    description:
      "Aplicación del clima con datos en tiempo real y diseño responsive",
    image: "/assets/images/weather-app.png",
    url: "https://wheater-app-khaki.vercel.app/",
    technologies: ["HTML", "CSS", "React"],
  },
  {
    title: "Centro Médico",
    description: "Portal médico con sistema de citas y servicios destacados",
    image: "/assets/images/centro-medico.png",
    url: "https://centro-medico-beryl.vercel.app/",
    technologies: ["HTML", "CSS", "Tailwind"],
  },
  {
    title: "Restaurante",
    description: "Showcase de proyectos y habilidades con diseño minimalista",
    image: "/assets/images/restaurante.png",
    url: "https://papaya-zabaione-3412c9.netlify.app/",
    technologies: ["React", "CSS", "Express"],
  },
];

const Projects = () => {
  return (
    <section id="proyectos" className="section projects-section">
      <div className="container">
        <h2 className="section-title">Mis Proyectos</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Ver Proyecto <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
