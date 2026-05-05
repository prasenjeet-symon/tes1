const { buildApp } = require('./app');

const app = buildApp({
  logger: true
});

const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || '0.0.0.0';
    await app.listen({ port, host });
  } catch (err) {
    app.log.error(err);
    await app.close();
    process.exit(1);
  }
};

let isShuttingDown = false;
const shutdown = async (signal) => {
  if (isShuttingDown) return;
  isShuttingDown = true;
  app.log.info(`${signal} received, shutting down gracefully...`);
  try {
    await app.close();
    process.exit(0);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  app.log.fatal(reason, 'Unhandled Rejection');
  process.exit(1);
});

start();
