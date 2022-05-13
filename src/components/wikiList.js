import React from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const wiki = (props) => {


console.log(props)
    return (
        <Container>
            <h1>Willkommen im Wiki</h1>

            <ListGroup >
            {
                props.list.map(entry => 
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                    key={entry.letter}>
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">{entry.letter}</div>
                    {
                        Object.values(entry.entries).map(item => (
                            <LinkContainer to={`/wiki/${item.title.replace(/\s+/g, '')}`}>
                            <li key={item.title}>
                                {item.title}
                             </li>
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

