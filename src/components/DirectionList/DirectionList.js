import React from 'react'
import Direction from './Direction'

const DirectionList = (props) => {
  console.log(props.information);
  return (
    <div style={{
      margin: '0 auto',
      textAlign: 'center',
      width: '80%'
    }}>
    {/* {props.information.map((item, index) => {
      <Direction
        key={index}
        direction = {item.direction}
        designation = {item.designation}
      />
    })} */}
    </div>
  )
}
export default DirectionList
