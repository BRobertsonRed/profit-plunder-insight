import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";

type BillionaireWithOwnership = Tables<"billionaires"> & {
  ownership: Array<{
    companies: Tables<"companies"> | null;
    ownership_percentage: number | null;
    control_status: boolean | null;
    id: number;
    billionaire_id: number | null;
    company_id: number | null;
  } | null> | null;
};

interface CompanyOwnershipProps {
  billionaire: BillionaireWithOwnership;
}

export const CompanyOwnership = ({ billionaire }: CompanyOwnershipProps) => {
  return (
    <div className="mb-8">
      <h2 className="heading-lg mb-6 text-center lg:text-left">Company Ownership</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {billionaire?.ownership?.map((ownership) => (
          <Card key={ownership?.companies?.id} className="bg-white shadow-lg transition-transform hover:scale-105">
            <CardHeader>
              <CardTitle>{ownership?.companies?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {ownership?.ownership_percentage}%
              </p>
              <p className="text-sm text-muted-foreground">Ownership Stake</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};