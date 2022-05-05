const express =require('express')
const bodyparser=require('body-parser')
const path=require('path');
const bodyParser = require('body-parser');
const session=require('express-session');
const {v4:uuidv4}=require("uuid");

const router=require('./router')

const app =express()
const port = process.env.PORT||5000;
app.use(bodyparser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs') 

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))


app.use((req,res,next)=>{
    if(!req.user){
        res.header('cache-control','private,no-cache,no-store,must revalidate')
        res.header('Express','-1')
        res.header('paragrm','no-cache')
    }
    next();
})

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

app.use('/route',router)
//home route
app.get('/',(req,res)=>{
    if(req.session.user){
        res.render('dashboard')
    }else{
        res.render('base',{title:"Login system"})
    }
})



app.listen(port,()=>{
    console.log("Listening to server on http://localhost:5000");
})