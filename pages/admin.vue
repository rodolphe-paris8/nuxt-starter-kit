<!--
  PAGE D'ADMINISTRATION - CRUD COMPLET

  Interface de gestion des images de la galerie.

  Fonctionnalités :
  - Ajouter une nouvelle image (upload + métadonnées)
  - Modifier titre, description, position
  - Supprimer une image
  - Réorganiser l'ordre d'affichage
-->

<template>
  <div class="admin-page">
    <!-- En-tête -->
    <header class="admin-header">
      <div class="header-content">
        <h1>🎨 Interface d'Administration</h1>
        <NuxtLink to="/" class="back-link">
          ← Retour à la galerie
        </NuxtLink>
      </div>
    </header>

    <main class="admin-content">
      <!-- Section d'ajout d'une nouvelle image -->
      <section class="add-section card">
        <h2>➕ Ajouter une nouvelle image</h2>

        <form @submit.prevent="handleAddImage" class="add-form">
          <!-- Upload de fichier -->
          <div class="form-group">
            <label for="file-input">Fichier image *</label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              @change="handleFileChange"
              required
              class="file-input"
            />
            <p class="help-text">JPG, PNG, GIF ou WebP - Max 5 MB</p>
          </div>

          <!-- Titre -->
          <div class="form-group">
            <label for="title-input">Titre *</label>
            <input
              id="title-input"
              v-model="newImage.title"
              type="text"
              placeholder="Ex: Architecture moderne"
              required
              class="text-input"
            />
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="description-input">Description</label>
            <textarea
              id="description-input"
              v-model="newImage.description"
              placeholder="Décrivez brièvement l'image..."
              rows="3"
              class="text-input"
            ></textarea>
          </div>

          <!-- Position -->
          <div class="form-group">
            <label for="position-input">Position d'affichage *</label>
            <input
              id="position-input"
              v-model.number="newImage.position"
              type="number"
              min="0"
              required
              class="text-input"
            />
            <p class="help-text">
              Ordre d'affichage (0 = premier, 1 = deuxième, etc.)
            </p>
          </div>

          <!-- Bouton d'envoi -->
          <button
            type="submit"
            :disabled="uploading"
            class="submit-button"
          >
            {{ uploading ? '⏳ Upload en cours...' : '✓ Ajouter l\'image' }}
          </button>

          <!-- Message de succès -->
          <p v-if="successMessage" class="success-message">
            ✓ {{ successMessage }}
          </p>

          <!-- Message d'erreur -->
          <p v-if="errorMessage" class="error-message">
            ❌ {{ errorMessage }}
          </p>
        </form>
      </section>

      <!-- Section de liste des images existantes -->
      <section class="list-section card">
        <h2>📋 Images existantes ({{ images.length }})</h2>

        <!-- État de chargement -->
        <div v-if="loading" class="loading">
          <div class="loader"></div>
          <p>Chargement...</p>
        </div>

        <!-- Liste des images -->
        <div v-else-if="images.length > 0" class="images-list">
          <div
            v-for="image in images"
            :key="image.id"
            class="image-card"
          >
            <!-- Aperçu de l'image -->
            <div class="image-preview">
              <img :src="image.image_url" :alt="image.title" />
            </div>

            <!-- Informations et actions -->
            <div class="image-info">
              <!-- Mode édition -->
              <div v-if="editingId === image.id" class="edit-mode">
                <input
                  v-model="editForm.title"
                  type="text"
                  placeholder="Titre"
                  class="edit-input"
                />
                <textarea
                  v-model="editForm.description"
                  placeholder="Description"
                  rows="2"
                  class="edit-input"
                ></textarea>
                <input
                  v-model.number="editForm.position"
                  type="number"
                  placeholder="Position"
                  class="edit-input small"
                />

                <div class="edit-actions">
                  <button
                    @click="handleSaveEdit(image.id)"
                    class="save-button"
                  >
                    ✓ Enregistrer
                  </button>
                  <button
                    @click="cancelEdit"
                    class="cancel-button"
                  >
                    ✕ Annuler
                  </button>
                </div>
              </div>

              <!-- Mode affichage -->
              <div v-else class="view-mode">
                <h3>{{ image.title }}</h3>
                <p class="description">{{ image.description || 'Aucune description' }}</p>
                <p class="metadata">
                  Position: {{ image.position }} •
                  Créée le {{ formatDate(image.created_at) }}
                </p>

                <div class="actions">
                  <button
                    @click="startEdit(image)"
                    class="edit-button"
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    @click="handleDelete(image)"
                    class="delete-button"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- État vide -->
        <div v-else class="empty">
          <p>Aucune image pour le moment. Ajoutez-en une ci-dessus !</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
/**
 * LOGIQUE DE L'INTERFACE D'ADMINISTRATION
 *
 * Gestion complète du CRUD :
 * - Create : upload + insertion en base
 * - Read : liste des images
 * - Update : modification des métadonnées
 * - Delete : suppression base + storage
 */

import { ref, onMounted } from 'vue'
import type { Image } from '~/utils/supabase'

// Récupérer les fonctions CRUD
const {
  fetchImages,
  createImage,
  updateImage,
  deleteImage,
  uploadImage,
  deleteImageFromStorage
} = useImages()

// Variables réactives
const images = ref<Image[]>([])
const loading = ref(true)
const uploading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Formulaire d'ajout
const selectedFile = ref<File | null>(null)
const newImage = ref({
  title: '',
  description: '',
  position: 0
})

// Formulaire d'édition
const editingId = ref<string | null>(null)
const editForm = ref({
  title: '',
  description: '',
  position: 0
})

/**
 * Charger les images au démarrage
 */
const loadImages = async () => {
  loading.value = true
  try {
    images.value = await fetchImages()
  } catch (error) {
    console.error('Erreur de chargement:', error)
  } finally {
    loading.value = false
  }
}

/**
 * Gérer la sélection d'un fichier
 */
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

/**
 * Ajouter une nouvelle image
 */
const handleAddImage = async () => {
  // Réinitialiser les messages
  successMessage.value = ''
  errorMessage.value = ''

  // Vérifier qu'un fichier est sélectionné
  if (!selectedFile.value) {
    errorMessage.value = 'Veuillez sélectionner un fichier'
    return
  }

  uploading.value = true

  try {
    // 1. Upload du fichier vers Supabase Storage
    const imageUrl = await uploadImage(selectedFile.value)

    if (!imageUrl) {
      throw new Error('Erreur lors de l\'upload du fichier')
    }

    // 2. Insertion en base de données
    const result = await createImage({
      title: newImage.value.title,
      description: newImage.value.description,
      image_url: imageUrl,
      position: newImage.value.position
    })

    if (!result) {
      throw new Error('Erreur lors de l\'insertion en base')
    }

    // 3. Succès : rafraîchir la liste et réinitialiser le formulaire
    successMessage.value = 'Image ajoutée avec succès !'
    await loadImages()
    resetAddForm()

    // Masquer le message après 3 secondes
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Erreur handleAddImage:', error)
    errorMessage.value = 'Une erreur est survenue lors de l\'ajout'
  } finally {
    uploading.value = false
  }
}

/**
 * Réinitialiser le formulaire d'ajout
 */
const resetAddForm = () => {
  newImage.value = {
    title: '',
    description: '',
    position: images.value.length
  }
  selectedFile.value = null
  // Réinitialiser l'input file
  const fileInput = document.getElementById('file-input') as HTMLInputElement
  if (fileInput) fileInput.value = ''
}

/**
 * Démarrer l'édition d'une image
 */
const startEdit = (image: Image) => {
  editingId.value = image.id
  editForm.value = {
    title: image.title,
    description: image.description,
    position: image.position
  }
}

/**
 * Annuler l'édition
 */
const cancelEdit = () => {
  editingId.value = null
  editForm.value = {
    title: '',
    description: '',
    position: 0
  }
}

/**
 * Sauvegarder les modifications
 */
const handleSaveEdit = async (id: string) => {
  try {
    await updateImage(id, editForm.value)
    await loadImages()
    cancelEdit()
  } catch (error) {
    console.error('Erreur handleSaveEdit:', error)
    alert('Erreur lors de la modification')
  }
}

/**
 * Supprimer une image
 */
const handleDelete = async (image: Image) => {
  // Confirmation
  const confirmed = confirm(
    `Êtes-vous sûr de vouloir supprimer "${image.title}" ?`
  )
  if (!confirmed) return

  try {
    // 1. Supprimer de la base de données
    await deleteImage(image.id)

    // 2. Supprimer du storage (si l'image vient de Supabase)
    if (image.image_url.includes('supabase')) {
      await deleteImageFromStorage(image.image_url)
    }

    // 3. Rafraîchir la liste
    await loadImages()
  } catch (error) {
    console.error('Erreur handleDelete:', error)
    alert('Erreur lors de la suppression')
  }
}

/**
 * Formater une date
 */
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

/**
 * Charger les images au montage
 */
onMounted(() => {
  loadImages()
  // Initialiser la position avec le nombre d'images existantes
  newImage.value.position = images.value.length
})

/**
 * Configuration SEO
 */
useHead({
  title: 'Administration - Galerie Interactive',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script>

<style scoped>
/**
 * STYLES DE L'INTERFACE D'ADMINISTRATION
 */

.admin-page {
  min-height: 100vh;
  background: #f8fafc;
}

/**
 * EN-TÊTE
 */
.admin-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.admin-header h1 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
}

.back-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  transition: background 0.2s ease;
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.3);
}

/**
 * CONTENU PRINCIPAL
 */
.admin-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card h2 {
  margin: 0 0 24px 0;
  font-size: 1.5rem;
  color: #1a202c;
}

/**
 * FORMULAIRE D'AJOUT
 */
.add-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.95rem;
}

.text-input,
.file-input {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.text-input:focus,
.file-input:focus {
  outline: none;
  border-color: #667eea;
}

.help-text {
  font-size: 0.85rem;
  color: #718096;
  margin: 0;
}

.submit-button {
  padding: 14px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  padding: 12px 16px;
  background: #d4edda;
  color: #155724;
  border-radius: 8px;
  margin: 0;
}

.error-message {
  padding: 12px 16px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 8px;
  margin: 0;
}

/**
 * LISTE DES IMAGES
 */
.loading {
  text-align: center;
  padding: 40px 20px;
  color: #718096;
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.images-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: border-color 0.2s ease;
}

.image-card:hover {
  border-color: #cbd5e0;
}

.image-preview {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.view-mode h3 {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  color: #1a202c;
}

.description {
  color: #4a5568;
  margin: 0 0 8px 0;
  font-size: 0.95rem;
}

.metadata {
  color: #a0aec0;
  font-size: 0.85rem;
  margin: 0 0 16px 0;
}

.actions {
  display: flex;
  gap: 12px;
}

.edit-button,
.delete-button,
.save-button,
.cancel-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-button {
  background: #edf2f7;
  color: #2d3748;
}

.edit-button:hover {
  background: #e2e8f0;
}

.delete-button {
  background: #fed7d7;
  color: #c53030;
}

.delete-button:hover {
  background: #fc8181;
  color: white;
}

.save-button {
  background: #48bb78;
  color: white;
}

.save-button:hover {
  background: #38a169;
}

.cancel-button {
  background: #e2e8f0;
  color: #2d3748;
}

.cancel-button:hover {
  background: #cbd5e0;
}

/**
 * MODE ÉDITION
 */
.edit-mode {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.edit-input {
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
}

.edit-input.small {
  width: 100px;
}

.edit-actions {
  display: flex;
  gap: 12px;
}

.empty {
  text-align: center;
  padding: 40px 20px;
  color: #718096;
}

/**
 * RESPONSIVE
 */
@media (max-width: 768px) {
  .admin-content {
    padding: 24px 16px;
  }

  .card {
    padding: 24px 20px;
  }

  .image-card {
    flex-direction: column;
  }

  .image-preview {
    width: 100%;
    height: 200px;
  }

  .actions {
    flex-wrap: wrap;
  }

  .edit-button,
  .delete-button {
    flex: 1;
    min-width: 120px;
  }
}
</style>
