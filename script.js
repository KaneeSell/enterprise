/* <- Funções -> */

//Propriedade do elemento CSS
function elementoStyle(id, element){
    var elemento = document.getElementById(id);
    var propriedade = window.getComputedStyle(elemento).getPropertyValue(element);
    return propriedade
}