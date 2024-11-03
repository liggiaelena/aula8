const mongoose = require('mongoose');
const Disciplina = mongoose.model('Disciplina', {
    nome: String,
    carga: String,
    senha: String,
    ativo: Boolean
});

module.exports = Disciplina