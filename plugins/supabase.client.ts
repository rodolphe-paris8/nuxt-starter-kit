import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  if (!config.public.supabaseUrl || !config.public.supabaseAnonKey) {
    throw new Error('Supabase environment variables are missing')
  }

  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey
  )

  return {
    provide: {
      supabase
    }
  }
})
