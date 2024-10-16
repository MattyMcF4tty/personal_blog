import { createSupabaseClient } from '@/utils/supabase';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @param name The name of the blog you are searching for
 * @param limit The number of blogs you want to fetch. Default is `10`, max is `100`
 * @param tags The tags the blog have
 * @param sort The coloumn to sort after. Must be `name`,`created`, `updated`. Default is `created`.
 * @param ascending Wether the blogs should ascending or descending based of the sort value. Is boolean, default is `true`;
 *
 * @returns blog or error
 */
export async function GET(req: NextRequest) {
  try {
    // Get query parameters from request
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 10));
    const tags = searchParams.getAll('tags');
    const sort = searchParams.get('sort');
    const ascending = searchParams.get('ascending') !== 'false';

    // Create supabase client
    const supabseClient = createSupabaseClient();

    // Create Query
    const query = supabseClient.from('blogs').select('*');

    // Apply limit parameter
    query.limit(limit);

    if (name) {
      // Apply name parameter
      query.ilike('name', `%${name}%`);
    }

    if (tags.length > 0) {
      // Apply tags parameter
      query.contains('tags', tags);
    }

    // Apply sort parameter
    if (sort && ['name', 'created', 'updated'].includes(sort)) {
      query.order(sort, { ascending: ascending });
    } else {
      query.order('created', { ascending: ascending });
    }

    // Fetch query
    const { data, error } = await query;

    // Check if query failed
    if (error) {
      // Sort out internal errors
      if (Number(error.code) >= 500 || [403, 401, 409].includes(Number(error.code))) {
        console.error(`Error fetching blogs: ${error}`);
        throw new Error(error.message);
      } else {
        // Return and log error
        console.error(`Error fetching blogs: ${error}`);
        return NextResponse.json({ error: error.message }, { status: Number(error.code) });
      }
    }

    // Return data
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error: any) {
    // Catch internal errors, log and return nondescript error for client
    console.error(`Server error: ${error}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
