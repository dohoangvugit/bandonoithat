const authModel = require('../models/authModel')

class AuthController {

    async register(req, res) {
        try {
            const { username, email, phone, password, role } = req.body

            const values = [
                username,
                email,
                phone,
                password,
                role || 'client'
            ]

            await authModel.register(values)

            return res.json({
                message: 'Register success'
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'Register failed'
            })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body

            const result = await authModel.login(username, password)

            if (result.rows.length === 0) {
                return res.status(401).json({
                    message: 'Invalid username or password'
                })
            }

            return res.json({
                message: 'Login success',
                user: result.rows[0]
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'Login failed'
            })
        }
    }
}

module.exports = new AuthController()
