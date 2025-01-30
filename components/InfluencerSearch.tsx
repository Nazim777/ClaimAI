
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Influencer} from "./InfluencerList";

// Define expected result type based on Prisma models


interface AnalysisProgress {
  stage: string;
  progress: number;
}

export const InfluencerSearch = ({ onAnalysisComplete }: { onAnalysisComplete: (data: Influencer) => void }) => {
  const [influencerName, setInfluencerName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress>({ stage: "", progress: 0 });
  const { toast } = useToast();

  const updateProgress = async (stage: string, progress: number) => {
    setAnalysisProgress({ stage, progress });
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate progress delay
  };

  const analyzeInfluencer = async () => {
    if (!influencerName.trim()) {
      toast({
        title: "Error",
        description: "Please enter an influencer name",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      await updateProgress("Fetching Twitter data...", 25);
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ influencer: influencerName }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      await updateProgress("Analyzing health claims...", 50);
      const result: Influencer = await response.json();

      if (!result || !result.claims || result.claims.length === 0) {
        throw new Error("No data found for the influencer");
      }

      await updateProgress("Calculating trust score...", 75);
      const analysis: Influencer = {
       name: result.name,
       username: result.username,
        followers_count: result.followers_count,
        imageUrl: result.imageUrl,
        twitter_user_id: result.twitter_user_id,
        claims: result.claims,
      id: result.id
      };

      onAnalysisComplete(analysis);
      toast({
        title: "Analysis Complete",
        description: `Finished analyzing ${result.name}'s content`,
      });
      setInfluencerName("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze influencer",
        variant: "destructive",
      });
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress({ stage: "", progress: 0 });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Enter influencer username... "
          value={influencerName}
          onChange={(e) => setInfluencerName(e.target.value)}
          className="max-w-sm"
          disabled={isAnalyzing}
          aria-label="Influencer Name"
        />
        <Button
          onClick={analyzeInfluencer}
          disabled={isAnalyzing}
          className="bg-orange-800 text-white"
          aria-busy={isAnalyzing}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze"}
        </Button>
      </div>

      {isAnalyzing && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">{analysisProgress.stage}</div>
          <Progress value={analysisProgress.progress} className="w-[60%]" aria-label="Analysis Progress" />
        </div>
      )}
    </div>
  );
};
