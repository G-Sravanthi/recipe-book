import React, {Component} from 'react'
import axios from 'axios'
import Aux from '../../HOC/Aux'
import classes from './RecipeList.css'
import Recipe from '../../components/Recipe/Recipe'
import Modal from '../../UI/Modal'
import Spinner from '../../UI/Spinner'

let recipe = []

class RecipeList extends Component {
  state = {
    recipes: [],
    loading: false,
    menu: false,
    modal: false,
    recipeID: null
  }
  componentDidMount() {
    this.setState({
      loading: true
    })
    axios.get('https://recipe-builder-7bfb0.firebaseio.com/recipes.json')
    .then(res => {
      let recipesArray = []
      for(let key in res.data) {
        recipesArray.push({
          ...res.data[key],
          id: key
        })
      }
      this.setState({recipes: recipesArray, loading: false})
    })
    .catch( err => {
      this.setState({loading: false})
      console.log(err);
    })
  }
  menuHandler = () => {
    this.setState({menu: !this.state.menu})
  }
  buildHandler = () => {
    this.props.history.push('/build-recipe')
  }
  openModal = (e, info) => {
    console.log(info.id);
    this.setState({modal: true, recipeID: info.id})
    recipe = info
    console.log(recipe);
  }
  closeModal = () => {
    this.setState({modal: false})
    recipe = []
  }
  startRecipeHandler = () => {
    this.props.history.push({
      pathname: '/start-recipe',
      search: '?recipeID=' + this.state.recipeID
    })
  }
  render() {
    let list = (
        this.state.recipes.map((recipe) => {
          return (
            <Recipe
              key={recipe.id}
              id={recipe.id}
              clicked = {(e, info) => this.openModal(e, info)}
              name={recipe.recipeName}
              ingredients={recipe.recipeIngredients}
              directions={recipe.recipeDirections}
              time={recipe.recipeTimes}
            />
          )
        })
      )
    if(this.state.loading) {
      list = <Spinner />
    }
    let menu = null
    if (this.state.menu) {
      menu = (
        <Aux>
          <p
            onClick={this.buildHandler}
            className={classes.Link}>
            <strong>Build a Recipe</strong>
          </p>
        </Aux>
      )
    }
    let recipeModal = null
    if (this.state.modal) {
      recipeModal = (
        <Modal
          name = {recipe.name}
          ingredients = {recipe.ingredients}
          directions = {recipe.directions}
          time = {recipe.time}
          clicked = {this.startRecipeHandler}
          close = {this.closeModal}
          start = {this.startRecipeHandler}
        />
      )
    }
    return (
      <main className={classes.Main}>
        <div className={classes.Menu}>
          <i
            style={{
              cursor: 'pointer',
              color: 'RGBA(80, 143, 162, 1.00)'
            }}
            onClick={this.menuHandler}
            className="fa fa-bars fa-2x"
            aria-hidden="true">
          </i>
            {menu}
        </div>
        {recipeModal}
        <ul className={classes.List}>
          {list}
        </ul>
      </main>
    )
  }
}
export default RecipeList
