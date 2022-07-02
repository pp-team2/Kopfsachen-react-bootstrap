import React, { useState } from "react";
import { Form, Button} from 'react-bootstrap';
import API from "./API";


export default function Login(props) {
  
  const [accountKey, setAccountKey] = useState("");

  const login = async() => {
    setAccountKey("")
    
      const login = await API.initLogin();
      const loginAction = login.ui.action
      const actionUrl = new URL(loginAction)

      const loggingIn = await API.submitLogin(login, accountKey);

      const session = loggingIn.session
      if (session) {
      }


      props.setExpertView({"Got flowID": actionUrl.searchParams.get("flow"), 
                            "AccountKey": accountKey,
                            "Auto-Login succeeded": "",
                            "SessionToken": loggingIn.session_token + " (expiring: " + session.expires_at + ")"
                          })
      props.check()
  };


  return (
    <>
      <h3 style={{display: props.sessionActive ? "none" : "block"}}>Mit Accountkey anmelden:</h3>
      <Form.Control type="text" value={accountKey}  onChange={(e) => setAccountKey(e.target.value)} placeholder="Accountkey" style={{display: props.sessionActive ? "none" : "block"}} />
    
      <Button variant="secondary" size="lg" onClick={login}  style={{display: props.sessionActive ? "none" : "block"}}>
      Login
      </Button>
    </>
  );
};

