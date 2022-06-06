import React from 'react';
import SozialeUnterstuetzung from './SozialeUnterstuetzung';

export default class SozialeUnterstuetzungController extends React.Component {
    constructor() {
        super();

        this.state = {personas: [{name: 'Name', circleID: 'svg_6', symbols: []}, {name: 'test2', circleID: 'svg_18', symbols: []}]};

        this.newPerson = this.newPerson.bind(this);
    }


    newPerson(name, circleID, symbols) {
        let personas = this.state.personas;
        personas.push({name: name, circleID: circleID, symbols: symbols});
        this.setState({personas: personas});
        console.log(this.state.personas);
    }

    render() {
        let personas = this.state.personas;
        console.log(personas);

        return (
            <SozialeUnterstuetzung newPerson={this.newPerson} personas={personas}></SozialeUnterstuetzung>
        );
    }
}