import React from 'react';
import './App.css';
import { createGlobalStyle } from 'styled-components';
import Test from './components/test/Test';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Test />
      <div>안녕하세요</div>
    </>
  );
}

export default App;
