// backend/middleware/auth.js
// Admin ve moderatör oturum kontrolü

const requireAdmin = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Giriş yapılmamış.' });
  }
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Yetersiz yetki. Admin gerekli.' });
  }
  next();
};

const requireMod = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Giriş yapılmamış.' });
  }
  const allowed = ['admin', 'moderator'];
  if (!allowed.includes(req.session.user.role)) {
    return res.status(403).json({ error: 'Yetersiz yetki.' });
  }
  next();
};

const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Giriş yapılmamış.' });
  }
  next();
};

module.exports = { requireAdmin, requireMod, requireAuth };
