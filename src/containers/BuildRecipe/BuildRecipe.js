import React, {Component} from 'react'
import axios from 'axios'
import Aux from '../../HOC/Aux'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

class BuildRecipe extends Component {
  state = {
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
               {value: 'VM', display: '---Volume Measurements---'},
               {value: 'dash(s)', display: 'Dash(s)'},
               {value: 'pinch(s)', display: 'Pinch(s)'},
               {value: 'teaspoon(s)', display: 'Teaspoon(s)'},
               {value: 'tablespoon(s)', display: 'Tablespoon(s)'},
               {value: 'cup(s)', display: 'Cup(s)'},
               {value: 'pint(s)', display: 'Pint(s)'},
               {value: 'litter(s)', display: 'Litters(s)'},
               {value: 'quart(s)', display: 'Quart(s)'},
               {value: 'gallon(s)', display: 'Gallon(s)'},
               {value: 'WM', display: '---Weight Measurements---'},
               {value: 'gram(s)', display: 'Gram(s)'},
               {value: 'ounces(s)', display: 'Ounces(s)'},
               {value: 'pound(s)', display: 'Pound(s)'},
               {value: 'SM', display: '---Specialty Measurements---'},
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
               {value: 'other', display: 'Other'},
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
    if (newValue === 'VM' || newValue === 'WM' || newValue === 'SM') {
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
          console.log('touched issue');
          valid = false
        }
        if(typeof check !== item.type) {
          console.log('typeof issue', typeof item.value, item.type);
          valid = false
        }
      } else {
        if(!item.touched) {
          console.log('touched issue');
          valid = false
        }
        if(typeof item.value !== item.type) {
          console.log('typeof issue', typeof item.value, item.type);
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
        console.log('touched issue');
        valid = false
      }
      if(typeof item.value !== item.type) {
        console.log('typeof issue');
        valid = false
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
        console.log('touched issue');
        valid = false
      }
      if(typeof item.value !== item.type) {
        console.log('typeof issue');
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
      console.log(item.value);
    })
    console.log(group);
  }

  recipeHandler = (event) => {
    event.preventDefault()
    this.setState({loading: true})
    const recipe = {}
    recipe.recipeName = []
    recipe.recipeIngredients = []
    recipe.recipeDirections = []
    recipe.recipePrepInfo = []
    const name = {name: this.state.recipe.name.fields[0].value}
    const ingredients = {ingredients: this.state.recipe.ingredients.fields[0].list}
    const amounts = {amounts: this.state.recipe.ingredients.fields[1].list}
    const measurements = {measurements: this.state.recipe.ingredients.fields[2].list}
    const directions = {directions: this.state.recipe.directions.fields[0].list}
    const designations = {designations: this.state.recipe.directions.fields[1].list}
    const prep = {prep: this.state.recipe.prepInfo.fields[0].value}
    const preptime = {preptime: this.state.recipe.prepInfo.fields[1].value}
    const cook = {cook: this.state.recipe.prepInfo.fields[2].value}
    const cooktime = {cooktime: this.state.recipe.prepInfo.fields[3].value}
    recipe.recipeName.push(name)
    recipe.recipeIngredients.push(ingredients, amounts, measurements)
    recipe.recipeDirections.push(directions, designations)
    recipe.recipePrepInfo.push(prep, preptime, cook, cooktime)
    console.log(recipe);
    axios.post('https://recipe-builder-7bfb0.firebaseio.com/recipes.json', recipe)
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

    if (this.state.current === 'name') {
        form = (<Aux key={this.state.recipe.name.name}>
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
            <button
              onClick={(event)=>this.continueWithFormHandler(event, this.state.recipe.name.fields, this.state.recipe.name.name)}
              type='button'>
              Save Recipe Name
            </button>
          </div>
        </Aux>)
      }
      if (this.state.current === 'ingredients') {
        form = (<Aux key={this.state.recipe.ingredients.name}>
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
            <button
              type='button'
              onClick={(event) => this.addInfoHandler(event, this.state.recipe.ingredients, this.state.recipe.ingredients.fields, this.state.recipe.ingredients.name)}>
              Add Ingredient
            </button>
            <button
              onClick={(event)=>this.continueFillingFormHandler(event, this.state.recipe.ingredients, this.state.recipe.ingredients.fields, this.state.recipe.ingredients.name)}
              type='button'>
              Save Ingredients
            </button>
          </div>
        </Aux>)
      }
      if (this.state.current === 'directions') {
        form = (<Aux key={this.state.recipe.directions.name}>
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
            <button
              type='button'
              onClick={(event) => this.addInfoHandler(event, this.state.recipe.directions, this.state.recipe.directions.fields, this.state.recipe.directions.name)}>
              Add Direction
            </button>
            <button
              onClick={(event)=>this.continueFillingFormHandler(event, this.state.recipe.directions, this.state.recipe.directions.fields, this.state.recipe.directions.name)}
              type='button'>
              Save Directions
            </button>
          </div>
        </Aux>)
      }
      if (this.state.current === 'prepInfo') {
        form = (<Aux key={this.state.recipe.prepInfo.name}>
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
          <button
            onClick={(event)=>this.continueWithFormHandler(event,this.state.recipe.prepInfo.fields, this.state.recipe.prepInfo.name)}
            type='button'>
            Save Times
          </button>
          </div>
        </Aux>)
      }
      if (this.state.loading) {
        form = (
          <Spinner />
        )
      }
    return (
      <form onSubmit={this.recipeHandler}>
        {form}
        <Button>Save</Button>
      </form>
    )
  }
}
export default BuildRecipe
