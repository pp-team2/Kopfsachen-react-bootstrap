import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './tagebuch.css'

const Positiv = () => {
  return (
    <Container className="d-grid gap-4">
      <div className="mb-2 center-tagebuch">
        <div className="center-positive-stimmung-uebersicht">
          <h1>Wenn du dich gerade gut fühlst, ist das genau der richtige Moment, um an deinen Starkmachern zu arbeiten!</h1>
        </div>
        <LinkContainer to="/">
          <Button className="button-left-positive-stimmung-uebersicht" variant="outline-secondary" size="lg">
            <p className="btn-text-positive-stimmung-uebersicht"><b>Lieber nicht.</b></p>
          </Button>
        </LinkContainer>
        <LinkContainer to="/starkmacher">
          <Button className="button-right-positive-stimmung-uebersicht" variant="success" size="lg">
            <p className="btn-text-positive-stimmung-uebersicht"><b>Let's Go!</b></p>
          </Button>
        </LinkContainer>
      </div>
    </Container>
  )
}

export default Positiv
