/* <- Funções -> */

//Propriedade do elemento CSS
function elementoStyle(id, element){
    var elemento = document.getElementById(id);
    var propriedade = window.getComputedStyle(elemento).getPropertyValue(element);
    return propriedade
}

/* <- Botões Links Ativar -> */
function ativaPrincipal(){
    document.getElementById("principal").style.display = "flex"
    document.getElementById("input-cliente").style.display = "none"
    document.getElementById("output-cliente").style.display = "none"
    document.getElementById("input-produto").style.display = "none"
    document.getElementById("output-produto").style.display = "none"
    document.getElementById("input-estoque").style.display = "none"
    document.getElementById("output-estoque").style.display = "none"
}
/* <- Clientes Ativar -> */
function ativaCliente(){
    document.getElementById("principal").style.display = "none"
    document.getElementById("input-cliente").style.display = "flex"
    document.getElementById("output-cliente").style.display = "flex"
    document.getElementById("input-produto").style.display = "none"
    document.getElementById("output-produto").style.display = "none"
    document.getElementById("input-estoque").style.display = "none"
    document.getElementById("output-estoque").style.display = "none"
}
/* <- Produtos Ativar -> */
function ativaProduto(){
    document.getElementById("principal").style.display = "none"
    document.getElementById("input-cliente").style.display = "none"
    document.getElementById("output-cliente").style.display = "none"
    document.getElementById("input-produto").style.display = "flex"
    document.getElementById("output-produto").style.display = "flex"
    document.getElementById("input-estoque").style.display = "none"
    document.getElementById("output-estoque").style.display = "none"
}
/* <- Estoque Ativar -> */
function ativaEstoque(){
    document.getElementById("principal").style.display = "none"
    document.getElementById("input-cliente").style.display = "none"
    document.getElementById("output-cliente").style.display = "none"
    document.getElementById("input-produto").style.display = "none"
    document.getElementById("output-produto").style.display = "none"
    document.getElementById("input-estoque").style.display = "flex"
    document.getElementById("output-estoque").style.display = "flex"
}