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
      .select(`
        id,
        quantity,
        products(id, name, price, image)
      `)
      .eq('cart_id', cartId);
    if (error) throw error;
    return data;
  }
};

module.exports = cartModel;
