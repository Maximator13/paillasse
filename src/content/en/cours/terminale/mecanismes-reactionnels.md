---
titre: "Reaction mechanisms: the reaction at the molecular scale"
description: "Elementary steps, intermediates, curly arrows and donor or acceptor sites: modelling what happens between the molecules that react."
niveau: terminale
theme: matiere
ordre: 5
duree: "25 min"
motsCles: ["reaction mechanism", "elementary step", "reaction intermediate", "curly arrow", "catalyst", "effective collisions"]
tp: []
---

> **In brief.** A reaction equation describes only an overall balance. At the microscopic scale, the transformation takes place as a sequence of **elementary steps** (most often collisions between two entities) during which electron pairs move from a **donor site** to an **acceptor site**. This model explains the role of the catalyst and the influence of temperature and concentrations on the rate.

## 1. Reaction mechanism and elementary step

The equation $\mathrm{A + B \rightarrow C + D}$ gives the reactants, the products and the proportions in which they react. It says nothing about the **path** followed by the atoms.

> **Definition.** An **elementary step** is a reaction that occurs in a single step, at the microscopic scale: one entity that breaks apart or, most often, two entities that meet (a collision). A **reaction mechanism** is the set of elementary steps that account for the transformation.

An elementary step involves very few entities (one or two in general): the probability that a collision brings together three entities simultaneously, correctly oriented, is extremely low. This is why most reactions take place in several steps.

> **Definition.** A **reaction intermediate** is an entity produced by one elementary step and then consumed by a later step. It appears **neither in the reactants nor in the products** of the overall equation.

The equation of the reaction is obtained by **adding the elementary steps** (taking any coefficients into account): the reaction intermediates cancel out.

| Entity | Appears in the overall equation? | In the mechanism |
|---|---|---|
| Reactant | yes, on the left | consumed, never regenerated |
| Product | yes, on the right | formed, never consumed |
| Reaction intermediate | no | formed then consumed |
| Catalyst | no | consumed then regenerated |

## 2. Electron pair donor and acceptor sites

During an elementary step, some bonds break and others form: it is **electron pairs** that move. We therefore need to identify where the available electrons are and where they can go.

> **Definition.** An electron pair **donor site** is an atom carrying a lone pair or a negative charge, or a multiple bond (the pair of the double bond). An electron pair **acceptor site** is an atom carrying a positive charge, an electron vacancy or a partial positive charge $\delta^+$.

Partial charges come from the **polarisation of bonds**. A bond between two atoms is polarised when their electronegativity difference $\Delta\chi$ is large enough (the usual criterion is $\Delta\chi \geq 0.4$): the more electronegative atom carries $\delta^-$, the other $\delta^+$.

| Bond | $\chi$ of the atoms (Pauling) | $\Delta\chi$ | Polarisation |
|---|---|---|---|
| $\mathrm{C{-}H}$ | $2.55$ and $2.20$ | $0.35$ | regarded as non-polarised |
| $\mathrm{C{-}Cl}$ | $2.55$ and $3.16$ | $0.61$ | $\mathrm{C}^{\delta+}{-}\mathrm{Cl}^{\delta-}$ |
| $\mathrm{C{=}O}$ | $2.55$ and $3.44$ | $0.89$ | $\mathrm{C}^{\delta+}{=}\mathrm{O}^{\delta-}$ |
| $\mathrm{O{-}H}$ | $3.44$ and $2.20$ | $1.24$ | $\mathrm{O}^{\delta-}{-}\mathrm{H}^{\delta+}$ |

Examples of sites: the oxygen of water $\mathrm{H_2O}$ (two lone pairs) and the hydroxide ion $\mathrm{HO^-}$ are donor sites; the $\mathrm{H^+}$ ion, a carbocation or the carbon of a carbonyl group $\mathrm{C^{\delta+}{=}O}$ are acceptor sites.

## 3. The curly arrow formalism

> **Definition.** A **curly arrow** represents the movement of an electron pair during an elementary step. It **starts from a donor site** (a lone pair, or the pair of a bond) and **points towards an acceptor site** (the atom that receives the pair).

Two cases arise:

1. **Formation of a bond.** The arrow starts from a lone pair (or from a multiple bond) and points towards the acceptor atom: a new bonding pair is created between the two atoms.
2. **Breaking of a bond.** The arrow starts from the middle of the bond and points towards the more electronegative atom, which takes the pair: its charge decreases by one unit.

Example, the reaction between the hydroxide ion and the oxonium ion:

$$
\mathrm{HO^- + H{-}OH_2^+ \rightarrow HO{-}H + OH_2}
$$

A first arrow starts from a lone pair on the oxygen of $\mathrm{HO^-}$ and points towards the $\mathrm{H}$ atom of $\mathrm{H_3O^+}$; a second starts from the $\mathrm{O{-}H}$ bond of $\mathrm{H_3O^+}$ and points towards the oxygen, which keeps the pair.

Each elementary step must obey the **conservation of elements and of electric charge**. After the pairs have moved, check the formal charges: an atom that donates a lone pair to form a bond loses a negative charge (or gains a positive charge).

## 4. Role of the catalyst

> **Definition.** A **catalyst** is a species that speeds up a reaction without changing its final state. It is consumed in one step of the mechanism and then **regenerated** in a later step: it does not appear in the overall equation.

The catalyst **replaces the initial mechanism with another**, faster one, made up of easier elementary steps. Example: in esterification, the $\mathrm{H^+}$ ion attaches to the oxygen of the carbonyl group of the carboxylic acid. The carbon then becomes a stronger acceptor, which makes the attack by the alcohol easier. The $\mathrm{H^+}$ ion is released in the last step.

A distinction is made between **homogeneous catalysis** (catalyst and reactants in the same phase, such as $\mathrm{H^+}$ in solution), **heterogeneous catalysis** (solid catalyst, such as the platinum in catalytic converters) and **enzymatic catalysis** (enzymes in living organisms, which are highly selective).

## 5. Microscopic interpretation of kinetic factors

A reaction takes place only if the reacting entities meet. But not all collisions are productive.

> **Definition.** An **effective collision** is a collision between reacting entities that results in the transformation. For this, the entities must have **sufficient energy** and a **favourable orientation** relative to one another.

The rate of reaction increases with the number of effective collisions per unit time. This model explains the kinetic factors studied in class:

| Factor | Microscopic effect | Effect on the rate |
|---|---|---|
| Higher concentration of reactants | more entities per unit volume, hence more collisions | increases |
| Higher temperature | greater thermal motion: collisions that are more frequent and above all **more energetic** | increases |
| Catalyst | different mechanism, easier elementary steps | increases |

The effect of temperature is mainly due to the **proportion of sufficiently energetic collisions**, which rises sharply with temperature, far more than the collision frequency alone. As the reaction proceeds, the reactants are used up: effective collisions become rarer and the rate decreases.

## Worked example

The hydrolysis of 2-chloro-2-methylpropane has the equation $\mathrm{(CH_3)_3C{-}Cl + 2\,H_2O \rightarrow (CH_3)_3C{-}OH + H_3O^+ + Cl^-}$. Its mechanism consists of three elementary steps:

$$
\begin{aligned}
&(1)\quad \mathrm{(CH_3)_3C{-}Cl \rightarrow (CH_3)_3C^+ + Cl^-} \\
&(2)\quad \mathrm{(CH_3)_3C^+ + H_2O \rightarrow (CH_3)_3C{-}OH_2^+} \\
&(3)\quad \mathrm{(CH_3)_3C{-}OH_2^+ + H_2O \rightarrow (CH_3)_3C{-}OH + H_3O^+}
\end{aligned}
$$

1. Using the electronegativities $\chi(\mathrm{C}) = 2.55$ and $\chi(\mathrm{Cl}) = 3.16$, justify the direction in which the $\mathrm{C{-}Cl}$ bond breaks in step (1).
2. Identify the reaction intermediates.
3. In step (2), identify the donor site and the acceptor site, then describe the curly arrow.
4. Check that the sum of the elementary steps gives back the overall equation.

<details>
<summary>Show the solution</summary>

1. $\Delta\chi = 3.16 - 2.55 = 0.61 \geq 0.4$: the bond is polarised $\mathrm{C^{\delta+}{-}Cl^{\delta-}}$. The bonding pair moves to the chlorine, which is more electronegative and becomes the $\mathrm{Cl^-}$ ion; the carbon loses a pair and becomes the carbocation $\mathrm{(CH_3)_3C^+}$. The curly arrow starts from the middle of the bond and points towards $\mathrm{Cl}$.

2. $\mathrm{(CH_3)_3C^+}$ is formed in (1) and consumed in (2); $\mathrm{(CH_3)_3C{-}OH_2^+}$ is formed in (2) and consumed in (3). These are the two reaction intermediates, absent from the overall equation.

3. Donor site: a lone pair on the oxygen of $\mathrm{H_2O}$. Acceptor site: the carbon of the carbocation, which carries the $+$ charge (electron vacancy). The arrow starts from the lone pair of $\mathrm{O}$ and points towards $\mathrm{C^+}$: a $\mathrm{C{-}O}$ bond forms and the oxygen, which has shared its pair, now carries the $+$ charge.

4. Adding (1), (2) and (3), then cancelling $\mathrm{(CH_3)_3C^+}$ and $\mathrm{(CH_3)_3C{-}OH_2^+}$, which appear on both sides:

$$
\mathrm{(CH_3)_3C{-}Cl + 2\,H_2O \rightarrow (CH_3)_3C{-}OH + H_3O^+ + Cl^-}
$$

Check: on the left, 4 C, 13 H, 2 O, 1 Cl and zero charge; on the right, 4 C, $10 + 3 = 13$ H, $1 + 1 = 2$ O, 1 Cl and a charge of $(+1) + (-1) = 0$. The equation is balanced.

</details>

## Key points

- A reaction breaks down into **elementary steps**; together they make up the **reaction mechanism**, whose sum gives back the overall equation.
- A **reaction intermediate** is formed then consumed; a **catalyst** is consumed then regenerated.
- A **curly arrow** always goes from a **donor site** (lone pair, negative charge, bond) to an **acceptor site** (positive charge, vacancy, $\delta^+$).
- Only **effective collisions** (sufficient energy, correct orientation) lead to the transformation: concentration, temperature and catalyst increase their number per unit time.

## Common mistakes

- Drawing a curly arrow **the wrong way round**, from a positive atom towards an electron pair: the arrow always follows the movement of the electrons, from the donor to the acceptor.
- Starting an arrow from an atom with no available pair (for example from an $\mathrm{H}$ or a $\mathrm{C^+}$).
- Confusing a **reaction intermediate** with a **catalyst**: the intermediate is formed then consumed, whereas the catalyst is present from the start, consumed then regenerated.
- Forgetting to check the **conservation of charge** in each elementary step.
- Believing that the catalyst changes the final state: it changes only the **time** needed to reach it.
