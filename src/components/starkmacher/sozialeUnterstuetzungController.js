import React from 'react';
import SozialeUnterstuetzung from './SozialeUnterstuetzung';
import SozialeUnterstuetzungInfoText from './sozialeUnterstuetzungInfoText';


export default class SozialeUnterstuetzungController extends React.Component {
    constructor() {
        super();

        this.state = {level: 1, personas: [{name: '', circleID: '', symbols: [], markiert: false}]};

        this.newPerson = this.newPerson.bind(this);
    }


    newPerson(name, circleID, symbols, markiert) {
        //console.log(circleID);
        let personas = this.state.personas;
        if (name == undefined && symbols == undefined) {
            personas = personas.map(line => {
                if (line.circleID === circleID) {
                    line.markiert = markiert;
                }
                return line;
            })
        } else if (name == undefined) {
            // Nur die Symbole updaten (Level 2)
            personas = personas.map(line => {
                if (line.circleID === circleID) {
                    symbols.forEach(symbol => line.symbols.push(symbol));
                }
                return line;
            });
        } else {
            // Ganz neue Person einfügen
            personas.push({name: name, circleID: circleID, symbols: symbols, markiert: markiert});
        }
        console.log(personas);
        this.setState({personas: personas});
        //console.log(this.state.personas);
    }

    render() {
        let personas = this.state.personas;
        let level = this.state.level;

        return (
            <div>
                <SozialeUnterstuetzungInfoText level={level}></SozialeUnterstuetzungInfoText>
                <SozialeUnterstuetzung level={level} newPerson={this.newPerson} personas={personas}></SozialeUnterstuetzung>
            </div>
        );
    }
}