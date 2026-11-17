---
titre: "Équilibre chimique : prévoir le sens d'évolution spontanée"
description: "Transformations non totales, taux d'avancement final, quotient de réaction et constante d'équilibre : le critère pour savoir dans quel sens évolue un système."
niveau: terminale
theme: matiere
ordre: 7
duree: "30 min"
motsCles: ["équilibre chimique", "taux d'avancement", "quotient de réaction", "constante d'équilibre", "sens d'évolution", "pile"]
tp: []
---

> **L'essentiel.** Beaucoup de transformations cessent d'évoluer avant l'épuisement du réactif limitant ($\tau < 1$) : l'état final est un **équilibre dynamique**. Pour prévoir dans quel sens un système évolue spontanément, on compare son **quotient de réaction** $Q_r$ à la **constante d'équilibre** $K$, qui, pour une réaction donnée, ne dépend que de la température. Une pile en est l'application : elle débite tant que $Q_r < K$.

## 1. Transformation totale ou non totale

Pour une transformation d'équation donnée, l'**avancement maximal** $x_{\max}$ est celui qu'on atteindrait si le réactif limitant était entièrement consommé. L'avancement réellement atteint à l'état final est l'**avancement final** $x_f$.

- Si $x_f = x_{\max}$, la transformation est **totale** : le réactif limitant a disparu.
- Si $x_f < x_{\max}$, la transformation est **non totale** : à l'état final, **tous les réactifs et tous les produits coexistent**.

> **Définition.** Le taux d'avancement final d'une transformation est le quotient
>
> $$
> \tau = \frac{x_f}{x_{\max}}
> $$
>
> C'est un nombre sans dimension compris entre 0 et 1. La transformation est totale si $\tau = 1$, non totale si $\tau < 1$.

Exemple : une solution d'acide éthanoïque à $1{,}0 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}$ a un pH de 3,4. Si la réaction avec l'eau était totale, on aurait $[\mathrm{H_3O^+}] = 1{,}0 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}$ et un pH de 2,0. La mesure montre que seuls 4 % des molécules d'acide ont réagi.

## 2. L'équilibre dynamique

Pour une transformation non totale, on écrit l'équation avec une double flèche :

$$
a\,\mathrm{A} + b\,\mathrm{B} \rightleftarrows c\,\mathrm{C} + d\,\mathrm{D}
$$

Deux réactions opposées ont lieu simultanément : la réaction dans le **sens direct** (de gauche à droite) et la réaction dans le **sens inverse** (de droite à gauche).

> **Définition.** Un système est à l'état d'équilibre lorsque les réactions dans le sens direct et dans le sens inverse se produisent **à la même vitesse**. À l'échelle macroscopique, les quantités de matière n'évoluent plus ; à l'échelle microscopique, les deux réactions continuent : l'équilibre est **dynamique**.

On le vérifie expérimentalement : si l'on part des produits $\mathrm{C}$ et $\mathrm{D}$, le système évolue dans le sens inverse et aboutit au même état d'équilibre que celui obtenu à partir des réactifs (pour une même composition globale).

## 3. Quotient de réaction et constante d'équilibre

> **Définition.** Pour une réaction en solution aqueuse d'équation $a\,\mathrm{A} + b\,\mathrm{B} \rightleftarrows c\,\mathrm{C} + d\,\mathrm{D}$, le quotient de réaction dans un état quelconque du système est
>
> $$
> Q_r = \frac{\left([\mathrm{C}]/c^\circ\right)^{c}\,\left([\mathrm{D}]/c^\circ\right)^{d}}{\left([\mathrm{A}]/c^\circ\right)^{a}\,\left([\mathrm{B}]/c^\circ\right)^{b}}
> $$
>
> où $c^\circ = 1\ \mathrm{mol \cdot L^{-1}}$ est la concentration standard. $Q_r$ est sans dimension.

En pratique, on écrit $Q_r = \dfrac{[\mathrm{C}]^c\,[\mathrm{D}]^d}{[\mathrm{A}]^a\,[\mathrm{B}]^b}$ en exprimant les concentrations en $\mathrm{mol \cdot L^{-1}}$. Règles d'écriture :

| Espèce | Terme dans $Q_r$ |
|---|---|
| Soluté (ion ou molécule dissous) | sa concentration $[X]/c^\circ$ |
| Solvant (eau) | 1 |
| Solide | 1 |

Par exemple, pour $\mathrm{Cu^{2+}(aq) + Zn(s) \rightleftarrows Cu(s) + Zn^{2+}(aq)}$ :

$$
Q_r = \frac{[\mathrm{Zn^{2+}}]}{[\mathrm{Cu^{2+}}]}
$$

> **Loi.** À l'état d'équilibre, le quotient de réaction prend une valeur particulière, la **constante d'équilibre** $K(T)$ :
>
> $$
> Q_{r,\text{éq}} = K(T)
> $$
>
> $K$ ne dépend que de la réaction considérée et de la **température**. Elle ne dépend pas de la composition initiale du système.

Ordres de grandeur utiles :

| Valeur de $K$ | Transformation |
|---|---|
| $K > 10^{4}$ | quasi totale (en général) |
| $10^{-4} < K < 10^{4}$ | généralement non totale |
| $K < 10^{-4}$ | très limitée |

Attention : le taux d'avancement final dépend aussi des **conditions initiales** (concentrations, dilution). Pour une même valeur de $K$, une solution plus diluée d'acide faible conduit à un taux d'avancement plus grand.

## 4. Critère d'évolution spontanée

On calcule le quotient de réaction initial $Q_{r,i}$ à partir de la composition initiale, puis on le compare à $K$. Le système évolue toujours de façon que $Q_r$ **tende vers** $K$.

> **Critère d'évolution spontanée.**
> - Si $Q_{r,i} < K$ : $Q_r$ doit augmenter, des produits se forment : évolution dans le **sens direct**.
> - Si $Q_{r,i} > K$ : $Q_r$ doit diminuer, des réactifs se forment : évolution dans le **sens inverse**.
> - Si $Q_{r,i} = K$ : le système est déjà à l'équilibre, il n'évolue pas.

Conséquence : on peut **déplacer** un équilibre. Partant d'un état d'équilibre, ajouter un réactif fait diminuer $Q_r$, qui devient inférieur à $K$ : le système évolue dans le sens direct. Éliminer un produit au fur et à mesure (par distillation, par exemple) produit le même effet. C'est ainsi qu'on améliore le rendement d'une estérification.

Le critère ne dit rien de la **vitesse** : une évolution prévue peut être si lente qu'elle n'est pas observable. Thermodynamique (sens) et cinétique (durée) sont deux questions distinctes.

## 5. Le cas de l'oxydoréduction

Une réaction d'oxydoréduction est un **transfert d'électrons** du réducteur d'un couple vers l'oxydant d'un autre couple. Ce transfert spontané peut se faire de deux façons.

1. **Par contact direct.** Une lame de zinc plongée dans une solution de sulfate de cuivre se recouvre de cuivre et la solution se décolore. La constante vaut $K \approx 10^{37}$ : la transformation est totale. L'énergie libérée l'est sous forme de chaleur.
2. **Par un circuit extérieur : la pile.** On sépare les deux couples dans deux demi-piles reliées par un pont salin : les réactifs n'étant plus en contact, les électrons sont obligés de passer par le circuit extérieur. Les électrons quittent la lame de zinc (**anode**, siège de l'oxydation, pôle $-$), traversent le circuit extérieur et arrivent sur la lame de cuivre (**cathode**, siège de la réduction, pôle $+$). Dans le pont salin, ce sont les ions qui assurent le passage du courant.

Le critère d'évolution s'applique à la pile comme à tout système : tant que $Q_r < K$, la réaction se poursuit dans le sens direct et la pile débite. Quand $Q_r$ atteint $K$, le système est à l'équilibre : la pile est **usée**, elle ne débite plus.

La quantité d'électricité maximale qu'elle peut fournir (sa **capacité**) est liée à la quantité d'électrons échangés :

$$
Q_{\max} = n(\mathrm{e^-})_{\max} \times \mathcal{F} \qquad \text{avec } \mathcal{F} = 96\,500\ \mathrm{C \cdot mol^{-1}}
$$

## Exercice type

On prépare $V = 100{,}0\ \mathrm{mL}$ d'une solution d'acide éthanoïque de concentration apportée $C = 1{,}0 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}$. Le pH mesuré à l'équilibre vaut $3{,}40$. L'équation de la réaction est :

$$
\mathrm{CH_3COOH\,(aq) + H_2O\,(l) \rightleftarrows CH_3COO^-\,(aq) + H_3O^+\,(aq)}
$$

1. Calculer le taux d'avancement final $\tau$. La transformation est-elle totale ?
2. En déduire la valeur de la constante d'équilibre $K$ à cette température.
3. Dans un autre bécher, on mélange de l'acide éthanoïque et de l'éthanoate de sodium de sorte que, initialement, $[\mathrm{CH_3COOH}] = [\mathrm{CH_3COO^-}] = 1{,}0 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}$ et $[\mathrm{H_3O^+}] = 1{,}0 \times 10^{-5}\ \mathrm{mol \cdot L^{-1}}$. Dans quel sens évolue le système ?

<details>
<summary>Voir la correction</summary>

1. L'eau est le solvant, l'acide est limitant : $x_{\max} = C\,V = 1{,}0 \times 10^{-3}\ \mathrm{mol}$. À l'état final, $[\mathrm{H_3O^+}]_f = 10^{-3{,}40} = 4{,}0 \times 10^{-4}\ \mathrm{mol \cdot L^{-1}}$, donc $x_f = [\mathrm{H_3O^+}]_f\,V = 4{,}0 \times 10^{-5}\ \mathrm{mol}$.

$$
\tau = \frac{x_f}{x_{\max}} = \frac{4{,}0 \times 10^{-5}}{1{,}0 \times 10^{-3}} = 0{,}040
$$

Seulement 4,0 % de l'acide a réagi : la transformation est **non totale**.

2. À l'équilibre, $[\mathrm{CH_3COO^-}]_{\text{éq}} = [\mathrm{H_3O^+}]_{\text{éq}} = 4{,}0 \times 10^{-4}\ \mathrm{mol \cdot L^{-1}}$ et $[\mathrm{CH_3COOH}]_{\text{éq}} = C - [\mathrm{H_3O^+}]_{\text{éq}} = 9{,}6 \times 10^{-3}\ \mathrm{mol \cdot L^{-1}}$. L'eau ne figure pas dans le quotient :

$$
K = \frac{[\mathrm{CH_3COO^-}]_{\text{éq}}\,[\mathrm{H_3O^+}]_{\text{éq}}}{[\mathrm{CH_3COOH}]_{\text{éq}}} = \frac{(4{,}0 \times 10^{-4})^2}{9{,}6 \times 10^{-3}} = 1{,}7 \times 10^{-5}
$$

3. Quotient de réaction initial :

$$
Q_{r,i} = \frac{1{,}0 \times 10^{-2} \times 1{,}0 \times 10^{-5}}{1{,}0 \times 10^{-2}} = 1{,}0 \times 10^{-5}
$$

$Q_{r,i} < K$ : le système évolue dans le **sens direct**, avec formation d'ions éthanoate et oxonium. Le pH diminue légèrement.

</details>

## À retenir

- Taux d'avancement final : $\tau = \dfrac{x_f}{x_{\max}}$ ; transformation non totale si $\tau < 1$, tous les réactifs et produits coexistent alors.
- L'équilibre est **dynamique** : réactions directe et inverse à la même vitesse.
- $Q_r$ s'écrit avec les concentrations des solutés ; solvant et solides comptent pour 1.
- À l'équilibre, $Q_{r,\text{éq}} = K(T)$, qui ne dépend que de la température.
- $Q_{r,i} < K$ : sens direct ; $Q_{r,i} > K$ : sens inverse ; $Q_{r,i} = K$ : pas d'évolution.
- Une pile débite tant que $Q_r < K$ ; elle est usée quand $Q_r = K$.

## Erreurs fréquentes

- Faire figurer l'**eau** ou un **solide** dans l'expression de $Q_r$.
- Croire qu'à l'équilibre « plus rien ne se passe » : les deux réactions continuent à la même vitesse.
- Confondre $K$ et $\tau$ : $K$ ne dépend que de $T$, alors que $\tau$ dépend aussi des concentrations initiales.
- Inverser le critère : si $Q_{r,i}$ est **trop petit**, il manque des produits, donc le système évolue dans le sens direct.
- Penser qu'un sens d'évolution prévu implique une transformation rapide : le critère ne dit rien de la cinétique.
