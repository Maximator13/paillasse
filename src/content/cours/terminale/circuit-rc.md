---
titre: "Circuit RC : charge et décharge d'un condensateur"
description: "Intensité en régime variable, modèle du condensateur, équation différentielle du circuit RC série, temps caractéristique et capteurs capacitifs."
niveau: terminale
theme: ondes
ordre: 24
duree: "30 min"
motsCles: ["condensateur", "capacité", "circuit RC", "temps caractéristique", "équation différentielle", "capteur capacitif"]
tp: ["circuit-rc"]
---

> **L'essentiel.** Un condensateur accumule des charges opposées sur ses deux armatures, avec $q = C\,u_C$ : sa tension ne peut pas varier instantanément. Dans un circuit RC série, la tension à ses bornes évolue de façon **exponentielle**, avec un rythme fixé par le **temps caractéristique** $\tau = RC$. Au bout de $5\tau$, la charge ou la décharge est pratiquement terminée.

## 1. Intensité d'un courant en régime variable

Un courant électrique est un déplacement d'ensemble de porteurs de charge. Quand l'intensité change au cours du temps (régime **variable**), on la définit à chaque instant comme le débit de charge électrique.

> **Définition.** L'intensité du courant qui traverse une section de conducteur est la dérivée par rapport au temps de la charge $q$ qui la traverse : $i(t) = \dfrac{\mathrm{d}q}{\mathrm{d}t}$, avec $i$ en ampères ($\mathrm{A}$), $q$ en coulombs ($\mathrm{C}$) et $t$ en secondes ($\mathrm{s}$).

En régime **permanent** (courant constant), on retrouve la relation vue en Première : $q = I \times \Delta t$.

## 2. Comportement capacitif et modèle du condensateur

Un **condensateur** est formé de deux conducteurs, les **armatures**, séparés par un isolant (le diélectrique). Quand un courant arrive sur une armature, les charges ne peuvent pas traverser l'isolant : elles s'accumulent. L'armature A porte la charge $q_A = q$, l'armature B la charge opposée $q_B = -q$. Le condensateur reste globalement neutre.

On parle de **comportement capacitif** dès que des charges de signes opposés s'accumulent sur deux surfaces conductrices en regard, séparées par un isolant : deux pistes voisines d'un circuit imprimé, un doigt posé sur un écran tactile, un nuage d'orage et le sol.

> **Modèle du condensateur.** La charge $q$ de l'armature A est proportionnelle à la tension $u_C = u_{AB}$ entre ses bornes : $q = C\,u_C$. La constante positive $C$ est la **capacité**, en farads ($\mathrm{F}$). Elle ne dépend que de la géométrie du condensateur et de son isolant : elle augmente avec la surface des armatures et diminue quand on les écarte.

Le farad est une très grande unité : les capacités usuelles vont du picofarad ($1\ \mathrm{pF} = 10^{-12}\ \mathrm{F}$) au millifarad. Les supercondensateurs atteignent quelques milliers de farads.

En convention récepteur (intensité $i$ orientée vers l'armature A), en combinant les deux relations précédentes :

$$
i = \frac{\mathrm{d}q}{\mathrm{d}t} = C\,\frac{\mathrm{d}u_C}{\mathrm{d}t}
$$

Conséquence essentielle : une variation brutale de $u_C$ exigerait un courant infini. **La tension aux bornes d'un condensateur est une fonction continue du temps.** En régime permanent ($u_C$ constante), $i = 0$ : le condensateur se comporte comme un interrupteur ouvert.

## 3. Charge d'un condensateur dans un circuit RC série

On branche en série un générateur idéal de tension de force électromotrice $E$, un conducteur ohmique de résistance $R$ et un condensateur initialement déchargé. À $t = 0$, on ferme l'interrupteur.

**Établir l'équation différentielle.** La loi des mailles donne $E = u_R + u_C$. La loi d'Ohm donne $u_R = R\,i = RC\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}$. D'où :

$$
RC\,\frac{\mathrm{d}u_C}{\mathrm{d}t} + u_C = E
\qquad\text{soit}\qquad
\frac{\mathrm{d}u_C}{\mathrm{d}t} + \frac{u_C}{\tau} = \frac{E}{\tau}
\quad\text{avec}\quad \tau = RC
$$

**Résoudre.** C'est une équation différentielle linéaire du premier ordre à coefficients constants. Ses solutions sont de la forme $u_C(t) = A\,\mathrm{e}^{-t/\tau} + E$. La condition initiale $u_C(0) = 0$ (continuité de la tension) impose $A = -E$ :

$$
u_C(t) = E\left(1 - \mathrm{e}^{-t/\tau}\right)
$$

L'intensité s'en déduit : $i(t) = C\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t} = \dfrac{E}{R}\,\mathrm{e}^{-t/\tau}$. Elle vaut $E/R$ juste après la fermeture puis tend vers zéro : le courant, lui, peut varier brutalement.

## 4. Décharge d'un condensateur

Le condensateur, chargé sous la tension $E$, est désormais relié seul à la résistance $R$ (le générateur est retiré du circuit) à l'instant $t = 0$, l'intensité $i$ gardant la même orientation que pendant la charge. La loi des mailles devient $u_R + u_C = 0$, d'où :

$$
RC\,\frac{\mathrm{d}u_C}{\mathrm{d}t} + u_C = 0
$$

Avec la condition initiale $u_C(0) = E$, la solution est :

$$
u_C(t) = E\,\mathrm{e}^{-t/\tau}
\qquad\text{et}\qquad
i(t) = -\frac{E}{R}\,\mathrm{e}^{-t/\tau}
$$

Le signe moins indique que le courant circule en sens inverse de celui de la charge : l'énergie stockée est dissipée par effet Joule dans la résistance.

| | Charge | Décharge |
|---|---|---|
| Équation | $\tau\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t} + u_C = E$ | $\tau\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t} + u_C = 0$ |
| Condition initiale | $u_C(0) = 0$ | $u_C(0) = E$ |
| Solution | $u_C = E\left(1 - \mathrm{e}^{-t/\tau}\right)$ | $u_C = E\,\mathrm{e}^{-t/\tau}$ |
| Valeur à $t = \tau$ | $0{,}63\,E$ | $0{,}37\,E$ |
| Régime final | $u_C = E$, $i = 0$ | $u_C = 0$, $i = 0$ |

## 5. Le temps caractéristique

> **Définition.** Le temps caractéristique d'un circuit RC série est $\tau = RC$. Il s'exprime en secondes : $\mathrm{\Omega \cdot F = s}$.

Le produit $RC$ a bien la dimension d'un temps : $R = u/i$ et $C = q/u = i\,\Delta t/u$, donc $RC$ s'exprime en $\mathrm{s}$.

Trois méthodes pour le déterminer sur une courbe expérimentale $u_C(t)$, obtenue par exemple avec une carte d'acquisition :

1. **Valeur à 63 %.** En charge, $\tau$ est la date à laquelle $u_C = 0{,}63\,E$ (car $1 - \mathrm{e}^{-1} \approx 0{,}63$). En décharge, c'est la date à laquelle $u_C = 0{,}37\,E$.
2. **Tangente à l'origine.** La tangente à la courbe en $t = 0$ coupe l'asymptote horizontale ($u_C = E$ en charge, $u_C = 0$ en décharge) à la date $t = \tau$.
3. **Calcul.** Si $R$ et $C$ sont connues, $\tau = RC$.

Au bout de $5\tau$, $\mathrm{e}^{-5} \approx 0{,}007$ : l'écart à la valeur finale est inférieur à 1 %. On considère alors le régime permanent atteint. Plus $R$ ou $C$ est grand, plus la charge est lente.

## 6. Capteurs capacitifs

La capacité d'un condensateur dépend de la surface en regard de ses armatures, de leur distance et de l'isolant qui les sépare. Toute grandeur physique qui modifie l'un de ces paramètres change $C$, donc le temps caractéristique $\tau = RC$ d'un circuit, que l'électronique mesure facilement. C'est le principe des **capteurs capacitifs** :

- **écran tactile** : le doigt, conducteur, modifie la capacité locale entre des électrodes transparentes ;
- **accéléromètre** de smartphone : une armature mobile se déplace sous l'effet de l'accélération et change la distance entre armatures ;
- **capteur d'humidité** : l'isolant absorbe la vapeur d'eau, ce qui modifie la capacité ;
- **capteur de niveau** ou de proximité, **microphone** à condensateur (la membrane est une armature mobile), touches de clavier.

## Exercice type

Un condensateur de capacité $C = 47\ \mathrm{\mu F}$, initialement déchargé, est chargé à travers une résistance $R = 10\ \mathrm{k\Omega}$ par un générateur idéal de tension $E = 5{,}0\ \mathrm{V}$.

1. Calculer le temps caractéristique $\tau$.
2. Calculer l'intensité du courant juste après la fermeture de l'interrupteur.
3. À quelle date la tension $u_C$ atteint-elle $4{,}0\ \mathrm{V}$ ?
4. Quelle est la charge $q$ du condensateur en fin de charge ?

<details>
<summary>Voir la correction</summary>

1. $\tau = RC = 10 \times 10^{3} \times 47 \times 10^{-6} = 0{,}47\ \mathrm{s}$.

2. À $t = 0$, $u_C = 0$ (continuité), donc toute la tension est aux bornes de la résistance :

$$
i(0) = \frac{E}{R} = \frac{5{,}0}{10 \times 10^{3}} = 5{,}0 \times 10^{-4}\ \mathrm{A} = 0{,}50\ \mathrm{mA}
$$

3. On résout $E\left(1 - \mathrm{e}^{-t_1/\tau}\right) = 4{,}0$, soit $\mathrm{e}^{-t_1/\tau} = 1 - \dfrac{4{,}0}{5{,}0} = 0{,}20$ :

$$
t_1 = -\tau \ln(0{,}20) = \tau \ln 5 = 0{,}47 \times 1{,}61 = 0{,}76\ \mathrm{s}
$$

4. En fin de charge, $u_C = E$ :

$$
q = C\,E = 47 \times 10^{-6} \times 5{,}0 = 2{,}4 \times 10^{-4}\ \mathrm{C}
$$

</details>

## À retenir

- En régime variable, $i = \dfrac{\mathrm{d}q}{\mathrm{d}t}$.
- Modèle du condensateur : $q = C\,u_C$, donc $i = C\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}$ en convention récepteur.
- La tension aux bornes d'un condensateur est **continue** ; l'intensité peut varier brutalement.
- Charge : $u_C = E\left(1 - \mathrm{e}^{-t/\tau}\right)$. Décharge : $u_C = E\,\mathrm{e}^{-t/\tau}$.
- Temps caractéristique $\tau = RC$ : 63 % de la variation est faite en $\tau$, la quasi-totalité en $5\tau$.
- Un capteur capacitif traduit une grandeur physique en variation de capacité.

## Erreurs fréquentes

- Oublier les puissances de dix : $\mathrm{\mu F} = 10^{-6}\ \mathrm{F}$, $\mathrm{k\Omega} = 10^{3}\ \mathrm{\Omega}$.
- Écrire que $u_C$ saute à $E$ à la fermeture : c'est l'intensité qui saute à $E/R$, pas la tension.
- Lire $\tau$ à 63 % de $E$ sur une courbe de **décharge** : il faut chercher $0{,}37\,E$.
- Croire que le condensateur est chargé à $t = \tau$ : il ne l'est qu'à 63 %, il faut attendre environ $5\tau$.
- Se tromper de signe dans la loi des mailles : vérifier que la solution tend vers la bonne valeur finale.
