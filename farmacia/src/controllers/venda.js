const express = require('express');
const venda = express();
const dados = require('./data/dados.json');
const fs = require('fs');
venda.use(express.json());

venda.post('/vendas', (req, res) => {
    const novaVenda = req.body;

    if (!novaVenda.id || !novaVenda.data || !novaVenda.id_medicamento || !novaVenda.id_cliente) {
        return res.status(400).json({ mensagem: 'Dados incompletos, tente novamente' });
    } else {
        dados.Venda.push(novaVenda);
        salvarDados(dados);
        const vendaId = novaVenda.id; // Obtendo o ID da nova venda
        const links = {
            self: { href: `/vendas/${vendaId}` },
            update: { href: `/vendas/${vendaId}/update` },
            delete: { href: `/vendas/${vendaId}/delete` }
        };
        return res.status(201).json({ mensagem: 'Nova venda cadastrada com sucesso.', _links: links });
    }
});

venda.get('/vendas', (req, res) => {
    const vendasComLinks = dados.Venda.map((venda) => {
        const vendaId = venda.id;
        const links = {
            self: { href: `/vendas/${vendaId}` },
            update: { href: `/vendas/${vendaId}/update` },
            delete: { href: `/vendas/${vendaId}/delete` }
        };
        return { ...venda, _links: links };
    });

    return res.json(vendasComLinks);
});


function salvarDados(dados) {
    fs.writeFileSync(__dirname + '/../data/dados.json', JSON.stringify(dados, null, 2));
}

module.exports = venda;
