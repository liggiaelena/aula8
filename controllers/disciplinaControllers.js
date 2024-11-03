const express = require('express');
const router = express.Router();
const Disciplina = require('../models/disciplina');
const Aluno = require('../models/aluno');

router.get('/', async (req, res) => {
    try {
        const disciplinas = await Disciplina.find();
        res.status(200).json(disciplinas);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const disciplina = await Disciplina.findOne({ _id: id });

        if (!disciplina) {
            res.status(422).json({ mensagem: "Disciplina não encontrado" });
            return;
        }

        const alunos = await Aluno.find({ turmaId: id });  

        res.status(200).json({disciplina, alunos});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { nome, carga, senha, ativo } = req.body;
    const disciplina = {
        nome,
        carga,
        senha,
        ativo
    }
    try {
        await Disciplina.create(disciplina);
        res.status(201).json(disciplina);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar usuário', error });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const updatedDisciplina = await Disciplina.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedDisciplina) {
            return res.status(422).json({ mensagem: "Disciplina não encontrado" });
        }
        res.status(200).json(updatedDisciplina);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar disciplina", erro: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Aluno.deleteMany({ turmaId: id });  

        const disciplina = await Disciplina.findByIdAndDelete(req.params.id);
        
        if (!disciplina) {
            return res.status(422).json({ mensagem: "Disciplina não encontrado" });
        }

        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir disciplina", erro: error.message });
    }
});

module.exports = router;