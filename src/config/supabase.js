const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase.from('products').select('*').limit(1)

  if (error) {
    console.log("❌ ERROR:", error)
  } else {
    console.log("✅ CONNECT OK:", data)
  }
}

test()

module.exports = supabase;
