import React from 'react';
import Container from 'react-bootstrap/Container';
import './sozialeUnterstuetzung.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';

export default class SozialeUnterstuetzung extends React.Component {
    constructor(props) {
        super(props);

        this.state = {circleID: '', text: '', checked: false, pictures: [], vorhandenePictures: [], ausgeblendetePictures: [], 
        showText: [{circleID: '', x: '', y: '', text: ''}], 
        showPictures: [{x: 0, y: 0, src: undefined, circleID: undefined}],
        showChecked: [{circleID: undefined, checked: false}]};

        this.clickCircle = this.clickCircle.bind(this);
        this.newPerson = this.newPerson.bind(this);
        this.textChange = this.textChange.bind(this);
        this.addPersonas = this.addPersonas.bind(this);
        this.pictureChange = this.pictureChange.bind(this);
        this.textUndBilder = this.textUndBilder.bind(this);
        this.kollisionsAbfrage = this.kollisionsAbfrage.bind(this);
        this.setCircleID = this.setCircleID.bind(this);
        this.hidePictures = this.hidePictures.bind(this);
        this.clearPicturesInState = this.clearPicturesInState.bind(this);
        this.setCircleIDOnly = this.setCircleIDOnly.bind(this);
        this.setCheckedState = this.setCheckedState.bind(this);
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
            if (!line.circleID == undefined) {
                this.textUndBilder(line.circleID, line.name);

                // Damit man weiß welche Kreistypen alles schon belegt sind
                kreisTypen.push(document.getElementById(line.circleID).classList[1]);
                return line;
            }
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

        if (text !== '') {
            // Statt dem Kreis Text generieren
            let angezeigteTexte = this.state.showText;
            angezeigteTexte.push({circleID: circleID, x: (+belegterkreis.getAttribute('cx'))-20, y: belegterkreis.getAttribute('cy'), text: text});
            this.setState({showText: angezeigteTexte});
        }
        
        let angezeigteBilder = this.state.showPictures;
        let x = -30;

        // Für jedes Symbol was es schon gibt, wird der Wert für x erhöht
        angezeigteBilder.forEach(line => {
            if (line.circleID === circleID) {
                x = x+20;
            }
        });

        // Bilder (Symbole) hinzufügen
        this.state.pictures.forEach(bild => {
            angezeigteBilder.push({circleID: circleID, x: (+belegterkreis.getAttribute('cx'))+x, y: (+belegterkreis.getAttribute('cy'))+5, src: bild.getAttribute('src')});
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
        document.getElementById('uebungBeenden').style.visibility = 'visible'
    }

    newPerson() {
        let newPerson = this.props.newPerson;
        let showChecked = this.state.showChecked;

        // Wenn der Text und die Pictures leer sind, werden nur Namen markiert (Level 3)
        if (this.state.text === '' && this.state.pictures.length == 0) {
            if (this.state.checked === false && showChecked.find(line => line.circleID === this.state.circleID)) {
                showChecked = showChecked.filter(line => line.circleID !== this.state.circleID);
            }

            if (this.state.checked) {
                newPerson(undefined, this.state.circleID, undefined, Date.now());
            } else {
                newPerson(undefined, this.state.circleID, undefined, false);
            }
        }
        // Wenn der Text leer ist, heißt das, dass nur Symbole hinzugefügt werden (Level 2)
        else if (this.state.text === '') {
            this.textUndBilder(this.state.circleID, '');
            if (this.state.checked) {
                newPerson(undefined, this.state.circleID, this.state.pictures, Date.now());
            } else {
                newPerson(undefined, this.state.circleID, this.state.pictures, false);
            }
        } 
        // Wenn eine neue Person hinzugefügt wird (alle Level)
        else {
            this.addOnePerson();
            if (this.state.checked) {
                newPerson(this.state.text, this.state.circleID, this.state.pictures, Date.now());
            } else {
                newPerson(this.state.text, this.state.circleID, this.state.pictures, false);
            }
        }
        
        // Wenn "markiert" gesetzt wurde, dann soll das im state gespeichert werden
        if (this.state.checked === true) {
            let circleID = this.state.circleID;
            let checked = this.state.checked;
            // Damit nicht zwei Kreise doppelt vorkommen
            if (!showChecked.find(line => line.circleID === circleID)) {
                let obj = new Object({circleID: circleID, checked: checked});
                showChecked.push(obj);
            } 
        }

        // Damit das Popover verschwindet
        document.body.click();
        // State aufräumen
        this.setState({circleID: '', text: '', checked: false, pictures: [], vorhandenePictures: [], ausgeblendetePictures: [], pictures: [], showChecked: showChecked});
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

    // Wenn bei der Auswahl der Bilder ein Bild angewählt oder abgewählt wird
    pictureChange(elem) {
        let bild = document.querySelector('#'+elem.target.getAttribute('id'));
        let pictures = this.state.pictures;
    
        console.log(pictures);
        this.state.vorhandenePictures.forEach(line => {
            if (elem.target.src.includes(line.href.baseVal)) {
                return;
            }
        });
        
        if (pictures.length === 0) {
            pictures = [];
        }

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
            document.querySelector('#hinzufuegen').classList.remove('disabled');
        }

        this.setState({pictures: pictures});

    }

    // Wenn auf ein Text geklickt wird um Symbole hinzuzufügen (Level 2)
    setCircleID(elem) {
        // ID des Kreises "in welchem" sich der Text befindet
        let circleID = elem.target.classList[0];
        // Bilder die schon gesetzt worden sind
        let vorhandenePictures = document.querySelectorAll('image.'+circleID);
        
        let ausgeblendetePictures = [];
        const symbols = ['/buecher.png','/herz.png','/oberarm.png'];
        // Für jedes Symbol gucken ob es bereits angezeigt wird oder nicht
        vorhandenePictures.forEach(line => {
            if (symbols.some(symbol => symbol === line.href.baseVal)) {
                switch (line.href.baseVal) {
                    case '/buecher.png':
                        if (ausgeblendetePictures.some(line => line === 'bild1')) {
                            break;
                        } else {
                            ausgeblendetePictures.push('bild1');
                        }
                        break;
                    case '/herz.png':
                        if (ausgeblendetePictures.some(line => line === 'bild2')) {
                            break;
                        } else {
                            ausgeblendetePictures.push('bild2');
                        }
                        break;
                    case '/oberarm.png':
                        if (ausgeblendetePictures.some(line => line === 'bild3')) {
                            break;
                        } else {
                            ausgeblendetePictures.push('bild3');
                        }
                        break;
                    default:
                        ausgeblendetePictures.push('bild1');
               }
            }
        });

        this.setState({circleID: circleID, vorhandenePictures: vorhandenePictures, ausgeblendetePictures: ausgeblendetePictures});
    }

    setCircleIDOnly(elem) {
        let circleID = elem.target.classList[0];
        this.setState({circleID: circleID});
    }

    // Versteckt die Bilder die nicht mehr hinzugefügt werden sollen weil sie schon gesetzt worden sind
    hidePictures() {
        let picturesIds = this.state.ausgeblendetePictures;
        picturesIds.forEach(line => {
            document.getElementById(line).style.display = 'none';
        })
    }

    clearPicturesInState() {
        this.setState({ausgeblendetePictures: [], vorhandenePictures: []});
    }

    // Wenn auf ein Text geklickt wird (Level 3)
    setCheckedState() {
        let showChecked = this.state.showChecked;
        if(showChecked.find(line => line.circleID === this.state.circleID)) {
            this.setState({checked: true});
        } else {
            this.setState({checked: false});
        }
    }

    render() {
        let clickCircle = this.clickCircle;
        let level = this.props.level;

        const popoverLvl1 = (
            <Popover id="popover-basicLvl1">
                <Popover.Body>
                    <p>Eintrag hinzufügen:</p>
                    <input onChange={this.textChange} type="text"></input>
                    <Button id="hinzufuegen" className="disabled" onClick={this.newPerson}>Hinzfügen</Button>
                </Popover.Body>
            </Popover>
        );

        const popoverLvl2 = (
            <Popover id="popover-basicLvl2">
                <Popover.Body>
                    <p>Eintrag hinzufügen:</p>
                    <input onChange={this.textChange} type="text"></input>
                    <div>
                        <img className="ressource" id="bild1" onClick={this.pictureChange} src="/buecher.png" alt="Bücherstapel" />
                        <img className="ressource" id="bild2" onClick={this.pictureChange} src="/herz.png" alt="Herz" />
                        <img className="ressource" id="bild3" onClick={this.pictureChange} src="/oberarm.png" alt="Oberarm" />
                    </div>
                        <Button id="hinzufuegen" className="disabled" onClick={this.newPerson}>Hinzfügen</Button>
                </Popover.Body>
            </Popover>
        );

        const popoverLvl3 = (
            <Popover id="popover-basicLvl3">
                <Popover.Body>
                    <p>Eintrag hinzufügen:</p>
                    <input onChange={this.textChange} type="text"></input>
                    <div>
                        <img className="ressource" id="bild1" onClick={this.pictureChange} src="/buecher.png" alt="Bücherstapel" />
                        <img className="ressource" id="bild2" onClick={this.pictureChange} src="/herz.png" alt="Herz" />
                        <img className="ressource" id="bild3" onClick={this.pictureChange} src="/oberarm.png" alt="Oberarm" />
                    </div>
                    <div>
                        <Form.Check type="checkbox" id="toggleCheck" 
                        checked={this.state.checked} label="Markieren"
                        onChange={() => this.setState({checked: !this.state.checked})} />
                    </div>
                    <Button id="hinzufuegen" className="disabled" onClick={this.newPerson}>Hinzfügen</Button>
                </Popover.Body>
            </Popover>
        );

        const popoverLvl2Only = (
            <Popover id="popover-basicLvl2Only">
                <Popover.Body>
                    <p>Symbol hinzufügen:</p>
                    <div>
                        <img className="ressource" id="bild1" onLoad={this.hidePictures} onClick={this.pictureChange} src="/buecher.png" alt="Bücherstapel" />
                        <img className="ressource" id="bild2" onClick={this.pictureChange} src="/herz.png" alt="Herz" />
                        <img className="ressource" id="bild3" onClick={this.pictureChange} src="/oberarm.png" alt="Oberarm" />
                    </div>
                        <Button id="hinzufuegen" className="disabled" onClick={this.newPerson}>Hinzfügen</Button>
                </Popover.Body>
            </Popover>
        );

        const popoverLvl3Only = (
            <Popover id="popover-basicLvl3Only">
                <Popover.Body>
                    <div>
                        <Form.Check type="checkbox" id="toggleCheck" 
                            checked={this.state.checked} label="Markieren"
                            onChange={() => this.setState({checked: !this.state.checked})} />
                    </div>
                    <Button id="aenderungen" onClick={this.newPerson}>Änderung abspeichern</Button>
                </Popover.Body>
            </Popover>
        );

        // Texte vorbereiten die dann eingefügt werden sollen
        let angezeigteTexte = this.state.showText;
        switch (level) {
            case 1: 
                angezeigteTexte = angezeigteTexte.map((line, index) => {
                    return <text className={line.circleID} key={index} x={line.x} y={line.y}>{line.text}</text>;
                });
                break;
            case 2:
                angezeigteTexte = angezeigteTexte.map((line, index) => {
                    return (
                    <OverlayTrigger onHide={this.clearPicturesInState} key={index} trigger="click" overlay={popoverLvl2Only} onEntered={this.hidePictures} rootClose>
                        <text className={line.circleID} key={index} x={line.x} y={line.y} onClick={this.setCircleID}>{line.text}</text>
                    </OverlayTrigger>
                    )});
                break;
            case 3:
                angezeigteTexte = angezeigteTexte.map((line, index) => {
                    return (
                    <OverlayTrigger key={index} trigger="click" overlay={popoverLvl3Only} onEnter={this.setCheckedState} rootClose>
                        <text className={line.circleID} key={index} x={line.x} y={line.y} onClick={this.setCircleIDOnly}>{line.text}</text>
                    </OverlayTrigger>
                    )});
                break;
            default:
                angezeigteTexte = angezeigteTexte.map((line, index) => {
                    return <text className={line.circleID} key={index} x={line.x} y={line.y}>{line.text}</text>;
                });
        }
       

        // Bilder vorbereiten die dann eingefügt werden sollen
        let angezeigteBilder = this.state.showPictures;

        angezeigteBilder = angezeigteBilder.map((line, index) => {
            if (line.src == undefined) {
                return;
            } else {
                return <image className={line.circleID} key={index} x={line.x} y={line.y} href={line.src}></image>;
            }
        })

        

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
            switch(level) {
                case 1:
                    circlesArrayWithOverlay.push(<OverlayTrigger key={index} trigger="click" overlay={popoverLvl1} rootClose>{ elem }</OverlayTrigger>);
                    break;
                case 2:
                    circlesArrayWithOverlay.push(<OverlayTrigger key={index} trigger="click" overlay={popoverLvl2} rootClose>{ elem }</OverlayTrigger>);
                    break;
                case 3:
                    circlesArrayWithOverlay.push(<OverlayTrigger key={index} trigger="click" overlay={popoverLvl3} rootClose>{ elem }</OverlayTrigger>);
                    break;
                default: circlesArrayWithOverlay.push(<OverlayTrigger key={index} trigger="click" overlay={popoverLvl1} rootClose>{ elem }</OverlayTrigger>);
            }
        });

        return (
            <Container>
                    <Card>
                        <Card.Body>
                            <LinkContainer to='/home'><Button id="uebungBeenden">Fertig! <br />(Übung beenden)</Button></LinkContainer>
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
                        </Card.Body>
                    </Card>
            </Container>
        )
    }
}