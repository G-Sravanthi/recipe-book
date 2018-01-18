import React, {Component} from 'react'
import axios from 'axios'
import Aux from '../../HOC/Aux'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

class BuildRecipe extends Component {
  state = {
    recipe: {
      ready: [
        {name: 'name', value: true},
        {name: 'ingredient', value: false},
        {name: 'directions', value: false},
        {name: 'prepInfo', value: false},
      ],
      name: {
        tag: 'input',
        config: {
          placeholder: 'Name of Recipe',
          type: 'text'
        },
        value: '',
        validation: {
          requied: true
        },
        valid: false,
        touched: false,
      },
      ingredients: {
        tag: 'multiple',
        fields: [
          {
           name: 'ingredient',
           tag: 'input',
           value: '',
           list: [],
           config: {
             placeholder: 'Ingredient',
             type: 'text'
           },
           validation: {
             require: true,
             minListLength: 3
           },
           valid: false,
           touched: false
         },
         {
           name: 'amount',
           tag: 'input',
           value: '',
           list: [],
           config: {
             placeholder: 'Amount',
             type: 'number'
           },
           validation: {
             require: true
           },
           valid: false,
           touched: false
         },
         {
           name: 'measurement',
           tag: 'select',
           value: 'cup(s)',
           list: [],
           config: {
             options: [
               {value: 'dash(s)', display: 'Dash(s)'},
               {value: 'pinch(s)', display: 'Pinch(s)'},
               {value: 'teaspoon(s)', display: 'Teaspoon(s)'},
               {value: 'tablespoon(s)', display: 'Tablespoon(s)'},
               {value: 'ounces(s)', display: 'Ounces(s)'},
               {value: 'cup(s)', display: 'Cup(s)'},
               {value: 'pint(s)', display: 'Pint(s)'},
               {value: 'litter(s)', display: 'Litters(s)'},
               {value: 'quart(s)', display: 'Quart(s)'},
               {value: 'gallon(s)', display: 'Gallon(s)'},
               {value: 'custom', display: 'Custom'},
             ]
           },
           validation: {
             require: true
           },
           valid: true,
           touched: true
         }
        ]
      },
      directions: {
        tag: 'multiple',
        fields: [
          {
            name: 'direction',
            tag: 'textarea',
            config: {
              placeholder: 'Step',
              type: 'text'
            },
            value: '',
            list: [],
            validation: {
              require: true,
              minListLength: 3
            },
            valid: false,
            touched: false
          },
          {
            name: 'designation',
            tag: 'select',
            value: 'required',
            list: [],
            config: {
              options: [
                {value: 'required', display: 'Required'},
                {value: 'optional', display: 'Optional'}
              ]
            },
            value: 'required',
            list: [],
            validation: {
              require: true
            },
            valid: true,
            touched: true
          }
        ]
      },
      prepInfo: {
        tag: 'multiple',
        fields: [
          {
            name: 'prep',
            tag: 'input',
            config: {
              placeholder: 'Prep Time',
              type: 'number'
            },
            value: '',
            validation: {
              require: true
            },
            valid: false,
            touched: false
          },
          {
            name: 'preptime',
            tag: 'select',
            config: {
              options: [
                {value: 'minute(s)', display: 'Minute(s)'},
                {value: 'hour(s)', display: 'Hour(s)'}
              ]
            },
            value: 'required',
            validation: {
              require: true
            },
            valid: true
          },
          {
            name: 'cook',
            tag: 'input',
            config: {
              placeholder: 'Cook Time',
              type: 'number'
            },
            value: '',
            validation: {
              require: true
            },
            valid: false,
            touched: false
          },
          {
            name: 'cooktime',
            tag: 'select',
            config: {
              options: [
                {value: 'minute(s)', display: 'Minute(s)'},
                {value: 'hour(s)', display: 'Hour(s)'}
              ]
            },
            value: 'required',
            validation: {
              require: true
            },
            valid: true
          }
        ]
      },
    },
    valid: true,
    send: false,
    loading: false,
  }

  nameChangeHandler = (event, field) => {
    let newRecipe = {
      ...this.state.recipe
    }
    let newElement = {
      ...this.state.recipe[field]
    }
    newElement.value = event.target.value
    newRecipe[field] = newElement
    this.setState({recipe: newRecipe})
  }

  multipleChangehandler = (event, index, field) => {
    let newRecipe = {
      ...this.state.recipe
    }
    let newElement = {
      ...this.state.recipe[field]
    }
    let newValue = {
      ...newElement.fields[index].value
    }
    newValue = event.target.value
    newElement.fields[index].value = newValue
    newRecipe[field] = newElement
    this.setState({recipe: newRecipe})
  }

  continueFormHandler = (event, field) => {
    let savedRecipe = {
      ...this.state.recipe
    }
    let readyArray = {
      ...this.state.recipe.ready
    }
    for(let i=0; i < readyArray.length; i++) {
      if(readyArray[i].name === field) {
        readyArray[i].value = true
      }
    }
    savedRecipe.ready = readyArray
    this.setState({recipe: savedRecipe})
  }

  addInfoHandler = (event, fields, id) => {
    fields.map((field) => {
      let savedRecipe = {
        ...this.state.recipe
      }
      field.touched = true
      field.finished = true
      field.list.push(field.value)
      savedRecipe[id] = field
      this.setState({recipe: savedRecipe})
      console.log(this.state);
    })
  }

  recipeHandler = (event) => {
    event.preventDefault()
    this.setState({loading: true})
    const recipe = {}
    for(let key in this.state.recipe) {
      recipe[key] = this.state.recipe[key].value
    }
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
    let recipeInfo = []
    for(let key in this.state.recipe) {
      recipeInfo.push({
        id: key,
        information: this.state.recipe[key]
      })
    }
    let form = (
      <form onSubmit={this.recipeHandler}>
        {recipeInfo.map((item, index) => {
          if (item.id === 'name') {
            return (<Aux key={item.id}>
              <Input
                key={item.id}
                tag={item.information.tag}
                config={item.information.config}
                value={item.information.value}
                changed={(event) => this.nameChangeHandler(event, item.id)}
                done={(event)=>this.continueFormHandler(event, item.id)}
                >
                  {item.information.config.placeholder}
              </Input>
              <div  style={{
                textAlign: 'center',
                width: '100%'
              }}>
                <button
                  onClick={(event)=>this.continueFormHandler(event,item.id)}
                  type='button'>
                  Save Recipe Name
                </button>
              </div>
            </Aux>)
          }
          if (item.id === 'ingredients') {
            console.log(this.state.recipe.ingredients.fields[2].finished);
            return (<Aux key={item.id}>
              <h2>{this.state.recipe.name.value}</h2>
              <Input
                key={item.id}
                tag={item.information.tag}
                config={item.information.fields}
                changed={(event, index) => this.multipleChangehandler(event,index, item.id)}
                information={item.information.fields}
                >
                  {item.information.fields}
              </Input>
              <div  style={{
                textAlign: 'center',
                width: '100%'
              }}>
                <button
                  type='button'
                  onClick={(event) => this.addInfoHandler(event, item.information.fields, item.id)}>
                  Add Ingredient
                </button>
                <button
                  type='button'
                  >
                  Save Ingredients
                </button>
              </div>
            </Aux>)
          }
          if (item.id === 'directions') {
            return (<Aux key={item.id}>
              <Input
                key={item.id}
                tag={item.information.tag}
                config={item.information.fields}
                changed={(event, index) => this.multipleChangehandler(event,index, item.id)}
                information={item.information.fields}
                >
                  {item.information.fields}
              </Input>
              <div  style={{
                textAlign: 'center',
                width: '100%'
              }}>
                <button
                  type='button'
                  onClick={(event) => this.addInfoHandler(event, item.information.fields, item.id)}>
                  Add Ingredient
                </button>
                <button
                  type='button'
                  >
                  Save Ingredients
                </button>
              </div>
            </Aux>)
          }
          if (item.id === 'prepInfo') {
            return (<Aux key={item.id}>
              <Input
                key={item.id}
                tag={item.information.tag}
                config={item.information.fields}
                changed={(event, index) => this.multipleChangehandler(event,index, item.id)}
                information={item.information.fields}
                >
                  {item.information.fields}
              </Input>
              <div  style={{
                textAlign: 'center',
                width: '100%'
              }}>
                <button
                  type='button'
                  onClick={(event) => this.addInfoHandler(event, item.information.fields, item.id)}>
                  Add Ingredient
                </button>
                <button
                  type='button'
                  >
                  Save Ingredients
                </button>
              </div>
            </Aux>)
          }
        })}
        <Button>Save</Button>
      </form>
    )
    if (this.state.loading) {
      form = (
        <Spinner />
      )
    }
    return (
      <div>
        {form}
      </div>
    )
  }
}
export default BuildRecipe
