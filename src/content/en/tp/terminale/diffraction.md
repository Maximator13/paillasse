---
titre: "Diffraction of a laser beam by a slit"
description: "Narrow a slit in the path of a laser, measure the central maximum and plot L against 1/a to determine the wavelength."
niveau: terminale
theme: ondes
matiere: physique
ordre: 16
duree: "1 h 30"
chapitre: "diffraction-interferences"
objectifs:
  - "Observe the diffraction of a light wave by a slit"
  - "Use the relationship between the diffraction angle, the wavelength and the slit width"
  - "Measure the width of the central maximum for several slits"
  - "Determine a wavelength from the gradient of a straight line"
materiel:
  - "Class 2 red laser diode on a stand"
  - "Graduated optical bench"
  - "Set of calibrated slits from 40 µm to 200 µm"
  - "Matt white screen"
  - "Ruler graduated in millimetres or graph paper"
  - "Tape measure to measure D"
---

## Principle

When a light wave of wavelength $\lambda$ meets a narrow slit, whose width $a$ is not too large compared with $\lambda$ (here of the order of a hundred times $\lambda$), it no longer travels in a straight line: it spreads out. This is **diffraction**. On a screen placed at a distance $D$, we observe a very bright central maximum, twice as wide as the secondary maxima on either side of it, separated by dark minima.

The characteristic diffraction angle $\theta$, between the axis of the beam and the first minimum, satisfies:

$$
\theta = \frac{\lambda}{a}
$$

with $\theta$ in radians, $\lambda$ and $a$ in metres. The narrower the slit, the more the beam spreads out.

## Method

1. Align the laser, the slit holder and the screen on the optical bench. Place the screen at $D = 2.00\ \mathrm{m}$ from the slit.
2. Switch on the laser with the slit wide open: the beam forms a single dot on the screen.
3. Narrow the slit to $a = 100\ \mathrm{\mu m}$ and observe the pattern, which is perpendicular to the direction of the slit.
4. Locate the two minima on either side of the central maximum and measure its width $L$ with the ruler.
5. Repeat for the six calibrated slits (200, 120, 100, 70, 50 and 40 µm) without changing $D$.
6. Plot $L$ against $1/a$ and determine the gradient of the straight line obtained.

## Analysis

The first minimum lies at a distance $L/2$ from the centre of the pattern. Since the angle is very small, $\tan\theta \approx \theta$:

$$
\tan\theta = \frac{L}{2D} \approx \theta
$$

With $\theta = \lambda/a$, we obtain:

$$
L = \frac{2\lambda D}{a}
$$

$L$ is therefore proportional to $1/a$: the points lie on a straight line through the origin, of gradient $k = 2\lambda D$. The widths $L$ below are read with the ruler, to the nearest millimetre.

| $a$ (µm) | $1/a$ ($\mathrm{mm^{-1}}$) | $L$ (mm) |
|---|---|---|
| 200 | 5.0 | 13 |
| 120 | 8.3 | 22 |
| 100 | 10.0 | 26 |
| 70 | 14.3 | 37 |
| 50 | 20.0 | 52 |
| 40 | 25.0 | 65 |

The gradient is $k = 2.60\ \mathrm{mm^2} = 2.60 \times 10^{-6}\ \mathrm{m^2}$, hence:

$$
\lambda = \frac{k}{2D} = \frac{2.60 \times 10^{-6}}{2 \times 2.00} = 650\ \mathrm{nm}
$$

This value is consistent with the red light of a laser diode. Using the gradient rather than a single measurement reduces the effect of reading errors in $L$.

## Questions

1. Why do we measure the width of the central maximum between two minima rather than estimating its bright edges directly?
2. In the animation, set the laser to 450 nm without touching the slit. How does the central maximum change? What happens to the gradient of the line?
3. Move the screen back to $D = 2.5\ \mathrm{m}$. Does the angle $\theta$ change? What about the width $L$?

<details>
<summary>Show answers</summary>

1. The intensity falls off gradually towards the edges: their position is blurred. A minimum is a sharp dark region, which can be located to the nearest millimetre.
2. $L$ is proportional to $\lambda$: the central maximum narrows (18.0 mm instead of 26.0 mm for $a = 100\ \mathrm{\mu m}$). The gradient $2\lambda D$ decreases in the same ratio: blue light is diffracted less than red light.
3. $\theta = \lambda/a$ does not depend on $D$: it remains equal to 6.5 mrad. However, $L = 2D\theta$ increases, from 26.0 mm to 32.5 mm: moving the screen further away improves the relative precision of $L$.

</details>

## Safety

Even a class 2 laser can damage the retina. Never look along the axis of the beam, either directly or after reflection: remove watches and jewellery, and move any reflective object out of the way. Keep the beam horizontal, below eye level, and work standing up. Switch off the laser before every change of slit or adjustment.
