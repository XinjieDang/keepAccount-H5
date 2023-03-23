import NavBars from '@/components/NavBar/NavBars'
import React, { useEffect, useState } from 'react'
import style from './index.module.less'
import { useLocation } from 'react-router-dom'
import api from '@/api'
import {
  Button,
  Form,
  ImageUploader,
  ImageUploadItem,
  Input,
  Toast,
} from 'antd-mobile'
const defaultAvatar =
  'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60'
export default function Index() {
  // 获取路由参数
  //const { state } = useLocation()
  //获取用户信息
  // let currentUser: User = {
  //   userName: '',
  //   avatar: '',
  //   signature: '',
  // }
  //双向绑定不需要 useState
  // const [user, setUser] = useState<User>(currentUser)
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: defaultAvatar,
    },
  ])
  const [form] = Form.useForm()
  //从缓存获取用户信息
  const getUserInfo = () => {
    const localUser: User = JSON.parse(localStorage.getItem('user') || '{}')
    // 设置表单默认信息
    form.setFieldValue('userName', localUser.userName)
    form.setFieldValue('signature', localUser.signature)
    // 设置头像
    let file: Array<ImageUploadItem> = []
    file.push({ url: localUser.avatar })
    setFileList(file)
  }
  // 表单提交
  const handleSubmit = () => {
    // console.log('表单信息', form.getFieldsValue())
    api.user.updateUserInfo(form.getFieldsValue()).then((res) => {
      if (res) {
        Toast.show({ content: '更新成功' })
      }
    })
  }
  //路由参数
  // console.log('state======', state)
  const mockUpload = (file: File): any => {
    api.user.fileUpload({ file }).then((res) => {
      console.log('返回的信息', res)
    })
    return {
      url: console.log(URL.createObjectURL(file)),
    }
  }
  const handleValueChange = (changedValues: string, allValues: string) => {
    // console.log('all', allValues)
  }
  // 页面挂载时
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <>
      <NavBars title="用户信息" />
      <div className={style.userInfo}>个人资料</div>
      <div className={style.userLogo}>
        <span className={style.setTitle}>头像</span>
        <div className={style.upload}>
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            maxCount={1}
            upload={mockUpload}
          />
        </div>
        <div className={style.sign}>
          <Form
            layout="vertical"
            onValuesChange={handleValueChange}
            form={form}
            footer={
              <Button
                block
                type="submit"
                color="primary"
                onClick={handleSubmit}
                size="large"
              >
                提交
              </Button>
            }
          >
            <Form.Item label="昵称" name="userName">
              <Input placeholder="请输入昵称" clearable />
            </Form.Item>
            <Form.Item label="个性签名" name="signature">
              <Input placeholder="请输入个性签名" clearable />
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
