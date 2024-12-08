import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "../components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { Building2, DollarSign, Globe, Factory } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useToast } from "@/hooks/use-toast";

const industryControlData = [
  { name: "Technology", value: 40 },
  { name: "Real Estate", value: 30 },
  { name: "Finance", value: 20 },
  { name: "Other", value: 10 },
];

const COLORS = ["#8B0000", "#D32F2F", "#FF4444", "#FF8A80"];

const Billionaires = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: billionaire, isLoading, error } = useQuery({
    queryKey: ["billionaire", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      console.log("Fetching billionaire data for ID:", id);
      
      const { data, error } = await supabase
        .from("billionaires")
        .select(`
          *,
          ownership (
            *,
            companies (*)
          )
        `)
        .eq('id', parseInt(id))
        .single();

      if (error) {
        console.error("Error fetching billionaire:", error);
        throw error;
      }
      
      console.log("Fetched billionaire data:", data);
      return data;
    },
    enabled: !!id && !isNaN(parseInt(id)),
  });

  if (!id) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 lg:px-6">
          <h1 className="heading-xl mb-6 text-center lg:text-left">Billionaires</h1>
          <p className="body-text mb-8 text-center lg:text-left">
            Select a billionaire to view their detailed profile.
          </p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 lg:px-6">
          <ErrorMessage 
            title="Failed to load billionaire data" 
            message={error instanceof Error ? error.message : "An unexpected error occurred"} 
          />
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 lg:px-6">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 lg:px-6">
        {/* Summary Block */}
        <div className="mb-8 animate-fade-in">
          <h1 className="heading-xl mb-6 text-center lg:text-left">{billionaire?.name || "Loading..."}</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white shadow-lg transition-transform hover:scale-105">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <DollarSign className="mr-2 h-4 w-4 text-muted" />
                <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  ${(billionaire?.net_worth || 0).toLocaleString()}B
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg transition-transform hover:scale-105">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Factory className="mr-2 h-4 w-4 text-muted" />
                <CardTitle className="text-sm font-medium">Industry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {billionaire?.primary_industry || "Various"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg transition-transform hover:scale-105">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Globe className="mr-2 h-4 w-4 text-muted" />
                <CardTitle className="text-sm font-medium">Residence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {billionaire?.residence || "Unknown"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg transition-transform hover:scale-105">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Building2 className="mr-2 h-4 w-4 text-muted" />
                <CardTitle className="text-sm font-medium">Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {billionaire?.ownership?.length || 0}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Linked Companies Section */}
        <div className="mb-8">
          <h2 className="heading-lg mb-6 text-center lg:text-left">Company Ownership</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {billionaire?.ownership?.map((ownership: any) => (
              <Card key={ownership.id} className="bg-white shadow-lg transition-transform hover:scale-105">
                <CardHeader>
                  <CardTitle>{ownership.companies?.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    {ownership.ownership_percentage}%
                  </p>
                  <p className="text-sm text-muted-foreground">Ownership Stake</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Industry Influence Section */}
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
      </main>
    </div>
  );
};

export default Billionaires;
