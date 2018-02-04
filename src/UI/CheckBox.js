import React from 'react'
import classes from './CheckBox.css'
import Aux from '../HOC/Aux'

const CheckBox = (props) => {
  let check = null
  if (props.check) {
    check = (
      <div>
          <i style={{paddingBottom: '12px'}} className="fas fa-check"></i>
      </div>
    )
  }
  return (
    <div className={classes.CheckBox}>
      <div
        className={classes.Box}
        onClick={props.clicked}>
        {check}
      </div>
      <div className={classes.Input}>
        Chicken Pot Pie
      </div>
    </div>
  )
}
export default CheckBox
