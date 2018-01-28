import React, {Component} from 'react'
import axios from 'axios'
import Recipe from '../../components/Recipe/Recipe'

class RecipeList extends Component {
  state = {
  recipes: []
}
  componentDidMount() {
    axios.get('https://recipe-builder-7bfb0.firebaseio.com/recipes.json')
    .then(res => {
      let recipesArray = []
      for(let key in res.data) {
        recipesArray.push({
          ...res.data[key],
          id: key
        })
      }
      this.setState({recipes: recipesArray})
      console.log(this.state.recipes);
    })
    .catch( err => {
      this.setState({loading: false})
      console.log(err);
    })
  }
  render() {
    return (
      <div>
        {this.state.recipes.map((recipe) => {
          console.log(recipe);
          return (
          <Recipe
            key={recipe.id}
            name={recipe.recipeName}
            ingredients={recipe.recipeIngredients}
            directions={recipe.recipeDirections}
            time={recipe.recipeTimes}
          />
        )
      })}
    </div>
    )
  }
}
export default RecipeList
