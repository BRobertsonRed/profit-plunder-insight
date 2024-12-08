export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      billionaires: {
        Row: {
          id: number
          name: string
          net_worth: number | null
          primary_industry: string | null
          residence: string | null
        }
        Insert: {
          id?: number
          name: string
          net_worth?: number | null
          primary_industry?: string | null
          residence?: string | null
        }
        Update: {
          id?: number
          name?: string
          net_worth?: number | null
          primary_industry?: string | null
          residence?: string | null
        }
        Relationships: []
      }
      charitable_contributions: {
        Row: {
          cause: string | null
          company_id: number | null
          date_donated: string | null
          donation_amount: number | null
          id: number
        }
        Insert: {
          cause?: string | null
          company_id?: number | null
          date_donated?: string | null
          donation_amount?: number | null
          id?: number
        }
        Update: {
          cause?: string | null
          company_id?: number | null
          date_donated?: string | null
          donation_amount?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "charitable_contributions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          effective_tax_rate: number | null
          headquarters: string | null
          id: number
          industry: string | null
          market_cap: number | null
          name: string
          profit: Json | null
          shareholder_payouts: Json | null
        }
        Insert: {
          effective_tax_rate?: number | null
          headquarters?: string | null
          id?: number
          industry?: string | null
          market_cap?: number | null
          name: string
          profit?: Json | null
          shareholder_payouts?: Json | null
        }
        Update: {
          effective_tax_rate?: number | null
          headquarters?: string | null
          id?: number
          industry?: string | null
          market_cap?: number | null
          name?: string
          profit?: Json | null
          shareholder_payouts?: Json | null
        }
        Relationships: []
      }
      environmental_violations: {
        Row: {
          company_id: number | null
          id: number
          incident_date: string | null
          incident_type: string | null
          location: string | null
          penalty_amount: number | null
        }
        Insert: {
          company_id?: number | null
          id?: number
          incident_date?: string | null
          incident_type?: string | null
          location?: string | null
          penalty_amount?: number | null
        }
        Update: {
          company_id?: number | null
          id?: number
          incident_date?: string | null
          incident_type?: string | null
          location?: string | null
          penalty_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "environmental_violations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      executive_compensation: {
        Row: {
          bonus: number | null
          company_id: number | null
          executive_name: string | null
          id: number
          position: string | null
          salary: number | null
          stock_options: number | null
        }
        Insert: {
          bonus?: number | null
          company_id?: number | null
          executive_name?: string | null
          id?: number
          position?: string | null
          salary?: number | null
          stock_options?: number | null
        }
        Update: {
          bonus?: number | null
          company_id?: number | null
          executive_name?: string | null
          id?: number
          position?: string | null
          salary?: number | null
          stock_options?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "executive_compensation_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      impact_stories: {
        Row: {
          author: string | null
          company_id: number | null
          content: string | null
          id: number
          story_type: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          company_id?: number | null
          content?: string | null
          id?: number
          story_type?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          company_id?: number | null
          content?: string | null
          id?: number
          story_type?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "impact_stories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_cases: {
        Row: {
          company_id: number | null
          id: number
          jurisdiction: string | null
          payout: number | null
          status: string | null
          type: string | null
          verdict_date: string | null
        }
        Insert: {
          company_id?: number | null
          id?: number
          jurisdiction?: string | null
          payout?: number | null
          status?: string | null
          type?: string | null
          verdict_date?: string | null
        }
        Update: {
          company_id?: number | null
          id?: number
          jurisdiction?: string | null
          payout?: number | null
          status?: string | null
          type?: string | null
          verdict_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legal_cases_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      lobbying_data: {
        Row: {
          company_id: number | null
          id: number
          legislation: string | null
          lobbying_amount: number | null
          policy_area: string | null
        }
        Insert: {
          company_id?: number | null
          id?: number
          legislation?: string | null
          lobbying_amount?: number | null
          policy_area?: string | null
        }
        Update: {
          company_id?: number | null
          id?: number
          legislation?: string | null
          lobbying_amount?: number | null
          policy_area?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lobbying_data_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ownership: {
        Row: {
          billionaire_id: number | null
          company_id: number | null
          control_status: boolean | null
          id: number
          ownership_percentage: number | null
        }
        Insert: {
          billionaire_id?: number | null
          company_id?: number | null
          control_status?: boolean | null
          id?: number
          ownership_percentage?: number | null
        }
        Update: {
          billionaire_id?: number | null
          company_id?: number | null
          control_status?: boolean | null
          id?: number
          ownership_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ownership_billionaire_id_fkey"
            columns: ["billionaire_id"]
            isOneToOne: false
            referencedRelation: "billionaires"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ownership_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      supply_chain_violations: {
        Row: {
          company_id: number | null
          date_reported: string | null
          details: string | null
          id: number
          location: string | null
          violation_type: string | null
        }
        Insert: {
          company_id?: number | null
          date_reported?: string | null
          details?: string | null
          id?: number
          location?: string | null
          violation_type?: string | null
        }
        Update: {
          company_id?: number | null
          date_reported?: string | null
          details?: string | null
          id?: number
          location?: string | null
          violation_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supply_chain_violations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      wage_theft_cases: {
        Row: {
          amount: number | null
          company_id: number | null
          date_filed: string | null
          description: string | null
          id: number
          jurisdiction: string | null
          status: string | null
        }
        Insert: {
          amount?: number | null
          company_id?: number | null
          date_filed?: string | null
          description?: string | null
          id?: number
          jurisdiction?: string | null
          status?: string | null
        }
        Update: {
          amount?: number | null
          company_id?: number | null
          date_filed?: string | null
          description?: string | null
          id?: number
          jurisdiction?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wage_theft_cases_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never