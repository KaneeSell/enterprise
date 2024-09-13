const painelConteudo = document.getElementById('painel-conteudo')

//Funções
function elementoStyle(id, element){
    var elemento = document.getElementById(id);
    var propriedade = window.getComputedStyle(elemento).getPropertyValue(element);
    return propriedade
}
//Cliente
function ativCliente(){
    var propriedadeCliente = elementoStyle("cliente", "display")
    if(propriedadeCliente == "none"){
        document.getElementById("cliente").style.display = "block"
        document.getElementById("produto").style.display = "none"
        document.getElementById("estoque").style.display = "none"
    }
    else {
        document.getElementById("cliente").style.display = "none"
    }
}
function criarCliente(e){
    e.preventDefault();
    const nomeCliente = document.getElementById('formCliente')
}
//Produto
function ativProduto(){
    var propriedadeProduto = elementoStyle("produto", "display")
    if(propriedadeProduto == "none"){
        document.getElementById("cliente").style.display = "none"
        document.getElementById("produto").style.display = "block"
        document.getElementById("estoque").style.display = "none"
    }
    else {
        document.getElementById("produto").style.display = "none"
    }
}
//Estoque
function ativEstoque(){
    var propriedadeEstoque = elementoStyle("estoque", "display")
    if(propriedadeEstoque == "none"){
        document.getElementById("cliente").style.display = "none"
        document.getElementById("produto").style.display = "none"
        document.getElementById("estoque").style.display = "block"
    }
    else {
        document.getElementById("estoque").style.display = "none"
    }
}