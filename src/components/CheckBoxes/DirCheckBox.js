import React, {Component} from 'react'
import classes from './DirCheckBox.css'
import Aux from '../../HOC/Aux'

class DirCheckBox extends Component{
  state = {
    completed: false
  }
  completedHandler = () => {
    console.log(this.state.completed);
    this.setState({completed: !this.state.completed},
    () => {
      let info = {check: this.state.completed}
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
    let input = (
      <div className={classes.Input}>
        {this.props.children}
      </div>
    )
    if(this.state.completed) {
      input = (
        <div className={classes.Input}>
          <div style={{textDecoration: 'line-through', margin: '0'}}>{this.props.children}</div>
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
        {input}
      </div>
    )
  }
}
export default DirCheckBox
