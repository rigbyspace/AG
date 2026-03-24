import { koppa, lambda, eta, psi, mediant, boxplus, crossDet, temporalCharge, rank, primeEventDepth, isPrime, primeGate } from '../rs-engine.js';

export function renderOperatorPlayground(container, engine) {
  container.innerHTML = `
    <div class="panel-header">
      <h2>Operator Playground</h2>
      <div class="panel-desc">Apply RS operators interactively. Input any ERP, chain operations, see live structural properties.</div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">ERP Input &amp; Operators</div>
      <div class="playground-grid">
        <div>
          <div style="font-size:12px; color:var(--text-muted); margin-bottom:8px">Input ERP (n, d)</div>
          <div class="playground-input">
            <input type="number" id="erp-n" value="11" />
            <span class="mono" style="color:var(--text-muted)">,</span>
            <input type="number" id="erp-d" value="7" />
          </div>
          <div style="margin-top:12px; display:flex; flex-wrap:wrap; gap:6px">
            <button class="op-btn" data-op="lambda">λ</button>
            <button class="op-btn" data-op="eta">η</button>
            <button class="op-btn" data-op="koppa">koppa</button>
            <button class="op-btn" data-op="rank">ρ(n)</button>
            <button class="op-btn" data-op="temporal">Γ</button>
            <button class="op-btn" data-op="prime">isPrime?</button>
            <button class="op-btn" data-op="pg">PG(n)</button>
            <button class="op-btn" data-op="reset" style="color:var(--text-muted)">Reset</button>
          </div>
          <div style="margin-top:12px; font-size:11px; color:var(--text-muted)">
            For <span class="operator">ψ</span> (coupled), enter a second ERP:
          </div>
          <div class="playground-input" style="margin-top:6px">
            <input type="number" id="erp-n2" value="7" />
            <span class="mono" style="color:var(--text-muted)">,</span>
            <input type="number" id="erp-d2" value="11" />
            <button class="op-btn" data-op="psi">ψ</button>
            <button class="op-btn" data-op="boxplus">⊞</button>
            <button class="op-btn" data-op="mediant">⊕</button>
            <button class="op-btn" data-op="crossdet">Δ_cross</button>
          </div>
        </div>
        <div>
          <div style="font-size:12px; color:var(--text-muted); margin-bottom:8px">Output</div>
          <div id="playground-output" style="background:var(--surface); border-radius:8px; padding:16px; min-height:200px; font-family:JetBrains Mono; font-size:13px; line-height:1.8; color:var(--text-primary)">
            Click an operator to begin…
          </div>
        </div>
      </div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">Koppa Step-by-Step Calculator</div>
      <div class="playground-input" style="margin-bottom:12px">
        <span style="font-size:12px; color:var(--text-muted)">koppa(</span>
        <input type="number" id="koppa-x" value="137" style="width:80px" />
        <span class="mono" style="color:var(--text-muted)">,</span>
        <input type="number" id="koppa-L" value="11" style="width:60px" />
        <span style="font-size:12px; color:var(--text-muted)">)</span>
        <button class="op-btn" id="koppa-run">Run</button>
      </div>
      <div id="koppa-output" style="background:var(--surface); border-radius:8px; padding:16px; font-family:JetBrains Mono; font-size:12px; line-height:1.6; color:var(--text-secondary)">
        Enter values and click Run to see iterative subtraction steps.
      </div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">Pre-loaded Examples</div>
      <div style="display:flex; flex-wrap:wrap; gap:8px">
        <button class="op-btn" data-example="vacuum-eta" style="font-size:12px">η-orbit from (11,7)</button>
        <button class="op-btn" data-example="psi-cycle" style="font-size:12px">ψ-cycle from (1,2)/(2,1)</button>
        <button class="op-btn" data-example="lambda-ray" style="font-size:12px">λ-ray from (1,1)</button>
      </div>
      <div id="example-output" style="background:var(--surface); border-radius:8px; padding:16px; margin-top:12px; font-family:JetBrains Mono; font-size:12px; line-height:1.6; color:var(--text-secondary); max-height:300px; overflow-y:auto">
        Select an example above.
      </div>
    </div>
  `;

  // Wire up operators
  const output = document.getElementById('playground-output');
  const getErp1 = () => [parseInt(document.getElementById('erp-n').value), parseInt(document.getElementById('erp-d').value)];
  const getErp2 = () => [parseInt(document.getElementById('erp-n2').value), parseInt(document.getElementById('erp-d2').value)];
  const setErp1 = (n, d) => { document.getElementById('erp-n').value = n; document.getElementById('erp-d').value = d; };

  document.querySelectorAll('[data-op]').forEach(btn => {
    btn.addEventListener('click', () => {
      const op = btn.dataset.op;
      const [n, d] = getErp1();
      const [n2, d2] = getErp2();
      let result = '';

      switch (op) {
        case 'lambda': {
          const [rn, rd] = lambda(n, d);
          result = `λ(${n}, ${d}) = <span class="erp">(${rn}, ${rd})</span>`;
          setErp1(rn, rd);
          break;
        }
        case 'eta': {
          const [rn, rd] = eta(n, d);
          result = `η(${n}, ${d}) = <span class="erp">(${rn}, ${rd})</span>`;
          setErp1(rn, rd);
          break;
        }
        case 'koppa': {
          result = `koppa(${n}, ${d}) = <span class="constant-val">${koppa(n, d)}</span>`;
          break;
        }
        case 'rank': {
          result = `ρ(${n}) = <span class="constant-val">${rank(n)}</span>`;
          break;
        }
        case 'temporal': {
          const g = temporalCharge(n, d);
          const regime = g > 0 ? 'Subluminal (massive)' : g === 0 ? 'Luminal' : 'Superluminal (excluded)';
          result = `Γ(${n}, ${d}) = d²−n² = ${d}²−${n}² = <span class="constant-val">${g}</span> → ${regime}`;
          break;
        }
        case 'prime': {
          result = `isPrime(${n}) = <span class="constant-val">${isPrime(n) ? 'TRUE ✓' : 'FALSE ✗'}</span>`;
          break;
        }
        case 'pg': {
          if (n > 0 && n < 200) {
            result = `PG(${n}) = <span class="constant-val">${primeGate(n)}</span>`;
          } else {
            result = `<span style="color:var(--rs-red)">PG(k): k must be 1–200</span>`;
          }
          break;
        }
        case 'psi': {
          const [[ra, rb], [rc, rd]] = psi([n, d], [n2, d2]);
          result = `ψ((${n},${d}), (${n2},${d2})) = <span class="erp">(${ra},${rb})</span>, <span class="erp">(${rc},${rd})</span>`;
          setErp1(ra, rb);
          document.getElementById('erp-n2').value = rc;
          document.getElementById('erp-d2').value = rd;
          break;
        }
        case 'boxplus': {
          const [rn, rd] = boxplus([n, d], [n2, d2]);
          result = `(${n},${d}) ⊞ (${n2},${d2}) = <span class="erp">(${rn}, ${rd})</span>`;
          setErp1(rn, rd);
          break;
        }
        case 'mediant': {
          const [rn, rd] = mediant([n, d], [n2, d2]);
          result = `(${n},${d}) ⊕ (${n2},${d2}) = <span class="erp">(${rn}, ${rd})</span>`;
          setErp1(rn, rd);
          break;
        }
        case 'crossdet': {
          const dc = crossDet([n, d], [n2, d2]);
          result = `Δ_cross((${n},${d}), (${n2},${d2})) = ${n2}·${d} − ${n}·${d2} = <span class="constant-val">${dc}</span>`;
          break;
        }
        case 'reset': {
          setErp1(11, 7);
          document.getElementById('erp-n2').value = 7;
          document.getElementById('erp-d2').value = 11;
          result = 'Reset to vacuum seed (11, 7)';
          break;
        }
      }
      output.innerHTML = result;
    });
  });

  // Koppa calculator
  document.getElementById('koppa-run').addEventListener('click', () => {
    const x = parseInt(document.getElementById('koppa-x').value);
    const L = parseInt(document.getElementById('koppa-L').value);
    if (L <= 0) { document.getElementById('koppa-output').textContent = 'L must be positive'; return; }
    let r = x;
    const steps = [`Start: r = ${r}`];
    let count = 0;
    while (r >= L && count < 500) {
      steps.push(`r = ${r} − ${L} = ${r - L}`);
      r -= L;
      count++;
    }
    steps.push(`<span class="constant-val">koppa(${x}, ${L}) = ${r}</span>`);
    document.getElementById('koppa-output').innerHTML = steps.join('<br>');
  });

  // Examples
  document.querySelectorAll('[data-example]').forEach(btn => {
    btn.addEventListener('click', () => {
      const out = document.getElementById('example-output');
      switch (btn.dataset.example) {
        case 'vacuum-eta': {
          let state = [11, 7];
          const lines = [`  k=0: (${state[0]}, ${state[1]})`];
          for (let k = 1; k <= 15; k++) {
            state = eta(state[0], state[1]);
            lines.push(`η k=${k}: <span class="erp">(${state[0]}, ${state[1]})</span>  Δ_cross with prev = ±Δ`);
          }
          out.innerHTML = '<strong>η-orbit from vacuum seed (11, 7):</strong><br>' + lines.join('<br>');
          break;
        }
        case 'psi-cycle': {
          let s = [[1, 2], [2, 1]];
          const lines = [`ψ⁰: (${s[0]}) , (${s[1]})`];
          for (let k = 1; k <= 4; k++) {
            s = psi(s[0], s[1]);
            const dc = crossDet(s[0], s[1]);
            lines.push(`ψ${k < 4 ? '⁰¹²³'[k] : '⁴'}: <span class="erp">(${s[0]})</span> , <span class="erp">(${s[1]})</span>  Δ_cross = ${dc}${k === 2 ? ' ← ψ² charge conjugation' : ''}${k === 4 ? ' ← ψ⁴ = Id ✓' : ''}`);
          }
          out.innerHTML = '<strong>ψ-cycle from (1/2, 2/1):</strong><br>' + lines.join('<br>');
          break;
        }
        case 'lambda-ray': {
          let state = [1, 1];
          const lines = [`  k=0: (${state[0]}, ${state[1]})`];
          for (let k = 1; k <= 11; k++) {
            state = lambda(state[0], state[1]);
            lines.push(`λ k=${k}: <span class="erp">(${state[0]}, ${state[1]})</span>  → vacuum line (${state[0]}/1)`);
          }
          out.innerHTML = '<strong>λ-ray from (1, 1):</strong><br>' + lines.join('<br>');
          break;
        }
      }
    });
  });
}
