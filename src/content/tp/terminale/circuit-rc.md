---
titre: "Charge et décharge d'un condensateur dans un circuit RC"
description: "Basculez l'interrupteur, suivez les électrons et la tension aux bornes du condensateur, puis mesurez le temps caractéristique du circuit."
niveau: terminale
theme: ondes
matiere: physique
ordre: 20
duree: "1 h 30"
chapitre: "circuit-rc"
objectifs:
  - "Réaliser un circuit RC série et acquérir la tension aux bornes du condensateur"
  - "Relier le sens du courant au mouvement des porteurs de charge et aux charges des armatures"
  - "Déterminer le temps caractéristique par la tangente à l'origine et par la méthode des 63 %"
  - "Vérifier la relation entre le temps caractéristique, R et C"
materiel:
  - "Générateur de tension continue réglable (0 à 6 V)"
  - "Condensateur de 500 µF (boîte de 200 à 1000 µF)"
  - "Conducteur ohmique de 2,0 kΩ (boîte de 1 à 4 kΩ)"
  - "Interrupteur inverseur à deux positions"
  - "Interface d'acquisition ou oscilloscope à mémoire"
  - "Fils de connexion et plaque de montage"
---

## Principe

Un condensateur est formé de deux armatures conductrices séparées par un isolant. Soumis à une tension $u_C$, il porte sur ses armatures les charges $+q$ et $-q$, avec $q = C\,u_C$. L'intensité du courant est le débit de charge : $i = \dfrac{\mathrm{d}q}{\mathrm{d}t} = C\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}$.

Dans le circuit RC série alimenté par un générateur de tension $E$, la loi des mailles donne $R\,i + u_C = E$, soit l'équation différentielle :

$$
R\,C\,\frac{\mathrm{d}u_C}{\mathrm{d}t} + u_C = E
$$

Le produit $\tau = R\,C$, homogène à une durée, est le **temps caractéristique** du circuit.

## Protocole

1. Réaliser le montage : générateur, inverseur K, conducteur ohmique et condensateur en série. Brancher la voie d'acquisition aux bornes du condensateur.
2. Régler $E = 5{,}0\ \mathrm{V}$, lancer l'acquisition sur 10 s, puis basculer K en position 1 : le condensateur se charge.
3. Au bout de 5 s, basculer K en position 2 : le générateur est hors circuit, le condensateur se décharge dans le conducteur ohmique.
4. Sur la courbe de charge, tracer la tangente à l'origine et l'asymptote $u_C = E$ : elles se coupent à la date $\tau$. Vérifier avec la méthode des 63 %.
5. Comparer la valeur mesurée au produit $R\,C$, puis recommencer avec d'autres valeurs de $R$ et de $C$.

## Exploitation

Condensateur initialement déchargé, la solution de l'équation différentielle est, pour la charge :

$$
u_C(t) = E\left(1 - \mathrm{e}^{-t/\tau}\right)
$$

$$
i(t) = \frac{E}{R}\,\mathrm{e}^{-t/\tau}
$$

Pour la décharge depuis $u_C = E$ : $u_C(t) = E\,\mathrm{e}^{-t/\tau}$ et $i(t) = -\dfrac{E}{R}\,\mathrm{e}^{-t/\tau}$. Le courant change de sens.

Avec $R = 2{,}0\ \mathrm{k\Omega}$ et $C = 500\ \mathrm{\mu F}$ :

$$
\tau = 2{,}0 \times 10^{3} \times 500 \times 10^{-6} = 1{,}0\ \mathrm{s}
$$

Valeurs à retrouver sur l'animation :

| Date | $u_C$ pendant la charge | Lecture |
|---|---|---|
| $t = 0$ | $0\ \mathrm{V}$, avec $i = E/R = 2{,}5\ \mathrm{mA}$ | le courant est maximal |
| $t = \tau$ | $0{,}63\,E = 3{,}16\ \mathrm{V}$ | méthode des 63 % |
| $t = 5\,\tau$ | $0{,}993\,E = 4{,}97\ \mathrm{V}$ | charge considérée comme terminée |

En fin de charge, l'armature positive porte $q = C\,E = 2{,}5\ \mathrm{mC}$.

## Questions

1. Pourquoi l'intensité est-elle maximale à l'instant où l'on ferme le circuit, alors que $u_C$ est nulle ?
2. Dans l'animation, doublez $R$ sans toucher à $C$. Comment évoluent $\tau$ et l'intensité initiale ? La charge finale $q$ change-t-elle ?
3. Réglez $R = 4{,}0\ \mathrm{k\Omega}$ et $C = 1000\ \mathrm{\mu F}$. Le condensateur est-il chargé lorsque K bascule ? Modifier $E$ change-t-il la durée de la charge ?

<details>
<summary>Voir les réponses</summary>

1. À $t = 0$, $u_C = 0$ : toute la tension $E$ se retrouve aux bornes du conducteur ohmique, donc $i = E/R$. Ensuite $u_C$ augmente, la tension $R\,i = E - u_C$ diminue et le courant s'éteint.
2. $\tau = R\,C$ double (2,0 s) et l'intensité initiale $E/R$ est divisée par deux (1,25 mA). La charge finale $q = C\,E$ ne dépend pas de $R$, mais elle est atteinte plus lentement : lorsque K bascule ($t = 5\ \mathrm{s} = 2{,}5\,\tau$), on lit $q = 2{,}29\ \mathrm{mC}$ au lieu de $2{,}48\ \mathrm{mC}$.
3. $\tau = 4{,}0\ \mathrm{s}$ : à $t = 5\ \mathrm{s}$, $u_C = E\,(1 - \mathrm{e}^{-1{,}25}) \approx 0{,}71\,E$, la charge est incomplète. Changer $E$ modifie l'asymptote et l'intensité, pas $\tau$ : la durée de la charge reste la même.

</details>

## Sécurité

Respecter la polarité des condensateurs électrochimiques (borne repérée reliée au potentiel le plus bas). Décharger le condensateur avant de démonter le circuit.
