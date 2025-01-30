import { NextResponse } from "next/server";
import { fetchTweets } from "@/lib/twitter";
import { extractClaims, deduplicateClaims, verifyClaim } from "@/lib/gemini";
import { influencerDataType } from "@/lib/twitter";
import { prisma } from "@/utils/prisma";



export type resultType ={
  claim: string;
  category: string;
  status: string;
  trustScore: string;
  imageUrl: string;
  name: string;
  username: string;
  followers_count: number;
  twitter_user_id:string;
}

export async function POST(request: Request) {
  const { influencer } = await request.json();

  if (!influencer) {
    return NextResponse.json({ error: "Provide influencer username!" }, { status: 400 });
  }

  try {
    const influencerData:influencerDataType  = influencer && await fetchTweets(influencer);
    const content = [...influencerData.tweets].join("\n");

   
    const claims = await extractClaims(content);
    const uniqueClaims = await deduplicateClaims(claims);


    const results = await Promise.all(
      uniqueClaims.map(async (claim: string) => await verifyClaim(claim))
    );

  
    // Upsert Influencer
    const storedInfluencer = await prisma.influencer.upsert({
      where: { twitter_user_id: influencerData.twitter_user_id },
      update: {
        name: influencerData.name,
        username: influencerData.username,
        followers_count: influencerData.followers_count,
        imageUrl: influencerData.profile_image_url,
      },
      create: {
        name: influencerData.name,
        username: influencerData.username,
        followers_count: influencerData.followers_count,
        imageUrl: influencerData.profile_image_url,
        twitter_user_id: influencerData.twitter_user_id,
      },
    });

    // Store Claims
    await Promise.all(
      results.map(async (result) => {
        return prisma.claim.create({
          data: {
            text: result.claim,
            category: result.category,
            status: result.status,
            trustScore: isNaN(parseFloat(result.trustScore)) ? 0 : parseFloat(result.trustScore),
            influencerId: storedInfluencer.id,
          },
        });
      })
    );





    // Fetch Influencer with Claims after storing data
    const storedData = await prisma.influencer.findUnique({
      where: { id: storedInfluencer.id },
      include: { claims: true }, // Include related claims
    });




    return NextResponse.json(storedData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to research influencer" }, { status: 500 });
  }
}