---
titre: "Pile Daniell : du zinc, du cuivre et un pont salin"
description: "Construisez une pile cuivre-zinc, suivez les électrons dans le fil et les ions dans le pont salin, puis reliez la charge débitée aux masses des lames."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 6
duree: "1 h 30"
chapitre: "piles"
objectifs:
  - "Réaliser une pile et identifier sa polarité avec un voltmètre"
  - "Écrire les réactions aux électrodes et la réaction de fonctionnement"
  - "Expliquer le rôle du pont salin et le sens de déplacement des porteurs de charge"
  - "Relier la charge débitée aux variations de masse des électrodes"
materiel:
  - "Deux béchers de 100 mL"
  - "Lame de zinc et lame de cuivre décapées"
  - "Solutions de sulfate de zinc et de sulfate de cuivre à 0,10 mol/L"
  - "Pont salin au nitrate de potassium"
  - "Voltmètre, fils et pinces crocodiles"
  - "Conducteur ohmique (boîte de résistances de 10 à 100 Ω)"
  - "Chronomètre et balance au milligramme"
---

## Principe

Une pile convertit de l'énergie chimique en énergie électrique grâce à une transformation d'oxydoréduction **spontanée** dont les réactifs sont séparés. Dans la pile Daniell, le zinc cède des électrons aux ions cuivre, mais ces électrons doivent emprunter le circuit extérieur :

$$
\mathrm{Zn\,(s) + Cu^{2+}\,(aq) \rightarrow Zn^{2+}\,(aq) + Cu\,(s)}
$$

Chaque bécher contient un couple métal/ion et forme une **demi-pile**. Le pont salin relie les deux solutions : ses ions assurent le passage du courant et maintiennent la neutralité électrique de chaque solution.

## Protocole

1. Verser $50\ \mathrm{mL}$ de solution de sulfate de zinc dans un bécher et $50\ \mathrm{mL}$ de solution de sulfate de cuivre dans l'autre. Y plonger la lame de zinc et la lame de cuivre, préalablement pesées.
2. Brancher le voltmètre aux bornes des lames, puis poser le pont salin. Relever la tension à vide et en déduire la polarité de la pile.
3. Brancher le conducteur ohmique entre les deux lames. Indiquer sur un schéma le sens du courant, celui des électrons et celui des ions dans le pont.
4. Observer chaque électrode et écrire la demi-équation de la réaction qui s'y déroule.
5. Laisser débiter plusieurs heures en déclenchant le chronomètre, puis rincer, sécher et peser à nouveau les lames.
6. Comparer les variations de masse aux valeurs calculées à partir de la charge débitée.

## Exploitation

Le voltmètre indique $U = 1{,}10\ \mathrm{V}$ quand sa borne COM est reliée au zinc : le cuivre est la borne positive. Les électrons quittent donc le zinc, où a lieu une oxydation (**anode**), et arrivent au cuivre, où a lieu une réduction (**cathode**) :

$$
\mathrm{Zn\,(s) \rightarrow Zn^{2+}\,(aq) + 2\,e^-}
$$

$$
\mathrm{Cu^{2+}\,(aq) + 2\,e^- \rightarrow Cu\,(s)}
$$

Avec $R = 30\ \Omega$ et une résistance interne de $10\ \Omega$, la pile débite $I = 1{,}10/40 = 27{,}5\ \mathrm{mA}$. En $\Delta t = 6{,}0\ \mathrm{h}$ :

$$
Q = I\,\Delta t = 0{,}0275 \times 21\,600 = 594\ \mathrm{C}
$$

$$
n(\mathrm{e^-}) = \frac{Q}{F} = \frac{594}{96\,485} = 6{,}16\ \mathrm{mmol}
$$

Deux électrons sont échangés par atome : $n(\mathrm{Zn}) = n(\mathrm{Cu}) = n(\mathrm{e^-})/2 = 3{,}08\ \mathrm{mmol}$. Sans arrondir ce résultat intermédiaire ($3{,}078\ \mathrm{mmol}$), la lame de zinc perd $3{,}078 \times 65{,}4 = 201\ \mathrm{mg}$ et celle de cuivre gagne $3{,}078 \times 63{,}5 = 195\ \mathrm{mg}$.

La pile est usée quand le réactif limitant est épuisé, ici les $5{,}0\ \mathrm{mmol}$ d'ions cuivre. Sa **capacité** vaut $Q_{max} = 2 \times 5{,}0 \times 10^{-3} \times 96\,485 = 965\ \mathrm{C}$.

## Questions

1. Pourquoi la tension tombe-t-elle à zéro si l'on retire le pont salin ?
2. Dans l'animation, réglez la résistance sur $100\ \Omega$. Que deviennent l'intensité et les masses échangées en 6 h ?
3. Réglez la résistance sur $10\ \Omega$ et la durée sur 8 h. Que se passe-t-il sur le graphique vers 4,9 h ? Pourquoi ?

<details>
<summary>Voir les réponses</summary>

1. Le circuit est ouvert : sans ions pour porter le courant entre les deux solutions, aucune charge ne peut circuler et la pile ne fonctionne plus.
2. L'intensité tombe à $10\ \mathrm{mA}$ et la charge à $216\ \mathrm{C}$ : les masses, proportionnelles à $Q$, sont presque trois fois plus faibles (environ 71 mg de cuivre déposé).
3. Les deux droites deviennent horizontales : avec $I = 55\ \mathrm{mA}$, la capacité de $965\ \mathrm{C}$ est atteinte en 4,9 h. Les ions cuivre sont épuisés, la solution est décolorée, la pile est usée.

</details>

## Sécurité

Le sulfate de cuivre est nocif et dangereux pour l'environnement : gants et lunettes, et récupération des solutions dans le bidon prévu, jamais à l'évier.
