function requireLoginApi(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not logged in' });
    }

    req.user = req.session.user;
    next();
}

module.exports = requireLoginApi;
