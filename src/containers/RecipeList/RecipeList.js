import React, {Component} from 'react'
import axios from 'axios'
import Recipe from '../../components/Recipe/Recipe'
import Spinner from '../../UI/Spinner'

class RecipeList extends Component {
  state = {
    recipes: [],
    loading: false
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
    return (
      <div style={{display: 'flex'}}>
        {list}
      </div>
    )
  }
}
export default RecipeList
