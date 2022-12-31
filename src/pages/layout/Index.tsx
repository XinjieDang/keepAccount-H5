import React from 'react'
import Tabs from '@/components/TabBars/TabBars'
import { Outlet } from 'react-router-dom'
export default function Index() {
  return (
    <>
      <div>
        <Outlet></Outlet>
        <Tabs />
      </div>
    </>
  )
}
