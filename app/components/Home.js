import React, { Fragment } from 'react'
import Table from './CourseTable'
import './Home.css'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/modules/'
import NavBar from './NavBar'

const Home = ({ getSchedule, history, curSchoolDate }) => {
  if (curSchoolDate == undefined) {
    curSchoolDate = "iCourse 课表";
  } else {
    curSchoolDate = "第" + curSchoolDate.schoolWeek + "周" 
  }
  return (
    <Fragment>
      <NavBar
        icon={<div></div>}
        leftContent=" "
      >
        {curSchoolDate}
      </NavBar>
      <div className="course-table-wrapper">
        <Table history={history} />
      </div>
      <div className="button-holder"></div>
      <button onClick={() => getSchedule(true) } className="load-btn">刷新课表</button>
    </Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


