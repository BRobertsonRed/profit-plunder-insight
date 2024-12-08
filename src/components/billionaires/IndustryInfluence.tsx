import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const industryControlData = [
  { name: "Technology", value: 40 },
  { name: "Real Estate", value: 30 },
  { name: "Finance", value: 20 },
  { name: "Other", value: 10 },
];

const COLORS = ["#8B0000", "#D32F2F", "#FF4444", "#FF8A80"];

export const IndustryInfluence = () => {
  return (
    <div className="mb-8">
      <h2 className="heading-lg mb-6 text-center lg:text-left">Industry Influence</h2>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-center lg:text-left">Industry Control Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={industryControlData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="90%"
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {industryControlData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};