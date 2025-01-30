
import { InfluencerList } from "@/components/InfluencerList";

const Influencers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Influencers</h1>
          <p className="mt-2 text-muted-foreground">
            Analyze and track health influencers' claims and credibility
          </p>
        </div>
        <div className="mt-6 ">
          <InfluencerList />
        </div>
      </main>
    </div>
  );
};

export default Influencers;