const koa = require('koa');
const bodyparser =require ('koa-bodyparser');

const server = new koa();

server.use( bodyparser());


const products = [
    {
        id: 0 ,
        nome: "Mouse",
        estoque: 10,
        valor: 25000,
        deletado: false
    }
];

const orders = [
    {
        id: 0,
        produtos: [{}],
        estado: "",
        idCliente: "",
        deletado: false,
        valorTotal: ''
    }

];

const pedidos = [];

// Produto
// POST - criar nv
// GET - Obter Inf :id
// GET - Todos os produtos
// PUT - Atualiza :id
// DELETE - deletar :id

const obterListaDeProdutos = () => {
    const listaSemDeletados = [];

    products.forEach(elemento => {
        if (elemento.deletado === false){
            listaSemDeletados.push(elemento);
        }
    })

    return listaSemDeletados;
};


// Pedidos
// POST - criar nv
// GET - Obter Inf :id
// GET - Todos os produtos - Feito!
// PUT - Atualizar pedido na lista de PRODUTOS :id
// DELETE - deletar :id

const obterListaDePedidos = () => {
    const listaSemDeletados = [];

    orders.forEach(elemento => {
        if (elemento.deletado === false){
            listaSemDeletados.push(elemento);
        }
    })

    pedidos.push (listaSemDeletados);
    return pedidos;
};

const obterPedido = (index) => {
    const pedido = pedidos[index];

    if (pedido) {
        return pedido;
    }else {
        return null;
    }
};

const adicionarPedidos = (orders) => {
    const novoPedido = {
        id: orders.id ? orders.id: '',
        produtos: orders.produtos ? orders.produtos: 'Sacola Vaiza',
        estado: orders.estado ? orders.estado: 'Incompleto' ,
        idCliente: orders.idCliente ? orders.idCliente: 'Sem identificação',
        valorTotal: orders.valorTotal ? orders.valorTotal: 0
    };
    pedidos.push(novoPedido);
    return novoPedido;
}

server.use((ctx) =>{
    const path = ctx.url;
    const method = ctx.method;
    if (path === "/orders"){
        if (method === 'GET'){
            ctx.body = obterListaDePedidos();
        } else if (method === 'POST'){
          const novo = adicionarPedidos(ctx.request.body);
          ctx.body = novo;
          console.log(novo);
        }else{
            ctx.status = 404;
            ctx.body = 'Não encontrado!'
        } 
        
    } else if (path.includes("/orders/")) {
      const pathInd = path.split("/");
        if (pathInd[1] === "orders"){
          const index = pathInd[2];
          if (index) {
            ctx.body = obterPedido(index);
          } else {
            ctx.status = 404;
            ctx.body = "Não encontrado";

          }
        }       
    } 
    
    
    else {
        ctx.status = 404;
        ctx.body = "Não encontrado";
    }

    // Produtos

});

server.listen(8081, () => {
    console.log('O servidor estar rodando!')
})