/**
 * Procedural Celestial Sound Engine
 * Uses Web Audio API to synthesize delicate crystalline chimes and celestial lullaby tones.
 * Zero external audio files required — 100% reliable, zero CORS, low latency.
 */

class CelestialAudioEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = true
  private ambientInterval: number | null = null

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public toggleMute(): boolean {
    this.initContext()
    this.isMuted = !this.isMuted

    if (!this.isMuted) {
      this.startAmbientArpeggio()
      this.playChime(523.25, 0.15) // C5 greeting
      setTimeout(() => this.playChime(659.25, 0.12), 120) // E5
      setTimeout(() => this.playChime(783.99, 0.15), 240) // G5
      setTimeout(() => this.playChime(1046.50, 0.2), 380) // C6
    } else {
      this.stopAmbientArpeggio()
    }

    return !this.isMuted
  }

  public getIsMuted(): boolean {
    return this.isMuted
  }

  public playChime(freq = 587.33, volume = 0.12, duration = 1.8) {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const now = this.ctx.currentTime

    // Main celestial oscillator (Sine + subtle Triangle)
    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const gainNode = this.ctx.createGain()

    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(freq, now)

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(freq * 2, now) // Shimmer octave

    // Gentle envelope
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
  }

  public playStarBurst() {
    if (this.isMuted) return
    const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]
    pentatonic.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.08, 1.4)
      }, idx * 70)
    })
  }

  private startAmbientArpeggio() {
    if (this.ambientInterval) return
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]
    let index = 0

    this.ambientInterval = window.setInterval(() => {
      if (this.isMuted) return
      const freq = notes[index % notes.length]
      this.playChime(freq, 0.04, 3.2)
      index++
    }, 2800)
  }

  private stopAmbientArpeggio() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval)
      this.ambientInterval = null
    }
  }
}

export const celestialAudio = new CelestialAudioEngine()
