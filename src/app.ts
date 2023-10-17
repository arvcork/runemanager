import 'reflect-metadata';
import path, { resolve } from 'path';
import pino from 'pino';
import configure from './config';
import fastify from 'fastify';
import { bootstrap } from 'fastify-decorators';

configure(path.join(__dirname, '..', '.env'));

export default () => {
    const app = fastify({
        logger: pino({ level: 'info' })
    });

    app.decorateRequest('player', null);

    app.register(bootstrap, {
        directory: resolve(__dirname, 'controllers'),
        mask: /\.controller\./
    })

    app.register(require('@fastify/cors'));
    app.register(require('@fastify/helmet'));

    return app;
}