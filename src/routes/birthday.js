async function birthdayRoutes(fastify, options) {
  fastify.get('/birthday/:name', {
    schema: {
      params: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            pattern: '^[\\p{L}\\s\\-]+$'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          required: ['message'],
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
