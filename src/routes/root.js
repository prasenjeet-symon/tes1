async function rootRoutes(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
  });

  fastify.get('/health', async (request, reply) => {
    return { status: 'ok' };
  });

  fastify.get('/ping', async (request, reply) => {
    return { serverTime: new Date().toISOString() };
  });
}

module.exports = rootRoutes;
