const http= require('http')
const connect=require('./connect')
console.log(connect.someText)
const server=http.createServer(connect.handler)


 
 
server.listen(3000)