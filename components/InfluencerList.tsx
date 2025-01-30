'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { InfluencerSearch } from './InfluencerSearch';
import { Button } from '@/components/ui/button';
import { getAllInfluencer } from '@/actions/influencerService';

export enum ClaimStatus {
  Verified = 'Verified',
  Questionable = 'Questionable',
  Debunked = 'Debunked',
}

// Define interfaces
export interface Claim {
  id: string;
  text: string;
  category: string;
  status: ClaimStatus;
  trustScore: number;
}

export interface Influencer {
  id: string;
  name: string;
  username: string;
  followers_count: number;
  imageUrl: string | null;
  twitter_user_id?: string;
  claims: Claim[];
}

// Mock data (consider moving to a separate file)
// const initialInfluencers: Influencer[] = [
//   {
//     id: '1',
//     name: 'Dr. Health',
//     username: 'drhealth',
//     followers_count: 10000,
//     claims: [
//       {
//         id: '1',
//         text: 'Green tea boosts metabolism',
//         category: 'Nutrition',
//         status: ClaimStatus.Verified,
//         trustScore: 0.85,
//       },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Wellness Guru',
//     username: 'wellnessguru',
//     followers_count: 20000,
//     claims: [
//       {
//         id: '2',
//         text: 'Meditation reduces anxiety',
//         category: 'MentalHealth',
//         status: ClaimStatus.Verified,
//         trustScore: 0.92,
//       },
//     ],
//   },
// ];

// Claim Badge UI
const getStatusBadge = (status: ClaimStatus) => {
  const statusColors = {
    Verified: 'bg-green-500 text-white',
    Questionable: 'bg-yellow-500 text-white',
    Debunked: 'bg-red-500 text-white',
  };
  return <Badge className={statusColors[status]}>{status}</Badge>;
};

// Influencer Table Row (with Expandable Claims)
const InfluencerTableRow = ({
  influencer,
  onClick,
  expanded,
  toggleExpand,
}: {
  influencer: Influencer;
  onClick: (influencer: Influencer) => void;
  expanded: boolean;
  toggleExpand: (id: string) => void;
}) => {
  return (
    <>
      {/* Main influencer row */}
      <TableRow>
        <TableCell className="font-medium">{influencer.name}</TableCell>
        <TableCell>{influencer.username}</TableCell>
        <TableCell>{influencer.followers_count}</TableCell>
        <TableCell className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onClick(influencer)}
            aria-label={`View details of ${influencer.name}`}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleExpand(influencer.id)}
            aria-label={`${expanded ? 'Hide' : 'View'} claims of ${influencer.name}`}
          >
            {expanded ? 'Hide Claims' : 'View Claims'}
          </Button>
        </TableCell>
      </TableRow>

      {/* Nested Claims Table (only shown when expanded) */}
      {expanded && influencer.claims.length > 0 && (
        <TableRow>
          <TableCell colSpan={4} className="p-0">
            <Table className="border mt-2 ml-6 w-[95%]">
              <TableHeader>
                <TableRow>
                  <TableHead>Claim</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Trust Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {influencer.claims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell>{claim.text}</TableCell>
                    <TableCell>{claim.category}</TableCell>
                    <TableCell>{getStatusBadge(claim.status)}</TableCell>
                    <TableCell>{(claim.trustScore * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

type InfluencerListProps = {
  isDashboard?: boolean;
};

export const InfluencerList = ({ isDashboard }: InfluencerListProps) => {
  const [influencers, setInfluencers] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
console.log(setLoading)
console.log(setError)
  useEffect(()=>{
    const Fetchinfluencers =async ()=>{
      const response = await getAllInfluencer()
      if (response){
        setInfluencers(response)

      }
     

    }
Fetchinfluencers()
  },[])

  const router = useRouter();

  const handleNewAnalysis = useCallback((analysis: Influencer) => {
    setInfluencers((prev:any) => [...prev, analysis]);
  }, []);

  const viewDetails = useCallback((influencer: Influencer) => {
    router.push(`/influencers/${influencer.id}`);
  }, [router]);

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {!isDashboard && <InfluencerSearch onAnalysisComplete={handleNewAnalysis} />}
      <div className="rounded-md border">
        <Table aria-label="Influencers List">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Followers</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              influencers&& influencers.map((influencer:any) => (
                <InfluencerTableRow
                  key={influencer.id}
                  influencer={influencer}
                  onClick={viewDetails}
                  expanded={!!expandedRows[influencer.id]}
                  toggleExpand={toggleExpand}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};