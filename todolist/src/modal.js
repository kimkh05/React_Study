import React, { useState, setState } from "react";
import styled from "styled-components";

function Modal() {
  const [settingModal, setSettingModal] = useState(false);
 
const toggleModalSetting = () => {
  if (settingModal === false) {
    setSettingModal(true);
  }
  if (settingModal === true) {
    setSettingModal(false);
  }
};
  class SingleUserNav extends React.Component {  
    constructor(props) {
      super(props);
      this.state = {
        settingModal: false
      };
    this.toggleModalSetting = this.toggleModalSetting.bind(this);
    };
   
    toggleModalSetting() {
      const { settingModal } = this.state;
      if(settingModal === false) {
        this.setState {
          settingModal: true
        };
      };
      if(settingModal === true) {
        this.setState {
          settingModal: false
        };
      };
    };
  };
}
