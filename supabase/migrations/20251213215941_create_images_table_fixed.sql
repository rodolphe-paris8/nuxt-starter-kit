/*
  # Création de la table images pour la galerie

  ## Description
  Cette migration crée la structure de base pour stocker les images de la galerie.
  Elle inclut la table, le bucket de stockage, et les politiques de sécurité.

  ## Nouvelle table : images
  
  ### Colonnes :
  - `id` (uuid, clé primaire) - Identifiant unique généré automatiquement
  - `title` (text, requis) - Titre de l'image
  - `description` (text, optionnel) - Description de l'image
  - `image_url` (text, requis) - URL de l'image dans le storage Supabase
  - `position` (integer, requis) - Position pour l'ordre d'affichage (plus petit = affiché en premier)
  - `created_at` (timestamptz) - Date de création automatique

  ## Storage
  - Création d'un bucket public `gallery-images` pour stocker les images

  ## Sécurité
  - RLS activé sur la table images
  - Lecture publique (SELECT) pour afficher la galerie côté public
  - Toutes opérations autorisées sans authentification pour simplifier la pédagogie
    (Dans un projet réel, il faudrait ajouter une authentification pour INSERT/UPDATE/DELETE)
*/

-- =====================================================
-- 1. CRÉATION DE LA TABLE IMAGES
-- =====================================================

CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Créer un index sur la colonne position pour optimiser le tri
CREATE INDEX IF NOT EXISTS idx_images_position ON images(position);

-- =====================================================
-- 2. SÉCURITÉ - ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Activer RLS sur la table (obligatoire pour la sécurité)
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique (SELECT)
-- Permet à tout le monde de voir les images de la galerie
CREATE POLICY "Lecture publique de la galerie"
  ON images
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Politique d'insertion publique (INSERT)
-- Pour simplifier l'apprentissage, on autorise l'ajout sans authentification
-- IMPORTANT : Dans un projet réel, remplacer 'anon' par 'authenticated' et ajouter un système d'auth
CREATE POLICY "Insertion publique pour demo"
  ON images
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Politique de mise à jour publique (UPDATE)
CREATE POLICY "Modification publique pour demo"
  ON images
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Politique de suppression publique (DELETE)
CREATE POLICY "Suppression publique pour demo"
  ON images
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- =====================================================
-- 3. STORAGE - BUCKET POUR LES IMAGES
-- =====================================================

-- Créer un bucket public pour stocker les images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images',
  'gallery-images',
  true,
  5242880, -- 5 MB max par fichier
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Lecture publique des images" ON storage.objects;
DROP POLICY IF EXISTS "Upload public pour demo" ON storage.objects;
DROP POLICY IF EXISTS "Suppression publique pour demo" ON storage.objects;

-- Politique de lecture publique sur le storage
CREATE POLICY "Lecture publique des images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'gallery-images');

-- Politique d'upload publique (pour la démo)
CREATE POLICY "Upload public pour demo"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'gallery-images');

-- Politique de suppression publique (pour la démo)
CREATE POLICY "Suppression publique pour demo"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'gallery-images');

-- =====================================================
-- 4. DONNÉES DE DÉMONSTRATION (optionnel)
-- =====================================================

-- Insertion de quelques images de démo avec des URLs Pexels
-- Ces images seront affichées par défaut dans la galerie

INSERT INTO images (title, description, image_url, position) VALUES
(
  'Architecture moderne',
  'Un bâtiment contemporain aux lignes épurées',
  'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  1
),
(
  'Nature sauvage',
  'Paysage de montagne au coucher du soleil',
  'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=800',
  2
),
(
  'Urbain nocturne',
  'Ville illuminée la nuit',
  'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
  3
),
(
  'Minimalisme',
  'Composition abstraite et géométrique',
  'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=800',
  4
),
(
  'Créativité',
  'Art et design contemporain',
  'https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=800',
  5
),
(
  'Technologie',
  'Innovation et interfaces digitales',
  'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
  6
)
ON CONFLICT DO NOTHING;
