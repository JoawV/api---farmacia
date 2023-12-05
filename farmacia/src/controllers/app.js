const express = require('express');
const server = express();
const dados = require('./data/dadosClientes.json');
const clientesRouter = require('./controllerClientes.js');
const cors = require('cors');
const fs = require('fs');

server.use(express.json());
server.use(cors());

server.use('/api', clientesRouter.server);

server.listen(3000, () => {
    console.log('O servidor está funcionando! :D');
});
