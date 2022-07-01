import React, { useState } from "react";
import {Button } from 'react-bootstrap';
import API from "./API";

export default function Registration(props) {
  

  const register = async() => {
      const reg = await API.initRegistration();
      const registrationAction = reg.ui.action
      const actionUrl = new URL(registrationAction)

      const registration = await API.submitRegistration(reg);

      const session = registration.session
      if (session) {
        //setInfo(info.push({"Auto-Login succeeded": ""}))
        //setInfo(info.push({"SessionToken": registration.session_token + " (expiring: " + session.expires_at + ")"}))

        /*
        setInfo([{"Got flowID": actionUrl.searchParams.get("flow")}, 
                 {"AccountKey": registration.identity.traits.accountKey},
                 {"Auto-Login succeeded": ""},
                 {"SessionToken": registration.session_token + " (expiring: " + session.expires_at + ")"}
      ])
      */
      }


    props.setExpertView([   {"Got flowID": actionUrl.searchParams.get("flow")}, 
                            {"AccountKey": registration.identity.traits.accountKey},
                            {"Auto-Login succeeded": ""},
                            {"SessionToken": registration.session_token + " (expiring: " + session.expires_at + ")"}
                        ])
    props.check()
  };


  return (
    <>
      <Button variant="success" size="lg" onClick={register} style={{display: props.sessionActive ? "none" : "block"}}>
      Neues Benutzerkonto erstellen
      </Button>
    </>
  );
};
