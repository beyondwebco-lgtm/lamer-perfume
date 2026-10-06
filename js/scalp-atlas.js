/**
 * VELARI PRIVÉ — INTERACTIVE SCALP ATLAS
 * Anatomical Scalp Diagnostic & Targeted Application Map
 */

(function () {
  const zoneData = {
    frontal: {
      name: "Frontal Zone & Anterior Hairline",
      dosing: "0.25 mL — 0.5 mL (Targeted Droplet)",
      lead: "The frontal hairline experiences localized tension and androgenic sensitivity. Application requires micro-dosing to prevent facial migration.",
      technique: [
        "Part hair backward from forehead margin.",
        "Dispense droplet directly along follicle roots.",
        "Perform light backward circular massage using finger pads.",
        "Allow 3 minutes absorption before styling."
      ]
    },
    temporal: {
      name: "Temporal Recessions & Bilateral Peaks",
      dosing: "0.25 mL (Approx. 3-4 Concentrated Drops per side)",
      lead: "Temporal peaks exhibit delicate dermal architecture and vulnerable microvascular circulation.",
      technique: [
        "Tilt head slightly to target recession corners.",
        "Distribute drop-by-drop along the peripheral margin.",
        "Gently stimulate temporal microcirculation without tugging.",
        "Twice-daily disciplined application recommended."
      ]
    },
    crown: {
      name: "Crown & Vertex Apex",
      dosing: "0.5 mL (Approx. 1 Full Pipette)",
      lead: "The vertex is a primary focal point for diffuse miniaturization and thinning due to vascular distance and gravity.",
      technique: [
        "Radial sectioning: divide crown into cross-hair quadrants.",
        "Apply elixir directly to the scalp centre.",
        "Massage outward in spiral motions from crown apex.",
        "Ensure formula contacts scalp barrier, not just hair shaft."
      ]
    },
    midscalp: {
      name: "Mid-Scalp & Parting Meridian",
      dosing: "0.5 mL (Even Linear Distribution)",
      lead: "The natural hair parting is subject to UV exposure and environmental oxidative stress, impacting dermal thickness.",
      technique: [
        "Trace pipette along central or dominant parting line.",
        "Section 1 cm to the left and right to cover adjacent zones.",
        "Gently compress and release scalp with fingertips.",
        "Suitable for both morning and evening application."
      ]
    },
    overall: {
      name: "Diffuse / Comprehensive Scalp Architecture",
      dosing: "1.0 mL (Full Pipette Distributed Globally)",
      lead: "Comprehensive maintenance regimen optimizing overall follicular vitality across all 100,000+ scalp follicles.",
      technique: [
        "Create 4 parallel partings from forehead to crown.",
        "Distribute small beads of serum evenly along each line.",
        "Perform full cranial acupressure for 90 seconds.",
        "Leave-in dermaceutical formula, non-greasy absorption."
      ]
    }
  };

  function selectZone(zoneKey) {
    const data = zoneData[zoneKey];
    if (!data) return;

    // Update buttons
    document.querySelectorAll('.atlas-zone-btn').forEach(btn => {
      if (btn.getAttribute('data-zone') === zoneKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update SVG paths
    document.querySelectorAll('.scalp-zone-path').forEach(path => {
      if (path.getAttribute('data-zone') === zoneKey) {
        path.classList.add('active');
      } else {
        path.classList.remove('active');
      }
    });

    // Update text readouts
    const titleEl = document.getElementById('atlasZoneTitle');
    const dosingEl = document.getElementById('atlasDosingBadge');
    const descEl = document.getElementById('atlasZoneDesc');
    const pointsListEl = document.getElementById('atlasZonePoints');

    if (titleEl) titleEl.textContent = data.name;
    if (dosingEl) dosingEl.textContent = `Recommended Protocol: ${data.dosing}`;
    if (descEl) descEl.textContent = data.lead;

    if (pointsListEl) {
      pointsListEl.innerHTML = data.technique.map(step => `<li>${step}</li>`).join('');
    }
  }

  // Attach event listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Buttons
    document.querySelectorAll('.atlas-zone-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const zone = btn.getAttribute('data-zone');
        selectZone(zone);
      });
    });

    // SVG clickable paths
    document.querySelectorAll('.scalp-zone-path').forEach(path => {
      path.addEventListener('click', () => {
        const zone = path.getAttribute('data-zone');
        selectZone(zone);
      });
    });

    // Default select Crown
    selectZone('crown');
  });

  window.selectScalpZone = selectZone;
})();
