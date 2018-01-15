import React from 'react'
import classes from './Input.css'

const input = (props) => {
  return (
    <input
      onChange={props.value}
      placeholder={props.children}
      className={classes.Input}>

      </input>
  )
}

export default input
