/**
 * VELARI PRIVÉ — THE DIGITAL ATELIER
 * Immersive Private Scalp Diagnostic Consultation Engine
 */

(function () {
  const modal = document.getElementById('atelierModal');
  if (!modal) return;

  const consultationState = {
    concern: null,
    focalZone: null,
    scalpType: null,
    frequency: null
  };

  let currentStepIndex = 1;
  const totalSteps = 4;

  function updateProgressBar() {
    const bar = document.getElementById('atelierProgressBar');
    if (bar) {
      const pct = (currentStepIndex / (totalSteps + 1)) * 100;
      bar.style.width = `${pct}%`;
    }
  }

  function showStep(stepNum) {
    document.querySelectorAll('.consultation-step').forEach(step => {
      step.classList.remove('active');
    });

    const targetStep = document.getElementById(`consultationStep${stepNum}`);
    if (targetStep) {
      targetStep.classList.add('active');
      currentStepIndex = stepNum;
      updateProgressBar();
    }
  }

  function generateRecommendation() {
    const blueprintContainer = document.getElementById('ritualBlueprintContent');
    if (!blueprintContainer) return;

    let doseText = "0.75 mL (Approx. 1 Full Pipette Twice Daily)";
    let ritualName = "The Comprehensive Regenerative Ritual";
    let focusNote = "Targets multi-pathway follicular nourishment and microcirculation balance.";

    if (consultationState.concern === 'hairline') {
      doseText = "0.5 mL (Concentrated Micro-Dose Morning & Evening)";
      ritualName = "The Anterior Micro-Targeted Protocol";
      focusNote = "Emphasizes targeted temporal and frontal anchoring with Capixyl®-driven biochanin support.";
    } else if (consultationState.concern === 'crown') {
      doseText = "0.75 mL (Radial Application At Crown Apex)";
      ritualName = "The Vertex Density Protocol";
      focusNote = "Optimized for crown vascular support and Redensyl® stem-cell microenvironment activation.";
    } else if (consultationState.concern === 'scalp') {
      doseText = "0.5 mL (Gentle Evening Barrier Restorative)";
      ritualName = "The Barrier-First Equilibrium Protocol";
      focusNote = "Calms scalp sensitivity while maintaining optimal hydration and sebum equilibrium.";
    }

    blueprintContainer.innerHTML = `
      <div style="background: #141414; border: 1px solid rgba(184, 154, 90, 0.35); padding: 2.5rem; text-align: left; margin: 2rem 0;">
        <div style="font-size:0.6875rem; letter-spacing:0.25em; text-transform:uppercase; color:#B89A5A; margin-bottom:0.75rem;">PRIVATE RITUAL PRESCRIPTION</div>
        <div style="font-family:'Cormorant Garamond',serif; font-size:2rem; color:#FFFFFF; margin-bottom:1rem;">${ritualName}</div>
        <p style="font-size:0.875rem; color:#CCCCCC; line-height:1.7; margin-bottom:1.5rem;">${focusNote}</p>
        
        <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:1.5rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:1.5rem; margin-bottom:1.5rem;">
          <div>
            <div style="font-size:0.6875rem; letter-spacing:0.2em; text-transform:uppercase; color:#888;">Prescribed Cadence</div>
            <div style="font-family:'Cormorant Garamond',serif; font-size:1.25rem; color:#FFFFFF;">${consultationState.frequency || 'Twice Daily (Morning & Evening)'}</div>
          </div>
          <div>
            <div style="font-size:0.6875rem; letter-spacing:0.2em; text-transform:uppercase; color:#888;">Precision Dosing</div>
            <div style="font-family:'Cormorant Garamond',serif; font-size:1.25rem; color:#B89A5A;">${doseText}</div>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.03); padding:1rem; border-left:2px solid #B89A5A; font-size:0.75rem; color:#999; line-height:1.6;">
          <strong>Atelier Note:</strong> Begin with clean, towel-dry or dry scalp. Dispense directly to the scalp roots and massage in gentle circular motions. Do not rinse out.
        </div>
      </div>
      
      <div style="font-size:0.6875rem; color:#666; margin-bottom:2rem; line-height:1.6;">
        * This consultation is for cosmetic and educational guidance only and does not replace professional medical diagnosis or dermatological advice.
      </div>

      <div style="display:flex; gap:1rem; justify-content:center;">
        <button class="btn btn-primary-gold" id="loadRitualToBagBtn">ADD ANAGENÈSE RITUAL TO BAG</button>
        <button class="btn btn-ghost-light" id="restartConsultationBtn">RESTART ATELIER</button>
      </div>
    `;

    // Hook buttons
    document.getElementById('loadRitualToBagBtn')?.addEventListener('click', () => {
      if (window.addToRitualCart) {
        window.addToRitualCart('single');
      }
      closeConsultation();
    });

    document.getElementById('restartConsultationBtn')?.addEventListener('click', () => {
      currentStepIndex = 1;
      showStep(1);
    });
  }

  function openConsultation() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    showStep(1);
  }

  function closeConsultation() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event handlers
  document.addEventListener('DOMContentLoaded', () => {
    // Open triggers
    document.querySelectorAll('.open-consultation-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openConsultation();
      });
    });

    // Close trigger
    document.getElementById('closeAtelierModalBtn')?.addEventListener('click', closeConsultation);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeConsultation();
    });

    // Option cards selection
    document.querySelectorAll('.atelier-choice-card').forEach(card => {
      card.addEventListener('click', () => {
        const stepNum = parseInt(card.getAttribute('data-step'));
        const value = card.getAttribute('data-value');

        if (stepNum === 1) consultationState.concern = value;
        if (stepNum === 2) consultationState.focalZone = value;
        if (stepNum === 3) consultationState.scalpType = value;
        if (stepNum === 4) consultationState.frequency = value;

        // Auto progress to next step
        if (stepNum < totalSteps) {
          setTimeout(() => showStep(stepNum + 1), 220);
        } else {
          setTimeout(() => {
            showStep(5); // Final blueprint step
            generateRecommendation();
          }, 220);
        }
      });
    });
  });

  window.openConsultationAtelier = openConsultation;
  window.closeConsultationAtelier = closeConsultation;
})();
