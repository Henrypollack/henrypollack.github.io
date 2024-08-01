class Datas {
    constructor(nome) {
        this.nome = nome;
        this.listaDatas = [];
    }

    inputDia(diasTra, hrini, hrfin) {
        diasTra.forEach((dia, index) => {
            this.listaDatas.push(`* ${dia} - ${hrini[index]} às ${hrfin[index]}`);
        });
        return this.listaDatas.join('<br>');
    }
}

function adicionarCampoDia() {
    const tabelaBody = document.getElementById('diasTrabalhadosContainer');

    // Criar uma nova linha
    const novaLinha = tabelaBody.insertRow();

    // Criar os campos select para o dia, hora de entrada e hora de saída
    const novoSelect = document.createElement('select');
    novoSelect.className = 'diasTrab';
    novoSelect.name = 'diasTrab';

    const hriniSelect = document.createElement('select');
    hriniSelect.className = 'hrini';
    hriniSelect.name = 'hrini';

    const hrfinSelect = document.createElement('select');
    hrfinSelect.className = 'hrfin';
    hrfinSelect.name = 'hrfin';

    adicionarOpcaoDias(novoSelect);
    adicionarOpcaoHoras(hriniSelect);
    adicionarOpcaoHoras(hrfinSelect);

    // Adicionar os campos à nova linha
    let celula = novaLinha.insertCell();
    celula.appendChild(novoSelect);

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
    preencherCamposComValoresAnteriores(novoSelect, hriniSelect, hrfinSelect);
}

function preencherCamposComValoresAnteriores(novoSelect, hriniSelect, hrfinSelect) {
    const linhas = document.querySelectorAll('#diasTrabalhadosContainer tr');
    if (linhas.length > 1) {
        const ultimaLinha = linhas[linhas.length - 2];
        const ultimoDia = ultimaLinha.querySelector('.diasTrab');
        const ultimoDiaValue = ultimoDia ? ultimoDia.value : '';

        // Adicionar 1 dia ao valor selecionado
        if (ultimoDiaValue) {
            const [dia, mes, ano] = ultimoDiaValue.split('/').map(Number);
            const data = new Date(ano, mes - 1, dia);
            data.setDate(data.getDate() + 1); // Adiciona 1 dia
            const novoDia = `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
            novoSelect.value = novoDia;
        }

        const ultimaHrIni = ultimaLinha.querySelector('.hrini');
        const ultimaHrFin = ultimaLinha.querySelector('.hrfin');

        if (ultimaHrIni) hriniSelect.value = ultimaHrIni.value;
        if (ultimaHrFin) hrfinSelect.value = ultimaHrFin.value;
    }
}

function adicionarOpcaoDias(selectElement) {
    const mes = new Date().getMonth() + 1;
    const ano = new Date().getFullYear();
    const diasNoMes = new Date(ano, mes, 0).getDate();

    for (let dia = 1; dia <= diasNoMes; dia++) {
        const diaStr = dia.toString().padStart(2, '0');
        const opcao = document.createElement('option');
        opcao.value = `${diaStr}/${mes.toString().padStart(2, '0')}/${ano}`;
        opcao.text = `${diaStr}/${mes.toString().padStart(2, '0')}/${ano}`;
        selectElement.add(opcao);
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
