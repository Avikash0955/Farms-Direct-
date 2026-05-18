const passport = require('passport');

const {
  authenticateLocalUser,
  createLocalUser,
  hasGoogleCredentials,
  validateSignupInput
} = require('../services/authService');
const { clearAuthCookie, setAuthCookie, signToken } = require('../utils/jwt');

const signup = async (req, res) => {
  const validationError = validateSignupInput(req.body);

  if (validationError) {
    req.flash('error', validationError);
    return res.redirect('/signup');
  }

  try {
    const user = await createLocalUser(req.body, req.file);
    setAuthCookie(res, signToken(user));
    req.flash('success', `Welcome to FarmDirect, ${user.name}.`);
    return res.redirect('/dashboard');
  } catch (error) {
    req.flash('error', error.message);
    return res.redirect('/signup');
  }
};

const login = async (req, res) => {
  try {
    const user = await authenticateLocalUser(req.body);
    setAuthCookie(res, signToken(user));
    req.flash('success', `Welcome back, ${user.name}.`);
    return res.redirect('/dashboard');
  } catch (error) {
    req.flash('error', error.message);
    return res.redirect('/login');
  }
};

const ensureGoogleLoginReady = (req, res, next) => {
  if (!hasGoogleCredentials()) {
    req.flash('error', 'Google login is ready in code, but Google credentials are not set in .env.');
    return res.redirect('/login');
  }

  return next();
};

const startGoogleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
});

const finishGoogleLogin = passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
});

const googleLoginSuccess = (req, res) => {
  setAuthCookie(res, signToken(req.user));
  req.flash('success', `Logged in with Google as ${req.user.name}.`);
  res.redirect('/dashboard');
};

const logout = (req, res) => {
  clearAuthCookie(res);
  req.flash('success', 'You have been logged out.');
  res.redirect('/');
};

module.exports = {
  signup,
  login,
  ensureGoogleLoginReady,
  startGoogleLogin,
  finishGoogleLogin,
  googleLoginSuccess,
  logout
};
