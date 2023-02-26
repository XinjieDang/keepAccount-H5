import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import 'antd-mobile/es/global'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* Suspense类似于一个错误捕获器 ,允许定义一个fallback指示符，fallback用来定义我们在等待加载时显示的一些内容*/}
    <Suspense fallback={<div>loding</div>}>
      <App />
    </Suspense>
  </BrowserRouter>
)
