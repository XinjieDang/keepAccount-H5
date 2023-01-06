import React from 'react'
import NavBars from '@/components/NavBar/NavBars'
import style from './index.module.less'
import headerBg from '@/assets/images/about-head.jpg'
const styleBg = {
  style: {
    backgroundSize: 'cover',
    backgroundImage: `url(${headerBg})`,
  },
}
export default function Index() {
  return (
    <>
      <NavBars title="关于" />
      <div style={styleBg.style} className={style.headerImg}></div>
      <div className={style.appTitle}>🤑记账H5</div>
      <div className={style.lastText}>🍃万物之中，希望之美。</div>
    </>
  )
}
