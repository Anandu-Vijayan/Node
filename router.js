var express=require('express')
var router=express.Router();

const data={
    email:"admin@gmail.com",
    password:"admin123***"
}

//login user
router.post('/login',(req,res)=>{
    if(req.body.email==data.email&&req.body.password==data.password){

        req.session.user=req.body.email;
        res.redirect('/route/dashboard')

    }
    else if(req.body.email==''||req.body.password==''){
        res.render('base',{logout:"Fileds cannot be empty!"})

    }else{
        res.render('base',{logout:"Username or Password is Incorrect"})

    }
})

//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
        
    }
})
//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err)
            res.send("Error")
        }else{
            res.redirect('/')
            
            
        }
        
    })
})  


module.exports=router;