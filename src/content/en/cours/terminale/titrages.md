---
titre: "Titrations: determining a species using a chemical reaction"
description: "Principle of a titration, equivalence point, pH and conductivity monitoring: the method for determining an unknown concentration."
niveau: terminale
theme: matiere
ordre: 3
duree: "25 min"
motsCles: ["titration", "equivalence point", "pH monitoring", "conductimetry", "quantitative analysis"]
tp: ["titrage-ph-metrique", "titrage-conductimetrique"]
---

> **The essentials.** To titrate is to determine an amount of substance by making it react completely with a species of known concentration. Everything rests on one precise moment, the **equivalence point**, when the reactants have been added in stoichiometric proportions. This equivalence point is located by the pH jump (pH monitoring), the change in slope of the conductivity (conductivity monitoring) or the colour change of an indicator.

## 1. The principle of a titration

A **quantitative analysis** determines the concentration of a species in solution. When it involves a chemical reaction, it is called a **titration**: it is a destructive method, because the species being analysed is consumed. In a **direct titration**, the species to be determined reacts directly with the titrant added from the burette, with no intermediate reaction.

Two solutions are involved:

- the **analyte solution**, in the beaker: it contains the species whose concentration $C_A$ is sought. A precise volume $V_A$ of it is measured out with a volumetric pipette;
- the **titrant solution**, in the graduated burette: its concentration $C_B$ is known precisely.

The reaction on which the titration is based must be:

| Criterion | Why |
|---|---|
| **Complete** | all of the analyte must be consumed at the equivalence point |
| **Fast** | each addition must act immediately |
| **Unique** | the titrant must react only with the species being titrated |

## 2. The equivalence point

At the start, the titrant added is entirely consumed: it is the **limiting** reactant. Beyond a certain volume, it is the analyte that has disappeared and the titrant accumulates.

> **Definition.** The equivalence point is the state of the system in which the analyte and the titrant have been added in **stoichiometric proportions**. Both are then completely consumed.

For a titration reaction with equation $a\,\mathrm{A} + b\,\mathrm{B} \rightarrow \text{products}$, the relationship at the equivalence point is written:

$$
\frac{n(\mathrm{A})_{\text{initial}}}{a} = \frac{n(\mathrm{B})_{\text{added at the equivalence point}}}{b}
\qquad\text{that is}\qquad
\frac{C_A V_A}{a} = \frac{C_B V_E}{b}
$$

In the very common case where $a = b = 1$:

$$
C_A = \frac{C_B\,V_E}{V_A}
$$

The whole experimental challenge is therefore to locate the **equivalence volume** $V_E$.

## 3. Titration with pH monitoring

When the underlying reaction is an **acid-base** reaction, the pH varies during the titration. The pH is recorded after each addition and $\mathrm{pH} = f(V)$ is plotted.

The curve shows a **pH jump**: a sharp variation around the equivalence point. Two methods can be used to read $V_E$:

1. **Derivative method.** Plot $\dfrac{\mathrm{dpH}}{\mathrm{d}V}$ against $V$: its extremum (a maximum if a base is being added, a minimum if an acid is being added) has $V_E$ as its abscissa.
2. **Tangent method.** Draw two parallel tangents on either side of the jump, then the parallel line equidistant from them: it crosses the curve at the equivalence point.

A **colour indicator** can also be used: its transition range must lie within the pH jump, and therefore contain the pH at the equivalence point. The equivalence point is then located by the change in colour of the solution. For the titration of a weak acid with sodium hydroxide solution, the pH at the equivalence point is greater than 7: phenolphthalein (transition range from 8.2 to 10.0) is suitable, whereas methyl orange (3.1 to 4.4) would change colour well before the equivalence point.

## 4. Titration with conductivity monitoring

When the reaction involves **ions**, the conductivity $\sigma$ of the solution changes as the additions are made. According to Kohlrausch's law:

$$
\sigma = \sum_i \lambda_i\,[X_i]
$$

where $\lambda_i$ is the molar ionic conductivity of the ion $X_i$, with $\sigma$ in $\mathrm{S \cdot m^{-1}}$, $\lambda_i$ in $\mathrm{S \cdot m^2 \cdot mol^{-1}}$ and $[X_i]$ in $\mathrm{mol \cdot m^{-3}}$ (and not in $\mathrm{mol \cdot L^{-1}}$). Before and after the equivalence point, the ions whose amount varies are not the same: the curve $\sigma = f(V)$ is made up of **two straight-line portions** with different slopes. Their point of intersection has $V_E$ as its abscissa.

Example: titration of ethanoic acid with sodium hydroxide solution. Before the equivalence point, each $\mathrm{HO^-}$ ion added is consumed and replaced by a $\mathrm{CH_3COO^-}$ ion, while $\mathrm{Na^+}$ ions accumulate: $\sigma$ increases slowly. After the equivalence point, the $\mathrm{HO^-}$ ions, which have a very high molar ionic conductivity, accumulate along with the $\mathrm{Na^+}$ ions: $\sigma$ increases much faster.

So that the portions really are straight lines, a large volume of water is added to the beaker: the dilution caused by the additions becomes negligible.

## Worked example

A volume $V_A = 20.0\ \mathrm{mL}$ of vinegar diluted tenfold is titrated with sodium hydroxide solution at $C_B = 0.100\ \mathrm{mol \cdot L^{-1}}$. The underlying reaction is:

$$
\mathrm{CH_3COOH\,(aq) + HO^-\,(aq) \rightarrow CH_3COO^-\,(aq) + H_2O\,(l)}
$$

The measured equivalence volume is $V_E = 13.6\ \mathrm{mL}$. What is the concentration of ethanoic acid in the commercial vinegar?

<details>
<summary>Show the solution</summary>

The stoichiometric coefficients are equal to 1, so at the equivalence point $C_A V_A = C_B V_E$:

$$
C_A = \frac{0.100 \times 13.6}{20.0} = 6.80 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}
$$

The vinegar was diluted tenfold: $C_{\text{vinegar}} = 10 \times C_A = 0.680\ \mathrm{mol \cdot L^{-1}}$.

</details>

## Key points

- A titration relies on a reaction that is **complete, fast and unique**.
- At the equivalence point, the reactants are in stoichiometric proportions: $\dfrac{C_A V_A}{a} = \dfrac{C_B V_E}{b}$.
- pH monitoring: $V_E$ is the abscissa of the **extremum of the derivative** $\dfrac{\mathrm{dpH}}{\mathrm{d}V}$, or is read using the tangent method.
- Colour indicator: its transition range must lie within the pH jump.
- Conductivity monitoring: $V_E$ is the abscissa of the **change in slope**.

## Common mistakes

- Confusing the **equivalence point** with **neutrality**: the pH at the equivalence point is equal to 7 (at 25 °C) only for a titration between a strong acid and a strong base.
- Leaving the concentration in $\mathrm{mol \cdot L^{-1}}$ in Kohlrausch's law: it must be in $\mathrm{mol \cdot m^{-3}}$.
- Forgetting the **dilution factor** when the solution was diluted before the titration.
- Writing $C_A V_A = C_B V_E$ without checking the stoichiometric coefficients in the equation.
