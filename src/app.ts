import express, { Express } from 'express';
import env from './env';

class Application {
    express: Express;

    constructor() {
        this.express = express();

        this.initialiseMiddleware();
        this.registerRoutes();
    }

    protected initialiseMiddleware() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
    }

    protected registerRoutes() {
        this.express.use('/', (req, res) => {
            return res.send({
                test: true
            });
        })
    }

    public serve() {
        this.express.listen(env.API_PORT || 5000, () => {
            console.log('Server running.');
        })
    }
}

export default new Application();