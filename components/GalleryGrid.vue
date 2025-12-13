<!--
  Composant GalleryGrid

  Affiche une grille responsive d'images en mode masonry
  Utilise CSS Grid avec des colonnes adaptatives

  Props :
  - images : tableau d'images à afficher
-->

<template>
  <div class="gallery-grid">
    <!-- Message si aucune image -->
    <div v-if="images.length === 0" class="empty-state">
      <p>Aucune image dans la galerie pour le moment.</p>
      <p class="empty-hint">
        Utilisez l'interface d'administration pour ajouter des images.
      </p>
    </div>

    <!-- Grille d'images -->
    <div v-else class="grid-container">
      <GalleryItem
        v-for="image in images"
        :key="image.id"
        :image="image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Props : liste des images à afficher
 */
import type { Image } from '~/utils/supabase'

defineProps<{
  images: Image[]
}>()
</script>

<style scoped>
/**
 * STYLES DE LA GRILLE
 *
 * On utilise CSS Grid avec :
 * - Colonnes automatiques qui s'adaptent
 * - Taille minimale de 280px par colonne
 * - Gap (espacement) entre les éléments
 */

.gallery-grid {
  width: 100%;
  /* Espacement autour de la grille */
  padding: 40px 20px;
}

.grid-container {
  /* CSS Grid avec colonnes auto-responsive */
  display: grid;
  /* auto-fit : crée autant de colonnes que possible
     minmax(280px, 1fr) : chaque colonne fait minimum 280px, maximum 1 fraction */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  /* Espacement entre les éléments */
  gap: 24px;
  /* Centrage de la grille */
  max-width: 1400px;
  margin: 0 auto;
}

/**
 * ÉTAT VIDE
 * Affiché quand il n'y a aucune image
 */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #666;
}

.empty-state p {
  font-size: 1.1rem;
  margin: 12px 0;
}

.empty-hint {
  font-size: 0.95rem;
  color: #999;
}

/**
 * RESPONSIVE
 */

/* Tablettes */
@media (max-width: 1024px) {
  .grid-container {
    /* Colonnes un peu plus larges sur tablette */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .gallery-grid {
    padding: 24px 16px;
  }

  .grid-container {
    /* 2 colonnes sur mobile */
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

/* Petit mobile */
@media (max-width: 480px) {
  .grid-container {
    /* 1 colonne sur très petit écran */
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .empty-state {
    padding: 60px 20px;
  }
}
</style>
