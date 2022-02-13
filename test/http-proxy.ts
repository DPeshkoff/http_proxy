import path from 'path';
import QUnit from 'qunit';
import ProxyServer from '../src/proxy/proxy';
import {spawn} from 'child_process';
import chalk from 'chalk';

QUnit.module('http_proxy', async (assert) => {
    const configPath = path.join(__dirname, '../config.yml');
    const proxy = new ProxyServer(configPath);
    proxy.run();

    /*
   * Примечание: spawn это очень криво, но с прокси все еще хуже.
   * request deprecated, его не стал использовать
   * axios на прокси умирает тотально, что с tunnel, что с местным
   * было принято решение временно забить на это и наспамить curl'ов
   */

    const proxy_test = new Promise((resolve) => {

        QUnit.test('GET', async (assert) => {
            
            const controlMessage =
        '<html>\r\n<head><title>301 Moved Permanently</title></head>\r\n<body bgcolor="white">\r\n<center><h1>301 Moved Permanently</h1></center>\r\n<hr><center>nginx/1.14.1</center>\r\n</body>\r\n</html>\r\n'; // eslint-disable-line

            const promise = new Promise((resolve) => {
                const ls = spawn('curl', [
                    '-x',
                    'http://127.0.0.1:8080',
                    'http://mail.ru',
                ]);

                let output = '';

                ls.stdout.on('data', function (data) {
                    output += data.toString();
                });

                ls.on('exit', function (code) {
                    if (code! !== 0) {
                        console.log('child process exited with code ' + code!.toString());
                    }
                    resolve(output);
                });
            });
            await promise.then((value) => {
                assert.strictEqual(
                    value,
                    controlMessage,
                    'Failed to receive control message'
                );
            });
        });

        QUnit.test('POST', async (assert) => {
            const controlMessage = 'value1';

            const promise: Promise<any> = new Promise((resolve) => {
                const ls = spawn('curl', [
                    '-X',
                    'POST',
                    '-d',
                    'param1=value1',
                    '-x',
                    'http://127.0.0.1:8080',
                    'http://httpbin.org/post',
                    '-H',
                    'test: test',
                ]);
                let output = '';

                ls.stdout.on('data', function (data) {
                    output += data.toString();
                });

                ls.on('exit', function (code) {
                    if (code! !== 0) {
                        console.log(
                            chalk.red('[ERROR] Сhild process exited with code ') +
                code!.toString()
                        );
                    }
                    resolve(output.replace('\r', ''));
                });
            });
            await promise.then((value) => {
                const parsedValue: { form: { param1: string } } = JSON.parse(value);
                assert.strictEqual(
                    parsedValue.form.param1,
                    controlMessage,
                    'Failed to receive control message'
                );
            });
        });

        QUnit.test('DELETE', async (assert) => {
            const controlMessage = 'value';

            const promise: Promise<any> = new Promise((resolve) => {
                const ls = spawn('curl', [
                    '-X',
                    'DELETE',
                    '-d',
                    'param=value',
                    '-x',
                    'http://127.0.0.1:8080',
                    'http://httpbin.org/delete',
                ]);
                let output = '';

                ls.stdout.on('data', function (data) {
                    output += data.toString();
                });

                ls.on('exit', function (code) {
                    if (code! !== 0) {
                        console.log(
                            chalk.red('[ERROR] Сhild process exited with code ') +
                code!.toString()
                        );
                    }
                    resolve(output.replace('\r', ''));
                });
            });
            await promise.then((value) => {
                const parsedValue: { form: { param: string } } = JSON.parse(value);
                assert.strictEqual(
                    parsedValue.form.param,
                    controlMessage,
                    'Failed to receive control message'
                );
            });
        });

        QUnit.test('PATCH', async (assert) => {
            const controlMessage = 'patchedValue';

            const promise: Promise<any> = new Promise((resolve) => {
                const ls = spawn('curl', [
                    '-X',
                    'PATCH',
                    '-d',
                    'param=patchedValue',
                    '-x',
                    'http://127.0.0.1:8080',
                    'http://httpbin.org/patch',
                ]);
                let output = '';

                ls.stdout.on('data', function (data) {
                    output += data.toString();
                });

                ls.on('exit', function (code) {
                    if (code! !== 0) {
                        console.log(
                            chalk.red('[ERROR] Сhild process exited with code ') +
                code!.toString()
                        );
                    }
                    resolve(output.replace('\r', ''));
                });
            });
            await promise.then((value) => {
                const parsedValue: { form: { param: string } } = JSON.parse(value);
                assert.strictEqual(
                    parsedValue.form.param,
                    controlMessage,
                    'Failed to receive control message'
                );
            });
        });

        QUnit.test('PUT', async (assert) => {
            const controlMessage = 'putValue';

            const promise: Promise<any> = new Promise((resolve) => {
                const ls = spawn('curl', [
                    '-X',
                    'PUT',
                    '-d',
                    'param=putValue',
                    '-x',
                    'http://127.0.0.1:8080',
                    'http://httpbin.org/put',
                ]);
                let output = '';

                ls.stdout.on('data', function (data) {
                    output += data.toString();
                });

                ls.on('exit', function (code) {
                    if (code! !== 0) {
                        console.log(
                            chalk.red('[ERROR] Сhild process exited with code ') +
                code!.toString()
                        );
                    }
                    resolve(output.replace('\r', ''));
                });
            });
            await promise.then((value) => {
                const parsedValue: { form: { param: string } } = JSON.parse(value);
                assert.strictEqual(
                    parsedValue.form.param,
                    controlMessage,
                    'Failed to receive control message'
                );
            });
        });

        QUnit.test('OPTIONS', async (assert) => {
            const controlMessage =
        '<html>\r\n<head><title>301 Moved Permanently</title></head>\r\n<body bgcolor="white">\r\n<center><h1>301 Moved Permanently</h1></center>\r\n<hr><center>nginx/1.14.1</center>\r\n</body>\r\n</html>\r\n'; // eslint-disable-line

            const promise: Promise<any> = new Promise((resolve) => {
                const ls = spawn('curl', [
                    '-X',
                    'OPTIONS',
                    '-x',
                    'http://127.0.0.1:8080',
                    'http://mail.ru',
                ]);
                let output = '';

                ls.stdout.on('data', function (data) {
                    output += data.toString();
                });

                ls.on('exit', function (code) {
                    if (code! !== 0) {
                        console.log(
                            chalk.red('[ERROR] Сhild process exited with code ') +
                code!.toString()
                        );
                    }
                    resolve(output);
                });
            });
            await promise.then((value) => {
                assert.strictEqual(
                    value,
                    controlMessage,
                    'Failed to receive control message'
                );
            });
        });

        QUnit.test('HEAD', async (assert) => {
            const controlMessage = 'HTTP/1.1 301 Moved Permanently';

            const promise: Promise<any> = new Promise((resolve) => {
                const ls = spawn('curl', [
                    '--head',
                    '-x',
                    'http://127.0.0.1:8080',
                    'http://mail.ru',
                ]);
                let output = '';

                ls.stdout.on('data', function (data) {
                    output += data.toString();
                });

                ls.on('exit', function (code) {
                    if (code! !== 0) {
                        console.log(
                            chalk.red('[ERROR] Сhild process exited with code ') +
                code!.toString()
                        );
                    }
                    resolve(output);
                });
            });
            await promise.then((value) => {
                assert.strictEqual(
                    value.split('\r\n')[0],
                    controlMessage,
                    'Failed to receive control message'
                );
            });
        });

        QUnit.test('GET:404', async (assert) => {
            const controlStatus = '< HTTP/1.1 404 Not Found';

            const promise: Promise<any> = new Promise((resolve) => {
                const ls = spawn('curl', [
                    '-v',
                    '-x',
                    'http://127.0.0.1:8080',
                    'http://httpbin.org/status/404',
                ]);
                let output = '';

                ls.stderr.on('data', function (data) {
                    output += data.toString();
                });

                ls.on('exit', function (code) {
                    if (code! !== 0) {
                        console.log(
                            chalk.red('[ERROR] Сhild process exited with code ') +
                code!.toString()
                        );
                    }
                    resolve(output);
                });
            });
            await promise.then((value) => {
                assert.strictEqual(
                    value.split('\r\n')[6].split('\n')[1],
                    controlStatus,
                    'Failed to receive control message'
                );
            });
        });

        QUnit.test('GET:200', async (assert) => {
            const controlStatus = '< HTTP/1.1 200 OK';

            const promise: Promise<any> = new Promise((resolve) => {
                const ls = spawn('curl', [
                    '-v',
                    '-x',
                    'http://127.0.0.1:8080',
                    'http://httpbin.org/status/200',
                ]);
                let output = '';

                ls.stderr.on('data', function (data) {
                    output += data.toString();
                });

                ls.on('exit', function (code) {
                    if (code! !== 0) {
                        console.log(
                            chalk.red('[ERROR] Сhild process exited with code ') +
                code!.toString()
                        );
                    }
                    resolve(output);
                });
            });
            await promise.then((value) => {
                assert.strictEqual(
                    value.split('\r\n')[6].split('\n')[1],
                    controlStatus,
                    'Failed to receive control message'
                );
            });
        });

        QUnit.test('GET:302', async (assert) => {
            const controlStatus = '< HTTP/1.1 302 Found';

            const promise: Promise<any> = new Promise((resolve) => {
                const ls = spawn('curl', [
                    '-v',
                    '-x',
                    'http://127.0.0.1:8080',
                    'http://httpbin.org/status/302',
                ]);
                let output = '';

                ls.stderr.on('data', function (data) {
                    output += data.toString();
                });

                ls.on('exit', function (code) {
                    if (code! !== 0) {
                        console.log(
                            chalk.red('[ERROR] Сhild process exited with code ') +
                code!.toString()
                        );
                    }
                    resolve(output);
                });
            });
            await promise.then((value) => {
                assert.strictEqual(
                    value.split('\r\n')[6].split('\n')[1],
                    controlStatus,
                    'Failed to receive control message'
                );
            });
        });

        QUnit.test('POST-HEADERS', async (assert) => {
            const controlMessage = 'test';

            const promise: Promise<any> = new Promise((resolve) => {
                const ls = spawn('curl', [
                    '-X',
                    'POST',
                    '-x',
                    'http://127.0.0.1:8080',
                    'http://httpbin.org/post',
                    '-H',
                    'test: test',
                ]);
                let output = '';

                ls.stdout.on('data', function (data) {
                    output += data.toString();
                });

                ls.on('exit', function (code) {
                    if (code! !== 0) {
                        console.log(
                            chalk.red('[ERROR] Сhild process exited with code ') +
                code!.toString()
                        );
                    }
                    resolve(output.replace('\r', ''));
                });
            });
            await promise.then((value) => {
                const parsedValue: { headers: { Test: string } } = JSON.parse(value);
                assert.strictEqual(
                    parsedValue.headers.Test,
                    controlMessage,
                    'Failed to receive control message'
                );
            });
        });
        QUnit.moduleDone(() => { resolve('success'); });
    });
    proxy_test.then(() => {
        proxy.stop();
    })

});
