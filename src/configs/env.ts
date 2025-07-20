import 'dotenv/config';
import { z } from 'zod';
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    APP_PORT: z.coerce.number().default(3000),
    DATABASE_CLIENT: z.string().nonempty(),
    DB_HOST: z.string().nonempty(),
    DB_PORT: z.coerce.number().default(5432),
    DB_USER: z.string().nonempty(),
    DB_NAME: z.string().nonempty(),
    DB_PASSWORD: z.string().nonempty(),
    ACCESS_TOKEN_SECRET: z.string().nonempty(),
    REFRESH_TOKEN_SECRET: z.string().nonempty(),
    ACCESS_TOKEN_EXPIRATION: z.coerce.number().default(1000),
    REFRESH_TOKEN_EXPIRATION: z.coerce.number().default(3600),
});

export default envSchema.parse(process.env);