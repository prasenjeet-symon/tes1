async function birthdayRoutes(fastify, options) {
  fastify.get('/birthday/:name', {
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

    return { message: `🎂 Happy Birthday, ${name}! Have a wonderful day!` };
  });
}

module.exports = birthdayRoutes;
