import React, { Fragment } from 'react'
import Table from './Table'
import './Home.css'
import { connect } from 'react-redux'
import { mapDispatchToProps } from '../redux/modules/'
import NavBar from './NavBar'

const Home = ({ getSchedule, history }) => {
  return (
    <Fragment>
      <NavBar
        icon={<div></div>}
        leftContent=" "
      >
        iCourse 课表
      </NavBar>
      <div className="course-table-wrapper">
        <Table history={history} />
      </div>
      <div className="button-holder"></div>
      <button onClick={() => getSchedule(true) } className="load-btn">刷新课表</button>
    </Fragment>
  )
}

export default connect(null, mapDispatchToProps)(Home)


