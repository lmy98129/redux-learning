import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { NavBar, Icon, Card, WhiteSpace, Button } from 'antd-mobile'

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
    if (this.state.redirect || !this.props.history.location.content) {
      return <Redirect push to="/"/>
    }

    const { content, time, date } = this.props.history.location;

    return (
      <Fragment>
        <NavBar 
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {this.handleClick()}}
          rightContent={[
            <Icon key='0' type="ellipsis" />
          ]}
        >课程详情</NavBar>
        <WhiteSpace size="lg"/>
        {
          content.map((item, index) => {
            return (
            <Fragment key={index}>
              <Card full>
                <Card.Header 
                  title={item.courseName}
                  extra={<Button type="ghost" inline size="small">编辑</Button>}
                />
                <Card.Body>
                  <div>教室 {item["classroom.roomNickname"]}</div>
                  <div>周数 {item.SKZCZFC}</div>
                  <div>节数 周{date} 第{time}节</div>
                  <div>教师 暂不支持 </div>
                </Card.Body>
              </Card>
              <WhiteSpace size="sm" />
            </Fragment>
            )
          })
        }
      </Fragment>
    )
  }
}

export default CourseInfo