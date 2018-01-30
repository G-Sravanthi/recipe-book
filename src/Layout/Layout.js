import React, {Component} from 'react'
import Aux from '../HOC/Aux'
import classes from './Layout.css'

class Layout extends Component {
  render() {
    return (
      <Aux>
        <main className={classes.Layout}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout
