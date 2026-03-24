export function renderParticleTable(container, engine) {
  const c = engine.constants;

  const m_e = 0.51099895; // MeV, electron mass (verification path only)

  const particles = [
    { name: 'Electron', symbol: 'e', massInt: 1, formula: 'Unit (by definition)', sector: 'Lepton', class: 'R_T = 72' },
    { name: 'Muon', symbol: 'μ', massInt: c.Lambda_mu.value, formula: c.Lambda_mu.formula, sector: 'Lepton', class: 'R_D = 64' },
    { name: 'Tau', symbol: 'τ', massInt: c.Lambda_tau.value, formula: c.Lambda_tau.formula, sector: 'Lepton', class: 'R_E = 128' },
    { name: 'Proton', symbol: 'p', massInt: c.mu_int.value, formula: c.mu_int.formula, sector: 'Baryon', class: '—' },
    { name: 'Gen-1 Quark', symbol: 'q₁', massInt: c.Lambda_q1.value, formula: c.Lambda_q1.formula, sector: 'Quark', class: 'R_D = 64' },
    { name: 'Gen-2 Quark', symbol: 'q₂', massInt: c.Lambda_q2.value, formula: c.Lambda_q2.formula, sector: 'Quark', class: 'C = 160' },
    { name: 'Gen-3 Quark', symbol: 'q₃', massInt: c.Lambda_q3.value, formula: c.Lambda_q3.formula, sector: 'Quark', class: 'C = 192 (locked)' },
    { name: 'Bottom Quark', symbol: 'b', massInt: c.Lambda_b.value, formula: c.Lambda_b.formula, sector: 'Quark', class: '2¹³' },
    { name: 'Top Quark', symbol: 't', massInt: c.Lambda_t.value, formula: c.Lambda_t.formula, sector: 'Quark', class: '—' },
    { name: 'Composite Higgs', symbol: 'H', massInt: c.Lambda_H.value, formula: c.Lambda_H.formula, sector: 'Boson', class: '—' },
  ];

  const pdgMeV = {
    'e': 0.511, 'μ': 105.658, 'τ': 1776.86, 'p': 938.272,
    'q₁': null, 'q₂': null, 'q₃': null,
    'b': 4180, 't': 172760, 'H': 125100
  };

  container.innerHTML = `
    <div class="panel-header">
      <h2>Particle Mass Table</h2>
      <div class="panel-desc">All mass integers derived from <span class="erp">T_vac = 11</span> and <span class="erp">N = 3</span> via operator chains. External comparison on the verification path only.</div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">RS Ontological Statement — Mass Integers</div>
      <table class="data-table">
        <thead><tr>
          <th>Particle</th><th>Mass Integer Λ</th><th>Operator Derivation</th><th>Resolution Class</th>
        </tr></thead>
        <tbody>
          ${particles.map(p => `<tr>
            <td><strong>${p.name}</strong> <span class="mono" style="color:var(--text-muted)">(${p.symbol})</span></td>
            <td class="val" style="font-size:15px">${p.massInt.toLocaleString()}</td>
            <td class="formula">${p.formula}</td>
            <td class="mono" style="font-size:12px; color:var(--text-muted)">${p.class}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="rs-box verification">
      <div class="box-label">External Verification (Continuous Lens)</div>
      <div style="font-size:12px; color:var(--text-secondary); margin-bottom:12px">
        Mass in MeV = Λ × m_e where m_e = ${m_e} MeV. PDG comparisons are <em>not</em> RS ontological.
      </div>
      <table class="data-table">
        <thead><tr>
          <th>Particle</th><th>RS (MeV)</th><th>PDG (MeV)</th><th>Residual</th>
        </tr></thead>
        <tbody>
          ${particles.map(p => {
            const rsMeV = (p.massInt * m_e);
            const pdg = pdgMeV[p.symbol];
            const residual = pdg ? ((rsMeV - pdg) / pdg * 100).toFixed(2) : '—';
            const pass = pdg ? Math.abs(rsMeV - pdg) / pdg < 0.01 : null;
            return `<tr>
              <td>${p.symbol}</td>
              <td class="val">${rsMeV < 1000 ? rsMeV.toFixed(2) : rsMeV.toFixed(0)}</td>
              <td class="mono" style="color:var(--text-secondary)">${pdg !== null ? (pdg < 1000 ? pdg.toFixed(2) : pdg.toFixed(0)) : '—'}</td>
              <td>${pdg !== null ? `<span class="badge ${pass ? 'pass' : 'fail'}" style="font-family:JetBrains Mono">${residual}%</span>` : '—'}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">RS Ontological Statement — Coupling Identities</div>
      <div style="display:grid; gap:12px">
        <div style="background:var(--surface); border-radius:8px; padding:14px">
          <div style="font-size:12px; color:var(--text-muted); margin-bottom:6px">Generation-Electromagnetic Coupling Identity</div>
          <div class="mono" style="font-size:15px; color:var(--text-primary)">
            𝒢 + Λ<sub>q2</sub> − Λ<sub>q1</sub> − Λ<sub>q3</sub> = ${c.G_inv.value} + ${c.Lambda_q2.value} − ${c.Lambda_q1.value} − ${c.Lambda_q3.value} = <span class="constant-val">${c.G_inv.value + c.Lambda_q2.value - c.Lambda_q1.value - c.Lambda_q3.value}</span> = α⁻¹<sub>int</sub>
          </div>
        </div>
        <div style="background:var(--surface); border-radius:8px; padding:14px">
          <div style="font-size:12px; color:var(--text-muted); margin-bottom:6px">Phase Slip Efficiency (Koide Correspondence)</div>
          <div class="mono" style="font-size:15px; color:var(--text-primary)">
            ε = δ<sub>slip</sub> / N = ${c.delta_slip.value} / ${c.N.value} = <span class="constant-val">2/3</span>
          </div>
        </div>
        <div style="background:var(--surface); border-radius:8px; padding:14px">
          <div style="font-size:12px; color:var(--text-muted); margin-bottom:6px">PMNS Mixing Angles (Bare)</div>
          <div class="mono" style="font-size:14px; color:var(--text-primary)">
            sin²θ₂₃ = <span class="constant-val">${c.pmns_theta23.value[0]}/${c.pmns_theta23.value[1]}</span> &nbsp;·&nbsp;
            sin²θ₁₂ = <span class="constant-val">${c.pmns_theta12.value[0]}/${c.pmns_theta12.value[1]}</span> &nbsp;·&nbsp;
            sin²θ₁₃ = <span class="constant-val">${c.pmns_theta13.value[0]}/${c.pmns_theta13.value[1]}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
