import path from 'path';
import {open} from 'sqlite';
import sqlite3 from 'sqlite3';
import initConfig from '../config/config';

class Database {
    private db: any;
    private tableName!: string;

    constructor(configPath: string) {
        const dbName = initConfig(configPath, 'db').fileName;
        const tableName = initConfig(configPath, 'db').tableName;
        this.initDatabase(dbName, tableName);
    }

    private async createTable() {
        this.db.exec(
            `create table ${this.tableName} (id integer primary key autoincrement, query text)`);
    }

    private async initDatabase (dbName: string, tableName: string) {
        this.tableName = tableName;
        const dbPath = path.join(__dirname, `./${dbName}.sqlite3`);
        this.db = await open<sqlite3.Database, sqlite3.Statement>({
            filename: dbPath,
            driver: sqlite3.Database
        });

        this.db.get(`select Count(*) from ${this.tableName}`).then((_value: any) => {
            console.log(`[DB] Table ${this.tableName} exists, all is ok`);
        }, async (_reason: any) => {
            console.log(`[DB] Table ${this.tableName} does not exist, creating...`);
            await this.createTable();
            console.log('[DB] Table created, ready to use!');
        });
    }

    getRequest(requestId: number) {
        return this.db.get(`select * from ${this.tableName} where id=?`, [requestId]);
    }

    getRequests() {
        return this.db.all(`select * from ${this.tableName}`);
    }

    putRequest(query: any) {
        return this.db.run(`insert into ${this.tableName} (query) values (?)`, [JSON.stringify(query)]);
    }
};

export default Database;
