import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import QuizTime from './timer.js';
import './ques.css';

//*now we are creating questions using array *
const slidesData=[
  {
    question:'which of the following is a front-end javascript library for building user interfaces?',
    options:[
      'jQuery.',
      'Node.js.',
      'Django.',
      'Flask.',
    ],
    correctIndex:0, //index for correct Answer
  },{
    question:'What is the purpose of a CSS framework?',
    options:['To create database structures',
    'To design user interfaces',
    'To handle server-side logic',
    'To manage network protocols'],
    correctIndex:1,
  },{
    question:'What is React?',
    options:[
      'A javascript bibrary for building user interface.',
      'A server-side scripting language.',
      'A database management system.',
      'A stylee sheet language.',
    ],
    correctIndex:1,
  },{
    question:'Which protocol is used to secure communication over a computer network,in web?',
    options:['FTP',
    'HTTP',
    'HTTPS',
    'SMTP'],
    correctIndex:2,
  },{
    question:'Which of the following is a server-side scripting language?',
    options:['HTML',
    'CSS',
    'javaScript',
    'PHP'],
    correctIndex:3,
  }
];

function Questions(){
  const[Fanswe,SetFanswer]=useState(Array(slidesData.length).fill(''));
  const[currentSlide,setCurrentSlide]= useState(0);
  const [correctAnswers]= useState(Array(slidesData.length).fill(false));
  const[submitted,setSubmitted] = useState(false);
  const navigate = useNavigate();
  //navigate is used for redirection.

  const handleInputChange =(value)=>{
    SetFanswer((previous)=>{
      const updateSlide =[...previous];
      updateSlide[currentSlide] = value;
      return updateSlide;
    });
  };
  const handleNext =()=>{
    setCurrentSlide((previous)=>Math.min(previous+1,slidesData.length-1));
  };
  const handlePrevious =()=>{
    setCurrentSlide((previous)=>Math.max(previous-1,0));
  };
  const handleSubmit = async()=>{
    try{
      const quizData = slidesData.map((slide,index)=>({
      question:slide.question,
      answered:Fanswe[index] || '',
      //Ensure F[index] is not null
      correctAnswer:Fanswe[index]===slide.options[slide.correctIndex],
      //checking the correct answer      
      }));
      //Mention your api endpoint for storing quiz results
      const response =await fetch('http://localhost:5001/SubmitQuiz',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({quizData}),
        
      });
      if(response.ok){
       alert('Submitted successfully');
      }else{
        alert('Error occurred during submitting');
      }
      setSubmitted(true);
    }
    catch(error){
      console.log('Error submitting',error);
    }
  };

  //Re-direct to Thankyou component after submitting
  useEffect(()=>{
    if(submitted){
      navigate('/Main/Thank');
      console.log('navigation is working');
    }
  },[submitted,navigate]);


return(
  <div className='contentStyle row m-0'>
    <div className='questions-container col-md-6'>
      <p style={{display:'flex',justifyContent:'end'}}>
        <QuizTime TimeExpire={() => setSubmitted(true)} /></p>
      <fieldset>
        {slidesData[currentSlide] ?(
          <>
          <legend>
            {currentSlide+1}.{slidesData[currentSlide].question}
          </legend>
          <p>select an answer:</p>
          {slidesData[currentSlide].options.map(
            (option,optionIndex)=>(
              <label key={optionIndex}>
                <input
                type='radio'
                name={currentSlide}
                value={option}
                checked={Fanswe[currentSlide] === option}
                onChange={()=>handleInputChange(option)}
                />
                <span>{option}</span>
              </label>
            ))}
            {/*displaying correct answer after submission */}
           {submitted &&(<p>your answer:
            {slidesData[currentSlide].options[correctAnswers[currentSlide]]}
           </p>)}
          </>
        ):(<p>
          data is not available.
        </p>)}
      </fieldset>
    </div>
    <div className='slider-controls col-md-6'>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div>
        <button type='button' className='btn btn-primary btn block'
        onClick={handlePrevious}
        disabled={currentSlide === 0}>Previous</button>
       </div>
       <div>
      <button type='button' onClick={handleNext}
      className='btn btn-primary btn block'
      disabled={currentSlide === slidesData.length-1}>
        Next
      </button>
      </div>

      </div>
      <div style={{display:'flex',justifyContent:'center'}}>
      <button type='button' className='btn btn-primary'
      onClick={handleSubmit}>
        Submit
      </button>
      
      </div>
      </div>
  </div>
  
);
        };
  
export default Questions;        