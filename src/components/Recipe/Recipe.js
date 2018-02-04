import React from 'react'
import classes from './Recipe.css'

const Recipe = (props) => {
  return (
    <li className={classes.Recipe}
      onClick={(e) => props.clicked(e, props)}
      className={classes.Recipe}>
      <h3 className={classes.Title}>{props.name.name}</h3>
      <div>
        <p className={classes.Description}><strong>Ingredients Needed:</strong></p>
        <h4 className={classes.Input}>{props.ingredients.length}</h4>
      </div>
      <div>
        <p className={classes.Description}><strong>Steps Required:</strong></p>
        <h4 className={classes.Input}>{props.directions.length}</h4>
      </div>
      <div className={classes.Container}>
        <p className={classes.Description}><strong>Prep Time:</strong></p>
        <h4 className={classes.Input}>{props.time.prep} {props.time.preptime}</h4>
      </div>
      <div>
        <p className={classes.Description}><strong>Cook Time:</strong></p>
        <h4 className={classes.Input}>{props.time.cook} {props.time.cooktime}</h4>
      </div>
    </li>
  )
}
export default Recipe
