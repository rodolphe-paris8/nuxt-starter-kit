/**
 * Composable useImages
 *
 * Ce composable centralise toutes les opérations CRUD sur les images.
 * Il utilise l'API de composition de Vue 3 avec <script setup>
 *
 * Fonctions disponibles :
 * - fetchImages() : récupérer toutes les images
 * - createImage() : ajouter une nouvelle image
 * - updateImage() : modifier une image existante
 * - deleteImage() : supprimer une image
 * - uploadImage() : uploader un fichier vers Supabase Storage
 */

import { supabase, type Image, type NewImage } from '~/utils/supabase'

export const useImages = () => {
  /**
   * RÉCUPÉRER toutes les images
   * Triées par position (ordre d'affichage)
   *
   * @returns Promise<Image[]> - Liste des images
   */
  const fetchImages = async (): Promise<Image[]> => {
    try {
      // SELECT * FROM images ORDER BY position
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('position', { ascending: true })

      if (error) {
        console.error('Erreur lors de la récupération des images:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Erreur fetchImages:', error)
      return []
    }
  }

  /**
   * CRÉER une nouvelle image
   *
   * @param newImage - Objet contenant les données de l'image
   * @returns Promise<Image | null> - L'image créée ou null si erreur
   */
  const createImage = async (newImage: NewImage): Promise<Image | null> => {
    try {
      // INSERT INTO images VALUES (...)
      const { data, error } = await supabase
        .from('images')
        .insert([newImage])
        .select()
        .single()

      if (error) {
        console.error('Erreur lors de la création de l\'image:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Erreur createImage:', error)
      return null
    }
  }

  /**
   * MODIFIER une image existante
   *
   * @param id - ID de l'image à modifier
   * @param updates - Objet contenant les champs à mettre à jour
   * @returns Promise<Image | null> - L'image modifiée ou null si erreur
   */
  const updateImage = async (
    id: string,
    updates: Partial<NewImage>
  ): Promise<Image | null> => {
    try {
      // UPDATE images SET ... WHERE id = ...
      const { data, error } = await supabase
        .from('images')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Erreur lors de la mise à jour de l\'image:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Erreur updateImage:', error)
      return null
    }
  }

  /**
   * SUPPRIMER une image
   *
   * @param id - ID de l'image à supprimer
   * @returns Promise<boolean> - true si succès, false sinon
   */
  const deleteImage = async (id: string): Promise<boolean> => {
    try {
      // DELETE FROM images WHERE id = ...
      const { error } = await supabase
        .from('images')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erreur lors de la suppression de l\'image:', error)
        throw error
      }

      return true
    } catch (error) {
      console.error('Erreur deleteImage:', error)
      return false
    }
  }

  /**
   * UPLOADER un fichier image vers Supabase Storage
   *
   * @param file - Fichier image à uploader
   * @returns Promise<string | null> - URL publique de l'image ou null si erreur
   */
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      // Générer un nom de fichier unique avec timestamp
      const timestamp = Date.now()
      const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const filePath = `${fileName}`

      // Upload vers le bucket 'gallery-images'
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Erreur lors de l\'upload:', uploadError)
        throw uploadError
      }

      // Récupérer l'URL publique de l'image uploadée
      const { data: urlData } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath)

      return urlData.publicUrl
    } catch (error) {
      console.error('Erreur uploadImage:', error)
      return null
    }
  }

  /**
   * SUPPRIMER un fichier du storage
   *
   * @param imageUrl - URL de l'image à supprimer
   * @returns Promise<boolean> - true si succès, false sinon
   */
  const deleteImageFromStorage = async (imageUrl: string): Promise<boolean> => {
    try {
      // Extraire le nom du fichier de l'URL
      const fileName = imageUrl.split('/').pop()
      if (!fileName) return false

      const { error } = await supabase.storage
        .from('gallery-images')
        .remove([fileName])

      if (error) {
        console.error('Erreur lors de la suppression du fichier:', error)
        throw error
      }

      return true
    } catch (error) {
      console.error('Erreur deleteImageFromStorage:', error)
      return false
    }
  }

  // Retourner toutes les fonctions pour les rendre disponibles
  return {
    fetchImages,
    createImage,
    updateImage,
    deleteImage,
    uploadImage,
    deleteImageFromStorage
  }
}
