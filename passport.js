const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');
const { USER_ROLES } = require('../constants/appConstants');

const configurePassport = (passport) => {
  const hasGoogleCredentials = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  );

  if (!hasGoogleCredentials) {
    console.warn('Google OAuth is disabled until GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set.');
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

          if (!email) {
            return done(new Error('Google account email was not available.'), null);
          }

          let user = await User.findOne({
            $or: [{ googleId: profile.id }, { email }]
          });

          if (!user) {
            user = await User.create({
              name: profile.displayName || 'Google User',
              email,
              googleId: profile.id,
              authProvider: 'google',
              profilePic: profile.photos && profile.photos[0] ? profile.photos[0].value : '',
              role: USER_ROLES.CUSTOMER
            });
          } else if (!user.googleId) {
            user.googleId = profile.id;
            user.authProvider = user.authProvider === 'local' ? 'both' : user.authProvider;
            if (!user.profilePic && profile.photos && profile.photos[0]) {
              user.profilePic = profile.photos[0].value;
            }
            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
};

module.exports = configurePassport;
