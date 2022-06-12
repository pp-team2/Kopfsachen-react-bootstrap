import React from 'react'
import { Button, Container, Card } from 'react-bootstrap'
import {useHistory} from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Wikientry = (props) => {

    const history = useHistory();
    return (
        <Container>
            <Button variant="outline-secondary" className="my-2" onClick={history.goBack}>
                <FiArrowLeft/>Zurück zur Übersicht
            </Button>
            <Card>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.content}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>

    )
}

export default Wikientry
