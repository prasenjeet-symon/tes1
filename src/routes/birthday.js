async function birthdayRoutes(fastify, options) {
  fastify.get('/birthday/:name', async (request, reply) => {
    const { name } = request.params;

    if (!name || name.trim() === '') {
      reply.code(400);
      return { error: 'Name is required' };
    }

    return { message: `🎂 Happy Birthday, ${name}! Have a wonderful day!` };
  });
}

module.exports = birthdayRoutes;
