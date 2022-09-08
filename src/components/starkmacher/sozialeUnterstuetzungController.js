import React from 'react';
import SozialeUnterstuetzung from './SozialeUnterstuetzung';
import SozialeUnterstuetzungInfoText from './sozialeUnterstuetzungInfoText';
import API from '../API';


export default class SozialeUnterstuetzungController extends React.Component {
    constructor(props) {
        super(props);
        let level = this.props.level;

        /* async function fetchDataGET() {
            const jsonRes = await API.getMotivator(props.sessionToken);

            console.log("Test GET Motivators: ");
            console.log(jsonRes);
        }
        fetchDataGET(); */

        this.state = {level: level, personas: [{name: '', circleID: '', symbols: [], markiert: false}]};

        this.newPerson = this.newPerson.bind(this);
        this.uebungBeenden = this.uebungBeenden.bind(this);
    }


    // Fügt eine neue Person dem State hinzu
    newPerson(name, circleID, symbols, markiert) {
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
    }

    // Beendet die Übung und sendet eine API-Anfrage um die Ergebnisse zu speichern
    uebungBeenden() {
        let sessionToken = this.props.sessionToken;

        console.log(this.state.personas);

        let values = {1: {entries: {personas: this.state.personas}}};
        console.log(values);

        // TODO: Aktuelle Antwort: 502: Bad Gateway
        async function fetchDataPOST() {
            let jsonRes = await API.postMotivatorResult(3, sessionToken, new Date(), values, 'positive');
            
            console.log("Test POST Soziale Unterstützung: ");
            console.log(jsonRes);
        }
        fetchDataPOST();
    }

    render() {
        let personas = this.state.personas;
        let level = this.state.level;

        return (
            <div>
                <SozialeUnterstuetzungInfoText level={level}></SozialeUnterstuetzungInfoText>
                <SozialeUnterstuetzung level={level} newPerson={this.newPerson} personas={personas} uebungBeenden={this.uebungBeenden}></SozialeUnterstuetzung>
            </div>
        );
    }
}