import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface NetWorthHistoryProps {
  history: Array<{ date: string; value: number }>;
}

export const NetWorthHistory = ({ history }: NetWorthHistoryProps) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Net Worth History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis 
                tickFormatter={(value) => `$${value}B`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value}B`, "Net Worth"]}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                fill="#3b82f6"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};