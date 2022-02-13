import yaml from 'js-yaml';
import fs from 'fs';

/**
 * Function initConfig reads .yml config and provides access to top-level sections
 * @param {string} configPath - path to the config file
 * @param {string | undefined} path - optional top-level path
 * @returns {*} anything loaded from .yml file
 */
export default function initConfig(configPath: string, path?: string): any {
    try {
        const doc: any = yaml.load(fs.readFileSync(configPath, 'utf8'));
        if (path) {
            try {
                return doc[path];
            } catch (err) {
                throw new Error(`No path named ${path} in config ${configPath}`);
            }
        }
        return doc;
    } catch (err) {
        throw new Error(`Unable to read config from ${configPath}`);
    }
}
