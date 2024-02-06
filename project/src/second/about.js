import React from 'react';

function About(){
    return (
      <div style={contentStyle}>
        
        <h5><p style={{marginLeft:'500px'}}>
        <b>About Us</b></p>
        <p style={{marginLeft:'201px'}}>
        we created this website for learners and
        we belive that learning can be both enlightening and  entertainment.<br/>Dive
        into a world of knowledge where every question is a step toward enchancing
        your understanding,<br/>let the Quest for knowledge begin.
 </p>
        </h5>
      </div>
    );
  };

   
  

const contentStyle={
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    height:'100vh',
    margin:'0px',
};

export default About;