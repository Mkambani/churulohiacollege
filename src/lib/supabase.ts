import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lohiacollegesupabaseproxy.mkranashab331001.workers.dev/';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoeHNjcmppdWRvYXZtenF6aHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMTk1ODQsImV4cCI6MjA4OTU5NTU4NH0.kyhxnPjId_xGtqcTfMoK5hJYC8QWAiHXSkWR_Z50S_U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
