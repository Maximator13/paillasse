---
titre: "RC circuit: charging and discharging a capacitor"
description: "Current in the time-varying regime, capacitor model, differential equation of the series RC circuit, time constant and capacitive sensors."
niveau: terminale
theme: ondes
ordre: 24
duree: "30 min"
motsCles: ["capacitor", "capacitance", "RC circuit", "time constant", "differential equation", "capacitive sensor"]
tp: ["circuit-rc"]
---

> **The essentials.** A capacitor stores opposite charges on its two plates, with $q = C\,u_C$: the voltage across it cannot change instantaneously. In a series RC circuit, the voltage across the capacitor changes **exponentially**, at a rate set by the **time constant** $\tau = RC$. After $5\tau$, the charging or discharging is practically complete.

## 1. Current in the time-varying regime

An electric current is a collective motion of charge carriers. When the current changes over time (**time-varying** regime), it is defined at each instant as the rate of flow of electric charge.

> **Definition.** The current through a cross-section of a conductor is the derivative with respect to time of the charge $q$ passing through it: $i(t) = \dfrac{\mathrm{d}q}{\mathrm{d}t}$, with $i$ in amperes ($\mathrm{A}$), $q$ in coulombs ($\mathrm{C}$) and $t$ in seconds ($\mathrm{s}$).

In the **steady** state (constant current), we recover the relation seen in Première: $q = I \times \Delta t$.

## 2. Capacitive behaviour and the capacitor model

A **capacitor** is made of two conductors, the **plates**, separated by an insulator (the dielectric). When a current arrives at one plate, the charges cannot cross the insulator: they build up. Plate A carries the charge $q_A = q$, plate B the opposite charge $q_B = -q$. The capacitor remains neutral overall.

We speak of **capacitive behaviour** whenever charges of opposite signs build up on two conducting surfaces facing each other, separated by an insulator: two neighbouring tracks on a printed circuit board, a finger placed on a touchscreen, a storm cloud and the ground.

> **Capacitor model.** The charge $q$ on plate A is proportional to the voltage $u_C = u_{AB}$ across the capacitor: $q = C\,u_C$. The positive constant $C$ is the **capacitance**, in farads ($\mathrm{F}$). It depends only on the geometry of the capacitor and on its insulator: it increases with the area of the plates and decreases when they are moved apart.

The farad is a very large unit: common capacitances range from the picofarad ($1\ \mathrm{pF} = 10^{-12}\ \mathrm{F}$) to the millifarad. Supercapacitors reach a few thousand farads.

In the passive sign convention (current $i$ directed towards plate A), combining the two previous relations:

$$
i = \frac{\mathrm{d}q}{\mathrm{d}t} = C\,\frac{\mathrm{d}u_C}{\mathrm{d}t}
$$

Essential consequence: a sudden change in $u_C$ would require an infinite current. **The voltage across a capacitor is a continuous function of time.** In the steady state ($u_C$ constant), $i = 0$: the capacitor behaves like an open switch.

## 3. Charging a capacitor in a series RC circuit

An ideal voltage source of electromotive force $E$, a resistor of resistance $R$ and an initially uncharged capacitor are connected in series. At $t = 0$, the switch is closed.

**Setting up the differential equation.** Kirchhoff's voltage law gives $E = u_R + u_C$. Ohm's law gives $u_R = R\,i = RC\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}$. Hence:

$$
RC\,\frac{\mathrm{d}u_C}{\mathrm{d}t} + u_C = E
\qquad\text{that is}\qquad
\frac{\mathrm{d}u_C}{\mathrm{d}t} + \frac{u_C}{\tau} = \frac{E}{\tau}
\quad\text{with}\quad \tau = RC
$$

**Solving.** This is a first-order linear differential equation with constant coefficients. Its solutions are of the form $u_C(t) = A\,\mathrm{e}^{-t/\tau} + E$. The initial condition $u_C(0) = 0$ (continuity of the voltage) requires $A = -E$:

$$
u_C(t) = E\left(1 - \mathrm{e}^{-t/\tau}\right)
$$

The current follows: $i(t) = C\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t} = \dfrac{E}{R}\,\mathrm{e}^{-t/\tau}$. It equals $E/R$ just after the switch is closed, then tends to zero: the current, unlike the voltage, can change suddenly.

## 4. Discharging a capacitor

The capacitor, charged to the voltage $E$, is now connected to the resistor $R$ alone (the source is removed from the circuit) at time $t = 0$, the current $i$ keeping the same direction as during charging. Kirchhoff's voltage law becomes $u_R + u_C = 0$, hence:

$$
RC\,\frac{\mathrm{d}u_C}{\mathrm{d}t} + u_C = 0
$$

With the initial condition $u_C(0) = E$, the solution is:

$$
u_C(t) = E\,\mathrm{e}^{-t/\tau}
\qquad\text{and}\qquad
i(t) = -\frac{E}{R}\,\mathrm{e}^{-t/\tau}
$$

The minus sign shows that the current flows in the opposite direction to that of charging: the stored energy is dissipated by Joule heating in the resistor.

| | Charging | Discharging |
|---|---|---|
| Equation | $\tau\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t} + u_C = E$ | $\tau\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t} + u_C = 0$ |
| Initial condition | $u_C(0) = 0$ | $u_C(0) = E$ |
| Solution | $u_C = E\left(1 - \mathrm{e}^{-t/\tau}\right)$ | $u_C = E\,\mathrm{e}^{-t/\tau}$ |
| Value at $t = \tau$ | $0.63\,E$ | $0.37\,E$ |
| Final state | $u_C = E$, $i = 0$ | $u_C = 0$, $i = 0$ |

## 5. The time constant

> **Definition.** The time constant of a series RC circuit is $\tau = RC$. It is expressed in seconds: $\mathrm{\Omega \cdot F = s}$.

The product $RC$ does have the dimensions of time: $R = u/i$ and $C = q/u = i\,\Delta t/u$, so $RC$ is expressed in $\mathrm{s}$.

Three methods for determining it from an experimental curve $u_C(t)$, obtained for example with a data acquisition board:

1. **Value at 63%.** During charging, $\tau$ is the time at which $u_C = 0.63\,E$ (because $1 - \mathrm{e}^{-1} \approx 0.63$). During discharging, it is the time at which $u_C = 0.37\,E$.
2. **Tangent at the origin.** The tangent to the curve at $t = 0$ meets the horizontal asymptote ($u_C = E$ for charging, $u_C = 0$ for discharging) at the time $t = \tau$.
3. **Calculation.** If $R$ and $C$ are known, $\tau = RC$.

After $5\tau$, $\mathrm{e}^{-5} \approx 0.007$: the difference from the final value is less than 1%. The steady state is then considered to have been reached. The larger $R$ or $C$, the slower the charging.

## 6. Capacitive sensors

The capacitance of a capacitor depends on the facing area of its plates, on the distance between them and on the insulator separating them. Any physical quantity that modifies one of these parameters changes $C$, and therefore the time constant $\tau = RC$ of a circuit, which electronics can measure easily. This is the principle of **capacitive sensors**:

- **touchscreen**: the finger, a conductor, modifies the local capacitance between transparent electrodes;
- smartphone **accelerometer**: a moving plate shifts under the effect of acceleration and changes the distance between the plates;
- **humidity sensor**: the insulator absorbs water vapour, which modifies the capacitance;
- **level sensor** or proximity sensor, condenser **microphone** (the diaphragm is a moving plate), keyboard keys.

## Worked example

A capacitor of capacitance $C = 47\ \mathrm{\mu F}$, initially uncharged, is charged through a resistor $R = 10\ \mathrm{k\Omega}$ by an ideal voltage source $E = 5.0\ \mathrm{V}$.

1. Calculate the time constant $\tau$.
2. Calculate the current just after the switch is closed.
3. At what time does the voltage $u_C$ reach $4.0\ \mathrm{V}$?
4. What is the charge $q$ on the capacitor at the end of charging?

<details>
<summary>Show the solution</summary>

1. $\tau = RC = 10 \times 10^{3} \times 47 \times 10^{-6} = 0.47\ \mathrm{s}$.

2. At $t = 0$, $u_C = 0$ (continuity), so the whole voltage is across the resistor:

$$
i(0) = \frac{E}{R} = \frac{5.0}{10 \times 10^{3}} = 5.0 \times 10^{-4}\ \mathrm{A} = 0.50\ \mathrm{mA}
$$

3. We solve $E\left(1 - \mathrm{e}^{-t_1/\tau}\right) = 4.0$, that is $\mathrm{e}^{-t_1/\tau} = 1 - \dfrac{4.0}{5.0} = 0.20$:

$$
t_1 = -\tau \ln(0.20) = \tau \ln 5 = 0.47 \times 1.61 = 0.76\ \mathrm{s}
$$

4. At the end of charging, $u_C = E$:

$$
q = C\,E = 47 \times 10^{-6} \times 5.0 = 2.4 \times 10^{-4}\ \mathrm{C}
$$

</details>

## Key points

- In the time-varying regime, $i = \dfrac{\mathrm{d}q}{\mathrm{d}t}$.
- Capacitor model: $q = C\,u_C$, so $i = C\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}$ in the passive sign convention.
- The voltage across a capacitor is **continuous**; the current can change suddenly.
- Charging: $u_C = E\left(1 - \mathrm{e}^{-t/\tau}\right)$. Discharging: $u_C = E\,\mathrm{e}^{-t/\tau}$.
- Time constant $\tau = RC$: 63% of the change is completed in $\tau$, almost all of it in $5\tau$.
- A capacitive sensor converts a physical quantity into a change in capacitance.

## Common mistakes

- Forgetting the powers of ten: $\mathrm{\mu F} = 10^{-6}\ \mathrm{F}$, $\mathrm{k\Omega} = 10^{3}\ \mathrm{\Omega}$.
- Writing that $u_C$ jumps to $E$ when the switch is closed: it is the current that jumps to $E/R$, not the voltage.
- Reading $\tau$ at 63% of $E$ on a **discharge** curve: you must look for $0.37\,E$.
- Believing that the capacitor is charged at $t = \tau$: it is only 63% charged, you have to wait about $5\tau$.
- Getting the sign wrong in Kirchhoff's voltage law: check that the solution tends to the correct final value.
