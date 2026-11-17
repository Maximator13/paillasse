---
titre: "Measuring Archimedes' upthrust"
description: "Lower a solid hanging from a newton meter into a measuring cylinder: the level rises, the spring relaxes and the upthrust can be measured."
niveau: terminale
theme: mouvement
matiere: physique
ordre: 12
duree: "1 h"
chapitre: "mecanique-des-fluides"
objectifs:
  - "Measure Archimedes' upthrust with a newton meter"
  - "Relate the upthrust to the immersed volume and to the density of the fluid"
  - "Explain its origin by the pressure difference between the bottom and the top of the solid"
  - "Predict whether a solid sinks or floats"
materiel:
  - "Retort stand, bosshead and horizontal rod"
  - "2 N newton meter"
  - "40 cm³ aluminium cylinder fitted with a hook, thin thread"
  - "250 mL measuring cylinder"
  - "Water, salt water, ethanol"
  - "Balance and vernier calliper (to check the volume)"
---

## Principle

A solid immersed in a fluid at rest is subjected, by that fluid, to pressure forces over its whole surface. Their resultant is **Archimedes' upthrust** (the buoyant force): vertical, directed upwards, with a magnitude equal to the weight of the fluid displaced.

$$
P_A = \rho_{\text{fluid}}\, V_{\text{immersed}}\, g
$$

A cylinder is hung from a newton meter. In air, the meter shows the weight $P$ of the solid. Once the solid is immersed and at rest, it shows a smaller value $F$: since the sum of the forces is zero, $P = F + P_A$, so $P_A = P - F$. At the same time, the measuring cylinder gives the immersed volume, simply by reading the rise in the level.

## Method

1. Hang the cylinder from the newton meter and record its weight $P$ in air. Note the initial volume of liquid in the measuring cylinder: $150\ \mathrm{mL}$.
2. Slowly lower the bosshead to immerse the solid little by little, without touching the walls. Record several pairs of values (volume read, value $F$ on the newton meter).
3. With the solid fully immersed, read the new level. The difference from the initial level is the displaced volume $V$.
4. Look at the diagram of the pressure forces: compare the arrows on the top, on the bottom and on the sides.
5. Calculate $P - F$ and compare it with $\rho\, V\, g$.

## Analysis

For the aluminium cylinder ($\rho_{\text{solid}} = 2.7\ \mathrm{g \cdot cm^{-3}}$, $V = 40\ \mathrm{cm^3}$) in water:

| Quantity | Value |
|---|---|
| Weight in air $P$ | $1.06\ \mathrm{N}$ |
| Newton meter, solid immersed $F$ | $0.67\ \mathrm{N}$ |
| Final level | $190\ \mathrm{mL}$, so $V = 40\ \mathrm{mL} = 4.0 \times 10^{-5}\ \mathrm{m^3}$ |
| Measured upthrust $P - F$ | $0.39\ \mathrm{N}$ |

The calculation gives $\rho\, V\, g = 1.0 \times 10^{3} \times 4.0 \times 10^{-5} \times 9.81 = 0.39\ \mathrm{N}$: the agreement is very good.

On the graph, the upthrust is a straight line through the origin, with gradient $\rho\, g$: it is proportional to the immersed volume. The reading on the newton meter decreases by the same amount, the sum $F + P_A$ remaining equal to $P$.

The origin of the upthrust can be read from the law of fluid statics. Between the top face and the bottom face of the cylinder, of height $h = 5.0\ \mathrm{cm}$ and cross-section $S = 8.0\ \mathrm{cm^2}$, the pressure increases by $\Delta p = \rho\, g\, h = 491\ \mathrm{Pa}$. The resultant is $\Delta p \times S = 0.39\ \mathrm{N}$: this is $\rho\, V\, g$ again, since $V = S\, h$.

## Questions

1. Once the solid is fully immersed, does the upthrust change if it is lowered further?
2. In the animation, set the density of the liquid to $1.30\ \mathrm{g \cdot cm^{-3}}$. How do the gradient of the $P_A$ line and the final reading on the newton meter change?
3. Set the density of the solid to $0.6\ \mathrm{g \cdot cm^{-3}}$ (wood) in water. What does the newton meter read at the end of the experiment? What fraction of the solid is immersed?

<details>
<summary>Show answers</summary>

1. No. The pressure increases on both faces, but their difference $\rho\, g\, h$ depends only on the height of the solid: the upthrust remains equal to $\rho\, V\, g$.
2. The gradient $\rho\, g$ increases: the final upthrust goes from $0.39\ \mathrm{N}$ to $0.51\ \mathrm{N}$ and the newton meter now reads only $0.55\ \mathrm{N}$.
3. The newton meter reads zero: the solid floats, and the upthrust exactly balances the weight ($0.24\ \mathrm{N}$). The immersed volume is $24\ \mathrm{cm^3}$, that is 60% of the solid, the ratio of the densities.

</details>

## Safety

Ethanol is flammable: keep the bottle stoppered, away from any flame.
