

const submitToServer=async (url,method,headers,
  data,isLogin,navigate)=>{


  try{
    const response = await fetch(url,{
        method,
        headers,
    body:JSON.stringify(data),
    });
 //The spread syntax is used to include all properties from the headers object while also adding or overriding the 'Content-Type': 'application/json' property.
 
    const responseData = await response.json();
    if(response.ok){
      if(isLogin){
        alert('Login Success!');
       navigate('/Main/');
       console.log('LoginSuccessfull!',responseData);
      }else{
        alert('Registered Successfully!')
        console.log('Registered Successfully!',responseData);
        
      }
    }else{
      alert('Dear Guest,Please Register and coninue!!!');
      console.error('server error:',responseData.error);
    }
    }catch(error){
      console.error('Error occured',error);
    alert("Error submitting");
    }
 } ; 
 

 export default submitToServer;