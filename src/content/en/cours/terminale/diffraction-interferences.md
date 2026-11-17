---
titre: "Diffraction and interference: when waves meet"
description: "Characteristic angle of diffraction, constructive and destructive interference, Young's slits and fringe spacing: the properties specific to waves."
niveau: terminale
theme: ondes
ordre: 21
duree: "30 min"
motsCles: ["diffraction", "interference", "Young's slits", "fringe spacing", "optical path difference"]
tp: ["diffraction", "interferences-young"]
---

> **The essentials.** A wave passing through an opening of a size comparable to its wavelength spreads out: this is **diffraction**, with characteristic angle $\theta = \lambda / a$. Two coherent waves that superpose add together or cancel out depending on their **optical path difference**: this is **interference**, which gives, with Young's slits, fringes regularly spaced by $i = \lambda D / b$.

## 1. Diffraction by an opening

When a wave (light, sound, on the surface of water) meets an opening or an obstacle, it no longer travels only in a straight line: it spreads out behind the opening. This phenomenon is **diffraction**.

> **Definition.** Diffraction is the change in the direction of propagation of a wave that meets an opening or an obstacle. It becomes more pronounced as the dimension $a$ of the opening gets closer to the wavelength $\lambda$, or smaller than it.

It changes neither the frequency nor the wavelength: only the direction of propagation is modified.

With a laser illuminating a narrow vertical slit, a very bright **central spot** is observed on a screen, spread out horizontally (perpendicular to the slit), flanked by less intense secondary spots. The dark zones are called minima.

> **Law.** For a slit of width $a$ (or a wire of diameter $a$) illuminated by a wave of wavelength $\lambda$, the **angular separation** $\theta$ between the middle of the central spot and the first minimum satisfies:
>
> $$
> \theta = \frac{\lambda}{a}
> $$
>
> with $\theta$ in radians, $\lambda$ and $a$ in the same unit.

Direct consequences:

- the **narrower** the slit, the **wider** the central spot;
- for a given slit, red light ($\lambda \approx 650\ \mathrm{nm}$) diffracts more than blue light ($\lambda \approx 450\ \mathrm{nm}$).

A wire of diameter $a$ gives the same pattern as a slit of the same width (Babinet's theorem, accepted without proof, beyond the syllabus): this is how the diameter of a hair is measured with a laser.

## 2. Measuring the angle of diffraction

The angle $\theta$ is deduced from the width $L$ of the central spot, measured on a screen placed at a distance $D$ from the slit. The spot is symmetrical: its half-width is $L/2$, and:

$$
\tan\theta = \frac{L/2}{D} = \frac{L}{2D}
$$

The screen is very far away ($D \gg L$), so $\theta$ is small and $\tan\theta \approx \theta$ (in radians). Combining with the previous law:

$$
\theta = \frac{L}{2D} = \frac{\lambda}{a}
\qquad\text{that is}\qquad
L = \frac{2\lambda D}{a}
$$

The width $L$ is **inversely proportional** to $a$. Experimentally, $\theta$ is plotted against $1/a$ for several slits: a straight line through the origin is obtained, with gradient $\lambda$.

| Quantity | Effect on the central spot |
|---|---|
| $a$ decreases | $L$ increases |
| $\lambda$ increases | $L$ increases |
| $D$ increases | $L$ increases, $\theta$ does not change |

## 3. Interference of two waves

When two waves superpose at the same point, their effects add together. To obtain a pattern that is stable over time, the two sources must be **coherent**: they emit waves of the **same frequency** and have a **constant phase difference**. In practice, two coherent sources are obtained by splitting a single source (two slits illuminated by the same laser).

> **Definition.** Interference is the phenomenon of superposition of two coherent waves, which leads to a resultant amplitude that varies from one point in space to another.

At the point $M$, the wave from $S_2$ has travelled a different path from the one from $S_1$. The **optical path difference** is defined as (in air, it coincides with the difference in distances):

$$
\delta = S_2M - S_1M
$$

There are two extreme cases.

> **Constructive interference.** The waves arrive **in phase** at $M$: the amplitude is at a maximum. This is the case when $\delta$ is a whole-number multiple of the wavelength:
>
> $$
> \delta = k\,\lambda \qquad (k \in \mathbb{Z})
> $$

> **Destructive interference.** The waves arrive **in antiphase** at $M$: the amplitude is at a minimum (zero if the two waves have the same amplitude). This is the case when $\delta$ is an odd multiple of half the wavelength:
>
> $$
> \delta = \left(k + \frac{1}{2}\right)\lambda \qquad (k \in \mathbb{Z})
> $$

This result holds for all waves: two loudspeakers fed by the same generator create zones of loud sound and of relative silence, two points vibrating on the surface of water trace out motionless lines.

## 4. Young's slits

In the **Young's slits** experiment, a laser illuminates two narrow parallel slits a distance $b$ apart. Each slit diffracts the light: the two diffracted beams overlap and interfere. On a screen at a distance $D$ ($D \gg b$), an alternation of **bright fringes** (constructive interference) and **dark fringes** (destructive interference) is observed, straight and parallel to the slits.

For a point $M$ on the screen at a distance $x$ from the centre of the pattern, the optical path difference is written (an approximation valid for $b$ and $x$ small compared with $D$):

$$
\delta = \frac{b\,x}{D}
$$

The bright fringes correspond to $\delta = k\lambda$, and therefore to $x_k = k\,\dfrac{\lambda D}{b}$. Two consecutive bright fringes are separated by a constant distance.

> **Definition.** The **fringe spacing** $i$ is the distance between the centres of two consecutive bright fringes (or of two consecutive dark fringes):
>
> $$
> i = \frac{\lambda\,D}{b}
> $$
>
> with $i$, $\lambda$, $D$ and $b$ in the same unit.

The central fringe ($x = 0$, $\delta = 0$) is always bright. To measure $i$ precisely, the length occupied by **several** fringe spacings is measured and then divided: the relative uncertainty is thereby reduced.

Interference fringes appear only where the beams diffracted by the two slits overlap, essentially within the central diffraction spot: the observed pattern combines the two phenomena.

## Worked example

A laser of wavelength $\lambda = 650\ \mathrm{nm}$ illuminates in turn:

1. a single slit of width $a = 0.10\ \mathrm{mm}$;
2. two Young's slits $b = 0.50\ \mathrm{mm}$ apart.

The screen is at $D = 2.00\ \mathrm{m}$. Calculate the angular separation $\theta$ and the width $L$ of the central spot in the first case, then the fringe spacing $i$ in the second. What length do 10 fringe spacings occupy?

<details>
<summary>Show the solution</summary>

**Diffraction.** Convert to metres: $\lambda = 650 \times 10^{-9}\ \mathrm{m}$, $a = 1.0 \times 10^{-4}\ \mathrm{m}$.

$$
\theta = \frac{\lambda}{a} = \frac{650 \times 10^{-9}}{1.0 \times 10^{-4}} = 6.5 \times 10^{-3}\ \mathrm{rad}
$$

$$
L = 2D\theta = 2 \times 2.00 \times 6.5 \times 10^{-3} = 2.6 \times 10^{-2}\ \mathrm{m} = 2.6\ \mathrm{cm}
$$

**Interference.** With $b = 5.0 \times 10^{-4}\ \mathrm{m}$:

$$
i = \frac{\lambda D}{b} = \frac{650 \times 10^{-9} \times 2.00}{5.0 \times 10^{-4}} = 2.6 \times 10^{-3}\ \mathrm{m} = 2.6\ \mathrm{mm}
$$

Ten fringe spacings occupy $10\,i = 26\ \mathrm{mm}$, a length that is easy to measure with a ruler to a good relative precision.

</details>

## Key points

- The smaller the opening compared with the wavelength, the more pronounced the diffraction: $\theta = \dfrac{\lambda}{a}$, with $\theta$ in radians.
- With a distant screen: $\theta \approx \dfrac{L}{2D}$, so $L = \dfrac{2\lambda D}{a}$.
- Two coherent waves interfere: **constructively** if $\delta = k\lambda$, **destructively** if $\delta = \left(k + \frac{1}{2}\right)\lambda$.
- Young's slits: fringe spacing $i = \dfrac{\lambda D}{b}$.

## Common mistakes

- Using the full width $L$ instead of the half-width $L/2$ in $\tan\theta$: the angle obtained is twice as large as it should be.
- Expressing $\theta$ in degrees in $\theta = \lambda/a$: the relation is valid only in **radians**.
- Mixing units: $\lambda$ in nanometres, $a$ in millimetres and $D$ in metres must be converted to the same unit before the calculation.
- Confusing $a$ (the width of one slit, which sets the diffraction) and $b$ (the distance between the two slits, which sets the fringe spacing).
- Believing that any two sources interfere: without coherence (same frequency, constant phase difference), the pattern is not stable and cannot be observed.
