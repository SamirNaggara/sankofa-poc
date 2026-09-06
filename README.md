# Sankofa POC

Maquette interactive de **Sanko**, la plateforme qui permet à des créateurs de contenu d'organiser un voyage avec leur communauté. Réalisée en mai 2026 comme **preuve de concept** pour des présentations : ce n'est pas le produit final, et le code de production n'est pas celui-ci.

Tout est simulé. Il n'y a pas de backend, pas de base de données, pas d'appel réseau : les voyages, les sondages, les conversations et les résultats viennent de `src/data/fakeData.js`. L'objectif était de faire ressentir le parcours, côté créateur et côté voyageur, avant d'écrire la vraie plateforme.

## Ce que la maquette montre

- **Côté créateur** : onboarding, tableau de bord, création et résultats de sondage, organisation du voyage, échange avec un expert.
- **Côté voyageur** : sondage public, page de vente du voyage, détail et carnet d'aventure.
- **Côté équipe** : barre d'administration et tiroir de partage.

## Stack

React 19, Vite, Tailwind, Framer Motion pour les transitions, Leaflet pour les cartes, Recharts pour les graphiques.

## Lancer

```bash
npm install
npm run dev
```

L'accès est protégé par un code défini dans `VITE_ACCESS_CODE` (fichier `.env`, non versionné). Sans cette variable, la porte reste fermée.

## Licence

MIT. Voir [LICENSE](./LICENSE).
