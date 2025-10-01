import * as SQLite from 'expo-sqlite';

// Abre o banco
export const db = SQLite.openDatabaseSync('jkuest.db');

export const initDB = async () => {
    try {
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS temas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS perguntas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tema_id INTEGER NOT NULL,
            enunciado TEXT NOT NULL,
            alt1 TEXT NOT NULL,
            alt2 TEXT NOT NULL,
            alt3 TEXT NOT NULL,
            alt4 TEXT NOT NULL,
            correta INTEGER NOT NULL,
            FOREIGN KEY (tema_id) REFERENCES temas (id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS resultados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tema_id INTEGER NOT NULL,
            total INTEGER NOT NULL,
            corretas INTEGER NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY (tema_id) REFERENCES temas (id)
        );`
    );
        console.log("Tabelas criadas com sucesso!");
    } catch (err) {
        console.error("Erro ao criar tabelas:", err);
    }
};
