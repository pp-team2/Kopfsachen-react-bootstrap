import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './aktivitaet.css';
import { FiArrowLeft } from "react-icons/fi";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


export default class AktiviatetHilfe extends React.Component {
    constructor(props) {
        super(props);

        let activity = this.props.activity[0];
        this.state = {id: activity.id, text: activity.text, picture: activity.picture, placeID: activity.placeID, 
            feedback: [{timestamp: '', comment: '', itHelped: false}], 
            comment1: '', comment2: '', comment3: '',
            timestamp1: '', timestamp2: '', timestamp3: ''};

        this.ressourceKommentiert = this.ressourceKommentiert.bind(this);
        this.textChange = this.textChange.bind(this);
        this.backButtonClicked = this.backButtonClicked.bind(this);
    }

    ressourceKommentiert() {
        let newComments = [];
        let comment1 = this.state.comment1;
        let comment2 = this.state.comment2;
        let comment3 = this.state.comment3;

        let timestamp1 = this.state.timestamp1;
        let timestamp2 = this.state.timestamp2;
        let timestamp3 = this.state.timestamp3;

        // Prüfe für jedes Kommentarfeld, ob etwas eingegeben wurde 
        if (comment1.length > 0) {
            newComments.push({timestamp: timestamp1, comment: comment1, itHelped: undefined});
        }
        if (comment2.length > 0) {
            newComments.push({timestamp: timestamp2, comment: comment2, itHelped: undefined});
        }
        if (comment3.length > 0) {
            newComments.push({timestamp: timestamp3, comment: comment3, itHelped: undefined});
        }

        this.setState({comment1: '', comment2: '', comment3: ''});

        // Funktion in SicherheitsnetzController die die alten und neuen Kommentare zusammenfügt
        this.props.addStrategy(+this.state.id, newComments.map(line => line.comment));
        
    }

    textChange(elem) {
        // Setze den Text im entsprechenden State wenn der Wert sich geändert hat in einem Textfeld
        let value = elem.target.value;
        switch(elem.target.getAttribute("id")) {
            case "comment1":
                this.setState({comment1: value, timestamp1: new Date()});
                break;
            case "comment2":
                this.setState({comment2: value, timestamp2: new Date()});
                break;
            case "comment3":
                this.setState({comment3: value, timestamp3: new Date()});
                break;
            default: this.setState({comment1: value})
        }
    }

    backButtonClicked() {
        this.props.selectNewActivity();
    }

    render() {
        return (
            <Container>
            <Card>
                <Card.Body>
                <Row>
                    <Col>
                        <Button id="backButton" variant="success" onClick={this.backButtonClicked}><FiArrowLeft/> Zurück</Button> 
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <p>Trage drei Wege ein, auf denen dir {this.state.text} gerade helfen kann:</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        
                        <InputGroup >
                             <Form.Control  id="comment1" placeholder='...' onChange={this.textChange} type="text" />
                         </InputGroup>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <InputGroup >
                             <Form.Control  id="comment2" placeholder='...' onChange={this.textChange} type="text" />
                         </InputGroup>
                    
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                    <InputGroup >
                             <Form.Control  id="comment3" placeholder='...' onChange={this.textChange} type="text" />
                         </InputGroup>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <Button  variant="success" onClick={this.ressourceKommentiert}>Dann los!</Button>
                    </Col>
                </Row>
                </Card.Body>
                </Card>
            </Container>
        )
    }
}