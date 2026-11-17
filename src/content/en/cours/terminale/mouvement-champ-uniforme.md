---
titre: "Motion in a uniform field"
description: "Projectile motion, a charged particle in a parallel-plate capacitor, equations of motion, trajectory and energy analysis, up to the linear accelerator."
niveau: terminale
theme: mouvement
ordre: 15
duree: "30 min"
motsCles: ["gravitational field", "electric field", "parallel-plate capacitor", "equations of motion", "parabolic trajectory", "mechanical energy", "linear accelerator"]
tp: ["chute-parabolique"]
---

> **The essentials.** In a uniform field, a system subject to a single constant force has a **constant acceleration**. Integrating Newton's second law twice gives the equations of motion, then the trajectory: a straight line or a **parabola**. The work-energy theorem gives the speed gained between two points without any trajectory calculation.

## 1. Two uniform fields to know

A field is **uniform** in a region of space when its vector has the same line of action, the same direction and the same magnitude at every point of that region.

**The gravitational field** $\overrightarrow{g}$ is uniform on the scale of a sports ground or a laboratory used for practicals: vertical, pointing downwards, of magnitude $g = 9.81\ \mathrm{m \cdot s^{-2}}$ in Paris. A system of mass $m$ in this field is subject to its weight:

$$
\overrightarrow{P} = m\,\overrightarrow{g}
$$

**The electric field of a parallel-plate capacitor** is uniform between two flat, parallel plates, a distance $d$ apart and with a voltage $U$ across them. It is perpendicular to the plates, directed from the positive plate towards the negative plate (in the direction of decreasing potential), and its magnitude is:

$$
E = \frac{U}{d}
\qquad\text{with } E \text{ in } \mathrm{V \cdot m^{-1}},\ U \text{ in } \mathrm{V},\ d \text{ in } \mathrm{m}
$$

A particle of charge $q$ in this field is subject to the electric force:

$$
\overrightarrow{F} = q\,\overrightarrow{E}
$$

If $q > 0$, $\overrightarrow{F}$ is in the same direction as $\overrightarrow{E}$; if $q < 0$ (electron), $\overrightarrow{F}$ is in the opposite direction.

| Field | Force | Acceleration (this force alone) |
|---|---|---|
| Gravitational $\overrightarrow{g}$ | $\overrightarrow{P} = m\,\overrightarrow{g}$ | $\overrightarrow{a} = \overrightarrow{g}$ |
| Electric $\overrightarrow{E}$ | $\overrightarrow{F} = q\,\overrightarrow{E}$ | $\overrightarrow{a} = \dfrac{q}{m}\,\overrightarrow{E}$ |

For a charged particle (electron, proton, ion), the weight is **negligible** compared with the electric force: for an electron in a field of $10^4\ \mathrm{V \cdot m^{-1}}$, $eE \approx 1.6 \times 10^{-15}\ \mathrm{N}$ whereas $mg \approx 9 \times 10^{-30}\ \mathrm{N}$.

## 2. From the equations of motion to the trajectory

The method is always the same:

1. define the **system** and the **frame of reference** (terrestrial, assumed to be Galilean);
2. list the **forces acting** on the system;
3. apply **Newton's second law**: $\sum \overrightarrow{F} = m\,\overrightarrow{a}$;
4. **resolve** along suitable axes, then **integrate** twice using the initial conditions.

> **Method.** Each successive integration introduces constants: the initial velocity $\overrightarrow{v}_0$ fixes the constants of $\overrightarrow{v}(t)$, the initial position fixes those of $\overrightarrow{OM}(t)$.

Consider a projectile launched from the origin $O$ with a velocity $\overrightarrow{v}_0$ at an angle $\alpha$ to the horizontal, with friction neglected. Axes $(O, x, z)$ with $z$ pointing upwards. Only the weight acts, so $\overrightarrow{a} = \overrightarrow{g}$:

$$
\overrightarrow{a}\ \begin{cases} a_x = 0 \\ a_z = -g \end{cases}
\qquad
\overrightarrow{v}\ \begin{cases} v_x = v_0 \cos\alpha \\ v_z = -g\,t + v_0 \sin\alpha \end{cases}
\qquad
\overrightarrow{OM}\ \begin{cases} x = v_0 \cos\alpha \; t \\ z = -\dfrac{1}{2}\,g\,t^2 + v_0 \sin\alpha \; t \end{cases}
$$

The horizontal motion is **uniform**, the vertical motion is **uniformly accelerated**.

To obtain the **equation of the trajectory** $z(x)$, eliminate time: $t = \dfrac{x}{v_0 \cos\alpha}$, hence

$$
z(x) = -\frac{g}{2\,v_0^2 \cos^2\alpha}\,x^2 + x \tan\alpha
$$

This is a **parabola** opening downwards. Two quantities follow from the equations of motion:

- the **apex** (maximum height) is reached when $v_z = 0$, that is at $t_S = \dfrac{v_0 \sin\alpha}{g}$;
- the **range** (return to $z = 0$) is $x_P = \dfrac{v_0^2 \sin(2\alpha)}{g}$, which is greatest for $\alpha = 45^\circ$.

## 3. Charged particle in a parallel-plate capacitor

**Initial velocity parallel to the field.** A positive ion enters at rest or with a velocity collinear with $\overrightarrow{E}$: the acceleration $\overrightarrow{a} = \dfrac{q}{m}\overrightarrow{E}$ is collinear with the velocity, so the motion is **rectilinear and uniformly accelerated** (or decelerated if the force opposes the motion).

**Initial velocity perpendicular to the field: deflection.** An electron (charge $-e$, mass $m_e$) enters at $O$ between the plates with $\overrightarrow{v}_0$ horizontal along $x$. The field $\overrightarrow{E}$ is vertical, pointing downwards along $-y$: the force $\overrightarrow{F} = -e\,\overrightarrow{E}$ therefore points upwards. With $a_y = \dfrac{eE}{m_e}$:

$$
x = v_0\,t
\qquad
y = \frac{eE}{2\,m_e}\,t^2
\qquad\Longrightarrow\qquad
y(x) = \frac{eE}{2\,m_e\,v_0^2}\,x^2
$$

The trajectory is an **arc of a parabola** while the electron is between the plates, then a **straight line** on leaving them (no force acts any longer). This is the principle behind the deflection of an electron beam in an analogue oscilloscope or in J. J. Thomson's experiment, which made it possible to measure the ratio $\dfrac{e}{m_e}$.

## 4. Energy considerations

> **Definition.** The kinetic energy of a system of mass $m$ and speed $v$ is $E_c = \dfrac{1}{2}\,m\,v^2$ (in joules). The mechanical energy is $E_m = E_c + E_p$.

Two potential energies are associated with uniform fields:

| Field | Potential energy | Work done by the force from $A$ to $B$ |
|---|---|---|
| Gravitational | $E_{pp} = m\,g\,z$ ($z$ pointing upwards) | $W_{AB}(\overrightarrow{P}) = m\,g\,(z_A - z_B)$ |
| Electric | $E_{pe} = q\,V$ ($V$ electric potential) | $W_{AB}(\overrightarrow{F}) = q\,(V_A - V_B) = q\,U_{AB}$ |

These two forces are **conservative**: the work they do does not depend on the path followed, only on the start and end positions.

> **Work-energy theorem.** In a Galilean frame of reference, the change in kinetic energy of a system between two positions $A$ and $B$ is equal to the sum of the work done by the forces acting on it:
>
> $$
> \Delta E_c = E_c(B) - E_c(A) = \sum W_{AB}(\overrightarrow{F})
> $$
>

If only conservative forces do work, **mechanical energy is conserved**: $E_m(A) = E_m(B)$. For a projectile without friction, what the kinetic energy loses on the way up is gained as gravitational potential energy, and vice versa. With friction, $E_m$ decreases: $\Delta E_m = W(\overrightarrow{f}) < 0$.

## 5. The linear particle accelerator

A linear accelerator uses a succession of electric fields to increase the kinetic energy of charged particles. In its simplest version, a particle of charge $q$ enters at rest at $A$ and leaves at $B$ after crossing a voltage $U_{AB}$. Since the weight is negligible, the work-energy theorem gives:

$$
\frac{1}{2}\,m\,v_B^2 - 0 = q\,U_{AB}
\qquad\Longrightarrow\qquad
v_B = \sqrt{\frac{2\,q\,U_{AB}}{m}}
$$

For an electron accelerated through $U = 2.0\ \mathrm{kV}$ ($q = -e$ and $U_{AB} = -U$, so $q\,U_{AB} = e\,U > 0$):

$$
v_B = \sqrt{\frac{2 \times 1.60 \times 10^{-19} \times 2.0 \times 10^{3}}{9.11 \times 10^{-31}}} \approx 2.7 \times 10^{7}\ \mathrm{m \cdot s^{-1}}
$$

For the particle to be accelerated, we need $q\,U_{AB} > 0$: an electron must move towards **increasing** potential. By linking several stages together, the energy gains add up. Energies are often expressed in **electronvolts**: $1\ \mathrm{eV} = 1.60 \times 10^{-19}\ \mathrm{J}$, the energy gained by a charge $e$ through $1\ \mathrm{V}$. These accelerators are used in radiotherapy, research and medical imaging.

## Worked example

A ball, treated as a point mass, is launched from the ground with a speed $v_0 = 8.0\ \mathrm{m \cdot s^{-1}}$ at an angle $\alpha = 30^\circ$ to the horizontal. Friction is neglected and we take $g = 9.81\ \mathrm{m \cdot s^{-2}}$.

1. Determine the time $t_S$ at which the ball reaches its maximum height, then the value $h$ of this height.
2. Calculate the range $x_P$ of the throw.
3. Find $h$ again using an energy argument.

<details>
<summary>Show the solution</summary>

**1.** Initial components: $v_{0x} = 8.0 \cos 30^\circ = 6.9\ \mathrm{m \cdot s^{-1}}$ and $v_{0z} = 8.0 \sin 30^\circ = 4.0\ \mathrm{m \cdot s^{-1}}$. At the top $v_z = 0$:

$$
t_S = \frac{v_0 \sin\alpha}{g} = \frac{4.0}{9.81} = 0.41\ \mathrm{s}
$$

Substituting $t_S$ into $z(t)$:

$$
h = -\frac{1}{2}\,g\,t_S^2 + v_0 \sin\alpha\; t_S = \frac{(v_0 \sin\alpha)^2}{2\,g} = \frac{4.0^2}{2 \times 9.81} = 0.82\ \mathrm{m}
$$

**2.** The ball returns to $z = 0$ at time $2\,t_S$ (symmetrical trajectory):

$$
x_P = \frac{v_0^2 \sin(2\alpha)}{g} = \frac{8.0^2 \times \sin 60^\circ}{9.81} = 5.6\ \mathrm{m}
$$

**3.** Only the weight does work: mechanical energy is conserved between the ground and the top, where the velocity reduces to its horizontal component $v_0 \cos\alpha$:

$$
\frac{1}{2}\,m\,v_0^2 = \frac{1}{2}\,m\,(v_0 \cos\alpha)^2 + m\,g\,h
\quad\Longrightarrow\quad
h = \frac{v_0^2 (1 - \cos^2\alpha)}{2\,g} = \frac{(v_0 \sin\alpha)^2}{2\,g} = 0.82\ \mathrm{m}
$$

We do indeed find the same result.

</details>

## Key points

- In a uniform field, a single constant force gives a **constant acceleration**: $\overrightarrow{a} = \overrightarrow{g}$ or $\overrightarrow{a} = \dfrac{q}{m}\overrightarrow{E}$.
- Parallel-plate capacitor: $E = \dfrac{U}{d}$, $\overrightarrow{E}$ directed towards decreasing potential.
- If $\overrightarrow{v}_0$ is not collinear with the field, the trajectory is a **parabola**.
- Work-energy theorem: $\Delta E_c = \sum W_{AB}(\overrightarrow{F})$, with $W(\overrightarrow{P}) = m\,g\,(z_A - z_B)$ and $W(\overrightarrow{F}) = q\,U_{AB}$.
- Linear accelerator: $v_B = \sqrt{\dfrac{2\,q\,U_{AB}}{m}}$ for a particle starting from rest.

## Common mistakes

- Forgetting the **sign of the charge**: for an electron, the electric force is opposite to the field.
- Forgetting the **initial velocity** or the **initial position** when integrating.
- Keeping the solution $t = 0$ of the equation $z(t) = 0$: the range corresponds to the other solution, $t = 2\,t_S$.
- Writing $W(\overrightarrow{P}) = m\,g\,(z_B - z_A)$: the weight does **positive** work when the system moves downwards.
- Taking into account the weight of an electron or an ion in a capacitor: it is negligible.
