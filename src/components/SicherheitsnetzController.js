import React from 'react';
import Sicherheitsnetz from './Sicherheitsnetz';
import Aktiviatet from './Aktivitaet';
import Feedback from './Feedack';


export default class SicherheitsnetzController extends React.Component {
    constructor() {
        super();

        this.state = {site: null, clickID: 0, activities: [{id: 0, text: '', picture: '', placeID: ''}]};
        this.addNewActivity = this.addNewActivity.bind(this);
        this.selectNewActivity = this.selectNewActivity.bind(this);
        this.saveActivity = this.saveActivity.bind(this);
        this.uebungBeenden = this.uebungBeenden.bind(this);
    }

    saveActivity(text, picture, placeID) {
        // Speichert die Aktivität hier im State
        let alte = this.state.activities;
        // Schaut sich die ID der letzten Aktivität an und setzt sie dann eins hoch
        let lastID = alte[alte.length-1].id;
        alte.push({id: lastID+1, text: text, picture: picture, placeID: placeID});
        this.setState({activities: alte});
        console.log(this.state.activities);
    }

    addNewActivity(id) {
        // Zeigt den Bildschirm einer neuen Aktivität hinzufügen an
        this.setState({site: 1, clickID: id});
    }

    uebungBeenden() {
        // Wenn die Übung beendet wird
        this.setState({site: 2});
    }
    
    selectNewActivity() {
        // Zeigt den Bildschrim des Sicherheitsnetzes an
        this.setState({site: 0});
    }

    

    render() {
        let toShow;
        switch (this.state.site) {
            case 0: toShow = <Sicherheitsnetz uebungBeenden={this.uebungBeenden} activities={this.state.activities} addNewActivity={this.addNewActivity}></Sicherheitsnetz>
                break;
            case 1: toShow = <Aktiviatet selectNewActivity={this.selectNewActivity} saveActivity={this.saveActivity} clickID={this.state.clickID}></Aktiviatet>
                break;
            case 2: toShow = <Feedback></Feedback>
                break;
            default: toShow = <Sicherheitsnetz addNewActivity={this.addNewActivity} activities={this.state.activities}></Sicherheitsnetz>
        }
        return (
            <div>
                {toShow}
            </div>
            
        )
    }
}