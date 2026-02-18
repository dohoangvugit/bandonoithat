const supabase = require('../config/supabase');

const cartModel = {

    // GET OR CREATE CART
    async getOrCreateCart(userId) {
        let { data: cart } = await supabase
            .from('carts')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (!cart) {
            const { data, error } = await supabase
                .from('carts')
                .insert({ user_id: userId })
                .select()
                .single();

            if (error) throw error;
            cart = data;
        }

        return cart;
    },

    // GET CART ITEMS
    async getCartItems(cartId) {
        const { data, error } = await supabase
            .from('cart_items')
            .select(`
                id,
                quantity,
                products(id, name, price, image)
            `)
            .eq('cart_id', cartId);

        if (error) throw error;
        return data;
    },

    // ADD OR UPDATE ITEM
    async addItem(cartId, productId, quantity) {
        const { error } = await supabase
            .from('cart_items')
            .upsert({
                cart_id: cartId,
                product_id: productId,
                quantity
            }, {
                onConflict: ['cart_id', 'product_id']
            });

        if (error) throw error;
    },

    async updateQuantity(cartId, productId, quantity) {
        const { error } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('cart_id', cartId)
            .eq('product_id', productId);

        if (error) throw error;
    },

    async removeItem(cartId, productId) {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('cart_id', cartId)
            .eq('product_id', productId);

        if (error) throw error;
    }
};

module.exports = cartModel;
