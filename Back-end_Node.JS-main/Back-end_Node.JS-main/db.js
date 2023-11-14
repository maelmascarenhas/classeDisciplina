require('dotenv').config();
const pgp = require('pg-promise')();
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

// Script SQL para criar a tabela disciplinas
const createDisciplinasTable = `
  CREATE TABLE IF NOT EXISTS disciplinas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    carga_horaria INTEGER NOT NULL,
    professor VARCHAR(255),  
    sala_aula VARCHAR(50)
  );
`;

// Execute o script SQL para criar a tabela disciplinas
db.none(createDisciplinasTable)
  .then(() => {
    console.log('Tabela disciplinas criada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao criar a tabela disciplinas:', error);
  });

// Exporta a instância do banco de dados para ser utilizado em outras partes do aplicativo
module.exports = db;
