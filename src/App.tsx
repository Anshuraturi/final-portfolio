import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Achievements from './components/Achievements'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Music from './components/Music'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Music />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="achievements">
          <Achievements />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
