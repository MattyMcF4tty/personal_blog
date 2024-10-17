import { handlePostgreSQLError } from '@/utils/misc';
import { createSupabaseClient } from '@/utils/supabase';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @param name The name of the blog you are searching for
 * @param limit The number of blogs you want to fetch. Default is `10`, max is `100`
 * @param tags The tags the blog have
 * @param sort The coloumn to sort after. Must be `name`,`created`, `updated`. Default is `created`.
 * @param ascending Wether the blogs should ascending or descending based of the sort value. Is boolean, default is `true`
 * @param columns The columns that you want to fetch
 *
 * @returns blog or error
 */
export async function GET(req: NextRequest) {
  try {
    // Get query parameters from request
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 10)); // Get, validate and format parameter
    const tags = searchParams.getAll('tags');
    const sort = searchParams.get('sort') || 'created';
    const ascending = searchParams.get('ascending') !== 'false'; // Get and format parameter
    const columns =
      searchParams.getAll('columns').length > 0 ? searchParams.getAll('columns').join(', ') : '*'; // Get and format parameter

    // Create supabase client
    const supabaseClient = createSupabaseClient();

    // Build Query
    const query = supabaseClient.from('blogs').select(columns).limit(limit);

    // Validate and apply name parameter
    if (name) {
      query.ilike('name', `%${name}%`);
    }

    // Validate and apply tags parameter
    if (tags.length > 0) {
      query.contains('tags', tags);
    }

    // Validate apply sort parameter
    if (sort && ['name', 'created', 'updated'].includes(sort)) {
      query.order(sort, { ascending: ascending });
    } else {
      return NextResponse.json({ error: 'Invalid sort option' }, { status: 400 });
    }

    // Fetch query
    const { data, error } = await query;

    // Handle possible PostgreSQL errors
    if (error) {
      return handlePostgreSQLError(error);
    }

    // Return data
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error: any) {
    // Catch internal errors, log and return nondescript error for client
    console.error('An unexpected error occurred:', error.message);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
