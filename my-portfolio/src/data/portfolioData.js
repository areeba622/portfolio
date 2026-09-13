export const PORTFOLIO_DATA = {
  name: "AREEBA HASSAN",
  role: "FULL-STACK ENGINEER · BACKEND-LEANING",
  summary: "I build backend systems and frontend applications — developing Spring Boot APIs, React interfaces, and reliable database architectures for real-world applications.",
  bio: "BS Software Engineering student at Sir Syed University of Engineering & Technology, focused on backend development, API design, data modeling, and system architecture. I also build full-stack applications to understand how different layers of a software system work together, with a focus on practical, reliable, and well-structured software.",
  links: {
    github: "https://github.com/areeba622",
    linkedin: "https://www.linkedin.com/in/areeba-hassan-421a43333/",
    email: "areebahasan1205@gmail.com"
  },
  hud: {
    label: "EXT.CAM // TRANSIT VIEW",
    degreeProgress: "58%",
    degreeMeta: "BSSE · SEM 5/8 · FALL 2028",
    shortMeta: "58% · SEM 5/8"
  },
  specs: [
    {
      category: "LANG",
      items: "Java · Python",
      icons: ["java", "python"]
    },
    {
      category: "FRAME",
      items: "Spring Boot · React",
      icons: ["springboot", "react"]
    },
    {
      category: "DATA",
      items: "MongoDB · PostgreSQL",
      icons: ["mongodb", "postgresql"]
    },
    {
      category: "DESIGN",
      items: "UML · Software Architecture",
      icons: ["uml", "architecture"]
    },
    {
      category: "TOOLS",
      items: "Git",
      icons: ["git"]
    }
  ],
  education: [
    {
      type: "DEGREE",
      title: "BS Software Engineering",
      institution: "Sir Syed University of Engineering & Technology",
      period: "2024 — 2028",
      status: "IN PROGRESS",
      
    },
    {
      type: "CERT",
      title: "Certified AI Software Engineering Professional",
      institution: "NED Academy",
      period: "2026",
      status: "1.0 CPD",
      
    }
  ],
  projects: [
    {
      id: "001",
      name: "DOMLab — DOM visualizer",
      tagline: "Interactive tree visualizer and inspector for the Document Object Model",
      github: "https://github.com/areeba622/domlab",
      demoUrl: "https://domlab-162.vercel.app/",
      tech: ["React", "TypeScript", "CSS"],
      writeup: {
        problem: "Developers often learn the DOM through static diagrams, making its structure and behavior hard to visualize. DOMLab makes it interactive — paste HTML and explore it as a live tree.",
        approach: "Built with React, TypeScript, and CSS, using the Adapter Pattern to collect data from the browser’s native DOM API and transform it into the application’s internal format for consistent processing and visualization.",
        learned: "Solved practical integration challenges including sandboxed rendering of untrusted HTML, synchronizing tree data with the live preview. Also practiced structured, sprint-based development with clear feature scope."
      }
    },
    {
      id: "002",
      name: "Palette — E-Commerce Platform",
      tagline: "Interior design e-commerce system applying GoF design patterns",
      github: "https://github.com/areeba622/palette",
      demoUrl: null,
      tech: ["Java", "Spring Boot", "React", "PostgreSQL"],
      writeup: {
        problem: "Designed and built as a Software Architecture & Design course project, Palette solves the real-world challenge of standard e-commerce platforms lacking personalized interior styling guidance and flexible multi-item furniture bundling.",
        approach: "Built a full-stack Java/Spring Boot and React application structured around core GoF design patterns. Used Factory and Builder for custom furniture generation, Adapter for payment integration, and Composite to manage single and bundled item checkouts.",
        learned: "Learned to evaluate real-world software requirements and select the right design patterns to keep system components flexible and easy to extend."
      }
    },
    {
      id: "003",
      name: "Personality Quiz — Flask app",
      tagline: "Lightweight, student-focused personality quiz platform",
      github: "https://github.com/areeba622/Personality-Quiz-website",
      demoUrl: "https://personality-quiz-website-blond.vercel.app/",
      tech: ["Python", "Flask", "HTML", "CSS"],
      writeup: {
        problem: "Built for the Programming Fundamentals course, this project addresses rigid, unengaging online quizzes by delivering a fast, lightweight platform that processes user responses to serve dynamic, scenario-based outcomes.",
        approach: "Built a Python Flask app with HTML/CSS that processes user form submissions, evaluates responses against a structured dictionary, and dynamically renders targeted result pages.",
        learned: "Mastered core full-stack fundamentals, including Flask routing, HTTP request handling, dynamic Jinja2 templating, and clean directory structuring."
      }
    }
  ],
  contact: {
    email: "areebahasan1205@gmail.com",
    base: "KARACHI, PK",
    openTo: "internships, junior roles",
    resumeFileName: "Areeba_Hassan_Resume.pdf"
  }
};