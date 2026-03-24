import { mediant, crossDet, width, eta, lambda, obsEquiv } from '../rs-engine.js';

export function renderMediantTree(container, engine) {
  // Build first few levels of the mediant tree
  function buildTree(maxDepth = 5) {
    const nodes = [];
    const edges = [];

    function recurse(left, right, depth, x, y, xSpan, parentId) {
      if (depth > maxDepth) return;
      const mid = mediant(left, right);
      const w = crossDet(left, mid);
      const id = `${mid[0]}_${mid[1]}`;
      nodes.push({ id, erp: mid, x, y, depth, width: w, saturated: w === 1 });
      if (parentId) edges.push({ from: parentId, to: id });

      recurse(left, mid, depth + 1, x - xSpan / 2, y + 60, xSpan / 2, id);
      recurse(mid, right, depth + 1, x + xSpan / 2, y + 60, xSpan / 2, id);
    }

    const root = mediant([0, 1], [1, 0]);
    nodes.push({ id: '1_1', erp: root, x: 400, y: 40, depth: 0, width: 1, saturated: true });
    recurse([0, 1], root, 1, 200, 100, 160, '1_1');
    recurse(root, [1, 0], 1, 600, 100, 160, '1_1');
    return { nodes, edges };
  }

  const tree = buildTree(4);
  const svgW = 800, svgH = 360;

  container.innerHTML = `
    <div class="panel-header">
      <h2>Mediant Tree Explorer</h2>
      <div class="panel-desc">The <span class="operator">mediant</span> (⊕) operator builds the Stern-Brocot tree. Width W = Δ_cross. Saturation at W = 1.</div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">RS Ontological Statement</div>
      <div style="margin-bottom:12px; font-size:13px; color:var(--text-secondary)">
        Root bracket: <span class="erp">(0,1)</span> ≺ <span class="erp">(1,0)</span>. The <span class="operator">mediant</span> operator
        (a,b) ⊕ (c,d) = (a+c, b+d) preserves cross-determinant width. Every ERP in ℤ×(ℤ\\{0}) appears
        exactly once in the tree. Geodesic paths correspond to continued fraction partial quotients.
      </div>

      <div style="overflow-x:auto">
        <svg viewBox="0 0 ${svgW} ${svgH}" style="width:100%; max-height:360px;">
          <!-- Edges -->
          ${tree.edges.map(e => {
            const from = tree.nodes.find(n => n.id === e.from);
            const to = tree.nodes.find(n => n.id === e.to);
            if (!from || !to) return '';
            return `<line x1="${from.x}" y1="${from.y + 12}" x2="${to.x}" y2="${to.y - 12}" class="tree-edge" />`;
          }).join('')}

          <!-- Nodes -->
          ${tree.nodes.map(n => `
            <g transform="translate(${n.x}, ${n.y})">
              <rect x="-24" y="-12" width="48" height="24" rx="6"
                    fill="${n.saturated ? 'rgba(20,110,60,0.3)' : 'var(--surface)'}"
                    stroke="${n.saturated ? 'var(--rs-green)' : 'var(--border)'}" stroke-width="1"/>
              <text x="0" y="1" text-anchor="middle" dominant-baseline="middle"
                    font-family="JetBrains Mono" font-size="10"
                    fill="${n.saturated ? 'var(--rs-green-light)' : 'var(--text-primary)'}">
                ${n.erp[0]}/${n.erp[1]}
              </text>
            </g>
          `).join('')}

          <!-- Root brackets -->
          <text x="40" y="44" font-family="JetBrains Mono" font-size="11" fill="var(--text-muted)">0/1</text>
          <text x="${svgW - 50}" y="44" font-family="JetBrains Mono" font-size="11" fill="var(--text-muted)">1/0</text>
        </svg>
      </div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">RS Ontological Statement</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px">
        <div style="background:var(--surface); border-radius:8px; padding:14px">
          <div style="font-size:12px; color:var(--text-muted); margin-bottom:8px">λ-ray as Tree Path</div>
          <div style="font-size:13px; color:var(--text-secondary); line-height:1.6">
            <span class="operator">λ</span>(n,d) = (n+d, d): always moves <em>right</em> in the tree (numerator grows, denominator fixed).
            The λ-ray from (1,1) traces the Vacuum Line: (2,1), (3,1), (4,1), …
          </div>
        </div>
        <div style="background:var(--surface); border-radius:8px; padding:14px">
          <div style="font-size:12px; color:var(--text-muted); margin-bottom:8px">η-ray as Tree Path</div>
          <div style="font-size:13px; color:var(--text-secondary); line-height:1.6">
            <span class="operator">η</span>(n,d) = (n+d, n): alternates left-right descent through the tree.
            The η-ray from (1,1) descends along the φ-convergent path: (2,1), (3,2), (5,3), (8,5), …
          </div>
        </div>
      </div>
    </div>

    <div class="rs-box ontological">
      <div class="box-label">Structural Properties</div>
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px">
        <div style="background:var(--surface); border-radius:8px; padding:12px; text-align:center">
          <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Width Preservation</div>
          <div class="mono" style="font-size:14px; color:var(--text-accent); margin-top:6px">W(L,M) + W(M,R) = W(L,R)</div>
        </div>
        <div style="background:var(--surface); border-radius:8px; padding:12px; text-align:center">
          <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Saturation</div>
          <div class="mono" style="font-size:14px; color:var(--rs-green-light); margin-top:6px">W = 1: minimum bracket</div>
        </div>
        <div style="background:var(--surface); border-radius:8px; padding:12px; text-align:center">
          <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Geodesic Length</div>
          <div class="mono" style="font-size:14px; color:var(--text-accent); margin-top:6px">= CF partial quotient sum</div>
        </div>
      </div>
    </div>
  `;
}
