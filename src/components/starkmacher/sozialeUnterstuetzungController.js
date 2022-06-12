import React from 'react';
import SozialeUnterstuetzung from './SozialeUnterstuetzung';
import SozialeUnterstuetzungInfoText from './sozialeUnterstuetzungInfoText';

export default class SozialeUnterstuetzungController extends React.Component {
    constructor() {
        super();

        this.state = {level: 1, personas: [{name: '', circleID: '', symbols: []}]};

        this.newPerson = this.newPerson.bind(this);
    }


    newPerson(name, circleID, symbols) {
        let personas = this.state.personas;
        personas.push({name: name, circleID: circleID, symbols: symbols});
        this.setState({personas: personas});
    }

    render() {
        let personas = this.state.personas;
        let level = this.state.level;

        return (
            <div>
                <SozialeUnterstuetzungInfoText level={level}></SozialeUnterstuetzungInfoText>
                <SozialeUnterstuetzung newPerson={this.newPerson} personas={personas}></SozialeUnterstuetzung>
            </div>
        );
    }
}