import { createUser, findUser, findUsers } from './user.service';

import { type FastifyReply, type FastifyRequest } from 'fastify';
import { LoginUserInput, type CreateUserInput } from './user.schema';
import { verifyPassword } from '../../utils/hasher';

import { server } from '../../app';

export async function registerUserHandler(
    request: FastifyRequest<{
        Body: CreateUserInput;
    }>,
    reply: FastifyReply,
) {
    const body = request.body;

    try {
        const user = await createUser(body);

        return reply.code(201).send(user);
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}

export async function loginUserHandler(
    request: FastifyRequest<{
        Body: LoginUserInput;
    }>,
    reply: FastifyReply,
) {
    const { body } = request;

    const user = await findUser(body.usernameOrEmail);

    if (!user) {
        return reply.code(401).send({
            message: 'There is no such user',
        });
    }

    const correctPassword = verifyPassword(body.password, user.salt, user.password);

    if (correctPassword) {
        const { password, salt, ...rest } = user;

        return { accessToken: server.jwt.sign(rest) };
    }

    return reply.code(401).send({
        message: 'Incorrect password',
    });
}

export async function getUsersHandler() {
    const users = await findUsers();

    return users;
}
