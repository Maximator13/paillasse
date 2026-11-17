---
titre: "Chemical equilibrium: predicting the direction of spontaneous change"
description: "Incomplete reactions, final extent ratio, reaction quotient and equilibrium constant: the criterion for telling which way a system will change."
niveau: terminale
theme: matiere
ordre: 7
duree: "30 min"
motsCles: ["chemical equilibrium", "extent ratio", "reaction quotient", "equilibrium constant", "direction of change", "electrochemical cell"]
tp: []
---

> **In brief.** Many reactions stop progressing before the limiting reagent is used up ($\tau < 1$): the final state is a **dynamic equilibrium**. To predict the direction in which a system changes spontaneously, we compare its **reaction quotient** $Q_r$ with the **equilibrium constant** $K$, which, for a given reaction, depends only on temperature. An electrochemical cell is an application of this: it delivers a current as long as $Q_r < K$.

## 1. Complete or incomplete reaction

For a reaction with a given equation, the **maximum extent** $x_{\max}$ is the one that would be reached if the limiting reagent were entirely consumed. The extent of reaction actually reached in the final state is the **final extent** $x_f$.

- If $x_f = x_{\max}$, the reaction is **complete**: the limiting reagent has disappeared.
- If $x_f < x_{\max}$, the reaction is **incomplete**: in the final state, **all the reactants and all the products coexist**.

> **Definition.** The final extent ratio of a reaction is the quotient
>
> $$
> \tau = \frac{x_f}{x_{\max}}
> $$
>
> It is a dimensionless number between 0 and 1. The reaction is complete if $\tau = 1$, incomplete if $\tau < 1$.

Example: an ethanoic acid solution at $1.0 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}$ has a pH of 3.4. If the reaction with water were complete, we would have $[\mathrm{H_3O^+}] = 1.0 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}$ and a pH of 2.0. The measurement shows that only 4% of the acid molecules have reacted.

## 2. Dynamic equilibrium

For an incomplete reaction, the equation is written with a double arrow:

$$
a\,\mathrm{A} + b\,\mathrm{B} \rightleftarrows c\,\mathrm{C} + d\,\mathrm{D}
$$

Two opposite reactions take place simultaneously: the reaction in the **forward direction** (from left to right) and the reaction in the **reverse direction** (from right to left).

> **Definition.** A system is in a state of equilibrium when the reactions in the forward direction and in the reverse direction occur **at the same rate**. On the macroscopic scale, the amounts of substance no longer change; on the microscopic scale, both reactions continue: the equilibrium is **dynamic**.

This can be checked experimentally: if we start from the products $\mathrm{C}$ and $\mathrm{D}$, the system changes in the reverse direction and ends up in the same equilibrium state as the one obtained from the reactants (for the same overall composition).

## 3. Reaction quotient and equilibrium constant

> **Definition.** For a reaction in aqueous solution with equation $a\,\mathrm{A} + b\,\mathrm{B} \rightleftarrows c\,\mathrm{C} + d\,\mathrm{D}$, the reaction quotient in any state of the system is
>
> $$
> Q_r = \frac{\left([\mathrm{C}]/c^\circ\right)^{c}\,\left([\mathrm{D}]/c^\circ\right)^{d}}{\left([\mathrm{A}]/c^\circ\right)^{a}\,\left([\mathrm{B}]/c^\circ\right)^{b}}
> $$
>
> where $c^\circ = 1\ \mathrm{mol \cdot L^{-1}}$ is the standard concentration. $Q_r$ is dimensionless.

In practice, we write $Q_r = \dfrac{[\mathrm{C}]^c\,[\mathrm{D}]^d}{[\mathrm{A}]^a\,[\mathrm{B}]^b}$ with the concentrations expressed in $\mathrm{mol \cdot L^{-1}}$. Writing rules:

| Species | Term in $Q_r$ |
|---|---|
| Solute (dissolved ion or molecule) | its concentration $[X]/c^\circ$ |
| Solvent (water) | 1 |
| Solid | 1 |

For example, for $\mathrm{Cu^{2+}(aq) + Zn(s) \rightleftarrows Cu(s) + Zn^{2+}(aq)}$:

$$
Q_r = \frac{[\mathrm{Zn^{2+}}]}{[\mathrm{Cu^{2+}}]}
$$

> **Law.** In the equilibrium state, the reaction quotient takes a particular value, the **equilibrium constant** $K(T)$:
>
> $$
> Q_{r,\text{eq}} = K(T)
> $$
>
> $K$ depends only on the reaction considered and on the **temperature**. It does not depend on the initial composition of the system.

Useful orders of magnitude:

| Value of $K$ | Reaction |
|---|---|
| $K > 10^{4}$ | almost complete (in general) |
| $10^{-4} < K < 10^{4}$ | generally incomplete |
| $K < 10^{-4}$ | very limited |

Be careful: the final extent ratio also depends on the **initial conditions** (concentrations, dilution). For the same value of $K$, a more dilute solution of a weak acid leads to a larger extent ratio.

## 4. Criterion for spontaneous change

We calculate the initial reaction quotient $Q_{r,i}$ from the initial composition, then compare it with $K$. The system always changes in such a way that $Q_r$ **tends towards** $K$.

> **Criterion for spontaneous change.**
> - If $Q_{r,i} < K$: $Q_r$ must increase, products are formed: change in the **forward direction**.
> - If $Q_{r,i} > K$: $Q_r$ must decrease, reactants are formed: change in the **reverse direction**.
> - If $Q_{r,i} = K$: the system is already at equilibrium, it does not change.

Consequence: an equilibrium can be **shifted**. Starting from an equilibrium state, adding a reactant makes $Q_r$ decrease, so that it becomes smaller than $K$: the system changes in the forward direction. Removing a product as it forms (by distillation, for example) has the same effect. This is how the yield of an esterification is improved.

The criterion says nothing about the **rate**: a predicted change may be so slow that it cannot be observed. Thermodynamics (direction) and kinetics (duration) are two separate questions.

## 5. The case of redox reactions

A redox reaction is a **transfer of electrons** from the reducing agent of one couple to the oxidising agent of another couple. This spontaneous transfer can take place in two ways.

1. **By direct contact.** A zinc strip dipped into a copper sulfate solution becomes coated with copper and the solution loses its colour. The constant is $K \approx 10^{37}$: the reaction is complete. The energy released is given out as heat.
2. **Through an external circuit: the electrochemical cell.** The two couples are separated into two half-cells connected by a salt bridge: since the reactants are no longer in contact, the electrons are forced to travel through the external circuit. The electrons leave the zinc strip (**anode**, where oxidation takes place, $-$ terminal), travel through the external circuit and arrive at the copper strip (**cathode**, where reduction takes place, $+$ terminal). In the salt bridge, it is the ions that carry the current.

The criterion for change applies to the cell as to any system: as long as $Q_r < K$, the reaction continues in the forward direction and the cell delivers a current. When $Q_r$ reaches $K$, the system is at equilibrium: the cell is **flat**, it no longer delivers a current.

The maximum quantity of electric charge it can supply (its **capacity**) is related to the amount of electrons exchanged:

$$
Q_{\max} = n(\mathrm{e^-})_{\max} \times \mathcal{F} \qquad \text{with } \mathcal{F} = 96\,500\ \mathrm{C \cdot mol^{-1}}
$$

## Worked example

We prepare $V = 100.0\ \mathrm{mL}$ of an ethanoic acid solution of nominal concentration $C = 1.0 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}$. The pH measured at equilibrium is $3.40$. The equation of the reaction is:

$$
\mathrm{CH_3COOH\,(aq) + H_2O\,(l) \rightleftarrows CH_3COO^-\,(aq) + H_3O^+\,(aq)}
$$

1. Calculate the final extent ratio $\tau$. Is the reaction complete?
2. Deduce the value of the equilibrium constant $K$ at this temperature.
3. In another beaker, ethanoic acid and sodium ethanoate are mixed so that, initially, $[\mathrm{CH_3COOH}] = [\mathrm{CH_3COO^-}] = 1.0 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}$ and $[\mathrm{H_3O^+}] = 1.0 \times 10^{-5}\ \mathrm{mol \cdot L^{-1}}$. In which direction does the system change?

<details>
<summary>Show the solution</summary>

1. Water is the solvent, the acid is limiting: $x_{\max} = C\,V = 1.0 \times 10^{-3}\ \mathrm{mol}$. In the final state, $[\mathrm{H_3O^+}]_f = 10^{-3.40} = 4.0 \times 10^{-4}\ \mathrm{mol \cdot L^{-1}}$, so $x_f = [\mathrm{H_3O^+}]_f\,V = 4.0 \times 10^{-5}\ \mathrm{mol}$.

$$
\tau = \frac{x_f}{x_{\max}} = \frac{4.0 \times 10^{-5}}{1.0 \times 10^{-3}} = 0.040
$$

Only 4.0% of the acid has reacted: the reaction is **incomplete**.

2. At equilibrium, $[\mathrm{CH_3COO^-}]_{\text{eq}} = [\mathrm{H_3O^+}]_{\text{eq}} = 4.0 \times 10^{-4}\ \mathrm{mol \cdot L^{-1}}$ and $[\mathrm{CH_3COOH}]_{\text{eq}} = C - [\mathrm{H_3O^+}]_{\text{eq}} = 9.6 \times 10^{-3}\ \mathrm{mol \cdot L^{-1}}$. Water does not appear in the quotient:

$$
K = \frac{[\mathrm{CH_3COO^-}]_{\text{eq}}\,[\mathrm{H_3O^+}]_{\text{eq}}}{[\mathrm{CH_3COOH}]_{\text{eq}}} = \frac{(4.0 \times 10^{-4})^2}{9.6 \times 10^{-3}} = 1.7 \times 10^{-5}
$$

3. Initial reaction quotient:

$$
Q_{r,i} = \frac{1.0 \times 10^{-2} \times 1.0 \times 10^{-5}}{1.0 \times 10^{-2}} = 1.0 \times 10^{-5}
$$

$Q_{r,i} < K$: the system changes in the **forward direction**, forming ethanoate and oxonium ions. The pH decreases slightly.

</details>

## Key points

- Final extent ratio: $\tau = \dfrac{x_f}{x_{\max}}$; the reaction is incomplete if $\tau < 1$, in which case all the reactants and products coexist.
- The equilibrium is **dynamic**: forward and reverse reactions at the same rate.
- $Q_r$ is written with the concentrations of the solutes; the solvent and solids count as 1.
- At equilibrium, $Q_{r,\text{eq}} = K(T)$, which depends only on temperature.
- $Q_{r,i} < K$: forward direction; $Q_{r,i} > K$: reverse direction; $Q_{r,i} = K$: no change.
- A cell delivers a current as long as $Q_r < K$; it is flat when $Q_r = K$.

## Common mistakes

- Including **water** or a **solid** in the expression for $Q_r$.
- Believing that at equilibrium "nothing happens any more": both reactions continue at the same rate.
- Confusing $K$ and $\tau$: $K$ depends only on $T$, whereas $\tau$ also depends on the initial concentrations.
- Reversing the criterion: if $Q_{r,i}$ is **too small**, products are lacking, so the system changes in the forward direction.
- Thinking that a predicted direction of change implies a fast reaction: the criterion says nothing about kinetics.
