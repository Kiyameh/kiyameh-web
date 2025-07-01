import {
  SiAstro,
  SiCloudinary,
  SiCss,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLeaflet,
  SiLinux,
  SiMarkdown,
  SiMongodb,
  SiMui,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPostgresql,
  SiRadixui,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
} from '@icons-pack/react-simple-icons'
import {BookOpen, Brain, Linkedin, MessageSquare, User} from 'lucide-react'
import type {Content} from 'react-resume-kit'

export const suportedLanguages = ['en', 'es'] as const

export type Language = (typeof suportedLanguages)[number]

export const content: Content = {
  en: {
    // Section names:
    about_title: 'About Me',
    works_title: 'Experience',
    courses_title: 'Education',
    techs_title: 'Technologies',
    soft_skills_title: 'Soft Skills',
    soft_skills_subtitle: 'Highlights',
    projects_title: 'Projects',
    projects_subtitle: 'Features',
    connect_title: 'Contact',

    // Download button text
    download_pdf: 'Download PDF',

    // Language switcher text
    switcher_text: 'Language',
    language_labels: [
      {label: 'English', value: 'en'},
      {label: 'Spanish', value: 'es'},
    ],

    // Header
    name: 'Andoni Gallardo Izcue',
    title: 'Web Developer',
    email: 'kiyameh@outlook.com',
    phone: '+34 646 84 99 19',
    location: 'Navarra, ES',
    picture: '/me.jpg',

    // About
    about_text:
      'Web-oriented software developer. Skilled in modern JavaScript frameworks, software deployment, and version control. Particularly interested in interface design, human interaction, and creating satisfying user experiences. Committed to open-source software, sustainable coding practices, and user-centered design methodologies.',

    // Experience
    works: [
      {
        title: 'Freelance Developer',
        company: 'Various',
        date: '2023 - Present',
        location: 'Navarra, ES',
        points: [
          'Development of web projects for local clients and personal projects.',
        ],
      },
      {
        title: 'Purchasing and Warehouse Management Technician',
        company: 'Schmidt-Clemens Spain',
        date: '2014 - Present',
        location: 'Navarra, ES',
        points: [
          'Supplier evaluation and management, negotiation of offers and orders.',
          'Stock management and warehouse control, inventories.',
          'Organization and planning of merchandise reception and logistics.',
        ],
      },
      {
        title: 'Networked Computer Systems Technician Intern',
        company: 'Schmidt-Clemens Spain',
        date: '2015 - 2016',
        location: 'Navarra, ES',
        points: [
          'Curricular internship in the IT department of the company.',
          'Maintenance of computer equipment and troubleshooting.',
          'Configuration and installation of computer networks.',
        ],
      },
    ],

    // Education
    courses: [
      {
        degree: 'Degree in User experiences, Interface Design and Multimedia',
        school: 'Universitat Oberta de Catalunya',
        date: '2022 - 2025',
      },
      {
        degree:
          'Higher Technician in Administration of Networked Computer Systems',
        school: 'Urrutiko Lanbide Heziketako Institutua - ULHI',
        date: '2014 - 2015',
      },
    ],

    // Technologies
    technologies: [
      {name: 'HTML5', icon: <SiHtml5 />},
      {name: 'CSS3', icon: <SiCss />},
      {name: 'JavaScript', icon: <SiJavascript />},
      {name: 'TypeScript', icon: <SiTypescript />},
      {name: 'React', icon: <SiReact />},
      {name: 'Node', icon: <SiNodedotjs />},
      {name: 'Express', icon: <SiExpress />},
      {name: 'Next', icon: <SiNextdotjs />},
      {name: 'Vite', icon: <SiVite />},
      {name: 'Astro', icon: <SiAstro />},
      {name: 'Tailwind', icon: <SiTailwindcss />},
      {name: 'Shadcn', icon: <SiShadcnui />},
      {name: 'Radix UI', icon: <SiRadixui />},
      {name: 'Material UI', icon: <SiMui />},
      {name: 'Vitest', icon: <SiVitest />},
      {name: 'Leaflet', icon: <SiLeaflet />},
      {name: 'MongoDB', icon: <SiMongodb />},
      {name: 'PostgreSQL', icon: <SiPostgresql />},
      {name: 'Vercel', icon: <SiVercel />},
      {name: 'Cloudinary', icon: <SiCloudinary />},
      {name: 'Firebase', icon: <SiFirebase />},
      {name: 'Netlify', icon: <SiNetlify />},
      {name: 'Git', icon: <SiGit />},
      {name: 'GitHub', icon: <SiGithub />},
      {name: 'npm', icon: <SiNpm />},
      {name: 'Markdown', icon: <SiMarkdown />},
      {name: 'Docker', icon: <SiDocker />},
      {name: 'Linux', icon: <SiLinux />},
      {name: 'Figma', icon: <SiFigma />},
    ],

    // Soft Skills
    soft_skills: [
      {
        title: 'Assertiveness and Communication',
        description:
          'Strong social skills. Trained in emotional management and effective communication. Particularly interested in verbal presentation techniques and public speaking. Experience in conferences and presentations.',
        icon: <MessageSquare />,
      },
      {
        title: 'Teaching and Knowledge Sharing',
        description:
          'Teaching and training skills. Five years of sporadic work experience as an adventure sports and outdoor activities instructor. Experience in group training and teamwork.',
        icon: <BookOpen />,
      },
      {
        title: 'Emotional Management in High-pressure Environments',
        description:
          'Extensive life experience in adventure sports and outdoor activities. Experienced in resolving risk situations, making decisions under pressure, and effectively managing emotions.',
        icon: <Brain />,
      },
    ],

    // Projects
    projects: [
      {
        title: 'Subterra - Speleological Data Storage Platform',
        description:
          'Database of cavities with geospatial and documentary information. Collaboration platform for speleologists and scientists.',
        features:
          'User and group system, roles and permissions. Document, image, and file storage. Map and geospatial data visualization. Historical versioning system. Branch and merge data options. Automated tests. Library of reusable components.',
        technologies: [
          'Node.js',
          'React',
          'Next.js',
          'Tailwind',
          'MongoDB',
          'Vitest',
          'Auth.js',
          'Leaflet',
          'Vercel',
          'Cloudinary',
          'Figma',
        ],
        link: 'www.subterra.app',
      },
      {
        title: 'Zunbeltz.org - Educational and Speleology Outreach Platform',
        description:
          'Speleology outreach platform, blog, and store. Online training section on techniques.',
        features:
          ' Content management system using Astro and Markdown, image and file storage, map visualization, custom component library.',
        technologies: [
          'Astro',
          'React',
          'Tailwind',
          'PostgreSQL',
          'Leaflet',
          'Figma',
        ],
        link: 'www.zunbeltz.org',
      },
    ],

    // Footer
    author: 'Andoni Gallardo',
    social_links: [
      {name: 'github', icon: <SiGithub />, url: 'github.com/Kiyameh'},
      {
        name: 'linkedin',
        icon: <Linkedin />,
        url: 'linkedin.com/in/andoni-gallardo-izcue/',
      },
      {
        name: 'portfolio',
        icon: <User />,
        url: 'kiyameh.com',
      },
    ],
  },
  es: {
    // Section names:
    about_title: 'Sobre Mí',
    works_title: 'Experiencia',
    courses_title: 'Educación',
    techs_title: 'Tecnologías',
    soft_skills_title: 'Habilidades Blandas',
    soft_skills_subtitle: 'Destacadas',
    projects_title: 'Proyectos',
    projects_subtitle: 'Características',
    connect_title: 'Contacto',

    // Download button text
    download_pdf: 'Descargar PDF',

    // Language switcher text
    switcher_text: 'Idioma',
    language_labels: [
      {label: 'Inglés', value: 'en'},
      {label: 'Español', value: 'es'},
    ],
    // Header
    name: 'Andoni Gallardo Izcue',
    title: 'Desarrollador Web',
    email: 'kiyameh@outlook.com',
    phone: '+34 646 84 99 19',
    location: 'Navarra, ES',
    picture: '/me.jpg',
    // About
    about_text:
      'Desarrollador de software orientado a tecnologías web. Competente en frameworks modernos de JavaScript, despliegue de software y control de versiones. Especialmente interesado en el diseño de interfaces, la interacción humana y la generación de experiencias de usuario satisfactorias. Comprometido con el software libre, el desarrollo de código sostenible y las metodologias de diseño centradas en el usuario.',

    // Experience
    works: [
      {
        title: 'Desarrollador freelance',
        company: 'Varios',
        date: '2023 - Presente',
        location: 'Navarra, ES',
        points: [
          'Desarrollo de proyectos web para clientes locales y desarrollo de proyectos personales',
        ],
      },
      {
        title: 'Técnico de compras y gestión de almacén',
        company: 'Schmidt-Clemens Spain',
        date: '2014 - Presente',
        location: 'Navarra, ES',
        points: [
          'Gestión y valoración de proveedores, negociación de ofertas y pedidos.',
          'Gestión de stocks y control de almacenes, inventarios.',
          'Organización y planificación de la recepción de mercancías y su logística.',
        ],
      },
      {
        title: 'Prácticas de Técnico de sistemas informáticos en red',
        company: 'Schmidt-Clemens Spain',
        date: '2015 - 2016',
        location: 'Navarra, ES',
        points: [
          'Prácticas curriculares en el departamento de IT de la empresa',
          'Mantenimiento de equipos informáticos y resolución de incidencias',
          'Configuración e instalación de redes informáticas',
        ],
      },
    ],

    // Education
    courses: [
      {
        degree:
          'Grado en Técnicas de interacción digital, diseño de interfaces y multimedia',
        school: 'Universitat Oberta de Catalunya',
        date: '2022 - 2025',
      },
      {
        degree:
          'Técnico Superior en Administración de Sistemas Informáticos en Red',
        school: 'Urrutiko Lanbide Heziketako Institutua - ULHI',
        date: '2014 - 2015',
      },
    ],

    // Technologies
    technologies: [
      {name: 'HTML5', icon: <SiHtml5 />},
      {name: 'CSS3', icon: <SiCss />},
      {name: 'JavaScript', icon: <SiJavascript />},
      {name: 'TypeScript', icon: <SiTypescript />},
      {name: 'React', icon: <SiReact />},
      {name: 'Node', icon: <SiNodedotjs />},
      {name: 'Express', icon: <SiExpress />},
      {name: 'Next', icon: <SiNextdotjs />},
      {name: 'Vite', icon: <SiVite />},
      {name: 'Astro', icon: <SiAstro />},
      {name: 'Tailwind', icon: <SiTailwindcss />},
      {name: 'Shadcn', icon: <SiShadcnui />},
      {name: 'Radix UI', icon: <SiRadixui />},
      {name: 'Material UI', icon: <SiMui />},
      {name: 'Vitest', icon: <SiVitest />},
      {name: 'Leaflet', icon: <SiLeaflet />},
      {name: 'MongoDB', icon: <SiMongodb />},
      {name: 'PostgreSQL', icon: <SiPostgresql />},
      {name: 'Vercel', icon: <SiVercel />},
      {name: 'Cloudinary', icon: <SiCloudinary />},
      {name: 'Firebase', icon: <SiFirebase />},
      {name: 'Netlify', icon: <SiNetlify />},
      {name: 'Git', icon: <SiGit />},
      {name: 'GitHub', icon: <SiGithub />},
      {name: 'npm', icon: <SiNpm />},
      {name: 'Markdown', icon: <SiMarkdown />},
      {name: 'Docker', icon: <SiDocker />},
      {name: 'Linux', icon: <SiLinux />},
      {name: 'Figma', icon: <SiFigma />},
    ],

    // Soft Skills
    soft_skills: [
      {
        title: 'Asertividad y Comunicación',
        description:
          'Buenas capacidades sociales. Formado en gestión emocional y comunicación eficiente. Especialmente interesado en técnicas de exposición verbal y comunicación pública. Experiencia en conferencias y presentaciones.',
        icon: <MessageSquare />,
      },
      {
        title: 'Enseñanza y Compartir Conocimientos',
        description:
          'Habilidades de enseñanza y formación. Cinco años de experiencia esporádica laboral como instructor de deportes de aventura y en el medio natural. Experiencia en formación de grupos y trabajo en equipo.',
        icon: <BookOpen />,
      },
      {
        title: 'Gestión emocional en entornos de presión',
        description:
          'Amplia trayectoria vital en deportes de aventura y en el medio natural. Experiencia en resolución de situaciones de riesgo, en toma de decisiones bajo presión y en gestión eficiente de las emociones.',
        icon: <Brain />,
      },
    ],

    // Projects
    projects: [
      {
        title:
          'Subterra - Plataforma de almacenamiento de datos espeleológicos',
        description:
          'Base de datos de cavidades con información geoespacial y documental. Plataforma de colaboración para espeleólogos y científicos.',
        features:
          'Sistema de usuarios y grupos. Roles y permisos. Almacenamiento de documentos, imágenes y archivos. Visualización de mapas y datos geoespaciales. Sistema de versiones historicas. Opciones de branch y merge de datos. Test automatizados. Biblioteca de componentes reutilizables.',
        technologies: [
          'Node.js',
          'React',
          'Next.js',
          'Tailwind',
          'MongoDB',
          'Vitest',
          'Auth.js',
          'Leatflet',
          'Vercel',
          'Cloudinary',
          'Figma',
        ],
        link: 'www.subterra.app',
      },
      {
        title:
          'Zunbeltz.org - Plataforma educativa y de divulgación de la espeleología',
        description:
          'Plataforma de divulgación, blog y tienda de espeleología. Sección de formación online sobre técnicas.',
        features:
          'Sistema de gestión de contenido mediante Astro y Markdown, Almacenamiento de imagenes y archivos, Visualización de mapas, Biblioteca propia de componentes.',
        technologies: [
          'Astro',
          'React',
          'Tailwind',
          'PostgreSQL',
          'Leatflet',
          'Figma',
        ],
        link: 'www.zunbeltz.org',
      },
    ],

    // Footer
    author: 'Andoni Gallardo',
    social_links: [
      {name: 'github', icon: <SiGithub />, url: 'github.com/Kiyameh'},
      {
        name: 'linkedin',
        icon: <Linkedin />,
        url: 'linkedin.com/in/andoni-gallardo-izcue/',
      },
      {
        name: 'portfolio',
        icon: <User />,
        url: 'kiyameh.com',
      },
    ],
  },
}
