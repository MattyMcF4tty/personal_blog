import { Database } from "../schemas/database.types"
import { createClient } from "@supabase/supabase-js"


export const createSupabaseClient = () => {
  const supabaseClient = createClient<Database>(process.env.SUPABASE_URL as string, process.env.SUPABASE_API_KEY as string)
  return supabaseClient
}