import React, {Component} from 'react'
import Aux from '../../HOC/Aux'
import {Link} from 'react-router-dom'
import Button from '../../UI/Button'
import classes from './LandingPage.css'

class LandingPage extends Component {
  render() {
    let landing = (
      <div styl={{display: 'block'}}>
        <Link to='/recipe-list'>
          <Button className={classes.Links} bsSize="large" bsStyle="link"><strong>Recipe List</strong></Button>
        </Link>
        <Link to='/build-recipe'>
          <Button className={classes.Links} bsSize="large" bsStyle="link"><strong>Build Recipe</strong></Button>
        </Link>
      </div>
    )
    return (
      <main className={classes.Landing}>
        <div className={classes.First}>Create a Recipe</div>
        <div className={classes.Second}>Discover a Recipe</div>
        <div className={classes.Third}>Eat and Enjoy
          {landing}
        </div>
        <div className={classes.FirstMobile}>Create</div>
        <div className={classes.SecondMobile}>Discover</div>
        <div className={classes.ThirdMobile}>Eat</div>
        <div className={classes.FourthMobile}>Enjoy
          {landing}
        </div>
      </main>
    )
  }
}
export default LandingPage
