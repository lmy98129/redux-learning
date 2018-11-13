import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, WhiteSpace, Button, Popover, Icon, WingBlank } from 'antd-mobile'
import NavBar from './NavBar'
import './CourseInfo.css'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/modules/schedule';

const Item = Popover.Item;

class CourseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popVisible: false,
    }
  }

  componentDidUpdate() {
    switch(this.props.value) {
      case "Edited":
        this.props.returnToSuccess(this.props.schedule);
        break;
      default:
        break;
    }
  }

  onSelect = (opt) => {
    const history = this.props.history;
    const { time, date } = history.location;
    const backValue = history.location;
    this.setState({
      popVisible: false,
    })
    switch(opt.props.value) {
      case "Add":
        // this.props.addCourse(this.props.schedule, time, date);
        history.push({ pathname: '/edit', editStatus: 'add', backValue, time, date })
        break;
    }
  }

  handlePopVisibleChange = (visible) => {
    this.setState({
      visible
    })
  }

  render() {
    const { time, date } = this.props.history.location;
    if (!time || !date) {
      return <Redirect push to="/"/>
    } 
    const content = this.props.schedule[time][date];
    const backValue = this.props.history.location;
    const history = this.props.history;
    return (
      <Fragment>
        <NavBar 
          history={history}
          rightContent={
            <Popover
              visible={this.state.popVisible}
              overlay={[
                <Item key='0' value="Add" style={{ whiteSpace: 'nowrap' }}>添加课程</Item>
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-16, 0],
              }}
              onVisibleChange={this.handlePopVisibleChange}
              onSelect={this.onSelect}
            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <Icon type="ellipsis" />
              </div>
            </Popover>
          }
        >课程详情</NavBar>
        <WhiteSpace size="lg"/>
        <WingBlank size="lg">
          {
            content.map((item, index) => {
              return (
              <Fragment key={index}>
                <Card>
                  <Card.Header 
                    title={item.courseName}
                    extra={
                      <Fragment>
                        <Button 
                          type="ghost" 
                          inline size="small" 
                          onClick={() => history.push({ pathname: '/edit', editStatus: 'edit', backValue, index })} 
                          style={{marginRight: "5px"}}
                        >编辑</Button>
                        <Button
                          type="warning"
                          inline size="small"
                          onClick={() => this.props.deleteCourse(this.props.schedule, time, date, index)}
                        >删除</Button>
                      </Fragment>

                    }
                  />
                  <Card.Body>
                    <div className="item-wrap">教室 {item["classroom.roomNickname"]}</div>
                    <div className="item-wrap">周数 {item.SKZCZFC}</div>
                    <div className="item-wrap">节数 周{date} 第{time}节</div>
                    <div className="item-wrap">教师 (暂不支持) </div>
                  </Card.Body>
                </Card>
                <WhiteSpace size="md" />
              </Fragment>
              )
            })
          }
        </WingBlank>
        <WhiteSpace size="lg"/>
        <WhiteSpace size="lg"/>
      </Fragment>
    )
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(CourseInfo);