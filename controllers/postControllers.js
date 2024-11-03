const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Usuario = require('../models/usuario');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('autorId');
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar posts", erro:
                error.message
        });
    }
});

router.post('/', async (req, res) => {
    const { titulo, conteudo, autorId, ativo } = req.body;
    try {
        // Verifica se o usuário autor existe
        const autor = await Usuario.findById(autorId);
        if (!autor) {
            return res.status(422).json({ mensagem: "Autor não encontrado" });
        }
        const post = {
            titulo,
            conteudo,
            autorId,
            ativo
        }
        await Post.create(post);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar post", erro: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findOne({ _id: id });
        if (!usuario) {
            res.status(422).json({ mensagem: "Usuario não encontrado" });
            return;
        }
        const posts = await Post.find({ autorId: id }); // Pega todos os Posts do Usuário
        res.status(200).json({ usuario, posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Post.deleteMany({ autorId: id }); // Apaga todos os Posts o Usuário
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(422).json({ mensagem: "Usuário não encontrado" });
        }
        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir usuário", erro: error.message });
    }
});

module.exports = router;