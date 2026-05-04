const fastify = require('fastify');
const helmet = require('@fastify/helmet');
const rootRoutes = require('./routes/root');
const birthdayRoutes = require('./routes/birthday');

function buildApp(opts = {}) {
  const app = fastify(opts);

  app.register(helmet);
  app.register(rootRoutes);
  app.register(birthdayRoutes);

  return app;
}

module.exports = { buildApp };
