import React from 'react'
import {BrowserRouter as Router , Route, } from "react-router-dom"
import Header from './components/Header'
import Home from './components/Home'

const App = () => {
  return (
    <Router>
    <div>

<Header/>
<Home/>
    </div>
    </Router>
  )
}

export default App