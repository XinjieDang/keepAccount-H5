import './App.css'
import routes from '@/router'
import { useRoutes } from 'react-router-dom'
import { Suspense } from 'react'

function App() {
  const Views = () => useRoutes(routes)
  return <Views />
}

export default App
