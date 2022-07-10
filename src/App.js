import './App.css';
import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Button, ButtonGroup, Container, Row, Col, Stack } from 'react-bootstrap';
import Access from './components/Access';

function App(props) {


  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="10" lg="8" className='d-flex justify-content-center'>


      <ButtonGroup>

        <Stack gap={2}>
        <h1 className="center">Schön, dass du da bist!</h1>
        <LinkContainer to="/tagebuch">
          <Button variant="outline-secondary" size="lg">
          Ab zum Stimmungstagebuch!
          </Button>
        </LinkContainer>

        <Button variant="outline-secondary" size="lg">
        Ich möchte an meinen offenen Aufgaben weiterarbeiten
        </Button>

        <Access accountKey={props.accountKey} sessionActive={props.sessionActive} check={props.check} setExpertView={props.setExpertView} expertView={props.expertView}/>

        </Stack>
      </ButtonGroup>
      </Col>
      </Row>
      </Container>
  );
}

export default App;
