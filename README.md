# Next Mqtt Dashboard

[![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm) [![GitHub version](https://badge.fury.io/gh/username%2Frepository.svg)](https://badge.fury.io/gh/username%2Frepository)

## Vue d'ensemble

Ce projet est une interface de tableau de bord pour le suivi de plusieurs valeurs de capteurs (température en Celsius, qualité de l'air, nombre de personnes). Ces valeurs sont fournies par un backend Python via le protocole MQTT. L'interface utilisateur est construite avec le framework Next.js.

## Fonctionnalités

- Écoute des données de capteurs à partir des sujets MQTT
- Affichage en temps réel des valeurs de capteur dans le tableau de bord
- Connexion persistante à un broker MQTT HiveMQ à travers l'application
- Graphique des données venant du broker MQTT

## Dépendances

Ce projet utilise les bibliothèques suivantes :

- Next.js
- MQTT.js
- React 18.2.0
- Recharts
- react-use
- lucide-react
- Tailwind Merge
- Clsx
- @radix-ui/react-slot
- @radix-ui/react-tabs
- @radix-ui/react-toast
- Sharp
- next-themes

## Installation

1. Clonez ce dépôt :

```bash
git clone https://github.com/username/repository.git
```

2. Naviguez vers le dossier du projet :

```bash
cd repository
```

3. Installez les dépendances :

```bash
yarn
```

4. Lancez le serveur de développement :

```bash
yarn dev
```

## Utilisation

Naviguez vers `localhost:3000` dans votre navigateur pour voir l'application en action.

## Contribuer

Les pull requests sont les bienvenues. Pour les changements majeurs, veuillez ouvrir une issue pour discuter de ce que vous aimeriez changer.

## Licence

[MIT](https://choosealicense.com/licenses/mit/)
