import { hashPassword } from '../../utils/hasher';
import prisma from '../../utils/prisma';
import { type CreateUserInput } from './user.schema';

export async function createUser(input: CreateUserInput) {
    const { password, ...rest } = input;

    const { hash, salt } = hashPassword(password);

    const user = await prisma.user.create({
        data: {
            ...rest,
            password: hash,
            salt,
        },
    });

    return user;
}

export async function findUser(usernameOrEmail: string) {
    let user = await prisma.user.findUnique({
        where: {
            username: usernameOrEmail,
        },
    });

    if (!user) {
        user = await prisma.user.findUnique({
            where: {
                email: usernameOrEmail,
            },
        });
    }

    return user;
}

export async function findUsers() {
    return prisma.user.findMany({
        select: {
            email: true,
            username: true,
            id: true,
        },
    });
}
