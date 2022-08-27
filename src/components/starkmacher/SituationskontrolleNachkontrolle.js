import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './situationskontrolle.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';

export default class SituationskontrolleNachkontrolle extends React.Component {
    constructor() {
        super();

        this.state = {texte: [{id: 0, textAufgabe: '', laenge: '', puffer: '', markiert: false}], checked: false, screen: 12};

        this.anzahlAufgabenAbgehakt = this.anzahlAufgabenAbgehakt.bind(this);
        this.nachkontrolleBeginnen = this.nachkontrolleBeginnen.bind(this);
    }

    componentDidMount() {
        this.setState({texte: this.props.texte});
        console.log(this.props.texte);
    }

    nachkontrolleBeginnen() {
        this.setState({screen: 13});
    }

    anzahlAufgabenAbgehakt() {
        let texte = this.state.texte;
        // Minus eins, weil ein Testdatensatz immer vorhanden ist der rausgerechnet werden muss
        let anzahlMax = texte.length-1;
        let anzahlAbgehakt = texte.map(line => line.markiert).filter(line => line == true).length;
        
        // Wenn über 50% der Übungen abgehakt wurde, wird die Übung abgeschlossen, ansonsten wird Selbstbezogenes Mitgefühl vorgeschlagen
        if (anzahlAbgehakt / anzahlMax > 0.5) {
            console.log("Unterer Pfad");
            this.setState({screen: 14});
        } else {
            console.log("Oberer Pfad");
            this.setState({screen: 19});
        }
        console.log(anzahlMax);
    }

    render() {
        let screen12 = <Container>
                        <Row>
                            <p className="nachkontrolleScreen">Es ist Zeit deinen Tagesplan zu kontrollieren!</p>
                        </Row>
                        <Row>
                            <Button className="nachkontrolleScreen" onClick={this.nachkontrolleBeginnen}>Alles klar!</Button>
                        </Row>
                        <Row>
                            <LinkContainer to="/home">
                                <Button className="nachkontrolleScreen">Heute lieber nicht!</Button>
                            </LinkContainer>
                        </Row>
                    </Container>

        let screen13 = <Container>
                            <Row>
                                <Col>
                                    <p><span className="alpenHighlight">N</span> achkontrolle</p>
                                    <ul>
                                        <li>a. Was habe ich geschafft, was nicht? </li>
                                    </ul>
                                    <p>Markiere in der Liste die Aufgaben die du geschafft hast.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ListGroup>
                                        {this.state.texte.map((line, index) => {
                                                if (line.textAufgabe !== '') {
                                                return <ListGroup.Item key={index}>{line.textAufgabe}
                                                    <Form.Check type="checkbox" id="toggleCheck" className={line.id}
                                                    checked={this.state.texte.filter(text => text.id == line.id)[0].markiert} label="Markieren"
                                                    onChange={() => {
                                                        let text = this.state.texte.filter(text => text.id == line.id)[0];
                                                        if (text.markiert) {
                                                            text.markiert = false;
                                                        } else {
                                                            text.markiert = true;
                                                        }
                                                        this.setState({checked: true});
                                                    }} />
                                                </ListGroup.Item>
                                                }
                                            })
                                        }
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button onClick={this.anzahlAufgabenAbgehakt}>Done</Button>
                                </Col>
                            </Row>
                    </Container>

        let screen14 = <Container>
                        <Row>
                            <h1>Super gemacht!</h1>
                        </Row>
                        <Row>
                            <p>Du bist heute ein ganzes Stück weitergekommen mit deinen Aufgaben!</p>
                        </Row>
                        <Row>
                            <img src="../platzhalter-1.png"></img>
                            <LinkContainer to="/starkmacher"><Button id="weiterZuStarkmachern" variant="success">Weiter zu meinen Starkmachern</Button></LinkContainer>
                        </Row> 
                    </Container>

        let screen19 = <Container>
            <Row>
                <p>
                    Es ist nicht schlimm, wenn du heute nicht so viele der Aufgaben erledigen konntest.
                </p>
                <p>
                    Probier doch eine Übung zum Selbstmitgefühl in schwierigen Situationen aus!
                </p>
            </Row>
            <Row>
                <Col>
                    <LinkContainer to="/starkmacher/SelbstbezogenesMitgefuehl"><Button>Ich möchte die Übung ausprobieren</Button></LinkContainer>
                </Col>
                <Col>
                    <Button>Heute nicht</Button>
                </Col>
            </Row>
        </Container>

        let toShow;
        switch(this.state.screen) {
            case 12: toShow = screen12;
                break;
            case 13: toShow = screen13;
                break;
            case 14: toShow = screen14;
                break;
            case 19: toShow = screen19;
                break;
            default: toShow = screen12; 
        }

        return (
            <div>
                {toShow}
            </div>
        )
    }
}