import React from 'react'
import Registration from './Registration'

const zugriff = (props) => {
    return (
        <div>
            <h1>Zugriff verweigert!!! </h1>
            <Registration sessionActive={props.sessionActive} check={props.check} />
        </div>
    )
}

export default zugriff
