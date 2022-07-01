import React, { useState } from "react";
import { Form, Button} from 'react-bootstrap';
import API from "./API";


export default function Login(props) {
  
  const [accountKey, setAccountKey] = useState("");
  const [info, setInfo] = useState([])


  const reset = () => {
    setInfo([])
    setAccountKey("")
  };


  const login = async() => {
    reset();
    
      const login = await API.initLogin();
      const loginAction = login.ui.action
      const actionUrl = new URL(loginAction)


      setInfo(info.push({"Got flowID": actionUrl.searchParams.get("flow")}))
      setInfo(info.push({"AccountKey": accountKey}))
  


      const loggingIn = await API.submitLogin(login, accountKey);

      const session = loggingIn.session
      if (session) {

        setInfo(info.push({"Auto-Login succeeded": ""}))
        setInfo(info.push({"SessionToken": loggingIn.session_token + " (expiring: " + session.expires_at + ")"}))
    
      }
      props.setExpertView(info)
      props.check()
  };


  return (

    < >
      <h3 style={{display: props.sessionActive ? "none" : "block"}}>Mit Accountkey anmelden:</h3>
      <Form.Control type="text" value={accountKey}  onChange={(e) => setAccountKey(e.target.value)} placeholder="Accountkey" style={{display: props.sessionActive ? "none" : "block"}} />
    
      <Button variant="secondary" size="lg" onClick={login}  style={{display: props.sessionActive ? "none" : "block"}}>
      Login
      </Button>
    </>
  );
};

