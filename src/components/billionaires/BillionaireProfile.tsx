import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { BillionaireStats } from "@/components/billionaires/BillionaireStats";
import { CompanyOwnership } from "@/components/billionaires/CompanyOwnership";
import { IndustryInfluence } from "@/components/billionaires/IndustryInfluence";
import { NetWorthHistory } from "@/components/billionaires/NetWorthHistory";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface BillionaireProfileProps {
  id: string;
}

export const BillionaireProfile = ({ id }: BillionaireProfileProps) => {
  const { toast } = useToast();

  const { data: billionaire, isLoading, error, refetch } = useQuery({
    queryKey: ["billionaire", id],
    queryFn: async () => {
      console.log("Fetching billionaire data for ID:", id);
      
      const { data, error } = await supabase
        .from("billionaires")
        .select(`
          *,
          ownership (
            *,
            companies (*)
          )
        `)
        .eq('id', parseInt(id))
        .single();

      if (error) {
        console.error("Error fetching billionaire:", error);
        throw error;
      }
      
      console.log("Fetched billionaire data:", data);
      return data;
    },
    enabled: !!id && !isNaN(parseInt(id)),
    staleTime: 30000,
    retry: 2,
  });

  useEffect(() => {
    const channel = supabase
      .channel('billionaire-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'billionaires',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          const newData = payload.new as typeof billionaire;
          
          if (newData?.net_worth !== billionaire?.net_worth) {
            const change = (newData?.net_worth || 0) - (billionaire?.net_worth || 0);
            const changeText = change > 0 ? `+$${change.toFixed(2)}B` : `-$${Math.abs(change).toFixed(2)}B`;
            
            toast({
              title: "Net Worth Update",
              description: `${billionaire?.name}'s net worth changed by ${changeText}`,
              variant: change > 0 ? "default" : "destructive",
            });
          }
          
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, billionaire?.net_worth, billionaire?.name, refetch, toast]);

  if (error) {
    return (
      <ErrorMessage 
        title="Failed to load billionaire data" 
        message={error instanceof Error ? error.message : "An unexpected error occurred"} 
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const netWorthHistory = billionaire?.net_worth_history as Array<{ date: string; value: number }> || [];

  return (
    <div className="animate-fade-in">
      <h1 className="heading-xl mb-6 text-center lg:text-left">{billionaire?.name || "Loading..."}</h1>
      <BillionaireStats billionaire={billionaire} />
      <NetWorthHistory history={netWorthHistory} />
      <CompanyOwnership billionaire={billionaire} />
      <IndustryInfluence />
    </div>
  );
};