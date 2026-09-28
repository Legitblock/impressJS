/**
 * presentation.js - LegitBlock 3D Cybernetic Presentation Orchestrator
 * Integrates impress.js 3D navigation with @tekromancy/tekromancy visual FX engines.
 * 
 * Progressive Intensity Curve:
 * Starts subtle and clean for early stations (00-02), expands into element mechanics (03-06),
 * and escalates to maximum intensity, screen impacts, and multi-element storms at the climax (07-10).
 * 
 * Includes:
 * - Live SHA-256 Block Mining sandbox (Web Crypto API)
 * - Precision Redline Document Diff selector
 * - Interactive Code-Enforced Democratic Voting Quorum engine
 * - Tamper Injection Attack & Gossip Consensus Auto-Healing
 * - Spatial Audio Panning & Progressive Ambient Sub-Bass Drone
 * - Touch Gestures & Haptics for Mobile
 */

import { TekromancyFX, StationFXController } from '@tekromancy/tekromancy';
import '@tekromancy/tekromancy/tekromancy.css';

/**
 * Slide / Station Effect Intensity Mapping (Scale: 1 to 100)
 * Toned down at start (gentle atmosphere) -> Ramped up towards the end (high-energy climax).
 */
const stationController = new StationFXController({
  // Station 00: Clean, serene genesis entrance
  'legitblock-portal': { lightning: 12, plasma: 10 },

  // Station 01: Minimal, crisp introduction to the corporate manifesto
  'station-manifesto': { lightning: 18, plasma: 15 },

  // Station 02: Introduction of cryptographic block hashing & SHA-256 mining
  'station-immutable-ledger': { lightning: 30, plasma: 25 },

  // Station 03: Document diff engine - gentle warm ember glow
  'station-diff-engine': { fire: 40, smoke: 25 },

  // Station 04: Governance & voting quorum - ionized plasma arcs
  'station-voting-governance': { plasma: 55, lightning: 20 },

  // Station 05: 32 Organization templates - crisp sub-zero frost crystallization
  'station-templates': { ice: 60, water: 35 },

  // Station 06: Enterprise LDAP directory authentication
  'station-enterprise-ldap': { plasma: 70, lightning: 45 },

  // Station 07: Hostile tamper defense alarm - intense high-voltage lightning & fire alarm
  'station-tamper-defense': { lightning: 95, fire: 80 },

  // Station 08: Full architectural stack - multi-element storm
  'station-unified-demo': { lightning: 85, fire: 75, plasma: 80, ice: 65, water: 50 },

  // Station 09: Developer quickstart - dynamic fluid rain & electricity
  'station-quickstart': { water: 75, lightning: 65, plasma: 60 },

  // Station 10: 3D Constellation overview - grand celestial overview
  'overview': { lightning: 80, plasma: 75, fire: 50 }
}, {
  defaultSettings: { lightning: 25 }
});

window.stationController = stationController;

// Initialize the unified multi-element FX orchestrator with ElementHighlighter
const tekromancyFX = new TekromancyFX({
  highlighter: {
    stationController,
    autoFlash: true,
    soundHandler: (fx, intensity) => {
      if (window.soundEngine) {
        switch (fx) {
          case 'lightning': window.soundEngine.playThunderCrack(intensity * 0.7); break;
          case 'fire': window.soundEngine.playFireCrackle(intensity); break;
          case 'smoke': window.soundEngine.playSmokeHiss(intensity); break;
          case 'plasma': window.soundEngine.playPlasmaHum(intensity); break;
          case 'water': window.soundEngine.playWaterSplash(intensity); break;
          case 'ice': window.soundEngine.playIceFreeze(intensity); break;
        }
      }
    }
  }
});

window.TekromancyFX = TekromancyFX;
window.tekromancyFX = tekromancyFX;

// Utility: Web Crypto SHA-256 hex digest
async function sha256Hex(str) {
  if (window.crypto && window.crypto.subtle) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback hash simulation if subtle crypto is unavailable
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}

function initShowcase() {
  const api = window.impress ? window.impress() : null;
  if (!api) {
    console.error('impress.js runtime not detected');
    return;
  }
  api.init();

  // Attach automated multi-element substep highlighting
  tekromancyFX.attachSubsteps({ impress: true });

  const steps = Array.from(document.querySelectorAll('#impress .step'));
  const totalSteps = steps.length;

  // Audio Context & Drone Auto-Start on user interaction
  let userInteracted = false;
  function ensureAudioStarted() {
    if (!userInteracted && window.soundEngine) {
      userInteracted = true;
      window.soundEngine.initContext();
      window.soundEngine.startAmbientDrone();
    }
  }
  window.addEventListener('click', ensureAudioStarted, { once: true });
  window.addEventListener('keydown', ensureAudioStarted, { once: true });
  window.addEventListener('touchstart', ensureAudioStarted, { once: true });

  // HUD DOM elements
  const currentStepEl = document.getElementById('hud-step-current');
  const totalStepEl = document.getElementById('hud-step-total');
  const progressBarEl = document.getElementById('hud-progress-fill');
  const stepTitleEl = document.getElementById('hud-step-title');
  const jumpMenu = document.getElementById('hud-jump-menu');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const overviewBtn = document.getElementById('btn-overview');
  const autoplayBtn = document.getElementById('btn-autoplay');
  const muteBtn = document.getElementById('btn-mute');
  const fullscreenBtn = document.getElementById('btn-fullscreen');
  const startBtn = document.getElementById('btn-start-presentation');
  const flashOverlay = document.getElementById('lightning-flash-overlay');
  const waveformCanvas = document.getElementById('hud-audio-waveform');
  const ecoBtn = document.getElementById('btn-eco-mode');
  const narrationBtn = document.getElementById('btn-narration');
  const gyroBtn = document.getElementById('btn-spatial-gyro');

  // Real-time Audio Spectrum Analyser Loop
  function animateWaveform() {
    if (window.soundEngine && waveformCanvas) {
      window.soundEngine.drawWaveformToCanvas(waveformCanvas);
    }
    requestAnimationFrame(animateWaveform);
  }
  animateWaveform();

  // ECO / Battery Saver Mode
  let isEcoMode = false;
  function toggleEcoMode() {
    isEcoMode = !isEcoMode;
    document.body.classList.toggle('eco-mode', isEcoMode);
    if (ecoBtn) {
      ecoBtn.classList.toggle('active-toggle', isEcoMode);
      ecoBtn.querySelector('span').textContent = isEcoMode ? 'ECO: ON' : 'ECO';
    }
    if (window.cyberCanvas) {
      window.cyberCanvas.setEcoMode(isEcoMode);
    }
  }

  if (ecoBtn) {
    ecoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleEcoMode();
      ecoBtn.blur();
    });
  }

  // Spatial WebXR / Gyroscopic Device Mode
  let isSpatialGyro = false;
  function handleOrientation(e) {
    if (!isSpatialGyro || isEcoMode) return;
    const beta = e.beta || 0;   // [-180, 180], pitch
    const gamma = e.gamma || 0; // [-90, 90], roll

    const tiltX = (beta - 45) * 0.15;
    const tiltY = gamma * 0.15;

    const globe = document.getElementById('globe-wireframe-container');
    if (globe) {
      globe.style.transform = `translate(-50%, -50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }

    const activeCards = document.querySelectorAll('.step.active .cyber-card');
    activeCards.forEach(card => {
      card.style.setProperty('--tilt-y', `${tiltY * 0.6}deg`);
      card.style.setProperty('--tilt-x', `${-tiltX * 0.6}deg`);
    });
  }

  function toggleSpatialGyro() {
    isSpatialGyro = !isSpatialGyro;
    if (gyroBtn) {
      gyroBtn.classList.toggle('active-toggle', isSpatialGyro);
      gyroBtn.querySelector('span').textContent = isSpatialGyro ? '🧭 Gyro: ON' : '🧭 Gyro 3D';
    }

    if (isSpatialGyro) {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(perm => {
            if (perm === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation, { passive: true });
            }
          })
          .catch(() => {});
      } else {
        window.addEventListener('deviceorientation', handleOrientation, { passive: true });
      }
      if (window.soundEngine) window.soundEngine.playTone(880, 'sine', 0.15, 0.08);
    } else {
      window.removeEventListener('deviceorientation', handleOrientation);
      const globe = document.getElementById('globe-wireframe-container');
      if (globe) globe.style.transform = '';
      if (window.soundEngine) window.soundEngine.playTone(440, 'sine', 0.15, 0.08);
    }
  }

  if (gyroBtn) {
    gyroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSpatialGyro();
      gyroBtn.blur();
    });
  }

  // 3D Pointer Parallax Card Tilt
  window.addEventListener('mousemove', (e) => {
    if (isEcoMode) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    const activeCards = document.querySelectorAll('.step.active .cyber-card');
    activeCards.forEach(card => {
      card.style.setProperty('--tilt-y', `${nx * 5}deg`);
      card.style.setProperty('--tilt-x', `${-ny * 5}deg`);
    });
  }, { passive: true });

  if (totalStepEl) {
    totalStepEl.textContent = String(totalSteps - 1).padStart(2, '0');
  }

  // Populate Jump Menu
  if (jumpMenu) {
    jumpMenu.innerHTML = '';
    steps.forEach((step, idx) => {
      const option = document.createElement('option');
      option.value = step.id;
      const title = step.getAttribute('data-title') || step.querySelector('h1, h2')?.textContent?.trim() || `Station ${idx}`;
      if (step.id === 'legitblock-portal') {
        option.textContent = `00. Genesis Gateway`;
      } else {
        option.textContent = `${String(idx).padStart(2, '0')}. ${title.slice(0, 32)}`;
      }
      jumpMenu.appendChild(option);
    });

    jumpMenu.addEventListener('change', (e) => {
      api.goto(e.target.value);
      jumpMenu.blur();
    });
  }

  // Navigation Button Handlers
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      ensureAudioStarted();
      api.prev();
      prevBtn.blur();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      ensureAudioStarted();
      api.next();
      nextBtn.blur();
    });
  }
  if (overviewBtn) {
    overviewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      ensureAudioStarted();
      api.goto('overview');
      overviewBtn.blur();
    });
  }

  // Autoplay handler (7s advance)
  let autoplayInterval = null;
  function toggleAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
      if (autoplayBtn) {
        autoplayBtn.classList.remove('active-toggle');
        autoplayBtn.querySelector('span').textContent = 'Autoplay';
      }
    } else {
      ensureAudioStarted();
      autoplayInterval = setInterval(() => {
        api.next();
      }, 7000);
      if (autoplayBtn) {
        autoplayBtn.classList.add('active-toggle');
        autoplayBtn.querySelector('span').textContent = 'Pause';
      }
    }
  }

  if (autoplayBtn) {
    autoplayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleAutoplay();
      autoplayBtn.blur();
    });
  }

  // Audio Mute Toggle
  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      ensureAudioStarted();
      if (window.soundEngine) {
        const isMuted = window.soundEngine.toggleMute();
        muteBtn.classList.toggle('active-toggle', isMuted);
        muteBtn.querySelector('span').textContent = isMuted ? 'Unmute' : 'Mute';
      }
      muteBtn.blur();
    });
  }

  // Fullscreen Toggle
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
      fullscreenBtn.blur();
    });
  }

  // =========================================================================
  // AI CYBER VOICE NARRATION (WEB SPEECH API)
  // =========================================================================
  const narrationScripts = {
    'legitblock-portal': 'Welcome to LegitBlock. An immutable distributed ledger for statutory corporate records, democratic voting, and Delaware General Corporation Law Section 224 compliance.',
    'station-manifesto': 'Traditional organizations rely on paper bylaws and contested meeting minutes. LegitBlock transforms corporate law into cryptographic truth.',
    'station-immutable-ledger': 'Every corporate charter, board resolution, and equity issuance is chained with SHA-256 hash pointers, rendering past records mathematically tamper-proof.',
    'station-diff-engine': 'Inspect structured corporate redlines line by line. Every amendment is verified by cryptographic diffs before ratification.',
    'station-voting-governance': 'Democratic governance in action. Code-enforced quorum prevents illegal resolutions from ever binding the corporation.',
    'station-templates': 'Thirty-two statutory templates covering Delaware C-Corporations, 501(c)(3) charities, worker cooperatives, and mutual aid networks.',
    'station-enterprise-ldap': 'Enterprise identity federation bridges corporate Active Directory and LDAP directly into cryptographic voting weights.',
    'station-tamper-defense': 'Cryptographic tamper defense isolates fraudulent block modifications within milliseconds.',
    'station-unified-demo': 'Interactive console execution. Mine blocks, verify chains, and inspect minute book audit trails directly in the browser.',
    'station-quickstart': 'Launch your cryptographic corporate ledger in minutes using the LegitBlock CLI or Next.js portal.',
    'overview': 'Viewing the complete organizational galaxy constellation.'
  };

  let narrationEnabled = false;

  function speakStationNarration(stationId) {
    if (!narrationEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const text = narrationScripts[stationId];
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const synthVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Samantha')));
    if (synthVoice) utterance.voice = synthVoice;

    window.speechSynthesis.speak(utterance);
  }

  function toggleNarration() {
    narrationEnabled = !narrationEnabled;
    if (narrationBtn) {
      narrationBtn.classList.toggle('active-toggle', narrationEnabled);
      narrationBtn.querySelector('span').textContent = narrationEnabled ? '🎙️ Narration ON' : '🎙️ Voice';
    }
    if (narrationEnabled) {
      const activeStep = document.querySelector('.step.active');
      if (activeStep) speakStationNarration(activeStep.id);
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }

  if (narrationBtn) {
    narrationBtn.addEventListener('click', (e) => {
      e.preventDefault();
      ensureAudioStarted();
      toggleNarration();
      narrationBtn.blur();
    });
  }

  // Smooth gateway entry plunge
  function triggerWarpPlunge() {
    ensureAudioStarted();
    if (window.soundEngine) {
      window.soundEngine.playWhoosh();
    }
    // Subtle initial transition
    tekromancyFX.storm({ lightning: 25, plasma: 20 }, 2200);
    api.goto('station-manifesto');
  }

  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      startBtn.blur();
      triggerWarpPlunge();
    });
  }

  let previousStepId = null;

  // Slide Transition Departure: triggers atmospheric background transition FX
  document.addEventListener('impress:stepleave', (event) => {
    previousStepId = event.target.id;
    const nextStep = event.detail?.next;
    const nextStepId = nextStep?.id;

    if (window.cyberCanvas) {
      window.cyberCanvas.setActiveStation(nextStepId);
      window.cyberCanvas.setOverview(nextStepId === 'overview');
    }

    const fxConfig = stationController.get(nextStep || nextStepId);
    const prevIndex = steps.findIndex(s => s.id === previousStepId);
    const nextIndex = steps.findIndex(s => s.id === nextStepId);

    // Progressive transition duration:
    // Early slides transition smoothly (1400ms - 1800ms)
    // Climax slides have expansive, sweeping transitions (2200ms - 2800ms)
    const duration = nextIndex >= 7 ? 2600 : (nextIndex >= 4 ? 2000 : 1600);

    // Compute spatial panning based on direction of slide advancement
    const panDirection = nextIndex >= prevIndex ? 0.4 : -0.4;

    // Trigger multi-element storm tailored to incoming station
    tekromancyFX.storm(fxConfig, duration);

    // Audio accompaniment scaled by progressive intensity
    if (window.soundEngine) {
      if (fxConfig.lightning && fxConfig.lightning > 40) {
        window.soundEngine.playThunderCrack((fxConfig.lightning / 100) * 0.9, panDirection);
      } else if (fxConfig.fire && fxConfig.fire > 35) {
        window.soundEngine.playFireCrackle((fxConfig.fire / 100) * 0.85, panDirection);
      } else if (fxConfig.plasma && fxConfig.plasma > 35) {
        window.soundEngine.playPlasmaHum((fxConfig.plasma / 100) * 0.85, panDirection);
      } else if (fxConfig.water && fxConfig.water > 35) {
        window.soundEngine.playWaterSplash((fxConfig.water / 100) * 0.85, panDirection);
      } else if (fxConfig.ice && fxConfig.ice > 35) {
        window.soundEngine.playIceFreeze((fxConfig.ice / 100) * 0.85, panDirection);
      } else {
        window.soundEngine.playWhoosh(panDirection);
      }
    }
  });

  // Slide Transition Arrival: updates HUD, triggers progressive impacts
  document.addEventListener('impress:stepenter', (event) => {
    const activeStep = event.target;
    const stepId = activeStep.id;
    const stepIndex = steps.indexOf(activeStep);

    if (window.cyberCanvas) {
      window.cyberCanvas.setActiveStation(stepId);
      window.cyberCanvas.setOverview(stepId === 'overview');
    }

    // Modulate ambient drone harmonic intensity based on station progression
    if (window.soundEngine) {
      window.soundEngine.setDroneIntensity(stepIndex / (totalSteps - 1));
    }

    // Update Step Counter
    if (currentStepEl) {
      currentStepEl.textContent = stepId === 'legitblock-portal' ? '00' : String(stepIndex).padStart(2, '0');
    }

    // Update Progress Bar
    if (progressBarEl) {
      const pct = stepId === 'legitblock-portal' ? 0 : (stepIndex / (totalSteps - 1)) * 100;
      progressBarEl.style.width = `${pct}%`;
    }

    // Update Title in HUD
    const titleAttr = activeStep.getAttribute('data-title') || activeStep.querySelector('h1, h2')?.textContent?.trim() || 'LegitBlock';
    if (stepTitleEl) {
      stepTitleEl.textContent = titleAttr;
    }

    // Sync Jump Menu
    if (jumpMenu) {
      jumpMenu.value = stepId;
    }

    // Progressive arrival effects:
    // Stations 00-03: Very light, subtle flash (or none)
    // Stations 04-06: Mild energy presence
    // Stations 07-10: High-intensity screen flash, shockwave shake, and dramatic lightning strikes
    if (stepId === 'station-tamper-defense') {
      // Climax tamper alarm
      if (tekromancyFX.lightning) {
        tekromancyFX.lightning.flash(0.95, 260);
      }
      if (flashOverlay) {
        flashOverlay.classList.add('flash');
        setTimeout(() => flashOverlay.classList.remove('flash'), 160);
      }
      if (window.soundEngine) {
        window.soundEngine.playSlamImpact();
      }
      document.body.classList.add('screen-impact-shake');
      setTimeout(() => document.body.classList.remove('screen-impact-shake'), 650);
    } else if (stepId === 'overview') {
      // Grand overview arrival: wide celestial flash
      if (tekromancyFX.lightning) {
        tekromancyFX.lightning.flash(0.7, 200);
      }
      if (window.soundEngine) {
        window.soundEngine.playWhoosh();
      }
    } else if (stepIndex >= 4) {
      const fxConfig = stationController.get(activeStep);
      if (fxConfig.lightning && tekromancyFX.lightning && fxConfig.lightning > 30) {
        tekromancyFX.lightning.flash((fxConfig.lightning / 100) * 0.45, 120);
      }
    }

    // AI Cyber Voice Narration
    speakStationNarration(stepId);
  });

  // Wire orbital node cards in Constellation Overview for quick jump
  document.querySelectorAll('.orbital-node-card[data-goto]').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = card.getAttribute('data-goto');
      if (target) {
        if (window.soundEngine) window.soundEngine.playWhoosh();
        api.goto(target);
      }
    });
  });

  function bindBtn(id, handler) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      ensureAudioStarted();
      handler(e);
      el.blur();
    });
  }

  // =========================================================================
  // INTERACTIVE EXPERIMENTAL SANDBOXES
  // =========================================================================

  // --- Station 01: Manifesto ---
  bindBtn('btn-test-manifesto-fx', () => {
    tekromancyFX.storm({ lightning: 35, plasma: 30 }, 1800);
    if (window.soundEngine) window.soundEngine.playThunderCrack(0.5);
  });

  bindBtn('btn-manifesto-encircle', () => {
    const cards = document.querySelectorAll('#station-manifesto .cyber-card');
    if (cards[0]) tekromancyFX.encircle(cards[0], 'lightning', { duration: 1600 });
    if (cards[1]) tekromancyFX.encircle(cards[1], 'plasma', { duration: 1600 });
    if (cards[2]) tekromancyFX.encircle(cards[2], 'fire', { duration: 1600 });
    if (window.soundEngine) window.soundEngine.playPlasmaHum(0.6);
  });

  // --- Station 02: Cryptographic Ledger & Live Mining Sandbox ---
  let isMining = false;
  async function runMiningSandbox() {
    if (isMining) return;
    isMining = true;

    const payloadInput = document.getElementById('mining-payload-input');
    const payload = payloadInput?.value?.trim() || 'RATIFY_SERIES_A_AMENDMENT';
    const statusEl = document.getElementById('mining-status-text');
    const nonceEl = document.getElementById('mining-nonce-display');
    const hashEl = document.getElementById('mining-hash-display');
    const codeEl = document.querySelector('#ledger-demo-card pre code');

    if (statusEl) {
      statusEl.textContent = 'HASHING...';
      statusEl.style.color = 'var(--plasma)';
    }

    let nonce = Math.floor(Math.random() * 20000) + 10000;
    let iterations = 0;
    const maxIterations = 20;

    const interval = setInterval(async () => {
      iterations++;
      nonce += 137;
      const candidateStr = `${nonce}:${payload}:${Date.now()}`;
      const rawHash = await sha256Hex(candidateStr);

      if (nonceEl) nonceEl.textContent = nonce.toLocaleString();
      if (hashEl) hashEl.textContent = rawHash.slice(0, 16) + '...';

      if (iterations >= maxIterations) {
        clearInterval(interval);
        const validHash = '0000' + rawHash.slice(4);
        if (nonceEl) nonceEl.textContent = nonce.toLocaleString();
        if (hashEl) hashEl.textContent = validHash.slice(0, 16) + '...';

        if (statusEl) {
          statusEl.textContent = 'MINED // SEALED';
          statusEl.style.color = '#4ade80';
        }

        if (codeEl) {
          codeEl.textContent = JSON.stringify({
            index: 42,
            timestamp: new Date().toISOString(),
            previousHash: "0000a4b9c1d2e...",
            hash: validHash.slice(0, 22) + "...",
            nonce: nonce,
            data: {
              action: payload,
              documentId: "bylaws-v2.0",
              diffHash: rawHash.slice(0, 8) + "...",
              votes: { yes: 9, no: 1, passed: true }
            }
          }, null, 2);
        }

        const card = document.getElementById('ledger-demo-card');
        const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };
        tekromancyFX.lightning?.strike(window.innerWidth * 0.45, 0, rect.left + rect.width * 0.5, rect.top + rect.height * 0.5);
        tekromancyFX.encircle('#ledger-demo-card', 'lightning', { duration: 1800 });

        if (window.soundEngine) {
          window.soundEngine.playThunderCrack(0.85);
          window.soundEngine.playChime();
        }
        isMining = false;
      }
    }, 45);
  }

  bindBtn('btn-ledger-mine-block', runMiningSandbox);

  // --- Station 02: DGCL § 224 Certificate Export Modal ---
  const certModal = document.getElementById('certificate-modal');
  const certCloseBtn = document.getElementById('btn-close-certificate');
  const certTextEl = document.getElementById('certificate-text');
  const certCopyBtn = document.getElementById('btn-copy-cert-json');
  const certDownloadBtn = document.getElementById('btn-download-cert');
  const certPrintBtn = document.getElementById('btn-print-cert');
  const certCopyFeedback = document.getElementById('cert-copy-feedback');

  function getActiveCertificateData() {
    const payloadInput = document.getElementById('mining-payload-input');
    const nonceEl = document.getElementById('mining-nonce-display');
    const hashEl = document.getElementById('mining-hash-display');

    const action = payloadInput?.value?.trim() || 'RATIFY_SERIES_A_AMENDMENT';
    const nonce = nonceEl?.textContent?.trim() || '38,419';
    const hash = hashEl?.textContent?.trim() || '00003f9e8a71c5b8e42f...';

    return {
      standard: "Delaware General Corporation Law (DGCL) § 224",
      recordType: "CORPORATE_STOCK_LEDGER_AND_MINUTES_RECORD",
      attestationDate: new Date().toISOString(),
      organization: {
        name: "Acme Corporation Inc.",
        jurisdiction: "Delaware, United States",
        entityType: "For-Profit Delaware C-Corporation",
        fileNumber: "DE-7491028"
      },
      blockRecord: {
        blockIndex: 42,
        payloadAction: action,
        previousHash: "0000a4b9c1d2e879f3a2c5b8...",
        blockHash: hash,
        nonce: nonce,
        merkleRoot: "8f31ba942e6178bc1050d2ef...",
        status: "PERMANENTLY_RATIFIED_AND_IMMUTABLE"
      },
      quorumProof: {
        quorumRequirement: "75.0% Supermajority",
        quorumAchieved: "80.0%",
        castVoteTallies: { yesWeight: "80.0%", noWeight: "10.0%", abstainWeight: "10.0%" },
        passingMajoritySatisfied: true
      },
      statutoryCertification: "This digital record constitutes a valid, non-repudiable entry in the official corporate ledger under Delaware Code Title 8 § 224."
    };
  }

  function openCertificateModal() {
    const cert = getActiveCertificateData();
    if (certTextEl) {
      certTextEl.textContent = JSON.stringify(cert, null, 2);
    }
    if (certModal) {
      certModal.style.display = 'flex';
      certModal.setAttribute('aria-hidden', 'false');
    }
    if (window.soundEngine) window.soundEngine.playChime();
  }

  function closeCertificateModal() {
    if (certModal) {
      certModal.style.display = 'none';
      certModal.setAttribute('aria-hidden', 'true');
    }
  }

  bindBtn('btn-export-certificate', openCertificateModal);
  if (certCloseBtn) certCloseBtn.addEventListener('click', closeCertificateModal);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertificateModal();
    });
  }

  if (certCopyBtn) {
    certCopyBtn.addEventListener('click', async () => {
      const cert = getActiveCertificateData();
      await navigator.clipboard.writeText(JSON.stringify(cert, null, 2));
      if (certCopyFeedback) {
        certCopyFeedback.style.display = 'inline';
        setTimeout(() => { certCopyFeedback.style.display = 'none'; }, 2000);
      }
    });
  }

  if (certDownloadBtn) {
    certDownloadBtn.addEventListener('click', () => {
      const cert = getActiveCertificateData();
      const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'legitblock-dgcl-224-cert-block42.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (certPrintBtn) {
    certPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  bindBtn('btn-ledger-encircle', () => {
    tekromancyFX.encircle('#ledger-demo-card', 'lightning', { duration: 1800 });
    if (window.soundEngine) window.soundEngine.playThunderCrack(0.5);
  });

  // --- Station 03: Precision Diff Clause Selector Sandbox & Custom Redline ---
  const clauseDiffs = {
    capital: `
<div class="diff-line diff-context">@@ -14,5 +14,5 @@ Article IV: Authorized Capital</div>
<div class="diff-line diff-del">- Total authorized common shares: 10,000,000 ($0.0001 par value)</div>
<div class="diff-line diff-add">+ Total authorized common shares: 25,000,000 ($0.0001 par value)</div>
<div class="diff-line diff-context">  Stock split factor: 2.5-for-1 forward split</div>
<div class="diff-line diff-add">+ Preferred Series A: 5,000,000 designated shares</div>
    `,
    quorum: `
<div class="diff-line diff-context">@@ -32,4 +32,4 @@ Article VII: Board Quorum & Action</div>
<div class="diff-line diff-del">- Quorum requirement: Simple majority (>50%) of seated directors</div>
<div class="diff-line diff-add">+ Quorum requirement: Supermajority (75%) of seated directors</div>
<div class="diff-line diff-context">  Action without meeting: Unanimous cryptographic consent</div>
<div class="diff-line diff-add">+ Emergency session quorum: 66.7% with 24hr cryptographic notice</div>
    `,
    voting: `
<div class="diff-line diff-context">@@ -58,4 +58,4 @@ Article XII: Voting Mechanism</div>
<div class="diff-line diff-del">- Balloting channel: Hand vote or submitted paper proxy</div>
<div class="diff-line diff-add">+ Balloting channel: LegitBlock SHA-256 cryptographic ledger</div>
<div class="diff-line diff-context">  Ballot retention: Minimum 7 statutory years</div>
<div class="diff-line diff-add">+ Ratification constraint: Instant block seal upon quorum fulfillment</div>
    `
  };

  const clauseSelect = document.getElementById('diff-clause-select');
  const customContainer = document.getElementById('diff-custom-container');
  const customInput = document.getElementById('diff-custom-input');

  async function updateCustomDiff() {
    const diffViewer = document.querySelector('#diff-demo-card .diff-viewer');
    if (!diffViewer) return;
    const customText = customInput?.value?.trim() || "Article XV: Dissolution requires 90% member supermajority.";
    const hash = await sha256Hex(customText);
    const escaped = customText.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    diffViewer.innerHTML = `
<div class="diff-line diff-context">@@ -1,3 +1,3 @@ Custom Draft Redline</div>
<div class="diff-line diff-del">- [Prior Statutory Provision Draft]</div>
<div class="diff-line diff-add">+ ${escaped}</div>
<div class="diff-line diff-context">  Payload SHA-256: ${hash.slice(0, 24)}...</div>
    `.trim();
  }

  if (clauseSelect) {
    clauseSelect.addEventListener('change', (e) => {
      ensureAudioStarted();
      const key = e.target.value;
      const diffViewer = document.querySelector('#diff-demo-card .diff-viewer');

      if (key === 'custom') {
        if (customContainer) customContainer.style.display = 'block';
        if (customInput) customInput.focus();
        updateCustomDiff();
        return;
      } else {
        if (customContainer) customContainer.style.display = 'none';
      }

      if (diffViewer && clauseDiffs[key]) {
        diffViewer.innerHTML = clauseDiffs[key].trim();
        const card = document.getElementById('diff-demo-card');
        const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };
        tekromancyFX.fire?.burst(rect.left + rect.width * 0.5, rect.top + rect.height * 0.5, 35, { theme: 'amber' });
        if (window.soundEngine) window.soundEngine.playFireCrackle(0.55);
      }
    });
  }

  if (customInput) {
    customInput.addEventListener('input', updateCustomDiff);
  }

  bindBtn('btn-diff-burn-amendment', () => {
    const card = document.getElementById('diff-demo-card');
    const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };
    const cx = rect.left + rect.width * 0.5;
    const cy = rect.top + rect.height * 0.5;
    tekromancyFX.fire?.burst(cx, cy, 50, { theme: 'amber' });
    tekromancyFX.smoke?.burst(cx, cy - 20, 25);
    if (window.soundEngine) window.soundEngine.playFireCrackle(0.7);
  });

  bindBtn('btn-diff-encircle', () => {
    tekromancyFX.encircle('#diff-demo-card', 'fire', { duration: 1800 });
    if (window.soundEngine) window.soundEngine.playFireCrackle(0.6);
  });

  // --- Station 10: Overview Auto-Orbit Loop ---
  let autoOrbitActive = false;
  let autoOrbitAngle = 0;
  let autoOrbitRaf = null;
  const autoOrbitBtn = document.getElementById('btn-auto-orbit');

  function toggleAutoOrbit() {
    autoOrbitActive = !autoOrbitActive;
    if (autoOrbitBtn) {
      autoOrbitBtn.querySelector('span').textContent = autoOrbitActive ? '🔄 Auto-Orbit: ON' : '🔄 Auto-Orbit: OFF';
      autoOrbitBtn.classList.toggle('active-toggle', autoOrbitActive);
    }
    if (autoOrbitActive) {
      startAutoOrbit();
    } else {
      stopAutoOrbit();
    }
  }

  function startAutoOrbit() {
    if (autoOrbitRaf) cancelAnimationFrame(autoOrbitRaf);
    function loop() {
      if (!autoOrbitActive) return;
      autoOrbitAngle = (autoOrbitAngle + 0.35) % 360;
      const globe = document.getElementById('globe-wireframe-container');
      if (globe) {
        globe.style.transform = `rotateY(${autoOrbitAngle}deg)`;
      }
      autoOrbitRaf = requestAnimationFrame(loop);
    }
    loop();
  }

  function stopAutoOrbit() {
    if (autoOrbitRaf) cancelAnimationFrame(autoOrbitRaf);
    autoOrbitRaf = null;
  }

  if (autoOrbitBtn) {
    autoOrbitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleAutoOrbit();
      autoOrbitBtn.blur();
    });
  }

  // --- Station 04: Democratic Governance & Live Quorum Sandbox ---
  const voterWeights = {
    alice: 35,
    bob: 25,
    carol: 20,
    dave: 10,
    eve: 10
  };

  const voterCards = Array.from(document.querySelectorAll('.voter-card[data-voter]'));

  function recalculateVotingQuorum() {
    let participatingWeight = 0;
    let yesWeight = 0;
    let noWeight = 0;

    voterCards.forEach(card => {
      const voter = card.getAttribute('data-voter');
      const vote = card.getAttribute('data-vote');
      const weight = voterWeights[voter] || 0;

      if (vote === 'yes') {
        participatingWeight += weight;
        yesWeight += weight;
      } else if (vote === 'no') {
        participatingWeight += weight;
        noWeight += weight;
      }
    });

    const quorumAchievedPct = participatingWeight;
    const majorityPct = participatingWeight > 0 ? (yesWeight / participatingWeight) * 100 : 0;

    const quorumEl = document.getElementById('voting-quorum-pct');
    const quorumBar = document.getElementById('voting-quorum-bar');
    const majorityEl = document.getElementById('voting-majority-pct');
    const majorityBar = document.getElementById('voting-majority-bar');
    const statusEl = document.getElementById('voting-ratify-status');

    if (quorumEl) quorumEl.textContent = `${quorumAchievedPct.toFixed(1)}% Achieved`;
    if (quorumBar) quorumBar.style.width = `${quorumAchievedPct}%`;

    if (majorityEl) majorityEl.textContent = `${majorityPct.toFixed(1)}% (${yesWeight}% YES / ${noWeight}% NO)`;
    if (majorityBar) majorityBar.style.width = `${majorityPct}%`;

    const isSatisfied = quorumAchievedPct >= 75 && majorityPct > 50;
    if (statusEl) {
      if (isSatisfied) {
        statusEl.textContent = '✔ QUORUM SATISFIED: READY FOR RATIFICATION BLOCK';
        statusEl.style.color = '#4ade80';
      } else {
        statusEl.textContent = '✖ QUORUM / MAJORITY DEFICIT: RATIFICATION BLOCKED';
        statusEl.style.color = '#f87171';
      }
    }

    return isSatisfied;
  }

  // =========================================================================
  // MULTIPLAYER LIVE AUDIENCE BALLOTING VIA BROADCASTCHANNEL
  // =========================================================================
  let governanceChannel = null;
  const audienceBadge = document.getElementById('audience-sync-badge');
  const audienceBtn = document.getElementById('btn-audience-sync');

  try {
    if (typeof BroadcastChannel !== 'undefined') {
      governanceChannel = new BroadcastChannel('legitblock_governance_channel');
      governanceChannel.onmessage = (event) => {
        const data = event.data;
        if (data && data.type === 'VOTE_CAST') {
          const card = voterCards.find(c => c.getAttribute('data-voter') === data.voter);
          if (card) {
            card.setAttribute('data-vote', data.vote);
            const badge = card.querySelector('.voter-badge');
            if (badge) {
              badge.className = `voter-badge vote-${data.vote}`;
              badge.textContent = data.vote.toUpperCase();
            }
            recalculateVotingQuorum();
            if (window.soundEngine) window.soundEngine.playPlasmaHum(0.4);
            if (audienceBadge) {
              audienceBadge.style.display = 'block';
              audienceBadge.textContent = `📡 AUDIENCE BALLOT SYNCED: ${data.voter.toUpperCase()} -> ${data.vote.toUpperCase()}`;
            }
          }
        }
      };
    }
  } catch (err) {
    console.warn('BroadcastChannel not available:', err);
  }

  voterCards.forEach(card => {
    card.addEventListener('click', () => {
      ensureAudioStarted();
      const currentVote = card.getAttribute('data-vote');
      let nextVote = 'yes';
      if (currentVote === 'yes') nextVote = 'no';
      else if (currentVote === 'no') nextVote = 'abstain';
      else nextVote = 'yes';

      card.setAttribute('data-vote', nextVote);
      const badge = card.querySelector('.voter-badge');
      if (badge) {
        badge.className = `voter-badge vote-${nextVote}`;
        badge.textContent = nextVote.toUpperCase();
      }

      if (window.soundEngine) window.soundEngine.playPlasmaHum(0.4);
      recalculateVotingQuorum();

      if (governanceChannel) {
        governanceChannel.postMessage({
          type: 'VOTE_CAST',
          voter: card.getAttribute('data-voter'),
          vote: nextVote,
          timestamp: Date.now()
        });
      }
    });
  });

  if (audienceBtn) {
    audienceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      ensureAudioStarted();
      const votersList = ['alice', 'bob', 'carol', 'dave', 'eve'];
      const randomVoter = votersList[Math.floor(Math.random() * votersList.length)];
      const card = voterCards.find(c => c.getAttribute('data-voter') === randomVoter);
      if (card) {
        const curVote = card.getAttribute('data-vote');
        const nextVote = curVote === 'yes' ? 'no' : (curVote === 'no' ? 'abstain' : 'yes');
        card.setAttribute('data-vote', nextVote);
        const badge = card.querySelector('.voter-badge');
        if (badge) {
          badge.className = `voter-badge vote-${nextVote}`;
          badge.textContent = nextVote.toUpperCase();
        }
        recalculateVotingQuorum();
        if (window.soundEngine) window.soundEngine.playPlasmaHum(0.6);

        if (governanceChannel) {
          governanceChannel.postMessage({
            type: 'VOTE_CAST',
            voter: randomVoter,
            vote: nextVote,
            timestamp: Date.now()
          });
        }

        if (audienceBadge) {
          audienceBadge.style.display = 'block';
          audienceBadge.textContent = `📡 AUDIENCE BALLOT BROADCAST: ${randomVoter.toUpperCase()} -> ${nextVote.toUpperCase()} (SYNCED ACROSS TABS)`;
        }
      }
      audienceBtn.blur();
    });
  }

  bindBtn('btn-voting-cast-vote', () => {
    // Cycle the first card that can be switched
    const targetCard = voterCards.find(c => c.getAttribute('data-vote') !== 'yes') || voterCards[0];
    if (targetCard) {
      targetCard.click();
    }
  });

  bindBtn('btn-voting-ratify', () => {
    const isReady = recalculateVotingQuorum();
    const card = document.getElementById('voting-demo-card');
    const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };

    if (isReady) {
      tekromancyFX.plasma?.strikeOrb(rect.left + rect.width * 0.5, rect.top + rect.height * 0.5, 55);
      tekromancyFX.encircle('#voting-demo-card', 'plasma', { duration: 2200 });
      tekromancyFX.lightning?.flash(0.5, 160);
      if (window.soundEngine) {
        window.soundEngine.playChime();
        window.soundEngine.playPlasmaHum(0.85);
      }
    } else {
      document.body.classList.add('screen-impact-shake');
      setTimeout(() => document.body.classList.remove('screen-impact-shake'), 400);
      if (window.soundEngine) window.soundEngine.playAlarm();
    }
  });

  // --- Station 05: Templates ---
  bindBtn('btn-templates-freeze', () => {
    const card = document.getElementById('templates-demo-card');
    if (card) {
      tekromancyFX.ice?.freeze(card, { duration: 2000, intensity: 1.2 });
    }
    if (window.soundEngine) window.soundEngine.playIceFreeze(0.8);
  });

  bindBtn('btn-templates-encircle', () => {
    tekromancyFX.encircle('#templates-demo-card', 'ice', { duration: 2000 });
    if (window.soundEngine) window.soundEngine.playIceFreeze(0.7);
  });

  // --- Station 06: Enterprise LDAP ---
  bindBtn('btn-ldap-authenticate', () => {
    tekromancyFX.storm({ lightning: 50, plasma: 65 }, 1800);
    tekromancyFX.encircle('#ldap-demo-card', 'plasma', { duration: 2000 });
    if (window.soundEngine) window.soundEngine.playPlasmaHum(0.85);
  });

  // --- Station 07: Cryptographic Tamper Defense & Consensus Auto-Healing ---
  const nodeBlock03 = document.getElementById('node-block-03');
  const nodeBlock04 = document.getElementById('node-block-04');
  const nodeBlock05 = document.getElementById('node-block-05');
  const tamperTerminal = document.getElementById('tamper-terminal');
  const tamperTerminalText = document.getElementById('tamper-terminal-text');

  let isTampered = false;

  function triggerTamperAttack() {
    isTampered = true;
    if (nodeBlock03) {
      nodeBlock03.className = 'chain-block-node corrupted';
      nodeBlock03.innerHTML = 'BLK #03<br><span style="color:#ef4444;">CORRUPTED</span>';
    }
    if (nodeBlock04) {
      nodeBlock04.className = 'chain-block-node corrupted';
      nodeBlock04.innerHTML = 'BLK #04<br><span style="color:#ef4444;">BROKEN</span>';
    }
    if (nodeBlock05) {
      nodeBlock05.className = 'chain-block-node corrupted';
      nodeBlock05.innerHTML = 'BLK #05<br><span style="color:#ef4444;">BROKEN</span>';
    }
    if (tamperTerminal) {
      tamperTerminal.style.borderColor = 'rgba(239, 68, 68, 0.6)';
    }
    if (tamperTerminalText) {
      tamperTerminalText.style.color = '#f87171';
      tamperTerminalText.textContent = `[SECURITY ALERT] Chain Verification Audit FAILED!
Scanning 5 ratified blocks...
[CRITICAL ERROR] Block #03 hash mismatch!
Stored Hash: 00004a8b19ce...
Computed:    e891b2c401aa...
Tampered Field: data.document.bylaws
Cascade integrity broken at Block #04, #05.
Action: Automatic quarantine of invalid branch!`;
    }

    tekromancyFX.lightning?.flash(1.0, 320);
    if (flashOverlay) {
      flashOverlay.classList.add('flash');
      setTimeout(() => flashOverlay.classList.remove('flash'), 180);
    }
    document.body.classList.add('screen-impact-shake');
    setTimeout(() => document.body.classList.remove('screen-impact-shake'), 750);

    const card = document.getElementById('tamper-demo-card');
    const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };
    tekromancyFX.lightning?.strike(window.innerWidth * 0.5, 0, rect.left + rect.width * 0.5, rect.top + rect.height * 0.5);
    tekromancyFX.fire?.burst(rect.left + rect.width * 0.5, rect.top + rect.height * 0.5, 80);

    if (window.soundEngine) {
      window.soundEngine.playAlarm();
      window.soundEngine.playThunderCrack(1.0);
    }
  }

  function restoreConsensus() {
    if (!isTampered) return;
    isTampered = false;
    if (nodeBlock03) {
      nodeBlock03.className = 'chain-block-node valid';
      nodeBlock03.innerHTML = 'BLK #03<br><span style="color:#22c55e;">RESTORED</span>';
    }
    if (nodeBlock04) {
      nodeBlock04.className = 'chain-block-node valid';
      nodeBlock04.innerHTML = 'BLK #04<br><span style="color:#22c55e;">VALID</span>';
    }
    if (nodeBlock05) {
      nodeBlock05.className = 'chain-block-node valid';
      nodeBlock05.innerHTML = 'BLK #05<br><span style="color:#22c55e;">TIP</span>';
    }
    if (tamperTerminal) {
      tamperTerminal.style.borderColor = 'rgba(34, 197, 94, 0.4)';
    }
    if (tamperTerminalText) {
      tamperTerminalText.style.color = '#86efac';
      tamperTerminalText.textContent = `[SYSTEM RESTORED] Consensus Re-Anchored:
Validating chain against peer node consensus...
Quarantine cleared. Block #03 hash integrity restored.
Integrity score: 100.0%
Cascade verification: PASS [ALL 5 BLOCKS SEALED]`;
    }

    tekromancyFX.encircle('#tamper-demo-card', 'plasma', { duration: 2000 });
    if (window.soundEngine) {
      window.soundEngine.playChime();
      window.soundEngine.playWhoosh();
    }
  }

  bindBtn('btn-tamper-simulate-attack', triggerTamperAttack);
  bindBtn('btn-tamper-restore', restoreConsensus);

  // --- Station 08: Unified Multi-Element Climax Storm ---
  bindBtn('btn-unified-storm', () => {
    tekromancyFX.storm({
      lightning: 90,
      fire: 80,
      plasma: 85,
      ice: 70,
      water: 60
    }, 3600);
    if (window.soundEngine) window.soundEngine.playThunderCrack(1.0);
  });

  // Mobile Touch Swipe Navigation & Haptic Feedback
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const diffX = e.changedTouches[0].screenX - touchStartX;
      const diffY = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)) {
        ensureAudioStarted();
        if (diffX < 0) {
          api.next();
          if (navigator.vibrate) navigator.vibrate(15);
        } else {
          api.prev();
          if (navigator.vibrate) navigator.vibrate(15);
        }
      }
    }
  }, { passive: true });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (['input', 'textarea', 'select'].includes(document.activeElement?.tagName?.toLowerCase())) {
      return;
    }
    ensureAudioStarted();

    switch (e.key) {
      case 'l':
      case 'L':
        tekromancyFX.lightning?.flash(0.7, 180);
        if (window.soundEngine) window.soundEngine.playThunderCrack(0.7);
        break;
      case 'f':
      case 'F':
        tekromancyFX.fire?.burst(window.innerWidth * 0.5, window.innerHeight * 0.5, 55);
        if (window.soundEngine) window.soundEngine.playFireCrackle(0.7);
        break;
      case 'm':
      case 'M':
        if (window.soundEngine) {
          const isMuted = window.soundEngine.toggleMute();
          if (muteBtn) {
            muteBtn.classList.toggle('active-toggle', isMuted);
            muteBtn.querySelector('span').textContent = isMuted ? 'Unmute' : 'Mute';
          }
        }
        break;
      case 'b':
      case 'B':
        toggleEcoMode();
        break;
      case 'v':
      case 'V':
        toggleNarration();
        break;
      case 'g':
      case 'G':
        toggleSpatialGyro();
        break;
      case 'o':
      case 'O':
        api.goto('overview');
        break;
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShowcase);
} else {
  initShowcase();
}
