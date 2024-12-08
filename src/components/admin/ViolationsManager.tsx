import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const ViolationsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [violationType, setViolationType] = useState<string>("");

  const { data: violations, isLoading } = useQuery({
    queryKey: ["adminViolations", searchTerm, violationType],
    queryFn: async () => {
      let query;
      
      if (violationType === "wage_theft") {
        query = supabase
          .from("wage_theft_cases")
          .select("*, companies(name)")
          .order("date_filed", { ascending: false });
      } else if (violationType === "environmental") {
        query = supabase
          .from("environmental_violations")
          .select("*, companies(name)")
          .order("incident_date", { ascending: false });
      } else {
        // Default to wage theft if no type selected
        query = supabase
          .from("wage_theft_cases")
          .select("*, companies(name)")
          .order("date_filed", { ascending: false });
      }

      if (searchTerm) {
        query.textSearch("description", searchTerm);
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
          <h2 className="text-3xl font-bold tracking-tight">Violations</h2>
          <p className="text-muted-foreground">
            Manage and review violation records.
          </p>
        </div>
        <Button>Add Violation</Button>
      </div>

      <div className="flex items-center space-x-4">
        <Select
          value={violationType}
          onValueChange={setViolationType}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wage_theft">Wage Theft</SelectItem>
            <SelectItem value="environmental">Environmental</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search violations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
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
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              violations?.map((violation) => (
                <TableRow key={violation.id}>
                  <TableCell className="font-medium">
                    {violation.companies?.name}
                  </TableCell>
                  <TableCell>
                    {violationType === "environmental"
                      ? violation.incident_type
                      : "Wage Theft"}
                  </TableCell>
                  <TableCell>
                    ${new Intl.NumberFormat().format(violation.amount || 0)}
                  </TableCell>
                  <TableCell>{violation.status}</TableCell>
                  <TableCell>
                    {new Date(
                      violationType === "environmental"
                        ? violation.incident_date
                        : violation.date_filed
                    ).toLocaleDateString()}
                  </TableCell>
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

export default ViolationsManager;