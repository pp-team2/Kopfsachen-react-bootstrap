import React from 'react';
import {Button, Container} from 'react-bootstrap';
import './tagebuch.css';
import Card from "react-bootstrap/Card";
// import { BsEmojiExpressionless } from "react-icons/bs";
import { FaRegSmile, FaRegGrinHearts, FaRegLaughBeam, FaRegMeh, FaRegFrown, FaRegAngry, FaRegSadCry } from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
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
              <LinkContainer to="/positiv">
                <Button className="button-tagebuch positive" variant="success" size="lg">
                  <div className="emoji">< FaRegSmile /> <FaRegLaughBeam /> <FaRegGrinHearts /></div>
                </Button>
              </LinkContainer>
              <LinkContainer to="/neutral">
                <Button href="" className="button-tagebuch neutral" variant="warning" size="lg">
                  <div className="emoji"><FaRegMeh /></div>
                </Button>
              </LinkContainer>
              <LinkContainer to="/negativ">
                <Button href="" className="button-tagebuch negative" variant="danger" size="lg">
                  <div className="emoji"><FaRegFrown /> <FaRegAngry /> <FaRegSadCry /></div>
                </Button>
              </LinkContainer>
            </div>
          </Card.Body>
        </Card>
      </Container>
    )
}

export default Tagebuch
