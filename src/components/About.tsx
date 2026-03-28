import './About.css'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a Full Stack Developer passionate about building modern web applications from end to end —
              combining clean frontend experiences with powerful backend systems. My expertise spans across
              developing scalable architectures, optimizing performance, and creating seamless user experiences.
            </p>
            <p>
              Beyond development, I have a deep interest in cybersecurity, focusing on building applications
              that are not just functional, but also secure by design. I believe security should be integrated
              at every layer of application development, not bolted on as an afterthought.
            </p>
            <p>
              I'm actively exploring Web3 and blockchain technologies, learning how decentralized systems are
              shaping the future of the internet. I enjoy experimenting with new tools, frameworks, and ideas
              that push the boundaries of what's possible on the web.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat">
              <h3>Full Stack</h3>
              <p>End-to-End Development</p>
            </div>
            <div className="stat">
              <h3>Secure</h3>
              <p>Security-First Design</p>
            </div>
            <div className="stat">
              <h3>Web3</h3>
              <p>Blockchain Exploration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
