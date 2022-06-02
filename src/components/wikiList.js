import {React, useState} from 'react'

import { Button, Container, ListGroup, Form, FormControl } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


const Wiki = (props) => {

    const [search, setNewSearch] = useState("");

    const handleSearchChange = (e) => {
      setNewSearch(e.target.value);
    };
  
    const filtered = !search
      ? props.list.sort((a,b) => a.title[0].localeCompare(b.title[0]))
      : props.list.filter((entry) => {
        return entry.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }).sort((a,b) => a.title[0].localeCompare(b.title[0]));


    const data = filtered.reduce((r, e) => {
        let letter = e.title[0].toUpperCase();
      
        if (!r[letter]) r[letter] = { letter, record: [e] }
      
        else r[letter].record.push(e);
    
        return r;
      }, {});
      
    const result = Object.values(data);

    return (
        <Container>
            <h1>Willkommen im Wiki</h1>

            <Form className="d-flex my-3" >
                <FormControl
                type="search"
                placeholder="Nach Titel suchen"
                aria-label="Search"
                value={search} 
                onChange={handleSearchChange} 
                />
            </Form>

            <ListGroup >
            {
                result.map((entry, index) => 
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                    key={index}>
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">{entry.letter}</div>
                    {
                        entry.record.map((titleentry, i) => 
                            <LinkContainer key={i} 
                             style={{backgroundColor: 'white', color: 'black', display: 'block', border: 'none', textAlign: 'left'}}
                             to={`/wiki/${titleentry.id.replace(/\s+/g, '')}`}>
                                <Button>
                                    {titleentry.title}
                                </Button>
                            </LinkContainer>
                        )
                        
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

