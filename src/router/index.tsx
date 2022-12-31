import React from 'react'
// 组件
const Layout = React.lazy(() => import('@/pages/layout/Index'))
const Home = React.lazy(() => import('@/pages/home/Index')) // 路由懒加载，配合App.tsx的Suspense
const Login = React.lazy(() => import('@/pages/login/Index'))
const User = React.lazy(() => import('@/pages/user/Index'))
const Count = React.lazy(() => import('@/pages/count/Index'))
import { RouteObject } from 'react-router-dom'

const routerMap: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/count',
        element: <Count />,
      },
      {
        path: '/user',
        element: <User />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]

export default routerMap

// children: [
//   {
//     path: "/a/t",
//     element: <T />,
//   },
// ],
