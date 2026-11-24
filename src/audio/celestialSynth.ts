/**
 * Procedural Celestial Sound Engine & Music Box
 * Synthesizes crystalline chimes, harp arpeggios, gentle music-box tones,
 * and page-turn acoustical textures via the Web Audio API.
 * 100% reliable, zero external network requests, zero CORS.
 */

class CelestialAudioEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = false // Iniciado ativo para que os cliques e ações mágicas soem ao toque
  private ambientInterval: number | null = null
  private melodyTimeoutIds: number[] = []
  private isMelodyActive: boolean = false

  constructor() {
    // Desbloqueio seguro e síncrono para Safari iOS e Chrome Mobile no primeiro gesto
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        this.initContext()
        window.removeEventListener('touchstart', unlockAudio)
        window.removeEventListener('touchend', unlockAudio)
        window.removeEventListener('mousedown', unlockAudio)
        window.removeEventListener('keydown', unlockAudio)
      }
      window.addEventListener('touchstart', unlockAudio, { passive: true })
      window.addEventListener('touchend', unlockAudio, { passive: true })
      window.addEventListener('mousedown', unlockAudio, { passive: true })
      window.addEventListener('keydown', unlockAudio, { passive: true })
    }
  }

  public initContext() {
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (AudioCtx) {
          this.ctx = new AudioCtx()
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
    } catch {
      // AudioContext fallback
    }
  }

  public enableAudio() {
    this.initContext()
    this.isMuted = false
  }

  public toggleMute(): boolean {
    this.initContext()
    this.isMuted = !this.isMuted

    if (!this.isMuted) {
      this.startAmbientArpeggio()
      this.playChime(523.25, 0.15) // C5
      setTimeout(() => this.playChime(659.25, 0.12), 120) // E5
      setTimeout(() => this.playChime(783.99, 0.15), 240) // G5
      setTimeout(() => this.playChime(1046.5, 0.2), 380) // C6
    } else {
      this.stopAmbientArpeggio()
      this.stopMelody()
    }

    return !this.isMuted
  }

  public getIsMuted(): boolean {
    return this.isMuted
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
    if (muted) {
      this.stopAmbientArpeggio()
      this.stopMelody()
    }
  }

  public playSoftClick() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.05)
    } catch {
      // AudioContext fallback
    }
  }

  public playPageTurn() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      // Folhear sutil: dois pequenos impulsos harmônicos e filtro suave
      const osc1 = this.ctx.createOscillator()
      const osc2 = this.ctx.createOscillator()
      const gainNode = this.ctx.createGain()

      osc1.type = 'triangle'
      osc1.frequency.setValueAtTime(320, now)
      osc1.frequency.exponentialRampToValueAtTime(540, now + 0.08)

      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(640, now)
      osc2.frequency.exponentialRampToValueAtTime(220, now + 0.12)

      gainNode.gain.setValueAtTime(0.001, now)
      gainNode.gain.linearRampToValueAtTime(0.035, now + 0.03)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)

      osc1.connect(gainNode)
      osc2.connect(gainNode)
      gainNode.connect(this.ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.18)
      osc2.stop(now + 0.18)
    } catch {
      // Graceful fallback
    }
  }

  public playBlowCandle() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime

      // Sopro de velinha: ruído filtrado + sino agudo delicado
      const bufferSize = this.ctx.sampleRate * 0.25
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
      }

      const noise = this.ctx.createBufferSource()
      noise.buffer = buffer

      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(600, now)
      filter.frequency.linearRampToValueAtTime(200, now + 0.25)

      const gain = this.ctx.createGain()
      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      noise.start(now)
      noise.stop(now + 0.25)

      // Sino estelar que surge com a fumaça mágica
      setTimeout(() => {
        this.playMusicBoxNote(880, 0.08, 0.9) // A5
      }, 50)
    } catch {
      // Graceful fallback
    }
  }

  public playMusicBoxNote(freq = 523.25, volume = 0.09, duration = 1.2) {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime

      // Timbre característico de caixinha de música de metal/cristal:
      // Fundamental + 2º harmônico + 3º harmônico com decay rápido
      const osc1 = this.ctx.createOscillator()
      const osc2 = this.ctx.createOscillator()
      const osc3 = this.ctx.createOscillator()
      const gainNode = this.ctx.createGain()

      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(freq, now)

      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(freq * 2.76, now) // Harmônico inarmônico de lâmina metálica

      osc3.type = 'triangle'
      osc3.frequency.setValueAtTime(freq * 5.4, now)

      // Ataque instantâneo e decay exponencial
      gainNode.gain.setValueAtTime(volume, now)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration)

      osc1.connect(gainNode)
      osc2.connect(gainNode)
      osc3.connect(gainNode)
      gainNode.connect(this.ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc3.start(now)
      osc1.stop(now + duration)
      osc2.stop(now + duration)
      osc3.stop(now + duration)
    } catch {
      // Graceful fallback
    }
  }

  public playChime(freq = 587.33, volume = 0.12, duration = 1.8) {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime

      const osc1 = this.ctx.createOscillator()
      const osc2 = this.ctx.createOscillator()
      const gainNode = this.ctx.createGain()

      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(freq, now)

      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(freq * 2, now)

      gainNode.gain.setValueAtTime(0.001, now)
      gainNode.gain.exponentialRampToValueAtTime(volume, now + 0.04)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration)

      osc1.connect(gainNode)
      osc2.connect(gainNode)
      gainNode.connect(this.ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + duration)
      osc2.stop(now + duration)
    } catch {
      // Graceful fallback
    }
  }

  public playStarBurst() {
    if (this.isMuted) return
    const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]
    pentatonic.forEach((freq, idx) => {
      setTimeout(() => {
        this.playMusicBoxNote(freq, 0.08, 1.4)
      }, idx * 70)
    })
  }

  public playHappyBirthdayMelody() {
    if (this.isMuted) return
    this.initContext()
    this.stopMelody()

    this.isMelodyActive = true
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('celestial-melody-started', {
          detail: { track: 'Parabéns Pra Você (Caixinha de Cristal)' },
        })
      )
    }

    // Frequências das notas de "Parabéns Pra Você"
    const C4 = 261.63
    const D4 = 293.66
    const E4 = 329.63
    const F4 = 349.23
    const G4 = 392.0
    const A4 = 440.0
    const Bb4 = 466.16
    const C5 = 523.25

    // Sequência de notas e durações em ms
    const notes: { freq: number; delay: number; dur: number }[] = [
      // Pa-ra-béns pra vo-cê
      { freq: C4, delay: 0, dur: 350 },
      { freq: C4, delay: 350, dur: 300 },
      { freq: D4, delay: 700, dur: 600 },
      { freq: C4, delay: 1350, dur: 600 },
      { freq: F4, delay: 2000, dur: 600 },
      { freq: E4, delay: 2650, dur: 1100 },

      // Nes-ta da-ta que-ri-da
      { freq: C4, delay: 3900, dur: 350 },
      { freq: C4, delay: 4250, dur: 300 },
      { freq: D4, delay: 4600, dur: 600 },
      { freq: C4, delay: 5250, dur: 600 },
      { freq: G4, delay: 5900, dur: 600 },
      { freq: F4, delay: 6550, dur: 1100 },

      // Mui-tas fe-li-ci-da-des
      { freq: C4, delay: 7800, dur: 350 },
      { freq: C4, delay: 8150, dur: 300 },
      { freq: C5, delay: 8500, dur: 600 },
      { freq: A4, delay: 9150, dur: 600 },
      { freq: F4, delay: 9800, dur: 600 },
      { freq: E4, delay: 10450, dur: 600 },
      { freq: D4, delay: 11100, dur: 900 },

      // Mui-tos a-nos de vi-da
      { freq: Bb4, delay: 12150, dur: 350 },
      { freq: Bb4, delay: 12500, dur: 300 },
      { freq: A4, delay: 12850, dur: 600 },
      { freq: F4, delay: 13500, dur: 600 },
      { freq: G4, delay: 14150, dur: 600 },
      { freq: F4, delay: 14800, dur: 1500 },
    ]

    notes.forEach((item) => {
      const tid = window.setTimeout(() => {
        this.playMusicBoxNote(item.freq, 0.1, item.dur / 1000 + 0.4)
      }, item.delay)
      this.melodyTimeoutIds.push(tid)
    })

    const endTid = window.setTimeout(() => {
      this.isMelodyActive = false
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('celestial-melody-ended'))
      }
    }, 16300)
    this.melodyTimeoutIds.push(endTid)
  }

  public stopMelody() {
    this.melodyTimeoutIds.forEach((id) => clearTimeout(id))
    this.melodyTimeoutIds = []
    if (this.isMelodyActive) {
      this.isMelodyActive = false
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('celestial-melody-ended'))
      }
    }
  }

  public isMelodyPlaying(): boolean {
    return this.isMelodyActive
  }

  public isAmbientPlaying(): boolean {
    return this.ambientInterval !== null
  }

  public startAmbientArpeggio() {
    if (this.ambientInterval) return
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]
    let index = 0

    this.ambientInterval = window.setInterval(() => {
      if (this.isMuted) return
      const freq = notes[index % notes.length]
      this.playMusicBoxNote(freq, 0.045, 2.8)
      index++
    }, 2800)
  }

  public stopAmbientArpeggio() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval)
      this.ambientInterval = null
    }
  }

  public stopAll() {
    this.stopAmbientArpeggio()
    this.stopMelody()
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('celestial-audio-stopped'))
    }
  }
}

export const celestialAudio = new CelestialAudioEngine()
