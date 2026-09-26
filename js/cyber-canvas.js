/**
 * cyber-canvas.js - Dynamic 3D Celestial Globe & Background Canvas for LegitBlock
 * 1. 3D Rotating Cyberpunk Hologram Globe
 * 2. 9 Station Orbital Nodes for LegitBlock Architecture & Workflows
 * 3. Great-Circle Laser Constellation Arcs with traveling cryptographic energy pulses
 * 4. Ambient digital rain, floating cryptographic matrix dust, and atmospheric glow
 */

(function () {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.id = 'cyber-bg-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Mouse parallax tracking
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX - width * 0.5) * 0.04;
    targetMouseY = (e.clientY - height * 0.5) * 0.04;
  });

  // State
  let isOverview = false;
  let activeStationId = 'legitblock-portal';
  let globeRadius = Math.min(width, height) * 0.38;
  let targetGlobeRadius = globeRadius;
  let globeRotY = 0;
  let globeRotX = 0.22; // slight downward viewing tilt

  // Station definitions in spherical coordinates (degrees) for LegitBlock
  const stations = [
    { id: 'station-manifesto', num: '01', name: 'MANIFESTO', lat: 0, lon: 0, color: '#00f0ff', glow: 'rgba(0,240,255,0.8)' },
    { id: 'station-immutable-ledger', num: '02', name: 'LEDGER', lat: 28, lon: 45, color: '#38bdf8', glow: 'rgba(56,189,248,0.85)' },
    { id: 'station-diff-engine', num: '03', name: 'DIFF ENGINE', lat: -22, lon: 90, color: '#ff6600', glow: 'rgba(255,102,0,0.85)' },
    { id: 'station-voting-governance', num: '04', name: 'GOVERNANCE', lat: 32, lon: 135, color: '#ff00b4', glow: 'rgba(255,0,180,0.85)' },
    { id: 'station-templates', num: '05', name: 'TEMPLATES', lat: -18, lon: 180, color: '#fbbf24', glow: 'rgba(251,191,36,0.85)' },
    { id: 'station-enterprise-ldap', num: '06', name: 'LDAP AUTH', lat: 28, lon: 225, color: '#22c55e', glow: 'rgba(34,197,94,0.85)' },
    { id: 'station-tamper-defense', num: '07', name: 'TAMPER DEFENSE', lat: -24, lon: 270, color: '#93c5fd', glow: 'rgba(147,197,253,0.85)' },
    { id: 'station-unified-demo', num: '08', name: 'FULL STACK', lat: 30, lon: 315, color: '#a855f7', glow: 'rgba(168,85,247,0.85)' },
    { id: 'station-quickstart', num: '09', name: 'QUICKSTART', lat: -48, lon: 360, color: '#00f0ff', glow: 'rgba(0,240,255,0.85)' }
  ];

  // Traveling pulses
  const pulseCount = 18;
  const pulses = Array.from({ length: pulseCount }, (_, i) => ({
    segIdx: i % stations.length,
    progress: i / pulseCount,
    speed: 0.003 + Math.random() * 0.003,
    color: stations[i % stations.length].color
  }));

  // Background Matrix Particles
  const particleCount = 70;
  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -0.2 - Math.random() * 0.5,
    size: 1 + Math.random() * 2,
    alpha: 0.1 + Math.random() * 0.4,
    color: Math.random() > 0.4 ? '#00f0ff' : '#ff00b4'
  }));

  // Helper 3D rotation & projection
  function project3D(latDeg, lonDeg, radius, rotX, rotY, cx, cy) {
    const lat = (latDeg * Math.PI) / 180;
    const lon = (lonDeg * Math.PI) / 180 + rotY;

    let x = Math.cos(lat) * Math.sin(lon);
    let y = -Math.sin(lat);
    let z = Math.cos(lat) * Math.cos(lon);

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;

    return {
      x: cx + x * radius,
      y: cy + y1 * radius,
      z: z1,
      visible: z1 > -0.05
    };
  }

  function drawLatitudeParallel(latDeg, radius, rotX, rotY, cx, cy, strokeStyle, lineWidth = 1) {
    ctx.beginPath();
    let first = true;
    const step = 6;
    for (let lon = 0; lon <= 360; lon += step) {
      const p = project3D(latDeg, lon, radius, rotX, rotY, cx, cy);
      if (first) {
        ctx.moveTo(p.x, p.y);
        first = false;
      } else {
        ctx.lineTo(p.x, p.y);
      }
    }
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  function drawLongitudeMeridian(lonDeg, radius, rotX, rotY, cx, cy, strokeStyle, lineWidth = 1) {
    ctx.beginPath();
    let first = true;
    const step = 5;
    for (let lat = -90; lat <= 90; lat += step) {
      const p = project3D(lat, lonDeg, radius, rotX, rotY, cx, cy);
      if (first) {
        ctx.moveTo(p.x, p.y);
        first = false;
      } else {
        ctx.lineTo(p.x, p.y);
      }
    }
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Mouse parallax easing
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Ambient floating particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    ctx.globalAlpha = 1;

    // Globe center
    const cx = width * 0.5 + mouseX;
    const cy = height * 0.5 + mouseY;

    // Radius transitions
    targetGlobeRadius = isOverview ? Math.min(width, height) * 0.44 : Math.min(width, height) * 0.38;
    globeRadius += (targetGlobeRadius - globeRadius) * 0.05;

    // Globe rotation
    globeRotY += isOverview ? 0.0035 : 0.0018;

    // Globe glow backdrop
    const grad = ctx.createRadialGradient(cx, cy, globeRadius * 0.1, cx, cy, globeRadius * 1.25);
    grad.addColorStop(0, 'rgba(0, 240, 255, 0.06)');
    grad.addColorStop(0.5, 'rgba(16, 24, 52, 0.04)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, globeRadius * 1.25, 0, Math.PI * 2);
    ctx.fill();

    // Equatorial Ring
    drawLatitudeParallel(0, globeRadius, globeRotX, globeRotY, cx, cy, 'rgba(0, 240, 255, 0.38)', 1.5);

    // Latitude Parallels (+30, -30, +60, -60)
    drawLatitudeParallel(30, globeRadius, globeRotX, globeRotY, cx, cy, 'rgba(0, 240, 255, 0.18)', 1);
    drawLatitudeParallel(-30, globeRadius, globeRotX, globeRotY, cx, cy, 'rgba(0, 240, 255, 0.18)', 1);
    drawLatitudeParallel(60, globeRadius, globeRotX, globeRotY, cx, cy, 'rgba(0, 240, 255, 0.12)', 0.75);
    drawLatitudeParallel(-60, globeRadius, globeRotX, globeRotY, cx, cy, 'rgba(0, 240, 255, 0.12)', 0.75);

    // Meridians every 45 degrees
    const meridians = [0, 45, 90, 135, 180, 225, 270, 315];
    for (const lon of meridians) {
      const isPrime = lon === 0 || lon === 180;
      const stroke = isPrime ? 'rgba(255, 0, 180, 0.25)' : 'rgba(0, 240, 255, 0.14)';
      drawLongitudeMeridian(lon, globeRadius, globeRotX, globeRotY, cx, cy, stroke, isPrime ? 1.2 : 0.8);
    }

    // Great-Circle Laser Constellation connecting station nodes
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < stations.length; i++) {
      const nextIdx = (i + 1) % stations.length;
      const p1 = project3D(stations[i].lat, stations[i].lon, globeRadius, globeRotX, globeRotY, cx, cy);
      const p2 = project3D(stations[nextIdx].lat, stations[nextIdx].lon, globeRadius, globeRotX, globeRotY, cx, cy);

      if (p1.visible || p2.visible) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = stations[i].color + '44';
        ctx.stroke();
      }
    }

    // Laser Traveling Energy Pulses
    for (const pulse of pulses) {
      pulse.progress += pulse.speed;
      if (pulse.progress > 1) {
        pulse.progress = 0;
        pulse.segIdx = (pulse.segIdx + 1) % stations.length;
      }
      const fromSt = stations[pulse.segIdx];
      const toSt = stations[(pulse.segIdx + 1) % stations.length];

      const p1 = project3D(fromSt.lat, fromSt.lon, globeRadius, globeRotX, globeRotY, cx, cy);
      const p2 = project3D(toSt.lat, toSt.lon, globeRadius, globeRotX, globeRotY, cx, cy);

      const px = p1.x + (p2.x - p1.x) * pulse.progress;
      const py = p1.y + (p2.y - p1.y) * pulse.progress;
      const pz = p1.z + (p2.z - p1.z) * pulse.progress;

      if (pz > -0.1) {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Render Station Orbital Nodes
    for (const st of stations) {
      const p = project3D(st.lat, st.lon, globeRadius, globeRotX, globeRotY, cx, cy);
      const isActive = st.id === activeStationId;

      if (p.visible) {
        const nodeRadius = isActive ? 8 : (isOverview ? 6 : 4.5);
        ctx.save();
        ctx.shadowColor = st.glow;
        ctx.shadowBlur = isActive ? 22 : 12;

        ctx.fillStyle = st.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius + 3, 0, Math.PI * 2);
        ctx.stroke();

        if (isActive || isOverview) {
          ctx.font = "bold 10px 'Orbitron', monospace";
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'left';
          ctx.shadowBlur = 8;
          ctx.fillText(`[${st.num}] ${st.name}`, p.x + nodeRadius + 8, p.y + 4);
        }

        ctx.restore();
      }
    }

    // Tilted Orbital Ticker Ring in Overview mode
    if (isOverview) {
      ctx.save();
      const tickerRadius = globeRadius * 1.15;
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(cx, cy, tickerRadius, 0, Math.PI * 2);
      ctx.stroke();

      const cardinals = [
        { label: '000° GENESIS BLOCK', angle: 0 },
        { label: '090° RATIFIED LEDGER', angle: Math.PI * 0.5 },
        { label: '180° DECENTRALIZED QUORUM', angle: Math.PI },
        { label: '270° DGCL 224 VALIDATED', angle: Math.PI * 1.5 }
      ];
      ctx.setLineDash([]);
      ctx.font = "600 9px 'Orbitron', sans-serif";
      ctx.fillStyle = 'rgba(0, 240, 255, 0.65)';
      ctx.textAlign = 'center';
      for (const card of cardinals) {
        const ax = cx + Math.cos(card.angle + globeRotY * 0.4) * (tickerRadius + 18);
        const ay = cy + Math.sin(card.angle + globeRotY * 0.4) * (tickerRadius + 18);
        ctx.fillText(card.label, ax, ay);
      }
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  animationFrameId = requestAnimationFrame(render);

  window.cyberCanvas = {
    setOverview(enabled) {
      isOverview = !!enabled;
    },
    setActiveStation(id) {
      activeStationId = id;
    },
    destroy() {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }
  };
})();
