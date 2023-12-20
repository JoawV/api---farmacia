document.addEventListener('DOMContentLoaded', function (){
    loadClientesList();

    document.getElementById('formAdicionarCliente').addEventListener('submit', function (event){
        event.preventDefault();
        adicionarCliente();
    });
});

function adicionarCliente() {
    const id = document.getElementById('idCliente').value;
    const nome = document.getElementById('nomeCliente').value;
    const endereco = document.getElementById('enderecoCliente').value;
    const email = document.getElementById('emailCliente').value;
    const telefone = document.getElementById('telefoneCliente').value;

    fetch('http://localhost:3000/api/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            endereco: endereco,
            email: email,
            telefone: telefone
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadClientesList();
    })
    .catch(error => console.error(error));
}

function loadClientesList() {
    fetch('http://localhost:3000/api/clientes')
        .then(response => response.json())
        .then(data => displayClientesList(data))
        .catch(error => console.error(error));
}

function displayClientesList(data) {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = '';

    data.forEach(cliente => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            ID: ${cliente.id} - Nome: ${cliente.nome} - Endereço: ${cliente.endereco} - Email: ${cliente.email} - Telefone: ${cliente.telefone}
            <ul>
                <li><a href="${cliente._links.self.href}">Detalhes</a></li>
                <li><a href="${cliente._links.update.href}">Atualizar</a></li>
                <li><a href="${cliente._links.delete.href}" onclick="excluirCliente('${cliente.id}')">Excluir</a></li>
            </ul>
        `;

        listaClientes.appendChild(listItem);
    });
}

function excluirCliente(id) {
    fetch(`http://localhost:3000//clientes/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadClientesList();
    })
    .catch(error => console.error(error));
}
