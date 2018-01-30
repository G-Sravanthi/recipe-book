import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Layout from './Layout/Layout'
import BuildRecipe from './containers/BuildRecipe/BuildRecipe'
import RecipeList from './containers/RecipeList/RecipeList'
import StartRecipe from './containers/StartRecipe/StartRecipe'
import LandingPage from './containers/LandingPage/LandingPage'


class App extends Component {
  render() {
    return (
      <div  className="App">
        <Layout>
          <Switch>
            <Route path='/build-recipe' component={BuildRecipe}/>
            <Route path='/recipe-list' component={RecipeList}/>
            <Route path='/start-recipe' component={StartRecipe}/>
            <Route path='/' component={LandingPage}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
