const LocalStrategy = require("passport-local").Strategy;
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',     //your postgres username
    host: 'localhost', 
    database: 'test', //your local database 
    password: 'Varun@2211', //your postgres user password
    port: 5432, //your postgres running port
});
const bcrypt = require("bcrypt");

function initialize(passport){
    const authenticateUser = (number,password,done)=>{
        pool.query(
            'SELECT * from person WHERE contact_no = $1;',[number],(err,results)=>{
                if(err)
                {
                    throw err;
                }
                //console.log(results.rows);
                if(results.rows.length>0)
                {
                    const user = results.rows[0];
                    console.log(user);
                    console.log(user.password);
                    console.log(password);
                    bcrypt.compare(password,user.password,(err,isMatch) =>{
                        //console.log(isMatch);
                        if(err)
                        {
                            throw err;
                        }
                        if(isMatch){
                            return done(null,user);
                        }
                        else
                        {
                            return done(null,false,{message:"Password is not correct"});
                        }
                    });
                }
                else{
                    return done(null,false,{message:"number is not registered"});
                }
            });
    }
    passport.use(new LocalStrategy({
        usernameField: "number",
        passwordField: "password"
    }, authenticateUser));
    //console.log(user);
 passport.serializeUser((user,done)=> {done(null,user.user_id)});
 passport.deserializeUser((id,done)=>{
     pool.query(
         'SELECT * from person where user_id = $1;',[id],(err,results)=>
         {
             if(err)
             {
                 return done(err);
             }
             //console.log('ID is ${results.rows[0].user_id}');
             return done(null,results.rows[0]);
         }
     );
 });
}
module.exports = initialize;