const fastify = require('fastify');
const rootRoutes = require('./routes/root');
const birthdayRoutes = require('./routes/birthday');
const christmasRoutes = require('./routes/christmas');

function buildApp(opts = {}) {
  const app = fastify(opts);

  app.register(rootRoutes);
  app.register(birthdayRoutes);
  app.register(christmasRoutes);

  return app;
}

module.exports = { buildApp };
