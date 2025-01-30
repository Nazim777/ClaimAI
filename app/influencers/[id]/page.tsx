import { notFound } from 'next/navigation';
import { getInfluencer } from '@/actions/influencerService';

export default async function InfluencerPage({ params }: { params: { id: string } }) {
  const influencer = await getInfluencer(params.id);

  if (!influencer) {
    notFound(); 
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{influencer.name}</h1>
      <div className="flex items-center mb-6">
        <img
          src={influencer.imageUrl || "/default-avatar.png"}
          alt={influencer.name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <p className="text-lg font-semibold">@{influencer.username}</p>
          <p className="text-gray-600">{influencer.followers_count} followers</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Claims</h2>
      <div className="space-y-4">
        {influencer.claims.map((claim) => (
          <div key={claim.id} className="p-4 border rounded-lg shadow-sm">
            <p className="text-lg font-semibold">{claim.text}</p>
            <p className="text-gray-600">Category: {claim.category}</p>
            <p className="text-gray-600">Status: {claim.status}</p>
            <p className="text-gray-600">Trust Score: {claim.trustScore}</p>
            <p className="text-gray-600 text-sm">
              Created: {new Date(claim.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
