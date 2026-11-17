---
titre: "Chemical kinetics: following a transformation over time"
description: "Slow and fast transformations, kinetic factors, catalysis, volumetric rates, half-life of a reaction and the first-order rate law."
niveau: terminale
theme: matiere
ordre: 4
duree: "25 min"
motsCles: ["kinetics", "volumetric rate", "half-life", "catalyst", "first order", "kinetic factors"]
tp: ["suivi-cinetique"]
---

> **The essentials.** A chemical transformation is not instantaneous: it lasts from a few microseconds to several years. Kinetics is the study of this duration. It is measured by the **volumetric rate** of formation or of disappearance of a species, summarised by the **half-life** of the reaction, and modified by means of **kinetic factors** and **catalysts**.

## 1. Slow and fast transformations

A transformation is said to be **fast** when it appears to be complete as soon as the reactants come into contact: neither the eye nor the measuring instrument can follow its progress. This is the case for acid-base reactions, precipitations and most of the reactions used in titrations.

A transformation is said to be **slow** when its progress lasts from a few seconds to several hours (or longer) and can be followed with the naked eye or with a measuring instrument. Examples: the oxidation of iodide ions $\mathrm{I^-}$ by hydrogen peroxide $\mathrm{H_2O_2}$, the decolourisation of permanganate by oxalic acid, the formation of rust.

To **follow** a slow transformation, a quantity related to the concentration of a species is measured over time:

| Method | Quantity measured | Condition |
|---|---|---|
| Spectrophotometry | absorbance $A$ | one coloured species; $A = \varepsilon\,\ell\,C$ (Beer-Lambert law) |
| Conductimetry | conductivity $\sigma$ | ions are formed or disappear |
| Pressure or volume of gas | $P$ or $V$ | a gas is produced or consumed |
| Successive titrations | concentration | samples cooled (quenching) to freeze the reaction |

Physical methods (absorbance, conductivity, pressure) are preferred: they are continuous and do not disturb the reaction mixture.

## 2. Kinetic factors and catalysis

> **Definition.** A **kinetic factor** is a parameter that changes the rate at which a chemical system evolves.

The main kinetic factors are:

- the **temperature**: in general, the higher it is, the faster the transformation. It is used to speed up a reaction (heating under reflux) or to stop it (quenching in iced water, keeping food in the refrigerator);
- the **concentration of the reactants**: the greater it is, the faster the transformation;
- the **contact surface area** between reactants, when one of them is a solid: a solid divided into a powder reacts faster than a block.

Microscopic interpretation: a reaction takes place during **effective collisions** between reacting entities. Increasing the concentration multiplies the collisions; increasing the temperature makes the collisions more frequent and more energetic.

> **Definition.** A **catalyst** is a species that **speeds up** a chemical transformation without changing the final state of the system. It is consumed and then regenerated: it does not appear in the equation of the reaction.

A distinction is made between:

- **homogeneous catalysis**: the catalyst and the reactants are in the same phase (dissolved $\mathrm{Fe^{3+}}$ ions for the disproportionation of $\mathrm{H_2O_2}$);
- **heterogeneous catalysis**: the catalyst is in a different phase, often a solid (platinum wire, the catalytic converter of a car);
- **enzymatic catalysis**: the catalyst is an enzyme (catalase in blood for $\mathrm{H_2O_2}$), very efficient and very **selective**.

A catalyst is identified experimentally: the transformation is faster in its presence, and it is recovered unchanged at the end.

## 3. Volumetric rates of disappearance and of formation

The concentration of a reactant $\mathrm{A}$ or of a product $\mathrm{B}$ is followed over time, at constant volume.

> **Definition.** The **volumetric rate of disappearance** of a reactant $\mathrm{A}$ and the **volumetric rate of formation** of a product $\mathrm{B}$ are:
>
> $$\displaystyle v_{\text{disp}}(\mathrm{A}) = -\frac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t} \qquad v_{\text{form}}(\mathrm{B}) = \frac{\mathrm{d}[\mathrm{B}]}{\mathrm{d}t}$$
>
> They are expressed in $\mathrm{mol \cdot L^{-1} \cdot s^{-1}}$ and are positive.

The minus sign compensates for the decrease in $[\mathrm{A}]$: $\dfrac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t}$ is negative.

**Reading from a graph.** At a time $t$, the rate is the **absolute value of the gradient of the tangent** to the curve $[\mathrm{A}] = f(t)$ (or $[\mathrm{B}] = f(t)$) at the point of abscissa $t$.

In general, the curve flattens out over time: the reactants are used up and the rate **decreases** until it reaches zero in the final state. The rate is therefore greatest at the start.

## 4. Half-life of a reaction

> **Definition.** The **half-life** $t_{1/2}$ of a reaction is the time after which the extent of reaction reaches half of its final value: $x(t_{1/2}) = \dfrac{x_f}{2}$.

For a complete transformation in which $\mathrm{A}$ is the limiting reactant, it is also the time after which half of $\mathrm{A}$ has been consumed: $[\mathrm{A}](t_{1/2}) = \dfrac{[\mathrm{A}]_0}{2}$.

It is read from the curve: locate the ordinate $\dfrac{[\mathrm{A}]_0}{2}$ (or $\dfrac{x_f}{2}$), then read the corresponding abscissa. It gives an **order of magnitude of the duration** of the transformation: the transformation is considered to be practically complete after a few $t_{1/2}$. It is also used to choose the monitoring method: the measurement must be much faster than $t_{1/2}$.

## 5. First-order rate law

> **Definition.** A reaction follows a **first-order rate law** with respect to the reactant $\mathrm{A}$ if its volumetric rate of disappearance is proportional to its concentration:
>
> $$\displaystyle v_{\text{disp}}(\mathrm{A}) = -\frac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t} = k\,[\mathrm{A}]$$
>
> The rate constant $k$, which is positive, is expressed in $\mathrm{s^{-1}}$ and depends on the temperature.

The equation $\dfrac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t} + k\,[\mathrm{A}] = 0$ is a first-order linear differential equation. Its solution, with $[\mathrm{A}](0) = [\mathrm{A}]_0$, is:

$$
[\mathrm{A}](t) = [\mathrm{A}]_0\,\mathrm{e}^{-kt}
$$

Setting $[\mathrm{A}](t_{1/2}) = \dfrac{[\mathrm{A}]_0}{2}$ gives $\mathrm{e}^{-k t_{1/2}} = \dfrac{1}{2}$, that is:

$$
t_{1/2} = \frac{\ln 2}{k}
$$

For a first-order law, **the half-life does not depend on the initial concentration**: the concentration is divided by 2 every $t_{1/2}$, whatever the starting point.

**Recognising first order from measurements.** Three equivalent tests:

1. the curve $v_{\text{disp}} = f([\mathrm{A}])$ is a **straight line through the origin**, of gradient $k$;
2. the curve $\ln [\mathrm{A}] = f(t)$ is a **straight line** of gradient $-k$, because $\ln [\mathrm{A}] = \ln [\mathrm{A}]_0 - k\,t$;
3. the half-life is the same for several initial concentrations.

## Worked example

The decomposition of a species $\mathrm{A}$ in solution is studied, with initial concentration $[\mathrm{A}]_0 = 2.0 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}$. Measurements at different initial concentrations all give $t_{1/2} = 140\ \mathrm{s}$.

1. What can be deduced about the order of the reaction? Calculate $k$.
2. Calculate the initial volumetric rate of disappearance of $\mathrm{A}$.
3. What is the concentration of $\mathrm{A}$ after $7$ minutes?
4. After how long does $1\ \%$ of $\mathrm{A}$ remain?

<details>
<summary>Show the solution</summary>

1. The half-life does not depend on the initial concentration: the reaction is consistent with a first-order law. Then:

$$
k = \frac{\ln 2}{t_{1/2}} = \frac{0.693}{140} = 4.95 \times 10^{-3}\ \mathrm{s^{-1}}
$$

2. At $t = 0$: $v_0 = k\,[\mathrm{A}]_0 = 4.95 \times 10^{-3} \times 2.0 \times 10^{-2} = 9.9 \times 10^{-5}\ \mathrm{mol \cdot L^{-1} \cdot s^{-1}}$.

3. $7\ \mathrm{min} = 420\ \mathrm{s} = 3\,t_{1/2}$: the concentration has been divided by $2^3 = 8$.

$$
[\mathrm{A}] = \frac{2.0 \times 10^{-2}}{8} = 2.5 \times 10^{-3}\ \mathrm{mol \cdot L^{-1}}
$$

4. We look for $t$ such that $\mathrm{e}^{-kt} = 0.01$, that is $t = \dfrac{\ln 100}{k}$:

$$
t = \frac{4.61}{4.95 \times 10^{-3}} = 9.3 \times 10^{2}\ \mathrm{s}
$$

that is about $16\ \mathrm{min}$, in other words slightly less than $7\,t_{1/2}$.

</details>

## Key points

- A **slow** transformation is followed over time by a physical measurement (absorbance, conductivity, pressure).
- Temperature, concentration of the reactants and contact surface area are **kinetic factors**. A **catalyst** speeds up the reaction without changing the final state and without being consumed.
- $v_{\text{disp}}(\mathrm{A}) = -\dfrac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t}$ and $v_{\text{form}}(\mathrm{B}) = \dfrac{\mathrm{d}[\mathrm{B}]}{\mathrm{d}t}$: gradient of the tangent, in absolute value.
- $t_{1/2}$: time taken to reach half of the final extent of reaction.
- First order: $v = k\,[\mathrm{A}]$, $[\mathrm{A}] = [\mathrm{A}]_0\,\mathrm{e}^{-kt}$ and $t_{1/2} = \dfrac{\ln 2}{k}$, independent of $[\mathrm{A}]_0$.

## Common mistakes

- Forgetting the **minus sign** in the rate of disappearance, which gives a negative rate.
- Defining $t_{1/2}$ as half of the total duration of the reaction: it is the time taken to reach **half of the final extent of reaction**.
- Believing that a catalyst increases the amount of product obtained: it changes only the **rate**, not the final state.
- Calculating the gradient of a **chord** between two points instead of the **tangent** at the required point.
- Confusing $\ln$ and $\log$: $t_{1/2} = \dfrac{\ln 2}{k}$ involves the natural logarithm.
