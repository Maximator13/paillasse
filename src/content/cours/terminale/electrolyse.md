---
titre: "Électrolyse : forcer l'évolution d'un système chimique"
description: "Électrolyseur, réactions aux électrodes, relation Q = I·Δt = n(e⁻)·F, accumulateurs et production de dihydrogène."
niveau: terminale
theme: matiere
ordre: 10
duree: "25 min"
motsCles: ["électrolyse", "électrolyseur", "anode", "cathode", "faraday", "accumulateur", "dihydrogène"]
tp: ["electrolyse"]
---

> **L'essentiel.** Un générateur peut imposer un courant à un système chimique et le faire évoluer **dans le sens inverse** de son sens spontané : c'est l'**électrolyse**. La charge électrique échangée fixe la quantité de matière formée, via $Q = I\,\Delta t = n(e^-)\,F$. Ce principe sert à stocker l'énergie (charge d'un accumulateur) et à produire du dihydrogène.

## 1. Évolution spontanée et évolution forcée

Un système chimique hors équilibre évolue spontanément de façon que son quotient de réaction $Q_r$ se rapproche de la constante d'équilibre $K$. Dans une **pile**, cette évolution spontanée fournit de l'énergie électrique au circuit extérieur.

On peut obtenir l'évolution inverse en apportant de l'énergie : un **générateur** branché aux bornes du système impose un courant dont le sens est contraire à celui que débiterait la pile.

> **Définition.** Une **électrolyse** est une transformation chimique **forcée** par le passage d'un courant imposé par un générateur. Au cours d'une électrolyse, le quotient de réaction $Q_r$ s'**éloigne** de la constante d'équilibre $K$.

| | Pile | Électrolyseur |
|---|---|---|
| Transformation | spontanée | forcée |
| Évolution de $Q_r$ | se rapproche de $K$ | s'éloigne de $K$ |
| Conversion d'énergie | chimique $\rightarrow$ électrique | électrique $\rightarrow$ chimique |
| Rôle dans le circuit | générateur | récepteur |

## 2. L'électrolyseur et les réactions aux électrodes

Un **électrolyseur** est formé de deux électrodes plongeant dans une solution ionique (l'électrolyte), reliées aux bornes d'un générateur de tension continue.

Dans le circuit extérieur, les **électrons** circulent du pôle $-$ du générateur vers une électrode, puis de l'autre électrode vers le pôle $+$. Dans la solution, le courant est assuré par le déplacement des **ions** : les cations migrent vers la cathode, les anions vers l'anode.

> **Définition.** L'**anode** est l'électrode où se produit une **oxydation** (perte d'électrons). La **cathode** est l'électrode où se produit une **réduction** (gain d'électrons). Dans un électrolyseur, l'anode est reliée au pôle $+$ du générateur et la cathode au pôle $-$.

Moyen mnémotechnique : **a**node et **o**xydation commencent par une voyelle, **c**athode et **r**éduction par une consonne. Cette règle vaut pour la pile comme pour l'électrolyseur ; seule la polarité change.

**Exemple : électrolyse d'une solution de chlorure de cuivre(II).** Le générateur force la réaction :

$$
\mathrm{Cu^{2+}(aq) + 2\,Cl^-(aq) \rightarrow Cu(s) + Cl_2(g)}
$$

- à la cathode (pôle $-$), réduction : $\mathrm{Cu^{2+}(aq) + 2\,e^- \rightarrow Cu(s)}$, un dépôt de cuivre apparaît ;
- à l'anode (pôle $+$), oxydation : $\mathrm{2\,Cl^-(aq) \rightarrow Cl_2(g) + 2\,e^-}$, un dégagement de dichlore se produit.

Cette réaction est l'inverse de la réaction spontanée entre le cuivre et le dichlore.

## 3. Charge électrique et quantité de matière

Pendant une durée $\Delta t$, un courant d'intensité $I$ constante fait circuler la charge :

$$
Q = I\,\Delta t
$$

avec $Q$ en coulombs ($\mathrm{C}$), $I$ en ampères ($\mathrm{A}$) et $\Delta t$ en secondes ($\mathrm{s}$).

Cette charge est portée par les électrons échangés aux électrodes. Une mole d'électrons porte, en valeur absolue, la charge $F$ appelée **constante de Faraday** :

$$
F = N_A \times e = 6{,}022 \times 10^{23}\ \mathrm{mol^{-1}} \times 1{,}602 \times 10^{-19}\ \mathrm{C} \approx 9{,}65 \times 10^{4}\ \mathrm{C \cdot mol^{-1}}
$$

> **Loi.** La quantité d'électrons échangée au cours d'une électrolyse est reliée à l'intensité et à la durée par :
>
> $$
> Q = I\,\Delta t = n(e^-)\,F
> $$
>

On relie ensuite $n(e^-)$ aux quantités de matière formées ou consommées grâce aux **demi-équations électroniques**. Pour la cathode de l'exemple précédent, 2 électrons forment 1 atome de cuivre :

$$
n(\mathrm{Cu})_{\text{formé}} = \frac{n(e^-)}{2} = \frac{I\,\Delta t}{2F}
$$

Démarche à suivre :

1. calculer $Q = I\,\Delta t$ (durée convertie en secondes) ;
2. en déduire $n(e^-) = \dfrac{Q}{F}$ ;
3. utiliser la demi-équation pour obtenir la quantité de l'espèce cherchée ;
4. convertir en masse ($m = n\,M$) ou en volume de gaz ($V = n\,V_m$).

## 4. Stocker et convertir l'énergie chimique

### Les accumulateurs

Un **accumulateur** est une pile rechargeable. Il fonctionne alternativement :

- en **décharge** : il se comporte comme une pile, la transformation est spontanée et l'énergie chimique est convertie en énergie électrique ;
- en **charge** : un chargeur impose un courant de sens inverse, la transformation est forcée (c'est une électrolyse) et l'énergie électrique est stockée sous forme chimique.

Les accumulateurs au plomb (automobiles) et lithium-ion (téléphones, véhicules électriques) reposent sur ce principe. Lors de la charge, les rôles d'anode et de cathode des deux électrodes sont échangés par rapport à la décharge.

La **capacité** d'un accumulateur est la charge maximale qu'il peut débiter : $Q_{\max} = I\,\Delta t$, souvent exprimée en ampères-heures ($1\ \mathrm{A \cdot h} = 3\,600\ \mathrm{C}$).

### La production de dihydrogène

L'**électrolyse de l'eau** produit du dihydrogène sans rejet de dioxyde de carbone si l'électricité utilisée est d'origine renouvelable. En milieu acide :

- à la cathode (pôle $-$), réduction : $\mathrm{2\,H^+(aq) + 2\,e^- \rightarrow H_2(g)}$ ;
- à l'anode (pôle $+$), oxydation : $\mathrm{2\,H_2O(l) \rightarrow O_2(g) + 4\,H^+(aq) + 4\,e^-}$.

Bilan : $\mathrm{2\,H_2O(l) \rightarrow 2\,H_2(g) + O_2(g)}$. On obtient deux fois plus de dihydrogène que de dioxygène, en volume comme en quantité de matière.

Le dihydrogène stocke ainsi de l'énergie électrique, restituée ensuite dans une **pile à combustible** par la réaction spontanée inverse.

### Les organismes chlorophylliens

La nature stocke aussi de l'énergie sous forme chimique : par la **photosynthèse**, les organismes chlorophylliens convertissent l'énergie lumineuse en énergie chimique (synthèse de glucose à partir de dioxyde de carbone et d'eau, avec libération de dioxygène). La **respiration** restitue ensuite cette énergie par la transformation inverse.

Ces dispositifs de stockage posent des enjeux de société : intermittence des énergies renouvelables, ressources en lithium et en cobalt, recyclage des batteries, rendement des conversions successives.

## Exercice type

On électrolyse de l'eau acidifiée sous une intensité constante $I = 2{,}00\ \mathrm{A}$ pendant $\Delta t = 30{,}0\ \mathrm{min}$. Données : $F = 9{,}65 \times 10^{4}\ \mathrm{C \cdot mol^{-1}}$, volume molaire des gaz $V_m = 24{,}0\ \mathrm{L \cdot mol^{-1}}$.

1. Calculer la charge électrique $Q$ et la quantité d'électrons échangée.
2. En déduire les volumes de dihydrogène et de dioxygène obtenus.

<details>
<summary>Voir la correction</summary>

1. La durée vaut $\Delta t = 30{,}0 \times 60 = 1{,}80 \times 10^{3}\ \mathrm{s}$, donc :

$$
Q = I\,\Delta t = 2{,}00 \times 1{,}80 \times 10^{3} = 3{,}60 \times 10^{3}\ \mathrm{C}
$$

$$
n(e^-) = \frac{Q}{F} = \frac{3{,}60 \times 10^{3}}{9{,}65 \times 10^{4}} = 3{,}73 \times 10^{-2}\ \mathrm{mol}
$$

2. À la cathode, $\mathrm{2\,H^+ + 2\,e^- \rightarrow H_2}$ : 2 électrons pour 1 molécule de dihydrogène.

$$
n(\mathrm{H_2}) = \frac{n(e^-)}{2} = 1{,}87 \times 10^{-2}\ \mathrm{mol} \quad\text{soit}\quad V(\mathrm{H_2}) = n\,V_m = 0{,}448\ \mathrm{L}
$$

À l'anode, 4 électrons sont libérés par molécule de dioxygène formée :

$$
n(\mathrm{O_2}) = \frac{n(e^-)}{4} = 9{,}33 \times 10^{-3}\ \mathrm{mol} \quad\text{soit}\quad V(\mathrm{O_2}) = 0{,}224\ \mathrm{L}
$$

On retrouve bien un volume de dihydrogène double de celui du dioxygène.

</details>

## À retenir

- Une électrolyse est une transformation **forcée** par un générateur : $Q_r$ s'éloigne de $K$, l'énergie électrique est convertie en énergie chimique.
- **Anode : oxydation**, reliée au pôle $+$ ; **cathode : réduction**, reliée au pôle $-$.
- $Q = I\,\Delta t = n(e^-)\,F$, avec $F \approx 9{,}65 \times 10^{4}\ \mathrm{C \cdot mol^{-1}}$.
- La demi-équation électronique relie $n(e^-)$ à la quantité de l'espèce formée.
- Charger un accumulateur ou produire du dihydrogène par électrolyse de l'eau, c'est **stocker** de l'énergie sous forme chimique.

## Erreurs fréquentes

- Oublier de convertir la durée en **secondes** avant de calculer $Q$.
- Écrire $n(\text{produit}) = n(e^-)$ sans tenir compte du nombre d'électrons de la demi-équation.
- Associer l'anode au pôle $-$ : c'est vrai pour une pile, pas pour un électrolyseur. Ce qui définit l'anode, c'est l'**oxydation**, pas la polarité.
- Croire que les électrons traversent la solution : dans l'électrolyte, ce sont les **ions** qui assurent le passage du courant.
