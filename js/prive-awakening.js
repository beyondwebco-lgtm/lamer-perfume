/**
 * VELARI PRIVÉ — THE PRIVÉ AWAKENING
 * Cinematic luxury laboratory opening & seamless hero transition
 */

(function () {
  // Check reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isReturningVisitor = sessionStorage.getItem('velari_prive_awakened') === 'true';

  // Mark body as awakening-active immediately
  document.body.classList.add('awakening-active');

  // DOM Elements
  const overlay = document.getElementById('priveAwakeningOverlay');
  const canvas = document.getElementById('awakeningCanvas');
  const annotations = document.getElementById('awakeningAnnotations');
  const seed = document.getElementById('awakeningSeed');
  const productWrapper = document.getElementById('awakeningProductWrapper');
  const brandTitle = document.getElementById('awakeningTitle');
  const brandSub = document.getElementById('awakeningSubtitle');
  const brandMaison = document.getElementById('awakeningMaison');
  const progressFill = document.getElementById('awakeningProgressFill');
  const progressStatus = document.getElementById('awakeningProgressStatus');
  const skipBtn = document.getElementById('skipIntroBtn');

  // Target Hero Elements for the seamless transition
  const siteHeader = document.getElementById('siteHeader');
  const heroContent = document.querySelector('.hero-content');
  const heroSpecTag = document.querySelector('.hero-spec-tag');

  if (!overlay || !canvas) {
    document.body.classList.remove('awakening-active');
    return;
  }

  const ctx = canvas.getContext('2d');
  let width, height, dpr;

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // PARTICLES & DENDRITIC MOLECULAR PATHWAYS
  const particleCount = width < 768 ? 45 : 90;
  const particles = [];
  const centerX = width / 2;
  const centerY = height / 2;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: (Math.random() - 0.5) * width * 1.2 + centerX,
      y: (Math.random() - 0.5) * height * 1.2 + centerY,
      z: Math.random() * 800 + 100,
      radius: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.45 + 0.15,
      speedZ: Math.random() * 0.8 + 0.3
    });
  }

  // Follicular curve nodes (abstract hair follicle shape)
  const follicleBranches = [];
  const branchCount = width < 768 ? 16 : 28;

  for (let b = 0; b < branchCount; b++) {
    const angle = (b / branchCount) * Math.PI * 2;
    const path = [];
    const steps = 14;
    let currX = centerX;
    let currY = centerY;

    for (let s = 0; s < steps; s++) {
      // Curve towards an elongated follicle silhouette
      const t = s / steps;
      const verticalBias = (Math.random() - 0.5) * 40 + (s > 4 ? (s - 4) * 18 : -s * 10);
      const horizontalSpan = Math.cos(angle) * (s * 16 + Math.sin(t * Math.PI) * 25);

      currX = centerX + horizontalSpan;
      currY = centerY + verticalBias;

      path.push({
        x: currX,
        y: currY,
        jitterX: (Math.random() - 0.5) * 1.2,
        jitterY: (Math.random() - 0.5) * 1.2
      });
    }

    follicleBranches.push({
      path: path,
      length: 0,
      targetLength: steps,
      growthSpeed: 0.08 + Math.random() * 0.05,
      alpha: 0.12 + Math.random() * 0.25
    });
  }

  // STATE MACHINE TIMELINE
  let startTime = performance.now();
  let animationFrameId;
  let hasTransitioned = false;
  let growthFactor = 0;
  let cameraPushZ = 1;
  let isDissolving = false;
  let dissolveScale = 1;

  // Returning visitor gets shorter sequence
  const durationTotal = prefersReduced ? 1200 : (isReturningVisitor ? 2200 : 4400);

  function triggerSeamlessHeroTransition() {
    if (hasTransitioned) return;
    hasTransitioned = true;
    sessionStorage.setItem('velari_prive_awakened', 'true');

    // Begin particle dispersion to edges
    isDissolving = true;

    // Dissolve overlay
    overlay.classList.add('fade-out');

    // Reveal site header & hero content
    document.body.classList.remove('awakening-active');
    siteHeader?.classList.add('hero-revealed');
    heroContent?.classList.add('hero-revealed');
    heroSpecTag?.classList.add('hero-revealed');

    // Clean up canvas after fade-out transition finishes
    setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      overlay.style.display = 'none';
    }, 1300);
  }

  // USER SKIP BUTTON
  skipBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerSeamlessHeroTransition();
  });

  // ESC key skip
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      triggerSeamlessHeroTransition();
    }
  });

  // RENDER & ANIMATION LOOP
  function render(time) {
    animationFrameId = requestAnimationFrame(render);
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / durationTotal, 1);

    // Update progress bar
    if (progressFill) progressFill.style.width = (progress * 100) + '%';

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Deep subtle gradient
    const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, width * 0.7);
    grad.addColorStop(0, 'rgba(184, 154, 90, 0.04)');
    grad.addColorStop(0.5, 'rgba(10, 10, 10, 0.8)');
    grad.addColorStop(1, 'rgba(5, 5, 5, 1)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // --- TIMELINE PHASES ---

    // Phase 1: Seed Light & Annotations (500ms)
    if (elapsed > 400 && !seed.classList.contains('active')) {
      seed.classList.add('active');
      annotations?.classList.add('visible');
      if (progressStatus) progressStatus.textContent = 'INITIALISING THE RITUAL';
    }

    // Phase 2: Dendritic Molecular & Follicular Growth (1200ms - 2600ms)
    if (elapsed > 1000) {
      growthFactor = Math.min((elapsed - 1000) / 1600, 1);

      ctx.save();
      if (isDissolving) {
        dissolveScale += 0.03;
        ctx.globalAlpha = Math.max(1 - (dissolveScale - 1) * 2, 0);
        ctx.translate(centerX, centerY);
        ctx.scale(dissolveScale, dissolveScale);
        ctx.translate(-centerX, -centerY);
      }

      // Draw branching follicular curves
      follicleBranches.forEach(branch => {
        const visibleNodes = Math.floor(branch.targetLength * growthFactor);
        if (visibleNodes < 2) return;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(184, 154, 90, ${branch.alpha * growthFactor})`;
        ctx.lineWidth = 0.85;

        ctx.moveTo(branch.path[0].x, branch.path[0].y);
        for (let i = 1; i < visibleNodes; i++) {
          const pt = branch.path[i];
          ctx.lineTo(pt.x + pt.jitterX, pt.y + pt.jitterY);
        }
        ctx.stroke();

        // Node tip glow
        if (visibleNodes > 3) {
          const tip = branch.path[visibleNodes - 1];
          ctx.fillStyle = 'rgba(212, 190, 132, 0.6)';
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.restore();

      if (progressStatus && elapsed > 1800 && elapsed < 2800) {
        progressStatus.textContent = 'ENTERING PRIVÉ';
      }
    }

    // Atmospheric 3D Particles
    particles.forEach(p => {
      p.z -= p.speedZ * (isDissolving ? 8 : 1);
      if (p.z <= 10) p.z = 800;

      const scale = 400 / p.z;
      const x2d = (p.x - centerX) * scale + centerX;
      const y2d = (p.y - centerY) * scale + centerY;

      if (x2d >= 0 && x2d <= width && y2d >= 0 && y2d <= height) {
        ctx.beginPath();
        ctx.arc(x2d, y2d, p.radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 190, 132, ${p.alpha * (scale > 1.2 ? 0.3 : 0.8)})`;
        ctx.fill();
      }
    });

    // Phase 3: Product Reveal & Seed Fade (2600ms)
    if (elapsed > (isReturningVisitor ? 900 : 2500) && !productWrapper.classList.contains('reveal')) {
      seed.style.opacity = '0';
      productWrapper.classList.add('reveal');
      brandTitle?.classList.add('show');
      brandSub?.classList.add('show');
      brandMaison?.classList.add('show');

      if (progressStatus) progressStatus.textContent = 'THE ELIXIR IS READY';
    }

    // Phase 4: Final Signature Transition into Hero (3900ms+)
    if (elapsed >= durationTotal) {
      triggerSeamlessHeroTransition();
    }
  }

  // Start the cinematic animation loop
  animationFrameId = requestAnimationFrame(render);
})();
