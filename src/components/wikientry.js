import React from 'react'
import { Container } from 'react-bootstrap'

const wikientry = (props) => {
    return (
        <Container>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
        </Container>
    )
}

export default wikientry
