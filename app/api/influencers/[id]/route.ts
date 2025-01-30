import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log('request',request)
  const { id } = params;

  try {
    const influencer = await prisma.influencer.findUnique({
      where: { id },
      include: { claims: true }, // Include associated claims
    });

    if (!influencer) {
      return NextResponse.json({ message: 'Influencer not found' }, { status: 404 });
    }

    return NextResponse.json(influencer);
  } catch (error) {
    console.error('Error fetching influencer:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}