const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
);

// Log connection status
if (process.env.NODE_ENV !== 'test') {
    console.log('✅ Supabase SDK initialized');
}

module.exports = supabase;
