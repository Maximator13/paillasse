---
titre: "Light interference with Young's double slit"
description: "Superpose the waves from two slits, observe the fringes on the screen and measure the fringe spacing to find the wavelength of the laser."
niveau: terminale
theme: ondes
matiere: physique
ordre: 17
duree: "1 h"
chapitre: "diffraction-interferences"
objectifs:
  - "Observe a light interference pattern and describe its fringes"
  - "Relate the path difference to the constructive or destructive nature of the interference"
  - "Measure a fringe spacing precisely by counting several fringes"
  - "Determine a wavelength from the fringe spacing relation"
materiel:
  - "Red laser diode (650 nm) on a stand"
  - "Set of Young's double slits of known separations (0.10 to 0.30 mm)"
  - "2 m optical bench with riders"
  - "White screen covered with graph paper"
  - "Tape measure and graduated ruler"
---

## Principle

A laser beam illuminates two narrow parallel slits, a distance $b$ apart. Each slit diffracts the light and behaves as a source: $S_1$ and $S_2$ emit two **coherent** waves (same frequency, constant phase difference), which superpose throughout the space behind the plate.

At a point $M$ on the screen, of abscissa $x$, the two waves have not travelled the same distance. For a screen placed at a distance $D$ very large compared with $b$ and $x$, the **path difference** is:

$$
\delta = S_2M - S_1M = \frac{b\,x}{D}
$$

- If $\delta = k\,\lambda$ ($k$ an integer), the waves arrive in phase: **constructive** interference, bright fringe.
- If $\delta = \left(k + \dfrac{1}{2}\right)\lambda$, they arrive in antiphase: **destructive** interference, dark fringe.

## Method

1. Align the laser, the double slit ($b = 0.20\ \mathrm{mm}$) and the screen on the bench. Measure the distance $D = 2.00\ \mathrm{m}$ between the plane of the slits and the screen.
2. Switch on the laser and centre the beam on the two slits: the two diffracted waves overlap behind the plate.
3. Observe on the screen the regular alternation of bright and dark fringes: the fringes are parallel to the slits and follow one another in the perpendicular direction.
4. Locate the central fringe ($\delta = 0$), then the first dark fringe ($\delta = \lambda / 2$) and the next bright fringe ($\delta = \lambda$).
5. Measure the distance spanning several bright fringes (here 4 fringe spacings) and deduce the fringe spacing $i$.
6. Calculate the wavelength of the laser and compare it with the manufacturer's value.

## Analysis

Two consecutive bright fringes correspond to $\delta$ increasing by $\lambda$, and therefore to $x$ increasing by the **fringe spacing**:

$$
i = \frac{\lambda\,D}{b} \qquad\Longrightarrow\qquad \lambda = \frac{i\,b}{D}
$$

We measure $4\,i = 26.0\ \mathrm{mm}$, so $i = 6.50\ \mathrm{mm}$. With $b = 0.20\ \mathrm{mm}$ and $D = 2.00\ \mathrm{m}$:

$$
\lambda = \frac{6.50 \times 10^{-3} \times 0.20 \times 10^{-3}}{2.00}\ \mathrm{m}
$$

so $\lambda = 6.5 \times 10^{-7}\ \mathrm{m} = 650\ \mathrm{nm}$, the value stated by the manufacturer.

Measuring $4\,i$ rather than $i$ divides the reading uncertainty by 4: an error of $0.5\ \mathrm{mm}$ on $26.0\ \mathrm{mm}$ amounts to only 2 %, compared with 8 % on a single fringe spacing. The curve $I / I_{max} = f(x)$ is a sinusoid of period $i$, with a maximum at $x = 0$.

## Questions

1. Why would two separate lasers, each illuminating one slit, not produce fringes?
2. In the animation, change the separation $b$ from 0.20 to 0.10 mm. How does the fringe spacing change? How many bright fringes remain visible on the screen?
3. Set $b = 0.20\ \mathrm{mm}$ again, set the wavelength to 450 nm, then bring the screen closer to $D = 1.2\ \mathrm{m}$. Predict the fringe spacing by calculation, then check it against the measurements.

<details>
<summary>Show answers</summary>

1. Two independent lasers are not coherent: their phase difference varies randomly and very rapidly, and the fringes are washed out. The two slits illuminated by the same beam, on the other hand, keep a constant phase difference.
2. $i$ is inversely proportional to $b$: it doubles, from 6.5 mm to 13 mm. The fringes are twice as wide, so there are half as many across the same width of screen (3 instead of 7 between $-20$ and $+20\ \mathrm{mm}$).
3. $i$ is proportional to $\lambda$ and to $D$. With $b = 0.20\ \mathrm{mm}$: $i = \dfrac{450 \times 10^{-9} \times 1.2}{0.20 \times 10^{-3}} = 2.7\ \mathrm{mm}$. The fringes are blue and much more closely spaced.

</details>

## Safety

Never look directly into the laser beam or point it at a classmate. Remove watches and reflective jewellery, and work with the beam horizontal, below eye level.
