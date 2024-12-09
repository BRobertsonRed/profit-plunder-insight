import { useQuery } from "@tanstack/react-query";
import Navigation from "../components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { Tables } from "@/integrations/supabase/types";

const DailyMovers = () => {
  const { data: movers, isLoading, error } = useQuery({
    queryKey: ["daily-movers"],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from("daily_movers")
        .select("*")
        .eq("date", today)
        .order("percentage_change", { ascending: false });

      if (error) throw error;
      return data as Tables<"daily_movers">[];
    },
  });

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 lg:px-6">
          <ErrorMessage 
            title="Failed to load daily movers" 
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

  const gainers = movers?.filter(m => m.type === 'gainer') || [];
  const losers = movers?.filter(m => m.type === 'loser') || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 lg:px-6">
        <h1 className="heading-xl mb-6 text-center lg:text-left">Daily Movers</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="heading-lg mb-4 text-green-600">Top Gainers</h2>
            <div className="space-y-4">
              {gainers.map((gainer) => (
                <div
                  key={gainer.id}
                  className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{gainer.name}</h3>
                    <p className="text-green-600 font-bold">
                      +${gainer.net_worth_change.toLocaleString()}B
                    </p>
                  </div>
                  <p className="text-sm text-green-600">
                    +{gainer.percentage_change.toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="heading-lg mb-4 text-red-600">Top Losers</h2>
            <div className="space-y-4">
              {losers.map((loser) => (
                <div
                  key={loser.id}
                  className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{loser.name}</h3>
                    <p className="text-red-600 font-bold">
                      ${loser.net_worth_change.toLocaleString()}B
                    </p>
                  </div>
                  <p className="text-sm text-red-600">
                    {loser.percentage_change.toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyMovers;