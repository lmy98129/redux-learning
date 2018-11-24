import React, { Fragment } from 'react'
import { List } from 'antd-mobile'
import NavBar from '../components/NavBar'
import './About.css'

const Item = List.Item;

const About = ({ history }) => {
  
  return (
    <Fragment>
      <NavBar 
        history={history}
        rightContent={<div></div>}
      >
        关于
      </NavBar>
      <div className="about-logo">
        iCourse
        <span className="about-title"> 课表</span>
      </div>
      <div className="about-hint">
        北科大课表导入、编辑的<br/>又一个民间解决方案
      </div>
      <List>
        <Item 
          extra="lmy98129"
          arrow="horizontal"
          onClick={
            () => window.open('https://github.com/lmy98129', '_blank').location
          }
        >
          开发者
        </Item>
        <Item 
          arrow="horizontal"
          extra="v0.2.0" 
        >
          版本号
        </Item>
        <Item 
          extra="code"
          arrow="horizontal"
          onClick={
            () => window.open('https://github.com/lmy98129/redux-learning', '_blank').location
          }
        >
          GitHub
        </Item>
      </List>
    </Fragment>
  )
}

export default About;