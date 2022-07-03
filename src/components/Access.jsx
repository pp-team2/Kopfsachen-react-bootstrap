import React from 'react'
import { ButtonGroup, Stack } from 'react-bootstrap';
import Registration from './Registration'
import Logout from './Logout'
import Login from './Login'
import Expertensicht from './Expertensicht'


const Access = (props) => {
    return (
    <>
        <ButtonGroup className="mb-2">
        <Stack gap={2} className="col-md-5 mx-auto">

        <Registration sessionActive={props.sessionActive} check={props.check} setExpertView={props.setExpertView} />  

        <br></br>
        <Login sessionActive={props.sessionActive} check={props.check} setExpertView={props.setExpertView}  />

        <Logout sessionActive={props.sessionActive} check={props.check} setExpertView={props.setExpertView} />

        <Expertensicht preLines={props.expertView} sessionActive={props.sessionActive} />

        </Stack>
        </ButtonGroup>
    </>
    )
}

export default Access
