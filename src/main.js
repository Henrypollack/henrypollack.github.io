document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('.image-flip');
    var images = document.querySelectorAll('.image-flip .flip-img');
    var currentIndex = 0;

    function adjustContainerHeight() {
        // Ajusta a altura do contêiner com base na imagem visível
        var visibleImage = images[currentIndex];
        container.style.height = visibleImage.clientHeight + 'px';
    }

    function flipImages() {
        images[currentIndex].classList.remove('show');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('show');
        adjustContainerHeight();
    }

    images[currentIndex].classList.add('show');
    adjustContainerHeight(); // Ajusta a altura inicial do contêiner
    setInterval(flipImages, 6000);
});

document.addEventListener('DOMContentLoaded', function() {
    // Adiciona o primeiro campo de seleção de dias
    adicionarCampoDia();

    // Adiciona o evento de click ao botão de enviar formulário
    document.getElementById('enviarFormularioBtn').addEventListener('click', function() {
        const cabecalhoObj = new Cabecalho("nome");
        const resultadoCabecalho = cabecalhoObj.inputCabecalho();

        const hrini = Array.from(document.querySelectorAll('.hrini')).map(select => select.value);
        const hrfin = Array.from(document.querySelectorAll('.hrfin')).map(select => select.value);
        const diasTra = Array.from(document.querySelectorAll('.diasTrab')).map(select => select.value);

        const dataObj = new Datas("Nome do usuário");
        const listaDeDatas = dataObj.inputDia(diasTra, hrini, hrfin);

        document.getElementById('resultado').innerHTML = resultadoCabecalho + '<br><br>' + listaDeDatas;
    });

    // Adiciona o evento de click ao botão de copiar para clipboard
    document.getElementById('copiarBtn').addEventListener('click', function() {
        const resultado = document.getElementById('resultado');
        const range = document.createRange();
        range.selectNode(resultado);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        try {
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            alert('Texto copiado para o clipboard!');
        } catch (err) {
            alert('Falha ao copiar o texto. Tente novamente.');
        }
    });
});
