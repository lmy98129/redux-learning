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
    if (!backValue) {
      history.goBack();
    } else {
      history.push(backValue);
    }
  }
  
  render() {
    const title = this.props.children;
    let { rightContent } = this.props;
    if (!rightContent) {
      rightContent = <div></div>
    }
    return (
      <Fragment>
        <NavBar 
          mode="light"
          icon={<Icon type="left" />}
          leftContent="返回"
          onLeftClick={this.handleClick}
          rightContent={rightContent}
        >{title}</NavBar>
        <div className="navbar-holder" style={{height: "3.3rem"}}></div>
      </Fragment>
    )
  }
}

NavBar.propTypes = {
  backPath: PropTypes.string,
}

export default CustomedNavBar;