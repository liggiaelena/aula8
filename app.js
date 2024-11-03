const express = require('express');
const app = express();
const mongoose = require('mongoose')
app.use(express.json());

//--------------------controllers---------------------.0

const usuarioController = require('./controllers/usuarioController');
app.use('/usuarios', usuarioController);

const postController = require('./controllers/postControllers')
app.use('/post', postController);

const disciplinaController = require('./controllers/disciplinaControllers');
app.use('/disciplinas', disciplinaController);

const alunoController = require('./controllers/alunoControllers');
app.use('/alunos', alunoController);
//----------------

mongoose.connect('mongodb://127.0.0.1:27017/aula10_tarefa')
    .then(() => {
        app.listen(27017, () => {
            console.log('Conectado ao mongoDB');
            console.log('Servidor iniciado na porta 27017');
        })
    })
    .catch((err) => {
        console.log(err);
    });


app.listen(3000, () => console.log('Servidor rodando na porta: 3000'));