<!--
  Composant GalleryItem

  Affiche une seule image de la galerie avec :
  - Image responsive
  - Titre et description en overlay
  - Animation au survol
  - Effet de zoom progressif
-->

<template>
  <div class="gallery-item">
    <!-- Image principale -->
    <div class="image-container">
      <img
        :src="image.image_url"
        :alt="image.title"
        class="gallery-image"
        loading="lazy"
      />

      <!-- Overlay avec informations -->
      <div class="image-overlay">
        <h3 class="image-title">{{ image.title }}</h3>
        <p v-if="image.description" class="image-description">
          {{ image.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Props : données de l'image à afficher
 * On utilise defineProps avec TypeScript pour la validation
 */
import type { Image } from '~/utils/supabase'

defineProps<{
  image: Image
}>()
</script>

<style scoped>
/**
 * STYLES DU COMPOSANT GALLERYITEM
 *
 * Architecture :
 * - Container flex pour la structure
 * - Image responsive qui s'adapte
 * - Overlay qui apparaît au survol
 * - Transitions fluides
 */

.gallery-item {
  /* Arrondi des coins */
  border-radius: 12px;
  /* Évite le débordement de l'image */
  overflow: hidden;
  /* Ombre portée pour la profondeur */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  /* Transition fluide pour l'effet hover */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* Fond blanc par défaut */
  background: white;
}

/* Effet au survol : légère élévation */
.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.image-container {
  /* Position relative pour l'overlay absolu */
  position: relative;
  /* Ratio 4:3 pour uniformiser les hauteurs */
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
  /* Cover pour remplir tout l'espace */
  object-fit: cover;
  /* Transition du zoom */
  transition: transform 0.4s ease;
}

/* Zoom au survol de l'image */
.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.image-overlay {
  /* Positionnement absolu en bas de l'image */
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /* Dégradé noir transparent pour la lisibilité */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 70%,
    transparent 100%
  );
  /* Espacement interne */
  padding: 24px 20px 20px;
  /* Couleur du texte */
  color: white;
  /* Opacité par défaut (légèrement visible) */
  opacity: 0.9;
  /* Transition fluide */
  transition: opacity 0.3s ease;
}

/* Overlay complètement visible au survol */
.gallery-item:hover .image-overlay {
  opacity: 1;
}

.image-title {
  /* Taille du titre */
  font-size: 1.25rem;
  font-weight: 600;
  /* Espacement */
  margin: 0 0 8px 0;
  /* Limitation à 2 lignes */
  line-height: 1.3;
  /* Évite les coupures de mots */
  word-break: break-word;
}

.image-description {
  /* Taille de la description */
  font-size: 0.9rem;
  /* Réduction de l'opacité */
  opacity: 0.9;
  margin: 0;
  /* Limitation à 2 lignes avec ellipse */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

/**
 * RESPONSIVE : adaptation mobile
 */
@media (max-width: 768px) {
  .image-overlay {
    /* Overlay toujours visible sur mobile */
    opacity: 1;
    /* Padding réduit */
    padding: 16px 16px 12px;
  }

  .image-title {
    font-size: 1.1rem;
  }

  .image-description {
    font-size: 0.85rem;
  }
}
</style>
