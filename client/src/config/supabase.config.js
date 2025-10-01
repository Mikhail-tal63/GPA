
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://monmekbwushkklohclsm.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vbm1la2J3dXNoa2tsb2hjbHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjE0NTAsImV4cCI6MjA3MzczNzQ1MH0.AGfbud_CPaWbGxA8bLbe7UaguC-QaEqySfn1Q6kh2Ck"
export const supabase = createClient(supabaseUrl, supabaseKey)
