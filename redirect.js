const http= require('http')
const express=require('express')
const bodyParser=require('body-parser')
const app= express()

app.use(bodyParser.urlencoded({extended:false}))

app.use('/addProducts',(req,res,next)=>{
res.send('<form action="/product"method="POST"><input type="text"name="product name"><input type="text" name="size"><button type="submit">add product</button></form>')
})

app.use('/product',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/' ) 
    })

    app.use('/',(req,res,next)=>{
        console.log('product added')
        res.send('<h1>Product added!</h1>' ) 
        })


const server=http.createServer(app)

server.listen(3000)