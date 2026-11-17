---
titre: "Physical analysis: measuring without transforming"
description: "pH measurement, absorbance, conductivity, ideal gas and spectroscopy: the physical measurements that identify a species and give its concentration."
niveau: terminale
theme: matiere
ordre: 2
duree: "30 min"
motsCles: ["pH measurement", "Beer-Lambert", "Kohlrausch", "calibration curve determination", "ideal gas", "IR spectroscopy", "UV-visible"]
tp: ["dosage-etalonnage"]
---

> **The essentials.** A measurable physical quantity (pH, absorbance, conductivity, pressure) depends on the concentration of a species. Knowing this dependence, we can work back to the concentration **without using up the sample**. Spectroscopic techniques, for their part, are mainly used to **identify** species.

## 1. pH measurement

The pH of a dilute aqueous solution is related to the concentration of oxonium ions:

> **Definition.** $\mathrm{pH} = -\log\left(\dfrac{[\mathrm{H_3O^+}]}{c^\circ}\right)$, that is $[\mathrm{H_3O^+}] = c^\circ \times 10^{-\mathrm{pH}}$, with $c^\circ = 1\ \mathrm{mol \cdot L^{-1}}$ (standard concentration).

pH is measured with a **pH meter**: a probe immersed in the solution delivers a voltage that depends on the pH. The instrument must be **calibrated** before use with buffer solutions of known pH (for example 4.0 and 7.0).

Some useful orders of magnitude:

| pH | $[\mathrm{H_3O^+}]$ in $\mathrm{mol \cdot L^{-1}}$ |
|---|---|
| 2.0 | $1.0 \times 10^{-2}$ |
| 7.0 | $1.0 \times 10^{-7}$ |
| 11.0 | $1.0 \times 10^{-11}$ |

pH is a logarithmic scale: dividing $[\mathrm{H_3O^+}]$ by 10 increases the pH by one unit. The precision of a school pH meter is about 0.05 pH units, which limits the number of significant figures in $[\mathrm{H_3O^+}]$.

## 2. Absorbance and the Beer-Lambert law

A coloured species absorbs part of the light that passes through it. The **spectrophotometer** measures the **absorbance** $A$ (no unit) of the solution at a chosen wavelength, generally that of the absorption maximum $\lambda_{\max}$, for better sensitivity.

> **Beer-Lambert law.** For a dilute solution of a single absorbing species:
>
> $$
> A = \varepsilon \, \ell \, c
> $$
>
> with $\varepsilon$ the molar absorption coefficient (in $\mathrm{L \cdot mol^{-1} \cdot cm^{-1}}$), $\ell$ the path length through the solution (in $\mathrm{cm}$) and $c$ the concentration (in $\mathrm{mol \cdot L^{-1}}$).

At a fixed wavelength and with a fixed cell, the absorbance is therefore **proportional** to the concentration: $A = k\,c$. This law is only valid for **dilute** solutions (in practice $A \lesssim 1.5$). The absorbances of several absorbing species add up.

## 3. Conductivity and Kohlrausch's law

An ionic solution conducts electric current: it is the ions that move. The **conductivity meter** measures its conductivity $\sigma$ in $\mathrm{S \cdot m^{-1}}$.

> **Kohlrausch's law.** For a dilute solution:
>
> $$
> \sigma = \sum_i \lambda_i \, [X_i]
> $$
>
> with $\lambda_i$ the molar ionic conductivity of the ion $X_i$ (in $\mathrm{S \cdot m^2 \cdot mol^{-1}}$) and $[X_i]$ its concentration (in $\mathrm{mol \cdot m^{-3}}$).

Watch the units: $1\ \mathrm{mol \cdot L^{-1}} = 10^{3}\ \mathrm{mol \cdot m^{-3}}$.

Example: for a sodium chloride solution at $1.0 \times 10^{-3}\ \mathrm{mol \cdot L^{-1}}$, that is $1.0\ \mathrm{mol \cdot m^{-3}}$, with $\lambda(\mathrm{Na^+}) = 5.01 \times 10^{-3}$ and $\lambda(\mathrm{Cl^-}) = 7.63 \times 10^{-3}\ \mathrm{S \cdot m^2 \cdot mol^{-1}}$:

$$
\sigma = (5.01 + 7.63) \times 10^{-3} \times 1.0 = 1.3 \times 10^{-2}\ \mathrm{S \cdot m^{-1}}
$$

For a single ionic solute, fully dissociated, $\sigma$ is proportional to the concentration of solute dissolved: $\sigma = k\,c$.

## 4. Determination using a calibration curve

A **determination using a calibration curve** finds a concentration by comparison with solutions of known concentrations. Unlike a titration, it is **non-destructive**.

Method:

1. Prepare, by diluting a stock solution, a series of **standard solutions** of known concentrations.
2. Measure the physical quantity ($A$ or $\sigma$) for each standard, under the same conditions.
3. Plot the **calibration curve** $A = f(c)$ or $\sigma = f(c)$: a straight line through the origin if the law holds. Fit a model to obtain the coefficient $k$.
4. Measure the quantity for the unknown solution and deduce $c = \dfrac{A}{k}$ (or $\dfrac{\sigma}{k}$), by calculation or by reading the graph.

The unknown concentration must lie **within the range** of the standards: outside it, nothing guarantees that the relationship remains linear. If the solution is too concentrated, it is diluted first, taking the dilution factor into account.

## 5. Ideal gas and molar volume

For a gaseous species, the amount of substance is deduced from measurements of pressure, volume and temperature.

> **Ideal gas equation of state.**
>
> $$
> P\,V = n\,R\,T
> $$
>
> with $P$ in $\mathrm{Pa}$, $V$ in $\mathrm{m^3}$, $n$ in $\mathrm{mol}$, $T$ in $\mathrm{K}$ and $R = 8.314\ \mathrm{J \cdot mol^{-1} \cdot K^{-1}}$.

This model describes real gases well at **low pressure** (the molecules interact very little). From it we deduce the **molar volume**, the volume occupied by one mole of gas, identical for all ideal gases under the same conditions:

$$
V_m = \frac{V}{n} = \frac{R\,T}{P}
$$

At $T = 293\ \mathrm{K}$ and $P = 1.013 \times 10^{5}\ \mathrm{Pa}$, we obtain $V_m \approx 24.0\ \mathrm{L \cdot mol^{-1}}$. A reaction that produces a gas can therefore be followed by measuring the pressure in a closed vessel.

## 6. Infrared and UV-visible spectroscopy

These techniques are mainly used to **identify** a species or a characteristic group.

**UV-visible spectroscopy.** A species that absorbs in the visible range is coloured: it takes the **complementary colour** of the one it absorbs most (colour wheel). A solution that absorbs around 600 nm (orange) appears blue. The spectrum $A = f(\lambda)$ gives $\lambda_{\max}$, useful for choosing the wavelength for a determination.

**Infrared spectroscopy.** The bonds of a molecule absorb certain infrared radiation. The spectrum shows the transmittance as a function of the **wavenumber** $\sigma = \dfrac{1}{\lambda}$, expressed in $\mathrm{cm^{-1}}$ (not to be confused with conductivity). Each band indicates a bond:

| Bond | Wavenumber ($\mathrm{cm^{-1}}$) | Shape of the band |
|---|---|---|
| O-H alcohol (hydrogen-bonded) | 3200 to 3400 | strong, broad |
| O-H carboxylic acid | 2500 to 3200 | strong, very broad |
| N-H amine, amide | 3100 to 3500 | medium |
| C-H | 2800 to 3100 | medium to strong |
| C=O | 1650 to 1750 | strong, sharp |

The simultaneous presence of a C=O band around $1700\ \mathrm{cm^{-1}}$ and a very broad O-H band between 2500 and $3200\ \mathrm{cm^{-1}}$ is the signature of a **carboxylic acid**.

## Worked example

A blue food colouring in a drink is determined by spectrophotometry, at $\lambda_{\max}$. The standard solutions give:

| $c$ ($10^{-6}\ \mathrm{mol \cdot L^{-1}}$) | 2.0 | 4.0 | 6.0 | 8.0 |
|---|---|---|---|---|
| $A$ | 0.26 | 0.52 | 0.78 | 1.04 |

The drink, analysed without dilution in the same cell, has an absorbance $A = 0.65$.

1. Is the Beer-Lambert law obeyed? Determine the coefficient $k$.
2. Deduce the concentration of the colouring in the drink.
3. Why is the measurement made at $\lambda_{\max}$?

<details>
<summary>Show the solution</summary>

1. The ratio $\dfrac{A}{c}$ is constant for all the standards: the calibration curve is a straight line through the origin, so the law is obeyed.

$$
k = \frac{0.52}{4.0 \times 10^{-6}} = 1.3 \times 10^{5}\ \mathrm{L \cdot mol^{-1}}
$$

2. The value $A = 0.65$ lies within the range of the standards, so:

$$
c = \frac{A}{k} = \frac{0.65}{1.3 \times 10^{5}} = 5.0 \times 10^{-6}\ \mathrm{mol \cdot L^{-1}}
$$

3. At $\lambda_{\max}$, the absorbance is greatest for a given concentration: the measurement is more sensitive and less affected by a small error in setting the wavelength.

</details>

## Key points

- $\mathrm{pH} = -\log\left(\dfrac{[\mathrm{H_3O^+}]}{c^\circ}\right)$ and $[\mathrm{H_3O^+}] = c^\circ \times 10^{-\mathrm{pH}}$.
- Beer-Lambert: $A = \varepsilon\,\ell\,c$; Kohlrausch: $\sigma = \sum_i \lambda_i\,[X_i]$. Both hold only in dilute solution.
- Determination using a calibration curve: range of standards, straight line $A = k\,c$ or $\sigma = k\,c$, reading of the unknown **within the range**.
- Ideal gas: $P\,V = n\,R\,T$ in SI units; $V_m = \dfrac{R\,T}{P}$.
- IR: identification of bonds (O-H, C=O, N-H...); UV-visible: complementary colour and $\lambda_{\max}$.

## Common mistakes

- Using Kohlrausch's law with concentrations in $\mathrm{mol \cdot L^{-1}}$: they must be in $\mathrm{mol \cdot m^{-3}}$.
- Putting the temperature in degrees Celsius or the volume in litres in $P\,V = n\,R\,T$.
- Using an absorbance outside the calibration range, or too high for the Beer-Lambert law to remain valid.
- Confusing the colour absorbed with the colour perceived: a solution that absorbs red appears blue-green.
- Confusing the O-H band of an alcohol (centred around $3300\ \mathrm{cm^{-1}}$) with that of a carboxylic acid (much broader, down to $2500\ \mathrm{cm^{-1}}$).
