import { useQuery } from "@tanstack/react-query";
import Navigation from "../components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";

const Rankings = () => {
  const { data: billionaires, isLoading, error } = useQuery({
    queryKey: ["billionaires-rankings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("billionaires")
        .select("*")
        .order("net_worth", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 lg:px-6">
          <ErrorMessage 
            title="Failed to load rankings" 
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
        <h1 className="heading-xl mb-6 text-center lg:text-left">Real-Time Rankings</h1>
        <div className="grid gap-4">
          {billionaires?.map((billionaire) => (
            <div
              key={billionaire.id}
              className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{billionaire.name}</h2>
                <p className="text-lg font-bold">
                  ${(billionaire.net_worth || 0).toLocaleString()}B
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {billionaire.primary_industry || "Various Industries"}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Rankings;