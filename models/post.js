const mongoose = require('mongoose');
const Post = mongoose.model('Post', {
    titulo: String,
    conteudo: String,
    autorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    ativo: Boolean
});
module.exports = Post;