import React from 'react'
import Aux from '../HOC/Aux'
import classes from './Input.css'

const input = (props) => {
  let element = null

  switch (props.tag) {
    case ('multiple'):
        element = (
          <Aux>
            {props.information.map((item, index) => {
               if (item.tag === 'input') {
                return (<input
                  key={item.name}
                  className={classes.Input}
                  onChange= {(e) => props.changed(e, index)}
                  value={item.value}
                  placeholder={item.name}
                />)
              }
              if (item.tag === 'textarea') {
               return (<textarea
                 key={item.name}
                 className={classes.Input}
                 onChange= {(e) => props.changed(e, index)}
                 value={props.value}
                 placeholder={item.name}
               />)
             }
              if (item.tag === 'select') {
                return (<select
                    key={item.name}
                    className={classes.Select}
                    onChange={(e) => props.changed(e, index)}
                    value={item.value}
                  >
                  {item.config.options.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.display}
                      </option>
                    )
                  })}
                </select>)
              }
            })}
          </Aux>
        )
      break;
    default: element = (
      <Aux>
        <input
          className={classes.Input}
          onChange= {props.changed}
          value={props.value}
          placeholder={props.children}
        />
      </Aux>
    )
  }

  return (
      <div>
        {element}
      </div>
    )
}

export default input
