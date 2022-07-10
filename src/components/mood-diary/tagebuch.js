import React from 'react';
import {Button, Container} from 'react-bootstrap';
import './tagebuch.css';
import Card from "react-bootstrap/Card";
// import { BsEmojiExpressionless } from "react-icons/bs";
import { FaRegSmile, FaRegGrinHearts, FaRegLaughBeam, FaRegMeh, FaRegFrown, FaRegAngry, FaRegSadCry } from "react-icons/fa";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFaceAngry } from '@fortawesome/free-solid-svg-icons';




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
                <div className="emoji">< FaRegSmile /> <FaRegLaughBeam /> <FaRegGrinHearts /></div>
              </Button>
              <Button href="" className="button-tagebuch" variant="warning" size="lg">
                <div className="emoji"><FaRegMeh /></div>
              </Button>
              <Button href="" className="button-tagebuch" variant="danger" size="lg">
                <div className="emoji"><FaRegFrown /> <FaRegAngry /> <FaRegSadCry /></div>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    )
}

export default Tagebuch
