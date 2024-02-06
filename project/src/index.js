import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import SecondApp from './second/Sapp';
//import Color from './Color';
//import Samp from './sam/Apps';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

   <SecondApp/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
