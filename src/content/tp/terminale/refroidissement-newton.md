---
titre: "Refroidissement d'un bécher d'eau chaude (loi de Newton)"
description: "Suivez la température d'une eau chaude qui refroidit dans l'air, observez le flux thermique faiblir et mesurez le temps caractéristique."
niveau: terminale
theme: energie
matiere: physique
ordre: 14
duree: "1 h 30"
chapitre: "transferts-thermiques"
objectifs:
  - "Suivre l'évolution de la température d'un système au contact d'un thermostat"
  - "Relier le flux thermique à l'écart de température avec l'air"
  - "Déterminer le temps caractéristique par la tangente à l'origine et par les 63 %"
  - "Confronter les mesures au modèle exponentiel issu du premier principe"
materiel:
  - "Bécher de 150 mL posé sur un support en liège"
  - "Bouilloire et eau du robinet"
  - "Thermomètre ou sonde de température reliée à une interface"
  - "Second thermomètre pour la température de la salle"
  - "Chronomètre"
  - "Balance au gramme près"
---

## Principe

Un bécher contenant une masse $m$ d'eau chaude est abandonné dans l'air de la salle, de température constante $T_{\mathrm{ext}}$ : l'air joue le rôle de **thermostat**. L'eau, plus chaude, lui cède de l'énergie à travers la surface d'échange $S$. La loi phénoménologique de Newton donne le flux thermique reçu par l'eau :

$$
\Phi = h\,S\,(T_{\mathrm{ext}} - T)
$$

où $h$ est le coefficient d'échange, en $\mathrm{W \cdot m^{-2} \cdot K^{-1}}$. Ce flux est négatif tant que l'eau est plus chaude que l'air, et sa valeur absolue diminue à mesure que l'écart se réduit : le refroidissement ralentit de lui-même.

## Protocole

1. Peser $m = 100\ \mathrm{g}$ d'eau chaude versée dans le bécher posé sur le liège. Relever la température de la salle $T_{\mathrm{ext}}$.
2. Plonger le thermomètre dans l'eau, attendre que sa colonne se stabilise à $T_0$ et déclencher le chronomètre : c'est l'instant $t = 0$.
3. Relever la température toutes les 2 min 30 pendant 90 min, sans agiter ni déplacer le bécher. Dans l'animation, le temps est accéléré 400 fois.
4. Tracer $T = f(t)$, puis la tangente à l'origine et l'asymptote $T = T_{\mathrm{ext}}$. Lire $\tau$ à l'abscisse de leur intersection et vérifier qu'à cette date l'écart avec l'air a diminué de 63 %.
5. Superposer le modèle exponentiel aux mesures.

## Exploitation

L'eau est un système incompressible, de température supposée uniforme, qui n'échange de l'énergie que par transfert thermique (évaporation négligée). Le premier principe s'écrit :

$$
m\,c\,\frac{\mathrm{d}T}{\mathrm{d}t} = h\,S\,(T_{\mathrm{ext}} - T)
$$

En posant $\tau = \dfrac{m\,c}{h\,S}$, le temps caractéristique, on obtient une équation différentielle du premier ordre :

$$
\frac{\mathrm{d}T}{\mathrm{d}t} + \frac{T}{\tau} = \frac{T_{\mathrm{ext}}}{\tau}
$$

La solution vérifiant $T(0) = T_0$ est :

$$
T(t) = T_{\mathrm{ext}} + (T_0 - T_{\mathrm{ext}})\,\mathrm{e}^{-t/\tau}
$$

Avec $m = 0{,}100\ \mathrm{kg}$, $c = 4180\ \mathrm{J \cdot kg^{-1} \cdot K^{-1}}$, $h = 20\ \mathrm{W \cdot m^{-2} \cdot K^{-1}}$ et $S = 1{,}2 \times 10^{-2}\ \mathrm{m^2}$, on trouve $\tau = 1{,}7 \times 10^{3}\ \mathrm{s}$, soit environ 29 min.

Pour $T_0 = 80\ \mathrm{°C}$ et $T_{\mathrm{ext}} = 20\ \mathrm{°C}$ :

| Date | Température | Flux cédé à l'air |
|---|---|---|
| $t = 0$ | 80,0 °C | 14,4 W |
| $t = \tau$ | 42,1 °C | 5,3 W |
| $t = 90\ \mathrm{min}$ | 22,7 °C | 0,6 W |

À $t = \tau$, il reste 37 % de l'écart initial : $20 + 0{,}37 \times 60 = 42\ \mathrm{°C}$. Au bout de $5\tau$, l'équilibre thermique est atteint à moins de 1 % près.

## Questions

1. Pourquoi la courbe est-elle de moins en moins pentue ?
2. Dans l'animation, faites varier la température de l'air, puis la température initiale de l'eau. Le temps caractéristique change-t-il ? Et le flux initial ?
3. Portez le coefficient d'échange à 40 (bécher ventilé), puis à 10 (bécher isolé). Comment évoluent $\tau$ et l'allure de la courbe ?

<details>
<summary>Voir les réponses</summary>

1. La pente $\dfrac{\mathrm{d}T}{\mathrm{d}t}$ est proportionnelle au flux, donc à l'écart $T_{\mathrm{ext}} - T$. Plus l'eau s'approche de la température de l'air, moins elle lui cède d'énergie par seconde.
2. $\tau = \dfrac{m\,c}{h\,S}$ ne dépend ni de $T_{\mathrm{ext}}$ ni de $T_0$ : il reste égal à 29 min. Le flux initial, lui, est proportionnel à l'écart $T_0 - T_{\mathrm{ext}}$ : il augmente quand cet écart grandit.
3. $\tau$ est inversement proportionnel à $h$ : il tombe à 14,5 min pour $h = 40$ (la courbe plonge vite vers l'asymptote) et monte à 58 min pour $h = 10$ (au bout de 90 min, l'eau est encore loin de l'équilibre).

</details>

## Sécurité

L'eau sortant de la bouilloire peut provoquer des brûlures : verser lentement, bécher posé sur la paillasse, et ne pas le saisir à main nue pendant les premières minutes.
