import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "../components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { BillionaireStats } from "@/components/billionaires/BillionaireStats";
import { CompanyOwnership } from "@/components/billionaires/CompanyOwnership";
import { IndustryInfluence } from "@/components/billionaires/IndustryInfluence";

const Billionaires = () => {
  const { id } = useParams();

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
        <div className="mb-8 animate-fade-in">
          <h1 className="heading-xl mb-6 text-center lg:text-left">{billionaire?.name || "Loading..."}</h1>
          <BillionaireStats billionaire={billionaire} />
        </div>
        <CompanyOwnership billionaire={billionaire} />
        <IndustryInfluence />
      </main>
    </div>
  );
};

export default Billionaires;