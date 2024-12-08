import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
        console.error("Error fetching companies:", error);
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
            <Button 
              variant="default" 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white animate-fade-up"
              style={{ animationDelay: "0.4s" }}
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "This feature will be available soon.",
                });
              }}
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-8 text-center">
            Featured Companies
          </h2>

          {isLoading && (
            <div className="min-h-[300px] flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          
          {error && (
            <div className="max-w-2xl mx-auto">
              <ErrorMessage 
                title="Failed to load companies" 
                message="There was an error loading the featured companies. Please try again later." 
              />
            </div>
          )}

          {companies && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Card 
                  key={company.id}
                  className="bg-white hover:shadow-lg transition-shadow duration-300 animate-fade-up"
                  style={{ animationDelay: `${0.1 * companies.indexOf(company)}s` }}
                >
                  <CardContent className="p-6">
                    <h3 className="font-display font-bold text-xl mb-2">{company.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{company.industry}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span>Market Cap: ${company.market_cap ? (company.market_cap / 1e9).toFixed(2) + "B" : "N/A"}</span>
                      <span className="text-primary">{company.headquarters}</span>
                    </div>
                  </CardContent>
                </Card>
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
          <Button 
            variant="secondary"
            size="lg"
            onClick={() => toast({
              title: "Coming Soon",
              description: "This feature will be available in the future.",
            })}
            className="bg-white text-primary hover:bg-white/90 transition-colors"
          >
            Get Updates
          </Button>
        </div>
      </section>
    </div>
  );
}