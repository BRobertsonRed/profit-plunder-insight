import { useQuery } from "@tanstack/react-query";
import Navigation from "../components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { Tables } from "@/integrations/supabase/types";

const CountryRankings = () => {
  const { data: countries, isLoading, error } = useQuery({
    queryKey: ["country-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("country_stats")
        .select("*")
        .order("total_net_worth", { ascending: false });

      if (error) throw error;
      return data as Tables<"country_stats">[];
    },
  });

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 lg:px-6">
          <ErrorMessage 
            title="Failed to load country rankings" 
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
        <h1 className="heading-xl mb-6 text-center lg:text-left">Country Rankings</h1>
        <div className="space-y-4">
          {countries?.map((country) => (
            <div
              key={country.id}
              className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{country.country_name}</h2>
                  <p className="text-lg font-bold">
                    ${country.total_net_worth.toLocaleString()}B
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <p>Billionaires: {country.billionaire_count}</p>
                  <p>Richest: {country.richest_billionaire}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CountryRankings;