import { Building2, DollarSign, Globe, Factory, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";

type BillionaireWithOwnership = Tables<"billionaires"> & {
  ownership: Array<{
    companies: Tables<"companies"> | null;
    ownership_percentage: number | null;
  } | null> | null;
};

interface BillionaireStatsProps {
  billionaire: BillionaireWithOwnership;
}

export const BillionaireStats = ({ billionaire }: BillionaireStatsProps) => {
  const rankChange = billionaire?.current_rank && billionaire?.previous_rank
    ? billionaire.previous_rank - billionaire.current_rank
    : 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <Card className="bg-white shadow-lg transition-transform hover:scale-105">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <DollarSign className="mr-2 h-4 w-4 text-muted" />
          <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            ${(billionaire?.net_worth || 0).toLocaleString()}B
          </p>
          {billionaire?.last_change && (
            <p className={`text-sm ${billionaire.last_change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {billionaire.last_change > 0 ? '+' : ''}{billionaire.last_change.toFixed(2)}B today
            </p>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-lg transition-transform hover:scale-105">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <TrendingUp className="mr-2 h-4 w-4 text-muted" />
          <CardTitle className="text-sm font-medium">Rank</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">#{billionaire?.current_rank || 'N/A'}</p>
          {rankChange !== 0 && (
            <p className={`text-sm ${rankChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {rankChange > 0 ? '↑' : '↓'} {Math.abs(rankChange)} positions
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg transition-transform hover:scale-105">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <Factory className="mr-2 h-4 w-4 text-muted" />
          <CardTitle className="text-sm font-medium">Industry</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {billionaire?.primary_industry || "Various"}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg transition-transform hover:scale-105">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <Globe className="mr-2 h-4 w-4 text-muted" />
          <CardTitle className="text-sm font-medium">Residence</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {billionaire?.residence || "Unknown"}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg transition-transform hover:scale-105">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <Building2 className="mr-2 h-4 w-4 text-muted" />
          <CardTitle className="text-sm font-medium">Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {billionaire?.ownership?.length || 0}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};