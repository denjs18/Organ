export const MASS_PHASES = {
  'rite-entree': { name: 'Rite d\'entrée', color: '#d4a017' },
  'liturgie-parole': { name: 'Liturgie de la Parole', color: '#6a9fd8' },
  'liturgie-eucharistique': { name: 'Liturgie eucharistique', color: '#d4524a' },
  'rite-communion': { name: 'Rite de communion', color: '#4aab7a' },
  'rite-envoi': { name: 'Rite d\'envoi', color: '#8a6dc8' },
}

export const MASS_PARTS = [
  {
    id: 'prelude',
    name: 'Prélude',
    order: 0,
    phase: 'rite-entree',
    duration: '5-10 min',
    optional: false,
    liturgicalRole: 'Créer le recueillement, préparer les cœurs à la rencontre avec Dieu',
    organistRole: 'Improviser ou jouer une pièce instrumentale avant l\'entrée du célébrant',
    style: 'Méditatif à joyeux selon la période liturgique',
    technique: {
      title: 'L\'art du prélude : installer l\'ambiance avant le silence',
      content: `Un prélude efficace accomplit trois choses simultanément : il installe l'ambiance sonore de la période liturgique, il invite les fidèles à la prière (même ceux qui bavardent encore), et il "accordise" l'oreille de l'assemblée sur la tonalité et le style de la messe à venir.

La grande erreur du débutant est de jouer trop fort trop vite, ce qui masque le brouhaha au lieu de le remplacer par le silence. La technique correcte est inverse : commencer pp—mp sur un seul clavier (Récit), laisser la musique s'installer, et seulement graduellement enrichir le registre au fil des minutes. L'assemblée qui entend une flûte douce dans le vide finit par se taire ; celle qui entend un Grand Orgue fortissimo continue de parler par-dessus.

Pour l'improvisation de prélude, la forme la plus efficace est A—B—A' : un thème initial (souvent emprunté au cantique d'entrée), un épisode modulant (ii—V dans le relatif mineur ou la dominante), et un retour au thème principal légèrement ornementé. Cette forme prépare l'oreille sans la surprendre.

Durée idéale : 5 à 7 minutes. Trop court (moins de 3 min) : l'ambiance n'a pas le temps de s'installer. Trop long (plus de 10 min) : l'assemblée se lasse ou s'impatiente.`,
    },
    registration: 'Récit seul (Flûte 8\' + Gambe 8\'), crescendo progressif vers Grand Orgue (Montre 8\' + Bourdon 16\' + Flûte 4\') sur les 2 dernières minutes',
    tips: [
      'Commencer pp sur un seul jeu de flûte : le contraste avec le silence est plus efficace que le forte immédiat',
      'Utiliser le thème du cantique d\'entrée dans le prélude : l\'assemblée reconnaîtra et entrera plus facilement dans le chant',
      'Surveiller l\'entrée du célébrant : terminer le prélude 30 secondes avant la procession pour un silence de transition',
      'Ne pas improviser sur des cantiques de Noël en Carême ou sur des airs funèbres en temps pascal : cohérence liturgique absolue',
    ],
    mistakes: [
      'Commencer fortissimo : assomme au lieu d\'inviter, l\'assemblée parle encore par-dessus',
      'Jouer sans crescendo : une dynamique plate sur 8 minutes endort et n\'installe pas de trajectoire musicale',
      'S\'arrêter brutalement à l\'arrivée du prêtre : prévoir une transition douce (diminuendo sur 4 mesures)',
    ],
    periods: {
      avent: 'Sobre et méditatif : Flûte 8\' seule, teintes mineures, tempo lent. Pas de joyeux cantiques de Noël avant la nuit de Noël.',
      noel: 'Festif et lumineux : Grand Orgue dès le début possible, cantiques de Noël ornementés, Trompette bienvenue.',
      careme: 'Grave et recueilli : Bourdon 8\' seul ou Gambe + Flûte, pas de jeux brillants, harmonies sobres en mineur.',
      paques: 'Triomphal : Tutti possible dès l\'entrée, Alléluias, Ré majeur ou Do majeur avec Trompettes.',
      ordinaire: 'Adapté à la fête du dimanche : sobre en semaine ordinaire, plus festif pour les fêtes de saints.',
    },
  },
  {
    id: 'chant-entree',
    name: 'Chant d\'entrée',
    order: 1,
    phase: 'rite-entree',
    duration: '2-4 min',
    optional: false,
    liturgicalRole: 'Ouvrir la célébration, rassembler l\'assemblée, accompagner la procession du célébrant',
    organistRole: 'Jouer l\'introduction, soutenir l\'assemblée sur tous les couplets/refrains',
    style: 'Communautaire, soutenu, accessible à toutes les voix',
    technique: {
      title: 'Accompagner la procession : soutien sans écrasement',
      content: `Le chant d'entrée est le premier contact sonore de l'assemblée avec la liturgie. Il doit rassembler des voix hétérogènes (enfants, personnes âgées, familles, habitués et nouveaux venus) en une prière commune. L'organiste a un rôle de chef de chœur invisible : il doit soutenir sans dominer.

La règle d'or : jouer à la dynamique où l'on ENTEND les voix de l'assemblée par-dessus l'orgue. Si l'orgue couvre le chant, il tue la participation. Un accompagnement à forte peut être justifié pour une grande assemblée bien connue dans un grand espace ; pour une petite chapelle avec peu de participants, mp suffit.

Introduction : toujours jouer au moins 4 mesures (idéalement 8) avant le début du chant, dans le même tempo que l'assemblée chantera. Trop court (2 mesures), l'assemblée rate l'entrée. L'introduction doit contenir la mélodie de façon reconnaissable.

Accompagnement rythmique : en 4/4, ne pas alourdir avec des accords sur chaque temps. Préférer des accords sur 1 et 3, avec une basse qui souligne le rythme. En 3/4, jouer 1 accord sur le 1er temps et une basse légère sur le 3e.

Entre les couplets : un court interlude de 2 mesures permet à l'assemblée de respirer et marque la structure du cantique.`,
    },
    registration: 'Adapté au cantique choisi. Minimum Grand Orgue Montre 8\' + Bourdon 16\'. Si procession solennelle : + Prestant 4\' + Mixture',
    tips: [
      'Introduction de 4-8 mesures avec la mélodie clairement identifiable : l\'assemblée doit reconnaître le cantique avant de chanter',
      'Jouer légèrement moins fort que vous ne le pensez nécessaire : les voix humaines portent si elles sont soutenues, pas écrasées',
      'Si la procession est longue : répéter un couplet ou ajouter des interludes instrumentaux entre les strophes',
      'Regarder la procession : adapter le tempo si le célébrant marche lentement ou rapidement',
    ],
    mistakes: [
      'Jouer fortissimo : les voix disparaissent sous l\'orgue, les gens arrêtent de chanter',
      'Introduction trop courte (1-2 mesures) : l\'assemblée n\'a pas le temps de se préparer et rate l\'entrée',
      'Changer de tempo entre les couplets : instabilité qui déroute le chant communautaire',
    ],
    periods: {
      avent: 'Sobre, mp à mf. Cantiques d\'attente (Veni Emmanuel, Il est venu). Éviter tout côté triomphal.',
      noel: 'Festif, mf à ff. Cantiques de Noël connus (Adeste Fideles, Il est né). Grand Orgue plein bienvenu.',
      careme: 'Grave, mp. Cantiques pénitentiels. Pas de Trompette, pas de Mixture brillante.',
      paques: 'Triomphal, ff. Cantiques de Résurrection. Tutti autorisé pour la Vigile et le dimanche de Pâques.',
      ordinaire: 'Adapté : mp pour dimanche ordinaire, mf pour fête. Toujours soutenant et stable.',
    },
  },
  {
    id: 'kyrie',
    name: 'Kyrie',
    order: 2,
    phase: 'rite-entree',
    duration: '1-3 min',
    optional: false,
    liturgicalRole: 'Acte de contrition et supplication de la miséricorde divine, au seuil de la liturgie',
    organistRole: 'Accompagner la litanie ou le chant du Kyrie avec humilité et profondeur',
    style: 'Suppliant, grave, profond — jamais triomphal',
    technique: {
      title: 'Le Kyrie : l\'art de la supplication harmonique',
      content: `Le Kyrie est la seule partie de la messe ordinaire en grec (Kyrie eleison = Seigneur, aie pitié). Son caractère suppliant est inscrit dans les mots eux-mêmes, et l'harmonie doit le refléter.

La grande tentation de l'organiste débutant est de jouer le Kyrie en majeur joyeux, comme si c'était une affirmation. C'est une erreur liturgique et musicale. Le Kyrie est un aveu d'impuissance et une prière de confiance : l'harmonie doit être soit mineure (tradition classique), soit modale (tradition grégorienne), jamais triomphante.

Techniques d'accompagnement efficaces :
- Mode mineur : La mineur ou Ré mineur, progression i—iv—v—i lente, legato absolu
- Pédales de basse longues : tenir la basse pendant que les harmonies internes évoluent (pédale d'orgue au sens musical, pas seulement instrumental)
- Appogiatures descendantes sur les temps forts : elles "soupirent" musicalement
- Dynamique pp à mp maximum : le Kyrie n'est jamais forte en liturgie

Pour les Kyrie chantés en alternance (Kyrie eleison — Christe eleison — Kyrie eleison), jouer 3 sections distinctes avec une légère variation de registre ou d'harmonie à chaque section, pour marquer la structure tripartite.

En Carême particulièrement : le Kyrie prend une importance accrue (il remplace parfois le Gloria supprimé) — lui donner le temps et la profondeur qu'il mérite.`,
    },
    registration: 'Récit : Gambe 8\' + Bourdon 8\'. Pédale : Soubasse 16\' seul, très doux. Éviter toute Trompette, tout Prestant brillant',
    tips: [
      'Legato absolu : toutes les voix tenues du début à la fin de chaque phrase, aucun staccato',
      'Dynamique très douce : pp à mp — le Kyrie se murmure plutôt qu\'il ne se proclame',
      'Laisser un silence complet entre "Kyrie eleison" et "Christe eleison" : le silence est liturgiquement juste',
      'En grégorien : rythme libre, suivre le texte latin, ne pas battre la mesure régulièrement',
    ],
    mistakes: [
      'Jouer le Kyrie en majeur joyeux avec Trompette : trahit le caractère suppliant du texte',
      'Tempo trop rapide : la supplication demande le temps de se formuler — au moins ♩= 52-60',
      'Arrêts brusques entre les "Kyrie" : garder le legato et le fil harmonique continu',
    ],
    periods: {
      avent: 'Même caractère suppliant qu\'en temps ordinaire. Couleur de l\'attente ajoutée : mode dorien ou éolien.',
      noel: 'En Noël festif, le Kyrie reste sobre : seule la Missa de Angelis (grégorien) peut être plus ornée.',
      careme: 'Maximum de profondeur : mineur harmonique, basses lourdes, tempo très lent, maximum de recueillement.',
      paques: 'Le Kyrie pascal peut être légèrement plus lumineux (mode dorien de Ré avec Si naturel) mais reste humble.',
      ordinaire: 'Sobre et suppliant. On peut varier entre Kyrie grégorien (libre, modal) et Kyrie harmonisé selon les semaines.',
    },
  },
  {
    id: 'gloria',
    name: 'Gloria',
    order: 3,
    phase: 'rite-entree',
    duration: '2-4 min',
    optional: true,
    liturgicalRole: 'Hymne de gloire et de louange, absent en Avent et en Carême',
    organistRole: 'Introduire le Gloria avec éclat, soutenir l\'hymne avec joie et majesté',
    style: 'Festif, joyeux, proclamatoire — mais avec des moments de tendresse intérieure',
    technique: {
      title: 'Le Gloria : la doxologie en acte, majesté et nuance',
      content: `Le Gloria est l'hymne le plus ancien de la messe ordinaire. Il est tiré du chant angélique de Noël (Luc 2:14) et développé en une grande doxologie en trois parties : louange à Dieu (Gloire à Dieu), supplication au Christ (Agneau de Dieu qui enlèves les péchés du monde), glorification de l'Esprit (Car toi seul es saint...).

Cette structure tripartite doit guider l'harmonisation :
1. Partie de louange (Gloire à Dieu, nous te louons...) : majeur festif, forte à fortissimo
2. Partie de supplication (Seigneur Dieu, Agneau de Dieu...) : dynamique réduite, mp, teinte plus intérieure
3. Partie de glorification finale (Car toi seul es le Très-Haut...) : crescendo vers fortissimo, tutti final

L'erreur typique est de jouer le Gloria entier au même niveau dynamique (soit tout fort, soit tout doux). La forme interne du texte exige le contraste.

Pour l'introduction : 4 mesures de fanfare au Grand Orgue sont obligatoires pour un Gloria festif. Ce n'est pas de l'ostentation : c'est annoncer l'hymne le plus joyeux de la liturgie ordinaire. L'introduction "lance" l'assemblée dans la louange.

RAPPEL LITURGIQUE IMPORTANT : Le Gloria n'existe pas en Avent ni en Carême. Si un paroissien demande "pourquoi on ne chante pas le Gloria aujourd'hui ?", la réponse musicale et théologique est : l'Avent attend encore, le Carême fait pénitence. Le Gloria reviendra à Noël et à Pâques avec d'autant plus d'éclat.`,
    },
    registration: 'Introduction et parties festives : Grand Orgue Montre 8\' + Bourdon 16\' + Prestant 4\' + Mixture. Parties intimes (Agneau de Dieu) : Récit seul Flûte 8\'',
    tips: [
      'Introduction 4 mesures fanfare obligatoire : c\'est le moment d\'annoncer la fête, ne pas l\'escamoter',
      'Respecter la structure du texte : louange (forte) — supplication (doux) — glorification (fortissimo)',
      'Le "seul tu es le Très-Haut, Jésus-Christ" est le sommet : tutti, fortissimo, tenir le dernier accord',
      'En Noël : ajouter Trompette en chamade si disponible pour la plus grande fête de l\'Incarnation',
    ],
    mistakes: [
      'Gloria absent en Avent et en Carême : rappel — ne JAMAIS jouer le Gloria pendant ces temps liturgiques',
      'Dynamique plate (tout forte ou tout doux) : la structure du texte exige contraste et narration dynamique',
      'Introduction trop courte (2 mesures) : l\'assemblée n\'a pas le temps de préparer sa voix et son élan',
    ],
    periods: {
      avent: 'ABSENT — le Gloria est supprimé tout le temps de l\'Avent. Ne pas jouer, ne pas chanter.',
      noel: 'Maximum festif ! C\'est le retour du Gloria après 4 semaines de silence. Trompette, Mixture, tutti, joie totale.',
      careme: 'ABSENT — le Gloria est supprimé tout le temps du Carême et du début de la Semaine Sainte.',
      paques: 'Retour solennel à la Vigile pascale : le Gloria sonne après 40 jours de silence, fff avec cloches si possible.',
      ordinaire: 'Festif mais adapté : plus discret pour un dimanche ordinaire, plus développé pour une fête.',
    },
  },
  {
    id: 'psaume',
    name: 'Psaume responsorial',
    order: 4,
    phase: 'liturgie-parole',
    duration: '3-5 min',
    optional: false,
    liturgicalRole: 'Méditation musicale sur la Première Lecture, dialogue entre le psalmiste et l\'assemblée',
    organistRole: 'Accompagner le psalmiste sur les versets, introduire et soutenir le refrain de l\'assemblée',
    style: 'Méditatif, sobre, au service du texte — la Parole prime sur la musique',
    technique: {
      title: 'Le psaume : servir le texte, pas s\'y substituer',
      content: `Le psaume responsorial est l'un des moments liturgiques les plus délicats pour l'organiste car il met en tension deux exigences : accompagner un soliste (le psalmiste) et soutenir l'assemblée (le refrain). Ces deux rôles demandent des dynamiques radicalement différentes.

Pendant les versets du psalmiste : jouer piano, en retrait. Le psalmiste doit être entendu clairement, sa voix portée mais non couverte. Jouer des harmonies légères, flottantes, sans rythme marqué (rubato). La règle : si vous entendez votre propre accompagnement plus fort que la voix du psalmiste, vous jouez trop fort.

Pendant le refrain (l'assemblée) : jouer mf à forte pour soutenir la communauté. L'introduction du refrain (4 temps avant l'entrée de l'assemblée) doit être claire et dans le tempo.

Technique de transition versets→refrain : les 2 dernières mesures du verset jouées par le psalmiste doivent être accompagnées d'un léger crescendo de l'orgue pour "lancer" le refrain assemblée. Ce crescendo doit être discret mais perceptible.

Pour les psaumes en grégorien ou en plain-chant : rythme libre, pas de mesure battue. Suivre la prosodie du texte latin ou français. Une pédale de basse longue sous un accord tenu crée un excellent support neutre.

Sur la nature du psaume : il est RÉPONSE à la Première Lecture, méditation sur celle-ci. L'organiste qui connaît la lecture du jour peut choisir des couleurs harmoniques qui reflètent le texte (mineur pour un psaume de lamentation, majeur joyeux pour un psaume de louange, etc.).`,
    },
    registration: 'Versets (psalmiste) : Récit Flûte 8\' seule, pp—p. Refrain (assemblée) : + Gambe 8\' ou Montre 8\', mp à mf',
    tips: [
      'Écouter le psalmiste attentivement : adapter sa dynamique à la voix (certains chanteurs sont forts, d\'autres fragiles)',
      'Le refrain : l\'assemblée doit entendre sa mélodie clairement dans l\'introduction — jouer la mélodie du refrain, pas seulement l\'harmonie',
      'Entre les versets et le refrain : 2 mesures de transition crescendo pour préparer l\'assemblée',
      'Connaître le texte du jour : un psaume de deuil (Ps 22) demande autre chose qu\'un psaume de louange (Ps 150)',
    ],
    mistakes: [
      'Jouer aussi fort pendant les versets que pendant le refrain : le psalmiste disparaît',
      'Introduction de refrain trop courte ou dans la mauvaise tonalité : l\'assemblée rate l\'entrée',
      'Accompagnement trop rythmique sur les versets : impose un tempo là où le psalmiste a besoin de liberté',
    ],
    periods: {
      avent: 'Couleurs sobres, psaumes d\'attente (Ps 85, 24, 122). Mineur et modal bienvenus.',
      noel: 'Lumière et joie (Ps 98, 97). Majeur festif pour les refrains, introduction claire et joyeuse.',
      careme: 'Psaumes de lamentation et de confiance (Ps 51, 91, 22). Mineur profond, p—mp sur les versets.',
      paques: 'Psaumes alléluiatiques (Ps 118, 66, 150). Festif, lumineux, allegretto pour les refrains.',
      ordinaire: 'Très variable selon le dimanche : s\'adapter chaque semaine au psaume assigné.',
    },
  },
  {
    id: 'alleluia',
    name: 'Alléluia / Acclamation de l\'Évangile',
    order: 5,
    phase: 'liturgie-parole',
    duration: '1-2 min',
    optional: false,
    liturgicalRole: 'Acclamer la venue du Christ dans l\'Évangile, accompagner la procession de l\'Évangéliaire',
    organistRole: 'Faire résonner l\'Alléluia avec joie, soutenir le verset d\'Alléluia chanté par le psalmiste',
    style: 'Joyeux et proclamatoire — sauf en Carême où c\'est la "Louange à toi, Seigneur"',
    technique: {
      title: 'L\'Alléluia : l\'acclamation la plus importante de la Parole',
      content: `L'Alléluia précède immédiatement l'Évangile : c'est la proclamation que le Christ lui-même va parler dans la Lecture évangélique. Son importance liturgique est considérable, et l'accompagnement musical doit refléter cette importance.

Structure de l'Alléluia chanté : Alléluia (assemblée) — Verset (psalmiste) — Alléluia (assemblée). L'organiste joue l'introduction de l'Alléluia (4-8 mesures), soutient l'assemblée sur les Alléluias, et accompagne discrètement le psalmiste sur le verset.

Transposition possible : si l'Alléluia habituel de la communauté est en Ré majeur et qu'il semble "plat" après des mois de répétition, le transposer un demi-ton plus haut (Mi bémol) peut redonner de l'éclat. À faire rarement et judicieusement.

CARÊME — règle absolue : en Carême, l'Alléluia est SUPPRIMÉ. Il est remplacé par une acclamation alternative : "Louange à toi, Seigneur Jésus" ou un verset chanté sans Alléluia. Cette disparition de 40 jours donne à l'Alléluia de Pâques son pouvoir extraordinaire. L'organiste ne doit JAMAIS jouer un Alléluia pendant le Carême, même par habitude ou inadvertance.

Quand l'évêque ou le prêtre proclame l'Évangile en marchant vers l'ambon, l'Alléluia peut être prolongé (répétitions) pour couvrir la procession. Ne pas s'arrêter avant que le célébrant soit en place.`,
    },
    registration: 'Ré majeur ou Do majeur : Grand Orgue Montre 8\' + Flûte 4\', au moins. En temps festif : + Trompette pour l\'entrée en Alléluia',
    tips: [
      'L\'Alléluia doit sonner comme une proclamation : mf à forte minimum, jamais pp',
      'Jouer l\'introduction complète (4-8 mesures) avant l\'entrée de l\'assemblée',
      'Si la procession de l\'Évangéliaire est longue : répéter l\'Alléluia jusqu\'à l\'arrivée du diacre/prêtre',
      'CARÊME : aucun Alléluia. Apprendre et accompagner l\'acclamation alternative de la communauté',
    ],
    mistakes: [
      'Jouer l\'Alléluia en Carême : erreur liturgique grave — les 40 jours de silence de l\'Alléluia sont théologiquement fondamentaux',
      'Alléluia trop doux (pp) : c\'est une acclamation, pas une méditation — la différence est théologique',
      'S\'arrêter avant la fin de la procession de l\'Évangéliaire : l\'Alléluia accompagne le mouvement liturgique',
    ],
    periods: {
      avent: 'Alléluia présent et joyeux. Certaines communautés utilisent un Alléluia spécifique d\'Avent, légèrement plus sobre.',
      noel: 'Alléluia festif et brillant. Ajouter Trompette si disponible. Répéter plusieurs fois avec éclat.',
      careme: 'SUPPRIMÉ. Remplacé par "Louange à toi, Seigneur Jésus" ou autre acclamation sans Alléluia.',
      paques: 'Alléluia maximum : c\'est le retour après 40 jours de silence. Tutti orgue, joie absolue.',
      ordinaire: 'Mf à forte selon le ton du dimanche. Adapté et soutenant, jamais négligé.',
    },
  },
  {
    id: 'offertoire',
    name: 'Offertoire',
    order: 6,
    phase: 'liturgie-eucharistique',
    duration: '3-8 min',
    optional: false,
    liturgicalRole: 'Accompagner la préparation des dons (pain et vin), permettre la quête, préparer l\'Eucharistie',
    organistRole: 'Jouer un cantique ou une pièce d\'orgue pendant la procession des offrandes et la quête',
    style: 'Variable : contemplatif ou joyeux selon la période, avec de la profondeur musicale',
    technique: {
      title: 'L\'offertoire : la plus grande liberté musicale de la messe',
      content: `L'offertoire est le moment de liberté maximale pour l'organiste : il n'y a pas de texte liturgique chanté imposé, la durée est variable (selon la longueur de la quête et de la procession des dons), et le style peut aller du profondément contemplatif au joyeusement festif.

Deux grandes options s'offrent à l'organiste :
1. Cantique d'offertoire (avec l'assemblée) : choisir un cantique thématiquement en lien avec les lectures du jour ou la période liturgique. Avantage : participation de l'assemblée. Inconvénient : si l'assemblée ne le connaît pas bien, le silence gêne.
2. Pièce instrumentale d'orgue : permet une élaboration musicale plus sophistiquée, les fidèles peuvent se recueillir sans effort vocal. Avantage : liberté artistique totale. Idéal pour un organiste qui improvise.

Durée imprévisible : toujours avoir un plan de secours. Si la quête se termine vite, raccourcir. Si elle s'éternise, avoir des interludes ou des répétitions prêts. La technique de l'improvisation sur les harmonies du cantique d'entrée permet de relier les moments.

L'offertoire est aussi le moment où l'orgue peut "parler" : c'est le carrefour entre la Liturgie de la Parole (ce que Dieu nous dit) et la Liturgie eucharistique (ce que nous offrons à Dieu). Musicalement, on peut traduire cela par une progression harmonique qui va de la méditation vers l'élan.`,
    },
    registration: 'Variable : Récit (Flûte + Gambe 8\') pour un offertoire contemplatif. Grand Orgue (Montre + Bourdon + Flûte 4\') pour un offertoire festif',
    tips: [
      'Avoir toujours 2 à 3 minutes de musique "en réserve" : la quête peut s\'éterniser',
      'Si cantique : choisir un cantique que l\'assemblée connaît bien — l\'offertoire n\'est pas le moment pour les nouveautés',
      'Si pièce instrumentale : choisir une pièce thématiquement cohérente avec la période et les lectures',
      'Surveiller la fin de la quête et la préparation de l\'autel : terminer la musique 20 à 30 secondes AVANT que le prêtre commence la Prière sur les offrandes',
    ],
    mistakes: [
      'Musique trop forte couvrant le prêtre qui prépare les dons : l\'organiste doit rester attentif au sanctuaire',
      'S\'arrêter brusquement à la fin de la quête : prévoir un diminuendo sur les 4 dernières mesures',
      'Pièce trop complexe que l\'organiste rate à cause du stress : préférer une pièce maîtrisée à une pièce ambitieuse ratée',
    ],
    periods: {
      avent: 'Contemplatif, Flûte douce, cantiques d\'Avent (Veni Emmanuel, Venez divin Messie). Tempo modéré.',
      noel: 'Cantiques de Noël joyeux (Adeste Fideles ornementé, Noël nouvelet). Grand Orgue bienvenu.',
      careme: 'Sobre et grave. Pièces de Carême (Par ta croix), harmonies mineures, pas de Trompette.',
      paques: 'Joyeux et festif. Cantiques pascaux (Il est vivant), Alléluia de Haendel en final si approprié.',
      ordinaire: 'Au choix selon le thème du dimanche et les forces de l\'assemblée.',
    },
  },
  {
    id: 'sanctus',
    name: 'Sanctus',
    order: 7,
    phase: 'liturgie-eucharistique',
    duration: '1-3 min',
    optional: false,
    liturgicalRole: 'Unir les voix humaines au chant des anges, inaugurer la grande Prière eucharistique',
    organistRole: 'Accompagner le Sanctus avec adoration et majesté, soutenir l\'assemblée dans ce chant central',
    style: 'Solennel et adorateur — le Sanctus est le sommet de la première partie de la Prière eucharistique',
    technique: {
      title: 'Le Sanctus : chant angélique et terrestre réunis',
      content: `Le Sanctus est tiré d'Isaïe 6 (le chant des Séraphins : "Saint, Saint, Saint est le Seigneur...") et de Matthieu 21 (l'entrée de Jésus à Jérusalem : "Hosanna au plus haut des cieux"). Il réunit donc une vision prophétique céleste et un événement terrestre historique — deux registres que l'harmonie doit refléter.

Structure du Sanctus en trois parties :
1. "Sanctus, Sanctus, Sanctus" : adoration pure. Caractère solennel, majestueux. Accords larges et bien tenus.
2. "Pleni sunt coeli et terra gloria tua" : contemplation. Légèrement plus doux, intérieur.
3. "Hosanna in excelsis / Benedictus" : joie et acclamation. Retour du forte ou fortissimo.

L'harmonisation du Sanctus exige un équilibre délicat entre la majesté (il faut que ce soit grand) et le recueillement (on est à genoux devant le mystère). Un Sanctus trop martelé (toujours forte, toujours majestueux) perd la dimension adoratrice. Un Sanctus trop pianissimo semble timoré devant la Gloire divine.

Pour les Sanctus grégoriens (Missa de Angelis, Missa Orbis Factor) : le rythme est libre, fluide, jamais battu. La basse de pédale tenue sous les harmonies crée le "tapis sonore" idéal pour un chant grégorien.

Le Sanctus marque le début de la Prière eucharistique : après, l'orgue se tait (sauf à la consécration, où le silence est le seul accompagnement approprié).`,
    },
    registration: 'Majeur festif : Grand Orgue Montre 8\' + Bourdon 16\' + Prestant 4\'. Hosanna : + Mixture. Grégorien : Récit Flûte 8\' seule, pp',
    tips: [
      'Introduction 4 mesures avec la mélodie du Sanctus : l\'assemblée doit l\'entendre avant de chanter',
      'Varier la dynamique entre "Sanctus Sanctus Sanctus" (solennel) et "Hosanna" (plus joyeux)',
      'Grégorien : tenir une basse longue de pédale, accompagnement fluide sans rythme marqué',
      'Après le Sanctus : silence absolu pendant la Prière eucharistique — se retirer immédiatement',
    ],
    mistakes: [
      'Continuer à jouer pendant la Prière eucharistique qui suit : le Sanctus est la dernière musique avant la Consécration',
      'Tempo trop rapide : le Sanctus est adoration, pas fanfare — ni trop lent (solennel), ni trop vite (irrespect)',
      'Accompagnement trop complexe qui couvre les voix : le texte "Saint, Saint, Saint" doit être intelligible',
    ],
    periods: {
      avent: 'Sanctus sobre, mp à mf. Pas de Trompette en Avent même pour le Sanctus.',
      noel: 'Sanctus festif, mf à forte. Mixture et Trompette bienvenues pour la fête de l\'Incarnation.',
      careme: 'Sanctus grave et recueilli, mp. Mode mineur possible pour les Sanctus en Semaine Sainte.',
      paques: 'Sanctus triomphal, forte à fortissimo. Le Sanctus pascal sonne comme une victoire. Tutti possible.',
      ordinaire: 'Sanctus adapté au caractère du dimanche. Solide et majestueux sans excès.',
    },
  },
  {
    id: 'anamnese',
    name: 'Anamnèse (Mémorial)',
    order: 8,
    phase: 'liturgie-eucharistique',
    duration: '30 sec - 1 min',
    optional: false,
    liturgicalRole: 'Proclamer la mort et la résurrection du Christ, répondre à l\'invitation du célébrant',
    organistRole: 'Introduction brève et soutien de l\'acclamation mémorial de l\'assemblée',
    style: 'Proclamatoire et ferme — c\'est la foi en acte de toute l\'assemblée',
    technique: {
      title: 'L\'Anamnèse : court mais décisif',
      content: `L'Anamnèse (ou Memorial Acclamation) suit immédiatement la Consécration : c'est le moment où le prêtre invite l'assemblée à "proclamer le mystère de la foi", et l'assemblée répond par une des formules habituelles ("Nous proclamons ta mort, Seigneur Jésus..." ou "Tu es venu, tu es mort...").

Ce moment est court mais d'une intensité liturgique maximale : l'Eucharistie vient d'être accomplie, et l'assemblée répond en proclamant le mystère central de la foi chrétienne (mort et résurrection du Christ).

Techniquement : l'organiste n'a pas le droit de jouer pendant la Consécration elle-même (moment de silence absolu). Le premier son d'orgue après la Consécration est l'introduction de l'Anamnèse — il doit donc être immédiat, clair, et "allumé" pour tirer l'assemblée du silence.

Introduction idéale : 2 mesures (maximum 4) dans le tempo et la tonalité de l'acclamation mémoriale. Ne pas faire un prélude élaboré — l'assemblée doit entrer immédiatement dans le chant.

Harmonie recommandée : majeur affirmé, cadence II—V—I claire sur les 2 premières mesures. Pas de fioritures. La vérité du texte demande la clarté harmonique.`,
    },
    registration: 'Grand Orgue : Montre 8\' + Bourdon 16\' + Flûte 4\'. Court et affirmé.',
    tips: [
      'Introduction 2 mesures seulement : l\'assemblée doit entrer immédiatement dans l\'acclamation',
      'Dynamique forte : ce n\'est pas une méditation, c\'est une proclamation — la foi s\'affirme à haute voix',
      'Être attentif au signal du prêtre (il lève les mains) pour déclencher l\'introduction exactement au bon moment',
      'La tonalité doit être confortable pour l\'assemblée : éviter les tonalités extrêmes (trop hautes ou trop basses)',
    ],
    mistakes: [
      'Introduction trop longue (8 mesures) : l\'intensité liturgique du moment demande la brièveté',
      'Tonalité trop haute pour l\'assemblée : le Memorial Acclamation doit être chanté par TOUT le monde',
      'Jouer pendant la Consécration : le silence de la Consécration est le signe de l\'adoration maximale',
    ],
    periods: {
      avent: 'Même acclamation qu\'en temps ordinaire, sobre mais affirmée.',
      noel: 'Légèrement plus festif si la mélodie s\'y prête, mais toujours proclamatoire.',
      careme: 'Anamnèse pascale en Carême : paradoxe théologique magnifique — proclamer la Résurrection au temps de la Croix.',
      paques: 'Anamnèse pascal maximum : forte, joyeuse, Alléluia possible si le texte le prévoit.',
      ordinaire: 'Claire et affirmée, mp à forte. Stable et connue de l\'assemblée.',
    },
  },
  {
    id: 'notre-pere-messe',
    name: 'Notre Père',
    order: 9,
    phase: 'rite-communion',
    duration: '2-3 min',
    optional: false,
    liturgicalRole: 'La prière universelle du Christ avant la communion, demander le pain quotidien et le pardon',
    organistRole: 'Accompagner sobrement la prière que toute l\'assemblée connaît par cœur',
    style: 'Sobre et communautaire — l\'orgue soutient, la communauté prie',
    technique: {
      title: 'Le Notre Père : s\'effacer devant la prière universelle',
      content: `Le Notre Père est la prière la plus universelle du christianisme : tous les fidèles, même les moins pratiquants, la connaissent. L'organiste se trouve devant un paradoxe : accompagner quelque chose de si familier que son rôle d'accompagnateur risque de devenir invisible — et c'est exactement ce qu'il doit être.

L'erreur typique : vouloir "embellir" le Notre Père avec des harmonies sophistiquées ou une ornementation recherchée. C'est contre-productif : les fidèles ont du mal à synchroniser leur chant spontané avec des harmonies inattendues.

La règle d'or du Notre Père : jouer les harmonies les plus simples et les plus attendues possible. I—IV—V, rien d'autre ou presque. Pas de II7, pas de VIe de napolitaine, pas d'accords augmentés. La prière universelle mérite l'harmonie universelle.

Dynamique : mp maximum. Le Notre Père se prie ensemble, à voix égales. L'orgue ne dirige pas la prière (comme il peut le faire pendant le Sanctus) : il la porte.

Après "Pour les siècles des siècles, Amen" : tenir le dernier accord 2 à 3 secondes, pp decrescendo. La paix du Notre Père doit lingerer dans le silence avant le Rite de paix.

Version grégorienne (Pater Noster) : si la communauté connaît la version grégorienne, jouer un accompagnement en plain-chant harmonisé, rythme libre, basse tenue.`,
    },
    registration: 'Récit : Flûte 8\' + Bourdon 8\'. Très sobre. Pas de Trompette, pas de Mixture.',
    tips: [
      'Harmonies simples et attendues : I—IV—V seulement, les fidèles doivent chanter sans effort cognitif',
      'Jouer mp : le Notre Père est une prière, pas une proclamation. L\'orgue soutient en silence relatif',
      'Si l\'assemblée démarre avant vous : tant mieux. Rejoindre discrètement, ne pas "corriger" le tempo',
      'Après l\'Amen final : tenir l\'accord pp 2-3 secondes, puis silence complet avant le Rite de Paix',
    ],
    mistakes: [
      'Harmonies trop complexes : les fidèles perdent leur fil et arrêtent de chanter',
      'Jouer forte : le Notre Père n\'est pas une fanfare — c\'est une prière murmurée à voix haute',
      'Arrêt brusque sur l\'Amen : laisser l\'accord résonner doucement avant le silence',
    ],
    periods: {
      avent: 'Même traitement sobre qu\'en temps ordinaire. Légèrement plus recueilli.',
      noel: 'Sobre même en Noël : la fête de Noël n\'affecte pas la sobriété du Notre Père.',
      careme: 'Maximum de recueillement. Le Notre Père en Carême est une prière de pénitence et de confiance.',
      paques: 'Légèrement plus lumineux (tonalité de Sol ou Ré) mais toujours sobre dans la dynamique.',
      ordinaire: 'Sobre, fiable, mp, harmonies connues. Toujours le même traitement.',
    },
  },
  {
    id: 'agnus-dei',
    name: 'Agneau de Dieu',
    order: 10,
    phase: 'rite-communion',
    duration: '1-2 min',
    optional: false,
    liturgicalRole: 'Invocation du Christ comme Agneau de Dieu pendant la Fraction du pain, demande de paix',
    organistRole: 'Accompagner la litanie de l\'Agneau pendant la fraction, maintenir le recueillement',
    style: 'Doux et suppliant — le contraste avec la force du Sanctus est voulu',
    technique: {
      title: 'L\'Agnus Dei : la supplication douce avant la communion',
      content: `L'Agneau de Dieu (Agnus Dei) est une litanie en trois versets : "Agneau de Dieu, qui enlèves le péché du monde, prends pitié de nous" (×2), puis "Agneau de Dieu, qui enlèves le péché du monde, donne-nous la paix". Il accompagne le rite de la Fraction du pain (le prêtre rompt l'hostie consacrée).

Son caractère est suppliant et doux, contrastant délibérément avec la majesté du Sanctus qui précède. Si le Sanctus dit "Tu es grand et saint", l'Agnus Dei dit "Aie pitié de moi, pécheur". Ce dialogue liturgique est aussi un dialogue harmonique : de la majesté (Sanctus) à l'humilité (Agnus Dei).

Harmonisation recommandée :
- Tonique mineure ou mineure douce (Ré mineur, La mineur) pour les deux premiers versets
- Retour vers une cadence plus lumineuse sur "donne-nous la paix" : finir sur un accord majeur ou avec une cadence VII—I (modal, douce)

La "paix" finale doit sonner différemment des deux "aie pitié" : l'harmonie doit refléter l'octroi de la paix, pas la supplication. Un accord de tonique majeur (passage du mineur au majeur parallèle, dit "tierce de Picardie") sur "la paix" est une solution harmoniquement efficace et traditionnelle.

Durée de la fraction : variable. Parfois le prêtre est rapide (30 secondes), parfois lent (2 minutes si beaucoup de fidèles). Être prêt à répéter les versets autant que nécessaire.`,
    },
    registration: 'Récit : Gambe 8\' + Flûte 8\', pp à mp. Très doux, très tenu. Transition vers la communion.',
    tips: [
      'La dynamique doit contraster avec le Sanctus : si Sanctus était forte, Agnus Dei doit être pp à mp',
      'Le final "donne-nous la paix" : passer du mineur au majeur (tierce de Picardie) pour sonoriser la paix accordée',
      'Si la fraction est longue : répéter les deux premiers versets autant que nécessaire',
      'Finir l\'Agnus Dei sur un accord doux et tenu : le silence qui suit prépare la communion',
    ],
    mistakes: [
      'Jouer l\'Agnus Dei forte comme le Sanctus : trahit le contraste liturgique voulu',
      'S\'arrêter avant la fin de la fraction : observer le prêtre et attendre qu\'il ait terminé',
      'Tonalité trop haute : l\'Agnus Dei doit être accessible aux voix fatiguées par la messe',
    ],
    periods: {
      avent: 'Sobre et suppliant. Teinte modale possible (dorien ou éolien).',
      noel: 'Légèrement plus lumineux mais toujours pp. Agnus Dei sobre même à Noël.',
      careme: 'Mineur profond, très pp. C\'est le moment le plus suppliant de la messe de Carême.',
      paques: 'Agnus Dei plus lumineux : mineur doux, résolution majeur possible, espérance de la Résurrection.',
      ordinaire: 'Pp à mp, doux et suppliant. Contraste avec le Sanctus, transition vers la communion.',
    },
  },
  {
    id: 'communion',
    name: 'Communion',
    order: 11,
    phase: 'rite-communion',
    duration: '5-15 min',
    optional: false,
    liturgicalRole: 'Accompagner musicalement la réception de l\'Eucharistie par les fidèles',
    organistRole: 'Jouer des cantiques ou une musique instrumentale pendant toute la durée de la communion',
    style: 'Recueilli, doux, contemplatif — la plus grande intimité de la messe',
    technique: {
      title: 'La communion : accompagner l\'intimité sacramentelle',
      content: `La communion est le moment de plus grande intimité entre le fidèle et le Christ : l'organiste a pour mission d'accompagner ce dialogue intérieur sans l'interrompre. C'est le moment liturgique qui demande le plus de délicatesse musicale.

Deux options majeures :
1. Cantiques de communion (avec l'assemblée) : choisir des cantiques contemplatifs et connus. Avantage : participation. Risque : certains fidèles préfèrent le silence pendant la communion.
2. Musique instrumentale (orgue seul) : pièces méditatives, improvisations douces. Permet à chacun de prier en silence intérieur tout en étant baigné dans la musique.

La meilleure solution est souvent hybride : commencer par un cantique de communion (avec l'assemblée), puis enchaîner avec une pièce instrumentale douce quand les derniers communiants reviennent à leur place.

Durée imprévisible : toujours avoir plus de musique préparée que nécessaire. 10 minutes de communion n'est pas rare dans une grande paroisse. Avoir un cantique + une pièce instrumentale + une improvisation prête.

Règles stylistiques pour la communion :
- Dynamique : pp à mp seulement. JAMAIS forte.
- Style : legato absolu, pas de staccato, pas d'ornements vifs.
- Harmonies : consonantes, sans dissonances fortes. L'eucharistie est paix, pas tension.
- Tempo : lent à modéré. Pas de musique rapide ou dansante.

Improvisation de communion : thème en Do majeur ou Sol majeur, basse simple, harmonies I—IV—V—I en cycle. Ajouter une contremélodie doucement ornée à la main droite après 2-3 minutes.`,
    },
    registration: 'Récit : Voix céleste 8\' + Flûte harmonique 8\' (le plus doux de l\'orgue). Pédale : Soubasse 16\' très doux ou Flûte 8\' seule',
    tips: [
      'Pp absolu pendant toute la communion : c\'est la règle fondamentale, jamais forte',
      'Si cantique : choisir des cantiques lents que l\'assemblée connaît (Pain vivant, Bless the Lord, Reste avec nous)',
      'Si musique instrumentale : improviser sur des harmonies simples I—IV—V dans une tonalité douce',
      'Surveiller la fin de la communion : diminuendo progressif sur les 2-3 dernières minutes',
    ],
    mistakes: [
      'Jouer forte pendant la communion : interrompt le dialogue intérieur des fidèles avec le Christ',
      'Musique trop rythmée ou trop dansante : incompatible avec la contemplation eucharistique',
      'Silence musical complet pendant la communion : sauf si c\'est le choix délibéré de la communauté, l\'orgue doit soutenir',
    ],
    periods: {
      avent: 'Très contemplatif, Flûte seule, cantiques d\'attente ou improvisation modale.',
      noel: 'Doux mais Noël : cantiques de Noël doux (Douce Nuit, Mon beau sapin) en mp jamais forte.',
      careme: 'Maximum de recueillement : silence musical possible en Semaine Sainte. Sinon Gambe 8\' seule, pp.',
      paques: 'Lumière pascale : Do majeur ou Ré majeur, Voix céleste, doux mais lumineux.',
      ordinaire: 'Adapté au ton du dimanche. Toujours pp à mp, toujours legato, toujours contemplatif.',
    },
  },
  {
    id: 'action-de-grace',
    name: 'Action de grâce / Méditation post-communion',
    order: 12,
    phase: 'rite-communion',
    duration: '2-5 min',
    optional: true,
    liturgicalRole: 'Moment de silence et de recueillement après la communion, remerciement pour le don reçu',
    organistRole: 'Jouer une pièce méditative douce ou improviser pendant que l\'assemblée se recueille',
    style: 'Contemplatif et doux — le prolongement du silence intérieur eucharistique',
    technique: {
      title: 'La méditation post-communion : prolonger le silence en musique',
      content: `La méditation post-communion est un moment souvent sous-estimé. Après la communion, les fidèles sont assis (ou agenouillés), plongés dans la prière personnelle. L'orgue peut continuer à jouer très doucement pour soutenir ce recueillement.

Ce n'est pas toujours joué : certaines communautés préfèrent le silence complet après la communion. L'organiste doit connaître l'usage local et ne jamais s'imposer. En cas de doute, commencer très doucement (ppp) et observer si la communauté apprécie ou non.

Quand c'est joué, le style doit être :
- Encore plus doux que la communion elle-même
- Tempo très lent
- Harmonies simples et stables (pas de modulations)
- Pas de mélodie reconnaissable trop directement : on ne veut pas "distraire" mais "accompagner le silence"

Technique d'improvisation post-communion : tenir de longues notes tenues à la main droite (Voix céleste) sur un accord stable, pendant que la main gauche fait doucement évoluer les harmonies internes par demi-tons. Cela crée une musique qui "respire" sans bouger apparemment — effet de contemplation parfait.

La durée dépend du prêtre : certains laissent 1-2 minutes, d'autres passent directement à la Prière post-communion. L'organiste doit surveiller le sanctuaire et diminuendo dès que le prêtre se lève.`,
    },
    registration: 'Récit : Voix céleste 8\' seule + Tremblant. Maximum de douceur. Pédale : rien ou Soubasse 16\' à ppp',
    tips: [
      'Observer si la communauté préfère le silence ou la musique : ne pas s\'imposer',
      'Si joué : ppp absolu — encore plus doux que la communion',
      'Improviser sur des harmonies très stables : aucune modulation brusque, aucune surprise',
      'Surveiller le prêtre : diminuendo dès qu\'il commence la Prière post-communion',
    ],
    mistakes: [
      'Commencer forte après la communion : rompt l\'intimité avec brutalité',
      'Jouer une mélodie reconnaissable très présente : distrait le recueillement intérieur',
      'Continuer à jouer quand le prêtre commence la Prière post-communion : l\'orgue doit se retirer immédiatement',
    ],
    periods: {
      avent: 'Très sobre, modal, très doux. L\'attente se prolonge jusque dans la prière post-communion.',
      noel: 'Doux et lumineux : Do majeur ou Sol majeur, Voix céleste seule, très pp.',
      careme: 'Silence possible et recommandé en Carême sévère. Sinon Gambe seule, ppp.',
      paques: 'Légèrement plus lumineux, Do ou Ré majeur, mais toujours pp. La paix pascale s\'installe.',
      ordinaire: 'Très doux, contemplatif, ppp. Accord de tonique tenu avec légères évolutions harmoniques.',
    },
  },
  {
    id: 'sortie',
    name: 'Sortie (Recessional)',
    order: 13,
    phase: 'rite-envoi',
    duration: '2-5 min',
    optional: false,
    liturgicalRole: 'Conclure la célébration, accompagner la procession de sortie, envoyer l\'assemblée en mission',
    organistRole: 'Jouer un cantique de sortie ou une pièce d\'orgue de conclusion, avec joie et élan',
    style: 'Festif et conclusif — "Allez dans la paix du Christ" doit sonner comme un envoi en mission',
    technique: {
      title: 'La sortie : l\'envoi en mission, la conclusion musicale',
      content: `La sortie est le moment où l'organiste peut "lâcher" la musique et jouer avec une liberté et une joie maximales. C'est la conclusion de la messe, l'envoi en mission : "Allez dans la paix du Christ" est une invitation à porter la joie eucharistique au monde.

Deux options pour la sortie :
1. Cantique de sortie (avec l'assemblée) : efficace si la communauté connaît bien le cantique. La sortie physique de la procession peut durer 2 à 3 minutes.
2. Pièce d'orgue seul (après la sortie) : la tradition française de la "sortie d'orgue" est magnifique — une toccata, une fantaisie, un prélude de choral. C'est la musique pour "ceux qui restent" et aussi pour ponctuer la fin de la cérémonie.

Pour l'improvisation de sortie : thème martial ou festif, Do majeur ou Ré majeur, tempo allegro ou allegretto. Forme idéale : thème (8 mesures) — episode brillant (8 mesures modulation) — retour du thème (8 mesures) — coda de 4 mesures fortissimo. Total : 2-3 minutes.

Les grandes sorties d'orgue (Toccata de Widor, Toccata de Boëllmann, Final de Vierne) sont ici appropriées pour les grandes fêtes. L'organiste doit avoir 2 ou 3 pièces de sortie maîtrisées pour les différentes occasions.

Rappel important : en Carême, la sortie reste sobre. Pas de Toccata de Widor le Vendredi saint. En Semaine Sainte, même la sortie peut être réduite à un simple accord final tenu.`,
    },
    registration: 'Grand Orgue + Récit + Pédale complets pour les grandes occasions. Trompette en chamade si disponible. Tutti festif.',
    tips: [
      'C\'est le moment de liberté maximale : jouer fort, jouer joyeux, laisser l\'orgue "chanter" sa sortie',
      'Si cantique de sortie : introduction 8 mesures avec Trompette pour que l\'assemblée entre avec élan',
      'Si pièce d\'orgue après la sortie : continuer à jouer jusqu\'à ce que l\'église soit vide (2-5 minutes)',
      'Pour les fêtes importantes : sortie en deux temps — cantique (avec l\'assemblée) puis toccata (orgue seul)',
    ],
    mistakes: [
      'Sortie trop douce en temps festif : l\'envoi en mission demande l\'élan, pas la réserve',
      'Sortie forte en Carême ou à des funérailles : respecter toujours le caractère liturgique du jour',
      'S\'arrêter à la procession du prêtre si une pièce d\'orgue est prévue : continuer jusqu\'à la fin complète de la pièce',
    ],
    periods: {
      avent: 'Sobre mais pas triste : la sortie d\'Avent est un envoi dans l\'attente joyeuse. Flûte + Montre, mp à mf.',
      noel: 'Festif maximum : Toccata possible, Trompette en chamade, Grand Orgue tutti. C\'est Noël !',
      careme: 'Sobre et grave : pas de pièce brillante. Accord final tenu, diminuendo vers le silence.',
      paques: 'Triomphal : Toccata de Widor ou Final de Vierne absolument appropriés. Tutti avec Trompettes.',
      ordinaire: 'Festif adapté : allegretto, Grand Orgue Montre + Mixture, joie mesurée selon le dimanche.',
    },
  },
]
