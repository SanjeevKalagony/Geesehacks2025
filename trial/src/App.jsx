import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-blue-500 min-h-screen flex items-center justify-center">
        <p className='bg'>Hello World</p>
      </div>
    </>
  )
}

export default App
