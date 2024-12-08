import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useToast } from "@/components/ui/use-toast";

export default function Index() {
  const { toast } = useToast();

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ["featured-companies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .limit(5);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-secondary py-12 md:py-24 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 animate-fade-up">
              Exposing Corporate Wealth & Impact
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Tracking the influence of wealth concentration and corporate practices on society
            </p>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-8 text-center">
            Featured Companies
          </h2>

          {isLoading && <LoadingSpinner />}
          
          {error && (
            <ErrorMessage 
              title="Failed to load companies" 
              message="There was an error loading the featured companies. Please try again later." 
            />
          )}

          {companies && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <div 
                  key={company.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="font-display font-bold text-xl mb-2">{company.name}</h3>
                  <p className="text-muted text-sm mb-4">{company.industry}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span>Market Cap: ${company.market_cap ? (company.market_cap / 1e9).toFixed(2) + "B" : "N/A"}</span>
                    <span className="text-primary">{company.headquarters}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary py-12 md:py-16 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
            Stay Informed
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Track corporate influence, wealth concentration, and their societal impacts.
          </p>
          <button 
            onClick={() => toast({
              title: "Coming Soon",
              description: "This feature will be available in the future.",
            })}
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Get Updates
          </button>
        </div>
      </section>
    </div>
  );
}