import React, {Component} from 'react'
import Aux from '../../HOC/Aux'
import {Link} from 'react-router-dom'
import Button from '../../UI/Button'
import classes from './LandingPage.css'

class LandingPage extends Component {
  state = {
    visited: true
  }
  // componentDidMount = () => {
  //   setTimeout(() => {
  //     this.setState({visited: true})
  //   }, 5000)
  // }
  render() {
    let landing = null
    if(this.state.visited) {
      landing = (
        <Aux>
          <Link to='/recipe-list'>
            <Button className={classes.Links} bsSize="large" bsStyle="link"><strong>Recipe List</strong></Button>
          </Link>
          <Link to='/build-recipe'>
            <Button className={classes.Links} bsSize="large" bsStyle="link"><strong>Build Recipe</strong></Button>
          </Link>
        </Aux>
      )
    }
    return (
      <main className={classes.Landing}>
        {landing}
      </main>
    )
  }
}
export default LandingPage
