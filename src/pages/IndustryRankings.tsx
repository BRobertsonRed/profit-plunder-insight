import { useQuery } from "@tanstack/react-query";
import Navigation from "../components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { Tables } from "@/integrations/supabase/types";

const IndustryRankings = () => {
  const { data: industries, isLoading, error } = useQuery({
    queryKey: ["industry-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("industry_stats")
        .select("*")
        .order("total_net_worth", { ascending: false });

      if (error) throw error;
      return data as Tables<"industry_stats">[];
    },
  });

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 lg:px-6">
          <ErrorMessage 
            title="Failed to load industry rankings" 
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
        <h1 className="heading-xl mb-6 text-center lg:text-left">Industry Rankings</h1>
        <div className="space-y-4">
          {industries?.map((industry) => (
            <div
              key={industry.id}
              className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{industry.industry_name}</h2>
                  <p className="text-lg font-bold">
                    ${industry.total_net_worth.toLocaleString()}B
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <p>Billionaires: {industry.billionaire_count}</p>
                  <p>Richest: {industry.richest_billionaire}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default IndustryRankings;