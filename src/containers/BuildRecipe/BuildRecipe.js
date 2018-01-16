import React, {Component} from 'react'
import axios from 'axios'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

class BuildRecipe extends Component {
  state = {
    recipe: {
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
        valid: false
      },
      ingredients: {
        tag: 'input',
        config: {
          placeholder: 'Ingredient',
          type: 'text'
        },
        value: '',
        list: [],
        validation: {
          require: true,
          minListLength: 3
        },
        valid: false
      },
      amount: {
        tag: 'input',
        config: {
          placeholder: 'Amount',
          type: 'number'
        },
        value: '',
        list: [],
        validation: {
          require: true
        },
        valid: false
      },
      measurement: {
        tag: 'select',
        config: {
          options: [
            {value: 'dash(s)', display: 'dash(s)'},
            {value: 'pinch(s)', display: 'pinch(s)'},
            {value: 'teaspoon(s)', display: 'teaspoon(s)'},
            {value: 'tablespoon(s)', display: 'tablespoon(s)'},
            {value: 'ounces(s)', display: 'ounces(s)'},
            {value: 'cup(s)', display: 'cup(s)'},
            {value: 'pint(s)', display: 'pint(s)'},
            {value: 'litter(s)', display: 'litters(s)'},
            {value: 'quart(s)', display: 'quart(s)'},
            {value: 'gallon(s)', display: 'gallon(s)'},
            {value: 'custom', display: 'custom'},
          ]
        },
        value: 'cup(s)',
        list: [],
        validation: {
          require: true
        },
        valid: true
      },
      directions: {
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
        valid: false
      },
      designation: {
        tag: 'select',
        config: {
          options: [
            {value: 'required', display: 'required'},
            {value: 'optional', display: 'optional'}
          ]
        },
        value: 'required',
        list: [],
        validation: {
          require: true
        },
        valid: true
      },
      prep: {
        tag: 'input',
        config: {
          placeholder: 'Prep Time',
          type: 'number'
        },
        value: '',
        validation: {
          require: true
        },
        valid: false
      },
      preptime: {
        tag: 'select',
        config: {
          options: [
            {value: 'minute(s)', display: 'minute(s)'},
            {value: 'hour(s)', display: 'hour(s)'}
          ]
        },
        value: 'required',
        validation: {
          require: true
        },
        valid: true
      },
      cook: {
        tag: 'input',
        config: {
          placeholder: 'Cook Time',
          type: 'number'
        },
        value: '',
        validation: {
          require: true
        },
        valid: false
      },
      cooktime: {
        tag: 'select',
        config: {
          options: [
            {value: 'minute(s)', display: 'minute(s)'},
            {value: 'hour(s)', display: 'hour(s)'}
          ]
        },
        value: 'required',
        validation: {
          require: true
        },
        valid: true
      }
    },
    send: false,
    loading: false
  }

  inputChangehandler = (event, field) => {
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
        {recipeInfo.map((item) => {
          return (
            <Input
              key={item.id}
              tag={item.information.tag}
              config={item.information.config}
              value={item.information.value}
              changed={(event) => this.inputChangehandler(event,item.id)}
              >
                {item.information.config.placeholder}
            </Input>
          )
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
