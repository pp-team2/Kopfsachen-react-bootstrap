import React, { useState } from "react";
import { Form, Button} from 'react-bootstrap';
import API from "./API";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FiArrowRightCircle } from "react-icons/fi";



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
                            "SessionToken": session.id + " (expiring: " + session.expires_at + ")"
                          })
      props.check()
  };


  return (
    <>
      <Container>
          <h3 style={{display: props.sessionActive ? "none" : "block", textAlign:"center", marginBottom: "30px"}}>Mit Accountkey anmelden:</h3>
      <Row className="justify-content-md-center">
        <Col xs="8">
        <Form.Control type="text" value={accountKey}  onChange={(e) => setAccountKey(e.target.value)} placeholder="Accountkey" style={{display: props.sessionActive ? "none" : "block"}} />
        </Col>
        <Col xs="4">
        <Button variant="success"  onClick={login}  style={{display: props.sessionActive ? "none" : "block", marginBottom: "30px", width: "100%" }}>
          Einloggen <FiArrowRightCircle/>
        </Button>
        </Col>
      </Row>
    </Container>
    </>
  );
};

