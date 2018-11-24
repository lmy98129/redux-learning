import React from 'react'
import Home from './Home'
import User from './User'
import CourseInfo from './CourseInfo'
import CourseEdit from './CourseEdit'
import Login from './Login'
import About from './About'
import { HashRouter, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={User} />
        <Route exact path="/info" component={CourseInfo} />
        <Route exact path="/edit" component={CourseEdit} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
      </Switch>
    </HashRouter>
  )
}

export default App;