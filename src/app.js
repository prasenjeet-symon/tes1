const fastify = require('fastify');
const rootRoutes = require('./routes/root');
const birthdayRoutes = require('./routes/birthday');
const diwaliRoutes = require('./routes/diwali');

function buildApp(opts = {}) {
  const app = fastify(opts);

  app.register(rootRoutes);
  app.register(birthdayRoutes);
  app.register(diwaliRoutes);

  return app;
}

module.exports = { buildApp };
