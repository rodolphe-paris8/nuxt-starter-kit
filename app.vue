<!--
  COMPOSANT RACINE DE L'APPLICATION

  Ce fichier est le point d'entrée de l'application Nuxt.
  Il contient la structure de base qui entoure toutes les pages.

  <NuxtPage /> : affiche la page correspondant à la route actuelle
-->

<template>
  <div id="app">
    <!-- Affichage de la page courante (index.vue, admin.vue, etc.) -->
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
/**
 * Configuration globale de l'application
 * Ici vous pouvez ajouter :
 * - Des composables globaux
 * - Des watchers
 * - Des effets de lifecycle
 */
</script>

<style>
/**
 * Styles globaux du layout
 * Ces styles ne sont PAS scopés et s'appliquent à toute l'application
 */

#app {
  /* L'app prend toute la hauteur */
  min-height: 100vh;
  /* Flexbox pour un layout moderne */
  display: flex;
  flex-direction: column;
}
</style>
