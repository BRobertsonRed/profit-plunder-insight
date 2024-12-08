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

const WebsiteCopyManager = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: websiteCopy, isLoading } = useQuery({
    queryKey: ["adminWebsiteCopy", searchTerm],
    queryFn: async () => {
      const query = supabase
        .from("website_copy")
        .select("*")
        .order("section");

      if (searchTerm) {
        query.or(
          `section.ilike.%${searchTerm}%,current_copy.ilike.%${searchTerm}%`
        );
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
          <h2 className="text-3xl font-bold tracking-tight">Website Copy</h2>
          <p className="text-muted-foreground">
            Manage website content and copy.
          </p>
        </div>
        <Button>Add Section</Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Section</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Updated By</TableHead>
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
                      <Skeleton className="h-4 w-[150px]" />
                    </TableCell>
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
                  </TableRow>
                ))
            ) : (
              websiteCopy?.map((copy) => (
                <TableRow key={copy.id}>
                  <TableCell className="font-medium">{copy.section}</TableCell>
                  <TableCell>
                    {copy.current_copy.substring(0, 100)}
                    {copy.current_copy.length > 100 ? "..." : ""}
                  </TableCell>
                  <TableCell>
                    {new Date(copy.last_updated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{copy.updated_by}</TableCell>
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

export default WebsiteCopyManager;