import './App.css';
import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Button, ButtonGroup, Stack } from 'react-bootstrap';
import Registration from './components/Registration';
import Login from './components/Login';
import { useState } from 'react';
import Expertensicht from "./components/Expertensicht"
import Logout from './components/Logout';

function App(props) {

  const [expertView, setExpertView] = useState([])

  return (
    <div className="App">
      <h1>Schön, dass du da bist!</h1>

      <ButtonGroup className="mb-2">
        <Stack gap={2} className="col-md-5 mx-auto">
        <LinkContainer to="/tagebuch">
          <Button variant="outline-secondary" size="lg">
          Ab zum Stimmungstagebuch!
          </Button>
        </LinkContainer>

        <Button variant="outline-secondary" size="lg">
        Ich möchte an meinen offenen Aufgaben weiterarbeiten
        </Button>

        <Registration sessionActive={props.sessionActive} check={props.check} setExpertView={setExpertView} />  

        <br></br>
        <Login sessionActive={props.sessionActive} check={props.check} setExpertView={setExpertView}  />

        <Logout sessionActive={props.sessionActive} check={props.check} setExpertView={setExpertView} />

        <Expertensicht preLines={expertView} sessionActive={props.sessionActive} />

        </Stack>
      </ButtonGroup>
    </div>
  );
}

export default App;
