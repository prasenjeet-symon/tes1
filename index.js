const { buildApp } = require('./src/app');

const fastify = buildApp({ logger: true });

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: process.env.HOST || '127.0.0.1' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

let shuttingDown = false;

const shutdown = async (signal) => {
  if (shuttingDown) return;
  shuttingDown = true;
  fastify.log.info(`${signal} received, shutting down gracefully...`);
  await fastify.close();
  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT').catch((err) => {
  fastify.log.error(err);
  process.exit(1);
}));
process.on('SIGTERM', () => shutdown('SIGTERM').catch((err) => {
  fastify.log.error(err);
  process.exit(1);
}));

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
