const authModel = require('../models/authModel');

class AuthController {
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

    async login(req, res) {
        try {
            const { username, password } = req.body; 
            const result = await authModel.login(username, password);
            if (result.rows.length === 0) {
                console.log('sai tên đăng nhập hoặc mật khẩu');
                return res.redirect('/?auth=login&status=fail');
            } else{
                const user = result.rows[0]
                if (user.role === 'admin') {
                    console.log('admin đăng nhập thành công')
                    return res.redirect('/admin/products')
                } else {
                    console.log(`${username} đăng nhập thành công`)
                    return res.redirect('/')
                }
            } 
        } catch (error) {
            console.error('đăng nhập thất bại', error);
            return res.status(500).send('Đăng nhập thất bại');
        }
    }
}

module.exports = new AuthController();
