import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
 const navigate=useNavigate();
 axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:3000/auth/verify')
    .then(res=>{
      if(res.data.status){
        
      }
      else{
        navigate('/')
      }
    })
  },[])
  return (
    <div>DashBoard</div>
  )
}

export default DashBoard