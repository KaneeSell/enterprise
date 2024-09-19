window.onload = function () { procurarCliente() } //Ao carregar pagina
//RESET LOG
function resetLogUpload(){
    document.getElementById('ClienteLogUpload').innerText =''
}
// Função para fazer o upload de um arquivo JSON e salvar no localStorage
document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const logClientesUpload = document.getElementById('ClienteLogUpload')
    const colorLog = document.getElementById("ClienteLogUpload")
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                // Parseia o conteúdo do arquivo JSON
                const clientes = JSON.parse(e.target.result);
                
                // Verifica se o arquivo tem o formato correto
                if (Array.isArray(clientes)) {
                    // Salva o JSON no localStorage
                    localStorage.setItem('clientes', JSON.stringify(clientes));
                    alert('Clientes carregados com sucesso no localStorage!');
                    procurarCliente()
                    colorLog.style.color = "green"
                    logClientesUpload.innerText = 'Clientes carregados com sucesso no localStorage!'
                    setTimeout(resetLogUpload, 5000);
                } else {
                    colorLog.style.color = "red"
                    logClientesUpload.innerText = 'Formato de arquivo inválido. Certifique-se de que seja um array de clientes.'
                    setTimeout(resetLogUpload, 5000);
                }
            } catch (error) {
                colorLog.style.color = "red"
                logClientesUpload.innerText = 'Erro ao processar o arquivo. Verifique se é um JSON válido.'
                setTimeout(resetLogUpload, 5000);
            }
        };
        
        // Lê o arquivo como texto
        reader.readAsText(file);
    }
});
//Baixar Clientes.JSON
function baixarClientes() {
    // Obtém os dados da chave 'clientes' do localStorage
    const clientes = localStorage.getItem("clientes");
    
    // Cria um Blob a partir dos dados JSON
    const blob = new Blob([clientes], { type: 'application/json' });
    
    // Cria um link temporário para fazer o download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'clientes.json';
    
    // Simula um clique no link para iniciar o download
    link.click();
    
    // Libera o objeto URL
    URL.revokeObjectURL(link.href);
};
//Zerar Clientes
function zerarClientes(){
    const pass = prompt('Tem certeza que deseja Zerar todos os clientes cadastrados? Digite: ZERAR TUDO')
    if(pass == 'ZERAR TUDO'){
        localStorage.setItem('clientes', JSON.stringify([]));
        alert('Operação Realizada com Sucesso!')
    }
    else{
        alert('Operação ZERAR CLIENTES Abortada!')
    }
}
//Ativar div Cliente
function ativCliente(){
}
//Ativar div Cadastro
function ativCadastroCliente(){
    let propriedadeCadastro = elementoStyle("formCliente", "display")
    if(propriedadeCadastro == "none"){
        document.getElementById("formCliente").style.display = "block"
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
    const clientes = JSON.parse(localStorage.getItem("clientes"))
    const erroNomeCadastroCliente = document.getElementById("erroNomeCadastroCliente")
                    /*<-elementos inputs(pegar e limpar campos)->*/ 
    const nomeCliente = document.forms["formCliente"]["inputNomeCliente"].value
    document.forms["formCliente"]["inputNomeCliente"].value = ''
    const statusCliente = document.forms["formCliente"]["inputAtivoCliente"].checked? "Sim":"Não"
    document.forms["formCliente"]["inputAtivoCliente"].checked = true
    const cpfEcnpjCliente = document.getElementById('inputCnpjCliente').value
    const cpfEcnpjClienteChk = document.getElementById('cb5').checked? 'CNPJ':'CPF'
             /*<-Inicio do Loop para adicionar itens no LocalStorage->*/
    if(nomeCliente != "" && cpfEcnpjCliente != ''){
        let achados = 0
        let x = true
        for(let i = 0; x == true;i++){
            if(clientes[i] && clientes[i].nome){
                let nomeClientetesteget = clientes[i].nome
                let cpfEcnpjClienteget = clientes[i].cpfEcnpj
                if(nomeClientetesteget == nomeCliente){x = false}
                if(cpfEcnpjClienteget == cpfEcnpjCliente){x = false}
                erroNomeCadastroCliente.innerText = 'Já Existe Cliente com esse nome ou CPF/CNPJ!'
            }
            else{
                x = false
                clientes.push({ 'nome': nomeCliente, 'cpfEcnpj': cpfEcnpjCliente,'ativo': statusCliente });
                // Atualiza o localStorage com a nova lista de clientes
                localStorage.setItem("clientes", JSON.stringify(clientes));
                let nomeClienteteste = JSON.parse(localStorage.getItem("clientes"))[i].nome
                let cpfEcnpjClienteteste = JSON.parse(localStorage.getItem("clientes"))[i].cpfEcnpj
                let ativoClienteteste = JSON.parse(localStorage.getItem("clientes"))[i].ativo
                erroNomeCadastroCliente.innerHTML = `<p class="sucessCliente">Cliente Criado com Sucesso!<br>
                Nome: ${nomeClienteteste}, ${cpfEcnpjClienteChk}: ${cpfEcnpjClienteteste}, Ativo? ${ativoClienteteste}</p>`
                procurarCliente()
            }
        }
        if(achados > 0){
            procurarCadastroClienteLogLog.innerText = `${achados} Clientes encontrados com mesmo nome ou CPF/CNPJ!`
            procurarCliente()
        }
        else{
        }

    }
    else {
        erroNomeCadastroCliente.innerText = 'Informar nome do Cliente e CPF/CNPJ!'
        procurarCliente()
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
    let propriedadeCadastro = elementoStyle("formProcurarCliente", "display")
    if(propriedadeCadastro == "none"){
        document.getElementById("formProcurarCliente").style.display = "block"
        document.getElementById("formCliente").style.display = "none"
        document.getElementById("erroNomeCadastroCliente").innerText = ''
        document.forms["formCliente"]["inputNomeCliente"].value = ''
        document.forms["formCliente"]["inputAtivoCliente"].checked = true
    }
    else {
        document.forms["formProcurarCliente"]["inputNomeProcuraCliente"].value = ''
        document.forms["formProcurarCliente"]["inputProcurarAtivoCliente"].checked = true
    }
    procurarCliente()
}

//Procurar Clientes
function procurarCliente(e = ''){
    if(e != ''){e.preventDefault();}
    if(!(JSON.parse(localStorage.getItem('clientes')))){localStorage.setItem('clientes', JSON.stringify([]))}
    const procurarCadastroClienteLog = document.getElementById('procurarCadastroClienteLog')
    const clientes = JSON.parse(localStorage.getItem("clientes"))
    let nomeCliente = document.forms["formProcurarCliente"]["inputNomeProcuraCliente"].value
    let x = true
    let statusSeletorCliente = document.forms["formProcurarCliente"]["statusSeletorCliente"].value
    let achados = 0
    let logClientes = ''
    for(let i = 0; x == true;i++){
        if(clientes[i] && clientes[i].nome){
            let nomeClientetesteget = clientes[i].nome
            let ativoClientetesteget = clientes[i].ativo
            let cpfEcnpjClientetesteget = clientes[i].cpfEcnpj
            let verificador = true
            let divClientes = `<div class="divCliente"><input type="button" value="editar" class="editarCliente" onclick="editarCliente(${i})"><input type="button" value="Apagar" class="removeCliente" onclick="removeCliente(${i})"><h3>${nomeClientetesteget}<br>${cpfEcnpjClientetesteget.length > 14? 'CNPJ:':'CPF:'}${cpfEcnpjClientetesteget}</h3><h4 class="${ativoClientetesteget =="Sim"?"atv":"ina"}">${ativoClientetesteget =="Sim"?"Ativo":"Inativo"}</h4></div>`
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
    procurarCadastroClienteLog.innerHTML = `${achados} Clientes encontrados:<br><br>${logClientes}`
    }
    else{
    procurarCadastroClienteLog.innerHTML = 'Nenhum Cliente Encontrado!'
    }
}