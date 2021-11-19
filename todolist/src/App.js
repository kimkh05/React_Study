import React from "react";
import "./App.css";
import Test from "./components/test/Test";
import Modal from './modal';
import * as S from "./components/test/style";

function App() {
  return (
    <>
      <S.ModalBtn />
      <Modal/>
    </>
  );
}

export default App;
