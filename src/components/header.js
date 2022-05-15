import React from 'react'
import { Container } from 'react-bootstrap'


const header = (props) => {

    const headerStyle = {
        backgroundColor: props.color,
        height: "250px",
        display: "flex",
        justifyContent: "flex-center",
        marginBottom: "15px"
    }

    const titleStyle = {
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "30px"
    }

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    }

    return ( <
        div style = { headerStyle } >
        <
        Container style = { containerStyle } >
        <
        h1 style = { titleStyle } > { props.text } < /h1> <
        img src = { props.img }
        alt = { props.txt }
        width = "200px" / >
        <
        /Container> < /
        div >
    )
}

export default header