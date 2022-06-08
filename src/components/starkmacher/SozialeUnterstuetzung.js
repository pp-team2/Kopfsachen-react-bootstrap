import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './sozialeUnterstuetzung.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default class SozialeUnterstuetzung extends React.Component {
    constructor(props) {
        super(props);

        this.state = {circleID: '', text: '', pictures: [], showText: [{x: '', y: '', text: ''}], showPictures: [{x: 0, y: 0, src: undefined}]};

        this.clickCircle = this.clickCircle.bind(this);
        this.newPerson = this.newPerson.bind(this);
        this.textChange = this.textChange.bind(this);
        this.addPersonas = this.addPersonas.bind(this);
        this.pictureChange = this.pictureChange.bind(this);
        this.textUndBilder = this.textUndBilder.bind(this);
        this.kollisionsAbfrage = this.kollisionsAbfrage.bind(this);
    }

    componentDidMount() {
        // Alle Kreise unsichtbar schalten
        document.querySelectorAll('.addPerson').forEach(line => line.setAttribute('visibility', 'hidden'));

        // Initiale Kreise sichtbar schalten
        document.getElementById('svg_6').setAttribute('visibility','');
        document.getElementById('svg_18').setAttribute('visibility','');
        document.getElementById('svg_32').setAttribute('visibility','');

        this.addPersonas();
    }

    clickCircle(elem) {
        this.setState({circleID: elem.target.getAttribute('id')});
    }

    // Fügt alle bestehenden Personen in das SVG ein (wird aufgerufen beim initialen Laden der Seite)
    addPersonas() {
        let personas = this.props.personas;

        let kreisTypen = [];
        personas.forEach(line => {
            this.textUndBilder(line.circleID, line.name);

            // Damit man weiß welche Kreistypen alles schon belegt sind
            kreisTypen.push(document.getElementById(line.circleID).classList[1]);
            return line;
        });

        // In kreisTypen stehen alle Kreise in die bisher ein Name geschrieben wurde
        kreisTypen = kreisTypen.filter((i,p,s) => s.indexOf(i) == p);

        kreisTypen.forEach(line => {
            this.kollisionsAbfrage(line);
        });
    }

    // Fügt Texte und Bilder dem State hinzu, damit diese dann angezeigt werden können
    textUndBilder(circleID, text) {
        // Belegten Kreis unsichtbar schalten
        let belegterkreis = document.getElementById(circleID);
        belegterkreis.setAttribute('visibility', 'hidden');

        // Statt dem Kreis Text generieren
        let angezeigteTexte = this.state.showText;
        angezeigteTexte.push({x: (+belegterkreis.getAttribute('cx'))-20, y: belegterkreis.getAttribute('cy'), text: text});
        this.setState({showText: angezeigteTexte});

        // Bilder (Symbole) hinzufügen
        let angezeigteBilder = this.state.showPictures;
        let x = - 30;
        this.state.pictures.forEach(bild => {
            angezeigteBilder.push({x: (+belegterkreis.getAttribute('cx'))+x, y: (+belegterkreis.getAttribute('cy'))+5, src: bild.getAttribute('src')});
            x = x + 20;
        });
        this.setState({showPictures: angezeigteBilder});
    }

    // Macht einen neuen zufälligen Kreis sichtbar innerhalb eines Kreistyps der noch nicht belegt ist
    kollisionsAbfrage(kreisTyp) {
        let kreise = document.querySelectorAll('.'+kreisTyp);
        let personas = this.props.personas;
        let belegteKreise = personas.map(line => line.circleID);
        belegteKreise.push(this.state.circleID);

        while (true) {
            // Zufälligen Kreis auswählen
            let kreis = kreise[Math.floor(Math.random()*kreise.length)];

            // Prüfen ob zufälliger Kreis nicht bereits belegt ist (mit einem Namen) 
            // -> Wenn ja, dann muss ein neuer zufälliger Kreis bestimmt werden
            if (!belegteKreise.some(line => line === kreis.id.toString())) {
                // Macht den zufälligen Kreis sichtbar
                kreis.removeAttribute('visibility');
                break;
            }

            // Wenn alle Kreise belegt sind, sollte auch aus der Schleife herausgegangen werden
            let belegteKreiseTypen = belegteKreise.map(line => {
                if (line != '') {
                    return document.getElementById(line).classList[1];
                }
            });
            if (belegteKreiseTypen.filter(kreistyp => kreistyp === kreisTyp).length >= kreise.length) {
                break;
            }
        }
    }

    // Es wird eine neue Person hinzugefügt (wird aufgerufen wenn auf Hinzufügen geklickt wird)
    addOnePerson() {
        this.textUndBilder(this.state.circleID, this.state.text);

        let belegterkreis = document.getElementById(this.state.circleID);
        
        let kreisTyp = belegterkreis.classList[1];
        this.kollisionsAbfrage(kreisTyp);
        
        // Damit das Popover verschwindet
        document.body.click();
        this.setState({circleID: '', text: '', pictures: []});
    }

    newPerson() {
        let newPerson = this.props.newPerson;

        this.addOnePerson();    
        newPerson(this.state.text, this.state.circleID, this.state.pictures);
    }

    textChange(elem) {
        this.setState({text: elem.target.value});

        // Toggelt die Aktiviertheit des Hinzufügen-Buttons, je nachdem ob Text geschrieben wurde oder nicht
        if (elem.target.value.length) {
            document.querySelector('#hinzufuegen').classList.remove('disabled');
        } else {
            document.querySelector('#hinzufuegen').classList.add('disabled');
        }
    }

    pictureChange(elem) {
        let bild = document.querySelector('#'+elem.target.getAttribute('id'));
        let pictures = this.state.pictures;

        if (bild.classList.contains('checked')) {
            // Border entfernen und Bild aus state entfernen
            bild.style.border = "";
            bild.classList.remove('checked');
            pictures = pictures.filter(line => line.id !== bild.id);

        } else {
            // Border hinzufügen und Bild dem state hinzufügen
            bild.style.border = "black solid";
            bild.classList.add('checked');
            pictures.push(bild);
        }

        this.setState({pictures: pictures});

    }

    render() {
        let clickCircle = this.clickCircle;

        // Texte vorbereiten die dann eingefügt werden sollen
        let angezeigteTexte = this.state.showText;
        angezeigteTexte = angezeigteTexte.map((line, index) => {
            return <text key={index} x={line.x} y={line.y}>{line.text}</text>;
        });

        // Bilder vorbereiten die dann eingefügt werden sollen
        let angezeigteBilder = this.state.showPictures;
        console.log(angezeigteBilder);
        angezeigteBilder = angezeigteBilder.map((line, index) => {
            if (line.src == undefined) {
                return;
            } else {
                return <image key={index} x={line.x} y={line.y} href={line.src}></image>;
            }
        })

        const popover = (
            <Popover>
                <Popover.Body>
                    <p>Eintrag hinzufügen:</p>
                    <input onChange={this.textChange} type="text"></input>
                    <div>
                        <img className="ressource" id="bild1" onClick={this.pictureChange} src="/tagebuch.jpg" alt="Tagebuch-Bild" />
                        <img className="ressource" id="bild2" onClick={this.pictureChange} src="/tagebuch.jpg" alt="Tagebuch-Bild" />
                        <img className="ressource" id="bild3" onClick={this.pictureChange} src="/tagebuch.jpg" alt="Tagebuch-Bild" />
                    </div>
                    <Button id="hinzufuegen" className="disabled" onClick={this.newPerson}>Hinzfügen</Button>
                </Popover.Body>
            </Popover>
        );

        let circlesArray = [<circle className='addPerson kreis1' cx="280" cy="164" id="svg_6" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis1' cx="331" cy="152" id="svg_7" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis1' cx="396" cy="226" id="svg_8" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis1' cx="358" cy="313" id="svg_9" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis1' cx="309" cy="322" id="svg_10" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis1' cx="261" cy="301" id="svg_11" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis1' cx="243" cy="200" id="svg_12" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis1' cx="233" cy="253" id="svg_13" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis1' cx="393" cy="276" id="svg_14" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis1' cx="379" cy="177" id="svg_15" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis2' cx="246" cy="114" id="svg_18" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis2' cx="309" cy="96" id="svg_17" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis2' cx="191" cy="163" id="svg_16" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis2' cx="170" cy="229" id="svg_19" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis2' cx="180" cy="300" id="svg_20" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis2' cx="220" cy="350" id="svg_21" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis2' cx="284" cy="388" id="svg_22" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis2' cx="356" cy="385" id="svg_23" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis2' cx="411" cy="357" id="svg_24" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis2' cx="454" cy="292" id="svg_25" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis2' cx="463" cy="220" id="svg_26" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis2' cx="378" cy="109" id="svg_27" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis2' cx="433" cy="150" id="svg_28" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis3' cx="210" cy="64" id="svg_32" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis3' cx="312" cy="38" id="svg_31" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis3' cx="146" cy="132" id="svg_30" r="22.472204" onClick={clickCircle} transform="matrix(1 0 0 1 0 0)"/>,
        <circle className='addPerson kreis3' cx="114" cy="220" id="svg_29" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis3' cx="126" cy="311" id="svg_33" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis3' cx="169" cy="381" id="svg_34" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis3' cx="238" cy="427" id="svg_35" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis3' cx="326" cy="444" id="svg_36" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis3' cx="402" cy="426" id="svg_37" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis3' cx="471" cy="372" id="svg_38" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis3' cx="512" cy="290" id="svg_39" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis3' cx="512" cy="191" id="svg_40" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis3' cx="473" cy="108" id="svg_41" r="22.472204" onClick={clickCircle} />,
        <circle className='addPerson kreis3' cx="395" cy="54" id="svg_42" r="22.472204" onClick={clickCircle} />];

        let circlesArrayWithOverlay = [];
        circlesArray = circlesArray.forEach(function(elem, index) {
            circlesArrayWithOverlay.push(<OverlayTrigger key={index} trigger="click" overlay={popover} rootClose>{ elem }</OverlayTrigger>);
        });

        return (
            <Container>
                <Row>
                    <Col>
                        {/* <!-- Created with SVG-edit - https://github.com/SVG-Edit/svgedit--> */}
                        <svg id='svgNetz' width="100%" height="100%" viewBox='0 0 600 600'>
                            <g id='gNetz' className="layer">
                            
                                <ellipse id="kreis3" cx="316" cy="240.000007" fill="#7F49C3" rx="230" ry="230" transform="matrix(1 0 0 1 0 0)"/>
                                <ellipse id="kreis2" cx="316" cy="240.500004" display="inline" fill="#F2C8D0" rx="175" ry="175" />
                                <ellipse id="kreis1" cx="316" cy="241.999996" fill="#F3903E" rx="120" ry="120" transform="matrix(1 0 0 1 0 0)"/>
                                <circle id="kreis0" cx="316" cy="236.5" fill="#FDE802" r="40" />
                                <text id="textICH" fill="#000000" fontFamily="serif" fontSize="24" fontWeight="bold" stroke="#000000" strokeWidth="0" textAnchor="middle" x="316" y="243.5">ICH</text>
                                
                            </g>
                            <g>
                                { circlesArrayWithOverlay }
                            </g>
                            <g>
                                { angezeigteTexte }
                            </g>
                            <g>
                                { angezeigteBilder }
                            </g>
                        </svg>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}