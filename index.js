const authRoutes = require('./authRoutes');
const orderRoutes = require('./orderRoutes');
const pageRoutes = require('./pageRoutes');
const productRoutes = require('./productRoutes');

const mountRoutes = (app) => {
  app.use('/', pageRoutes);
  app.use('/auth', authRoutes);
  app.use('/products', productRoutes);
  app.use('/orders', orderRoutes);
};

module.exports = mountRoutes;
