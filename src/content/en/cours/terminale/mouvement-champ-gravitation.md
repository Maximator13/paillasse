---
titre: "Motion in a gravitational field: satellites and planets"
description: "Uniform circular orbits, speed and period of a satellite, Kepler's laws and geostationary satellites: the celestial mechanics of the Terminale syllabus."
niveau: terminale
theme: mouvement
ordre: 16
duree: "30 min"
motsCles: ["gravitation", "satellite", "circular orbit", "Kepler's laws", "geostationary", "orbital period"]
tp: ["satellite-kepler"]
---

> **In brief.** A satellite or a planet is subject only to the gravitational force exerted by the attracting body. Applied to a circular orbit, Newton's second law requires the motion to be **uniform**, with a speed and a period that depend only on the radius of the orbit and the mass of the central body. This leads back to Kepler's third law: $\dfrac{T^2}{r^3}$ is the same for all bodies orbiting the same central body. Kepler's laws also describe elliptical orbits, and a geostationary satellite orbits in the plane of the equator, at an altitude of about $36\,000\ \mathrm{km}$.

## 1. The framework of the study

We study the motion of a body of mass $m$ (satellite, planet) around a body of mass $M$ (the Earth, the Sun) with a **spherically symmetric mass distribution**. Any other action is neglected (friction, attraction of other bodies).

The choice of reference frame depends on the system:

| System studied | Attracting body | Reference frame |
|---|---|---|
| Planet, comet | Sun | **heliocentric** (centre of the Sun, axes pointing towards three distant stars) |
| Moon, artificial satellite | Earth | **geocentric** (centre of the Earth, axes pointing towards three distant stars) |

These reference frames are assumed to be **Galilean** (inertial) over the duration of the study.

> **Law of universal gravitation.** The body of mass $M$, with centre $O$, exerts on the body of mass $m$, with centre $S$, located at the distance $r = OS$, the force $\vec{F} = -\,G\,\dfrac{M\,m}{r^2}\,\vec{u}$, where $\vec{u}$ is the unit vector directed from $O$ towards $S$ and $G = 6.67 \times 10^{-11}\ \mathrm{N \cdot m^2 \cdot kg^{-2}}$ is the universal gravitational constant.

$$
\vec{F} = -\,G\,\frac{M\,m}{r^2}\,\vec{u}
$$

For a satellite of the Earth at altitude $h$, we have $r = R_T + h$, where $R_T$ is the radius of the Earth. It is the distance to the **centre** of the body that matters, not the altitude.

## 2. The Frenet frame

For circular motion, we use the **Frenet frame** $(S, \vec{u}_t, \vec{u}_n)$, attached to the moving body:

- $\vec{u}_t$ is **tangent** to the trajectory, pointing in the direction of motion;
- $\vec{u}_n$ is **normal** to the trajectory, directed towards the centre $O$ of the circle (so $\vec{u}_n = -\vec{u}$).

In this frame, the acceleration of a point in circular motion of radius $r$ is written:

$$
\vec{a} = \frac{\mathrm{d}v}{\mathrm{d}t}\,\vec{u}_t + \frac{v^2}{r}\,\vec{u}_n
$$

The tangential component expresses the change in the magnitude of the velocity; the normal component, always directed towards the centre, expresses the change in direction.

## 3. The circular motion is uniform

We apply Newton's second law to the body, in the chosen Galilean reference frame: $m\,\vec{a} = \vec{F}$. In the Frenet frame, the force is written $\vec{F} = G\,\dfrac{Mm}{r^2}\,\vec{u}_n$, hence:

$$
\vec{a} = G\,\frac{M}{r^2}\,\vec{u}_n
$$

The acceleration does not depend on the mass $m$ of the satellite. Equating the two expressions component by component:

- along $\vec{u}_t$: $\dfrac{\mathrm{d}v}{\mathrm{d}t} = 0$, so $v$ is constant: **the motion is uniform**;
- along $\vec{u}_n$: $\dfrac{v^2}{r} = G\,\dfrac{M}{r^2}$.

> **Speed on a circular orbit.** A body in a circular orbit of radius $r$ around a body of mass $M$ has a constant speed $v = \sqrt{\dfrac{G\,M}{r}}$.

$$
v = \sqrt{\frac{G\,M}{r}}
$$

The higher the orbit, the **slower** the satellite. The speed depends neither on the mass of the satellite nor on its shape.

## 4. The orbital period

The **orbital period** $T$ is the time taken for one complete revolution. Since the motion is uniform, the satellite travels the circumference $2\pi r$ at speed $v$:

$$
T = \frac{2\pi r}{v} = 2\pi\sqrt{\frac{r^3}{G\,M}}
$$

Squaring gives a remarkable relation:

$$
\frac{T^2}{r^3} = \frac{4\pi^2}{G\,M}
$$

The ratio $\dfrac{T^2}{r^3}$ depends only on the mass of the attracting body: this is **Kepler's third law**, established here for a circular orbit. By measuring the period and the radius of a satellite's orbit, it makes it possible to **determine the mass of the central body** (the mass of Jupiter from its moons, the mass of the Sun from the planets).

## 5. Kepler's three laws

At the beginning of the 17th century, working from the observations of Tycho Brahe, Johannes Kepler stated three empirical laws on the motion of the planets around the Sun. They apply to any body orbiting another body, in the reference frame centred on that body.

> **First law (law of orbits).** The trajectory of a planet is an **ellipse** with the centre of the Sun at one of its **foci**.

The circle is a special case of an ellipse in which the two foci coincide at the centre. The point of the orbit closest to the Sun is the **perihelion**, the farthest is the **aphelion** (perigee and apogee for a satellite of the Earth).

> **Second law (law of areas).** The line segment joining the centre of the Sun to the centre of the planet sweeps out **equal areas in equal times**.

Consequence: the planet moves **faster near the Sun** (at perihelion) than far from it (at aphelion). On a circular orbit, the law of areas gives uniform motion again.

> **Third law (law of periods).** For all the planets of the solar system, the square of the orbital period $T$ is proportional to the cube of the semi-major axis $a$ of the orbit: $\dfrac{T^2}{a^3}$ is a constant.

$$
\frac{T^2}{a^3} = \text{constant}
$$

For a circular orbit, the semi-major axis is the radius $r$ and the constant is equal to $\dfrac{4\pi^2}{G\,M}$. Take care: the constant changes from one attracting body to another. It is not the same for the planets of the Sun and for the satellites of the Earth.

## 6. The geostationary satellite

> **Definition.** A **geostationary** satellite remains permanently directly above the same point on the Earth's surface. It is therefore **stationary in the terrestrial reference frame**.

Three conditions are necessary:

1. its orbit is **circular** and lies in the **plane of the equator**;
2. it orbits **in the same direction** as the Earth rotates (from west to east);
3. its orbital period in the geocentric reference frame is equal to the Earth's own rotation period, the **sidereal day**: $T = 86\,164\ \mathrm{s}$ (about $23\ \mathrm{h}\ 56\ \mathrm{min}$).

Kepler's third law then imposes a single orbital radius, and therefore a single altitude, of about $36\,000\ \mathrm{km}$. These satellites are used for telecommunications and meteorology: a fixed antenna on the ground can point at them permanently.

## Worked example

The International Space Station (ISS) follows a circular orbit at altitude $h = 400\ \mathrm{km}$.

Data: $G = 6.67 \times 10^{-11}\ \mathrm{N \cdot m^2 \cdot kg^{-2}}$, $M_T = 5.97 \times 10^{24}\ \mathrm{kg}$, $R_T = 6.38 \times 10^{3}\ \mathrm{km}$, sidereal day $T_0 = 86\,164\ \mathrm{s}$.

1. Calculate the speed of the ISS in the geocentric reference frame.
2. Deduce its orbital period, in minutes.
3. Determine the altitude of a geostationary satellite.

<details>
<summary>Show the solution</summary>

**1.** The radius of the orbit is $r = R_T + h = 6.38 \times 10^{6} + 0.400 \times 10^{6} = 6.78 \times 10^{6}\ \mathrm{m}$. The product $G M_T = 6.67 \times 10^{-11} \times 5.97 \times 10^{24} = 3.98 \times 10^{14}\ \mathrm{m^3 \cdot s^{-2}}$.

$$
v = \sqrt{\frac{G\,M_T}{r}} = \sqrt{\frac{3.98 \times 10^{14}}{6.78 \times 10^{6}}} = 7.66 \times 10^{3}\ \mathrm{m \cdot s^{-1}}
$$

that is, about $27\,600\ \mathrm{km \cdot h^{-1}}$.

**2.** The motion is uniform:

$$
T = \frac{2\pi r}{v} = \frac{2\pi \times 6.78 \times 10^{6}}{7.66 \times 10^{3}} = 5.56 \times 10^{3}\ \mathrm{s} \approx 93\ \mathrm{min}
$$

The ISS goes round the Earth in about an hour and a half, that is, about fifteen orbits per day.

**3.** According to Kepler's third law, $r_{\text{geo}}^3 = \dfrac{G\,M_T\,T_0^2}{4\pi^2}$:

$$
r_{\text{geo}} = \left(\frac{3.98 \times 10^{14} \times (86\,164)^2}{4\pi^2}\right)^{1/3} = 4.21 \times 10^{7}\ \mathrm{m}
$$

The altitude is $h_{\text{geo}} = r_{\text{geo}} - R_T = 4.21 \times 10^{7} - 0.638 \times 10^{7} = 3.58 \times 10^{7}\ \mathrm{m}$ (calculation carried out with the unrounded value of $r_{\text{geo}}$), that is, about $35\,800\ \mathrm{km}$.

</details>

## Key points

- Only the gravitational force acts: $\vec{a} = G\,\dfrac{M}{r^2}\,\vec{u}_n$, independent of the mass of the satellite.
- A circular orbit is travelled with **uniform motion** at speed $v = \sqrt{\dfrac{GM}{r}}$.
- Period: $T = \dfrac{2\pi r}{v}$, hence $\dfrac{T^2}{r^3} = \dfrac{4\pi^2}{GM}$ (Kepler's third law).
- Kepler: elliptical orbit with the central body at one focus, law of areas, $\dfrac{T^2}{a^3}$ constant around the same central body.
- Geostationary: circular equatorial orbit, same direction as the Earth, $T = 86\,164\ \mathrm{s}$, altitude of about $36\,000\ \mathrm{km}$.

## Common mistakes

- Using the **altitude** $h$ instead of the radius $r = R_T + h$ in the formulae.
- Forgetting to convert **kilometres to metres** and times to seconds before calculating.
- Believing that a heavier satellite must go faster: $v$ and $T$ are **independent of its mass**.
- Applying the same constant $\dfrac{T^2}{r^3}$ to bodies orbiting **different** central bodies.
- Taking $T = 24\ \mathrm{h}$ for the geostationary satellite: strictly speaking, it is the **sidereal** day that must be used (the difference remains small, about a hundred kilometres in altitude, and some exam questions give 24 h).
- Placing the Sun at the **centre** of the ellipse: it occupies one of the **foci**.
