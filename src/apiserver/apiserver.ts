import express from 'express';
import initConfig from '../config/config';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import chalk from 'chalk';
import Database from '../db/db';

// /requests – список запросов
// /requests/id – вывод 1 запроса
// /repeat/id – повторная отправка запроса
// /scan/id – сканирование запроса

class ApiServer {
    private port: string;
    private server = express();

    private limit: RateLimitRequestHandler;

    /**
   * @constructor
   */
    constructor(configPath: string, db: Database) {
        const config = initConfig(configPath, 'api');
        this.port = config.port;
        this.limit = rateLimit({
            windowMs: config.requests.timeout,
            max: config.requests.max,
        });
        this.server = express();
        this.server.use(this.limit);

        this.server.get(
            '/requests',
            (req: express.Request, res: express.Response) => {
                res.send(JSON.stringify(db.getRequests()));
            }
        );

        this.server.get(
            '/requests/:id',
            (req: express.Request, res: express.Response) => {
                res.send(JSON.stringify(db.getRequest(Number(req.params.id))));
            }
        );

        this.server.post(
            '/repeat/:id',
            (req: express.Request, res: express.Response) => {
                res.send(JSON.stringify(db.getRequest(Number(req.params.id))));
            }
        );

        this.server.get(
            '/scan/:id',
            (req: express.Request, res: express.Response) => {
                res.send('TODO!');
            }
        );
    }

    async run(): Promise<void> {
        this.server.listen(this.port, () => {
            console.log(
                chalk.green('[SUCCESS]'),
                `Web API is listening at port ${this.port}`
            );
        });
    }
}

export default ApiServer;
