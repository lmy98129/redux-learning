import React from 'react'
import './Grid.css'

export default ({ content }) => {  
  if (content.length === 0) {
    return (<td className="course-table-grid"></td>)
  } else {
    return(
      <td className="course-table-grid">
        <div className="course-table-grid-content-wrapper"  style={{background:content[0].color}}>
          <div className="course-table-grid-content">
            <div className="content-title">{ content[0].courseName }<br/></div>
            <div className="content-time"> { content[0].SKZCZFC }<br/></div>
            {
              content.length > 1 ? (<div className="content-hint">点击展开</div>) : ""
            }
          </div>
        </div>
      </td>
    )
  }
}