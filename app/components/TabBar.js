import React from 'react';
import './TabBar.css';
import { TabBar } from 'antd-mobile';


const CustomedTabBar = ({ children, history }) => {
  const pathname = history.location.pathname;

  return (
    <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
      <TabBar
        unselectedTintColor='#949494'
        tintColor='#33A3F4'
        barTintColor='white'
      >
        <TabBar.Item 
          title='课表'
          key='courseTable'
          icon={<div className="iconfont icon-school-kb-web"></div>}
          selectedIcon={<div className="iconfont icon-school-kb-web selected"></div>}
          selected={pathname === '/'}
          onPress={() => {
            history.push('/')
          }}
        >
          {pathname === '/' ? children : null}

        </TabBar.Item>
        <TabBar.Item
          title='我的'
          key='user'
          icon={<div className="iconfont icon-yonghu"></div>}
          selectedIcon={<div className="iconfont icon-yonghu selected"></div>}
          selected={pathname === '/user'}
          onPress={() => {
            history.push('/user')
          }}
        >
          {pathname === '/user' ? children : null}

        </TabBar.Item>

      </TabBar>
    </div>
  )
}

export default CustomedTabBar;