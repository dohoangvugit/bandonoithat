class DetailsProductControllers {
    async details(req, res) {
        const { id } = req.params;

        const ANON_KEY = process.env.SUPABASE_ANON_KEY;


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
