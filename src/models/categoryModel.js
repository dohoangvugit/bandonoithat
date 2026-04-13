const supabase = require('../config/supabase');

const CategoryModel = {
    async getOverview() {
        // Get categories with product counts using aggregation
        const { data: categories, error } = await supabase
            .from('categories')
            .select(`
                id,
                name,
                slug,
                product_categories(count)
            `)
            .order('id')
            .limit(5);
        if (error) throw error;

        // Map the response to match expected format
        const result = categories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            total: cat.product_categories?.length || 0,
            image: null, // Image can be fetched separately if needed
        }));

        return { rows: result };
    },

    async getProductsBySlug(slug) {
        // Use RLS or direct query with relationship
        const { data, error } = await supabase
            .from('products')
            .select(`
                id,
                name,
                price,
                image,
                product_categories!inner(
                    categories!inner(slug)
                )
            `)
            .eq('product_categories.categories.slug', slug)
            .order('id', { ascending: false });
        if (error) throw error;
        
        return { rows: data.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
        })) };
    },
};

module.exports = CategoryModel;
