import React from 'react'
import Aux from '../../HOC/Aux'

const Direction = (props) => {
  return (
    <div>
      <p>{props.direction}</p>
      <p>{props.designation}</p>
    </div>
  )
}
export default Direction
