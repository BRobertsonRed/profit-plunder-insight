import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface NetWorthHistoryProps {
  history: Array<{ date: string; value: number }>;
}

export const NetWorthHistory = ({ history }: NetWorthHistoryProps) => {
  if (!history || history.length === 0) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Net Worth History</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="default">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No historical data</AlertTitle>
            <AlertDescription>
              Historical net worth data is not available for this period.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Net Worth History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tickFormatter={(value) => `$${value}B`}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value}B`, "Net Worth"]}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                fill="url(#netWorthGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};