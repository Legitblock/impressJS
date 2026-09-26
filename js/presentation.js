/**
 * presentation.js - LegitBlock 3D Cybernetic Presentation Orchestrator
 * Integrates impress.js 3D navigation with @tekromancy/tekromancy visual FX engines.
 * 
 * Progressive Intensity Curve:
 * Starts subtle and clean for early stations (00-02), expands into element mechanics (03-06),
 * and escalates to maximum intensity, screen impacts, and multi-element storms at the climax (07-10).
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
      api.prev();
      prevBtn.blur();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      api.next();
      nextBtn.blur();
    });
  }
  if (overviewBtn) {
    overviewBtn.addEventListener('click', (e) => {
      e.preventDefault();
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

  // Smooth gateway entry plunge
  function triggerWarpPlunge() {
    if (window.soundEngine) {
      window.soundEngine.initContext();
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
    const nextIndex = steps.findIndex(s => s.id === nextStepId);

    // Progressive transition duration:
    // Early slides transition smoothly (1400ms - 1800ms)
    // Climax slides have expansive, sweeping transitions (2200ms - 2800ms)
    const duration = nextIndex >= 7 ? 2600 : (nextIndex >= 4 ? 2000 : 1600);

    // Trigger multi-element storm tailored to incoming station
    tekromancyFX.storm(fxConfig, duration);

    // Audio accompaniment scaled by progressive intensity
    if (window.soundEngine) {
      if (fxConfig.lightning && fxConfig.lightning > 40) {
        window.soundEngine.playThunderCrack((fxConfig.lightning / 100) * 0.9);
      } else if (fxConfig.fire && fxConfig.fire > 35) {
        window.soundEngine.playFireCrackle((fxConfig.fire / 100) * 0.85);
      } else if (fxConfig.plasma && fxConfig.plasma > 35) {
        window.soundEngine.playPlasmaHum((fxConfig.plasma / 100) * 0.85);
      } else if (fxConfig.water && fxConfig.water > 35) {
        window.soundEngine.playWaterSplash((fxConfig.water / 100) * 0.85);
      } else if (fxConfig.ice && fxConfig.ice > 35) {
        window.soundEngine.playIceFreeze((fxConfig.ice / 100) * 0.85);
      } else {
        window.soundEngine.playWhoosh();
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
      handler(e);
      el.blur();
    });
  }

  // =========================================================================
  // INTERACTIVE EXPERIMENTAL BUTTONS FOR ALL STATIONS
  // =========================================================================

  // Station 01: Manifesto
  bindBtn('btn-test-manifesto-fx', () => {
    tekromancyFX.storm({
      lightning: 35,
      plasma: 30
    }, 1800);
    if (window.soundEngine) window.soundEngine.playThunderCrack(0.5);
  });

  bindBtn('btn-manifesto-encircle', () => {
    const cards = document.querySelectorAll('#station-manifesto .cyber-card');
    if (cards[0]) tekromancyFX.encircle(cards[0], 'lightning', { duration: 1600 });
    if (cards[1]) tekromancyFX.encircle(cards[1], 'plasma', { duration: 1600 });
    if (cards[2]) tekromancyFX.encircle(cards[2], 'fire', { duration: 1600 });
    if (window.soundEngine) window.soundEngine.playPlasmaHum(0.6);
  });

  // Station 02: Ledger
  bindBtn('btn-ledger-mine-block', () => {
    const card = document.getElementById('ledger-demo-card');
    const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };
    const targetX = rect.left + rect.width * 0.5;
    const targetY = rect.top + rect.height * 0.5;
    tekromancyFX.lightning?.strike(window.innerWidth * (0.3 + Math.random() * 0.4), 0, targetX, targetY);
    if (window.soundEngine) window.soundEngine.playThunderCrack(0.7);
    tekromancyFX.encircle('#ledger-demo-card', 'lightning', { duration: 1600 });
  });

  bindBtn('btn-ledger-encircle', () => {
    tekromancyFX.encircle('#ledger-demo-card', 'lightning', { duration: 1800 });
    if (window.soundEngine) window.soundEngine.playThunderCrack(0.5);
  });

  // Station 03: Diff Engine
  bindBtn('btn-diff-burn-amendment', () => {
    const card = document.getElementById('diff-demo-card');
    const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };
    const cx = rect.left + rect.width * 0.5;
    const cy = rect.top + rect.height * 0.5;
    tekromancyFX.fire?.burst(cx, cy, 45, { theme: 'amber' });
    tekromancyFX.smoke?.burst(cx, cy - 20, 20);
    if (window.soundEngine) window.soundEngine.playFireCrackle(0.7);
  });

  bindBtn('btn-diff-encircle', () => {
    tekromancyFX.encircle('#diff-demo-card', 'fire', { duration: 1800 });
    if (window.soundEngine) window.soundEngine.playFireCrackle(0.6);
  });

  // Station 04: Governance & Quorum
  bindBtn('btn-voting-cast-vote', () => {
    const card = document.getElementById('voting-demo-card');
    const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };
    tekromancyFX.plasma?.strikeOrb(rect.left + rect.width * 0.5, rect.top + rect.height * 0.5, 40);
    if (window.soundEngine) window.soundEngine.playPlasmaHum(0.8);
  });

  bindBtn('btn-voting-ratify', () => {
    tekromancyFX.encircle('#voting-demo-card', 'plasma', { duration: 2200 });
    tekromancyFX.lightning?.flash(0.5, 150);
    if (window.soundEngine) window.soundEngine.playPlasmaHum(0.8);
  });

  // Station 05: Templates
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

  // Station 06: Enterprise LDAP
  bindBtn('btn-ldap-authenticate', () => {
    tekromancyFX.storm({ lightning: 50, plasma: 65 }, 1800);
    tekromancyFX.encircle('#ldap-demo-card', 'plasma', { duration: 2000 });
    if (window.soundEngine) window.soundEngine.playPlasmaHum(0.85);
  });

  // Station 07: Tamper Defense (CLIMAX EVENT)
  bindBtn('btn-tamper-simulate-attack', () => {
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
    if (window.soundEngine) window.soundEngine.playThunderCrack(1.0);
  });

  // Station 08: Unified Multi-Element Climax Storm
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

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (['input', 'textarea', 'select'].includes(document.activeElement?.tagName?.toLowerCase())) {
      return;
    }
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
      case 'p':
      case 'P':
        tekromancyFX.plasma?.strikeOrb(window.innerWidth * 0.5, window.innerHeight * 0.5, 45);
        if (window.soundEngine) window.soundEngine.playPlasmaHum(0.75);
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
