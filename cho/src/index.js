import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

import socketio from 'socket.io-client';

const socket = socketio.connect('http://localhost:4000');

(() => {
    socket.emit('init', { name: 'bella' });
  
    socket.on('welcome', (msg) => {
      console.log(msg);
    });
    
})();
// import socketio from 'socket.io-client';

// const socket = socketio.connect('http://localhost:4000');

// (() => {
//     socket.emit('init', { name: 'bella' });
  
//     socket.on('welcome', (msg) => {
//       console.log(msg);
//     });
    
// })();
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
