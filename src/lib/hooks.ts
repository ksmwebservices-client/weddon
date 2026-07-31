import { useState } from 'react';
import { supabase, type Enquiry, type EnquiryInput } from '@/lib/supabase';

export function useEnquiry() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function submit(input: EnquiryInput) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { error: err } = await supabase.from('enquiries').insert(input).select();
    if (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
    setSuccess(true);
    setLoading(false);
    return true;
  }

  function reset() {
    setError(null);
    setSuccess(false);
    setLoading(false);
  }

  return { submit, loading, error, success, reset };
}

export async function fetchEnquiries(): Promise<Enquiry[]> {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as Enquiry[]) ?? [];
}
