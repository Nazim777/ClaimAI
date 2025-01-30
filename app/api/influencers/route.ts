import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function GET( ) {
  

  try {
    const influencers = await prisma.influencer.findMany({
     
      include: { claims: true },
    });

    if (!influencers) {
      return NextResponse.json({ message: 'Influencer not found' }, { status: 404 });
    }

    return NextResponse.json(influencers);
  } catch (error) {
    console.error('Error fetching influencer:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}