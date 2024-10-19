import { handlePostgreSQLError } from '@/utils/misc';
import { fetchUniqueTags } from '@/utils/database/supabase';
import { NextRequest, NextResponse } from 'next/server';

// This api route fetches all unique tags from all blog posts
export async function GET(req: NextRequest) {
  const { tags, error } = await fetchUniqueTags('blogs');

  if (error) {
    handlePostgreSQLError(error);
  }

  return NextResponse.json({ data: tags }, { status: 200 });
}
