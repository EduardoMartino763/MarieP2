//Tempo

const tempoE1 = document.getElementById("tempo");

let tempo = 120;
let cronometro = null;

function atualizarTempo() {
    tempoE1.textContent = tempo;
}

function iniciarCronometro() {
    cronometro = setInterval(() => {
        tempo--;

        atualizarTempo();

        if (tempo <= 0) {
            tempo = 0;
            atualizarTempo();
            clearInterval(cronometro);
            tempoEsgotado();
        }
    }, 1000);

}

function reiniciarCronometro(novoTempo = 30) {
    clearInterval(cronometro);
    tempo = novoTempo;
    atualizarTempo();
    iniciarCronometro();
}

function tempoEsgotado() {
    alert("Tempo esgotado!");
}

atualizarTempo();
iniciarCronometro();


//Perguntas

const questoes = [
    {
        pergunta: "Um produto custa R$ 80 e recebe um desconto de 15%. Qual é o valor do desconto em reais?",
        resposta: 12
    },

    {
        pergunta: "Se três canetas custam R$12,60, quanto custaria apenas uma caneta?",
        resposta: 4.20
    },

    {
        pergunta: "Qual é o resultado da expressão: 15 - 3 * 4 + 2?",
        resposta: 5
    },

    {
        pergunta: "Quanto é 12 elevado a 3 (12³)",
        resposta: 1728
    },
];

let indiceAtual = 0;

const titulo = document.getElementById("tituloQuestao");
const texto = document.getElementById("pergunta");
const inputResposta = document.getElementById("respostaInput");

function mostrarQuestao() {

    if (indiceAtual < questoes.length) {

        titulo.innerText = `Questão ${indiceAtual + 1}`;
        texto.innerText = questoes[indiceAtual].pergunta;
    } else {
        titulo.innerText = "Fim do Quiz";
        texto.innerText = "Você respondeu todas as questões.";

        document.querySelector(".resposta").style.display = "none";
    }

}

//Função para verificar se a resposta está correta

function verificarResposta() {
    const respostaUsuario = questoes[indiceAtual].resposta;

    if (respostaUsuario === respostaCorreta) {

        alert("Resposta Correta!");

        indiceAtual++;

        inputResposta.value = "";

        mostrarQuestao();
    } else {

        alert("Resposta incorreta!");

        indiceAtual++;

        inputResposta.value = "";

        mostrarQuestao();
    }
}