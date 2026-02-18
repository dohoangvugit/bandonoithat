const supabase = require('../config/supabase');

const cartModel = {
    // Lấy giỏ hàng theo cartId
    async getById(cartId) {
        const { data, error } = await supabase
            .from('cart_items')
            .select(
                `
        quantity,
        products(id, name, price, image)
      `,
            )
            .eq('cart_id', cartId);

        if (error) throw error;
        return data;
    },

    // Thêm sản phẩm vào cart
    async addItem(cartId, productId, quantity = 1) {
        const { data, error } = await supabase.from('cart_items').upsert(
            {
                cart_id: cartId,
                product_id: productId,
                quantity,
            },
            { onConflict: ['cart_id', 'product_id'] },
        );

        if (error) throw error;
        return data;
    },

    // Update quantity
    async updateQuantity(cartId, productId, quantity) {
        const { data, error } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('cart_id', cartId)
            .eq('product_id', productId);

        if (error) throw error;
        return data;
    },

    // Remove item
    async removeItem(cartId, productId) {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('cart_id', cartId)
            .eq('product_id', productId);

        if (error) throw error;
    },
};

module.exports = cartModel;
