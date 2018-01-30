import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import classes from './Recipe.css'
import Aux from '../../HOC/Aux'
import Modal from '../../UI/Modal'

class Recipe extends Component {
  state = {
    idClicked: '',
    viewing: false
  }
  openModalHandler = () => {
    this.setState({
      viewing: true
    })
  }
  closeModalHandler = () => {
    this.setState({
      viewing: false
    })
  }
  startRecipeHandler = () => {
    let recipeID = this.props.id
    this.props.history.push({
      pathname: '/start-recipe',
      search: '?recipeID=' + recipeID
    })
  }
  render () {
    let recipe = (
      <div
        className={classes.Recipe}
        onClick={this.openModalHandler}>
        <h3>{this.props.name.name}</h3>
        <p>Prep Time</p>
        <h4>{this.props.time.prep} {this.props.time.preptime}</h4>
        <p>Cook Time</p>
        <h4>{this.props.time.cook} {this.props.time.cooktime}</h4>
      </div>
    )
    if(this.state.viewing) {
      recipe= (
        <Modal
          hide={this.closeModalHandler}
          view={this.state.view}
          redirect={this.startRecipeHandler}
        >
          <h3>{this.props.name.name}</h3>
          <h3>Ingredients</h3>
          {this.props.ingredients.map((item, index) => {
            return (
              <p key={index}>
                {item.ingredient} {item.amount} {item.measurement}
              </p>
            )
          })}
          {this.props.directions.map((item, index) => {
            return (
              <p key={index}>
                {item.direction} {item.designation}
              </p>
            )
          })}
          <p>Prep Time</p>
          <h4>{this.props.time.prep} {this.props.time.preptime}</h4>
          <p>Cook Time</p>
          <h4>{this.props.time.cook} {this.props.time.cooktime}</h4>
        </Modal>
      )
    }
    return (
      <Aux>
        {recipe}
      </Aux>

    )
  }
}
export default withRouter(Recipe)
