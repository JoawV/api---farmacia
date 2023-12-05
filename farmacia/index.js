const express = require('express');
const server = express();
const dados = require('./data/dados.json');
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json());

// Função para verificar o servidor
server.listen(3000, () =>{
console.log("Servidor está funcionando!");
});

// salvar
function salvarDados(dados){
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2))
}

//---------------------------MEDICAMENTOS-------------------------------------------
server.post('/medicamento', (req, res) => {
    const novoMedicamento = req.body

    if(!novoMedicamento.id || !novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.medicamento.push(novoMedicamento)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Novo medicamento cadastrado com sucesso!"})
    }
})

server.get('/medicamento', (req, res) => {
    return res.json(dados.users)
})

server.put('/medicamento/:id', (req, res) => {

    const medicamentoId = parseInt(req.params.id)

    const atualizarMedicamento = req.body

    const idMedicamento = dados.medicamento.findIndex(m => m.id === medicamentoId)

    if(idMedicamento === -1) {
        return res.status(404).json({mensagem: "Medicamento não encontrado :/"})
    } else {
        dados.medicamento[idMedicamento].nome = atualizarMedicamento.nome || dados.medicamento[idMedicamento].nome

        dados.medicamento[idMedicamento].fabricante = atualizarMedicamento.fabricante || dados.medicamento[idMedicamento].fabricante

        dados.medicamento[idMedicamento].preco = atualizarMedicamento.preco || dados.medicamento[idMedicamento].preco

        dados.medicamento[idMedicamento].quantidade = atualizarMedicamento.quantidade || dados.medicamento[idMedicamento].quantidade

        salvarDados(dados)

        return res.json({mensagem: "Medicamento atualizado com sucesso!"})
    }
})

server.delete("/medicamento/:id", (req, res) => {
    const medicamentoId = parseInt(req.params.id)

    dados.medicamento = dados.medicamento.filter(m => m.id !== medicamentoId)

    salvarDados(dados)
    
    return res.status(200).json({mensagem: "Medicamento excluido com sucesso!"})
})

// ---------------------------------------------------------------------------------
//--------------------------------CLIENTES-------------------------------------------
server.post('/cliente', (req, res) => {
    const novoCliente = req.body

    if(!novoCliente.id || !novoCliente.nome || !novoCliente.endereco || !novoCliente.email || !novoCliente.telefone) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.cliente.push(novoCliente)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Novo cliente cadastrado com sucesso!"})
    }
})

server.get('/cliente', (req, res) => {
    return res.json(dados.cliente)
})

server.put('/cliente/:id', (req, res) => {

    const clienteId = parseInt(req.params.id)

    const atualizarCliente = req.body

    const idCliente = dados.cliente.findIndex(c => c.id === clienteId)

    if(idCliente === -1) {
        return res.status(404).json({mensagem: "Cliente não encontrado :/"})
    } else {
        dados.cliente[idCliente].nome = atualizarCliente.nome || dados.cliente[idCliente].nome

        dados.cliente[idCliente].endereco = atualizarCliente.endereco || dados.cliente[idCliente].endereco

        dados.cliente[idCliente].email = atualizarCliente.email || dados.cliente[idCliente].email

        dados.cliente[idCliente].telefone = atualizarCliente.telefone || dados.cliente[idCliente].telefone

        salvarDados(dados)

        return res.json({mensagem: "Cliente atualizado com sucesso!"})
    }
})

server.delete("/cliente/:id", (req, res) => {
    const clienteId = parseInt(req.params.id)

    dados.cliente = dados.cliente.filter(c => c.id !== clienteId)

    salvarDados(dados)
    
    return res.status(200).json({mensagem: "Cliente excluido com sucesso!"})
})
//--------------------------------------------------------------------------------
//------------------------------------FORNECEDOR----------------------------------
server.post('/Fornecedor', (req, res) => {
    const novoFornecedor = req.body

    if(!novoFornecedor.id || !novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.Fornecedor.push(novoFornecedor)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Novo Fornecedor cadastrado com sucesso!"})
    }
})

server.get('/Fornecedor', (req, res) => {
    return res.json(dados.users)
})

server.put('/Fornecedor/:id', (req, res) => {

    const FornecedorId = parseInt(req.params.id)

    const atualizarFornecedor = req.body

    const idFornecedor = dados.Fornecedor.findIndex(f => f.id === FornecedorId)

    if(idFornecedor === -1) {
        return res.status(404).json({mensagem: "Fornecedor não encontrado :/"})
    } else {
        dados.Fornecedor[idFornecedor].nome = atualizarFornecedor.nome || dados.Fornecedor[idFornecedor].nome

        dados.Fornecedor[idFornecedor].endereco = atualizarFornecedor.endereco || dados.Fornecedor[idFornecedor].endereco

        dados.Fornecedor[idFornecedor].telefone = atualizarFornecedor.telefone || dados.Fornecedor[idFornecedor].telefone

        salvarDados(dados)

        return res.json({mensagem: "Fornecedor atualizado com sucesso!"})
    }
})

server.delete("/Fornecedor/:id", (req, res) => {
    const FornecedorId = parseInt(req.params.id)

    dados.Fornecedor = dados.Fornecedor.filter(f => f.id !== FornecedorId)

    salvarDados(dados)
    
    return res.status(200).json({mensagem: "Fornecedor excluido com sucesso!"})
})
//---------------------------------------------------------------------------
//---------------------------------VENDA-----------------------------------
server.post('/Venda', (req, res) => {
    const novoVenda = req.body

    if(!novoVenda.id || !novoVenda.data || !novoVenda.id_medicamento || !novoVenda.id_medicamento) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.Venda.push(novoVenda)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Novo Venda cadastrado com sucesso!"})
    }
})

server.get('/Venda', (req, res) => {
    return res.json(dados.users)
})

server.put('/Venda/:id', (req, res) => {

    const VendaId = parseInt(req.params.id)

    const atualizarVenda = req.body

    const idVenda = dados.Venda.findIndex(v => v.id === VendaId)

    if(idVenda === -1) {
        return res.status(404).json({mensagem: "Venda não encontrado :/"})
    } else {
        dados.Venda[idVenda].nome = atualizarVenda.nome || dados.Venda[idVenda].nome

        dados.Venda[idVenda].data = atualizarVenda.data || dados.Venda[idVenda].data

        dados.Venda[idVenda].id_medicamento = atualizarVenda.id_medicamento || dados.Venda[idVenda].id_medicamento

        dados.Venda[idVenda].id_cliente = atualizarVenda.id_cliente || dados.Venda[idVenda].id_cliente

        salvarDados(dados)

        return res.json({mensagem: "Venda atualizado com sucesso!"})
    }
})

server.delete("/Venda/:id", (req, res) => {
    const VendaId = parseInt(req.params.id)

    dados.Venda = dados.Venda.filter(v => v.id !== VendaId)

    salvarDados(dados)
    
    return res.status(200).json({mensagem: "Venda excluido com sucesso!"})
})
//----------------------------FIM----------------------------------