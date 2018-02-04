import React, {Component} from 'react'
import axios from 'axios'
// import RecipeOutput from '../../components/RecipeOutput/RecipeOutput'
import Aux from '../../HOC/Aux'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'
import Modal from '../../UI/Modal'
import classes from './BuildRecipe.css'

const recipeBuilder = {}

class BuildRecipe extends Component {
  state = {
    error: false,
    menu: false,
    current: 'name',
    recipe: {
      ready: [
        {name: 'name'},
        {name: 'ingredients'},
        {name: 'directions'},
        {name: 'prepInfo'},
        {name: 'complete'}
      ],
      name: {
        name: 'name',
        tag: 'multiple',
        fields: [
          {
            name: 'name',
            tag: 'input',
            value: '',
            list: [],
            require: true,
            minLength: 1,
            type: 'string',
            touched: false,
            config: {
              placeholder: 'Recipe Name'
            }
          }
        ],
        valid: false
      },
      ingredients: {
        name: 'ingredients',
        tag: 'multiple',
        fields: [
          {
           name: 'ingredient',
           tag: 'input',
           value: '',
           list: [],
           require: true,
           minLength: 3,
           type: 'string',
           touched: false,
           saved: false,
           config: {
             placeholder: 'Ingredient'
           }
         },
         {
           name: 'amount',
           tag: 'input',
           value: '',
           list: [],
           require: true,
           minLength: 3,
           type: 'string',
           touched: false,
           saved: false,
           config: {
             placeholder: 'Amount',
             type: 'number'
           }
         },
         {
           name: 'measurement',
           tag: 'select',
           value: 'cup(s)',
           list: [],
           require: true,
           minLength: 3,
           type: 'string',
           touched: true,
           saved: false,
           config: {
             placeholder: 'cup(s)',
             options: [
               {value: 'VM', display: 'Volume Measurements'},
               {value: 'dash(s)', display: 'Dash(s)'},
               {value: 'pinch(s)', display: 'Pinch(s)'},
               {value: 'teaspoon(s)', display: 'Teaspoon(s)'},
               {value: 'tablespoon(s)', display: 'Tablespoon(s)'},
               {value: 'cup(s)', display: 'Cup(s)'},
               {value: 'pint(s)', display: 'Pint(s)'},
               {value: 'litter(s)', display: 'Litters(s)'},
               {value: 'quart(s)', display: 'Quart(s)'},
               {value: 'gallon(s)', display: 'Gallon(s)'},
               {value: 'WM', display: 'Weight Measurements'},
               {value: 'gram(s)', display: 'Gram(s)'},
               {value: 'ounces(s)', display: 'Ounces(s)'},
               {value: 'pound(s)', display: 'Pound(s)'},
               {value: 'SM', display: 'Specialty Measurements'},
               {value: 'bunch(s)', display: 'Bunch(s)'},
               {value: 'slice(s)', display: 'Slice(s)'},
               {value: 'stick(s)', display: 'Stick(s)'},
               {value: 'handful(s)', display: 'Handful(s)'},
               {value: 'clove(s)', display: 'Clove(s)'},
               {value: 'package(s)', display: 'Package(s)'},
               {value: 'steak(s)', display: 'Steak(s)'},
               {value: 'breast(s)', display: 'Breast(s)'},
               {value: 'thigh(s)', display: 'Thigh(s)'},
               {value: 'link(s)', display: 'Link(s)'},
               {value: 'patty(s)', display: 'Patty(s)'},
               {value: 'unit(s)', display: 'Unit(s)'},
               {value: '(other)', display: '(Other)'},
             ]
           }
         }
        ],
        valid: false
      },
      directions: {
        name: 'directions',
        tag: 'multiple',
        fields: [
          {
            name: 'direction',
            tag: 'textarea',
            value: '',
            list: [],
            require: true,
            minLength: 3,
            type: 'string',
            touched: false,
            saved: false,
            config: {
              placeholder: 'Step'
            }
          },
          {
            name: 'designation',
            tag: 'select',
            value: 'required',
            list: [],
            require: true,
            minLength: 3,
            type: 'string',
            touched: true,
            saved: false,
            config: {
              placeholder: 'required',
              options: [
                {value: 'DD', display: '---Direction Designation---'},
                {value: 'required', display: 'Required'},
                {value: 'optional', display: 'Optional'}
              ]
            }
          }
        ],
        valid: false
      },
      prepInfo: {
        name: 'prepInfo',
        tag: 'multiple',
        fields: [
          {
            name: 'prep',
            tag: 'input',
            value: '',
            list: [],
            require: true,
            minLength: 1,
            type: 'number',
            touched: false,
            config: {
              placeholder: 'Prep Time'
            }
          },
          {
            name: 'preptime',
            tag: 'select',
            value: 'minute(s)',
            list: [],
            require: true,
            minLength: 1,
            type: 'string',
            touched: true,
            config: {
              placeholder: 'minute(s)',
              options: [
                {value: 'PT', display: '---Unit of Time---'},
                {value: 'minute(s)', display: 'Minute(s)'},
                {value: 'hour(s)', display: 'Hour(s)'}
              ]
            }
          },
          {
            name: 'cook',
            tag: 'input',
            value: '',
            list: [],
            require: true,
            minLength: 1,
            type: 'number',
            touched: false,
            config: {
              placeholder: 'Cook Time',

            }
          },
          {
            name: 'cooktime',
            tag: 'select',
            value: 'minute(s)',
            list: [],
            require: true,
            minLength: 1,
            type: 'string',
            touched: true,
            config: {
              placeholder: 'minute(s)',
              options: [
                {value: 'CT', display: '---Unit of Time---'},
                {value: 'minute(s)', display: 'Minute(s)'},
                {value: 'hour(s)', display: 'Hour(s)'}
              ]
            }
          }
        ],
        valid: false
      },
    },
    send: false,
    loading: false,
  }

  onKeyPress(event) {
    if (event.which === 13) {
      event.preventDefault();
    }
  }
  menuHandler = () => {

    this.setState({menu: !this.state.menu})

  }
  // homeHandler = () => {
  //   this.props.history.push('/')
  // }
  listHandler = () => {
    this.props.history.push('/recipe-list')
  }
  modalClose = () => {
    this.setState({error: false})
  }
  multipleChangehandler = (event, index, field) => {
    let newRecipe = {
      ...this.state.recipe
    }
    let newElement = {
      ...this.state.recipe[field]
    }
    let valueEntered = {
      ...newElement.fields[index].touched
    }
    let newValue = {
      ...newElement.fields[index].value
    }
    newValue = event.target.value
    if (newValue === 'VM' || newValue === 'WM' || newValue === 'SM' || newValue === 'DD') {
      newValue = ''
    }
    if (newValue !== '') {
      valueEntered = true
    } else {
      valueEntered = false
    }
    newElement.fields[index].value = newValue
    newElement.fields[index].touched = valueEntered
    newRecipe[field] = newElement
    this.setState({recipe: newRecipe})
  }

  continueWithFormHandler = (event, group, id) => {
    let currentStep = {
      ...this.state.current
    }
    let savedRecipe = {
      ...this.state.recipe
    }
    let validity = {
      ...this.state.recipe[id]
    }
    let valid = true
    group.map((item) => {
      if (item.name === 'prep' || item.name === 'cook') {
        let check = parseInt(item.value)
        if(!item.touched) {
          this.setState({error: true})
          valid = false
        }
        if(typeof check !== item.type) {
        this.setState({error: true})
          valid = false
        }
      } else {
        if(!item.touched) {
          this.setState({error: true})
          valid = false
        }
        if(typeof item.value !== item.type) {
          this.setState({error: true})
          valid = false
        }
      }
    })
    validity.valid = valid
    if (validity.valid) {
      for(let i=0; i < savedRecipe.ready.length; i++) {
        if(savedRecipe.ready[i].name === id) {
          currentStep = savedRecipe.ready[i + 1].name
          savedRecipe[id] = validity
          this.setState({current: currentStep, recipe: savedRecipe})
        }
      }
    } else {
      console.log('not valid');
    }
  }

  continueFillingFormHandler = (event, information, group, id) => {
    let currentStep = {
      ...this.state.current
    }
    let savedRecipe = {
      ...this.state.recipe
    }
    let validity = {
      ...this.state.recipe[id]
    }
    let valid = true
    group.map((item) => {
      if(!item.touched) {
        valid = false
        this.setState({error: true})
        console.log(this.state);
      }
      if(typeof item.value !== item.type) {
        valid = false
        this.setState({error: true})
      }
      if(item.list.length > 0 && item.value === '') {
        valid = true
        validity.valid = valid
        for(let i=0; i < savedRecipe.ready.length; i++) {
          if(savedRecipe.ready[i].name === id) {
            currentStep = savedRecipe.ready[i + 1].name
            savedRecipe[id] = validity
            this.setState({current: currentStep, recipe: savedRecipe})
            return console.log(this.state);
          }
        }
      }
    })
    validity.valid = valid
    if (validity.valid) {
      this.addInfoHandler(event, information, group, id)
      for(let i=0; i < savedRecipe.ready.length; i++) {
        if(savedRecipe.ready[i].name === id) {
          currentStep = savedRecipe.ready[i + 1].name
          savedRecipe[id] = validity
          this.setState({current: currentStep, recipe: savedRecipe})
        }
      }
    } else {
      console.log('not valid');
    }
    console.log(this.state);
  }

  addInfoHandler = (event, information, group, id) => {
    let savedRecipe = {
      ...this.state.recipe
    }
    let savedValue = {
      ...this.state.recipe[id]
    }
    let valid = true
    group.map((item) => {
      if(!item.touched) {
        this.setState({error: true})
        valid = false
      }
      if(typeof item.value !== item.type) {
        this.setState({error: true})
        valid = false
      }
    })
    group.map((item, index) => {
      if (valid) {
        item.list.push(item.value)
        item.touched = false
        item.saved = true
        savedValue.fields[index] = item
        savedRecipe[id] = savedValue
        this.setState({recipe: savedRecipe})
        if(item.tag === 'select') {
          item.value = item.config.options[0].value
        }else{
          item.value = ''
        }
      }
    })
  }

  recipeHandler = (event) => {
    event.preventDefault()
    this.setState({loading: true})
    let ingredientsLogged = []
    let directionsLogged = []
    for (let i = 0; i < this.state.recipe.ingredients.fields[0].list.length; i++) {
      let ingredient = this.state.recipe.ingredients.fields[0].list[i]
      let amount = this.state.recipe.ingredients.fields[1].list[i]
      let measurement = this.state.recipe.ingredients.fields[2].list[i]
      let ingredientGroup = {
        ingredient,
        amount,
        measurement
      }
      ingredientsLogged.push(ingredientGroup)
    }
    for (let i = 0; i < this.state.recipe.directions.fields[0].list.length; i++) {
      let direction = this.state.recipe.directions.fields[0].list[i]
      let designation = this.state.recipe.directions.fields[1].list[i]
      let directionGroup = {
        direction,
        designation
      }
      directionsLogged.push(directionGroup)
    }
    recipeBuilder.recipeName = {name: this.state.recipe.name.fields[0].value}
    recipeBuilder.recipeIngredients = ingredientsLogged
    recipeBuilder.recipeDirections = directionsLogged
    recipeBuilder.recipeTimes = {
      prep: this.state.recipe.prepInfo.fields[0].value,
      preptime: this.state.recipe.prepInfo.fields[1].value,
      cook: this.state.recipe.prepInfo.fields[2].value,
      cooktime: this.state.recipe.prepInfo.fields[3].value
    }
    axios.post('https://recipe-builder-7bfb0.firebaseio.com/recipes.json', recipeBuilder)
      .then(response => {
        this.setState({loading: false})
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {

    let form = null
    let button = null
    let name = null
    let ingredients = null
    let directions = null
    let time = null

    if (this.state.current === 'name') {
        form = (<Aux key={this.state.recipe.name.name}>
          <h3 style={{
            margin: '10px 0',
            color: '#508FA2'
          }}>Name of Recipe</h3>
          <Input
            key={this.state.recipe.name.name}
            tag={this.state.recipe.name.tag}
            config={this.state.recipe.name.fields}
            changed={(event, index) => this.multipleChangehandler(event, index, this.state.recipe.name.name)}
            information={this.state.recipe.name.fields}
            >
              {this.state.recipe.name.fields}
          </Input>
          <div  style={{
            textAlign: 'center',
            width: '100%'
          }}>
            <Button
              clicked={(event)=>this.continueWithFormHandler(event, this.state.recipe.name.fields, this.state.recipe.name.name)}
              type='button'>
              Save
            </Button>
          </div>
        </Aux>)
      }
      if (this.state.current === 'ingredients') {
        form = (<Aux key={this.state.recipe.ingredients.name}>
          <h3 style={{
            margin: '10px 0',
            color: '#508FA2'
          }}>Recipe Ingredient</h3>
          <Input
            key={this.state.recipe.ingredients.name}
            tag={this.state.recipe.ingredients.tag}
            config={this.state.recipe.ingredients.fields}
            changed={(event, index) => this.multipleChangehandler(event, index, this.state.recipe.ingredients.name)}
            information={this.state.recipe.ingredients.fields}
            >
              {this.state.recipe.ingredients.fields}
          </Input>
          <div  style={{
            textAlign: 'center',
            width: '100%'
          }}>
            <Button
              type='button'
              clicked={(event) => this.addInfoHandler(event, this.state.recipe.ingredients, this.state.recipe.ingredients.fields, this.state.recipe.ingredients.name)}>
              Add
            </Button>
            <Button
              clicked={(event)=>this.continueFillingFormHandler(event, this.state.recipe.ingredients, this.state.recipe.ingredients.fields, this.state.recipe.ingredients.name)}
              type='button'>
              Save
            </Button>
          </div>
        </Aux>)
      }
      if (this.state.current === 'directions') {
        form = (<Aux key={this.state.recipe.directions.name}>
          <h3 style={{
            margin: '10px 0',
            color: '#508FA2'
          }}>Recipe Direction</h3>
          <Input
            key={this.state.recipe.directions.name}
            tag={this.state.recipe.directions.tag}
            config={this.state.recipe.directions.fields}
            changed={(event, index) => this.multipleChangehandler(event,index, this.state.recipe.directions.name)}
            information={this.state.recipe.directions.fields}
            >
              {this.state.recipe.directions.fields}
          </Input>
          <div  style={{
            textAlign: 'center',
            width: '100%'
          }}>
            <Button
              type='button'
              clicked={(event) => this.addInfoHandler(event, this.state.recipe.directions, this.state.recipe.directions.fields, this.state.recipe.directions.name)}>
              Add
            </Button>
            <Button
              clicked={(event)=>this.continueFillingFormHandler(event, this.state.recipe.directions, this.state.recipe.directions.fields, this.state.recipe.directions.name)}
              type='button'>
              Save
            </Button>
          </div>
        </Aux>)
      }
      if (this.state.current === 'prepInfo') {
        form = (<Aux key={this.state.recipe.prepInfo.name}>
          <h3 style={{
            margin: '10px 0',
            color: '#508FA2'
          }}>Rcipe Times</h3>
          <Input
            key={this.state.recipe.prepInfo.name}
            tag={this.state.recipe.prepInfo.tag}
            config={this.state.recipe.prepInfo.fields}
            changed={(event, index) => this.multipleChangehandler(event,index, this.state.recipe.prepInfo.name)}
            information={this.state.recipe.prepInfo.fields}
            >
              {this.state.recipe.prepInfo.fields}
          </Input>
          <div  style={{
            textAlign: 'center',
            width: '100%'
          }}>
          <Button
            clicked={(event)=>this.continueWithFormHandler(event,this.state.recipe.prepInfo.fields, this.state.recipe.prepInfo.name)}
            type='button'>
            Save
          </Button>
          </div>
        </Aux>)
      }
      if (this.state.loading) {
        form = (
          <Spinner />
        )
      }
      if (this.state.recipe.name.valid && !this.state.loading) {
        name = this.state.recipe.name.fields[0].value
      }
      if (this.state.recipe.ingredients.fields[0].list.length > 0 && !this.state.loading) {
        let list = this.state.recipe.ingredients.fields[0].list
        list.map
      }
      if (this.state.recipe.prepInfo.valid && !this.state.loading) {
        button = (
          <Button clicked={this.recipeHandler}>
            Save All
          </Button>
        )
      }

      let menu = null
      if (this.state.menu) {
        menu = (
          <Aux>
            {/* <p
              onClick={this.homeHandler}
              className={classes.Link}>
              <strong>Home</strong>
            </p> */}
            <p
              onClick={this.listHandler}
              className={classes.Link}>
              <strong>List of Recipes</strong>
            </p>
          </Aux>
        )
      }
      let errorMessage = null
      if (this.state.error) {
        errorMessage = (
          <div style={{
            position: 'absolute',
            zIndex: '100',
            height: '100vh',
            width: '100vw',
            background: 'RGBA(75, 82, 99, .7)'
          }}>
            <div style={{
              textAlign: 'center',
              margin: '30% 25%',
              width: '50%',
              fontSize: '20px',
              borderRadius: '5px',
              filter: 'drop-shadow(0 3px 5px RGBA(15, 16, 17, 1.00))',
              background: '#92D3ED',
              color: '#28464B',
              padding: '20px'
            }}>
              <div
                style={{
                  cursor: 'pointer',
                  float: 'right',
                  background: '#508FA2',
                  color: '#28464B',
                  padding: '0 5px',
                  border: 'solid 1px #28464B',
                  borderRadius: '2px'
              }}
                onClick={this.modalClose}>
                X
              </div>
                <p style={{display:'inline-block'}}>
                  This section is partially incomplete
                </p>
            </div>
          </div>
        )
      }
      if (this.state.recipe.name.valid) {
        ingredients = (
          <h4 style={{color: '#508FA2'}}>Ingredients</h4>
        )
      }
      if (this.state.recipe.ingredients.valid) {
        directions = (
          <h4 style={{color: '#508FA2'}}>Directions</h4>
        )
      }
      if (this.state.recipe.directions.valid) {
        time = (
          <Aux>
            <h4 style={{color: '#508FA2'}}>Prep Time</h4>
            <p style={{color: '#92D3ED', margin: '0'}}>{this.state.recipe.prepInfo.fields[0].value} {this.state.recipe.prepInfo.fields[1].value}</p>
            <h4 style={{color: '#508FA2'}}>Cook Time</h4>
            <p style={{color: '#92D3ED', margin: '0'}}>{this.state.recipe.prepInfo.fields[2].value} {this.state.recipe.prepInfo.fields[3].value}</p>
          </Aux>
        )
      }
    return (
      <main className={classes.Main}>
        {errorMessage}
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
        <section className={classes.Info}>
          <form
            className={classes.Form}
            onSubmit={this.recipeHandler}
            onKeyPress={this.onKeyPress}
          >
            {form}
            {button}
          </form>
          <div className={classes.Form}>
            <h3 style={{color: '#92D3ED'}}>{name}</h3>
            {ingredients}
            {this.state.recipe.ingredients.fields[0].list.map((item, index) => {
              return <p key={index} style={{color: '#92D3ED', margin: '0'}}>{item}</p>
            })}
            {directions}
            {this.state.recipe.directions.fields[0].list.map((item, index) => {
              return <p key={index} style={{color: '#92D3ED', margin: '0'}}>{item}</p>
            })}
            {time}
          </div>
        </section>
      </main>
    )
  }
}

export default BuildRecipe
