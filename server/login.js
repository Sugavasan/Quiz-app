const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); //for password
const mysql = require('mysql');

const app = express();
const PORT = 5000;

const login = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'react_project',
})

app.use(cors());
app.use(bodyParser.json());



app.post('/Login',(req,res)=>{
    const {email,password} = req.body;
    console.log('Recived login request',email)
    
    login.getConnection((err,connection)=>{
        if(err){
            res.status(500).json({error:'unable to connect todatabase'});
            return;
        }

        const sql = 'select *from userlist where email=?';
        connection.query(sql,[email],(queryError,results)=>{
         if(queryError){
            res.status(500).json({error:'Unable to submit'});
         }else if(results.length>0){
            const user = results[0];
         //compare the provided password with database
         bcrypt.compare(password,user.password,(bcryptError,isMatch)=>{
           if(bcryptError){
            res.status(500).json({error:'server error'});
           } else if(isMatch){
            res.json({success:true,message:'Login Successful'});
           }else{
            res.status(401).json({error:'IncorrectPassword'});
           }
           console.log(user);
           connection.release();
         });
        }else{
            res.status(404).json({error:'User not found'});
         connection.release();
        }  
        });
    });
});


app.post('/signup',(req,res)=>{
    const {name,email,password} = req.body;

    login.getConnection((err,connection)=>{
        if(err){
            console.error(err);
            res.status(500).json({error:'unable to connect to database'});
            return;
        }
       //password before storing in database
        bcrypt.hash(password,5,(hashError,hashPassword)=>{
            if(hashError){
             res.status(500).json({error:'server error'});
            connection.release();
        }else{
        const sql = 'INSERT INTO userlist(name,email,password)values(?,?,?)';
        connection.query(sql,[name,email,hashPassword],(queryError,results)=>{
         if(queryError){
            res.status(500).json({error:'Unable to submit'});
         }else{
           res.json({success:true,message:'SignupSuccessfull'});
         }
          connection.release();
        });
    }
})
})
    });

    

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});