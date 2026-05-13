const fastify = require('fastify');
const rootRoutes = require('./routes/root');
const birthdayRoutes = require('./routes/birthday');
const ageRoutes = require('./routes/age');

function buildApp(opts = {}) {
  const app = fastify(opts);

  app.register(rootRoutes);
  app.register(birthdayRoutes);
  app.register(ageRoutes);

  return app;
}

module.exports = { buildApp };
