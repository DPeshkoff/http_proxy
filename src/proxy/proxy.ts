import http from 'http';
import initConfig from '../config/config';
import chalk from 'chalk';
import fs from 'fs';
import tls from 'tls';
import {generateCertificate} from '../utils/cert';
import Database from '../db/db';

class ProxyServer {
    private server: http.Server;
    private port: string;
    private key!: string;
    private certs: Map<string, string>;

    /**
   * @constructor
   */
    constructor(configPath: string, db : Database) {
        this.server = http.createServer((req, res) => this.handle(req, res, db));
        this.port = initConfig(configPath, 'proxy').port;
        //this.key = checkKey()!;
        this.certs = new Map();
    }

    private async handle(req: http.IncomingMessage, 
        res: http.ServerResponse, 
        db: Database): Promise<void> {
        const headers = req.headers;
        delete headers['proxy-connection'];
        const options: http.RequestOptions = {
            host: req.headers.host,
            path: req.url!.replace(/^(?:\/\/|[^/]+)*\//, '/'),
            method: req.method,
            headers,
        };

        await db.putRequest(options);

        if (req.url?.split(':')[0] === 'https') {
            res.write('HTTP/1.1 200 Connection Established\r\n' +
                'Proxy-Agent: HTTP_PROXY\r\n' +
                '\r\n');

            const tlsOptions = {
                key: this.key,
                //cert: this.getCertificate(req.url.split('.')[0].split('//')[1]),
                isServer: true,
            };
            const answer = http.request(options, (request: http.IncomingMessage) => {
                if (!request.statusCode) {
                    throw new Error('Incorrect status code');
                }
                res.writeHead(request.statusCode, request.headers);
                request.pipe(res);
            });
            req.pipe(answer);
            return;
        }

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

    async stop() {
        this.server.close();
    }

    private getCertificate(serverName: string) {

        if (this.certs.has(serverName)) {
            return tls.createSecureContext({
                key: this.key,
                cert: this.certs.get(serverName),
            });
        }

        const fileName = `../../sh/keys/${serverName}.crt`;
        if (fs.existsSync(fileName)) {
            fs.readFile(fileName, 'utf8', (err, data) => {this.certs.set(serverName, data);});

            return tls.createSecureContext({
                key: this.key,
                cert: this.certs.get(serverName),
            });
        }
        generateCertificate(serverName);
        this.getCertificate(serverName); 
        // рекурсивно вызываем, пока не получится наконец-то создать файл
        return;
    }
}

export default ProxyServer;
