async function christmasRoutes(fastify, options) {
  fastify.get('/christmas/:name', {
    schema: {
      params: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            pattern: '^[\\p{L}]+(?:[ \\-][\\p{L}]+)*$',
            maxLength: 50
          }
        }
      },
      response: {
        200: {
          type: 'object',
          required: ['message'],
          additionalProperties: false,
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { name } = request.params;

    return { message: '🎄 Merry Christmas, ' + name + '! Wishing you joy and peace!' };
  });
}

module.exports = christmasRoutes;