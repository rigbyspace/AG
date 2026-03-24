// RS Glossary — all terms from the master reference
// Each entry: { term, symbol, def, operators, see }

export const GLOSSARY = [
  // ── Primitives ──
  { term: 'Vacuum Period', symbol: 'T_vac', def: 'The prime temporal container. T_vac = 11. The smallest prime admitting a non-trivial triadic partition with irreducible phase residual.', operators: ['succ','koppa'], see: ['Phase Partition'] },
  { term: 'Triadic Period', symbol: 'N', def: 'The triadic modulus. N = 3. Determines the three-phase structure E-M-R.', operators: ['koppa'], see: ['Phase Partition'] },
  { term: 'Mass Gap', symbol: 'G_mg', def: 'The irreducible per-cycle phase residual. G_mg = koppa(T_vac, N) = 2. The smallest constructive imbalance the vacuum cannot absorb.', operators: ['koppa'], see: ['Phase Slip'] },
  { term: 'Explicit Rational Pair', symbol: 'ERP', def: '(n, d) ∈ ℤ × (ℤ\\{0}). The fundamental state object. Stored in unreduced form — no GCD reduction. Two ERPs are observationally equivalent iff n₁d₂ = n₂d₁.', operators: [], see: ['Observational Equivalence'] },

  // ── Phase Architecture ──
  { term: 'Phase Partition', symbol: '4-4-3', def: 'The partition of T_vac=11 ticks into Emission (N_E=4), Modulation (N_M=4), Return (N_R=3) phases. Derived from succ-orbit and koppa-assignment.', operators: ['succ','koppa'], see: ['Flux Imbalance'] },
  { term: 'Emission Phase', symbol: 'E', def: 'Phase E: ticks {1,4,7,10}. Cardinality N_E = N+1 = 4. Source of temporal surplus.', operators: ['succ','koppa'], see: ['Phase Partition'] },
  { term: 'Modulation Phase', symbol: 'M', def: 'Phase M: ticks {2,5,8,11}. Cardinality N_M = N+1 = 4. Neutral — neither creates nor absorbs surplus.', operators: ['succ','koppa'], see: ['Phase Partition'] },
  { term: 'Return Phase', symbol: 'R', def: 'Phase R: ticks {3,6,9}. Cardinality N_R = N = 3. Absorbs temporal surplus.', operators: ['succ','koppa'], see: ['Phase Partition'] },
  { term: 'Flux Imbalance', symbol: 'Δ', def: '(N_E + N_M) − N_R = 5. The net flux per cycle that cannot be reconciled. Fundamental structural asymmetry.', operators: ['koppa'], see: ['Arrow of Time'] },
  { term: 'Boundary-Active Phase Sum', symbol: 'Σ_imb', def: 'N_E + N_R = 7. Phases that actively participate in boundary exchanges.', operators: [], see: ['Phase Partition'] },
  { term: 'Phase Slip', symbol: 'δ_slip', def: 'Phase slip per cycle = G_mg = koppa(T_vac, N) = 2. The structural origin of the Arrow of Time.', operators: ['koppa'], see: ['Mass Gap','Arrow of Time'] },

  // ── Temporal Structure ──
  { term: 'Arrow of Time', symbol: '', def: 'Net +1 surplus per T_vac cycle due to E-count (4) exceeding R-count (3). Time\'s direction is a structural theorem, not an assumption.', operators: ['succ','koppa','Ω'], see: ['Flux Imbalance'] },
  { term: 'Inertial Closure Tick', symbol: 'τ₁₀', def: 'T_vac − 1 = 10. The last tick before Ω fires. Arrow lock — irreversibility is sealed here.', operators: ['succ'], see: ['Cycle Boundary'] },
  { term: 'Cycle Boundary', symbol: 'Ω', def: 'The boundary event at the end of each T_vac cycle. Reconciles accumulated flux, updates koppa_ledger, deposits temporal charge. The mechanism of structural time advancement.', operators: ['koppa','Ω'], see: ['Arrow of Time'] },

  // ── Operators ──
  { term: 'Constructive Remainder', symbol: 'koppa', def: 'koppa(x, L): iterative subtraction of L from x until 0 ≤ r < L. The dual ledger/imbalance operator. Replaces division and modular arithmetic. Foundation of primality, phase assignment, and structural accounting.', operators: ['koppa'], see: ['Prime Gate'] },
  { term: 'Linear Transform', symbol: 'λ', def: 'λ(n,d) = (n+d, d). Vacuum propagation — preserves denominator. Generates the Vacuum Line (λ-ray) in the mediant tree.', operators: ['λ'], see: ['Mediant Tree'] },
  { term: 'Aggregate Transform', symbol: 'η', def: 'η(n,d) = (n+d, n). The master convergence driver. Generates Fibonacci pairs from (1,1) and Lucas pairs from the vacuum seed (11,7). Produces the φ-convergent path in the mediant tree.', operators: ['η'], see: ['Lucas Coupling Law'] },
  { term: 'Transformative Reciprocal', symbol: 'ψ', def: 'ψ((a/b), (c/d)) = ((d/a), (b/c)). The standout coupled operator. Period 4 (ψ⁴=Id). ψ² = Charge Conjugation. Cannot act on a single ERP in isolation.', operators: ['ψ'], see: ['Charge Conjugation'] },
  { term: 'Mediant Sum', symbol: '⊕', def: '(a,b) ⊕ (c,d) = (a+c, b+d). Preserves cross-determinant width. Fundamental operation of the Stern-Brocot tree.', operators: ['⊕'], see: ['Mediant Tree'] },
  { term: 'Barycentric Addition', symbol: '⊞', def: '(n₁,d₁) ⊞ (n₂,d₂) = (n₁d₂+n₂d₁, d₁d₂). Engine of rank growth and mass generation. The structural analogue of "addition of fractions."', operators: ['⊞'], see: ['Rank'] },

  // ── Structural Measures ──
  { term: 'Temporal Charge', symbol: 'Γ', def: 'Γ(n,d) = d² − n². Classifies regime: >0 subluminal (massive), =0 luminal, <0 superluminal (excluded by the RS substrate).', operators: [], see: ['ERP'] },
  { term: 'Cross-Determinant', symbol: 'Δ_cross', def: 'Δ_cross(A,B) = p_b·q_a − p_a·q_b. Replaces continuous metric distance. Encodes both ordering and deviation magnitude. Sign determines matter/antimatter.', operators: [], see: ['Charge Conjugation'] },
  { term: 'Width', symbol: 'W', def: 'W(L,U) = Δ_cross(L,U) for an ordered bracket L ≺ U. Preserved under mediant refinement. Saturation at W=1.', operators: ['⊕'], see: ['Saturation'] },
  { term: 'Rank', symbol: 'ρ', def: 'ρ(m) = unique k ≥ 0 such that G_mg^k ≤ m < G_mg^(k+1). Counts G_mg-doublings. Measures causal depth in mass-gap units.', operators: ['koppa'], see: ['Mass Gap'] },
  { term: 'Prime-Event Depth', symbol: 'ρ_Ω', def: 'Total prime factors with multiplicity, via koppa decomposition. Counts the number of Ω-events in the factorization history.', operators: ['koppa','Ω','PG'], see: ['Prime Gate'] },
  { term: 'Observational Equivalence', symbol: '~', def: 'A ~ B iff n₁d₂ = n₂d₁. No GCD reduction — states are distinct based on history even if observationally equivalent.', operators: [], see: ['ERP'] },
  { term: 'Charge Conjugation', symbol: 'C', def: 'ψ² maps (A,B) → (B,A) and flips sign of Δ_cross. Matter ↔ antimatter exchange. A theorem of the operator algebra, not a definition.', operators: ['ψ'], see: ['Transformative Reciprocal'] },

  // ── Derived Constants ──
  { term: 'Gauge Manifold Dimension', symbol: 'D_gauge', def: 'τ₁₀ + δ_slip = 12. Also: Δ + Σ_imb = 12 (Goldbach). Also: N × N_E = 12 (Lucas). Three paths converge.', operators: ['koppa'], see: ['Interaction Surface'] },
  { term: 'Barycentric Period', symbol: 'T_bary', def: 'T_vac × N = 33. The full barycentric cycle length.', operators: [], see: ['Vacuum Period'] },
  { term: 'Interaction Surface', symbol: 'S_int', def: 'T_vac × D_gauge = 132. The total interaction capacity of the vacuum per barycentric cycle.', operators: [], see: ['Sommerfeld Constant'] },
  { term: 'Saturation Limit', symbol: 'K_sat', def: 'Δ² = 25. Maximum barycentric absorption capacity before truncation forces Ω.', operators: ['koppa','Ω'], see: ['Barycentric Truncation'] },
  { term: 'Sommerfeld Constant', symbol: 'α⁻¹_int', def: 'S_int + Δ = 137. The integer part of the fine-structure constant. Also PG(T_bary) = PG(33) = 137 (independent path).', operators: ['koppa','PG'], see: ['Sommerfeld Prime Pair'] },
  { term: 'Gen-3 Gate Prime', symbol: 'Π₃', def: 'PG(N × G_mg) = PG(6) = 13. The prime gate controlling generation-3 mass scale.', operators: ['PG','koppa'], see: ['Bottom Quark'] },
  { term: 'Gravitational Coupling Depth', symbol: 'n_G', def: 'n_G = 89. Four converging paths: F(T_vac), R_D+K_sat, PG(G_mg×D_gauge), S_int−D_gauge×N_E+Δ. The η-orbit depth at which gravitational coupling is evaluated.', operators: ['η','PG','koppa'], see: ['Lucas Coupling Law'] },
  { term: 'Viscosity Sum', symbol: 'V_S', def: 'V_S = 18. Accumulated phase drift over a full vacuum cycle.', operators: ['succ','koppa'], see: ['Phase Partition'] },

  // ── Mass Integers ──
  { term: 'Muon Mass Integer', symbol: 'Λ_μ', def: 'S_int + R_D + T_vac = 132 + 64 + 11 = 207. The three-step absorption path.', operators: ['koppa','⊞'], see: ['Particle Generation'] },
  { term: 'Tau Mass Integer', symbol: 'Λ_τ', def: 'PG(D_gauge + Δ)² = 59² = 3481.', operators: ['PG','koppa'], see: ['Particle Generation'] },
  { term: 'Bottom Quark Mass Integer', symbol: 'Λ_b', def: 'G_mg^Π₃ = 2¹³ = 8192. Pure mass-gap exponentiation at the gen-3 gate prime.', operators: ['koppa'], see: ['Gen-3 Gate Prime'] },
  { term: 'Top Quark Mass Integer', symbol: 'Λ_t', def: 'G_mg^N_E × Δ^N × Π₃^G_mg = 16 × 125 × 169 = 338000.', operators: ['koppa'], see: ['Particle Generation'] },
  { term: 'Composite Higgs Mass Integer', symbol: 'Λ_H', def: '120² × PG(Σ_imb) = 14400 × 17 = 244800.', operators: ['PG','koppa'], see: ['Particle Generation'] },
  { term: 'Proton Mass Integer', symbol: 'μ_int', def: 'D_gauge³ + (S_int − 2·D_gauge) = 1728 + 108 = 1836.', operators: [], see: ['Rydberg Constant'] },
  { term: 'Generation Sector Invariant', symbol: '𝒢', def: 'T_bary × Σ_imb + δ_slip = 33 × 7 + 2 = 233. Structural pivot of the generation sector.', operators: ['koppa'], see: ['Generation-EM Coupling'] },
  { term: 'Generation-EM Coupling', symbol: '', def: '𝒢 + Λ_{q2} − Λ_{q1} − Λ_{q3} = 233 + 303 − 207 − 192 = 137 = α⁻¹_int. Exact integer identity linking generation to electromagnetic sector.', operators: [], see: ['Sommerfeld Constant'] },

  // ── Sommerfeld Structure ──
  { term: 'Sommerfeld Prime Pair', symbol: '(p_α, q_α)', def: '(115331, 15804499). Both prime. CF descent D_α = [137; 27, 1, 3, 2, 21, 1, 1, 10]. Every quotient and remainder is an RS structural product. The RS fine-structure constant lives in this prime pair.', operators: ['koppa','PG'], see: ['Sommerfeld Constant'] },

  // ── Trees and Geodesics ──
  { term: 'Mediant Tree', symbol: '', def: 'The Stern-Brocot tree rooted at [(0,1), (1,0)]. Every ERP appears exactly once. Geodesic paths correspond to CF partial quotients. Width preserved under refinement.', operators: ['⊕'], see: ['Width','Geodesic'] },
  { term: 'Geodesic', symbol: 'γ(A,B)', def: 'The unique shortest path between two ERPs in the mediant tree. Length equals sum of CF partial quotients.', operators: ['⊕'], see: ['Mediant Tree'] },
  { term: 'Saturation', symbol: 'W=1', def: 'Minimum bracket width. When W=1, no further mediant refinement is meaningful. The bracket has been resolved to maximum precision.', operators: ['⊕'], see: ['Width'] },
  { term: 'Barycentric Truncation', symbol: '', def: 'When barycentric addition produces a state exceeding the saturation limit K_sat=25, the excess is truncated via Ω-discharge. Mechanism of particle mass stabilization.', operators: ['⊞','Ω'], see: ['Saturation Limit'] },

  // ── Coupling ──
  { term: 'Lucas Coupling Law', symbol: 'C_k', def: 'C_k = Δ / (L(k+4) · L(k+5)). Exact integer formula for coupling magnitude at η-orbit depth k. Gravity lives at k = n_G = 89.', operators: ['η','koppa'], see: ['Gravitational Coupling Depth'] },
  { term: 'Frictionless Propagation Principle', symbol: '', def: 'If the structural depth is prime (koppa(depth, k) ≠ 0 for all 1 < k < depth), the coupling propagates without dissipative branching. n_G=89 is prime.', operators: ['koppa','PG'], see: ['Lucas Coupling Law'] },

  // ── Resolution Classes ──
  { term: 'Dyadic Resolution Class', symbol: 'R_D', def: 'R_D = 64 = 2⁶. The quark sector resolution class. Absorption capacity for gen-1 quarks and muon.', operators: ['koppa'], see: ['Particle Generation'] },
  { term: 'Triadic Closure Class', symbol: 'R_T', def: 'R_T = 72 = 8×9. The electron sector resolution class.', operators: ['koppa'], see: ['Particle Generation'] },
  { term: 'Extended Dyadic Class', symbol: 'R_E', def: 'R_E = 128 = 2⁷. The tau sector resolution class.', operators: ['koppa'], see: ['Particle Generation'] },

  // ── Structural ERPs ──
  { term: 'Pi-Analog', symbol: '(355, 113)', def: 'The RS π-analog ERP. 4-leg mediant truncation. 355/113 ≈ 3.14159292... Structural, not transcendental.', operators: ['⊕'], see: ['Mediant Tree'] },
  { term: 'Phi-Oscillator', symbol: '(7477, 4621)', def: 'Minimal prime-prime φ-approximant ERP. Both components are prime. Encodes the golden ratio as an RS structural pair.', operators: ['η','PG'], see: ['Frictionless Propagation'] },
  { term: 'Vacuum Seed', symbol: '(11, 7)', def: '(T_vac, Σ_imb) = (L(5), L(4)). The seed of the η-orbit that generates the Lucas coupling sequence.', operators: ['η'], see: ['Lucas Coupling Law'] },

  // ── Prime Gate ──
  { term: 'Prime Gate', symbol: 'PG', def: 'PG(k) = the k-th prime in natural order. Built from koppa-based primality testing and successor. PG(6)=13, PG(24)=89, PG(33)=137.', operators: ['koppa','succ'], see: ['Sommerfeld Constant'] },

  // ── PMNS ──
  { term: 'PMNS Mixing Angles', symbol: '', def: 'sin²θ₂₃ = 9/16 = (N², N_E²). sin²θ₁₂ = 3/10 = (N_R, τ₁₀). sin²θ₁₃ = 1/45 = (1, Δ·N²). Bare RS values; dressing mechanism is future work.', operators: ['koppa'], see: ['Phase Partition'] },
  { term: 'Koide Invariant', symbol: 'ε', def: 'ε = δ_slip / N = 2/3. Phase slip efficiency. Corresponds to the Koide lepton mass relation Q = 2/3.', operators: ['koppa'], see: ['Phase Slip'] },
];

export function renderGlossary(container, engine) {
  container.innerHTML = `
    <div class="panel-header">
      <h2>RS Glossary</h2>
      <div class="panel-desc">All terms from the RigbySpace master reference. Click any term to expand its full definition, operator dependencies, and cross-references.</div>
    </div>

    <div class="rs-box ontological" style="padding:12px">
      <div style="margin-bottom:12px">
        <input type="text" id="glossary-search" placeholder="Search terms…"
          style="width:100%; padding:10px 14px; background:var(--surface); border:1px solid var(--border); border-radius:8px; color:var(--text-primary); font-family:Space Grotesk; font-size:14px; outline:none" />
      </div>
    </div>

    <div id="glossary-list"></div>
  `;

  const listEl = document.getElementById('glossary-list');
  const searchEl = document.getElementById('glossary-search');

  function renderList(filter = '') {
    const filtered = GLOSSARY.filter(g =>
      !filter || g.term.toLowerCase().includes(filter) || g.symbol.toLowerCase().includes(filter) || g.def.toLowerCase().includes(filter)
    );
    listEl.innerHTML = filtered.map(g => `
      <div class="rs-box ontological glossary-entry" style="cursor:pointer; padding:14px; margin-bottom:6px" data-term="${g.term}">
        <div style="display:flex; justify-content:space-between; align-items:center">
          <div>
            <span style="font-weight:600; color:var(--text-primary)">${g.term}</span>
            ${g.symbol ? `<span class="erp" style="margin-left:8px">${g.symbol}</span>` : ''}
          </div>
          <span class="glossary-chevron" style="color:var(--text-muted); transition:transform 0.2s">▸</span>
        </div>
        <div class="glossary-detail" style="display:none; margin-top:10px; padding-top:10px; border-top:1px solid var(--border)">
          <div style="font-size:13px; color:var(--text-secondary); line-height:1.6; margin-bottom:8px">${g.def}</div>
          ${g.operators.length ? `<div style="margin-bottom:6px"><span style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Operators: </span>${g.operators.map(o => `<span class="operator" style="margin-right:4px">${o}</span>`).join('')}</div>` : ''}
          ${g.see.length ? `<div><span style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">See also: </span>${g.see.map(s => `<span style="color:var(--text-accent); cursor:pointer; margin-right:6px; font-size:12px" data-goto="${s}">${s}</span>`).join('')}</div>` : ''}
        </div>
      </div>
    `).join('');

    // Toggle details
    listEl.querySelectorAll('.glossary-entry').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.dataset.goto) {
          searchEl.value = e.target.dataset.goto;
          renderList(e.target.dataset.goto.toLowerCase());
          return;
        }
        const detail = el.querySelector('.glossary-detail');
        const chevron = el.querySelector('.glossary-chevron');
        const open = detail.style.display !== 'none';
        detail.style.display = open ? 'none' : 'block';
        chevron.textContent = open ? '▸' : '▾';
      });
    });
  }

  searchEl.addEventListener('input', () => renderList(searchEl.value.toLowerCase()));
  renderList();
}
