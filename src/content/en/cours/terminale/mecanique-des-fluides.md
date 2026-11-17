---
titre: "Fluid mechanics: Archimedes' upthrust and fluid flow"
description: "Archimedes' upthrust, volume flow rate, conservation of flow rate and Bernoulli's equation: understand why a fluid speeds up where the pipe narrows."
niveau: terminale
theme: mouvement
ordre: 17
duree: "25 min"
motsCles: ["Archimedes' upthrust", "volume flow rate", "incompressible fluid", "Bernoulli's equation", "Venturi effect"]
tp: ["poussee-archimede", "effet-venturi"]
---

> **In brief.** A body immersed in a fluid experiences a vertical upward force, **Archimedes' upthrust**, equal to the weight of the fluid displaced. When an incompressible fluid flows steadily, its **volume flow rate** is conserved: it speeds up where the pipe narrows. **Bernoulli's equation** then relates speed, pressure and height: where the speed increases, the pressure decreases (**Venturi effect**).

## 1. Archimedes' upthrust

A fluid (liquid or gas) exerts pressure forces on any surface in contact with it. On an immersed body, the pressure is greater at the bottom than at the top, because it increases with depth: the resultant of these forces points upwards.

> **Law.** Any body immersed, fully or partially, in a fluid at rest experiences from that fluid a vertical force, directed upwards, whose magnitude is equal to the weight of the volume of fluid displaced:
>
> $$
> \vec{\Pi} = -\rho_{\text{fluid}}\,V_{\text{imm}}\,\vec{g} \qquad\text{that is}\qquad \Pi = \rho_{\text{fluid}}\,V_{\text{imm}}\,g
> $$
>

| Quantity | Meaning | Unit |
|---|---|---|
| $\Pi$ | magnitude of Archimedes' upthrust | $\mathrm{N}$ |
| $\rho_{\text{fluid}}$ | density of the **fluid** (not of the body) | $\mathrm{kg \cdot m^{-3}}$ |
| $V_{\text{imm}}$ | volume of the **immersed** part of the body | $\mathrm{m^3}$ |
| $g$ | gravitational field strength | $\mathrm{N \cdot kg^{-1}}$ |

Example: a block of $1.0\ \mathrm{L}$ fully immersed in water ($\rho = 1.0 \times 10^{3}\ \mathrm{kg \cdot m^{-3}}$) experiences $\Pi = 1.0 \times 10^{3} \times 1.0 \times 10^{-3} \times 9.81 \approx 9.8\ \mathrm{N}$, whatever it is made of.

A body released from rest in a fluid, subject to its weight $P = \rho_{\text{body}}\,V\,g$ and to Archimedes' upthrust, behaves in a way determined by comparing the densities:

- $\rho_{\text{body}} > \rho_{\text{fluid}}$: the weight wins, the body **sinks**;
- $\rho_{\text{body}} < \rho_{\text{fluid}}$: the body **rises**, then floats in equilibrium with only part of it immersed, such that $\rho_{\text{fluid}}\,V_{\text{imm}} = \rho_{\text{body}}\,V$.

In air ($\rho \approx 1.2\ \mathrm{kg \cdot m^{-3}}$), Archimedes' upthrust is almost always negligible compared with the weight, except for balloons filled with helium or hot air.

## 2. Steady flow and volume flow rate

The flow of a fluid is described by the velocity $\vec{v}$ of its particles at each point. **Streamlines** are the curves that are tangent to this velocity vector at every point.

> **Definition.** A flow is **steady** (or stationary) if, at any fixed point in space, the velocity and the pressure of the fluid do not depend on time.

In steady flow, the streamlines do not move: they coincide with the paths of the fluid particles. A particle may nevertheless accelerate as it moves from one point to another.

> **Definition.** The **volume flow rate** $D_V$ is the volume of fluid that passes through a cross-section of the pipe per unit time:
>
> $$
> D_V = \frac{V}{\Delta t} = v \times S
> $$
>
> with $D_V$ in $\mathrm{m^3 \cdot s^{-1}}$, $v$ the mean speed of the fluid across the section in $\mathrm{m \cdot s^{-1}}$ and $S$ the area of the cross-section in $\mathrm{m^2}$.

The $\mathrm{L \cdot s^{-1}}$ and the $\mathrm{m^3 \cdot h^{-1}}$ are also used: $1\ \mathrm{L \cdot s^{-1}} = 10^{-3}\ \mathrm{m^3 \cdot s^{-1}}$.

## 3. Conservation of flow rate

A fluid is **incompressible** if its density is constant: a given volume of fluid can be neither compressed nor expanded. Liquids are very well described by this model; a gas fits it as long as its speed remains small compared with the speed of sound.

> **Law.** In steady flow, the volume flow rate of an incompressible fluid is conserved along a pipe with no leaks and no branches. Between two cross-sections A and B:
>
> $$
> D_V = v_A\,S_A = v_B\,S_B
> $$
>

The volume that enters at A during $\Delta t$ must come out at B during the same time interval, since the fluid can neither accumulate nor be compressed between the two.

Direct consequence: **the speed is inversely proportional to the cross-sectional area**. For a circular pipe, $S = \pi r^2$: dividing the diameter by 2 divides the cross-sectional area by 4 and **multiplies the speed by 4**. This is what you do when you pinch the nozzle of a garden hose so that the jet reaches further.

## 4. Bernoulli's equation

> **Law (Bernoulli's equation).** For the steady flow of an **incompressible** and **ideal** fluid (negligible friction), at any point on a given streamline:
>
> $$
> p + \frac{1}{2}\,\rho\,v^2 + \rho\,g\,z = \text{constant}
> $$
>

| Term | Interpretation | Unit |
|---|---|---|
| $p$ | pressure of the fluid | $\mathrm{Pa}$ |
| $\dfrac{1}{2}\,\rho\,v^2$ | kinetic energy per unit volume | $\mathrm{J \cdot m^{-3}} = \mathrm{Pa}$ |
| $\rho\,g\,z$ | gravitational potential energy per unit volume, $(Oz)$ axis vertical and pointing upwards | $\mathrm{J \cdot m^{-3}} = \mathrm{Pa}$ |

Each term has the dimensions of a pressure. Bernoulli's equation expresses the **conservation of energy** along a streamline: a gain in kinetic or potential energy is paid for by a drop in pressure.

Between two points A and B on the same streamline:

$$
p_A + \frac{1}{2}\,\rho\,v_A^2 + \rho\,g\,z_A = p_B + \frac{1}{2}\,\rho\,v_B^2 + \rho\,g\,z_B
$$

Useful special cases:

- **fluid at rest** ($v_A = v_B = 0$): we recover the law of fluid statics, $p_A - p_B = \rho\,g\,(z_B - z_A)$;
- **draining a tank** (free surface and outlet at atmospheric pressure, negligible speed at the surface): the exit speed is $v = \sqrt{2\,g\,h}$ (Torricelli's formula), where $h$ is the height of liquid above the outlet.

## 5. The Venturi effect

In a **horizontal** pipe ($z_A = z_B$), Bernoulli's equation simplifies to:

$$
p_A - p_B = \frac{1}{2}\,\rho\,\left(v_B^2 - v_A^2\right)
$$

> **Venturi effect.** In a constriction, the speed of the fluid increases (conservation of flow rate), so its pressure decreases (Bernoulli's equation).

A **Venturi tube** is a pipe fitted with a constriction. By measuring the pressure difference between the wide part and the constriction (for example with two vertical tubes in which the liquid heights differ), we can work back to the speeds, and hence to the flow rate: it is a **flow meter**.

This effect is found in laboratory water aspirators (the low pressure in the constriction draws the air out of a flask), sprayers, carburettors, or the drawing together of two boats sailing side by side.

## Worked example

Water ($\rho = 1.00 \times 10^{3}\ \mathrm{kg \cdot m^{-3}}$) flows steadily through a horizontal Venturi tube with a flow rate $D_V = 2.4\ \mathrm{L \cdot s^{-1}}$. The wide part A has a cross-sectional area $S_A = 12\ \mathrm{cm^2}$, the constriction B a cross-sectional area $S_B = 3.0\ \mathrm{cm^2}$. The pressure at A is $p_A = 1.50 \times 10^{5}\ \mathrm{Pa}$. The water is treated as an ideal, incompressible fluid.

1. Calculate the speeds $v_A$ and $v_B$.
2. Deduce the pressure $p_B$ in the constriction.

<details>
<summary>Show the solution</summary>

1. We convert: $D_V = 2.4 \times 10^{-3}\ \mathrm{m^3 \cdot s^{-1}}$, $S_A = 12 \times 10^{-4}\ \mathrm{m^2}$, $S_B = 3.0 \times 10^{-4}\ \mathrm{m^2}$.

$$
v_A = \frac{D_V}{S_A} = \frac{2.4 \times 10^{-3}}{12 \times 10^{-4}} = 2.0\ \mathrm{m \cdot s^{-1}}
\qquad
v_B = \frac{D_V}{S_B} = \frac{2.4 \times 10^{-3}}{3.0 \times 10^{-4}} = 8.0\ \mathrm{m \cdot s^{-1}}
$$

The cross-sectional area is divided by 4, and the speed is indeed multiplied by 4 (conservation of flow rate).

2. The pipe is horizontal ($z_A = z_B$), so Bernoulli's equation gives:

$$
p_B = p_A - \frac{1}{2}\,\rho\,\left(v_B^2 - v_A^2\right) = 1.50 \times 10^{5} - \frac{1}{2} \times 1.00 \times 10^{3} \times \left(8.0^2 - 2.0^2\right)
$$

$$
p_B = 1.50 \times 10^{5} - 3.0 \times 10^{4} = 1.20 \times 10^{5}\ \mathrm{Pa}
$$

The pressure drops by $3.0 \times 10^{4}\ \mathrm{Pa}$ in the constriction: this is the Venturi effect.

</details>

## Key points

- Archimedes' upthrust: vertical, upwards, $\Pi = \rho_{\text{fluid}}\,V_{\text{imm}}\,g$.
- Steady flow: the velocity and pressure at a fixed point do not depend on time.
- Volume flow rate: $D_V = v\,S$, in $\mathrm{m^3 \cdot s^{-1}}$.
- Incompressible fluid in steady flow: $v_A\,S_A = v_B\,S_B$, the speed increases when the cross-sectional area decreases.
- Bernoulli's equation (ideal, incompressible fluid, steady flow, same streamline): $p + \frac{1}{2}\rho v^2 + \rho g z = \text{const}$.
- Venturi effect: where the speed increases, the pressure decreases.

## Common mistakes

- Using the density of the **body** instead of that of the **fluid** in Archimedes' upthrust, or the total volume instead of the **immersed** volume for a floating body.
- Forgetting the conversions: $1\ \mathrm{cm^2} = 10^{-4}\ \mathrm{m^2}$ and $1\ \mathrm{L} = 10^{-3}\ \mathrm{m^3}$.
- Believing that the speed is proportional to the diameter: it is inversely proportional to the **cross-sectional area**, and therefore to the **square** of the diameter.
- Thinking that a faster fluid "pushes harder": in a constriction, the pressure **drops**.
- Applying Bernoulli's equation between two points on different streamlines, or to a flow in which friction is not negligible.
