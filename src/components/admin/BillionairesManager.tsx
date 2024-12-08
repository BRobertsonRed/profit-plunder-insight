import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const BillionairesManager = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: billionaires, isLoading } = useQuery({
    queryKey: ["adminBillionaires", searchTerm],
    queryFn: async () => {
      const query = supabase
        .from("billionaires")
        .select("*")
        .order("net_worth", { ascending: false });

      if (searchTerm) {
        query.ilike("name", `%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billionaires</h2>
          <p className="text-muted-foreground">
            Manage billionaire profiles and data.
          </p>
        </div>
        <Button>Add Billionaire</Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search billionaires..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Net Worth</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Residence</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(null)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-[200px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[150px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[150px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              billionaires?.map((billionaire) => (
                <TableRow key={billionaire.id}>
                  <TableCell className="font-medium">{billionaire.name}</TableCell>
                  <TableCell>
                    ${(billionaire.net_worth || 0).toFixed(1)}B
                  </TableCell>
                  <TableCell>{billionaire.primary_industry}</TableCell>
                  <TableCell>{billionaire.residence}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BillionairesManager;