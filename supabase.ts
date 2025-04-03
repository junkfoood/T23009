// supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://thkrrdlmxxjcyendplsl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoa3JyZGxteHhqY3llbmRwbHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0Nzc1MDMsImV4cCI6MjA1ODA1MzUwM30.aTJGWygyVfS9ucoa99o8YSKppAIglxz8n2yDurKsOYo'

export const supabase = createClient(supabaseUrl, supabaseKey)
