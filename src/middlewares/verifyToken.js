import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const excludePaths = ['/api/login', '/api/register'];

  if (excludePaths.includes(req.path)) {
    return next();
  }

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      message: "Access Denied"
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).json({
      message: "Invalid Token"
    });
  }
}