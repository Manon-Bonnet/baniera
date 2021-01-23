# baniera

Ce projet contient les éléments suivants :
1. sliders
2. srcset
3. menu burger 
4. icones svg et symbol

1. Il y a deux sliders, automatisés en javascript.
Ils bouclent à l'infini, le javascript reset l'un si l'autre est cliqué.
Il y a un listener pour le changement de taille d'écran pour gérer le responsive des sliders.
Ils ont une taille max de 1000px de largeur.

2. Des srcset sont utilisés sur certaines images lorsque leur poids était trop important.

3. Le menu burger est à deux niveaux.
Il est géré en javascript. Lorsque le menu est cliqué, il aparait et l'icone devient une croix.
Lorsqu'un élément du menu est cliqué, un sous menu s'ouvre et la crix se transforme en flèche retour.

4. Les icones sont toutes en svg. 
Un svg avec des balises symbol est déclaré tout en haut du body.
Les svg sont ensuite appelés avec des balises use.