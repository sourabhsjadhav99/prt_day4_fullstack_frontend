import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import "./Header.css"

function Header() {
  let {email} = useParams()
  let [data, setData]=useState({})
  const fetchData = () => {
    fetch(`https://prt-fullstack-backend.onrender.com/signin/${email}`)
        .then((response) => response.json())
        .then((data) => {
            setData(data[0]);
        });
};
useEffect(() => {
    fetchData();
}, []);
  return (
    <header className='header'>
    <div><span>{data.email}</span></div>
    </header>
  )
}

export default Header