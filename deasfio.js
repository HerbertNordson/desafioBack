const koa = require('koa');
const server = new koa();


server.use();

server.listen(8081, () => {
    console.log('O servidor estar rodando!')
})