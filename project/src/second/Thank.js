import React,{useState,useEffect} from "react";

function Thank(){
    const[resultQuiz,SetResultQuiz] = useState({totalCorrect:0});
    const [Name,setName] = useState('');
    const [Message,setMessage] = useState('');

    useEffect(()=>{
      fetch('http://localhost:5001/getQuizData')
      .then((response)=>response.json())
      .then((Cdata)=>SetResultQuiz(Cdata));
  },[]);

    const FeedSubmit=()=>{
      if(Name ===''||Message === ''){
        alert('Please fill correctly!');
      }else{
        alert('received Successfully');
        window.location.reload();
        userFeedback();
      }
    };

   const userFeedback=async()=>{
    try{
      const Feed = await fetch('http://localhost:4200/feedinfo',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({Name,Message}),
    });
        if(Feed.status === 200){
          alert('Received Successfully!!!');
        }else{
          console.log('Error Please try again later')
        }
      
    }catch(error){
      error('error occured Please contact Administrator');
    }
   };  

    return(
        <div style={style}>
            <h1>Thankyou for submitting the Quiz!</h1>
       <h3>YourScore:{resultQuiz.totalCorrect}</h3>
        
           <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#thankModal" data-bs-whatever="@mdo">Feedback</button>
<div className="modal fade" id="thankModal" tabindex="2" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Feedback</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Name:</label>
            <input type="text" className="form-control" value={Name} 
            onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Message:</label>
            <textarea type='text' className="form-control" value={Message}
              onChange={(e)=>setMessage(e.target.value)}>
            </textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={FeedSubmit}>Send message</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

const style={
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    minHeight:'100vh',
    padding:'20px',
};

export default Thank;