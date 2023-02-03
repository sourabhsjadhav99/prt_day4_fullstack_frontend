import './App.css';
import React from 'react'
import { Routes, Route } from "react-router-dom";
import DisplayData from './components/DisplayData';
import Header from './components/Header';
import SignUp from "./components/SignIn_SignUp/SignUp"
import SignIn from "./components/SignIn_SignUp/SignIn"
import Error from "./components/Error"
function App() {
  return (
      <Routes>
        <Route path="/" element={<SignIn />} >
          <Route path=":email" element={<Header/>}/>
        </Route>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/display/:email" element={<DisplayData />} />
        <Route path="*" element={<Error />} />
      </Routes>
  )
}

export default App
