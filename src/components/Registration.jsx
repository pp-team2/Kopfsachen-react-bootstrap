import React, { useState, useEffect, useCallback, useContext, useReducer } from "react";
import { Button, ButtonGroup, Stack } from 'react-bootstrap';
import API from "./API";

export default function Registration(props) {
  
  const [pending, setPending] = useState(false);
  const [accountKey, setAccountKey] = useState("");
  const [preLines, dispatch] = useReducer(lineReducer, []);
  


  /*
  const [sessionActive, setSessionActive] = useState(false);

  const checkSession = async () => {
      const jsonRes = await API.checkSession();
      const isSessionActive = !(jsonRes.hasOwnProperty("error"));
      setSessionActive(isSessionActive);

      console.log(jsonRes)
      console.log("active:" + sessionActive)
  }


  useEffect(checkSession);
  
  */
  


  const register = async() => {
    reset();
    setPending(true);
    dispatch(addLineAction("Initiating registration..."));
    
    try {
      // Fetch flow
      
      const reg = await API.initRegistration();
      const registrationAction = reg.ui.action
      const actionUrl = new URL(registrationAction)

      console.log(reg)
      console.log(registrationAction)

      dispatch(addLineAction(`Got flowID: ${actionUrl.searchParams.get("flow")}`));
   
      dispatch(addLineAction("Submitting registration with flowId..."));
      const registration = await API.submitRegistration(reg);


      dispatch(addLineAction("Received registration response:"));
      dispatch(addLineAction(`AccountKey: ${registration.identity.traits.accountKey}`))

      const session = registration.session
      if (session) {
        dispatch(addLineAction("Auto-Login succeeded"));
        dispatch(addLineAction(`SessionToken: ${registration.session_token} (expiring: ${session.expires_at})`))
      }

    } catch (e) {
      dispatch(addLineAction(e.toString()));
    }
    setPending(false);

    
    console.log(props)
    console.log(props.check)
    props.check()
  };


  const logout = async() => {
    
      
      const out = await API.initLogout();
      const token = out.logout_token;
      
      const l = await API.submitLogout(token);
      console.log(l)

      reset();
      setPending(true);
      dispatch(addLineAction("Erfolgreich ausgeloggt"));
      props.check()

      //setSessionActive(false);

  };

  const reset = () => {
    dispatch(resetLineAction());
    setAccountKey("");
  };

  return (


<div id="registration">
<ButtonGroup className="mb-2">
<Stack gap={2} className="col-md-5 mx-auto">
  <Button variant="success" size="lg" onClick={register} style={{display: props.sessionActive ? "none" : "block"}}>
  Neues Benutzerkonto erstellen
  </Button>
  <Button variant="success" size="lg" onClick={logout}  style={{display: !props.sessionActive ? "none" : "block"}}>
  Ausloggen
  </Button>
  <pre>
    {preLines.map(s => s + "\n")}
  </pre>
  <p style={{fontWeight: 'bold'}}></p>
  </Stack>
</ButtonGroup>





</div>

  );
};

// State management
const resetLineAction = () => ({ type: 'RESET' });
const addLineAction = (line) => ({ type: 'ADD', newLine: line });
const lineReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return state.concat([action.newLine])
    case 'RESET':
      return [];
    default:
      throw new Error("Invalid dispatch action for lines")
  }
};