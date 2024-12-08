import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [selectedCopy, setSelectedCopy] = useState<{
    id: number;
    section: string;
    current_copy: string;
  } | null>(null);
  const [newCopy, setNewCopy] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEdit = (copy: typeof selectedCopy) => {
    setSelectedCopy(copy);
    setNewCopy(copy?.current_copy || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedCopy) return;

    const { error } = await supabase
      .from("website_copy")
      .update({
        current_copy: newCopy,
        last_updated: new Date().toISOString(),
        updated_by: "Admin", // TODO: Replace with actual admin user
      })
      .eq("id", selectedCopy.id);

    if (error) {
      console.error("Error updating website copy:", error);
      return;
    }

    setIsEditing(false);
    setSelectedCopy(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Website Copy</h2>
          <p className="text-muted-foreground">
            Update text content on various pages of the site.
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
                    <Dialog open={isEditing} onOpenChange={setIsEditing}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(copy)}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Website Copy</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <label className="text-sm font-medium">
                              Section (Read-only)
                            </label>
                            <Input
                              value={selectedCopy?.section || ""}
                              disabled
                              className="mt-1.5"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">
                              Current Copy
                            </label>
                            <Textarea
                              value={selectedCopy?.current_copy || ""}
                              disabled
                              className="mt-1.5 min-h-[100px]"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">
                              New Copy
                            </label>
                            <Textarea
                              value={newCopy}
                              onChange={(e) => setNewCopy(e.target.value)}
                              className="mt-1.5 min-h-[200px]"
                              placeholder="Enter the updated content here..."
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => setIsEditing(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleSave}>Save Changes</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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