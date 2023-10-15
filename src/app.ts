import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import fjwt from '@fastify/jwt';
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';

export const server = Fastify();

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: any;
    }
}

server.register(fjwt, { secret: 'fidjhvlkfd58hsdjfh84h399423jds40902ffd' });

server.decorate('auth', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (e) {
        return reply.send(e);
    }
});

server.get('/healthcheck', async function (request, response) {
    return {
        status: 'OK',
    };
});

async function main() {
    for (const schema of userSchemas) {
        server.addSchema(schema);
    }

    server.register(userRoutes, { prefix: 'recipe-helper/users' });

    try {
        await server.listen({
            port: 3000,
            host: '0.0.0.0',
        });

        console.log(`Server ready at http://localhost:3000`);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main();
