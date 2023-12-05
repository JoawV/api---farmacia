document.addEventListener('DOMContentLoaded', function () {
    // Carregar a lista de clientes ao carregar a página
    loadClientesList();
    // Adicionar um ouvinte de evento ao formulário para adicionar clientes
    document.getElementById('formAdicionarCliente').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarCliente();
    });
});
function adicionarCliente() {
    const nome = document.getElementById('nomeCliente').value;
    const endereco = document.getElementById('enderecoCliente').value;
    const email = document.getElementById('emailCliente').value;
    const telefone = document.getElementById('telefoneCliente').value;
    fetch('http://localhost:3000/api/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: nome,
            endereco: endereco,
            email: email,
            telefone: telefone,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadClientesList(); // Recarregar a lista após adicionar um cliente
        })
        .catch(error => console.error('Error:', error));
}
function loadClientesList() {
    fetch('http://localhost:3000/api/clientes')
        .then(response => response.json())
        .then(data => displayClientesList(data))
        .catch(error => console.error('Error:', error));
}
function displayClientesList(data) {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = '';
    data.forEach(cliente => {
        const listItem = document.createElement('li');
        listItem.textContent = `Nome: ${cliente.nome} - Endereço: ${cliente.endereco} - Email: ${cliente.email} - Telefone: ${cliente.telefone}`
        listaClientes.appendChild(listItem);
    });
}
