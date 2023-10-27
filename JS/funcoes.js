const linkGlobal = "https://viacep.com.br/ws/"



async function Cadastrar(e) {

    e.preventDefault()

    //VALORES DO FORMULARIO
    const nome = document.getElementById('nome').value;
    const sobreNome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const ddd = document.getElementById('ddd').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('cep').value;
    const rua = document.getElementById("rua").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const pais = parseFloat( document.getElementById("pais").value); 
    const estado = document.getElementById("UF").value; 
    const complemento = document.getElementById("complemento").value; 
    const anotacoes = document.getElementById("anotacoes").value; 

if (ValidacaoForm(nome, email, cep) == false) {

    alert("Preencha os campos que estao vazios corretamente para o cadastro do usuario")

}
   else{
alert("Cadastro feito")
   }


objCadastro = {

    nome, 
    sobreNome,
    email,
    pais,
    ddd,
    telefone,
   rua, 
   bairro,
   cep,
    anotacoes,
    cidade,
    estado,
    complemento


}


try {
    const promise = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
data: JSON.stringify(objCadastro),
method: "post",
headers: {"contentype" : "application/json"}

});
const dados = await promise.json();
    console.log(dados);
} catch (error) {
    
    return 'Deu ruim'
}

    
}

async function buscarEndereco(cep) {

const resource = `${cep}/json/`


    try {
        document.getElementById("not-found").innerHTML = ""
       
const promise = await fetch(linkGlobal+resource)
const dados = await promise.json()
console.log(dados);

        document.getElementById("rua").value = dados.logradouro
        document.getElementById("bairro").value = dados.bairro
        document.getElementById("cidade").value = dados.localidade
        document.getElementById("UF").value = dados.uf 
        document.getElementById("ddd").value = dados.ddd

    } catch (error) {

        
        document.getElementById("not-found").innerHTML = "CEP invalido"
    
    }
}

function ValidacaoForm(nome, email, cep) {
    
if (nome.trim() == "" || email.trim() == "" || cep.length < 8) {

return false
    
}

}

