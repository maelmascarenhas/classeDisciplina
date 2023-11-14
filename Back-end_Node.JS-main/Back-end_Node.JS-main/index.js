const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { QueryResultError } = require('pg-promise');
const pgp = require('pg-promise')();

const port = process.env.PORT || 3000;

const Disciplina = require('./Disciplina'); // Make sure to use the correct path to the Disciplina class

app.use(bodyParser.json());

// GET ALL DISCIPLINAS
app.get('/disciplinas', async (req, res) => {
  try {
    const disciplinas = await Disciplina.getAll();
    res.setHeader('Content-Type', 'application/json');
    res.json(disciplinas);
  } catch (error) {
    if (error instanceof QueryResultError && error.code === 'noData') {
      res.setHeader('Content-Type', 'application/json');
      res.json([]);
    } else {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar as disciplinas' });
    }
  }
});

// CREATE DISCIPLINA
app.post('/disciplinas', async (req, res) => {
  try {
    const { nome, descricao, cargaHoraria } = req.body;
    const newDisciplina = await Disciplina.create(nome, descricao, cargaHoraria);
    res.json(newDisciplina);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a disciplina' });
  }
});

// GET DISCIPLINA POR ID
app.get('/disciplinas/:id', async (req, res) => {
  try {
    const disciplinaId = parseInt(req.params.id); // Convert ID from string to integer
    const disciplina = await Disciplina.getById(disciplinaId);
    if (disciplina) {
      res.json(disciplina);
    } else {
      res.status(404).json({ error: 'Disciplina não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a disciplina' });
  }
});

// UPDATE DISCIPLINA POR ID
app.put('/disciplinas/:id', async (req, res) => {
  try {
    const disciplinaId = parseInt(req.params.id); // Convert ID from string to integer
    const { nome, descricao, cargaHoraria } = req.body;
    const updatedDisciplina = await Disciplina.update(disciplinaId, nome, descricao, cargaHoraria);
    res.json(updatedDisciplina);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a disciplina' });
  }
});

// DELETE DISCIPLINA POR ID
app.delete('/disciplinas/:id', async (req, res) => {
  try {
    const disciplinaId = parseInt(req.params.id); // Convert ID from string to integer
    await Disciplina.delete(disciplinaId);
    res.json({ message: 'Disciplina excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a disciplina' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
