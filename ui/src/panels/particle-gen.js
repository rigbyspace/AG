import { koppa, eta, boxplus, primeGate, rank } from '../rs-engine.js';

export function renderParticleGen(container, engine) {
  const c = engine.constants;

  // The three-step absorption path: S_int + C + T_vac = Λ
  // C = absorption capacity (resolution class)
  // Cases: A (identity → electron), B (doubling → muon/quarks), C (addition → tau)
  const particles = [
    { name: 'Electron', symbol: 'e', Lambda: 1, C: 0, path: 'Unit (no absorption)', phaseClass: 'R_T = 72', kopN: koppa(1, 3), locked: false, resolution: 'R_T', color: '#2a5cbf' },
    { name: 'Muon', symbol: 'μ', Lambda: c.Lambda_mu.value, C: c.R_D.value, path: `S_int + R_D + T_vac = ${c.S_int.value} + ${c.R_D.value} + ${c.T_vac.value}`, phaseClass: `R_D = ${c.R_D.value}`, kopN: koppa(c.Lambda_mu.value, 3), locked: false, resolution: 'R_D', color: '#1a9e55' },
    { name: 'Tau', symbol: 'τ', Lambda: c.Lambda_tau.value, C: 'PG(17)²', path: `PG(D_gauge + Δ)² = 59²`, phaseClass: `R_E = ${c.R_E.value}`, kopN: koppa(c.Lambda_tau.value, 3), locked: false, resolution: 'R_E', color: '#e69000' },
    { name: 'Gen-1 Quark', symbol: 'q₁', Lambda: c.Lambda_q1.value, C: 64, path: `S_int + 64 + T_vac`, phaseClass: `R_D = ${c.R_D.value}`, kopN: koppa(c.Lambda_q1.value, 3), locked: true, resolution: 'R_D', color: '#a855f7' },
    { name: 'Gen-2 Quark', symbol: 'q₂', Lambda: c.Lambda_q2.value, C: 160, path: `S_int + 160 + T_vac`, phaseClass: `C = 160`, kopN: koppa(c.Lambda_q2.value, 3), locked: true, resolution: '—', color: '#ec4899' },
    { name: 'Gen-3 Quark', symbol: 'q₃', Lambda: c.Lambda_q3.value, C: 0, path: `Phase-locked at 192`, phaseClass: 'C = 192', kopN: koppa(c.Lambda_q3.value, 3), locked: true, resolution: '—', color: '#f43f5e' },
    { name: 'Bottom', symbol: 'b', Lambda: c.Lambda_b.value, C: '—', path: `G_mg^Π₃ = 2¹³`, phaseClass: `2¹³`, kopN: koppa(c.Lambda_b.value, 3), locked: false, resolution: '—', color: '#06b6d4' },
    { name: 'Top', symbol: 't', Lambda: c.Lambda_t.value, C: '—', path: `G_mg^N_E × Δ^N × Π₃^G_mg`, phaseClass: `mixed`, kopN: koppa(c.Lambda_t.value, 3), locked: false, resolution: '—', color: '#14b8a6' },
    { name: 'Higgs', symbol: 'H', Lambda: c.Lambda_H.value, C: '—', path: `120² × PG(Σ_imb)`, phaseClass: `composite`, kopN: koppa(c.Lambda_H.value, 3), locked: false, resolution: '—', color: '#f59e0b' },
    { name: 'Proton', symbol: 'p', Lambda: c.mu_int.value, C: '—', path: `D_gauge³ + (S_int − 2·D_gauge)`, phaseClass: `baryon`, kopN: koppa(c.mu_int.value, 3), locked: false, resolution: '—', color: '#ef4444' },
  ];

  // Animation SVG for the generation process
  const svgW = 700, svgH = 280;
  const barW = 50, gap = 10;

  container.innerHTML = `
    <div class="panel-header">
      <h2>Particle Generation Visualizer</h2>
      <div class="panel-desc">The Matter Generator <span class="operator">G</span> operating on the projective domain SP. Three-step absorption path: <span class="erp">S_int + C + T_vac = Λ</span>.</div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">RS Ontological Statement — Generation Architecture</div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:20px">
        <div style="background:var(--surface); border-radius:8px; padding:14px; text-align:center; border:1px solid var(--rs-blue)22">
          <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Step 1: Interaction Surface</div>
          <div class="mono" style="font-size:24px; color:var(--rs-blue-light); margin-top:8px">S_int = ${c.S_int.value}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:4px">T_vac × D_gauge = 11 × 12</div>
        </div>
        <div style="background:var(--surface); border-radius:8px; padding:14px; text-align:center; border:1px solid var(--rs-amber)22">
          <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Step 2: Capacity Absorption</div>
          <div class="mono" style="font-size:24px; color:var(--rs-amber-light); margin-top:8px">+ C</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:4px">Resolution class determines C</div>
        </div>
        <div style="background:var(--surface); border-radius:8px; padding:14px; text-align:center; border:1px solid var(--rs-green)22">
          <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Step 3: Vacuum Finalization</div>
          <div class="mono" style="font-size:24px; color:var(--rs-green-light); margin-top:8px">+ T_vac = ${c.T_vac.value}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:4px">Vacuum boundary deposit</div>
        </div>
      </div>

      <div style="font-size:13px; color:var(--text-secondary); line-height:1.6; margin-bottom:16px">
        <strong>Resolution Classes</strong> determine which stability basin a particle settles into:
        <span class="erp">R_D = ${c.R_D.value}</span> (dyadic/quark),
        <span class="erp">R_T = ${c.R_T.value}</span> (triadic/electron),
        <span class="erp">R_E = ${c.R_E.value}</span> (extended/tau).
        Phase-locking: if <span class="operator">koppa</span>(C, N) = 0, the particle precipitates directly without three-step absorption.
      </div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">Mass Integer Spectrum</div>
      <div style="overflow-x:auto">
        <svg viewBox="0 0 ${svgW} ${svgH}" style="width:100%; min-width:600px">
          <!-- Log-scale bar chart of mass integers -->
          ${particles.map((p, i) => {
            const logVal = Math.log2(p.Lambda + 1);
            const maxLog = Math.log2(c.Lambda_t.value + 1);
            const h = (logVal / maxLog) * (svgH - 60);
            const x = 30 + i * (barW + gap);
            const y = svgH - 30 - h;
            return `
              <g>
                <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="4" fill="${p.color}" opacity="0.8"/>
                <text x="${x + barW/2}" y="${svgH - 14}" text-anchor="middle" fill="var(--text-secondary)" font-size="10" font-family="JetBrains Mono">${p.symbol}</text>
                <text x="${x + barW/2}" y="${y - 6}" text-anchor="middle" fill="${p.color}" font-size="9" font-family="JetBrains Mono" font-weight="600">${p.Lambda > 9999 ? (p.Lambda/1000).toFixed(0) + 'k' : p.Lambda}</text>
                ${p.locked ? `<text x="${x + barW/2}" y="${y + 14}" text-anchor="middle" fill="white" font-size="8" font-family="Space Grotesk">🔒</text>` : ''}
              </g>
            `;
          }).join('')}
          <!-- Axis labels -->
          <text x="10" y="20" fill="var(--text-muted)" font-size="10" font-family="Space Grotesk">log₂(Λ)</text>
        </svg>
      </div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">Generation Detail Table</div>
      <table class="data-table">
        <thead><tr>
          <th>Particle</th><th>Λ</th><th>Derivation Path</th><th>koppa(Λ,3)</th><th>Phase-Locked</th><th>rank(Λ)</th>
        </tr></thead>
        <tbody>
          ${particles.map(p => `<tr>
            <td><span style="color:${p.color}; font-weight:600">●</span> ${p.name} <span class="mono" style="color:var(--text-muted)">(${p.symbol})</span></td>
            <td class="val">${p.Lambda.toLocaleString()}</td>
            <td class="formula">${p.path}</td>
            <td class="val">${p.kopN}</td>
            <td>${p.kopN === 0 ? '<span class="badge pass">Phase-locked ✓</span>' : '<span style="color:var(--text-muted)">—</span>'}</td>
            <td class="val">${rank(p.Lambda)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">RS Ontological Statement — Phase-Lock Principle</div>
      <div style="font-size:13px; color:var(--text-secondary); line-height:1.6">
        A mass integer Λ is <strong>phase-locked</strong> when <span class="operator">koppa</span>(Λ, N) = 0,
        meaning it divides evenly into the triadic vacuum structure. Phase-locked particles precipitate
        directly from the vacuum without the three-step absorption path.
        All three quark generation mass integers are phase-locked:
        <span class="erp">207 koppa 3 = 0</span>,
        <span class="erp">303 koppa 3 = 0</span>,
        <span class="erp">192 koppa 3 = 0</span>.
        This is the structural origin of quark confinement — quarks are phase-locked to the triadic substrate.
      </div>
    </div>
  `;
}
