import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


export default class Sicherheitsnetz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {text: '', picture: ''};

        this.selectNewActivity = this.selectNewActivity.bind(this);
        this.textChange = this.textChange.bind(this);
        this.pictureChange = this.pictureChange.bind(this);
        this.exit = this.exit.bind(this);
        this.save = this.save.bind(this);
    }


    selectNewActivity() {
        this.save();
        this.props.selectNewActivity();
    }

    textChange(elem) {
        this.setState({text: elem.target.value});
    }

    pictureChange(elem) {
        document.querySelectorAll('img').forEach(element => element.style.border = '');
        document.querySelectorAll('.'+elem.target.getAttribute('class')).forEach(element => element.style.border = "black solid");
        this.setState({picture: document.querySelector('.'+elem.target.getAttribute('class'))});
        //console.log(document.querySelector('.'+elem.target.getAttribute('class')));
    }

    save() {
        this.props.saveActivity(this.state.text, this.state.picture, this.props.clickID);
    }

    exit() {
        this.save();
    }

    render() {
        return (
            <Container style={{textAlign: 'center'}}>
                <Row>
                    <Col>
                        <p>Das bereitet mir eine Freude:</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input onChange={this.textChange} type="text"></input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Zu welcher Kategorie gehört diese Ressource?</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img className="p_1" onClick={this.pictureChange} src="/logo.png" alt="Logo-Bild" style={{width: 30 + '%', height: 30 + '%'}}/>
                        {/* <svg className="p_1" onClick={this.pictureChange} width="100%" height="100%" viewBox='0 100 500 200'>
                            <g>
                                <rect className="p_1" fill="#ffd4aa" height="136" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)" width="143" x="150" y="120.5"/>
                                <ellipse className="p_1" cx="220" cy="187.5" fill="#007f00" rx="51" ry="57" stroke="#000000" strokeWidth="5"/>
                            </g>
                        </svg> */}
                    </Col>
                    <Col>
                        <img className="p_2" onClick={this.pictureChange} src="/tagebuch.jpg" alt="Tagebuch-Bild" style={{width: 30 + '%', height: 30 + '%'}}/>
                        {/* <svg className="p_2" onClick={this.pictureChange} width="100%" height="100%" viewBox='0 100 500 200'>
                            <g>
                                <rect className="p_2" fill="#7f0000" height="136" troke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)" width="143" x="150" y="120.5"/>
                                <ellipse className="p_2" cx="220" cy="187.5" fill="#ff7f00" rx="51" ry="57" stroke="#000000" strokeWidth="5"/>
                            </g>
                        </svg> */}
                    </Col>
                    <Col>
                        <svg className="p_3" onClick={this.pictureChange} width="100%" height="100%" viewBox='0 100 500 200'>
                            <g>
                                <rect className="p_3" fill="#ffaad4" height="136" stroke="#000000" strokeWidth="5" transform="matrix(1 0 0 1 0 0)" width="143" x="150" y="120.5"/>
                                <ellipse className="p_3" cx="220" cy="187.5" fill="#000000" rx="51" ry="57" stroke="#000000" strokeWidth="5"/>
                            </g>
                        </svg>
                    </Col>    
                </Row>
                <Row>
                    <Col>
                        <Button onClick={this.selectNewActivity}>Weitere Ressourcen hinzufügen</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.exit} variant="success">Das sind alle Ressourcen</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}