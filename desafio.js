const koa = require('koa');
const server = new koa();

const produto = {};

const pedido = [];

// Produto
// POST - criar nv
// GET - Obter Inf :id
// GET - Todos os produtos
// PUT - Atualiza :id
// DELETE - deletar :id



// Pedidos
// POST - criar nv
// GET - Obter Inf :id
// GET - Todos os produtos
// PUT - Atualizar pedido na lista de PRODUTOS :id
// DELETE - deletar :id


server.use((ctx) =>{
    const path = ctx.url;
    if (path === "/produto"){
        ctx.body = [];
    }
});

server.listen(8081, () => {
    console.log('O servidor estar rodando!')
})