# 🎨 Galerie Interactive - Projet Pédagogique M1

> Projet starter pour le cours de Design d'Interfaces Interactives
> Master 1 - Université Paris 8

## 📋 Table des matières

- [Présentation](#-présentation)
- [Fonctionnalités](#-fonctionnalités)
- [Stack technique](#-stack-technique)
- [Installation](#-installation)
- [Configuration Supabase](#-configuration-supabase)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [Déploiement sur Vercel](#-déploiement-sur-vercel)
- [Guide pédagogique](#-guide-pédagogique)

---

## 🎯 Présentation

Ce projet est une **galerie d'images interactive** avec interface d'administration complète. Il a été conçu comme support pédagogique pour initier les étudiants aux technologies web modernes.

### Objectifs pédagogiques

- Comprendre l'architecture d'une application web moderne
- Maîtriser les bases de Vue.js et Nuxt 3
- Apprendre à interagir avec une base de données (Supabase)
- Gérer l'upload de fichiers et le storage cloud
- Déployer une application en production (Vercel)

---

## ✨ Fonctionnalités

### Interface publique (/)
- Galerie d'images en grille responsive (masonry layout)
- Animations au survol
- Affichage dynamique depuis la base de données
- Design moderne et épuré

### Interface d'administration (/admin)
- ➕ Ajouter une nouvelle image (upload + métadonnées)
- ✏️ Modifier le titre, la description et la position
- 🗑️ Supprimer une image
- 📋 Liste complète des images avec aperçu
- 🔄 Gestion de l'ordre d'affichage

---

## 🛠 Stack technique

| Technologie | Rôle |
|------------|------|
| **Nuxt 3** | Framework front-end (basé sur Vue.js) |
| **Vue 3** | Framework JavaScript réactif |
| **TypeScript** | Typage statique pour plus de sécurité |
| **Supabase** | Backend as a Service (BDD PostgreSQL + Storage + API) |
| **Vercel** | Plateforme de déploiement cloud |
| **CSS moderne** | Grid, Flexbox, animations |

---

## 🚀 Installation

### Prérequis

- Node.js 18+ installé ([télécharger](https://nodejs.org))
- Un compte Supabase gratuit ([s'inscrire](https://supabase.com))
- Un compte Vercel gratuit ([s'inscrire](https://vercel.com)) (optionnel pour le déploiement)

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd nuxt-gallery-starter
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Puis éditez le fichier `.env` avec vos identifiants Supabase :
```env
NUXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_publique
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application est accessible sur `http://localhost:3000`

---

## 🗄️ Configuration Supabase

### 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre **URL de projet** et votre **clé publique (anon key)**

### 2. Configuration automatique

La base de données a déjà été configurée automatiquement avec :
- ✅ Table `images` créée
- ✅ Bucket de storage `gallery-images` créé
- ✅ Politiques RLS (Row Level Security) configurées
- ✅ Données de démonstration insérées

### 3. Vérification

Dans votre dashboard Supabase :

- **Table Editor** → Vous devriez voir la table `images` avec 6 images de démo
- **Storage** → Le bucket `gallery-images` devrait être créé et public

### Structure de la table `images`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | uuid | Identifiant unique (auto-généré) |
| `title` | text | Titre de l'image |
| `description` | text | Description (optionnelle) |
| `image_url` | text | URL de l'image |
| `position` | integer | Ordre d'affichage (0 = premier) |
| `created_at` | timestamptz | Date de création |

---

## 📖 Utilisation

### Interface publique

Accédez à `http://localhost:3000` pour voir la galerie publique.

### Interface d'administration

1. Accédez à `http://localhost:3000/admin`
2. Ajoutez une nouvelle image :
   - Sélectionnez un fichier (JPG, PNG, GIF, WebP)
   - Remplissez le titre et la description
   - Définissez la position (ordre d'affichage)
   - Cliquez sur "Ajouter l'image"

3. Modifiez une image existante :
   - Cliquez sur "Modifier"
   - Changez les informations
   - Cliquez sur "Enregistrer"

4. Supprimez une image :
   - Cliquez sur "Supprimer"
   - Confirmez la suppression

---

## 📁 Structure du projet

```
nuxt-gallery-starter/
│
├── assets/
│   └── css/
│       └── main.css              # Styles globaux
│
├── components/
│   ├── GalleryGrid.vue           # Grille responsive d'images
│   └── GalleryItem.vue           # Carte individuelle d'image
│
├── composables/
│   └── useImages.ts              # Logique CRUD réutilisable
│
├── pages/
│   ├── index.vue                 # Page d'accueil (galerie publique)
│   └── admin.vue                 # Interface d'administration
│
├── public/
│   └── favicon.ico               # Icône du site
│
├── utils/
│   └── supabase.ts               # Configuration client Supabase
│
├── .env.example                  # Template des variables d'environnement
├── .gitignore                    # Fichiers à ignorer par Git
├── app.vue                       # Composant racine
├── nuxt.config.ts                # Configuration Nuxt
├── package.json                  # Dépendances du projet
├── README.md                     # Ce fichier
└── tsconfig.json                 # Configuration TypeScript
```

### Fichiers clés

- **`utils/supabase.ts`** : Configuration du client Supabase et types TypeScript
- **`composables/useImages.ts`** : Toutes les fonctions CRUD (Create, Read, Update, Delete)
- **`pages/index.vue`** : Page publique affichant la galerie
- **`pages/admin.vue`** : Interface d'administration complète
- **`components/GalleryGrid.vue`** : Grille responsive avec CSS Grid
- **`components/GalleryItem.vue`** : Carte d'image avec animations

---

## 🌍 Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (recommandée)

1. **Pushez votre code sur GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connectez-vous à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Add New Project"
   - Importez votre repository GitHub

3. **Configurez les variables d'environnement**
   - Dans les settings du projet Vercel
   - Ajoutez :
     - `NUXT_PUBLIC_SUPABASE_URL`
     - `NUXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Déployez**
   - Vercel build et déploie automatiquement
   - Chaque push sur `main` redéploie automatiquement

### Méthode 2 : Via la CLI Vercel

```bash
# Installer la CLI Vercel
npm i -g vercel

# Déployer
vercel

# Déployer en production
vercel --prod
```

### Configuration automatique

Le projet est déjà configuré pour Vercel :
- Build command : `npm run build`
- Output directory : `.output/public`
- Framework : Nuxt.js détecté automatiquement

---

## 📚 Guide pédagogique

### Progression suggérée pour les étudiants

#### Niveau 1 : Découverte (Jour 1-2)
- [ ] Installer le projet et comprendre la structure
- [ ] Explorer le code de `index.vue` (affichage simple)
- [ ] Comprendre le système de composants Vue
- [ ] Modifier les styles CSS dans `GalleryItem.vue`

#### Niveau 2 : Interaction avec la base (Jour 2-3)
- [ ] Étudier `useImages.ts` et les fonctions CRUD
- [ ] Comprendre comment fonctionne `fetchImages()`
- [ ] Ajouter une image via l'interface admin
- [ ] Observer les changements dans Supabase

#### Niveau 3 : Développement de fonctionnalités (Jour 3-4)
- [ ] Ajouter un système de filtrage par catégorie
- [ ] Implémenter une recherche par titre
- [ ] Ajouter un système de likes/favoris
- [ ] Créer une page de détail pour chaque image

#### Niveau 4 : Déploiement (Jour 4-5)
- [ ] Pusher le code sur GitHub
- [ ] Déployer sur Vercel
- [ ] Configurer un nom de domaine personnalisé
- [ ] Présenter le projet à la classe

### Exercices suggérés

1. **Exercice CSS** : Changer le thème de couleurs de l'application
2. **Exercice Vue** : Ajouter un bouton "Charger plus" avec pagination
3. **Exercice Supabase** : Ajouter un champ "category" à la table
4. **Exercice complet** : Implémenter un système de tags pour les images

---

## 🎓 Concepts clés abordés

### Vue.js / Nuxt 3
- Composition API avec `<script setup>`
- Réactivité avec `ref()` et `reactive()`
- Lifecycle hooks (`onMounted`)
- Props et events
- Routing automatique basé sur les fichiers

### Base de données
- Modélisation de données (table `images`)
- CRUD complet (Create, Read, Update, Delete)
- Requêtes SQL via l'ORM Supabase
- Relations et contraintes

### Storage cloud
- Upload de fichiers
- Génération d'URLs publiques
- Gestion des permissions
- Nettoyage des fichiers orphelins

### Design & UX
- Layout responsive (mobile-first)
- CSS Grid et Flexbox
- Animations et transitions
- États de chargement et d'erreur
- Feedback utilisateur

### DevOps
- Variables d'environnement
- Build et optimisation
- Déploiement continu (CI/CD)
- Gestion de versions avec Git

---

## 🐛 Résolution de problèmes

### L'application ne se lance pas
- Vérifiez que Node.js 18+ est installé : `node -v`
- Supprimez `node_modules` et relancez : `rm -rf node_modules && npm install`

### Les images ne s'affichent pas
- Vérifiez vos variables d'environnement dans `.env`
- Vérifiez que le bucket Supabase est bien public
- Ouvrez la console du navigateur pour voir les erreurs

### L'upload d'images ne fonctionne pas
- Vérifiez que le bucket `gallery-images` existe dans Supabase
- Vérifiez les politiques RLS (doivent permettre l'insertion)
- Vérifiez la taille du fichier (max 5 MB)

### Erreur "module not found"
- Assurez-vous d'avoir installé toutes les dépendances : `npm install`
- Vérifiez que les imports utilisent la syntaxe correcte (`~/` pour les imports relatifs)

---

## 📝 Notes pour les enseignants

### Points d'attention

- **Sécurité** : Les politiques RLS sont configurées en mode "public" pour simplifier l'apprentissage. Dans un projet réel, il faudrait ajouter une authentification.

- **Authentification** : Le code inclut des commentaires pour ajouter un système d'auth. C'est une excellente extension pour les étudiants avancés.

- **Performance** : Le projet n'inclut pas de pagination pour rester simple. C'est un bon exercice à proposer aux étudiants.

### Variantes possibles

1. **Version simplifiée** : Retirer l'upload et utiliser uniquement des URLs externes
2. **Version avancée** : Ajouter l'authentification et les catégories
3. **Version portfolio** : Adapter pour créer un portfolio personnel

---

## 🤝 Contributions

Ce projet est ouvert aux améliorations ! Les étudiants peuvent :
- Proposer de nouvelles fonctionnalités
- Améliorer le design
- Corriger des bugs
- Améliorer la documentation

---

## 📄 Licence

Projet pédagogique - Libre d'utilisation et de modification

---

## 👨‍🏫 Contact

Pour toute question sur le projet ou le cours :
- Email : [votre-email@univ-paris8.fr]
- Cours : Master 1 Design d'Interfaces Interactives
- Université : Paris 8

---

**Bon code ! 🚀**
