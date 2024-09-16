//Ativar div Produtos
function ativProduto(){
    var propriedadeProduto = elementoStyle("produto", "display")
    if(propriedadeProduto == "none"){
        document.getElementById("principal").style.display = "none"
        document.getElementById("cliente").style.display = "none"
        document.getElementById("produto").style.display = "block"
        document.getElementById("estoque").style.display = "none"
    }
    else {
        document.getElementById("produto").style.display = "none"
        document.getElementById("principal").style.display = "block"
    }
}