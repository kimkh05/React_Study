import React, { useState } from "react";
import styled from 'styled-components';

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={handleModal}>
          {isOpen === false ? "Open Modal" : "Opened"}
        </ModalBtn>

        {isOpen === false ? null : (
          <ModalBackdrop onClick={handleModal}>
            <ModalView>
              <div className="close-btn" onClick={handleModal}>
                &times;
              </div>
              <div className="desc">HELLO WORLD!</div>
            </ModalView>
          </ModalBackdrop>
        )}
      </ModalContainer>
    </>
  );
};
