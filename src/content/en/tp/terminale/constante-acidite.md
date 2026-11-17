---
titre: "Acidity constant of an acid-base pair"
description: "Measure the pH of five mixtures of an acid and its conjugate base, plot the straight line obtained and read off the pKa of the pair."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 7
duree: "1 h"
chapitre: "force-acides-bases"
objectifs:
  - "Prepare mixtures of a weak acid and its conjugate base in known proportions"
  - "Check the relation between the pH and the ratio of the concentrations of the two forms"
  - "Determine the pKa of an acid-base pair graphically"
  - "Use a predominance diagram"
materiel:
  - "Five numbered 50 mL beakers"
  - "Two 25 mL graduated burettes"
  - "pH meter, probe and calibration buffer solutions"
  - "Ethanoic acid solution at 0.10 mol/L"
  - "Sodium ethanoate solution at 0.10 mol/L"
  - "Wash bottle of distilled water and absorbent paper"
---

## Principle

A weak acid $\mathrm{AH}$ reacts with water to a limited extent:

$$
\mathrm{AH\,(aq) + H_2O\,(l) \rightleftharpoons A^-\,(aq) + H_3O^+\,(aq)}
$$

The acidity constant $K_A$ of the pair $\mathrm{AH/A^-}$ relates the concentrations at equilibrium. Taking the logarithm gives:

$$
\mathrm{pH} = \mathrm{p}K_A + \log\frac{[\mathrm{A^-}]}{[\mathrm{AH}]}
$$

A volume $V_A$ of the acid solution is mixed with a volume $V_B$ of a solution of its conjugate base, of the same concentration $C$. Both species react very little with water, so the ratio $\dfrac{[\mathrm{A^-}]}{[\mathrm{AH}]}$ is practically equal to $\dfrac{V_B}{V_A}$.

## Method

1. Prepare five 20 mL mixtures with the following volumes $V_A + V_B$ (in mL): 18 + 2, 15 + 5, 10 + 10, 5 + 15 and 2 + 18. Mix thoroughly.
2. Calibrate the pH meter with the buffer solutions. Rinse the probe with distilled water and wipe it gently.
3. Dip the probe into each beaker, wait for the reading to settle and record the pH. Rinse the probe between two measurements.
4. Plot the points $\mathrm{pH} = f\!\left(\log\dfrac{V_B}{V_A}\right)$ and draw the straight line of best fit.
5. Construct the predominance diagram of the pair.

## Analysis

With the ethanoic acid/ethanoate ion pair and $C = 0.10\ \mathrm{mol \cdot L^{-1}}$, the animation gives:

| $V_A$ (mL) | $V_B$ (mL) | $V_B / V_A$ | $\log(V_B/V_A)$ | pH |
|---|---|---|---|---|
| 18 | 2 | 0.11 | $-0.95$ | 3.85 |
| 15 | 5 | 0.33 | $-0.48$ | 4.32 |
| 10 | 10 | 1.00 | 0.00 | 4.80 |
| 5 | 15 | 3.00 | 0.48 | 5.28 |
| 2 | 18 | 9.00 | 0.95 | 5.75 |

The points lie on a straight line of gradient 1.00, which confirms the relation. Its y-intercept is $\mathrm{p}K_A = 4.80$, hence:

$$
K_A = 10^{-\mathrm{p}K_A} = 10^{-4.80} = 1.6 \times 10^{-5}
$$

The equimolar mixture ($V_A = V_B$) gives $\mathrm{pH} = \mathrm{p}K_A$ directly. The predominance diagram follows: if $\mathrm{pH} < \mathrm{p}K_A$, the acid $\mathrm{AH}$ predominates; if $\mathrm{pH} > \mathrm{p}K_A$, the base $\mathrm{A^-}$ does.

## Questions

1. Why must the two stock solutions have the same concentration?
2. In the animation, set the $\mathrm{p}K_A$ to 3.8 (the methanoic acid pair). How do the straight line and the boundary of the predominance diagram change?
3. With a $\mathrm{p}K_A$ of 3.5, lower the concentration to $0.002\ \mathrm{mol \cdot L^{-1}}$. What happens to the gradient and to the measured $\mathrm{p}K_A$? Explain.

<details>
<summary>Show answers</summary>

1. The two species are then diluted in the same way in the mixture: the ratio of the concentrations reduces to the ratio of the volumes $V_B / V_A$, which is easy to know accurately.
2. The line keeps a gradient very close to 1 (0.97) but shifts down by one pH unit: its y-intercept is 3.82, that is 3.8 to the precision of the measurements. The boundary of the diagram moves to $\mathrm{pH} = 3.8$, and the region where $\mathrm{AH}$ predominates shrinks.
3. The gradient drops to about 0.67 and the y-intercept rises to about 3.8: the points no longer follow the relation. In a very dilute solution, the acid dissociates to a significant extent, so the actual ratio $[\mathrm{A^-}]/[\mathrm{AH}]$ is no longer equal to $V_B / V_A$. The method requires sufficiently concentrated solutions.

</details>

## Safety

The solutions used are dilute: a lab coat and safety glasses are sufficient. The pH meter probe is fragile; it must neither touch the bottom of the beaker nor be left in the open air.
