import { knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export abstract class BaseDatabase {
    protected static connection = knex({
        client: 'mysql', // Defina o cliente como 'mysql' para usar MySQL
        connection: {
            host: process.env.DB_HOST as string,
            user: process.env.DB_USER as string,
            password: process.env.DB_PASSWORD as string,
            database: process.env.DB_NAME as string,
            port: parseInt(process.env.DB_PORT as string, 10), // Porta do MySQL
        },
        useNullAsDefault: true,
        pool: {
            min: 0,
            max: 1,
        },
    });

    // Após a criação da conexão, ative as chaves estrangeiras
    protected static async enableForeignKeys() {
        await BaseDatabase.connection.raw('SET foreign_key_checks = 1;');
    }

    protected static connectionDatabaseSqlite = knex(
        {
            client: "sqlite3",
            connection: {
                filename: process.env.DB_FILE_PATH as string
            },
            useNullAsDefault: true,
            pool: {
                min: 0,
                max: 1,
                afterCreate: (conn: any, cb: any) => {
                    conn.run("PRAGMA foreign_keys = ON", cb)
                }
            }
        }
    )
}
