import React from 'react'
import Access from './Access';


const zugriff = (props) => {
    return (

    <div className="App">
       <h1>Zugriff verweigert!!! </h1>
        <Access sessionActive={props.sessionActive} check={props.check} setExpertView={props.setExpertView} expertView={props.expertView}/>
    </div>
    )
}

export default zugriff
