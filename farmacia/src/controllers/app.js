const express = require('express')
const server = express()
const dados = require('./data/dados.json')
const clientesRouter = require('./controllerClientes')
const fornecedorRouter = require('./fornecedor')
const medicamentoRouter = require('./medicamento')
const vendaRouter = require('./venda')

const fs = require('fs')
const cors = require('cors')

// função para utilizar o servidor
server.use(express.json())
server.use(cors())

server.use('/api', clientesRouter.server)
//server.use('/api', fornecedorRouter.fornecedor)
// server.use('/api', medicamentoRouter.server)
// server.use('/api', vendaRouter.server)


// mensagem no terminal para indicar o funcionamento
server.listen(3000, () =>{
    console.log(`O servidor está funcionando! :D`);
})
