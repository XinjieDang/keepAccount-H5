import React from 'react'
import NavBars from '@/components/NavBar/NavBars'
import { Button, Form, Input } from 'antd-mobile'
import style from './index.module.less'

export default function Index() {
  return (
    <>
      <NavBars title="修改密码" />
      <div style={{ padding: '0px 20px' }}>
        <Form layout="horizontal">
          <Form.Item
            name="oldPwd"
            label="原密码"
            rules={[{ required: true, message: '原密码不能为空' }]}
          >
            <Input
              onChange={console.log}
              placeholder="原密码"
              type={'password'}
            />
          </Form.Item>
          <Form.Item
            name="newPwd"
            label="新密码"
            rules={[{ required: true, message: '新密码不能为空' }]}
          >
            <Input
              onChange={console.log}
              placeholder="新密码"
              type={'password'}
            />
          </Form.Item>
          <Form.Item
            name="comfirPwd"
            label="确认密码"
            rules={[{ required: true, message: '确认密码不为空' }]}
          >
            <Input
              onChange={console.log}
              placeholder="确认密码"
              type={'password'}
            />
          </Form.Item>
        </Form>
      </div>
      <div className={style.saveBtn}>
        <Button
          className={style.btn}
          color="primary"
          fill="solid"
          size="mini"
          onClick={() => console.log(1)}
        >
          提交
        </Button>
      </div>
    </>
  )
}
