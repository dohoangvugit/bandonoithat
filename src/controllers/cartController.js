const cartModel = require('../models/cartModel');

class CartController {
    // GET /cart/:id
    async getCart(req, res) {
        try {
            const cartId = req.params.id;
            const cart = await cartModel.getById(cartId);

            res.json({
                success: true,
                cart,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Get cart failed' });
        }
    }

    // POST /cart/add
    async addToCart(req, res) {
        try {
            const { cartId, productId, quantity } = req.body;

            await cartModel.addItem(cartId, productId, quantity);

            res.json({ success: true, message: 'Added to cart' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Add cart failed' });
        }
    }

    // PUT /cart/update
    async updateCart(req, res) {
        try {
            const { cartId, productId, quantity } = req.body;

            await cartModel.updateQuantity(cartId, productId, quantity);

            res.json({ success: true, message: 'Updated quantity' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Update failed' });
        }
    }

    // DELETE /cart/remove
    async removeFromCart(req, res) {
        try {
            const { cartId, productId } = req.body;

            await cartModel.removeItem(cartId, productId);

            res.json({ success: true, message: 'Removed from cart' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Remove failed' });
        }
    }
}

module.exports = new CartController();
