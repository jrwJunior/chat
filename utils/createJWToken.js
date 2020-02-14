import jwt from 'jsonwebtoken';

export default user => {
  const token = jwt.sign({
    _id: user._id
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '7d',
    algorithm: "HS256"
  });

  return token;
}