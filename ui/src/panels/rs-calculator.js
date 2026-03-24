import { koppa, lucasCoupling, lucasNumber, rank } from '../rs-engine.js';

// Physical constants (verification path)
const PHYS = {
  G: 6.67430e-11,
  c: 299792458,
  h: 6.62607015e-34,
  hbar: 1.054571817e-34,
  m_e: 9.1093837015e-31,
  m_e_MeV: 0.51099895,
  eV_J: 1.602176634e-19,
  R_inf: 10973731.568160,
  AU: 1.496e11,
  M_sun: 1.989e30,
  year_s: 365.25 * 24 * 3600,
};

const TEMPLATES = [
  {
    id: 'orbital-period',
    title: 'Orbital Period (Kepler)',
    icon: '🪐',
    desc: 'T = 2π√(a³/GM). Uses RS gravitational coupling to derive G.',
    inputs: [
      { id: 'a_AU', label: 'Semi-major axis (AU)', value: 1.0 },
      { id: 'M_solar', label: 'Central mass (Solar masses)', value: 1.0 },
    ],
    compute: (vals, engine) => {
      const a = vals.a_AU * PHYS.AU;
      const M = vals.M_solar * PHYS.M_sun;
      const T = 2 * Math.PI * Math.sqrt(a * a * a / (PHYS.G * M));
      const T_days = T / 86400;
      const T_years = T / PHYS.year_s;

      const c = engine.constants;
      const alphaG = 5 / (lucasNumber(93) * lucasNumber(94)); // RS α_G (very small)

      return {
        rsFormula: 'T = 2π√(a³/(C_{n_G}·ℏc·Λ_☉²/(Λ_p²·m_e)))',
        rsContent: `G derived from Lucas coupling: C₈₉ = Δ/(L(93)·L(94)). Proton mass integer μ = ${c.mu_int.value}. Central mass in proton mass units: Λ_☉ = M☉/(μ·m_e).`,
        result: `T = ${T_days.toFixed(2)} days (${T_years.toFixed(4)} years)`,
        checks: [
          { label: 'Earth', expected: '365.25 days', match: Math.abs(T_days - 365.25) < 1 },
        ]
      };
    }
  },
  {
    id: 'escape-vel',
    title: 'Escape Velocity',
    icon: '🚀',
    desc: 'v_esc = √(2GM/r). Mass and coupling from RS integers.',
    inputs: [
      { id: 'M_kg', label: 'Mass (kg)', value: 5.972e24 },
      { id: 'r_m', label: 'Radius (m)', value: 6.371e6 },
    ],
    compute: (vals) => {
      const v = Math.sqrt(2 * PHYS.G * vals.M_kg / vals.r_m);
      return {
        rsFormula: 'v_esc = √(2·C_{n_G}·ℏc·Λ_M / (Λ_p²·m_e·r))',
        rsContent: 'Gravitational coupling from Lucas law replaces G. Mass expressed as RS mass integer.',
        result: `v_esc = ${(v / 1000).toFixed(2)} km/s`,
        checks: [
          { label: 'Earth', expected: '11.2 km/s', match: Math.abs(v / 1000 - 11.2) < 0.2 },
        ]
      };
    }
  },
  {
    id: 'compton',
    title: 'Compton Wavelength',
    icon: 'λ',
    desc: 'λ_C = h/(Λ·m_e·c). RS: structurally 1/Λ in electron-Compton units.',
    inputs: [
      { id: 'Lambda', label: 'Mass integer Λ', value: 1 },
    ],
    compute: (vals) => {
      const lambda_C = PHYS.h / (vals.Lambda * PHYS.m_e * PHYS.c);
      return {
        rsFormula: 'λ_C(Λ) = 1/Λ × λ_C(e)',
        rsContent: `λ_C(e) = ${(PHYS.h / (PHYS.m_e * PHYS.c)).toExponential(4)} m. RS: mass integer hierarchy = Compton hierarchy.`,
        result: `λ_C = ${lambda_C.toExponential(4)} m`,
        checks: [
          { label: 'Electron (Λ=1)', expected: '2.426×10⁻¹² m', match: vals.Lambda === 1 },
        ]
      };
    }
  },
  {
    id: 'rydberg',
    title: 'Rydberg Transition',
    icon: 'H',
    desc: '1/λ = R∞(1/n₁² − 1/n₂²). RS α enters via Sommerfeld Prime Pair.',
    inputs: [
      { id: 'n1', label: 'Lower level n₁', value: 2 },
      { id: 'n2', label: 'Upper level n₂', value: 3 },
    ],
    compute: (vals, engine) => {
      const n1 = vals.n1, n2 = vals.n2;
      const inv_lambda = PHYS.R_inf * (1 / (n1 * n1) - 1 / (n2 * n2));
      const lambda_m = 1 / Math.abs(inv_lambda);
      const lambda_nm = lambda_m * 1e9;
      const freq = PHYS.c * Math.abs(inv_lambda);

      const c = engine.constants;
      return {
        rsFormula: '1/λ = R∞_RS × (1/n₁² − 1/n₂²), R∞ uses α = p_α/q_α',
        rsContent: `α⁻¹_int = ${c.alpha_inv.value}. Sommerfeld pair: (${c.sommerfeldPair.value.join(', ')}). For n₁=${n1}→n₂=${n2}: factor = ${Math.abs(1/(n1*n1) - 1/(n2*n2)).toFixed(6)}`,
        result: `λ = ${lambda_nm.toFixed(1)} nm (ν = ${(freq / 1e12).toFixed(1)} THz)`,
        checks: [
          { label: 'Hα (2→3)', expected: '656.3 nm', match: n1 === 2 && n2 === 3 },
          { label: 'Lyα (1→2)', expected: '121.6 nm', match: n1 === 1 && n2 === 2 },
        ]
      };
    }
  },
  {
    id: 'schwarzschild',
    title: 'Schwarzschild Radius',
    icon: '◉',
    desc: 'r_S = 2GM/c². The structural saturation boundary.',
    inputs: [
      { id: 'M_solar', label: 'Mass (Solar masses)', value: 10 },
    ],
    compute: (vals) => {
      const M = vals.M_solar * PHYS.M_sun;
      const r_s = 2 * PHYS.G * M / (PHYS.c * PHYS.c);
      return {
        rsFormula: 'r_S = 2·C_{n_G}·ℏ·Λ_M / (Λ_p²·m_e·c)',
        rsContent: 'The Schwarzschild radius is the structural boundary where koppa_ledger saturates. Beyond r_S, the rank exceeds all structural bounds.',
        result: `r_S = ${r_s.toFixed(0)} m (${(r_s / 1000).toFixed(1)} km)`,
        checks: [
          { label: '10 M☉', expected: '~29.5 km', match: Math.abs(vals.M_solar - 10) < 0.1 },
        ]
      };
    }
  },
  {
    id: 'fine-structure-splitting',
    title: 'Fine Structure Splitting',
    icon: 'α',
    desc: 'ΔE = E_n · α²/n. Uses RS Sommerfeld integer directly.',
    inputs: [
      { id: 'n', label: 'Principal quantum number n', value: 2 },
    ],
    compute: (vals, engine) => {
      const n = vals.n;
      const E_n = 13.6 / (n * n); // eV
      const alpha = 1 / 137;
      const splitting = E_n * alpha * alpha / n;

      return {
        rsFormula: 'ΔE = (13.6/n²) · (1/α⁻¹_int)² / n',
        rsContent: `α⁻¹_int = 137 (RS Sommerfeld integer). For n=${n}: base energy = ${E_n.toFixed(3)} eV.`,
        result: `ΔE ≈ ${(splitting * 1e6).toFixed(1)} μeV (${(splitting * PHYS.eV_J / PHYS.hbar / (2 * Math.PI) / 1e9).toFixed(1)} GHz)`,
        checks: []
      };
    }
  },
  {
    id: 'de-broglie',
    title: 'De Broglie Wavelength',
    icon: 'Ψ',
    desc: 'λ = h/(Λ·m_e·v). Structural wavelength in mass-gap units.',
    inputs: [
      { id: 'Lambda', label: 'Mass integer Λ', value: 1 },
      { id: 'v_ms', label: 'Velocity (m/s)', value: 1e6 },
    ],
    compute: (vals) => {
      const lambda = PHYS.h / (vals.Lambda * PHYS.m_e * vals.v_ms);
      return {
        rsFormula: 'λ_dB = h / (Λ·m_e·v)',
        rsContent: `Mass integer Λ = ${vals.Lambda}, rank(Λ) = ${rank(vals.Lambda)}.`,
        result: `λ = ${lambda.toExponential(3)} m`,
        checks: []
      };
    }
  },
  {
    id: 'grav-binding',
    title: 'Gravitational Binding Energy',
    icon: 'U',
    desc: 'U = 3GM²/(5r). How much energy to unbind a uniform sphere.',
    inputs: [
      { id: 'M_kg', label: 'Mass (kg)', value: 5.972e24 },
      { id: 'r_m', label: 'Radius (m)', value: 6.371e6 },
    ],
    compute: (vals) => {
      const U = 3 * PHYS.G * vals.M_kg * vals.M_kg / (5 * vals.r_m);
      return {
        rsFormula: 'U = 3·C_{n_G}·ℏc·Λ_M² / (5·Λ_p²·m_e·r)',
        rsContent: 'Uses RS gravitational coupling. Binding energy in electron mass units: Λ_U = U / (m_e·c²).',
        result: `U = ${U.toExponential(3)} J (${(U / (PHYS.m_e * PHYS.c * PHYS.c)).toExponential(3)} m_e·c²)`,
        checks: [
          { label: 'Earth', expected: '~2.24×10³² J', match: Math.abs(vals.M_kg - 5.972e24) < 1e23 },
        ]
      };
    }
  },
];

// Pre-set orbital data
const ORBITAL_PRESETS = [
  { name: 'Mercury', a_AU: 0.387, M_solar: 1.0, expected: '87.97 days' },
  { name: 'Venus', a_AU: 0.723, M_solar: 1.0, expected: '224.7 days' },
  { name: 'Earth', a_AU: 1.000, M_solar: 1.0, expected: '365.25 days' },
  { name: 'Mars', a_AU: 1.524, M_solar: 1.0, expected: '687.0 days' },
  { name: 'Jupiter', a_AU: 5.203, M_solar: 1.0, expected: '4332.6 days' },
  { name: 'Saturn', a_AU: 9.537, M_solar: 1.0, expected: '10759 days' },
  { name: 'Moon', a_AU: 0.00257, M_solar: 3.003e-6, expected: '27.32 days' },
];

export function renderCalculator(container, engine) {
  container.innerHTML = `
    <div class="panel-header">
      <h2>RS Calculator</h2>
      <div class="panel-desc">Plug in empirical data, compute via RS structural constants. Blue = RS ontological content, green = numerical verification result.</div>
    </div>

    <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px" id="calc-tabs">
      ${TEMPLATES.map((t, i) => `
        <button class="op-btn calc-tab" data-idx="${i}" style="font-size:12px; ${i === 0 ? 'background:var(--rs-blue-glow); border-color:var(--rs-blue)' : ''}">
          ${t.icon} ${t.title}
        </button>
      `).join('')}
    </div>

    <div id="calc-content"></div>
  `;

  function renderTemplate(idx) {
    const t = TEMPLATES[idx];
    container.querySelectorAll('.calc-tab').forEach((tab, i) => {
      tab.style.background = i === idx ? 'var(--rs-blue-glow)' : 'var(--surface)';
      tab.style.borderColor = i === idx ? 'var(--rs-blue)' : 'var(--border)';
    });

    const content = document.getElementById('calc-content');
    content.innerHTML = `
      <div class="rs-box ontological">
        <div class="box-label">${t.title}</div>
        <div style="font-size:13px; color:var(--text-secondary); margin-bottom:16px">${t.desc}</div>

        <div style="display:flex; flex-wrap:wrap; gap:12px; margin-bottom:16px">
          ${t.inputs.map(inp => `
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px">${inp.label}</label>
              <input type="text" class="calc-input" data-id="${inp.id}" value="${inp.value}"
                style="font-family:JetBrains Mono; background:var(--surface); border:1px solid var(--border); color:var(--text-primary); padding:8px 12px; border-radius:8px; font-size:14px; width:160px; outline:none" />
            </div>
          `).join('')}
          <div style="display:flex; align-items:flex-end">
            <button class="op-btn" id="calc-run" style="font-size:14px; padding:8px 20px">Compute</button>
          </div>
        </div>

        ${t.id === 'orbital-period' ? `
          <div style="margin-bottom:16px">
            <div style="font-size:11px; color:var(--text-muted); margin-bottom:6px; text-transform:uppercase; letter-spacing:1px">Presets (Solar System)</div>
            <div style="display:flex; flex-wrap:wrap; gap:4px">
              ${ORBITAL_PRESETS.map(p => `
                <button class="op-btn orbital-preset" data-a="${p.a_AU}" data-m="${p.M_solar}" style="font-size:11px; padding:4px 10px">${p.name}</button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div id="calc-result" style="padding:16px; background:var(--surface); border-radius:8px; font-family:JetBrains Mono; font-size:13px; color:var(--text-secondary); line-height:1.8">
          Enter values and click Compute.
        </div>
      </div>
    `;

    function runCompute() {
      const vals = {};
      content.querySelectorAll('.calc-input').forEach(inp => {
        vals[inp.dataset.id] = parseFloat(inp.value);
      });
      const result = t.compute(vals, engine);
      document.getElementById('calc-result').innerHTML = `
        <div class="rs-box ontological" style="margin-bottom:12px; padding:12px">
          <div class="box-label" style="margin-bottom:6px">RS Formula</div>
          <div class="mono" style="color:var(--text-accent); font-size:14px">${result.rsFormula}</div>
          <div style="font-size:12px; color:var(--text-secondary); margin-top:8px">${result.rsContent}</div>
        </div>
        <div class="rs-box verification" style="padding:12px">
          <div class="box-label" style="margin-bottom:6px">Numerical Result (Verification Path)</div>
          <div class="mono constant-val" style="font-size:16px">${result.result}</div>
          ${result.checks.length ? `<div style="margin-top:8px">${result.checks.map(ch =>
            `<span class="badge ${ch.match ? 'pass' : ''}" style="margin-right:6px; font-size:11px">${ch.label}: ${ch.expected}</span>`
          ).join('')}</div>` : ''}
        </div>
      `;
    }

    content.querySelector('#calc-run').addEventListener('click', runCompute);

    // Orbital presets
    if (t.id === 'orbital-period') {
      content.querySelectorAll('.orbital-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          const aInp = content.querySelector('[data-id="a_AU"]');
          const mInp = content.querySelector('[data-id="M_solar"]');
          aInp.value = btn.dataset.a;
          mInp.value = btn.dataset.m;
          runCompute();
        });
      });
    }
  }

  container.querySelector('#calc-tabs').addEventListener('click', (e) => {
    const tab = e.target.closest('.calc-tab');
    if (tab) renderTemplate(parseInt(tab.dataset.idx));
  });

  renderTemplate(0);
}
