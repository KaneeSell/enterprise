const painelConteudo = document.getElementById('painel-conteudo')
const logTeste = document.getElementById('logTeste')
function teste(teste = "Teste"){
    let tes = document.getElementById("statusSeletor").value
    logTeste.innerHTML = `<h1 onclick="closeTeste()">${tes}</h1><h2></h2>`
}
function closeTeste(){
    logTeste.innerHTML = ''
}

//Funções
function elementoStyle(id, element){
    var elemento = document.getElementById(id);
    var propriedade = window.getComputedStyle(elemento).getPropertyValue(element);
    return propriedade
}



