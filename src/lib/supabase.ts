import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type EnquiryStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  wedding_date: string | null;
  city: string | null;
  service: string | null;
  budget: string | null;
  guests: number | null;
  message: string | null;
  source: string;
  status: EnquiryStatus;
  created_at: string;
};

export type EnquiryInput = {
  name: string;
  email: string;
  phone?: string;
  wedding_date?: string;
  city?: string;
  service?: string;
  budget?: string;
  guests?: number;
  message: string;
  source?: string;
};
