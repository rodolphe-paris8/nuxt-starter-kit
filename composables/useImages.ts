/**
 * Composable useImages
 *
 * Centralise toutes les opérations CRUD sur les images
 * en utilisant le client Supabase injecté par Nuxt.
 */

import type { Image, NewImage } from '~/utils/supabase'

export const useImages = () => {
  // Récupération du client Supabase depuis le plugin Nuxt
  const { $supabase } = useNuxtApp()

  /**
   * RÉCUPÉRER toutes les images
   * Triées par position (ordre d'affichage)
   */
  const fetchImages = async (): Promise<Image[]> => {
    try {
      const { data, error } = await $supabase
        .from('images')
        .select('*')
        .order('position', { ascending: true })

      if (error) {
        console.error('Erreur fetchImages:', error)
        return []
      }

      return data ?? []
    } catch (error) {
      console.error('Exception fetchImages:', error)
      return []
    }
  }

  /**
   * CRÉER une nouvelle image
   */
  const createImage = async (newImage: NewImage): Promise<Image | null> => {
    try {
      const { data, error } = await $supabase
        .from('images')
        .insert([newImage])
        .select()
        .single()

      if (error) {
        console.error('Erreur createImage:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Exception createImage:', error)
      return null
    }
  }

  /**
   * METTRE À JOUR une image existante
   */
  const updateImage = async (
    id: string,
    updates: Partial<NewImage>
  ): Promise<Image | null> => {
    try {
      const { data, error } = await $supabase
        .from('images')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Erreur updateImage:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Exception updateImage:', error)
      return null
    }
  }

  /**
   * SUPPRIMER une image
   */
  const deleteImage = async (id: string): Promise<boolean> => {
    try {
      const { error } = await $supabase
        .from('images')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erreur deleteImage:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Exception deleteImage:', error)
      return false
    }
  }

  /**
   * UPLOADER un fichier image vers Supabase Storage
   */
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const timestamp = Date.now()
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const fileName = `${timestamp}-${sanitizedName}`

      const { error: uploadError } = await $supabase.storage
        .from('gallery-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Erreur uploadImage:', uploadError)
        return null
      }

      const { data } = $supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName)

      return data.publicUrl
    } catch (error) {
      console.error('Exception uploadImage:', error)
      return null
    }
  }

  /**
   * SUPPRIMER un fichier du storage à partir de son URL publique
   */
  const deleteImageFromStorage = async (imageUrl: string): Promise<boolean> => {
    try {
      const fileName = imageUrl.split('/').pop()
      if (!fileName) return false

      const { error } = await $supabase.storage
        .from('gallery-images')
        .remove([fileName])

      if (error) {
        console.error('Erreur deleteImageFromStorage:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Exception deleteImageFromStorage:', error)
      return false
    }
  }

  // API publique du composable
  return {
    fetchImages,
    createImage,
    updateImage,
    deleteImage,
    uploadImage,
    deleteImageFromStorage
  }
}
