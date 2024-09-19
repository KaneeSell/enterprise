function mascararCPF(){
    const cpf = document.getElementById('inputCnpjCliente')
    const chkCPF = document.getElementById('cb5').checked? 'CNPJ':'CPF'
    if(chkCPF == 'CPF'){cpf.value = aplicarMascara(cpf.value);}
    else{cpf.value = aplicarMascaraCNPJ(cpf.value);}
}
function aplicarMascara(cpf){
    cpf = cpf.replace(/[^\d]+/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
function aplicarMascaraCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Corrigido para usar 'cnpj'
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}
function validar(){
    const cpf = document.getElementById('inputCnpjCliente').value
    const mensagem = validarCPF(cpf)
    const cpfFormatado = aplicarMascara(cpf)
    document.getElementById('registro').innerHTML = `Registro:\nCPF: ${cpfFormatado}\nValido?${mensagem}`
}
function limpa(){
    const cpf = document.getElementById('inputCnpjCliente')
    const log = document.getElementById('registro')
    cpf.value = '';
    log.innerHTML = 'Registro:'
}
function validarCPF(cpf){
    let valido = true
    cpf = cpf.replace(/[.,-]/g, '')
    cpf = cpf.split('')
    Object.entries(cpf).forEach(e => {if(Number(e[1])){}else{if(e[1] == 0){}else{valido = false}}})
    if(cpf.length != 11){valido = false}
    let calculoCPF = []
    let calculoCPF2 = []
    let soma = 0
    let auxiliar = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    for(let i = 0; i< cpf.length;i++){cpf[i] = cpf[i] * 1;calculoCPF[i] = cpf[i];calculoCPF2[i] = cpf[i]}
    if(valido){
        for(let i = 0; i <= 8;i++){calculoCPF[i] = auxiliar[i+1] * calculoCPF[i]}
        for(let i = 0; i <= 8;i++){soma += calculoCPF[i]}
        soma = 11 - (soma % 11)
        if(soma >= 10){soma = 0}
        if(soma != cpf[9]){valido = false}
        for(let i = 0; i <= 9;i++){calculoCPF2[i] = auxiliar[i] * calculoCPF2[i]}
        soma = 0
        for(let i = 0; i <= 9;i++){soma += calculoCPF2[i]}
        soma = 11 - (soma % 11)
        if(soma >= 10){soma = 0}
        if(soma != cpf[10]){valido = false}
    }
    return valido? 'Sim':'Não'
    }