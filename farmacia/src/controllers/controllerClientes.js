const express = require('express');
const server = express();
const dadosClientes = require('./data/dadosClientes.json'); // Novo arquivo para dados de clientes
const fs = require('fs');
server.use(express.json());
server.post('/clientes', (req, res) => {
    const novoCliente = req.body;
    if (!novoCliente.nome || !novoCliente.endereco || !novoCliente.email || !novoCliente.telefone) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        dadosClientes.Cliente.push(novoCliente);
        salvarDadosClientes(dadosClientes);
        return res.status(201).json({ mensagem: "Novo cliente cadastrado com sucesso!" });
    }
});
server.get('/clientes', (req, res) => {
    return res.json(dadosClientes.Cliente);
});
server.put('/clientes/:id', (req, res) => {
    const clienteId = parseInt(req.params.id);
    const atualizarCliente = req.body;
    const idCliente = dadosClientes.Cliente.findIndex(c => c.id === clienteId);

    if (idCliente === -1) {
        return res.status(404).json({ mensagem: "Cliente não encontrado :/" });
    } else {
        dadosClientes.Cliente[idCliente].nome = atualizarCliente.nome || dadosClientes.Cliente[idCliente].nome;
        dadosClientes.Cliente[idCliente].endereco = atualizarCliente.endereco || dadosClientes.Cliente[idCliente].endereco;
        dadosClientes.Cliente[idCliente].email = atualizarCliente.email || dadosClientes.Cliente[idCliente].email;
        dadosClientes.Cliente[idCliente].telefone = atualizarCliente.telefone || dadosClientes.Cliente[idCliente].telefone;
        salvarDadosClientes(dadosClientes);
        return res.json({ mensagem: "Cliente atualizado com sucesso!" });
    }
});
server.delete("/clientes/:id", (req, res) => {
    const clienteId = parseInt(req.params.id);
    dadosClientes.Cliente = dadosClientes.Cliente.filter(c => c.id !== clienteId);
    salvarDadosClientes(dadosClientes);
    return res.status(200).json({ mensagem: "Cliente excluído com sucesso" });
});
function salvarDadosClientes() {
    fs.writeFileSync(__dirname + '/data/dadosClientes.json', JSON.stringify(dadosClientes, null, 2));
}
module.exports = { server, salvarDadosClientes };