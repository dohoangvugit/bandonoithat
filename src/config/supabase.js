const { createClient } = require('@supabase/supabase-js');
const key =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmZXRobm50enNuemRsZG1qa25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTI0NjAsImV4cCI6MjA4NTg2ODQ2MH0.LfhOYHmaC-Wz72d1cW34jBxicjrljGc6Ci2Km2QHmDc';
const url = 'https://dfethnntzsnzdldmjkne.supabase.co';

const supabase = createClient(url, key);

// async function test() {
//   const { data, error } = await supabase.from('products').select('*').limit(1)

//   if (error) {
//     console.log("❌ ERROR:", error)
//   } else {
//     console.log("✅ CONNECT OK:", data)
//   }
// }

// test()

module.exports = supabase;
