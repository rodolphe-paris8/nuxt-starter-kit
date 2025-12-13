<!--
  PAGE D'ACCUEIL - GALERIE PUBLIQUE

  Cette page affiche la galerie d'images pour le public.
  Elle récupère les données depuis Supabase au chargement.

  Fonctionnalités :
  - Chargement automatique des images
  - Affichage en grille responsive
  - État de chargement
  - Gestion des erreurs
-->

<template>
  <div class="home-page">
    <!-- En-tête de la page -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="main-title">Galerie Interactive</h1>
        <p class="subtitle">
          Projet pédagogique M1 - Design d'interfaces interactives
        </p>
        <p class="university">Université Paris 8</p>

        <!-- Lien vers l'admin -->
        <NuxtLink to="/admin" class="admin-link">
          Interface d'administration →
        </NuxtLink>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="main-content">
      <!-- État de chargement -->
      <div v-if="loading" class="loading-state">
        <div class="loader"></div>
        <p>Chargement de la galerie...</p>
      </div>

      <!-- Message d'erreur -->
      <div v-else-if="error" class="error-state">
        <p>❌ Erreur lors du chargement des images</p>
        <button @click="loadImages" class="retry-button">
          Réessayer
        </button>
      </div>

      <!-- Grille de galerie -->
      <GalleryGrid v-else :images="images" />
    </main>

    <!-- Pied de page -->
    <footer class="page-footer">
      <p>
        Propulsé par
        <a href="https://nuxt.com" target="_blank" rel="noopener">Nuxt 3</a>,
        <a href="https://supabase.com" target="_blank" rel="noopener">Supabase</a>
        &
        <a href="https://vercel.com" target="_blank" rel="noopener">Vercel</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
/**
 * LOGIQUE DE LA PAGE
 *
 * On utilise :
 * - ref() pour créer des variables réactives
 * - onMounted() pour charger les données au démarrage
 * - useImages() pour accéder aux fonctions CRUD
 */

import { ref, onMounted } from 'vue'
import type { Image } from '~/utils/supabase'

// Variables réactives
const images = ref<Image[]>([])        // Liste des images
const loading = ref(true)              // État de chargement
const error = ref(false)               // État d'erreur

// Récupérer les fonctions CRUD
const { fetchImages } = useImages()

/**
 * Fonction pour charger les images
 */
const loadImages = async () => {
  loading.value = true
  error.value = false

  try {
    // Appel à Supabase
    const data = await fetchImages()
    images.value = data
  } catch (err) {
    console.error('Erreur de chargement:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

/**
 * Au montage du composant, charger les images
 */
onMounted(() => {
  loadImages()
})

/**
 * Configuration SEO de la page
 */
useHead({
  title: 'Galerie Interactive - M1 Paris 8',
  meta: [
    {
      name: 'description',
      content: 'Galerie d\'images interactive - Projet pédagogique Master 1 Design d\'interfaces'
    }
  ]
})
</script>

<style scoped>
/**
 * STYLES DE LA PAGE D'ACCUEIL
 */

.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #e3e8ef 100%);
}

/**
 * EN-TÊTE
 */
.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 48px 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 12px 0;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.1rem;
  color: #4a5568;
  margin: 0 0 8px 0;
}

.university {
  font-size: 0.95rem;
  color: #718096;
  margin: 0 0 24px 0;
}

.admin-link {
  display: inline-block;
  margin-top: 16px;
  padding: 10px 20px;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s ease, transform 0.2s ease;
}

.admin-link:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

/**
 * CONTENU PRINCIPAL
 */
.main-content {
  flex: 1;
}

/**
 * ÉTATS DE CHARGEMENT ET D'ERREUR
 */
.loading-state,
.error-state {
  text-align: center;
  padding: 80px 20px;
  color: #4a5568;
}

.loader {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.retry-button {
  margin-top: 16px;
  padding: 10px 24px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.retry-button:hover {
  background: #1d4ed8;
}

/**
 * PIED DE PAGE
 */
.page-footer {
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 32px 20px;
  text-align: center;
  color: #718096;
  font-size: 0.9rem;
}

.page-footer a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.page-footer a:hover {
  text-decoration: underline;
}

/**
 * RESPONSIVE
 */
@media (max-width: 768px) {
  .page-header {
    padding: 32px 20px;
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
