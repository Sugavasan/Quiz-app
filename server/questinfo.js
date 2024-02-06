const express = require('express');
const UserData = express();

const bodyParser=require('body-parser');
UserData.use(bodyParser.json());

const cors = require('cors');
UserData.use(cors());

const mysql = require('mysql');


const PORT =4200;

const myconnection = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'react_project',
});

UserData.post('/userinfo',(req,res)=>{
    const {Tname,TQualification,year} = req.body;
    try{
        let info ='INSERT INTO USERINFO(Tname,TQualification,year)values(?,?,?)';
        myconnection.query(info,[Tname,TQualification,year],(UserError,results)=>{
            if(UserError){
                res.status(500).json({error:'server post error occured'});
            }else{
                console.log('data posted');
                res.json({success:'data successfully entered',results}); 
            }
        })   ;
         
    }catch(error){
        res.status(500).json({warning:'please check our server code'});
    };
});

UserData.post('/feedinfo',(req,res)=>{
    const {Name,Message} = req.body;
    try{
    let fback = 'INSERT INTO userFeedback(Name,Message)values(?,?)';
    myconnection.query(fback,[Name,Message],(FeedError,Sresult)=>{
    if(FeedError){
        res.status(500).json({Error:'feedback error'});
    }else{
        res.status(500).json({Sresult});
    }
    });
    }catch(error){
        res.status(500).json({error:'please check server code'});
    }
});

UserData.get('/FEED',(req,res)=>{
    try{
        let getting ='SELECT Name,Message FROM userfeedback';
        myconnection.query(getting,(MsgError,Msg)=>{
            if(MsgError){
                res.status(500).json({error:'Message getting error'});
            }else{
                res.status(200).json({Msg});
            }
        });
    }catch(error){
        res.status(500).json({error:'error getting feedback data'});
    }
});

UserData.post('/Cont', (req, res) => {
    const { customer, cMessage,cEmail} = req.body;
    try {
      let contact = 'INSERT INTO `contactrequest` (`customer`, `cMessage`,`cEmail`) VALUES (?, ?,?)';
      myconnection.query(contact, [customer, cMessage,cEmail], (contactError, Cresult) => {
        if (contactError) {
          console.error('Error executing query:', contactError);
          res.status(500).json({ Error: 'Contact server error' });
        } else {
          console.log('Query executed successfully:', Cresult);
          res.status(200).json({ Success: 'Data inserted successfully' });
        }
      });
    } catch (error) {
      console.error('Server code error:', error);
      res.status(500).json({ Error: 'Please check server code' });
    }
  });
  

UserData.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});