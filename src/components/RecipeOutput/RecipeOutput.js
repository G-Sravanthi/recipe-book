import React from 'react'
import classes from './RecipeOutput.css'

const RecipeOutput = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      {props.ingredients.map((item, index) => {
        <p>{item}</p>
      })}
      {props.directions.map((item, index) => {
        <p>{item}</p>
      })}
      <h4>{props.prep}</h4>
      <h4>{props.preptime}</h4>
      <h4>{props.cook}</h4>
      <h4>{props.cooktime}</h4>
    </div>
  )
}
export default RecipeOutput
