import React from 'react'
import Header from './Header'
import TodoList from "./TodoList"

function DisplayData() {
  return (
    <div className="main-box">
      
        <Header/>
        <TodoList/>
    </div>
  )
}

export default DisplayData