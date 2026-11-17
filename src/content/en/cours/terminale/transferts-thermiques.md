---
titre: "Heat transfer: conduction, convection, radiation"
description: "Heat flux and thermal resistance, the Earth's radiation balance, Newton's law of cooling: how thermal energy flows and how a body cools down."
niveau: terminale
theme: energie
ordre: 19
duree: "30 min"
motsCles: ["heat transfer", "heat flux", "thermal resistance", "Stefan-Boltzmann", "greenhouse effect", "Newton's law of cooling"]
tp: ["refroidissement-newton"]
---

> **In a nutshell.** Heat transfer always occurs spontaneously from the **hot** body to the **cold** body. It takes place by conduction, convection or radiation. Its rate is measured by the **heat flux** $\Phi$, which is proportional to the temperature difference and inversely proportional to the **thermal resistance**. The Earth's radiation balance (Stefan-Boltzmann law, albedo) sets its mean temperature, which the **greenhouse effect** raises. The temperature of a system in contact with a thermal reservoir tends **exponentially** towards that of the reservoir.

## 1. Three modes of heat transfer

A **heat transfer** $Q$ is an exchange of energy caused by a temperature difference, without mechanical work. On the microscopic scale, it reflects the sharing of the disordered thermal motion of the particles.

| Mode | Medium | Mechanism | Example |
|---|---|---|---|
| **Conduction** | solid or stationary fluid | thermal motion passed on from particle to neighbouring particle, with no movement of matter | a saucepan handle heating up |
| **Convection** | fluid (liquid, gas) | bulk movement of the fluid, which carries its energy with it | water heating in a saucepan, a radiator |
| **Radiation** | none (possible in a vacuum) | emission and absorption of electromagnetic waves | the Sun heating the Earth |

> **Direction of transfer.** Spontaneously, heat transfer always takes place from the system at the higher temperature to the one at the lower temperature. It stops when the temperatures are equal: this is **thermal equilibrium**.

Reminder of the first law for an incompressible system at rest: $\Delta U = W + Q$, with $\Delta U = C\,\Delta T = m\,c\,\Delta T$, where $C$ is the heat capacity (in $\mathrm{J \cdot K^{-1}}$) and $c$ the specific heat capacity (in $\mathrm{J \cdot kg^{-1} \cdot K^{-1}}$).

## 2. Heat flux and thermal resistance

> **Definition.** The **heat flux** $\Phi$ is the energy transferred per unit time through a wall. It is expressed in watts:
>
> $$
> \Phi = \frac{Q}{\Delta t}
> $$
>
> with $Q$ in joules and $\Delta t$ in seconds.

Through a plane wall whose faces are held at temperatures $T_1 > T_2$, the flux is proportional to the temperature difference:

$$
\Phi = \frac{T_1 - T_2}{R_{\text{th}}}
$$

The **thermal resistance** $R_{\text{th}}$ (in $\mathrm{K \cdot W^{-1}}$) describes the ability of the wall to slow down the transfer. For a wall of thickness $e$ and surface area $S$, made of a material of thermal conductivity $\lambda$ (expression given in exercises):

$$
R_{\text{th}} = \frac{e}{\lambda\,S}
$$

| Material | $\lambda$ in $\mathrm{W \cdot m^{-1} \cdot K^{-1}}$ |
|---|---|
| Copper | $390$ |
| Concrete | $1.5$ |
| Glass | $1.0$ |
| Brick | $0.84$ |
| Wood | $0.15$ |
| Expanded polystyrene | $0.035$ |
| Still air | $0.025$ |

A good **insulator** has a low thermal conductivity, and therefore a high resistance. The analogy with electricity is a faithful one: the temperature difference plays the role of the voltage, the flux that of the current, and $R_{\text{th}}$ that of the resistance. For **layered** walls (crossed by the same flux), the resistances **add up**:

$$
R_{\text{th,total}} = R_1 + R_2 + \dots
$$

## 3. The Earth's radiation balance

Every body emits electromagnetic radiation that depends on its temperature. For a black body (the model of an ideal emitter and absorber):

> **Stefan-Boltzmann law (given).** The power per unit area radiated by a black body at temperature $T$ (in kelvin) is
>
> $$
> p = \sigma\,T^4 \qquad \text{with } \sigma = 5.67 \times 10^{-8}\ \mathrm{W \cdot m^{-2} \cdot K^{-4}}
> $$

The total power emitted by a surface of area $S$ is $P = \sigma\,S\,T^4$. The Sun (about $5\,800\ \mathrm{K}$) has its emission peak in the visible range; the Earth, at about $288\ \mathrm{K}$, emits in the **infrared**.

**Power received.** Outside the atmosphere, the Earth receives on average $p_{\text{received}} \approx 340\ \mathrm{W \cdot m^{-2}}$ (a quarter of the solar constant $1361\ \mathrm{W \cdot m^{-2}}$, because the illuminated disc $\pi R^2$ is a quarter of the sphere $4\pi R^2$).

> **Definition.** The **albedo** $A$ is the fraction of the incident solar power that is reflected directly back to space (clouds, ice, light-coloured ground). For the Earth, $A \approx 0.30$.

The power absorbed per unit area is therefore $(1 - A)\,p_{\text{received}} \approx 240\ \mathrm{W \cdot m^{-2}}$. At equilibrium, the Earth emits as much as it absorbs. Without an atmosphere:

$$
\sigma\,T^4 = (1 - A)\,p_{\text{received}}
\quad\Rightarrow\quad
T = \left(\frac{240}{5.67 \times 10^{-8}}\right)^{1/4} \approx 255\ \mathrm{K}
$$

that is, about $-18\,^{\circ}\mathrm{C}$, whereas the observed mean temperature is $15\,^{\circ}\mathrm{C}$.

**Greenhouse effect.** The atmosphere is almost transparent to visible solar radiation, but certain gases ($\mathrm{H_2O}$, $\mathrm{CO_2}$, $\mathrm{CH_4}$) absorb a large part of the infrared emitted by the ground. The warmed atmosphere radiates in turn, partly towards the ground, which thus receives additional power: its equilibrium temperature rises. An increase in the concentration of these gases strengthens this effect.

## 4. Newton's law of cooling and the change in temperature

A system at temperature $T$ is in contact with a **thermal reservoir**: a medium (ambient air, a bath) whose temperature $T_{\text{ext}}$ remains constant whatever the exchanges.

> **Newton's law of cooling (given).** The heat flux received by the system by conduction and convection through its surface of area $S$ is
>
> $$
> \Phi = h\,S\,(T_{\text{ext}} - T)
> $$
>
> where $h$ (in $\mathrm{W \cdot m^{-2} \cdot K^{-1}}$) is the heat transfer coefficient.

**Energy balance.** Between $t$ and $t + \Delta t$, with no work, the incompressible system receives $Q = \Phi\,\Delta t$, hence $C\,\Delta T = h\,S\,(T_{\text{ext}} - T)\,\Delta t$. Dividing by $\Delta t$ and letting $\Delta t$ tend to 0:

$$
\frac{\mathrm{d}T}{\mathrm{d}t} + \frac{T}{\tau} = \frac{T_{\text{ext}}}{\tau}
\qquad\text{with}\qquad
\tau = \frac{C}{h\,S} = \frac{m\,c}{h\,S}
$$

With the initial condition $T(0) = T_0$, the solution is:

$$
T(t) = T_{\text{ext}} + (T_0 - T_{\text{ext}})\,e^{-t/\tau}
$$

- The temperature tends towards $T_{\text{ext}}$: the difference $T - T_{\text{ext}}$ decays exponentially.
- At $t = \tau$, $37\ \%$ of the initial difference remains; after $5\tau$, less than $1\ \%$: equilibrium is practically reached.
- The tangent at the origin meets the asymptote $T = T_{\text{ext}}$ at time $t = \tau$.
- A system with a large heat capacity or a small exchange surface (large $\tau$) changes slowly.

## Worked example

**A.** A brick wall ($\lambda = 0.84\ \mathrm{W \cdot m^{-1} \cdot K^{-1}}$) has a thickness $e = 20\ \mathrm{cm}$ and a surface area $S = 10\ \mathrm{m^2}$. It is $20\,^{\circ}\mathrm{C}$ inside and $5\,^{\circ}\mathrm{C}$ outside. Calculate the heat flux, then recalculate it after adding $10\ \mathrm{cm}$ of polystyrene ($\lambda = 0.035\ \mathrm{W \cdot m^{-1} \cdot K^{-1}}$).

**B.** A cup of tea at $80\,^{\circ}\mathrm{C}$ cools in a room at $20\,^{\circ}\mathrm{C}$ according to Newton's law of cooling, with $\tau = 15\ \mathrm{min}$. After how long does it reach $50\,^{\circ}\mathrm{C}$?

<details>
<summary>Show the solution</summary>

**A.** Resistance of the wall alone:

$$
R_1 = \frac{e}{\lambda\,S} = \frac{0.20}{0.84 \times 10} = 2.4 \times 10^{-2}\ \mathrm{K \cdot W^{-1}}
\qquad
\Phi_1 = \frac{20 - 5}{2.4 \times 10^{-2}} \approx 6.3 \times 10^{2}\ \mathrm{W}
$$

Resistance of the insulation: $R_2 = \dfrac{0.10}{0.035 \times 10} = 0.29\ \mathrm{K \cdot W^{-1}}$. The walls are layered, so the resistances add up: $R = R_1 + R_2 = 0.31\ \mathrm{K \cdot W^{-1}}$.

$$
\Phi_2 = \frac{15}{0.31} \approx 48\ \mathrm{W}
$$

The insulation divides the losses by about 13.

**B.** We look for $t$ such that $50 = 20 + (80 - 20)\,e^{-t/\tau}$, that is $e^{-t/\tau} = \dfrac{30}{60} = \dfrac{1}{2}$:

$$
t = \tau \ln 2 = 15 \times 0.693 \approx 10\ \mathrm{min}
$$

</details>

## Key points

- Spontaneous heat transfer: from hot to cold, by **conduction**, **convection** or **radiation**.
- Heat flux: $\Phi = \dfrac{Q}{\Delta t} = \dfrac{T_1 - T_2}{R_{\text{th}}}$, with $R_{\text{th}} = \dfrac{e}{\lambda\,S}$; resistances in series add up.
- Stefan-Boltzmann: $p = \sigma\,T^4$. Radiative equilibrium of the Earth: $\sigma\,T^4 = (1 - A)\,p_{\text{received}}$.
- The greenhouse effect comes from the absorption of the Earth's infrared radiation by the atmosphere.
- Newton's law of cooling: $\Phi = h\,S\,(T_{\text{ext}} - T)$; in contact with a thermal reservoir, $T(t) = T_{\text{ext}} + (T_0 - T_{\text{ext}})\,e^{-t/\tau}$, with $\tau = \dfrac{m\,c}{h\,S}$.

## Common mistakes

- Using degrees Celsius in the Stefan-Boltzmann law: the temperature must be in **kelvin** (in a temperature difference, on the other hand, $1\ \mathrm{K} = 1\,^{\circ}\mathrm{C}$).
- Confusing **heat** and **temperature**: temperature is a state variable, heat transfer is energy exchanged.
- Adding the conductivities instead of the **resistances** for stacked layers.
- Forgetting the albedo, or dividing the solar constant by 2 instead of 4.
- Believing that the temperature reaches $T_{\text{ext}}$ at $t = \tau$: $37\ \%$ of the difference still remains.
