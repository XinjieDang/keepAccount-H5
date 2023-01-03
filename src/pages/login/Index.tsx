import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import style from './index.module.less'
import { Form, Input, Button } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import bgImage from '@/assets/images/head-bg.jpg'

const styleBg = {
  bgd: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    opacity: 0.7,
  },
}

export default function Index() {
  // 密码图标
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm() //校验全部字段，也可以校验部分字段
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    // 表单校验
    form.validateFields().then((res) => {
      console.log(res) //拿到表单信息
      //路由跳转
      navigate('/layout/home', {
        replace: true,
        state: {
          id: 1,
          name: 'admin',
        },
      })
    })
  }
  return (
    <div className={style.contaner}>
      <header style={styleBg.bgd} className={style.header}></header>
      {/* login form */}
      <div className={style.loginForm}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>登录</h2>
        <Form layout="horizontal" mode="default" form={form}>
          <Form.Header />
          <Form.Item
            label="账号"
            name="userName"
            rules={[{ required: true, message: '账号不能为空' }]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                max: 8,
                min: 6,
                type: 'string',
              },
            ]}
          >
            <div className={style.password}>
              <Input
                type={visible ? 'text' : 'password'}
                placeholder="请输入密码"
              />
              <div className={style.eye}>
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)} />
                ) : (
                  <EyeOutline onClick={() => setVisible(false)} />
                )}
              </div>
            </div>
          </Form.Item>
          <Form.Header />
        </Form>
        <Form
          name="form"
          onFinish={onFinish}
          footer={
            <Button
              fill="outline"
              block
              type="submit"
              color="primary"
              size="middle"
            >
              登录
            </Button>
          }
        ></Form>
      </div>
    </div>
  )
}
