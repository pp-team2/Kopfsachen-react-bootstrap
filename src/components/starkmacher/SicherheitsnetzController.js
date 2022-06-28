import React from 'react';
import Sicherheitsnetz from './Sicherheitsnetz';
import Aktiviatet from './Aktivitaet';
import Feedback from './Feedack';
import AktiviatetHilfe from './AktivitaetHilfe';

export default class SicherheitsnetzController extends React.Component {
    constructor() {
        super();

        this.state = {site: null, clickID: 0, activities: [{id: 0, text: '', picture: '', placeID: '', 
            feedback: [{timestamp: '', comment: '', itHelped: false}]}]};
        this.addNewActivity = this.addNewActivity.bind(this);
        this.selectNewActivity = this.selectNewActivity.bind(this);
        this.saveActivity = this.saveActivity.bind(this);
        this.uebungBeenden = this.uebungBeenden.bind(this);
        this.commentActivity = this.commentActivity.bind(this);
        this.addComment = this.addComment.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);
    }

    saveActivity(text, picture, placeID) {
        // Speichert die Aktivität hier im State
        let alte = this.state.activities;
        // Schaut sich die ID der letzten Aktivität an und setzt sie dann eins hoch
        let lastID = alte[alte.length-1].id;
        alte.push({id: lastID+1, text: text, picture: picture, placeID: placeID, feedback: []});
        this.setState({activities: alte});
        console.log(this.state.activities);
    }

    addComment(id, comments) {
        let activities = this.state.activities;

        activities = activities.map(line => {
        // Suche nach der richtigen ID
         if (line.id === id) {
            // Füge die neuen Kommentare zu den alten hinzu
            let newOldComments = line.feedback;
            comments.forEach(line => newOldComments.push(line));
            line.feedback = newOldComments;
         }   
         return line;
        });

        this.setState({activities: activities});

        this.selectNewActivity();
    }

    deleteActivity(id) {
        let activities = this.state.activities;
        activities = activities.filter(line => line.id !== +id);
        console.log(activities);
        this.setState({activities: activities});
    }

    addNewActivity(id) {
        // Zeigt den Bildschirm einer neuen Aktivität hinzufügen an
        this.setState({site: 1, clickID: id});
    }

    commentActivity(id) {
        this.setState({site: 2, clickID: id});
    }

    uebungBeenden() {
        // Wenn die Übung beendet wird
        this.setState({site: 3});
    }
    
    selectNewActivity() {
        // Zeigt den Bildschrim des Sicherheitsnetzes an
        this.setState({site: 0});
    }

    

    render() {
        let toShow;
        
        switch (this.state.site) {
            case 0: toShow = <Sicherheitsnetz uebungBeenden={this.uebungBeenden} activities={this.state.activities} addNewActivity={this.addNewActivity} deleteActivity={this.deleteActivity} commentActivity={this.commentActivity}></Sicherheitsnetz>
                break;
            case 1: toShow = <Aktiviatet selectNewActivity={this.selectNewActivity} saveActivity={this.saveActivity} clickID={this.state.clickID}></Aktiviatet>
                break;
            case 2: toShow = <AktiviatetHilfe activity={this.state.activities.filter(line => line.id === this.state.clickID)} addComment={this.addComment}></AktiviatetHilfe>
                break;
            case 3: toShow = <Feedback></Feedback>
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