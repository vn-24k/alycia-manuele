import { celestialAudio } from './celestialSynth'

export const audioEngine = {
  start: () => celestialAudio.toggleMute(),
  toggle: () => celestialAudio.toggleMute(),
  playHarpChime: () => celestialAudio.playStarBurst(),
  playWarmDrone: () => celestialAudio.playChime(440, 0.1),
}
