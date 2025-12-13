/**
 * Configuration du client Supabase
 *
 * Ce fichier crée une instance unique du client Supabase
 * qui sera réutilisée dans toute l'application.
 *
 * Le client permet de :
 * - Interagir avec la base de données (CRUD)
 * - Gérer le storage (upload d'images)
 * - Gérer l'authentification (optionnel)
 */

import { createClient } from '@supabase/supabase-js'

/**
 * Récupérer les variables d'environnement
 * Dans Nuxt 3, les variables NUXT_PUBLIC_ sont automatiquement disponibles
 */
const getSupabaseConfig = () => {
  // Nuxt 3 expose les variables NUXT_PUBLIC_ via process.env
  const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || ''

  return { supabaseUrl, supabaseKey }
}

const { supabaseUrl, supabaseKey } = getSupabaseConfig()

/**
 * Initialisation du client Supabase
 * Les variables d'environnement sont définies dans .env
 */
export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Type TypeScript pour la structure d'une image
 * Facilite l'autocomplétion et évite les erreurs
 */
export interface Image {
  id: string
  title: string
  description: string
  image_url: string
  position: number
  created_at: string
}

/**
 * Type pour créer une nouvelle image (sans id et created_at)
 */
export interface NewImage {
  title: string
  description: string
  image_url: string
  position: number
}
