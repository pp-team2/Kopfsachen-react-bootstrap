import React from 'react';
import Button from 'react-bootstrap/Button';


export default class Feedback extends React.Component {
    /* constructor() {
        super();
    } */

render() {
    return (
        <div>
            <Button variant="success">Super</Button>
            <Button variant="danger">Schlecht</Button>
        </div>
    )
}

}