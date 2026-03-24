import './styles/index.css';
import { getEngine, runVacuumCycle, runPsiOrbit, lucasCoupling, sommerfeldDescent,
  koppa, eta, lambda, psi, mediant, boxplus, crossDet, temporalCharge, rank,
  primeEventDepth, width, obsEquiv, isPrime, primeGate, locateInTree, geodesic,
  lucasNumber, fibonacciNumber, phaseOf } from './rs-engine.js';
import { renderVacuumClock } from './panels/vacuum-clock.js';
import { renderPsiOrbit } from './panels/psi-orbit.js';
import { renderConstantLattice } from './panels/constant-lattice.js';
import { renderParticleTable } from './panels/particle-table.js';
import { renderOperatorPlayground } from './panels/operator-playground.js';
import { renderSommerfeldDescent } from './panels/sommerfeld-descent.js';
import { renderMediantTree } from './panels/mediant-tree.js';
import { renderGravityCoupling } from './panels/gravity-coupling.js';
import { renderDerivations } from './panels/derivations.js';
import { renderGlossary } from './panels/glossary.js';
import { renderParticleGen } from './panels/particle-gen.js';
import { renderCalculator } from './panels/rs-calculator.js';

const panels = [
  { id: 'vacuum-clock', label: 'Vacuum Clock', icon: '⏱', render: renderVacuumClock },
  { id: 'psi-orbit', label: 'ψ-Orbit', icon: 'ψ', render: renderPsiOrbit },
  { id: 'constant-lattice', label: 'Constant Lattice', icon: '⊞', render: renderConstantLattice },
  { id: 'particle-table', label: 'Particle Table', icon: '⚛', render: renderParticleTable },
  { id: 'particle-gen', label: 'Particle Generator', icon: 'G', render: renderParticleGen },
  { id: 'operator-playground', label: 'Operator Playground', icon: 'λ', render: renderOperatorPlayground },
  { id: 'sommerfeld-descent', label: 'Sommerfeld Descent', icon: '∇', render: renderSommerfeldDescent },
  { id: 'mediant-tree', label: 'Mediant Tree', icon: '⊕', render: renderMediantTree },
  { id: 'gravity-coupling', label: 'Gravity Coupling', icon: 'η', render: renderGravityCoupling },
  { id: 'derivations', label: 'Physics Derivations', icon: '∂', render: renderDerivations },
  { id: 'rs-calculator', label: 'RS Calculator', icon: '≡', render: renderCalculator },
  { id: 'glossary', label: 'Glossary', icon: '𝔾', render: renderGlossary },
];

let activePanel = 'vacuum-clock';

function init() {
  const engine = getEngine();

  // Render sidebar nav
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = panels.map(p => `
    <div class="nav-item ${p.id === activePanel ? 'active' : ''}" data-panel="${p.id}">
      <span class="nav-icon mono">${p.icon}</span>
      <span>${p.label}</span>
    </div>
  `).join('');

  nav.addEventListener('click', (e) => {
    const item = e.target.closest('.nav-item');
    if (!item) return;
    activePanel = item.dataset.panel;
    renderAll(engine);
  });

  // Verification status
  const allPass = engine.verifications.every(v => v.pass);
  const dot = document.getElementById('verify-dot');
  const text = document.getElementById('verify-text');
  const passCount = engine.verifications.filter(v => v.pass).length;
  const total = engine.verifications.length;
  dot.className = `verify-dot ${allPass ? '' : 'fail'}`;
  text.textContent = `${passCount}/${total} checks passed`;

  renderAll(engine);
}

function renderAll(engine) {
  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.panel === activePanel);
  });

  // Render active panel
  const content = document.getElementById('content');
  const panel = panels.find(p => p.id === activePanel);
  if (panel) {
    content.innerHTML = '';
    panel.render(content, engine);
  }
}

init();
