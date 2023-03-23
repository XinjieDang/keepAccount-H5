import { Avatar, Button, Dialog, List, Tag, Toast } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import style from './index.module.less'
import { LockOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import api from '@/api'
const userMenus = [
  { key: 1, title: '用户信息修改', icon: '<SetOutline>', path: '/userInfo' },
  { key: 2, title: '修改密码', icon: '<LockOutline/>', path: '/updatePwd' },
  { key: 3, title: '关于', icon: '<TagOutline/>', path: '/about' },
]
export default function Index() {
  const navigate = useNavigate()
  const demoAvatarImages = [
    'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  ]
  //获取用户信息
  let currentUser: User = {
    userName: '',
    avatar: '',
    signature: '',
  }
  const [user, setUser] = useState<User>(currentUser)
  //获取用户信息
  const getUserInfo = () => {
    api.user.getUserInfo().then((res) => {
      console.log(res)
      if (res) {
        currentUser = { ...res }
        // console.log('当前用户', currentUser)
        setUser({ ...currentUser })
        //缓存
        localStorage.setItem('user', JSON.stringify(currentUser))
      }
    })

    console.log('当前用户=========', user)
  }

  const handleOpenPage = (path: string) => {
    //路由跳转
    navigate(path, {
      state: {
        id: 1,
        name: 'admin',
      },
    })
  }
  const handleLogout = async () => {
    const result = await Dialog.confirm({
      content: '你确定退出登录吗？',
    })
    if (result) {
      navigate('/login', {
        replace: true,
      })
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <>
      <div className={style.userBox}>
        <div className={style.header}>
          <div className={style.userBox}>
            <div className={style.userText}>
              <div>
                <Tag style={{ opacity: 0.6 }} round color="#fff" fill="outline">
                  昵称 {user.userName}
                </Tag>
                <div className={style.userSign}>
                  ☘️个性签名:{user.signature}
                </div>
              </div>
              <div>
                <Avatar
                  src={user.avatar}
                  style={{ '--size': '68px', '--border-radius': '34px' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.mainContent}>
          <div className={style.userSetMenu}>
            <List>
              {userMenus.map((item) => (
                <List.Item
                  prefix={<LockOutline />}
                  data-path={item.path}
                  onClick={() => handleOpenPage(item.path)}
                  key={item.key}
                >
                  {item.title}
                </List.Item>
              ))}
            </List>
          </div>
        </div>
        <div className={style.footer}>
          <Button
            className={style.footerBtn}
            color="danger"
            fill="solid"
            size="mini"
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </div>
      </div>
    </>
  )
}
