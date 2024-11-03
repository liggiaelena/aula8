const express = require('express');
const router = express.Router();
const Aluno = require('../models/aluno');
const Disciplina = require('../models/disciplina');

router.get('/', async (req, res) => {
    try {
        const alunos = await Aluno.find().populate('turmaId');
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id).populate('turmaId');
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post('/', async (req, res) => {
    const { nome, idade, ra, turmaId } = req.body;
    try {
        const disciplina = await Disciplina.findById(turmaId);
        console.log(disciplina)
        console.log("oiii")
        if (!disciplina) {
            return res.status(422).json({ mensagem: "Disciplina não encontrado" });
        }
        const aluno = {
            nome,
            idade,
            ra,
            turmaId
        }

        await Aluno.create(aluno);
        res.status(201).json(aluno);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar aluno', error });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const updatedAluno = await Aluno.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedAluno) {
            return res.status(422).json({ mensagem: "Aluno não encontrado" });
        }
        res.status(200).json(updatedAluno);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar aluno", erro: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findByIdAndDelete(req.params.id);
        if (!aluno) {
            return res.status(422).json({ mensagem: "Aluno não encontrado" });
        }
        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir aluno", erro:
                error.message
        });
    }
});

module.exports = router;