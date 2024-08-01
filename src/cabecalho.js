class Cabecalho {
    constructor(nomee) {
        this.nomee = nomee;
        this.listaCabecalho = [];
    }

    inputCabecalho() {
        let nomeUs = document.getElementById('nome').value;
        const pix = document.getElementById('pix').value;
        const local = document.getElementById('local').value;
        const area = document.getElementById('area').value;

        // Capitaliza a primeira letra de cada palavra
        nomeUs = nomeUs.split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()).join(' ');

        this.listaCabecalho.push(`*Nome:* _${nomeUs}_\n`);
        this.listaCabecalho.push(`*Pix:* _${pix}_\n`);
        this.listaCabecalho.push(`_${local}_\n`);
        this.listaCabecalho.push(`_${area}_`);

        return this.listaCabecalho.join('<br>');
    }
}

// Certifique-se de que a classe Cabecalho está disponível no escopo global
window.Cabecalho = Cabecalho;
