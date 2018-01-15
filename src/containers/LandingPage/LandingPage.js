import React, {Component} from 'react'
import Aux from '../../HOC/Aux'
import {Link} from 'react-router-dom'

class LandingPage extends Component {
  render() {
    return (
      <Aux>
        <Link to='/recipe-list'>
          <h1>Recipe List</h1>
        </Link>
        <Link to='/build-recipe'>
          <h1>Build Recipe</h1>
        </Link>
      </Aux>
    )
  }
}
export default LandingPage
