import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = `https://jldptczaxybijbhlcbjj.supabase.co`;

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZHB0Y3pheHliaWpiaGxjYmpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MTkwMzIsImV4cCI6MjAzMTA5NTAzMn0.ZIN8Uzq3Rhwwi7K0jrrUfIJNIVccCjD3bMXXkiNql-g";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

// export const serviceRoleKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZHB0Y3pheHliaWpiaGxjYmpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTUxOTAzMiwiZXhwIjoyMDMxMDk1MDMyfQ.riwd24bYKRy160eqPRtr_ZJijvwh5E3GbiAcnWC_Qbw";
// export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
//"Project Url": /https://jldptczaxybijbhlcbjj.supabase.co/
//"new moeosama1 database key"  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZHB0Y3pheHliaWpiaGxjYmpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MTkwMzIsImV4cCI6MjAzMTA5NTAzMn0.ZIN8Uzq3Rhwwi7K0jrrUfIJNIVccCjD3bMXXkiNql-g
// const oldProjectUrl = `https://ixzmsptjfugshygjmvmh.supabase.co`;
// const oldKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4em1zcHRqZnVnc2h5Z2ptdm1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5NzgyNjAsImV4cCI6MjAyNzU1NDI2MH0.FMgl-kBBCJiTLrd3AmDl0_MAT7FN_qN_UQcXCGI04a0";
