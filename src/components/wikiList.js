import React from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


const wiki = (props) => {


console.log(props)
    return (
        <Container>
            <h1>Willkommen im Wiki</h1>

            <ListGroup >
            {
                props.list.map((entry, index) => 
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                    key={index}>
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">{entry.letter}</div>
                    {
                        Object.values(entry.entries).map((item, index) => (
                            <LinkContainer key={index} 
                             style={{backgroundColor: 'white', color: 'black', display: 'block', border: 'none', textAlign: 'left'}}
                             to={`/wiki/${item.title.replace(/\s+/g, '')}`}>
                                <Button>
                                    {item.title}
                                </Button>
                            </LinkContainer>
                        ))
                    }
                    </div>
                </ListGroup.Item>
                )
            }
            </ListGroup>

         
                
         
        </Container>
    )
}

export default wiki

