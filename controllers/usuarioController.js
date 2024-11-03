const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario')

router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post('/', async (req, res) => {
    const { nome, email, senha, ativo } = req.body;
    const usuario = {
        nome,
        email,
        senha,
        ativo
    }
    try {
        await Usuario.create(usuario);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar usuário', error });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const updatedUsuario = await Usuario.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedUsuario) {
            return res.status(422).json({ mensagem: "Usuário não encontrado" });
        }
        res.status(200).json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar usuário", erro: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(422).json({ mensagem: "Usuário não encontrado" });
        }
        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir usuário", erro:
                error.message
        });
    }
});

module.exports = router;