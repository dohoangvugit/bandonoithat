const supabase = require('../../config/supabase');

class AdminUserController {
    // GET /admin/users - List all users
    async index(req, res) {
        try {
            const { data: users, error } = await supabase
                .from('users')
                .select('*')
                .order('id', { ascending: false });

            if (error) throw error;

            res.render('admin/users', {
                layout: 'admin',
                users: users || [],
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error loading users');
        }
    }

    // POST /admin/users/:id/change-role
    async changeRole(req, res) {
        try {
            const { id } = req.params;
            const { role } = req.body;

            if (!['user', 'admin'].includes(role)) {
                return res
                    .status(400)
                    .json({ success: false, error: 'Invalid role' });
            }

            const { data, error } = await supabase
                .from('users')
                .update({ role })
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

    // DELETE /admin/users/:id
    async delete(req, res) {
        try {
            const { id } = req.params;

            // Don't allow deleting yourself
            if (req.user.id === parseInt(id)) {
                return res.status(400).json({
                    success: false,
                    error: 'Không thể xóa tài khoản của chính mình',
                });
            }

            // Delete related carts
            const { data: carts } = await supabase
                .from('carts')
                .select('id')
                .eq('user_id', id);

            if (carts && carts.length > 0) {
                for (const cart of carts) {
                    await supabase
                        .from('cart_items')
                        .delete()
                        .eq('cart_id', cart.id);
                }
                await supabase.from('carts').delete().eq('user_id', id);
            }

            // Delete user
            const { error } = await supabase
                .from('users')
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

module.exports = new AdminUserController();
