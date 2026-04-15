const supabase = require('../../config/supabase');

class AdminOrderController {
    // GET /admin/orders - List all orders
    async index(req, res) {
        try {
            const { data: orders, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Get user info for each order
            const ordersWithUsers = await Promise.all(
                orders.map(async (order) => {
                    const { data: user } = await supabase
                        .from('users')
                        .select('username')
                        .eq('id', order.user_id)
                        .single();
                    return {
                        ...order,
                        userName: user?.username || 'Unknown',
                    };
                })
            );

            res.render('admin/orders', {
                layout: 'admin',
                orders: ordersWithUsers,
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error loading orders');
        }
    }

    // GET /admin/orders/:id - Order detail
    async detail(req, res) {
        try {
            const { id } = req.params;

            const { data: order, error: orderError } = await supabase
                .from('orders')
                .select('*')
                .eq('id', id)
                .single();

            if (orderError) throw orderError;

            const { data: user } = await supabase
                .from('users')
                .select('username')
                .eq('id', order.user_id)
                .single();

            const { data: items, error: itemsError } = await supabase
                .from('order_items')
                .select('*, products(name)')
                .eq('order_id', id);

            if (itemsError) throw itemsError;

            const itemsWithNames = items.map((item) => ({
                ...item,
                product_name: item.products?.name || 'Unknown',
            }));

            res.render('admin/order-detail', {
                layout: 'admin',
                order,
                items: itemsWithNames,
                userName: user?.username || 'Unknown',
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error loading order detail');
        }
    }

    // POST /admin/orders/:id/update-status
    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const { data, error } = await supabase
                .from('orders')
                .update({ status })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            res.json({ success: true, data });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: err.message });
        }
    }

    // DELETE /admin/orders/:id
    async delete(req, res) {
        try {
            const { id } = req.params;

            // Delete order items first
            await supabase.from('order_items').delete().eq('order_id', id);

            // Delete order
            const { error } = await supabase
                .from('orders')
                .delete()
                .eq('id', id);

            if (error) throw error;

            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: err.message });
        }
    }
}

module.exports = new AdminOrderController();
