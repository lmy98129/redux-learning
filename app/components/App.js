import React from 'react'
import Home from './Home'
import CourseInfo from './CourseInfo'
import EditCourse from './EditCourse'
import { HashRouter, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/info" component={CourseInfo} />
        <Route exact path="/edit" component={EditCourse} />
      </Switch>
    </HashRouter>
  )
}

export default App;