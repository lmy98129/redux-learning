import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/modules/'
import { Icon, Drawer, List, Picker, Modal, Switch } from 'antd-mobile'
import TabBar from './TabBar'
import NavBar from './NavBar'
import Table from './CourseTable'
import './Home.css'

const Item = List.Item;
const alert = Modal.alert;

const setWeeks = () => {
  let weeks = []
  for (let i=1; i<=16; i++) {
    weeks.push({
      label: "第" + i + "周",
      value: i
    })
  }
  return weeks;
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDrawOpen: false,
    }
  }

  onDrawOpenChange = () => {
    this.setState({ isDrawOpen: !this.state.isDrawOpen });
  }

  onPickerValueChange = value => {
    console.log(value[0]);
    const { changeWeek } = this.props;
    changeWeek(value[0]);
  }

  render() {
    const { getSchedule, history, showAll, showAllCourse } = this.props;
    let { schoolWeek } = this.props;
    const weeks = setWeeks();
    let title = showAll ? "全部课程" : ((schoolWeek) ? ("第" + schoolWeek + "周") : "iCourse 课表")
    let pickerValue = [];
    pickerValue.push(schoolWeek);

    const topMenu = (
        <List>
          <Item>{null}</Item>
          <Picker
            data={weeks}
            cols={1}
            title="选择周数"
            extra={(schoolWeek) ? ("第" + schoolWeek + "周") : "请选择"} 
            onChange={value => this.onPickerValueChange(value)}
            value={pickerValue}
            onOk={() => {this.setState({ isDrawOpen: false })}}
          >
            <Item 
              arrow="horizontal" 
              multipleLine
            >
              当前周数
            </Item>
          </Picker>
          <Item 
            arrow="horizontal" 
            multipleLine
            onClick={() => {
              alert('导入课表', '将从教务系统导入课表，之前在课表上所做的编辑将丢失', [
                { text:'取消', onPress: () => {}, style: "default" },
                { text:'确定', onPress: () => {
                  getSchedule(true)
                  this.setState({ isDrawOpen: false })
                }}
              ])
            }}
          >
            导入课表
          </Item>
          <Item 
            extra={<Switch 
              checked={showAll} 
              onChange={() => showAllCourse(!showAll)}
            />}
            multipleLine
          >
            显示全部课程
          </Item>
        </List>
      )
    return (
      <TabBar history={history}>
        <NavBar
          icon={<div></div>}
          rightContent={
            <div style={{
              height: '100%',
              padding: '0 15px',
              display: 'flex',
              alignItems: 'center',
            }} onClick={this.onDrawOpenChange}>
              <Icon type="ellipsis" />
            </div>
          }
        >
          {title}
        </NavBar>
        <Drawer
          style={{ 
            minHeight: document.documentElement.clientHeight, 
            // top: this.state.isDrawOpen ? "44px" : "", 
            position: this.state.isDrawOpen ? "fixed" : ""
          }}
          contentStyle={{ paddingTop: 45 }}
          enableDragHandle
          sidebar={topMenu}
          open={this.state.isDrawOpen}
          onOpenChange={this.onDrawOpenChange}
          position="top"
        >
          <div className="home-wrapper">
            <div className="course-table-wrapper">
              <Table history={history} />
            </div>
          </div>
          <div className="bottom-holder"></div>
        </Drawer>

      </TabBar>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


