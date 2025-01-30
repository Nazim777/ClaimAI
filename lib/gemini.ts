import { healthKeywords } from "@/utils/static";
import { GoogleGenerativeAI } from "@google/generative-ai";
// status: 'Verified' | 'Questionable' | 'Debunked';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function extractClaims(content: string): Promise<string[]> {
  try {
    const prompt = `Extract health-related claims from the following text. Focus on claims related ${healthKeywords.join(
      ", "
    )}. Provide each claim on a new line.

Text: ${content}

Example:
- Eating carrots improves eyesight.
- Meditation can reduce stress.
- Running 30 minutes a day improves cardiovascular health.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const resultfromGemini = await model.generateContent(prompt);
    const response = resultfromGemini.response;
    const text = response.text();
    console.log("API Response (extractClaims):", text);

    if (text.length > 0) {
      // Split the response into individual claims and filter out empty lines
      const claims = text
        .split("\n")
        .map((claim) => claim.trim())
        .filter((claim) => claim.length > 0);

      if (claims.length > 0) {
        return claims;
      } else {
        throw new Error("No claims extracted from the text.");
      }
    }

    throw new Error("Unexpected API response format.");
  } catch (error) {
    console.error("API call failed (extractClaims):", error);
    throw error;
  }
}



export async function deduplicateClaims(claims: string[]): Promise<string[]> {
  try {
    const prompt = `Remove duplicate claims from the following list. Provide only unique claims, one per line. If two claims are similar but not identical, keep both.

Claims:
${claims.join("\n")}

Example:
- Eating carrots improves eyesight.
- Meditation can reduce stress.
- Running 30 minutes a day improves cardiovascular health.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const resultfromGemini = await model.generateContent(prompt);
    const response = resultfromGemini.response;
    const text = response.text();
    console.log("API Response (deduplicateClaims):", text);

    if (text.length > 0) {
      // Split the response into individual claims and filter out empty lines
      const uniqueClaims = text
        .split("\n")
        .map((claim) => claim.trim())
        .filter((claim) => claim.length > 0);

      if (uniqueClaims.length > 0) {
        return uniqueClaims;
      } else {
        throw new Error("No unique claims found after deduplication.");
      }
    }

    throw new Error("Unexpected API response format.");
  } catch (error) {
    console.error("API call failed (deduplicateClaims):", error);
    throw error;
  }
}

export async function verifyClaim(claim: string) {
  try {
    const prompt = `Please verify the following health claim. If it belongs to one of the following categories: Nutrition, Medicine, or Mental Health, then verify the claim. Otherwise, mark it as "Not Verified". 

    Claim: "${claim}"
    
    Provide the output in the following JSON format:
    {
      "claim": "[Claim]",
      "category": "[Category]",
      "status": "[Verified/Questionable/Debunked]",
      "trustScore": "[Trust Score]"
    }
    
    Example response:
    {
      "claim": "Meditation can reduce stress.",
      "category": "Mental Health",
      "status": "Verified",
      "trustScore": "0.85"
    }`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const resultfromGemini = await model.generateContent(prompt);
    const response = resultfromGemini.response;
    const text = response.text();
    console.log("resultfromGemini", text);

    if (text.length > 0) {
      const result = JSON.parse(text);
      console.log("jsonObj", result);
      return {
        claim: result?.claim || claim,
        category: result?.category || "Unknown",
        status: result?.status || "Debunked",
        trustScore: result?.trustScore || "0.0",
      };
    }

    throw new Error("Unexpected API response format.");
  } catch (error) {
    console.error("API call failed:", error);
    return {
      claim: claim,
      category: "Unknown",
      status: "Debunked",
      trustScore:"0.0",
    };
  }
}
