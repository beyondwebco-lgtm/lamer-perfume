/**
 * VELARI PRIVÉ — THREE.JS FOLLICULAR SCIENCE SIMULATION
 * "THE FOLLICLE, REIMAGINED"
 * Abstract dermaceutical biological visualization:
 * - Translucent follicular bulb structure
 * - Champagne gold molecular active particles
 * - Dynamic 4-stage scientific morphing
 */

(function () {
  const container = document.getElementById('follicleCanvasWrapper');
  const canvas = document.getElementById('follicleCanvas');
  if (!container || !canvas) return;

  // Verify WebGL availability
  let isWebGLAvailable = false;
  try {
    const testCanvas = document.createElement('canvas');
    isWebGLAvailable = !!(window.WebGLRenderingContext && (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')));
  } catch (e) {
    isWebGLAvailable = false;
  }

  if (!isWebGLAvailable || typeof THREE === 'undefined') {
    container.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#c8b07e;text-align:center;padding:2rem;">
        <div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:1.75rem;margin-bottom:0.5rem;">FOLLICULAR MATRIX</div>
          <div style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:#888;">Precision Dermaceutical Visualization</div>
        </div>
      </div>`;
    return;
  }

  // THREE.JS SCENE SETUP
  const scene = new THREE.Scene();
  const width = container.clientWidth;
  const height = container.clientHeight;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 2, 9);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // LIGHTING
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const keyLight = new THREE.PointLight(0xB89A5A, 1.8, 50);
  keyLight.position.set(5, 8, 5);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xffffff, 0.8, 50);
  fillLight.position.set(-6, -4, -4);
  scene.add(fillLight);

  // OBJECT 1: FOLLICULAR INNER MATRIX (Abstract biological lattice)
  const group = new THREE.Group();
  scene.add(group);

  // Outer translucent follicle cylinder/stem
  const stemGeom = new THREE.CylinderGeometry(0.8, 1.4, 4.2, 32, 16, true);
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    roughness: 0.25,
    metalness: 0.6,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const stemMesh = new THREE.Mesh(stemGeom, stemMat);
  group.add(stemMesh);

  // Bulb core at base (Dermal Papilla anchor)
  const bulbGeom = new THREE.SphereGeometry(1.3, 32, 24);
  const bulbMat = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    emissive: 0x111111,
    roughness: 0.2,
    metalness: 0.7,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.75
  });
  const bulbMesh = new THREE.Mesh(bulbGeom, bulbMat);
  bulbMesh.position.y = -1.6;
  group.add(bulbMesh);

  // OBJECT 2: CHAMPAGNE GOLD MOLECULAR ACTIVE PARTICLES
  const particleCount = 180;
  const particleGeom = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleOriginals = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.5 + Math.random() * 2.2;
    const y = (Math.random() - 0.5) * 5.5;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    particlePositions[i * 3] = x;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = z;

    particleOriginals.push({ x, y, z, angle, radius, speed: 0.005 + Math.random() * 0.015 });
  }

  particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0xB89A5A,
    size: 0.08,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const particleSystem = new THREE.Points(particleGeom, particleMat);
  group.add(particleSystem);

  // STAGE MORPHING STATES
  const stageData = {
    1: {
      title: "SCALP BARRIER ENVIRONMENT",
      color: 0xB89A5A,
      rotationSpeed: 0.003,
      bulbScale: 1.0,
      readout: "The follicular microenvironment requires an optimal lipid barrier, balanced sebum composition, and uncompromised cellular hydration to maintain follicle receptivity."
    },
    2: {
      title: "FOLLICULAR SIGNALING DYNAMICS",
      color: 0xD4BE84,
      rotationSpeed: 0.008,
      bulbScale: 1.25,
      readout: "Targeted communication pathways at the dermal papilla coordinate the anagen-catagen transition, activating key cellular messengers without disruption."
    },
    3: {
      title: "TARGETED DERMACEUTICAL ACTIVES",
      color: 0x9D8247,
      rotationSpeed: 0.012,
      bulbScale: 1.15,
      readout: "Synergistic complex of Redensyl®, Capixyl®, and Procapil® delivers precision micro-nutrients directly to the anchoring extracellular matrix."
    },
    4: {
      title: "HAIR-FIBRE MATRIX STABILITY",
      color: 0xE8D5A3,
      rotationSpeed: 0.005,
      bulbScale: 1.05,
      readout: "Structural keratin integrity and sheath anchoring support consistent fibre diameter and robust anchorage throughout the growth cycle."
    }
  };

  let currentStage = 1;
  let targetRotationSpeed = 0.004;
  let currentRotationSpeed = 0.004;

  window.setFollicleStage = function (stageNumber) {
    if (!stageData[stageNumber]) return;
    currentStage = stageNumber;
    const info = stageData[stageNumber];

    targetRotationSpeed = info.rotationSpeed;
    particleMat.color.setHex(info.color);

    // Update active UI pills
    document.querySelectorAll('.stage-pill').forEach(pill => {
      if (parseInt(pill.getAttribute('data-stage')) === stageNumber) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Update readout
    const readoutEl = document.getElementById('stageReadoutText');
    if (readoutEl) {
      readoutEl.textContent = info.readout;
    }
  };

  // INTERACTIVITY: DRAG / ROTATION
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMouseX;
    const deltaY = e.clientY - prevMouseY;
    group.rotation.y += deltaX * 0.008;
    group.rotation.x += deltaY * 0.005;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  // Touch support for mobile
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - prevMouseX;
    const deltaY = e.touches[0].clientY - prevMouseY;
    group.rotation.y += deltaX * 0.008;
    group.rotation.x += deltaY * 0.005;
    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // ANIMATION LOOP
  let clock = new THREE.Clock();
  let animationId;

  function animate() {
    animationId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    currentRotationSpeed += (targetRotationSpeed - currentRotationSpeed) * 0.05;

    if (!isDragging) {
      group.rotation.y += currentRotationSpeed;
    }

    // Animate molecular particles
    const positions = particleGeom.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const p = particleOriginals[i];
      p.angle += p.speed;
      positions[i * 3] = Math.cos(p.angle) * p.radius;
      positions[i * 3 + 2] = Math.sin(p.angle) * p.radius;
    }
    particleGeom.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // RESIZE LISTENER
  function onResize() {
    if (!container) return;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }

  window.addEventListener('resize', onResize);

  // Visibility Pause (Performance Optimization)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationId) animate();
      } else {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    });
  }, { threshold: 0.1 });

  observer.observe(container);
})();
