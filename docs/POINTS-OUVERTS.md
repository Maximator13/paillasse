# Points laissés ouverts par les relectures

Chaque point a été signalé par un relecteur indépendant sans être corrigé : à arbitrer.

## Cours

### cinetique-chimique

- À retenir : « sans être consommé » est un raccourci de « consommé puis régénéré », formulation utilisée dans la définition. Les deux s'accordent sur le bilan global, je n'y ai pas touché.
- Exercice : t1/2 = 140 s est donné sans précision sur le nombre de chiffres significatifs. Donner k avec 3 chiffres (4,95e-3 s^-1) comme résultat intermédiaire est acceptable, mais un correcteur strict pourrait attendre 4,9e-3 ou 5,0e-3.

### analyse-physique

- Les champs ordre: 2 et tp: ["dosage-etalonnage"] n'ont pas été comparés à la liste imposée, faute d'avoir lu d'autres fichiers (consigne de sobriété). La page s'affiche quand même en « Chapitre 2 » avec la carte de TP Dosage par étalonnage.

### acides-bases

- Le fichier compte 1591 mots avec wc -w, mais ce total inclut le frontmatter et beaucoup de code LaTeX (tableaux array des schémas de Lewis). La prose seule reste nettement sous 1500 mots. Je n'ai rien coupé.
- Question 4 de l'exercice : un pH final de 9,2 avec de l'ammoniac « en excès » n'est cohérent qu'avec un excès modéré (pH ≈ pKa(NH4+/NH3) = 9,2). C'est plausible, et la question ne demande que le passage du pH à la concentration. Je l'ai laissée telle quelle.

### radioactivite

- La convention des axes du diagramme (N, Z) varie selon les manuels. La fiche fixe maintenant explicitement N en abscisse. Si le TP lié ou d'autres fiches du site utilisent l'orientation inverse, il faudra aligner les mentions au-dessus/sous la vallée.
- Le positon est noté 0/1 e. Certains manuels écrivent 0/+1 e : la notation est acceptable mais n'est pas harmonisée avec le reste du site, que je n'ai pas vérifié.
- Dans « Erreurs fréquentes », le point final de la 3e puce passe seul à la ligne derrière la formule $Z$. C'est un effet de retour à la ligne automatique, purement cosmétique, que je n'ai pas corrigé.

### mecanismes-reactionnels

- Le cas « rupture d'une liaison » dit que l'atome qui récupère le doublet « gagne une charge négative ». C'est acceptable au sens où sa charge diminue d'une unité (dans l'exemple de H3O+, l'oxygène passe de + à neutre), mais la formulation « sa charge diminue d'une unité » serait plus rigoureuse. Je l'ai laissée telle quelle.
- Je n'ai pas pu vérifier les valeurs imposées du frontmatter (ordre: 5, tp: []), car aucune liste de référence n'était à lire dans le périmètre.

### piles

- Longueur : wc -w donne 1489 mots en comptant le frontmatter et le code des formules, donc le texte réel est sous 1500 mais proche de la limite. Si une limite stricte sur wc -w est appliquée, il faudra élaguer légèrement.
- J'ai vérifié les points suivants, qui sont justes : les calculs de l'exercice (n(Zn) = 7,6e-2 mol, n(Cu2+) = 1,0e-2 mol, Q = 1,9e3 C, Δt = 3,9e4 s, soit environ 11 h), K ≈ 1e37, U0 ≈ 1,1 V, F = N_A × e, 1 A·h = 3 600 C, le tableau des oxydants et réducteurs usuels, et la description (139 caractères). Il n'y a ni tiret cadratin ou demi-cadratin, ni HTML hors details, et la loi de Nernst n'apparaît pas. La capture faite avec la correction ouverte ne montre ni formule en rouge ni tableau cassé. Je n'ai pas recapturé après avoir retiré l'attribut open de details, qui était le seul changement restant.

### electrolyse

- La formule F = N_A x e = 6,022e23 x 1,602e-19 ≈ 9,65e4 C/mol est longue et risque de déborder sur mobile. Selon la mise en forme KaTeX du site, elle défile peut-être horizontalement. Je ne l'ai pas modifiée car elle s'affiche bien sur ordinateur. La capture mobile ne permettait pas de trancher : l'image était très réduite et la page semblait apparaître deux fois.

### strategie-synthese

- Longueur : wc -w donne 1498 mots, frontmatter et code KaTeX compris. C'est conforme, mais tout ajout fera sortir la fiche de la limite de 1500 mots.
- Erreurs fréquentes : la formule « m = C V » oppose la masse volumique à la concentration en masse. La concentration en masse se note généralement C_m ou t au lycée. J'ai laissé la formule telle quelle parce qu'elle n'est pas fausse sur le fond, mais elle pourrait embrouiller l'élève.

### equilibre-chimique

- Le frontmatter indique tp: [] : je n'ai pas pu vérifier dans la liste imposée si un TP (par exemple constante-acidite) doit être rattaché à ce chapitre.
- Question 3 de l'exercice : l'état initial [H3O+] = 1,0×10^-5 mol/L pour un mélange équimolaire acide/base est un peu artificiel, puisqu'un tel mélange est en pratique déjà à l'équilibre (pH proche du pKa). La formulation est classique et le résultat juste, je l'ai laissée telle quelle.
- Pour le décompte des mots, wc -w donne 1550 sur le fichier brut, au-dessus de la limite de 1500. Sans frontmatter ni formules, on obtient environ 1270 mots, donc dans la fourchette, mais cela dépend de la convention de comptage retenue.

### molecules-organiques

- Le champ tp est vide (tp: []) : je n'ai pas la liste imposée des TP liés pour ce chapitre, donc je n'ai pas pu vérifier qu'aucun TP ne doit y figurer.
- L'ordre 11 et la durée « 25 min » n'ont pas pu être confrontés à la numérotation imposée, absente des fichiers lus.

### deuxieme-loi-newton

- Le frontmatter contient tp: []. Je n'ai pas pu vérifier la liste imposée des TP liés (par exemple chute-parabolique) sans explorer le projet.

### decrire-un-mouvement

- Je n'ai pas pu vérifier, sans explorer le projet, que tp: [] et ordre: 13 correspondent aux valeurs imposées. Aucun TP n'est lié, alors que les TP chute-parabolique ou mouvement-circulaire pourraient s'y rattacher. C'est à confirmer par le coordinateur.
- Vérifications faites sans rien trouver à corriger. Exercice recalculé : v = 3,0t + 2,0 et a = 3,0 m/s², v(2,0) = 8,0 m/s, a = 83,33²/5000 = 1,39, soit 1,4 m/s² avec 2 chiffres significatifs. Toutes les notions du programme sont traitées. La fiche fait 1159 mots selon wc, la description 149 caractères. Aucun tiret cadratin ou demi-cadratin, aucun HTML en dehors de details. Le rendu KaTeX est correct (tableaux, blocs dans les citations, correction ouverte).

### mecanique-des-fluides

- Le compte brut wc -w donne 1565 mots, mais il inclut le frontmatter et le code des formules. Sans eux, la prose fait environ 1240 mots, donc dans la fourchette de 900 à 1500. Le texte n'a pas été réduit.
- La formule de Torricelli et la remarque sur la compressibilité des gaz (vitesse faible devant celle du son) ne figurent pas explicitement au programme. Elles sont exactes et présentées comme des cas particuliers, pas comme des notions exigibles. Je les ai laissées.
- Je n'ai pas vérifié l'ordre 17 ni les slugs de TP (poussee-archimede, effet-venturi), qui sont imposés. Les deux cartes TP s'affichent bien sur la page.

### gaz-parfait-energie-interne

- Le compte de 1466 mots (wc -w, frontmatter et code KaTeX inclus) est proche de la limite haute de 1500, mais il la respecte.
- Les relations isochore et isobare (p/T et V/T constants) sont données comme conséquences de l'équation d'état. Elles ne sont pas exigibles à part entière, mais elles se déduisent directement de pV = nRT. Je les ai laissées telles quelles.

### transferts-thermiques

- Le compte wc -w (1449) est proche du plafond de 1500, mais le texte réel, hors frontmatter et code KaTeX, reste nettement en dessous.
- Erreur passagère du serveur Astro (UnknownFilesystemError lors de l'écriture du data store) observée une fois : elle vient probablement d'écritures concurrentes d'autres contributeurs et relève du socle, pas de cette fiche.

### mouvement-champ-uniforme

- Le défaut d'affichage de \vec vient du socle et touche aussi les autres fiches qui l'utilisent : decrire-un-mouvement (22 occurrences), deuxieme-loi-newton (12), mouvement-champ-gravitation (11) et mecanique-des-fluides (2). Il faut le corriger dans le CSS global, hors de mon périmètre. Piste probable, non vérifiée : une règle du type svg { max-width: 100% } appliquée à .katex .accent-body, qui a une largeur nulle.
- L'énergie potentielle électrique E_pe = qV est donnée dans le tableau. Elle figure dans plusieurs manuels, mais le BO n'exige explicitement que W = qU_AB et le théorème de l'énergie cinétique. Je l'ai gardée telle quelle, sans la présenter comme un complément.
- Le compte de mots est de 1539 pour le corps, code des formules compris. La prose seule est nettement sous 1500 mots, donc la fiche est jugée conforme, mais je n'ai pas fait de comptage exact sans les formules.
- Rendu mobile non vérifié : le système de trois équations horaires de la section 2 est large et pourrait déborder sur un écran étroit.

### mouvement-champ-gravitation

- Défaut de rendu bloquant dans le socle, que je n'ai pas corrigé car c'est hors de mon périmètre : aucune flèche de vecteur ne s'affiche. KaTeX dessine la flèche de \vec en SVG. La règle globale en ligne `img, svg { max-width: 100%; display: block; }` (feuille de reset du socle, src/styles ou le layout) écrase ce SVG à une largeur de 0 px, parce que le parent .accent-body de KaTeX a une largeur nulle. Conséquence : « F = -G Mm/r² u » et « a = G M/r² u_n » se lisent comme des formules scalaires. Le même défaut touche aussi deuxieme-loi-newton, mouvement-champ-uniforme, decrire-un-mouvement et mecanique-des-fluides (70 occurrences de \vec en tout). Correction recommandée dans le socle, une seule ligne : `.katex svg { max-width: none; display: inline; }`, ou exclure .katex du reset. Je n'ai pas contourné le problème dans la fiche (par exemple avec \overset{\rightarrow}{F}, qui n'utilise pas de SVG) : la fiche deviendrait incohérente avec les autres et serait à reprendre une fois le socle corrigé. C'est à arbitrer.
- « Erreurs fréquentes » présente T = 24 h pour le géostationnaire comme une erreur. C'est rigoureux, mais beaucoup de sujets de bac donnent 24 h et l'écart d'altitude reste faible (environ 35 900 km au lieu de 35 800 km). J'ai gardé la formulation telle quelle ; on pourrait la nuancer.

### ondes-sonores

- Champs ordre: 20 et tp: ["effet-doppler"] : non vérifiés par rapport à la liste imposée, faute de l'avoir sous la main (lecture limitée au contrat et à la fiche). La carte du TP effet-doppler s'affiche correctement sur la page.
- Le décalage vers le rouge cosmologique est présenté comme un effet Doppler qui « a mis en évidence l'expansion de l'Univers ». C'est l'usage habituel au lycée, mais en toute rigueur il est dû à l'expansion de l'espace et non à un effet Doppler. Je n'ai rien changé : la formulation reste acceptable au niveau Terminale.

### effet-photoelectrique

- Le thème « ondes » et l'ordre 23 du frontmatter n'ont pas pu être comparés à la liste imposée, que le contrat ne donne pas. Je n'y ai pas touché.
- Exercice type : la correction, refaite avec node, est juste (E = 4,97 × 10^-19 J = 3,11 eV, λ0 = 545 nm, Ec,max = 1,32 × 10^-19 J = 0,83 eV). Pour v_max, le calcul avec les valeurs arrondies écrites dans la correction donne 5,38 × 10^5 m·s^-1, celui avec les valeurs non arrondies donne 5,39 × 10^5. J'ai gardé 5,38, cohérent avec ce qui est affiché.

### lunette-astronomique

- Dans l'exercice, α' = 0,32 rad (environ 18°) se trouve à la limite de l'approximation des petits angles : le calcul exact par arctan(8,1/25) donne 0,31 rad. Je n'ai rien changé, car le résultat suit la méthode du programme, mais un oculaire de plus grande focale ou un objet plus petit éviterait l'ambiguïté.
- Point cosmétique dans « À retenir » : sur ordinateur, le point final après $A_1B_1 \approx f'_1\,\alpha$ passe seul à la ligne. Ce n'est pas bloquant et je ne l'ai pas modifié.

### circuit-rc

- Le champ ordre: 24 et le TP lié circuit-rc n'ont pas été vérifiés : ils sont imposés hors de la fiche et il était demandé de ne pas lire d'autre fichier.
- R = 10 kΩ dans l'énoncé de l'exercice reste ambigu sur le nombre de chiffres significatifs (1 ou 2). La correction suppose 2 chiffres, ce qui reste cohérent avec C = 47 µF et E = 5,0 V. On pourrait écrire 10,0 kΩ pour lever l'ambiguïté. Je ne l'ai pas modifié.

## TP animés

### effet-doppler

- Aux réglages maximaux (d = 30 m), l'étiquette « fB = 902 Hz » du graphique chevauche la fin de la courbe, car le palier n'est pas atteint. Le placement des étiquettes de lignes horizontales relève de src/lib/graphique.ts, hors périmètre : non corrigé.
- À fE = 400 Hz et v = 10 m/s, la courbe n'occupe qu'environ 15 % de la hauteur du graphique. L'échelle dépend volontairement de fE seul, pour que l'effet du curseur de vitesse reste visible : laissé en l'état.
- Le schéma exagère le rapport v/c (son ralenti 3 fois) alors que les cotes affichent les longueurs d'onde réelles. C'est signalé dans la scène et dans la fiche, mais cela reste un compromis pédagogique.
- La page mobile entière n'a été capturée qu'avant les corrections (rendu correct, pas de débordement). Les planches aux curseurs extrêmes n'ont pas été refaites en entier après correction : seules les étapes 3 et 5 l'ont été, en vue zoomée, avec d = 8 m côté minimum.

### satellite-kepler

- Avec l'excentricité réglée à 0 (minimum du curseur), l'étape 3 « Loi des aires sur une ellipse » montre un cercle et deux secteurs identiques : cas limite juste physiquement, mais le texte « L'orbite devient elliptique » ne correspond plus. Laissé tel quel ; option simple : passer le minimum à 0,1.
- À l'altitude maximale (36 000 km), l'orbite de l'élève (r = 42 371 km) est à 1 px de celle de Météosat (42 164 km) : les deux tracés et les deux points du graphique se superposent presque. Cohérent physiquement, non corrigé.
- Au passage étape 3 vers étape 4, le satellite change de position sur son orbite (position ensuite pilotée par l'horloge d'ambiance) ; le saut est masqué par un fondu d'environ 1 s, pas par un mouvement continu.
- Avec le curseur de masse différent de 1, les périodes affichées pour ISS, GPS, Galileo et Météosat ne sont plus leurs périodes réelles (expérience de pensée assumée, non signalée dans le texte de l'étape).

### interferences-young

- Après mes deux retouches de la fiche, je n'ai pas recapturé la page : ce sont des changements de texte seuls, la scène n'a pas été modifiée.
- Deux captures ont échoué une première fois pour une raison extérieure au TP (image noire, puis délai de 30 s dépassé sur la planche au maximum) ; la reprise a réussi.
- Détail cosmétique laissé en l'état : à l'interfrange le plus serré (b = 0,30 mm, 450 nm, 1,2 m), le trait pointillé jaune de la mesure traverse l'étiquette « i = 1,80 mm » du graphique. Elle reste lisible, et le positionnement des étiquettes relève de src/lib/graphique.ts, hors périmètre.

### synthese-ester

- Mobile : l'équation de réaction en bloc dépasse la largeur de l'écran (fin tronquée après CH3COOC...). Cela relève des styles KaTeX du socle, hors périmètre. La capture mobile a été faite avant les corrections et n'a pas été refaite, donc ce point reste à vérifier.
- Curseurs au minimum (60 °C, 0 goutte) : l'avancement à 60 min vaut 0,001 mol, la courbe est plate sur l'axe et le rendement affiché est 0 %. C'est cohérent avec le modèle mais peu spectaculaire. Le texte fixe de l'étape 4 (« Qr = K ») n'est alors plus vrai à l'écran : la mesure affiche Qr = 0,00.
- À 60 °C, la scène montre encore quelques vapeurs et gouttes de condensat (intensité 25 %, sans bulles) alors que la fiche dit que le mélange ne bout plus. Défendable (évaporation sans ébullition), laissé tel quel.
- La loi de vitesse (ordre 2 réversible, Arrhenius avec Ea = 50 kJ/mol, catalyse proportionnelle au nombre de gouttes) est un modèle plausible mais non étalonné sur des mesures. Elle n'est pas présentée comme exigible.

### circuit-rc

- Aux étapes 4 et 5, le circuit lui-même est figé (condensateur déchargé) : seuls le graphique (tangente, repères) et l'encart s'animent. Acceptable, mais l'étape 5 est visuellement pauvre (une seule ligne de l'encart apparaît). Non retouché pour ne pas refaire la scène.
- À τ = 4,00 s exactement, l'étiquette « τ = 4,00 s » finit au ras de la verticale de bascule (t = 5 s) sans la chevaucher ; l'ancrage du texte est imposé par src/lib/graphique.ts, hors périmètre.
- Sur mobile, les textes de la scène (taille 13 à 14 dans un viewBox de 640) deviennent très petits : limite du socle (mise à l'échelle du lecteur), commune à tous les TP.
- Consigne de sécurité sur la polarité des condensateurs électrochimiques (« borne repérée reliée au potentiel le plus bas ») : exacte pour les modèles dont la borne négative est marquée, cas le plus courant, mais certains composants repèrent la borne positive. Laissé tel quel.

### pile-daniell

- Résistance interne fixée à 10 Ω : c'est optimiste pour une vraie pile Daniell à pont salin de lycée (plutôt une centaine d'ohms ou plus), donc les intensités (10 à 55 mA) et les masses (environ 200 mg en 6 h) sont au-dessus de ce qu'on mesure en vrai TP. Le modèle reste cohérent et pédagogiquement lisible ; je n'ai pas changé la valeur, car cela imposerait de refaire tous les chiffres, les bornes des curseurs et l'échelle du graphique.
- La fiche fait 762 mots au comptage brut (frontmatter et formules compris), pour une cible de 350 à 600 mots dans le contrat. Le corps rédigé semble proche de la limite haute ; non raccourci.
- Après la séparation des demi-équations, la capture mobile a été refaite sans erreur console, mais je ne l'ai pas rouverte : la disparition du débordement n'est pas vérifiée visuellement.
- Quand la pile est usée, l'étiquette sous le bécher de droite indique toujours « Cu²⁺ + SO₄²⁻ » (nom de la solution initiale). Laissé tel quel.
- Par souci de budget, src/lib/*.ts n'ont pas été relus ; l'usage de l'API a été validé par le rendu, pas par lecture du socle.

### decroissance-radioactive

- Après les corrections, seules la planche par défaut, la planche minimum (64 noyaux, 30 s) et l'étape 5 ont été recapturées. La planche maximum et la page mobile datent d'avant, mais les deux retouches de scene.ts ne touchent pas leur mise en page.
- Avec 64 noyaux, la courbe n'occupe qu'environ 30 % de la hauteur du graphique (axe fixe à 220). Laissé tel quel : l'échelle fixe rend l'effet du curseur N0 visible, et la question 2 de la fiche compare 64 et 208.
- Le tirage n°1 par défaut donne une demi-vie lue de 65 s pour 56 s attendues (environ 1,4 écart-type avec 160 noyaux). C'est plausible et la fiche annonce un écart de plusieurs secondes, mais un tirage par défaut plus proche serait plus flatteur pour la vitrine.
- Simplifications non signalées à l'élève : dans une vraie fiole à thoron, le polonium 216 (demi-vie 0,15 s) émet presque aussitôt une seconde particule α, et un vrai compteur mesure une activité, pas le nombre de noyaux restants. La fiche précise seulement que le détecteur ne reçoit qu'une fraction des particules.
- Les graduations des axes du graphique sont en taille 12 : cela vient de src/lib/graphique.ts, hors périmètre.

### chute-parabolique

- La fiche compte environ 600 mots hors frontmatter (comptage brut wc de 695, formules et frontmatter compris), soit la limite haute du contrat (350 à 600). Je n'ai pas coupé.
- Le protocole de la fiche annonce Δt = 40 ms : c'est exact au réglage par défaut, mais l'animation passe à 80 ms pour les vols longs (par exemple 6 m/s et 70°). La scène affiche la valeur réelle, la fiche ne le précise pas.
- La graduation « 1 » de l'axe (Oy) n'est pas chiffrée : le tube du lanceur la recouvrirait pour h entre 0,8 et 1,2 m. L'étalon « 1 m » voisin sert de repère.
- Après les corrections, la planche complète n'a été recapturée qu'aux réglages par défaut ; aux extrêmes, seule l'étape 5 a été revue en zoom (les planches minimum et maximum avaient été regardées avant correction).
- Le signe moins est écrit avec le trait d'union simple (« -g ») dans les textes de la scène, pas avec le signe typographique U+2212. Laissé tel quel, par cohérence avec l'existant.

### lunette-astronomique

- Pour G < 2,4 (f'1 = 20 cm avec f'2 >= 8,5 cm, f'1 = 25 cm avec f'2 >= 10,5 cm), la droite en pointillés n'a plus d'étiquette « œil nu » sur le graphique : le socle (graphique.repere) place toujours l'étiquette au-dessus du point, impossible de la mettre dessous sans modifier src/lib/graphique.ts, hors périmètre. La fiche précise que les pointillés correspondent à l'œil nu.
- Le graphique reste vide pendant les étapes 1 et 2 et jusqu'à la fin de l'étape 3 (premier point à t = 0,8 de l'étape 3). Cohérent avec le protocole (les angles ne sont mesurés qu'à partir de l'étape 3), laissé tel quel.
- La mesure « Image A1B1 » disparaît du bandeau à partir de la fin de l'étape 3 (remplacée par theta') : pour la question 2, l'élève doit revenir aux étapes 1 à 3 pour lire A1B1. Non modifié (limite de 4 mesures).
- Aux réglages f'2 = 5 cm, l'œil, l'étiquette theta', le rayon fictif et les repères O2, F2, F'1 sont serrés autour de l'oculaire : lisible, sans chevauchement de texte, mais dense.
- Fiche à 597 mots (plafond du contrat : 600), comptage balises et formules comprises.

### suivi-cinetique

- Sur mobile, l'équation de réaction (formule en bloc) dépasse encore la largeur de l'écran et sa fin est coupée. Cela relève du style des blocs KaTeX du socle (pas de défilement horizontal), hors périmètre ; la fiche de référence est probablement touchée de la même façon.
- Les constantes cinétiques (k0 = 5,0 × 10⁻³ s⁻¹, kc = 0,10 L/(mol.s), Ea = 50 et 40 kJ/mol) sont des ordres de grandeur plausibles pour ce TP, pas des valeurs tirées d'une publication ; la loi k = k0 + kc.[H3O+] est une modélisation simplifiée de l'effet de l'acide. Rien de cela n'est présenté comme exigible.
- La planche complète par défaut a été recapturée après corrections mais pas rouverte : les retouches graphiques ne s'activent qu'aux réglages extrêmes, vérifiés par zoom (étape 4 au maximum avec c0 minimal, étape 6 au minimum, étape 5 sur mobile).
- Fiche à 558 mots hors frontmatter (limite du contrat : 600), après ajout de la phrase sur la dilution.

### titrage-conductimetrique

- Aux réglages c0 = 0,100 mol/L et eau = 50 mL, l'encart affiche C0 = 0,095 mol/L (VE modélisé 9,5 mL au lieu de 10,0). C'est l'effet de dilution voulu par la question 3 de la fiche, mais l'encart ne signale pas le biais. Une correction de dilution sigma x (V0 + Veau + V) / (V0 + Veau) serait plus rigoureuse : non ajoutée, choix pédagogique à trancher.
- Avec 50 mL d'eau, 60 mL de solution dans un bécher de 400 mL n'immergeraient pas une vraie cellule : la borne basse du curseur est peu réaliste, mais la question 3 de la fiche en dépend. Laissée telle quelle.
- Capture mobile : la dernière colonne (NO3-) du tableau des conductivités molaires semble coupée à 375 px de large, sans que j'aie vérifié si le tableau défile horizontalement. Cela relève des styles partagés, hors périmètre.
- La capture mobile et les planches aux curseurs extrêmes datent d'avant les corrections : après correction, seules la planche par défaut et le zoom étape 3 à eau = 50 mL ont été recapturés et regardés. La page bureau a été recapturée sans erreur console, mais l'image n'a pas été ouverte.
- Réponse à la question 2 de la fiche : 'les pentes changent peu'. La pente avant l'équivalence varie d'environ 50 % en valeur relative entre 0,100 et 0,200 mol/L (elle reste très faible en valeur absolue), celle d'après varie de moins de 4 %. Formulation acceptable visuellement, laissée telle quelle.

### constante-acidite

- Sur mobile, l'équation de réaction en bloc de la fiche (AH(aq) + H2O(l) ⇌ A-(aq) + H3O+(aq)) dépasse la largeur de l'écran et paraît tronquée à droite. Cela relève du style global des blocs KaTeX (hors périmètre), à traiter côté feuille de style (overflow-x: auto sur .katex-display).
- Le « -0,0 » vient de src/lib/graphique.ts (fmt(v + 0) ne neutralise pas un -2e-16) : d'autres TP avec un axe symétrique et un pas non exact en binaire peuvent avoir le même défaut.
- Pendant les étapes 1 et 2, le bandeau de mesures affiche « ... » pour le rapport et le pH (le pH-mètre n'est pas encore en service). Cohérent physiquement, mais aucune mesure en direct sur les 15 premières secondes ; non modifié.
- La fiche liste « deux burettes graduées de 25 mL » alors que l'animation montre une pipette pour préparer les mélanges. Écart mineur de matériel, laissé en l'état.
- Le pKa par défaut est 4,8 (valeur usuelle au lycée pour l'acide éthanoïque, 4,76 dans les tables) : les tests du modèle utilisent 4,76, la fiche et l'animation 4,80. Cohérent en interne, simple choix d'arrondi.

### poussee-archimede

- Le schéma « Forces pressantes » est volontairement schématique : la face supérieure y apparaît nettement sous la surface, alors que dans la scène le cylindre n'est immergé que d'environ 3 mm sous le niveau en fin de descente. La résultante affichée n'en dépend pas. Laissé tel quel.
- Au réglage maximal du solide (5 g/cm³), le vecteur F (78 px) remonte le long du fil jusque sur la tige du dynamomètre : lisible, mais superposé au fil. Non corrigé, car réduire l'échelle des vecteurs rendrait la poussée (0,2 à 0,5 N) trop petite.
- Raideur du dynamomètre de 75 N/m, soit 2,7 cm d'allongement pour 2 N : un peu raide pour un dynamomètre de lycée, mais cohérent avec l'échelle du dessin. Non modifié.
- À masses volumiques égales (solide et liquide), le modèle traite le solide comme coulant avec F = 0 (équilibre indifférent) et l'encart titre « Poussée d'Archimède » : cas limite acceptable, non traité à part.
- Le nombre de mots de la fiche (350 à 600 exigés par le contrat) n'a pas été compté.

### effet-photoelectrique

- Les curseurs Fréquence et Intensité n'agissent qu'à partir de l'étape 4 (les étapes 2 et 3 imposent le rouge puis le balayage). C'est cohérent avec le scénario, je n'y ai pas touché, mais un élève qui bouge ces curseurs pendant les étapes 1 à 3 ne voit rien changer.
- Si l'élève règle une fréquence sous le seuil, le texte fixe de l'étape 4 (« plus d'électrons ») ne correspond plus à la scène, qui affiche correctement « Aucun électron ». Conséquence du réglage choisi, non corrigée.
- L'axe des ordonnées va de -5 à 3 eV pour laisser voir -W jusqu'au zinc : la courbe occupe donc le tiers supérieur du graphique pendant les étapes 2 à 4. Choix assumé, laissé tel quel.
- Le potentiel d'arrêt (protocole, étape 3, et liste du matériel) n'est pas au programme de Terminale. Il est présenté comme simple méthode de mesure et non comme exigible, je l'ai laissé.
- Travail d'extraction du sodium fixé à 2,4 eV : les tables donnent de 2,3 à 2,75 eV selon les sources. Valeur acceptable, non modifiée.

### electrolyse

- Aux réglages maximaux (0,80 A, 480 s), l'étiquette du repère « H2 : 47,8 mL » arrive juste sous le titre du graphique « Volume de gaz recueilli » : lisible, sans chevauchement, mais serré. Le corriger proprement demanderait de toucher à l'échelle (y max 60) ou au socle graphique, laissé en l'état.
- Réalisme : 0,30 à 0,80 A et jusqu'à 48 mL de H2 dans un tube gradué de 50 mL sont dans le haut de la fourchette d'un électrolyseur de lycée (plutôt 0,1 à 0,5 A et des tubes de 20 à 25 mL en pratique). Cohérent en interne, non modifié pour ne pas changer toutes les valeurs.
- La fonction lecture() de model.ts (arrondi à 0,2 mL) est testée mais n'est pas utilisée par la scène, qui affiche le volume théorique au dixième. Sans conséquence, laissée telle quelle.
- La première tentative de capture ciblée de l'étape 5 a échoué (contexte d'exécution détruit par une navigation, cause extérieure au TP), la seconde est passée sans erreur.

### dosage-etalonnage

- Échelle adaptative : au franchissement d'un palier, la pente apparente de la droite remonte alors que k baisse. Le choix privilégie la lisibilité, la réponse 2 de la fiche renvoie à la valeur de k et aux graduations. Si l'effet visuel « la droite s'aplatit » est jugé prioritaire, revenir à une échelle fixe en resserrant les plages des curseurs.
- Étape 1 : la pipette verse solution mère puis eau directement dans les tubes à essai, alors que la fiche prépare les solutions en fioles jaugées de 50,0 mL avant transfert. Raccourci visuel laissé tel quel (refaire la scène sortait du cadre des retouches ciblées).
- Modèle : la bande d'absorption du bleu patenté est assimilée à une gaussienne (écart type 25 nm) et epsilon max = 1,06e5 L/mol/cm à 640 nm est une valeur usuelle non revérifiée en ligne (pas de recherche web autorisée). Suffisant pour le niveau Terminale.
- Titre de l'afficheur « ABSORBANCE » et graduations du graphique en taille 12 : ils viennent du socle (labkit, graphique), hors périmètre, non modifiés.

### effet-venturi

- Socle, hors périmètre : toute formule \sqrt haute en bloc s'affiche probablement cassée sur l'ensemble du site (cause non recherchée, sans doute une règle CSS globale sur les svg). Contourné ici en supprimant la racine, mais les autres fiches qui utilisent \sqrt sont à contrôler.
- Au réglage débit 4 L/min et col 16 mm, l'effet est presque invisible (Δh = 0,3 cm, P1 − P2 = 0,03 kPa). C'est physiquement juste, et la borne de 16 mm sert à la question 3, donc bornes laissées en l'état. Relever le débit minimal à 5 L/min donnerait 0,5 cm dans ce coin, gain faible.
- Captures mobiles vérifiées à petite échelle uniquement (page entière de 780 x 10450 px) : aucun défaut visible, mais le détail des textes de la scène n'a été contrôlé qu'en rendu bureau.

### diffraction

- Rendu mobile de la formule scindée (Exploitation) non contrôlé visuellement : les deux blocs sont courts et devraient tenir, mais la capture finale n'a pas été regardée.
- Graduations du graphique en taille 12 et étiquettes de repère en 12,5 : elles viennent de src/lib/graphique.ts, hors périmètre, donc sous le seuil de 13 sans correction possible ici.
- Vue de dessus : l'échelle transversale est très dilatée (1,6 px/mm contre 162 px/m le long du banc), donc l'angle θ dessiné est exagéré. Choix pédagogique assumé mais signalé nulle part à l'élève.
- Fente « ouverte » modélisée à 1 000 µm : un vrai faisceau y diffracterait encore légèrement (L ≈ 2,6 mm), l'animation montre un simple point. Simplification acceptable.

### refroidissement-newton

- Réalisme expérimental : à 80 °C, l'évaporation domine les pertes d'un bécher ouvert et un vrai relevé s'écarte de l'exponentielle pure avec un h effectif supérieur à 20 W/(m²·K). La fiche signale désormais que l'évaporation est négligée, mais le modèle reste idéalisé (choix assumé, non modifié).
- Fiche à environ 610 mots (formules comprises) pour une cible de 350 à 600 : laissée telle quelle, rien de superflu à couper.
- Les 37 relevés du graphique sont recréés à chaque image via graphique.nuage (un petit groupe par point) : reconstruction légère, sans impact visible, non refactorée.
- Aux réglages minimum en fin d'étape 3, l'étiquette « écart » est volontairement semi-transparente (écart de 8,5 °C, cote courte) : lisible mais pâle.
- Une capture groupée a dépassé 120 s (serveur partagé chargé) puis a abouti : sans lien avec ce TP.

### titrage-ph-metrique

- La dérivée est tracée en unité arbitraire sur l'axe du pH (maximum ramené à 12), sans axe secondaire : usage courant des logiciels de lycée, mais ni la scène ni la fiche ne le précisent.
- Pour un pKa élevé (6,5), la dérivée présente un pic secondaire réel à V = 0, environ la moitié du pic d'équivalence. C'est physiquement exact et le maximum reste à VE, mais cela peut surprendre un élève.
- Pour un pKa de 3 et une concentration de 0,04 mol/L, le pH à la demi-équivalence vaut 3,05 et non 3,00 (acide trop dissocié). La fiche n'affirme pH = pKa que pour le réglage par défaut : laissé tel quel.
- Les graduations de la burette (labkit) et les étiquettes du graphique (12 à 12,5 px, src/lib/graphique.ts) sont sous le seuil de 13, mais relèvent du socle, hors périmètre.
- Sur mobile, l'équation de réaction et la relation d'équivalence dépassent la largeur de l'écran : elles défilent horizontalement (règle overflow-x du style global), comportement du socle non modifié.
- Les planches min et max et la capture mobile n'ont pas été refaites après les retouches : seuls la planche par défaut et trois zooms (dont VE = 8 mL et VE = 22 mL) ont été recapturés, et la dernière planche par défaut n'a pas été rouverte après le décalage final de la légende (contrôlé sur un zoom à ca = 0,04 mol/L et pKa = 6,5).
