export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_chat_history: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          question: string
          sources: Json | null
          user_id: string | null
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          question: string
          sources?: Json | null
          user_id?: string | null
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          question?: string
          sources?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_chat_usage: {
        Row: {
          count: number | null
          date: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          count?: number | null
          date?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          count?: number | null
          date?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          created_at: string | null
          id: string
          message: string
          recipient_count: number | null
          sent_by: string | null
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          recipient_count?: number | null
          sent_by?: string | null
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          recipient_count?: number | null
          sent_by?: string | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      bills: {
        Row: {
          amount: number | null
          category: string | null
          created_at: string | null
          domain: string | null
          due_date: number | null
          due_date_proper: string | null
          file_url: string | null
          id: string
          merchant: string | null
          name: string
          plaid_transaction_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          category?: string | null
          created_at?: string | null
          domain?: string | null
          due_date?: number | null
          due_date_proper?: string | null
          file_url?: string | null
          id?: string
          merchant?: string | null
          name: string
          plaid_transaction_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          category?: string | null
          created_at?: string | null
          domain?: string | null
          due_date?: number | null
          due_date_proper?: string | null
          file_url?: string | null
          id?: string
          merchant?: string | null
          name?: string
          plaid_transaction_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          created_at: string | null
          description: string | null
          end_time: string | null
          id: string
          location: string | null
          source: string | null
          start_time: string
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          id?: string
          location?: string | null
          source?: string | null
          start_time: string
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          id?: string
          location?: string | null
          source?: string | null
          start_time?: string
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      contact_drafts: {
        Row: {
          body: string | null
          contact_id: string | null
          created_at: string | null
          id: string
          subject: string | null
          user_id: string | null
        }
        Insert: {
          body?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          subject?: string | null
          user_id?: string | null
        }
        Update: {
          body?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          subject?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contact_emails: {
        Row: {
          body: string | null
          contact_id: string | null
          id: string
          sent_at: string | null
          status: string | null
          subject: string | null
          user_id: string | null
        }
        Insert: {
          body?: string | null
          contact_id?: string | null
          id?: string
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Update: {
          body?: string | null
          contact_id?: string | null
          id?: string
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contact_interactions: {
        Row: {
          contact_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          email_count: number | null
          id: string
          last_contacted_date: string | null
          last_email_date: string | null
          name: string
          notes: string | null
          phone: string | null
          priority: number | null
          role: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          email_count?: number | null
          id?: string
          last_contacted_date?: string | null
          last_email_date?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          priority?: number | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          email_count?: number | null
          id?: string
          last_contacted_date?: string | null
          last_email_date?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          priority?: number | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      content_items: {
        Row: {
          caption: string | null
          created_at: string | null
          hashtags: string[] | null
          id: string
          media_url: string | null
          notes: string | null
          platform: string | null
          scheduled_date: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          media_url?: string | null
          notes?: string | null
          platform?: string | null
          scheduled_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          media_url?: string | null
          notes?: string | null
          platform?: string | null
          scheduled_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      deal_tasks: {
        Row: {
          completed: boolean | null
          created_at: string | null
          deal_id: string | null
          due_date: string | null
          id: string
          task: string
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          deal_id?: string | null
          due_date?: string | null
          id?: string
          task: string
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          deal_id?: string | null
          due_date?: string | null
          id?: string
          task?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deal_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          amount: number | null
          brand_name: string
          contact_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          brand_name: string
          contact_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          brand_name?: string
          contact_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      debts: {
        Row: {
          balance: number | null
          created_at: string | null
          id: string
          interest_rate: number | null
          lender: string | null
          monthly_payment: number | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          id?: string
          interest_rate?: number | null
          lender?: string | null
          monthly_payment?: number | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          id?: string
          interest_rate?: number | null
          lender?: string | null
          monthly_payment?: number | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      email_drafts: {
        Row: {
          body: string | null
          contact_id: string | null
          created_at: string | null
          id: string
          subject: string | null
          user_id: string | null
        }
        Insert: {
          body?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          subject?: string | null
          user_id?: string | null
        }
        Update: {
          body?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          subject?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      event_details: {
        Row: {
          created_at: string | null
          custom_questions: Json | null
          guest_emails: string[] | null
          id: string
          privacy: string | null
          project_id: string | null
          rsvp_deadline: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          custom_questions?: Json | null
          guest_emails?: string[] | null
          id?: string
          privacy?: string | null
          project_id?: string | null
          rsvp_deadline?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          custom_questions?: Json | null
          guest_emails?: string[] | null
          id?: string
          privacy?: string | null
          project_id?: string | null
          rsvp_deadline?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      event_stages: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          order_index: number | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          order_index?: number | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          order_index?: number | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_stages_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_tasks: {
        Row: {
          completed: boolean | null
          created_at: string | null
          deadline: string | null
          event_id: string | null
          id: string
          stage_id: string | null
          task: string
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          deadline?: string | null
          event_id?: string | null
          id?: string
          stage_id?: string | null
          task: string
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          deadline?: string | null
          event_id?: string | null
          id?: string
          stage_id?: string | null
          task?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_tasks_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "event_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          archived: boolean | null
          created_at: string | null
          date: string | null
          description: string | null
          event_type: string | null
          guest_count: number | null
          id: string
          import_platform: string | null
          import_url: string | null
          location: string | null
          privacy: string | null
          rsvp_deadline: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          archived?: boolean | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          event_type?: string | null
          guest_count?: number | null
          id?: string
          import_platform?: string | null
          import_url?: string | null
          location?: string | null
          privacy?: string | null
          rsvp_deadline?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          archived?: boolean | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          event_type?: string | null
          guest_count?: number | null
          id?: string
          import_platform?: string | null
          import_url?: string | null
          location?: string | null
          privacy?: string | null
          rsvp_deadline?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number | null
          category: string | null
          created_at: string | null
          date: string | null
          id: string
          merchant: string | null
          name: string | null
          plaid_transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          category?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          merchant?: string | null
          name?: string | null
          plaid_transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          category?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          merchant?: string | null
          name?: string | null
          plaid_transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string | null
          id: string
          message: string
          status: string | null
          type: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          status?: string | null
          type?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          status?: string | null
          type?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      goal_stages: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          position: number | null
          project_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          position?: number | null
          project_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          position?: number | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goal_stages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      goal_tasks: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          position: number | null
          project_id: string | null
          stage_id: string | null
          title: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          position?: number | null
          project_id?: string | null
          stage_id?: string | null
          title: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          position?: number | null
          project_id?: string | null
          stage_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "goal_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goal_tasks_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "goal_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      habit_logs: {
        Row: {
          created_at: string | null
          habit_id: string | null
          hours: number | null
          id: string
          user_id: string | null
          week_start_date: string | null
        }
        Insert: {
          created_at?: string | null
          habit_id?: string | null
          hours?: number | null
          id?: string
          user_id?: string | null
          week_start_date?: string | null
        }
        Update: {
          created_at?: string | null
          habit_id?: string | null
          hours?: number | null
          id?: string
          user_id?: string | null
          week_start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "habit_logs_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          created_at: string | null
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          audio_url: string | null
          content: string | null
          created_at: string | null
          id: string
          mood: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          audio_url?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          mood?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          audio_url?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          mood?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      loans: {
        Row: {
          amount: number | null
          created_at: string | null
          id: string
          interest_rate: number | null
          monthly_payment: number | null
          name: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: string
          interest_rate?: number | null
          monthly_payment?: number | null
          name: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: string
          interest_rate?: number | null
          monthly_payment?: number | null
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      money_preferences: {
        Row: {
          created_at: string | null
          financial_plan: Json | null
          id: string
          monthly_budget: number | null
          onboarding_completed: boolean | null
          preferred_currency: string | null
          savings_goal_pct: number | null
          show_investments: boolean | null
          show_net_worth: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          financial_plan?: Json | null
          id?: string
          monthly_budget?: number | null
          onboarding_completed?: boolean | null
          preferred_currency?: string | null
          savings_goal_pct?: number | null
          show_investments?: boolean | null
          show_net_worth?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          financial_plan?: Json | null
          id?: string
          monthly_budget?: number | null
          onboarding_completed?: boolean | null
          preferred_currency?: string | null
          savings_goal_pct?: number | null
          show_investments?: boolean | null
          show_net_worth?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      monthly_reviews: {
        Row: {
          ai_summary: string | null
          completed_at: string | null
          created_at: string | null
          credit_score: number | null
          id: string
          month: number
          net_worth: number | null
          review_data: Json | null
          savings_rate: number | null
          user_id: string
          year: number
        }
        Insert: {
          ai_summary?: string | null
          completed_at?: string | null
          created_at?: string | null
          credit_score?: number | null
          id?: string
          month: number
          net_worth?: number | null
          review_data?: Json | null
          savings_rate?: number | null
          user_id: string
          year: number
        }
        Update: {
          ai_summary?: string | null
          completed_at?: string | null
          created_at?: string | null
          credit_score?: number | null
          id?: string
          month?: number
          net_worth?: number | null
          review_data?: Json | null
          savings_rate?: number | null
          user_id?: string
          year?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          category: string | null
          created_at: string | null
          id: string
          message: string | null
          read: boolean | null
          title: string | null
          type: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          read?: boolean | null
          title?: string | null
          type?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          read?: boolean | null
          title?: string | null
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      onboarding_video: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          id: string
          is_active: boolean | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string | null
          uploaded_by: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          is_active?: boolean | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          is_active?: boolean | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      onboarding_video_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          dismissed: boolean | null
          id: string
          user_id: string | null
          video_id: string | null
          watched: boolean | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          dismissed?: boolean | null
          id?: string
          user_id?: string | null
          video_id?: string | null
          watched?: boolean | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          dismissed?: boolean | null
          id?: string
          user_id?: string | null
          video_id?: string | null
          watched?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_video_progress_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "onboarding_video"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          estimated_total: number | null
          id: string
          order_type: string | null
          price_type: string | null
          quantity: number | null
          status: string | null
          symbol: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          estimated_total?: number | null
          id?: string
          order_type?: string | null
          price_type?: string | null
          quantity?: number | null
          status?: string | null
          symbol: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          estimated_total?: number | null
          id?: string
          order_type?: string | null
          price_type?: string | null
          quantity?: number | null
          status?: string | null
          symbol?: string
          user_id?: string | null
        }
        Relationships: []
      }
      plaid_accounts: {
        Row: {
          accounts_raw: Json | null
          checking_balance: number | null
          credit_balance: number | null
          id: string
          last_synced: string | null
          savings_balance: number | null
          total_balance: number | null
          user_id: string | null
        }
        Insert: {
          accounts_raw?: Json | null
          checking_balance?: number | null
          credit_balance?: number | null
          id?: string
          last_synced?: string | null
          savings_balance?: number | null
          total_balance?: number | null
          user_id?: string | null
        }
        Update: {
          accounts_raw?: Json | null
          checking_balance?: number | null
          credit_balance?: number | null
          id?: string
          last_synced?: string | null
          savings_balance?: number | null
          total_balance?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      plaid_connections: {
        Row: {
          access_token: string
          connected_at: string | null
          id: string
          institution_name: string | null
          item_id: string | null
          user_id: string | null
        }
        Insert: {
          access_token: string
          connected_at?: string | null
          id?: string
          institution_name?: string | null
          item_id?: string | null
          user_id?: string | null
        }
        Update: {
          access_token?: string
          connected_at?: string | null
          id?: string
          institution_name?: string | null
          item_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          founding_member: boolean | null
          full_name: string | null
          id: string
          is_subscribed: boolean | null
          plan_tier: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          founding_member?: boolean | null
          full_name?: string | null
          id?: string
          is_subscribed?: boolean | null
          plan_tier?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          founding_member?: boolean | null
          full_name?: string | null
          id?: string
          is_subscribed?: boolean | null
          plan_tier?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      project_stages: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          order_index: number | null
          project_id: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          order_index?: number | null
          project_id?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          order_index?: number | null
          project_id?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_stages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tasks: {
        Row: {
          completed: boolean | null
          created_at: string | null
          deadline: string | null
          id: string
          project_id: string | null
          stage_id: string | null
          task: string
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          deadline?: string | null
          id?: string
          project_id?: string | null
          stage_id?: string | null
          task: string
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          deadline?: string | null
          id?: string
          project_id?: string | null
          stage_id?: string | null
          task?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_tasks_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "project_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          archived: boolean | null
          category: string | null
          color: string | null
          cover_image: string | null
          cover_type: string | null
          created_at: string | null
          description: string | null
          description_extra: string | null
          end_date: string | null
          financial_goal: number | null
          financial_goal_set_by: string | null
          goal: string | null
          icon: string | null
          icon_type: string | null
          id: string
          name: string | null
          progress: number | null
          start_date: string | null
          status: string | null
          target_date: string | null
          title: string
          type: string | null
          updated_at: string | null
          user_id: string | null
          view_preference: string | null
        }
        Insert: {
          archived?: boolean | null
          category?: string | null
          color?: string | null
          cover_image?: string | null
          cover_type?: string | null
          created_at?: string | null
          description?: string | null
          description_extra?: string | null
          end_date?: string | null
          financial_goal?: number | null
          financial_goal_set_by?: string | null
          goal?: string | null
          icon?: string | null
          icon_type?: string | null
          id?: string
          name?: string | null
          progress?: number | null
          start_date?: string | null
          status?: string | null
          target_date?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          view_preference?: string | null
        }
        Update: {
          archived?: boolean | null
          category?: string | null
          color?: string | null
          cover_image?: string | null
          cover_type?: string | null
          created_at?: string | null
          description?: string | null
          description_extra?: string | null
          end_date?: string | null
          financial_goal?: number | null
          financial_goal_set_by?: string | null
          goal?: string | null
          icon?: string | null
          icon_type?: string | null
          id?: string
          name?: string | null
          progress?: number | null
          start_date?: string | null
          status?: string | null
          target_date?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          view_preference?: string | null
        }
        Relationships: []
      }
      quick_todos: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          source: string | null
          source_id: string | null
          task: string
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          source?: string | null
          source_id?: string | null
          task: string
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          source?: string | null
          source_id?: string | null
          task?: string
          user_id?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          file_url: string | null
          id: string
          published: boolean | null
          resource_type: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          published?: boolean | null
          resource_type?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          published?: boolean | null
          resource_type?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      studio_goals: {
        Row: {
          category: string | null
          created_at: string | null
          deadline: string | null
          id: string
          progress: number | null
          title: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          deadline?: string | null
          id?: string
          progress?: number | null
          title: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          deadline?: string | null
          id?: string
          progress?: number | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      studio_profile: {
        Row: {
          ai_insights: string | null
          ai_summary: string | null
          avatar_url: string | null
          avg_engagement: number | null
          bio: string | null
          brand_name: string | null
          business_license: string | null
          combined_followers: number | null
          combined_reach: number | null
          created_at: string | null
          ein: string | null
          ein_number: string | null
          handle: string | null
          id: string
          images: Json | null
          instagram_connected: boolean | null
          instagram_engagement: number | null
          instagram_followers: number | null
          instagram_handle: string | null
          instagram_post_count: number | null
          instagram_posts: number | null
          instagram_reach: number | null
          instagram_synced_at: string | null
          instagram_url: string | null
          interactions_30d: number | null
          linkedin_url: string | null
          llc_document: string | null
          monthly_goal_instagram: number | null
          monthly_goal_tiktok: number | null
          monthly_goal_youtube: number | null
          photos: Json | null
          pitch_deck: string | null
          platform_urls: Json | null
          podcast_downloads: number | null
          podcast_name: string | null
          podcast_url: string | null
          reach_30d: number | null
          studio_name: string | null
          substack_subscriber_count: number | null
          substack_url: string | null
          tiktok_connected: boolean | null
          tiktok_followers: number | null
          tiktok_handle: string | null
          tiktok_synced_at: string | null
          tiktok_total_likes: number | null
          tiktok_url: string | null
          total_followers: number | null
          twitter_connected: boolean | null
          twitter_followers: number | null
          twitter_handle: string | null
          twitter_handle_url: string | null
          twitter_synced_at: string | null
          twitter_url: string | null
          updated_at: string | null
          user_id: string
          youtube_channel_id: string | null
          youtube_connected: boolean | null
          youtube_handle: string | null
          youtube_recent_videos: Json | null
          youtube_subscribers: number | null
          youtube_synced_at: string | null
          youtube_total_views: number | null
          youtube_url: string | null
          youtube_video_count: number | null
        }
        Insert: {
          ai_insights?: string | null
          ai_summary?: string | null
          avatar_url?: string | null
          avg_engagement?: number | null
          bio?: string | null
          brand_name?: string | null
          business_license?: string | null
          combined_followers?: number | null
          combined_reach?: number | null
          created_at?: string | null
          ein?: string | null
          ein_number?: string | null
          handle?: string | null
          id?: string
          images?: Json | null
          instagram_connected?: boolean | null
          instagram_engagement?: number | null
          instagram_followers?: number | null
          instagram_handle?: string | null
          instagram_post_count?: number | null
          instagram_posts?: number | null
          instagram_reach?: number | null
          instagram_synced_at?: string | null
          instagram_url?: string | null
          interactions_30d?: number | null
          linkedin_url?: string | null
          llc_document?: string | null
          monthly_goal_instagram?: number | null
          monthly_goal_tiktok?: number | null
          monthly_goal_youtube?: number | null
          photos?: Json | null
          pitch_deck?: string | null
          platform_urls?: Json | null
          podcast_downloads?: number | null
          podcast_name?: string | null
          podcast_url?: string | null
          reach_30d?: number | null
          studio_name?: string | null
          substack_subscriber_count?: number | null
          substack_url?: string | null
          tiktok_connected?: boolean | null
          tiktok_followers?: number | null
          tiktok_handle?: string | null
          tiktok_synced_at?: string | null
          tiktok_total_likes?: number | null
          tiktok_url?: string | null
          total_followers?: number | null
          twitter_connected?: boolean | null
          twitter_followers?: number | null
          twitter_handle?: string | null
          twitter_handle_url?: string | null
          twitter_synced_at?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          user_id: string
          youtube_channel_id?: string | null
          youtube_connected?: boolean | null
          youtube_handle?: string | null
          youtube_recent_videos?: Json | null
          youtube_subscribers?: number | null
          youtube_synced_at?: string | null
          youtube_total_views?: number | null
          youtube_url?: string | null
          youtube_video_count?: number | null
        }
        Update: {
          ai_insights?: string | null
          ai_summary?: string | null
          avatar_url?: string | null
          avg_engagement?: number | null
          bio?: string | null
          brand_name?: string | null
          business_license?: string | null
          combined_followers?: number | null
          combined_reach?: number | null
          created_at?: string | null
          ein?: string | null
          ein_number?: string | null
          handle?: string | null
          id?: string
          images?: Json | null
          instagram_connected?: boolean | null
          instagram_engagement?: number | null
          instagram_followers?: number | null
          instagram_handle?: string | null
          instagram_post_count?: number | null
          instagram_posts?: number | null
          instagram_reach?: number | null
          instagram_synced_at?: string | null
          instagram_url?: string | null
          interactions_30d?: number | null
          linkedin_url?: string | null
          llc_document?: string | null
          monthly_goal_instagram?: number | null
          monthly_goal_tiktok?: number | null
          monthly_goal_youtube?: number | null
          photos?: Json | null
          pitch_deck?: string | null
          platform_urls?: Json | null
          podcast_downloads?: number | null
          podcast_name?: string | null
          podcast_url?: string | null
          reach_30d?: number | null
          studio_name?: string | null
          substack_subscriber_count?: number | null
          substack_url?: string | null
          tiktok_connected?: boolean | null
          tiktok_followers?: number | null
          tiktok_handle?: string | null
          tiktok_synced_at?: string | null
          tiktok_total_likes?: number | null
          tiktok_url?: string | null
          total_followers?: number | null
          twitter_connected?: boolean | null
          twitter_followers?: number | null
          twitter_handle?: string | null
          twitter_handle_url?: string | null
          twitter_synced_at?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          user_id?: string
          youtube_channel_id?: string | null
          youtube_connected?: boolean | null
          youtube_handle?: string | null
          youtube_recent_videos?: Json | null
          youtube_subscribers?: number | null
          youtube_synced_at?: string | null
          youtube_total_views?: number | null
          youtube_url?: string | null
          youtube_video_count?: number | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          position: number | null
          project_id: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          position?: number | null
          project_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          position?: number | null
          project_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_receipts: {
        Row: {
          amount: number | null
          category: string | null
          created_at: string | null
          deductible: boolean | null
          description: string | null
          id: string
          notes: string | null
          receipt_date: string | null
          receipt_image_url: string | null
          subcategory: string | null
          tax_year: number
          updated_at: string | null
          user_id: string | null
          vendor: string | null
        }
        Insert: {
          amount?: number | null
          category?: string | null
          created_at?: string | null
          deductible?: boolean | null
          description?: string | null
          id?: string
          notes?: string | null
          receipt_date?: string | null
          receipt_image_url?: string | null
          subcategory?: string | null
          tax_year: number
          updated_at?: string | null
          user_id?: string | null
          vendor?: string | null
        }
        Update: {
          amount?: number | null
          category?: string | null
          created_at?: string | null
          deductible?: boolean | null
          description?: string | null
          id?: string
          notes?: string | null
          receipt_date?: string | null
          receipt_image_url?: string | null
          subcategory?: string | null
          tax_year?: number
          updated_at?: string | null
          user_id?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          completed: boolean | null
          created_at: string | null
          due_date: string | null
          id: string
          source: string | null
          source_id: string | null
          task: string
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          source?: string | null
          source_id?: string | null
          task: string
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          source?: string | null
          source_id?: string | null
          task?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_finances: {
        Row: {
          created_at: string | null
          credit_score: number | null
          emergency_fund: number | null
          financial_setup_completed: boolean | null
          general_savings: number | null
          id: string
          investments: number | null
          monthly_income: number | null
          net_worth: number | null
          savings_goal_annual: number | null
          savings_rate: number | null
          total_debt: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credit_score?: number | null
          emergency_fund?: number | null
          financial_setup_completed?: boolean | null
          general_savings?: number | null
          id?: string
          investments?: number | null
          monthly_income?: number | null
          net_worth?: number | null
          savings_goal_annual?: number | null
          savings_rate?: number | null
          total_debt?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credit_score?: number | null
          emergency_fund?: number | null
          financial_setup_completed?: boolean | null
          general_savings?: number | null
          id?: string
          investments?: number | null
          monthly_income?: number | null
          net_worth?: number | null
          savings_goal_annual?: number | null
          savings_rate?: number | null
          total_debt?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          accent_color: string | null
          annual_start_date: string | null
          billing_cycle: string | null
          created_at: string | null
          dark_mode: boolean | null
          dashboard_cover: string | null
          dashboard_cover_type: string | null
          founding_member_since: string | null
          id: string
          is_subscribed: boolean | null
          notification_settings: Json | null
          onboarding_completed: boolean | null
          onboarding_completed_at: string | null
          plan_tier: string | null
          preferred_broker: string | null
          religion: string | null
          secondary_color: string | null
          show_daily_scripture: boolean | null
          student_email: string | null
          student_verified: boolean | null
          studio_unlocked: boolean | null
          subscription_type: string | null
          substack_email: string | null
          templates_unlocked: boolean | null
          theme: string | null
          theme_color: string | null
          updated_at: string | null
          user_id: string
          welcome_video_dismissed: boolean | null
          welcome_video_url: string | null
          welcome_video_watched: boolean | null
          widget_order: Json | null
          widget_order_left: Json | null
          widget_order_right: Json | null
        }
        Insert: {
          accent_color?: string | null
          annual_start_date?: string | null
          billing_cycle?: string | null
          created_at?: string | null
          dark_mode?: boolean | null
          dashboard_cover?: string | null
          dashboard_cover_type?: string | null
          founding_member_since?: string | null
          id?: string
          is_subscribed?: boolean | null
          notification_settings?: Json | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
          plan_tier?: string | null
          preferred_broker?: string | null
          religion?: string | null
          secondary_color?: string | null
          show_daily_scripture?: boolean | null
          student_email?: string | null
          student_verified?: boolean | null
          studio_unlocked?: boolean | null
          subscription_type?: string | null
          substack_email?: string | null
          templates_unlocked?: boolean | null
          theme?: string | null
          theme_color?: string | null
          updated_at?: string | null
          user_id: string
          welcome_video_dismissed?: boolean | null
          welcome_video_url?: string | null
          welcome_video_watched?: boolean | null
          widget_order?: Json | null
          widget_order_left?: Json | null
          widget_order_right?: Json | null
        }
        Update: {
          accent_color?: string | null
          annual_start_date?: string | null
          billing_cycle?: string | null
          created_at?: string | null
          dark_mode?: boolean | null
          dashboard_cover?: string | null
          dashboard_cover_type?: string | null
          founding_member_since?: string | null
          id?: string
          is_subscribed?: boolean | null
          notification_settings?: Json | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
          plan_tier?: string | null
          preferred_broker?: string | null
          religion?: string | null
          secondary_color?: string | null
          show_daily_scripture?: boolean | null
          student_email?: string | null
          student_verified?: boolean | null
          studio_unlocked?: boolean | null
          subscription_type?: string | null
          substack_email?: string | null
          templates_unlocked?: boolean | null
          theme?: string | null
          theme_color?: string | null
          updated_at?: string | null
          user_id?: string
          welcome_video_dismissed?: boolean | null
          welcome_video_url?: string | null
          welcome_video_watched?: boolean | null
          widget_order?: Json | null
          widget_order_left?: Json | null
          widget_order_right?: Json | null
        }
        Relationships: []
      }
      watchlist: {
        Row: {
          created_at: string | null
          display_name: string | null
          exchange: string | null
          id: string
          symbol: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          exchange?: string | null
          id?: string
          symbol: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          exchange?: string | null
          id?: string
          symbol?: string
          user_id?: string | null
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
