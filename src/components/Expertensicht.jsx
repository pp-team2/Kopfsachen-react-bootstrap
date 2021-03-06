import React, { useState } from "react";
import { Button, Toast } from 'react-bootstrap';

export default function Expertensicht(props) {
  
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  


  return (
    <>
      <Button  variant="secondary" onClick={toggleShowA} className="mb-2"  style={{display: !props.sessionActive ? "none" : "block"}}>
        <strong>Expertenansicht: </strong> Accountdetails
      </Button>
      <Toast show={showA} onClose={toggleShowA} style={{"width": "100%"}}>
        <Toast.Header>
          <strong className="me-auto">Accountdetails</strong>
        </Toast.Header>
        <Toast.Body>
        <pre>
          {/*props.preLines.map(x => JSON.stringify(x) + "\n")*/}
          {
           JSON.stringify(props.preLines) != "[]"?JSON.stringify(props.preLines).replaceAll(',', '\n').replaceAll('}', "").replaceAll('{', "").replaceAll('"', "").replaceAll(':', ': '): JSON.stringify({"AccountKey" : props.accountKey})
          
          }
        </pre>
        </Toast.Body>
      </Toast>
    </>
  );
};

