import React, { useState } from 'react';
import Login from './Login';
import Main from './Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
const[isCorrect,setCorrect] = useState(false);

const Success=()=>{ setCorrect(true)

console.log('its working')};
return(
      <div>
        <Router>
            <Routes>
                <Route path='/'
                element={isCorrect ?(<Main/>):(<Login onLoginSuccess={Success}/>
                )
            }/>

           <Route path='/Main/*' element={<Main/>}/> 
                 
            </Routes>
        
  </Router>
      </div>
  );
}

export default App;
