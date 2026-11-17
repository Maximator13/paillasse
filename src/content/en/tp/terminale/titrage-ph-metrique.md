---
titre: "pH titration of an acid with sodium hydroxide solution"
description: "Follow the pH as sodium hydroxide solution is added drop by drop, locate the pH jump and deduce the concentration of the acid."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 3
duree: "1 h 30"
chapitre: titrages
objectifs:
  - "Carry out a titration monitored with a pH meter"
  - "Locate the equivalence point using the derivative method"
  - "Calculate a concentration from the equivalence volume"
materiel:
  - "25 mL graduated burette and stand"
  - "20.0 mL volumetric pipette and pipette filler"
  - "100 mL beaker, magnetic stirrer"
  - "Calibrated pH meter and its probe"
  - "Sodium hydroxide solution at 0.100 mol/L, ethanoic acid solution"
  - "Phenolphthalein"
---

## Principle

We want to find the concentration $C_A$ of an ethanoic acid solution. It is reacted with a sodium hydroxide solution of known concentration $C_B$, according to the fast reaction that goes to completion:

$$
\mathrm{CH_3COOH\,(aq) + HO^-\,(aq) \rightarrow CH_3COO^-\,(aq) + H_2O\,(l)}
$$

The pH of the solution is measured after each addition of sodium hydroxide solution. Around the equivalence point, it changes sharply: this **pH jump** is used to locate the equivalence volume $V_E$.

## Method

1. Take $V_A = 20.0\ \mathrm{mL}$ of acid solution with the volumetric pipette and pour it into the beaker. Add the stirrer bar and a few drops of phenolphthalein.
2. Rinse then fill the burette with the sodium hydroxide solution and adjust to zero. Immerse the pH meter probe, making sure the stirrer bar does not hit it. Start the stirring.
3. Add the sodium hydroxide solution one millilitre at a time, recording the pH each time. Make smaller additions (every 0.2 mL) as soon as the pH changes more quickly.
4. Plot $\mathrm{pH} = f(V)$ then the derivative $\dfrac{\mathrm{dpH}}{\mathrm{d}V}$. Read $V_E$ at the abscissa of the maximum of the derivative (in the animation, it is plotted in arbitrary units on the pH axis).
5. Calculate $C_A$.

## Analysis

At the equivalence point, the acid and the hydroxide ions have been added in stoichiometric proportions:

$$
C_A V_A = C_B V_E \qquad\Longrightarrow\qquad C_A = \frac{C_B\,V_E}{V_A}
$$

With $V_E = 20.0\ \mathrm{mL}$, $C_B = 0.100\ \mathrm{mol \cdot L^{-1}}$ and $V_A = 20.0\ \mathrm{mL}$, we find $C_A = 0.100\ \mathrm{mol \cdot L^{-1}}$.

Two useful readings on the curve:

- at the **half-equivalence point** ($V = V_E / 2$), the pH is equal to the $\mathrm{p}K_A$ of the acid-base pair, about 4.8;
- at the **equivalence point**, the pH is greater than 7: the solution contains the conjugate base $\mathrm{CH_3COO^-}$.

## Questions

1. Why make smaller additions around the equivalence point?
2. In the animation, decrease the concentration of the acid. How does $V_E$ change? And the initial pH?
3. Increase the $\mathrm{p}K_A$ up to 6.5. What happens to the pH jump? Is the titration still precise?

<details>
<summary>Show answers</summary>

1. The pH changes very quickly near the equivalence point: additions that are too far apart would miss the jump and reduce the precision on $V_E$.
2. $V_E$ is proportional to $C_A$: it decreases. The initial pH increases slightly, because the solution is less acidic.
3. The weaker the acid, the smaller the pH jump: the maximum of the derivative is less pronounced and $V_E$ is located with less precision.

</details>

## Safety

Sodium hydroxide solution is corrosive: lab coat, goggles and gloves are compulsory. Rinse immediately with water in case of contact.
