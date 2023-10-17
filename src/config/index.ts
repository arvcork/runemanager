import Ajv from 'ajv';
import envSchema from 'env-schema';

const schema = {
    type: 'object',
    required: [
        'NODE_ENV', 'PORT', 'DATABASE_URL', 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_PORT'
    ],
    properties: {
        NODE_ENV: {
            type: 'string',
            default: 'development'
        },
        PORT: {
            type: 'number',
            default: 3000
        },
        DATABASE_URL: {
            type: 'string'
        },
        DB_HOST: {
            type: 'string'
        },
        DB_USER: {
            type: 'string'
        },
        DB_PASSWORD: {
            type: 'string'
        },
        DB_PORT: {
            type: 'string'
        }
    }
}

export default (path: string): void => {
    const result = require('dotenv').config({ path });

    if (result.error) {
        throw Error(result.error);
    }

    const config = envSchema({
        schema,
        data: result.parsed,
        ajv: new Ajv({
            allErrors: true,
            removeAdditional: true,
            useDefaults: true,
            coerceTypes: true,
            allowUnionTypes: true
        })
    });

    console.log(config);
}