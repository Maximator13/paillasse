---
titre: "Electrolysis of acidified water"
description: "Force water to decompose using a power supply, collect twice as much hydrogen as oxygen and relate these volumes to the charge passed."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 8
duree: "1 h"
chapitre: "electrolyse"
objectifs:
  - "Carry out an electrolysis and identify the anode and the cathode"
  - "Relate the charge Q = I·Δt to the amount of electrons transferred"
  - "Predict the volumes of gas formed and compare them with the measurements"
materiel:
  - "Electrolysis cell with inert electrodes (tank and base with terminals)"
  - "Two graduated test tubes"
  - "Adjustable DC power supply"
  - "Ammeter and connecting leads"
  - "Stopwatch"
  - "Sulfuric acid solution, 0.5 mol/L"
---

## Principle

Water does not decompose spontaneously into hydrogen and oxygen. A power supply can however **force** this transformation by imposing the direction in which the electrons flow: this is an electrolysis. The water is acidified so that the solution, rich in ions, conducts the current.

At the **cathode**, connected to the negative terminal, the electrons arrive and a reduction takes place:

$$
\mathrm{2\,H^+\,(aq) + 2\,e^- \rightarrow H_2\,(g)}
$$

At the **anode**, connected to the positive terminal, the electrons leave and an oxidation takes place:

$$
\mathrm{2\,H_2O\,(l) \rightarrow O_2\,(g) + 4\,H^+\,(aq) + 4\,e^-}
$$

The overall equation is $\mathrm{2\,H_2O\,(l) \rightarrow 2\,H_2\,(g) + O_2\,(g)}$: twice as much hydrogen as oxygen is formed.

## Method

1. Fill the tank with acidified water. Fill the two graduated tubes with the same solution, close them with a finger (wearing gloves) and invert them over the electrodes without letting any air in.
2. Connect the power supply, the ammeter and the electrolysis cell in series. Identify the cathode (negative terminal) and the anode (positive terminal).
3. Switch on the power supply and set the current to $I = 0.50\ \mathrm{A}$. Observe the bubbles on each electrode.
4. Start the stopwatch and record the volume of gas in each tube at regular intervals, keeping the current constant.
5. After $\Delta t = 300\ \mathrm{s}$, open the circuit, read the final volumes and compare them with the predicted values.

## Analysis

The charge that has passed through the circuit is:

$$
Q = I\,\Delta t = 0.50 \times 300 = 150\ \mathrm{C}
$$

It corresponds to an amount of electrons (with $F = 96\,500\ \mathrm{C \cdot mol^{-1}}$):

$$
n(\mathrm{e^-}) = \frac{Q}{F} = \frac{150}{96\,500} = 1.55 \times 10^{-3}\ \mathrm{mol}
$$

According to the half-equations, 2 electrons are needed per molecule of $\mathrm{H_2}$ and 4 per molecule of $\mathrm{O_2}$:

$$
n(\mathrm{H_2}) = \frac{n(\mathrm{e^-})}{2} = 7.8 \times 10^{-4}\ \mathrm{mol}
$$

$$
n(\mathrm{O_2}) = \frac{n(\mathrm{e^-})}{4} = 3.9 \times 10^{-4}\ \mathrm{mol}
$$

With a molar volume $V_m = 24.0\ \mathrm{L \cdot mol^{-1}}$ at 20 °C, we predict $V(\mathrm{H_2}) = 18.7\ \mathrm{mL}$ and $V(\mathrm{O_2}) = 9.3\ \mathrm{mL}$, as in the animation. On the graph, both volumes are linear functions of time, and the hydrogen line has twice the gradient.

## Questions

1. Why is a power supply needed to carry out this transformation?
2. In the animation, increase the current to 0.80 A without changing the duration. How do the volumes change? What about their ratio?
3. At 0.30 A, what duration must be chosen to obtain roughly the volumes collected with 0.50 A for 300 s? Check with the sliders.

<details>
<summary>Show answers</summary>

1. The transformation is not spontaneous: the power supply provides the electrical energy and imposes the direction of electron flow, opposite to the one that would be observed during the spontaneous transformation (operation as a cell).
2. The volumes are proportional to $Q = I\,\Delta t$: they are multiplied by 1.6 (29.8 mL and 14.9 mL). Their ratio remains equal to 2, because it is fixed by the stoichiometry.
3. The same charge is needed: $\Delta t = Q / I = 150 / 0.30 = 500\ \mathrm{s}$. The slider stops at 480 s, where 17.9 mL of hydrogen is collected, slightly less than 18.7 mL.

</details>

## Safety

Sulfuric acid is corrosive: lab coat, goggles and gloves are compulsory. Hydrogen is flammable: no flame nearby, and small volumes only.
