import React, { Component, Fragment } from 'react'
import NavBar from './NavBar'
import { Redirect } from 'react-router-dom'
import { WhiteSpace } from 'antd-mobile';

class EditCourse extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { backValue } = this.props.history.location;
    const history = this.props.history
    if (!backValue) {
      return <Redirect push to="/"/>
    } 
    return (
      <Fragment>
        <NavBar 
          history={history} 
          backValue={backValue} 
          rightContent={
            <div 
              onClick={() => console.log("完成")} 
              style={{marginRight: "15px"}}
            >完成</div>
          }
        >编辑课程</NavBar>
        <WhiteSpace size="lg"/>
      </Fragment>
    )
  }
}


export default EditCourse;