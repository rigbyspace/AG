import { sommerfeldDescent } from '../rs-engine.js';

export function renderSommerfeldDescent(container, engine) {
  const steps = sommerfeldDescent();
  const c = engine.constants;

  // RS identifications for each quotient
  const quotientIds = [
    'α⁻¹_int = S_int + Δ',
    'N³ = 27',
    '1 (vacuum unit)',
    'N = 3',
    'δ_slip = G_mg = 2',
    'N × Σ_imb = 3 × 7 = 21',
    '1 (vacuum unit)',
    '1 (vacuum unit)',
    'τ₁₀ = T_vac − 1 = 10'
  ];

  const allMatch = steps.every(s => s.match);

  container.innerHTML = `
    <div class="panel-header">
      <h2>Sommerfeld CF Descent</h2>
      <div class="panel-desc">Euclidean descent of the RS Sommerfeld Prime Pair, driven by <span class="operator">koppa</span>. Every quotient and remainder is an RS structural product.</div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">RS Ontological Statement</div>
      <div style="margin-bottom:16px">
        <strong>RS Sommerfeld Prime Pair:</strong>
        <span class="erp" style="font-size:16px">(p<sub>α</sub>, q<sub>α</sub>) = (${c.sommerfeldPair.value[0].toLocaleString()}, ${c.sommerfeldPair.value[1].toLocaleString()})</span>
      </div>
      <div style="margin-bottom:16px">
        <strong>CF Descent Sequence D<sub>α</sub>:</strong>
        <span class="mono" style="color:var(--rs-amber-light); font-size:14px">[${c.D_alpha.value.join('; ')}]</span>
      </div>
      <div style="font-size:13px; color:var(--text-secondary); margin-bottom:16px">
        Both components are prime: <span class="operator">koppa</span>-verified. Both carry Σ_imb = 7 against T_vac.
        The descent is pure <span class="operator">koppa</span> — iterative subtraction at each step.
      </div>

      <div class="badge ${allMatch ? 'pass' : 'fail'}" style="margin-bottom:16px">
        ${allMatch ? '✓ All descent steps match D_α' : '⚠ Descent discrepancy detected'}
      </div>

      <div style="border:1px solid var(--border); border-radius:8px; overflow:hidden">
        <div style="display:grid; grid-template-columns:40px 1fr 100px 80px 1fr 60px; gap:0; font-size:11px; padding:8px 12px; background:var(--surface); color:var(--text-muted); text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid var(--border)">
          <div>Step</div><div>Dividend</div><div>Quotient</div><div></div><div>Remainder</div><div>✓</div>
        </div>
        ${steps.map((s, i) => `
          <div style="display:grid; grid-template-columns:40px 1fr 100px 80px 1fr 60px; gap:0; align-items:center; padding:10px 12px; border-bottom:1px solid rgba(75,85,99,0.15); ${!s.match ? 'background:rgba(160,30,30,0.1)' : ''}">
            <div class="mono" style="color:var(--text-muted); font-size:12px">${i}</div>
            <div class="mono" style="font-size:12px; color:var(--text-secondary)">${s.dividend.toLocaleString()}</div>
            <div>
              <div class="mono" style="font-size:16px; font-weight:600; color:var(--rs-amber-light)">${s.quotient}</div>
              <div style="font-size:10px; color:var(--text-muted); margin-top:2px">${quotientIds[i] || ''}</div>
            </div>
            <div style="text-align:center; color:var(--text-muted)">→</div>
            <div class="mono" style="font-size:12px; color:var(--text-accent)">${s.remainder.toLocaleString()}</div>
            <div><span class="badge ${s.match ? 'pass' : 'fail'}" style="font-size:10px">${s.match ? '✓' : '✗'}</span></div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="rs-box verification">
      <div class="box-label">External Verification (Continuous Lens)</div>
      <div style="font-size:13px; color:var(--text-secondary); line-height:1.6">
        p<sub>α</sub> / q<sub>α</sub> = ${c.sommerfeldPair.value[0]} / ${c.sommerfeldPair.value[1]} ≈ <span class="constant-val">${(c.sommerfeldPair.value[0] / c.sommerfeldPair.value[1]).toFixed(11)}</span><br>
        CODATA α = <span class="mono" style="color:var(--text-secondary)">0.00729735257</span><br>
        Deviation: <span class="constant-val">${Math.abs(c.sommerfeldPair.value[0] / c.sommerfeldPair.value[1] - 0.0072973525693).toExponential(2)}</span>
      </div>
    </div>
  `;
}
