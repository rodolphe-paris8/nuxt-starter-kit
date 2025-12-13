# Arborescence du projet

Ce document présente l'organisation complète du projet et le rôle de chaque fichier.

## Structure globale

```
nuxt-gallery-starter/
│
├── 📁 assets/               # Ressources statiques (CSS, images, fonts)
│   └── 📁 css/
│       └── main.css         # Styles globaux de l'application
│
├── 📁 components/           # Composants Vue réutilisables
│   ├── GalleryGrid.vue      # Grille responsive d'images
│   └── GalleryItem.vue      # Carte individuelle d'image avec animations
│
├── 📁 composables/          # Logique réutilisable (Composition API)
│   └── useImages.ts         # Fonctions CRUD pour les images
│
├── 📁 pages/                # Pages de l'application (routing automatique)
│   ├── index.vue            # Page d'accueil - Galerie publique
│   └── admin.vue            # Interface d'administration (CRUD)
│
├── 📁 public/               # Fichiers publics accessibles directement
│   └── favicon.ico          # Icône du site
│
├── 📁 utils/                # Utilitaires et helpers
│   └── supabase.ts          # Configuration client Supabase + types TS
│
├── 📄 .env                  # Variables d'environnement (LOCAL - ne pas commit)
├── 📄 .env.example          # Template des variables d'environnement
├── 📄 .gitignore            # Fichiers à exclure de Git
├── 📄 app.vue               # Composant racine de l'application
├── 📄 ARBORESCENCE.md       # Ce fichier
├── 📄 GUIDE_DEPLOIEMENT.md  # Guide pas à pas pour déployer sur Vercel
├── 📄 nuxt.config.ts        # Configuration principale de Nuxt 3
├── 📄 package.json          # Dépendances et scripts npm
├── 📄 README.md             # Documentation principale du projet
└── 📄 tsconfig.json         # Configuration TypeScript
```

---

## Description détaillée des dossiers

### 📁 `assets/`
Contient les ressources qui seront **processées** par le build (optimisation, minification).

- **`css/main.css`** : Styles globaux CSS
  - Reset CSS
  - Variables CSS (couleurs, espacements)
  - Classes utilitaires
  - Styles typographiques

### 📁 `components/`
Composants Vue réutilisables. Nuxt les importe automatiquement.

- **`GalleryGrid.vue`** : Conteneur de la grille d'images
  - Layout responsive avec CSS Grid
  - Gestion de l'état vide
  - Adaptation mobile/tablette/desktop

- **`GalleryItem.vue`** : Carte individuelle pour une image
  - Affichage image + titre + description
  - Animations au survol (hover)
  - Overlay avec dégradé

### 📁 `composables/`
Fonctions réutilisables basées sur la Composition API de Vue 3.

- **`useImages.ts`** : Toute la logique CRUD
  - `fetchImages()` : Récupérer toutes les images
  - `createImage()` : Ajouter une nouvelle image
  - `updateImage()` : Modifier une image existante
  - `deleteImage()` : Supprimer une image de la BDD
  - `uploadImage()` : Uploader un fichier vers Supabase Storage
  - `deleteImageFromStorage()` : Supprimer un fichier du storage

### 📁 `pages/`
Pages de l'application. Le routing est automatique basé sur la structure de fichiers.

- **`index.vue`** : Page d'accueil (`/`)
  - Affichage public de la galerie
  - Chargement automatique des images
  - États de chargement et d'erreur
  - Lien vers l'admin

- **`admin.vue`** : Interface d'administration (`/admin`)
  - Formulaire d'ajout d'image
  - Liste des images existantes
  - Édition inline
  - Suppression avec confirmation

### 📁 `public/`
Fichiers servis tels quels, sans traitement.

- **`favicon.ico`** : Icône affichée dans l'onglet du navigateur

### 📁 `utils/`
Utilitaires et configurations partagés.

- **`supabase.ts`** : Configuration du client Supabase
  - Création du client singleton
  - Types TypeScript (`Image`, `NewImage`)
  - Export pour réutilisation

---

## Fichiers de configuration

### 📄 `.env`
Variables d'environnement LOCAL (ne JAMAIS commit ce fichier).

```env
NUXT_PUBLIC_SUPABASE_URL=...
NUXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 📄 `.env.example`
Template à copier pour créer votre `.env` local.

### 📄 `.gitignore`
Fichiers à exclure de Git :
- `node_modules/`
- `.nuxt/`
- `.output/`
- `.env`
- `dist/`

### 📄 `app.vue`
Point d'entrée de l'application Nuxt.
- Contient `<NuxtPage />` qui affiche la page courante
- Layout global de l'application

### 📄 `nuxt.config.ts`
Configuration principale de Nuxt 3 :
- Métadonnées (title, meta tags)
- Variables d'environnement runtime
- Import du CSS global
- Configuration des modules

### 📄 `package.json`
Manifeste du projet npm :
- Nom et version du projet
- Dépendances :
  - `nuxt` : Framework
  - `vue` : Bibliothèque réactive
  - `@supabase/supabase-js` : Client Supabase
- Scripts :
  - `npm run dev` : Lancer le serveur de dev
  - `npm run build` : Build de production
  - `npm run preview` : Preview du build

### 📄 `tsconfig.json`
Configuration TypeScript :
- Étend la config auto-générée par Nuxt
- Active le mode strict
- Gère la résolution des modules

---

## Flux de données

### Chargement de la galerie publique

```
1. Utilisateur arrive sur /
2. index.vue se monte (onMounted)
3. Appel de fetchImages() depuis useImages()
4. useImages() interroge Supabase :
   - SELECT * FROM images ORDER BY position
5. Données retournées et stockées dans images[]
6. GalleryGrid reçoit les données via props
7. GalleryGrid boucle et affiche des GalleryItem
8. Chaque GalleryItem affiche une image
```

### Ajout d'une image (admin)

```
1. Utilisateur remplit le formulaire dans /admin
2. Sélectionne un fichier image
3. Clique sur "Ajouter"
4. handleAddImage() est déclenché :
   a. uploadImage(fichier)
      → Upload vers Supabase Storage
      → Retourne l'URL publique
   b. createImage({titre, description, url, position})
      → INSERT dans la table images
   c. loadImages()
      → Rafraîchit la liste
5. L'image apparaît dans la liste
```

### Modification d'une image

```
1. Utilisateur clique sur "Modifier"
2. startEdit(image) remplit le formulaire inline
3. Utilisateur modifie les champs
4. Clique sur "Enregistrer"
5. handleSaveEdit(id) est déclenché :
   → updateImage(id, nouveauxDonnées)
   → UPDATE dans Supabase
   → loadImages() rafraîchit
6. Les modifications sont visibles
```

### Suppression d'une image

```
1. Utilisateur clique sur "Supprimer"
2. Confirmation (confirm())
3. Si confirmé, handleDelete(image) :
   a. deleteImage(id)
      → DELETE FROM images WHERE id = ...
   b. Si l'image vient du storage Supabase :
      deleteImageFromStorage(url)
      → Supprime le fichier du storage
   c. loadImages() rafraîchit
4. L'image disparaît de la liste
```

---

## Conventions de code

### Nommage

- **Composants** : PascalCase (`GalleryGrid.vue`)
- **Composables** : camelCase avec préfixe `use` (`useImages.ts`)
- **Fichiers utils** : camelCase (`supabase.ts`)
- **Fonctions** : camelCase (`fetchImages()`)
- **Types TypeScript** : PascalCase (`Image`, `NewImage`)

### Structure d'un composant Vue

```vue
<template>
  <!-- HTML du composant -->
</template>

<script setup lang="ts">
// Imports
// Props
// Variables réactives
// Fonctions
// Lifecycle hooks
</script>

<style scoped>
/* Styles du composant */
</style>
```

### Commentaires

Le code est abondamment commenté pour faciliter l'apprentissage :
- Commentaires de bloc pour les sections
- Commentaires inline pour les lignes complexes
- JSDoc pour les fonctions importantes

---

## Routes de l'application

| Route | Fichier | Description |
|-------|---------|-------------|
| `/` | `pages/index.vue` | Galerie publique |
| `/admin` | `pages/admin.vue` | Interface d'administration |

Nuxt génère automatiquement les routes basées sur les fichiers du dossier `pages/`.

---

## Commandes utiles

### Développement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de dev
npm run dev

# Voir l'application
http://localhost:3000
```

### Production

```bash
# Build de production
npm run build

# Preview du build
npm run preview
```

### Maintenance

```bash
# Nettoyer les fichiers générés
rm -rf .nuxt .output node_modules

# Réinstaller
npm install
```

---

## Évolutions possibles

### Facile
- Ajouter un champ "catégorie" aux images
- Implémenter un système de filtrage
- Ajouter une barre de recherche
- Pagination des images

### Intermédiaire
- Système d'authentification
- Gestion des utilisateurs
- Système de likes/favoris
- Galerie en mode lightbox (zoom)

### Avancé
- Upload multiple d'images
- Drag & drop pour réorganiser
- Édition d'image (crop, resize)
- Génération de miniatures automatiques
- API publique REST

---

## Ressources pour aller plus loin

### Documentation officielle
- [Nuxt 3](https://nuxt.com)
- [Vue 3](https://vuejs.org)
- [Supabase](https://supabase.com/docs)
- [TypeScript](https://www.typescriptlang.org)

### Tutoriels
- [Nuxt 3 Tutorial](https://nuxt.com/docs/getting-started/introduction)
- [Vue Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)

### Outils
- [Vue DevTools](https://devtools.vuejs.org)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

---

**Ce document évolue avec le projet. N'hésitez pas à le compléter !**
