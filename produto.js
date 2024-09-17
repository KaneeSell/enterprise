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

//Ativar div Cadastro
function ativCadastroProduto(){
    var propriedadeCadastroProduto = elementoStyle("formProduto", "display")
    if(propriedadeCadastroProduto == "none"){
        document.getElementById("formProduto").style.display = "block"
        document.getElementById("formProcurarProduto").style.display = "none"
        document.forms["formProcurarProduto"]["inputNomeProcuraProduto"].value = ''
    }
    else {
        document.getElementById("formProduto").style.display = "none"
        document.getElementById("erroNomeCadastroProduto").innerText = ''
        document.forms["formProduto"]["inputNomeProduto"].value = ''
        document.forms["formProduto"]["inputAtivoProduto"].checked = true
    }
}
//Criar Produto
function criarProduto(e){
    e.preventDefault();
    if(!(JSON.parse(localStorage.getItem('produtos')))){localStorage.setItem('produtos', JSON.stringify([]))}
    var nomeProduto = document.forms["formProduto"]["inputNomeProduto"].value
    document.forms["formProduto"]["inputNomeProduto"].value = ''
    var statusProduto = document.forms["formProduto"]["inputAtivoProduto"].checked? "Sim":"Não"
    document.forms["formProduto"]["inputAtivoProduto"].checked = true
    const erroNomeCadastroProduto = document.getElementById("erroNomeCadastroProduto")
    const produtos = JSON.parse(localStorage.getItem("produtos"))
    if(nomeProduto != ""){
        let achadosProdutos = 0
        let x = true
        for(let i = 0; x == true;i++){
            if(produtos[i] && produtos[i].nome){
                let nomeProdutotesteget = produtos[i].nome
                if(nomeProdutotesteget == nomeProduto){x = false}
                erroNomeCadastroProduto.innerText = 'Já Existe Produto com esse nome!'
            }
            else{
                x = false
                produtos.push({ 'nome': nomeProduto, 'ativo': statusProduto });
                // Atualiza o localStorage com a nova lista de Produtos
                localStorage.setItem("produtos", JSON.stringify(produtos));
                let nomeProdutoteste = JSON.parse(localStorage.getItem("produtos"))[i].nome
                let ativoProdutoteste = JSON.parse(localStorage.getItem("produtos"))[i].ativo
                erroNomeCadastroProduto.innerText = `Produto Criado com Sucesso!
                Nome: ${nomeProdutoteste}, Ativo? ${ativoProdutoteste}`
            }
        }
        if(achadosProdutos > 0){
            procurarCadastroProduto.innerText = `${achadosProdutos} Produtos encontrados com mesmo nome!`
        }
        else{
        }

    }
    else {
        erroNomeCadastroProduto.innerText = 'Informar nome do Produto!'
    }
}
//Remover Produto
function removeProduto(i){
    const produtos = JSON.parse(localStorage.getItem("produtos"))
    produtos.splice(i, 1)
    localStorage.setItem("produtos", JSON.stringify(produtos));
    // Atualiza o localStorage com a nova lista de Produtos
    procurarProduto()
}
//Editar Produto
function editarProduto(i){
    const produtos = JSON.parse(localStorage.getItem("produtos"))
    nomeAntigo = produtos[i].nome
    let novoNome = prompt("Novo nome:")
    if(novoNome == null || novoNome == ""){novoNome = nomeAntigo}
    let novoStatus = confirm("Ativo?")?"Sim":"Não";
    alert(novoNome + " = " + novoStatus)
    produtos[i].nome = novoNome;
    produtos[i].ativo = novoStatus;
    localStorage.setItem("produtos", JSON.stringify(produtos));
    // Atualiza o localStorage com a nova lista de Produtos
    procurarProduto()
}

//------------------------------------------------------------------------------

//Ativar div Procurar Produtos
function ativProcurarProduto(){
    var propriedadeCadastroProduto = elementoStyle("formProcurarProduto", "display")
    if(propriedadeCadastroProduto == "none"){
        document.getElementById("formProcurarProduto").style.display = "block"
        document.getElementById("formProduto").style.display = "none"
        document.getElementById("erroNomeCadastroProduto").innerText = ''
        document.forms["formProduto"]["inputNomeProduto"].value = ''
        document.forms["formProduto"]["inputAtivoProduto"].checked = true
    }
    else {
        document.getElementById("formProcurarProduto").style.display = "none"
        document.forms["formProcurarProduto"]["inputNomeProcuraProduto"].value = ''
        document.forms["formProcurarProduto"]["inputProcurarAtivoProduto"].checked = true
    }
    procurarProduto()
}

//Procurar Produtos
function procurarProduto(e = ''){
    if(e != ''){e.preventDefault();}
    if(!(JSON.parse(localStorage.getItem('produtos')))){localStorage.setItem('produtos', JSON.stringify([]))}
    const procurarCadastroProduto = document.getElementById('procurarCadastroProduto')
    const produtos = JSON.parse(localStorage.getItem("produtos"))
    var nomeProduto = document.forms["formProcurarProduto"]["inputNomeProcuraProduto"].value
    let x = true
    var statusSeletorProduto = document.forms["formProcurarProduto"]["statusSeletorProduto"].value
    let achadosProdutos = 0
    let logProdutos = ''
    for(let i = 0; x == true;i++){
        if(produtos[i] && produtos[i].nome){
            let nomeProdutotesteget = produtos[i].nome
            let ativoProdutotesteget = produtos[i].ativo
            let verificadorProdutos = true
            let divProdutos = `<div class="divProduto"><input type="button" value="editar" class="editarProduto" onclick="editarProduto(${i})"><input type="button" value="Apagar" class="removeProduto" onclick="removeProduto(${i})"><h3>${nomeProdutotesteget}</h3><h4 class="${ativoProdutotesteget =="Sim"?"atv":"ina"}">${ativoProdutotesteget =="Sim"?"Ativo":"Inativo"}</h4></div>`
            if(nomeProdutotesteget == nomeProduto && (ativoProdutotesteget == statusSeletorProduto || statusSeletorProduto == '')){
                verificadorProdutos = false
                achadosProdutos++
                logProdutos += divProdutos
            }
            if(ativoProdutotesteget == statusSeletorProduto && nomeProduto == '' && verificadorProdutos == true){
                verificadorProdutos = false
                achadosProdutos++
                logProdutos += divProdutos
            }
            if(ativoProdutotesteget == statusSeletorProduto && nomeProduto == '' && verificadorProdutos == true){
                verificadorProdutos = false
                achadosProdutos++
                logProdutos += divProdutos
            }
            if(statusSeletorProduto == '' && nomeProduto == '' && verificadorProdutos == true){
                verificadorProdutos = false
                achadosProdutos++
                logProdutos += divProdutos
            }
        }
        else{x = false}
    }
    if(achadosProdutos > 0){
    procurarCadastroProduto.innerHTML = `${achadosProdutos} Produtos encontrados:<br><br>${logProdutos}`
    }
    else{
    procurarCadastroProduto.innerHTML = 'Nenhum Produto Encontrado!'
    }
}