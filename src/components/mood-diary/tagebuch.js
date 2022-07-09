import React from 'react'
import { Button } from 'react-bootstrap'
import './tagebuch.css'

const Tagebuch = () => {
    return (
      <div className="center-tagebuch">
        <h1>Hallo, wie geht's dir?</h1>
        <div>
          <Button href="/positiv" className="button-tagebuch positive" variant="primary" size="lg">
            <div className="emoji">&#128513; &#129303; &#128578;</div>
          </Button>
          <Button href="" className="button-tagebuch neutral" variant="primary" size="lg">
            <div className="emoji">&#128529; &#128531; &#128530;</div>
          </Button>
          <Button href="" className="button-tagebuch negative" variant="primary" size="lg">
            <div className="emoji">&#128545; &#128546; &#128577;</div>
          </Button>
        </div>
      </div>
    )
}

export default Tagebuch
