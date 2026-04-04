import type { Project } from "../portfolio.interface"

export const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "Design and development of a CMS for the creation of websites about meeting management.",
    description: "• Led the design and development of a scalable SaaS-based CMS platform, aimed at enabling non-technical users to create customized web applications. • Integrated the backend (NestJS, Node.js, JavaScript, TypeScript) based on a microservices architecture (REST APIs), adding new CMS configuration endpoints. • Implemented the frontend (React, TypeScript) based on a microfrontend architecture (Webpack 5 Module Federation) in a maintainable and scalable way. • Redesigned the NoSQL database model (MongoDB) with a dynamic and long-term maintainability approach. • Managed cloud deployments using Docker (Docker Compose) and handled the software lifecycle through Git version control (GitHub, CI/CD). • Reduced implementation time by 90% for two new systems. • Decreased development effort for new features by 60% by identifying core functionalities and system-specific components.",
    startDate: "2024-08-01 00:00:00.000",
    endDate: "2025-07-01 00:00:00.000",
    coverImage: "/projects/project-cms-1.png",
    projectImages: [
      { id: "1", url: "/projects/project-cms-1.png", order: 0 },
      { id: "2", url: "/projects/project-cms-2.png", order: 1 },
      { id: "3", url: "/projects/project-cms-3.png", order: 2 },
      { id: "4", url: "/projects/project-cms-4.png", order: 3 },
    ],
    skills: [
      { id: "1", name: "TypeScript", category: "Language", icon: "typescript" },
      { id: "2", name: "JavaScript", category: "Language", icon: "javascript" },
      { id: "3", name: "CSS3", category: "Frontend", icon: "css" },
      { id: "4", name: "HTML5", category: "Frontend", icon: "html5" },
      { id: "5", name: "React", category: "Frontend", icon: "react" },
      { id: "6", name: "Node.js", category: "Backend", icon: "node" },
      { id: "7", name: "NestJS", category: "Backend", icon: "nestjs" },
      { id: "8", name: "MongoDB", category: "Databases", icon: "mongodb" },
      { id: "9", name: "Git", category: "Devops/Tools", icon: "git" },
      { id: "10", name: "GitHub", category: "Devops/Tools", icon: "github" },
      { id: "11", name: "Linux", category: "Devops/Tools", icon: "linux" },
      { id: "12", name: "Docker", category: "Devops/Tools", icon: "docker" },
      { id: "13", name: "Figma", category: "Design", icon: "figma" },
    ]
  },
  {
    id: "2",
    title: "Public website maintenance.",
    description: "• Optimized the company's website by developing and maintaining modules in Django (Python), using an MVC architecture (models with PostgreSQL and views with HTML templates), with asynchronous communication between components (fetch). • Edited statistical charts (Chart.js), improving data visualization on the site. • Led the development of a video repository showcasing company activities, centralizing audiovisual content and enabling full public access. • Redesigned the navigation flow of the Whistleblowing Channel, reducing the time required to find critical information for administrative staff by 25%. • Documented technological incidents through continuous improvement processes and the resolution of technical problems.",
    startDate: "2025-01-06 00:00:00.000",
    endDate: "2025-02-21 00:00:00.000",
    coverImage: "/projects/project-web-4.png",
    projectImages: [
      { id: "1", url: "/projects/project-web-1.png", order: 0 },
      { id: "2", url: "/projects/project-web-2.png", order: 1 },
      { id: "3", url: "/projects/project-web-3.png", order: 2 },
      { id: "4", url: "/projects/project-web-4.png", order: 3 },
      { id: "5", url: "/projects/project-web-5.png", order: 4 },
    ],
    skills: [
      { id: "1", name: "JavaScript", category: "Language", icon: "javascript" },
      { id: "2", name: "Python", category: "Language", icon: "python" },
      { id: "3", name: "HTML5", category: "Frontend", icon: "html5" },
      { id: "4", name: "CSS3", category: "Frontend", icon: "css" },
      { id: "5", name: "BootStrap", category: "Frontend", icon: "bootstrap" },
      { id: "6", name: "Django", category: "Backend", icon: "django" },
      { id: "7", name: "PostgreSQL", category: "Databases", icon: "postgresql" },
      { id: "8", name: "Git", category: "Devops/Tools", icon: "git" },
    ]
  },
  {
    id: "3",
    title: "Prototype of an advanced document management system.",
    description: "• Designed and implemented a desktop application for document management using Python. • The system allows managing documents locally or in the cloud (via Google Drive). • Advanced document search using Python libraries such as NLTK and PyPDF. • Intelligent document organization from a specific location using the Scikit-learn library in Python. • Implemented AI-assisted features using OpenAI to query information within specific documents. • Achieved a reduction in search time for unorganized documents. • Improved user productivity and operational efficiency.",
    startDate: "2023-01-01 00:00:00.000",
    endDate: "2023-01-01 00:00:00.000",
    coverImage: "/projects/project-docs-2.png",
    projectImages: [
      { id: "1", url: "/projects/project-docs-1.png", order: 0 },
      { id: "2", url: "/projects/project-docs-2.png", order: 1 },
      { id: "3", url: "/projects/project-docs-3.png", order: 2 },
      { id: "4", url: "/projects/project-docs-4.png", order: 3 },
    ],
    skills: [
      { id: "1", name: "Python", category: "Language", icon: "python" },
      { id: "2", name: "GitHub", category: "Devops/Tools", icon: "github" },
      { id: "3", name: "Git", category: "Devops/Tools", icon: "git" },
      { id: "4", name: "Linux", category: "Devops / Tools", icon: "linux" },
      { id: "5", name: "Figma", category: "Design", icon: "figma" },
    ]
  },
  {
    id: "4",
    title: "Web interface for an educational system simulating mathematical exercises.",
    description: "• Collaborated in the development of an educational web application (using Scrum) to automate course management and simulate exercises on integers using a number line. • Supported the understanding of interactive exercises (metaphors) for different simulation scenarios on the number line. • Designed and developed the user interface using Vue.js, including the consumption of CRUD requests with Axios to a backend (REST API) built with Spring Boot (Java). • Reduced teachers' preparation time by 30% through automation in the creation and grading of exercises.",
    startDate: "2023-01-01 00:00:00.000",
    endDate: "2023-01-01 00:00:00.000",
    coverImage: "/projects/project-math-1.png",
    projectImages: [
      { id: "1", url: "/projects/project-math-1.png", order: 0 },
      { id: "2", url: "/projects/project-math-2.png", order: 1 },
      { id: "3", url: "/projects/project-math-3.png", order: 2 },
    ],
    skills: [
      { id: "1", name: "HTML5", category: "Frontend", icon: "html5" },
      { id: "2", name: "Vue.js", category: "Frontend", icon: "vue" },
      { id: "3", name: "BootStrap", category: "Frontend", icon: "bootstrap" },
      { id: "4", name: "Spring Boot", category: "Backend", icon: "springboot" },
      { id: "5", name: "PostgreSQL", category: "Databases", icon: "postgresql" },
      { id: "6", name: "Git", category: "Devops/Tools", icon: "git" },
      { id: "7", name: "GitHub", category: "Devops/Tools", icon: "github" },
      { id: "8", name: "Linux", category: "Devops/Tools", icon: "linux" },
      { id: "9", name: "Docker", category: "Devops/Tools", icon: "docker" },
      { id: "10", name: "Figma", category: "Design", icon: "figma" },
    ]
  },
]