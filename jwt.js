const jwt = require('jsonwebtoken');

const JWT_COOKIE_NAME = 'farmdirect_token';
const JWT_EXPIRES_IN = '7d';

const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET || 'farmdirect_jwt_secret',
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const setAuthCookie = (res, token) => {
  res.cookie(JWT_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

const clearAuthCookie = (res) => {
  res.clearCookie(JWT_COOKIE_NAME);
};

module.exports = {
  JWT_COOKIE_NAME,
  signToken,
  setAuthCookie,
  clearAuthCookie
};
