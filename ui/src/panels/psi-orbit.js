import { runPsiOrbit, crossDet, temporalCharge } from '../rs-engine.js';

export function renderPsiOrbit(container, engine) {
  const orbit = runPsiOrbit([1, 2], [2, 1], 4);

  const regimeColor = (g) => g > 0 ? '#2a5cbf' : g === 0 ? '#e69000' : '#5A5A5A';
  const regimeLabel = (g) => g > 0 ? 'Subluminal' : g === 0 ? 'Luminal' : 'Superluminal';

  container.innerHTML = `
    <div class="panel-header">
      <h2>ψ-Orbit Visualizer</h2>
      <div class="panel-desc">The standout operator <span class="operator">ψ</span>: coupled transformative reciprocal. Period 4 (ψ⁴ = Id). ψ² = Charge Conjugation.</div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">RS Ontological Statement</div>
      <div style="margin-bottom:12px">
        <strong>ψ-Orbit from Mass Gap Seed</strong>:
        <span class="erp">(1/2, 2/1)</span>
      </div>
      <div style="font-size:13px; color:var(--text-secondary); margin-bottom:16px">
        <span class="operator">ψ</span>((a/b), (c/d)) = ((d/a), (b/c)) — denominators cross to become numerators of the other state.
        The operation is <em>coupled</em>: it cannot act on a single ERP in isolation.
      </div>

      <div style="display:grid; gap:12px">
        ${orbit.map((step, i) => {
          const [s1, s2] = step.state;
          const g1 = i === 0 ? temporalCharge(s1[0], s1[1]) : step.gamma1;
          const g2 = i === 0 ? temporalCharge(s2[0], s2[1]) : step.gamma2;
          const dc = i === 0 ? crossDet(s1, s2) : step.crossDet;
          const isChargeConj = i === 2;
          const isIdentity = i === 4;
          return `
            <div style="display:grid; grid-template-columns:60px 1fr 1fr 120px; gap:12px; align-items:center;
                        padding:14px; background:var(--surface); border-radius:8px;
                        border:1px solid ${isChargeConj ? 'var(--rs-amber)' : isIdentity ? 'var(--rs-green)' : 'var(--border)'};
                        ${isChargeConj ? 'box-shadow: var(--shadow-glow-amber)' : isIdentity ? 'box-shadow: var(--shadow-glow-green)' : ''}">
              <div style="text-align:center">
                <div class="mono" style="font-size:12px; color:var(--text-muted)">ψ<sup>${i}</sup></div>
                ${isChargeConj ? '<div style="font-size:9px; color:var(--rs-amber-light); margin-top:2px">ψ² = C</div>' : ''}
                ${isIdentity ? '<div style="font-size:9px; color:var(--rs-green-light); margin-top:2px">ψ⁴ = Id</div>' : ''}
              </div>
              <div style="text-align:center">
                <div style="font-size:10px; color:var(--text-muted); margin-bottom:4px">State 1</div>
                <div class="erp" style="font-size:16px">(${s1[0]}, ${s1[1]})</div>
                <div style="font-size:11px; color:${regimeColor(g1)}; margin-top:4px">Γ = ${g1} · ${regimeLabel(g1)}</div>
              </div>
              <div style="text-align:center">
                <div style="font-size:10px; color:var(--text-muted); margin-bottom:4px">State 2</div>
                <div class="erp" style="font-size:16px">(${s2[0]}, ${s2[1]})</div>
                <div style="font-size:11px; color:${regimeColor(g2)}; margin-top:4px">Γ = ${g2} · ${regimeLabel(g2)}</div>
              </div>
              <div style="text-align:center">
                <div style="font-size:10px; color:var(--text-muted); margin-bottom:4px">Δ_cross</div>
                <div class="mono" style="font-size:16px; font-weight:600; color:${dc >= 0 ? 'var(--rs-blue-light)' : 'var(--rs-red)'}">${dc >= 0 ? '+' : ''}${dc}</div>
                <div style="font-size:11px; color:var(--text-muted); margin-top:4px">${dc > 0 ? 'Matter' : dc < 0 ? 'Antimatter' : 'Collapsed'}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">RS Ontological Statement</div>
      <strong>Charge Conjugation via ψ²</strong><br>
      <div style="margin-top:8px; font-size:13px; color:var(--text-secondary); line-height:1.6">
        ψ²((a/b), (c/d)) = ((c/d), (a/b)) — full pair exchange. The cross-determinant flips sign:
        Δ_cross(ψ²(A,B)) = −Δ_cross(A,B). This maps matter (Δ_cross = +1) to antimatter (Δ_cross = −1).
        ψ² is the ontic origin of Charge Conjugation (C) within the RS operator algebra — a theorem, not a definition.
      </div>
    </div>
  `;
}
