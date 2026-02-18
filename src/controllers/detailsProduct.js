class DetailsProductControllers {
    async details(req, res) {
        const { id } = req.params;

        const ANON_KEY =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmZXRobm50enNuemRsZG1qa25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTI0NjAsImV4cCI6MjA4NTg2ODQ2MH0.LfhOYHmaC-Wz72d1cW34jBxicjrljGc6Ci2Km2QHmDc';

        const response = await fetch(
            `https://dfethnntzsnzdldmjkne.supabase.co/rest/v1/products?id=eq.${id}`,
            {
                headers: {
                    apikey: ANON_KEY,
                    Authorization: `Bearer ${ANON_KEY}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        const data = await response.json();
        console.log('Supabase data:', data);

        const product = data[0];

        res.render('detail', {
            product,
        });
    }
}

module.exports = new DetailsProductControllers();
