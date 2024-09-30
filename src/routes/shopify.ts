import { FastifyInstance, FastifyReply, FastifyRequest, } from "fastify";

import { getShopifyCustomer, createShopifyCustomer } from "../controllers/shopify/customer";

export const shopifyRoutes = async (app: FastifyInstance) => {

    app.get('/', {
        schema: {
            // request needs to have a querystring with a `email` parameter
            querystring: {
                type: 'object',
                properties: {
                    email: { type: 'string' }
                },
                required: ['email'],
            },
        },
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const email = request.query as { email: string }
            return { hello: email}
        }
    })


    app.post('/', {
        preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
            // E.g. check authentication
        },
        handler: async (request: FastifyRequest<{
            // https://fastify.dev/docs/latest/Reference/TypeScript/#request
            Body: { 
                email: string,
                name: string 
            };
        }>, reply: FastifyReply) => {
            const body = request.body;

            console.log({body})

            return reply.code(201).send("user created")
        }
    })
}