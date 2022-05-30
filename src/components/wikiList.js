import {React, useState} from 'react'

import { Button, Container, ListGroup, Form, FormControl } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


const Wiki = (props) => {

    const [search, setNewSearch] = useState("");

    const handleSearchChange = (e) => {
      setNewSearch(e.target.value);
    };
  
    const filtered = !search
      ? props.list
      : props.list.filter((entry) => {
        return entry.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
 
    });

    return (
        <Container>
            <h1>Willkommen im Wiki</h1>

            <Form className="d-flex my-3" >
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search} 
                onChange={handleSearchChange} 
                />
                <Button variant="outline-secondary">Search</Button>
            </Form>

            <ListGroup >
            {
                filtered.map((entry, index) => 
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                    key={index}>
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">{entry.title}</div>
                    {
                
                            <LinkContainer key={index} 
                             style={{backgroundColor: 'white', color: 'black', display: 'block', border: 'none', textAlign: 'left'}}
                             to={`/wiki/${entry.id.replace(/\s+/g, '')}`}>
                                <Button>
                                    {entry.title}
                                </Button>
                            </LinkContainer>
                        
                    }
                    </div>
                </ListGroup.Item>
                )
            }
            </ListGroup>
        </Container>
    )
}

export default Wiki

