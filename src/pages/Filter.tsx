import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Filters {
  industry?: string;
  region?: string;
  violationType?: string[];
  year?: string;
}

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50];

const Filter = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ["filterCompanies", filters, page, itemsPerPage],
    queryFn: async () => {
      let query = supabase.from("companies").select("*");

      if (filters.industry) {
        query = query.eq("industry", filters.industry);
      }
      if (filters.region) {
        query = query.eq("headquarters", filters.region);
      }

      const { data, error } = await query
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

      if (error) throw error;
      return data;
    },
  });

  const { data: violations, isLoading: isLoadingViolations } = useQuery({
    queryKey: ["filterViolations", filters, page, itemsPerPage],
    queryFn: async () => {
      let query = supabase
        .from("wage_theft_cases")
        .select("*, companies(name)");

      if (filters.year) {
        query = query.gte("date_filed", `${filters.year}-01-01`)
          .lte("date_filed", `${filters.year}-12-31`);
      }

      const { data, error } = await query
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

      if (error) throw error;
      return data;
    },
  });

  const isLoading = isLoadingCompanies || isLoadingViolations;
  const hasResults = (companies?.length || 0) + (violations?.length || 0) > 0;

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto pt-24 px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold">Filter Results</h1>
            <p className="text-muted-foreground">
              Explore data by applying filters
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="whitespace-nowrap"
          >
            Clear All Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          <aside className="space-y-6 bg-card p-6 rounded-lg border">
            <div className="space-y-4">
              <h3 className="font-semibold">Industry</h3>
              <Select
                value={filters.industry}
                onValueChange={(value) => handleFilterChange("industry", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Region</h3>
              <Select
                value={filters.region}
                onValueChange={(value) => handleFilterChange("region", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Year</h3>
              <Select
                value={filters.year}
                onValueChange={(value) => handleFilterChange("year", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {[2024, 2023, 2022, 2021, 2020].map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Violation Types</h3>
              <div className="space-y-2">
                {["Wage Theft", "Environmental", "Labor"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={filters.violationType?.includes(type)}
                      onCheckedChange={(checked) => {
                        const newTypes = checked
                          ? [...(filters.violationType || []), type]
                          : (filters.violationType || []).filter(t => t !== type);
                        handleFilterChange("violationType", newTypes);
                      }}
                    />
                    <label htmlFor={type} className="text-sm">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : !hasResults ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-lg text-muted-foreground">
                    No results found. Try adjusting your filters.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {companies && companies.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-semibold mb-4">Companies</h2>
                    <div className="grid gap-4">
                      {companies.map((company) => (
                        <Card key={company.id}>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">
                              {company.name}
                            </h3>
                            <dl className="grid grid-cols-2 gap-4">
                              <div>
                                <dt className="text-sm text-muted-foreground">
                                  Industry
                                </dt>
                                <dd>{company.industry || "N/A"}</dd>
                              </div>
                              <div>
                                <dt className="text-sm text-muted-foreground">
                                  Headquarters
                                </dt>
                                <dd>{company.headquarters || "N/A"}</dd>
                              </div>
                            </dl>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}

                {violations && violations.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-semibold mb-4">Violations</h2>
                    <div className="grid gap-4">
                      {violations.map((violation) => (
                        <Card key={violation.id}>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">
                              {violation.companies?.name}
                            </h3>
                            <dl className="grid grid-cols-2 gap-4">
                              <div>
                                <dt className="text-sm text-muted-foreground">
                                  Amount
                                </dt>
                                <dd>
                                  ${new Intl.NumberFormat().format(violation.amount || 0)}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-sm text-muted-foreground">
                                  Status
                                </dt>
                                <dd>{violation.status || "N/A"}</dd>
                              </div>
                            </dl>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <Select
                value={String(itemsPerPage)}
                onValueChange={(value) => setItemsPerPage(Number(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Results per page" />
                </SelectTrigger>
                <SelectContent>
                  {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option} results per page
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>{page}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((p) => p + 1)}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Filter;