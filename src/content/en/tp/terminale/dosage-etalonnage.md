---
titre: "Spectrophotometric determination using a calibration curve"
description: "Prepare a set of patent blue standards, measure their absorbances, plot the calibration line and read off the unknown concentration from the graph."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 1
duree: "1 h 30"
chapitre: "analyse-physique"
objectifs:
  - "Prepare a set of standard solutions by diluting a stock solution"
  - "Measure an absorbance after setting the blank"
  - "Plot a calibration line and check the Beer-Lambert law"
  - "Determine an unknown concentration by reading it off the line"
materiel:
  - "Spectrophotometer and cuvettes with a 1.0 cm path length"
  - "Stock solution of patent blue V (E131) at 50 µmol/L"
  - "Five 50.0 mL volumetric flasks"
  - "25.0 mL burette or 10.0 mL graduated pipette"
  - "Distilled water, beakers, test tubes and rack"
  - "Solution X of patent blue of unknown concentration"
---

## Principle

A coloured solution absorbs part of the light that passes through it. The spectrophotometer compares the incident intensity $I_0$ with the transmitted intensity $I$, and displays the absorbance $A = \log(I_0 / I)$, a quantity with no unit.

For a dilute solution, the absorbance is proportional to the concentration of the coloured species: this is the **Beer-Lambert law**.

$$
A = \varepsilon \, l \, C = k\,C
$$

$\varepsilon$ is the molar absorption coefficient (it depends on the species and on the wavelength), and $l$ is the path length of the cuvette. By measuring the absorbance of solutions of known concentration, we obtain a **calibration line**, which is then used to read off the concentration of an unknown solution: no chemical reaction is needed, so the method is non-destructive.

## Method

1. Prepare the standard solutions: measure out 2.0, 4.0, 6.0, 8.0 and 10.0 mL of stock solution, pour each into a 50.0 mL volumetric flask, make up to the mark with distilled water and mix thoroughly.
2. Set the spectrophotometer to $\lambda = 640\ \mathrm{nm}$, the absorption maximum of patent blue. Set the blank with a cuvette of distilled water.
3. Measure the absorbance of each diluted solution, from the least concentrated to the most concentrated, rinsing the cuvette with the solution to be measured.
4. Plot the points $(C, A)$ and draw the line of best fit through the origin.
5. Measure the absorbance $A_X$ of solution X under the same conditions and mark it on the line.
6. Read $C_X$ on the horizontal axis and conclude.

## Analysis

The dilution gives the concentration of each diluted solution: $C_f = \dfrac{C_m V_m}{V_f}$, that is $4.0\ \mathrm{\mu mol \cdot L^{-1}}$ for a 4.0 mL sample of stock solution.

The points lie on a line through the origin, within the uncertainties of the preparation. The gradient of the line is:

$$
k = \varepsilon\, l = 1.06 \times 10^{5}\ \mathrm{L \cdot mol^{-1}}
$$

For solution X, we measure $A_X = 0.678$. Reading off the line, or calculating $C_X = A_X / k$, gives:

$$
C_X = \frac{0.678}{1.06 \times 10^{5}}\ \mathrm{mol \cdot L^{-1}}
$$

that is $C_X = 6.4 \times 10^{-6}\ \mathrm{mol \cdot L^{-1}} = 6.4\ \mathrm{\mu mol \cdot L^{-1}}$.

The result is only valid if $A_X$ lies within the range covered by the standards: beyond it, solution X is diluted before being measured.

## Questions

1. Why set the blank before taking the measurements?
2. In the animation, move the wavelength away from 640 nm. What happens to the gradient of the line? Why do we work at the absorption maximum?
3. Vary the path length of the cuvette. How do the absorbance $A_X$, the gradient $k$ and the concentration read off the line change?

<details>
<summary>Show answers</summary>

1. The cuvette and the solvent absorb a little light. The blank sets the absorbance to zero so that the value displayed is due only to the coloured species.
2. The gradient decreases, because $\varepsilon$ is smaller (read the value of $k$ displayed and the graduations on the vertical axis, whose scale adapts): for the same difference in concentration, the difference in absorbance is smaller and the reading is less precise. At the absorption maximum, the sensitivity is at its best.
3. $A_X$ and $k$ are proportional to $l$: they vary together, and their ratio $C_X = A_X / k$ does not change. The standards and the unknown simply have to be measured with the same cuvette.

</details>

## Safety

Patent blue is a food colouring, harmless at the concentrations used, but it stains badly: a lab coat is recommended. Handle the cuvettes by their frosted sides and wipe them before placing them in the instrument.
