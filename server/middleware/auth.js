const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    
    console.log('Authenticated user:', req.user); // Debug log
    next();
  } catch (err) {
    console.error('Auth middleware error:', err); // Debug log
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 