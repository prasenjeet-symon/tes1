async function diwaliRoutes(fastify, options) {
  fastify.get('/diwali/:name', {
    schema: {
      params: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            pattern: '^[a-zA-Z]+$'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          required: ['message'],
          properties: {
            message: { type: 'string' }
          },
          additionalProperties: false
        }
      }
    }
  }, async (request, reply) => {
    const { name } = request.params;

    return { message: `🪔 Happy Diwali, ${name}! Wishing you a festival of lights!` };
  });
}

module.exports = diwaliRoutes;
