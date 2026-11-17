---
titre: "The Daniell cell: zinc, copper and a salt bridge"
description: "Build a copper-zinc cell, follow the electrons in the wire and the ions in the salt bridge, then relate the charge delivered to the masses of the strips."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 6
duree: "1 h 30"
chapitre: "piles"
objectifs:
  - "Build a cell and identify its polarity with a voltmeter"
  - "Write the electrode reactions and the overall cell reaction"
  - "Explain the role of the salt bridge and the direction in which the charge carriers move"
  - "Relate the charge delivered to the changes in mass of the electrodes"
materiel:
  - "Two 100 mL beakers"
  - "Cleaned zinc strip and copper strip"
  - "Zinc sulfate and copper sulfate solutions at 0.10 mol/L"
  - "Potassium nitrate salt bridge"
  - "Voltmeter, leads and crocodile clips"
  - "Resistor (resistance box, 10 to 100 Ω)"
  - "Stopwatch and balance reading to the milligram"
---

## Principle

A cell converts chemical energy into electrical energy by means of a **spontaneous** redox reaction whose reactants are kept apart. In the Daniell cell, zinc gives up electrons to copper ions, but these electrons have to travel through the external circuit:

$$
\mathrm{Zn\,(s) + Cu^{2+}\,(aq) \rightarrow Zn^{2+}\,(aq) + Cu\,(s)}
$$

Each beaker contains a metal/ion couple and forms a **half-cell**. The salt bridge connects the two solutions: its ions carry the current and keep each solution electrically neutral.

## Method

1. Pour $50\ \mathrm{mL}$ of zinc sulfate solution into one beaker and $50\ \mathrm{mL}$ of copper sulfate solution into the other. Dip the zinc strip and the copper strip into them, having weighed both beforehand.
2. Connect the voltmeter across the strips, then put the salt bridge in place. Record the open-circuit voltage and deduce the polarity of the cell.
3. Connect the resistor between the two strips. On a diagram, show the direction of the current, of the electrons and of the ions in the bridge.
4. Observe each electrode and write the half-equation for the reaction taking place there.
5. Start the stopwatch and let the cell deliver current for several hours, then rinse, dry and reweigh the strips.
6. Compare the changes in mass with the values calculated from the charge delivered.

## Analysis

The voltmeter reads $U = 1.10\ \mathrm{V}$ when its COM terminal is connected to the zinc: the copper is the positive terminal. The electrons therefore leave the zinc, where oxidation takes place (**anode**), and arrive at the copper, where reduction takes place (**cathode**):

$$
\mathrm{Zn\,(s) \rightarrow Zn^{2+}\,(aq) + 2\,e^-}
$$

$$
\mathrm{Cu^{2+}\,(aq) + 2\,e^- \rightarrow Cu\,(s)}
$$

With $R = 30\ \Omega$ and an internal resistance of $10\ \Omega$, the cell delivers $I = 1.10/40 = 27.5\ \mathrm{mA}$. In $\Delta t = 6.0\ \mathrm{h}$:

$$
Q = I\,\Delta t = 0.0275 \times 21\,600 = 594\ \mathrm{C}
$$

$$
n(\mathrm{e^-}) = \frac{Q}{F} = \frac{594}{96\,485} = 6.16\ \mathrm{mmol}
$$

Two electrons are exchanged per atom: $n(\mathrm{Zn}) = n(\mathrm{Cu}) = n(\mathrm{e^-})/2 = 3.08\ \mathrm{mmol}$. Without rounding this intermediate result ($3.078\ \mathrm{mmol}$), the zinc strip loses $3.078 \times 65.4 = 201\ \mathrm{mg}$ and the copper strip gains $3.078 \times 63.5 = 195\ \mathrm{mg}$.

The cell is exhausted when the limiting reactant has been used up, here the $5.0\ \mathrm{mmol}$ of copper ions. Its **capacity** is $Q_{max} = 2 \times 5.0 \times 10^{-3} \times 96\,485 = 965\ \mathrm{C}$.

## Questions

1. Why does the voltage drop to zero if the salt bridge is removed?
2. In the animation, set the resistance to $100\ \Omega$. What happens to the current and to the masses exchanged in 6 h?
3. Set the resistance to $10\ \Omega$ and the duration to 8 h. What happens on the graph at about 4.9 h? Why?

<details>
<summary>Show answers</summary>

1. The circuit is open: with no ions to carry the current between the two solutions, no charge can flow and the cell stops working.
2. The current drops to $10\ \mathrm{mA}$ and the charge to $216\ \mathrm{C}$: the masses, which are proportional to $Q$, are almost three times smaller (about 71 mg of copper deposited).
3. Both lines become horizontal: with $I = 55\ \mathrm{mA}$, the capacity of $965\ \mathrm{C}$ is reached in 4.9 h. The copper ions are used up, the solution has lost its colour and the cell is exhausted.

</details>

## Safety

Copper sulfate is harmful and hazardous to the environment: wear gloves and safety glasses, and collect the solutions in the waste container provided, never pour them down the sink.
