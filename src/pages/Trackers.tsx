import Navigation from "../components/Navigation";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Trackers = () => {
  // Placeholder data for wage theft heatmap
  const wageTheftData = [
    { state: "CA", cases: 150, amount: 2500000 },
    { state: "NY", cases: 120, amount: 1800000 },
    { state: "TX", cases: 90, amount: 1200000 },
    { state: "FL", cases: 80, amount: 900000 },
    { state: "IL", cases: 70, amount: 850000 },
  ];

  // Placeholder data for environmental violations
  const environmentalData = [
    { location: "Los Angeles", violations: 25, severity: "High" },
    { location: "Houston", violations: 18, severity: "Medium" },
    { location: "Chicago", violations: 15, severity: "High" },
    { location: "Miami", violations: 12, severity: "Low" },
    { location: "Seattle", violations: 10, severity: "Medium" },
  ];

  // Placeholder data for lobbying expenditures
  const lobbyingData = [
    { company: "Tech Corp A", amount: 5000000 },
    { company: "Energy Corp B", amount: 4200000 },
    { company: "Finance Corp C", amount: 3800000 },
    { company: "Retail Corp D", amount: 2500000 },
    { company: "Health Corp E", amount: 2000000 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto pt-24 px-6">
        <h1 className="text-4xl font-display font-bold mb-6">Corporate Impact Trackers</h1>
        <p className="text-muted-foreground mb-8">
          Monitor real-time data on wage theft, environmental violations, and lobbying expenditures.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Wage Theft Heatmap */}
          <Card className="p-6">
            <h2 className="text-2xl font-display font-semibold mb-4">Wage Theft by State</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wageTheftData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#8B0000" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Environmental Violations Map */}
          <Card className="p-6">
            <h2 className="text-2xl font-display font-semibold mb-4">Environmental Violations</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={environmentalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="violations" fill="#D32F2F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Lobbying Expenditures */}
          <Card className="p-6">
            <h2 className="text-2xl font-display font-semibold mb-4">Top Lobbying Spenders</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lobbyingData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="company" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#222222" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Trackers;