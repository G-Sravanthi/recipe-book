import React, {Component} from 'react'
import classes from './Layout.css'
import Aux from '../HOC/Aux'


class Layout extends Component {
  render() {
    return (
      <Aux>
        <main>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout
