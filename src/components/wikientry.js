import React from 'react'
import { Container } from 'react-bootstrap'
import {useHistory} from "react-router-dom";

const Wikientry = (props) => {

    const history = useHistory();
    return (
        <Container>
            <button onClick={history.goBack}>Back</button>

            <h1>{props.title}</h1>
            <p>{props.content}</p>
        </Container>
    )
}

export default Wikientry
