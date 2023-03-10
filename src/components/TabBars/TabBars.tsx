import { Badge, TabBar } from 'antd-mobile'
import React, { useState, FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import style from './style.module.less'
import { TextOutline, PieOutline, UserOutline } from 'antd-mobile-icons'
import { type } from 'os'
type CurrentActiveId = {
  activeId: number
}
const TabBars: FC<CurrentActiveId> = (props) => {
  useEffect(() => {
    console.log('当前的id', props.activeId)
  })
  const tabs = [
    {
      key: 'home',
      title: '账单',
      icon: <TextOutline />,
      badge: Badge.dot,
    },
    {
      key: 'count',
      title: '统计',
      icon: <PieOutline />,
      badge: '5',
    },
    {
      key: 'user',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('home')
  const setRouteActive = (value: string) => {
    setActiveKey(value)
    //路由跳转
    navigate(value)
  }
  return (
    <div className={style.tabBars}>
      <TabBar
        activeKey={activeKey}
        safeArea
        onChange={(value) => setRouteActive(value)}
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}
export default TabBars
