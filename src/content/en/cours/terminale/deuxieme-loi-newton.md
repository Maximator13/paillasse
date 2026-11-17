---
titre: "Newton's second law: linking forces and motion"
description: "Centre of mass, inertial frame of reference, the fundamental principle of dynamics and equilibrium: the method for going from forces to acceleration."
niveau: terminale
theme: mouvement
ordre: 14
duree: "25 min"
motsCles: ["Newton's second law", "centre of mass", "inertial frame of reference", "acceleration", "equilibrium", "dynamics"]
tp: []
---

> **The essentials.** In an inertial frame of reference, the sum of the external forces applied to a system is equal to the product of its mass and the acceleration of its **centre of mass**: $\sum \vec{F}_{\text{ext}} = m\,\vec{a}_G$. Knowing the forces lets us predict the motion; knowing the motion lets us work back to the forces.

## 1. The centre of mass of a system

A real system (a ball, a car, a diver) is made up of an infinite number of points that do not all have the same motion: a ball spins about its own axis while it moves forward. To describe its overall motion simply, we study one particular point.

> **Definition.** The **centre of mass** $G$ of a system is the point whose motion is the simplest: it is at this point that the whole mass $m$ of the system can be considered concentrated in order to study its translation.

A few guidelines for locating it qualitatively:

- for a homogeneous solid with a centre of symmetry (ball, cube, cylinder), $G$ is that **centre of symmetry**;
- $G$ is closer to the regions where the mass is greatest (a hammer has its centre of mass near the head);
- $G$ can lie **outside the material** (ring, boomerang, high jumper arched over the bar on their back).

When a spinning stick is thrown into the air, each point follows a complicated path, but the path of $G$ remains a simple parabola (air resistance neglected): that is the whole point of studying it.

## 2. The inertial frame of reference

A motion is always described relative to a **frame of reference**, a reference solid fitted with a coordinate system and a clock. Newton's laws are not valid in every frame of reference.

> **Definition.** A frame of reference is **inertial** (or Galilean) if the principle of inertia (Newton's first law) holds in it: an isolated or pseudo-isolated system is at rest or in uniform rectilinear motion in it.

Any frame of reference in uniform rectilinear translation relative to an inertial frame is itself inertial. In practice:

| Frame of reference | Reference solid | Considered inertial for |
|---|---|---|
| **Terrestrial** | the ground, a laboratory | short motions on Earth (a few minutes) |
| **Geocentric** | centre of the Earth and three distant stars | satellites and the Moon |
| **Heliocentric** | centre of the Sun and three distant stars | planets and interplanetary probes |

A rotating merry-go-round or a braking car are **not** inertial frames of reference: an object placed in them starts moving "for no reason".

## 3. Statement of Newton's second law

Recall that the acceleration vector is the derivative of the velocity vector with respect to time: $\vec{a} = \dfrac{\mathrm{d}\vec{v}}{\mathrm{d}t}$, in $\mathrm{m \cdot s^{-2}}$.

> **Law.** In an inertial frame of reference, the vector sum of the external forces applied to a system of constant mass $m$ is equal to the product of its mass and the acceleration vector of its centre of mass:
>
> $$
> \sum \vec{F}_{\text{ext}} = m\,\vec{a}_G
> $$
>
> with $F$ in newtons ($\mathrm{N}$), $m$ in kilograms ($\mathrm{kg}$) and $a_G$ in $\mathrm{m \cdot s^{-2}}$.

Three consequences to understand thoroughly:

1. $\vec{a}_G$ **lies along the same line and points the same way** as the sum of the forces. This is not true of the velocity: a ball thrown upwards rises even though the force (its weight) points downwards.
2. For the same sum of forces, the greater the mass, the smaller the acceleration: mass measures the **inertia** of the system.
3. If $\sum \vec{F}_{\text{ext}} = \vec{0}$, then $\vec{a}_G = \vec{0}$: we recover the principle of inertia, a special case of the second law.

Projecting the vector relation onto the axes of a coordinate system gives scalar equations, one per axis:

$$
\sum F_x = m\,a_{Gx} \qquad \sum F_y = m\,a_{Gy}
$$

## 4. Equilibrium of a system

> **Definition.** A system is in **equilibrium** in an inertial frame of reference when its centre of mass is at rest in it: $\vec{v}_G = \vec{0}$ at every instant, so $\vec{a}_G = \vec{0}$.

The second law then requires:

$$
\sum \vec{F}_{\text{ext}} = \vec{0}
$$

This condition is **necessary** but not sufficient: a system subjected to forces that balance can also be in uniform rectilinear motion. It allows an unknown force to be determined. For example, for a lamp of mass $m$ hanging from a string, the tension in the string balances the weight: $T = m\,g$.

For an object resting on a plane inclined at an angle $\alpha$ and held at rest by friction, projection onto the axis parallel to the slope gives $f = m\,g\sin\alpha$, and onto the perpendicular axis $R_N = m\,g\cos\alpha$.

## 5. Method for solving a dynamics problem

Whatever the exercise, the approach is the same:

1. **Define the system** studied (and model it by its centre of mass $G$).
2. **Choose the frame of reference** and justify that it is inertial.
3. **List the external forces** and show them on a diagram: weight $\vec{P} = m\,\vec{g}$, reaction of the support, tension in a string, friction, upthrust (Archimedes' principle), driving force, etc.
4. **Choose a suitable coordinate system** (one axis in the direction of motion, for example).
5. **Apply Newton's second law** in vector form, then **project** it onto each axis.
6. **Use the result**: depending on the data, calculate the acceleration from the known forces, or calculate a force from the measured acceleration (for example on a stroboscopic photograph).

The reverse direction is used very often: if a recording shows that $\vec{a}_G$ is constant, we deduce the value of the sum of the forces, then an unknown force (friction, thrust).

## Worked example

A sledge of mass $m = 12.0\ \mathrm{kg}$ is pulled across horizontal snow-covered ground by a horizontal rope that exerts a force $F = 50.0\ \mathrm{N}$. Friction from the ground is modelled by a constant horizontal force, opposing the motion, of magnitude $f = 14.0\ \mathrm{N}$. The sledge starts from rest. Take $g = 9.81\ \mathrm{m \cdot s^{-2}}$.

1. Determine the magnitude of the acceleration of the sledge.
2. Determine the magnitude of the normal reaction of the ground.
3. Calculate the speed and the distance travelled after $4.0\ \mathrm{s}$.

<details>
<summary>Show the solution</summary>

System: the sledge. Terrestrial frame of reference, assumed inertial. Forces: weight $\vec{P}$ (vertical, downwards), normal reaction $\vec{R}_N$ (vertical, upwards), pulling force $\vec{F}$ and friction $\vec{f}$ (horizontal, in opposite directions). Axis $(Ox)$ horizontal in the direction of motion, axis $(Oy)$ vertical upwards.

1. Projection onto $(Ox)$: $F - f = m\,a_x$, so

$$
a_x = \frac{F - f}{m} = \frac{50.0 - 14.0}{12.0} = 3.00\ \mathrm{m \cdot s^{-2}}
$$

2. The motion is horizontal, so $a_y = 0$. Projection onto $(Oy)$: $R_N - m\,g = 0$, that is

$$
R_N = m\,g = 12.0 \times 9.81 = 118\ \mathrm{N}
$$

3. The acceleration is constant and the initial velocity is zero: $v(t) = a_x\,t$ and $x(t) = \dfrac{1}{2}\,a_x\,t^2$.

$$
v = 3.00 \times 4.0 = 12\ \mathrm{m \cdot s^{-1}} \qquad x = \frac{1}{2} \times 3.00 \times 4.0^2 = 24\ \mathrm{m}
$$

</details>

## Key points

- We study the motion of the **centre of mass** $G$, the point where the whole mass of the system is taken to be concentrated.
- Newton's laws apply only in an **inertial frame of reference** (terrestrial, geocentric or heliocentric depending on the duration and the scale).
- Second law: $\sum \vec{F}_{\text{ext}} = m\,\vec{a}_G$; the acceleration points in the direction of the sum of the forces.
- Equilibrium: $\vec{a}_G = \vec{0}$, so $\sum \vec{F}_{\text{ext}} = \vec{0}$.
- Method: system, frame of reference, list of forces, coordinate system, vector law, projections.

## Common mistakes

- Believing that the sum of the forces points in the direction of the **velocity**: it points in the direction of the **acceleration** (the change in velocity).
- Forgetting a force in the list (often the reaction of the support) or adding a "force of motion" that does not exist.
- Projecting without taking the direction of the axes into account: a force opposing the axis gives a **negative** component.
- Applying the law in a non-inertial frame of reference (accelerating vehicle, merry-go-round).
- Confusing mass ($\mathrm{kg}$) and weight ($\mathrm{N}$).
