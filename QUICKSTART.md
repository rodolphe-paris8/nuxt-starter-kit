# Quick Start - Démarrage rapide

Guide ultra-rapide pour démarrer le projet en 5 minutes.

## Installation express

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le projet
npm run dev
```

Ouvrez `http://localhost:3000` dans votre navigateur.

---

## Configuration minimale

Le projet est déjà configuré avec Supabase. Les variables d'environnement sont dans le fichier `.env` :

```env
NUXT_PUBLIC_SUPABASE_URL=...
NUXT_PUBLIC_SUPABASE_ANON_KEY=...
```

La base de données est déjà prête avec :
- ✅ Table `images` créée
- ✅ 6 images de démonstration
- ✅ Storage configuré

---

## Pages disponibles

### Page publique
**URL** : `http://localhost:3000`

Affiche la galerie d'images en grille responsive.

### Interface admin
**URL** : `http://localhost:3000/admin`

Permet de :
- Ajouter une nouvelle image
- Modifier titre/description/position
- Supprimer une image

---

## Tester l'ajout d'une image

1. Allez sur `/admin`
2. Sélectionnez une image sur votre ordinateur
3. Remplissez le titre et la description
4. Cliquez sur "Ajouter l'image"
5. L'image apparaît dans la galerie publique

---

## Commandes principales

```bash
# Développement (avec hot-reload)
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview
```

---

## Structure des fichiers

```
├── pages/
│   ├── index.vue         # Page publique (/)
│   └── admin.vue         # Interface admin (/admin)
├── components/
│   ├── GalleryGrid.vue   # Grille d'images
│   └── GalleryItem.vue   # Carte d'image
├── composables/
│   └── useImages.ts      # Fonctions CRUD
└── utils/
    └── supabase.ts       # Config Supabase
```

---

## Premier exercice

### Modifier la couleur du header

1. Ouvrez `pages/index.vue`
2. Cherchez `.page-header` dans les styles
3. Changez `background: white;` par `background: lightblue;`
4. Sauvegardez, le navigateur se rafraîchit automatiquement

### Ajouter un nouveau champ

1. Ouvrez votre dashboard Supabase
2. Table Editor > images > Add Column
3. Nom : `author`, Type : `text`
4. Dans `pages/admin.vue`, ajoutez un champ input pour l'auteur
5. Modifiez `composables/useImages.ts` pour inclure ce champ

---

## En cas de problème

### L'application ne se lance pas

```bash
# Supprimez les fichiers générés
rm -rf node_modules .nuxt .output

# Réinstallez
npm install

# Relancez
npm run dev
```

### Les images ne s'affichent pas

Vérifiez :
1. Les variables d'environnement dans `.env`
2. Que le bucket Supabase est public
3. La console du navigateur (F12) pour voir les erreurs

---

## Prochaines étapes

1. **Lisez le README.md** pour une compréhension complète
2. **Consultez ARBORESCENCE.md** pour comprendre l'organisation
3. **Suivez GUIDE_DEPLOIEMENT.md** pour mettre en ligne

---

## Ressources utiles

- [Documentation Nuxt 3](https://nuxt.com)
- [Documentation Vue 3](https://vuejs.org)
- [Documentation Supabase](https://supabase.com/docs)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

**Vous êtes prêt à coder ! 🚀**
