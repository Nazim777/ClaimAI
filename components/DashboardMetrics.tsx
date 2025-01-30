// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// const data = [
//   { name: "Nutrition", verified: 65, questionable: 25, debunked: 10 },
//   { name: "Medicine", verified: 45, questionable: 35, debunked: 20 },
//   { name: "Mental Health", verified: 55, questionable: 30, debunked: 15 },
// ];

// export const DashboardMetrics = () => {
//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//       <Card>
//         <CardHeader>
//           <CardTitle>Claims Overview</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <BarChart width={300} height={200} data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="verified" fill="#48BB78" />
//             <Bar dataKey="questionable" fill="#ED8936" />
//             <Bar dataKey="debunked" fill="#E53E3E" />
//           </BarChart>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle>Trust Score Distribution</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">78%</div>
//           <p className="text-xs text-muted-foreground">
//             Average trust score across all analyzed claims
//           </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex items-center">
//               <div className="ml-4 space-y-1">
//                 <p className="text-sm font-medium">New claims analyzed</p>
//                 <p className="text-xs text-muted-foreground">
//                   Last 24 hours: 156 claims
//                 </p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define interface for chart data
interface MetricData {
  name: string;
  verified: number;
  questionable: number;
  debunked: number;
}

// Mock data (consider moving to a separate file)
const data: MetricData[] = [
  { name: 'Nutrition', verified: 65, questionable: 25, debunked: 10 },
  { name: 'Medicine', verified: 45, questionable: 35, debunked: 20 },
  { name: 'Mental Health', verified: 55, questionable: 30, debunked: 15 },
];

// Extracted BarChart component for better readability
const ClaimsBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} aria-label="Claims Overview Chart">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="verified" fill="#48BB78" name="Verified Claims" />
        <Bar dataKey="questionable" fill="#ED8936" name="Questionable Claims" />
        <Bar dataKey="debunked" fill="#E53E3E" name="Debunked Claims" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Extracted RecentActivity component for better readability
const RecentActivity = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium">New claims analyzed</p>
          <p className="text-xs text-muted-foreground">
            Last 24 hours: 156 claims
          </p>
        </div>
      </div>
    </div>
  );
};

export const DashboardMetrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Claims Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Claims Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ClaimsBarChart />
        </CardContent>
      </Card>

      {/* Trust Score Distribution Card */}
      <Card>
        <CardHeader>
          <CardTitle>Trust Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">78%</div>
          <p className="text-xs text-muted-foreground">
            Average trust score across all analyzed claims
          </p>
        </CardContent>
      </Card>

      {/* Recent Activity Card */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivity />
        </CardContent>
      </Card>
    </div>
  );
};