---
titre: "Mesurer la poussée d'Archimède"
description: "Plongez un cylindre suspendu à un dynamomètre dans une éprouvette : le niveau monte, le ressort se détend et la poussée se mesure."
niveau: terminale
theme: mouvement
matiere: physique
ordre: 12
duree: "1 h"
chapitre: "mecanique-des-fluides"
objectifs:
  - "Mesurer une poussée d'Archimède avec un dynamomètre"
  - "Relier la poussée au volume immergé et à la masse volumique du fluide"
  - "Expliquer son origine par la différence de pression entre le bas et le haut du solide"
  - "Prévoir si un solide coule ou flotte"
materiel:
  - "Potence, noix de serrage et tige horizontale"
  - "Dynamomètre de 2 N"
  - "Cylindre d'aluminium de 40 cm³ muni d'un crochet, fil fin"
  - "Éprouvette graduée de 250 mL"
  - "Eau, eau salée, éthanol"
  - "Balance et pied à coulisse (contrôle du volume)"
---

## Principe

Un solide plongé dans un fluide au repos subit, de la part de ce fluide, des forces pressantes sur toute sa surface. Leur résultante est la **poussée d'Archimède** : verticale, dirigée vers le haut, de valeur égale au poids du fluide déplacé.

$$
P_A = \rho_{\text{fluide}}\, V_{\text{immergé}}\, g
$$

On suspend un cylindre à un dynamomètre. Dans l'air, celui-ci indique le poids $P$ du solide. Une fois le solide immergé et immobile, il indique une valeur $F$ plus faible : la somme des forces étant nulle, $P = F + P_A$, donc $P_A = P - F$. L'éprouvette graduée donne en même temps le volume immergé, par simple lecture de la montée du niveau.

## Protocole

1. Suspendre le cylindre au dynamomètre et relever son poids $P$ dans l'air. Noter le volume initial de liquide dans l'éprouvette : $150\ \mathrm{mL}$.
2. Descendre lentement la noix de serrage pour immerger le solide peu à peu, sans toucher les parois. Relever plusieurs couples (volume lu, valeur $F$ du dynamomètre).
3. Solide entièrement immergé, lire le nouveau niveau. La différence avec le niveau initial est le volume déplacé $V$.
4. Observer le schéma des forces pressantes : comparer les flèches du dessus, du dessous et des côtés.
5. Calculer $P - F$ et comparer à $\rho\, V\, g$.

## Exploitation

Pour le cylindre d'aluminium ($\rho_{\text{solide}} = 2{,}7\ \mathrm{g \cdot cm^{-3}}$, $V = 40\ \mathrm{cm^3}$) dans l'eau :

| Grandeur | Valeur |
|---|---|
| Poids dans l'air $P$ | $1{,}06\ \mathrm{N}$ |
| Dynamomètre, solide immergé $F$ | $0{,}67\ \mathrm{N}$ |
| Niveau final | $190\ \mathrm{mL}$, soit $V = 40\ \mathrm{mL} = 4{,}0 \times 10^{-5}\ \mathrm{m^3}$ |
| Poussée mesurée $P - F$ | $0{,}39\ \mathrm{N}$ |

Le calcul donne $\rho\, V\, g = 1{,}0 \times 10^{3} \times 4{,}0 \times 10^{-5} \times 9{,}81 = 0{,}39\ \mathrm{N}$ : l'accord est très bon.

Sur le graphique, la poussée est une droite passant par l'origine, de pente $\rho\, g$ : elle est proportionnelle au volume immergé. La valeur lue au dynamomètre décroît d'autant, la somme $F + P_A$ restant égale à $P$.

L'origine de la poussée se lit dans la loi de la statique des fluides. Entre la face supérieure et la face inférieure du cylindre, de hauteur $h = 5{,}0\ \mathrm{cm}$ et de section $S = 8{,}0\ \mathrm{cm^2}$, la pression augmente de $\Delta p = \rho\, g\, h = 491\ \mathrm{Pa}$. La résultante vaut $\Delta p \times S = 0{,}39\ \mathrm{N}$ : on retrouve $\rho\, V\, g$, puisque $V = S\, h$.

## Questions

1. Une fois le solide entièrement immergé, la poussée change-t-elle si on le descend davantage ?
2. Dans l'animation, portez la masse volumique du liquide à $1{,}30\ \mathrm{g \cdot cm^{-3}}$. Comment évoluent la pente de la droite $P_A$ et la valeur finale du dynamomètre ?
3. Réglez la masse volumique du solide sur $0{,}6\ \mathrm{g \cdot cm^{-3}}$ (bois) dans l'eau. Que lit-on au dynamomètre en fin d'expérience ? Quelle fraction du solide est immergée ?

<details>
<summary>Voir les réponses</summary>

1. Non. La pression augmente sur les deux faces, mais leur écart $\rho\, g\, h$ ne dépend que de la hauteur du solide : la poussée reste égale à $\rho\, V\, g$.
2. La pente $\rho\, g$ augmente : la poussée finale passe de $0{,}39\ \mathrm{N}$ à $0{,}51\ \mathrm{N}$ et le dynamomètre n'indique plus que $0{,}55\ \mathrm{N}$.
3. Le dynamomètre indique zéro : le solide flotte, la poussée compense exactement le poids ($0{,}24\ \mathrm{N}$). Le volume immergé vaut $24\ \mathrm{cm^3}$, soit 60 % du solide, rapport des masses volumiques.

</details>

## Sécurité

L'éthanol est inflammable : flacon bouché, loin de toute flamme.
