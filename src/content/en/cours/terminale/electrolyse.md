---
titre: "Electrolysis: forcing a chemical system to change"
description: "Electrolytic cell, electrode reactions, the relation Q = I·Δt = n(e⁻)·F, rechargeable cells and hydrogen production."
niveau: terminale
theme: matiere
ordre: 10
duree: "25 min"
motsCles: ["electrolysis", "electrolytic cell", "anode", "cathode", "faraday", "rechargeable cell", "hydrogen"]
tp: ["electrolyse"]
---

> **In brief.** A power supply can impose a current on a chemical system and make it change **in the opposite direction** to its spontaneous direction: this is **electrolysis**. The electric charge transferred sets the amount of substance formed, through $Q = I\,\Delta t = n(e^-)\,F$. This principle is used to store energy (charging a rechargeable cell) and to produce hydrogen.

## 1. Spontaneous change and forced change

A chemical system that is not at equilibrium changes spontaneously so that its reaction quotient $Q_r$ moves towards the equilibrium constant $K$. In an **electrochemical cell**, this spontaneous change supplies electrical energy to the external circuit.

The reverse change can be obtained by supplying energy: a **power supply** connected across the system imposes a current in the opposite direction to the one the cell would deliver.

> **Definition.** **Electrolysis** is a chemical transformation **forced** by the flow of a current imposed by a power supply. During electrolysis, the reaction quotient $Q_r$ moves **away** from the equilibrium constant $K$.

| | Electrochemical cell | Electrolytic cell |
|---|---|---|
| Transformation | spontaneous | forced |
| Change in $Q_r$ | moves towards $K$ | moves away from $K$ |
| Energy conversion | chemical $\rightarrow$ electrical | electrical $\rightarrow$ chemical |
| Role in the circuit | source | load |

## 2. The electrolytic cell and the electrode reactions

An **electrolytic cell** consists of two electrodes dipping into an ionic solution (the electrolyte), connected to the terminals of a d.c. power supply.

In the external circuit, the **electrons** flow from the $-$ terminal of the supply to one electrode, then from the other electrode to the $+$ terminal. In the solution, the current is carried by the movement of **ions**: cations migrate towards the cathode, anions towards the anode.

> **Definition.** The **anode** is the electrode where **oxidation** takes place (loss of electrons). The **cathode** is the electrode where **reduction** takes place (gain of electrons). In an electrolytic cell, the anode is connected to the $+$ terminal of the supply and the cathode to the $-$ terminal.

Memory aid: **a**node and **o**xidation begin with a vowel, **c**athode and **r**eduction with a consonant. This rule holds for the electrochemical cell as well as for the electrolytic cell; only the polarity changes.

**Example: electrolysis of a copper(II) chloride solution.** The power supply forces the reaction:

$$
\mathrm{Cu^{2+}(aq) + 2\,Cl^-(aq) \rightarrow Cu(s) + Cl_2(g)}
$$

- at the cathode ($-$ terminal), reduction: $\mathrm{Cu^{2+}(aq) + 2\,e^- \rightarrow Cu(s)}$, a copper deposit appears;
- at the anode ($+$ terminal), oxidation: $\mathrm{2\,Cl^-(aq) \rightarrow Cl_2(g) + 2\,e^-}$, chlorine gas is given off.

This reaction is the reverse of the spontaneous reaction between copper and chlorine.

## 3. Electric charge and amount of substance

During a time $\Delta t$, a constant current $I$ transfers the charge:

$$
Q = I\,\Delta t
$$

with $Q$ in coulombs ($\mathrm{C}$), $I$ in amperes ($\mathrm{A}$) and $\Delta t$ in seconds ($\mathrm{s}$).

This charge is carried by the electrons exchanged at the electrodes. One mole of electrons carries, in absolute value, the charge $F$ called the **Faraday constant**:

$$
F = N_A \times e = 6.022 \times 10^{23}\ \mathrm{mol^{-1}} \times 1.602 \times 10^{-19}\ \mathrm{C} \approx 9.65 \times 10^{4}\ \mathrm{C \cdot mol^{-1}}
$$

> **Law.** The amount of electrons exchanged during electrolysis is related to the current and the duration by:
>
> $$
> Q = I\,\Delta t = n(e^-)\,F
> $$
>

Then $n(e^-)$ is related to the amounts of substance formed or consumed using the **half-equations**. For the cathode in the previous example, 2 electrons form 1 copper atom:

$$
n(\mathrm{Cu})_{\text{formed}} = \frac{n(e^-)}{2} = \frac{I\,\Delta t}{2F}
$$

Steps to follow:

1. calculate $Q = I\,\Delta t$ (duration converted to seconds);
2. deduce $n(e^-) = \dfrac{Q}{F}$;
3. use the half-equation to obtain the amount of the species required;
4. convert to mass ($m = n\,M$) or to volume of gas ($V = n\,V_m$).

## 4. Storing and converting chemical energy

### Rechargeable cells

A **rechargeable cell** (accumulator) is an electrochemical cell that can be recharged. It operates alternately:

- during **discharge**: it behaves like an electrochemical cell, the transformation is spontaneous and chemical energy is converted into electrical energy;
- during **charging**: a charger imposes a current in the opposite direction, the transformation is forced (this is electrolysis) and electrical energy is stored in chemical form.

Lead-acid batteries (cars) and lithium-ion batteries (phones, electric vehicles) rely on this principle. During charging, the anode and cathode roles of the two electrodes are swapped compared with discharge.

The **capacity** of a rechargeable cell is the maximum charge it can deliver: $Q_{\max} = I\,\Delta t$, often expressed in ampere-hours ($1\ \mathrm{A \cdot h} = 3\,600\ \mathrm{C}$).

### Hydrogen production

The **electrolysis of water** produces hydrogen without releasing carbon dioxide if the electricity used comes from renewable sources. In acidic solution:

- at the cathode ($-$ terminal), reduction: $\mathrm{2\,H^+(aq) + 2\,e^- \rightarrow H_2(g)}$;
- at the anode ($+$ terminal), oxidation: $\mathrm{2\,H_2O(l) \rightarrow O_2(g) + 4\,H^+(aq) + 4\,e^-}$.

Overall: $\mathrm{2\,H_2O(l) \rightarrow 2\,H_2(g) + O_2(g)}$. Twice as much hydrogen as oxygen is obtained, both in volume and in amount of substance.

Hydrogen thus stores electrical energy, which is later released in a **fuel cell** by the reverse, spontaneous reaction.

### Chlorophyll-containing organisms

Nature also stores energy in chemical form: through **photosynthesis**, chlorophyll-containing organisms convert light energy into chemical energy (synthesis of glucose from carbon dioxide and water, with release of oxygen). **Respiration** then releases this energy through the reverse transformation.

These storage systems raise issues for society: intermittency of renewable energy sources, lithium and cobalt resources, battery recycling, efficiency of successive conversions.

## Worked example

Acidified water is electrolysed with a constant current $I = 2.00\ \mathrm{A}$ for $\Delta t = 30.0\ \mathrm{min}$. Data: $F = 9.65 \times 10^{4}\ \mathrm{C \cdot mol^{-1}}$, molar volume of gases $V_m = 24.0\ \mathrm{L \cdot mol^{-1}}$.

1. Calculate the electric charge $Q$ and the amount of electrons exchanged.
2. Deduce the volumes of hydrogen and oxygen obtained.

<details>
<summary>Show the solution</summary>

1. The duration is $\Delta t = 30.0 \times 60 = 1.80 \times 10^{3}\ \mathrm{s}$, so:

$$
Q = I\,\Delta t = 2.00 \times 1.80 \times 10^{3} = 3.60 \times 10^{3}\ \mathrm{C}
$$

$$
n(e^-) = \frac{Q}{F} = \frac{3.60 \times 10^{3}}{9.65 \times 10^{4}} = 3.73 \times 10^{-2}\ \mathrm{mol}
$$

2. At the cathode, $\mathrm{2\,H^+ + 2\,e^- \rightarrow H_2}$: 2 electrons for 1 molecule of hydrogen.

$$
n(\mathrm{H_2}) = \frac{n(e^-)}{2} = 1.87 \times 10^{-2}\ \mathrm{mol} \quad\text{so}\quad V(\mathrm{H_2}) = n\,V_m = 0.448\ \mathrm{L}
$$

At the anode, 4 electrons are released per molecule of oxygen formed:

$$
n(\mathrm{O_2}) = \frac{n(e^-)}{4} = 9.33 \times 10^{-3}\ \mathrm{mol} \quad\text{so}\quad V(\mathrm{O_2}) = 0.224\ \mathrm{L}
$$

The volume of hydrogen is indeed twice that of oxygen.

</details>

## Key points

- Electrolysis is a transformation **forced** by a power supply: $Q_r$ moves away from $K$, electrical energy is converted into chemical energy.
- **Anode: oxidation**, connected to the $+$ terminal; **cathode: reduction**, connected to the $-$ terminal.
- $Q = I\,\Delta t = n(e^-)\,F$, with $F \approx 9.65 \times 10^{4}\ \mathrm{C \cdot mol^{-1}}$.
- The half-equation relates $n(e^-)$ to the amount of the species formed.
- Charging a rechargeable cell or producing hydrogen by electrolysis of water means **storing** energy in chemical form.

## Common mistakes

- Forgetting to convert the duration to **seconds** before calculating $Q$.
- Writing $n(\text{product}) = n(e^-)$ without taking into account the number of electrons in the half-equation.
- Associating the anode with the $-$ terminal: this is true for an electrochemical cell, not for an electrolytic cell. What defines the anode is **oxidation**, not the polarity.
- Believing that electrons travel through the solution: in the electrolyte, it is the **ions** that carry the current.
