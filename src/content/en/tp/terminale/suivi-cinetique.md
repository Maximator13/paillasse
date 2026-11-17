---
titre: "Following the kinetics of a decolourisation by spectrophotometry"
description: "Watch methylene blue lose its colour in the cuvette, measure the half-life of the reaction and test the effect of temperature and of a catalyst."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 4
duree: "1 h 30"
chapitre: "cinetique-chimique"
objectifs:
  - "Follow the change in a concentration by measuring absorbance"
  - "Determine a half-life graphically"
  - "Check that a rate law is first order"
  - "Show the effect of temperature and of a catalyst"
materiel:
  - "Spectrophotometer set to 665 nm, with its cuvettes"
  - "Methylene blue solution, 1.6 × 10⁻⁵ mol/L"
  - "Ascorbic acid (vitamin C) solution, in large excess"
  - "Hydrochloric acid (source of H3O+ ions, catalyst)"
  - "Thermostatic water bath and thermometer"
  - "Graduated pipettes and pipette filler"
  - "Stopwatch"
---

## Principle

The methylene blue ion $\mathrm{BM^+}$, which is an intense blue, is slowly reduced by ascorbic acid to a colourless species, written $\mathrm{BMH_2^+}$ in acidic solution:

$$
\mathrm{BM^+(aq) + C_6H_8O_6(aq) \rightarrow BMH_2^+(aq) + C_6H_6O_6(aq)}
$$

$\mathrm{BM^+}$ is the only species that absorbs at 665 nm. According to the Beer-Lambert law, $A = \varepsilon\,\ell\,[\mathrm{BM^+}]$: measuring the absorbance over time amounts to following the disappearance of the dye. Since the ascorbic acid is in large excess, its concentration stays almost constant and the rate depends only on $[\mathrm{BM^+}]$.

## Method

1. Place both solutions in the thermostatic water bath. Set the spectrophotometer to 665 nm, run the blank, then put the methylene blue into the cuvette.
2. Add the acidified ascorbic acid, close the lid and start the stopwatch straight away.
3. Record the absorbance every 12 s for 6 min and plot $A = f(t)$.
4. Read off the half-life $t_{1/2}$: the time at which $A = A_0 / 2$.
5. Plot $\ln A = f(t)$ and fit a straight line.
6. Repeat, changing only one factor at a time: temperature, amount of catalyst, initial concentration of the dye.

## Analysis

In the cuvette, the dye is diluted by the ascorbic acid added (5 volumes of dye for 3 volumes added). With $[\mathrm{BM^+}]_0 = 1.0 \times 10^{-5}\ \mathrm{mol \cdot L^{-1}}$ in the mixture, $\varepsilon = 7.4 \times 10^{4}\ \mathrm{L \cdot mol^{-1} \cdot cm^{-1}}$ and a $1.0\ \mathrm{cm}$ cuvette, we expect $A_0 = 0.74$. At 25 °C, with $0.05\ \mathrm{mol \cdot L^{-1}}$ of $\mathrm{H_3O^+}$ ions added, the absorbance is $0.37$ at $t_{1/2} = 69\ \mathrm{s}$, and it is halved again at 139 s and at 208 s.

This regular pattern is the signature of a **first-order** rate law:

$$
[\mathrm{BM^+}](t) = [\mathrm{BM^+}]_0\,\mathrm{e}^{-kt}
$$

Since the absorbance is proportional to $[\mathrm{BM^+}]$, it follows that:

$$
\ln A = \ln A_0 - k\,t
$$

The points $\ln A = f(t)$ lie on a straight line. The gradient gives $k = 1.0 \times 10^{-2}\ \mathrm{s^{-1}}$, and we recover:

$$
t_{1/2} = \frac{\ln 2}{k} = \frac{0.693}{1.0 \times 10^{-2}} = 69\ \mathrm{s}
$$

At the microscopic scale, heating makes collisions between entities more frequent and more effective. The catalyst, for its part, opens up an easier reaction pathway: it speeds up the transformation without appearing in its equation, and is recovered unchanged at the end.

## Questions

1. Why work with a large excess of ascorbic acid?
2. In the animation, bring the catalyst slider back to zero. What happens to $t_{1/2}$? Is the final state changed?
3. Double the initial concentration of the dye, then go from 25 °C to 35 °C. Which of these two settings changes $t_{1/2}$?

<details>
<summary>Show answers</summary>

1. Its concentration then stays practically constant: the rate depends only on $[\mathrm{BM^+}]$, which makes it possible to test for first order with respect to the dye.
2. $t_{1/2}$ doubles, from 69 s to 139 s: the reaction is twice as slow. The absorbance still tends towards zero, because a catalyst changes how long the transformation takes, not its final state.
3. Doubling the concentration makes the curve start from $A_0 = 1.48$, but $t_{1/2}$ stays equal to 69 s (a property of first order). Heating by 10 °C brings it down to about 38 s: temperature is a kinetic factor.

</details>

## Safety

Hydrochloric acid is an irritant and methylene blue leaves lasting stains: wear a lab coat, safety glasses and gloves. Used solutions go into the waste container.
