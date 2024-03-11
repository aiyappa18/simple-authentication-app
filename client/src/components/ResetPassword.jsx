import React, { useState } from "react";
import "../App.css";
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const {token}=useParams();

  const navigate=useNavigate();
  const handleSubmit=(e) =>{
    e.preventDefault();
    axios.post('http://localhost:3000/auth/resetpassword/'+token,
    {password}).then(response=>{
        if(response.data.status){
        navigate('/login')
        } 
        console.log(response.data);
    }).catch(error =>{
        console.log(error);
    })
  }
  return (
    <div className="sign-up-container">
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
     
      <label htmlFor="password">New Password: </label>
      <input
        type="password"
        autoComplete="off"
        placeholder="************"
        onChange={(e) => setPassword(e.target.value)}
      />
     
      <button type="submit">Reset</button>
    </form>
  </div>
  )
}

export default ResetPassword;