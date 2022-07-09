import React from 'react'
import { Button } from 'react-bootstrap'
import './tagebuch.css'

const Positiv = () => {
  return (
    <div className="mb-2 center-tagebuch">
      <div className="center-positive-stimmung-uebersicht">
        <h1>Wenn du dich gerade gut fühlst, ist das genau der richtige Moment, um an deinen Starkmachern zu arbeiten!</h1>
      </div>
      <Button href="/" className="button-left-positive-stimmung-uebersicht" variant="primary" size="lg">
        <p className="btn-text-positive-stimmung-uebersicht"><b>Lieber nicht.</b></p>
      </Button>{' '}
      <Button href="/starkmacher" className="button-right-positive-stimmung-uebersicht" variant="primary" size="lg">
        <p className="btn-text-positive-stimmung-uebersicht"><b>Let's Go!</b></p>
      </Button>
    </div>
  )
}

export default Positiv
