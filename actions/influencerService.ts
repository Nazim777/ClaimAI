'use server'
import { prisma } from "@/utils/prisma";




export const getAllInfluencer = async () => {
  return await prisma.influencer.findMany({
    include: {
      claims: true
    },
  });
};




export async function getInfluencer(id: string) {
  try {
    const influencer = await prisma.influencer.findUnique({
      where: { id },
      include: { claims: true }, // Include associated claims
    });

    return influencer;
  } catch (error) {
    console.error("Error fetching influencer:", error);
    throw new Error("Failed to fetch influencer");
  }
}
