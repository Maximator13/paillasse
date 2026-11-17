---
titre: "Cooling of a beaker of hot water (Newton's law)"
description: "Track the temperature of hot water cooling in air, watch the thermal flux weaken and measure the characteristic time."
niveau: terminale
theme: energie
matiere: physique
ordre: 14
duree: "1 h 30"
chapitre: "transferts-thermiques"
objectifs:
  - "Track how the temperature of a system in contact with a thermostat changes over time"
  - "Relate the thermal flux to the temperature difference with the air"
  - "Determine the characteristic time using the tangent at the origin and the 63% method"
  - "Compare the measurements with the exponential model derived from the first law"
materiel:
  - "150 mL beaker standing on a cork mat"
  - "Kettle and tap water"
  - "Thermometer or temperature probe connected to an interface"
  - "Second thermometer for the room temperature"
  - "Stopwatch"
  - "Balance accurate to the nearest gram"
---

## Principle

A beaker containing a mass $m$ of hot water is left in the air of the room, which has a constant temperature $T_{\mathrm{ext}}$: the air acts as a **thermostat**. The water, being hotter, transfers energy to it through the exchange surface $S$. Newton's empirical law gives the thermal flux received by the water:

$$
\Phi = h\,S\,(T_{\mathrm{ext}} - T)
$$

where $h$ is the heat transfer coefficient, in $\mathrm{W \cdot m^{-2} \cdot K^{-1}}$. This flux is negative as long as the water is hotter than the air, and its absolute value decreases as the difference shrinks: the cooling slows down of its own accord.

## Method

1. Weigh out $m = 100\ \mathrm{g}$ of hot water poured into the beaker standing on the cork. Record the room temperature $T_{\mathrm{ext}}$.
2. Place the thermometer in the water, wait for its column to settle at $T_0$ and start the stopwatch: this is the instant $t = 0$.
3. Record the temperature every 2 min 30 s for 90 min, without stirring or moving the beaker. In the animation, time is speeded up 400 times.
4. Plot $T = f(t)$, then draw the tangent at the origin and the asymptote $T = T_{\mathrm{ext}}$. Read $\tau$ from the abscissa of their intersection and check that at this time the difference with the air has fallen by 63%.
5. Superimpose the exponential model on the measurements.

## Analysis

The water is an incompressible system, with a temperature assumed to be uniform, which exchanges energy only by heat transfer (evaporation is neglected). The first law is written:

$$
m\,c\,\frac{\mathrm{d}T}{\mathrm{d}t} = h\,S\,(T_{\mathrm{ext}} - T)
$$

Setting $\tau = \dfrac{m\,c}{h\,S}$, the characteristic time, we obtain a first-order differential equation:

$$
\frac{\mathrm{d}T}{\mathrm{d}t} + \frac{T}{\tau} = \frac{T_{\mathrm{ext}}}{\tau}
$$

The solution satisfying $T(0) = T_0$ is:

$$
T(t) = T_{\mathrm{ext}} + (T_0 - T_{\mathrm{ext}})\,\mathrm{e}^{-t/\tau}
$$

With $m = 0.100\ \mathrm{kg}$, $c = 4180\ \mathrm{J \cdot kg^{-1} \cdot K^{-1}}$, $h = 20\ \mathrm{W \cdot m^{-2} \cdot K^{-1}}$ and $S = 1.2 \times 10^{-2}\ \mathrm{m^2}$, we find $\tau = 1.7 \times 10^{3}\ \mathrm{s}$, which is about 29 min.

For $T_0 = 80\ \mathrm{°C}$ and $T_{\mathrm{ext}} = 20\ \mathrm{°C}$:

| Time | Temperature | Flux released to the air |
|---|---|---|
| $t = 0$ | 80.0 °C | 14.4 W |
| $t = \tau$ | 42.1 °C | 5.3 W |
| $t = 90\ \mathrm{min}$ | 22.7 °C | 0.6 W |

At $t = \tau$, 37% of the initial difference remains: $20 + 0.37 \times 60 = 42\ \mathrm{°C}$. After $5\tau$, thermal equilibrium is reached to within 1%.

## Questions

1. Why does the curve become less and less steep?
2. In the animation, vary the air temperature, then the initial temperature of the water. Does the characteristic time change? What about the initial flux?
3. Set the heat transfer coefficient to 40 (ventilated beaker), then to 10 (insulated beaker). How do $\tau$ and the shape of the curve change?

<details>
<summary>Show answers</summary>

1. The gradient $\dfrac{\mathrm{d}T}{\mathrm{d}t}$ is proportional to the flux, and therefore to the difference $T_{\mathrm{ext}} - T$. The closer the water gets to the air temperature, the less energy it transfers to the air per second.
2. $\tau = \dfrac{m\,c}{h\,S}$ depends on neither $T_{\mathrm{ext}}$ nor $T_0$: it remains equal to 29 min. The initial flux, however, is proportional to the difference $T_0 - T_{\mathrm{ext}}$: it increases as this difference grows.
3. $\tau$ is inversely proportional to $h$: it drops to 14.5 min for $h = 40$ (the curve falls quickly towards the asymptote) and rises to 58 min for $h = 10$ (after 90 min, the water is still far from equilibrium).

</details>

## Safety

Water straight from the kettle can cause burns: pour slowly, with the beaker standing on the bench, and do not pick it up with bare hands during the first few minutes.
