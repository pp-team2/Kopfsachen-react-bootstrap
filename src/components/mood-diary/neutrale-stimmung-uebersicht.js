import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './tagebuch.css'

const Neutral = () => {
  return (
    <Container className="d-grid gap-4">
      <div className="mb-2 center-tagebuch">
        <div className="center-positive-stimmung-uebersicht">
          <h1>
            Wenn du heute eher unmotiviert oder müde bist, kannst du entweder in deinem Sicherheitsnetz schauen, was
            dir sonst eine Freude bereitet oder du probierst eine neue Starkmacher-Übung aus!
          </h1>
        </div>
        <LinkContainer to="/starkmacher/sicherheitsnetz">
          <Button className="button-left-neutrale-stimmung-uebersicht" variant="success" size="lg">
            <p className="btn-text-positive-stimmung-uebersicht"><b>Sicherheitsnetz</b></p>
          </Button>
        </LinkContainer>
        <LinkContainer to="/neueStarkmacher">
          <Button className="button-right-neutrale-stimmung-uebersicht" variant="success" size="lg">
            <p className="btn-text-positive-stimmung-uebersicht"><b>Neuen Starkmacher üben!</b></p>
          </Button>
        </LinkContainer>
      </div>
    </Container>
  )
}

export default Neutral
