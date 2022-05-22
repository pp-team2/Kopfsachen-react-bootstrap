import React from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useState } from 'react';

const Starkmacher = (props) => {
    const [starkmacherListe, setStarkmacherListe] = useState([
    {
        label:"Sicherheitsnetz",
        link:"/starkmacher/sicherheitsnetz",
        logo:"Platzhalter-1.png"
    },
    {
        label:"Situationskontrolle",
        link:"/starkmacher/situationskontrolle",
        logo:"Platzhalter-1.png"
    }      
        ]);
    
    return (
        <Container>
            <div>Du hast schon so viele Starkmacher für dich entdeckt.</div>
            <div>Wenn du an deinen bestehenden Starkmachern arbeiten willst, klicke einfach auf das entsprechende Symbol! Ansonsten bekommst du nach einem Klick auf “Neue Starkmacher entdecken” eine Auswahl an neuen Übungen vorgeschlagen.</div>
            <ListGroup>
            {starkmacherListe.map((item,key)=>
                <LinkContainer to={item.link}>
                <ListGroup.Item key={item.key}>
                    <img style={{height:"40px"}} src={item.logo}/> {item.label}
                </ListGroup.Item>
                </LinkContainer>
            )}
            </ListGroup>
            <LinkContainer to="/neueStarkmacher"><Button>Neue Starkmacher entdecken</Button></LinkContainer>
        </Container>
    )
}

export default Starkmacher

