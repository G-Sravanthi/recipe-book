import React, {Component} from 'react'
import axios from 'axios'
import CheckBox from '../../UI/CheckBox'
import Spinner from '../../UI/Spinner'

let recipeID = null

class StartRecipe extends Component {
  state = {
    name: '',
    ingredients: [],
    directions: [],
    time: '',
    check: false
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
    axios.get('https://recipe-builder-7bfb0.firebaseio.com/recipes/'+ recipeID +'.json')
    .then(res => {
      let recipesArray = []
      for(let key in res.data) {
        recipesArray.push({
          ...res.data[key],
          id: key
        })
      }
      console.log(recipesArray);
      this.setState({
        name: recipesArray[2].name,
        ingredients: recipesArray[1],
        directions: recipesArray[0],
        time: recipesArray[3],
        loading: false})
      console.log(this.state.directions);
    })
    .catch( err => {
      this.setState({recipe: err, loading: false})
      console.log(err);
    })
  }
  checkHandler = () => {
    this.setState({check: !this.state.check})
  }
  render() {
  let recipeInfo = (
    <h2>hi</h2>
  )
    if(this.state.loading) {
      recipeInfo = <Spinner />
    }
    return (
      <main>
        <CheckBox
          check={this.state.check}
          clicked={this.checkHandler}
        />
      </main>
    )
  }
}
export default StartRecipe
