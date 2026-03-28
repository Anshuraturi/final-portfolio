import './Hero.css'

export default function Hero() {
  const quotes = [
    "Success is not final, failure is not fatal. – Winston Churchill",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Innovation distinguishes between a leader and a follower. – Steve Jobs",
    "Life is what happens when you're busy making other plans. – John Lennon"
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-wrapper">
          <div className="hero-left">
            <div className="namaste">Hello</div>
            <div className="hero-title">
              <span className="hero-text">I am </span>
              <span className="hero-name">Anshu</span>
            </div>
            <p className="hero-subtitle">Full Stack Developer | Cybersecurity Enthusiast | Web3 Explorer</p>
            
            <div className="cta-grid">
              <button className="cta-btn cta-primary" onClick={() => handleScroll('about')}>About Me 📝</button>
              <button className="cta-btn cta-primary" onClick={() => handleScroll('achievements')}>Achievements 🏆</button>
              <button className="cta-btn cta-secondary" onClick={() => handleScroll('projects')}>Projects 💻</button>
              <button className="cta-btn cta-secondary" onClick={() => handleScroll('contact')}>Connect 🔗</button>
            </div>

            <div className="quote-box">
              <p className="quote-text">"{randomQuote}"</p>
              <p className="quote-label">— QUOTE OF THE DAY —</p>
            </div>
          </div>

          <div className="hero-right">
            <div className="profile-image">
              <img src="/photo/anshu_profile.jpeg" alt="Anshu Raturi" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
