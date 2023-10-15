import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const createUserSchema = z.object({
    email: z
        .string({
            required_error: 'Email  is required',
            invalid_type_error: 'Email must be a string',
        })
        .email(),
    username: z
        .string()
        .min(3, 'Username should have atleast 3 charecters')
        .max(15, 'Username should not have more than 15 charecters'),
    password: z.string({
        required_error: 'Password  is required',
        invalid_type_error: 'Password must be a string',
    }),
});

const createUserResponseSchema = z.object({
    id: z.number(),
    email: z
        .string({
            required_error: 'Email  is required',
            invalid_type_error: 'Email must be a string',
        })
        .email(),
    username: z.string(),
});

const loginUserSchema = z.object({
    usernameOrEmail: z.string({
        required_error: 'Username or email are required',
    }),
    password: z.string(),
});

const loginUserResponseSchema = z.object({
    accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginUserSchema,
    loginUserResponseSchema,
});
