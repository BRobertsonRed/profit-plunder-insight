import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50];

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ["searchCompanies", query, page, itemsPerPage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .ilike("name", `%${query}%`)
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

      if (error) throw error;
      return data;
    },
    enabled: !!query,
  });

  const { data: billionaires, isLoading: isLoadingBillionaires } = useQuery({
    queryKey: ["searchBillionaires", query, page, itemsPerPage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("billionaires")
        .select("*")
        .ilike("name", `%${query}%`)
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

      if (error) throw error;
      return data;
    },
    enabled: !!query,
  });

  const isLoading = isLoadingCompanies || isLoadingBillionaires;
  const hasResults = (companies?.length || 0) + (billionaires?.length || 0) > 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results for: {query}</h1>
        <p className="text-muted-foreground">
          Found {(companies?.length || 0) + (billionaires?.length || 0)} results
          matching your query
        </p>
      </div>

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
              No results found. Please try another search term.
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
                    <CardHeader>
                      <CardTitle>{company.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm text-muted-foreground">Industry</dt>
                          <dd>{company.industry || "N/A"}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">Headquarters</dt>
                          <dd>{company.headquarters || "N/A"}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {billionaires && billionaires.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Billionaires</h2>
              <div className="grid gap-4">
                {billionaires.map((billionaire) => (
                  <Card key={billionaire.id}>
                    <CardHeader>
                      <CardTitle>{billionaire.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm text-muted-foreground">Net Worth</dt>
                          <dd>
                            ${new Intl.NumberFormat("en-US").format(
                              Number(billionaire.net_worth) || 0
                            )}B
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">Industry</dt>
                          <dd>{billionaire.primary_industry || "N/A"}</dd>
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
    </div>
  );
};

export default Search;