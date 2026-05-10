async function rootRoutes(fastify, options) {
  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: 'object',
          required: ['hello'],
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    return { hello: 'world' };
  });

  fastify.get('/health', {
    schema: {
      response: {
        200: {
          type: 'object',
          required: ['status'],
          properties: {
            status: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    return { status: 'ok' };
  });

  fastify.get('/ping', {
    schema: {
      response: {
        200: {
          type: 'object',
          required: ['serverTime'],
          properties: {
            serverTime: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    return { serverTime: new Date().toISOString() };
  });
}

module.exports = rootRoutes;
