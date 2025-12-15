// Configuration principale de Nuxt 3
// Ce fichier définit les paramètres du projet

export default defineNuxtConfig({
  // Active la compatibilité avec les dernières fonctionnalités
  compatibilityDate: '2024-04-03',

  // Mode de développement avec source maps pour le débogage
  devtools: { enabled: true },

  // Variables d'environnement accessibles côté client (préfixe NUXT_PUBLIC_)
  runtimeConfig: {
    public: {
      // Ces valeurs sont injectées automatiquement par Nuxt
      // depuis les variables Vercel NUXT_PUBLIC_*
      supabaseUrl: '',
      supabaseAnonKey: ''
    }
  },

  // Configuration CSS globale
  css: ['~/assets/css/main.css'],

  // Métadonnées de la page
  app: {
    head: {
      title: 'Galerie Interactive - Projet M1 Paris 8',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Projet pédagogique de galerie d\'images avec gestion de contenu'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
