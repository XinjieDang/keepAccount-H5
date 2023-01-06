import React, { FC } from 'react'
import { NavBar, Space, Toast } from 'antd-mobile'
import { type } from 'os'
import style from './style.module.less'
import { useNavigate } from 'react-router-dom'
type NavBarsTitle = {
  title: string
}

const NavBars: FC<NavBarsTitle> = ({ title }) => {
  const navigate = useNavigate()
  const back = () => navigate(-1)
  return (
    <>
      <NavBar
        style={{
          '--border-bottom': '1px #eee solid',
        }}
        onBack={back}
      >
        <span style={{ fontSize: '15px' }}>{title}</span>
      </NavBar>
    </>
  )
}
export default NavBars
