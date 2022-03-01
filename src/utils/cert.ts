import {spawn} from 'child_process';
import fs from 'fs';

export const checkKey = () => {
    const fileName = './cert.key';
    let key: string;
    if (fs.existsSync(fileName)) {
        key = fs.readFileSync(fileName, 'utf8');
        return key;
    }
    generateKey();
    checkKey();
    return;
};

export const generateKey = () => {
    const gen_key = spawn('../../sh/gen_ca.sh');

    gen_key.stdout?.once('data', (data) => {
        fs.writeFile('./cert.key', data, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    });
};

export const generateCertificate = (serverName: string) => {
    const gen_cert = spawn('../../sh/gen_cert.sh', 
                           [serverName, (Math.floor(Math.random() * 1000000000000)).toString()]);

    gen_cert.stdout?.once('data', (data) => {
        fs.writeFile(`./certs/${serverName}.crt`, data, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    });
};
