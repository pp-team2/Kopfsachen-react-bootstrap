import './App.css';
import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Button, ButtonGroup, Stack } from 'react-bootstrap';
import Registration from './components/Registration';
import Login from './components/Login';
import Expertensicht from "./components/Expertensicht"
import Logout from './components/Logout';
import Access from './components/Access';

function App(props) {


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

        <Access sessionActive={props.sessionActive} check={props.check} setExpertView={props.setExpertView} expertView={props.expertView}/>

        </Stack>
      </ButtonGroup>
    </div>
  );
}

export default App;
