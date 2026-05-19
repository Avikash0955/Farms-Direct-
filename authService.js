const User = require('../models/User');
const { PROFILE_UPLOAD, USER_ROLES } = require('../constants/appConstants');

const hasGoogleCredentials = () => {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
};

const validateSignupInput = ({ name, email, password, confirmPassword }) => {
  if (!name || !email || !password || !confirmPassword) {
    return 'Please fill all required fields.';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }

  return null;
};

const createLocalUser = async (body, file) => {
  const { name, email, password, role, phone, address } = body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('An account already exists with this email.');
  }

  return User.create({
    name,
    email,
    password,
    role: role === USER_ROLES.FARMER ? USER_ROLES.FARMER : USER_ROLES.CUSTOMER,
    phone,
    address,
    profilePic: file ? `${PROFILE_UPLOAD.publicPath}/${file.filename}` : ''
  });
};

const authenticateLocalUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Please enter your email and password.');
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid email or password.');
  }

  return user;
};

module.exports = {
  hasGoogleCredentials,
  validateSignupInput,
  createLocalUser,
  authenticateLocalUser
};
