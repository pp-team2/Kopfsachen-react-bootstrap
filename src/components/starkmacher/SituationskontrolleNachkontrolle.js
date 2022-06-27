import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './situationskontrolle.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

export default class SituationskontrolleNachkontrolle extends React.Component {
    constructor() {
        super();

        this.state = {texte: [{textAufgabe: '', textLaenge: '', textPuffer: '', markiert: false}], checked: false};

        this.markierungSetzen = this.markierungSetzen.bind(this);

    }

    componentDidMount() {
        this.setState({texte: this.props.texte});
        console.log(this.props.texte);
    }

    markierungSetzen(elem) {
        // TODO: Jede Aufgaben soll ihr eignes checked haben
    }

    render() {
        let screen12 = <Container>
                        <Row>
                            <p className="nachkontrolleScreen">Es ist Zeit deinen Tagesplan zu kontrollieren!</p>
                        </Row>
                        <Row>
                            <Button className="nachkontrolleScreen">Alles klar!</Button>
                        </Row>
                        <Row>
                            <Button className="nachkontrolleScreen">Heute lieber nicht!</Button>
                        </Row>
                    </Container>

        return (
            <Container>
                    <Row>
                        <Col>
                            <p><span className="alpenHighlight">N</span> achkontrolle</p>
                            <ul>
                                <li>a. Was habe ich geschafft, was nicht? </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ListGroup>
                                {this.state.texte.map((line, index) => {
                                        if (line.textAufgabe !== '') {
                                        return <ListGroup.Item key={index}>{line.textAufgabe}
                                            <Form.Check type="checkbox" id="toggleCheck" 
                                            checked={this.state.checked} label="Markieren"
                                            onChange={() => this.setState({checked: !this.state.checked})} />
                                        </ListGroup.Item>
                                        }
                                    })
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                                <Button>Done</Button>
                        </Col>
                    </Row>
            </Container>
        )
    }
}