import React from "react";
import ApiPractice from "./components/practiceApi/ApiPractice";
import "./App.css";

function App() {
  app.io = require('socket.io')();
  app.io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('init', function (data) {
      console.log(data.name);
      socket.emit('welcome', `hello ${data.name}`);
    })
  })
  return (
    <>
      <ApiPractice />
    </>
  );
}

export default App;
