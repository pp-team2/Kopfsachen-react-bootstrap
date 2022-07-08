import React, { useState } from "react";
import { Form, Button, Modal, Alert} from 'react-bootstrap';
import Login from './Login'
import { FiUser } from "react-icons/fi";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Registration from "./Registration";


export default  function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <Button variant="success" onClick={handleShow} style={{display: props.sessionActive ? "none" : "block"}}>
        Anmelden <FiUser />      
        </Button>

      <Modal show={show} onHide={handleClose} animation={true} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Anmeldung</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Login sessionActive={props.sessionActive} check={props.check} setExpertView={props.setExpertView}  />       
        


        <Alert variant="success" style={{display: props.sessionActive ? "block" : "none", textAlign:"center"}}>
          <Alert.Heading>Erfolgreich angemeldet! </Alert.Heading>
          <p>
            Dein Accountkey: 
           <b>{props.accountKey}</b>
          </p>

        </Alert>

        </Modal.Body>
        <Modal.Footer>
        <Registration sessionActive={props.sessionActive} check={props.check} setExpertView={props.setExpertView} /> 
          <Button variant="secondary" onClick={handleClose}>
            Schließen
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}
