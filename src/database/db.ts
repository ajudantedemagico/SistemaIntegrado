import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('app_integrado.db');

export const initDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS imc_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      imc REAL,
      date TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS orders_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      order_details TEXT,
      date TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);
};

export const getFirstAsync = <T = unknown>(sql: string, ...params: any[]) =>
  db.getFirstAsync<T>(sql, ...params);

export const getAllAsync = <T = unknown>(sql: string, ...params: any[]) =>
  db.getAllAsync<T>(sql, ...params);

export const runAsync = (sql: string, ...params: any[]) =>
  db.runAsync(sql, ...params);

export default db;