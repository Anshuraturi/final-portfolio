import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Anshu</h1>
        </div>
        <nav className="nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  )
}
