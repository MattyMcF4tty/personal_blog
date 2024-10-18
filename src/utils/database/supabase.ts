import { Database } from '../../schemas/database.types';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

let supaeClient: null | SupabaseClient<Database> = null;

export const createSupabaseClient = () => {
  if (!supaeClient) {
    console.log('Created new Supabase client');
    const supabaseUrl = process.env.SUPABASE_URL as string;
    const supabaseKey = process.env.SUPABASE_API_KEY as string;

    supaeClient = createClient<Database>(supabaseUrl, supabaseKey);
  }

  return supaeClient;
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
