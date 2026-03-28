import './Projects.css'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  link: string
  image: string
  status: 'completed' | 'in-progress' | 'coming-soon'
}

const projects: Project[] = [
  {
    id: 1,
    title: "Secure E-Commerce Platform",
    description: "Full-stack e-commerce solution with end-to-end encryption, secure payment processing, and comprehensive vulnerability testing.",
    technologies: ["React", "Node.js", "PostgreSQL", "Security Audit"],
    link: "#",
    image: "https://via.placeholder.com/400x250?text=E-Commerce",
    status: 'in-progress'
  },
  {
    id: 2,
    title: "Web3 Token Dashboard",
    description: "DApp interface for managing ERC-20 tokens with Web3 wallet integration and real-time blockchain data visualization.",
    technologies: ["React", "Web3.js", "Ethereum", "Solidity"],
    link: "#",
    image: "https://via.placeholder.com/400x250?text=Web3+Dashboard",
    status: 'coming-soon'
  },
  {
    id: 3,
    title: "API Security Analysis Tool",
    description: "Automated security scanner for REST APIs detecting OWASP vulnerabilities and generating security reports.",
    technologies: ["Node.js", "Express", "Security Testing", "MongoDB"],
    link: "#",
    image: "https://via.placeholder.com/400x250?text=Security+Tool",
    status: 'in-progress'
  }
]

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className={`project-status status-${project.status}`}>
                {project.status === 'in-progress' && 'In Progress'}
                {project.status === 'coming-soon' && 'Coming Soon'}
                {project.status === 'completed' && 'Completed'}
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="technologies">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link">View Project →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
