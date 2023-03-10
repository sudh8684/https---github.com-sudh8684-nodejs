const fs=require('fs')

function requestHandler(req,res){
    const url=req.url
    const method=req.method
    if(url==='/'){
        // res.setHeader("Content-Type","text/html")
         fs.readFile('home.txt',{encoding:'utf-8'},(err,data)=>{
             if(err){
                 console.log(err)
             }
         console.log(`data from file ${data}`)
          res.write('<html>')
          res.write('<head><title>enter message</title></head>')
          res.write(`<body>${data}</body>`)
          res.write('<body><form action="/home" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
          res.write('</html>')
         return res.end()
         })
     }
     if (url==='/home' && method=== 'POST'){
        const body=[]
        req.on('data',(chunk)=>{
            console.log(chunk)
          body.push(chunk)
        })
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const home=parsedBody.split('=')[1]
            fs.writeFile('home.txt',home,(err)=>{
                if(err){
                    console.log(err)
                }
                console.log('inside fs.writeFile')
                res.statusCode=302
            res.setHeader('Location','/')
              return res.end()
            })
            
        })
       
      
     }
    /* res.setHeader("Content-Type","text/html")
     res.write('<html>')
     res.write('<head><title>about</title></head>')
     res.write('<body><h1> Welcome to About Us page</h1></body>')
     res.write('</html>')
     res.end()*/

}
//it is a simple way of export
//module.exports=requestHandler

//it is another way of exporting is we have a big file
/*module.exports={
    handler:requestHandler,
    someText:'something is big'
}*/

//another way 

   module.exports.handler=requestHandler;
   module.exports.someText='something is big'