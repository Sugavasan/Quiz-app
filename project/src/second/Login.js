//login.js
import React,{useState} from 'react';
import './Style.css';
import submitToServer from './connecLogin';
import { useNavigate } from 'react-router-dom';

function Login({toggle,onLoginSuccess}){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const Emailregex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    
    const navigate = useNavigate();
    
    const Checking =() => {
    
        if (email === "" || password === "") {
            alert("Fields cannot be empty");
        } else if (!Emailregex.test(email)) {
            alert("Please Enter Correctly!");
        } 
        else {
            const data={
                email:email,
                password:password,
            };
            
            //passing history here for navigation
            submitToServer('http://localhost:5000/Login','POST',{
             'Content-Type':'application/json',   
            },data,true,navigate);
            
        } 
        }
    

return(
    <div className='login-container'>
        <div className="card-body bg-light mb-3">
        <h2 className='head'><i>TestYourself</i></h2>
        <h3 style={{textAlign:'center'}}>Sign in</h3>
        <form>
            <table>
       <tr>
       <tr><label>Email</label></tr>
        <td>
        <input type='email'
        placeholder='Email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)} />
        </td>
        </tr>

<tr>
<tr><label>password</label></tr>
    <td>
       <input type='password'
       placeholder='password'
       value={password}
       onChange={(e)=>setPassword(e.target.value)} />
       </td>
       </tr>
       <br/>
       </table>
      <table>
        <tr>
            <td>
      <button className="btn btn-primary btn-block " id="move"
       type='button'  onClick={Checking}>Login</button>
       </td>
       </tr>
       <tr>
        <td className='rowe'>
            <>Forget Password?</>
        <p onClick={toggle}>Don't have an account? join</p>
        </td>
       </tr>
       <hr/>
       </table>
       </form>
       </div>
    </div>
)
};

function Signup({toggle}){
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[cpassword,setPasswordc]=useState("");
    const[passwordError,setPasswordError] = useState("");
    const[ConfirmPasswordError,setConfirmPasswordError]=useState("");

    const Emailregex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
   
    const Checking = () =>{
        if(email===""||password===""){
            alert("Fields cannot be empty");
        }else if(!Emailregex.test(email)){
            alert("Please Enter Correctly!");
        }else if(password!==cpassword){
          setPasswordError("password do not match");
          setConfirmPasswordError("password do not match");
        }
        else{
            const data={
                name:name,
                email:email,
                password:password,
            };
            submitToServer('http://localhost:5000/signup','POST',{
             'Content-Type':'application/json',   
            },data,false);
          //for re-loading page after successfully registered.
            window.location.reload();
        }
    };


return(
    <div className='login-container'>
     <div className='card-body bg-light mb-3' style={{width:'100%'}}>
        <h3 style={{textAlign:'center'}}>SignUp</h3>
        <form>
            <table>
       <tr>
       <tr><label>Name</label></tr>
        <td>
        <input type='name'
        placeholder='Name'
        value={name}
        name='Sname'
        onChange={(e)=>setName(e.target.value)} />
        </td>
        </tr>
        <tr>
       <tr><label>Email</label></tr>
        <td>
        <input type='email'
        placeholder='Email'
        value={email}
        name='Semail'
        onChange={(e)=>setEmail(e.target.value)} />
        </td>
        </tr>

<tr>
<tr><label>password</label></tr>
    <td>
       <input type='password'
       placeholder='password'
       value={password}
       name='password1'
       onChange={(e)=>setPassword(e.target.value)} />
       </td>
       </tr>
       <span className='error'>{passwordError}</span> 
       <tr>
       <tr><label>ConfirmPassword</label></tr>
        <td>
        <input type='password1'
        placeholder='confirm password'
        value={cpassword}
        name='password2'
        onChange={(e)=>setPasswordc(e.target.value)} />
        </td>
        </tr>
        <span className='error'>{ConfirmPasswordError}</span>
       
       </table>
      <table>
        <tr>
            <td>
      <button className="btn btn-primary btn-block " id="move2"
      type='button' onClick={Checking}>SignUp</button>
       </td>
       </tr>
       <tr>
        <td className='rowe'>
            <p>Forget Password?</p>
        <p onClick={toggle}>Already have an account? Signup</p>
        </td>
        <hr/>
       </tr>
       </table>
       </form>
       </div>
    </div>
)
};

function Auth(){
    const[isLogin,setIsLogin] = useState(true);

    const toggle = () =>{
        setIsLogin(!isLogin);
    };
    return(
        <div className="login-container">
        
            {isLogin?
            (<Login toggle={toggle} />):(<Signup toggle={toggle}/>)}
        </div>
    );
}
export default Auth;
