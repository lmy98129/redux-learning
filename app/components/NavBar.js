import React, { Component, Fragment } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import PropTypes from 'prop-types'
import './NavBar.css'

class CustomedNavBar extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    const { history, backValue } = this.props;
    if (!history) return;
    if (!backValue) {
      history.goBack();
    } else {
      history.push(backValue);
    }
  }
  
  render() {
    const title = this.props.children;
    let { rightContent, icon, leftContent } = this.props;
    if (!rightContent) {
      rightContent = <div></div>
    }
    if (!icon) {
      icon = <Icon type="left" />
    }
    if (!leftContent) {
      leftContent = "返回"
    }
    return (
      <Fragment>
        <NavBar 
          mode="light"
          icon={icon}
          leftContent={leftContent}
          onLeftClick={this.handleClick}
          rightContent={rightContent}
        >{title}</NavBar>
        <div className="navbar-holder" style={{height: "4.2rem"}}></div>
      </Fragment>
    )
  }
}

NavBar.propTypes = {
  backPath: PropTypes.string,
}

export default CustomedNavBar;