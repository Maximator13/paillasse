---
titre: "Venturi effect and Bernoulli's equation"
description: "Watch water speed up in the throat of a Venturi tube, read the pressure drop on the manometer tubes and work out the flow rate."
niveau: terminale
theme: mouvement
matiere: physique
ordre: 13
duree: "1 h"
chapitre: "mecanique-des-fluides"
objectifs:
  - "Use the conservation of volume flow rate to compare speeds"
  - "Relate a manometer height to a pressure"
  - "Apply Bernoulli's equation to a horizontal flow"
  - "Deduce a flow rate from a height difference"
materiel:
  - "Transparent Venturi tube (diameter 20 mm, 12 mm throat)"
  - "Three graduated vertical manometer tubes"
  - "Water supply with adjustable flow rate and outlet valve"
  - "1 L measuring cylinder and stopwatch"
  - "Ruler graduated in millimetres"
---

## Principle

Water, an incompressible fluid, flows steadily through a horizontal tube whose cross-section decreases from $S_1$ (upstream) to $S_2$ (throat). The volume flow rate is conserved:

$$
D_v = v_1 S_1 = v_2 S_2
$$

The water therefore moves faster where the tube is narrower. Along a horizontal streamline, Bernoulli's equation is written:

$$
P_1 + \tfrac{1}{2}\rho v_1^2 = P_2 + \tfrac{1}{2}\rho v_2^2
$$

If the speed increases, the pressure decreases: this is the **Venturi effect**. Each manometer tube shows the pressure beneath its tapping as a height of water, $P = P_\mathrm{atm} + \rho g h$.

## Method

1. Observe the set-up with the water at rest: the three levels are identical, so the pressure is the same everywhere in the horizontal tube.
2. Open the outlet valve and wait for steady flow. Measure the flow rate by collecting the water in the measuring cylinder for a timed interval.
3. Record the heights $h_1$ (upstream) and $h_2$ (throat), then the height difference $\Delta h = h_1 - h_2$. Check that the downstream level almost returns to the upstream level.
4. Calculate $v_1$ and $v_2$ from the flow rate, then the pressure difference predicted by Bernoulli's equation. Compare it with $\rho g \Delta h$.
5. Use the tube as a flow meter: find $D_v$ from the measurement of $\Delta h$ alone.

## Analysis

With $D_v = 10.0\ \mathrm{L \cdot min^{-1}} = 1.67 \times 10^{-4}\ \mathrm{m^3 \cdot s^{-1}}$, $S_1 = 3.14 \times 10^{-4}\ \mathrm{m^2}$ and $S_2 = 1.13 \times 10^{-4}\ \mathrm{m^2}$:

$$
v_1 = \frac{D_v}{S_1} = 0.53\ \mathrm{m \cdot s^{-1}}
$$

$$
v_2 = \frac{D_v}{S_2} = 1.47\ \mathrm{m \cdot s^{-1}}
$$

Bernoulli's equation gives, with $\rho = 1.00 \times 10^{3}\ \mathrm{kg \cdot m^{-3}}$:

$$
P_1 - P_2 = \tfrac{1}{2}\rho\,(v_2^2 - v_1^2) = 0.95\ \mathrm{kPa}
$$

(calculation carried out with unrounded speeds), that is $\Delta h = \dfrac{P_1 - P_2}{\rho g} = 9.6\ \mathrm{cm}$ with $g = 9.81\ \mathrm{m \cdot s^{-2}}$, the value read on the tubes. Conversely, the height difference gives the speed at the throat, then the flow rate $D_v = v_2 S_2$:

$$
v_2^2 = \frac{2 g \Delta h}{1 - (S_2 / S_1)^2}
$$

## Questions

1. Why does the level in the downstream tube rise almost to the height of the upstream tube?
2. In the animation, reduce the flow rate from 10 to 5 L/min. What happens to the height difference?
3. Widen the throat to 16 mm at constant flow rate. How do $v_2$ and $\Delta h$ change? Does the flow meter remain precise?

<details>
<summary>Show answers</summary>

1. Downstream, the tube returns to cross-section $S_1$: the speed goes back to $v_1$ and, according to Bernoulli, so does the pressure. The slight difference seen in practice comes from friction, which the model neglects.
2. The speeds are halved, so the pressure difference, proportional to $v^2$, is divided by 4: $\Delta h$ falls from 9.6 cm to 2.4 cm.
3. $v_2$ drops to $0.83\ \mathrm{m \cdot s^{-1}}$ and $\Delta h$ to about 2.1 cm. A smaller height difference is read with a larger relative uncertainty: a narrow throat makes the flow meter more sensitive.

</details>

## Safety

Check that the fittings are tight before turning on the water and keep electrical equipment away from the bench. Wipe up any puddle on the floor immediately.
