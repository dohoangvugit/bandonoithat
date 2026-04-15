// src/models/cartModel.js
const supabase = require('../config/supabase');

const cartModel = {
    async getOrCreateCart(userId) {
        let { data: cart, error } = await supabase
            .from('carts')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (!cart) {
            const { data, error: insertError } = await supabase
                .from('carts')
                .insert([{ user_id: userId }])
                .select()
                .single();
            if (insertError) throw insertError;
            cart = data;
        }
        return cart;
    },

    async getCartItems(cartId) {
        const { data, error } = await supabase
            .from('cart_items')
            .select(
                `
        id,
        quantity,
        products(id, name, price, image)
      `,
            )
            .eq('cart_id', cartId);
        if (error) throw error;
        return data;
    },

    async addItem(cartId, productId, quantity) {
        const { data: existingItem, error: checkError } = await supabase
            .from('cart_items')
            .select('*')
            .eq('cart_id', cartId)
            .eq('product_id', productId)
            .single();

        if (checkError && checkError.code !== 'PGRST116') throw checkError;

        if (existingItem) {
            const { data, error } = await supabase
                .from('cart_items')
                .update({ quantity: existingItem.quantity + quantity })
                .eq('id', existingItem.id)
                .select()
                .single();
            if (error) throw error;
            return data;
        } else {
            const { data, error } = await supabase
                .from('cart_items')
                .insert([{ cart_id: cartId, product_id: productId, quantity }])
                .select()
                .single();
            if (error) throw error;
            return data;
        }
    },

    async updateQuantity(cartId, productId, quantity) {
        const { data, error } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('cart_id', cartId)
            .eq('product_id', productId)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async removeItem(cartId, productId) {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('cart_id', cartId)
            .eq('product_id', productId);
        if (error) throw error;
    },

    async clearCart(cartId) {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('cart_id', cartId);
        if (error) throw error;
    },
};

module.exports = cartModel;
