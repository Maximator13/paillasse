---
titre: "Satellites and Kepler's laws: weighing the Earth"
description: "Put a satellite into orbit, check the law of equal areas on an ellipse, then plot T² against r³ to deduce the mass of the Earth."
niveau: terminale
theme: mouvement
matiere: physique
ordre: 11
duree: "1 h"
chapitre: "mouvement-champ-gravitation"
objectifs:
  - "Show that the circular motion of a satellite is uniform"
  - "Illustrate the law of equal areas on an elliptical orbit"
  - "Verify Kepler's third law with several satellites"
  - "Determine the mass of the Earth from the gradient of the straight line"
materiel:
  - "Animation on this page (altitude, eccentricity and mass sliders)"
  - "Orbital data for four satellites: ISS, GPS, Galileo, Meteosat"
  - "Spreadsheet and graphing software with linear fitting"
  - "Calculator"
---

## Principle

In the geocentric frame of reference, assumed to be inertial (Galilean), a satellite of mass $m$ is subject only to the gravitational force exerted by the Earth, of mass $M$. On a circular orbit of radius $r$, Newton's second law is written in the Frenet frame:

$$
\frac{G\,M\,m}{r^2} = m\,\frac{v^2}{r} \;\Longrightarrow\; v = \sqrt{\frac{G\,M}{r}}
$$

The force is centripetal, perpendicular to the velocity: the value of $v$ stays constant, so the motion is **uniform circular motion**. The period is $T = \dfrac{2\pi r}{v}$, which gives Kepler's third law:

$$
\frac{T^2}{r^3} = \frac{4\pi^2}{G\,M}
$$

## Method

1. Launch the satellite up to its orbit. Identify the direction of the force (towards the centre of the Earth) and that of the velocity (tangent to the path).
2. Time one complete revolution to measure the period $T$, then plot the point $(r^3,\ T^2)$ on the graph.
3. Make the orbit elliptical. Compare the areas swept out by the Earth-satellite radius during two equal time intervals $\Delta t = T/10$, at apogee and then at perigee.
4. Add the ISS, GPS, Galileo and Meteosat satellites. Record $r$ and $T$ for each one, then plot the points.
5. Fit the set of points with a straight line through the origin and record its gradient $k$.

## Analysis

With the initial settings (altitude of $30\,000\ \mathrm{km}$), $r = 3.64 \times 10^{7}\ \mathrm{m}$: the animation displays $v = 3.31\ \mathrm{km \cdot s^{-1}}$ and $T = 19.18\ \mathrm{h}$.

| Satellite | $r$ (km) | $T$ (h) |
|---|---|---|
| ISS | 6 780 | 1.54 |
| GPS | 26 560 | 11.97 |
| Galileo | 29 600 | 14.08 |
| Meteosat | 42 164 | 23.94 |

The points lie on a straight line through the origin: $T^2 = k\,r^3$, with $k = 9.90 \times 10^{-14}\ \mathrm{s^2 \cdot m^{-3}}$. We deduce:

$$
M = \frac{4\pi^2}{G\,k} = 5.97 \times 10^{24}\ \mathrm{kg}
$$

On the ellipse (eccentricity 0.50, semi-major axis $a = 28\,247\ \mathrm{km}$), the speed goes from $6.51\ \mathrm{km \cdot s^{-1}}$ at perigee to $2.17\ \mathrm{km \cdot s^{-1}}$ at apogee: the sector swept out close to the Earth is short and wide, the other long and narrow, but their areas are equal. The third law still holds if $r$ is replaced by $a$.

## Questions

1. Decrease the altitude of the satellite. How do the speed and the period change? Does the point stay on the straight line?
2. Double the mass of the central body. What happens to the gradient of the line? And to the period of each satellite?
3. Why must a geostationary satellite be at one very specific altitude?

<details>
<summary>Show answers</summary>

1. The speed increases ($v$ varies as $1/\sqrt{r}$) and the period decreases. The point slides along the straight line: the ratio $T^2/r^3$ does not depend on the satellite.
2. The gradient $k = 4\pi^2/(G\,M)$ is divided by 2. Each period is divided by $\sqrt{2}$: a more massive body imposes faster revolutions.
3. Its period must be equal to the sidereal day ($86\,164\ \mathrm{s}$). The third law then allows only one radius, $r = 42\,164\ \mathrm{km}$, that is an altitude close to $35\,800\ \mathrm{km}$, in the plane of the equator.

</details>
