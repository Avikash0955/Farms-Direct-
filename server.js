require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const passport = require('passport');

const connectDB = require('./src/config/db');
const configurePassport = require('./src/config/passport');
const { attachUser } = require('./src/middleware/auth');
const attachViewLocals = require('./src/middleware/viewLocals');
const mountRoutes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
configurePassport(passport);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'farmdirect_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);
app.use(flash());
app.use(passport.initialize());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(attachUser);
app.use(attachViewLocals);

mountRoutes(app);

app.use((req, res) => {
  res.status(404).render('pages/404', {
    title: 'Page Not Found'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  req.flash('error', err.message || 'Something went wrong. Please try again.');
  res.redirect(req.get('Referrer') || '/');
});

app.listen(PORT, () => {
  console.log(`FarmDirect is running at http://localhost:${PORT}`);
});
