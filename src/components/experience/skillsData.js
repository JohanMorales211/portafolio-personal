import java_logo from '../../assets/logos/java_logo.png';
import python_logo from '../../assets/logos/python_logo.png';
import git_logo from '../../assets/logos/git_logo.png';
import sql_logo from '../../assets/logos/sql_logo.png';
import docker_logo from '../../assets/logos/docker_logo.png';
import react_logo from '../../assets/logos/react_logo.png';
import angular_logo from '../../assets/logos/angular_logo.png';
import html_logo from '../../assets/logos/html_logo.png';
import css_logo from '../../assets/logos/css_logo.png';

export const expertiseData = {
  en: {
    sectionTitle: "My Specialization",
    cards: [
      {
        id: "backend-dev",
        icon: "FiServer",
        title: "Backend Development",
        subtitle: "Core Strength & Passion",
        description:
          "My primary focus and passion lies in building robust, scalable, and efficient server-side applications and APIs. I architect and develop the foundational logic that powers complex systems, ensuring optimal performance and reliability. My toolkit includes:",
        specificSkills: [
          { name: "Java", logo: java_logo },
          { name: "Python", logo: python_logo },
          { name: "Git", logo: git_logo },
          { name: "SQL", logo: sql_logo },
          { name: "Docker", logo: docker_logo }
        ],
        accentColor: "var(--color-accent-blue)",
      },
      {
        id: "frontend-dev",
        icon: "FaReact",
        title: "Frontend Development",
        subtitle: "Crafting Engaging User Experiences",
        description:
          "While my core is backend, I thoroughly enjoy and am proficient in frontend development, creating intuitive and responsive user interfaces. I often work with modern JavaScript frameworks to bring applications to life. Key skills:",
        specificSkills: [
          { name: "React", logo: react_logo },
          { name: "Angular", logo: angular_logo },
          { name: "HTML", logo: html_logo },
          { name: "CSS", logo: css_logo }
        ],
        accentColor: "var(--color-accent-pink)",
      },
    ],
    backToTop: "Back to Top"
  },
  es: {
    sectionTitle: "Mi Especialización",
    cards: [
      {
        id: "backend-dev",
        icon: "FiServer",
        title: "Desarrollo Backend",
        subtitle: "Mi Principal Fortaleza y Pasión",
        description:
          "Mi enfoque y pasión principal radican en construir aplicaciones y APIs del lado del servidor que sean robustas, escalables y eficientes. Diseño y desarrollo la lógica fundamental que impulsa sistemas complejos, asegurando un rendimiento y fiabilidad óptimos. Mi conjunto de herramientas incluye:",
        specificSkills: [
          { name: "Java", logo: java_logo },
          { name: "Python", logo: python_logo },
          { name: "Git", logo: git_logo },
          { name: "SQL", logo: sql_logo },
          { name: "Docker", logo: docker_logo }
        ],
        accentColor: "var(--color-accent-blue)",
      },
      {
        id: "frontend-dev",
        icon: "FaReact",
        title: "Desarrollo Frontend",
        subtitle: "Creando Experiencias de Usuario Atractivas",
        description:
          "Aunque mi núcleo es el backend, disfruto mucho y soy competente en el desarrollo frontend, creando interfaces de usuario intuitivas y responsivas. A menudo trabajo con frameworks JavaScript modernos para dar vida a las aplicaciones. Habilidades clave:",
        specificSkills: [
          { name: "React", logo: react_logo },
          { name: "Angular", logo: angular_logo },
          { name: "HTML", logo: html_logo },
          { name: "CSS", logo: css_logo }
        ],
        accentColor: "var(--color-accent-pink)",
      },
    ],
    backToTop: "Volver Arriba"
  },
};