import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  axios.defaults.withCredentials=true;
  const navigate=useNavigate()
  const handleLogout=()=>{
    axios.get('http://localhost:3000/auth/logout')
    .then(res =>{
      if(res.data.status)
      {
        navigate('/login')
      }
    }).catch(err =>{
      console.log(err);
    })
  }
  return (
    <div>Home
    <button><Link to="/dashboard">DashBoard</Link></button>
    <br />
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home