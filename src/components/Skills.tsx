
import { Code2, Palette, Laptop, Users } from 'lucide-react';
import './Skills.css'

const Skills = () => {
  const skillsData = [
    {
      icon: <Code2 size={24} />,
      title: "Desarrollo Frontend",
      description: "Conocimientos sólidos en CSS, HTML, Bootstrap y JavaScript, con experiencia práctica en Flutter.",
      skills: ["HTML/CSS", "JavaScript", "React", "Flutter"]
    },
    {
      icon: <Palette size={24} />,
      title: "Diseño UI/UX",
      description: "Diseño responsivo y creación de interfaces atractivas y funcionales con enfoque en la experiencia del usuario.",
      skills: ["Diseño Responsivo", "Mobile First", "Prototipado", "UI Design"]
    },
    {
      icon: <Laptop size={24} />,
      title: "Optimización",
      description: "Experiencia en optimización para dispositivos móviles y mejores prácticas de desarrollo web.",
      skills: ["Performance", "SEO", "Cross-browser", "Mobile Optimization"]
    },
    {
      icon: <Users size={24} />,
      title: "Trabajo en Equipo",
      description: "Destacada habilidad para colaborar eficientemente en equipos de trabajo y control de versiones.",
      skills: ["Git/GitHub", "Metodologías Ágiles", "Comunicación", "Colaboración"]
    }
  ];

  return (
    <section id="sobre-mi" className="section skills-section">
      <div className="container">
        <h2 className="section-title">Sobre Mí</h2>
        <p className="skills-intro">
          Desarrollador Front-End con experiencia en la creación de experiencias web dinámicas y atractivas.
          Mi enfoque combina diseño estético con funcionalidad práctica.
        </p>
        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon-wrapper">
                {skill.icon}
              </div>
              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-description">{skill.description}</p>
              <div className="skill-tags">
                {skill.skills.map((tag, tagIndex) => (
                  <span key={tagIndex} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;