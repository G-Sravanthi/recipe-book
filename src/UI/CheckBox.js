import React, {Component} from 'react'
import classes from './CheckBox.css'
import Aux from '../HOC/Aux'

class CheckBox extends Component{
  state = {
    completed: false,
    name: ''
  }
  completedHandler = () => {
    console.log(this.state.completed);
    this.setState({completed: !this.state.completed},
    () => {
      let info = {[this.state.name]: this.state.completed}
      console.log(this.state.completed);
      this.props.completion(info)
    })
  }
  render() {
    let check = null
    if (this.state.completed) {
      check = (
        <div>
            <i style={{paddingBottom: '12px'}} className="fas fa-check"></i>
        </div>
      )
    }
    return (
      <div className={classes.CheckBox}>
        <div
          className={classes.Box}
          onClick={this.completedHandler}>
          {check}
        </div>
        <div className={classes.Input}>
          {this.props.info.ingredient}{this.props.info.amount}{this.props.info.measurement}
        </div>
      </div>
    )
  }
}
export default CheckBox
