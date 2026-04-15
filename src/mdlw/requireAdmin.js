function requireAdmin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/?auth=login');
    }

    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access Denied - Admin only');
    }

    req.user = req.session.user;
    next();
}

module.exports = requireAdmin;
