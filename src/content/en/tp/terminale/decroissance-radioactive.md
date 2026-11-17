---
titre: "Radioactive decay and half-life"
description: "Watch radon-220 nuclei decay at random, count the particles emitted and recover the exponential law and the half-life."
niveau: terminale
theme: matiere
matiere: physique
ordre: 5
duree: "1 h"
chapitre: "radioactivite"
objectifs:
  - "Relate the random nature of a single decay to the decay law of a population of nuclei"
  - "Determine a half-life from the curve N(t)"
  - "Calculate the decay constant and the activity of a sample"
materiel:
  - "Sealed radon-220 source (thoron flask)"
  - "Radiation counter and its detector tube"
  - "Stopwatch"
  - "Computer with spreadsheet and graphing software"
  - "Protective screen and handling tongs"
---

## Principle

A radioactive nucleus is unstable: it changes spontaneously into another nucleus by emitting a particle. Radon-220 is an α emitter:

$$
\mathrm{^{220}_{86}Rn \rightarrow {}^{216}_{84}Po + {}^{4}_{2}He}
$$

It is impossible to predict the instant at which a given nucleus decays. However, every nucleus has the same probability $\lambda$ of decaying per unit time. For a population of $N$ nuclei, the number of decays per second, called the **activity**, is therefore $A = \lambda N$, and the number of remaining nuclei follows the decay law:

$$
N(t) = N_0\,\mathrm{e}^{-\lambda t}
$$

In the animation, every particle emitted is directed towards the counter. A real detector receives only a fraction of them, but the number of counts recorded remains proportional to the activity.

## Method

1. Place the radon-220 sample in the chamber, facing the counter tube. Note the initial number of nuclei $N_0$.
2. Observe a single decay: identify the parent nucleus, the daughter nucleus and the particle emitted.
3. Start the stopwatch and the count. Record the number of remaining nuclei every ten seconds for $300\ \mathrm{s}$.
4. Plot $N = f(t)$, superimpose the model curve $N_0\,\mathrm{e}^{-\lambda t}$, then read the half-life $t_{1/2}$ at the ordinate $N_0/2$.
5. Calculate the decay constant $\lambda$ and the initial activity $A_0$.

## Analysis

The **half-life** $t_{1/2}$ is the time after which half of the nuclei initially present have decayed. Writing $N(t_{1/2}) = N_0/2$ in the decay law gives:

$$
t_{1/2} = \frac{\ln 2}{\lambda} \qquad\Longleftrightarrow\qquad \lambda = \frac{\ln 2}{t_{1/2}}
$$

With the default settings, $N_0 = 160$ and $t_{1/2} = 56\ \mathrm{s}$:

$$
\lambda = \frac{0.693}{56} = 1.24 \times 10^{-2}\ \mathrm{s^{-1}}
$$

$$
A_0 = \lambda N_0 = 1.24 \times 10^{-2} \times 160 \approx 2.0\ \mathrm{Bq}
$$

After two half-lives ($112\ \mathrm{s}$), $N_0/4 = 40$ nuclei remain, and after $300\ \mathrm{s}$ about $160 \times \mathrm{e}^{-3.71} \approx 4$ remain. The activity is halved at each half-life, just like $N$.

The experimental curve is an irregular staircase: it fluctuates around the model curve, because decays are random. The half-life read from a single draw can therefore differ from the expected value by several seconds.

## Questions

1. Change the "Random draw" slider several times. What changes, and what does not?
2. Set the number of nuclei to 64, then to 208. In which case does the measured curve fit the model best? What would happen with a real sample?
3. A sample has a half-life of $56\ \mathrm{s}$. After how long is its activity divided by 8? Check by setting the half-life slider to 56 s.

<details>
<summary>Show answers</summary>

1. The nuclei that decay and the exact instants change, so the detail of the staircase changes too. The model curve, the half-life and the decay constant do not change: they characterise the nucleus, not the draw.
2. With 208 nuclei, the relative fluctuations are smaller (they vary as $1/\sqrt{N}$). A real sample contains far more (several hundred thousand in a thoron flask whose activity is a few kilobecquerels): the measured curve comes much closer to the exponential.
3. Dividing by $8 = 2^3$ takes three half-lives, that is $3 \times 56 = 168\ \mathrm{s}$. On the graph, about $N_0/8 = 20$ nuclei then remain.

</details>

## Safety

A sealed radioactive source is never opened and is handled with tongs, behind a screen, for as short a time as possible. It is returned to its container as soon as the measurements are finished.
