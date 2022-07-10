import React from 'react'
import {Button, Container} from 'react-bootstrap'
import './tagebuch.css'
import Card from "react-bootstrap/Card";

const Tagebuch = () => {
    return (
      <Container className="d-grid gap-4">
        <Card className="center-tagebuch">
          <Card.Header>
            <h1>Hallo, wie geht's dir?</h1>
          </Card.Header>
          <Card.Body>
            <div>
              <Button href="/positiv" className="button-tagebuch" variant="success" size="lg">
                <div className="emoji">&#128513; &#129303; &#128578;</div>
              </Button>
              <Button href="" className="button-tagebuch" variant="warning" size="lg">
                <div className="emoji">&#128529; &#128531; &#128530;</div>
              </Button>
              <Button href="" className="button-tagebuch" variant="danger" size="lg">
                <div className="emoji">&#128545; &#128546; &#128577;</div>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    )
}

export default Tagebuch
