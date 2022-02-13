import ProxyServer from './proxy/proxy';
import ApiServer from './apiserver/apiserver';
import path from 'path';
import chalk from 'chalk';

/***
 *      _______           _                                        _      _    _ __          __ __
 *     |__   __|         | |                                      | |    | |  | |\ \        / //_ |
 *        | |  ___   ___ | |__   _ __    ___   _ __    __ _  _ __ | | __ | |__| | \ \  /\  / /  | |
 *        | | / _ \ / __|| '_ \ | '_ \  / _ \ | '_ \  / _` || '__|| |/ / |  __  |  \ \/  \/ /   | |
 *        | ||  __/| (__ | | | || | | || (_) || |_) || (_| || |   |   <  | |  | |   \  /\  /    | |
 *        |_| \___| \___||_| |_||_| |_| \___/ | .__/  \__,_||_|   |_|\_\ |_|  |_|    \/  \/     |_|
 *                                            | |
 *                                            |_|
 */

const configPath = path.join(__dirname, '../config.yml');

console.log(chalk.yellow('Starting HTTP-proxy...'));
const API = new ApiServer(configPath);
const Proxy = new ProxyServer(configPath);

const promise = new Promise((resolve) => {
    Proxy.run();
    API.run();
    resolve(true);
});

promise.then(() => {
    console.log(chalk.yellow('Ready to use!'));
});
