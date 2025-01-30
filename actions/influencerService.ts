'use server'


import { prisma } from "@/utils/prisma";

export const getAllInfluencer = async () => {
  return await prisma.influencer.findMany({
    include: {
      claims: true
      
      ,
    },
  });
};
