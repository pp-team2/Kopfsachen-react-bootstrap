import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './situationskontrolle.css';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { LinkContainer } from 'react-router-bootstrap';
import Alert from 'react-bootstrap/Alert';

export default class SituationskontrolleAlpenMethode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {textAufgabe: '', textLaenge: '', textPuffer: '',
            texte: [{textAufgabe: '', textLaenge: '', textPuffer: '', markiert: false},
            {textAufgabe: 'Aufräumen', textLaenge: '', textPuffer: '', markiert: false},
            {textAufgabe: 'Wäsche waschen', textLaenge: '', textPuffer: '', markiert: false},
            {textAufgabe: 'Hausaufgaben machen', textLaenge: '', textPuffer: '', markiert: false}],
            time: {}, seconds: 10, timerStop: false, btnTimerSwitch: false, screen: 8};
        this.timer = 0;

        this.textChange = this.textChange.bind(this);
        this.addText = this.addText.bind(this);
        this.aufgabenEingabeBeendet = this.aufgabenEingabeBeendet.bind(this);
        this.secondsToTime = this.secondsToTime.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.aufgabenPriorisiert = this.aufgabenPriorisiert.bind(this);
        this.erinnerungSetzen = this.erinnerungSetzen.bind(this);
        this.starkmacherGestartet = this.starkmacherGestartet.bind(this);
    }

    // Ersten Info-Text gelesen
    starkmacherGestartet() {
        this.setState({screen: 9});
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
        let texte = this.state.texte;
        texte.push({textAufgabe: this.state.textAufgabe, textLaenge: this.state.textLaenge, textPuffer: this.state.textPuffer});
        console.log(this.state.textAufgabe);
        console.log(this.state.textLaenge);
        console.log(this.state.textPuffer);
        document.getElementById('textAufgabeInput').value = '';
        document.getElementById('textLaengeInput').value = '';
        document.getElementById('textPufferInput').value = '';
        this.setState({textAufgabe: '', textLaenge: '', textPuffer: '', texte: texte});
    }

    // Alle Aufgaben wurden eingegeben
    aufgabenEingabeBeendet() {
        console.log(this.state.texte);
        this.setState({screen: 10});
    }

    // Die Aufgaben wurden priorisiert
    aufgabenPriorisiert() {
        this.props.texteSpeichern(this.state.texte);
        this.setState({screen: 11});
    }

    // Es wurde auf den Button "Bitte erinner mich nachher" geklickt
    erinnerungSetzen() {
        this.props.setErinnerung();
    }

    // https://stackoverflow.com/questions/40885923/countdown-timer-in-react (Fabian Schultz (30.11.2016) und Brynner Ferreira (21.09.2018))
    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({time: timeLeftVar});
    }

    // Erstellt aus den übergebenen Sekunden ein Objekt mit Stunden, Minuten und Sekunden
    secondsToTime(secs) {
        let hours = Math.floor(secs / (60*60));
        let divisor_for_minutes = secs % (60*60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        if (seconds < 10) {seconds = "0" + seconds;}
        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    // Startet den Timer
    startTimer(elem) {
        // Wenn der Timer zum ersten Mal gestartet wird
        if (this.timer === 0 && this.state.seconds > 0 && this.state.btnTimerSwitch === false) {
            this.setState({btnTimerSwitch: true});
            this.timer = setInterval(this.countDown, 1000);
            elem.target.innerHTML = "Timer stoppen";
            document.getElementById('timerStartBtn').className = 'btn btn-danger';
            
        // Wenn der Timer wieder gestartet wird
        } else if (this.state.seconds > 0 && this.state.btnTimerSwitch === false) {
            this.setState({timerStop: false, btnTimerSwitch: true});
            elem.target.innerHTML = "Timer stoppen";
            document.getElementById('timerStartBtn').className = 'btn btn-danger';
        }

        // Wenn der Timer gestoppt wird
        if (this.state.btnTimerSwitch === true) {
            this.setState({timerStop: true, btnTimerSwitch: false});
            elem.target.innerHTML = "Timer fortsetzen";
            document.getElementById('timerStartBtn').className = 'btn btn-primary';
        }
    }

    // Zählt jede Sekunden runter, bis der Timer bei 0 angekommen ist
    countDown() {
        // Stoppt den Timer wenn timerStop true ist
        if (this.state.timerStop) {
            return;
        }
        let seconds = this.state.seconds - 1;
        this.setState({time: this.secondsToTime(seconds), seconds: seconds});
        if (seconds == 0) {
            clearInterval(this.timer);
        }
        
    }

    render() {
        let screen8 = 
            <Container>
                <Row>
                    <p>Wenn du Situationskontrolle üben möchtest, kann dir die <b>ALPEN</b>-Methode helfen.</p>
                </Row>
                <Row>
                    <p><span className="alpenHighlight">A</span> ufgabe notieren</p>
                </Row>
                <Row>
                    <p><span className="alpenHighlight">L</span> änge schätzen</p>
                </Row>
                <Row>
                    <p><span className="alpenHighlight">P</span> ufferzeiten einplanen</p>
                </Row>
                <Row>
                    <p><span className="alpenHighlight">E</span> ntscheidungen treffen</p>
                </Row>
                <Row>
                    <p><span className="alpenHighlight">N</span> achkontrolle</p>
                </Row>
                <Row>
                    <Button onClick={this.starkmacherGestartet}>Let's go!</Button>
                </Row>
            </Container>

        let screen9 = 
            <Container>
                    <Row>
                        <Col sm="8" >
                                <p>Stell dir einen Timer auf 15 Minuten.</p>
                                <Button id="timerStartBtn" onClick={this.startTimer}>Timer starten</Button> <span>{this.state.time.m}:{this.state.time.s}</span>
                                <br /><br />
                                <p>Die folgenden Schritte durchläufst du für jede Aufgabe, die du zu tun hast.</p>
                                <br />
                            <div className="step">
                                <p className="listHeader"><span className="alpenHighlight">A</span> ufgabe notieren:</p>
                                <ul>
                                    <li>a. Was nehme ich mir vor (Schulaufgaben UND Hobbys)?</li>
                                    <li>b. Was ist wichtig, was eher unwichtig?</li>
                                </ul>
                                <FormControl value={this.state.textAufgabe} onChange={this.textChange} id="textAufgabeInput"
                                placeholder='...' className="textEingabe" />
                                <br />
                            </div>
                            <br />
                            <div className="step">
                                <p className="listHeader"><span className="alpenHighlight">L</span> änge schätzen</p>
                                <ul>   
                                    <li>a. Wie lange brauche ich?</li>
                                    <li>b. Wann muss ich fertig sein?</li>
                                </ul>
                                <FormControl value={this.state.textLaenge} onChange={this.textChange} id="textLaengeInput"
                                placeholder='...' className="textEingabe" />
                                <br />
                            </div>
                            <br />
                            <div className="step">
                                <p className="listHeader"><span className="alpenHighlight">P</span> ufferzeiten einplanen</p>
                                <ul>   
                                    <li>a. Faustregel: Etwa 1/3 des geschätzten Zeitaufwandes als Reserve einplanen.</li>
                                </ul>
                                <FormControl value={this.state.textPuffer} onChange={this.textChange} id="textPufferInput"
                                placeholder='...' className="textEingabe" />
                                <br />
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="step">
                                <p>Übersicht über bereits hinzugefügte Aufgaben</p>
                                <ListGroup>
                                    {this.state.texte.map((line, index) => {
                                        if (line.textAufgabe !== '') {
                                        let popover = (
                                            <Popover>
                                                <Popover.Header>{line.textAufgabe}</Popover.Header>
                                                <Popover.Body>
                                                    <p className="listHeader"><u>Länge</u></p>
                                                    <p>{line.textLaenge}</p>
                                                    <p className="listHeader"><u>Pufferzeit</u></p>
                                                    <p>{line.textPuffer}</p>
                                                </Popover.Body>
                                            </Popover>
                                        )
                                    return <OverlayTrigger key={line.id} trigger="click" overlay={popover} rootClose>
                                                <ListGroup.Item key={index}>{line.textAufgabe}</ListGroup.Item>
                                            </OverlayTrigger>
                                        }
                                     })
                                    }
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={this.addText}>Aufgabe hinzufügen</Button>
                        </Col>
                        <Col>
                            <Button onClick={this.aufgabenEingabeBeendet}>Das sind alle Aufgaben</Button>
                        </Col>
                    </Row>
            </Container>

            let screen10 = 
                    <Container>
                        <Row>
                            <Col>
                                <p>Jetzt geht es darum die Aufgaben nach der Wichtigkeit zu sortieren.</p>
                                <p>Du kannst die Aufgaben einfach in die gewünschte Reihenfolge verschieben.</p>
                                <p className="listHeader"><span className="alpenHighlight">E</span> ntscheidungen treffen:</p>
                                <ul>
                                    <li>a. Das Wichtigste zuerst</li>
                                    <li>b. Es ist okay, wenn du nicht alles schaffst!</li>
                                </ul>
                                <ListGroup>
                                    {this.state.texte.map((line, index) => {
                                         if (line.textAufgabe !== '') {
                                            return <ListGroup.Item key={index}>{line.textAufgabe}</ListGroup.Item>
                                         }
                                        })
                                    }
                                </ListGroup>
                                <Button onClick={this.aufgabenPriorisiert}>Meine Aufgaben sind priorisiert</Button>
                            </Col>
                        </Row>
                    </Container>

            let screen11 = 
                    <Container>
                        <Row>
                            <Col>
                                <p>Der letzte Schritt der <span className="alpenHighlight">ALPEN</span>-Methode ist die Nachkontrolle.</p>
                                <p><span className="alpenHighlight">N</span> achkontrolle</p>
                                <ul>
                                    <li>a. Was habe ich geschafft, was nicht? </li>
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Alert variant='success'>Wenn du möchtest, erhälst Du am Ende des Tages eine Benachrichtigung, 
                                    um einzutragen was du geschafft hast. 
                                    Danach ist die Situationskontrolle Teil deiner Starkmacher!</Alert>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <LinkContainer to='/home'><Button onClick={this.erinnerungSetzen}>Bitte erinner mich nachher</Button></LinkContainer>
                            </Col>
                            <Col>
                                <LinkContainer to='/home'><Button>Lieber beim nächsten Mal</Button></LinkContainer>
                            </Col>
                        </Row>
                    </Container>

            let toShow;
            switch(this.state.screen) {
                case 8: toShow = screen8;
                    break;
                case 9: toShow = screen9;
                    break;
                case 10: toShow = screen10;
                    break;
                case 11: toShow = screen11;
                    break;
                default: toShow = screen8; 
            }

        return (
            
            <div>
                { toShow }
            </div>
        )
    }
}