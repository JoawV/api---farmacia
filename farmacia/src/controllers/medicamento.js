const express = require('express');
const medicamento = express();
const dados = require('./data/dados.json');
const fs = require("fs")
medicamento.use(express.json());

medicamento.post("/medicamentos", (req, res) => {
    const novoMedicamento = req.body;

    if (!novoMedicamento.id || !novoMedicamento.nome_medicamento || !novoMedicamento.nome_fabricante || !novoMedicamento.preco ||
        !novoMedicamento.quantidade) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        dados.Medicamento.push(novoMedicamento);
        salvarDados(dados);
        const medicamentoComLinks = adicionarLinksAoMedicamento(novoMedicamento);
        return res.status(201).json(medicamentoComLinks);
    }
})

medicamento.get("/medicamentos", (req, res) => {
    const medicamentosComLinks = dados.Medicamento.map(medicamento => adicionarLinksAoMedicamento(medicamento));
    return res.json(medicamentosComLinks);
})

medicamento.put("/medicamentos/:id", (req, res) => {
    const medicamentoID = parseInt(req.params.id);
    const atualizarMedicamento = req.body;
    const idMedicamento = dados.Medicamento.findIndex(u => u.id === medicamentoID);

    if (idMedicamento === -1) {
        return res.status(404).json({ mensagem: "Medicamento não encontrado :/" });
    } else {
        dados.Medicamento[idMedicamento].nome_medicamento = atualizarMedicamento.nome_medicamento || dados.Medicamento[idMedicamento].nome_medicamento;
        dados.Medicamento[idMedicamento].nome_fabricante = atualizarMedicamento.nome_fabricante || dados.Medicamento[idMedicamento].nome_fabricante;
        dados.Medicamento[idMedicamento].preco = atualizarMedicamento.preco || dados.Medicamento[idMedicamento].preco;
        dados.Medicamento[idMedicamento].quantidade = atualizarMedicamento.quantidade || dados.Medicamento[idMedicamento].quantidade;

        salvarDados(dados);

        return res.json({ mensagem: "Medicamento atualizado com sucesso." });
    }
})

medicamento.delete("/medicamentos/:id", (req, res) => {
    const medicamentoID = parseInt(req.params.id);

    dados.Medicamento = dados.Medicamento.filter(u => u.id !== medicamentoID);

    salvarDados(dados);

    return res.status(200).json({ mensagem: "Medicamento excluído com sucesso" });
})

function adicionarLinksAoMedicamento(medicamento) {
    return {
        ...medicamento,
        _links: {
            self: { href: `/medicamentos/${medicamento.id}` },
            update: { href: `/medicamentos/${medicamento.id}/update` },
            delete: { href: `/medicamentos/${medicamento.id}/delete` }
        }
    };
}

function salvarDados() {
    fs.writeFileSync(__dirname + "/data/dados.json", JSON.stringify(dados, null, 2));
}

module.exports = { medicamento, salvarDados };
