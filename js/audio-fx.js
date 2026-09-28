/**
 * audio-fx.js - Web Audio Procedural Sound Synthesizer with Spatial Panning & Ambient Drone
 * Generates dynamic audio for all elemental visual effects:
 * Lightning thunder, fire crackle, smoke hiss, plasma hum, water splash, and ice freeze.
 * Includes progressive ambient drone and spatial stereo panning.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.masterGain = null;
    this.droneGain = null;
    this.droneFilter = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.isDronePlaying = false;
  }

  initContext() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.65, this.ctx.currentTime);
    
    // Connect AnalyserNode for HUD oscilloscope
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  drawWaveformToCanvas(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    if (!ctx) return;

    if (!this.analyser || this.muted) {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      return;
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.9)';
    ctx.beginPath();

    const sliceWidth = width / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * height) / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    ctx.lineTo(width, height / 2);
    ctx.stroke();
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.65, this.ctx.currentTime);
    }
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  _checkContext() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx && !this.muted;
  }

  _createPanner(pan = 0) {
    if (!this.ctx) return null;
    if (typeof this.ctx.createStereoPanner === 'function') {
      const panner = this.ctx.createStereoPanner();
      panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan)), this.ctx.currentTime);
      return panner;
    }
    return null;
  }

  /**
   * Continuous Procedural Ambient Cyber Drone
   * Dual detuned sub-bass sine waves through a modulated lowpass filter
   */
  startAmbientDrone() {
    if (!this._checkContext() || this.isDronePlaying) return;
    try {
      const t = this.ctx.currentTime;
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneFilter = this.ctx.createBiquadFilter();
      this.droneGain = this.ctx.createGain();

      this.droneOsc1.type = 'sawtooth';
      this.droneOsc1.frequency.setValueAtTime(55, t); // A1 note

      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(55.45, t); // Slight beating detune

      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.setValueAtTime(160, t);
      this.droneFilter.Q.setValueAtTime(3.5, t);

      this.droneGain.gain.setValueAtTime(0.001, t);
      this.droneGain.gain.exponentialRampToValueAtTime(0.18, t + 2.0);

      this.droneOsc1.connect(this.droneFilter);
      this.droneOsc2.connect(this.droneFilter);
      this.droneFilter.connect(this.droneGain);
      this.droneGain.connect(this.masterGain);

      this.droneOsc1.start(t);
      this.droneOsc2.start(t);
      this.isDronePlaying = true;
    } catch (e) {
      console.warn('Ambient drone audio init skipped:', e);
    }
  }

  /**
   * Scales the drone intensity and filter cutoff according to station progression
   * @param {number} progress (0.0 to 1.0)
   */
  setDroneIntensity(progress = 0) {
    if (!this.ctx || !this.droneFilter || !this.droneGain || !this.isDronePlaying) return;
    const t = this.ctx.currentTime;
    const clamped = Math.max(0, Math.min(1, progress));
    // Cutoff sweeps from 160Hz up to 850Hz as presentation escalates to climax
    const targetFreq = 160 + clamped * 690;
    const targetGain = 0.15 + clamped * 0.15;
    this.droneFilter.frequency.setTargetAtTime(targetFreq, t, 0.4);
    this.droneGain.gain.setTargetAtTime(targetGain, t, 0.4);
  }

  // 1. Lightning Thunder Crack (with spatial stereo panning)
  playThunderCrack(intensity = 1.0, pan = 0) {
    if (!this._checkContext()) return;
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800 * intensity, t);
    filter.frequency.exponentialRampToValueAtTime(80, t + 1.2);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.9 * intensity, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 1.4);

    const panner = this._createPanner(pan);

    noise.connect(filter);
    filter.connect(gain);
    if (panner) {
      gain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      gain.connect(this.masterGain);
    }

    noise.start(t);
    noise.stop(t + 1.5);
  }

  // 2. Fire Combustion & Crackle
  playFireCrackle(intensity = 1.0, pan = 0) {
    if (!this._checkContext()) return;
    const t = this.ctx.currentTime;
    const crackleCount = Math.floor(6 + intensity * 8);

    for (let i = 0; i < crackleCount; i++) {
      const delay = (i / crackleCount) * 0.7 + Math.random() * 0.05;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 + Math.random() * 280, t + delay);
      osc.frequency.exponentialRampToValueAtTime(40, t + delay + 0.08);

      gain.gain.setValueAtTime(0.2 * intensity, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.09);

      const panner = this._createPanner(pan);
      osc.connect(gain);
      if (panner) {
        gain.connect(panner);
        panner.connect(this.masterGain);
      } else {
        gain.connect(this.masterGain);
      }

      osc.start(t + delay);
      osc.stop(t + delay + 0.1);
    }
  }

  // 3. Smoke Vent Hiss
  playSmokeHiss(intensity = 1.0, pan = 0) {
    if (!this._checkContext()) return;
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.Q.setValueAtTime(2.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.25 * intensity, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.75);

    const panner = this._createPanner(pan);
    noise.connect(filter);
    filter.connect(gain);
    if (panner) {
      gain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      gain.connect(this.masterGain);
    }

    noise.start(t);
    noise.stop(t + 0.8);
  }

  // 4. Plasma Resonance Hum
  playPlasmaHum(intensity = 1.0, pan = 0) {
    if (!this._checkContext()) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(12, t);
    lfoGain.gain.setValueAtTime(30, t);

    lfo.connect(osc.frequency);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.4 * intensity, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

    const panner = this._createPanner(pan);
    osc.connect(gain);
    if (panner) {
      gain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      gain.connect(this.masterGain);
    }

    lfo.start(t);
    osc.start(t);
    lfo.stop(t + 0.95);
    osc.stop(t + 0.95);
  }

  // 5. Water Droplet Splash
  playWaterSplash(intensity = 1.0, pan = 0) {
    if (!this._checkContext()) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.3);

    gain.gain.setValueAtTime(0.5 * intensity, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

    const panner = this._createPanner(pan);
    osc.connect(gain);
    if (panner) {
      gain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      gain.connect(this.masterGain);
    }

    osc.start(t);
    osc.stop(t + 0.4);
  }

  // 6. Sub-Zero Ice Freeze
  playIceFreeze(intensity = 1.0, pan = 0) {
    if (!this._checkContext()) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(3200, t + 0.45);

    gain.gain.setValueAtTime(0.25 * intensity, t);
    gain.gain.exponentialRampToValueAtTime(0.005, t + 0.5);

    const panner = this._createPanner(pan);
    osc.connect(gain);
    if (panner) {
      gain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      gain.connect(this.masterGain);
    }

    osc.start(t);
    osc.stop(t + 0.55);
  }

  // 7. Slam Impact
  playSlamImpact() {
    if (!this._checkContext()) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.6);

    gain.gain.setValueAtTime(1.0, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.85);
  }

  // 8. Flight Whoosh
  playWhoosh(pan = 0) {
    if (!this._checkContext()) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.35);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

    const panner = this._createPanner(pan);
    osc.connect(gain);
    if (panner) {
      gain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      gain.connect(this.masterGain);
    }

    osc.start(t);
    osc.stop(t + 0.45);
  }

  // 9. Tamper Alarm Siren
  playAlarm() {
    if (!this._checkContext()) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.linearRampToValueAtTime(440, t + 0.25);
    osc.frequency.linearRampToValueAtTime(880, t + 0.5);
    osc.frequency.linearRampToValueAtTime(440, t + 0.75);
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.85);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.9);
  }

  // 10. Harmonic Resolution Chime
  playChime() {
    if (!this._checkContext()) return;
    const t = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => { // C Major Chord
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.08);
      gain.gain.setValueAtTime(0.001, t + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, t + i * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.8);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 0.85);
    });
  }
}

window.soundEngine = new SoundEngine();
