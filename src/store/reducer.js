import * as actionsTypes from './actions'


const initialState = {
  recipe: {
    name: {
      list: []
    },
    ingredient: {
      list: []
    },
    amount: {
      list: []
    },
    measurement: {
      list: []
    },
    direction: {
      list: []
    },
    designation: {
      list: []
    },
    prep: {
      list: []
    },
    preptime: {
      list: []
    },
    cook: {
      list: []
    },
    cooktime: {
      list: []
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.AddedItem:
      return {
        ...state
      }
    default:
      return state
  }
}

export default reducer
