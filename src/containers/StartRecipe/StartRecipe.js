import React, {Component} from 'react'
import axios from 'axios'
import IngCheckBox from '../../components/CheckBoxes/IngCheckBox'
import DirCheckBox from '../../components/CheckBoxes/DirCheckBox'
import classes from './StartRecipe.css'
import Spinner from '../../UI/Spinner'
import Aux from '../../HOC/Aux'
let recipeID = null

class StartRecipe extends Component {
  state = {
    menu: false,
    loading: true,
    name: undefined,
    ingredients: undefined,
    directions: undefined,
    time: undefined,
    checked: [],
    ingChecked: [],
    dirChecked: [],
    ingComplete: false,
    dirComplete: false
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
        ingChecked: ingredientArray[0].length,
        dirChecked: DirectionArray[0].length,
        loading: false
      })
    })
    .catch( err => {
      this.setState({recipe: err, loading: false})
      console.log(err);
    })

  }
  completionHandler = (info) => {
    let completion = []
    let complete = []
    let incomplete = []
    let checkCompleted = this.state.checked
    checkCompleted.push(info)
    this.setState({checked: checkCompleted})
    this.state.checked.map((item, index) => {
      completion.push(item.check)
    })
    completion.map((item, index) =>{
      if(item) {
        complete.push(item)
      } else {
        incomplete.push(item)
      }
    })
    if(complete.length - incomplete.length === this.state.ingChecked) {
      this.setState({ingComplete: true, checked: []})
      console.log(this.state);
    }
  }
  menuHandler = () => {
    this.setState({menu: !this.state.menu})
  }
  buildHandler = () => {
    this.props.history.push('/build-recipe')
  }
  listHandler = () => {
    this.props.history.push('/recipe-list')
  }
  render() {
    let menu = null
    if (this.state.menu) {
      menu = (
        <Aux>
          <p
            onClick={this.buildHandler}
            className={classes.Link}>
            <strong>Build a Recipe</strong>
          </p>
          <p
            onClick={this.listHandler}
            className={classes.Link}>
            <strong>List of Recipes</strong>
          </p>
        </Aux>
      )
    }
    let recipeInfo = null
    if(!this.state.loading && !this.state.ingComplete) {
      recipeInfo = (
        <div style={{overflow: 'scroll', height: '100vh'}}>
          <h2 style={{textAlign: 'center', color: '#92D3ED'}}>Ingredients Check List</h2>
          {this.state.ingredients[0].map((item, index) => {
            return (
              <IngCheckBox
                name={this.state.name}
                key={index}
                info={item}
                completion={(info) => this.completionHandler(info)}
              >
                <div style={{textTransform: 'capitalize'}}><strong>{item.ingredient.trim()}</strong></div>
                <div>{item.amount}  {item.measurement}</div>
              </IngCheckBox>
            )
          })}
        </div>
      )
    }
    if(!this.state.loading && this.state.ingComplete) {
      recipeInfo = (
        <div style={{overflow: 'scroll', height: '100vh'}}>
          <h2 style={{textAlign: 'center', color: '#92D3ED'}}>Step by Step Directions</h2>
          {this.state.directions[0].map((item, index) => {
            return (
              <DirCheckBox
                name={this.state.name}
                key={index}
                info={item}
                completion={(info) => this.completionHandler(info)}
              >
                {item.direction} ({item.designation})
              </DirCheckBox>
            )
          })}
        </div>
      )
    }
    if(this.state.loading) {
      recipeInfo = <Spinner />
    }
    return (
      <Aux>
        <main className={classes.Main}>
          <div className={classes.Menu} onClick={this.menuHandler}>
            <i
              style={{
                cursor: 'pointer',
                color: 'RGBA(80, 143, 162, 1.00)'
              }}
              className="fas fa-bars fa-2x">
            </i>
              {menu}
          </div>
          {recipeInfo}
        </main>
      </Aux>
    )
  }
}
export default StartRecipe
