import './Achievements.css'

interface Achievement {
  id: number
  title: string
  issuer: string
  date: string
  image?: string
  link?: string
  type: 'image' | 'pdf'
}

export default function Achievements() {
  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'ISC2 Certified in Cybersecurity (CC)',
      issuer: 'ISC²',
      date: '2024',
      image: '/certificates/isc2_cc_certificate.pdf',
      type: 'pdf'
    },
    {
      id: 2,
      title: 'Dark Web Certificate',
      issuer: 'Cybersecurity Training',
      date: '2024',
      image: '/certificates/darkweb_certificate.png',
      type: 'image'
    }
  ]

  return (
    <section className="achievements">
      <div className="container">
        <h2>🏆 Achievements & Certifications</h2>
        
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-header">
                <h3>{achievement.title}</h3>
                <span className="achievement-issuer">{achievement.issuer}</span>
              </div>
              
              <div className="achievement-content">
                {achievement.type === 'image' && achievement.image ? (
                  <div className="certificate-image">
                    <img src={achievement.image} alt={achievement.title} />
                  </div>
                ) : (
                  <div className="certificate-pdf">
                    <div className="pdf-icon">📄</div>
                    <p>{achievement.title}</p>
                  </div>
                )}
              </div>
              
              <div className="achievement-footer">
                <span className="achievement-date">{achievement.date}</span>
                <a 
                  href={achievement.image} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  View Certificate
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
