import { midiToFreq } from './music.js'

let audioCtx = null

function ctx() {
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// Organ-like sound using additive synthesis
function createOrganNote(frequency, gain = 0.15) {
  const ac = ctx()
  const masterGain = ac.createGain()
  masterGain.gain.value = 0
  masterGain.connect(ac.destination)

  // Harmonics that approximate an organ pipe (mix of flute + principal)
  const harmonics = [
    { ratio: 1,   amp: 1.0  },  // Fundamental (8')
    { ratio: 2,   amp: 0.5  },  // Octave (4')
    { ratio: 3,   amp: 0.2  },  // Quinte (2⅔')
    { ratio: 4,   amp: 0.3  },  // Doublette (2')
    { ratio: 6,   amp: 0.1  },  // Larigot (1⅓')
  ]

  const oscs = harmonics.map(({ ratio, amp }) => {
    const osc = ac.createOscillator()
    const g = ac.createGain()
    osc.type = 'sine'
    osc.frequency.value = frequency * ratio
    g.gain.value = amp * gain
    osc.connect(g)
    g.connect(masterGain)
    osc.start(ac.currentTime)
    return osc
  })

  return { masterGain, oscs, ac }
}

// Play a single note for a duration (seconds)
export function playNote(midiNote, duration = 1.2) {
  const ac = ctx()
  const freq = midiToFreq(midiNote)
  const { masterGain, oscs } = createOrganNote(freq, 0.12)

  const now = ac.currentTime
  masterGain.gain.linearRampToValueAtTime(1, now + 0.04)   // attack
  masterGain.gain.setValueAtTime(1, now + duration - 0.08) // sustain
  masterGain.gain.linearRampToValueAtTime(0, now + duration) // release

  oscs.forEach(osc => osc.stop(now + duration + 0.05))
}

// Play multiple notes simultaneously (chord)
export function playChord(midiNotes, duration = 2.0) {
  midiNotes.forEach(note => playNote(note, duration))
}

// Play a scale ascending then descending
export function playScale(midiNotes, bpm = 72) {
  const noteLen = 60 / bpm
  const allNotes = [...midiNotes, midiNotes[midiNotes.length - 1] + 12]

  allNotes.forEach((note, i) => {
    setTimeout(() => playNote(note, noteLen * 1.1), i * noteLen * 1000)
  })
}

// Play a sequence of chords with timing
// Returns a stop function
export function playProgression(chords, bpm = 60, onStep) {
  const beatLen = 60 / bpm  // seconds per beat
  const chordLen = beatLen * 4  // assume 4/4 time, 1 chord per bar
  let stopped = false
  const timeouts = []

  chords.forEach((chord, i) => {
    const t = setTimeout(() => {
      if (stopped) return
      playChord(chord.midiNotes, chordLen * 0.9)
      if (onStep) onStep(i)
    }, i * chordLen * 1000)
    timeouts.push(t)
  })

  return () => {
    stopped = true
    timeouts.forEach(clearTimeout)
  }
}
