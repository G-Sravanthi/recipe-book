import React from 'react'
import classes from './Modal.css'
import Aux from '../HOC/Aux'
import Button from './Button'

const Modal = (props) => {
  return (
    <div className={classes.Filter}>
      <div className={classes.CloseButton}>
        <div
          onClick = {props.close}
          className={classes.Close}>
          close
        </div>
        <h2 style={{textAlign: 'left', textTransform: 'capitalize'}}><strong>{props.name.name}</strong></h2>
        <div style={{textAlign: 'center', display: 'inline-block', width: '50%'}}>
          <h3 style={{color: '#508FA2'}}>Prep Time</h3>
          <p style={{margin: '0', display: 'inline-block', marginRight: '10px'}}>{props.time.prep.trim()}</p>
          <p style={{margin: '0', display: 'inline-block'}}>{props.time.preptime}</p>
        </div>
        <div style={{textAlign: 'center', display: 'inline-block', width: '50%'}}>
          <h3 style={{color: '#508FA2'}}>Cook Time</h3>
          <p style={{margin: '0', display: 'inline-block', marginRight: '10px'}}>{props.time.cook.trim()}</p>
          <p style={{margin: '0' ,display: 'inline-block'}}>{props.time.cooktime}</p>
        </div>
        <h3 style={{color: '#508FA2'}}>Ingredients</h3>
        {props.ingredients.map((item, index) => {
          return (
            <div
              key={index}
              style={{borderBottom: 'solid #28464B 1px'}}>
              <div style={{textTransform: 'capitalize', margin: '0', width: '50%', display: 'inline-block', textAlign: 'left'}}>{item.ingredient.trim()}</div>
              <div style={{margin: '0', width: '50%', display: 'inline-block', textAlign: 'right'}}>{item.amount} {item.measurement}</div>
            </div>
          )
        })}
        <h3 style={{color: '#508FA2'}}>Directions</h3>
        {props.directions.map((item, index) => {
          return (
            <div
              key={index}
              style={{borderBottom: 'solid #28464B 1px'}}>
              <div style={{margin: '0', width: '50%', display: 'inline-block', textAlign: 'left'}}>{item.direction.trim()}</div>
              <div style={{textTransform: 'capitalize',margin: '0', width: '50%', display: 'inline-block', textAlign: 'right'}}>{item.designation}</div>
            </div>
          )
        })}
        <Button
          clicked={props.start}
          >Start Recipe</Button>
      </div>
    </div>
  )
}

export default Modal
