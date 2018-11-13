import React from 'react'
import Table from './Table'
import './App.css'
import { connect } from 'react-redux'
import { mapDispatchToProps } from '../redux/modules/schedule'

const App = ({ getSchedule }) => {
  return (
    <div>
      <div className="course-table-wrapper">
        <Table />
      </div>
      <div className="button-holder"></div>
      <button onClick={ getSchedule } className="load-btn">刷新课表</button>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(App)


