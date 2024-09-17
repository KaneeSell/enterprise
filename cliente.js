//Ativar div Cliente
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
//Ativar div Cadastro
function ativCadastroCliente(){
    var propriedadeCadastro = elementoStyle("formCliente", "display")
    if(propriedadeCadastro == "none"){
        document.getElementById("formCliente").style.display = "block"
        document.getElementById("formProcurarCliente").style.display = "none"
        document.forms["formProcurarCliente"]["inputNomeProcuraCliente"].value = ''
    }
    else {
        document.getElementById("formCliente").style.display = "none"
        document.getElementById("erroNomeCadastroCliente").innerText = ''
        document.forms["formCliente"]["inputNomeCliente"].value = ''
        document.forms["formCliente"]["inputAtivoCliente"].checked = true
    }
}
//Criar Cliente
function criarCliente(e){
    e.preventDefault();
    if(!(JSON.parse(localStorage.getItem('clientes')))){localStorage.setItem('clientes', JSON.stringify([]))}
    var nomeCliente = document.forms["formCliente"]["inputNomeCliente"].value
    document.forms["formCliente"]["inputNomeCliente"].value = ''
    var statusCliente = document.forms["formCliente"]["inputAtivoCliente"].checked? "Sim":"Não"
    document.forms["formCliente"]["inputAtivoCliente"].checked = true
    const erroNomeCadastroCliente = document.getElementById("erroNomeCadastroCliente")
    const clientes = JSON.parse(localStorage.getItem("clientes"))
    if(nomeCliente != ""){
        let achados = 0
        let x = true
        for(let i = 0; x == true;i++){
            if(clientes[i] && clientes[i].nome){
                let nomeClientetesteget = clientes[i].nome
                if(nomeClientetesteget == nomeCliente){x = false}
                erroNomeCadastroCliente.innerText = 'Já Existe Cliente com esse nome!'
            }
            else{
                x = false
                clientes.push({ 'nome': nomeCliente, 'ativo': statusCliente });
                // Atualiza o localStorage com a nova lista de clientes
                localStorage.setItem("clientes", JSON.stringify(clientes));
                let nomeClienteteste = JSON.parse(localStorage.getItem("clientes"))[i].nome
                let ativoClienteteste = JSON.parse(localStorage.getItem("clientes"))[i].ativo
                erroNomeCadastroCliente.innerText = `Cliente Criado com Sucesso!
                Nome: ${nomeClienteteste}, Ativo? ${ativoClienteteste}`
            }
        }
        if(achados > 0){
            procurarCadastroCliente.innerText = `${achados} Clientes encontrados com mesmo nome!`
        }
        else{
        }

    }
    else {
        erroNomeCadastroCliente.innerText = 'Informar nome do Cliente!'
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
    clientes[i].nome = novoNome;
    clientes[i].ativo = novoStatus;
    localStorage.setItem("clientes", JSON.stringify(clientes));
    // Atualiza o localStorage com a nova lista de clientes
    procurarCliente()
}

//------------------------------------------------------------------------------

//Ativar div Procurar Clientes
function ativProcurarCliente(){
    var propriedadeCadastro = elementoStyle("formProcurarCliente", "display")
    if(propriedadeCadastro == "none"){
        document.getElementById("formProcurarCliente").style.display = "block"
        document.getElementById("formCliente").style.display = "none"
        document.getElementById("erroNomeCadastroCliente").innerText = ''
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

//Procurar Clientes
function procurarCliente(e = ''){
    if(e != ''){e.preventDefault();}
    if(!(JSON.parse(localStorage.getItem('clientes')))){localStorage.setItem('clientes', JSON.stringify([]))}
    const procurarCadastroCliente = document.getElementById('procurarCadastroCliente')
    const clientes = JSON.parse(localStorage.getItem("clientes"))
    var nomeCliente = document.forms["formProcurarCliente"]["inputNomeProcuraCliente"].value
    let x = true
    var statusSeletorCliente = document.forms["formProcurarCliente"]["statusSeletorCliente"].value
    let achados = 0
    let logClientes = ''
    for(let i = 0; x == true;i++){
        if(clientes[i] && clientes[i].nome){
            let nomeClientetesteget = clientes[i].nome
            let ativoClientetesteget = clientes[i].ativo
            let verificador = true
            let divClientes = `<div class="divCliente"><input type="button" value="editar" class="editarCliente" onclick="editarCliente(${i})"><input type="button" value="Apagar" class="removeCliente" onclick="removeCliente(${i})"><h3>${nomeClientetesteget}</h3><h4 class="${ativoClientetesteget =="Sim"?"atv":"ina"}">${ativoClientetesteget =="Sim"?"Ativo":"Inativo"}</h4></div>`
            if(nomeClientetesteget == nomeCliente && (ativoClientetesteget == statusSeletorCliente || statusSeletorCliente == '')){
                verificador = false
                achados++
                logClientes += divClientes
            }
            if(ativoClientetesteget == statusSeletorCliente && nomeCliente == '' && verificador == true){
                verificador = false
                achados++
                logClientes += divClientes
            }
            if(ativoClientetesteget == statusSeletorCliente && nomeCliente == '' && verificador == true){
                verificador = false
                achados++
                logClientes += divClientes
            }
            if(statusSeletorCliente == '' && nomeCliente == '' && verificador == true){
                verificador = false
                achados++
                logClientes += divClientes
            }
        }
        else{x = false}
    }
    if(achados > 0){
    procurarCadastroCliente.innerHTML = `${achados} Clientes encontrados:<br><br>${logClientes}`
    }
    else{
    procurarCadastroCliente.innerHTML = 'Nenhum Cliente Encontrado!'
    }
}