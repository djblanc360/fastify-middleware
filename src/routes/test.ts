import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";

const opts: RouteShorthandOptions = {
    schema: {
        // request needs to have a querystring with a `name` parameter
        querystring: {
            type: 'object',
            properties: {
                name: { type: 'string' }
            },
            required: ['name'],
        },
        // the response needs to be an object with an `hello` property of type 'string'
        response: {
            200: {
                type: 'object',
                properties: {
                    hello: { type: 'string' }
                }
            }
        }
    }
}

export const helloRoutes = async (app: FastifyInstance) => {
    app.get('/hello', {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            return reply.code(201).send(`hello`)
        }
    })

    // https://fastify.dev/
    app.route({
        method: 'GET',
        url: '/complex',
        // expects route options directly within route definition, so unpack schema property
        ...opts,
       // this function is executed for every request before the handler is executed
        preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
            // E.g. check authentication
        },
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const { name } = request.query as { name: string }
            return { hello: name }
        }
    })
    
}