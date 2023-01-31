const http= require('http')
const express=require('express')
const fs=require('fs')
const bodyParser=require('body-parser')
const app= express()
app.use(bodyParser.urlencoded({extended:false}))
app.get('/login',(req,res,next)=>{
    res.send(`<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/name" method="POST">

	<input id="username" type="text" name="username">

	<button type="submit">login User</button>

</form>`)
    })
    app.post('/name',(req,res,next)=>{
        console.log(req.body)
       res.redirect('/' )  
        })
        app.get('/',(req,res,next)=>{
            fs.readFile("msg.txt", (err,data)=>{
              if(err){
                console.log(err)
                data='no messages'
              }
              res.send(`${data} <form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/" method="POST">

            <input type="text" id="message" name="message">
             <input type="hidden" name="username" id="username">
            <button type="submit">send message</button>
            
        
        </form>`) 
            })
           // console.log('user login')
            
    
            })

            app.post('/',(req,res,next)=>{
                console.log(req.body.username)
                console.log(req.body.message)
              fs.appendFileSync('msg.txt',`${req.body.username} : ${req.body.message}<br>`,(err)=>
              err? console.log(err) : res.redirect('/')
              )
              res.redirect('/')
            })

const server=http.createServer(app)
 
app.listen(3000)  