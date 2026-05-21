export const creatorProfile = {
  name: 'Amina Diallo',
  bio: 'Créatrice de contenu voyage & lifestyle. 250K abonnés passionnés de découvertes culturelles.',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Amina&backgroundColor=ffd5dc',
  instagram: '@amina.travels',
  tiktok: '@aminadiallo',
  youtube: 'Amina Explores',
  preferences: ['Aventure', 'Culture', 'Gastronomie'],
}

export const travelerProfiles = {
  lucas: {
    name: 'Lucas Martin',
    email: 'lucas.martin@email.com',
    bio: 'Voyageur curieux, toujours en quête de nouvelles expériences.',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Lucas&backgroundColor=c0e8ff',
    interests: ['Plages', 'Randonnée', 'Street Food', 'Photographie'],
  },
  sophie: {
    name: 'Sophie Laurent',
    email: 'sophie.laurent@email.com',
    bio: 'Passionnée de plongée et de gastronomie, fan d\'Amina depuis 2 ans.',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sophie&backgroundColor=ffd5dc',
    interests: ['Plongée', 'Gastronomie', 'Photographie', 'Culture'],
  },
}
export const travelerProfile = travelerProfiles.lucas

export const availableActivities = [
  'Plongée',
  'Randonnée',
  'Visite culturelle',
  'Surf',
  'Gastronomie locale',
  'Artisanat local',
  'Bien-être nature',
  'Sports nautiques',
  'Photographie',
  'Vie nocturne',
]

export const availableBudgetRanges = [
  '< 500€',
  '500-1000€',
  '1000-1500€',
  '1500-2000€',
  '> 2000€',
]

export const surveys = [
  {
    id: 1,
    title: 'Où partir cet été ? 🌴',
    status: 'completed',
    date: '2026-04-20',
    responses: 847,
    destinations: ['Bali', 'Islande', 'Marrakech', 'Santorin', 'Tokyo'],
    budgetRanges: ['500-1000€', '1000-1500€', '1500-2000€'],
    weeks: [
      { label: '1 au 7 juillet', start: '2026-07-01', end: '2026-07-07' },
      { label: '8 au 14 juillet', start: '2026-07-08', end: '2026-07-14' },
      { label: '15 au 21 juillet', start: '2026-07-15', end: '2026-07-21' },
      { label: '22 au 28 juillet', start: '2026-07-22', end: '2026-07-28' },
    ],
    activities: ['Plongée', 'Visite culturelle', 'Gastronomie locale', 'Surf', 'Photographie'],
  },
  {
    id: 2,
    title: 'Week-end surprise en Europe ✈️',
    status: 'draft',
    date: '2026-05-10',
    responses: 0,
    destinations: ['Lisbonne', 'Prague', 'Barcelone'],
    budgetRanges: ['500-1000€', '1000-1500€'],
    weeks: [
      { label: '5 au 8 juin', start: '2026-06-05', end: '2026-06-08' },
      { label: '12 au 15 juin', start: '2026-06-12', end: '2026-06-15' },
    ],
    activities: ['Visite culturelle', 'Gastronomie locale', 'Artisanat local', 'Vie nocturne'],
  },
]

export const surveyResults = {
  surveyId: 1,
  totalResponses: 847,
  averageBudget: 1200,
  topDestination: 'Bali',
  destinations: [
    { name: 'Bali', votes: 720, percentage: 85 },
    { name: 'Santorin', votes: 593, percentage: 70 },
    { name: 'Tokyo', votes: 508, percentage: 60 },
    { name: 'Marrakech', votes: 424, percentage: 50 },
    { name: 'Islande', votes: 339, percentage: 40 },
  ],
  budgets: [
    { range: '< 500€', value: 8 },
    { range: '500-1000€', value: 25 },
    { range: '1000-1500€', value: 35 },
    { range: '1500-2000€', value: 22 },
    { range: '> 2000€', value: 10 },
  ],
  ageGroups: [
    { range: '18-24', value: 32 },
    { range: '25-34', value: 41 },
    { range: '35-44', value: 18 },
    { range: '45-54', value: 7 },
    { range: '55+', value: 2 },
  ],
  activities: [
    { name: 'Plongée', value: 72 },
    { name: 'Visite culturelle', value: 65 },
    { name: 'Gastronomie locale', value: 58 },
    { name: 'Photographie', value: 45 },
    { name: 'Surf', value: 38 },
  ],
  weeks: [
    { label: '1 au 7 juillet', value: 35 },
    { label: '8 au 14 juillet', value: 28 },
    { label: '15 au 21 juillet', value: 22 },
    { label: '22 au 28 juillet', value: 15 },
  ],
}

export const individualResponses = [
  {
    id: 1,
    name: 'Sophie Laurent',
    email: 'sophie.laurent@email.com',
    phone: '+33 6 12 34 56 78',
    destination: 'Bali',
    budget: '1000-1500€',
    week: '1 au 7 juillet',
    activities: ['Plongée', 'Gastronomie locale', 'Photographie'],
  },
  {
    id: 2,
    name: 'Maxime Dubois',
    email: 'maxime.dubois@email.com',
    phone: '+33 6 23 45 67 89',
    destination: 'Santorin',
    budget: '1500-2000€',
    week: '8 au 14 juillet',
    activities: ['Visite culturelle', 'Photographie', 'Gastronomie locale'],
  },
  {
    id: 3,
    name: 'Camille Moreau',
    email: 'camille.moreau@email.com',
    phone: '+33 6 34 56 78 90',
    destination: 'Bali',
    budget: '1000-1500€',
    week: '1 au 7 juillet',
    activities: ['Surf', 'Plongée', 'Vie nocturne'],
  },
  {
    id: 4,
    name: 'Antoine Bernard',
    email: 'antoine.bernard@email.com',
    phone: '+33 6 45 67 89 01',
    destination: 'Tokyo',
    budget: '1500-2000€',
    week: '15 au 21 juillet',
    activities: ['Visite culturelle', 'Gastronomie locale', 'Artisanat local'],
  },
  {
    id: 5,
    name: 'Léa Fontaine',
    email: 'lea.fontaine@email.com',
    phone: '+33 6 56 78 90 12',
    destination: 'Bali',
    budget: '500-1000€',
    week: '1 au 7 juillet',
    activities: ['Plongée', 'Surf', 'Photographie'],
  },
  {
    id: 6,
    name: 'Hugo Mercier',
    email: 'hugo.mercier@email.com',
    phone: '+33 6 67 89 01 23',
    destination: 'Marrakech',
    budget: '500-1000€',
    week: '22 au 28 juillet',
    activities: ['Visite culturelle', 'Gastronomie locale', 'Artisanat local'],
  },
  {
    id: 7,
    name: 'Chloé Petit',
    email: 'chloe.petit@email.com',
    phone: '+33 6 78 90 12 34',
    destination: 'Santorin',
    budget: '1000-1500€',
    week: '8 au 14 juillet',
    activities: ['Photographie', 'Gastronomie locale', 'Bien-être nature'],
  },
  {
    id: 8,
    name: 'Thomas Roux',
    email: 'thomas.roux@email.com',
    phone: '+33 6 89 01 23 45',
    destination: 'Islande',
    budget: '1500-2000€',
    week: '15 au 21 juillet',
    activities: ['Randonnée', 'Photographie', 'Visite culturelle'],
  },
]

export const travelPreferences = ['Aventure', 'Culture', 'Détente', 'Gastronomie']

export const chatMessages = [
  {
    id: 1,
    sender: 'expert',
    text: "Bonjour Amina ! Je suis Karim, votre expert voyage Sankofa. J'ai analysé les résultats de votre sondage — votre communauté a de super goûts !",
    time: '14:32',
  },
  {
    id: 2,
    sender: 'expert',
    text: "Le Bali Essentiel a 94% de compatibilité avec vos abonnés. Souhaitez-vous qu'on explore cette option ensemble ?",
    time: '14:33',
  },
]

export const chatAutoReplies = [
  "Excellente question ! Pour le Bali Essentiel, nous proposons un groupe de 15-20 personnes max pour garder l'expérience intime. Le prix inclut vols, écolodge familial et toutes les activités.",
  "Je peux vous envoyer un devis détaillé par email. Nous offrons aussi un paiement en 3 fois pour vos fans !",
  "Absolument ! On peut organiser un live exclusif avec vous depuis Bali pour vos abonnés restés à la maison. Parfait pour créer du contenu pendant le voyage.",
]

export const suggestedTripsBySurvey = {
  1: [
    {
      id: 1,
      title: 'Bali Essentiel : Temples, Rizières & Fonds Marins',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      matchPercentage: 94,
      duration: '7j/6n',
      estimatedPrice: '1 350€',
      tags: ['Plongée', 'Culture', 'Gastronomie'],
      highlight: 'Destination #1 de votre communauté',
    },
    {
      id: 2,
      title: 'Santorin Secrète : Couchers de Soleil & Saveurs Égéennes',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
      matchPercentage: 87,
      duration: '5j/4n',
      estimatedPrice: '1 180€',
      tags: ['Photographie', 'Gastronomie', 'Détente'],
      highlight: 'Budget idéal pour votre audience',
    },
    {
      id: 3,
      title: 'Tokyo Immersif : Néons, Traditions & Street Food',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      matchPercentage: 78,
      duration: '8j/7n',
      estimatedPrice: '1 890€',
      tags: ['Culture', 'Street Food', 'Artisanat'],
      highlight: 'Expérience unique & immersive',
    },
  ],
  2: [
    {
      id: 4,
      title: 'Lisbonne Authentique : Fado, Azulejos & Pastéis',
      image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800',
      matchPercentage: 91,
      duration: '4j/3n',
      estimatedPrice: '680€',
      tags: ['Culture', 'Gastronomie', 'Photographie'],
      highlight: 'Week-end idéal',
    },
    {
      id: 5,
      title: 'Prague Mystérieuse : Châteaux & Bières Artisanales',
      image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800',
      matchPercentage: 84,
      duration: '3j/2n',
      estimatedPrice: '520€',
      tags: ['Culture', 'Vie nocturne', 'Architecture'],
      highlight: 'Petit budget, grand impact',
    },
    {
      id: 6,
      title: 'Barcelone Vibrante : Gaudí, Tapas & Playa',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
      matchPercentage: 79,
      duration: '4j/3n',
      estimatedPrice: '750€',
      tags: ['Culture', 'Gastronomie', 'Plage'],
      highlight: 'Le mix parfait',
    },
  ],
}

export const voyageControlData = {
  1: {
    status: 'selling',
    departureDate: '2026-05-17',
    kpis: {
      inscrits: 20,
      maxPlaces: 25,
      seuilValidation: 15,
      vuesPage: 342,
      caActuel: 27000,
      caObjectif: 33750,
    },
    participants: [
      {
        id: 1,
        name: 'Sophie Laurent',
        email: 'sophie.laurent@email.com',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sophie&backgroundColor=ffd5dc',
        paiement: 'payé',
        montant: 1350,
        date: '2026-04-25',
        source: 'Instagram',
        ville: 'Paris',
        age: 26,
        telephone: '+33 6 12 34 56 78',
        allergies: 'Fruits de mer',
        regime: 'Aucun',
        passeport: true,
        noteCreateur: 'Fan depuis 2 ans, très active en commentaires. A déjà participé à un meet-up.',
        instagram: '@sophie.lrt',
      },
      {
        id: 2,
        name: 'Maxime Dubois',
        email: 'maxime.dubois@email.com',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Maxime&backgroundColor=c0e8ff',
        paiement: 'payé',
        montant: 1350,
        date: '2026-04-26',
        source: 'TikTok',
        ville: 'Lyon',
        age: 31,
        telephone: '+33 6 23 45 67 89',
        allergies: 'Aucune',
        regime: 'Aucun',
        passeport: true,
        noteCreateur: 'Créateur de contenu voyage lui-même, bon potentiel collab.',
        instagram: '@max.dbs',
      },
      {
        id: 3,
        name: 'Camille Moreau',
        email: 'camille.moreau@email.com',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Camille&backgroundColor=d5f5e3',
        paiement: '3x',
        montant: 1350,
        date: '2026-04-28',
        source: 'Instagram',
        ville: 'Bordeaux',
        age: 24,
        telephone: '+33 6 34 56 78 90',
        allergies: 'Gluten',
        regime: 'Sans gluten',
        passeport: true,
        noteCreateur: 'Première réservation, découverte via un Reel viral.',
        instagram: '@camille.mro',
      },
      {
        id: 4,
        name: 'Antoine Bernard',
        email: 'antoine.bernard@email.com',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Antoine&backgroundColor=fde8cd',
        paiement: 'payé',
        montant: 1350,
        date: '2026-05-02',
        source: 'Campagne été 2026',
        ville: 'Marseille',
        age: 29,
        telephone: '+33 6 45 67 89 01',
        allergies: 'Aucune',
        regime: 'Végétarien',
        passeport: true,
        noteCreateur: 'Engagé dans la communauté Discord, modérateur.',
        instagram: '@antoine.brd',
      },
      {
        id: 5,
        name: 'Léa Fontaine',
        email: 'lea.fontaine@email.com',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Lea&backgroundColor=e8d5f5',
        paiement: 'en attente',
        montant: 1350,
        date: '2026-05-10',
        source: 'Lien bio',
        ville: 'Toulouse',
        age: 27,
        telephone: '+33 6 56 78 90 12',
        allergies: 'Arachides',
        regime: 'Vegan',
        passeport: false,
        noteCreateur: 'Inscription récente, relance prévue pour paiement et passeport.',
        instagram: '@lea.ftn',
      },
      {
        id: 6,
        name: 'Hugo Mercier',
        email: 'hugo.mercier@email.com',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Hugo&backgroundColor=d5e8f5',
        paiement: 'payé',
        montant: 1350,
        date: '2026-05-12',
        source: 'Bouche à oreille',
        ville: 'Nantes',
        age: 33,
        telephone: '+33 6 67 89 01 23',
        allergies: 'Aucune',
        regime: 'Aucun',
        passeport: true,
        noteCreateur: 'Ami de Sophie Laurent, découvre la communauté par ce voyage.',
        instagram: '@hugo.mrc',
      },
    ],
    postsIA: [
      {
        id: 1,
        platform: 'Instagram',
        type: 'Caption',
        content: `Bali, ça te dit ? 🌴✨ Imagine 7 jours entre temples ancestraux, rizières infinies et fonds marins de rêve… et tout ça avec une communauté de passionnés comme toi ! 🤿

J'organise mon premier voyage de groupe avec @sankofa.travel et il reste quelques places. Lien en bio pour réserver ta place avant qu'il soit trop tard 👆

On se retrouve à Bali cet été ? 🥥`,
        hashtags: ['#BaliTrip', '#VoyageDeGroupe', '#Sankofa', '#TravelCreator', '#CommunautéVoyage', '#Bali2026'],
        engagement: '4.2% estimé',
      },
      {
        id: 2,
        platform: 'TikTok',
        type: 'Script vidéo',
        content: `[HOOK] "J'emmène ma communauté à Bali et voilà ce qu'on va faire…"

[CONTENU] Montrer les 3 highlights : plongée à Nusa Penida, lever de soleil au temple Uluwatu, cours de cuisine balinaise.

[CTA] "Il reste 4 places, lien dans ma bio. Qui vient avec moi ?"`,
        hashtags: ['#Bali', '#VoyageGroupe', '#TravelTok', '#CreatorTrip'],
        engagement: '6.8% estimé',
      },
      {
        id: 3,
        platform: 'Instagram',
        type: 'Séquence Stories',
        content: `Story 1 : Sondage "Qui rêve de Bali ?" (🙋‍♀️ / 😴)
Story 2 : Reveal du programme jour par jour (swipe)
Story 3 : Témoignage vidéo "Pourquoi j'organise ce voyage"
Story 4 : Countdown sticker + lien réservation
Story 5 : "Plus que 4 places" avec urgence visuelle`,
        hashtags: ['#BaliTrip', '#Sankofa', '#VoyageCréateur'],
        engagement: '8.1% estimé',
      },
    ],
    comptes: {
      revenuBrut: 27000,
      commissionCreateur: 5400,
      paiementsRecus: 20,
      paiementsEnAttente: 1,
      prochainVersement: '2026-06-01',
    },
    editData: {
      titre: 'Bali Essentiel : Temples, Rizières & Fonds Marins',
      dates: '17 — 23 mai 2026',
      prix: '1 350€',
      description: 'Un voyage immersif de 7 jours à Bali, entre temples millénaires, rizières en terrasses et plongée dans les eaux cristallines de Nusa Penida. Hébergement en écolodge familial au cœur des rizières, guide francophone et immersion avec les habitants.',
      inclus: ['Vols A/R', 'Écolodge familial', 'Petit-déjeuners', 'Activités', 'Guide francophone', 'Transferts'],
      completion: 80,
    },
  },
  2: {
    status: 'en-cours',
    departureDate: '2026-05-11',
    duration: 5,
    kpis: {
      inscrits: 14,
      maxPlaces: 16,
      seuilValidation: 10,
      vuesPage: 587,
      caActuel: 16520,
      caObjectif: 18880,
    },
    participants: [
      { id: 1, name: 'Émilie Rousseau', email: 'emilie.r@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Emilie&backgroundColor=ffd5dc', paiement: 'payé', montant: 1180, date: '2026-03-10', source: 'Instagram', ville: 'Paris', age: 25, telephone: '+33 6 11 22 33 44', allergies: 'Aucune', regime: 'Végétarien', passeport: true, noteCreateur: 'Première fan à avoir réservé, super enthousiaste.', instagram: '@emilie.rss', urgence: { nom: 'Pierre Rousseau', lien: 'Père', telephone: '+33 6 10 10 10 10' } },
      { id: 2, name: 'Julien Carpentier', email: 'julien.c@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Julien&backgroundColor=c0e8ff', paiement: 'payé', montant: 1180, date: '2026-03-12', source: 'Instagram', ville: 'Lyon', age: 28, telephone: '+33 6 22 33 44 55', allergies: 'Aucune', regime: 'Aucun', passeport: true, noteCreateur: 'Photographe amateur, pourra créer du contenu.', instagram: '@julien.crp', urgence: { nom: 'Anne Carpentier', lien: 'Mère', telephone: '+33 6 20 20 20 20' } },
      { id: 3, name: 'Manon Girard', email: 'manon.g@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Manon&backgroundColor=d5f5e3', paiement: 'payé', montant: 1180, date: '2026-03-14', source: 'TikTok', ville: 'Lille', age: 23, telephone: '+33 6 33 44 55 66', allergies: 'Lactose', regime: 'Aucun', passeport: true, noteCreateur: 'Découverte via TikTok, très engagée en DM.', instagram: '@manon.grd', urgence: { nom: 'Luc Girard', lien: 'Frère', telephone: '+33 6 30 30 30 30' } },
      { id: 4, name: 'Nicolas Leroy', email: 'nicolas.l@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Nicolas&backgroundColor=fde8cd', paiement: 'payé', montant: 1180, date: '2026-03-15', source: 'Campagne été 2026', ville: 'Strasbourg', age: 34, telephone: '+33 6 44 55 66 77', allergies: 'Aucune', regime: 'Aucun', passeport: true, noteCreateur: 'Voyageur expérimenté, rassure les autres participants.', instagram: '@nico.leroy', urgence: { nom: 'Sophie Leroy', lien: 'Conjointe', telephone: '+33 6 40 40 40 40' } },
      { id: 5, name: 'Clara Dupont', email: 'clara.d@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Clara&backgroundColor=e8d5f5', paiement: 'payé', montant: 1180, date: '2026-03-18', source: 'Instagram', ville: 'Bordeaux', age: 26, telephone: '+33 6 55 66 77 88', allergies: 'Gluten', regime: 'Sans gluten', passeport: true, noteCreateur: 'Active sur les stories, partage souvent mon contenu.', instagram: '@clara.dpt', urgence: { nom: 'Jean Dupont', lien: 'Père', telephone: '+33 6 50 50 50 50' } },
      { id: 6, name: 'Alexandre Martin', email: 'alex.m@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alexandre&backgroundColor=d5e8f5', paiement: 'payé', montant: 1180, date: '2026-03-20', source: 'Lien bio', ville: 'Marseille', age: 30, telephone: '+33 6 66 77 88 99', allergies: 'Aucune', regime: 'Aucun', passeport: true, noteCreateur: 'A convaincu 2 amis de s\'inscrire aussi.', instagram: '@alex.mtn', urgence: { nom: 'Claire Martin', lien: 'Soeur', telephone: '+33 6 60 60 60 60' } },
      { id: 7, name: 'Inès Boucher', email: 'ines.b@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ines&backgroundColor=ffd5dc', paiement: 'payé', montant: 1180, date: '2026-03-22', source: 'TikTok', ville: 'Toulouse', age: 22, telephone: '+33 6 77 88 99 00', allergies: 'Fruits de mer', regime: 'Aucun', passeport: true, noteCreateur: 'La plus jeune du groupe, dynamique et fun.', instagram: '@ines.bch', urgence: { nom: 'Fatima Boucher', lien: 'Mère', telephone: '+33 6 70 70 70 70' } },
      { id: 8, name: 'Raphaël Garnier', email: 'raphael.g@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Raphael&backgroundColor=c0e8ff', paiement: 'payé', montant: 1180, date: '2026-03-25', source: 'Instagram', ville: 'Nice', age: 32, telephone: '+33 6 88 99 00 11', allergies: 'Aucune', regime: 'Aucun', passeport: true, noteCreateur: 'Membre du club privé Telegram depuis le lancement.', instagram: '@raph.grn', urgence: { nom: 'Isabelle Garnier', lien: 'Mère', telephone: '+33 6 80 80 80 80' } },
      { id: 9, name: 'Zoé Lemoine', email: 'zoe.l@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Zoe&backgroundColor=d5f5e3', paiement: 'payé', montant: 1180, date: '2026-03-28', source: 'Bouche à oreille', ville: 'Rennes', age: 27, telephone: '+33 6 99 00 11 22', allergies: 'Arachides', regime: 'Vegan', passeport: true, noteCreateur: 'Recommandée par Clara, amie proche.', instagram: '@zoe.lmn', urgence: { nom: 'Paul Lemoine', lien: 'Conjoint', telephone: '+33 6 90 90 90 90' } },
      { id: 10, name: 'Théo Morel', email: 'theo.m@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Theo&backgroundColor=fde8cd', paiement: 'payé', montant: 1180, date: '2026-04-01', source: 'TikTok', ville: 'Montpellier', age: 29, telephone: '+33 6 10 21 32 43', allergies: 'Aucune', regime: 'Aucun', passeport: true, noteCreateur: 'A commenté toutes les vidéos du voyage précédent.', instagram: '@theo.mrl', urgence: { nom: 'Diane Morel', lien: 'Conjointe', telephone: '+33 6 11 11 11 11' } },
      { id: 11, name: 'Jade Perrin', email: 'jade.p@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jade&backgroundColor=e8d5f5', paiement: 'payé', montant: 1180, date: '2026-04-03', source: 'Instagram', ville: 'Nantes', age: 25, telephone: '+33 6 21 32 43 54', allergies: 'Aucune', regime: 'Végétarien', passeport: true, noteCreateur: 'Influence locale à Nantes (~8K abonnés), potentiel UGC.', instagram: '@jade.prn', urgence: { nom: 'Marc Perrin', lien: 'Père', telephone: '+33 6 22 22 22 22' } },
      { id: 12, name: 'Louis Fournier', email: 'louis.f@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Louis&backgroundColor=d5e8f5', paiement: 'payé', montant: 1180, date: '2026-04-05', source: 'Campagne été 2026', ville: 'Paris', age: 35, telephone: '+33 6 32 43 54 65', allergies: 'Aucune', regime: 'Aucun', passeport: true, noteCreateur: 'Inscrit via la campagne Meta Ads.', instagram: '@louis.frn', urgence: { nom: 'Julie Fournier', lien: 'Conjointe', telephone: '+33 6 33 33 33 33' } },
      { id: 13, name: 'Eva Blanc', email: 'eva.b@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Eva&backgroundColor=ffd5dc', paiement: 'payé', montant: 1180, date: '2026-04-08', source: 'Lien bio', ville: 'Grenoble', age: 24, telephone: '+33 6 43 54 65 76', allergies: 'Aucune', regime: 'Aucun', passeport: true, noteCreateur: 'Abonnée newsletter depuis le jour 1.', instagram: '@eva.blc', urgence: { nom: 'Laurent Blanc', lien: 'Père', telephone: '+33 6 44 44 44 44' } },
      { id: 14, name: 'Gabriel Simon', email: 'gabriel.s@email.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Gabriel&backgroundColor=c0e8ff', paiement: 'payé', montant: 1180, date: '2026-04-10', source: 'Instagram', ville: 'Lyon', age: 28, telephone: '+33 6 54 65 76 87', allergies: 'Aucune', regime: 'Aucun', passeport: true, noteCreateur: 'A participé au Q&A live, très pertinent dans ses questions.', instagram: '@gabriel.smn', urgence: { nom: 'Nathalie Simon', lien: 'Mère', telephone: '+33 6 55 55 55 55' } },
    ],
    postsIA: [
      {
        id: 1,
        platform: 'Instagram',
        type: 'Caption',
        content: `Santorin en live ! 🇬🇷☀️ On est arrivés hier avec le groupe et c'est déjà magique. Le bleu de la mer, les maisons blanches, les couchers de soleil…

Je vous emmène dans les coulisses du voyage toute la semaine ! Stay tuned 🎬`,
        hashtags: ['#Santorin', '#VoyageGroupe', '#Sankofa', '#GreeceTravel', '#CreatorTrip'],
        engagement: '5.1% estimé',
      },
      {
        id: 2,
        platform: 'TikTok',
        type: 'Script vidéo',
        content: `[HOOK] "POV : tu emmènes 14 fans en Grèce avec toi"

[CONTENU] Montage rapide : arrivée à l'écolodge, premier dîner de groupe, réactions du groupe face au sunset.

[CTA] "Le prochain voyage c'est pour vous — inscrivez-vous à la newsletter"`,
        hashtags: ['#Santorin', '#TravelTok', '#GroupTravel', '#CreatorLife'],
        engagement: '7.3% estimé',
      },
    ],
    comptes: {
      revenuBrut: 16520,
      commissionCreateur: 3304,
      paiementsRecus: 14,
      paiementsEnAttente: 0,
      prochainVersement: '2026-05-25',
    },
    editData: {
      titre: 'Santorin Secrète : Couchers de Soleil & Saveurs Égéennes',
      dates: '11 — 15 mai 2026',
      prix: '1 180€',
      description: "Cinq jours sur l'île la plus photogénique des Cyclades. Des villages blancs suspendus au-dessus de la caldeira, des couchers de soleil légendaires à Oia, et une gastronomie méditerranéenne authentique.",
      inclus: ['Vols A/R', 'Maison d\'hôtes locale', 'Petits-déjeuners', 'Croisière catamaran', 'Dégustation vins', 'Transferts'],
      completion: 100,
    },
  },
}

export const voyageChatMessages = {
  1: {
    organizer: 'Karim',
    messages: [
      { id: 1, sender: 'organizer', text: "Bonjour Amina ! Le voyage Bali se remplit bien, 20 inscrits déjà. On est dans les temps !", time: '10:15', date: '2026-05-14', read: true },
      { id: 2, sender: 'organizer', text: "J'ai validé les activités avec le prestataire local. La plongée à Nusa Penida est confirmée pour le jour 4.", time: '10:16', date: '2026-05-14', read: true },
      { id: 3, sender: 'user', text: "Super ! Est-ce qu'on peut ajouter un cours de yoga le matin du jour 5 ?", time: '11:30', date: '2026-05-14', read: true },
      { id: 4, sender: 'organizer', text: "Bonne idée ! Je check la dispo et je reviens vers toi. Tu veux aussi qu'on prépare un brief photo pour tes contenus ?", time: '14:45', date: '2026-05-15', read: false },
    ],
  },
  2: {
    organizer: 'Maria',
    messages: [
      { id: 1, sender: 'organizer', text: "Coucou ! On est bien installés à Santorin, l'hôtel est magnifique. Le groupe est super content !", time: '18:30', date: '2026-05-11', read: true },
      { id: 2, sender: 'organizer', text: "La croisière catamaran demain est confirmée, départ 10h. Prévois de la crème solaire pour tout le monde !", time: '20:15', date: '2026-05-11', read: true },
      { id: 3, sender: 'user', text: "Parfait Maria ! Les retours du groupe sur le premier jour ?", time: '21:00', date: '2026-05-11', read: true },
      { id: 4, sender: 'organizer', text: "Tout le monde adore ! Zoé et Théo ont déjà posté des stories. Le sunset à Oia a fait l'unanimité 🌅", time: '09:00', date: '2026-05-12', read: false },
      { id: 5, sender: 'organizer', text: "Petit souci : Gabriel a oublié son adaptateur. Je lui en prête un. Sinon RAS, ambiance au top !", time: '09:05', date: '2026-05-12', read: false },
    ],
  },
}

export const voyageChatAutoReplies = {
  1: [
    "Je vérifie ça tout de suite ! Le prestataire est très réactif, je devrais avoir une réponse dans l'heure.",
    "C'est noté. Je t'envoie un récap par email avec toutes les confirmations d'ici ce soir.",
    "Super question ! Je propose qu'on en discute lors de notre call hebdo demain à 14h.",
  ],
  2: [
    "Le groupe est ravi ! On a prévu un petit extra surprise pour ce soir — je te tiens au courant 😊",
    "Tout roule de mon côté. La dégustation de vins est confirmée pour demain après-midi.",
    "Je gère ! N'hésite pas si tu as d'autres questions. Profite bien du contenu que tu reçois !",
  ],
}

export const voyagePageStats = {
  1: {
    vues: 342,
    visiteursUniques: 287,
    tauxConversion: 5.8,
    tempsMoyen: '2m 14s',
    tauxRebond: 34,
    visiteursParJour: [
      { jour: 'Lun', visites: 42 },
      { jour: 'Mar', visites: 58 },
      { jour: 'Mer', visites: 51 },
      { jour: 'Jeu', visites: 63 },
      { jour: 'Ven', visites: 48 },
      { jour: 'Sam', visites: 45 },
      { jour: 'Dim', visites: 35 },
    ],
    sources: [
      { nom: 'Instagram', visites: 156, inscriptions: 12, couleur: '#E1306C' },
      { nom: 'TikTok', visites: 89, inscriptions: 5, couleur: '#000000' },
      { nom: 'Story Link', visites: 62, inscriptions: 2, couleur: '#833AB4' },
      { nom: 'Lien direct', visites: 35, inscriptions: 1, couleur: '#0F766E' },
    ],
  },
  2: {
    vues: 587,
    visiteursUniques: 431,
    tauxConversion: 3.2,
    tempsMoyen: '1m 48s',
    tauxRebond: 41,
    visiteursParJour: [
      { jour: 'Lun', visites: 78 },
      { jour: 'Mar', visites: 95 },
      { jour: 'Mer', visites: 82 },
      { jour: 'Jeu', visites: 104 },
      { jour: 'Ven', visites: 88 },
      { jour: 'Sam', visites: 76 },
      { jour: 'Dim', visites: 64 },
    ],
    sources: [
      { nom: 'Instagram', visites: 234, inscriptions: 8, couleur: '#E1306C' },
      { nom: 'TikTok', visites: 178, inscriptions: 4, couleur: '#000000' },
      { nom: 'Story Link', visites: 98, inscriptions: 1, couleur: '#833AB4' },
      { nom: 'Lien direct', visites: 77, inscriptions: 1, couleur: '#0F766E' },
    ],
  },
}

export const voyageTrackingLinks = {
  1: [
    { id: 1, nom: 'bio-insta', url: 'sankofa.travel/v/bali-essentiel?ref=bio-insta', clicks: 156, inscriptions: 12, createdAt: '2026-04-20' },
    { id: 2, nom: 'tiktok', url: 'sankofa.travel/v/bali-essentiel?ref=tiktok', clicks: 89, inscriptions: 5, createdAt: '2026-04-22' },
    { id: 3, nom: 'promo-mai', url: 'sankofa.travel/v/bali-essentiel?ref=promo-mai', clicks: 62, inscriptions: 2, createdAt: '2026-05-01' },
    { id: 4, nom: 'collab-julie', url: 'sankofa.travel/v/bali-essentiel?ref=collab-julie', clicks: 35, inscriptions: 1, createdAt: '2026-05-05' },
  ],
  2: [
    { id: 1, nom: 'bio-insta', url: 'sankofa.travel/v/santorin-secrete?ref=bio-insta', clicks: 234, inscriptions: 8, createdAt: '2026-03-01' },
    { id: 2, nom: 'tiktok', url: 'sankofa.travel/v/santorin-secrete?ref=tiktok', clicks: 178, inscriptions: 4, createdAt: '2026-03-05' },
    { id: 3, nom: 'story-promo', url: 'sankofa.travel/v/santorin-secrete?ref=story-promo', clicks: 98, inscriptions: 1, createdAt: '2026-03-10' },
  ],
}

export const suggestedTrips = [
  {
    id: 1,
    title: 'Bali Essentiel : Temples, Rizières & Fonds Marins',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200',
      'https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200',
    ],
    matchPercentage: 94,
    duration: '7j/6n',
    estimatedPrice: '1 350€',
    tags: ['Plongée', 'Culture', 'Gastronomie'],
    highlight: 'Destination #1 de votre communauté',
    departureDate: '17 mai 2026',
    description: "Un voyage immersif de 7 jours à Bali, entre temples millénaires, rizières en terrasses et plongée dans les eaux cristallines de Nusa Penida. Hébergement en écolodge au cœur des rizières, tenu par une famille balinaise. Immersion totale dans le quotidien local, activités encadrées par des guides locaux — 100% des revenus du séjour sont redistribués aux communautés balinaises.",
    esgHighlights: [
      { icon: 'heart', label: '100% reversé aux locaux', detail: 'Guides, hébergeurs et artisans balinais' },
      { icon: 'leaf', label: 'Écolodge certifié', detail: 'Hébergement à faible impact environnemental' },
      { icon: 'globe', label: 'Empreinte carbone compensée', detail: 'Via notre partenaire EcoAct' },
    ],
    itinerary: [
      { day: 1, label: 'Arrivée à Denpasar, transfert écolodge & accueil par la famille d\'hôtes', activities: [
        { time: '14:30', title: 'Arrivée à l\'aéroport Ngurah Rai', description: 'Accueil par notre guide local Ketut avec collier de fleurs de frangipanier.', location: 'Aéroport de Denpasar', type: 'transport' },
        { time: '15:30', title: 'Transfert vers l\'écolodge', description: 'Route panoramique à travers les rizières en terrasses. Briefing sur le programme de la semaine pendant le trajet.', location: 'Route vers Tegallalang', type: 'transport' },
        { time: '17:00', title: 'Installation à l\'écolodge', description: 'Check-in dans vos bungalows en bambou avec vue sur la vallée. Temps libre pour explorer le jardin tropical.', location: 'Eco-lodge Tegallalang', type: 'hebergement', tip: 'Pensez à appliquer de l\'anti-moustique dès l\'arrivée !' },
        { time: '18:30', title: 'Cérémonie de bienvenue balinaise', description: 'Bénédiction traditionnelle par un prêtre hindou. Offrandes de fleurs et encens. Un moment spirituel et émouvant.', location: 'Temple de l\'écolodge', type: 'visite' },
        { time: '19:30', title: 'Dîner de bienvenue', description: 'Buffet de spécialités balinaises préparé par la famille d\'hôtes : nasi goreng, sate lilit, lawar, et gado-gado. Jus de fruits frais tropicaux.', location: 'Restaurant de l\'écolodge', type: 'repas', tip: 'Goûtez absolument le lawar, plat de cérémonie balinais !' },
        { time: '21:00', title: 'Briefing de bienvenue & rencontre du groupe', description: 'Présentation du programme détaillé, distribution des kits voyageurs Sankofa. Tour de table pour faire connaissance.', location: 'Terrasse principale', type: 'activite' },
      ]},
      { day: 2, label: 'Temples d\'Uluwatu & cérémonie Kecak au coucher du soleil', activities: [
        { time: '07:00', title: 'Petit-déjeuner tropical', description: 'Pancakes à la banane, fruits frais (mangue, papaye, fruit du dragon), café balinais et jus de gingembre maison.', location: 'Restaurant de l\'écolodge', type: 'repas' },
        { time: '08:30', title: 'Départ vers le sud de Bali', description: 'Trajet d\'environ 1h30 à travers les paysages verdoyants. Arrêt photo au belvédère de Jimbaran.', location: 'Route vers Uluwatu', type: 'transport' },
        { time: '10:00', title: 'Visite du temple d\'Uluwatu', description: 'Perché à 70m au-dessus de l\'océan, ce temple du XIe siècle est l\'un des six temples directionnels de Bali. Architecture spectaculaire et vues vertigineuses sur les falaises.', location: 'Pura Luhur Uluwatu', type: 'visite', tip: 'Attention aux singes ! Rangez lunettes et téléphones dans les poches.' },
        { time: '12:00', title: 'Déjeuner face à l\'océan', description: 'Fruits de mer grillés dans un warung local sur la plage de Padang Padang. Poisson du jour, crevettes satay et riz parfumé.', location: 'Warung de Padang Padang', type: 'repas' },
        { time: '13:30', title: 'Temps libre à la plage', description: 'Baignade dans les eaux turquoise de Padang Padang, la plage rendue célèbre par le film "Eat Pray Love". Possibilité de louer un bodyboard.', location: 'Plage de Padang Padang', type: 'temps-libre' },
        { time: '16:00', title: 'Session photo sur les falaises', description: 'Shooting photos avec Amina dans les spots les plus instagrammables des falaises d\'Uluwatu. Lumière dorée parfaite.', location: 'Falaises d\'Uluwatu', type: 'activite' },
        { time: '17:30', title: 'Installation pour le Kecak', description: 'Places réservées au premier rang de l\'amphithéâtre naturel face à la mer.', location: 'Amphithéâtre d\'Uluwatu', type: 'visite' },
        { time: '18:00', title: 'Cérémonie Kecak au coucher du soleil', description: '70 danseurs en transe chantent "cak-cak-cak" tandis que le soleil plonge dans l\'océan Indien. Récit du Ramayana mis en scène. Un spectacle hypnotisant et inoubliable.', location: 'Amphithéâtre d\'Uluwatu', type: 'visite', tip: 'Moment fort du voyage — préparez vos appareils photo !' },
        { time: '19:30', title: 'Dîner barbecue sur la plage', description: 'Seafood BBQ les pieds dans le sable à Jimbaran. Langoustines, calamars et maïs grillé, avec vue sur les lumières des bateaux de pêcheurs.', location: 'Plage de Jimbaran', type: 'repas' },
        { time: '21:30', title: 'Retour à l\'écolodge', description: 'Transfert retour. Arrivée vers 23h.', location: '', type: 'transport' },
      ]},
      { day: 3, label: 'Rizières de Tegallalang & atelier cuisine balinaise', activities: [
        { time: '06:30', title: 'Réveil yoga en pleine nature', description: 'Session de Hatha yoga optionnelle sur la terrasse panoramique. Méditation guidée face aux rizières au lever du soleil.', location: 'Terrasse de l\'écolodge', type: 'activite', tip: 'Tapis fournis. Venez en vêtements confortables.' },
        { time: '07:30', title: 'Petit-déjeuner balinais', description: 'Bubur injin (porridge de riz noir au lait de coco), toast à l\'avocat, smoothie bowl et café luwak.', location: 'Restaurant de l\'écolodge', type: 'repas' },
        { time: '09:00', title: 'Randonnée dans les rizières de Tegallalang', description: 'Balade de 2h à travers le système d\'irrigation ancestral "subak" (UNESCO). Traversée de ponts suspendus au-dessus de la jungle, rencontre avec les agriculteurs locaux.', location: 'Rizières de Tegallalang', type: 'visite' },
        { time: '11:00', title: 'Visite d\'une plantation de café', description: 'Découverte du processus de fabrication du café Luwak, dégustation de 8 variétés de café et thé balinais. Explication des méthodes agricoles durables.', location: 'Plantation Bali Pulina', type: 'visite', tip: 'Le café Luwak est le plus cher au monde — profitez-en !' },
        { time: '12:30', title: 'Déjeuner avec vue', description: 'Repas face aux rizières : nasi campur, salade de papaye verte et tempeh grillé. Jus de coco frais.', location: 'Restaurant Tegallalang', type: 'repas' },
        { time: '14:00', title: 'Cours de cuisine balinaise', description: 'Atelier de 3h avec Ibu Wayan, cheffe locale. Au programme : visite du marché, préparation de bumbu (pâte d\'épices), sate lilit, lawar et pisang goreng. Vous repartez avec les recettes !', location: 'Maison d\'Ibu Wayan', type: 'activite' },
        { time: '17:00', title: 'Dégustation de vos créations', description: 'Repas convivial avec tout le groupe. Dégustation de chaque plat préparé accompagnée de bière Bintang bien fraîche.', location: 'Maison d\'Ibu Wayan', type: 'repas' },
        { time: '18:30', title: 'Temps libre au lodge', description: 'Piscine à débordement, hamacs ou massage balinais traditionnel (en supplément, ~15€/h).', location: 'Eco-lodge Tegallalang', type: 'temps-libre' },
        { time: '20:00', title: 'Soirée contenu avec Amina', description: 'Session de partage : Amina montre les coulisses de son métier de créatrice. Tips photo/vidéo pour vos souvenirs de voyage.', location: 'Terrasse principale', type: 'activite' },
      ]},
      { day: 4, label: 'Plongée à Nusa Penida — raies manta & coraux', activities: [
        { time: '05:30', title: 'Réveil matinal & petit-déjeuner léger', description: 'Petit-déjeuner rapide avant le départ : fruits, granola et thé au gingembre. Briefing sécurité plongée.', location: 'Restaurant de l\'écolodge', type: 'repas', tip: 'Mangez léger pour la traversée en bateau !' },
        { time: '06:30', title: 'Transfert vers le port de Sanur', description: 'Trajet d\'1h en minibus climatisé.', location: 'Route vers Sanur', type: 'transport' },
        { time: '07:30', title: 'Traversée en speedboat vers Nusa Penida', description: '45 minutes de traversée avec vue sur le mont Agung. Distribution du matériel de snorkeling/plongée.', location: 'Port de Sanur → Nusa Penida', type: 'transport', tip: 'Prenez du Dramamine si vous êtes sensible au mal de mer.' },
        { time: '08:30', title: 'Briefing plongée & équipement', description: 'Présentation du site par le moniteur PADI. Deux options : plongée bouteille pour les certifiés, snorkeling pour les autres. Les deux sont magiques !', location: 'Crystal Bay, Nusa Penida', type: 'activite' },
        { time: '09:00', title: 'Plongée/snorkeling à Manta Point', description: 'Immersion dans les eaux cristallines. Observation des raies manta géantes (envergure jusqu\'à 5m), tortues marines et jardins de coraux multicolores. Un spectacle sous-marin époustouflant.', location: 'Manta Point', type: 'activite', tip: 'Moment magique — ne touchez pas les raies manta, observez seulement !' },
        { time: '11:00', title: 'Deuxième plongée à Crystal Bay', description: 'Site réputé pour ses poissons-lune (mola mola) et la clarté exceptionnelle de l\'eau. Coraux intacts et bancs de poissons tropicaux.', location: 'Crystal Bay', type: 'activite' },
        { time: '12:30', title: 'Déjeuner sur la plage', description: 'Pique-nique local sur la plage de sable blanc : nasi bungkus (riz enveloppé dans des feuilles de bananier), poulet grillé et fruits frais.', location: 'Plage de Crystal Bay', type: 'repas' },
        { time: '14:00', title: 'Visite du Kelingking Beach viewpoint', description: 'Randonnée jusqu\'au point de vue le plus célèbre de Nusa Penida : la falaise en forme de T-Rex. Vue à 180° sur l\'océan turquoise.', location: 'Kelingking Beach', type: 'visite' },
        { time: '15:30', title: 'Baignade à Angel\'s Billabong', description: 'Piscine naturelle creusée dans la roche volcanique, remplie par les vagues. Un décor surréaliste.', location: 'Angel\'s Billabong', type: 'temps-libre' },
        { time: '17:00', title: 'Retour en speedboat vers Sanur', description: 'Traversée retour avec coucher de soleil sur l\'eau.', location: 'Nusa Penida → Sanur', type: 'transport' },
        { time: '19:00', title: 'Dîner au port de Sanur', description: 'Repas de fruits de mer dans un restaurant en bord de mer. Spécialité : barramundi grillé sauce sambal.', location: 'Warung Mak Beng, Sanur', type: 'repas' },
        { time: '20:30', title: 'Retour à l\'écolodge', description: 'Transfert retour. Soirée libre pour se reposer après cette journée intense.', location: 'Eco-lodge Tegallalang', type: 'transport' },
      ]},
      { day: 5, label: 'Journée libre : balade à vélo dans les villages, surf ou exploration locale', activities: [
        { time: '07:00', title: 'Petit-déjeuner au rythme libre', description: 'Buffet disponible jusqu\'à 10h. Pancakes coco, œufs brouillés aux épices, fruits et jus frais.', location: 'Restaurant de l\'écolodge', type: 'repas' },
        { time: '09:00', title: 'Option A — Balade à vélo dans les villages', description: 'Parcours de 20km (facile) à travers les villages traditionnels. Arrêts chez un sculpteur sur bois, un peintre batik et un forgeron. Rencontres authentiques.', location: 'Villages autour de Tegallalang', type: 'activite', tip: 'Vélos et casques fournis. Apportez de l\'eau et de la crème solaire.' },
        { time: '09:00', title: 'Option B — Session surf à Canggu', description: 'Transfert vers Canggu (45min). Cours de surf de 2h avec moniteur certifié. Tous niveaux bienvenus. Planche et lycra fournis.', location: 'Echo Beach, Canggu', type: 'activite' },
        { time: '09:00', title: 'Option C — Détente au lodge', description: 'Journée wellness : piscine, massage balinais, lecture dans les hamacs, balades dans le jardin botanique.', location: 'Eco-lodge Tegallalang', type: 'temps-libre' },
        { time: '12:30', title: 'Déjeuner libre', description: 'Chacun à son rythme. Recommandations : Warung Tepi Sawah pour les cyclistes, Deus Ex Machina pour les surfeurs, restaurant du lodge pour les autres.', location: 'Au choix', type: 'repas' },
        { time: '14:30', title: 'Temps libre / exploration', description: 'Continuez votre activité ou explorez les environs. Possibilité de visiter le Tirta Empul (temple de purification) à 15min.', location: 'Environs de Tegallalang', type: 'temps-libre' },
        { time: '17:00', title: 'Rassemblement au lodge', description: 'Retour au lodge pour un moment de partage. Chacun raconte sa journée autour d\'un cocktail arak-miel.', location: 'Bar de l\'écolodge', type: 'activite' },
        { time: '19:00', title: 'Dîner-spectacle de danse Legong', description: 'Dîner gastronomique au lodge avec spectacle privé de danse Legong par une troupe locale. Danseuses en costumes dorés, accompagnées d\'un gamelan.', location: 'Jardin de l\'écolodge', type: 'repas', tip: 'Spectacle exceptionnel organisé spécialement pour le groupe !' },
      ]},
      { day: 6, label: 'Excursion cascade Sekumpul & dîner communautaire', activities: [
        { time: '06:00', title: 'Lever de soleil sur les rizières', description: 'Moment optionnel mais magique : observer le lever du soleil depuis le point de vue du lodge. Café chaud offert.', location: 'Viewpoint de l\'écolodge', type: 'activite', tip: 'Le lever de soleil est vers 6h15 — ne le ratez pas !' },
        { time: '07:00', title: 'Petit-déjeuner énergétique', description: 'Smoothie bowl açaí, toast complet, omelette aux herbes et jus de pastèque. Prenez des forces pour la randonnée !', location: 'Restaurant de l\'écolodge', type: 'repas' },
        { time: '08:00', title: 'Départ vers la cascade Sekumpul', description: 'Trajet d\'1h30 vers le nord de Bali. Paysages montagneux spectaculaires.', location: 'Route vers Sekumpul', type: 'transport' },
        { time: '09:30', title: 'Randonnée jusqu\'à la cascade', description: 'Descente de 45min à travers la jungle tropicale. 380 marches au milieu d\'une végétation luxuriante. Passage par un petit village et ses plantations de clous de girofle.', location: 'Sentier de Sekumpul', type: 'activite' },
        { time: '10:30', title: 'Cascade de Sekumpul', description: 'La plus belle cascade de Bali ! Deux chutes jumelles de 80m entourées de jungle. Baignade dans le bassin d\'eau fraîche. Photos spectaculaires garanties.', location: 'Cascade Sekumpul', type: 'visite', tip: 'Portez des chaussures d\'eau — le sentier traverse une rivière.' },
        { time: '12:30', title: 'Remontée et déjeuner local', description: 'Remontée par un sentier différent. Déjeuner chez l\'habitant : nasi ayam, soupe de maïs et beignets de banane.', location: 'Village de Sekumpul', type: 'repas' },
        { time: '14:30', title: 'Visite du temple Ulun Danu Bratan', description: 'Temple iconique flottant sur le lac Bratan, à 1200m d\'altitude. Architecture élégante entourée de montagnes brumeuses.', location: 'Lac Bratan, Bedugul', type: 'visite' },
        { time: '16:00', title: 'Marché traditionnel de Bedugul', description: 'Balade dans le marché aux épices et aux fruits tropicaux. Possibilité d\'acheter du café, de la vanille et des épices en souvenirs.', location: 'Marché de Bedugul', type: 'visite' },
        { time: '17:30', title: 'Retour au lodge & temps libre', description: 'Temps pour se doucher et se préparer pour la soirée spéciale.', location: 'Eco-lodge Tegallalang', type: 'temps-libre' },
        { time: '19:00', title: 'Dîner communautaire d\'adieu', description: 'Grand repas festif préparé ensemble avec la famille d\'hôtes. Megibung (repas partagé balinais) : babi guling (cochon rôti), canard fumé, sambal matah et desserts traditionnels. Discours d\'Amina et remise des cadeaux souvenirs.', location: 'Jardin de l\'écolodge', type: 'repas', tip: 'Soirée émouvante — préparez vos petits mots pour le groupe !' },
        { time: '21:30', title: 'Veillée sous les étoiles', description: 'Feu de camp, musique acoustique et échanges de souvenirs. Dernière soirée tous ensemble à Bali.', location: 'Jardin de l\'écolodge', type: 'activite' },
      ]},
      { day: 7, label: 'Brunch d\'adieu & transfert aéroport', activities: [
        { time: '08:00', title: 'Grasse matinée & check-out', description: 'Dernier réveil au son des oiseaux tropicaux. Préparation des bagages et libération des chambres à 10h.', location: 'Eco-lodge Tegallalang', type: 'hebergement' },
        { time: '09:30', title: 'Brunch d\'adieu', description: 'Dernier repas tous ensemble : crêpes balinaises, fruits frais, nasi goreng, smoothies et café. Échange de contacts et signature du livre d\'or du lodge.', location: 'Restaurant de l\'écolodge', type: 'repas' },
        { time: '11:00', title: 'Cérémonie de départ', description: 'Bénédiction de départ par la famille d\'hôtes. Remise de bracelets tressés en souvenir. Moment de gratitude et d\'au revoir.', location: 'Temple de l\'écolodge', type: 'visite' },
        { time: '11:30', title: 'Arrêt souvenir (optionnel)', description: 'Passage par une boutique d\'artisanat local certifié commerce équitable. Bijoux en argent, sculptures sur bois, tissus ikat.', location: 'Boutique Arta Sedana, Mas', type: 'activite' },
        { time: '12:30', title: 'Transfert vers l\'aéroport', description: 'Dernier trajet à travers Bali. Le guide Ketut vous accompagne jusqu\'au terminal. Sampai jumpa lagi — à bientôt !', location: 'Route vers l\'aéroport', type: 'transport' },
        { time: '14:00', title: 'Arrivée à l\'aéroport', description: 'Dépôt au terminal international. Assistance pour l\'enregistrement. Vol retour en soirée.', location: 'Aéroport Ngurah Rai', type: 'transport', tip: 'Gardez quelques roupies pour un dernier café balinais à l\'aéroport !' },
      ]},
    ],
    included: ['Vols A/R', 'Écolodge familial', 'Petit-déjeuners', 'Activités guidées', 'Guide francophone', 'Transferts', 'Assurance voyage'],
    groupSize: '15-20 personnes',
  },
  {
    id: 2,
    title: 'Santorin Secrète : Couchers de Soleil & Saveurs Égéennes',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    images: [
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200',
      'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=1200',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
    ],
    matchPercentage: 87,
    duration: '5j/4n',
    estimatedPrice: '1 180€',
    tags: ['Photographie', 'Gastronomie', 'Détente'],
    highlight: 'Budget idéal pour votre audience',
    departureDate: '22 août 2026',
    description: "Cinq jours sur l'île la plus photogénique des Cyclades. Des villages blancs suspendus au-dessus de la caldeira, des couchers de soleil légendaires à Oia, et une gastronomie méditerranéenne authentique. L'escapade parfaite entre détente et découverte. Séjour conçu pour minimiser l'empreinte carbone : vols compensés, déplacements en catamaran à voile, et hébergement chez l'habitant pour soutenir l'économie insulaire.",
    esgHighlights: [
      { icon: 'heart', label: '92% reversé aux locaux', detail: 'Hébergement chez l\'habitant & restaurateurs locaux' },
      { icon: 'leaf', label: 'Vols carbone compensés', detail: 'Compensation intégrale via Gold Standard' },
      { icon: 'globe', label: 'Transport doux privilégié', detail: 'Catamaran à voile & marche' },
    ],
    itinerary: [
      { day: 1, label: 'Arrivée à Fira, installation maison d\'hôtes & apéro en terrasse avec vue caldeira', activities: [
        { time: '12:00', title: 'Arrivée à l\'aéroport de Santorin', description: 'Accueil par Nikos, notre guide local, avec bouteille d\'eau fraîche et serviette rafraîchissante.', location: 'Aéroport JTR', type: 'transport' },
        { time: '12:30', title: 'Transfert vers Fira', description: 'Trajet de 20min avec vue panoramique sur la caldeira et les villages blancs perchés.', location: 'Route vers Fira', type: 'transport' },
        { time: '13:00', title: 'Installation à la maison d\'hôtes', description: 'Maison troglodyte traditionnelle creusée dans la roche volcanique. Chambres blanchies à la chaux avec terrasse privée et vue caldeira.', location: 'Maison d\'hôtes Caldera View', type: 'hebergement', tip: 'Votre terrasse est parfaite pour admirer le coucher de soleil ce soir !' },
        { time: '14:00', title: 'Déjeuner méditerranéen', description: 'Premier repas grec : salade Santorinienne (tomates cerises locales, câpres, fava), moussaka maison et tzatziki avec pain pita chaud.', location: 'Taverna Mama Thira', type: 'repas' },
        { time: '15:30', title: 'Balade dans Fira', description: 'Flânerie dans les ruelles de Fira : boutiques d\'artisanat, églises au dôme bleu, points de vue vertigineux sur la caldeira. Arrêt glace au mastic.', location: 'Centre de Fira', type: 'visite' },
        { time: '17:00', title: 'Visite du musée préhistorique', description: 'Découverte des fresques d\'Akrotiri, la "Pompéi grecque" ensevelie sous les cendres il y a 3600 ans. Collection fascinante.', location: 'Musée de la Préhistoire de Thera', type: 'visite' },
        { time: '18:30', title: 'Apéritif en terrasse', description: 'Cocktails signature face à la caldeira : Santorini Spritz (prosecco, liqueur de figue, orange amère) et mezze grecs. Vue imprenable sur le volcan.', location: 'Terrasse de la maison d\'hôtes', type: 'repas', tip: 'Premier coucher de soleil — le spectacle commence vers 20h en mai !' },
        { time: '20:30', title: 'Dîner au restaurant panoramique', description: 'Dîner en terrasse avec vue nocturne : poisson grillé du jour, poulpe au vinaigre balsamique et baklava au miel de thym. Vin assyrtiko local.', location: 'Restaurant Argo, Fira', type: 'repas' },
      ]},
      { day: 2, label: 'Randonnée Fira → Oia & shooting photo coucher de soleil', activities: [
        { time: '07:30', title: 'Petit-déjeuner grec', description: 'Yaourt grec au miel de thym et noix, omelette aux tomates séchées, pain aux olives et café frappé.', location: 'Maison d\'hôtes', type: 'repas' },
        { time: '08:30', title: 'Départ randonnée Fira → Oia', description: 'Début du sentier le plus emblématique de Santorin. 10km de marche le long du bord de la caldeira avec des vues à couper le souffle à chaque virage.', location: 'Sentier de la Caldeira', type: 'activite', tip: 'Portez de bonnes chaussures, chapeau et crème solaire. Emportez 1,5L d\'eau minimum.' },
        { time: '09:30', title: 'Passage par Imerovigli', description: 'Arrêt au point culminant de l\'île. Vue 360° sur la caldeira, le volcan et la mer Égée. Visite de l\'église Anastasi.', location: 'Imerovigli, Skaros Rock', type: 'visite' },
        { time: '11:00', title: 'Pause café à Firostefani', description: 'Halte dans un café avec la vue la plus photographiée de Santorin : les trois dômes bleus avec la caldeira en fond.', location: 'Café Galini, Firostefani', type: 'repas', tip: 'C\'est LE spot photo Instagram de Santorin — prenez votre temps !' },
        { time: '12:30', title: 'Arrivée à Oia', description: 'Fin de la randonnée dans le village le plus célèbre de l\'île. Ruelles labyrinthiques, maisons troglodytes et cascades de bougainvilliers.', location: 'Oia', type: 'visite' },
        { time: '13:00', title: 'Déjeuner à Ammoudi Bay', description: 'Descente des 300 marches jusqu\'au petit port de pêcheurs. Déjeuner les pieds presque dans l\'eau : crevettes saganaki, fèves fava et calamars frits.', location: 'Taverna Ammoudi, port d\'Oia', type: 'repas' },
        { time: '15:00', title: 'Temps libre dans Oia', description: 'Shopping dans les galeries d\'art et boutiques de bijoux. Visite des ruines du château vénitien. Glace pistache chez Lolita\'s.', location: 'Oia', type: 'temps-libre' },
        { time: '17:30', title: 'Shooting photo avec Amina', description: 'Session photo exclusive dans les plus beaux spots d\'Oia. Tips composition et lumière par Amina. Contenu pour vos réseaux garanti !', location: 'Spots photos d\'Oia', type: 'activite' },
        { time: '19:30', title: 'Coucher de soleil mythique', description: 'Installation au château d\'Oia pour LE coucher de soleil le plus célèbre du monde. Le ciel s\'embrase de rose, orange et pourpre. Applaudissements de la foule quand le soleil disparaît.', location: 'Château d\'Oia', type: 'visite', tip: 'Arrivez 1h en avance pour avoir la meilleure place. Moment inoubliable !' },
        { time: '20:30', title: 'Dîner romantique à Oia', description: 'Dîner aux chandelles dans un restaurant troglodyte. Agneau kleftiko (cuit 8h), salade de fèves et dessert katifi au miel.', location: 'Restaurant Sunset, Oia', type: 'repas' },
        { time: '22:00', title: 'Retour à Fira', description: 'Transfert en minibus. Arrivée vers 22h30.', location: 'Oia → Fira', type: 'transport' },
      ]},
      { day: 3, label: 'Croisière catamaran, plage rouge & snorkeling', activities: [
        { time: '07:30', title: 'Petit-déjeuner', description: 'Tiropita (feuilleté au fromage), fruits frais, yaourt et café grec.', location: 'Maison d\'hôtes', type: 'repas' },
        { time: '09:00', title: 'Embarquement sur le catamaran', description: 'Départ du port de Vlychada sur un catamaran à voile privé pour le groupe. Briefing sécurité et distribution du matériel de snorkeling.', location: 'Port de Vlychada', type: 'transport' },
        { time: '09:30', title: 'Navigation vers la plage Rouge', description: 'Approche par la mer de l\'impressionnante plage Rouge, avec ses falaises volcaniques rougeâtres. Baignade depuis le catamaran.', location: 'Red Beach', type: 'activite' },
        { time: '10:30', title: 'Snorkeling à White Beach', description: 'Arrêt snorkeling dans les eaux cristallines. Fonds marins volcaniques avec formations rocheuses uniques et poissons multicolores.', location: 'White Beach', type: 'activite', tip: 'Masques et tubas fournis. L\'eau est à 23°C en mai — parfaite !' },
        { time: '11:30', title: 'Sources chaudes volcaniques', description: 'Navigation vers les sources chaudes naturelles près de Nea Kameni (le volcan). Baignade dans les eaux sulfureuses jaune-orangé à 35°C. Sensation unique !', location: 'Sources chaudes, Nea Kameni', type: 'activite', tip: 'L\'eau sulfureuse peut tacher les maillots clairs — portez un maillot foncé !' },
        { time: '12:30', title: 'Barbecue sur le catamaran', description: 'Déjeuner frais préparé à bord : poisson grillé, salade grecque, pain pita, houmous et pastèque. Vin blanc assyrtiko servi frais.', location: 'En mer', type: 'repas' },
        { time: '14:00', title: 'Navigation & baignade en mer ouverte', description: 'Détente sur le filet du catamaran. Plongeons dans la mer Égée depuis le bateau. Musique grecque et ambiance festive.', location: 'Caldeira de Santorin', type: 'temps-libre' },
        { time: '15:30', title: 'Coucher de soleil en mer', description: 'Le catamaran se positionne face à la caldeira pour un sunset privé en mer. Champagne et mezzes servis. Vue unique sur les villages illuminés.', location: 'En mer, face à Oia', type: 'activite', tip: 'Un des moments les plus magiques du voyage — profitez !' },
        { time: '17:30', title: 'Retour au port', description: 'Débarquement à Vlychada. Transfert retour vers Fira.', location: 'Port de Vlychada', type: 'transport' },
        { time: '19:00', title: 'Temps libre & dîner libre', description: 'Soirée libre dans Fira. Recommandation d\'Amina : Ouzeri (bar à ouzo) pour une soirée grecque authentique avec mezze et musique live.', location: 'Fira', type: 'temps-libre' },
      ]},
      { day: 4, label: 'Dégustation vins volcaniques & cours de cuisine grecque', activities: [
        { time: '08:00', title: 'Petit-déjeuner tardif', description: 'Grasse matinée méritée. Strapatsada (œufs brouillés aux tomates), loukoumades (beignets au miel) et jus d\'orange pressé.', location: 'Maison d\'hôtes', type: 'repas' },
        { time: '09:30', title: 'Visite du site archéologique d\'Akrotiri', description: 'Exploration de la cité minoenne ensevelie sous les cendres en 1627 av. J-C. Rues pavées, fresques, système d\'égouts avancé. Un voyage dans le temps.', location: 'Site d\'Akrotiri', type: 'visite' },
        { time: '11:30', title: 'Route des vins — Domaine Sigalas', description: 'Premier arrêt : le domaine Sigalas, référence de l\'île. Dégustation de 4 vins (assyrtiko, nykteri, vinsanto) avec explication des vignes en "kouloura" (paniers) uniques à Santorin.', location: 'Domaine Sigalas, Oia', type: 'activite' },
        { time: '13:00', title: 'Déjeuner au domaine', description: 'Repas accord mets-vins : carpaccio de poulpe, fromage chloro grillé et tomates séchées de Santorin.', location: 'Domaine Sigalas', type: 'repas' },
        { time: '14:30', title: 'Deuxième domaine — Santo Wines', description: 'Visite des caves coopératives et dégustation panoramique sur la terrasse avec vue caldeira. Focus sur le Vinsanto, vin doux légendaire de l\'île.', location: 'Santo Wines, Pyrgos', type: 'activite', tip: 'Le Vinsanto se déguste en dessert — gardez cette bouteille en souvenir !' },
        { time: '16:00', title: 'Cours de cuisine grecque', description: 'Atelier de 2h30 chez Maria, cuisinière locale. Au programme : tomatokeftedes (beignets de tomates), fava santorinienne, salade d\'aubergines et loukoumades. Secrets de famille transmis avec passion.', location: 'Maison de Maria, Megalochori', type: 'activite' },
        { time: '18:30', title: 'Dégustation de vos créations', description: 'Repas festif avec tout le groupe autour des plats préparés. Accordé avec les vins achetés pendant la journée.', location: 'Maison de Maria', type: 'repas' },
        { time: '20:30', title: 'Balade nocturne dans Pyrgos', description: 'Le village médiéval le plus authentique de l\'île, illuminé par des bougies. Montée au kasteli (château) pour une vue nocturne à 360°.', location: 'Pyrgos', type: 'visite' },
        { time: '21:30', title: 'Retour à la maison d\'hôtes', description: 'Transfert retour. Dernière nuit à Santorin.', location: 'Fira', type: 'transport' },
      ]},
      { day: 5, label: 'Matinée libre & transfert aéroport', activities: [
        { time: '08:00', title: 'Dernier petit-déjeuner', description: 'Dernier festin : spanakopita, yaourt au miel, fruits et café. Échange des contacts et signature du livre d\'or.', location: 'Maison d\'hôtes', type: 'repas' },
        { time: '09:30', title: 'Matinée libre dans Fira', description: 'Dernières emplettes : bijoux en lave volcanique, produits cosmétiques au sel marin, huile d\'olive premium. Ou dernier café face à la caldeira.', location: 'Fira', type: 'temps-libre', tip: 'Recommandé : les boucles d\'oreilles en obsidienne chez Atlantis Jewelry.' },
        { time: '11:00', title: 'Photo de groupe finale', description: 'Rassemblement pour la photo officielle du groupe devant la caldeira. Distribution des cadeaux Sankofa (tirages photo du voyage).', location: 'Terrasse de la maison d\'hôtes', type: 'activite' },
        { time: '11:30', title: 'Check-out & au revoir', description: 'Au revoir à la famille d\'hôtes et à Nikos le guide. Émotion garantie !', location: 'Maison d\'hôtes', type: 'hebergement' },
        { time: '12:00', title: 'Transfert aéroport', description: 'Dernier trajet avec vue sur la caldeira. Arrivée à l\'aéroport 2h avant le vol.', location: 'Route vers l\'aéroport', type: 'transport' },
        { time: '14:00', title: 'Vol retour', description: 'Décollage avec des souvenirs plein la tête. Αντίο Σαντορίνη — Au revoir Santorin !', location: 'Aéroport JTR', type: 'transport', tip: 'Place côté hublot droite pour une dernière vue sur l\'île !' },
      ]},
    ],
    included: ['Vols A/R', 'Maison d\'hôtes locale', 'Petits-déjeuners', 'Croisière catamaran', 'Dégustation vins', 'Transferts'],
    groupSize: '12-16 personnes',
  },
  {
    id: 3,
    title: 'Tokyo Immersif : Néons, Traditions & Street Food',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200',
      'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=1200',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200',
    ],
    matchPercentage: 78,
    duration: '8j/7n',
    estimatedPrice: '1 890€',
    tags: ['Culture', 'Street Food', 'Artisanat'],
    highlight: 'Expérience unique & immersive',
    departureDate: '5 septembre 2026',
    description: "Huit jours entre tradition et modernité dans la capitale japonaise. De Shibuya à Asakusa, des izakayas cachés aux temples zen, plongez au cœur d'une culture fascinante. Street food tour, cérémonie du thé, et soirée karaoké inclus. Un itinéraire pensé slow travel : déplacements en train (JR Pass), nuits en ryokan familial, et chaque activité finance directement des artisans et restaurateurs indépendants.",
    esgHighlights: [
      { icon: 'heart', label: '88% reversé aux locaux', detail: 'Ryokans familiaux, artisans & izakayas' },
      { icon: 'leaf', label: 'Slow Travel certifié', detail: 'Zéro vol intérieur, 100% train' },
      { icon: 'globe', label: 'Bilan carbone minimal', detail: 'JR Pass = un des transports les plus verts au monde' },
    ],
    itinerary: [
      { day: 1, label: 'Arrivée à Narita, transfert Shinjuku & welcome dinner', activities: [
        { time: '15:00', title: 'Arrivée à l\'aéroport de Narita', description: 'Accueil par Yuki, notre guide bilingue, avec panneau Sankofa et pocket WiFi pour chacun.', location: 'Aéroport de Narita', type: 'transport' },
        { time: '16:00', title: 'Transfert en Narita Express', description: 'Train express vers Shinjuku (1h20). Premier aperçu de la banlieue tokyoïte par la fenêtre. Distribution des JR Pass et Suica cards.', location: 'Narita Express', type: 'transport', tip: 'Activez votre JR Pass au guichet JR à Narita avant de monter !' },
        { time: '17:30', title: 'Installation au ryokan', description: 'Check-in dans un ryokan traditionnel au cœur de Shinjuku. Chambres tatami avec futon, yukata (kimono léger) fourni. Explication des traditions japonaises.', location: 'Ryokan Shinjuku Kuyakusho-mae', type: 'hebergement' },
        { time: '18:30', title: 'Balade dans Shinjuku', description: 'Première immersion dans le quartier le plus animé de Tokyo : néons géants, Godzilla sur le toit du cinéma et ruelles de Golden Gai.', location: 'Shinjuku', type: 'visite' },
        { time: '19:30', title: 'Welcome dinner — Izakaya', description: 'Dîner de bienvenue dans un izakaya traditionnel : yakitori, edamame, karaage, gyoza, et bière Asahi bien fraîche. Kampai !', location: 'Izakaya Torikizoku, Shinjuku', type: 'repas' },
        { time: '21:30', title: 'Balade nocturne à Kabukicho', description: 'Découverte du quartier des divertissements illuminé de néons. Robot Restaurant, game centers et ambiance électrique. Retour libre au ryokan.', location: 'Kabukicho, Shinjuku', type: 'visite' },
      ]},
      { day: 2, label: 'Shibuya, Harajuku & culture pop japonaise', activities: [
        { time: '07:30', title: 'Petit-déjeuner japonais', description: 'Petit-déjeuner traditionnel au ryokan : riz, soupe miso, poisson grillé, tamagoyaki et tsukemono (pickles). Thé vert matcha.', location: 'Ryokan', type: 'repas' },
        { time: '09:00', title: 'Shibuya Crossing', description: 'Traversée du carrefour le plus célèbre du monde. Observation depuis le Starbucks du Tsutaya Building au 2ème étage. Photo de groupe au milieu du crossing.', location: 'Shibuya Crossing', type: 'visite', tip: 'Allez-y un dimanche matin pour 3000 personnes traversant simultanément !' },
        { time: '09:45', title: 'Statue d\'Hachiko & Shibuya Sky', description: 'Photo devant la statue du chien fidèle. Montée au Shibuya Sky (230m) pour une vue panoramique sur Tokyo et le Mont Fuji par temps clair.', location: 'Shibuya', type: 'visite' },
        { time: '11:00', title: 'Harajuku — Takeshita Street', description: 'Plongée dans la culture kawaii : boutiques de mode alternative, crépes géantes colorées, et looks excentriques. L\'épicentre de la pop culture japonaise.', location: 'Takeshita-dori, Harajuku', type: 'visite' },
        { time: '12:00', title: 'Déjeuner ramen', description: 'Initiation au ramen dans un restaurant spécialisé. Commande au distributeur automatique, slurping autorisé (et encouragé !). Tonkotsu, shoyu ou miso au choix.', location: 'Ichiran Ramen, Harajuku', type: 'repas', tip: 'Pensez à demander "kaedama" (supplément de nouilles) — c\'est moins cher que vous pensez !' },
        { time: '13:30', title: 'Meiji Jingu — sanctuaire shinto', description: 'Passage du torii géant en bois de cyprès et balade dans la forêt sacrée de 70 hectares en plein Tokyo. Atmosphère zen et apaisante.', location: 'Sanctuaire Meiji Jingu', type: 'visite' },
        { time: '15:00', title: 'Omotesando — architecture & shopping', description: 'La "Champs-Élysées de Tokyo" : bâtiments d\'architectes célèbres (Tadao Ando, Kengo Kuma), concept stores et cafés design.', location: 'Omotesando', type: 'visite' },
        { time: '16:30', title: 'Atelier culture pop', description: 'Session privée dans un studio de Harajuku : création de votre propre purikura (photomaton japonais) et essayage de costumes cosplay. Fou rire garanti !', location: 'Studio Harajuku', type: 'activite' },
        { time: '18:00', title: 'Sunset au Yoyogi Park', description: 'Détente dans le parc au coucher du soleil. Observation des musiciens de rue, danseurs rockabilly et groupes de cosplay.', location: 'Parc Yoyogi', type: 'temps-libre' },
        { time: '19:30', title: 'Dîner teppanyaki', description: 'Show culinaire devant vos yeux : le chef prépare bœuf wagyu, crevettes et légumes sur la plaque chauffante. Spectacle et saveurs.', location: 'Restaurant Katsura, Shibuya', type: 'repas' },
      ]},
      { day: 3, label: 'Temple Senso-ji, Akihabara & soirée izakaya', activities: [
        { time: '07:00', title: 'Petit-déjeuner au konbini', description: 'Expérience 100% japonaise : petit-déjeuner au konbini (7-Eleven). Onigiri, sandwich tamago, melon pan et café en canette. Étonnamment délicieux !', location: '7-Eleven, Shinjuku', type: 'repas', tip: 'Essayez l\'onigiri au saumon (sake) — le bestseller japonais !' },
        { time: '08:00', title: 'Senso-ji, le plus vieux temple de Tokyo', description: 'Arrivée matinale avant la foule. Passage sous la lanterne géante de Kaminarimon, allée Nakamise-dori (boutiques traditionnelles), tirage de fortune (omikuji).', location: 'Temple Senso-ji, Asakusa', type: 'visite' },
        { time: '09:30', title: 'Balade dans Asakusa', description: 'Quartier traditionnel : maisons en bois, artisans de couteaux et éventails. Montée au Asakusa Culture Tourist Information Center (archi Kengo Kuma) pour vue sur le Skytree.', location: 'Asakusa', type: 'visite' },
        { time: '10:30', title: 'Croisière sur la Sumida River', description: 'Bateau-mouche futuriste (design Leiji Matsumoto) jusqu\'à Odaiba. Vue unique sur les ponts et le skyline de Tokyo.', location: 'Sumida River', type: 'activite' },
        { time: '12:00', title: 'Déjeuner tempura', description: 'Dans un restaurant spécialisé depuis 1930 : tempura ultra-croustillant de crevettes, légumes de saison et tendon (bol de riz au tempura).', location: 'Tempura Daikokuya, Asakusa', type: 'repas' },
        { time: '13:30', title: 'Akihabara — quartier électrique', description: 'Immersion dans le paradis geek/otaku : magasins de mangas sur 6 étages, game centers rétro, figurines, et distributeurs automatiques improbables.', location: 'Akihabara', type: 'visite' },
        { time: '15:00', title: 'Maid Café (optionnel)', description: 'Expérience typiquement japonaise : service par des "maids" en costume, boissons décorées kawaii et danses de bienvenue. Décalé mais mémorable !', location: 'Maidreamin, Akihabara', type: 'activite' },
        { time: '16:00', title: 'Retro gaming & arcades', description: 'Session jeux d\'arcade dans un game center de 8 étages : Mario Kart, jeux de rythme, UFO catchers (machines à pinces). Compétition amicale du groupe !', location: 'Super Potato & Sega Building', type: 'activite' },
        { time: '18:00', title: 'Transfert vers Yurakucho', description: 'Train vers le quartier des salarymen pour une soirée authentique.', location: 'JR Line', type: 'transport' },
        { time: '18:30', title: 'Soirée izakaya sous les rails', description: 'Tournée des izakayas situés sous les arches du chemin de fer. Yakitori fumant, sake chaud, oden et ambiance populaire japonaise. Rencontres avec les habitués.', location: 'Yurakucho Gado-shita', type: 'repas', tip: 'Commandez le "nomihoudai" (boissons à volonté) — c\'est tradition !' },
      ]},
      { day: 4, label: 'Excursion Mont Fuji & onsen traditionnel', activities: [
        { time: '06:30', title: 'Départ matinal en train', description: 'JR Chuo Line jusqu\'à Otsuki puis Fujikyu Railway. Trajet panoramique de 2h30 avec vue progressive sur le Fuji-san.', location: 'Gare de Shinjuku', type: 'transport' },
        { time: '09:00', title: 'Arrivée à Kawaguchiko', description: 'Au bord du lac avec vue frontale sur le Mont Fuji (3776m). Photo iconique si le temps est dégagé — le Fuji joue souvent à cache-cache !', location: 'Lac Kawaguchiko', type: 'visite', tip: 'Le Fuji est plus souvent visible le matin — croisons les doigts !' },
        { time: '09:30', title: 'Tour du lac en vélo', description: 'Location de vélos électriques pour un tour partiel du lac (10km, facile). Arrêts aux meilleurs viewpoints et dans un jardin de lavande.', location: 'Bords du lac Kawaguchiko', type: 'activite' },
        { time: '11:30', title: 'Visite Chureito Pagoda', description: 'Montée des 398 marches pour atteindre la pagode rouge avec le Fuji en arrière-plan. La carte postale japonaise ultime.', location: 'Chureito Pagoda, Arakurayama', type: 'visite' },
        { time: '12:30', title: 'Déjeuner hoto', description: 'Spécialité régionale : hoto noodles — nouilles épaisses dans un bouillon miso avec légumes et potiron. Réconfortant et copieux.', location: 'Restaurant Houtou Fudou', type: 'repas' },
        { time: '14:00', title: 'Oshino Hakkai — village des sources', description: 'Huit bassins d\'eau cristalline alimentés par la fonte des neiges du Fuji. Maisons traditionnelles au toit de chaume et vue sur le volcan.', location: 'Oshino Hakkai', type: 'visite' },
        { time: '15:30', title: 'Onsen traditionnel', description: 'Bain thermal japonais avec vue sur le Mont Fuji. Explication des règles (se laver avant d\'entrer, pas de maillot). Moment de détente absolue.', location: 'Fujiyama Onsen', type: 'activite', tip: 'L\'onsen est non-mixte. Tatouages à couvrir avec un patch fourni.' },
        { time: '17:30', title: 'Retour vers Tokyo', description: 'Train retour vers Shinjuku. Repos mérité après une journée bien remplie.', location: 'Fujikyu Railway → JR Line', type: 'transport' },
        { time: '20:00', title: 'Dîner libre à Shinjuku', description: 'Soirée libre. Suggestion : Omoide Yokocho ("Piss Alley") pour des brochettes yakitori dans une ruelle de 1946, ou le quartier coréen de Shin-Okubo.', location: 'Shinjuku', type: 'repas' },
      ]},
      { day: 5, label: 'Tsukiji market, cours de sushi & quartier artisan de Yanesen', activities: [
        { time: '06:00', title: 'Marché extérieur de Tsukiji', description: 'Le ventre de Tokyo ! Stands de street food ouverts dès l\'aube : thon grillé, tamagoyaki géant, brochettes de poulpe, mochi frais et le meilleur sushi du monde.', location: 'Marché extérieur de Tsukiji', type: 'visite', tip: 'Venez l\'estomac vide — vous allez goûter à tout !' },
        { time: '08:00', title: 'Petit-déjeuner sushi', description: 'Sushi breakfast dans une échoppe du marché : nigiri de thon otoro (ventre gras), uni (oursin), ikura (œufs de saumon). Expérience unique au monde.', location: 'Sushi Dai, Tsukiji', type: 'repas' },
        { time: '09:30', title: 'Cours de sushi', description: 'Atelier de 2h avec un maître sushi-man. Apprentissage de la cuisson du riz, de la découpe du poisson et du façonnage des nigiri. Vous repartez avec votre plateau !', location: 'Tsukiji Cooking Studio', type: 'activite' },
        { time: '12:00', title: 'Dégustation de vos sushis', description: 'Déjeuner avec les sushis que vous avez préparés, complétés par une soupe miso et un dessert matcha.', location: 'Tsukiji Cooking Studio', type: 'repas' },
        { time: '13:30', title: 'Transfert vers Yanesen', description: 'Métro vers le quartier le plus traditionnel de Tokyo, épargné par les bombardements de 1945.', location: 'Tokyo Metro', type: 'transport' },
        { time: '14:00', title: 'Balade artisanale à Yanesen', description: 'Ruelles paisibles bordées de temples, échoppes d\'artisans et chats errants. Visite d\'un atelier de fabrication de tenugui (serviettes traditionnelles).', location: 'Yanaka, Nezu, Sendagi', type: 'visite' },
        { time: '15:30', title: 'Yanaka Ginza — la rue commerçante rétro', description: 'Petite rue commerçante d\'un autre temps : menchikatsu (croquettes de viande), senbei (crackers de riz) grillés devant vous, et sculptures de chats partout.', location: 'Yanaka Ginza', type: 'visite' },
        { time: '16:30', title: 'Cimetière de Yanaka & sunset spot', description: 'Balade paisible dans le cimetière historique bordé de cerisiers. Au coucher du soleil, vue sereine sur les toits de Tokyo.', location: 'Cimetière de Yanaka', type: 'visite' },
        { time: '18:00', title: 'Atelier calligraphie japonaise', description: 'Session privée avec un maître calligraphe. Apprentissage des kanjis de base au pinceau. Votre œuvre encadrée en souvenir.', location: 'Atelier Yanaka', type: 'activite' },
        { time: '19:30', title: 'Dîner kaiseki', description: 'Repas gastronomique japonais en 7 services. Art culinaire raffiné : chaque plat est une œuvre d\'art. Saison, texture et présentation impeccables.', location: 'Restaurant Hanagatami, Nezu', type: 'repas', tip: 'Le kaiseki est l\'expression ultime de la cuisine japonaise — savourez chaque bouchée.' },
      ]},
      { day: 6, label: 'Journée libre : Teamlab, balade à Shimokitazawa ou Meiji Jingu', activities: [
        { time: '08:00', title: 'Petit-déjeuner au choix', description: 'Petit-déjeuner libre au ryokan ou dans un kissaten (café rétro japonais). Recommandation : toast épais avec beurre et confiture de haricots rouges.', location: 'Ryokan ou kissaten', type: 'repas' },
        { time: '10:00', title: 'Option A — TeamLab Borderless', description: 'Musée d\'art numérique immersif : 60 œuvres interactives dans un labyrinthe sans frontières. Chutes d\'eau numériques, forêts de lumière et univers flottants. Comptez 3h minimum.', location: 'TeamLab Borderless, Azabudai Hills', type: 'activite', tip: 'Portez des vêtements clairs pour que les projections se reflètent sur vous !' },
        { time: '10:00', title: 'Option B — Shimokitazawa', description: 'Le quartier bohème de Tokyo : friperies vintage, cafés indépendants, disquaires vinyles et petits théâtres. Le "Marais de Tokyo" version cool.', location: 'Shimokitazawa', type: 'visite' },
        { time: '10:00', title: 'Option C — Journée zen', description: 'Jardin impérial de Shinjuku Gyoen (300 yen), suivi du sanctuaire Meiji Jingu en forêt. Après-midi onsen urbain au Thermae-yu Shinjuku.', location: 'Shinjuku Gyoen & Meiji Jingu', type: 'visite' },
        { time: '13:00', title: 'Déjeuner libre', description: 'Explorez par vous-même ! Suggestions : curry japonais chez CoCo Ichibanya, tonkatsu chez Maisen, ou ramen chez Fuunji.', location: 'Au choix', type: 'repas' },
        { time: '15:00', title: 'Temps libre / exploration', description: 'Continuez votre option ou découvrez un nouveau quartier. Possibilité de rejoindre Amina pour un live Instagram depuis Shibuya.', location: 'Tokyo', type: 'temps-libre' },
        { time: '18:00', title: 'Rassemblement — Tokyo Tower', description: 'Rendez-vous au pied de la Tokyo Tower (333m). Montée à l\'observatoire pour une vue nocturne spectaculaire sur la ville illuminée.', location: 'Tokyo Tower, Minato', type: 'visite' },
        { time: '19:30', title: 'Dîner shabu-shabu', description: 'Fondue japonaise : fines tranches de bœuf wagyu plongées dans un bouillon fumant, accompagnées de légumes, tofu et udon. Convivial et délicieux.', location: 'Restaurant Nabezo, Roppongi', type: 'repas' },
      ]},
      { day: 7, label: 'Quartier Yanaka, cérémonie du thé & karaoké', activities: [
        { time: '08:00', title: 'Petit-déjeuner au ryokan', description: 'Dernier petit-déjeuner traditionnel : grillé de saumon, natto (pour les courageux !), riz, miso et thé hojicha.', location: 'Ryokan', type: 'repas' },
        { time: '09:30', title: 'Jardin Rikugien', description: 'Un des plus beaux jardins de Tokyo, créé en 1702. Promenade autour du lac, ponts en arc et maison de thé traditionnelle. Sérénité absolue.', location: 'Jardin Rikugien, Bunkyo', type: 'visite' },
        { time: '11:00', title: 'Cérémonie du thé', description: 'Expérience privée dans une maison de thé authentique. Maître de thé en kimono, matcha fouetté au chasen et wagashi (pâtisserie). Explication de chaque geste ritualisé.', location: 'Maison de thé Rikugien', type: 'activite', tip: 'Asseyez-vous en seiza (genoux) si possible — des coussins sont disponibles.' },
        { time: '12:30', title: 'Déjeuner bento', description: 'Bento de luxe au jardin : compartiments laqués avec sashimi, tempura de saison, riz et tsukemono. L\'art du bento à son apogée.', location: 'Jardin Rikugien', type: 'repas' },
        { time: '14:00', title: 'Quartier de Koenji — vintage & underground', description: 'Alternative au Shibuya mainstream : friperies de kimonos vintage, bars jazz minuscules et street art. Le Tokyo authentique et décalé.', location: 'Koenji', type: 'visite' },
        { time: '16:00', title: 'Shopping à Nakano Broadway', description: 'Le rival souterrain d\'Akihabara : figurines rares, mangas vintage, montres et curiosités japonaises sur 4 étages.', location: 'Nakano Broadway', type: 'visite' },
        { time: '17:30', title: 'Retour au ryokan & préparation', description: 'Temps pour se préparer pour la dernière soirée. Mettez vos plus beaux yukata !', location: 'Ryokan', type: 'temps-libre' },
        { time: '19:00', title: 'Dîner d\'adieu — robatayaki', description: 'Restaurant de grillades au charbon de bois : brochettes de bœuf, champignons shiitake, asperges et foie gras grillé. Le chef crie les commandes comme dans un marché aux poissons.', location: 'Robatayaki Inakaya, Roppongi', type: 'repas' },
        { time: '21:00', title: 'Karaoké à Shinjuku', description: 'Soirée karaoké dans une salle privée (karaoke box) : chansons françaises, J-Pop et classiques internationaux. Tambourins et maracas fournis. Machine à boissons dans la salle.', location: 'Karaoke Kan, Shinjuku', type: 'activite', tip: 'C\'est le même bâtiment que dans "Lost in Translation" !' },
        { time: '23:30', title: 'Retour au ryokan', description: 'Dernière balade nocturne dans les ruelles de Golden Gai. Dernière nuit au Japon.', location: 'Shinjuku', type: 'transport' },
      ]},
      { day: 8, label: 'Dernier brunch & transfert aéroport', activities: [
        { time: '08:30', title: 'Grasse matinée & check-out', description: 'Dernier réveil au ryokan. Pliage des futons (tradition), préparation des bagages. Libération des chambres à 10h.', location: 'Ryokan', type: 'hebergement' },
        { time: '09:30', title: 'Brunch japonais d\'adieu', description: 'Brunch spécial : fluffy pancakes soufflés, matcha latte, fruits de saison et derniers onigiri. Échange de contacts, photos et accolades.', location: 'Bills Omotesando', type: 'repas' },
        { time: '11:00', title: 'Dernière balade — Shinjuku Gyoen', description: 'Promenade paisible dans le jardin impérial. Trois styles : français, anglais et japonais traditionnel. Un dernier moment de zen.', location: 'Shinjuku Gyoen', type: 'visite' },
        { time: '12:30', title: 'Shopping de dernière minute', description: 'Arrêt à Don Quijote (magasin discount ouvert 24h) pour les souvenirs : Kit-Kat matcha, snacks japonais, cosmétiques et gadgets.', location: 'Don Quijote, Shinjuku', type: 'activite', tip: 'Les Kit-Kat existent en 300+ parfums au Japon — ramenez-en plein !' },
        { time: '13:30', title: 'Transfert vers Narita', description: 'Narita Express depuis Shinjuku. Dernier trajet à travers Tokyo. Sayonara !', location: 'Narita Express', type: 'transport' },
        { time: '15:00', title: 'Arrivée à l\'aéroport', description: 'Arrivée à Narita. Yuki vous accompagne jusqu\'à l\'enregistrement. Derniers au revoir et photo de groupe au terminal.', location: 'Aéroport de Narita', type: 'transport', tip: 'Le duty free de Narita a d\'excellents whiskys japonais et wagashi !' },
      ]},
    ],
    included: ['Vols A/R', 'Ryokan traditionnel', 'Petits-déjeuners', 'JR Pass 7 jours', 'Guide bilingue', 'Activités', 'Transferts'],
    groupSize: '10-15 personnes',
  },
]

export const voyageInfosPratiques = {
  1: {
    rendezVous: {
      date: '17 mai 2026',
      heure: '06h30',
      lieu: 'Aéroport Paris-CDG, Terminal 2E, Porte K',
      details: 'Retrouvez Cynthia à côté du comptoir Air Asia avec un panneau Sankofa. Elle portera un t-shirt orange Sankofa.'
    },
    billets: {
      type: 'Vol',
      info: 'Vos billets d\'avion ont été envoyés par email le 12 mai. Pensez à les télécharger en avance.',
      compagnie: 'Air Asia — Vol AK 1847'
    },
    programme: [
      { jour: 1, titre: 'Arrivée & Installation', detail: 'Transfert écolodge en minibus. Accueil traditionnel et dîner de bienvenue avec la famille d\'hôtes.' },
      { jour: 2, titre: 'Temples d\'Uluwatu', detail: 'Départ 8h. Prévoir chaussures de marche et crème solaire. Cérémonie Kecak au coucher du soleil.' },
      { jour: 3, titre: 'Rizières & Cuisine', detail: 'Balade matinale dans les rizières de Tegallalang. Atelier cuisine balinaise l\'après-midi.' },
      { jour: 4, titre: 'Plongée Nusa Penida', detail: 'Départ 7h en bateau. Équipement fourni. Niveau débutant accepté. Raies manta au programme !' },
      { jour: 5, titre: 'Journée libre', detail: 'Balade à vélo dans les villages, surf ou exploration. Amina sera au café Revolver à 10h pour ceux qui veulent un moment ensemble.' },
      { jour: 6, titre: 'Cascade & Dîner', detail: 'Excursion cascade Sekumpul (prévoir maillot). Dîner communautaire surprise le soir.' },
      { jour: 7, titre: 'Départ', detail: 'Brunch d\'adieu à 9h. Transferts aéroport à partir de 12h.' },
    ],
    bagages: [
      'Maillot de bain (x2 minimum)',
      'Crème solaire indice 50',
      'Chaussures de marche légères',
      'Anti-moustiques',
      'Adaptateur prise universel',
      'Chapeau / casquette',
      'Tenue habillée pour le dîner du jour 6',
      'Appareil photo / GoPro (facultatif)',
    ],
    contactSurPlace: {
      nom: 'Cynthia Wulandari',
      role: 'Organisatrice locale Sankofa',
      telephone: '+62 812 3456 7890',
      disponibilite: 'Disponible 24h/24 pendant tout le séjour'
    },
    documentsNecessaires: [
      'Passeport valide 6 mois après retour',
      'Visa on arrival (payable sur place, ~35€)',
      'Assurance voyage (incluse dans le pack)',
      'Carnet de vaccination à jour',
    ],
    urgence: {
      numeroLocal: '112',
      labelNumeroLocal: 'Urgences (Indonésie)',
      police: '110',
      labelPolice: 'Police (Indonésie)',
      ambulance: '118',
      labelAmbulance: 'Ambulance (Indonésie)',
      ambassade: {
        nom: 'Ambassade de France en Indonésie',
        telephone: '+62 21 2355 7600',
      },
      sankofaHotline: '+33 1 80 00 00 00',
    },
  },
  2: {
    rendezVous: {
      date: '11 mai 2026',
      heure: '08h00',
      lieu: 'Gare de Lyon, Paris — Hall 1, devant le Relay',
      details: 'Maria vous attend avec les badges du groupe. Le train part à 09h12.'
    },
    billets: {
      type: 'Train + Vol',
      info: 'Billets de train Paris-Marseille envoyés par email. Vol Marseille-Santorin : check-in en ligne ouvert.',
      compagnie: 'SNCF TGV + Aegean Airlines'
    },
    programme: [
      { jour: 1, titre: 'Arrivée à Fira', detail: 'Installation à la maison d\'hôtes. Apéro en terrasse avec vue caldeira à 19h.' },
      { jour: 2, titre: 'Rando Fira → Oia', detail: 'Départ 9h, ~3h de marche. Prévoir eau et casquette. Shooting photo au sunset.' },
      { jour: 3, titre: 'Croisière catamaran', detail: 'Départ port 10h. Plage rouge, snorkeling, BBQ à bord. Retour 17h.' },
      { jour: 4, titre: 'Vins & Cuisine', detail: 'Visite domaine Santo Wines à 11h. Cours de cuisine grecque à 15h.' },
      { jour: 5, titre: 'Matinée libre & Départ', detail: 'Dernière baignade possible. Transfert aéroport à 14h.' },
    ],
    bagages: [
      'Maillot de bain',
      'Crème solaire indice 50',
      'Chaussures de marche (rando Fira-Oia)',
      'Tenue légère et élégante pour les soirées',
      'Lunettes de soleil',
      'Appareil photo',
    ],
    contactSurPlace: {
      nom: 'Maria Papadopoulos',
      role: 'Guide locale Sankofa',
      telephone: '+30 694 123 4567',
      disponibilite: 'Joignable de 8h à 22h'
    },
    documentsNecessaires: [
      'Carte d\'identité ou passeport',
      'Carte européenne d\'assurance maladie',
    ],
    urgence: {
      numeroLocal: '112',
      labelNumeroLocal: 'Urgences (Europe)',
      police: '100',
      labelPolice: 'Police (Grèce)',
      ambulance: '166',
      labelAmbulance: 'SAMU (Grèce)',
      ambassade: {
        nom: 'Ambassade de France en Grèce',
        telephone: '+30 210 339 1000',
      },
      sankofaHotline: '+33 1 80 00 00 00',
    },
  }
}

export const voyageMessages = {
  1: [
    {
      id: 0,
      date: '2026-05-20',
      heure: '21:30',
      message: 'RDV au port de Sanur à 7h pour la plongée ! Prenez vos maillots et votre crème solaire, ça va être magique 🤿🌊',
      epingle: true,
    },
    {
      id: 1,
      date: '2026-05-16',
      heure: '18:30',
      message: 'Le rendez-vous c\'est DEMAIN mes loulous !! Trop hâte de vous voir à CDG. Reposez-vous bien ce soir, on va vivre une semaine de dingue ensemble 🌴',
      epingle: false,
    },
    {
      id: 2,
      date: '2026-05-14',
      heure: '10:00',
      message: 'Petite update : pensez à télécharger vos billets d\'avion AVANT demain, ça évitera le stress à l\'aéroport. Bisous !',
      epingle: false,
    },
    {
      id: 3,
      date: '2026-05-12',
      heure: '14:15',
      message: 'J\'ai eu Cynthia au téléphone, elle a préparé une surprise pour le cocktail de bienvenue... Je ne dis rien de plus 😏',
      epingle: false,
    },
  ],
  2: [
    {
      id: 1,
      date: '2026-05-10',
      heure: '20:00',
      message: 'C\'EST DEMAIN LES AMIS !! On se retrouve Gare de Lyon à 8h. Maria est déjà sur place à Santorin et tout est prêt. J\'ai tellement hâte 🇬🇷',
      epingle: true,
    },
    {
      id: 2,
      date: '2026-05-09',
      heure: '11:30',
      message: 'N\'oubliez pas vos chaussures de marche pour la rando Fira-Oia, ça grimpe un peu mais la vue en vaut la peine !',
      epingle: false,
    },
  ],
}

export const additionalTrips = [
  {
    id: 101,
    title: 'Costa Rica Pura Vida : Volcans, Jungle & Plages Sauvages',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800',
    images: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200',
      'https://images.unsplash.com/photo-1518259102261-b57b7f219b11?w=1200',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200',
      'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200',
    ],
    matchPercentage: 82,
    duration: '9j/8n',
    estimatedPrice: '1 650€',
    tags: ['Aventure', 'Nature', 'Plage'],
    highlight: 'Biodiversité exceptionnelle',
    departureDate: '10 août 2026',
    description: "Neuf jours d'aventure au Costa Rica entre volcans fumants, forêts tropicales et plages du Pacifique. Tyrolienne au-dessus de la canopée, observation de paresseux, et couchers de soleil sur la plage de Manuel Antonio.",
    itinerary: [
      { day: 1, label: 'Arrivée à San José & transfert Arenal', activities: [
        { time: '14:00', title: 'Arrivée à l\'aéroport Juan Santamaría', description: 'Accueil par Carlos, guide naturaliste certifié, avec smoothie de fruits tropicaux frais.', location: 'Aéroport SJO, San José', type: 'transport' },
        { time: '15:00', title: 'Transfert vers Arenal', description: 'Route panoramique de 3h à travers la vallée centrale. Arrêt mirador avec vue sur les plantations de café.', location: 'Route vers La Fortuna', type: 'transport' },
        { time: '18:00', title: 'Installation à l\'éco-lodge', description: 'Check-in dans des cabanes en bois sur pilotis au milieu de la forêt tropicale. Vue directe sur le volcan Arenal.', location: 'Arenal Observatory Lodge', type: 'hebergement' },
        { time: '19:30', title: 'Dîner de bienvenue', description: 'Casado (plat national) : riz, haricots noirs, plantain frit, salade et poulet grillé. Jus de cas (goyave acide).', location: 'Restaurant du lodge', type: 'repas' },
      ]},
      { day: 2, label: 'Volcan Arenal, sources chaudes & ponts suspendus', activities: [
        { time: '06:00', title: 'Réveil avec les toucans', description: 'Café costaricain sur la terrasse avec observation des oiseaux : toucans, colibris et motmots.', location: 'Eco-lodge', type: 'repas' },
        { time: '07:30', title: 'Randonnée autour du volcan Arenal', description: 'Sentier de 3h à travers les coulées de lave de 1968. Forêt secondaire recolonisée, vues spectaculaires sur le cône parfait du volcan.', location: 'Parc national Arenal', type: 'activite' },
        { time: '11:00', title: 'Ponts suspendus d\'Arenal', description: 'Parcours de 3km sur 15 ponts suspendus au-dessus de la canopée. Jusqu\'à 60m de hauteur ! Observation de singes hurleurs et paresseux.', location: 'Mistico Hanging Bridges', type: 'activite', tip: 'Jumelles fournies — les paresseux sont souvent dans les cécropias !' },
        { time: '12:30', title: 'Déjeuner dans la forêt', description: 'Repas au restaurant du parc : tilapia grillé, patacones (plantain écrasé) et salade de palmito.', location: 'Restaurant Mistico', type: 'repas' },
        { time: '14:00', title: 'Cascade La Fortuna', description: 'Descente de 500 marches dans la jungle pour atteindre une cascade de 70m. Baignade dans le bassin d\'eau émeraude.', location: 'Cascade La Fortuna', type: 'activite' },
        { time: '16:30', title: 'Sources chaudes volcaniques', description: 'Détente dans les sources chaudes naturelles de Tabacón. Piscines à différentes températures (28°C à 42°C) entourées de jardins tropicaux.', location: 'Tabacón Hot Springs', type: 'activite', tip: 'Les sources sont chauffées naturellement par le volcan — pure magie !' },
        { time: '19:00', title: 'Dîner aux sources chaudes', description: 'Buffet tropical sous les étoiles : ceviche, arroz con pollo, empanadas et tres leches en dessert.', location: 'Tabacón Resort', type: 'repas' },
      ]},
      { day: 3, label: 'Tyrolienne canopée & rafting Rio Pacuare', activities: [
        { time: '05:30', title: 'Petit-déjeuner énergétique', description: 'Gallo pinto (riz aux haricots), œufs brouillés, tortillas et café noir corsé. Prenez des forces !', location: 'Eco-lodge', type: 'repas' },
        { time: '06:30', title: 'Tyrolienne au-dessus de la canopée', description: '12 câbles dont le plus long fait 750m ! Vol à travers la canopée à 100m du sol. Sensations fortes et vues incroyables sur la vallée.', location: 'Sky Adventures Arenal', type: 'activite', tip: 'Adrénaline garantie — fermez les yeux si besoin sur le premier câble !' },
        { time: '09:00', title: 'Transfert vers le Rio Pacuare', description: 'Route d\'1h30 vers l\'un des 5 plus beaux fleuves de rafting au monde.', location: 'Route vers Turrialba', type: 'transport' },
        { time: '10:30', title: 'Briefing rafting & équipement', description: 'Équipement complet fourni. Briefing sécurité avec les guides certifiés. Répartition en rafts de 6 personnes.', location: 'Base du Rio Pacuare', type: 'activite' },
        { time: '11:00', title: 'Rafting classe III-IV', description: '25km de descente à travers un canyon spectaculaire. Rapides intenses, passages calmes avec toucans et singes sur les berges. Nature brute et sauvage.', location: 'Rio Pacuare', type: 'activite' },
        { time: '13:00', title: 'Pique-nique au bord du fleuve', description: 'Pause déjeuner sur une plage de galets : sandwichs, fruits tropicaux et jus frais. Les pieds dans l\'eau.', location: 'Plage du Rio Pacuare', type: 'repas' },
        { time: '14:00', title: 'Deuxième partie du rafting', description: 'Continuation avec des rapides plus intenses. Passage sous une cascade et dans un canyon étroit. Finish épique !', location: 'Rio Pacuare', type: 'activite' },
        { time: '16:00', title: 'Retour au lodge & détente', description: 'Transfert retour. Douche chaude méritée et temps libre au lodge.', location: 'Eco-lodge', type: 'temps-libre' },
        { time: '19:00', title: 'Dîner BBQ costaricain', description: 'Barbecue en plein air : churrascos (steaks grillés), chorizo, élotes (maïs grillé) et chifrijo. Bières Imperial et guaro sour.', location: 'Terrasse du lodge', type: 'repas' },
      ]},
      { day: 4, label: 'Transfert Monteverde & réserve biologique', activities: [
        { time: '07:00', title: 'Petit-déjeuner & check-out', description: 'Dernier petit-déjeuner à Arenal. Préparation des bagages pour Monteverde.', location: 'Eco-lodge Arenal', type: 'repas' },
        { time: '08:30', title: 'Transfert lac Arenal → Monteverde', description: 'Trajet spectaculaire contournant le lac Arenal. Traversée en bateau-taxi puis route sinueuse dans la forêt de nuages.', location: 'Lac Arenal → Monteverde', type: 'transport' },
        { time: '12:00', title: 'Installation à Monteverde', description: 'Arrivée dans la forêt de nuages à 1400m d\'altitude. Lodge écologique avec vue sur la canopée.', location: 'Monteverde Lodge', type: 'hebergement' },
        { time: '12:30', title: 'Déjeuner au lodge', description: 'Soupe de legumes tropicaux, poulet en sauce caraïbe et flan de coco.', location: 'Monteverde Lodge', type: 'repas' },
        { time: '14:00', title: 'Réserve biologique de Monteverde', description: 'Randonnée guidée de 3h dans la forêt de nuages. Biodiversité hallucinante : quetzal resplendissant, grenouilles aux yeux rouges, orchidées miniatures.', location: 'Réserve de Monteverde', type: 'activite', tip: 'Le quetzal est l\'oiseau le plus recherché — Carlos sait où le trouver !' },
        { time: '17:00', title: 'Visite du jardin de colibris', description: '30 espèces de colibris virevoltent autour de vous. Photos macro exceptionnelles. Moment hypnotisant.', location: 'Hummingbird Gallery', type: 'visite' },
        { time: '18:30', title: 'Tour nocturne en forêt', description: 'Balade guidée avec lampes frontales. Découverte des animaux nocturnes : kinkajous, grenouilles, serpents et insectes bioluminescents.', location: 'Réserve de Monteverde', type: 'activite' },
        { time: '20:00', title: 'Dîner au lodge', description: 'Cuisine fusion tico : filet de poisson en sauce passion, riz au coco et tarte aux fruits tropicaux.', location: 'Monteverde Lodge', type: 'repas' },
      ]},
      { day: 5, label: 'Observation faune & café plantation tour', activities: [
        { time: '05:30', title: 'Observation d\'oiseaux à l\'aube', description: 'Sortie optionnelle avec Carlos pour observer les oiseaux au lever du soleil. Meilleur moment pour apercevoir le quetzal.', location: 'Sentiers de Monteverde', type: 'activite' },
        { time: '07:30', title: 'Petit-déjeuner', description: 'Gallo pinto, pain maison, confiture de goyave et café de Monteverde fraîchement torréfié.', location: 'Monteverde Lodge', type: 'repas' },
        { time: '09:00', title: 'Visite d\'une plantation de café', description: 'Tour complet "du grain à la tasse" : récolte, fermentation, séchage, torréfaction. Dégustation de 5 crus avec explication des arômes.', location: 'Don Juan Coffee Tour', type: 'activite' },
        { time: '11:30', title: 'Atelier chocolat artisanal', description: 'De la cabosse à la tablette : fabrication de chocolat à partir de cacao biologique local. Vous repartez avec votre propre tablette !', location: 'Chocolaterie Don Juan', type: 'activite' },
        { time: '12:30', title: 'Déjeuner fermier', description: 'Repas chez l\'habitant : casado traditionnel avec ingrédients du jardin. Simplicité et authenticité.', location: 'Ferme locale', type: 'repas' },
        { time: '14:30', title: 'Sanctuaire de paresseux', description: 'Visite du refuge pour paresseux. Observation à quelques mètres de ces animaux adorables. Explication de leur biologie fascinante.', location: 'Sloth Sanctuary Monteverde', type: 'visite', tip: 'Pas de flash photo — les paresseux sont sensibles à la lumière !' },
        { time: '16:00', title: 'Temps libre', description: 'Hamacs, lecture, balade libre ou shopping d\'artisanat au village de Santa Elena.', location: 'Monteverde', type: 'temps-libre' },
        { time: '19:00', title: 'Dîner d\'adieu Monteverde', description: 'Repas festif avec musique live costaricaine. Spécialités : olla de carne (pot-au-feu tico), rice and beans caribéens et glace au café maison.', location: 'Restaurant Morpho, Santa Elena', type: 'repas' },
      ]},
      { day: 6, label: 'Route vers Manuel Antonio, plage & détente', activities: [
        { time: '07:00', title: 'Petit-déjeuner & départ', description: 'Petit-déjeuner rapide et départ vers la côte Pacifique. Adieu forêt de nuages !', location: 'Monteverde Lodge', type: 'repas' },
        { time: '07:30', title: 'Transfert vers Manuel Antonio', description: 'Route de 4h descendant des montagnes vers l\'océan. Paysage changeant : forêt de nuages → vallée → côte tropicale.', location: 'Route vers Manuel Antonio', type: 'transport' },
        { time: '11:30', title: 'Arrivée & installation', description: 'Check-in dans un hôtel face à l\'océan Pacifique. Chambres avec balcon et vue sur la jungle.', location: 'Hotel Si Como No', type: 'hebergement' },
        { time: '12:30', title: 'Déjeuner face à l\'océan', description: 'Ceviche de poisson frais, tacos de crevettes et agua de sapo (boisson au gingembre et citron vert).', location: 'Restaurant El Avión', type: 'repas' },
        { time: '14:00', title: 'Après-midi plage', description: 'Détente sur la plage d\'Espadilla. Sable blanc, eau chaude (28°C), vagues douces. Singes capucins sur la plage !', location: 'Playa Espadilla', type: 'temps-libre' },
        { time: '17:00', title: 'Coucher de soleil Pacifique', description: 'Cocktails pieds dans le sable au coucher du soleil. Le ciel s\'embrase de rose et orange au-dessus du Pacifique.', location: 'Playa Espadilla', type: 'activite', tip: 'Les couchers de soleil du Pacifique sont parmi les plus beaux au monde !' },
        { time: '19:00', title: 'Dîner fruits de mer', description: 'Langoustines grillées, pargo rojo (vivaneau rouge) et arroz con mariscos. Le tout arrosé de vin chilien.', location: 'Restaurant Agua Azul', type: 'repas' },
      ]},
      { day: 7, label: 'Parc national Manuel Antonio & snorkeling', activities: [
        { time: '06:30', title: 'Petit-déjeuner early bird', description: 'Départ tôt pour éviter la foule au parc. Fruits, granola et café à emporter.', location: 'Hôtel', type: 'repas' },
        { time: '07:00', title: 'Parc national Manuel Antonio', description: 'Randonnée guidée de 3h. L\'un des parcs les plus biodiversifiés au monde : singes capucins, iguanes, ratons laveurs, toucans et paresseux. Sentiers faciles à travers la jungle.', location: 'Parc national Manuel Antonio', type: 'activite' },
        { time: '10:00', title: 'Plage du parc national', description: 'Baignade dans les eaux turquoise de Playa Manuel Antonio. Cadre paradisiaque entouré de jungle. Singes viennent parfois voler les snacks !', location: 'Playa Manuel Antonio', type: 'temps-libre', tip: 'Ne laissez rien sans surveillance — les singes capucins sont malins !' },
        { time: '12:00', title: 'Déjeuner au parc', description: 'Pique-nique préparé par l\'hôtel : wraps de poulet, fruits tropicaux et barres énergétiques.', location: 'Parc national', type: 'repas' },
        { time: '13:30', title: 'Snorkeling à Biesanz Beach', description: 'Bateau vers cette plage secrète accessible uniquement par mer. Eaux calmes parfaites pour le snorkeling : poissons tropicaux, étoiles de mer et raies.', location: 'Playa Biesanz', type: 'activite' },
        { time: '16:00', title: 'Retour & détente piscine', description: 'Après-midi libre à l\'hôtel. Piscine à débordement avec vue sur la jungle, ou spa.', location: 'Hôtel', type: 'temps-libre' },
        { time: '19:00', title: 'Dîner sur la plage', description: 'BBQ privé sur la plage : langoustines, poulet jerk, maïs grillé et s\'mores au feu de camp. Musique reggae.', location: 'Plage privée', type: 'repas' },
      ]},
      { day: 8, label: 'Surf, kayak mangrove & dîner de groupe', activities: [
        { time: '07:00', title: 'Cours de surf', description: 'Session de 2h avec moniteur certifié sur la plage d\'Espadilla. Tous niveaux. Eau chaude, vagues régulières — conditions idéales pour débuter.', location: 'Playa Espadilla', type: 'activite' },
        { time: '09:30', title: 'Petit-déjeuner tardif', description: 'Smoothie bowl tropical, pancakes à la banane et café. Brunch post-surf mérité.', location: 'Café Milagro', type: 'repas' },
        { time: '11:00', title: 'Kayak dans la mangrove', description: 'Excursion en kayak de 2h dans les mangroves d\'Isla Damas. Observation de crocodiles, hérons et singes-écureuils. Guide naturaliste.', location: 'Mangrove Isla Damas', type: 'activite' },
        { time: '13:00', title: 'Déjeuner local', description: 'Soda typique (petit restaurant familial) : casado du jour avec vue sur les mangroves.', location: 'Soda local, Quepos', type: 'repas' },
        { time: '15:00', title: 'Temps libre & dernières emplettes', description: 'Shopping de souvenirs au marché de Quepos : café, chocolat, sauce Lizano et artisanat local.', location: 'Quepos', type: 'temps-libre' },
        { time: '17:30', title: 'Session photo de groupe sur la plage', description: 'Shooting final avec Amina sur la plage au coucher du soleil. Souvenirs pour la vie !', location: 'Playa Espadilla', type: 'activite' },
        { time: '19:00', title: 'Grand dîner d\'adieu', description: 'Banquet de groupe au restaurant El Avión (dans un avion cargo C-123 reconverti !). Menu dégustation tico. Discours, souvenirs et émotions.', location: 'Restaurant El Avión', type: 'repas', tip: 'Restaurant dans un vrai avion de la CIA — histoire fascinante !' },
      ]},
      { day: 9, label: 'Brunch tropical & transfert aéroport', activities: [
        { time: '08:00', title: 'Grasse matinée & check-out', description: 'Dernière grasse matinée au Costa Rica. Préparation des bagages.', location: 'Hôtel', type: 'hebergement' },
        { time: '09:30', title: 'Brunch tropical d\'adieu', description: 'Dernier festin : casado, fruits exotiques (rambutan, carambole, maracuja), pancakes coco et café. Pura Vida !', location: 'Restaurant de l\'hôtel', type: 'repas' },
        { time: '11:00', title: 'Transfert vers San José', description: 'Route de 3h30 vers l\'aéroport. Arrêt au mirador de Cerro de la Muerte pour une dernière vue panoramique.', location: 'Route vers San José', type: 'transport' },
        { time: '14:30', title: 'Arrivée à l\'aéroport', description: 'Arrivée à SJO. Au revoir Carlos et Pura Vida !', location: 'Aéroport SJO', type: 'transport' },
      ]},
    ],
    included: ['Vols A/R', 'Éco-lodges', 'Tous les repas', 'Activités aventure', 'Guide naturaliste', 'Transferts 4x4'],
    groupSize: '12-18 personnes',
  },
  {
    id: 102,
    title: 'Islande Boréale : Glaciers, Geysers & Aurores',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800',
    images: [
      'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200',
      'https://images.unsplash.com/photo-1520769669658-f07657e5b307?w=1200',
      'https://images.unsplash.com/photo-1509225770129-c886c6b4ea65?w=1200',
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=1200',
    ],
    matchPercentage: 75,
    duration: '6j/5n',
    estimatedPrice: '2 100€',
    tags: ['Nature', 'Photographie', 'Aventure'],
    highlight: 'Paysages à couper le souffle',
    departureDate: '18 septembre 2026',
    description: "Six jours sur la terre de glace et de feu. Le Cercle d'Or, les plages de sable noir, la lagune glaciaire de Jökulsárlón et la chasse aux aurores boréales. Une aventure photographique inoubliable.",
    itinerary: [
      { day: 1, label: 'Arrivée Reykjavik, Blue Lagoon & dîner islandais', activities: [
        { time: '11:00', title: 'Arrivée à l\'aéroport de Keflavík', description: 'Accueil par Björk (oui, comme la chanteuse !), photographe et guide locale.', location: 'Aéroport de Keflavík', type: 'transport' },
        { time: '11:30', title: 'Blue Lagoon', description: 'Bain géothermique à 38°C dans les eaux bleu laiteux riches en silice et minéraux. Masque de boue inclus. Paysage lunaire de lave noire tout autour.', location: 'Blue Lagoon', type: 'activite', tip: 'Mettez beaucoup d\'après-shampooing — la silice assèche les cheveux !' },
        { time: '14:00', title: 'Déjeuner au Blue Lagoon', description: 'Restaurant Lava : soupe de homard islandais, saumon arctique et skyr (yaourt islandais) aux myrtilles sauvages.', location: 'Blue Lagoon Restaurant', type: 'repas' },
        { time: '15:30', title: 'Transfert vers Reykjavik', description: 'Route de 45min à travers les champs de lave recouverts de mousse verte fluorescente.', location: 'Route vers Reykjavik', type: 'transport' },
        { time: '16:30', title: 'Installation & balade dans Reykjavik', description: 'Check-in à la guesthouse. Balade dans le centre : Hallgrímskirkja (église futuriste), street art coloré et maisons en tôle ondulée.', location: 'Centre de Reykjavik', type: 'visite' },
        { time: '19:00', title: 'Dîner islandais traditionnel', description: 'Repas dans un restaurant historique : soupe d\'agneau, poisson séché (harðfiskur), agneau fumé et rúgbrauð (pain de seigle cuit par géothermie).', location: 'Restaurant Grillið', type: 'repas' },
      ]},
      { day: 2, label: 'Cercle d\'Or : Geysir, Gullfoss & Þingvellir', activities: [
        { time: '07:00', title: 'Petit-déjeuner islandais', description: 'Harðfiskur au beurre, skyr, pain de seigle, saumon fumé et café. Robuste pour affronter le froid !', location: 'Guesthouse', type: 'repas' },
        { time: '08:00', title: 'Départ vers le Cercle d\'Or', description: 'Route en 4x4 vers le circuit touristique le plus célèbre d\'Islande.', location: 'Route 36', type: 'transport' },
        { time: '09:00', title: 'Parc national de Þingvellir', description: 'Site UNESCO où les plaques tectoniques américaine et eurasienne se séparent. Ancien parlement viking (930 ap. J-C). Faille d\'Almannagjá spectaculaire.', location: 'Þingvellir', type: 'visite' },
        { time: '10:30', title: 'Snorkeling Silfra (optionnel)', description: 'Plongée entre les deux plaques tectoniques dans une eau à 2°C d\'une clarté irréelle (visibilité 100m). Combinaison étanche fournie.', location: 'Faille de Silfra', type: 'activite', tip: 'L\'eau est glaciale mais la combinaison vous garde au sec. Visibilité incroyable !' },
        { time: '12:00', title: 'Zone géothermique de Geysir', description: 'Observation de Strokkur qui jaillit toutes les 5-8 minutes à 30m de hauteur. Mares de boue bouillonnantes et fumerolles. Odeur de soufre garantie.', location: 'Geysir', type: 'visite' },
        { time: '13:00', title: 'Déjeuner au Geysir Center', description: 'Soupe d\'agneau islandaise dans un bol de pain, fish & chips arctique et bière Viking.', location: 'Geysir Center', type: 'repas' },
        { time: '14:30', title: 'Cascade Gullfoss', description: 'La "Chute d\'Or" : double cascade de 32m s\'engouffrant dans un canyon. Puissance brute et bruine permanente. Arc-en-ciel fréquent par beau temps.', location: 'Gullfoss', type: 'visite', tip: 'Imperméable indispensable — vous serez trempé par les embruns !' },
        { time: '16:00', title: 'Cratère de Kerið', description: 'Cratère volcanique de 3000 ans rempli d\'un lac turquoise. Descente facile dans le cratère. Couleurs surréalistes.', location: 'Cratère de Kerið', type: 'visite' },
        { time: '18:00', title: 'Retour à Reykjavik', description: 'Route retour avec arrêt à la source chaude Secret Lagoon pour un bain au coucher du soleil.', location: 'Flúðir → Reykjavik', type: 'transport' },
        { time: '20:00', title: 'Dîner libre', description: 'Suggestion : hot-dog islandais chez Bæjarins Beztu (le "meilleur hot-dog du monde" selon Bill Clinton) puis bar à bière sur Laugavegur.', location: 'Reykjavik', type: 'repas' },
      ]},
      { day: 3, label: 'Côte sud : cascades Seljalandsfoss & Skógafoss', activities: [
        { time: '07:00', title: 'Petit-déjeuner & départ', description: 'Petit-déjeuner rapide et départ tôt pour la côte sud. Longue journée en perspective !', location: 'Guesthouse', type: 'repas' },
        { time: '09:00', title: 'Cascade Seljalandsfoss', description: 'Cascade de 60m avec un sentier qui passe DERRIÈRE le rideau d\'eau. Sensation unique de se retrouver dans une caverne d\'eau.', location: 'Seljalandsfoss', type: 'visite', tip: 'Imperméable et chaussures waterproof obligatoires !' },
        { time: '10:00', title: 'Gljúfrabúi — la cascade cachée', description: 'À 5min à pied, cascade secrète cachée dans une grotte. Il faut traverser une rivière pour y accéder. Magique et peu connue.', location: 'Gljúfrabúi', type: 'visite' },
        { time: '11:30', title: 'Cascade Skógafoss', description: 'Mur d\'eau de 60m de large tombant de 25m. Montée des 527 marches pour une vue plongeante depuis le sommet. Panorama sur la côte sud.', location: 'Skógafoss', type: 'visite' },
        { time: '12:30', title: 'Déjeuner au Skógar Museum', description: 'Repas au musée folk : soupe de poisson, pain maison et gâteau aux carottes. Visite rapide des maisons en tourbe traditionnelles.', location: 'Skógar Museum', type: 'repas' },
        { time: '14:00', title: 'Randonnée canyon Fjaðrárgljúfur', description: 'Canyon de 100m de profondeur sculpté par l\'eau pendant 9000 ans. Sentier sur la crête avec vues plongeantes. Paysage extraterrestre.', location: 'Canyon Fjaðrárgljúfur', type: 'activite' },
        { time: '16:00', title: 'Village de Vík & point de vue Dyrhólaey', description: 'Arrêt au village le plus méridional d\'Islande. Montée à l\'arche naturelle de Dyrhólaey avec vue sur les colonnes de basalte et les macareux (en saison).', location: 'Vík í Mýrdal', type: 'visite' },
        { time: '18:00', title: 'Installation guesthouse côte sud', description: 'Check-in dans une guesthouse rurale. Ambiance cosy avec vue sur les glaciers au loin.', location: 'Guesthouse Vík', type: 'hebergement' },
        { time: '19:30', title: 'Dîner à Vík', description: 'Agneau islandais rôti lentement, purée de rutabaga et tarte aux baies sauvages. Le meilleur agneau du monde !', location: 'Sudur-Vík Restaurant', type: 'repas' },
      ]},
      { day: 4, label: 'Plage noire Reynisfjara & lagune Jökulsárlón', activities: [
        { time: '07:00', title: 'Petit-déjeuner', description: 'Petit-déjeuner copieux pour la route : pancakes, saumon, fromage et café.', location: 'Guesthouse', type: 'repas' },
        { time: '08:00', title: 'Plage noire de Reynisfjara', description: 'Plage de sable volcanique noir comme du charbon. Colonnes de basalte hexagonales (Hálsanefshellir), stacks en mer et vagues puissantes de l\'Atlantique.', location: 'Reynisfjara', type: 'visite', tip: 'DANGER : ne tournez JAMAIS le dos aux vagues — les sneaker waves sont mortelles !' },
        { time: '09:30', title: 'Route vers Jökulsárlón', description: 'Route spectaculaire de 2h30 longeant les glaciers Mýrdalsjökull et Vatnajökull (le plus grand d\'Europe). Paysages de sable noir à perte de vue.', location: 'Route 1', type: 'transport' },
        { time: '12:00', title: 'Lagune glaciaire Jökulsárlón', description: 'Lac parsemé d\'icebergs bleus, blancs et noirs dérivant lentement vers la mer. Phoques nageant entre les glaces. Ambiance irréelle, presque arctique.', location: 'Jökulsárlón', type: 'visite' },
        { time: '12:30', title: 'Tour en bateau amphibie', description: 'Navigation entre les icebergs géants. Dégustation de glace millénaire prélevée dans le lac. Moment surréaliste.', location: 'Lagune Jökulsárlón', type: 'activite' },
        { time: '13:30', title: 'Déjeuner & Diamond Beach', description: 'Pique-nique face à Diamond Beach : fragments d\'icebergs échoués sur le sable noir, brillant comme des diamants au soleil.', location: 'Diamond Beach', type: 'repas' },
        { time: '15:00', title: 'Session photo Diamond Beach', description: 'Atelier photo avec Björk : techniques de composition avec les icebergs. Lumière unique de l\'après-midi islandais.', location: 'Diamond Beach', type: 'activite' },
        { time: '17:00', title: 'Retour partiel & installation', description: 'Route retour vers la guesthouse. Paysages dorés par le soleil rasant.', location: 'Route 1', type: 'transport' },
        { time: '19:00', title: 'Dîner & soirée aurores boréales', description: 'Dîner au lodge puis veille d\'aurores boréales avec chocolat chaud. Si les conditions sont favorables, spectacle inoubliable de vert, violet et rose dans le ciel.', location: 'Guesthouse', type: 'repas', tip: 'Prévisions aurores sur vedur.is — patience et couvertures chaudes !' },
      ]},
      { day: 5, label: 'Randonnée glacier & chasse aurores boréales', activities: [
        { time: '07:00', title: 'Petit-déjeuner', description: 'Petit-déjeuner complet pour se préparer à la rando glacier.', location: 'Guesthouse', type: 'repas' },
        { time: '08:30', title: 'Randonnée sur glacier Sólheimajökull', description: 'Équipement complet fourni : crampons, piolet, harnais, casque. Marche de 3h sur la langue glaciaire avec un guide certifié. Crevasses bleues, moulins glaciaires et panoramas extraordinaires.', location: 'Glacier Sólheimajökull', type: 'activite', tip: 'Couches chaudes, gants imperméables et lunettes de soleil indispensables !' },
        { time: '12:00', title: 'Déjeuner au pied du glacier', description: 'Repas chaud réconfortant : soupe et sandwichs au bord du lac proglaciaire.', location: 'Base Sólheimajökull', type: 'repas' },
        { time: '13:30', title: 'Épave d\'avion DC-3', description: 'Marche de 4km sur une plaine de sable noir jusqu\'à l\'épave d\'un avion de l\'US Navy crashé en 1973. Spot photo iconique et atmosphère post-apocalyptique.', location: 'Sólheimasandur', type: 'visite' },
        { time: '16:00', title: 'Retour vers Reykjavik', description: 'Longue route retour (2h30) vers la capitale. Derniers paysages de la côte sud.', location: 'Route 1', type: 'transport' },
        { time: '19:00', title: 'Dîner d\'adieu à Reykjavik', description: 'Grand dîner au restaurant Dill (1ère étoile Michelin d\'Islande) : menu dégustation 7 services avec ingrédients 100% islandais. Renne, skyr, algues et baies arctiques.', location: 'Restaurant Dill, Reykjavik', type: 'repas' },
        { time: '21:30', title: 'Dernière chasse aux aurores', description: 'Sortie en 4x4 loin des lumières de la ville pour une dernière tentative d\'observer les aurores boréales. Chocolat chaud et couvertures.', location: 'Campagne islandaise', type: 'activite' },
      ]},
      { day: 6, label: 'Matinée libre Reykjavik & transfert aéroport', activities: [
        { time: '08:30', title: 'Dernier petit-déjeuner', description: 'Petit-déjeuner tardif : skyr, pain de seigle, saumon fumé et café. Derniers moments islandais.', location: 'Guesthouse', type: 'repas' },
        { time: '10:00', title: 'Matinée libre dans Reykjavik', description: 'Shopping sur Laugavegur : lopapeysa (pull islandais en laine), bijoux en lave, et produits Blue Lagoon. Ou visite du musée Perlan (planétarium et chambre des glaces).', location: 'Reykjavik', type: 'temps-libre' },
        { time: '12:00', title: 'Dernier déjeuner islandais', description: 'Dernier bol de soupe de homard au Old Harbour et fish & chips au bord du port. Photo de groupe devant Harpa (salle de concert).', location: 'Vieux port de Reykjavik', type: 'repas' },
        { time: '13:30', title: 'Transfert aéroport', description: 'Route de 45min vers Keflavík. Dernier passage dans les champs de lave. Bless bless (au revoir islandais) !', location: 'Route vers Keflavík', type: 'transport', tip: 'Le duty free de Keflavík est moins cher que les boutiques en ville !' },
      ]},
    ],
    included: ['Vols A/R', 'Guesthouses locales', 'Petits-déjeuners', 'Véhicule 4x4', 'Guide photographe', 'Blue Lagoon', 'Rando glacier'],
    groupSize: '8-12 personnes',
  },
  {
    id: 103,
    title: 'Marrakech Enchantée : Souks, Riads & Atlas',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800',
    images: [
      'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1200',
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200',
      'https://images.unsplash.com/photo-1509116942487-0d41d5a4832b?w=1200',
      'https://images.unsplash.com/photo-1560100095-c2b93b38f979?w=1200',
    ],
    matchPercentage: 71,
    duration: '5j/4n',
    estimatedPrice: '890€',
    tags: ['Culture', 'Gastronomie', 'Artisanat'],
    highlight: 'Rapport qualité-prix imbattable',
    departureDate: '3 octobre 2026',
    description: "Cinq jours dans la ville rouge entre riads somptueux, souks envoûtants et excursion dans l'Atlas. Cours de cuisine marocaine, hammam traditionnel, et nuit dans le désert d'Agafay sous les étoiles.",
    itinerary: [
      { day: 1, label: 'Arrivée, installation riad & tour médina', activities: [
        { time: '14:00', title: 'Arrivée à l\'aéroport de Marrakech', description: 'Accueil par Hassan, guide officiel de la médina depuis 15 ans, avec thé à la menthe de bienvenue.', location: 'Aéroport Ménara', type: 'transport' },
        { time: '14:30', title: 'Transfert vers le riad', description: 'Passage en voiture puis à pied dans les ruelles étroites de la médina. Première immersion sensorielle : odeurs d\'épices, appels à la prière, couleurs vives.', location: 'Médina de Marrakech', type: 'transport' },
        { time: '15:00', title: 'Installation au riad', description: 'Riad du XVIIe siècle avec patio central, fontaine en zellige et orangers. Chambres décorées de tadelakt et bois de cèdre. Thé et pâtisseries d\'accueil.', location: 'Riad Dar Anika', type: 'hebergement', tip: 'Montez sur la terrasse rooftop pour une vue spectaculaire sur la médina et l\'Atlas !' },
        { time: '16:30', title: 'Tour à pied de la médina', description: 'Balade guidée de 2h : place Jemaa el-Fna (charmeurs de serpents, acrobates), médersa Ben Youssef (chef-d\'œuvre d\'architecture islamique) et fontaine Chrob ou Chouf.', location: 'Médina de Marrakech', type: 'visite' },
        { time: '18:30', title: 'Coucher de soleil sur la terrasse', description: 'Cocktail marocain sur le rooftop du riad : jus d\'orange pressé ou Mahia (eau-de-vie de figues). Vue sur les toits roses et les montagnes de l\'Atlas enneigées.', location: 'Terrasse du riad', type: 'activite' },
        { time: '19:30', title: 'Dîner de bienvenue au riad', description: 'Festin marocain servi dans le patio : harira (soupe), pastilla au poulet, tajine d\'agneau aux pruneaux, couscous royal et pâtisseries au miel.', location: 'Riad Dar Anika', type: 'repas' },
        { time: '21:30', title: 'Jemaa el-Fna by night', description: 'Balade nocturne sur la place : conteurs, musiciens gnaoua, stands de jus d\'orange, escargots épicés et brochettes. Ambiance unique au monde.', location: 'Place Jemaa el-Fna', type: 'visite', tip: 'Négociez les prix — le premier prix annoncé est toujours 3x trop cher !' },
      ]},
      { day: 2, label: 'Souks, jardin Majorelle & cours de cuisine', activities: [
        { time: '08:00', title: 'Petit-déjeuner au riad', description: 'Msemen (crêpe feuilletée), beghrir (crêpe mille-trous), confiture de figue, huile d\'olive et thé à la menthe frais.', location: 'Riad', type: 'repas' },
        { time: '09:00', title: 'Exploration des souks', description: 'Labyrinthe de ruelles spécialisées par métier : teinturiers, maroquiniers, ferblantiers, herboristes. Chaque souk a son univers. Hassan négocie pour vous !', location: 'Souks de la Médina', type: 'visite' },
        { time: '10:30', title: 'Atelier artisanal', description: 'Visite d\'un atelier de zellige (mosaïque). Les artisans taillent chaque tesselle à la main. Possibilité de créer votre propre petit motif en souvenir.', location: 'Atelier de zellige, médina', type: 'activite' },
        { time: '11:30', title: 'Jardin Majorelle', description: 'Jardin créé par Jacques Majorelle en 1931, restauré par Yves Saint Laurent. Bleu Majorelle iconique, cactus géants, bougainvilliers et musée berbère.', location: 'Jardin Majorelle', type: 'visite' },
        { time: '13:00', title: 'Déjeuner au café du jardin', description: 'Salade marocaine, briouates au fromage et jus de grenade frais dans le café du jardin.', location: 'Café Majorelle', type: 'repas' },
        { time: '14:30', title: 'Cours de cuisine marocaine', description: 'Atelier de 3h avec une dada (cuisinière traditionnelle). Marché d\'abord pour choisir les ingrédients, puis préparation : tajine, rfissa, zaalouk et cornes de gazelle.', location: 'Maison Arabe Cooking Class', type: 'activite' },
        { time: '17:30', title: 'Dégustation de vos créations', description: 'Repas convivial avec vos plats préparés. Accompagné de pain maison sorti du four et de vin gris marocain.', location: 'Maison Arabe', type: 'repas' },
        { time: '19:30', title: 'Soirée libre', description: 'Temps libre pour explorer. Suggestion : bar rooftop Nomad pour cocktails avec vue sur Jemaa el-Fna, ou spectacle de musique gnaoua.', location: 'Marrakech', type: 'temps-libre' },
      ]},
      { day: 3, label: 'Excursion vallée de l\'Ourika & cascade', activities: [
        { time: '07:30', title: 'Petit-déjeuner', description: 'Petit-déjeuner complet au riad. Café, msemen et fruits frais.', location: 'Riad', type: 'repas' },
        { time: '08:30', title: 'Départ vers la vallée de l\'Ourika', description: 'Route de 1h30 vers le Haut Atlas. Paysage passant du semi-aride aux montagnes verdoyantes. Villages berbères accrochés aux flancs.', location: 'Route de l\'Ourika', type: 'transport' },
        { time: '10:00', title: 'Visite village berbère', description: 'Accueil chez une famille berbère. Thé à la menthe sur le toit en terrasse avec vue sur la vallée. Explication du mode de vie traditionnel.', location: 'Village de Setti Fatma', type: 'visite' },
        { time: '11:00', title: 'Randonnée vers les cascades', description: 'Randonnée de 2h le long de la rivière Ourika. Traversée de ponts de fortune, passage dans les gorges et arrivée aux 7 cascades. Baignade possible.', location: 'Cascades de Setti Fatma', type: 'activite', tip: 'Chaussures de randonnée recommandées — le sentier est rocheux.' },
        { time: '13:00', title: 'Déjeuner berbère au bord de la rivière', description: 'Tajine de poulet au citron confit préparé au feu de bois, salade marocaine et thé. Les pieds dans l\'eau de la rivière.', location: 'Restaurant de la cascade', type: 'repas' },
        { time: '15:00', title: 'Jardin d\'épices & plantes aromatiques', description: 'Visite d\'un jardin bio : argan, safran, lavande, menthe, romarin. Explication des utilisations médicinales traditionnelles.', location: 'Bio-Arôme, Ourika', type: 'visite' },
        { time: '16:30', title: 'Retour à Marrakech', description: 'Route retour avec arrêt photo au col avec vue panoramique sur l\'Atlas et la plaine de Marrakech.', location: 'Route de l\'Ourika', type: 'transport' },
        { time: '18:30', title: 'Temps libre au riad', description: 'Détente dans le patio, lecture ou sieste avant la soirée.', location: 'Riad', type: 'temps-libre' },
        { time: '20:00', title: 'Dîner sur la place', description: 'Dîner gastronomique au restaurant Le Foundouk : tartare de bœuf à la marocaine, pigeon en pastilla et crème brûlée à la fleur d\'oranger.', location: 'Restaurant Le Foundouk', type: 'repas' },
      ]},
      { day: 4, label: 'Désert Agafay : dromadaires, dîner & nuit étoilée', activities: [
        { time: '08:00', title: 'Petit-déjeuner', description: 'Derniers msemen et beghrir au riad.', location: 'Riad', type: 'repas' },
        { time: '09:00', title: 'Palais de la Bahia', description: 'Visite du palais du XIXe siècle : 160 pièces, patios décorés de zellige, plafonds en bois de cèdre peint et jardins luxuriants. Chef-d\'œuvre d\'architecture marocaine.', location: 'Palais de la Bahia', type: 'visite' },
        { time: '10:30', title: 'Tombeaux Saadiens', description: 'Nécropole royale du XVIe siècle redécouverte en 1917. Mausolée des 12 colonnes en marbre de Carrare. Décoration d\'une finesse extraordinaire.', location: 'Tombeaux Saadiens', type: 'visite' },
        { time: '11:30', title: 'Shopping tanneries & maroquinerie', description: 'Visite de la tannerie (vue depuis les terrasses — odeur intense !). Achat de babouches, sacs et ceintures en cuir traditionnel.', location: 'Tannerie Chouara', type: 'visite', tip: 'Prenez un brin de menthe pour le nez — l\'odeur des tanneries est puissante !' },
        { time: '13:00', title: 'Déjeuner dans la médina', description: 'Dernier déjeuner en ville : kefta tajine (boulettes aux œufs), zaalouk et avocado shake.', location: 'Café des Épices', type: 'repas' },
        { time: '15:00', title: 'Transfert vers le désert d\'Agafay', description: 'Route de 45min vers le désert de pierres au pied de l\'Atlas. Paysage lunaire saisissant.', location: 'Route vers Agafay', type: 'transport' },
        { time: '16:00', title: 'Installation au camp de luxe', description: 'Tentes caïdales de luxe avec lits king-size, tapis berbères et salle de bain privée. Vue imprenable sur l\'Atlas.', location: 'Camp Scarabeo, Agafay', type: 'hebergement' },
        { time: '17:00', title: 'Balade à dos de dromadaire', description: 'Promenade d\'1h30 dans le désert au coucher du soleil. Les ombres des dromadaires s\'étirent sur le sol ocre. Photos iconiques.', location: 'Désert d\'Agafay', type: 'activite' },
        { time: '19:00', title: 'Dîner sous les étoiles', description: 'Méchoui (agneau rôti à la broche), couscous aux 7 légumes et pâtisseries marocaines. Musique gnaoua live autour du feu de camp.', location: 'Camp Scarabeo', type: 'repas', tip: 'Nuit sans pollution lumineuse — la voie lactée sera spectaculaire !' },
        { time: '21:30', title: 'Observation des étoiles', description: 'Session d\'astronomie avec télescope. Identification des constellations visibles depuis le Sahara. Voie lactée à l\'œil nu.', location: 'Désert d\'Agafay', type: 'activite' },
      ]},
      { day: 5, label: 'Hammam traditionnel & transfert aéroport', activities: [
        { time: '07:00', title: 'Lever de soleil dans le désert', description: 'Réveil magique avec vue sur l\'Atlas rosé par le soleil levant. Café et crêpes berbères sous la tente.', location: 'Camp Scarabeo', type: 'activite' },
        { time: '08:00', title: 'Petit-déjeuner au camp', description: 'Petit-déjeuner marocain complet : msemen, miel d\'Atlas, huile d\'argan, fruits secs et thé à la menthe.', location: 'Camp Scarabeo', type: 'repas' },
        { time: '09:30', title: 'Retour à Marrakech', description: 'Transfert vers la médina. Dernières vues sur le désert et l\'Atlas.', location: 'Route vers Marrakech', type: 'transport' },
        { time: '10:30', title: 'Hammam traditionnel', description: 'Expérience de 2h dans un hammam historique : vapeur, gommage au savon noir et gant de kessa, masque au ghassoul et massage à l\'huile d\'argan. Régénération totale.', location: 'Hammam de la Rose', type: 'activite', tip: 'Apportez un maillot de bain — le hammam est mixte pour les touristes.' },
        { time: '12:30', title: 'Dernier déjeuner', description: 'Dernier tajine sur la terrasse du riad. Photo de groupe et échange de contacts. Distribution des cadeaux souvenir Sankofa.', location: 'Riad', type: 'repas' },
        { time: '14:00', title: 'Transfert aéroport', description: 'Dernier passage à travers les remparts roses de Marrakech. Hassan vous accompagne jusqu\'au terminal. Bslama — au revoir !', location: 'Route vers l\'aéroport', type: 'transport' },
      ]},
    ],
    included: ['Vols A/R', 'Riad de charme', 'Petits-déjeuners + 2 dîners', 'Cours cuisine', 'Hammam', 'Excursion Atlas', 'Transferts'],
    groupSize: '12-20 personnes',
  },
  {
    id: 104,
    title: 'Croatie Adriatique : Dubrovnik, Îles & Dolce Vita',
    image: 'https://images.unsplash.com/photo-1555990538-1a0e39f86913?w=800',
    images: [
      'https://images.unsplash.com/photo-1555990538-1a0e39f86913?w=1200',
      'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=1200',
      'https://images.unsplash.com/photo-1564594326930-fd52fb490441?w=1200',
      'https://images.unsplash.com/photo-1591028560940-7f5369648964?w=1200',
    ],
    matchPercentage: 68,
    duration: '6j/5n',
    estimatedPrice: '1 280€',
    tags: ['Plage', 'Culture', 'Gastronomie'],
    highlight: 'Perle de l\'Adriatique',
    departureDate: '12 septembre 2026',
    description: "Six jours le long de la côte adriatique, de Dubrovnik aux îles de Hvar et Korčula. Remparts médiévaux, eaux turquoise, vignobles en terrasses et cuisine dalmate raffinée. Le parfait mélange culture et farniente.",
    itinerary: [
      { day: 1, label: 'Arrivée Dubrovnik, vieille ville & apéro remparts', activities: [
        { time: '13:00', title: 'Arrivée à l\'aéroport de Dubrovnik', description: 'Accueil par Marta, guide diplômée d\'histoire médiévale, avec bouteille d\'eau et éventail (il fait chaud !).', location: 'Aéroport de Dubrovnik', type: 'transport' },
        { time: '13:30', title: 'Transfert vers la vieille ville', description: 'Route de 30min avec vue spectaculaire sur la côte adriatique et les murailles de Dubrovnik.', location: 'Route vers Dubrovnik', type: 'transport' },
        { time: '14:00', title: 'Installation à la chambre d\'hôtes', description: 'Maison en pierre du XVIIe siècle dans les ruelles de la vieille ville. Volets verts, murs épais et fraîcheur bienvenue.', location: 'Old Town Guesthouse', type: 'hebergement' },
        { time: '15:00', title: 'Visite de la vieille ville', description: 'Balade guidée : Stradun (rue principale en marbre poli), palais du Recteur, cathédrale baroque, fontaine d\'Onofrio et petit port médiéval.', location: 'Vieille ville de Dubrovnik', type: 'visite' },
        { time: '17:00', title: 'Lieux de tournage Game of Thrones', description: 'Tour spécial GoT : Fort Lovrijenac (Red Keep), escaliers jésuites (Walk of Shame), et remparts (King\'s Landing). Fans et non-fans adorent !', location: 'Vieille ville', type: 'visite', tip: 'Même si vous n\'avez pas vu la série, les lieux sont spectaculaires !' },
        { time: '18:30', title: 'Apéritif sur les remparts', description: 'Verre de vin Pošip blanc (cépage local) et planche de fromage de Pag au bar Buža, perché sur les falaises avec vue plongeante sur la mer.', location: 'Bar Buža', type: 'repas', tip: 'Le bar n\'a pas d\'enseigne — cherchez le trou dans le mur !' },
        { time: '20:00', title: 'Dîner de bienvenue', description: 'Dîner dalmate : poulpe grillé, risotto à l\'encre de seiche, peka (plat mijoté sous cloche) et crème de dubrovnik.', location: 'Restaurant Proto', type: 'repas' },
      ]},
      { day: 2, label: 'Tour des remparts, Lokrum & kayak de mer', activities: [
        { time: '07:30', title: 'Petit-déjeuner', description: 'Petit-déjeuner méditerranéen : fromage frais, jambon dalmate, tomates, olives, pain croustillant et café.', location: 'Chambre d\'hôtes', type: 'repas' },
        { time: '08:00', title: 'Tour des remparts de Dubrovnik', description: 'Circuit de 2km sur les murailles médiévales (XIIIe siècle). Vues plongeantes sur la vieille ville, les toits en tuile rouge et la mer turquoise. 25m de hauteur.', location: 'Remparts de Dubrovnik', type: 'visite', tip: 'Partez tôt pour éviter la chaleur — pas d\'ombre sur les remparts !' },
        { time: '10:00', title: 'Bateau vers l\'île de Lokrum', description: 'Traversée de 15min vers l\'île paradisiaque en face de Dubrovnik. Réserve naturelle protégée.', location: 'Port de Dubrovnik → Lokrum', type: 'transport' },
        { time: '10:30', title: 'Exploration de Lokrum', description: 'Balade dans les jardins botaniques, rencontre des paons qui se promènent librement, visite du monastère bénédictin en ruines et baignade au Dead Sea (lac salé).', location: 'Île de Lokrum', type: 'visite' },
        { time: '12:30', title: 'Déjeuner pique-nique sur Lokrum', description: 'Pique-nique préparé : sandwich au prosciutto dalmate, salade de poulpe, fruits et vin rosé.', location: 'Île de Lokrum', type: 'repas' },
        { time: '14:00', title: 'Retour & temps libre', description: 'Retour en bateau vers Dubrovnik. Temps libre pour explorer ou se reposer.', location: 'Dubrovnik', type: 'temps-libre' },
        { time: '16:00', title: 'Kayak de mer le long des murailles', description: 'Excursion de 2h en kayak au pied des remparts. Vue unique sur la ville fortifiée depuis la mer. Arrêt baignade dans une crique secrète.', location: 'Côte de Dubrovnik', type: 'activite' },
        { time: '18:30', title: 'Coucher de soleil depuis le Fort Lovrijenac', description: 'Montée au fort avec vue sur la vieille ville dorée par le soleil couchant. Moment photo idéal.', location: 'Fort Lovrijenac', type: 'visite' },
        { time: '20:00', title: 'Dîner fruits de mer', description: 'Restaurant avec terrasse sur le port : salade de poulpe, moules buzara (sauce tomate et vin blanc), et grilled catch of the day.', location: 'Restaurant Nautika', type: 'repas' },
      ]},
      { day: 3, label: 'Ferry vers Hvar, plages & soirée cocktails', activities: [
        { time: '07:00', title: 'Petit-déjeuner & check-out', description: 'Petit-déjeuner, bagages et transfert vers le port de ferry.', location: 'Chambre d\'hôtes', type: 'repas' },
        { time: '08:30', title: 'Ferry vers Hvar', description: 'Traversée de 3h30 sur le ferry Jadrolinija. Vue spectaculaire sur les îles Élaphites et la côte dalmate. Café sur le pont supérieur.', location: 'Ferry Dubrovnik → Hvar', type: 'transport' },
        { time: '12:00', title: 'Arrivée à Hvar', description: 'Débarquement sur l\'île la plus ensoleillée de Croatie (2724h de soleil/an !). Installation à la chambre d\'hôtes face au port.', location: 'Hvar Town', type: 'hebergement' },
        { time: '13:00', title: 'Déjeuner au port', description: 'Premier repas hvariote : grilled fish platter, salade de roquette aux figues et vin local Bogdanuša.', location: 'Konoba Menego', type: 'repas' },
        { time: '14:30', title: 'Balade & Fortica Španjola', description: 'Montée à la forteresse espagnole du XVIe siècle pour une vue panoramique sur le port, les îles Pakleni et la mer à l\'infini.', location: 'Fortica, Hvar', type: 'visite' },
        { time: '16:00', title: 'Plage & baignade', description: 'Bateau-taxi vers les îles Pakleni : plages de galets cachées, eaux cristallines et pinèdes ombragées. Paradis !', location: 'Îles Pakleni', type: 'temps-libre' },
        { time: '18:30', title: 'Retour & apéritif', description: 'Retour à Hvar pour l\'apéritif. Cocktails au bar Hula Hula avec DJ set et coucher de soleil.', location: 'Hula Hula Beach Bar', type: 'repas', tip: 'LE bar pour le sunset à Hvar — ambiance incroyable !' },
        { time: '20:30', title: 'Dîner dalmate', description: 'Repas dans une konoba (taverne) : pašticada (ragoût de bœuf dalmate), gnocchi maison et lavande ice cream.', location: 'Konoba Luviji', type: 'repas' },
        { time: '22:00', title: 'Soirée cocktails & bars', description: 'Hvar est surnommée le "Saint-Tropez croate" — soirée dans les bars de la Riva avec vue sur le port illuminé.', location: 'Riva de Hvar', type: 'activite' },
      ]},
      { day: 4, label: 'Île de Korčula, dégustation vins & village de pêcheurs', activities: [
        { time: '08:00', title: 'Petit-déjeuner', description: 'Petit-déjeuner méditerranéen avec vue sur le port de Hvar.', location: 'Chambre d\'hôtes', type: 'repas' },
        { time: '09:00', title: 'Speed boat vers Korčula', description: 'Traversée de 1h en speedboat privé. Passage entre les îles avec arrêt baignade dans une crique turquoise.', location: 'Hvar → Korčula', type: 'transport' },
        { time: '10:00', title: 'Visite de Korčula Old Town', description: 'La "petite Dubrovnik" : ville fortifiée en arête de poisson, ruelles médiévales et cathédrale Saint-Marc. Lieu de naissance supposé de Marco Polo.', location: 'Vieille ville de Korčula', type: 'visite' },
        { time: '11:00', title: 'Musée Marco Polo', description: 'Visite de la maison natale (supposée) de Marco Polo. Montée à la tour pour une vue 360° sur la ville et la mer.', location: 'Musée Marco Polo', type: 'visite' },
        { time: '12:00', title: 'Dégustation de vins à Lumbarda', description: 'Route vers le village viticole de Lumbarda. Dégustation du Grk, cépage blanc unique au monde qui ne pousse QUE sur cette presqu\'île.', location: 'Domaine Bire, Lumbarda', type: 'activite', tip: 'Le Grk est si rare qu\'on ne le trouve nulle part ailleurs — goûtez-le !' },
        { time: '13:30', title: 'Déjeuner chez le vigneron', description: 'Repas chez le vigneron : charcuterie maison, fromage de brebis, poulpe à la braise et Grk frais. Simplicité et excellence.', location: 'Domaine Bire', type: 'repas' },
        { time: '15:00', title: 'Village de pêcheurs de Račišće', description: 'Balade dans un minuscule village de pêcheurs au bout du monde. Maisons en pierre, filets étendus et silence absolu. Baignade dans le port.', location: 'Račišće', type: 'visite' },
        { time: '16:30', title: 'Retour en speedboat vers Hvar', description: 'Traversée retour avec arrêt snorkeling à la grotte bleue de Vis (si conditions favorables).', location: 'Korčula → Hvar', type: 'transport' },
        { time: '18:30', title: 'Temps libre à Hvar', description: 'Dernières heures libres à Hvar. Shopping, plage ou café sur le port.', location: 'Hvar', type: 'temps-libre' },
        { time: '20:00', title: 'Dîner dans un jardin secret', description: 'Restaurant caché dans un jardin : agneau peka (cuit 5h sous cloche), légumes grillés et soufflé aux figues. Guitare acoustique live.', location: 'Konoba Bonaca, Hvar', type: 'repas' },
      ]},
      { day: 5, label: 'Retour Dubrovnik, plage Banje & dîner d\'adieu', activities: [
        { time: '07:00', title: 'Petit-déjeuner & check-out', description: 'Dernier petit-déjeuner à Hvar. Adieu île de la lavande !', location: 'Chambre d\'hôtes', type: 'repas' },
        { time: '08:00', title: 'Ferry retour vers Dubrovnik', description: 'Traversée de 3h30. Temps pour écrire des cartes postales, lire ou admirer les îles depuis le pont.', location: 'Ferry Hvar → Dubrovnik', type: 'transport' },
        { time: '11:30', title: 'Arrivée & dépôt bagages', description: 'Retour à la chambre d\'hôtes de Dubrovnik. Dépôt des bagages.', location: 'Old Town Guesthouse', type: 'hebergement' },
        { time: '12:00', title: 'Déjeuner sur le port', description: 'Dernier déjeuner adriatique : plateau de fruits de mer pour deux, crevettes à l\'ail et vin Plavac Mali rouge.', location: 'Restaurant Lokanda Peskarija', type: 'repas' },
        { time: '14:00', title: 'Plage de Banje', description: 'Après-midi farniente sur LA plage de Dubrovnik. Transats face aux murailles, eau turquoise cristalline et cocktails au beach bar.', location: 'Plage Banje', type: 'temps-libre' },
        { time: '16:30', title: 'Dernière balade dans la vieille ville', description: 'Shopping final : huile d\'olive dalmate, lavande de Hvar, bijoux en corail et liqueur de maraschino.', location: 'Vieille ville', type: 'visite' },
        { time: '17:30', title: 'Session photo d\'adieu', description: 'Dernière session photo avec Amina sur les remparts au coucher du soleil. Photos individuelles et de groupe.', location: 'Remparts de Dubrovnik', type: 'activite' },
        { time: '19:30', title: 'Grand dîner d\'adieu', description: 'Restaurant gastronomique avec terrasse sur les remparts : menu dégustation dalmate 5 services, accord mets-vins croates. Discours d\'Amina et distribution des souvenirs.', location: 'Restaurant 360°', type: 'repas', tip: 'Le 360° est le meilleur restaurant de Dubrovnik — savourez chaque plat !' },
        { time: '22:00', title: 'Dernière soirée', description: 'Promenade nocturne dans la vieille ville illuminée. Dernier verre au Stradun. Derniers rires et souvenirs.', location: 'Vieille ville', type: 'activite' },
      ]},
      { day: 6, label: 'Brunch & transfert aéroport', activities: [
        { time: '08:30', title: 'Grasse matinée & check-out', description: 'Dernier réveil avec vue sur les toits de tuile rouge. Bagages et libération des chambres.', location: 'Old Town Guesthouse', type: 'hebergement' },
        { time: '09:30', title: 'Brunch d\'adieu', description: 'Brunch en terrasse : omelette aux truffes dalmates, burrata, figues et café. Échange des contacts et dernières photos.', location: 'Café Festival', type: 'repas' },
        { time: '11:00', title: 'Photo de groupe finale', description: 'Rassemblement devant la porte Pile pour la photo officielle. Distribution des tirages photos du voyage.', location: 'Porte Pile, Dubrovnik', type: 'activite' },
        { time: '11:30', title: 'Transfert aéroport', description: 'Dernier trajet le long de la côte. Marta vous accompagne. Doviđenja — au revoir !', location: 'Route vers l\'aéroport', type: 'transport', tip: 'Le duty free a d\'excellents vins croates à prix raisonnable !' },
      ]},
    ],
    included: ['Vols A/R', 'Chambres d\'hôtes', 'Petits-déjeuners', 'Ferrys inter-îles', 'Kayak', 'Dégustation', 'Transferts'],
    groupSize: '10-16 personnes',
  },
]

// ─── Données Voyageur – Communication ────────────────────────────────────

export const travelerTrips = {
  lucas: [
    {
      tripId: 2,
      title: 'Santorin : Couchers de Soleil & Gastronomie Grecque',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
      status: 'a-venir',
      dates: '25 – 29 mai 2026',
      departureDate: '2026-05-25',
      creator: {
        name: 'Amina Diallo',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Amina&backgroundColor=ffd5dc',
      },
    },
  ],
  sophie: [
    {
      tripId: 1,
      title: 'Bali Essentiel : Temples, Rizières & Fonds Marins',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      status: 'en-cours',
      dates: '17 – 23 mai 2026',
      departureDate: '2026-05-17',
      currentDay: 4,
      totalDays: 7,
      todayLabel: 'Plongée à Nusa Penida — raies manta & coraux',
      creator: {
        name: 'Amina Diallo',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Amina&backgroundColor=ffd5dc',
      },
      nextEvent: { time: '07:00', label: 'Départ bateau Nusa Penida', location: 'Port de Sanur' },
    },
  ],
}

export const travelerEssentialPocket = {
  1: {
    hotel: {
      nom: 'Eco-lodge Tegallalang',
      adresse: 'Jl. Raya Tegallalang No.12, Gianyar, Bali 80561',
      checkIn: '14h00',
      checkOut: '11h00',
    },
    wifi: {
      ssid: 'EcoLodge_Guest',
      password: 'Bali2026!',
    },
    contact: {
      nom: 'Cynthia Wulandari',
      role: 'Organisatrice locale',
      telephone: '+62 812 3456 7890',
    },
    urgences: {
      numeroLocal: '112',
      labelNumeroLocal: 'Urgences (Indonésie)',
      police: '110',
      labelPolice: 'Police (Indonésie)',
      ambulance: '118',
      labelAmbulance: 'Ambulance (Indonésie)',
      ambassade: {
        nom: 'Ambassade de France en Indonésie',
        telephone: '+62 21 2355 7600',
      },
      sankofaHotline: '+33 1 80 00 00 00',
    },
  },
  2: {
    hotel: {
      nom: 'Maison d\'hôtes Firostefani',
      adresse: 'Firostefani, Santorin 847 00, Grèce',
      checkIn: '15h00',
      checkOut: '11h00',
    },
    wifi: {
      ssid: 'Fira_GuestHouse',
      password: 'Santorin2026',
    },
    contact: {
      nom: 'Maria Papadopoulos',
      role: 'Guide locale Sankofa',
      telephone: '+30 694 123 4567',
    },
    urgences: {
      numeroLocal: '112',
      labelNumeroLocal: 'Urgences (Europe)',
      police: '100',
      labelPolice: 'Police (Grèce)',
      ambulance: '166',
      labelAmbulance: 'SAMU (Grèce)',
      ambassade: {
        nom: 'Ambassade de France en Grèce',
        telephone: '+30 210 339 1000',
      },
      sankofaHotline: '+33 1 80 00 00 00',
    },
  },
}

export const travelerWeather = {
  1: {
    4: { icon: 'sun', temp: 30, label: 'Ensoleillé' },
    5: { icon: 'cloud-sun', temp: 28, label: 'Partiellement nuageux' },
    6: { icon: 'cloud-sun', temp: 29, label: 'Éclaircies' },
    7: { icon: 'sun', temp: 31, label: 'Grand soleil' },
  },
  2: {
    1: { icon: 'sun', temp: 27, label: 'Ensoleillé' },
    2: { icon: 'sun', temp: 28, label: 'Grand soleil' },
    3: { icon: 'cloud-sun', temp: 26, label: 'Nuages épars' },
    4: { icon: 'sun', temp: 29, label: 'Ensoleillé' },
    5: { icon: 'sun', temp: 27, label: 'Beau temps' },
  },
}

export const travelerFieldChecklist = {
  1: {
    4: [
      { id: 1, label: 'Crème solaire', checked: true },
      { id: 2, label: 'Batterie externe chargée', checked: true },
      { id: 3, label: 'Point de RDV validé (port 7h)', checked: false },
      { id: 4, label: 'GoPro chargée', checked: false },
      { id: 5, label: 'Eau + snack', checked: false },
    ],
  },
}

export const travelerDMs = {
  1: [
    {
      id: 'conv-sophie',
      traveler: {
        id: 'sophie',
        name: 'Sophie Laurent',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sophie&backgroundColor=ffd5dc',
      },
      unreadCount: 1,
      messages: [
        { id: 1, sender: 'traveler', text: 'Coucou Amina ! J\'ai vu qu\'il fallait un visa pour Bali, tu peux confirmer ?', time: '11:20' },
        { id: 2, sender: 'creator', text: 'Hello Sophie ! Pas de visa pour les français si séjour < 30 jours, on est bon 😊', time: '11:35' },
        { id: 3, sender: 'traveler', text: 'Top merci ! Et pour le vaccin hépatite A, c\'est recommandé ?', time: '12:10' },
      ],
    },
    {
      id: 'conv-maxime',
      traveler: {
        id: 'maxime',
        name: 'Maxime Dubois',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Maxime&backgroundColor=c0e8ff',
      },
      unreadCount: 2,
      messages: [
        { id: 1, sender: 'traveler', text: 'Salut Amina ! Est-ce qu\'on aura du temps libre pour filmer du contenu ?', time: '08:45' },
        { id: 2, sender: 'creator', text: 'Salut Maxime ! Oui j\'ai prévu des créneaux "free roam" chaque après-midi, parfait pour créer du contenu 🎬', time: '09:10' },
        { id: 3, sender: 'traveler', text: 'Génial ! On pourrait même faire une collab sur place ?', time: '09:30' },
        { id: 4, sender: 'creator', text: 'Carrément, j\'y pensais justement ! On en reparle à Bali 🤝', time: '09:45' },
        { id: 5, sender: 'traveler', text: 'Trop bien, j\'ai déjà plein d\'idées !', time: '10:00' },
      ],
    },
    {
      id: 'conv-camille',
      traveler: {
        id: 'camille',
        name: 'Camille Moreau',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Camille&backgroundColor=d5f5e3',
      },
      unreadCount: 0,
      messages: [
        { id: 1, sender: 'traveler', text: 'Bonjour Amina, petite question : est-ce que les repas sur place sont adaptés sans gluten ?', time: '16:00' },
        { id: 2, sender: 'creator', text: 'Bonjour Camille ! J\'ai prévenu notre guide Ketut, il a noté ton régime. La cuisine balinaise est naturellement riche en riz donc c\'est plutôt easy 🍚', time: '16:20' },
        { id: 3, sender: 'traveler', text: 'Super, ça me rassure beaucoup ! Merci 🙏', time: '16:30' },
      ],
    },
  ],
  2: [
    {
      id: 'conv-lucas',
      traveler: {
        id: 'lucas',
        name: 'Lucas Martin',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Lucas&backgroundColor=c0e8ff',
      },
      unreadCount: 2,
      messages: [
        { id: 1, sender: 'traveler', text: 'Salut Amina ! Trop hâte pour Santorin, est-ce qu\'on pourra visiter la plage rouge ?', time: '09:15' },
        { id: 2, sender: 'creator', text: 'Hello Lucas ! Oui c\'est prévu le jour 3, tu vas adorer 😍', time: '09:22' },
        { id: 3, sender: 'traveler', text: 'Parfait ! Et pour les restaurants, tu as des recommandations ?', time: '10:05' },
        { id: 4, sender: 'creator', text: 'J\'ai une liste secrète 🤫 Je partagerai ça avec le groupe sur place. Mais crois-moi, la cuisine locale va te surprendre !', time: '10:12' },
      ],
    },
    {
      id: 'conv-agency',
      traveler: {
        id: 'lucas',
        name: 'Lucas Martin',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Lucas&backgroundColor=c0e8ff',
      },
      unreadCount: 1,
      isAgency: true,
      messages: [
        { id: 1, sender: 'traveler', text: 'Bonjour, j\'ai une question sur le programme du jour 3.', time: '11:00' },
        { id: 2, sender: 'agency', text: 'Bonjour Lucas ! Bien sûr, que souhaitez-vous savoir sur la croisière catamaran ? 🚤', time: '11:05' },
      ],
    },
    {
      id: 'conv-emilie',
      traveler: {
        id: 'emilie',
        name: 'Émilie Rousseau',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Emilie&backgroundColor=d5f5e8',
      },
      unreadCount: 1,
      messages: [
        { id: 1, sender: 'traveler', text: 'Bonjour Amina, j\'ai un régime végétarien, est-ce que ça sera géré sur place ?', time: '14:30' },
        { id: 2, sender: 'creator', text: 'Bien sûr Émilie ! Maria (notre contact sur place) a déjà prévenu tous les restaurants. Tu seras servie comme une reine 👑', time: '14:45' },
        { id: 3, sender: 'traveler', text: 'Super merci ! J\'ai aussi une question sur les billets de ferry…', time: '15:10' },
      ],
    },
    {
      id: 'conv-julien',
      traveler: {
        id: 'julien',
        name: 'Julien Petit',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Julien&backgroundColor=f5e8d5',
      },
      unreadCount: 0,
      messages: [
        { id: 1, sender: 'traveler', text: 'Hey ! C\'est mon premier voyage de groupe, un peu stressé 😅', time: '18:00' },
        { id: 2, sender: 'creator', text: 'T\'inquiète pas Julien, l\'ambiance est hyper bienveillante ! On est une petite famille le temps du voyage 💛', time: '18:15' },
        { id: 3, sender: 'traveler', text: 'Ça me rassure, merci Amina !', time: '18:20' },
        { id: 4, sender: 'creator', text: 'Avec plaisir ! On va passer des moments incroyables, tu verras 🌅', time: '18:25' },
      ],
    },
  ],
}

export const travelerDMAutoReplies = {
  1: {
    creator: [
      'Bonne question ! Je vérifie avec Ketut et je te dis ça 📝',
      'Pas de souci, tout est organisé de ce côté-là ! 😊',
      'Hâte d\'y être, ça va être magique ! 🌴',
    ],
    traveler: [
      'Merci Amina, t\'es au top ! 🙌',
      'Trop hâte d\'être à Bali ! 🌺',
      'Parfait, c\'est noté ! Merci beaucoup 😊',
    ],
  },
  2: {
    creator: [
      'Bonne question ! Je note ça et je te reviens dessus très vite 📝',
      'Je viens de vérifier avec Maria, tout est en ordre ! 😊',
      'Trop bien que tu sois enthousiaste, ça va être incroyable ! 🔥',
    ],
    traveler: [
      'Merci Amina, tu gères ! 🙌',
      'Trop hâte, vivement qu\'on y soit ! 🇬🇷',
      'Parfait, c\'est noté de mon côté aussi !',
    ],
    agency: [
      'Merci pour votre message ! Un membre de l\'équipe vous répond très vite 📩',
      'Bien noté, on s\'en occupe ! N\'hésitez pas si vous avez d\'autres questions 😊',
      'L\'équipe Sankofa est sur le coup ! Vous aurez une réponse sous peu 🙌',
    ],
  },
}

// ─── Données Adventure Hub ──────────────────────────────────────────────

export const travelerSecurity = {
  1: {
    allergies: 'Fruits de mer',
    regime: 'Aucun',
    groupeSanguin: 'A+',
    passeport: 'Valide jusqu\'au 08/09/2031',
    urgence: {
      nom: 'Pierre Laurent',
      lien: 'Père',
      telephone: '+33 6 45 67 89 01',
    },
  },
  2: {
    allergies: 'Aucune',
    regime: 'Aucun',
    groupeSanguin: 'O+',
    passeport: 'Valide jusqu\'au 12/03/2030',
    urgence: {
      nom: 'Marie Martin',
      lien: 'Mère',
      telephone: '+33 6 98 76 54 32',
    },
  },
}

export const travelerPayments = {
  1: {
    totalPrice: 1350,
    totalPaid: 1350,
    echeances: [
      { id: 1, label: 'Acompte à la réservation', montant: 450, date: '25 mars 2026', status: 'payé' },
      { id: 2, label: '2ème échéance', montant: 450, date: '25 avril 2026', status: 'payé' },
      { id: 3, label: 'Solde final', montant: 450, date: '10 mai 2026', status: 'payé' },
    ],
  },
  2: {
    totalPrice: 1180,
    totalPaid: 885,
    echeances: [
      { id: 1, label: 'Acompte à la réservation', montant: 295, date: '15 mars 2026', status: 'payé' },
      { id: 2, label: '2ème échéance', montant: 295, date: '15 avril 2026', status: 'payé' },
      { id: 3, label: '3ème échéance', montant: 295, date: '1 mai 2026', status: 'payé' },
      { id: 4, label: 'Solde final', montant: 295, date: '20 mai 2026', status: 'en-attente' },
    ],
  },
}

export const travelerChecklist = {
  1: [
    { id: 1, label: 'Passeport valide 6 mois', checked: true },
    { id: 2, label: 'Assurance voyage souscrite', checked: true },
    { id: 3, label: 'Billets d\'avion téléchargés', checked: true },
    { id: 4, label: 'Crème solaire indice 50', checked: true },
    { id: 5, label: 'Anti-moustiques', checked: true },
    { id: 6, label: 'Maillot de bain (x2)', checked: true },
    { id: 7, label: 'Chaussures de marche légères', checked: true },
    { id: 8, label: 'Adaptateur prise universel', checked: true },
    { id: 9, label: 'Appareil photo / GoPro', checked: true },
  ],
  2: [
    { id: 1, label: 'Passeport / carte d\'identité valide', checked: true },
    { id: 2, label: 'Assurance voyage souscrite', checked: true },
    { id: 3, label: 'Billets de train téléchargés', checked: true },
    { id: 4, label: 'Billets d\'avion téléchargés', checked: true },
    { id: 5, label: 'Crème solaire indice 50', checked: false },
    { id: 6, label: 'Chaussures de marche (rando Fira-Oia)', checked: false },
    { id: 7, label: 'Maillot de bain', checked: true },
    { id: 8, label: 'Adaptateur prise', checked: false },
    { id: 9, label: 'Appareil photo / GoPro', checked: true },
  ],
}

export const tripMapWaypoints = {
  1: [
    { id: 1, label: 'Paris CDG', lat: 49.0097, lng: 2.5479, emoji: '✈️' },
    { id: 2, label: 'Denpasar', lat: -8.7467, lng: 115.1668, emoji: '🌴' },
    { id: 3, label: 'Uluwatu', lat: -8.8291, lng: 115.0849, emoji: '🛕' },
    { id: 4, label: 'Tegallalang', lat: -8.4312, lng: 115.2793, emoji: '🌾' },
    { id: 5, label: 'Nusa Penida', lat: -8.7275, lng: 115.5444, emoji: '🤿' },
    { id: 6, label: 'Sekumpul', lat: -8.1757, lng: 115.4225, emoji: '💧' },
  ],
  2: [
    { id: 1, label: 'Paris', lat: 48.8566, lng: 2.3522, emoji: '🗼' },
    { id: 2, label: 'Marseille', lat: 43.2965, lng: 5.3698, emoji: '⛵' },
    { id: 3, label: 'Santorin', lat: 36.3932, lng: 25.4615, emoji: '🏝️' },
  ],
}

export const voyagePromoVideos = {
  1: [
    { id: 1, title: 'Pourquoi je vous emmène à Bali', platform: 'YouTube', thumbnail: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600', url: '#' },
    { id: 2, title: 'Je vous montre les coulisses', platform: 'TikTok', thumbnail: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', url: '#' },
    { id: 3, title: 'Mon coup de cœur à Bali', platform: 'Instagram', thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600', url: '#' },
  ],
  2: [
    { id: 1, title: 'Santorin : pourquoi j\'ai choisi cette île', platform: 'YouTube', thumbnail: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600', url: '#' },
    { id: 2, title: 'Ce qui vous attend en Grèce avec moi', platform: 'TikTok', thumbnail: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600', url: '#' },
  ],
}

export const voyageClicksOverTime = {
  1: [
    { jour: '10 mai', clics: 18 },
    { jour: '11 mai', clics: 32 },
    { jour: '12 mai', clics: 27 },
    { jour: '13 mai', clics: 45 },
    { jour: '14 mai', clics: 61 },
    { jour: '15 mai', clics: 54 },
    { jour: '16 mai', clics: 38 },
    { jour: '17 mai', clics: 42 },
    { jour: '18 mai', clics: 35 },
    { jour: '19 mai', clics: 29 },
  ],
  2: [
    { jour: '1 mai', clics: 24 },
    { jour: '2 mai', clics: 41 },
    { jour: '3 mai', clics: 55 },
    { jour: '4 mai', clics: 48 },
    { jour: '5 mai', clics: 72 },
    { jour: '6 mai', clics: 63 },
    { jour: '7 mai', clics: 51 },
    { jour: '8 mai', clics: 44 },
    { jour: '9 mai', clics: 37 },
    { jour: '10 mai', clics: 30 },
  ],
}

export const travelerSignalements = {
  1: [
    {
      id: 1,
      voyageur: {
        name: 'Sophie Laurent',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sophie&backgroundColor=ffd5dc',
      },
      categorie: 'Hébergement',
      message: 'L\'eau chaude ne fonctionne pas dans ma villa depuis ce matin.',
      date: '2026-05-16',
      heure: '08:30',
      status: 'en-cours',
    },
    {
      id: 2,
      voyageur: {
        name: 'Camille Moreau',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Camille&backgroundColor=d5f5e3',
      },
      categorie: 'Activité',
      message: 'L\'excursion snorkeling a été annulée sans prévenir, on a attendu 1h sur place.',
      date: '2026-05-15',
      heure: '14:20',
      status: 'résolu',
    },
  ],
  2: [
    {
      id: 1,
      voyageur: {
        name: 'Émilie Rousseau',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Emilie&backgroundColor=d5f5e8',
      },
      categorie: 'Hébergement',
      message: 'La climatisation de ma chambre ne fonctionne pas, il fait très chaud la nuit.',
      date: '2026-05-13',
      heure: '22:15',
      status: 'en-cours',
    },
    {
      id: 2,
      voyageur: {
        name: 'Julien Petit',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Julien&backgroundColor=f5e8d5',
      },
      categorie: 'Transport',
      message: 'Le ferry prévu pour demain matin a été annulé à cause du vent. Comment on fait ?',
      date: '2026-05-12',
      heure: '19:40',
      status: 'résolu',
    },
  ],
}

// ─── Group Chat Data ─────────────────────────────────────────────────────

export const groupChatMembers = {
  1: [
    { id: 'amina', name: 'Amina', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Amina&backgroundColor=ffd5dc', isCreator: true },
    { id: 'maxime', name: 'Maxime D.', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Maxime&backgroundColor=c0e8ff' },
    { id: 'camille', name: 'Camille M.', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Camille&backgroundColor=d5f5e3' },
    { id: 'lea', name: 'Léa F.', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Lea&backgroundColor=e8d5f5' },
    { id: 'thomas', name: 'Thomas R.', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Thomas&backgroundColor=fde8cd' },
  ],
  2: [
    { id: 'amina', name: 'Amina', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Amina&backgroundColor=ffd5dc', isCreator: true },
    { id: 'emilie', name: 'Émilie R.', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Emilie&backgroundColor=d5f5e8' },
    { id: 'julien', name: 'Julien P.', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Julien&backgroundColor=f5e8d5' },
    { id: 'chloe', name: 'Chloé P.', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Chloe&backgroundColor=e8f5d5' },
  ],
}

export const groupChatMessages = {
  1: [
    { id: 1, senderId: 'amina', text: 'Bienvenue dans le groupe du voyage Bali ! N\'hésitez pas à poser vos questions ici 🌴', time: '09:00' },
    { id: 2, senderId: 'maxime', text: 'Trop hâte ! Quelqu\'un a déjà fait de la plongée à Bali ?', time: '09:15' },
    { id: 3, senderId: 'sophie', text: 'Moi ! L\'eau est incroyable à Nusa Penida, on voit des raies manta 🤩', time: '09:20' },
    { id: 4, senderId: 'camille', text: 'Sérieux des raies manta ?? J\'ai trop hâte', time: '09:25' },
    { id: 5, senderId: 'lea', text: 'Pensez à prendre une GoPro, les images sous-marines vont être folles', time: '09:40' },
    { id: 6, senderId: 'thomas', text: 'Quelqu\'un a du Dramamine ? Je suis pas sûr de supporter le bateau 😅', time: '10:05' },
    { id: 7, senderId: 'amina', text: 'Thomas, Ketut aura des cachets sur le bateau, t\'inquiète pas 😊', time: '10:10' },
    { id: 8, senderId: 'maxime', text: 'Le coucher de soleil à Tanah Lot c\'est le jour 2 c\'est ça ?', time: '10:30' },
    { id: 9, senderId: 'amina', text: 'Exact Maxime ! Jour 2, préparez vos appareils photo 📸', time: '10:35' },
    { id: 10, senderId: 'lea', text: 'On se retrouve au lobby à quelle heure demain matin ?', time: '11:00' },
  ],
  2: [
    { id: 1, senderId: 'amina', text: 'Hello la team Santorin ! Le groupe est ouvert, présentez-vous 🇬🇷', time: '10:00' },
    { id: 2, senderId: 'lucas', text: 'Salut tout le monde ! Lucas, 28 ans, fan de photo et de street food', time: '10:10' },
    { id: 3, senderId: 'emilie', text: 'Coucou ! Émilie, c\'est mon premier voyage de groupe, un peu stressée mais trop excitée !', time: '10:15' },
    { id: 4, senderId: 'julien', text: 'Hey ! Julien ici. Quelqu\'un sait si on peut louer des vélos sur place ?', time: '10:25' },
    { id: 5, senderId: 'amina', text: 'Julien, Maria peut nous en réserver ! Je note 📝', time: '10:30' },
    { id: 6, senderId: 'chloe', text: 'Chloé ! J\'ai tellement hâte pour la rando Fira-Oia, c\'est 10 km c\'est ça ?', time: '10:45' },
    { id: 7, senderId: 'amina', text: 'Environ 10 km oui, mais c\'est assez plat. La vue est dingue 🌅', time: '10:50' },
    { id: 8, senderId: 'lucas', text: 'Pour les valises, on est limités en poids avec le vol intérieur ?', time: '11:10' },
    { id: 9, senderId: 'emilie', text: 'Bonne question ! Amina tu sais ?', time: '11:15' },
    { id: 10, senderId: 'amina', text: '23 kg en soute + 8 kg cabine, on est large ! Prenez léger quand même, il fait chaud 🌡️', time: '11:20' },
  ],
}

export const groupChatAutoReplies = {
  1: [
    { senderId: 'maxime', text: 'Trop bien ! J\'ai hâte 🔥' },
    { senderId: 'camille', text: 'Ah génial, merci pour l\'info !' },
    { senderId: 'lea', text: 'Pareil, j\'ai noté 📝' },
    { senderId: 'thomas', text: 'Top, merci ! 🙌' },
    { senderId: 'amina', text: 'Super question ! Je vérifie et je reviens vers vous 😊' },
    { senderId: 'maxime', text: 'Quelqu\'un veut qu\'on se retrouve au lobby ce soir ?' },
    { senderId: 'camille', text: 'Moi je suis partante ! 🙋‍♀️' },
    { senderId: 'lea', text: 'On peut aussi faire un petit apéro sur la plage non ?' },
  ],
  2: [
    { senderId: 'emilie', text: 'Trop bien, vivement qu\'on y soit ! 🎉' },
    { senderId: 'julien', text: 'Merci pour l\'info ! 👍' },
    { senderId: 'chloe', text: 'Ah cool, j\'avais la même question !' },
    { senderId: 'amina', text: 'Excellente idée, je m\'en occupe ! 💪' },
    { senderId: 'emilie', text: 'Quelqu\'un a des tips pour Santorin ?' },
    { senderId: 'julien', text: 'Hâte de rencontrer tout le monde en vrai !' },
    { senderId: 'chloe', text: 'Pareil, ça va être incroyable 🌅' },
    { senderId: 'amina', text: 'Vous allez adorer, croyez-moi 😍' },
  ],
}

// Messages directs voyageur ↔ créateur
export const creatorDmMessages = {
  1: [
    { id: 1, senderId: 'amina', text: 'Salut ! Bienvenue dans le voyage 🎉 N\'hésite pas si tu as des questions !', time: '10:00' },
    { id: 2, senderId: 'lucas', text: 'Merci Amina ! Trop content d\'y participer 😄', time: '10:05' },
    { id: 3, senderId: 'amina', text: 'Tu vas adorer, j\'ai préparé des surprises incroyables pour le groupe !', time: '10:07' },
  ],
  2: [
    { id: 1, senderId: 'amina', text: 'Hey ! Ravie de te compter parmi nous pour la Grèce ☀️', time: '09:30' },
    { id: 2, senderId: 'lucas', text: 'Hâte d\'y être ! Tu recommandes quoi comme maillot de bain ? 😂', time: '09:35' },
    { id: 3, senderId: 'amina', text: 'Haha prends-en plusieurs, on va beaucoup se baigner ! 🏊‍♀️', time: '09:38' },
  ],
}

export const creatorDmAutoReplies = {
  1: [
    { text: 'Super question ! Je regarde ça et je te dis 😊' },
    { text: 'Ah oui, c\'est noté ! Je m\'en occupe 💪' },
    { text: 'Trop bien, j\'adore ton enthousiasme ! 🔥' },
    { text: 'Je te tiens au courant dès que j\'ai la réponse !' },
  ],
  2: [
    { text: 'Bonne idée ! Je note pour le planning 📝' },
    { text: 'Ah génial, ça va être top ! 🌅' },
    { text: 'Je vérifie avec le guide local et je reviens vers toi !' },
    { text: 'T\'inquiète, tout est prévu ! 😄' },
  ],
}

// ─── Chat Sankofa (créateur ↔ support Sankofa) ─────────────────────────

export const sankofaChatMessages = {
  1: [
    { id: 1, senderId: 'sankofa', text: 'Bonjour Amina ! L\'équipe Sankofa est disponible pour vous accompagner sur votre voyage Bali 🌴', time: '09:00' },
    { id: 2, senderId: 'amina', text: 'Hello ! J\'ai une question sur le virement des acomptes, c\'est prévu quand ?', time: '09:15' },
    { id: 3, senderId: 'sankofa', text: 'Les acomptes sont virés automatiquement 48h après réception. Le prochain virement est prévu le 23 mai 💰', time: '09:18' },
    { id: 4, senderId: 'amina', text: 'Parfait merci ! Et pour l\'assurance groupe, c\'est bien inclus ?', time: '09:25' },
    { id: 5, senderId: 'sankofa', text: 'Oui, l\'assurance Sankofa Protect est incluse pour tous les participants. Vous avez le détail dans l\'onglet Infos Pratiques 📋', time: '09:28' },
  ],
  2: [
    { id: 1, senderId: 'sankofa', text: 'Hello Amina ! Tout est prêt pour le voyage Santorin ? L\'équipe est là si besoin 🇬🇷', time: '10:00' },
    { id: 2, senderId: 'amina', text: 'Oui presque ! Il me manque la confirmation du ferry inter-îles, vous avez des nouvelles ?', time: '10:10' },
    { id: 3, senderId: 'sankofa', text: 'Je vérifie avec notre partenaire local et je reviens vers vous dans l\'heure ! 🚤', time: '10:12' },
  ],
}

export const sankofaChatAutoReplies = {
  1: [
    { text: 'Bien noté ! Je transmets à l\'équipe et on revient vers vous rapidement 📩' },
    { text: 'Excellente question ! Laissez-moi vérifier et je vous tiens au courant 😊' },
    { text: 'C\'est en cours de traitement, vous aurez une réponse sous 24h ! 🙌' },
    { text: 'Pas de souci, tout est géré de notre côté. Concentrez-vous sur l\'expérience ! ✨' },
  ],
  2: [
    { text: 'Bien reçu ! L\'équipe s\'en occupe, on vous tient informée 📩' },
    { text: 'Bonne question, je vérifie tout de suite avec le prestataire 🔍' },
    { text: 'C\'est noté, vous aurez la réponse très vite ! 💪' },
    { text: 'On gère ça en priorité pour vous Amina ! 😊' },
  ],
}
