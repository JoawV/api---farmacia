const express = require('express');
const server = express();
const dadosFornecedores = require('./data/dadosFornecedores.json');
const fs = require('fs');

server.use(express.json());

server.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body;

    if (!novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.email || !novoFornecedor.telefone) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        dadosFornecedores.Fornecedor.push(novoFornecedor);
        salvarDados(dadosFornecedores);
        const fornecedorComLinks = adicionarLinksAoFornecedor(novoFornecedor);
        return res.status(201).json(fornecedorComLinks);
    }
});

server.get('/fornecedores', (req, res) => {
    const fornecedoresComLinks = dadosFornecedores.Fornecedor.map(fornecedor => adicionarLinksAoFornecedor(fornecedor));
    return res.json(fornecedoresComLinks);
});


function adicionarLinksAoFornecedor(fornecedor) {
    return {
        ...fornecedor,
        _links: {
            self: { href: `/fornecedores/${fornecedor.id}` },
            update: { href: `/fornecedores/${fornecedor.id}/update` },
            delete: { href: `/fornecedores/${fornecedor.id}/delete` }
        }
    };
}

function salvarDados() {
    fs.writeFileSync(__dirname + '/data/dadosFornecedores.json', JSON.stringify(dadosFornecedores, null, 2));
}

module.exports = { server, salvarDados };
