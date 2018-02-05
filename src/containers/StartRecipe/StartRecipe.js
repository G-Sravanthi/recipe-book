import React, {Component} from 'react'
import axios from 'axios'
import CheckBox from '../../UI/CheckBox'
import Spinner from '../../UI/Spinner'

let recipeID = null

class StartRecipe extends Component {
  state = {
    loading: true,
    name: undefined,
    ingredients: undefined,
    directions: undefined,
    time: undefined,
    checked: []
  }
  componentWillMount = () => {
    const query = new URLSearchParams(this.props.location.search)
    for (let param of query.entries()) {
      if (param[0] === 'recipeID') {
        recipeID = param[1]
      } else {
        console.log('error');
      }
    }
  }
  componentDidMount() {
    this.setState({
      loading: true
    })
    console.log(this.state)
    axios.get('https://recipe-builder-7bfb0.firebaseio.com/recipes/'+ recipeID +'.json')
    .then(res => {
      console.log(res.data.recipeName);
      let ingredientArray = []
      ingredientArray.push(res.data.recipeIngredients)
      let DirectionArray = []
      DirectionArray.push(res.data.recipeDirections)
      let recipesArray = []
      this.setState({
        name: res.data.recipeName.name,
        ingredients: ingredientArray,
        directions: DirectionArray,
        time: res.data.recipeTimes,
        loading: false})
      console.log(this.state)
    })
    .catch( err => {
      this.setState({recipe: err, loading: false})
      console.log(err);
    })

  }
  completionHandler = (info) => {
    let checkCompleted = this.state.checked
    checkCompleted.push(info)
    this.setState({checked: checkCompleted})
      console.log(this.state.checked);
  }
  render() {
    let recipeInfo = null
    if(!this.state.loading) {
      recipeInfo = (
        this.state.ingredients[0].map((item, index) => {
            console.log(item);
            return (
              <CheckBox
                key={index}
                info={item}
                completion={(info) => this.completionHandler(info)}
              />
            )
          }))
    }
    if(this.state.loading) {
      recipeInfo = <Spinner />
    }
    return (
      <main>
        {recipeInfo}
      </main>
    )
  }
}
export default StartRecipe
