const db = require('./db'); 
// Certifique-se de importar o módulo/db corretamente

class Disciplina {
  constructor(id, nome, descricao, cargaHoraria) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.cargaHoraria = cargaHoraria;
  }

  static async getAll() {
    return db.many('SELECT * FROM disciplinas');
  }

  static async create(nome, descricao, cargaHoraria) {
    return db.one('INSERT INTO disciplinas (nome, descricao, cargaHoraria) VALUES ($1, $2, $3) RETURNING *', [nome, descricao, cargaHoraria])
      .then(data => new Disciplina(data.id, data.nome, data.descricao, data.cargaHoraria));
  }

  static async getById(id) {
    return db.one('SELECT * FROM disciplinas WHERE id = $1', id)
      .then(data => new Disciplina(data.id, data.nome, data.descricao, data.cargaHoraria));
  }

  static async update(id, nome, descricao, cargaHoraria) {
    return db.one('UPDATE disciplinas SET nome = $1, descricao = $2, cargaHoraria = $3 WHERE id = $4 RETURNING *', [nome, descricao, cargaHoraria, id])
      .then(data => new Disciplina(data.id, data.nome, data.descricao, data.cargaHoraria));
  }

  static async delete(id) {
    return db.none('DELETE FROM disciplinas WHERE id = $1', id);
  }
}

module.exports = Disciplina;