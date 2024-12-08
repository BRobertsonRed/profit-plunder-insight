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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for demonstration
const mockErrorLogs = [
  {
    id: 1,
    timestamp: new Date().toISOString(),
    source: "Alpha Vantage API",
    errorType: "Timeout",
    status: "Pending",
    message: "Request timed out after 30 seconds",
    affectedRecords: "Company financial data updates",
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    source: "Database Integration",
    errorType: "Data Format",
    status: "Resolved",
    message: "Invalid date format in company records",
    affectedRecords: "5 company entries",
  },
];

const ErrorLogsManager = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedErrorType, setSelectedErrorType] = useState("");
  const [selectedError, setSelectedError] = useState<any>(null);

  // In a real implementation, this would fetch from your error logging system
  const { data: errorLogs, isLoading } = useQuery({
    queryKey: ["errorLogs", selectedTimeRange, selectedSource, selectedErrorType],
    queryFn: async () => {
      // Mock API call
      return mockErrorLogs;
    },
  });

  const errorMetrics = {
    totalToday: errorLogs?.filter(
      (log) =>
        new Date(log.timestamp).toDateString() === new Date().toDateString()
    ).length,
    mostFrequentApi: "Alpha Vantage API",
    lastErrorTime: errorLogs?.[0]?.timestamp,
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Error Logs</h2>
        <p className="text-muted-foreground">
          Monitor and resolve data integration issues.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Errors Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{errorMetrics.totalToday}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Frequent API</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{errorMetrics.mostFrequentApi}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Error</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {errorMetrics.lastErrorTime
                ? new Date(errorMetrics.lastErrorTime).toLocaleTimeString()
                : "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedSource} onValueChange={setSelectedSource}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="API/Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alpha-vantage">Alpha Vantage API</SelectItem>
            <SelectItem value="database">Database Integration</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedErrorType} onValueChange={setSelectedErrorType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Error Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="timeout">Timeout</SelectItem>
            <SelectItem value="data-format">Data Format</SelectItem>
            <SelectItem value="auth">Authentication</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>API/Source</TableHead>
              <TableHead>Error Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(3)
                .fill(null)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[150px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[80px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              errorLogs?.map((error) => (
                <TableRow key={error.id}>
                  <TableCell>
                    {new Date(error.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{error.source}</TableCell>
                  <TableCell>{error.errorType}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        error.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {error.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedError(error)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedError} onOpenChange={() => setSelectedError(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error Details</DialogTitle>
            <DialogDescription>
              Full information about the selected error.
            </DialogDescription>
          </DialogHeader>
          {selectedError && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Error Message</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedError.message}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Affected Records</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedError.affectedRecords}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Timestamp</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedError.timestamp).toLocaleString()}
                </p>
              </div>
              {selectedError.status === "Pending" && (
                <Button className="w-full">Mark as Resolved</Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ErrorLogsManager;