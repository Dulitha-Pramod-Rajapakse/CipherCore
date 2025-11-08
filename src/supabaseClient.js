import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fuhlhdfhftkmuyqdsmtm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aGxoZGZoZnRrbXV5cWRzbXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MzI2NjMsImV4cCI6MjA3NzUwODY2M30.3PQRN-KfZNnMbjb8sqUogd4BeaXo4Tdvn1YzQ6jVMRk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
