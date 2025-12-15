Oui. Voici **un README unique, condensé et cohérent**, qui fusionne **README + QUICKSTART + GUIDE_DÉPLOIEMENT + ARBORESCENCE** sans perte pédagogique, mais **sans redondance**.

Objectif du document:

* lisible pour un étudiant en 5 minutes
* suffisant pour comprendre l’architecture
* complet pour installer, utiliser et déployer
* **un seul fichier à maintenir**

---

# 🎨 Galerie Interactive – Projet pédagogique M1

> Projet starter pour le cours de **Design d’Interfaces Interactives**
> Master 1 – Université Paris 8

Galerie d’images interactive avec interface d’administration complète, conçue comme **support pédagogique** pour découvrir une application web moderne de bout en bout: frontend, base de données, storage et déploiement.

---

## 🎯 Objectifs pédagogiques

* Comprendre l’architecture d’une application web moderne
* Découvrir Nuxt 3 et la Composition API de Vue
* Manipuler une base de données PostgreSQL via Supabase
* Gérer l’upload de fichiers (storage cloud)
* Utiliser des variables d’environnement
* Déployer une application en production (Vercel)

---

## ✨ Fonctionnalités

### Interface publique `/`

* Galerie d’images responsive
* Chargement dynamique depuis la base
* Animations CSS
* Design moderne et épuré

### Interface d’administration `/admin`

* ➕ Ajouter une image (upload + métadonnées)
* ✏️ Modifier titre, description et ordre
* 🗑️ Supprimer une image (BDD + storage)
* 🔄 Gestion de l’ordre d’affichage

---

## 🛠 Stack technique

| Technologie | Rôle                      |
| ----------- | ------------------------- |
| Nuxt 3      | Framework front-end       |
| Vue 3       | Composition API           |
| TypeScript  | Typage statique           |
| Supabase    | PostgreSQL + Storage      |
| Vercel      | Déploiement               |
| CSS moderne | Grid, Flexbox, animations |

---

## 🚀 Installation rapide (5 minutes)

### Prérequis

* Node.js 18+
* Compte Supabase (gratuit)
* Compte Vercel (optionnel)

### Installation

```bash
git clone <votre-repo>
cd nuxt-gallery-starter
npm install
cp .env.example .env
npm run dev
```

Application disponible sur
👉 `http://localhost:3000`

---

## 🔐 Configuration Supabase

Dans `.env`:

```env
NUXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx
```

Supabase fournit:

* une **clé publique (anon)** prévue pour le navigateur
* la sécurité repose sur les **policies RLS**

La base inclut:

* table `images`
* bucket `gallery-images`
* accès public contrôlé

### Table `images`

| Champ       | Type        | Description  |
| ----------- | ----------- | ------------ |
| id          | uuid        | Identifiant  |
| title       | text        | Titre        |
| description | text        | Description  |
| image_url   | text        | URL publique |
| position    | int         | Ordre        |
| created_at  | timestamptz | Date         |

---

## 🧠 Architecture technique (point clé)

* Supabase est initialisé **uniquement côté client**
* via un **plugin Nuxt `supabase.client.ts`**
* injecté sous forme de `$supabase`
* utilisé dans les composables (`useImages`)

➡️ Aucun `process.env` direct dans le code métier
➡️ Compatible Vercel / production

---

## 📁 Structure du projet

```
nuxt-gallery-starter/
│
├── assets/css/main.css        # Styles globaux
├── components/               # Composants Vue
│   ├── GalleryGrid.vue
│   └── GalleryItem.vue
├── composables/
│   └── useImages.ts          # CRUD images
├── pages/
│   ├── index.vue             # Galerie publique
│   └── admin.vue             # Interface admin
├── plugins/
│   └── supabase.client.ts    # Client Supabase (client-only)
├── utils/
│   └── supabase.ts           # Types TypeScript uniquement
├── .env.example
├── nuxt.config.ts
└── README.md
```

---

## 📖 Utilisation

### Galerie publique

`/`
Affiche toutes les images triées par position.

### Administration

`/admin`

Actions possibles:

* upload d’image
* modification des infos
* suppression
* réorganisation

---

## 🌍 Déploiement sur Vercel

### Étapes

1. Push du projet sur GitHub
2. Import du repo dans Vercel
3. Ajouter les variables:

   * `NUXT_PUBLIC_SUPABASE_URL`
   * `NUXT_PUBLIC_SUPABASE_ANON_KEY`
4. Déploiement automatique 🎉

Chaque `git push` déclenche un redeploy.

---

## 🐛 Dépannage rapide

### Erreur `supabaseUrl is required`

* vérifier les variables d’environnement
* vérifier `plugins/supabase.client.ts`
* vérifier l’usage de `$supabase`

### Images non visibles

* bucket `gallery-images` public
* policies RLS autorisant la lecture
* URLs correctes

---

## 📚 Progression pédagogique suggérée

### Niveau 1 – Découverte

* Structure Nuxt
* Pages et composants
* CSS

### Niveau 2 – Données

* Composable `useImages`
* CRUD Supabase
* Storage

### Niveau 3 – Extensions

* Recherche
* Catégories
* Pagination
* Lightbox

### Niveau 4 – Production

* Variables d’environnement
* Vercel
* Sécurité et RLS

---

## 🎓 Notes pour les enseignants

* Sécurité volontairement simplifiée
* Authentification = extension idéale
* Architecture proche d’un projet réel
* Code très commenté pour l’apprentissage

---

## 📄 Licence

Projet pédagogique
Libre d’utilisation et de modification.

---

## 👨‍🏫 Contact

Master 1 – Design d’Interfaces Interactives
Université Paris 8
Contact enseignant: *à compléter*

---

**Bon code et bonne exploration 🚀**

Si tu veux ensuite:

* une version **ultra-courte pour étudiants**
* un **README enseignants**
* ou un **diagramme d’architecture**

je peux te les générer à partir de celui-ci sans effort supplémentaire.
