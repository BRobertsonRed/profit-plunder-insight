import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Companies() {
  const { toast } = useToast();

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select(`
          *,
          environmental_violations(count),
          legal_cases(count),
          wage_theft_cases(count)
        `);
      
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
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="heading-lg text-center mb-8 animate-fade-up">
          Corporate Accountability Tracker
        </h1>

        {/* Stats Overview */}
        {companies && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-up">
            <Card className="stat-card">
              <CardContent>
                <h3 className="font-display text-lg font-bold mb-2">Total Companies</h3>
                <p className="text-3xl font-bold text-primary">{companies.length}</p>
              </CardContent>
            </Card>
            <Card className="stat-card">
              <CardContent>
                <h3 className="font-display text-lg font-bold mb-2">Environmental Violations</h3>
                <p className="text-3xl font-bold text-accent">
                  {companies.reduce((acc, company) => acc + (company.environmental_violations?.[0]?.count || 0), 0)}
                </p>
              </CardContent>
            </Card>
            <Card className="stat-card">
              <CardContent>
                <h3 className="font-display text-lg font-bold mb-2">Legal Cases</h3>
                <p className="text-3xl font-bold text-secondary">
                  {companies.reduce((acc, company) => acc + (company.legal_cases?.[0]?.count || 0), 0)}
                </p>
              </CardContent>
            </Card>
            <Card className="stat-card">
              <CardContent>
                <h3 className="font-display text-lg font-bold mb-2">Wage Theft Cases</h3>
                <p className="text-3xl font-bold text-muted">
                  {companies.reduce((acc, company) => acc + (company.wage_theft_cases?.[0]?.count || 0), 0)}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="min-h-[400px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <ErrorMessage 
              title="Failed to load companies" 
              message="There was an error loading the companies data. Please try again later." 
            />
          </div>
        )}

        {/* Companies Table */}
        {companies && (
          <div className="overflow-x-auto animate-fade-up">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Headquarters</TableHead>
                  <TableHead className="text-right">Market Cap</TableHead>
                  <TableHead className="text-right">Violations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.headquarters}</TableCell>
                    <TableCell className="text-right">
                      ${company.market_cap ? (company.market_cap / 1e9).toFixed(2) + "B" : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      {(company.environmental_violations?.[0]?.count || 0) + 
                       (company.legal_cases?.[0]?.count || 0) + 
                       (company.wage_theft_cases?.[0]?.count || 0)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}