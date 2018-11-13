import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class CourseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }
  handleClick = () => {
    this.setState({
      redirect: true
    })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect push to="/"/>
    }

    return <div onClick={this.handleClick}>
      test here
    </div>
  }
}

export default CourseInfo