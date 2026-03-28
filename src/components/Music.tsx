import { useState, useRef, useEffect } from 'react'
import './Music.css'

interface Song {
  id: number
  title: string
  artist: string
  poster: string
  audio: string
}

const songs: Song[] = [
  {
    id: 1,
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    poster: "/poster/i wanna be yours.png",
    audio: "/music/I Wanna Be Yours   Arctic Monkeys.mp3"
  },
  {
    id: 2,
    title: "Night Changes",
    artist: "One Direction",
    poster: "/poster/night changes.png",
    audio: "/music/Night Changes.m4a"
  },
  {
    id: 3,
    title: "Perfect",
    artist: "Ed Sheeran",
    poster: "/poster/perfect.png",
    audio: "/music/Perfect Duet.m4a"
  },
  {
    id: 4,
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    poster: "/poster/until i found you.png",
    audio: "/music/Until I Found You.m4a"
  },
  {
    id: 5,
    title: "Yellow",
    artist: "Coldplay",
    poster: "/poster/yellow.png",
    audio: "/music/Yellow   Coldplay.m4a"
  }
]

// Define song themes
const songThemes: { [key: string]: { bg: string; card: string; accent: string; text: string; button: string; border: string; nav: string; hero: string } } = {
  "I Wanna Be Yours": {
    bg: "#1a0f14",
    card: "#2a1a1f",
    accent: "#FF2E63",
    text: "#FFE4E6",
    button: "#FF2E63",
    border: "#FF2E63",
    nav: "#1a0f14",
    hero: "linear-gradient(135deg, #1a0f14, #3a0f1f)"
  },
  "Night Changes": {
    bg: "#0D1117",
    card: "#161B22",
    accent: "#58A6FF",
    text: "#C9D1D9",
    button: "#238636",
    border: "#30363D",
    nav: "#0D1117",
    hero: "linear-gradient(135deg, #0D1117, #0f3460)"
  },
  "Perfect": {
    bg: "#1a0f1f",
    card: "#2a1a2f",
    accent: "#A371F7",
    text: "#E9D5FF",
    button: "#7C3AED",
    border: "#A371F7",
    nav: "#1a0f1f",
    hero: "linear-gradient(135deg, #1a0f1f, #2a1a4f)"
  },
  "Until I Found You": {
    bg: "#0f1a1a",
    card: "#1a2a2a",
    accent: "#22D3EE",
    text: "#E0F7FA",
    button: "#06B6D4",
    border: "#22D3EE",
    nav: "#0f1a1a",
    hero: "linear-gradient(135deg, #0f1a1a, #0a2a2f)"
  },
  "Yellow": {
    bg: "#1a1a12",
    card: "#2a2a1a",
    accent: "#FFD166",
    text: "#FFF8E1",
    button: "#F59E0B",
    border: "#FFD166",
    nav: "#1a1a12",
    hero: "linear-gradient(135deg, #1a1a12, #3a3a1a)"
  }
}

// Default theme
const defaultTheme = {
  bg: "#F5EBE0",
  card: "#EBE3D5",
  accent: "#E63946",
  text: "#1a1a1a",
  button: "#E63946",
  border: "#D6C6B8",
  nav: "#F5EBE0",
  hero: "linear-gradient(135deg, #F5EBE0, #EBE3D5)"
}

// Apply theme using CSS variables
const applyTheme = (theme: typeof defaultTheme) => {
  document.documentElement.style.setProperty('--bg-color', theme.bg)
  document.documentElement.style.setProperty('--card-color', theme.card)
  document.documentElement.style.setProperty('--accent-color', theme.accent)
  document.documentElement.style.setProperty('--text-color', theme.text)
  document.documentElement.style.setProperty('--button-color', theme.button)
  document.documentElement.style.setProperty('--border-color', theme.border)
  document.documentElement.style.setProperty('--nav-color', theme.nav)
  document.documentElement.style.setProperty('--hero-gradient', theme.hero)
  
  // Also update legacy variables for compatibility
  document.documentElement.style.setProperty('--theme-bg', theme.bg)
  document.documentElement.style.setProperty('--theme-card', theme.card)
  document.documentElement.style.setProperty('--theme-accent', theme.accent)
  document.documentElement.style.setProperty('--theme-text', theme.text)
  document.documentElement.style.setProperty('--theme-button', theme.button)
  document.documentElement.style.setProperty('--theme-border', theme.border)
  document.documentElement.style.setProperty('--theme-nav', theme.nav)
}

// Revert to default theme
const revertTheme = () => {
  applyTheme(defaultTheme)
}

// Format time from seconds to mm:ss
const formatTime = (time: number): string => {
  if (!isFinite(time) || isNaN(time) || time === undefined) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export default function Music() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(70)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLInputElement>(null)

  const currentSong = songs[currentSongIndex]

  // Apply theme based on currently playing song
  useEffect(() => {
    if (isPlaying && currentSong && songThemes[currentSong.title]) {
      applyTheme(songThemes[currentSong.title])
    } else {
      revertTheme()
    }
  }, [isPlaying, currentSongIndex])

  // Initialize audio element
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Load the audio source
    audio.src = currentSong.audio

    // Play or pause based on state
    if (isPlaying) {
      audio.play().catch(err => console.log('Play error:', err))
    } else {
      audio.pause()
    }
  }, [currentSongIndex, isPlaying])

  // Set volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Update max value and duration when metadata loads
    const handleLoadedMetadata = () => {
      const dur = audio.duration
      setDuration(dur)
      if (progressRef.current) {
        progressRef.current.max = dur.toString()
      }
    }

    // Update progress as song plays
    const handleTimeUpdate = () => {
      if (!isSeeking) {
        setCurrentTime(audio.currentTime)
        if (progressRef.current) {
          progressRef.current.value = audio.currentTime.toString()
        }
      }
    }

    // Go to next song when current ends
    const handleEnded = () => {
      handleNext()
    }

    // Handle errors
    const handleError = () => {
      console.log('Audio error:', audio.error)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [isSeeking])

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1))
    setCurrentTime(0)
    setDuration(0)
  }

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1))
    setCurrentTime(0)
    setDuration(0)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Handle seek input
  const handleSeekInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleSeekStart = () => {
    setIsSeeking(true)
  }

  const handleSeekEnd = () => {
    setIsSeeking(false)
  }

  // Handle mobile progress bar click
  const handleMobileProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    const container = e.currentTarget
    const clickX = e.clientX - container.getBoundingClientRect().left
    const percentage = clickX / container.offsetWidth
    const newTime = percentage * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Calculate progress percentage for mobile progress bar
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  return (
    <>
      <div className="music-player">
        <div className="player-label">My Top 5</div>
        
        <div className="player-card">
          <div className="player-poster">
            <img src={currentSong.poster} alt={currentSong.title} />
          </div>
          
          <div className="player-info">
            <p className="song-artist">{currentSong.artist}</p>
            <p className="song-title">{currentSong.title}</p>
          </div>

          {/* Timeline & Duration - Desktop only */}
          <div className="player-timeline">
            <span className="time-display">{formatTime(currentTime)}</span>
            <input
              ref={progressRef}
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeekInput}
              onMouseDown={handleSeekStart}
              onMouseUp={handleSeekEnd}
              onTouchStart={handleSeekStart}
              onTouchEnd={handleSeekEnd}
              className="progress-slider"
              title="Seek"
            />
            <span className="time-display">{formatTime(duration)}</span>
          </div>

          <div className="player-controls">
            <button className="control-btn" onClick={handlePrevious} title="Previous">
              ⏮
            </button>
            <button className="control-btn play-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="control-btn" onClick={handleNext} title="Next">
              ⏭
            </button>
            <div className="volume-control">
              <div className="volume-icon">🔊</div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="volume-slider"
                title="Volume"
              />
            </div>
          </div>
        </div>

        {/* Mobile Progress Bar - Below the player */}
        <div className="mobile-progress-container" onClick={handleMobileProgressClick}>
          <div 
            className="mobile-progress-bar" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <audio ref={audioRef} crossOrigin="anonymous" />
    </>
  )
}
