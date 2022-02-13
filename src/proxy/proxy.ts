import http from 'http';
import initConfig from '../config/config';
import chalk from 'chalk';

class ProxyServer {
    private server: http.Server;
    private port: string;

    /**
   * @constructor
   */
    constructor(configPath: string) {
        this.server = http.createServer((req, res) => this.handle(req, res));
        this.port = initConfig(configPath, 'proxy').port;
    }

    private handle(req: http.IncomingMessage, res: http.ServerResponse): void {
        const headers = req.headers;
        delete headers['proxy-connection'];
        const options: http.RequestOptions = {
            host: req.headers.host,
            path: req.url!.replace(/^(?:\/\/|[^/]+)*\//, '/'),
            method: req.method,
            headers,
        };
        const answer = http.request(options, (request: http.IncomingMessage) => {
            if (!request.statusCode) {
                throw new Error('Incorrect status code');
            }
            res.writeHead(request.statusCode, request.headers);
            request.pipe(res);
        });
        req.pipe(answer);
    }

    async run(): Promise<void> {
        this.server.listen(this.port, () => {
            console.log(
                chalk.green('[SUCCESS]'),
                `HTTP proxy is listening at port ${this.port}`
            );
        });
    }
}

export default ProxyServer;
