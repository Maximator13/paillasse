---
titre: "Charging and discharging a capacitor in an RC circuit"
description: "Flip the switch, follow the electrons and the voltage across the capacitor, then measure the time constant of the circuit."
niveau: terminale
theme: ondes
matiere: physique
ordre: 20
duree: "1 h 30"
chapitre: "circuit-rc"
objectifs:
  - "Build a series RC circuit and record the voltage across the capacitor"
  - "Relate the direction of the current to the motion of the charge carriers and to the charges on the plates"
  - "Determine the time constant using the tangent at the origin and the 63% method"
  - "Check the relationship between the time constant, R and C"
materiel:
  - "Adjustable DC voltage supply (0 to 6 V)"
  - "500 µF capacitor (decade box, 200 to 1000 µF)"
  - "2.0 kΩ resistor (decade box, 1 to 4 kΩ)"
  - "Two-way switch"
  - "Data logger or storage oscilloscope"
  - "Connecting leads and circuit board"
---

## Principle

A capacitor is made of two conducting plates separated by an insulator. When a voltage $u_C$ is applied across it, its plates carry the charges $+q$ and $-q$, with $q = C\,u_C$. The current is the rate of flow of charge: $i = \dfrac{\mathrm{d}q}{\mathrm{d}t} = C\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}$.

In the series RC circuit supplied by a source of voltage $E$, Kirchhoff's voltage law gives $R\,i + u_C = E$, which leads to the differential equation:

$$
R\,C\,\frac{\mathrm{d}u_C}{\mathrm{d}t} + u_C = E
$$

The product $\tau = R\,C$, which has the dimension of time, is the **time constant** of the circuit.

## Method

1. Build the circuit: supply, two-way switch K, resistor and capacitor in series. Connect the data logger input across the capacitor.
2. Set $E = 5.0\ \mathrm{V}$, start a 10 s recording, then move K to position 1: the capacitor charges.
3. After 5 s, move K to position 2: the supply is out of the circuit and the capacitor discharges through the resistor.
4. On the charging curve, draw the tangent at the origin and the asymptote $u_C = E$: they intersect at time $\tau$. Check with the 63% method.
5. Compare the measured value with the product $R\,C$, then repeat with other values of $R$ and $C$.

## Analysis

With the capacitor initially uncharged, the solution of the differential equation for charging is:

$$
u_C(t) = E\left(1 - \mathrm{e}^{-t/\tau}\right)
$$

$$
i(t) = \frac{E}{R}\,\mathrm{e}^{-t/\tau}
$$

For discharging from $u_C = E$: $u_C(t) = E\,\mathrm{e}^{-t/\tau}$ and $i(t) = -\dfrac{E}{R}\,\mathrm{e}^{-t/\tau}$. The current reverses direction.

With $R = 2.0\ \mathrm{k\Omega}$ and $C = 500\ \mathrm{\mu F}$:

$$
\tau = 2.0 \times 10^{3} \times 500 \times 10^{-6} = 1.0\ \mathrm{s}
$$

Values to find on the animation:

| Time | $u_C$ during charging | Reading |
|---|---|---|
| $t = 0$ | $0\ \mathrm{V}$, with $i = E/R = 2.5\ \mathrm{mA}$ | the current is at its maximum |
| $t = \tau$ | $0.63\,E = 3.16\ \mathrm{V}$ | 63% method |
| $t = 5\,\tau$ | $0.993\,E = 4.97\ \mathrm{V}$ | charging considered complete |

At the end of charging, the positive plate carries $q = C\,E = 2.5\ \mathrm{mC}$.

## Questions

1. Why is the current at its maximum at the instant the circuit is closed, even though $u_C$ is zero?
2. In the animation, double $R$ without changing $C$. How do $\tau$ and the initial current change? Does the final charge $q$ change?
3. Set $R = 4.0\ \mathrm{k\Omega}$ and $C = 1000\ \mathrm{\mu F}$. Is the capacitor fully charged when K is switched? Does changing $E$ alter how long charging takes?

<details>
<summary>Show answers</summary>

1. At $t = 0$, $u_C = 0$: the whole voltage $E$ appears across the resistor, so $i = E/R$. Then $u_C$ increases, the voltage $R\,i = E - u_C$ decreases and the current dies away.
2. $\tau = R\,C$ doubles (2.0 s) and the initial current $E/R$ is halved (1.25 mA). The final charge $q = C\,E$ does not depend on $R$, but it is reached more slowly: when K is switched ($t = 5\ \mathrm{s} = 2.5\,\tau$), we read $q = 2.29\ \mathrm{mC}$ instead of $2.48\ \mathrm{mC}$.
3. $\tau = 4.0\ \mathrm{s}$: at $t = 5\ \mathrm{s}$, $u_C = E\,(1 - \mathrm{e}^{-1.25}) \approx 0.71\,E$, so charging is incomplete. Changing $E$ alters the asymptote and the current, not $\tau$: charging takes the same time.

</details>

## Safety

Observe the polarity of electrolytic capacitors (marked terminal connected to the lower potential). Discharge the capacitor before dismantling the circuit.
