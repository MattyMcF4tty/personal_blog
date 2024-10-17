import { Database } from '../schemas/database.types';
import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL as string;
  const supabaseKey = process.env.SUPABASE_API_KEY as string;

  const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
  return supabaseClient;
};

export const fetchUniqueTags = async (tableName: string) => {
  const supabaseClient = createSupabaseClient();

  const { data, error } = await supabaseClient.rpc('fetch_unique_tags', { table_name: tableName });

  const tags: string[] = [];

  if (data) {
    data.map((tag) => {
      tags.push(tag.tags);
    });
  }

  return { tags, error };
};
