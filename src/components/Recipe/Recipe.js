import React from 'react'

const Recipe = (props) => {

  return (
    <div >
      <p>{props.name.name}</p>
      <h3>Ingredients</h3>
      {props.ingredients.map((item, index) => {
        return (
          <p key={index}>
            {item.ingredient} {item.amount} {item.measurement}
          </p>
        )
      })}
      {props.directions.map((item, index) => {
        return (
          <p key={index}>
            {item.direction} {item.designation}
          </p>
        )
      })}
      <p>{props.time.prep} {props.time.preptime}</p>
      <p>{props.time.cook} {props.time.cooktime}</p>
    </div>
  )
}
export default Recipe
