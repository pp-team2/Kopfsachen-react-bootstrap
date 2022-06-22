import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './situationskontrolle.css';
import Button from 'react-bootstrap/Button';

export default class SituationskontrolleAlpenMethode extends React.Component {
    constructor() {
        super();
        this.state = {textAufgabe: '', textLaenge: '', textPuffer: '',
            texte: [{textAufgabe: '', textLaenge: '', textPuffer: ''}]};

        this.textChange = this.textChange.bind(this);
        this.addText = this.addText.bind(this);
        this.textEingabeBeendet = this.textEingabeBeendet.bind(this);
    }

    textChange(elem) {
        // Setze den Text im entsprechenden State wenn der Wert sich geändert hat in einem Textfeld
        let value = elem.target.value;
        switch(elem.target.getAttribute("id")) {
            case "textAufgabeInput":
                this.setState({textAufgabe: value});
                break;
            case "textLaengeInput":
                this.setState({textLaenge: value});
                break;
            case "textPufferInput":
                this.setState({textPuffer: value});
                break;
            default: alert("Fehler beim Setzen des Textes! Bitte wiederholen");
        }
    }

    // Fügt eine neue Aufgabe hinzu
    addText() {
        if (this.state.textAufgabe === '') {
            return;
        }
        let newAufgabeElement = document.createElement('li');
        newAufgabeElement.innerHTML = this.state.textAufgabe;
        let newLaengeElement = document.createElement('li');
        newLaengeElement.innerHTML = this.state.textLaenge;
        let newPufferElement = document.createElement('li');
        newPufferElement.innerHTML = this.state.textPuffer;

        document.querySelector('#textAufgabeOutput').appendChild(newAufgabeElement);
        document.querySelector('#textLaengeOutput').appendChild(newLaengeElement);
        document.querySelector('#textPufferOutput').appendChild(newPufferElement);

        let texte = this.state.texte;
        texte.push({textAufgabe: this.state.textAufgabe, textLaenge: this.state.textLaenge, textPuffer: this.state.textPuffer});
        console.log(this.state.textAufgabe);
        console.log(this.state.textLaenge);
        console.log(this.state.textPuffer);
        this.setState({textAufgabe: '', textLaenge: '', textPuffer: '', texte: texte});
    }

    textEingabeBeendet() {
        console.log(this.state.texte);
    }

    render() {
        let screen8 = 
            <Container>
                <Row>
                    <p>Wenn du Situationskontrolle üben möchtest, kann dir die <b>ALPEN</b>-Methode helfen.</p>
                </Row>
                <Row>
                    <p><span class="alpenHighlight">A</span> ufgabe notieren</p>
                </Row>
                <Row>
                    <p><span class="alpenHighlight">L</span> änge schätzen</p>
                </Row>
                <Row>
                    <p><span class="alpenHighlight">P</span> ufferzeiten einplanen</p>
                </Row>
                <Row>
                    <p><span class="alpenHighlight">E</span> ntscheidungen treffen</p>
                </Row>
                <Row>
                    <p><span class="alpenHighlight">N</span> achkontrolle</p>
                </Row>
                <Row>
                    <Button>Let's go!</Button>
                </Row>
            </Container>

        let screen9 = 
            <Container>
                <div class="step">
                    <Row>
                        <p>Stell dir einen Timer auf 15 Minuten.<br />
                        Die folgenden Schritte durchläufst du für jede Aufgabe, die du zu tun hast.</p>
                    </Row>
                    <Row>
                        <p><span class="alpenHighlight">A</span> ufgabe notieren:</p>
                        <p>a.	Was nehme ich mir vor (Schulaufgaben UND Hobbys)?</p>
                        <p>b.	Was ist wichtig, was eher unwichtig?</p>
                    </Row>
                    <Row>
                        <ol id="textAufgabeOutput">
                        </ol>
                        <input id="textAufgabeInput" type="text" onChange={this.textChange}></input>
                    </Row>
                </div>
                <br />
                <div class="step">
                    <Row>
                        <p><span class="alpenHighlight">L</span> änge schätzen</p>
                        <p>a.	Wie lange brauche ich?</p>
                        <p>b.	Wann muss ich fertig sein?</p>
                    </Row>
                    <Row>
                        <ol id="textLaengeOutput">
                        </ol>
                        <input id="textLaengeInput" type="text" onChange={this.textChange}></input>
                        </Row>
                </div>
                <br />
                <div class="step">
                    <Row>
                        <p><span class="alpenHighlight">P</span> ufferzeiten einplanen</p>
                        <p>a.	Faustregel: Etwa 1/3 des geschätzten Zeitaufwandes als Reserve einplanen.</p>
                    </Row>
                    <Row>
                        <ol id="textPufferOutput">
                        </ol>
                        <input id="textPufferInput" type="text" onChange={this.textChange}></input>
                    </Row>
                </div>
                    <Row>
                        <Col>
                            <br />
                            <Button onClick={this.addText}>Aufgabe hinzufügen</Button>
                            <Button onClick={this.textEingabeBeendet}>Das sind alle Aufgaben</Button>
                        </Col>
                    </Row>
            </Container>
        

        return (
            <div>
                { screen9 }
            </div>
        )
    }
}