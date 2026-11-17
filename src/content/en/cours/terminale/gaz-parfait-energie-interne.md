---
titre: "Ideal gas, internal energy and the first law"
description: "Equation of state pV = nRT and its limits, work and heat transfer, heat capacity: drawing up the energy balance of a system."
niveau: terminale
theme: energie
ordre: 18
duree: "30 min"
motsCles: ["ideal gas", "equation of state", "internal energy", "first law", "heat capacity", "heat transfer"]
tp: []
---

> **The essentials.** A low-density gas is described by a single relation between pressure, volume, temperature and amount of substance: the **ideal gas equation of state** $pV = nRT$. The energy of a closed system at rest is stored as **internal energy** $U$, which changes only through **work** $W$ or **heat transfer** $Q$: this is the **first law**, $\Delta U = W + Q$. For a liquid or a solid (incompressible), $\Delta U = m\,c\,\Delta T$.

## 1. The ideal gas model

A **thermodynamic system** is the portion of matter under study, separated from the rest (the surroundings) by a real or imaginary boundary. It is described on the macroscopic scale by **state variables**: pressure $p$, volume $V$, temperature $T$, amount of substance $n$.

On the microscopic scale, a gas is made up of entities (molecules, atoms) in constant random motion. **Pressure** results from the collisions of these entities with the walls; **temperature** reflects thermal agitation: the higher it is, the faster the entities move on average.

> **Definition.** The **ideal gas** is a model in which the entities are treated as point particles (their own volume is negligible) with no interaction between them, except during collisions.

This model describes real gases well when they have a **low density**: the entities are then very far apart compared with their size.

## 2. The ideal gas equation of state

> **Law.** For an amount of substance $n$ of ideal gas, the pressure, volume and temperature are related by:
>
> $$
> pV = nRT
> $$
>
> with $p$ in pascals ($\mathrm{Pa}$), $V$ in cubic metres ($\mathrm{m^3}$), $n$ in moles ($\mathrm{mol}$), $T$ in kelvin ($\mathrm{K}$) and $R = 8.314\ \mathrm{J \cdot mol^{-1} \cdot K^{-1}}$ the ideal gas constant.

The absolute temperature is obtained from the temperature in degrees Celsius using $T = \theta + 273.15$. Some useful consequences:

| Process | Constant quantities | Relation |
|---|---|---|
| Isothermal | $n$, $T$ | $pV = \text{constant}$ (Boyle's law) |
| Isochoric | $n$, $V$ | $\dfrac{p}{T} = \text{constant}$ |
| Isobaric | $n$, $p$ | $\dfrac{V}{T} = \text{constant}$ |

A remarkable consequence: under the same conditions of pressure and temperature, one mole of any ideal gas occupies the same volume, the **molar volume** $V_m = \dfrac{RT}{p}$. At $20\ \mathrm{^\circ C}$ and $1.013 \times 10^5\ \mathrm{Pa}$, $V_m \approx 24.1\ \mathrm{L \cdot mol^{-1}}$.

**Limits of the model.** When the pressure increases or the temperature decreases, the gas becomes dense: the volume of the entities themselves and their interactions are no longer negligible. The equation of state then no longer holds, and the model cannot describe **liquefaction**. The model is, however, excellent for air under ordinary conditions (a few bar, room temperature).

## 3. The internal energy of a system

The total energy of a system is the sum of its macroscopic mechanical energy (kinetic and potential energy of the system as a whole) and its **internal energy** $U$.

> **Definition.** The internal energy $U$ of a system is the sum of the microscopic kinetic energies of its entities (thermal agitation) and the potential energies of interaction between these entities. It is expressed in joules ($\mathrm{J}$).

$U$ itself cannot be measured, only its **change** $\Delta U = U_{\text{final}} - U_{\text{initial}}$ during a process. For a system at rest on the macroscopic scale, any change in energy takes the form of a change in internal energy.

For an ideal gas, interactions are neglected: for a given amount of substance, the internal energy depends only on the temperature. A rise in temperature is therefore always accompanied by an increase in $U$.

## 4. The first law of thermodynamics

A closed system exchanges energy with the surroundings in two ways:

- by **work** $W$: a transfer linked to a mechanical action (a piston compressing a gas, stirring by a propeller) or an electrical one (a current flowing through a conductor);
- by **heat transfer** $Q$: a disordered transfer, at the microscopic level, which takes place spontaneously from the hot body to the cold body.

> **First law.** For a closed system at rest on the macroscopic scale, between an initial state and a final state:
>
> $$
> \Delta U = W + Q
> $$
>
> $W$ and $Q$ are signed quantities: positive if the system **receives** energy, negative if it **gives up** energy.

The first law expresses the **conservation of energy**: energy is not created, it is exchanged. An isolated system (no exchange) therefore has a constant internal energy.

Examples of how to read the signs:

- a gas compressed by a piston receives work: $W > 0$;
- a drink cooling in the refrigerator gives up energy by heat transfer: $Q < 0$;
- an electric heater receives electrical work and gives up the same amount of energy by heat transfer to the room (in steady state, $\Delta U = 0$, so $Q = -W$).

## 5. Heat capacity of an incompressible system

A liquid or a solid is treated as **incompressible**: its volume hardly changes. It therefore receives no work from pressure forces, and the change in its internal energy is proportional to its change in temperature.

> **Law.** For an incompressible system of heat capacity $C$ (in $\mathrm{J \cdot K^{-1}}$), going from temperature $T_i$ to $T_f$:
>
> $$
> \Delta U = C\,(T_f - T_i) = m\,c\,(T_f - T_i)
> $$
>
> where $m$ is the mass (in $\mathrm{kg}$) and $c$ the **specific heat capacity** (in $\mathrm{J \cdot kg^{-1} \cdot K^{-1}}$).

A change in temperature has the same value in kelvin and in degrees Celsius: $T_f - T_i$ can be calculated directly in $\mathrm{^\circ C}$.

| Material | $c$ in $\mathrm{J \cdot kg^{-1} \cdot K^{-1}}$ |
|---|---|
| Liquid water | $4.18 \times 10^3$ |
| Aluminium | $8.97 \times 10^2$ |
| Iron | $4.49 \times 10^2$ |
| Copper | $3.85 \times 10^2$ |

Water has a particularly high specific heat capacity: a great deal of energy is needed to heat it, which makes it an excellent fluid for storing and transporting heat (central heating, regulation of the climate by the oceans).

## Worked example

**a.** A bicycle tyre of internal volume $V = 2.00\ \mathrm{L}$ is inflated to a pressure $p = 5.00 \times 10^5\ \mathrm{Pa}$ at a temperature $\theta = 20.0\ \mathrm{^\circ C}$. The air is treated as an ideal gas. Calculate the amount of substance of air in the tyre.

**b.** An electric kettle contains $m = 1.50\ \mathrm{kg}$ of water at $20.0\ \mathrm{^\circ C}$. It is heated to $80.0\ \mathrm{^\circ C}$. Calculate the change in internal energy of the water, then the heating time if the heating element supplies the water with a power $P = 2.00\ \mathrm{kW}$ (losses neglected). Data: $c_{\text{water}} = 4.18 \times 10^3\ \mathrm{J \cdot kg^{-1} \cdot K^{-1}}$.

<details>
<summary>Show the solution</summary>

**a.** Convert to SI units: $V = 2.00 \times 10^{-3}\ \mathrm{m^3}$ and $T = 20.0 + 273.15 = 293.2\ \mathrm{K}$. From the equation of state:

$$
n = \frac{pV}{RT} = \frac{5.00 \times 10^5 \times 2.00 \times 10^{-3}}{8.314 \times 293.2} = 0.410\ \mathrm{mol}
$$

**b.** Liquid water is an incompressible system:

$$
\Delta U = m\,c\,(\theta_f - \theta_i) = 1.50 \times 4.18 \times 10^3 \times (80.0 - 20.0) = 3.76 \times 10^5\ \mathrm{J}
$$

The water receives no work ($W = 0$): from the first law, $Q = \Delta U$. The energy is supplied at power $P$ for a time $\Delta t$, so $Q = P\,\Delta t$:

$$
\Delta t = \frac{Q}{P} = \frac{3.76 \times 10^5}{2.00 \times 10^3} = 188\ \mathrm{s} \approx 3\ \mathrm{min}\ 8\ \mathrm{s}
$$

</details>

## Key points

- Ideal gas: point entities with no interaction, valid for a **low-density** gas.
- Equation of state: $pV = nRT$, always in **SI units** ($\mathrm{Pa}$, $\mathrm{m^3}$, $\mathrm{K}$).
- The internal energy $U$ brings together the microscopic energies (agitation and interactions).
- First law: $\Delta U = W + Q$, with $W$ and $Q$ counted as positive when the system receives energy.
- Incompressible system: $\Delta U = m\,c\,\Delta T$.

## Common mistakes

- Using degrees Celsius or litres in $pV = nRT$: the temperature must be in **kelvin** and the volume in **cubic metres**.
- Confusing **temperature** and **heat transfer**: temperature is a state variable, heat transfer is an energy exchanged.
- Getting the sign wrong: a system that **gives up** energy has a **negative** $Q$ or $W$.
- Applying the ideal gas model to a highly compressed gas or one close to liquefaction.
