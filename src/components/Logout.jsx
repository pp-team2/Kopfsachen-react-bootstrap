import React, { useState } from "react";
import {Button } from 'react-bootstrap';
import API from "./API";

export default function Logout(props) {
  


  const logout = async() => {
      const out = await API.initLogout();
      const token = out.logout_token;
      
      const l = await API.submitLogout(token);
   
      props.setExpertView({"Erfolgreich ausgeloggt": ""})
      props.check()
  };



  return (
    <>
      <Button variant="success" size="lg" onClick={logout}  style={{display: !props.sessionActive ? "none" : "block"}}>
      Ausloggen
      </Button>
    </>
  );
};
