import React from 'react'
import { Button, Container, ListGroup ,InputGroup,FormControl} from 'react-bootstrap'

const Reframing = () => {
    return (
        <Container>
            <div>Welche Situation belastet dich gerade? Vielleicht gibt es auch mehrere, dann gehe die folgenden Schritte für jede Situation einzeln durch. </div>
            <InputGroup>
		    <InputGroup.Text id="basic-addon1">Situation 1</InputGroup.Text>
		    <FormControl aria-describedby="basic-addon1"/ >
		  	</InputGroup>
		  	<InputGroup>
		    <InputGroup.Text id="basic-addon2">Situation 2</InputGroup.Text>
		    <FormControl aria-describedby="basic-addon2"/ >
		  	</InputGroup>
		  	<InputGroup>
		    <InputGroup.Text id="basic-addon3">Situation 3</InputGroup.Text>
		    <FormControl aria-describedby="basic-addon3"/ >
		  	</InputGroup>
		  	<InputGroup>
		    <InputGroup.Text id="basic-addon4">Situation 4</InputGroup.Text>
		    <FormControl aria-describedby="basic-addon4"/ >
		  	</InputGroup>
		  	<Button>Das sind alle Situation, die mich beschäftigen</Button>
        </Container>
    )
}

export default Reframing
