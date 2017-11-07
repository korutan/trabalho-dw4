const ADMINISTRADOR = "administrador";
const CATEGORIA = "categoria";
const CLIENTE = "cliente";
const COMPRA = "compra";
const PRODUTO = "produto";

function _iniciarBancoDados(){
    var administradores = localStorage.getItem(ADMINISTRADOR);
    var categorias = localStorage.getItem(CATEGORIA);
    var produtos = localStorage.getItem(PRODUTO);
    var clientes = localStorage.getItem(CLIENTE);

    if(!administradores && !categorias && !produtos && !clientes){
        localStorage.setItem("SEQ_"+ADMINISTRADOR, 0);
        localStorage.setItem("SEQ_"+CATEGORIA, 0); 
        localStorage.setItem("SEQ_"+PRODUTO, 0);
        localStorage.setItem("SEQ_"+CLIENTE, 0); 
        localStorage.setItem("SEQ_"+COMPRA, 0);   


        _inserirOuAtualizarRegistro(ADMINISTRADOR, { login: "admin", senha: "123" });
        _inserirOuAtualizarRegistro(CATEGORIA, { descricao: "Eletrodomésticos" });
        _inserirOuAtualizarRegistro(CATEGORIA, { descricao: "Informática" });
        _inserirOuAtualizarRegistro(CATEGORIA, { descricao: "Eletroportáteis" });
        _inserirOuAtualizarRegistro(CATEGORIA, { descricao: "Smartphones." });
        localStorage.setItem(PRODUTO, JSON.stringify([]));
        localStorage.setItem(CLIENTE, JSON.stringify([])); 
        localStorage.setItem(COMPRA, JSON.stringify([]));           
    }
}

function _obterSequence(colecao){
    var sequence = localStorage.getItem("SEQ_"+colecao);

    sequence = parseInt(sequence) + 1;

    localStorage.setItem("SEQ_"+colecao, sequence);

    return sequence;
}

function _inserirOuAtualizarRegistro(colecao, registro){
    var registros = JSON.parse(localStorage.getItem(colecao)) || [];

    if(registro.id){
        var indice = registros.findIndex(r => r.id == registro.id);
        
        registros[indice] = registro;
    }
    else{        
        var id = colecao.substring(0, 3) + "_" + _obterSequence(colecao);
        
        registro.id = id;
    
        registros.push(registro);
    }    

    registros = JSON.stringify(registros);

    localStorage.setItem(colecao, registros);
}

function _deletarRegistro(colecao, id){
    var registros = JSON.parse(localStorage.getItem(colecao));

    var registro = registros.find(r => r.id == id);

    if(registro){
        var indice = registros.indexOf(registro);
        
        registros.splice(indice, 1);
        localStorage.setItem(colecao, JSON.stringify(registros));
    }     
}

function salvarCategoria(categoria){
    _inserirOuAtualizarRegistro(CATEGORIA, categoria)
}

function salvarProduto(produto){
    _inserirOuAtualizarRegistro(PRODUTO, produto)
}

function salvarCliente(cliente){
    _inserirOuAtualizarRegistro(CLIENTE, cliente)
}

function salvarCompra(compra){
    _inserirOuAtualizarRegistro(COMPRA, compra)
}

function salvarAdministrador(administrador){
    _inserirOuAtualizarRegistro(ADMINISTRADOR, administrador)
}

function obterAdministradorPeloLoginESenha(login, senha){
    var administradores = JSON.parse(localStorage.getItem(ADMINISTRADOR));

    return administradores.find(a => a.login == login && a.senha == senha);
}

function obterCategorias(){
    var categorias = localStorage.getItem(CATEGORIA);

    return JSON.parse(categorias);
}

function obterProdutos(){
    var produtos = localStorage.getItem(PRODUTO);

    return JSON.parse(produtos);
}

function obterClientes(){
    var clientes = localStorage.getItem(CLIENTE);

    return JSON.parse(clientes);
}

function obterCompras(){
    var compras = localStorage.getItem(COMPRA);

    return JSON.parse(compras);
}

function obterAdministradores(){
    var administradores = localStorage.getItem(ADMINISTRADOR);

    return JSON.parse(administradores);
}

function deletarCategoria(id){
    _deletarRegistro(CATEGORIA, id);
}

function deletarCliente(id){
    _deletarRegistro(CLIENTE, id);
}

function deletarProduto(id){
    _deletarRegistro(PRODUTO, id);
}

function deletarCompra(id){
    _deletarRegistro(COMPRA, id);
}

function deletarAdministrador(id){
    _deletarRegistro(ADMINISTRADOR, id);
}


_iniciarBancoDados();
