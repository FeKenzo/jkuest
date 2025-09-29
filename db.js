import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('jkuest.db');

export const initDB = () => {
    db.execAsync((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS temas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT UNIQUE NOT NULL
            );`
        );
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS perguntas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tema_id INTEGER NOT NULL,
                enunciado TEXT NOT NULL,
                alt1 TEXT NOT NULL,
                alt2 TEXT NOT NULL,
                alt3 TEXT NOT NULL,
                alt4 TEXT NOT NULL,
                correta INTEGER NOT NULL,
                FOREIGN KEY (tema_id) REFERENCES temas (id) ON DELETE CASCADE
            );`
        );
    console.log("Tabelas criadas com sucesso!");
    }).catch((err) => console.error("Erro ao criar tabelas:", err));
};
