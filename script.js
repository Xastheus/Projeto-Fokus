const html = document.querySelector("html");

const focoBotao = document.querySelector(".app__card-button--foco");
const curtoBotao = document.querySelector(".app__card-button--curto");
const longoBotao = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBotao = document.getElementById('start-pause');
const musicaFocoInput = document.getElementById('alternar-musica');
const iniciarOuPausarBotao = document.querySelector('#start-pause span');
const iniciarOuPausarBotaoIcone = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.getElementById('timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
const somPlayInput = document.getElementById('start-pause');
const somPlay = new Audio('/sons/play.wav');
const somPause = new Audio ('/sons/pause.mp3');
const somTempoFinalizado = new Audio("/sons/beep.mp3");

let tempoDecorridoEmSegundos = 1500;
let intervaloID = null;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

const foco = 1500;
const curto = 300;
const longo = 900;


focoBotao.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexo('foco');
    focoBotao.classList.add('active');
})

curtoBotao.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexo('descanso-curto');
    curtoBotao.classList.add("active");
})

longoBotao.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexo('descanso-longo');
    longoBotao.classList.add("active");
})

function alterarContexo(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active");
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src',`/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`   
           break;
        
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">faça uma pausa curta.</strong>`;
                break;

        case "descanso-longo": titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">faça uma pausa longa.</strong>`

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somTempoFinalizado.play();
        alert ('Tempo finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos-= 1;
    mostrarTempo();
    
}

startPauseBotao.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloID) {
        somPause.play();
        zerar ();
        return;
    }
    somPlay.play();
    intervaloID = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBotao.textContent = 'Pausar';
    iniciarOuPausarBotaoIcone.setAttribute('src', `/imagens/pause.png`);

}

function zerar() {
    clearInterval(intervaloID);
    iniciarOuPausarBotao.textContent = 'Começar'
    iniciarOuPausarBotaoIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloID = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();