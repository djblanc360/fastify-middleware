import Fastify, { FastifyInstance} from "fastify";
import cors from '@fastify/cors';

// import setGlobalVariables from "./credentials";
// setGlobalVariables();

import { shopifyRoutes } from "./routes/shopify";
import { helloRoutes } from "./routes/test";

type Environment = 'development' | 'production' | 'test';



// https://fastify.dev/docs/latest/Reference/Logging/#usage
const envToLogger: Record<Environment, object | boolean> = {
    development: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
    production: true,
    test: false,
}

const currentEnv: Environment = (process.env.NODE_ENV as Environment) || 'development'

const app: FastifyInstance = Fastify({
    logger: envToLogger[currentEnv]
});
app.register(cors, {
    
});


// plugin can be a set of routes, a server decorator
// use fastify.register() method to activate plugins
app.register(shopifyRoutes, { prefix: '/customer'});
app.register(helloRoutes);

export default app;