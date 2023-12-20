document.addEventListener('DOMContentLoaded', function () {
    loadMedicamentosList();
    document.getElementById('formAdicionarMedicamento').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarMedicamento();
    });
});

function adicionarMedicamento() {
    const id = document.getElementById('idMedicamento').value;
    const nome_medicamento = document.getElementById('nomeMedicamento').value;
    const nome_fabricante = document.getElementById('fabricanteMedicamento').value;
    const preco = document.getElementById('precoMedicamento').value;
    const quantidade = document.getElementById('quantidadeMedicamento').value;

    fetch('http://localhost:3000/api/medicamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome_medicamento: nome_medicamento,
            nome_fabricante: nome_fabricante,
            preco: preco,
            quantidade: quantidade
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadMedicamentosList();
        })
        .catch(error => console.error("Erro:", error));
}

function loadMedicamentosList() {
    fetch('http://localhost:3000/api/medicamentos')
        .then(response => response.json())
        .then(data => displayMedicamentosList(data))
        .catch(error => console.error("Erro:", error));
}

function displayMedicamentosList(data) {
    const listaMedicamentos = document.getElementById('listaMedicamentos');
    listaMedicamentos.innerHTML = '';

    data.forEach(medicamento => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${medicamento.id} - Nome: ${medicamento.nome_medicamento} - Fabricante: ${medicamento.nome_fabricante} - Preço: ${medicamento.preco} - Quantidade: ${medicamento.quantidade}`;
        listaMedicamentos.appendChild(listItem);
    });
}
