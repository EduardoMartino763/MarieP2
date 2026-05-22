//Tempo

const tempoE1 = document.getElementById("tempo");

let tempo = 30000;
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
        resposta: 12,
        dica: "A resposta está entre 10 e 15",
        alternativas: [10, 12, 30, 46]
    },

    {
        pergunta: "Se três canetas custam R$12,60, quanto custaria apenas uma caneta?",
        resposta: 4.20,
        dica: "Divisão",
        alternativas: [4.20, 2.60, 5.0, 4.0]
    },

    {
        pergunta: "Qual é o resultado da expressão: 15 - 3 * 4 + 2?",
        resposta: 5,
        dica: "Inicie pela Multiplicação e depois some com o resultado da subtração",
        alternativas: [5, 9, 3, 10]
    },

    {
        pergunta: "Quanto é 12 elevado a 3 (12³)",
        resposta: 1728,
        dica: "12 elevado a 3 seria 12 vezes ele mesmo 3 vezes (12 * 12 * 12)",
        alternativas: [942, 1975, 1728, 643]
    },
];

let indiceAtual = 0;

const titulo = document.getElementById("tituloQuestao");
const texto = document.getElementById("pergunta");
const inputResposta = document.getElementById("respostaInput");

function mostrarQuestao() {
    
    
    if (indiceAtual < questoes.length) {
        
        document.getElementById("DicaPergunta").innerText = "";

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

    const respostaUsuario = Number(inputResposta.value);

    const respostaCorreta = questoes[indiceAtual].resposta;

    if (respostaUsuario === respostaCorreta) {

        let pontosGanhos = pontuacao_dica ? 50 : 100;

        pontuacao += pontosGanhos;

        atualizarPontuacao();

        alert(`Resposta Correta! +${pontosGanhos} pontos`);

    } else {

        alert("Resposta incorreta!");

    }

    indiceAtual++;

        inputResposta.value = "";

        pontuacao_dica = false;

        mostrarQuestao();
}

mostrarQuestao();

let cartaDicaUsada = false;
let cartaMultUsada = false;
let cartaPularUsada = false;

function usarDica() {
    if (cartaDicaUsada) {
        alert("Você já usou esta carta!");
        return;
    }

    cartaDicaUsada = true;

    pontuacao_dica = true;

    document.getElementById("DicaPergunta").innerText =
        questoes[indiceAtual].dica;

    document.getElementById("btnDica").disabled = true;
    
    document.getElementById("btnDica").classList.add("usada");
    
}

function usarPular() {
    
    if (cartaPularUsada) {
        alert("Você já usou esta carta!");
        return;
    }
    
    cartaPularUsada = true;
    
    indiceAtual++;
    
    document.getElementById("DicaPergunta").innerText = "";
    
    mostrarQuestao();
    
    document.getElementById("btnSkip").classList.add("usada");
    
    document.getElementById("btnSkip").disabled = true;
}

function usarMult() {
    
    if (cartaMultUsada) {
        alert("Você já usou esta carta!");
        return;
    }
    
    cartaMultUsada = true;
    
    const alternativas = questoes[indiceAtual].alternativas;

    const div = document.getElementById("alternativas");

    div.innerHTML = "";

    for (let i = 0; i < alternativas.length; i++) {
        const botao = document.createElement("button");

        botao.innerText = alternativas[i];

        botao.onclick = function() {
            verificarRespostaMultipla(alternativas[i]);
        };

        div.appendChild(botao);
    }

    document.getElementById("btnMult").classList.add("usada");
    
    document.getElementById("btnMult").disabled = true;
}

function verificarRespostaMultipla(respostaEscolhida) {
    const respostaCorreta = questoes[indiceAtual].resposta;

    if (respostaEscolhida === respostaCorreta) {

        pontuacao += 50;

        atualizarPontuacao();

        alert("Correto!");
    } else {
        alert("Errado!");
    }

    indiceAtual++;

    document.getElementById("alternativas").innerHTML = "";

    mostrarQuestao();
}

//Pontuação

let pontuacao = 0;

let pontuacao_dica = false;

function atualizarPontuacao() {
    document.getElementById("score").innerText =
        `${pontuacao}`;
}