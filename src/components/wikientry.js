import React from 'react'
import { Button, Container, Card } from 'react-bootstrap'
import {useHistory} from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import {LinkContainer} from 'react-router-bootstrap'

const Wikientry = (props) => {

    console.log(props)

    const history = useHistory();
    return (
        <Container>
            <Button variant="outline-secondary" className="my-2" onClick={history.goBack}>
                <FiArrowLeft/>Zurück zur Übersicht
            </Button>
            <Card>
                <Card.Body>
                    <Card.Title>{props.object.title}</Card.Title>
                    <Card.Text>
                    {props.object.contents.map(content => {
                        if(content.type === "text"){
                            return content.content
                        } else{
                            return <LinkContainer to={`#`}>
                            <Button variant="link" className="py-0 px-1">
                                {content.content}
                            </Button>
                         </LinkContainer>
                        }
                    })}
                       
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>

    )
}

export default Wikientry

