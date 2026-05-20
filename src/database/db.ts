import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('app_integrado.db');

export const initDB = () => {
  db.transaction((tx: any) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS imc_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        imc REAL,
        date TEXT,
        FOREIGN KEY(userId) REFERENCES users(id)
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS orders_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        order_details TEXT,
        date TEXT,
        FOREIGN KEY(userId) REFERENCES users(id)
      );`
    );
  });
};

export default db;