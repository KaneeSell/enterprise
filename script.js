const painelConteudo = document.getElementById('painel-conteudo')
const logTeste = document.getElementById('logTeste')
function teste(teste = "Teste"){
    logTeste.innerHTML = `<h1 onclick="closeTeste()">${teste}</h1><h2></h2>`
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

//Cliente
function ativCliente(){
    var propriedadeCliente = elementoStyle("cliente", "display")
    if(propriedadeCliente == "none"){
        document.getElementById("principal").style.display = "none"
        document.getElementById("cliente").style.display = "block"
        document.getElementById("produto").style.display = "none"
        document.getElementById("estoque").style.display = "none"
    }
    else {
        document.getElementById("cliente").style.display = "none"
        document.getElementById("principal").style.display = "block"
    }
}
function ativCadastro(){
    var propriedadeCadastro = elementoStyle("formCliente", "display")
    if(propriedadeCadastro == "none"){
        document.getElementById("formCliente").style.display = "block"
        document.getElementById("formProcurarCliente").style.display = "none"
        document.forms["formProcurarCliente"]["inputNomeProcuraCliente"].value = ''
    }
    else {
        document.getElementById("formCliente").style.display = "none"
        document.getElementById("erroNomeCadastro").innerText = ''
        document.forms["formCliente"]["inputNomeCliente"].value = ''
        document.forms["formCliente"]["inputAtivoCliente"].checked = true
    }
}
function criarCliente(e){
    e.preventDefault();
    if(!(JSON.parse(localStorage.getItem('clientes')))){localStorage.setItem('clientes', JSON.stringify([]))}
    var nomeCliente = document.forms["formCliente"]["inputNomeCliente"].value
    document.forms["formCliente"]["inputNomeCliente"].value = ''
    var statusCliente = document.forms["formCliente"]["inputAtivoCliente"].checked? "Sim":"Não"
    document.forms["formCliente"]["inputAtivoCliente"].checked = true
    const erroNomeCadastro = document.getElementById("erroNomeCadastro")
    const clientes = JSON.parse(localStorage.getItem("clientes"))
    if(nomeCliente != ""){
        let achados = 0
        let x = true
        for(let i = 0; x == true;i++){
            if(clientes[i] && clientes[i].nome){
                let nomeClientetesteget = clientes[i].nome
                if(nomeClientetesteget == nomeCliente){x = false}
                erroNomeCadastro.innerText = 'Já Existe Cliente com esse nome!'
            }
            else{
                x = false
                clientes.push({ 'nome': nomeCliente, 'ativo': statusCliente });
                // Atualiza o localStorage com a nova lista de clientes
                localStorage.setItem("clientes", JSON.stringify(clientes));
                let nomeClienteteste = JSON.parse(localStorage.getItem("clientes"))[i].nome
                let ativoClienteteste = JSON.parse(localStorage.getItem("clientes"))[i].ativo
                erroNomeCadastro.innerText = `Cliente Criado com Sucesso!
                Nome: ${nomeClienteteste}, Ativo? ${ativoClienteteste}`
            }
        }
        if(achados > 0){
        procurarCadastro.innerText = `${achados} Clientes encontrados com mesmo nome!`
        }
        else{
        }

    }
    else {
        erroNomeCadastro.innerText = 'Informar nome do Cliente!'
    }
}
//Remover Cliente
function removeCliente(i){
    const clientes = JSON.parse(localStorage.getItem("clientes"))
    clientes.splice(i, 1)
    localStorage.setItem("clientes", JSON.stringify(clientes));
    // Atualiza o localStorage com a nova lista de clientes
    procurarCliente()
}
//Editar Cliente
function editarCliente(i){
    const clientes = JSON.parse(localStorage.getItem("clientes"))
    nomeAntigo = clientes[i].nome
    let novoNome = prompt("Novo nome:")
    if(novoNome == null || novoNome == ""){novoNome = nomeAntigo}
    let novoStatus = confirm("Ativo?")?"Sim":"Não";
    alert(novoNome + " = " + novoStatus)
    clientes[i].nome = novoNome;
    clientes[i].ativo = novoStatus;
    localStorage.setItem("clientes", JSON.stringify(clientes));
    // Atualiza o localStorage com a nova lista de clientes
    procurarCliente()
}
//Procurar Clientes
function ativProcurarCliente(){
    var propriedadeCadastro = elementoStyle("formProcurarCliente", "display")
    if(propriedadeCadastro == "none"){
        document.getElementById("formProcurarCliente").style.display = "block"
        document.getElementById("formCliente").style.display = "none"
        document.getElementById("erroNomeCadastro").innerText = ''
        document.forms["formCliente"]["inputNomeCliente"].value = ''
        document.forms["formCliente"]["inputAtivoCliente"].checked = true
    }
    else {
        document.getElementById("formProcurarCliente").style.display = "none"
        document.forms["formProcurarCliente"]["inputNomeProcuraCliente"].value = ''
        document.forms["formProcurarCliente"]["inputProcurarAtivoCliente"].checked = true
    }
    procurarCliente()
}
function procurarCliente(e = ''){
    if(e != ''){e.preventDefault();}
    if(!(JSON.parse(localStorage.getItem('clientes')))){localStorage.setItem('clientes', JSON.stringify([]))}
    const procurarCadastro = document.getElementById('procurarCadastro')
    const clientes = JSON.parse(localStorage.getItem("clientes"))
    var nomeCliente = document.forms["formProcurarCliente"]["inputNomeProcuraCliente"].value
    var statusAtivoCliente = document.forms["formProcurarCliente"]["inputProcurarAtivoCliente"].checked? "Sim":"Não"
    var statusInativoCliente = document.forms["formProcurarCliente"]["inputProcurarAtivoCliente"].checked? "Sim":"Não"
    let x = true
    let achados = 0
    let logClientes = ''
    for(let i = 0; x == true;i++){
        if(clientes[i] && clientes[i].nome){
            // teste('Entro na condicional!')
            let nomeClientetesteget = clientes[i].nome
            let ativoClientetesteget = clientes[i].ativo
            let inativoClientetesteget = clientes[i].ativo? "Sim":"Não"
            let verificador = true
            let divClientes = `<div class="divCliente"><input type="button" value="editar" class="editarCliente" onclick="editarCliente(${i})"><input type="button" value="Apagar" class="removeCliente" onclick="removeCliente(${i})"><h3>${nomeClientetesteget}</h3><h4 class="${ativoClientetesteget =="Sim"?"atv":"ina"}">${ativoClientetesteget =="Sim"?"Ativo":"Inativo"}</h4></div>`
            if(nomeClientetesteget == nomeCliente && verificador == true && statusAtivoCliente == ativoClientetesteget){
                verificador = false
                achados++
                logClientes += divClientes
            }
            if(ativoClientetesteget == statusAtivoCliente && verificador == true && nomeCliente == ''){
                verificador = false
                achados++
                logClientes += divClientes
            }
            if(inativoClientetesteget == statusInativoCliente && verificador == true && nomeCliente == ''){
                achados++
                logClientes += divClientes
            }
        }
        else{x = false}
    }
    if(achados > 0){
    procurarCadastro.innerHTML = `${achados} Clientes encontrados:<br>${logClientes}`
    }
    else{
    procurarCadastro.innerHTML = 'Nenhum Cliente Encontrado!'
    }
}
//Produto
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
//Estoque
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