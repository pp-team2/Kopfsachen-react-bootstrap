import React, { useState } from "react";
import { Button, Toast } from 'react-bootstrap';

export default function Expertensicht(props) {
  
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  


  return (
    <>
      <Button onClick={toggleShowA} className="mb-2"  style={{display: !props.sessionActive ? "none" : "block"}}>
              <strong>Expertenansicht: </strong> Accountdetails
      </Button>
      <Toast show={showA} onClose={toggleShowA} >
        <Toast.Header>
          <strong className="me-auto">Accountdetails</strong>
        </Toast.Header>
        <Toast.Body>
        <pre>
          {props.preLines.map(x => JSON.stringify(x) + "\n")}
        </pre>
        </Toast.Body>
      </Toast>
    </>
  );
};

