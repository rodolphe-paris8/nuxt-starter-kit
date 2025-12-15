/**
 * Types partagés Supabase
 * Aucun accès runtime ici
 */

export interface Image {
  id: string
  title: string
  description: string
  image_url: string
  position: number
  created_at: string
}

export interface NewImage {
  title: string
  description: string
  image_url: string
  position: number
}
