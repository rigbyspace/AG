---
description: RS Framework Consistency Validator - validates extensions against the RigbySpace ontological substrate
---

# RS Framework Consistency Agent

This agent is responsible for validating that any extension to the RigbySpace development documents is consistent with the existing framework. All extensions must slot into the master reference and resolve anywhere in the logic chain.

## Core Principles

1. **Integer-only substrate**: No extension may introduce division, floating-point, or GCD reduction on the ontological path.
2. **Operator closure**: Every derivation must be constructible from the primitive operators: ψ, koppa, Ω, η, λ, mediant (⊕), barycentric (⊞), succ, crossDet, PG.
3. **No orphan constants**: Every new integer introduced must be derivable from T_vac=11 and N=3 via operator chains.
4. **Multi-path convergence**: Where possible, new results should be reachable via multiple independent RS paths.
5. **Koppa signature consistency**: New constants must have koppa signatures against T_vac, N, T_bary, D_gauge that are structurally meaningful.
6. **Verification path separation**: Continuous approximations and experimental comparisons belong exclusively in verification boxes, never in ontological statements.

## Validation Steps

For any proposed RS extension:

### Step 1: Primitive Check
- [ ] Does the derivation use only RS-admissible operations? (addition, subtraction, multiplication, comparison, koppa, succ, PG)
- [ ] Is division used anywhere on the ontological path? If so, **REJECT** — replace with ERP (n, d) representation.
- [ ] Are any real numbers used on the ontological path? If so, **REJECT** — move to verification box.

### Step 2: Operator Chain Verification
- [ ] Trace every new constant back to T_vac=11 and N=3.
- [ ] Identify which operators produce each intermediate value.
- [ ] Verify the operator chain using the RS engine: `deriveConstants()` must reproduce the value.

### Step 3: Koppa Signature Profile
For each new integer X, compute and record:
```
X koppa N        = ?
X koppa T_vac    = ?
X koppa T_bary   = ?
X koppa D_gauge  = ?
```
Check whether the signatures align with the structural role. For example:
- Phase-slip signature: koppa = δ_slip = 2
- Flux signature: koppa = Δ = 5
- Unit coherence: koppa = 1
- Phase-locked: koppa = 0

### Step 4: Structural Rank Check
Compute ρ(X) and verify it aligns with the structural depth expected for the role.

### Step 5: Cross-document Consistency
- [ ] Does the extension contradict any existing theorem in the master reference?
- [ ] Does it require modifying any existing derivation chain? If so, verify both old and new chains still resolve.
- [ ] Are there unexpected multi-path convergences that strengthen the extension?

### Step 6: Resolution Class Check (for mass states)
If the extension introduces a new mass state:
- [ ] Does the mass integer arise from the three-step path S_int + C + T_vac?
- [ ] Or is the capacity C phase-locked (koppa(C, N) = 0)?
- [ ] Does Barycentric Truncation allow stabilization?

### Step 7: Lucas Coupling Check (for force/coupling extensions)
If the extension involves forces or couplings:
- [ ] Is the coupling derivable from C_k = Δ / (L(k+4) · L(k+5))?
- [ ] What is the structural spatial separation (mediant geodesic length)?
- [ ] Is the depth prime (Frictionless Propagation Principle applies)?

## Running the Validator

// turbo-all

1. Open the RS UI at http://localhost:5173/
2. Navigate to the Constant Lattice panel
3. Verify all existing checks pass (23/23)
4. For new constants added to rs-engine.js, add verification checks in the `deriveConstants()` function
5. Run the dev server and check the verification count

```bash
cd ui && npm run dev
```

## Extending the RS Engine

When adding a new derivation to `rs-engine.js`:

1. Add the operator chain in `deriveConstants()` under a clearly labeled section
2. Add at least one multi-path verification `check()` call
3. Store the constant with its formula and description in the `constants` object
4. Add its koppa signatures as additional `check()` calls
5. If the derivation introduces a new phenomenon, add a panel in `src/panels/`
6. Update `main.js` to register the new panel

## Example: Validating a New Extension

Suppose we want to derive the Schwarzschild radius in RS terms:

```
r_S = 2GM/c²
```

**Ontological path**: Mass M is rank(koppa_ledger) for the state. The gravitational coupling is C_{n_G} = Δ/(L(93)·L(94)). The "radius" is a structural separation — a mediant geodesic length in the η-orbit. So:

```
r_S_RS = (structural separation at which coupling × mass² saturates the vacuum boundary)
```

This must be expressed entirely in integer terms. The continuous formula 2GM/c² belongs in the verification box only.

**Consistency check**: Does this Schwarzschild integer correlate with existing RS constants? What are its koppa signatures? Does it resolve to a known structural product?
