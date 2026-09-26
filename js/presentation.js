/**
 * presentation.js - LegitBlock 3D Cybernetic Presentation Orchestrator
 * Integrates impress.js 3D navigation with @tekromancy/tekromancy visual FX engines.
 */

import { TekromancyFX, StationFXController } from '@tekromancy/tekromancy';
import '@tekromancy/tekromancy/tekromancy.css';

/**
 * Slide / Station Effect Intensity Mapping (Scale: 1 to 100)
 * Tailored to each stage of the LegitBlock cryptographic lifecycle.
 */
const stationController = new StationFXController({
  'legitblock-portal': { lightning: 45, plasma: 35 },
  'station-manifesto': { lightning: 75, fire: 25, plasma: 40 },
  'station-immutable-ledger': { lightning: 80, plasma: 60 },
  'station-diff-engine': { fire: 85, smoke: 50 },
  'station-voting-governance': { plasma: 90, lightning: 40 },
  'station-templates': { ice: 70, water: 60 },
  'station-enterprise-ldap': { lightning: 50, plasma: 75 },
  'station-tamper-defense': { lightning: 95, fire: 70 },
  'station-unified-demo': { lightning: 75, fire: 60, plasma: 70, ice: 50 },
  'station-quickstart': { water: 70, lightning: 50 },
  'overview': { lightning: 65, plasma: 55, fire: 35 }
}, {
  defaultSettings: { lightning: 50 }
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

  // Gateway Warp Plunge (Station 00 -> Station 01)
  function triggerWarpPlunge() {
    if (window.soundEngine) {
      window.soundEngine.initContext();
      window.soundEngine.playHyperWarp();
    }
    tekromancyFX.storm({ lightning: 90, plasma: 80 }, 2800);
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
    const isWarp = previousStepId === 'legitblock-portal' && nextStepId === 'station-manifesto';
    const duration = isWarp ? 2600 : (event.detail?.transitionDuration || 1800);

    if (window.cyberCanvas) {
      window.cyberCanvas.setActiveStation(nextStepId);
      window.cyberCanvas.setOverview(nextStepId === 'overview');
    }

    const fxConfig = stationController.get(nextStep || nextStepId);

    tekromancyFX.storm(fxConfig, duration);

    if (window.soundEngine) {
      if (isWarp) {
        window.soundEngine.playHyperWarp();
      } else {
        if (fxConfig.lightning && fxConfig.lightning > 20) {
          window.soundEngine.playThunderCrack(fxConfig.lightning / 100);
        } else if (fxConfig.fire && fxConfig.fire > 20) {
          window.soundEngine.playFireCrackle(fxConfig.fire / 100);
        } else if (fxConfig.plasma && fxConfig.plasma > 20) {
          window.soundEngine.playPlasmaHum(fxConfig.plasma / 100);
        } else if (fxConfig.smoke && fxConfig.smoke > 20) {
          window.soundEngine.playSmokeHiss(fxConfig.smoke / 100);
        } else if (fxConfig.water && fxConfig.water > 20) {
          window.soundEngine.playWaterSplash(fxConfig.water / 100);
        } else if (fxConfig.ice && fxConfig.ice > 20) {
          window.soundEngine.playIceFreeze(fxConfig.ice / 100);
        } else {
          window.soundEngine.playWhoosh();
        }
      }
    }
  });

  // Slide Transition Arrival: updates HUD, triggers impacts & card encircle
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

    // SPECIAL WARP SLAM: Arriving at Station 01 from Station 00
    if (stepId === 'station-manifesto' && previousStepId === 'legitblock-portal') {
      if (tekromancyFX.lightning) {
        tekromancyFX.lightning.flash(0.9, 300);
        tekromancyFX.lightning.strike(window.innerWidth * 0.5, 0, window.innerWidth * 0.5, window.innerHeight * 0.45);
      }

      if (flashOverlay) {
        flashOverlay.classList.add('flash');
        setTimeout(() => flashOverlay.classList.remove('flash'), 150);
      }

      if (window.soundEngine) {
        window.soundEngine.playSlamImpact();
      }

      document.body.classList.add('screen-impact-shake');
      setTimeout(() => document.body.classList.remove('screen-impact-shake'), 750);

      activeStep.classList.add('slam-wiggle');
      setTimeout(() => activeStep.classList.remove('slam-wiggle'), 900);
    } else if (stepId !== 'legitblock-portal') {
      const fxConfig = stationController.get(activeStep);
      if (fxConfig.lightning && tekromancyFX.lightning) {
        tekromancyFX.lightning.flash(0.3 + (fxConfig.lightning / 100) * 0.4, 150);
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
      lightning: 75,
      plasma: 65,
      fire: 40
    }, 2500);
    if (window.soundEngine) window.soundEngine.playThunderCrack(0.8);
  });

  bindBtn('btn-manifesto-encircle', () => {
    const cards = document.querySelectorAll('#station-manifesto .cyber-card');
    if (cards[0]) tekromancyFX.encircle(cards[0], 'lightning', { duration: 2000 });
    if (cards[1]) tekromancyFX.encircle(cards[1], 'plasma', { duration: 2000 });
    if (cards[2]) tekromancyFX.encircle(cards[2], 'fire', { duration: 2000 });
    if (window.soundEngine) window.soundEngine.playPlasmaHum(0.9);
  });

  // Station 02: Ledger
  bindBtn('btn-ledger-mine-block', () => {
    const card = document.getElementById('ledger-demo-card');
    const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };
    const targetX = rect.left + rect.width * 0.5;
    const targetY = rect.top + rect.height * 0.5;
    tekromancyFX.lightning?.strike(window.innerWidth * (0.2 + Math.random() * 0.6), 0, targetX, targetY);
    if (window.soundEngine) window.soundEngine.playThunderCrack(1.0);
    tekromancyFX.encircle('#ledger-demo-card', 'lightning', { duration: 1800 });
  });

  bindBtn('btn-ledger-encircle', () => {
    tekromancyFX.encircle('#ledger-demo-card', 'lightning', { duration: 2200 });
    if (window.soundEngine) window.soundEngine.playThunderCrack(0.6);
  });

  // Station 03: Diff Engine
  bindBtn('btn-diff-burn-amendment', () => {
    const card = document.getElementById('diff-demo-card');
    const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };
    const cx = rect.left + rect.width * 0.5;
    const cy = rect.top + rect.height * 0.5;
    tekromancyFX.fire?.burst(cx, cy, 60, { theme: 'fire' });
    tekromancyFX.smoke?.burst(cx, cy - 30, 25);
    if (window.soundEngine) window.soundEngine.playFireCrackle(0.9);
  });

  bindBtn('btn-diff-encircle', () => {
    tekromancyFX.encircle('#diff-demo-card', 'fire', { duration: 2000 });
    if (window.soundEngine) window.soundEngine.playFireCrackle(0.7);
  });

  // Station 04: Governance & Quorum
  bindBtn('btn-voting-cast-vote', () => {
    const card = document.getElementById('voting-demo-card');
    const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };
    tekromancyFX.plasma?.strikeOrb(rect.left + rect.width * 0.5, rect.top + rect.height * 0.5, 45);
    if (window.soundEngine) window.soundEngine.playPlasmaHum(1.0);
  });

  bindBtn('btn-voting-ratify', () => {
    tekromancyFX.encircle('#voting-demo-card', 'plasma', { duration: 2500 });
    tekromancyFX.lightning?.flash(0.7, 200);
    if (window.soundEngine) window.soundEngine.playPlasmaHum(0.8);
  });

  // Station 05: Templates
  bindBtn('btn-templates-freeze', () => {
    const card = document.getElementById('templates-demo-card');
    const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };
    tekromancyFX.ice?.freeze(rect.left, rect.top, rect.width, rect.height, 120);
    if (window.soundEngine) window.soundEngine.playIceFreeze(0.9);
  });

  bindBtn('btn-templates-encircle', () => {
    tekromancyFX.encircle('#templates-demo-card', 'ice', { duration: 2000 });
    if (window.soundEngine) window.soundEngine.playIceFreeze(0.7);
  });

  // Station 06: Enterprise LDAP
  bindBtn('btn-ldap-authenticate', () => {
    tekromancyFX.storm({ lightning: 60, plasma: 70 }, 1800);
    tekromancyFX.encircle('#ldap-demo-card', 'plasma', { duration: 2000 });
    if (window.soundEngine) window.soundEngine.playPlasmaHum(0.85);
  });

  // Station 07: Tamper Defense
  bindBtn('btn-tamper-simulate-attack', () => {
    tekromancyFX.lightning?.flash(1.0, 300);
    if (flashOverlay) {
      flashOverlay.classList.add('flash');
      setTimeout(() => flashOverlay.classList.remove('flash'), 160);
    }
    document.body.classList.add('screen-impact-shake');
    setTimeout(() => document.body.classList.remove('screen-impact-shake'), 600);

    const card = document.getElementById('tamper-demo-card');
    const rect = card ? card.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.5, width: 0, height: 0 };
    tekromancyFX.lightning?.strike(window.innerWidth * 0.5, 0, rect.left + rect.width * 0.5, rect.top + rect.height * 0.5);
    tekromancyFX.fire?.burst(rect.left + rect.width * 0.5, rect.top + rect.height * 0.5, 75);
    if (window.soundEngine) window.soundEngine.playThunderCrack(1.0);
  });

  // Station 08: Unified Multi-Element Demo
  bindBtn('btn-unified-storm', () => {
    tekromancyFX.storm({
      lightning: 85,
      fire: 70,
      plasma: 75,
      ice: 60,
      water: 50
    }, 3500);
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
        tekromancyFX.lightning?.flash(0.8, 200);
        if (window.soundEngine) window.soundEngine.playThunderCrack(0.7);
        break;
      case 'f':
      case 'F':
        tekromancyFX.fire?.burst(window.innerWidth * 0.5, window.innerHeight * 0.5, 60);
        if (window.soundEngine) window.soundEngine.playFireCrackle(0.8);
        break;
      case 'p':
      case 'P':
        tekromancyFX.plasma?.strikeOrb(window.innerWidth * 0.5, window.innerHeight * 0.5, 50);
        if (window.soundEngine) window.soundEngine.playPlasmaHum(0.8);
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
