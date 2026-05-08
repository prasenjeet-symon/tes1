async function rootRoutes(fastify, options) {
  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: 'object',
          required: ['hello'],
          additionalProperties: false,
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
          additionalProperties: false,
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
          required: ['ping'],
          additionalProperties: false,
          properties: {
            ping: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    return { ping: 'pong' };
  });
}

module.exports = rootRoutes;
