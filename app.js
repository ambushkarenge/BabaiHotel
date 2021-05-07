const Hotel = require('./models/hotel');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash'); 
const passport = require("passport");

const adminRo = require('./routes/admin');
const pool =  require('./utils/database');

const initializePassport = require('./utils/passportConfig');

initializePassport(passport);

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('views', 'views');
// app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.use('/admin',adminRo);
app.use('/',adminRo);
// for login
app.get("/",(req,res) => {
    res.render('main',{pageTitle: 'main', path : '/main'});
});

app.get("/login",(req,res) => {
    res.render('login',{pageTitle: 'login', path : '/login'});
});

app.get("/signup",(req,res) => {
    res.render('signup',{pageTitle: 'signup', path : '/signup'});
});

app.post("/signup",async (req,res) =>
{
    let {name,number,role,address,password,password2} = req.body;
    /*console.log({
        name,
        number,
        role,
        address,
        password,
        password2
    })*/
    let errors=[];
    if(!name || !number || !role || !address || !password || !password2)
    {
        errors.push({message : "Please enter all fields"});
    }
    //console.log(password.length)
    if(password.length < 6)
    {
        //console.log('hi');
        errors.push({message : "Password must be atleast 6 characters"});
        //console.log(errors);
    }

    if(password!=password2)
    {
        errors.push({message : "Passwords do not match!"});
    }
    if(errors.length > 0)
    {
        res.render("signup", {pageTitle: 'signup',errors: errors});
    }
    else
    {
        let hashedPassword = await bcrypt.hash(password,10);
        //console.log(hashedPassword); 
        pool.query(
            'SELECT * FROM person where contact_no = $1;',[number], (err,results)=>{if(err)
                {
                    throw err
                }
                if(results.rows.length>0)
                {
                    errors.push({message: "Phone number already exist"});
                    res.render('signup',{errors:errors,pageTitle:"signup"});
                }else
                {
                    pool.query(
                        'INSERT INTO person(name, contact_no, address, type, password)\
                         VALUES ($1,$2, $3, $4, $5)\
                         RETURNING user_id,password;',[name,number,address,role,hashedPassword], (err,results)=>{
                            if(err)
                            {
                                throw err;
                            }
                            //console.log(results.row);
                            req.flash('sucess_msg',"You are registed, Please Log in");
                            res.redirect("/login");
                         }
                    )
                }
            });
    }
    //console.log(errors);
});

app.get("/dashboard",checkAuthentication,(req,res) => {
    res.render('dashboard',{pageTitle: 'dashboard', path : '/dashboad',user: req.user.name,user_id:req.user.user_id, role: req.user.type});
});

app.post("/login",passport.authenticate('local',{
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true
}));

app.get("/logout",(req,res)=>
{
    req.logOut();
    req.flash('sucess_msg',"You have logged out");
    res.redirect('/login');
})

function checkAuthentication(req,res,next){
    //console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}
// exports.checkAuthentication = (req,res,next)=>{
//     console.log(req.isAuthenticated());
//     if(req.isAuthenticated()){
//         //req.isAuthenticated() will return true if user is logged in
//         next();
//     } else{
//         res.redirect("/login");
//     }
// }
// for login

app.listen(3000);