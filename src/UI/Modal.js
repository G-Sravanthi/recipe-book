import React from 'react'
import { Button } from 'react-bootstrap';
import Aux from '../HOC/Aux'
import classes from './Modal.css'

const Modal = (props) => {
  return (
    <Aux>
      <div className={classes.Modal}>
        <div className={classes.Info}>
          <Button bsStyle="primary" bsSize="large">
  Large button
</Button>
          <button onClick={props.hide}>close</button>
          {props.children}
          <button onClick={props.redirect}>Start</button>
        </div>
      </div>
    </Aux>
  )
}

export default Modal
