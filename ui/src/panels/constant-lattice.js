export function renderConstantLattice(container, engine) {
  const c = engine.constants;
  const v = engine.verifications;

  // Group constants logically
  const groups = [
    { label: 'Primitives', keys: ['T_vac', 'N'] },
    { label: 'Phase Partition (4-4-3)', keys: ['G_mg', 'delta_slip', 'N_E', 'N_M', 'N_R'] },
    { label: 'Phase-Derived', keys: ['Delta', 'Sigma_imb', 'tau10', 'D_gauge', 'V_S', 'T_bary', 'S_int', 'K_sat'] },
    { label: 'Prime-Gated', keys: ['Pi3', 'alpha_inv', 'n_G'] },
    { label: 'Resolution Classes', keys: ['R_D', 'R_T', 'R_E'] },
    { label: 'Lepton Mass Integers', keys: ['Lambda_mu', 'Lambda_tau'] },
    { label: 'Quark Mass Integers', keys: ['Lambda_q1', 'Lambda_q2', 'Lambda_q3'] },
    { label: 'Heavy Particles', keys: ['Lambda_b', 'Lambda_t', 'Lambda_H', 'mu_int'] },
    { label: 'Sector Invariants', keys: ['G_inv', 'epsilon'] },
    { label: 'Sommerfeld Descent', keys: ['D_alpha', 'sommerfeldPair'] },
    { label: 'Structural ERPs', keys: ['phiOsc', 'piAnalog', 'Bridge'] },
    { label: 'PMNS Mixing Angles', keys: ['pmns_theta23', 'pmns_theta12', 'pmns_theta13'] },
  ];

  const passCount = v.filter(x => x.pass).length;
  const allPass = passCount === v.length;

  container.innerHTML = `
    <div class="panel-header">
      <h2>Constant Lattice</h2>
      <div class="panel-desc">All structural constants derived from <span class="erp">T_vac = 11</span> and <span class="erp">N = 3</span> via operator chains. Each value is computed live — not stored.</div>
    </div>

    <div class="rs-box ${allPass ? 'ontological' : 'observation'}">
      <div class="box-label">${allPass ? 'RS Ontological Statement' : 'Verification Warning'}</div>
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px">
        <div class="badge ${allPass ? 'pass' : 'fail'}">${allPass ? '✓' : '⚠'} ${passCount}/${v.length} multi-path checks</div>
      </div>
      ${!allPass ? `<div style="color:var(--rs-red); font-size:13px">Some multi-path verifications failed. See details below.</div>` : ''}
    </div>

    ${groups.map(g => `
      <div class="rs-box ontological" style="margin-bottom:12px">
        <div class="box-label">${g.label}</div>
        <table class="data-table">
          <thead><tr>
            <th>Name</th><th>Value</th><th>Derivation</th><th>Description</th>
          </tr></thead>
          <tbody>
            ${g.keys.map(k => {
              const entry = c[k];
              if (!entry) return '';
              const val = Array.isArray(entry.value) ? `(${entry.value.join(', ')})` : entry.value;
              return `<tr>
                <td class="mono" style="font-weight:600; color:var(--text-primary)">${k}</td>
                <td class="val">${val}</td>
                <td class="formula">${entry.formula}</td>
                <td style="color:var(--text-secondary); font-size:12px">${entry.desc}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `).join('')}

    <div class="rs-box verification">
      <div class="box-label">Multi-Path Verification</div>
      <table class="data-table">
        <thead><tr><th>Check</th><th>Expected</th><th>Actual</th><th>Status</th></tr></thead>
        <tbody>
          ${v.map(x => `<tr>
            <td style="font-size:12px">${x.name}</td>
            <td class="val">${x.expected}</td>
            <td class="val">${x.actual}</td>
            <td><span class="badge ${x.pass ? 'pass' : 'fail'}">${x.pass ? '✓ Pass' : '✗ Fail'}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}
