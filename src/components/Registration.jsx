import React, { useState, useCallback, useContext, useReducer } from "react";
import { Button, ButtonGroup, Stack } from 'react-bootstrap';
import API from "./API";

export default function Registration() {
  
  const [pending, setPending] = useState(false);
  const [accountKey, setAccountKey] = useState("");
  const [preLines, dispatch] = useReducer(lineReducer, []);
  
  const register = async() => {
    reset();
    setPending(true);
    dispatch(addLineAction("Initiating registration..."));
    
    try {
      // Fetch flow
      const registrationAction = await API.initRegistration();
      const actionUrl = new URL(registrationAction)

      dispatch(addLineAction(`Got flowID: ${actionUrl.searchParams.get("flow")}`));
   
      dispatch(addLineAction("Submitting registration with flowId..."));
      const registration = await API.submitRegistration(actionUrl);

 console.log(registration)
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
  };

  const reset = () => {
    dispatch(resetLineAction());
    setAccountKey("");
  };

  return (


<div id="registration">
<ButtonGroup className="mb-2">
<Stack gap={2} className="col-md-5 mx-auto">
  <Button variant="success" size="lg" disabled={pending} onClick={register}>
  Neues Benutzerkonto erstellen
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