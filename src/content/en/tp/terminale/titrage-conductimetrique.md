---
titre: "Conductometric titration of a saline solution"
description: "Track conductivity as silver nitrate is added, locate the change in slope and work out the sodium chloride concentration of a saline solution."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 2
duree: "1 h 30"
chapitre: "titrages"
objectifs:
  - "Carry out a titration monitored by conductivity"
  - "Interpret the change in slope using Kohlrausch's law"
  - "Locate the equivalence point at the intersection of two straight-line portions"
  - "Calculate a concentration and compare it with the value on the label"
materiel:
  - "25 mL graduated burette and stand"
  - "10.0 mL volumetric pipette and pipette filler"
  - "400 mL beaker, magnetic stirrer"
  - "Calibrated conductivity meter and its cell"
  - "Saline solution, wash bottle of distilled water"
  - "Silver nitrate solution, 0.100 mol/L"
---

## Principle

Saline solution is a sodium chloride solution labelled as 9 g/L. Its chloride ions are titrated with a silver nitrate solution of known concentration $C_1$. The titration reaction is a precipitation, complete and fast:

$$
\mathrm{Ag^+\,(aq) + Cl^-\,(aq) \rightarrow AgCl\,(s)}
$$

No species is coloured and the pH does not change: we monitor the **conductivity** $\sigma$ of the solution. According to Kohlrausch's law, each ion contributes in proportion to its concentration:

$$
\sigma = \sum_i \lambda_i\,[X_i]
$$

The $\mathrm{Na^+}$ ions are spectators. Before the equivalence point, each $\mathrm{Cl^-}$ ion consumed is replaced by an $\mathrm{NO_3^-}$ ion, which conducts slightly less well: $\sigma$ decreases slightly. After the equivalence point, the $\mathrm{Ag^+}$ and $\mathrm{NO_3^-}$ ions build up: $\sigma$ increases markedly.

| Ion | $\mathrm{Na^+}$ | $\mathrm{Cl^-}$ | $\mathrm{Ag^+}$ | $\mathrm{NO_3^-}$ |
|---|---|---|---|---|
| $\lambda$ in $\mathrm{mS \cdot m^2 \cdot mol^{-1}}$ | 5.01 | 7.63 | 6.19 | 7.14 |

## Method

1. Take a sample of $V_0 = 10.0\ \mathrm{mL}$ of saline solution with the volumetric pipette, transfer it to the beaker, then add about 200 mL of distilled water.
2. Fill the burette with silver nitrate and adjust to zero. Immerse the conductivity cell, start the stirrer and record the initial conductivity.
3. Add the titrant one millilitre at a time, recording $\sigma$ after each addition: the solution turns cloudy and the conductivity falls slowly.
4. Continue up to 25 mL: the conductivity rises sharply.
5. Plot $\sigma = f(V)$, model each set of points with a straight line and read $V_E$ at the abscissa of their intersection.
6. Calculate the concentration $C_0$ of the saline solution.

## Analysis

With the default settings, the conductivity goes from 92.7 mS/m to 83.0 mS/m at the equivalence point, then reaches 134.1 mS/m for 25 mL added. The two lines intersect at $V_E \approx 15.3\ \mathrm{mL}$. At the equivalence point, the reactants have been introduced in stoichiometric proportions:

$$
C_0 V_0 = C_1 V_E \qquad\Longrightarrow\qquad C_0 = \frac{C_1\,V_E}{V_0} = \frac{0.100 \times 15.3}{10.0} = 0.153\ \mathrm{mol \cdot L^{-1}}
$$

The mass concentration is $t = C_0 \times M(\mathrm{NaCl}) = 0.153 \times 58.4 = 8.9\ \mathrm{g \cdot L^{-1}}$, which differs by less than 1% from the 9 g/L on the label.

## Questions

1. Why is it not necessary to take more closely spaced readings around the equivalence point, unlike in a pH titration?
2. In the animation, vary the chloride ion concentration. What happens to the break point? Do the slopes change much?
3. Reduce the volume of distilled water to 50 mL. What do you observe on the points and on the value of $V_E$?

<details>
<summary>Show answers</summary>

1. The equivalence point is located by the intersection of two straight lines drawn through points far from it: a few regularly spaced readings on either side are enough.
2. $V_E$ is proportional to $C_0$: the break moves to the right as the concentration increases. The slopes change little, because they depend mainly on $C_1$ and on the molar ionic conductivities.
3. The volume added is no longer negligible compared with the total volume: dilution bends both portions, the model lines fit less well and $V_E$ is underestimated (about 15.1 mL). Hence the addition of a large volume of water.

</details>

## Safety

Silver nitrate is corrosive, stains the skin and is toxic to aquatic organisms: lab coat, safety glasses and gloves, and collect the solutions and the precipitate in the waste container provided.
