async function ageRoutes(fastify, options) {
  fastify.get('/age', {
    schema: {
      querystring: {
        type: 'object',
        required: ['birthdate'],
        properties: {
          birthdate: {
            type: 'string',
            format: 'date'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          required: ['age'],
          properties: {
            age: {
              type: 'integer',
              minimum: 0
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { birthdate } = request.query;
    const birthDateObj = new Date(birthdate);
    const today = new Date();

    // Validate: birthdate cannot be in the future
    if (birthDateObj > today) {
      return reply.code(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Birthdate cannot be in the future'
      });
    }

    // Calculate age
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return { age };
  });
}

module.exports = ageRoutes;