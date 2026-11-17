---
titre: "Piles : convertir l'énergie chimique en énergie électrique"
description: "Constitution d'une pile, polarité, réactions aux électrodes, tension à vide et capacité électrique, avec les oxydants et réducteurs usuels."
niveau: terminale
theme: matiere
ordre: 8
duree: "25 min"
motsCles: ["pile", "oxydoréduction", "anode", "cathode", "pont salin", "capacité électrique", "pile Daniell"]
tp: ["pile-daniell"]
---

> **L'essentiel.** Une pile sépare les deux couples d'une réaction d'oxydoréduction spontanée : les électrons, au lieu d'être échangés directement, circulent dans un circuit extérieur. L'oxydation a lieu à l'**anode** (borne négative), la réduction à la **cathode** (borne positive). Sa **tension à vide** se mesure quand elle ne débite pas. La pile est usée quand un réactif est épuisé (ou l'équilibre atteint) ; la charge qu'elle a pu débiter est sa **capacité**.

## 1. Oxydants et réducteurs usuels

Une réaction d'oxydoréduction est un transfert d'électrons du réducteur d'un couple vers l'oxydant d'un autre couple. Chaque couple oxydant/réducteur s'écrit avec une demi-équation électronique, par exemple :

$$
\mathrm{Cu^{2+}(aq) + 2\,e^- \rightleftarrows Cu(s)}
$$

> **Définition.** Un **oxydant** est une espèce capable de capter un ou plusieurs électrons ; un **réducteur** est une espèce capable d'en céder. Une **oxydation** est une perte d'électrons, une **réduction** un gain d'électrons.

Le programme demande de connaître quelques espèces de la vie courante :

| Espèce | Rôle | Couple | Usage |
|---|---|---|---|
| Ion hypochlorite $\mathrm{ClO^-}$ (eau de Javel) | oxydant | $\mathrm{ClO^-/Cl^-}$ | désinfectant, blanchiment |
| Dioxygène $\mathrm{O_2}$ | oxydant | $\mathrm{O_2/H_2O}$ | combustions, corrosion, piles à combustible |
| Dichlore $\mathrm{Cl_2}$ | oxydant | $\mathrm{Cl_2/Cl^-}$ | traitement de l'eau |
| Acide ascorbique $\mathrm{C_6H_8O_6}$ (vitamine C) | réducteur | $\mathrm{C_6H_6O_6/C_6H_8O_6}$ | antioxydant alimentaire |
| Dihydrogène $\mathrm{H_2}$ | réducteur | $\mathrm{H^+/H_2}$ | carburant des piles à combustible |
| Métaux ($\mathrm{Zn}$, $\mathrm{Fe}$, $\mathrm{Al}$, $\mathrm{Li}$...) | réducteurs | $\mathrm{M^{n+}/M}$ | électrodes de piles |

Les métaux sont de bons réducteurs : ils cèdent facilement des électrons pour former des cations. C'est pourquoi on les trouve à l'anode de nombreuses piles.

## 2. Constitution d'une pile

Plongeons une lame de zinc dans une solution de sulfate de cuivre : le zinc se recouvre de cuivre et la solution se décolore. La réaction $\mathrm{Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s)}$ est spontanée, mais les électrons passent directement d'une espèce à l'autre : aucune énergie électrique n'est récupérable.

Une pile **sépare** les réactifs en deux compartiments :

- deux **demi-piles**, chacune formée d'une électrode métallique plongeant dans une solution contenant l'oxydant et le réducteur d'un même couple (lame de zinc dans $\mathrm{Zn^{2+}}$, lame de cuivre dans $\mathrm{Cu^{2+}}$ pour la pile Daniell) ;
- un **pont salin** (papier ou gel imbibé d'un électrolyte inerte comme $\mathrm{K^+ + NO_3^-}$) qui relie les deux solutions ;
- un **circuit extérieur** qui relie les électrodes et alimente un récepteur.

> **Rôle du pont salin.** Il ferme le circuit électrique et assure l'**électroneutralité** de chaque solution : ses ions migrent pour compenser l'apparition ou la disparition d'ions dans les compartiments. Sans lui, aucun courant ne circule.

Dans la pile Daniell, des ions $\mathrm{Zn^{2+}}$ apparaissent côté anode et des ions $\mathrm{Cu^{2+}}$ disparaissent côté cathode : les anions du pont ($\mathrm{NO_3^-}$) migrent vers le compartiment de l'anode, les cations ($\mathrm{K^+}$) vers celui de la cathode.

Dans le circuit extérieur, le courant est porté par les **électrons** ; dans les solutions et le pont salin, il est porté par les **ions**.

## 3. Anode, cathode et polarité

> **Définition.** L'**anode** est l'électrode où se produit l'**oxydation**. La **cathode** est l'électrode où se produit la **réduction**.

Les électrons sont libérés à l'anode, traversent le circuit extérieur et sont consommés à la cathode. Ils sortent donc de la borne négative : dans une pile, **l'anode est le pôle négatif** et **la cathode le pôle positif**. Le courant électrique circule, à l'extérieur de la pile, de la cathode vers l'anode (sens inverse des électrons).

Pour la pile Daniell :

| Électrode | Nom | Polarité | Réaction |
|---|---|---|---|
| Zinc | anode | $-$ | $\mathrm{Zn(s) \rightarrow Zn^{2+}(aq) + 2\,e^-}$ |
| Cuivre | cathode | $+$ | $\mathrm{Cu^{2+}(aq) + 2\,e^- \rightarrow Cu(s)}$ |

L'équation de fonctionnement est la somme des deux demi-équations, électrons éliminés :

$$
\mathrm{Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s)}
$$

En pratique, on détermine la polarité avec un voltmètre : il affiche une tension positive quand sa borne V est reliée au pôle $+$ et sa borne COM au pôle $-$. On peut aussi prévoir le sens d'évolution spontanée avec le quotient de réaction : la pile fonctionne tant que $Q_r < K$.

Une pile s'écrit de façon conventionnelle en plaçant l'anode à gauche :

$$
\mathrm{\ominus\ Zn(s)\,|\,Zn^{2+}(aq)\,\|\,Cu^{2+}(aq)\,|\,Cu(s)\ \oplus}
$$

## 4. Tension à vide, usure et capacité

> **Définition.** La **tension à vide** $U_0$ (ou force électromotrice $E$) est la tension mesurée entre les bornes de la pile quand elle ne débite aucun courant. Elle dépend de la nature des couples et des concentrations.

Pour la pile Daniell, $U_0 \approx 1{,}1\ \mathrm{V}$. Quand la pile débite, la tension à ses bornes est un peu plus faible à cause de sa résistance interne.

Au cours du fonctionnement, $Q_r$ augmente et se rapproche de $K$. La pile est **usée** quand le système atteint l'équilibre ($Q_r = K$) ou quand un réactif est totalement consommé : le courant cesse. Pour la pile Daniell, $K$ est si grand ($K \approx 10^{37}$) que l'usure correspond en pratique à l'épuisement du réactif limitant.

> **Définition.** La **capacité électrique** $Q_{\max}$ d'une pile est la charge électrique maximale qu'elle peut débiter au cours de sa vie :
>
> $$
> Q_{\max} = n(e^-)_{\max} \times F
> $$
>
> où $n(e^-)_{\max}$ est la quantité d'électrons échangés quand le réactif limitant est épuisé et $F = N_A \times e \approx 9{,}65 \times 10^{4}\ \mathrm{C \cdot mol^{-1}}$ la constante de Faraday.

Pour une pile débitant un courant d'intensité constante $I$ pendant une durée $\Delta t$, la charge débitée vaut $Q = I \times \Delta t$. La capacité est souvent donnée en ampère-heure : $1\ \mathrm{A \cdot h} = 3\,600\ \mathrm{C}$.

La démarche pour relier charge et matière est toujours la même :

1. écrire la demi-équation de l'électrode où le réactif limitant est consommé ;
2. en déduire $n(e^-)$ à partir de la quantité de réactif (par exemple $n(e^-) = 2\,n(\mathrm{Cu^{2+}})$) ;
3. multiplier par $F$.

## Exercice type

Une pile Daniell est constituée d'une lame de zinc de masse $5{,}0\ \mathrm{g}$ plongeant dans une solution de sulfate de zinc, et d'une lame de cuivre plongeant dans $V = 100\ \mathrm{mL}$ de solution de sulfate de cuivre à $C = 0{,}10\ \mathrm{mol \cdot L^{-1}}$. Les deux compartiments sont reliés par un pont salin.

Données : $M(\mathrm{Zn}) = 65{,}4\ \mathrm{g \cdot mol^{-1}}$ ; $F = 9{,}65 \times 10^{4}\ \mathrm{C \cdot mol^{-1}}$.

1. Indiquer l'anode, la cathode et la polarité de la pile.
2. Déterminer le réactif limitant et la capacité de la pile.
3. La pile débite un courant constant $I = 50\ \mathrm{mA}$. Quelle est sa durée de fonctionnement ?

<details>
<summary>Voir la correction</summary>

1. La transformation spontanée est $\mathrm{Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s)}$ : le zinc est oxydé ($\mathrm{Zn \rightarrow Zn^{2+} + 2\,e^-}$) : la lame de zinc est l'**anode**, pôle $-$. Les ions cuivre(II) sont réduits sur la lame de cuivre, qui est la **cathode**, pôle $+$.

2. Quantités initiales :

$$
n(\mathrm{Zn}) = \frac{5{,}0}{65{,}4} = 7{,}6 \times 10^{-2}\ \mathrm{mol}
\qquad
n(\mathrm{Cu^{2+}}) = C \times V = 0{,}10 \times 0{,}100 = 1{,}0 \times 10^{-2}\ \mathrm{mol}
$$

Les nombres stœchiométriques valent 1 : $\mathrm{Cu^{2+}}$ est le réactif limitant, $x_{\max} = 1{,}0 \times 10^{-2}\ \mathrm{mol}$. Chaque ion $\mathrm{Cu^{2+}}$ capte deux électrons, donc $n(e^-)_{\max} = 2\,x_{\max} = 2{,}0 \times 10^{-2}\ \mathrm{mol}$ :

$$
Q_{\max} = 2{,}0 \times 10^{-2} \times 9{,}65 \times 10^{4} = 1{,}9 \times 10^{3}\ \mathrm{C}
$$

3. Avec $Q_{\max} = I \times \Delta t$ :

$$
\Delta t = \frac{Q_{\max}}{I} = \frac{1{,}93 \times 10^{3}}{50 \times 10^{-3}} = 3{,}9 \times 10^{4}\ \mathrm{s} \approx 11\ \mathrm{h}
$$

</details>

## À retenir

- Une pile sépare les deux couples d'une réaction d'oxydoréduction spontanée ; le **pont salin** ferme le circuit et maintient l'électroneutralité.
- **Anode** : oxydation, pôle $-$. **Cathode** : réduction, pôle $+$. Les électrons vont de l'anode vers la cathode dans le circuit extérieur.
- La **tension à vide** se mesure au voltmètre, pile ne débitant pas.
- La pile est usée quand un réactif est épuisé (ou que $Q_r = K$).
- Capacité : $Q_{\max} = n(e^-)_{\max} \times F = I \times \Delta t$.

## Erreurs fréquentes

- Croire que des **électrons** traversent le pont salin ou les solutions : ce sont les **ions** qui assurent le passage du courant.
- Inverser anode et cathode : moyen mnémotechnique, **a**node et **o**xydation commencent par une voyelle, **c**athode et **r**éduction par une consonne.
- Oublier le facteur 2 entre la quantité d'ions $\mathrm{Cu^{2+}}$ (ou $\mathrm{Zn}$) consommée et la quantité d'électrons échangés.
- Calculer la capacité avec le réactif en excès au lieu du réactif limitant.
- Exprimer $\Delta t$ en heures ou $I$ en milliampères dans $Q = I \times \Delta t$ sans convertir.
