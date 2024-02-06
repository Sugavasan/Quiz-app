import './ques.css';
import React, { useState } from 'react';

function Footer(){
  const[customer,setUsername]=useState('');
  const[cMessage,setMess]= useState('');
  const[cEmail,setEmail]=useState('');

  const Replied =()=>{
    if(customer===''||cMessage===''||cEmail===''){
      alert('Please fill correctly!!!');
    }else{
      alert('Recived Successfully!')
      window.location.reload();      
      serv();  //call the server to handle the form submission.
    }
  };
  const serv =async()=>{
    try{
      const Feed = await fetch('http://localhost:4200/Cont',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({customer,cMessage,cEmail}),
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
    <footer>
        <div className='container-fluid row mt-3' style={Style}>
            <div className='col'>
                <h3>Links</h3>
                <h5>Terms of
                  service</h5>
                <h5>affilate</h5>
            </div>
            <div className='col'>
                <h3>About Us</h3>
                <h5>Our Story</h5>
                <h5>Blog</h5> 
            </div>
            <div className='col'>
                <h3>Support service</h3>
                <h6><h5 type="button" data-bs-toggle="modal" data-bs-target="#contactModal" data-bs-whatever="@mdo">Contact</h5>
<div className="modal fade" id="contactModal" tabindex="2" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" style={{color:'black'}} id="exampleModalLabel">Contact</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form style={{color:'black'}}>
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Name:</label>
            <input type="text" className="form-control" value={customer} 
            onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div className="mb-3">
          <label for="recipient-name" className="col-form-label">Email:</label>
            <input type="text" className="form-control" value={cEmail} 
            onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Message:</label>
            <textarea type='text' className="form-control" value={cMessage}
              onChange={(e)=>setMess(e.target.value)}>
            </textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={Replied}>Send message</button>
      </div>
    </div>
  </div>
            </div></h6>
                <h5>FAQ</h5>
            </div>
            <div className='col'>
                <h3>Follow Us</h3>
                <h5><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i class="fa fa-facebook" aria-hidden="true" style={{marginRight:'10px'}}></i></a>
               <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer"><i class="fa fa-whatsapp" aria-hidden="true" style={{marginRight:'10px'}}></i></a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i class="fa fa-instagram" aria-hidden="true" style={{marginRight:'10px'}}></i></a>
                </h5>
                
            </div>
        </div>
    </footer>
    );
}

const Style={
  backgroundColor:'black',
  color:'white',
  margin:'0px',

};

export default Footer; 