'use client'
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { InfluencerList } from "@/components/InfluencerList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* Metrics Section */}
        <div className="mb-12">
          <DashboardMetrics />
        </div>

        {/* Influencers Section */}
        <div className="bg-white  rounded-lg shadow-lg p-6 ">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Top Influencers</h2>
          <InfluencerList isDashboard={true}/>
        </div>
      </main>
    </div>
  );
};

export default Index;