//main.js
import React from 'react';
import { Routes,Route} from 'react-router-dom';
import Questions from './home';
import Navbar from './navbar';
import About from './about';
import Footer from './footer';
import Intro from './index';
import Received from './Thank';
import Review from './review';

function Main(){
    console.log('Main Component....')
    return(
        
            <div>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Intro/>}/>
          <Route path="/home" element={<Questions/>} />
         <Route path="/about" element={<About/>} />
         <Route path="/Thank" element={<Received/>} />
         <Route path="/review" element={<Review/>} />
        </Routes>
        <Footer/>
        </div>
    
    );
}
export default Main;