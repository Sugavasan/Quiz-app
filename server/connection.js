const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 5001;

const pool= mysql.createPool({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:'',
  database:'react_project',
});

const createQuizTableQuery = `
CREATE TABLE IF NOT EXISTS quiz (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(225) NOT NULL,
  answered VARCHAR(225) NOT NULL,
  correctAnswer INT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

pool.getConnection((err,connection)=>{
  if(err){
    console.error('Error connecting to MySQL:',err);
    return;
  }

  connection.query(createQuizTableQuery,(quizError)=>{
  if(quizError){
    console.log('Error creating quiz table:',quizError);
  }else{
    console.log('Quiz table created or already exist');
  }
  connection.release();
  });

});

app.use(cors());
app.use(bodyParser.json());

app.post('/SubmitQuiz',async(req,res)=>{
  const{quizData} = req.body;

  try{
    const quizInsertQuery = 'INSERT INTO quiz(question,answered,correctAnswer)VALUES(?,?,?)';
    for(const{question,answered,correctAnswer} of quizData){
      pool.query(quizInsertQuery,[question,answered,correctAnswer],(quizError)=>{
       if(quizError){
        console.error('Error inserting quiz data:',quizError);
        res.status(500).json({error:'Unable to submit Quiz:',details:quizError
      .message})
      return;

       } 
      })
    }
    res.json({success:true});
  }catch(error){
    console.error('Error submitting quiz',error);
    res.status(500).json({error:'Unable to submit Quiz',details:error.message});

  }
});

app.get('/getQuizData',(req,res)=>{
  const getQuizDataQuery = 'SELECT sum(correctAnswer) AS totalCorrectAnswer FROM quiz';

  pool.query(getQuizDataQuery,(error,results)=>{
    if(error){
      console.error('Error getting quiz data:',error);
      res.status(500).json({error:'Unable to get quiz data',details:error.message});
    }else{
      const totalCorrect = results[0].totalCorrectAnswer || 0;
      res.json({totalCorrect});
    }
  });
});

app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
});


