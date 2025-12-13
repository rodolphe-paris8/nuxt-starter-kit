# Guide de Déploiement - Vercel

Ce guide explique comment déployer votre galerie d'images sur Vercel, étape par étape.

## Prérequis

- Un compte GitHub (gratuit)
- Un compte Vercel (gratuit)
- Votre projet fonctionnel en local

---

## Étape 1 : Préparer le projet

### 1.1 Vérifier que le projet fonctionne en local

```bash
npm run dev
```

Testez l'application sur `http://localhost:3000` et vérifiez que :
- La galerie s'affiche correctement
- L'interface admin fonctionne
- Vous pouvez ajouter/modifier/supprimer des images

### 1.2 Tester le build de production

```bash
npm run build
```

Si le build réussit, vous êtes prêt pour le déploiement !

---

## Étape 2 : Pousser sur GitHub

### 2.1 Initialiser Git (si ce n'est pas déjà fait)

```bash
git init
git add .
git commit -m "Initial commit - Galerie interactive"
```

### 2.2 Créer un repository sur GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur le bouton **"New repository"** (en vert)
3. Donnez un nom à votre repo : `galerie-interactive`
4. Laissez-le **public** ou **privé** (au choix)
5. **Ne cochez pas** "Initialize with README" (vous avez déjà un README)
6. Cliquez sur **"Create repository"**

### 2.3 Lier votre projet local au repository GitHub

```bash
git remote add origin https://github.com/VOTRE-USERNAME/galerie-interactive.git
git branch -M main
git push -u origin main
```

Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub.

---

## Étape 3 : Déployer sur Vercel

### 3.1 Créer un compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à votre compte GitHub

### 3.2 Importer votre projet

1. Sur le dashboard Vercel, cliquez sur **"Add New..."** puis **"Project"**
2. Vercel va lister vos repositories GitHub
3. Trouvez `galerie-interactive` et cliquez sur **"Import"**

### 3.3 Configurer le projet

Vercel détecte automatiquement que c'est un projet Nuxt 3 !

#### Configuration de base (déjà remplie automatiquement) :
- **Framework Preset** : Nuxt.js
- **Build Command** : `npm run build`
- **Output Directory** : `.output/public`
- **Install Command** : `npm install`

#### Variables d'environnement (IMPORTANT !)

Cliquez sur **"Environment Variables"** et ajoutez :

| Name | Value |
|------|-------|
| `NUXT_PUBLIC_SUPABASE_URL` | `votre-url-supabase` |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | `votre-cle-anon` |

Pour trouver ces valeurs :
1. Allez sur votre dashboard Supabase
2. Cliquez sur **Settings** (icône engrenage)
3. Allez dans **API**
4. Copiez **Project URL** et **anon public**

### 3.4 Lancer le déploiement

1. Vérifiez que toutes les variables sont correctes
2. Cliquez sur **"Deploy"**
3. Attendez quelques minutes (1-3 min en général)
4. Vercel va :
   - Installer les dépendances
   - Builder le projet
   - Déployer sur un CDN global

---

## Étape 4 : Vérifier le déploiement

### 4.1 Accéder à votre site

Une fois le déploiement terminé :
1. Vercel affiche un message **"Congratulations"**
2. Cliquez sur **"Visit"** ou sur l'URL générée
3. Votre site est en ligne ! 🎉

L'URL ressemblera à : `https://galerie-interactive-xxxxx.vercel.app`

### 4.2 Tester les fonctionnalités

Testez votre site en production :
- [ ] La page d'accueil affiche la galerie
- [ ] Les images se chargent correctement
- [ ] L'interface admin (`/admin`) est accessible
- [ ] Vous pouvez ajouter une image
- [ ] L'upload fonctionne
- [ ] La modification et suppression fonctionnent

---

## Étape 5 : Déploiements automatiques

### Comment ça marche ?

Vercel est maintenant connecté à votre repository GitHub. Chaque fois que vous faites un `git push`, Vercel redéploie automatiquement votre site !

### Workflow de mise à jour :

1. **Modifiez votre code localement**
```bash
# Exemple : changer une couleur dans main.css
```

2. **Committez et poussez**
```bash
git add .
git commit -m "Amélioration du design"
git push
```

3. **Vercel redéploie automatiquement**
   - Allez sur votre dashboard Vercel
   - Vous verrez le nouveau déploiement en cours
   - Attendez 1-2 minutes
   - Le site est mis à jour !

---

## Configuration avancée (optionnel)

### Personnaliser le nom de domaine

Par défaut, Vercel donne une URL comme `projet-xxxxx.vercel.app`. Vous pouvez la personnaliser :

1. Dans votre projet Vercel, allez dans **Settings**
2. Cliquez sur **Domains**
3. Ajoutez un domaine personnalisé :
   - Gratuit : `mon-projet.vercel.app`
   - Avec votre propre domaine : `galerie.monsite.com` (nécessite un domaine acheté)

### Variables d'environnement par environnement

Vercel permet de définir des variables différentes pour :
- **Production** : le site live
- **Preview** : les branches de test
- **Development** : l'environnement local

Cela permet par exemple d'utiliser une base de données de test pour les previews.

### Branches de preview

Vercel crée automatiquement une URL de preview pour chaque branche Git :
1. Créez une branche : `git checkout -b nouvelle-fonctionnalite`
2. Poussez : `git push origin nouvelle-fonctionnalite`
3. Vercel crée une URL de preview : `projet-git-nouvelle-fonctionnalite.vercel.app`
4. Testez avant de merger dans `main`

---

## Dépannage

### Le build échoue

**Erreur : "Module not found"**
- Vérifiez que toutes les dépendances sont dans `package.json`
- Localement : `npm install` puis `npm run build`
- Si ça marche en local, ça marchera sur Vercel

**Erreur : "Environment variable not set"**
- Vérifiez que vous avez bien ajouté les variables d'environnement Supabase
- Allez dans Settings > Environment Variables
- Vérifiez que les noms sont exacts (majuscules/minuscules)

### Les images ne s'affichent pas

**Vérifiez :**
- Les variables Supabase sont correctes
- Le bucket `gallery-images` est bien **public**
- Les politiques RLS permettent la lecture publique

**Dans Supabase :**
1. Storage > gallery-images
2. Cliquez sur les 3 points > Make public
3. Table Editor > images > RLS policies > Vérifier "Lecture publique"

### L'upload ne fonctionne pas en production

**Vérifiez :**
- La politique d'upload dans Supabase Storage
- Que le bucket accepte les insertions anonymes
- La taille du fichier (max 5 MB)

---

## Métriques et monitoring

### Analytics Vercel (gratuit)

Activez les analytics pour suivre :
- Nombre de visiteurs
- Pages les plus visitées
- Performance du site
- Pays des visiteurs

1. Dans votre projet Vercel
2. Allez dans **Analytics**
3. Activez **Web Analytics**

### Logs

Pour voir les logs en temps réel :
1. Dans votre projet Vercel
2. Allez dans **Deployments**
3. Cliquez sur un déploiement
4. Onglet **Functions** ou **Build Logs**

---

## Récapitulatif

1. ✅ Projet qui fonctionne en local
2. ✅ Code poussé sur GitHub
3. ✅ Projet importé sur Vercel
4. ✅ Variables d'environnement configurées
5. ✅ Déploiement réussi
6. ✅ Site accessible en ligne
7. ✅ Déploiements automatiques activés

**Félicitations, votre galerie est en ligne ! 🚀**

---

## Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Nuxt](https://nuxt.com/docs)
- [Supabase + Vercel](https://supabase.com/docs/guides/getting-started/quickstarts/nuxtjs)
- [Support Vercel](https://vercel.com/support)
