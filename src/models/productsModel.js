const supabase = require('../config/supabase');

const ProductModel = {
    async create(data) {
        const { data: result, error } = await supabase
            .from('products')
            .insert([{
                name: data.name,
                price: data.price,
                image: data.image,
                description: data.description,
                brand: data.brand,
                inventory: data.inventory,
            }])
            .select()
            .single();
        if (error) throw error;
        return { rows: [result] };
    },

    async findById(id) {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return { rows: data ? [data] : [] };
    },

    async deleteById(id) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return { rows: [] };
    },

    async getAll() {
        const { data, error } = await supabase
            .from('products')
            .select('id, name, price, image, inventory')
            .order('id', { ascending: true });
        if (error) throw error;
        return { rows: data };
    },

    async update(id, data) {
        const { data: result, error } = await supabase
            .from('products')
            .update({
                name: data.name,
                price: data.price,
                brand: data.brand,
                description: data.description,
                inventory: data.inventory,
                image: data.image,
            })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return { rows: [result] };
    },

    async getTrendingSofas(limit = 10) {
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
            .eq('product_categories.categories.slug', 'sofas')
            .order('inventory', { ascending: false })
            .limit(limit);
        if (error) throw error;
        return { rows: data.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
        })) };
    },
};

module.exports = ProductModel;
