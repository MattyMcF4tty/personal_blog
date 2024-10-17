import { handlePostgreSQLError } from '@/utils/misc';
import { fetchUniqueTags } from '@/utils/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { tags, error } = await fetchUniqueTags('workplaces');

  if (error) {
    handlePostgreSQLError(error);
  }

  return NextResponse.json({ data: tags }, { status: 200 });
}
