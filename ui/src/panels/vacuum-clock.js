import { runVacuumCycle, koppa, phaseOf } from '../rs-engine.js';

export function renderVacuumClock(container, engine) {
  const cycle = runVacuumCycle();
  const c = engine.constants;

  const phaseColors = { E: '#2a5cbf', M: '#1a9e55', R: '#e69000' };
  const phaseLabels = { E: 'Emission', M: 'Modulation', R: 'Return' };

  // Build clock SVG
  const cx = 160, cy = 160, r = 120;
  const tickR = 18;
  const ticks = cycle.ticks.map((t, i) => {
    const angle = ((i / 11) * 2 * Math.PI) - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return { ...t, x, y, angle };
  });

  container.innerHTML = `
    <div class="panel-header">
      <h2>Vacuum Cycle Clock</h2>
      <div class="panel-desc">The <span class="operator">succ</span> operator and <span class="operator">Ω</span> boundary event. 11 ticks, 4-4-3 phase partition, +1 net surplus per cycle.</div>
    </div>

    <div class="clock-container">
      <svg class="clock-svg" viewBox="0 0 320 320">
        <!-- Phase rings -->
        <circle cx="${cx}" cy="${cy}" r="${r + 30}" fill="none" stroke="rgba(75,85,99,0.15)" stroke-width="1"/>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(75,85,99,0.2)" stroke-width="1"/>

        <!-- Ticks -->
        ${ticks.map(t => `
          <g class="clock-tick phase-${t.phase}" id="tick-${t.tau}">
            <circle cx="${t.x}" cy="${t.y}" r="${tickR}" fill="${phaseColors[t.phase]}" opacity="0.85"/>
            <text x="${t.x}" y="${t.y + 1}" text-anchor="middle" dominant-baseline="middle"
                  fill="white" font-size="13" font-family="JetBrains Mono" font-weight="600">
              ${t.tau}
            </text>
            ${t.tau === 10 ? `<circle cx="${t.x}" cy="${t.y}" r="${tickR + 4}" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,3"/>` : ''}
          </g>
        `).join('')}

        <!-- Center info -->
        <text x="${cx}" y="${cy - 8}" text-anchor="middle" fill="#9ca3af" font-size="11" font-family="Space Grotesk">T_vac = 11</text>
        <text x="${cx}" y="${cy + 12}" text-anchor="middle" fill="#60a5fa" font-size="14" font-family="JetBrains Mono" font-weight="600">4-4-3</text>

        <!-- Ω marker -->
        <text x="${cx}" y="${cy + 45}" text-anchor="middle" fill="#e69000" font-size="20" font-family="Space Grotesk" font-weight="700">Ω</text>
      </svg>

      <div class="clock-info">
        <div class="rs-box ontological">
          <div class="box-label">RS Ontological Statement</div>
          <div style="margin-bottom:12px">
            <strong>Phase Partition (4-4-3)</strong> — derived from <span class="operator">succ</span> orbit:
          </div>
          <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:8px; margin-bottom:16px">
            ${['E', 'M', 'R'].map(p => {
              const count = p === 'E' ? c.N_E.value : p === 'M' ? c.N_M.value : c.N_R.value;
              const ts = cycle.ticks.filter(t => t.phase === p).map(t => t.tau);
              return `<div style="background:${phaseColors[p]}22; border:1px solid ${phaseColors[p]}44; border-radius:8px; padding:10px; text-align:center">
                <div style="font-size:10px; color:${phaseColors[p]}; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px">${phaseLabels[p]}</div>
                <div class="mono" style="font-size:20px; font-weight:700; color:${phaseColors[p]}">${count}</div>
                <div class="mono" style="font-size:11px; color:#9ca3af; margin-top:4px">{${ts.join(',')}}</div>
              </div>`;
            }).join('')}
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px">
            <div style="background:var(--surface); border-radius:8px; padding:12px">
              <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Flux Imbalance Δ</div>
              <div class="mono" style="font-size:18px; color:var(--text-accent); margin-top:4px">(${c.N_E.value}+${c.N_M.value})−${c.N_R.value} = ${c.Delta.value}</div>
            </div>
            <div style="background:var(--surface); border-radius:8px; padding:12px">
              <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Phase Slip δ_slip</div>
              <div class="mono" style="font-size:18px; color:var(--text-accent); margin-top:4px">koppa(11, 3) = ${c.G_mg.value}</div>
            </div>
            <div style="background:var(--surface); border-radius:8px; padding:12px">
              <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Net Surplus / Cycle</div>
              <div class="mono" style="font-size:18px; color:var(--rs-green-light); margin-top:4px">+${cycle.netSurplus} (Arrow of Time)</div>
            </div>
            <div style="background:var(--surface); border-radius:8px; padding:12px">
              <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Arrow Lock</div>
              <div class="mono" style="font-size:18px; color:#f59e0b; margin-top:4px">τ₁₀ = ${c.tau10.value}</div>
            </div>
          </div>
        </div>

        <div class="rs-box ontological">
          <div class="box-label">RS Ontological Statement</div>
          <strong>Ω Boundary Event</strong><br>
          <div style="margin-top:8px; font-size:13px; color:var(--text-secondary); line-height:1.6">
            At <span class="operator">succ</span>(11) = 1, the cycle boundary <span class="operator">Ω</span> fires:
            accumulated flux imbalance is reconciled, <span class="operator">koppa</span>_ledger is updated,
            temporal charge deposited. The mass gap <span class="erp">G_mg = ${c.G_mg.value}</span> is the
            per-cycle deposit — the constructive remainder <span class="operator">koppa</span>(T_vac, N) = koppa(11, 3) = 2.
          </div>
        </div>
      </div>
    </div>
  `;
}
