import React from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useState } from 'react';

const Starkmacher = (props) => {
    const [starkmacherListe, setStarkmacherListe] = useState([
    {
        label:"Sicherheitsnetz",
        link:"/starkmacher/sicherheitsnetz",
        logo:"testbild.jpg"
    },
    {
        label:"Situationskontrolle",
        link:"/starkmacher/situationskontrolle",
        logo:"testbild.jpg"
    }      
        ]);
    
    return (
        <Container>
            <div>Du hast schon so viele Starkmacher für dich entdeckt.</div>
            <div>Wenn du an deinen bestehenden Starkmachern arbeiten willst, klicke einfach auf das entsprechende Symbol! Ansonsten bekommst du nach einem Klick auf “Neue Starkmacher entdecken” eine Auswahl an neuen Übungen vorgeschlagen.</div>
            <br/>
            <ListGroup>
            {starkmacherListe.map((item,key)=>
                <LinkContainer to={item.link}>
                <ListGroup.Item key={item.key}>
                    <img style={{height:"100px",width:"200px"}} src={item.logo}/>&nbsp;
                    <span>{item.label}</span>
                </ListGroup.Item>
                </LinkContainer>
            )}
            </ListGroup>
            <br/>
            <LinkContainer to="/neueStarkmacher"><Button>Neue Starkmacher entdecken</Button></LinkContainer>

        </Container>
    )
}

export default Starkmacher

