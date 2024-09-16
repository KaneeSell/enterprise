//Ativar div Estoque
function ativEstoque(){
    var propriedadeEstoque = elementoStyle("estoque", "display")
    if(propriedadeEstoque == "none"){
        document.getElementById("principal").style.display = "none"
        document.getElementById("cliente").style.display = "none"
        document.getElementById("produto").style.display = "none"
        document.getElementById("estoque").style.display = "block"
    }
    else {
        document.getElementById("estoque").style.display = "none"
        document.getElementById("principal").style.display = "block"
    }
}