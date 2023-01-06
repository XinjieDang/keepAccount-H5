import NavBars from '@/components/NavBar/NavBars'
import React, { useState } from 'react'
import style from './index.module.less'
import { useLocation } from 'react-router-dom'
import {
  Button,
  Form,
  ImageUploader,
  ImageUploadItem,
  Input,
} from 'antd-mobile'

export default function Index() {
  const { state } = useLocation()
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: 'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
    },
  ])
  console.log(state)
  const mockUpload = (file: File): any => {
    setTimeout(() => console.log('上传', file), 3000)
    return {
      url: URL.createObjectURL(file),
    }
  }
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
          <Form layout="vertical">
            <Form.Item label="个性签名" name="username">
              <Input placeholder="请输入个性签名" clearable />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={style.saveBtn}>
        <Button
          className={style.btn}
          color="primary"
          fill="solid"
          size="mini"
          onClick={() => console.log(1)}
        >
          保存
        </Button>
      </div>
    </>
  )
}
