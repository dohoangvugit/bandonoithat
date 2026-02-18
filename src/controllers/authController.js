const authModel = require('../models/authModel');

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await authModel.login(username, password);

            if (result.rows.length === 0) {
                return res.redirect('/?auth=login&status=fail');
            }

            const user = result.rows[0];

            // LƯU SESSION
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role,
            };

            if (user.role === 'admin') {
                return res.redirect('/admin/products');
            }

            return res.redirect('/');
        } catch (err) {
            console.error(err);
            return res.redirect('/?auth=login&status=fail');
        }
    }
    async register(req, res) {
        try {
            const { username, email, phone, password, role } = req.body;

            const values = [username, email, phone, password, role || 'client'];

            await authModel.register(values);
            console.log(' Đăng ký thành công:', {
                username,
                email,
                phone,
                role: role || 'client',
            });

            return res.redirect('/?auth=login&status=success');
        } catch (error) {
            console.error(' Lỗi đăng ký:', error);

            return res.redirect('/?auth=register&status=fail');
        }
    }
}

module.exports = new AuthController();
