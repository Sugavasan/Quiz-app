import React, {useState } from "react";
import { useNavigate } from "react-router-dom";

function Intro(){
    const [showDetails,setShowDetails] = useState(false);
    
    const Done=()=>{
        setShowDetails(true)};
  
    /*here we are using AND operator to condiionally render either the
    intro and logical component.*/
return(
< div style={Place}>
    {!showDetails && (<>
    <h3>Welcome to <i>Test yourself</i>.</h3>
    <p>Here,you can test your knowledge by using Quiz in our website.</p>
    <button className="btn btn-primary" onClick={Done}>Take Quiz</button>
    </>)}
    {showDetails && <Details/>}
       
</div>);
};

function Details(){
    const [Tname,setTname]=useState('');
    const [TQualification,setQualify]=useState('');
    const[year,setYear]=useState('');
    const Navigate = useNavigate();

    const Submitting=()=>{
        if(Tname===''||TQualification===''||year===''){
            alert('please enter correctly user information');
        }else{
            alert('please wait 2 seconds');
            Navigate('/Main/home');
            UserInfo();
}
};
    const UserInfo=async()=>{
       try{
        const postUrl=await fetch('http://localhost:4200/userinfo',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({Tname,TQualification,year}),
        });
        if(postUrl.status === 200){
            alert('Waiting...');
        }else{
            alert('data saving error,please report to company');
        }
       }catch(error){
        alert('server is not responding please try again later.');
       };
    };
    

    return(<div className="container-fluid" style={Place}>
         <div className="card text-bg-light mb-5">
        <h3>Please enter your Details correctly before taking the test.</h3>
           
<label>Name:</label>
<input type="text"
value={Tname}
onChange={(e)=>setTname(e.target.value)} />
<label>Qualification:</label>
<input type="text"
value={TQualification}
onChange={(e)=>setQualify(e.target.value)} />
<label>Gratuation Year:</label>
<input type="text"
value={year}
onChange={(e)=>setYear(e.target.value)} /><hr/>
<button className="btn btn-success"onClick={Submitting}>Submit</button>
</div>
    </div>);
};
let Place={
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    height:'100vh',
};
export default Intro;