import React from 'react'
import classes from './Input.css'

const input = (props) => {
  let element = null

  switch (props.tag) {
  case ('input'):
    element = (
    <input
      onChange= {props.changed}
      value={props.value}
      placeholder={props.children}
    />)
  break;
  case ('select'):
    element = (
      <select
        onChange={props.changed}
        value={props.value}
      >
        {props.config.options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.display}
            </option>
          )
        })}
      </select>
    )
  break;
  case ('textarea'):
      element = (
        <textarea
          onChange= {props.changed}
          value={props.value}
        />)
    break;
    default: element = (
      <input
        onChange= {props.changed}
        value={props.value}
      />)
  }

  return (
      <div>
        {element}
      </div>
    )
}

export default input
