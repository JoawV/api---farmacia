const express = require('express')
const server = express()
const dados = require('./data/dados.json')
const fs = require('fs')

server.use(express.json())

server.listen(3000, () =>{
    console.log(`O servidor está funcionando! :D`);
})

server.post('/usuarios', (req, res) => {
    const novoUsuario = req.body

    if(!novoUsuario.id || !novoUsuario.nome || !novoUsuario.idade || !novoUsuario.curso) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.users.push(novoUsuario)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Novo usuario cadastrado com sucesso!"})
    }
})

server.get('/usuarios', (req, res) => {
    return res.json(dados.users)
})

server.put('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id)

    const atualizarUsuario = req.body

    const idUsuario = dados.users.findIndex(u => u.id === usuarioId)

    if (idUsuario === -1) {
        return res.status(404).json({mensagem: "Usuário não encontrado :/"})
    } else {
        dados.users[idUsuario].nome = atualizarUsuario.nome || dados.users[idUsuario].nome
        dados.users[idUsuario].idade = atualizarUsuario.idade || dados.users[idUsuario].idade
        dados.users[idUsuario].curso = atualizarUsuario.curso || dados.users[idUsuario].curso

        salvarDados(dados)

        return res.json({mensagem: "Usuario atualizado com sucesso!"})
    }
})

server.delete("/usuarios/:id", (req, res) => {
    const usuarioId = parseInt(req.params.id)

    dados.users = dados.users.filter(u => u.id !== usuarioId)
    salvarDados(dados)

    return res.status(200).json({mensagem: "Usuário excluido com sucesso"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2))
}