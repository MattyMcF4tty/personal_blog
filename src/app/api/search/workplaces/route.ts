import { handlePostgreSQLError } from '@/utils/misc';
import { createSupabaseClient } from '@/utils/database/supabase';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @param name The name of the workplace you are seaching for
 * @param limit The number of workplaces you want to fetch. Default is `10`, max is `100`
 * @param tags The tags you want you want to search for
 * @param ascending Wether the blogs should ascending or descending based of when its created. Is boolean, default is `true`.
 * @param columns The columns that you want to fetch
 * @returns workplaces or error
 */
export async function GET(req: NextRequest) {
  try {
    // Get query parameters from request
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 10)); // Get, validate and format parameter
    const tags = searchParams.getAll('tags');
    const ascending = searchParams.get('ascending') !== 'false'; // Get and format parameter
    const columns =
      searchParams.getAll('columns').length > 0 ? searchParams.getAll('columns').join(', ') : '*'; // Get and format parameter

    // Create supabase Client
    const supabaseClient = createSupabaseClient();

    // Create query
    const query = supabaseClient.from('workplaces').select(columns).limit(limit);

    if (name) {
      // Apply name parameter
      query.ilike('name', `%${name}%`);
    }

    if (tags) {
      // Apply tags parameter
      query.contains('tags', tags);
    }

    // Apply sorting and odering to query
    query.order('created', { ascending: ascending });

    // Fetch query
    const { data, error } = await query;

    // Check if query failed
    if (error) {
      return handlePostgreSQLError(error);
    }

    // Return data
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error: any) {
    // Catch internal errors, log and return nondescript error for client
    console.error(`An unexpected error occurred: ${error}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
