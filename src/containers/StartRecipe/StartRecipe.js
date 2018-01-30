import React, {Component} from 'react'
import axios from 'axios'
import Spinner from '../../UI/Spinner'

let recipeID = null

class StartRecipe extends Component {
  state = {
    recipe: [],
    loading: false
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
      this.setState({recipe: recipesArray, loading: false})
      console.log(this.state.recipe);
    })
    .catch( err => {
      this.setState({recipe: err, loading: false})
      console.log(err);
    })
  }
  render() {
    let recipeInfo = <div>HI</div>
    if(this.state.loading) {
      recipeInfo = <Spinner />
    }
    return (
      <div>
        {recipeInfo}
      </div>
    )
  }
}
export default StartRecipe
