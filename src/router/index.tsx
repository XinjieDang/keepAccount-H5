import React from 'react'
// 组件
const Layout = React.lazy(() => import('@/pages/layout/Index'))
const Home = React.lazy(() => import('@/pages/home/Index')) // 路由懒加载，配合App.tsx的Suspense
const Login = React.lazy(() => import('@/pages/login/Index'))
const User = React.lazy(() => import('@/pages/user/Index/Index'))
const UserInfo = React.lazy(() => import('@/pages/user/Info/Index'))
const UpdatePwd = React.lazy(() => import('@/pages/user/UpdatePassWord/Index'))
const About = React.lazy(() => import('@/pages/user/About/Index'))
const Count = React.lazy(() => import('@/pages/count/Index'))
import { Navigate, RouteObject } from 'react-router-dom'

const routerMap: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/layout/home" />,
  },
  {
    path: '/layout',
    element: <Layout />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'count',
        element: <Count />,
      },
      {
        path: 'user',
        element: <User />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/userInfo',
    element: <UserInfo />,
  },
  {
    path: '/updatePwd',
    element: <UpdatePwd />,
  },
  {
    path: '/about',
    element: <About />,
  },
]

export default routerMap
