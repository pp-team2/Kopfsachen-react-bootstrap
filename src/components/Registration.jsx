import React, { useState, useReducer } from "react";
import {Button } from 'react-bootstrap';
import API from "./API";

export default function Registration(props) {
  

  const [info, setInfo] = useState([])


  const register = async() => {
    reset();

      const reg = await API.initRegistration();
      const registrationAction = reg.ui.action
      const actionUrl = new URL(registrationAction)

      setInfo(info.push({"Got flowID": actionUrl.searchParams.get("flow")}))
      const registration = await API.submitRegistration(reg);

      setInfo(info.push({"AccountKey": registration.identity.traits.accountKey}))

      const session = registration.session
      if (session) {
        setInfo(info.push({"Auto-Login succeeded": ""}))
        setInfo(info.push({"SessionToken": registration.session_token + " (expiring: " + session.expires_at + ")"}))
      }

    props.setExpertView(info)
    props.check()
  };

  const reset = () => {
    setInfo([])
  };



  return (
    <>
      <Button variant="success" size="lg" onClick={register} style={{display: props.sessionActive ? "none" : "block"}}>
      Neues Benutzerkonto erstellen
      </Button>
    </>
  );
};
