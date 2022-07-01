import React, { useState, useReducer } from "react";
import {Button } from 'react-bootstrap';
import API from "./API";

export default function Logout(props) {
  

  const [info, setInfo] = useState([])

  const logout = async() => {
      const out = await API.initLogout();
      const token = out.logout_token;
      
      const l = await API.submitLogout(token);
      reset();

      setInfo(info.push({"Erfolgreich ausgeloggt": ""}))
      props.setExpertView(info)
      props.check()
  };

  const reset = () => {
    setInfo([])
  };


  return (
    <>
      <Button variant="success" size="lg" onClick={logout}  style={{display: !props.sessionActive ? "none" : "block"}}>
      Ausloggen
      </Button>
    </>
  );
};
