import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './tagebuch.css'

const Negativ = () => {
  return (
    <Container className="d-grid gap-4">
      <div className="mb-2 center-tagebuch">
        <div className="center-positive-stimmung-uebersicht">
          <h1>
            Wenn es dir schlecht geht, haben wir verschiedene Optionen für dich: Entweder du schaust in dein
            <b> Sicherheitsnetz</b> welche Aktivitäten dir in der Vergangenheit in solchen Situationen geholfen haben, oder du
            probierst heute eine <b>neue Strategie</b> zur Emotionsregulation aus. Wenn du externe Hilfe benötigst, haben wir
            auch eine Übersicht mit <b>Beratungsstellen</b> für dich.
          </h1>
        </div>
        <LinkContainer to="/starkmacher/sicherheitsnetz">
          <Button className="btn-negative-stimmung" variant="success" size="lg">
            <p className="btn-text-positive-stimmung-uebersicht"><b>Sicherheitsnetz</b></p>
          </Button>
        </LinkContainer>
        <LinkContainer to="/">
          <Button className="btn-negative-stimmung" variant="success" size="lg">
            <p className="btn-text-positive-stimmung-uebersicht"><b>Neuen Strategien</b></p>
          </Button>
        </LinkContainer>
        <LinkContainer to="/neueStarkmacher">
          <Button className="btn-negative-stimmung" variant="success" size="lg">
            <p className="btn-text-positive-stimmung-uebersicht"><b>Beratungsstellen</b></p>
          </Button>
        </LinkContainer>
      </div>
    </Container>
  )
}

export default Negativ
