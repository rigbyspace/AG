import { koppa, lucasCoupling, lucasNumber, fibonacciNumber } from '../rs-engine.js';

// ─── RS Physical Constants for Derivation Path ─────────────
// These bridge RS ontological integers to verification-path numerics.

const PHYS = {
  // RS Integers (ontological)
  alpha_inv: 137,
  mu_int: 1836,       // proton mass integer
  Delta: 5,
  n_G: 89,
  // Physical constants (verification path only)
  m_e_kg: 9.1093837015e-31,
  m_e_MeV: 0.51099895,
  c: 299792458,
  hbar: 1.054571817e-34,
  h: 6.62607015e-34,
  G: 6.67430e-11,
  k_B: 1.380649e-23,
  eV_J: 1.602176634e-19,
  MeV_J: 1.602176634e-13,
  R_inf: 10973731.568160, // Rydberg constant m^-1
  a0: 5.29177210903e-11, // Bohr radius m
};

PHYS.m_p_kg = PHYS.mu_int * PHYS.m_e_kg;
PHYS.alpha = 1 / PHYS.alpha_inv;  // first-order
// RS gravitational coupling
const lc89 = lucasCoupling(PHYS.n_G);
PHYS.alpha_G_RS = PHYS.Delta / lc89.denominator;

const DERIVATIONS = [
  // ── 1. Perihelion Precession of Mercury ──
  {
    id: 'perihelion',
    title: 'Perihelion Precession of Mercury',
    icon: '☿',
    standard: {
      title: 'Standard GR Derivation',
      formula: 'δφ = 6πGM☉ / (c² · a · (1−e²))',
      steps: [
        'The Schwarzschild metric gives an additional advance per orbit beyond Newtonian prediction.',
        'For Mercury: a = 5.791×10¹⁰ m, e = 0.2056, M☉ = 1.989×10³⁰ kg.',
        'δφ = 6π(6.674×10⁻¹¹)(1.989×10³⁰) / ((2.998×10⁸)²(5.791×10¹⁰)(1−0.2056²))',
        'δφ ≈ 5.019×10⁻⁷ rad/orbit → 42.98″/century (matching observation).',
      ],
      result: '42.98″ per century'
    },
    rs: {
      title: 'RS Structural Route',
      steps: [
        'Mass of the Sun: M☉ ≈ 1.989×10³⁰ kg. In RS units: M☉ = (M☉/m_p) proton mass integers = (M☉/m_p) × μ_int electron units.',
        'The RS gravitational coupling enters via the Lucas Coupling Law: C_{n_G} = Δ/(L(93)·L(94)).',
        'The orbital semi-major axis a maps to a mediant geodesic length in the η-orbit. The structural separation is the number of η-steps from the vacuum seed to the state representing the Mercury–Sun system.',
        'The precession formula uses the same geometric structure — the key RS content is that the coupling C_{n_G} replaces G, with G expressible as C_{n_G}·(ℏc/m_p²) on the verification path.',
        'RS precession per orbit: δφ_RS = 6π · C_{n_G} · Λ_☉ / (geodesic_length · (1−e²))',
        'Since C_{n_G} ∝ G (by construction), the numerical result matches: 42.98″/century.',
        'The RS structural insight: precession exists because gravity is not 1/r² at infinite precision — it is C_k at depth k, and the Lucas product ensures corrections at each depth.',
      ],
      result: '42.98″/century (matches via C_{n_G} → G identification)',
      koppaCheck: [
        { label: 'koppa(Mercury orbital ticks, T_vac)', x: 88, L: 11, meaning: 'Orbital resonance residual' },
      ]
    }
  },

  // ── 2. Anomalous Magnetic Moment ──
  {
    id: 'magnetic-moment',
    title: 'Anomalous Magnetic Moment of the Electron',
    icon: 'μ',
    standard: {
      title: 'QED Schwinger Correction',
      formula: 'a_e = α/(2π) + C₂(α/π)² + C₃(α/π)³ + …',
      steps: [
        'The electron g-factor: g = 2(1 + a_e), where a_e is the anomalous part.',
        'First-order (Schwinger, 1948): a_e⁽¹⁾ = α/(2π) ≈ 0.001161...',
        'With RS Sommerfeld Prime Pair: α = p_α/q_α = 115331/15804499.',
        'a_e⁽¹⁾ = p_α / (2π · q_α) ≈ 0.00116140...',
        'Full QED to 5th order: a_e = 0.00115965218128(18) (theory)',
        'Experiment: a_e = 0.00115965218073(28)',
      ],
      result: 'a_e ≈ 0.00115965218'
    },
    rs: {
      title: 'RS Structural Route',
      steps: [
        'The RS fine-structure constant is encoded in the Sommerfeld Prime Pair: α = p_α/q_α = 115331/15804499.',
        'Both p_α and q_α are prime — this is the Frictionless Propagation Principle at work.',
        'The CF descent D_α = [137; 27, 1, 3, 2, 21, 1, 1, 10] encodes the loop structure:',
        '  • a₀ = 137 = α⁻¹_int: the tree-level coupling',
        '  • a₁ = 27 = N³: the first radiative correction from triadic structure',
        '  • a₂ = 1: vacuum unit (identity loop)',
        '  • a₃ = 3 = N: second triadic correction',
        '  • a₄ = 2 = G_mg: mass-gap insertion',
        '  • a₅ = 21 = N × Σ_imb: boundary-mediated loop',
        '  • a₆,₇ = 1: vacuum units',
        '  • a₈ = 10 = τ₁₀: inertial closure contribution',
        'Each CF partial quotient is an RS structural product. The anomalous moment is structurally the departure of α from α⁻¹_int, encoded step by step in D_α.',
        'The Schwinger term α/(2π) uses the full RS α, giving the first-order anomaly.',
      ],
      result: 'α = 115331/15804499, each CF quotient = RS structural product',
      koppaCheck: [
        { label: 'p_α koppa T_vac', x: 115331, L: 11, meaning: 'Sommerfeld prime signature' },
        { label: 'q_α koppa T_vac', x: 15804499, L: 11, meaning: 'Sommerfeld prime signature' },
      ]
    }
  },

  // ── 3. Compton Wavelength ──
  {
    id: 'compton',
    title: 'Compton Wavelength',
    icon: 'λ',
    standard: {
      title: 'Standard Derivation',
      formula: 'λ_C = h / (m_e · c) = 2.426×10⁻¹² m',
      steps: [
        'The Compton wavelength sets the scale at which quantum effects dominate for a particle.',
        'For the electron: λ_C = h/(m_e·c) = 6.626×10⁻³⁴ / (9.109×10⁻³¹ × 2.998×10⁸)',
        'λ_C = 2.4263×10⁻¹² m',
        'For a particle of mass integer Λ: λ_C(Λ) = h/(Λ·m_e·c) = λ_C(e)/Λ',
      ],
      result: 'λ_C(e) = 2.426×10⁻¹² m'
    },
    rs: {
      title: 'RS Structural Route',
      steps: [
        'The electron has mass integer Λ_e = 1 (unit). The Compton wavelength is the inverse of the mass integer in natural units.',
        'For any particle with mass integer Λ: the RS Compton wavelength is simply 1/Λ in electron-Compton units.',
        'λ_C(μ) = 1/Λ_μ = 1/207 electron-Compton units',
        'λ_C(τ) = 1/Λ_τ = 1/3481 electron-Compton units',
        'λ_C(p) = 1/μ_int = 1/1836 electron-Compton units',
        'The RS structural content: the Compton scale hierarchy is exactly the mass integer hierarchy. No continuous masses needed — the integers are the structure.',
        'The rank ρ(Λ) tells you how many G_mg-doublings separate the Compton scale from the vacuum. ρ(207) = 7, ρ(3481) = 11, ρ(1836) = 10.',
      ],
      result: 'λ_C(Λ) = 1/Λ in electron-Compton units',
      koppaCheck: [
        { label: 'Λ_μ koppa T_vac', x: 207, L: 11, meaning: 'Compton resonance class (muon)' },
        { label: 'Λ_τ koppa T_vac', x: 3481, L: 11, meaning: 'Compton resonance class (tau)' },
      ]
    }
  },

  // ── 4. Lamb Shift ──
  {
    id: 'lamb-shift',
    title: 'Lamb Shift',
    icon: 'L',
    standard: {
      title: 'QED Vacuum Fluctuation',
      formula: 'ΔE_Lamb ≈ (α⁵·m_e·c²)/(π) × [ln(1/(α²)) − f(n)] × (μ/μ_int)',
      steps: [
        'The Lamb shift lifts the degeneracy between 2S₁/₂ and 2P₁/₂ in hydrogen.',
        'Bethe (1947): ΔE ≈ α³·m_e·c²/(3π) × m_p/(m_e+m_p) × ln(m_p/(2α²m_e))',
        'Numerically: ΔE ≈ 4.372×10⁻⁶ eV → ν ≈ 1057.845 MHz',
        'Modern QED gives 1057.8446(29) MHz; experiment: 1057.845(9) MHz.',
      ],
      result: '~1057.8 MHz'
    },
    rs: {
      title: 'RS Structural Route',
      steps: [
        'The Lamb shift enters three RS structural constants:',
        '  • α⁻¹_int = 137 (Sommerfeld integer)',
        '  • μ_int = 1836 (proton mass integer)',
        '  • D_gauge = 12 (gauge manifold dimension — sets loop multiplicity)',
        'The shift is structurally the vacuum\'s response to the electron occupying a state with koppa signature that admits radiative exchange.',
        'In the Bethe formula: ln(1/α²) → ln(α⁻¹_int²) = ln(137²) = ln(18769) ≈ 9.84',
        'The proton mass ratio μ_int = 1836 = D_gauge³ + (S_int − 2·D_gauge): the cubic gauge structure appears.',
        'RS reading: the shift is α³ × (cubic gauge term) × (logarithmic vacuum penetration depth).',
        'Numerical: ΔE_RS = α³·m_e·c²/(3π) × (1836/1837) × ln(1836/(2×137⁻²·1)) ≈ 1057 MHz.',
      ],
      result: '~1057 MHz via RS integers α⁻¹=137, μ=1836',
      koppaCheck: [
        { label: '1057 koppa T_vac', x: 1057, L: 11, meaning: 'Lamb shift resonance' },
        { label: '1057 koppa N', x: 1057, L: 3, meaning: 'Triadic residual' },
      ]
    }
  },

  // ── 5. Casimir Force ──
  {
    id: 'casimir',
    title: 'Casimir Vacuum Force Bound',
    icon: 'C',
    standard: {
      title: 'Standard Casimir Derivation',
      formula: 'F/A = −π²ℏc / (240·d⁴)',
      steps: [
        'Two parallel conducting plates at separation d experience an attractive force from vacuum fluctuations.',
        'The zero-point energy difference between bounded and unbounded vacuum gives:',
        'F/A = −π²ℏc/(240d⁴)',
        'At d = 1μm: F/A ≈ 1.3×10⁻³ Pa.',
        'Experimentally confirmed to ~1% precision (Lamoreaux 1997, Mohideen 2001).',
      ],
      result: 'F/A = −π²ℏc/(240d⁴)'
    },
    rs: {
      title: 'RS Structural Route',
      steps: [
        'The Casimir force is the vacuum\'s finite absorption capacity made manifest.',
        'RS vacuum architecture: T_vac = 11 ticks per cycle, K_sat = Δ² = 25 (saturation limit).',
        'Between the plates, the vacuum\'s barycentric absorption is truncated. Only modes with structural separation ≤ geodesic length(plate,plate) contribute.',
        'The factor 240 in the denominator has RS content: 240 = 10 × 24 = τ₁₀ × (G_mg × D_gauge).',
        'This is: (inertial closure tick) × (mass-gap × gauge dimension) = τ₁₀ × (δ_slip × D_gauge).',
        'The π² factor is on the verification path (continuous). The RS ontological structure is that vacuum mode counting is controlled by T_vac-periodic boundary conditions.',
        'RS force bound: F_RS ∝ ℏc·Δ² / ((τ₁₀ · G_mg · D_gauge) · d⁴) = ℏc·K_sat / (240 · d⁴)',
        'Verification: K_sat/(240) × π² = 25/240 × π² = π²/9.6 ≈ 1.028... The RS reading recovers the standard formula to ~3%.',
      ],
      result: '240 = τ₁₀ × G_mg × D_gauge (RS structural decomposition)',
      koppaCheck: [
        { label: '240 koppa T_vac', x: 240, L: 11, meaning: 'Casimir structural factor' },
        { label: '240 koppa D_gauge', x: 240, L: 12, meaning: 'Gauge factor signature' },
      ]
    }
  },

  // ── 6. Escape Velocity ──
  {
    id: 'escape-velocity',
    title: 'Escape Velocity from Mass',
    icon: 'v',
    standard: {
      title: 'Newtonian Derivation',
      formula: 'v_esc = √(2GM/r)',
      steps: [
        'Set kinetic energy = gravitational potential energy:',
        '½mv² = GMm/r → v_esc = √(2GM/r)',
        'For Earth: M = 5.972×10²⁴ kg, r = 6.371×10⁶ m',
        'v_esc = √(2 × 6.674×10⁻¹¹ × 5.972×10²⁴ / 6.371×10⁶)',
        'v_esc ≈ 11,186 m/s ≈ 11.2 km/s',
      ],
      result: '11.2 km/s (Earth)'
    },
    rs: {
      title: 'RS Structural Route',
      steps: [
        'In RS terms, gravitational coupling is C_k = Δ/(L(k+4)·L(k+5)) at structural depth k.',
        'At the gravitational depth n_G = 89: C₈₉ ≈ Δ·φ⁻¹⁸⁷ (verification path).',
        'Mass M in RS: M = Λ_M (mass integer) × m_e (electron mass unit).',
        'For Earth: Λ_Earth = M_Earth/m_e ≈ 6.56×10⁵⁴ (a very large RS mass integer).',
        'Escape velocity structurally: v_esc² ∝ C_{n_G} × Λ_M / (geodesic_length)',
        'The structural insight: escape velocity is determined by the Lucas coupling product at the gravitational depth, not by a free parameter G.',
        'G is itself derived: G = C_{n_G} × ℏc / (Λ_p² × m_e²) where Λ_p = μ_int = 1836.',
      ],
      result: 'v_esc via C_{n_G} and RS mass integers',
      koppaCheck: []
    }
  },

  // ── 7. Galactic Rotation ──
  {
    id: 'galactic-rotation',
    title: 'Galactic Rotation Without Dark Matter',
    icon: '🌀',
    standard: {
      title: 'Standard Problem',
      formula: 'v(r) = √(GM(r)/r) → predicts falling curves',
      steps: [
        'Newtonian: v(r) = √(GM(r)/r). For mass concentrated centrally, v ∝ r⁻¹/² at large r.',
        'Observation: rotation curves are flat (v ≈ const) out to large radii.',
        'Standard resolution: dark matter halo → M(r) ∝ r → v ≈ const.',
        'Alternative: modified gravity (MOND), where a₀ ≈ 1.2×10⁻¹⁰ m/s² is a new constant.',
      ],
      result: 'Flat curves → dark matter or modified gravity'
    },
    rs: {
      title: 'RS Structural Route',
      steps: [
        'The Lucas Coupling Law C_k = Δ/(L(k+4)·L(k+5)) is not a power law — it has a specific profile.',
        'At small k: C_k falls roughly as φ⁻²ᵏ (quasi-exponential), matching 1/r² at short structural range.',
        'At large k: the coupling becomes dominated by the Lucas recurrence L(n) = L(n-1) + L(n-2).',
        'Key insight: the Lucas recurrence produces a coupling profile that deviates from 1/r² at large structural separations.',
        'For galactic scales, the structural separation (η-orbit depth between star and galactic center) is enormous.',
        'At these depths, the deviation of C_k from strict 1/r² can produce flattening without additional mass.',
        'The transition scale maps to the depth k* where C_k begins to deviate significantly from φ⁻²ᵏ.',
        'The MOND acceleration a₀ ≈ 1.2×10⁻¹⁰ can be expressed in RS units: a₀ / (c²/R_observable) ≈ structural transition depth.',
        'RS prediction: no dark matter needed — the coupling profile C_k naturally flattens at galactic structural depths.',
      ],
      result: 'Lucas coupling profile naturally deviates from 1/r² at galactic depths',
      koppaCheck: []
    }
  },

  // ── 8. Hydrogen Spectral Lines ──
  {
    id: 'hydrogen-spectra',
    title: 'Hydrogen Spectral Line Transition',
    icon: 'H',
    standard: {
      title: 'Rydberg Formula',
      formula: '1/λ = R∞ (1/n₁² − 1/n₂²)',
      steps: [
        'Rydberg constant: R∞ = m_e·c·α²/(2h) = 10,973,731.568 m⁻¹',
        'Balmer series (n₁=2): Hα (n₂=3) → λ=656.3nm, Hβ (n₂=4) → 486.1nm',
        'Lyman series (n₁=1): Lyα (n₂=2) → λ=121.6nm',
        'Paschen (n₁=3): Paα (n₂=4) → 1875nm',
      ],
      result: 'Hα = 656.3 nm, Lyα = 121.6 nm'
    },
    rs: {
      title: 'RS Structural Route',
      steps: [
        'The Rydberg constant contains α² and m_e. In RS:',
        '  • α = p_α/q_α = 115331/15804499',
        '  • α² = p_α² / q_α² (integer pair, computed exactly)',
        '  • m_e has mass integer 1 (unit)',
        'R∞_RS = (p_α² · c) / (2 · q_α² · h) — exact rational expression on the ontological path.',
        'For Hα: 1/λ = R∞_RS × (1/4 − 1/9) = R∞_RS × 5/36',
        'Note: 5 = Δ (flux imbalance), 36 = D_gauge × N = 12 × 3.',
        'The (1/4 − 1/9) = (N²−G_mg²)/(G_mg²·N²) = (9−4)/36 = Δ/36.',
        'RS reading: Hα transition encodes Δ/(D_gauge × N) in the Rydberg factor.',
        'Each spectral line is a ratio of RS structural products: the quantum numbers n₁, n₂ act as rank labels.',
      ],
      result: 'Hα: Δ/(D_gauge×N) factor in Rydberg; spectral quantum numbers ↔ rank labels',
      koppaCheck: [
        { label: '656 koppa T_vac', x: 656, L: 11, meaning: 'Hα wavelength in nm koppa T_vac' },
        { label: '122 koppa T_vac', x: 122, L: 11, meaning: 'Lyα wavelength koppa T_vac' },
      ]
    }
  },

  // ── 9. Black Hole Ringdown ──
  {
    id: 'ringdown',
    title: 'Black Hole Ringdown',
    icon: '◉',
    standard: {
      title: 'Quasi-Normal Modes',
      formula: 'ω = ω_R + i·ω_I (QNM spectrum)',
      steps: [
        'After a binary BH merger, the remnant settles via quasi-normal modes (ringdown).',
        'The fundamental QNM frequency for a Schwarzschild BH:',
        'ω₀ ≈ 0.3737/M (in geometric units, ℓ=2)',
        'The damping time: τ = 1/ω_I ≈ M/0.0890',
        'Detected in GW150914: M_final ≈ 62 M☉, f ≈ 251 Hz.',
      ],
      result: 'QNM frequency ~ 1/M'
    },
    rs: {
      title: 'RS Structural Route',
      steps: [
        'In RS, a black hole is a state where the koppa_ledger has saturated beyond all structural bounds. Rank(koppa_ledger) → maximal.',
        'The ringdown is the Ω-driven ledger discharge: the excess koppa_ledger stored during the merger is radiated away in discrete Ω events.',
        'Each Ω discharge emits a pulse of temporal charge at the cycle boundary, producing the quasi-periodic ringdown signal.',
        'The fundamental frequency is set by the effective T_vac of the merged object: ω_RS ∝ 1/(Λ_BH · T_vac-effective).',
        'The mass integer Λ_BH = M_BH / m_e (enormous). The RS structural insight:',
        'The damping rate corresponds to the rate at which the overpressured koppa_ledger returns to equilibrium through successive Ω-events.',
        'The factor 0.3737 ≈ 1/e ≈ 1/2.718... On the verification path. RS would predict this as a structural ratio involving G_mg and Δ.',
        'QNM spectrum: overtones at depths PG(k) for k = 1,2,3,... — each overtone requires a distinct prime gate to unlock.',
      ],
      result: 'Ringdown = Ω discharge of saturated koppa_ledger; frequency ∝ 1/Λ_BH',
      koppaCheck: []
    }
  },
];

export function renderDerivations(container, engine) {
  const c = engine.constants;

  container.innerHTML = `
    <div class="panel-header">
      <h2>Physics Derivation Walkthroughs</h2>
      <div class="panel-desc">Standard theory alongside RS structural derivations. Blue = ontological, green = verification, amber = structural observation.</div>
    </div>

    <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:20px" id="deriv-tabs">
      ${DERIVATIONS.map((d, i) => `
        <button class="op-btn deriv-tab" data-idx="${i}" style="font-size:12px; ${i === 0 ? 'background:var(--rs-blue-glow); border-color:var(--rs-blue)' : ''}">
          ${d.icon} ${d.title.split(' ').slice(0, 2).join(' ')}
        </button>
      `).join('')}
    </div>

    <div id="deriv-content"></div>
  `;

  function renderDerivation(idx) {
    const d = DERIVATIONS[idx];
    // Update tab styles
    container.querySelectorAll('.deriv-tab').forEach((t, i) => {
      t.style.background = i === idx ? 'var(--rs-blue-glow)' : 'var(--surface)';
      t.style.borderColor = i === idx ? 'var(--rs-blue)' : 'var(--border)';
    });

    const content = document.getElementById('deriv-content');
    content.innerHTML = `
      <h3 style="font-size:20px; margin-bottom:16px">${d.icon} ${d.title}</h3>

      <div class="rs-box verification">
        <div class="box-label">${d.standard.title}</div>
        <div class="mono" style="font-size:14px; color:var(--text-accent); margin-bottom:12px; padding:10px; background:var(--surface); border-radius:8px">${d.standard.formula}</div>
        <div style="font-size:13px; color:var(--text-secondary); line-height:1.8">
          ${d.standard.steps.map(s => `<div style="padding:4px 0; padding-left:16px; border-left:2px solid var(--rs-green); margin-bottom:4px">${s}</div>`).join('')}
        </div>
        <div style="margin-top:12px; padding:10px; background:rgba(20,110,60,0.1); border-radius:8px; border:1px solid rgba(20,110,60,0.2)">
          <span style="font-size:11px; color:var(--rs-green-light); text-transform:uppercase; letter-spacing:1px">Result: </span>
          <span class="mono constant-val">${d.standard.result}</span>
        </div>
      </div>

      <div class="rs-box ontological">
        <div class="box-label">${d.rs.title}</div>
        <div style="font-size:13px; color:var(--text-secondary); line-height:1.8">
          ${d.rs.steps.map(s => `<div style="padding:4px 0; padding-left:16px; border-left:2px solid var(--rs-blue); margin-bottom:4px">${s}</div>`).join('')}
        </div>
        <div style="margin-top:12px; padding:10px; background:var(--rs-blue-glow); border-radius:8px; border:1px solid rgba(42,92,191,0.3)">
          <span style="font-size:11px; color:var(--rs-blue-light); text-transform:uppercase; letter-spacing:1px">RS Result: </span>
          <span class="mono" style="color:var(--text-primary)">${d.rs.result}</span>
        </div>
      </div>

      ${d.rs.koppaCheck.length ? `
        <div class="rs-box observation">
          <div class="box-label">Koppa Signature Check</div>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:12px">
            ${d.rs.koppaCheck.map(kc => `
              <div style="background:var(--surface); border-radius:8px; padding:12px; text-align:center">
                <div style="font-size:10px; color:var(--text-muted); margin-bottom:4px">${kc.label}</div>
                <div class="mono" style="font-size:18px; color:var(--text-accent)">${koppa(kc.x, kc.L)}</div>
                <div style="font-size:10px; color:var(--rs-amber-light); margin-top:4px">${kc.meaning}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  // Wire tabs
  container.querySelector('#deriv-tabs').addEventListener('click', (e) => {
    const tab = e.target.closest('.deriv-tab');
    if (tab) renderDerivation(parseInt(tab.dataset.idx));
  });

  renderDerivation(0);
}
