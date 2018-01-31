import React, {Component} from 'react'
import axios from 'axios'
import Aux from '../../HOC/Aux'
import classes from './RecipeList.css'
import Recipe from '../../components/Recipe/Recipe'
import Spinner from '../../UI/Spinner'

class RecipeList extends Component {
  state = {
    recipes: [],
    loading: false,
    menu: false
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
      this.setState({recipes: err, loading: false})
      console.log(err);
    })
  }
  menuHandler = () => {

    this.setState({menu: !this.state.menu})

  }
  homeHandler = () => {
    this.props.history.push('/')
  }
  buildHandler = () => {
    this.props.history.push('/build-recipe')
  }
  render() {
    let list = (
        this.state.recipes.map((recipe) => {
          return (
            <Recipe
              key={recipe.id}
              id={recipe.id}
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
            onClick={this.homeHandler}
            className={classes.Link}>
            <strong>Home</strong>
          </p>
          <p
            onClick={this.buildHandler}
            className={classes.Link}>
            <strong>Build Recipe</strong>
          </p>
        </Aux>
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
        <ul className={classes.List}>
          {list}
        </ul>
      </main>
    )
  }
}
export default RecipeList
