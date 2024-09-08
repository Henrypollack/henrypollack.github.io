class Datas {
    constructor(nome) {
        this.nome = nome;
        this.listaDatas = [];
    }

    inputDia(diasTra, hrini, hrfin) {
        diasTra.forEach((dia, index) => {
            // Converter a data para o formato "dd/mm/aaaa"
            const dataFormatada = dia.split('-').reverse().join('/');
            this.listaDatas.push(`* ${dataFormatada} - ${hrini[index]} às ${hrfin[index]}`);
        });
        return this.listaDatas.join('<br>');
    }
}

function adicionarCampoDia() {
    const tabelaBody = document.getElementById('diasTrabalhadosContainer');

    // Criar uma nova linha
    const novaLinha = tabelaBody.insertRow();

    // Criar os campos de input para a data, hora de entrada e hora de saída
    const novoInputData = document.createElement('input');
    novoInputData.type = 'date';
    novoInputData.className = 'diasTrab';
    novoInputData.name = 'diasTrab';

    const hriniSelect = document.createElement('select');
    hriniSelect.className = 'hrini';
    hriniSelect.name = 'hrini';

    const hrfinSelect = document.createElement('select');
    hrfinSelect.className = 'hrfin';
    hrfinSelect.name = 'hrfin';

    adicionarOpcaoHoras(hriniSelect);
    adicionarOpcaoHoras(hrfinSelect);

    // Adicionar os campos à nova linha
    let celula = novaLinha.insertCell();
    celula.appendChild(novoInputData);

    celula = novaLinha.insertCell();
    celula.appendChild(hriniSelect);

    celula = novaLinha.insertCell();
    celula.appendChild(hrfinSelect);

    celula = novaLinha.insertCell();
    // Criar botão de adicionar
    const adicionarBtn = document.createElement('button');
    adicionarBtn.type = 'button';
    adicionarBtn.className = 'adicionarDiaBtn';
    adicionarBtn.textContent = '+';
    adicionarBtn.addEventListener('click', adicionarCampoDia);
    celula.appendChild(adicionarBtn);

    // Criar botão de remover
    const removerBtn = document.createElement('button');
    removerBtn.type = 'button';
    removerBtn.className = 'removerDiaBtn';
    removerBtn.textContent = '-';
    removerBtn.addEventListener('click', () => novaLinha.remove());
    celula.appendChild(removerBtn);

    // Mostrar o botão de remover se já houver mais de uma linha
    if (tabelaBody.rows.length > 1) {
        removerBtn.style.display = 'inline-block';
    } else {
        removerBtn.style.display = 'none';
    }

    // Preencher a nova linha com os dados da linha anterior
    preencherCamposComValoresAnteriores(novoInputData, hriniSelect, hrfinSelect);
}

function preencherCamposComValoresAnteriores(novoInputData, hriniSelect, hrfinSelect) {
    const linhas = document.querySelectorAll('#diasTrabalhadosContainer tr');
    if (linhas.length > 1) {
        const ultimaLinha = linhas[linhas.length - 2];
        const ultimoDia = ultimaLinha.querySelector('.diasTrab');
        const ultimoDiaValue = ultimoDia ? ultimoDia.value : '';

        if (ultimoDiaValue) {
            const data = new Date(ultimoDiaValue);
            data.setDate(data.getDate() + 1); // Adiciona 1 dia
            novoInputData.value = data.toISOString().split('T')[0]; // Formata para o valor do input date
        }

        const ultimaHrIni = ultimaLinha.querySelector('.hrini');
        const ultimaHrFin = ultimaLinha.querySelector('.hrfin');

        if (ultimaHrIni) hriniSelect.value = ultimaHrIni.value;
        if (ultimaHrFin) hrfinSelect.value = ultimaHrFin.value;
    }
}

function adicionarOpcaoHoras(selectElement) {
    const horas = ["05:00","06:00","07:00","08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00","21:00","22:00","23:00","00:00"];
    horas.forEach(hora => {
        const opcao = document.createElement('option');
        opcao.value = hora;
        opcao.text = hora;
        selectElement.add(opcao);
    });
}

// Certifique-se de que a classe Datas e a função adicionarCampoDia estão disponíveis no escopo global
window.Datas = Datas;
window.adicionarCampoDia = adicionarCampoDia;
