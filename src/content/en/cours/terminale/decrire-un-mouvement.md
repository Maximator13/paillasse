---
titre: "Describing motion: position, velocity and acceleration"
description: "Position, velocity and acceleration vectors, Cartesian coordinates and the Frenet frame, used to characterise rectilinear and circular motion."
niveau: terminale
theme: mouvement
ordre: 13
duree: "25 min"
motsCles: ["kinematics", "velocity vector", "acceleration vector", "Frenet frame", "circular motion"]
tp: []
---

> **In brief.** Describing a motion means giving the position of a point at every instant in a chosen frame of reference. The velocity vector is the derivative of the position vector with respect to time, and the acceleration vector is the derivative of the velocity vector. Their coordinates, Cartesian or in the Frenet frame, allow the motion to be named: rectilinear or circular, uniform or not.

## 1. Frame of reference and position vector

A motion only has meaning relative to a **frame of reference**: a reference solid with which a coordinate system and a clock are associated. The most commonly used are the terrestrial frame, the geocentric frame and the heliocentric frame.

We study the motion of a point $M$ (often the centre of mass of the system) in an orthonormal coordinate system $(O\,;\vec{i},\vec{j},\vec{k})$ attached to the frame of reference.

> **Definition.** The position vector of the point $M$ at time $t$ is $\overrightarrow{OM}(t) = x(t)\,\vec{i} + y(t)\,\vec{j} + z(t)\,\vec{k}$. The functions $x(t)$, $y(t)$ and $z(t)$ are the **parametric equations** of the motion.

The set of successive positions of $M$ forms the **trajectory**. Its equation is obtained by eliminating time between the parametric equations.

## 2. Velocity vector

> **Definition.** The velocity vector of the point $M$ is the derivative with respect to time of its position vector, expressed in $\mathrm{m \cdot s^{-1}}$:
>
> $$
> \vec{v}(t) = \frac{\mathrm{d}\overrightarrow{OM}}{\mathrm{d}t}
> $$
>

In Cartesian coordinates, the vectors $\vec{i}$, $\vec{j}$, $\vec{k}$ are fixed, so each coordinate is differentiated:

$$
\vec{v} \begin{pmatrix} v_x = \dfrac{\mathrm{d}x}{\mathrm{d}t} \\[2mm] v_y = \dfrac{\mathrm{d}y}{\mathrm{d}t} \\[2mm] v_z = \dfrac{\mathrm{d}z}{\mathrm{d}t} \end{pmatrix}
\qquad
v = \|\vec{v}\| = \sqrt{v_x^2 + v_y^2 + v_z^2}
$$

The velocity vector is always **tangent to the trajectory** and points in the direction of motion. On a chronophotograph with time step $\tau$, it is approximated by $\vec{v}(t_i) \approx \dfrac{\overrightarrow{M_iM_{i+1}}}{\tau}$.

## 3. Acceleration vector

> **Definition.** The acceleration vector is the derivative with respect to time of the velocity vector, expressed in $\mathrm{m \cdot s^{-2}}$:
>
> $$
> \vec{a}(t) = \frac{\mathrm{d}\vec{v}}{\mathrm{d}t} = \frac{\mathrm{d}^2\overrightarrow{OM}}{\mathrm{d}t^2}
> $$
>

In Cartesian coordinates: $a_x = \dfrac{\mathrm{d}v_x}{\mathrm{d}t} = \dfrac{\mathrm{d}^2x}{\mathrm{d}t^2}$, and likewise for $a_y$ and $a_z$. On a chronophotograph, it is approximated by $\vec{a}(t_i) \approx \dfrac{\vec{v}_{i+1} - \vec{v}_i}{\tau}$.

The acceleration vector reflects **any change in the velocity vector**: a change in its magnitude (the moving object speeds up or slows down) or a change in its direction (the trajectory curves). An object travelling at constant speed round a bend therefore has a non-zero acceleration.

The reverse path is also useful: knowing $\vec{a}(t)$ and the initial conditions ($\vec{v}_0$ and $\overrightarrow{OM}_0$), we recover $\vec{v}(t)$ and then $\overrightarrow{OM}(t)$ by finding **antiderivatives**.

## 4. Rectilinear motion

The trajectory is a straight line: the axis $(Ox)$ is chosen along this line, and a single coordinate is enough.

| Motion | Acceleration | Velocity | Position |
|---|---|---|---|
| Uniform rectilinear | $a_x = 0$ | $v_x = v_0$ | $x(t) = v_0\,t + x_0$ |
| Uniformly accelerated rectilinear | $a_x = a$ (constant) | $v_x(t) = a\,t + v_0$ | $x(t) = \dfrac{1}{2}a\,t^2 + v_0\,t + x_0$ |

In **uniform rectilinear** motion, the velocity vector is constant: the points on a chronophotograph are aligned and equally spaced. In **uniformly accelerated rectilinear** motion, the acceleration vector is constant and collinear with the trajectory: the gaps between successive points increase steadily if $\vec{a}$ and $\vec{v}$ point in the same direction, and decrease if they point in opposite directions (braking).

## 5. Frenet frame and circular motion

For a circular motion of centre $O$ and radius $R$, Cartesian axes are poorly suited. We use the **Frenet frame** $(M\,;\vec{u}_T,\vec{u}_N)$, attached to the moving point:

- $\vec{u}_T$ is **tangent** to the trajectory, pointing in the direction of motion;
- $\vec{u}_N$ is **normal** to the trajectory, pointing towards the centre $O$ of the circle.

> **Property.** In the Frenet frame, for a circular motion of radius $R$:
>
> $$
> \vec{v} = v\,\vec{u}_T \qquad \vec{a} = \frac{\mathrm{d}v}{\mathrm{d}t}\,\vec{u}_T + \frac{v^2}{R}\,\vec{u}_N
> $$
>

The tangential component $a_T = \dfrac{\mathrm{d}v}{\mathrm{d}t}$ accounts for the change in the magnitude of the velocity. The normal component $a_N = \dfrac{v^2}{R}$, always positive, accounts for the change in direction: it points towards the centre.

| Circular motion | $a_T$ | $a_N$ | Direction of $\vec{a}$ |
|---|---|---|---|
| **Uniform** ($v$ constant) | $0$ | $\dfrac{v^2}{R}$ constant | radial, towards the centre (centripetal) |
| **Non-uniform** ($v$ variable) | $\dfrac{\mathrm{d}v}{\mathrm{d}t} \neq 0$ | $\dfrac{v^2}{R}$ variable | tilted towards the inside of the circle |

In uniform circular motion, the magnitude $a = \dfrac{v^2}{R}$ is constant but the **vector** $\vec{a}$ is not: it rotates with the moving object, always pointing towards the centre.

## Worked example

Part A. A trolley moves along a horizontal straight rail. Its x-coordinate is $x(t) = 1.5\,t^2 + 2.0\,t$, with $x$ in metres and $t$ in seconds.

1. Establish the expressions for $v_x(t)$ and $a_x(t)$. Name the motion.
2. Calculate the velocity at $t = 2.0\ \mathrm{s}$.

Part B. A TGV high-speed train enters a circular curve of radius $R = 5.0\ \mathrm{km}$ at a constant speed $v = 300\ \mathrm{km \cdot h^{-1}}$. Calculate the magnitude of its acceleration and state its direction.

<details>
<summary>Show the solution</summary>

**A.1.** Differentiating: $v_x(t) = 3.0\,t + 2.0$ (in $\mathrm{m \cdot s^{-1}}$), then $a_x(t) = 3.0\ \mathrm{m \cdot s^{-2}}$. The acceleration is constant, the trajectory is a straight line and $a_x$ has the same sign as $v_x$: the motion is **uniformly accelerated rectilinear**.

**A.2.** $v_x(2.0) = 3.0 \times 2.0 + 2.0 = 8.0\ \mathrm{m \cdot s^{-1}}$.

**B.** Conversion: $v = \dfrac{300}{3.6} = 83.3\ \mathrm{m \cdot s^{-1}}$. The motion is uniform circular, so $a_T = 0$ and:

$$
a = a_N = \frac{v^2}{R} = \frac{(83.3)^2}{5.0 \times 10^{3}} = 1.4\ \mathrm{m \cdot s^{-2}}
$$

The acceleration vector is directed along $\vec{u}_N$, towards the centre of the curve (centripetal acceleration). Since $a_N$ varies as $v^2$, high-speed lines only have curves of very large radius, and their tracks are banked towards the inside for passenger comfort.

</details>

## Key points

- $\vec{v} = \dfrac{\mathrm{d}\overrightarrow{OM}}{\mathrm{d}t}$ and $\vec{a} = \dfrac{\mathrm{d}\vec{v}}{\mathrm{d}t}$: in Cartesian coordinates, each coordinate is differentiated.
- Uniform rectilinear: $\vec{a} = \vec{0}$. Uniformly accelerated rectilinear: $\vec{a}$ constant, collinear with the trajectory.
- Frenet frame: $\vec{a} = \dfrac{\mathrm{d}v}{\mathrm{d}t}\,\vec{u}_T + \dfrac{v^2}{R}\,\vec{u}_N$.
- Uniform circular: $a = \dfrac{v^2}{R}$, **centripetal** acceleration.

## Common mistakes

- Believing that a constant speed implies zero acceleration: this is false as soon as the trajectory is curved.
- Forgetting to convert $\mathrm{km \cdot h^{-1}}$ into $\mathrm{m \cdot s^{-1}}$ (divide by $3.6$) before calculating $\dfrac{v^2}{R}$.
- Pointing $\vec{u}_N$ towards the outside of the circle: it always points towards the centre.
- Confusing the trajectory $y = f(x)$ with a parametric equation $x(t)$.
