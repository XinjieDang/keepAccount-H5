import { Avatar, Button, List, Tag } from 'antd-mobile'
import React from 'react'
import style from './index.module.less'
import { SetOutline, LockOutline, TagOutline } from 'antd-mobile-icons'

export default function Index() {
  const demoAvatarImages = [
    'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
    'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  ]

  return (
    <>
      <div className={style.userBox}>
        <div className={style.header}>
          <div className={style.userBox}>
            <div className={style.userText}>
              <div>
                <Tag round color="#fff" fill="outline">
                  用户昵称 admin
                </Tag>
                <div className={style.userSign}>☘️个性签名没有</div>
              </div>
              <div>
                <Avatar
                  src={demoAvatarImages[0]}
                  style={{ '--size': '68px' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.mainContent}>
          <div className={style.userSetMenu}>
            <List>
              <List.Item prefix={<SetOutline />} onClick={() => {}}>
                用户信息
              </List.Item>
              <List.Item prefix={<LockOutline />} onClick={() => {}}>
                修改密码
              </List.Item>
              <List.Item prefix={<TagOutline />} onClick={() => {}}>
                关于
              </List.Item>
            </List>
          </div>
        </div>
        <div className={style.footer}>
          <Button
            className={style.footerBtn}
            color="danger"
            fill="solid"
            size="mini"
            onClick={() => console.log(1)}
          >
            退出登录
          </Button>
        </div>
      </div>
    </>
  )
}
