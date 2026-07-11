//Endereço

class Endereco {
    constructor(rua, numero, cidade) {
        this.rua = rua;
        this.numero = numero;
        this.cidade = cidade;
    }

    obsterEndereco() {
        return `${this.rua}, ${this.numero} - ${this.cidade}`;
    }
}

//Loja

class Loja {
    constructor(nome, endereco, horarioFuncionamento) {
        this.nome = nome;
        this.endereco = endereco;
        this.horarioFuncionamento = horarioFuncionamento;
        this.funcionarios = [];
    }

    adicionarFuncionario(funcionario) {
        this.funcionarios.push(funcionario);
    }

    listarFuncionarios() {
        console.log(`Funcionarios da ${this.nome}:`);
        this.funcionarios.forEach(f => {
            console.log(`${f.nome} - ${f.atribuicao}`);
        });
    }
}

//Funcionário

class Funcionario {
    constructor(nome, atribuicao, salario, entrada, saida, regime) {
        this.nome = nome;
        this.atribuicao = atribuicao; //caixa, gerente ou repositor 
        this.salario = salario;
        this.entrada = entrada;
        this.saida = saida;
        this.regime = regime; //CLT ou CNPJ
    }

    cadastrarCliente(nome, email, login, senha) {
        if (this.atribuicao === "Gerente") {
            return new Cliente(nome, email, login, senha);
        } else {
            console.log("Apenas gerentes podem cadastrar clientes.");
        }
    }
}

//Cliente

class Cliente {
    constructor(nome, email, login = null, senha = null) {
        this.nome = nome;
        this.email = email;
        this.login = login;
        this.senha = senha;
        this.historicoCompras = [];
    }

    adicionarCompra(venda) {
        this.historicoCompras.push(venda)  
    }
}

//Categoria

class Categoria {
    constructor(nome) {
    this.nome = nome;
    }
}

//Produto 

class Produto {
    constructor(nome, preco, tipoVenda, categoria, tags = []) {
        this.nome = nome; 
        this.preco = preco;
        this.tipoVenda = tipoVenda; //Unidade ou Quilo
        this.categoria = categoria;
        this.tags = tags;
    }
}

//Item do Carrinho

class Carrinho{
    constructor() {
        this.itens = [];
    }

    adicionarItem(produto, quantidade) {
        this.itens.push(new ItemCarrinho(produto, quantidade));
    }

    calcularTotal() {
        return this.itens.reduce((total, item) => total + item.subtotal(), 0);
    }
}

//Venda

class Venda {
    constructor(clente, carrinho, formaPagamento, tipoVenda) {
        this.cliente = clente; 
        this.carrinho = carrinho;
        this.formaPagamento = formaPagamento,
        this.tipoVenda = tipoVenda; //Fisica ou Online
        this.total = carrinho.calcularTotal();
    }

    finalizarVenda() {
        console.log("=====VENDA=====");
        console.log("Cliente:", this.cliente.nome);

        this.carrinho.itens.forEach(item => {
            console.log(
                `${item.produto.nome} - ${item.quantidade} x R$ ${intem.produto.preco}`
            );
        });

        console.log("Forma de pagamento:", this.formaPagamento);
        console.log("Total: R$", this.total.toFixed(2));

        this.cliente.adicionarCompra(this);
    }
}