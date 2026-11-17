---
titre: "Electrochemical cells: from chemical to electrical energy"
description: "Structure of a cell, polarity, electrode reactions, open-circuit voltage and electrical capacity, with the common oxidising and reducing agents."
niveau: terminale
theme: matiere
ordre: 8
duree: "25 min"
motsCles: ["electrochemical cell", "redox", "anode", "cathode", "salt bridge", "electrical capacity", "Daniell cell"]
tp: ["pile-daniell"]
---

> **The essentials.** A cell separates the two couples of a spontaneous redox reaction: instead of being exchanged directly, the electrons flow through an external circuit. Oxidation takes place at the **anode** (negative terminal), reduction at the **cathode** (positive terminal). Its **open-circuit voltage** is measured when it delivers no current. The cell is flat when one reactant is used up (or equilibrium is reached); the charge it has been able to deliver is its **capacity**.

## 1. Common oxidising and reducing agents

A redox reaction is a transfer of electrons from the reducing agent of one couple to the oxidising agent of another couple. Each oxidising agent/reducing agent couple is written with an electron half-equation, for example:

$$
\mathrm{Cu^{2+}(aq) + 2\,e^- \rightleftarrows Cu(s)}
$$

> **Definition.** An **oxidising agent** is a species able to gain one or more electrons; a **reducing agent** is a species able to lose them. An **oxidation** is a loss of electrons, a **reduction** a gain of electrons.

The syllabus requires you to know a few species from everyday life:

| Species | Role | Couple | Use |
|---|---|---|---|
| Hypochlorite ion $\mathrm{ClO^-}$ (bleach) | oxidising agent | $\mathrm{ClO^-/Cl^-}$ | disinfectant, bleaching |
| Oxygen $\mathrm{O_2}$ | oxidising agent | $\mathrm{O_2/H_2O}$ | combustion, corrosion, fuel cells |
| Chlorine $\mathrm{Cl_2}$ | oxidising agent | $\mathrm{Cl_2/Cl^-}$ | water treatment |
| Ascorbic acid $\mathrm{C_6H_8O_6}$ (vitamin C) | reducing agent | $\mathrm{C_6H_6O_6/C_6H_8O_6}$ | food antioxidant |
| Hydrogen $\mathrm{H_2}$ | reducing agent | $\mathrm{H^+/H_2}$ | fuel for fuel cells |
| Metals ($\mathrm{Zn}$, $\mathrm{Fe}$, $\mathrm{Al}$, $\mathrm{Li}$...) | reducing agents | $\mathrm{M^{n+}/M}$ | cell electrodes |

Metals are good reducing agents: they readily lose electrons to form cations. This is why they are found at the anode of many cells.

## 2. Structure of a cell

Let us dip a zinc strip into a copper sulfate solution: the zinc becomes coated with copper and the solution loses its colour. The reaction $\mathrm{Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s)}$ is spontaneous, but the electrons pass directly from one species to the other: no electrical energy can be recovered.

A cell **separates** the reactants into two compartments:

- two **half-cells**, each made of a metal electrode dipping into a solution containing the oxidising agent and the reducing agent of the same couple (zinc strip in $\mathrm{Zn^{2+}}$, copper strip in $\mathrm{Cu^{2+}}$ for the Daniell cell);
- a **salt bridge** (paper or gel soaked in an inert electrolyte such as $\mathrm{K^+ + NO_3^-}$) which connects the two solutions;
- an **external circuit** which connects the electrodes and supplies a load.

> **Role of the salt bridge.** It completes the electrical circuit and ensures the **electrical neutrality** of each solution: its ions migrate to compensate for the appearance or disappearance of ions in the compartments. Without it, no current flows.

In the Daniell cell, $\mathrm{Zn^{2+}}$ ions appear on the anode side and $\mathrm{Cu^{2+}}$ ions disappear on the cathode side: the anions of the bridge ($\mathrm{NO_3^-}$) migrate towards the anode compartment, the cations ($\mathrm{K^+}$) towards the cathode compartment.

In the external circuit, the current is carried by **electrons**; in the solutions and the salt bridge, it is carried by **ions**.

## 3. Anode, cathode and polarity

> **Definition.** The **anode** is the electrode where **oxidation** occurs. The **cathode** is the electrode where **reduction** occurs.

The electrons are released at the anode, travel through the external circuit and are consumed at the cathode. They therefore leave from the negative terminal: in a cell, **the anode is the negative pole** and **the cathode the positive pole**. Outside the cell, the electric current flows from the cathode to the anode (opposite direction to the electrons).

For the Daniell cell:

| Electrode | Name | Polarity | Reaction |
|---|---|---|---|
| Zinc | anode | $-$ | $\mathrm{Zn(s) \rightarrow Zn^{2+}(aq) + 2\,e^-}$ |
| Copper | cathode | $+$ | $\mathrm{Cu^{2+}(aq) + 2\,e^- \rightarrow Cu(s)}$ |

The overall cell equation is the sum of the two half-equations, with the electrons cancelled out:

$$
\mathrm{Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s)}
$$

In practice, the polarity is determined with a voltmeter: it displays a positive voltage when its V terminal is connected to the $+$ pole and its COM terminal to the $-$ pole. The direction of spontaneous change can also be predicted with the reaction quotient: the cell operates as long as $Q_r < K$.

By convention, a cell is written with the anode on the left:

$$
\mathrm{\ominus\ Zn(s)\,|\,Zn^{2+}(aq)\,\|\,Cu^{2+}(aq)\,|\,Cu(s)\ \oplus}
$$

## 4. Open-circuit voltage, exhaustion and capacity

> **Definition.** The **open-circuit voltage** $U_0$ (or electromotive force $E$) is the voltage measured across the terminals of the cell when it delivers no current. It depends on the nature of the couples and on the concentrations.

For the Daniell cell, $U_0 \approx 1.1\ \mathrm{V}$. When the cell delivers a current, the voltage across its terminals is slightly lower because of its internal resistance.

During operation, $Q_r$ increases and approaches $K$. The cell is **flat** when the system reaches equilibrium ($Q_r = K$) or when one reactant is completely consumed: the current stops. For the Daniell cell, $K$ is so large ($K \approx 10^{37}$) that in practice exhaustion corresponds to the limiting reactant being used up.

> **Definition.** The **electrical capacity** $Q_{\max}$ of a cell is the maximum electric charge it can deliver over its lifetime:
>
> $$
> Q_{\max} = n(e^-)_{\max} \times F
> $$
>
> where $n(e^-)_{\max}$ is the amount of electrons exchanged when the limiting reactant is used up and $F = N_A \times e \approx 9.65 \times 10^{4}\ \mathrm{C \cdot mol^{-1}}$ is the Faraday constant.

For a cell delivering a constant current $I$ for a duration $\Delta t$, the charge delivered is $Q = I \times \Delta t$. The capacity is often given in ampere-hours: $1\ \mathrm{A \cdot h} = 3\,600\ \mathrm{C}$.

The approach for linking charge and matter is always the same:

1. write the half-equation for the electrode where the limiting reactant is consumed;
2. deduce $n(e^-)$ from the amount of reactant (for example $n(e^-) = 2\,n(\mathrm{Cu^{2+}})$);
3. multiply by $F$.

## Worked example

A Daniell cell is made of a zinc strip of mass $5.0\ \mathrm{g}$ dipping into a zinc sulfate solution, and a copper strip dipping into $V = 100\ \mathrm{mL}$ of copper sulfate solution at $C = 0.10\ \mathrm{mol \cdot L^{-1}}$. The two compartments are connected by a salt bridge.

Data: $M(\mathrm{Zn}) = 65.4\ \mathrm{g \cdot mol^{-1}}$; $F = 9.65 \times 10^{4}\ \mathrm{C \cdot mol^{-1}}$.

1. Identify the anode, the cathode and the polarity of the cell.
2. Determine the limiting reactant and the capacity of the cell.
3. The cell delivers a constant current $I = 50\ \mathrm{mA}$. How long does it operate?

<details>
<summary>Show the solution</summary>

1. The spontaneous transformation is $\mathrm{Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s)}$: the zinc is oxidised ($\mathrm{Zn \rightarrow Zn^{2+} + 2\,e^-}$): the zinc strip is the **anode**, the $-$ pole. The copper(II) ions are reduced on the copper strip, which is the **cathode**, the $+$ pole.

2. Initial amounts:

$$
n(\mathrm{Zn}) = \frac{5.0}{65.4} = 7.6 \times 10^{-2}\ \mathrm{mol}
\qquad
n(\mathrm{Cu^{2+}}) = C \times V = 0.10 \times 0.100 = 1.0 \times 10^{-2}\ \mathrm{mol}
$$

The stoichiometric coefficients are equal to 1: $\mathrm{Cu^{2+}}$ is the limiting reactant, $x_{\max} = 1.0 \times 10^{-2}\ \mathrm{mol}$. Each $\mathrm{Cu^{2+}}$ ion gains two electrons, so $n(e^-)_{\max} = 2\,x_{\max} = 2.0 \times 10^{-2}\ \mathrm{mol}$:

$$
Q_{\max} = 2.0 \times 10^{-2} \times 9.65 \times 10^{4} = 1.9 \times 10^{3}\ \mathrm{C}
$$

3. With $Q_{\max} = I \times \Delta t$:

$$
\Delta t = \frac{Q_{\max}}{I} = \frac{1.93 \times 10^{3}}{50 \times 10^{-3}} = 3.9 \times 10^{4}\ \mathrm{s} \approx 11\ \mathrm{h}
$$

</details>

## Key points

- A cell separates the two couples of a spontaneous redox reaction; the **salt bridge** completes the circuit and maintains electrical neutrality.
- **Anode**: oxidation, $-$ pole. **Cathode**: reduction, $+$ pole. The electrons travel from the anode to the cathode in the external circuit.
- The **open-circuit voltage** is measured with a voltmeter, with the cell delivering no current.
- The cell is flat when one reactant is used up (or when $Q_r = K$).
- Capacity: $Q_{\max} = n(e^-)_{\max} \times F = I \times \Delta t$.

## Common mistakes

- Believing that **electrons** travel through the salt bridge or the solutions: it is the **ions** that carry the current there.
- Swapping anode and cathode: as a memory aid, **a**node and **o**xidation begin with a vowel, **c**athode and **r**eduction with a consonant.
- Forgetting the factor of 2 between the amount of $\mathrm{Cu^{2+}}$ ions (or $\mathrm{Zn}$) consumed and the amount of electrons exchanged.
- Calculating the capacity with the reactant in excess instead of the limiting reactant.
- Expressing $\Delta t$ in hours or $I$ in milliamperes in $Q = I \times \Delta t$ without converting.
