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
        name: 'ingredients',
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
             placeholder: 'cup(s)',
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
            value: '',
            list: [],
            config: {
              placeholder: 'Step',
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
            name: 'designation',
            tag: 'select',
            value: 'required',
            list: [],
            config: {
              placeholder: 'required',
              options: [
                {value: 'required', display: 'Required'},
                {value: 'optional', display: 'Optional'}
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
      prepInfo: {
        tag: 'multiple',
        fields: [
          {
            name: 'prep',
            tag: 'input',
            value: '',
            config: {
              placeholder: 'Prep Time',
              type: 'number'
            },
            validation: {
              require: true
            },
            valid: false,
            touched: false
          },
          {
            name: 'preptime',
            tag: 'select',
            value: 'minute(s)',
            config: {
              placeholder: 'minute(s)',
              options: [
                {value: 'minute(s)', display: 'Minute(s)'},
                {value: 'hour(s)', display: 'Hour(s)'}
              ]
            },
            validation: {
              require: true
            },
            valid: true
          },
          {
            name: 'cook',
            tag: 'input',
            value: '',
            config: {
              placeholder: 'Cook Time',
              type: 'number'
            },

            validation: {
              require: true
            },
            valid: false,
            touched: false
          },
          {
            name: 'cooktime',
            tag: 'select',
            value: 'minute(s)',
            config: {
              placeholder: 'minute(s)',
              options: [
                {value: 'minute(s)', display: 'Minute(s)'},
                {value: 'hour(s)', display: 'Hour(s)'}
              ]
            },

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
    let currentStep = {
      ...this.state.current
    }
    let savedRecipe = {
      ...this.state.recipe
    }
    for(let i=0; i < savedRecipe.ready.length; i++) {
      if(savedRecipe.ready[i].name === field) {
        currentStep = savedRecipe.ready[i + 1].name
      }
    }
    this.setState({current: currentStep})
  }

  addInfoHandler = (event, information, group, id) => {
    let savedRecipe = {
      ...this.state.recipe
    }
    let savedValue = {
      ...this.state.recipe[id]
    }
    group.map((item, index) => {
      console.log(item);
      item.list.push(item.value)
      item.value = ''
      savedValue.fields[index] = item
    })
    savedRecipe[id] = savedValue
    this.setState({recipe: savedRecipe})
    console.log(this.state.recipe);
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
    let form = null

    if (this.state.current === 'name') {
        form = (<Aux key={this.state.recipe.name.name}>
          <Input
            key={this.state.recipe.name.name}
            tag={this.state.recipe.name.tag}
            config={this.state.recipe.name.config}
            value={this.state.recipe.name.value}
            changed={(event) => this.nameChangeHandler(event, this.state.recipe.name.name)}
            >
              {this.state.recipe.name.config.placeholder}
          </Input>
          <div  style={{
            textAlign: 'center',
            width: '100%'
          }}>
            <button
              onClick={(event)=>this.continueFormHandler(event,this.state.recipe.name.name)}
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
            changed={(event, index) => this.multipleChangehandler(event,index, this.state.recipe.ingredients.name)}
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
              onClick={(event)=>this.continueFormHandler(event,this.state.recipe.ingredients.name)}
              type='button'>
              Save Ingredients
            </button>
          </div>
        </Aux>)
      }
      // if (item.id === 'directions' && this.state.recipe.ready[2].value && !this.state.recipe.ready[2].finished) {
      //   form = (<Aux key={item.id}>
      //     <Input
      //       key={item.id}
      //       tag={item.information.tag}
      //       config={item.information.fields}
      //       changed={(event, index) => this.multipleChangehandler(event,index, item.id)}
      //       information={item.information.fields}
      //       >
      //         {item.information.fields}
      //     </Input>
      //     <div  style={{
      //       textAlign: 'center',
      //       width: '100%'
      //     }}>
      //       <button
      //         type='button'
      //         onClick={(event) => this.addInfoHandler(event, item.information.fields, item.id)}>
      //         Add Ingredient
      //       </button>
      //       <button
      //         onClick={(event)=>this.continueFormHandler(event,item.id)}
      //         type='button'>
      //         Save Directions
      //       </button>
      //     </div>
      //   </Aux>)
      // }
      // if (item.id === 'prepInfo' && this.state.recipe.ready[3].value && !this.state.recipe.ready[3].finished) {
      //   form = (<Aux key={item.id}>
      //     <Input
      //       key={item.id}
      //       tag={item.information.tag}
      //       config={item.information.fields}
      //       changed={(event, index) => this.multipleChangehandler(event,index, item.id)}
      //       information={item.information.fields}
      //       >
      //         {item.information.fields}
      //     </Input>
      //     <div  style={{
      //       textAlign: 'center',
      //       width: '100%'
      //     }}>
      //     <button
      //       onClick={(event)=>this.continueFormHandler(event,item.id)}
      //       type='button'>
      //       Save Times
      //     </button>
      //     </div>
      //   </Aux>)
      // }
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
