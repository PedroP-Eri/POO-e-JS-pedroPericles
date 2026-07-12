
// Endereço


class Endereco {
    constructor(rua, numero, cidade) {
        this.rua = rua;
        this.numero = numero;
        this.cidade = cidade;
    }

    obterEndereco() {
        return `${this.rua}, ${this.numero} - ${this.cidade}`;
    }
}


// Loja

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
        console.log(`Funcionários da ${this.nome}:`);

        this.funcionarios.forEach(funcionario => {
            console.log(`${funcionario.nome} - ${funcionario.atribuicao}`);
        });
    }
}


// Funcionário


class Funcionario {
    constructor(nome, atribuicao, salario, entrada, saida, regime) {
        this.nome = nome;
        this.atribuicao = atribuicao;
        this.salario = salario;
        this.entrada = entrada;
        this.saida = saida;
        this.regime = regime;
    }

    cadastrarCliente(nome, email, login, senha) {
        if (this.atribuicao === "Gerente") {
            return new Cliente(nome, email, login, senha);
        }

        console.log("Apenas gerentes podem cadastrar clientes.");
        return null;
    }
}


// Cliente

class Cliente {
    constructor(nome, email, login = null, senha = null) {
        this.nome = nome;
        this.email = email;
        this.login = login;
        this.senha = senha;
        this.historicoCompras = [];
    }

    adicionarCompra(venda) {
        this.historicoCompras.push(venda);
    }
}

// Categoria

class Categoria {
    constructor(nome) {
        this.nome = nome;
    }
}

// Produto

class Produto {
    constructor(nome, preco, tipoVenda, categoria, tags = []) {
        this.nome = nome;
        this.preco = preco;
        this.tipoVenda = tipoVenda;
        this.categoria = categoria;
        this.tags = tags;
    }
}

// Item do Carrinho

class ItemCarrinho {
    constructor(produto, quantidade) {
        this.produto = produto;
        this.quantidade = quantidade;
    }

    subtotal() {
        return this.produto.preco * this.quantidade;
    }
}

// Carrinho

class Carrinho {
    constructor() {
        this.itens = [];
    }

    adicionarItem(produto, quantidade) {
        this.itens.push(new ItemCarrinho(produto, quantidade));
    }

    calcularTotal() {
        return this.itens.reduce(
            (total, item) => total + item.subtotal(),
            0
        );
    }
}

// Venda

class Venda {
    constructor(cliente, carrinho, formaPagamento, tipoVenda) {
        this.cliente = cliente;
        this.carrinho = carrinho;
        this.formaPagamento = formaPagamento;
        this.tipoVenda = tipoVenda;
        this.total = carrinho.calcularTotal();
    }

    finalizarVenda() {

        console.log("\n========== VENDA ==========");
        console.log("Cliente:", this.cliente.nome);
        console.log("");

        this.carrinho.itens.forEach(item => {

            console.log(
                `${item.produto.nome} - ${item.quantidade} x R$ ${item.produto.preco.toFixed(2)} = R$ ${item.subtotal().toFixed(2)}`
            );

        });

        console.log("");
        console.log("Forma de pagamento:", this.formaPagamento);
        console.log("Tipo de venda:", this.tipoVenda);
        console.log("Total: R$", this.total.toFixed(2));

        this.cliente.adicionarCompra(this);
    }
}

//UTILIZAÇÃo

// Endereços

const enderecoAracati = new Endereco(
    "Rua Coronel Alexanzito",
    100,
    "Aracati"
);

const enderecoRussas = new Endereco(
    "Av. Dom Lino",
    200,
    "Russas"
);

// Lojas

const lojaAracati = new Loja(
    "Loja de Aracati",
    enderecoAracati,
    "08:00 às 18:00"
);

const lojaRussas = new Loja(
    "Loja de Russas",
    enderecoRussas,
    "08:00 às 18:00"
);

// Funcionários

lojaAracati.adicionarFuncionario(
    new Funcionario(
        "João",
        "Caixa",
        1800,
        "08:00",
        "17:00",
        "CLT"
    )
);

lojaAracati.adicionarFuncionario(
    new Funcionario(
        "Maria",
        "Caixa",
        1800,
        "08:00",
        "17:00",
        "CLT"
    )
);

const gerente = new Funcionario(
    "Carlos",
    "Gerente",
    4500,
    "08:00",
    "18:00",
    "CLT"
);

lojaAracati.adicionarFuncionario(gerente);

// Cliente

const cliente = gerente.cadastrarCliente(
    "Pedro",
    "pedro@gmail.com",
    "PedroIVX",
    "9002"
);

// Categorias

const sementes = new Categoria("Sementes");
const doces = new Categoria("Doces");

// Produtos

const castanha = new Produto(
    "Castanha",
    60,
    "Quilo",
    sementes,
    ["saudável", "vegano"]
);

const amendoim = new Produto(
    "Amendoim",
    20,
    "Quilo",
    sementes,
    ["saudável", "vegano"]
);

const mel = new Produto(
    "Mel",
    18,
    "Unidade",
    doces,
    ["natural", "orgânico"]
);

// Carrinho

const carrinho = new Carrinho();

carrinho.adicionarItem(castanha, 0.5);
carrinho.adicionarItem(amendoim, 1);
carrinho.adicionarItem(mel, 2);

// Venda

const venda = new Venda(
    cliente,
    carrinho,
    "Cartão de Crédito",
    "Online"
);

venda.finalizarVenda();

// Funcionários da loja

console.log("\n");
lojaAracati.listarFuncionarios();