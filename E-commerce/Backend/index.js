const express =require('express')
const app=express()
const cors = require('cors')
const db=require('./server/config/db')
const seed=require('./server/config/seed')
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('./server/public')) 

app.get('/',(req,res)=>{
    res.send("welcome to server")
})
const adminroutes=require('./server/routes/adminroutes')
app.use('/admin',adminroutes)

const userroutes =require ('./server/routes/userroutes')  
app.use ('/user' , userroutes )  ;

const customerroutes =require('./server/routes/customerroutes')
app.use('/customer',customerroutes)


app.listen(5000, (err) => {
    if (err) {
        console.log("Error Occured");
    }
    else {
        console.log("Server Is Running");
    }
})
