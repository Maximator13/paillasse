---
titre: "Radioactivity: nuclear transformations and decay"
description: "Nuclear stability, alpha and beta decay, the decay law, half-life and activity: from carbon-14 dating to nuclear medicine."
niveau: terminale
theme: matiere
ordre: 6
duree: "30 min"
motsCles: ["radioactivity", "half-life", "activity", "decay", "dating", "nucleus"]
tp: ["decroissance-radioactive"]
---

> **In brief.** An unstable nucleus decays spontaneously by emitting a particle ($\alpha$, $\beta^-$ or $\beta^+$), often accompanied by $\gamma$ radiation. This phenomenon is **random** for a single nucleus, but a population of nuclei decays in a perfectly predictable way: **exponentially**, with a **half-life** specific to each isotope. This is the key to dating and to many medical applications, which require radiation protection rules.

## 1. Stability of nuclei

A nucleus ${}^{A}_{Z}\mathrm{X}$ contains $A$ nucleons: $Z$ protons and $N = A - Z$ neutrons. Nuclei with the same $Z$ but different $A$ are **isotopes** (for example ${}^{12}_{6}\mathrm{C}$ and ${}^{14}_{6}\mathrm{C}$).

On the **$(N, Z)$ chart** ($N$ on the horizontal axis, $Z$ on the vertical axis), each known nucleus is represented by a point. The stable nuclei cluster in a narrow band, the **valley of stability**:

- for $Z < 20$ approximately, it follows the line $N = Z$;
- for heavier nuclei, it curves towards $N > Z$: more neutrons are needed to hold the nucleus together;
- beyond $Z = 82$ (lead), no nucleus is stable.

> **Definition.** A **radioactive** nucleus is an unstable nucleus that transforms spontaneously into another, more stable nucleus by emitting one or more particles. The position of the nucleus on the $(N, Z)$ chart makes it possible to predict its type of decay.

## 2. The different types of radioactivity

A nuclear reaction equation obeys the **conservation laws** (Soddy's laws):

> **Law.** During a nuclear transformation, the **nucleon number** $A$ is conserved and the **charge number** $Z$ is conserved.

| Type | Particle emitted | Nuclei concerned | General equation |
|---|---|---|---|
| $\alpha$ | helium nucleus ${}^{4}_{2}\mathrm{He}$ | heavy nuclei ($A > 200$) | ${}^{A}_{Z}\mathrm{X} \rightarrow {}^{A-4}_{Z-2}\mathrm{Y} + {}^{4}_{2}\mathrm{He}$ |
| $\beta^-$ | electron ${}^{0}_{-1}\mathrm{e}$ | excess of neutrons (below the valley) | ${}^{A}_{Z}\mathrm{X} \rightarrow {}^{A}_{Z+1}\mathrm{Y} + {}^{0}_{-1}\mathrm{e}$ |
| $\beta^+$ | positron ${}^{0}_{1}\mathrm{e}$ | excess of protons (above the valley) | ${}^{A}_{Z}\mathrm{X} \rightarrow {}^{A}_{Z-1}\mathrm{Y} + {}^{0}_{1}\mathrm{e}$ |

Examples:

$$
{}^{238}_{92}\mathrm{U} \rightarrow {}^{234}_{90}\mathrm{Th} + {}^{4}_{2}\mathrm{He}
\qquad
{}^{60}_{27}\mathrm{Co} \rightarrow {}^{60}_{28}\mathrm{Ni} + {}^{0}_{-1}\mathrm{e}
\qquad
{}^{18}_{9}\mathrm{F} \rightarrow {}^{18}_{8}\mathrm{O} + {}^{0}_{1}\mathrm{e}
$$

In $\beta^-$ decay, a neutron in the nucleus turns into a proton; in $\beta^+$ decay, a proton turns into a neutron. These emissions are also accompanied by a particle of almost zero mass (a neutrino or an antineutrino), which is not written at secondary school level.

**$\gamma$ emission.** The daughter nucleus is often produced in an **excited** state, written ${}^{A}_{Z}\mathrm{Y}^*$. It returns to its ground state by emitting a photon of very high energy:

$$
{}^{A}_{Z}\mathrm{Y}^* \rightarrow {}^{A}_{Z}\mathrm{Y} + \gamma
$$

Neither $A$ nor $Z$ changes: $\gamma$ emission does not alter the nature of the nucleus.

## 3. The radioactive decay law

It is impossible to predict the instant at which **one** given nucleus will decay. However, for a large number $N$ of nuclei, the number of decays during a time interval $\mathrm{d}t$ is proportional to $N$ and to $\mathrm{d}t$:

$$
\mathrm{d}N = -\lambda\,N\,\mathrm{d}t
\qquad\text{that is}\qquad
\frac{\mathrm{d}N}{\mathrm{d}t} = -\lambda\,N
$$

> **Definition.** The **decay constant** $\lambda$ (in $\mathrm{s^{-1}}$) is characteristic of an isotope: it is the probability of decay of a nucleus per unit time. It depends neither on temperature, nor on pressure, nor on the chemical environment.

The solution of this differential equation, with $N(0) = N_0$, is the **decay law**:

$$
N(t) = N_0\,\mathrm{e}^{-\lambda t}
$$

> **Definition.** The **half-life** $t_{1/2}$ is the time after which half of the nuclei initially present have decayed.

Writing $N(t_{1/2}) = \dfrac{N_0}{2}$ gives $\mathrm{e}^{-\lambda t_{1/2}} = \dfrac{1}{2}$, hence:

$$
t_{1/2} = \frac{\ln 2}{\lambda}
$$

After $n$ half-lives, $\dfrac{N_0}{2^n}$ nuclei remain: about $3\ \%$ after 5 half-lives, $0.1\ \%$ after 10.

| Isotope | Type | Half-life |
|---|---|---|
| Fluorine-18 | $\beta^+$ | $110\ \mathrm{min}$ |
| Iodine-131 | $\beta^-$ | $8.0\ \mathrm{days}$ |
| Carbon-14 | $\beta^-$ | $5\,730\ \mathrm{years}$ |
| Uranium-238 | $\alpha$ | $4.5 \times 10^{9}\ \mathrm{years}$ |

## 4. Activity of a sample

> **Definition.** The **activity** $A$ of a sample is the number of decays per second. It is expressed in **becquerels** ($1\ \mathrm{Bq} = 1$ decay per second).

$$
A(t) = -\frac{\mathrm{d}N}{\mathrm{d}t} = \lambda\,N(t)
\qquad\text{so}\qquad
A(t) = A_0\,\mathrm{e}^{-\lambda t}
$$

The activity decreases with the same half-life as the number of nuclei. It is **measured** directly with a counter (Geiger counter), which makes it possible to follow the decay without counting the nuclei. Orders of magnitude: the human body has an activity of about $8\ \mathrm{kBq}$ (potassium-40 and carbon-14), a school source a few $\mathrm{kBq}$.

## 5. Dating and medical applications

**Dating.** If the initial activity $A_0$ is known and $A(t)$ is measured, the age can be deduced:

$$
t = \frac{1}{\lambda}\ln\frac{A_0}{A} = \frac{t_{1/2}}{\ln 2}\ln\frac{A_0}{A}
$$

A living organism exchanges carbon with the atmosphere: its proportion of carbon-14 is constant. When it dies, the exchanges stop and the carbon-14 decays. This method dates organic remains up to about $50\,000$ years old. For rocks, isotopes with a very long half-life are used (uranium-238, potassium-40). An isotope is chosen whose half-life is of the same order as the age being sought.

**Nuclear medicine.**

- **Imaging (PET)**: a molecule labelled with fluorine-18, a $\beta^+$ emitter, is injected. The positron annihilates with an electron, emitting two $\gamma$ photons that are detected around the patient. The short half-life limits the dose received.
- **Radiotherapy**: a beam of ionising radiation (X-ray or $\gamma$ photons, electrons) destroys tumour cells. In internal radiotherapy, iodine-131, taken up by the thyroid, treats certain cancers of that organ.

**Radiation protection.** The radiation is **ionising**: it can damage DNA. Protection is based on three principles: limit the **duration** of exposure, increase the **distance** from the source, place a **shield** in between. $\alpha$ particles are stopped by a sheet of paper, $\beta$ particles by a few millimetres of aluminium, and $\gamma$ rays require several centimetres of lead or a concrete wall.

## Worked example

A fragment of wood found on an archaeological site has an activity due to carbon-14 equal to $60\ \%$ of that of present-day wood of the same mass. The half-life of carbon-14 is $t_{1/2} = 5\,730\ \mathrm{years}$.

1. Write the equation for the $\beta^-$ decay of carbon-14.
2. Calculate the decay constant $\lambda$ in $\mathrm{s^{-1}}$ (take $1\ \mathrm{year} = 3.156 \times 10^{7}\ \mathrm{s}$).
3. Estimate the age of the fragment.

<details>
<summary>Show the solution</summary>

1. By conservation of $A$ and $Z$:

$$
{}^{14}_{6}\mathrm{C} \rightarrow {}^{14}_{7}\mathrm{N} + {}^{0}_{-1}\mathrm{e}
$$

2. $t_{1/2} = 5\,730 \times 3.156 \times 10^{7} = 1.808 \times 10^{11}\ \mathrm{s}$, so:

$$
\lambda = \frac{\ln 2}{t_{1/2}} = \frac{0.693}{1.808 \times 10^{11}} = 3.83 \times 10^{-12}\ \mathrm{s^{-1}}
$$

3. We have $\dfrac{A}{A_0} = 0.60$. The age is:

$$
t = \frac{t_{1/2}}{\ln 2}\ln\frac{A_0}{A} = \frac{5\,730}{0.693} \times \ln\frac{1}{0.60} = 8\,268 \times 0.511 \approx 4.2 \times 10^{3}\ \mathrm{years}
$$

Check: $0.60$ lies between $1$ and $0.5$, so the age must be less than one half-life, which is the case.

</details>

## Key points

- Conservation laws: the nucleon number $A$ and the charge number $Z$ are conserved.
- $\alpha$: heavy nuclei; $\beta^-$: excess of neutrons; $\beta^+$: excess of protons; $\gamma$: de-excitation with no change of nucleus.
- Decay law: $N(t) = N_0\,\mathrm{e}^{-\lambda t}$ and $A(t) = \lambda N(t) = A_0\,\mathrm{e}^{-\lambda t}$.
- Half-life: $t_{1/2} = \dfrac{\ln 2}{\lambda}$, independent of the initial amount.
- Dating: $t = \dfrac{t_{1/2}}{\ln 2}\ln\dfrac{A_0}{A}$.

## Common mistakes

- Believing that after two half-lives all the nuclei have disappeared: a quarter of them remain.
- Forgetting to convert $t_{1/2}$ into seconds before calculating $\lambda$ in $\mathrm{s^{-1}}$ or an activity in $\mathrm{Bq}$.
- Confusing the positron ${}^{0}_{1}\mathrm{e}$ with the electron ${}^{0}_{-1}\mathrm{e}$, or writing an equation without checking the conservation of $A$ and $Z$.
- Thinking that heating or dissolving a sample changes its half-life: decay is a purely nuclear phenomenon.
